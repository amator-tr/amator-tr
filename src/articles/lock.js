// Tek-yazici async mutex. Eszamanli iki publish git index'ini karistirir;
// tryAcquire saniyeleri 0'a dustugunde 409 doneriz.

let busy = false;

export async function withPublishLock(fn) {
  if (busy) throw new PublishBusyError();
  busy = true;
  try {
    return await fn();
  } finally {
    busy = false;
  }
}

export class PublishBusyError extends Error {
  constructor() { super('Yayinlama suruyor — birkac saniye sonra tekrar deneyin'); this.name = 'PublishBusyError'; }
}
