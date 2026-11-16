# RONGHE 融合堂 — VR Demo Archive

一个纯静态网站，放着两段 VR 演示录屏，老师打开链接就能直接在线观看（无需下载、无需登录）。
没有任何依赖：没有构建步骤、没有框架、没有外链字体，三个文件即可运行。

```
ronghe-vr-site/
├── index.html              页面结构 + 中英双语文案
├── styles.css              全部样式
├── app.js                  中英切换 / 单视频播放 / 滚动动画
└── assets/video/
    ├── demo-01.mp4         5:00 · 1920×1170 · H.264
    ├── demo-02.mp4         5:16 · 1920×1170 · H.264
    ├── poster-01.jpg       封面（播放前显示）
    └── poster-02.jpg
```

## 本地预览

直接双击 `index.html` 即可。想在手机上试，在本目录运行：

```bash
python -m http.server 8000
```

然后同一 WiFi 下用手机访问 `http://电脑IP:8000`。

## 发布到 GitHub Pages

1. 在 GitHub 上新建仓库，名字随意，例如 `ronghe-vr-demo`，选择 **Public**（免费版 Pages 要求公开仓库）。
2. 在本目录执行：

```bash
git init -b main
git add .
git commit -m "RONGHE VR demo archive"
git remote add origin https://github.com/<你的用户名>/ronghe-vr-demo.git
git push -u origin main
```

3. 仓库页面 → **Settings → Pages** → Source 选 **Deploy from a branch** → 分支 `main`、目录 `/ (root)` → Save。
4. 等 1–3 分钟，链接就是：

```
https://<你的用户名>.github.io/ronghe-vr-demo/
```

发邮件时把这一行连同"请点开链接观看"一起给老师即可。

## 改文案

页面里所有文字都成对写在标签上，改的时候两个都改：

```html
<h2><span data-en="English text" data-zh="中文">English text</span></h2>
```

中文模式下取 `data-zh`，英文模式取 `data-en`，标签内的正文只是无 JS 时的兜底。
想给老师默认看英文？把 `<html lang="en" data-lang="en">` 保持不动即可 —— 浏览器是中文时会自动显示中文，
也可以在链接后面加 `?lang=en` 强制英文，例如 `.../ronghe-vr-demo/?lang=en`。

标题、副标题、三条要点（`.notes li`）、邮箱都在 `index.html` 里，按关键词搜就能找到。

## 换视频

把新文件覆盖 `assets/video/demo-01.mp4`（或 `demo-02.mp4`）即可，**文件名不变**就不用改 HTML。
注意 GitHub 单文件硬上限 100 MB，超过就传不上去。当前两段已经压过：`demo-01` 约 75 MB、`demo-02` 约 80 MB。

封面图同理：覆盖 `poster-01.jpg` / `poster-02.jpg`（建议 1920px 宽，横向）。

## 说明

- 录像原始文件是 2528×1440 的 Unity 编辑器录屏；这里裁掉了编辑器面板，只保留 Game 视图，并压到 1080p 以便网页流畅播放。
- 两段视频都是 Progressive MP4 + faststart，支持边下边播和拖动进度条。
- 页面加了 `noindex`，不会被搜索引擎收录；但仓库是公开的，知道链接的人都能看。
