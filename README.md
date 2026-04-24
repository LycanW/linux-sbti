# LSB-TI · Linux 发行版刻板印象测验

仿 MBTI 结构的 Linux 发行版娱乐测验——纯前端，无后端，无科学依据，只有 meme 与自嘲。

## 怎么玩

30 道选择题覆盖 15 个维度（更新哲学、桌面政治、折腾能量、企业气质……），每维 L/M/H 三档打分。答题完成后与 20 种发行版原型的「刻板印象向量」做曼哈顿距离匹配，返回最接近的发行版人格。

## 本地预览

纯静态文件，任意 HTTP 服务即可：

```bash
python -m http.server 8000
# 浏览器打开 http://localhost:8000
```

## Docker 部署

```bash
docker build -t linux-sbti .
docker run -d --restart=unless-stopped -p 8080:80 --name linux-sbti linux-sbti
```

## 裸机 Nginx 部署

1. 将 `index.html`、`app.js`、`style.css`、`assets/sprites/` 复制到 `/var/www/linux-sbti/`
2. 配置 Nginx（参考 `deploy/nginx-default.conf`）
3. `nginx -t && systemctl reload nginx`

## 项目结构

```
.
├── index.html          # 入口 HTML
├── app.js              # 题库、计分、匹配逻辑、DOM 渲染
├── style.css           # 暗色主题样式
├── assets/sprites/     # 21 张发行版小人立绘（PNG）
├── Dockerfile          # Nginx 容器化
└── deploy/
    ├── nginx-default.conf  # Nginx 配置模板
    └── README.md           # 部署详细说明
```

## 工作原理

- **题库**：15 维 × 每维 2 题，每题 1–3 分，维度总分 2–6 映射为 L/M/H
- **匹配**：将 15 维 L/M/H 转为数值向量，与 20 种发行版原型向量计算曼哈顿距离，距离最小者胜
- **彩蛋**：Steam/掌机相关回答触发 SteamOS 强制接管；匹配度低于 60% 则兜底为「发行版流浪汉」
- **立绘**：16Personalities 式几何低多边形风格 PNG，图片加载失败自动降级为 emoji

## 免责声明

仅供娱乐，请勿用于发行版选型、技术鄙视链、相亲或职业规划。与任何发行版官方立场无关。
