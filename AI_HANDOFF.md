# Mineradio AI Handoff

这个文件给后续接管本工作区的 AI 使用。当前项目已经从上游 fork 独立出来，从 `v1.0.0` 重新起步；不要再按旧机器绝对路径处理。

## 当前权威入口（2026-07-02）

- 当前真实代码/Git 仓库：项目根目录，也就是包含 `AI_HANDOFF.md`、`AGENTS.md`、`package.json` 的目录
- 当前工作分支：`main`
- 当前 fork 远端：以 `git remote -v` 的 `origin` 为准
- 上游参考远端：如存在 `upstream`，只作为参考，不作为默认发布目标
- 当前源码版本：以 `package.json` 为准；2026-07-03 已升到 `v1.1.0`
- 当前 Release：以当前仓库对应的最新 Release 为准；2026-07-03 用户已反馈网页产物已发布
- 当前 release workflow：`.github/workflows/release.yml`
- 当前本地服务默认启动命令：`PORT=3100 HOST=127.0.0.1 node server.js`
- 当前本地访问地址：`http://127.0.0.1:3100`
- Navidrome 本机配置文件：`.navidrome.json`，已加入 `.gitignore`，不要提交。
- 运行缓存目录：项目根目录外的本机缓存目录；`.gitignore` 已忽略常见缓存形态，不要提交。

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

注意：`AGENTS.md` 和 `docs/PROJECT_MEMORY.md` 可能仍保留历史记录，当前工作入口统一以项目根目录和当前 Git 远端为准。

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
<project-root>/
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
- 发布到当前 `origin` 仓库的 `vx.y.z` Release

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

当前 `origin` 仓库的 `v1.0.0` Release

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

### 2026-07-03 - Navidrome 歌单/专辑、收藏、缓存与首页左侧方案交接

本轮已做的主要改动：

- Navidrome 歌单和专辑拆分：`/api/navidrome/playlists` 返回真实 ND 歌单和虚拟随机/收藏入口；`/api/navidrome/albums` 单独返回 ND 全部专辑。前端左侧歌单面板增加 `ND专辑` 标签，只有登录 Navidrome 时显示；原来混在“我的歌单”里的 Navidrome 全部专辑移到 `ND专辑`。
- 歌单/专辑展开歌曲行补齐操作按钮：展开专辑后的歌曲列表加了类似队列行的喜欢、下一个播放、添加到队列、添加到歌单等操作，移除了不适合这里的移除按钮。
- Navidrome 收藏到歌单已实装：新增后端 `/api/navidrome/playlist/add-songs`，调用 OpenSubsonic/Navidrome `updatePlaylist.view`，以重复 `songIdToAdd` 添加歌曲。添加前会读取目标歌单现有歌曲，跳过重复项并返回 `added` / `duplicate`。
- 前端 `openCollectModal()` 按歌曲来源分流：ND 歌曲弹出 ND 可写歌单列表；网易云歌曲继续走原逻辑；QQ/本地仍按旧提示处理。单曲重复提示“歌曲已在歌单中”，批量收藏会提示已收藏数量和跳过重复数量。
- 歌手主页进入专辑详情后的关闭行为已调整：从歌手主页打开专辑详情时，缓存上一层歌手主页 HTML；点击关闭或空白处返回歌手主页，不再把整个详情弹层全关掉。播放、随机等明确跳转播放行为可以强制关闭详情。
- 专辑详情里的收藏弹窗层级已修：`#collect-modal` 的 `z-index` 提高到专辑详情之上，避免点击“添加到歌单”后弹窗被遮挡。
- 账号信息里新增缓存清理入口：`#account-cache-btn` 会显示媒体缓存大小，点击后调用 `/api/media-cache/clear`，清理图片和歌词缓存。
- 媒体缓存改为永久缓存直到手动清理：新增 `MEDIA_CACHE_ROOT`，默认放在用户应用数据目录下的 `Mineradio/media-cache`，也可用 `MINERADIO_MEDIA_CACHE_DIR` 覆盖。Navidrome 封面、Navidrome 歌词、LRCLIB 歌词、网易云歌词、第三方单曲封面 URL 和下载后的第三方图片都会落盘缓存；缓存响应使用长缓存头，只有用户点清理缓存才清除。
- 单曲封面兜底符合用户需求：Navidrome 服务器通常只能给到专辑图，单曲没有独立图片时，会向第三方源查单曲封面；查到后把第三方封面 URL 和图片二进制都缓存起来，下次优先用本地缓存，不再重复请求第三方。
- 歌手主页头像增加外部兜底：Navidrome 歌手图优先用服务器 `coverArt` / `artistImageUrl`；没有时尝试 `/api/external/artist-image?name=...` 的 Deezer 歌手图代理；再没有才回落首张专辑封面或前端首字母占位。

已做过的验证记录：

- `node --check server.js`
- `Get-ChildItem -Recurse -File public\scripts\app -Filter *.js | Sort-Object FullName | ForEach-Object { node --check $_.FullName }`
- `git diff --check`
- `npm run build:app`
- `node --check public\scripts\app.bundle.js`
- 临时服务 smoke test：`PORT=3101 node server.js`
- `/api/media-cache/status` 能返回缓存目录和大小。
- `/api/external/artist-image?name=林树` 曾返回 `200 image/jpeg` 并写入缓存。
- `/api/navidrome/playlist/add-songs` 在未配置 ND 时返回预期的 `401 NAVIDROME_NOT_CONFIGURED`。

本地 Windows 包构建记录：

- 之前成功产物：`dist/Mineradio-1.0.1-Setup.exe`
- SHA256：`4091CD1955FF8AD84A75EBDB80F0D530F43DF882D06B6EE8E11295CC1F6A9CA5`
- 后续又新增了媒体缓存和歌手图片相关改动，如用户要安装最新本地版，需要重新完整执行 `npm run build:win`，不要直接复用旧 hash。

#### 首页左侧组合版设计方案（用户已决定采用）

用户最终确认：首页左侧做“沉浸播放看板”，下方融合“私人电台快捷入口”。目标是让左侧大区域既高级又实用，不要继续放普通卡片或施工占位；右侧继续承担歌单、专辑、推荐内容，不要打散右侧现有 `.home-grid` / `.home-rail` 的分工。

实现入口建议：

- HTML 入口：`public/index.html` 的 `#empty-home`，尤其是左侧 `.home-hero`。当前结构里 `.home-hero-inner.home-construction-inner` 还是“此处施工”占位，优先替换这里。
- 样式入口：`public/styles/main.css` 的 `/* ---------- 空场 Home ---------- */` 段落，已有 `.home-hero`、`.home-grid`、`.home-rail`、`.home-chip`、`.home-mosaic` 等样式。新增样式尽量沿用这些变量和暗色高级质感，不要做廉价大渐变或过度透明。
- 行为入口：先用 `rg "openHomePlayerConsole|playHomeSong|playHomeRecent|openHomeLibrary|updateEmptyHomeVisibility|emptyHomeActive"` 定位 Home 相关逻辑；前端源码在 `public/scripts/app/**`，不要直接改 bundle。改完必须 `npm run build:app`。

建议的左侧结构：

1. 沉浸播放看板主体
   - 大封面或歌手图作为背景/视觉核心。优先用当前播放歌曲的 `cover`、Navidrome 单曲封面缓存、歌手图；没有播放时用最近播放或推荐歌曲封面；再没有才使用精致占位。
   - 显示当前歌曲名、歌手、来源标签（ND / 网易 / QQ / 本地）、音质或“服务器原清晰度”等状态。Navidrome 不做清晰度切换，显示“服务器原始音质/原清晰度”即可。
   - 显示当前播放进度或简化波形，不要做高成本动画；可以复用已有 `home-wave-track` 思路。
   - 显示当前歌词一句或下一句歌词。没有歌词时显示专辑/歌手/来源状态，不要出现空白大块。
   - 快捷按钮：播放/暂停、喜欢、下一个播放、添加到队列、添加到歌单、去歌手/专辑。图标优先复用现有按钮 SVG/函数和 `data-action` 分发，不要重新写一套孤立事件。

2. 私人电台快捷入口
   - 放在沉浸播放看板下方，作为紧凑入口组，不要做成六张普通大卡。
   - 推荐入口：
     - 继续上次
     - 随机播放 Navidrome
     - 最近收藏
     - 最近添加
     - 未听专辑
     - 深夜随机 / 工作流 / 通勤
   - 已登录 Navidrome 时优先出现 ND 相关入口：随机 ND、最近添加 ND 专辑、ND 收藏歌曲、ND 歌单。未登录 ND 时隐藏这些入口或降级成普通“继续听/每日推荐/本地队列”。
   - 点击入口应尽量复用现有播放队列函数：例如 `loadPlaylistIntoQueueById()`、Navidrome 随机/收藏接口、`playHomeRecent()`、`playHomeSong()`。不要为了 Home 新入口复制一套播放队列逻辑。

3. 状态和空态
   - 正在播放：看板以当前播放为主，歌词/进度/来源实时更新。
   - 暂停但有歌曲：保持当前歌曲信息，按钮显示可继续播放。
   - 没有播放但有最近播放：展示“继续听”歌曲或最近队列第一首。
   - 完全空态：展示一个安静高级的默认看板，主按钮是“打开歌单库/连接 Navidrome/展开播放器控制台”，但不要再显示“施工”。

4. 视觉边界
   - 左侧是沉浸看板，不要再塞普通信息卡；右侧继续放歌单、推荐和内容 tile。
   - 不要使用单一紫蓝/深蓝大渐变铺满；可以用封面取色、暗色玻璃、细线、低饱和点缀，整体保持 Mineradio 现有暗色高级感。
   - 动效要轻：封面呼吸、波形、歌词淡入即可。避免持续高 CPU 的大面积滤镜、频繁布局重排或过多阴影动画。
   - 桌面端和小窗口都要检查文字不溢出，按钮不重叠。`.empty-home-shell` 当前是两列布局，移动/窄屏需要确认 `.home-hero` 不挤爆右侧区域。

5. 推荐实施顺序
   - 第一步：替换左侧 HTML 占位，做静态沉浸播放看板和快捷入口组。
   - 第二步：接入当前播放状态、封面、来源、歌词一句和播放/暂停/喜欢/队列按钮。
   - 第三步：接入 Navidrome 登录态，显示 ND 快捷入口；未登录时隐藏 ND 入口。
   - 第四步：补齐空态、窄屏样式、按钮 tooltip/aria-label。
   - 第五步：运行 `npm run build:app`、JS 语法检查、`git diff --check`，再实际启动服务或 Electron 看首页。

### 2026-07-02 - fork 从 v1.0.0 重新起步

- 用户说明这是 fork 来的代码，版本号清零，从 `v1.0.0` 重新开始。
- 已把 `package.json` / `package-lock.json` 从 `1.1.1` 改为 `1.0.0`。
- 已删除本地从 `upstream` 拉来的旧 `v1.0.0` tag，并在当前提交重新创建 `v1.0.0`。
- 已推送 `origin/main` 和 `origin v1.0.0`。
- GitHub Actions 成功构建 Windows/macOS 并发布：
  - 当前 `origin` 仓库的 `v1.0.0` Release

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
- `package.json` 里的 `build.publish` / `mineradio.update` 可能仍指向上游仓库；后续如果软件内更新也要走当前 fork，需要改这里。
- `AGENTS.md`、`docs/PROJECT_MEMORY.md` 可能仍有历史发布记忆；当前开发不要按旧绝对路径定位源码。
- Navidrome 外部歌词/封面依赖社区数据源，不保证每首歌都命中。
- 外部封面接口会让同一专辑内部分单曲拿到更匹配封面，但公开数据库通常仍以专辑封面为主，不保证每首歌不同。
- 发布 workflow 目前会上传 `latest.yml` 和 `latest-mac.yml`，这是当前 fork 从 v1.0.0 重新开始后的正常行为。

## 下个 AI 接手事项

### 最高优先级

1. 不要再进入旧机器绝对路径做当前 fork 的开发；当前真实工作区就是项目根目录。
2. 不要把上游仓库当发布目标；当前 fork 发布目标以 `origin` 为准。
3. 不要把 `.navidrome.json`、`.cookie`、`.qq-cookie` 或任何运行缓存提交。
4. 改前端拆分源码后必须执行 `npm run build:app`，否则 `public/scripts/app.bundle.js` 不会更新。
5. 发布或重跑 Release 前，先确认 `package.json` 版本、tag 名和目标仓库一致。

### 当前可继续推进的任务

- 继续清理历史文档里的旧机器绝对路径，统一改成项目根目录相对路径。
- 如果要让 macOS 用户正常双击打开，配置 Apple Developer ID 签名和 notarize secrets，然后用 workflow 手动重跑 `v1.0.0` 或发布下个 tag。
- 如果软件内更新也要走 fork，把 `package.json` 里的：
  - `build.publish.owner/repo`
  - `mineradio.update.owner/repo`
  从上游仓库改为当前 `origin` 仓库。
- 如果用户继续反馈 Navidrome：
  - 先启动本地服务：`PORT=3100 HOST=127.0.0.1 node server.js`
  - 再用浏览器访问 `http://127.0.0.1:3100`
  - 常查接口：`/api/navidrome/status`、`/api/navidrome/playlists`、`/api/navidrome/playlist/tracks`、`/api/navidrome/lyric`
- 如果用户要求发布新版本：
  - 先 `npm version x.y.z --no-git-tag-version`
  - 提交并推送 `main`
  - 再创建并推送 `vx.y.z` tag
  - 用 `gh run watch` 盯完 Actions
  - 用 `gh release view vx.y.z --repo <origin-owner>/<origin-repo>` 确认资产。

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
