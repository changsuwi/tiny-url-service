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

### How to use
1. visit [Tiny URL Generator](https://tiny-url-service.vercel.app/)
2. copy a valid url and paste into the textbox
3. click the "Generate" button
4. you can see the tiny url 


### Deployment

This project is hosted on [Vercel](https://vercel.com/) and can be accessed at https://tiny-url-service.vercel.app/.

### Auto End-To-End Testing

This project uses GitHub Actions to automate e2e testing after successful deployment.

### ORM

This project uses [Prisma](https://www.prisma.io/) to access PostgreSQL in in [Supabase](https://app.supabase.com/). The `schema.prisma` file defines the database schema

### Fulfilled Requirements

- [x] 專案需要使用 Git 管理專案，並公開至 GitHub
- [x] Git commit 訊息需符合 Conventional Commits，並使用英文撰寫
- [x] 專案須包含 README.md，其中描述專案的安裝、建置、使用，包含的功能與操作方式
- [x] 前端使用 React.js 16 以上實作整個頁面與元件
- [x] 後端使用 Node.js 14 以上
- [x] 使用者可以填入一段網址，會產生一段短網址
- [x] 使用者可以瀏覽短網址，服務會將短網址重新導向到原始網址
- [x] 使用 TypeScript 4.3 以上實作
- [x] 後端使用任一套 ORM 搭配任一套 RDBMS
- [x] 整個 React App 使用 Functional Component
- [x] 使用套件檢查程式碼風格 (例如：JavaScript Standard、ESLint)
- [x] 專案需要能被公開瀏覽使用 (例如使用 Heroku)
- [x] 單元測試
- [x] E2E 測試
- [ ] 開發時全程使用 TDD
- [x] 整合 CI/CD 流程
- [x] 需要驗證網址有效
- [ ] 使用者可以使用密碼註冊、登入、登出
- [ ] 使用者可以新增、建立、更新、刪除多個短網址
- [ ] 短網址重新導向的過程使用快取 (可暫時避免向資料庫查詢)
- [ ] 使用者可以知道短網址瀏覽次數
- [x] 服務會避免短網址重複重導向到相同網址
- [ ] 從短網址拿到原始網址的 Open Graph Metadata （標題、描述、圖片）
- [ ] 使用者可以自訂 Open Graph Metadata（標題、描述、圖片）

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

