# Mineradio AI Handoff

这个文件给后续接管本工作区的 AI 使用。当前项目已经从上游 fork 独立出来，在本机 macOS 环境里从 `v1.0.0` 重新起步；不要再按旧 Windows `resources/app` 路径处理。

## 当前权威入口（2026-07-02）

- 当前本机真实代码/Git 仓库：`/Users/lvsp/web/Mineradio`
- 当前工作分支：`main`
- 当前 fork 远端：`origin git@github.com:lvshp/Mineradio.git`
- 上游参考远端：`upstream git@github.com:XxHuberrr/Mineradio.git`
- 当前源码版本：`v1.0.0`
- 当前 Release：`https://github.com/lvshp/Mineradio/releases/tag/v1.0.0`
- 当前 release workflow：`.github/workflows/release.yml`
- 当前本地服务默认启动命令：`PORT=3100 HOST=127.0.0.1 node server.js`
- 当前本地访问地址：`http://127.0.0.1:3100`
- Navidrome 本机配置文件：`.navidrome.json`，已加入 `.gitignore`，不要提交。
- 运行缓存目录：`D:\MineradioCache\beatmaps`，在 macOS 工作区里会表现成带反斜杠字符的目录名，已用 `D:*` 忽略，不要提交。

新对话开始处理 Mineradio 时，先确认：

```bash
pwd
git status --short --branch
git remote -v
node -p "require('./package.json').version"
```

然后读：

- `AGENTS.md`
- `docs/PROJECT_MEMORY.md`
- 涉及玻璃 SVG 质感时读 `docs/GLASS_SVG_TEXTURE.md`
- 涉及发布时读 `CHANGELOG.md`、`RELEASE.md`、`package.json`、`.github/workflows/release.yml`

注意：`AGENTS.md` 和 `docs/PROJECT_MEMORY.md` 里仍有较多旧 Windows / 上游仓库路径历史，当前以本文件这一节为准。

## 用户偏好

- 默认中文沟通，少废话，直接做。
- 用户通常希望直接实现、验证、能推送就按要求推送，不要只给方案。
- 代码改完要跑必要检查；发布相关要确认 GitHub Actions / Release 真实状态。
- 不要随意重写视觉系统，不要动电影视觉系统，除非用户明确点名。
- UI 审美：精致、暗色、高级、流畅；拒绝廉价渐变、过度透明、错位、闪烁、卡顿。
- 玻璃质感是敏感区域，当前黄金版本见 `docs/GLASS_SVG_TEXTURE.md`。
- 后续如果用户说“保留 / 记住 / 这个做得很好 / 以后别忘了”，要追加到 `docs/PROJECT_MEMORY.md`。

## 当前项目结构

```text
/Users/lvsp/web/Mineradio/
├─ .github/workflows/release.yml  # tag/手动触发自动打包并发布 GitHub Release
├─ public/
│  ├─ index.html                  # 主 HTML 壳，现已拆出 CSS/JS
│  ├─ styles/main.css             # 主样式
│  ├─ scripts/app.bundle.js       # 构建后的前端 bundle
│  ├─ scripts/app/                # 拆分后的前端源码
│  └─ vendor/
├─ desktop/                       # Electron main/preload
├─ build/
│  ├─ build-app-bundle.mjs        # 前端 bundle 构建脚本
│  ├─ after-pack.js
│  └─ installer.nsh               # Windows NSIS 安装器脚本
├─ docs/
├─ server.js                      # 本地 API、音乐源、Navidrome、更新检查
├─ dj-analyzer.js                 # 节奏/音频分析
├─ package.json                   # 版本、脚本、electron-builder 配置
├─ package-lock.json
├─ CHANGELOG.md
├─ RELEASE.md
├─ AGENTS.md
└─ AI_HANDOFF.md
```

前端已从单文件拆分：

- 改 `public/scripts/app/**` 后必须运行 `npm run build:app`，生成 `public/scripts/app.bundle.js`。
- `public/index.html` 当前只负责 HTML 结构和引用，不要再把大块 JS/CSS 塞回去。
- `public/styles/main.css` 是主样式入口。

## 常用命令

```bash
npm install
npm run build:app
node --check server.js
find public/scripts/app -name '*.js' -print0 | sort -z | xargs -0 -n1 node --check
git diff --check
PORT=3100 HOST=127.0.0.1 node server.js
```

构建：

```bash
npm run build:win
npm run build:win:dir
npm run build:mac
```

当前本机服务已按用户要求停掉。需要预览时重新启动：

```bash
PORT=3100 HOST=127.0.0.1 node server.js
```

## 发布流程（当前 fork）

当前 fork 从 `v1.0.0` 重新开始，不沿用上游版本号语义。

普通发布：

```bash
npm version x.y.z --no-git-tag-version
npm run build:app
node --check server.js
find public/scripts/app -name '*.js' -print0 | sort -z | xargs -0 -n1 node --check
git diff --check
git add package.json package-lock.json public/scripts/app.bundle.js
git commit -m "Prepare Mineradio x.y.z release"
git push origin main
git tag -a vx.y.z -m "Mineradio vx.y.z"
git push origin vx.y.z
```

GitHub Actions 会自动：

- Windows: 构建 `Mineradio-x.y.z-Setup.exe`
- macOS: 构建 `Mineradio-x.y.z-x64.dmg/.zip` 和 `Mineradio-x.y.z-arm64.dmg/.zip`
- 生成 `SHA256SUMS-windows.txt` / `SHA256SUMS-macos.txt`
- 发布到 `https://github.com/lvshp/Mineradio/releases/tag/vx.y.z`

也可以手动触发 `.github/workflows/release.yml` 的 `workflow_dispatch`，输入 `tag_name` 重新打包某个 tag。workflow 已设置 `overwrite_files: true`，重跑会覆盖同名资产。

macOS 签名状态：

- 当前 `v1.0.0` mac 包没有 Apple Developer ID 签名和 notarize，Chrome 下载后可能提示“Mineradio.app 已损坏”。
- 已在 Release 说明中加入临时打开命令：

```bash
sudo xattr -rd com.apple.quarantine /Applications/Mineradio.app
```

- workflow 已预留正式签名/公证，需要仓库 secrets：
  - `CSC_LINK`
  - `CSC_KEY_PASSWORD`
  - `APPLE_ID`
  - `APPLE_APP_SPECIFIC_PASSWORD`
  - `APPLE_TEAM_ID`

## 当前 Release 资产（v1.0.0）

Release 地址：

`https://github.com/lvshp/Mineradio/releases/tag/v1.0.0`

主要资产：

- `Mineradio-1.0.0-Setup.exe`
- `Mineradio-1.0.0-Setup.exe.blockmap`
- `Mineradio-1.0.0-x64.dmg`
- `Mineradio-1.0.0-x64.zip`
- `Mineradio-1.0.0-arm64.dmg`
- `Mineradio-1.0.0-arm64.zip`
- `SHA256SUMS-windows.txt`
- `SHA256SUMS-macos.txt`
- `latest.yml`
- `latest-mac.yml`

## Navidrome 当前实现状态

已完成并提交在 `f898de0 Add Navidrome library integration` 及后续提交中：

- Navidrome 登录/配置/搜索/播放 URL/封面/音频/下载/红心。
- 专辑列表走 `getAlbumList2.view?type=alphabeticalByName`，获取全部专辑，不再只取最近添加。
- 专辑 id 使用 `album:<albumId>`，点专辑时才请求歌曲。
- 歌手详情页只显示专辑列表，不预加载全部专辑歌曲。
- 歌手详情有“热门歌曲”“随机播放”按钮，点击后按服务器返回歌曲入队并播放。
- 专辑详情页包含播放、随机、下一首、加入队列、添加到歌单、下载等按钮；歌曲行有红心、下载、`+`。
- 3D 歌单架已兼容 Navidrome，playlist id 使用 `navidrome:` 前缀。
- 歌词优先 Navidrome `getLyricsBySongId` / `getLyrics`，兜底 LRCLIB。
- LRCLIB 请求尽量带齐 `track_name`、`artist_name`、`album_name`、`duration`。
- 歌曲封面新增外部兜底：iTunes -> Deezer -> Navidrome 原封面；接口为 `/api/navidrome/song/cover`。

关键代码位置：

- `server.js`
  - Navidrome helpers、`mapNavidromeSong`、`handleNavidromeLyric`
  - LRCLIB：`fetchLrclibLyrics`
  - 外部歌曲封面：`fetchExternalSongCover`、`fetchItunesSongCover`、`fetchDeezerSongCover`
  - 路由：`/api/navidrome/*`
- `public/scripts/app/services/16-api.js`
  - Navidrome 前端 API、歌手详情、专辑详情、红心、封面代理白名单
- `public/scripts/app/visual/13-shelf-3d.js`
  - 3D 歌单架 provider 识别
- `public/scripts/app/visual/14-shelf-content.js`
  - 3D 歌单架详情打开 Navidrome 曲目
- `public/styles/main.css`
  - 歌手详情、专辑详情等样式

## 最近工作日志

### 2026-07-02 - fork 从 v1.0.0 重新起步

- 用户说明这是 fork 来的代码，版本号清零，从 `v1.0.0` 重新开始。
- 已把 `package.json` / `package-lock.json` 从 `1.1.1` 改为 `1.0.0`。
- 已删除本地从 `upstream` 拉来的旧 `v1.0.0` tag，并在当前提交重新创建 `v1.0.0`。
- 已推送 `origin/main` 和 `origin v1.0.0`。
- GitHub Actions 成功构建 Windows/macOS 并发布：
  - `https://github.com/lvshp/Mineradio/releases/tag/v1.0.0`

### 2026-07-02 - GitHub Actions 自动发布

- 新增 `.github/workflows/release.yml`。
- tag `v*` 自动构建 Windows + macOS 并发布 Release。
- 后续补充 `workflow_dispatch`，可手动输入 tag 重跑发布。
- macOS workflow 已预留 Apple 签名/公证 secrets，未配置时继续打未签名包。

### 2026-07-02 - Navidrome 音源支持

- 增加 Navidrome 连接、搜索、专辑、歌手、播放、封面、歌词、下载、红心支持。
- 歌手详情改为只显示专辑列表，点专辑才加载歌曲，避免打开歌手页很慢。
- 专辑详情页补齐播放/随机/队列/下载/红心等操作。
- 3D 歌单架兼容 Navidrome 专辑/歌单。
- 歌词支持 Navidrome 结构化歌词，并用 LRCLIB 兜底。
- 歌曲封面支持 iTunes/Deezer 外部兜底，查不到时回落 Navidrome 专辑图。

### 2026-07-02 - 前端模块化拆分

- `public/index.html` 已拆出：
  - `public/styles/main.css`
  - `public/scripts/app/**`
  - `public/scripts/app.bundle.js`
  - `build/build-app-bundle.mjs`
- 新增 npm script：`npm run build:app`
- 后续改前端源码必须重新构建 bundle。

## 未完成/待确认事项

- macOS 正式可双击打开需要 Apple Developer ID 签名和 notarize；当前只能用 `xattr` 去隔离属性。
- `package.json` 里的 `build.publish` / `mineradio.update` 仍指向上游 `XxHuberrr/Mineradio`，但 GitHub Actions 发布到当前 repo `lvshp/Mineradio`。后续如果软件内更新也要走 fork，需要改这里。
- `AGENTS.md`、`docs/PROJECT_MEMORY.md` 仍有旧 Windows 路径和上游发布记忆；本轮只更新 `AI_HANDOFF.md`，后续最好同步清理。
- Navidrome 外部歌词/封面依赖社区数据源，不保证每首歌都命中。
- 外部封面接口会让同一专辑内部分单曲拿到更匹配封面，但公开数据库通常仍以专辑封面为主，不保证每首歌不同。
- 发布 workflow 目前会上传 `latest.yml` 和 `latest-mac.yml`，这是当前 fork 从 v1.0.0 重新开始后的正常行为。

## 下个 AI 接手事项

### 最高优先级

1. 不要再进入旧 Windows 路径 `E:\桌面\播放器软件\Mineradio\resources\app` 做当前 fork 的开发；当前真实工作区是 `/Users/lvsp/web/Mineradio`。
2. 不要把上游 `XxHuberrr/Mineradio` 当发布目标；当前 fork 发布目标是 `lvshp/Mineradio`。
3. 不要把 `.navidrome.json`、`.cookie`、`.qq-cookie`、`D:\MineradioCache\beatmaps` 或任何运行缓存提交。
4. 改前端拆分源码后必须执行 `npm run build:app`，否则 `public/scripts/app.bundle.js` 不会更新。
5. 发布或重跑 Release 前，先确认 `package.json` 版本、tag 名和目标仓库一致。

### 当前可继续推进的任务

- 同步清理 `AGENTS.md` 和 `docs/PROJECT_MEMORY.md` 的旧 Windows / 上游路径，改成当前 macOS fork 事实。
- 如果要让 macOS 用户正常双击打开，配置 Apple Developer ID 签名和 notarize secrets，然后用 workflow 手动重跑 `v1.0.0` 或发布下个 tag。
- 如果软件内更新也要走 fork，把 `package.json` 里的：
  - `build.publish.owner/repo`
  - `mineradio.update.owner/repo`
  从 `XxHuberrr/Mineradio` 改为 `lvshp/Mineradio`。
- 如果用户继续反馈 Navidrome：
  - 先启动本地服务：`PORT=3100 HOST=127.0.0.1 node server.js`
  - 再用浏览器访问 `http://127.0.0.1:3100`
  - 常查接口：`/api/navidrome/status`、`/api/navidrome/playlists`、`/api/navidrome/playlist/tracks`、`/api/navidrome/lyric`
- 如果用户要求发布新版本：
  - 先 `npm version x.y.z --no-git-tag-version`
  - 提交并推送 `main`
  - 再创建并推送 `vx.y.z` tag
  - 用 `gh run watch` 盯完 Actions
  - 用 `gh release view vx.y.z --repo lvshp/Mineradio` 确认资产。

### 近期已验证过的命令

```bash
npm run build:app
node --check server.js
find public/scripts/app -name '*.js' -print0 | sort -z | xargs -0 -n1 node --check
git diff --check
```

### 近期易踩坑

- `gh release view` 当前 CLI 没有 `isLatest` JSON 字段，不要用这个字段查询。
- 本地曾从 `upstream` 拉到旧 `v1.0.0` tag；当前已删除并在当前 fork 提交上重建。以后如果 fetch upstream 又带回同名 tag，发布前必须确认 `git show-ref --tags v1.0.0` 指向当前 fork 预期提交。
- GitHub Actions 会提示部分 actions 使用 Node 20 deprecated，这是平台警告，不代表构建失败。
- 当前 macOS Release 包未 notarize，用户截图里“app 已损坏”就是 Gatekeeper 拦截；先用 `xattr` 解决，长期靠 Apple 签名/公证解决。
- 外部封面和 LRCLIB 都有网络超时与命中率问题；不要把“社区无数据”误判为代码必然错误。

## 每次任务完成后的固定动作

1. 如果涉及长期状态，更新本文件。
2. 如果用户明确要求“记住/保留”，更新 `docs/PROJECT_MEMORY.md`。
3. 改前端源码后运行 `npm run build:app`。
4. 至少运行：

```bash
node --check server.js
find public/scripts/app -name '*.js' -print0 | sort -z | xargs -0 -n1 node --check
git diff --check
```

5. 发布后用 `gh run list` / `gh run watch` / `gh release view` 确认真实结果。
6. 最后确认 `git status --short --branch`，说明是否已提交/推送。
