// Edit this collection to add real projects and their website / repository links.
const projects = [
  { id: 'spread', title: 'Can BTC Calendar Spread Arbitrage Make a Profit?', category: 'research', label: 'QUANT RESEARCH / CRYPTO DERIVATIVES', description: 'An interactive investigation of Bitcoin futures price differences, from matched trade observations to a planned execution-aware backtest.', tags: ['Market data', 'JavaScript', 'Plotly'], icon: '\u2197', iconClass: '', featured: true, status: 'Research in progress', website: 'https://ponlawatsanjan.github.io/can-btc-calendar-spread-arbitrage-make-a-profit/', repository: 'https://github.com/ponlawatsanjan/can-btc-calendar-spread-arbitrage-make-a-profit', notes: 'Explore the matching method and an interactive chart of real trade-based spreads across 25 Bitcoin futures expiry pairs. The presentation uses saved observations and supports zoom, hover details, date selection and pair visibility.', notice: 'The raw spread chart uses real trade observations. Data-cleaning and backtest pages are illustrative drafts; profitability has not been established.' },
  { id: 'portfolio', title: 'Personal Portfolio', category: 'engineering', label: 'WEB DEVELOPMENT / PERSONAL PROJECT', description: 'A home for my work, ideas, and the source code behind each project.', tags: ['HTML', 'CSS', 'JavaScript'], icon: '</>', iconClass: 'portfolio-icon', featured: false, status: 'Local preview', website: null, repository: 'https://github.com/ponlawatsanjan/Portfolio', notes: 'A responsive personal website that connects my profile with my projects. Search the directory by name or technology, explore project notes, and follow links to project websites and source repositories.', notice: 'You are viewing the local design preview. The source repository is connected; the website has not been published yet.' },
  { id: 'automation', title: 'Automation & Data Workflows', category: 'automation', label: 'AUTOMATION / EXAMPLE ENTRY', description: 'A place for tools that connect data, APIs, and repeatable workflows.', tags: ['Python', 'APIs', 'Data'], icon: '⌘', iconClass: 'automation-icon', featured: false, status: 'Example entry', website: null, repository: null, notes: 'This example demonstrates how another project will appear in the directory. Replace it with a real automation project, its description, technologies, and links when you are ready.', notice: 'Design example only. This is not a claim of a completed project.' }
];
const search = document.querySelector('#search');

const list = document.querySelector('#project-list');
const dialog = document.querySelector('#project-dialog');
let activeFilter = 'all';
const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const safeUrl = value => { try { const url = new URL(value); return url.protocol === 'https:' ? escapeHtml(url.href) : null; } catch { return null; } };
const link = (url, label, css = 'repo-link') => safeUrl(url) ? `<a class="${css}" href="${safeUrl(url)}" target="_blank" rel="noopener noreferrer">${label} ↗</a>` : '';
function render() {
  const query = search.value.trim().toLowerCase();
  const visible = projects.filter(project => (activeFilter === 'all' || project.category === activeFilter) && `${project.title} ${project.description} ${project.tags.join(' ')}`.toLowerCase().includes(query));
  list.innerHTML = visible.map(project => `<article class="project-row ${project.featured ? 'featured' : ''}"><div class="project-info"><div class="project-icon ${project.iconClass}" aria-hidden="true">${escapeHtml(project.icon)}</div><div><div class="project-kicker">${escapeHtml(project.label)}</div><h3>${escapeHtml(project.title)}</h3><p class="project-description">${escapeHtml(project.description)}</p></div></div><div class="stack" aria-label="Technologies">${project.tags.map(tag => `<span>${escapeHtml(tag)}</span>`).join('')}</div><div class="project-actions"><button class="details-button" data-project="${project.id}" aria-label="View details of ${escapeHtml(project.title)}">Read more ↗</button>${link(project.website, 'Website')}${link(project.repository, 'GitHub')}<span class="draft-badge">${escapeHtml(project.status)}</span></div></article>`).join('');
  document.querySelector('#empty-state').hidden = visible.length > 0;
  document.querySelector('#result-count').textContent = `${visible.length} of ${projects.length} project entries`;
}
document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
  activeFilter = button.dataset.filter;
  document.querySelectorAll('.filter').forEach(filter => { const selected = filter === button; filter.classList.toggle('selected', selected); filter.setAttribute('aria-pressed', String(selected)); });
  render();
}));
search.addEventListener('input', render);

document.querySelector('#reset').addEventListener('click', () => { search.value = ''; document.querySelector('[data-filter="all"]').click(); search.focus(); });
list.addEventListener('click', event => {
  const button = event.target.closest('[data-project]');
  if (!button) return;
  const project = projects.find(item => item.id === button.dataset.project);
  document.querySelector('#dialog-content').innerHTML = `<h2 id="dialog-title">${escapeHtml(project.title)}</h2><div class="stack dialog-tags">${project.tags.map(tag => `<span>${escapeHtml(tag)}</span>`).join('')}</div><p>${escapeHtml(project.notes)}</p><div class="dialog-status">${escapeHtml(project.notice)}</div><div class="dialog-links">${link(project.website, 'View website', 'button primary')}${link(project.repository, 'View GitHub', 'button')}</div>`;
  dialog.showModal();
});
document.querySelector('#close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { const rect = dialog.getBoundingClientRect(); if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close(); });
document.addEventListener('keydown', event => { if (event.key === '/' && !dialog.open && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName) && !document.activeElement.isContentEditable) { event.preventDefault(); search.focus(); } });
document.querySelector('#year').textContent = new Date().getFullYear();
render();
