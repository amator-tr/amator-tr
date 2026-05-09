// Markdown -> HTML renderer wired up to match the existing tutorial output:
//   * h2/h3/h4 anchors with permalink before the heading text:
//       <h2 id="..."><a class="anchor-link" href="#..." aria-label="Bu basliga link">#</a>Heading</h2>
//   * Apostrophes in body text encoded as &#39; (post-process step).
//   * No uniqueness suffix on duplicate slugs (the source HTML has duplicate
//     IDs and we replicate that to keep external #anchor links stable).

import MarkdownIt from 'markdown-it';
import { slugifyHeading } from './slug.mjs';

function anchorPlugin(md) {
  md.core.ruler.push('add_heading_anchors', state => {
    for (let i = 0; i < state.tokens.length; i++) {
      const tok = state.tokens[i];
      if (tok.type !== 'heading_open') continue;
      const level = parseInt(tok.tag.slice(1), 10);
      if (level < 2 || level > 4) continue;
      const inline = state.tokens[i + 1];
      if (!inline || inline.type !== 'inline') continue;

      const slug = slugifyHeading(inline.content);
      tok.attrSet('id', slug);

      const link = new state.Token('html_inline', '', 0);
      link.content =
        `<a class="anchor-link" href="#${slug}" aria-label="Bu basliga link">#</a>`;
      inline.children.unshift(link);
    }
  });
}

export function createRenderer() {
  const md = new MarkdownIt({
    html: false,
    linkify: false,
    typographer: false,
    breaks: false,
  });
  md.use(anchorPlugin);
  return md;
}

const cachedRenderer = createRenderer();

// Render markdown body to HTML, with the apostrophe post-processing applied.
export function renderBody(markdown) {
  let html = cachedRenderer.render(markdown);
  // Match source-generator quirk: encode bare apostrophes in output as &#39;.
  // Safe because markdown-it uses double-quotes for HTML attributes.
  html = html.replace(/'/g, '&#39;');
  return html;
}

// Word count from markdown source: strip code fences, headings markers, and
// links/markdown punctuation; count whitespace-separated tokens.
export function wordCount(markdown) {
  let text = markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#*_>`~|\-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return text ? text.split(/\s+/).length : 0;
}

export function readingTime(words) {
  return Math.max(1, Math.round(words / 200));
}
