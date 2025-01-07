# 项目介绍

一个自用的模板项目, 用于快速搭建一个功能较为完善的 vue 项目,
不用每次都去安装配置一堆依赖包, 主要包含一些常用的配置比如 axios/tailwind/msw/vitest 等

![language](https://img.shields.io/badge/language-中文-blue)
![license](https://img.shields.io/badge/license-mit-green)
![vue](https://img.shields.io/badge/framework-vue-52A677)
![ui](https://img.shields.io/badge/ui-tailwindcss-59B3F2)
![http](https://img.shields.io/badge/http-axios-612ED5)
![validation](https://img.shields.io/badge/validation-zod-2C4474)
![vitest](https://img.shields.io/badge/test-vitest-F1C040)
![msw](https://img.shields.io/badge/mock-msw-ff6a33)

## 项目结构

```txt
.
├── LICENSE
├── README.md
├── biome.json                          # biome 配置文件
├── index.html
├── mockServiceWorker.js
├── package.json
├── pnpm-lock.yaml
├── postcss.config.js
├── public
│   └── vite.svg
├── src
│   ├── App.vue                          # 根组件
│   ├── Layout.vue                       # 布局组件
│   ├── __mocks__                        # 模拟数据
│   │   ├── handlers.js
│   │   └── server.js
│   ├── __tests__
│   │   ├── helpers.js
│   │   └── setup.js
│   ├── api                              # 接口请求
│   │   ├── auth.js
│   │   ├── index.js
│   │   └── mappers
│   │       └── login.js
│   ├── hooks                             # 自定义 hooks
│   │   ├── __tests__
│   │   │   └── resettableReactive.spec.js
│   │   ├── goto.js
│   │   ├── index.js
│   │   └── resettableReactive.js
│   ├── main.js
│   ├── pages
│   │   ├── Home.vue
│   │   └── Login.vue
│   ├── router                            # 路由
│   │   ├── __tests__
│   │   │   └── router.spec.js
│   │   ├── guards.js                     # 路由守卫
│   │   ├── index.js                      # 路由入口
│   │   └── routes.js                     # 路由配置
│   ├── store                             # 状态管理
│   │   ├── __tests__
│   │   │   └── auth.spec.js
│   │   ├── auth.js
│   │   └── index.js
│   ├── style.css
│   ├── tools
│   │   ├── __tests__
│   │   │   ├── http.spec.js
│   │   │   └── token.spec.js
│   │   ├── http                          # axios 实例
│   │   │   ├── httpErrorHandler.js       # 自定义请求错误处理
│   │   │   └── index.js
│   │   ├── index.js
│   │   └── token.js
│   └── validation                        # 数据验证
│       ├── index.js
│       └── rules                         # 验证规则
│           └── login.js
├── tailwind.config.js
└── vite.config.js

19 directories, 43 files
```

## 快速启动

```sh
git clone https://github.com/lh5template/vuejs-with-vitest ./demo
cd ./demo
pnpm install
npm run dev
# visit http://localhost:8080
```
