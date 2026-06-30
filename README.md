# 发哥沙龙运营中枢 Demo

纯前端 React + Vite Demo，用于展示可定制的理发店预约与门店运营系统。

## 本地运行

```bash
npm install
npm run dev
```

默认访问：

```text
http://localhost:5173
```

## 生产构建

```bash
npm run build
```

构建产物位于 `dist/`。

## 快速部署

推荐 Vercel：

1. 推送到 GitHub。
2. 在 Vercel 导入仓库。
3. Framework Preset 选择 `Vite`。
4. Build Command 使用 `npm run build`。
5. Output Directory 使用 `dist`。

也可使用 Netlify：

1. 推送到 GitHub。
2. 在 Netlify 导入仓库。
3. Build Command 使用 `npm run build`。
4. Publish Directory 使用 `dist`。
