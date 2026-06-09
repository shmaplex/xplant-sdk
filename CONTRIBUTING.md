# Contributing to @shmaplex/xplant-sdk

Thank you for your interest in contributing!

## Development setup

```bash
git clone https://github.com/shmaplex/xplant-sdk.git
cd xplant-sdk
npm install
npm run build
npm test
```

## Making changes

1. Fork the repo and create a branch: `git checkout -b fix/your-fix`
2. Make your changes in `src/`
3. Run `npm run typecheck && npm test && npm run build` — all must pass
4. Submit a pull request against `main`

## Adding a new resource

1. Create `src/resources/your-resource.ts`
2. Export a class `YourResource` with methods that call `this.request<T>(...)`
3. Add a getter to `XPlantClient` in `src/client.ts`
4. Export it from `src/index.ts`
5. Add the type shapes to `src/types.ts`
6. Add a test in `src/resources/your-resource.test.ts`

## Publishing (maintainers only)

Releases are automated via GitHub Actions. To publish a new version:

1. Update `CHANGELOG.md`
2. Bump `version` in `package.json`
3. Commit: `git commit -m "chore: release v0.x.x"`
4. Tag: `git tag v0.x.x && git push origin v0.x.x`

The `publish.yml` workflow will build, test, and `npm publish` automatically.

## Required secret

The publish workflow reads `NPM_TOKEN` from GitHub repository secrets.
This is an npm **Automation** token scoped to the `@shmaplex` org.
Maintainers: add it at **Settings → Secrets and variables → Actions**.
