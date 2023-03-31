# Tiny URL Service

Tiny URL Service is a web application that generates short URLs from long ones. It's built with [Next.js](https://nextjs.org/) and [TypeScript](https://www.typescriptlang.org/) and uses [Cypress.io](https://www.cypress.io/) for end-to-end testing. The project also incorporates [eslint](https://eslint.org/) for code linting and [Jest](https://jestjs.io/) for unit testing. 

## Getting Started

### Prerequisites

Node.js (v14 or later)

### Installing

To get a development environment up and running, follow these steps:

#### Clone the repo: 
   `git clone https://github.com/changsuwi/tiny-url-service.git`
#### Install dependencies: 
   
   `npm install`
   
   `yarn`

#### Start the development server: 

`npm run dev`

`yarn dev`

### Running Tests

To run the Cypress end-to-end tests, execute the following command:

`npm run cypress` 

`yarn cypress`


To run Jest unit tests, execute the following command:

`npm run test`

`yarn test`



### Deployment

This project is hosted on [Vercel](https://vercel.com/) and can be accessed at https://tiny-url-service.vercel.app/.

### Auto End-To-End Testing

This project uses GitHub Actions to automate e2e testing after successful deployment.

### ORM

This project uses [Prisma](https://www.prisma.io/) to access PostgreSQL in in [Supabase](https://app.supabase.com/). The `schema.prisma` file defines the database schema

## Built With

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [ESLint](https://eslint.org/)
- [Cypress.io](https://www.cypress.io/)
- [Jest](https://jestjs.io/)
- [Prisma](https://www.prisma.io/)
- [husky](https://typicode.github.io/husky/#/)
- [Supabase](https://app.supabase.com/)

