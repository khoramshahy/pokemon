Hello and greetings. :))
I am Shirin and I hope you're doing well.

I assume that I am a frontend developer at your company, and I am assigned this ticket to develop the pokemon list page.
The main branch is the base code and I created a separate branch named 'feat/pokemon' and raised the PR.

Here is a brief explanation of how the project is structured:

| Folder       | Description                                                                                                                      |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| `apis`       | Contains base API configuration and common endpoint calls.                                                                       |
| `components` | Includes reusable UI components and their subcomponents.                                                                         |
| `pages`      | Defines SSR\*\* pokemon list page here.                                                                                          |
| `stores`     | I installed Zustand as a store for managing items on each page -- currently it is only used in the paginated table on the modal. |
| `libs`       | Includes reusable common components, and translation(considering multi-language support in the future), global TypeScript types. |

\*\* since I am using the new version of Nextjs, async function in page component replaces the older getServerSideProps and has the same SSR functionality.

This is a [Next.js](https://nextjs.org) project

## Getting Started

First install dependencies:

```bash
npm install
# or
yarn
```

Second, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## To do

- Set up Zod and define schemas to enture type safty
- Support multi language
- Add more test to have a good test coverage
- Work more on the desing
- Do some refactoring
- Implement lazy loading or code splitting for performance optimization
- Set up ESLint + Prettier for consistent code formatting and linting
- Integrate CI/CD pipelines for automated builds and tests
- Add environment variable support via .env for API URLs and other configs
- Improve accessibility (a11y) of components (ARIA roles, keyboard navigation, etc.)
- ...
