export const DEMO_HTML = `<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Theme Preview</title>
<style id="theme-css"></style>
</head>
<body>
<nav class="navbar">
  <span class="nav-brand">ThemeSystem</span>
  <ul class="nav-menu">
    <li class="nav-item"><a class="nav-link active" href="#">Home</a></li>
    <li class="nav-item"><a class="nav-link" href="#">Components</a></li>
    <li class="nav-item"><a class="nav-link" href="#">Docs</a></li>
  </ul>
  <div class="nav-actions">
    <button class="btn btn-outline btn-sm">Sign in</button>
    <button class="btn btn-primary btn-sm" data-theme-toggle>Light</button>
  </div>
</nav>

<main style="max-width:72rem;margin:0 auto;padding:var(--space-6);display:grid;gap:var(--space-6)">

  <section>
    <h1>Automatic Web Theme Generator</h1>
    <p class="text-muted" style="color:var(--text-muted)">Enter one color, get a complete design system.</p>
    <div style="display:flex;gap:var(--space-3);align-items:flex-end;margin-top:var(--space-4)">
      <div style="flex:1;max-width:20rem">
        <label for="primary-input">Primary Color</label>
        <input type="text" id="primary-input" value="#6750A4" placeholder="HEX, RGB, HSL, OKLCH">
      </div>
      <button class="btn btn-primary" id="generate-btn">Generate</button>
      <button class="btn btn-outline" id="copy-css-btn">Copy CSS</button>
    </div>
  </section>

  <section>
    <h2>Core Colors</h2>
    <div id="core-swatches" style="display:flex;flex-wrap:wrap;gap:var(--space-3)"></div>
  </section>

  <section>
    <h2>Buttons</h2>
    <div style="display:flex;flex-wrap:wrap;gap:var(--space-2)">
      <button class="btn btn-primary">Primary</button>
      <button class="btn btn-secondary">Secondary</button>
      <button class="btn btn-accent">Accent</button>
      <button class="btn btn-contrast">Contrast</button>
      <button class="btn btn-outline">Outline</button>
      <button class="btn btn-ghost">Ghost</button>
      <button class="btn btn-success">Success</button>
      <button class="btn btn-warning">Warning</button>
      <button class="btn btn-danger">Danger</button>
      <button class="btn btn-primary" disabled>Disabled</button>
      <button class="btn btn-primary" aria-busy="true">Loading</button>
    </div>
    <div style="display:flex;flex-wrap:wrap;gap:var(--space-2);margin-top:var(--space-3)">
      <button class="btn btn-primary btn-sm">Small</button>
      <button class="btn btn-primary btn-md">Medium</button>
      <button class="btn btn-primary btn-lg">Large</button>
    </div>
  </section>

  <section>
    <h2>Cards</h2>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(14rem,1fr));gap:var(--space-4)">
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Card Title</h3>
          <p class="card-subtitle">Card subtitle</p>
        </div>
        <div class="card-content">This card uses surface, border, and text tokens that adapt automatically.</div>
        <div class="card-actions">
          <button class="btn btn-primary btn-sm">Action</button>
          <button class="btn btn-ghost btn-sm">Cancel</button>
        </div>
      </div>
      <div class="card">
        <div class="card-body">
          <h3 class="card-title">Simple Card</h3>
          <p class="card-content">Cards automatically adapt between light and dark themes.</p>
        </div>
      </div>
    </div>
  </section>

  <section>
    <h2>Forms</h2>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(16rem,1fr));gap:var(--space-4);max-width:42rem">
      <div>
        <label for="i-text">Text input</label>
        <input type="text" id="i-text" placeholder="Enter text">
      </div>
      <div>
        <label for="i-email">Email</label>
        <input type="email" id="i-email" placeholder="you@example.com">
      </div>
      <div>
        <label for="i-pass">Password</label>
        <input type="password" id="i-pass" placeholder="••••••">
      </div>
      <div>
        <label for="i-num">Number</label>
        <input type="number" id="i-num" placeholder="0">
      </div>
      <div>
        <label for="i-search">Search</label>
        <input type="search" id="i-search" placeholder="Search...">
      </div>
      <div>
        <label for="i-date">Date</label>
        <input type="date" id="i-date">
      </div>
      <div>
        <label for="i-url">URL</label>
        <input type="url" id="i-url" placeholder="https://">
      </div>
      <div>
        <label for="i-tel">Tel</label>
        <input type="tel" id="i-tel" placeholder="+1">
      </div>
      <div style="grid-column:1/-1">
        <label for="i-textarea">Textarea</label>
        <textarea id="i-textarea" placeholder="Write something..."></textarea>
      </div>
      <div>
        <label for="i-select">Select</label>
        <select id="i-select">
          <option>Option one</option>
          <option>Option two</option>
        </select>
      </div>
      <div>
        <label for="i-file">File</label>
        <input type="file" id="i-file">
      </div>
      <div>
        <label for="i-range">Range</label>
        <input type="range" id="i-range">
      </div>
      <div style="display:flex;align-items:center;gap:var(--space-4)">
        <label style="margin:0"><input type="checkbox" checked> Checkbox</label>
        <label style="margin:0"><input type="radio" name="r" checked> Radio</label>
        <label style="margin:0"><input type="radio" name="r"> Radio 2</label>
      </div>
    </div>
  </section>

  <section>
    <h2>Alerts</h2>
    <div style="display:grid;gap:var(--space-3);max-width:42rem">
      <div class="alert alert-primary"><div><div class="alert-title">Primary</div><div class="alert-message">This is a primary alert.</div></div></div>
      <div class="alert alert-info"><div><div class="alert-title">Info</div><div class="alert-message">This is an info alert.</div></div></div>
      <div class="alert alert-success"><div><div class="alert-title">Success</div><div class="alert-message">Operation completed.</div></div></div>
      <div class="alert alert-warning"><div><div class="alert-title">Warning</div><div class="alert-message">Proceed with caution.</div></div></div>
      <div class="alert alert-danger"><div><div class="alert-title">Danger</div><div class="alert-message">Something went wrong.</div></div></div>
    </div>
  </section>

  <section>
    <h2>Badges &amp; Tags</h2>
    <div style="display:flex;flex-wrap:wrap;gap:var(--space-2)">
      <span class="badge badge-primary">Primary</span>
      <span class="badge badge-secondary">Secondary</span>
      <span class="badge badge-accent">Accent</span>
      <span class="badge badge-success">Success</span>
      <span class="badge badge-warning">Warning</span>
      <span class="badge badge-danger">Danger</span>
      <span class="badge badge-neutral">Neutral</span>
    </div>
    <div style="display:flex;flex-wrap:wrap;gap:var(--space-2);margin-top:var(--space-3)">
      <span class="tag tag-primary">tag-primary</span>
      <span class="tag tag-accent">tag-accent</span>
    </div>
  </section>

  <section>
    <h2>Tabs</h2>
    <div class="tabs">
      <ul class="tab-list">
        <li><button class="tab active">Overview</button></li>
        <li><button class="tab">Settings</button></li>
        <li><button class="tab">Security</button></li>
      </ul>
      <div class="tab-panel">Tab content goes here.</div>
    </div>
  </section>

  <section>
    <h2>Table</h2>
    <div class="card" style="padding:0;overflow:hidden">
      <table class="table table-hover table-striped">
        <thead><tr><th>Name</th><th>Status</th><th>Role</th></tr></thead>
        <tbody>
          <tr><td>Alice</td><td><span class="badge badge-success">Active</span></td><td>Admin</td></tr>
          <tr><td>Bob</td><td><span class="badge badge-warning">Pending</span></td><td>Editor</td></tr>
          <tr><td>Carol</td><td><span class="badge badge-danger">Banned</span></td><td>Viewer</td></tr>
        </tbody>
      </table>
    </div>
  </section>

  <section>
    <h2>Modal</h2>
    <button class="btn btn-primary" id="open-modal">Open Modal</button>
    <div class="modal-overlay" id="modal" style="display:none">
      <div class="modal-container">
        <div class="modal-header"><h3 class="modal-title">Modal Title</h3><button class="modal-close" data-modal-close>×</button></div>
        <div class="modal-body"><p>This is a modal. The overlay adapts to both themes.</p></div>
        <div class="modal-footer">
          <button class="btn btn-ghost" data-modal-close>Cancel</button>
          <button class="btn btn-primary" data-modal-close>Confirm</button>
        </div>
      </div>
    </div>
  </section>

  <section>
    <h2>Dropdown</h2>
    <div class="dropdown" id="dd1">
      <button class="dropdown-trigger">Options ▾</button>
      <div class="dropdown-menu">
        <button class="dropdown-item active">Edit</button>
        <button class="dropdown-item">Duplicate</button>
        <div class="dropdown-divider"></div>
        <button class="dropdown-item disabled">Delete</button>
      </div>
    </div>
  </section>

  <section>
    <h2>List</h2>
    <ul class="list list-bordered list-hover">
      <li class="list-item"><div class="list-item-title">First item</div><div class="list-item-description">Description text</div></li>
      <li class="list-item"><div class="list-item-title">Second item</div><div class="list-item-description">Description text</div></li>
      <li class="list-item"><div class="list-item-title">Third item</div><div class="list-item-description">Description text</div></li>
    </ul>
  </section>

  <section>
    <h2>Pagination</h2>
    <ul class="pagination">
      <li class="page-item disabled"><a class="page-link" href="#">‹</a></li>
      <li class="page-item active"><a class="page-link" href="#">1</a></li>
      <li class="page-item"><a class="page-link" href="#">2</a></li>
      <li class="page-item"><a class="page-link" href="#">3</a></li>
      <li class="page-item"><a class="page-link" href="#">›</a></li>
    </ul>
  </section>

  <section>
    <h2>Toast</h2>
    <div style="display:flex;gap:var(--space-2)">
      <button class="btn btn-success btn-sm" id="toast-success">Success</button>
      <button class="btn btn-warning btn-sm" id="toast-warning">Warning</button>
      <button class="btn btn-danger btn-sm" id="toast-error">Error</button>
      <button class="btn btn-outline btn-sm" id="toast-info">Info</button>
    </div>
    <div class="toast-container" id="toast-container"></div>
  </section>

  <section>
    <h2>Accordion</h2>
    <div class="accordion">
      <div class="accordion-item" data-open="true">
        <h3 class="accordion-header"><button class="accordion-trigger">Section One</button></h3>
        <div class="accordion-content">Content for section one.</div>
      </div>
      <div class="accordion-item">
        <h3 class="accordion-header"><button class="accordion-trigger">Section Two</button></h3>
        <div class="accordion-content">Content for section two.</div>
      </div>
    </div>
  </section>

  <section>
    <h2>Avatar</h2>
    <div style="display:flex;align-items:center;gap:var(--space-4)">
      <div class="avatar avatar-sm">AB</div>
      <div class="avatar avatar-md">CD</div>
      <div class="avatar avatar-lg">EF</div>
      <div class="avatar-group">
        <div class="avatar avatar-sm">A</div>
        <div class="avatar avatar-sm">B</div>
        <div class="avatar avatar-sm">C</div>
      </div>
    </div>
  </section>

  <section>
    <h2>Progress &amp; Loading</h2>
    <div style="display:flex;flex-direction:column;gap:var(--space-4);max-width:24rem">
      <div class="progress"><div class="progress-bar" style="width:65%"></div></div>
      <div style="display:flex;gap:var(--space-4);align-items:center">
        <div class="spinner"></div>
        <div class="loader"></div>
        <div class="skeleton" style="width:8rem;height:1rem"></div>
      </div>
    </div>
  </section>

  <section>
    <h2>Typography</h2>
    <h1>Heading Level 1</h1>
    <h2>Heading Level 2</h2>
    <h3>Heading Level 3</h3>
    <h4>Heading Level 4</h4>
    <h5>Heading Level 5</h5>
    <h6>Heading Level 6</h6>
    <p>Body text paragraph with <strong>bold</strong>, <em>italic</em>, and <code>inline code</code>. The quick brown fox jumps over the lazy dog. Fluid typography scales smoothly across breakpoints.</p>
    <small>Small text for captions and footnotes.</small>
    <hr>
    <blockquote>A blockquote with italic styling, using the heading font for visual hierarchy.</blockquote>
    <pre><code>const theme = generate(color);
// Mono font for code</code></pre>
    <p>This has <mark>highlighted</mark> text and a <a href="#">link</a> in context.</p>
  </section>

</main>

<script>
function swatch(label, color) {
  return \`<div style="display:flex;align-items:center;gap:var(--space-2)">
    <div style="width:2.5rem;height:2.5rem;border-radius:var(--radius-md);border:1px solid var(--border);background:\${color}"></div>
    <div><div style="font-size:var(--font-size-sm);font-weight:600">\${label}</div><div style="font-size:var(--font-size-xs);color:var(--text-muted)">\${color}</div></div>
  </div>\`;
}
function renderCore(core) {
  const el = document.getElementById('core-swatches');
  if (!el) return;
  el.innerHTML = swatch('Primary', core.primary) + swatch('Accent', core.accent) + swatch('Neutral', core.neutral) + swatch('Contrast', core.contrast);
}
function showToast(type, msg) {
  const c = document.getElementById('toast-container');
  if (!c) return;
  const t = document.createElement('div');
  t.className = 'toast toast-' + type;
  t.innerHTML = '<div style="flex:1"><div class="toast-header">' + type.charAt(0).toUpperCase()+type.slice(1) + '</div><div class="toast-body">' + msg + '</div></div><button class="toast-close">×</button>';
  c.appendChild(t);
  t.querySelector('.toast-close').addEventListener('click', () => t.remove());
  setTimeout(() => t.remove(), 4000);
}
document.addEventListener('DOMContentLoaded', () => {
  const html = document.documentElement;
  const toggle = document.querySelector('[data-theme-toggle]');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const next = html.dataset.theme === 'dark' ? 'light' : 'dark';
      html.dataset.theme = next;
      toggle.textContent = next.charAt(0).toUpperCase() + next.slice(1);
    });
  }
  const modal = document.getElementById('modal');
  const openBtn = document.getElementById('open-modal');
  if (openBtn && modal) {
    openBtn.addEventListener('click', () => modal.style.display = 'flex');
    modal.querySelectorAll('[data-modal-close]').forEach(b => b.addEventListener('click', () => modal.style.display = 'none'));
    modal.addEventListener('click', e => { if (e.target === modal) modal.style.display = 'none' });
  }
  const dd = document.getElementById('dd1');
  if (dd) {
    dd.querySelector('.dropdown-trigger').addEventListener('click', e => { e.stopPropagation(); dd.toggleAttribute('data-open') });
    document.addEventListener('click', () => dd.removeAttribute('data-open'));
  }
  document.querySelectorAll('.accordion-trigger').forEach(t => {
    t.addEventListener('click', () => {
      const item = t.closest('.accordion-item');
      item.toggleAttribute('data-open');
    });
  });
  document.getElementById('toast-success').addEventListener('click', () => showToast('success', 'Saved successfully.'));
  document.getElementById('toast-warning').addEventListener('click', () => showToast('warning', 'Check your input.'));
  document.getElementById('toast-error').addEventListener('click', () => showToast('error', 'Something failed.'));
  document.getElementById('toast-info').addEventListener('click', () => showToast('info', 'Information message.'));
  document.getElementById('copy-css-btn').addEventListener('click', async () => {
    const css = document.getElementById('theme-css').textContent;
    await navigator.clipboard.writeText(css);
    showToast('success', 'CSS copied to clipboard.');
  });
  window.__renderCore = renderCore;
  window.__showToast = showToast;
});
</script>
</body>
</html>`;