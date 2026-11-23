# Playwright TypeScript Automation Framework

A sample test automation framework built with [Playwright](https://playwright.dev/) and TypeScript. It runs UI tests against the [OrangeHRM demo site](https://opensource-demo.orangehrmlive.com) and API tests against a public REST API.

The same "Add Employee" scenario is written three ways so you can compare approaches:

1. **Plain test**: locators inline in the spec (`addEmployee.spec.ts`)
2. **Page Object Model**: page classes instantiated in the test (`addEmployeeWithPageObjectMode.spec.ts`)
3. **Page Object Model + custom fixtures**: page objects injected through Playwright fixtures (`addEmployeeWithPageObjectModelWithCustomFixture.spec.ts`)

Tooling: ESLint (with `eslint-plugin-playwright`) for linting, Prettier for formatting, Husky for pre-commit checks, and `@faker-js/faker` for random test data.

## Project structure

```
e2e/
├── fixtures/
│   └── customFixtures.ts        # Extends Playwright `test` with page-object fixtures
├── frameworkConfig/
│   └── env.ts                   # Reads URL / USERNAME / PASSWORD from environment
├── pages/                       # Page objects
│   ├── components/              # Reusable components (left menu, top menu)
│   ├── addEmployeePage.ts
│   ├── homePage.ts
│   └── loginPage.ts
├── testdata/
│   ├── orangeHrmInterfaces.ts   # Test data types
│   └── random.ts                # Faker-based data generators
└── tests/
    ├── api/                     # API tests
    └── ui/                      # UI tests
```

TypeScript path aliases (defined in `tsconfig.json`):

- `@e2e/*` → `./e2e/*`
- `@pages/*` → `./e2e/pages/*`

## Setup

**Install dependencies:**

```bash
npm install
```

This also sets up the Husky git hooks via the `prepare` script.

**Install Playwright browsers:**

```bash
npx playwright install --with-deps chromium webkit
```

Re-run this after upgrading `@playwright/test`, since each version needs its own browser builds.

## Environment variables

UI tests read their target URL and credentials from a `.env` file in the project root:

```bash
URL=https://opensource-demo.orangehrmlive.com
USERNAME=<username>
PASSWORD=<password>
```

To use a different environment, create `.env.<name>` and set `ENVIRONMENT`. For example, to load `.env.staging`:

```bash
ENVIRONMENT=staging npx playwright test
```

## Running tests

| Command                 | What it runs                              |
| ----------------------- | ----------------------------------------- |
| `npm run test`          | All projects, headed                      |
| `npm run test:headless` | All projects, headless                    |
| `npm run test:chrome`   | Chromium project (UI + API tests), headed |
| `npm run test:webkit`   | WebKit project (UI tests only), headed    |
| `npm run test:api`      | API tests only                            |

Playwright projects (see `playwright.config.ts`):

- **chromium**: Desktop Chrome, runs everything under `e2e/tests`
- **webkit**: Desktop Safari, runs `e2e/tests/ui`
- **api**: no browser, runs `e2e/tests/api`

**View the HTML report** after a run:

```bash
npx playwright show-report
```

## Code quality

```bash
npm run lint         # ESLint check
npm run lint:fix     # ESLint auto-fix
npm run format       # Prettier check
npm run format:fix   # Prettier auto-fix
```

The Husky pre-commit hook runs `npm run lint && npm run format`, so a commit is blocked if either check fails.

## CI

GitHub Actions (`.github/workflows/playwright.yml`) runs on pull requests to `main` and on manual dispatch:

- **ui-test**: matrix over `chromium` and `webkit`
- **api-test**: the `api` project

Each job uploads its `playwright-report/` as an artifact, kept for 3 days. On CI, tests retry up to 2 times and `test.only` is forbidden.
