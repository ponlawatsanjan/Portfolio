# Ponlawat Sanjan — Portfolio

A simple local portfolio with a dark navy and blue theme, readable typography, searchable projects, and links to project websites and GitHub repositories.

## Preview on Windows

From this folder, run `npm run dev`, then open http://127.0.0.1:5173. Node.js is the only requirement; the website itself has no package dependencies. You can also open `index.html` directly.

## Files

- `index.html`: introduction, project directory, about, and contact sections.
- `style.css`: responsive layout and theme.
- `app.js`: project data, live search, category filters, and project details.
- `assets/`: favicon and locally hosted Space Mono font (SIL Open Font License).
- `preview-server.cjs`: local development server; not required by GitHub Pages.

## Add a project

Edit the `projects` array in `app.js`. Each entry accepts a title, category, description, tags, notes, `website`, and `repository`. Use HTTPS links or `null` when there is no link. Website and GitHub links appear only when their links are present. Visitors can search or filter the project cards by category.

The calendar spread entry links to the live research presentation and its GitHub repository. Its backtesting stage is still in progress. The automation entry is explicitly an example. No job history, contact email, or project results have been invented.

## Publication

Source repository: https://github.com/ponlawatsanjan/Portfolio. The portfolio has not yet been deployed. The files use relative asset paths so they can later be served at `/Portfolio/` on GitHub Pages.
