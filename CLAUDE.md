# CLAUDE.md

本文件用于向 Claude Code 提供本项目的上下文指引。

## 项目简介

`swagger-to-apis` 是一个将 Swagger / OpenAPI 文档自动转换为 TypeScript API 调用代码的命令行工具。

- 入口: `src/index.ts`
- 主导出: `swaggerToApis(option)` 与 `transformSwagger(doc, output)`
- 当前支持 OpenAPI v2 与 v3.0 (v3.1 暂未支持, 会抛错)
- 输出物: 一套基于 `axios` 的 `apis/` 目录, 包含 `http.ts`, `api.api.ts`, `api.d.ts`, `swagger/swagger.api.ts`, `swagger/swagger.d.ts` 等

## 常用命令

```bash
# 开发模式 (ts-node-dev 热重载)
npm run dev

# 调试运行 (跑 test/index.ts 中配置的 url)
npm run test:start

# 完整构建 (eslint + prettier + tsc + 拷贝模板)
npm run build

# 单元测试
npm test

# 仅代码风格修复
npm run eslint
npm run prettier
```

构建产物输出到 `lib/`, `cpTem.ts` 会把 `src/template` 拷贝到 `lib/template` (模板是 `.md` 文件, tsc 不会处理)。

## 架构概览

整体是 "解析 -> 转换 -> 模板渲染 -> prettier 格式化 -> 写文件" 的流水线。

### 1. 入口与版本检测
- `src/index.ts`: 主流程编排, 定义 prettier 配置
- `src/utils/detectDocumentVersion.ts`: 通过 `swagger` / `openapi` 字段判断文档版本, 走对应转换器
- `src/fetchs.ts`: 通过 `node-fetch` 拉取远程文档

### 2. 转换层 (核心)

```
src/transfer/
├── transformV2.ts        # v2 入口 (使用 doc.definitions + doc.paths + basePath)
├── transformV3.ts        # v3 入口 (使用 doc.components.schemas + doc.paths)
├── transformV3_1.ts      # 占位, 当前不支持
├── v2/                   # v2 专用: transferPathInfo / transferParameters / transferResponse / transferDefinitionsObject / utils
└── v3/                   # v3 专用: transferPathInfo / transferParameters / transferRequestBody / transferResponse / transferComponentsSchemas / utils
```

- v2 和 v3 各有一套相似的子模块, **不要混用** (类型定义不同, `OpenAPIV2` vs `OpenAPIV3`)
- 命名空间 (namespace): v2 默认 `SwaggerV2`, v3 默认 `SwaggerV3`, 对应 `SwaggerV2Api` / `SwaggerV3Api` 两个 class

### 3. 模板层

```
src/template/
├── api.api.md            # 主入口 Api 对象
├── api.d.ts.md           # Api 命名空间 (含 Response<T>, Error)
├── http.ts.md            # axios 封装的 Http 基类
├── index.ts.md
├── type.ts.md            # ResponseCode 枚举
├── util.ts.md            # isSuccess 工具
└── tag/
    ├── swagger.md        # XxxApi class 骨架
    ├── request.md        # 单个请求方法模板
    └── type.md           # namespace 骨架
```

模板渲染由 `src/utils/createTem.ts` 的 `Template` 类完成, **占位符规则: `$key` 形式** (例如 `$method`, `$handle`, `$body`), 通过正则全局替换。模板用 ` ```ts ` 包裹的代码块, 渲染前会被去掉。

### 4. 写文件

- `src/utils/saveTem.ts`: 写文件, 默认 `replace: true` 覆盖; 初始化文件 (`api.api.ts`, `http.ts` 等) 用 `replace: false` 仅在不存在时写入, 避免覆盖用户改动
- `src/utils/initTransferTem.ts`: 在转换前写入所有 "骨架文件"

### 5. 工具函数

- `src/utils/transfer.ts`: 路径与 schema 转换核心工具 (`transferPathToVar`, `transferPathParse`, `transferSchemaToType`, `refToInterface`, `getNamespaceRef`, `checkPathIncludeParams`, `formatPathParams`)
- `src/utils/tools.ts`: `checkValidVariableName` 校验变量名合法性
- `src/utils/createTem.ts`: 模板渲染类 `Template`, 用 `$key` 占位符替换
- `src/utils/saveTem.ts`: 异步写文件 (`fs.promises.writeFile`), 调用方需 await
- `src/utils/initTransferTem.ts`: 首次写入 6 个骨架文件 (replace: false), 用 `Promise.all` 并发
- `src/utils/detectDocumentVersion.ts`: 版本检测, `isV3Document` 保留原始语义 (major === '3'), 由 dispatcher 决定优先级

## 关键约定

### 代码风格
- TypeScript CommonJS (`"type": "commonjs"`)
- 模块导入使用 TypeScript 的 `import = require()` 语法 (例如 `import fs = require('fs')`, `import fetch = require('node-fetch')`)
- prettier 配置统一 (源码与生成产物同一套): `printWidth: 100`, `trailingComma: 'none'`, `arrowParens: 'avoid'`, `singleQuote: true`, `semi: true`
  - 源码格式化配置: `.prettierrc.js`
  - 运行时格式化配置: `src/index.ts` 的 `prettierConfig` (字段更精简, 默认值与 `.prettierrc.js` 对齐)
- ESLint 使用 `@typescript-eslint/recommended`, `@typescript-eslint/no-explicit-any` 设为 warn

### 输出文件结构

用户调用 `swaggerToApis({ output: './src' })` 后, 在 `./src/apis/` 下生成:

```
apis/
├── api.api.ts                  # 主入口 (只生成一次)
├── api.d.ts                    # Api 命名空间 (只生成一次, 用户可改 Response<T>)
├── http.ts                     # Http 基类 (只生成一次, 用户可改 baseURL)
├── index.ts
├── type.ts
├── util.ts                     # isSuccess
└── swagger/
    ├── swagger.api.ts          # 每次重新生成
    └── swagger.d.ts            # 每次重新生成
```

### 参数解析规则

`transferParameters` (v2/v3 各一份) 的核心逻辑:
1. 检查所有参数是否合法变量名 (`checkValidVariableName`)
2. 参数 <= 2 个且全部合法: 直接展开为形参, 如 `get_pet(id: number, name?: string)`
3. 参数 > 2 个或存在非法变量名: 包成一个 `params` 对象
4. v2 中如果 schema 是 `$ref`, 形参会用解构 (`...name`)
5. `in: 'path'` 的参数会被插入到 URL 模板字符串中

### 类型解析规则

- `$ref` 解析: `#/definitions/Foo` 或 `#/components/schemas/Foo` 取最后一段, 转为 PascalCase, 连字符 `-` 替换为下划线 `_`
- integer -> number
- file -> FormData
- array -> `${itemType}[]`
- enum -> 字符串字面量联合类型 `"a" | "b"`
- additionalProperties (Map 类型) -> `Record<string, T>`

### API 响应外层包装

`api.d.ts` 默认假设接口有外层包装:
```ts
interface Response<T> {
  code: number;
  msg: string;
  message: string;
  data: T;
}
```
用户可改为 `type Response<T> = T;` 适配无包装接口。`isSuccess` 默认判断 `code === 0`。

## 调试与测试

- 单测位于 `src/utils/test/` 与 `src/transfer/test/`, 使用 `jest` + `ts-jest`
- `src/testdata.json`: 调试用的大体量真实 swagger 数据
- 本地手测可改 `test/index.ts` 中的 url + output, 然后 `npm run test:start`
- 已有输出样例: `output-v2-apis/` 和 `output-v3-apis/`

## 注意事项

1. **v3.1 暂不支持**, `transformSwagger` 的 dispatcher 中 `isV31Document` 检查在 `isV3Document` 之前, 命中后抛 `OpenAPI V3.1 is not yet supported`。每个版本检测谓词只描述自己的版本, 由 dispatcher 决定优先级
2. 模板文件 (`src/template/*.md`) 改动后, 需要重新 `npm run build` 才会拷贝到 `lib/template`
3. `initTransferTem` 写入的 6 个骨架文件都是 `replace: false`, 即首次写入后用户改动会被保留; 但 `swagger.api.ts` 和 `swagger.d.ts` 每次都覆盖
4. `saveTem` 用 `fs.promises.writeFile`, 是真异步。`replace: false` 且文件已存在时静默跳过 (预期行为, 非错误)。调用方应 `await` 以正确传播写失败
5. `prepare` 脚本会自动 `husky install && npm run build`, 安装依赖时会触发
6. `prepublishOnly` 只跑 eslint + version, 不会跑测试, 发版前请手动 `npm test`
7. 不要把 `examples/` 下两个 vite 项目的依赖变更混入主库 PR
