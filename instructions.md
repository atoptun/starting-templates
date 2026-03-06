# The starting template for Vite + Vanilla JS + SAAS projects

Create and clone new repository.

```bash
git clone project_repo
cd project_folder
```

Run a command in project folder

```bash
npx degit https://github.com/atoptun/starting-templates#js/vite-vanilla-saas . --force
```

## After degit

1. .github/workflows/deploy.yml -- change before commit (read comments)
2. package-lock.json -- delete
3. package.json -- change project name, check dependencies
4. vite.config.js -- change `base: '/starting-templates/',`
5. Install packages

   ```bash
   npm install
   ```

6. Check updates

   ```bash
   npm outdated

   npx npm-check -u

   npx npm-check-updates -u
   ```

## Deploy Github pages

Github Setting

### Actions - General

Workflow permissions:

- Read and write permissions - select
- Allow GitHub Actions to create and approve pull requests - check

### Pages

Branch - gh-pages
