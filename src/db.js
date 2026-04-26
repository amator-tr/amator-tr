import Database from 'better-sqlite3';
import { resolve } from 'path';

const DB_PATH = resolve(process.env.DB_PATH || './data/cagri.db');

class D1Statement {
  constructor(db, sql) {
    this._db = db;
    this._sql = sql;
    this._params = [];
  }

  bind(...args) {
    this._params = args;
    return this;
  }

  async first(column) {
    const stmt = this._db.prepare(this._sql);
    const row = stmt.get(...this._params);
    if (!row) return null;
    if (column) return row[column];
    return row;
  }

  async all() {
    const stmt = this._db.prepare(this._sql);
    const rows = stmt.all(...this._params);
    return { results: rows };
  }

  async run() {
    const stmt = this._db.prepare(this._sql);
    const info = stmt.run(...this._params);
    return { meta: { changes: info.changes, last_row_id: info.lastInsertRowid } };
  }
}

class D1Compat {
  constructor(sqliteDb) {
    this._db = sqliteDb;
  }

  prepare(sql) {
    return new D1Statement(this._db, sql);
  }

  async batch(statements) {
    const self = this;
    const tx = self._db.transaction((stmts) => {
      return stmts.map(s => {
        const stmt = self._db.prepare(s._sql);
        const info = stmt.run(...s._params);
        return { meta: { changes: info.changes, last_row_id: info.lastInsertRowid } };
      });
    });
    return tx(statements);
  }

  exec(sql) {
    this._db.exec(sql);
  }
}

let instance = null;

export function getDB() {
  if (!instance) {
    const raw = new Database(DB_PATH);
    raw.pragma('journal_mode = WAL');
    raw.pragma('foreign_keys = ON');
    instance = new D1Compat(raw);
  }
  return instance;
}

export function getRawDB() {
  getDB();
  return instance._db;
}
