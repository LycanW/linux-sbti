/**
 * LSB-TI — Linux 发行版刻板印象测验
 * 计分与匹配逻辑仿 SBTI-test：15 维 × 每维 2 题（1–3 分）→ L/M/H → 与原型向量曼哈顿距离最近者胜。
 */

const dimensionMeta = {
  S1: { name: "S1 更新血压", model: "发行节奏" },
  S2: { name: "S2 桌面政治", model: "界面与美学" },
  S3: { name: "S3 折腾能量", model: "换源/Rice/重装" },
  E1: { name: "E1 企业气质", model: "工单与合规" },
  E2: { name: "E2 新手护甲", model: "被文档呵护的需求" },
  E3: { name: "E3 独狼指数", model: "拒绝手把手" },
  A1: { name: "A1 自由软件洁癖", model: "专有驱动与固件" },
  A2: { name: "A2 文档原教旨", model: "RTFM 立场" },
  A3: { name: "A3 极简洁癖", model: "组件数量厌恶" },
  Ac1: { name: "Ac1 编译欲", model: "源码与优化" },
  Ac2: { name: "Ac2 一把梭", model: "更新与拍板" },
  Ac3: { name: "Ac3 死磕力", model: "不修好不休眠" },
  So1: { name: "So1 求救方式", model: "论坛姿势" },
  So2: { name: "So2 截图欲望", model: "rice 展示" },
  So3: { name: "So3 身份切换", model: "工作/娱乐人设" },
};

const questions = [
  {
    id: "q1",
    dim: "S1",
    text: "系统提示有「大量更新」时，你的第一反应更接近？",
    options: [
      { label: "先读变更日志，没有 CVE 就下周再说。", value: 1 },
      { label: "挑个心情好的晚上做，顺便备份。", value: 2 },
      { label: "不滚浑身难受，滚挂算给宇宙交学费。", value: 3 },
    ],
  },
  {
    id: "q2",
    dim: "S1",
    text: "听说隔壁发行版已经上内核 6.x，而你还在 5.x LTS，你会？",
    options: [
      { label: "LTS 是我爹，新内核是远方亲戚。", value: 1 },
      { label: "观望，等 backports 或第三方包。", value: 2 },
      { label: "已经在编译 mainline，顺便骂一句固件。", value: 3 },
    ],
  },
  {
    id: "q3",
    dim: "S2",
    text: "你对「开箱即用的漂亮桌面」的态度是？",
    options: [
      { label: "壁纸能亮就行，美是虚荣。", value: 1 },
      { label: "可以好看，但别耽误我干活。", value: 2 },
      { label: "Dock 对齐到像素，字体要细，动画要克制。", value: 3 },
    ],
  },
  {
    id: "q4",
    dim: "S2",
    text: "有人把你的 rice 截图误当成 macOS，你会？",
    options: [
      { label: "愤怒：这是 BSPWM，不是苹果。", value: 1 },
      { label: "礼貌纠正，并安利主题仓库。", value: 2 },
      { label: "内心暗爽，表面说「还差得远」。", value: 3 },
    ],
  },
  {
    id: "q5",
    dim: "S3",
    text: "过去一年你「认真折腾过」几次桌面/发行版？",
    options: [
      { label: "0，我连 hostname 都懒得改。", value: 1 },
      { label: "1–2 次，属于理性微调。", value: 2 },
      { label: "记不清，硬盘里五个 EFI 条目是常态。", value: 3 },
    ],
  },
  {
    id: "q6",
    dim: "S3",
    text: "朋友说你「又在换源」，你内心 OS 是？",
    options: [
      { label: "换源是什么，默认镜像不是国家分配的吗。", value: 1 },
      { label: "偶尔换，为了速度。", value: 2 },
      { label: "镜像站测速脚本比 bashrc 还长。", value: 3 },
    ],
  },
  {
    id: "q7",
    dim: "E1",
    text: "听到「生产环境」四个字，你想到的是？",
    options: [
      { label: "我家路由器也算生产环境。", value: 1 },
      { label: "看规模：小团队随便，大厂另说。", value: 2 },
      { label: "变更窗口、回滚计划、审计日志，谢谢。", value: 3 },
    ],
  },
  {
    id: "q8",
    dim: "E1",
    text: "你对「支持合同 / SLA」的本能反应？",
    options: [
      { label: "那是什么，能换 AUR 星星吗。", value: 1 },
      { label: "有用，但先看社区能不能白嫖。", value: 2 },
      { label: "没有工单编号的问题我不承认存在。", value: 3 },
    ],
  },
  {
    id: "q9",
    dim: "E2",
    text: "安装阶段遇到分区，你会？",
    options: [
      { label: "抄作业：「一个 / 走天下」。", value: 1 },
      { label: "按教程来，/home 单独。", value: 2 },
      { label: "先画思维导图，再开 GParted。", value: 3 },
    ],
  },
  {
    id: "q10",
    dim: "E2",
    text: "第一次启动后 Wi-Fi 不工作，你？",
    options: [
      { label: "手机开热点，复制整段报错搜。", value: 1 },
      { label: "找「Ubuntu 系」论坛第一条高赞。", value: 2 },
      { label: "先 lspci，再 modprobe，最后读厂商 PDF。", value: 3 },
    ],
  },
  {
    id: "q11",
    dim: "E3",
    text: "别人远程桌面帮你操作，你？",
    options: [
      { label: "可以，省时间，我当观众。", value: 1 },
      { label: "屏幕共享行，SSH 也行，别乱改我 dotfiles。", value: 2 },
      { label: "别碰我键盘，我会应激。", value: 3 },
    ],
  },
  {
    id: "q12",
    dim: "E3",
    text: "「手把手教程第一步：打开终端」——你？",
    options: [
      { label: "终于有人从盘古开天讲起，感动。", value: 1 },
      { label: "跳过前三屏，找命令块。", value: 2 },
      { label: "关掉页面，自己 man。", value: 3 },
    ],
  },
  {
    id: "q13",
    dim: "A1",
    text: "显卡闭源驱动才能满血，你会？",
    options: [
      { label: "骂完厂商，然后装，身体很诚实。", value: 1 },
      { label: "查 non-free / RPM Fusion / AUR，边装边忏悔。", value: 2 },
      { label: "宁可核显，也不向二进制低头——除非老板付钱。", value: 3 },
    ],
  },
  {
    id: "q14",
    dim: "A1",
    text: "你对「Snap / 容器化全家桶」的态度？",
    options: [
      { label: "能跑就行，别让我编译。", value: 1 },
      { label: "看情况，磁盘够大就行。", value: 2 },
      { label: "感觉被资本和压缩包双重绑架。", value: 3 },
    ],
  },
  {
    id: "q15",
    dim: "A2",
    text: "遇到从没见过的报错，你默认顺序是？",
    options: [
      { label: "先搜，再试，再搜。", value: 1 },
      { label: "先看官方文档章节号，再搜。", value: 2 },
      { label: "先读 man，再 strace，再问人。", value: 3 },
    ],
  },
  {
    id: "q16",
    dim: "A2",
    text: "有人说「Arch Wiki 能解决一切」，你？",
    options: [
      { label: "我用的不是 Arch，但先打开 Wiki。", value: 1 },
      { label: "结合发行版再看，别硬抄。", value: 2 },
      { label: "Wiki 是起点，终点是读源码。", value: 3 },
    ],
  },
  {
    id: "q17",
    dim: "A3",
    text: "你的系统里「用不上的服务」数量？",
    options: [
      { label: "不知道，systemd 列表比我命长。", value: 1 },
      { label: "会偶尔 disable 几个眼熟的。", value: 2 },
      { label: "最小安装，多一个 socket 都难受。", value: 3 },
    ],
  },
  {
    id: "q18",
    dim: "A3",
    text: "Docker / Podman 装了一堆镜像，你？",
    options: [
      { label: "磁盘会自己长大，别问。", value: 1 },
      { label: "每月 prune 一次。", value: 2 },
      { label: "镜像列表比我社交圈还干净。", value: 3 },
    ],
  },
  {
    id: "q19",
    dim: "Ac1",
    text: "源码包放你面前，你的本能是？",
    options: [
      { label: "找 .deb / AppImage，没有就放弃。", value: 1 },
      { label: "./configure && make -j，不行再搜。", value: 2 },
      { label: "先调 CFLAGS，再写 ebuild / Nix 表达式。", value: 3 },
    ],
  },
  {
    id: "q20",
    dim: "Ac1",
    text: "听到「从源码编译内核」，你？",
    options: [
      { label: "那是别人的周末，不是我的。", value: 1 },
      { label: "试过，为了某个驱动。", value: 2 },
      { label: "关掉一半模块像给内核节食，很爽。", value: 3 },
    ],
  },
  {
    id: "q21",
    dim: "Ac2",
    text: "`dist-upgrade` 提示要删半个系统，你？",
    options: [
      { label: "先截图发群，再决定。", value: 1 },
      { label: "读完提示，备份，点。", value: 2 },
      { label: "已经 `--noconfirm` 了，现在在修。", value: 3 },
    ],
  },
  {
    id: "q22",
    dim: "Ac2",
    text: "新 major 版本发布当天，你会？",
    options: [
      { label: "等一周，看别人先趟雷。", value: 1 },
      { label: "周末升级。", value: 2 },
      { label: "当天就 clean install，顺便换 DE。", value: 3 },
    ],
  },
  {
    id: "q23",
    dim: "Ac3",
    text: "蓝牙明天要演示，今晚死活连不上，你？",
    options: [
      { label: "换有线，活着要紧。", value: 1 },
      { label: "重装 bluez，重启，祈祷。", value: 2 },
      { label: "通宵，直到 dmesg 里再也没有红色。", value: 3 },
    ],
  },
  {
    id: "q24",
    dim: "Ac3",
    text: "别人说你「执行力强」，在 Linux 语境里你更接近？",
    options: [
      { label: "我被 deadline 逼出来的。", value: 1 },
      { label: "看心情，有时摆烂。", value: 2 },
      { label: "事情不落地，我睡不着。", value: 3 },
    ],
  },
  {
    id: "q25",
    dim: "So1",
    text: "论坛发帖时，你更可能带上？",
    options: [
      { label: "`lsb_release -a` + 错误截图 + 急在线等。", value: 1 },
      { label: "日志节选 + 已尝试步骤。", value: 2 },
      { label: "完整 journalctl + 版本号 + 「已读 Wiki 第 7 节」。", value: 3 },
    ],
  },
  {
    id: "q26",
    dim: "So1",
    text: "QQ/微信群有人 `@全体成员` 问「Linux 怎么装软件」，你？",
    options: [
      { label: "甩百度第一条。", value: 1 },
      { label: "问发行版，再给包管理器名。", value: 2 },
      { label: "反问架构、版本、桌面，否则不回。", value: 3 },
    ],
  },
  {
    id: "q27",
    dim: "So2",
    text: "你会主动发 neofetch / screenfetch 吗？",
    options: [
      { label: "不发，服务器要啥自行车。", value: 1 },
      { label: "偶尔，证明我也能办公。", value: 2 },
      { label: "会，ASCII 对齐，字体要细。", value: 3 },
    ],
  },
  {
    id: "q28",
    dim: "So2",
    text: "你的 dotfiles 仓库？",
    options: [
      { label: "不存在，配置随缘生长。", value: 1 },
      { label: "有，但半年没提交。", value: 2 },
      { label: "有 README、截图、CI 检查语法。", value: 3 },
    ],
  },
  {
    id: "q29",
    dim: "So3",
    text: "工作电脑是 macOS/Windows，家里是 Linux，你？",
    options: [
      { label: "两边各过各的，别串味。", value: 1 },
      { label: "尽量同步 shell 配置。", value: 2 },
      { label: "人格分裂：公司社畜，回家 ricer。", value: 3 },
    ],
  },
  {
    id: "q30",
    dim: "So3",
    text: "线下聚会有人炫耀 Starlink +  homelab，你？",
    options: [
      { label: "微笑点头，其实听不懂。", value: 1 },
      { label: "接话，聊两句 VLAN。", value: 2 },
      { label: "当场打开手机热点拓扑图对线。", value: 3 },
    ],
  },
];

const specialQuestions = [
  {
    id: "gaming_gate_q1",
    special: true,
    kind: "gaming_gate",
    text: "你的独显 / 核显主要服务于？",
    options: [
      { label: "办公、看视频、没有游戏这种世俗欲望。", value: 1 },
      { label: "编程、机器学习、渲染——游戏只是偶尔。", value: 2 },
      { label: "打游戏；帧数、Proton、全屏模式很重要。", value: 3 },
    ],
  },
  {
    id: "gaming_gate_q2",
    special: true,
    kind: "gaming_trigger",
    text: "如果可以，你最想长期住在哪种「Linux 形态」里？",
    options: [
      { label: "服务器 tty，越黑越好。", value: 1 },
      { label: "传统桌面，能窗口化就行。", value: 2 },
      { label: "Steam 大屏幕 / Steam Deck / 客厅主机就是我的桌面。", value: 3 },
    ],
  },
];

const STEAM_TRIGGER_QUESTION_ID = "gaming_gate_q2";

const TYPE_LIBRARY = {
  STEAMOS: {
    code: "STEAMOS",
    cn: "SteamOS / 掌机星云",
    emoji: "🎮",
    intro: "别问，问就是在兼容层里度化众生。",
    desc: "你的 Steam 库比 /home 备份还重要。内核、驱动、Proton 版本号是你的三位一体。桌面？那是 Steam 大屏模式的加载动画。朋友约你「装个双系统」，你反手一个「Deck 上能睡着的游戏才是好游戏」。刻板印象：你不是在用 Linux，你是在用 Valve 赞助的启动器外壳——但这外壳能跑 3A，还要什么自行车。",
  },
  DEBIAN: {
    code: "DEBIAN",
    cn: "Debian 老僧",
    emoji: "🧘",
    intro: "stable 是我的结界，testing 是心魔。",
    desc: "你相信「旧」是一种美德：软件像泡菜，只要安全更新跟上，就能吃到下一个奥运周期。你的服务器 uptime 比你恋爱史还长；桌面机只是服务器的图形化乡愁。别人追新内核，你在等 freeze；世界在 rolling，你在看 release notes。遇到 apt 依赖地狱？先喝杯茶，那是 Debian 在教你耐心。",
  },
  DEEPIN: {
    code: "DEEPIN",
    cn: "Deepin 精致党",
    emoji: "🦋",
    intro: "美是第一生产力，第二是 dpkg。",
    desc: "你要的是「像样」的桌面：Dock、通知、字体渲染，最好开箱就能发朋友圈。终端可以有，但最好藏在手势里。刻板印象：你对「国产桌面生态」有期待也有吐槽，但身体很诚实地打开了应用商店。遇到技术讨论，你更关心「这动画掉帧吗」而不是「这符合 POSIX 吗」。",
  },
  UBUNTU: {
    code: "UBUNTU",
    cn: "Ubuntu 观光客",
    emoji: "🟠",
    intro: "能跑就行，别问我 systemd 有几个单元。",
    desc: "你把 Linux 当「能免费用的桌面系统」，直到某天 `do-release-upgrade` 提示一堆你不敢点的选项。报错第一件事：复制整段到搜索引擎，点开 Ask Ubuntu，照做，祈祷。你对 Snap 有意见，但最后还是装了；你对 Wayland 有问号，但登录界面选默认就好。你是人类通往命令行世界的最大流量入口——这很值得骄傲。",
  },
  LINUX_MINT: {
    code: "LINUX_MINT",
    cn: "Linux Mint 舒适区居民",
    emoji: "🌿",
    intro: "Cinnamon 温度刚好，别跟我提 systemd 辩论。",
    desc: "你想要的是：像 Windows 一样少惊吓，像 Debian 一样稳，像社区一样有人情味。多媒体编解码？最好默认就合法又好用。别人折腾 Hyprland，你在纠结主题是不是太亮。刻板印象：你是「劝退 Arch 传教士」的主力军——不是懒，是知道人生苦短，何必先苦后甜再苦。",
  },
  RHEL: {
    code: "RHEL",
    cn: "RHEL 西装客",
    emoji: "🎩",
    intro: "变更窗口、回滚、审计，谢谢配合。",
    desc: "你的关键词是：订阅、合规、长期支持、以及「这事有 KB 吗」。你喜欢「企业级」三个字，就像猫喜欢纸箱——进去就安心。Fedora 是你的实验室，RHEL 才是你的工位。遇到「我 home 里编译的最新内核」，你会礼貌地问：「有 CVE 编号吗？」",
  },
  CENTOS: {
    code: "CENTOS",
    cn: "CentOS Stream 守墓人",
    emoji: "🪦",
    intro: "曾经免费 RHEL，如今迁移通知邮件。",
    desc: "你经历过「经典 CentOS」的美好年代，也经历过迁移公告的深夜邮件。现在你可能在 Stream、Rocky、Alma 之间反复横跳，但刻板印象仍在：你想白嫖企业级稳定，又不想付订阅——于是你成了发行版政治的活化石收藏家。",
  },
  FEDORA: {
    code: "FEDORA",
    cn: "Fedora 工装族",
    emoji: "🔧",
    intro: "新 GNOME、新 PipeWire、新烦恼。",
    desc: "你是「开发者桌面」人设本人：SELinux 先开，遇到问题再 `setenforce 0` 并发誓明天学策略。容器、Flatpak、Wayland，一个不能少。你关心上游，也愿意当小白鼠——毕竟不踩坑怎么在论坛签名里写「Works on my machine」。",
  },
  SLACKWARE: {
    code: "SLACKWARE",
    cn: "Slackware 时间旅行者",
    emoji: "📼",
    intro: "安装程序像考古，滚完像过年。",
    desc: "你对「简单」有另类理解：没有复杂依赖解析器，就没有伤害。配置文件最好是纯文本，启动脚本最好一眼看穿。你可能是从 90 年代走来，也可能只是讨厌过度自动化。刻板印象：你的 patience 属性点满，因为你知道「慢」有时候等于「可控」。",
  },
  ARCH: {
    code: "ARCH",
    cn: "Arch 传教士",
    emoji: "📖",
    intro: "btw I use Arch（已自动发送）",
    desc: "你的 `/home` 里 dotfiles 比照片多。系统更新是信仰仪式，滚挂了算给宇宙交学费。别人问「怎么装驱动」，你先发 Wiki 链接；对方说打不开，你叹气：「那我也没办法」。桌面环境？那是弱者的拐杖。你从 tty 里长出 i3，又从 i3 里长出 neofetch 截图。",
  },
  MANJARO: {
    code: "MANJARO",
    cn: "Manjaro 缓冲垫",
    emoji: "⛰️",
    intro: "Arch 的脾气，GUI 的温柔。",
    desc: "你想 rolling，但不想第一天就被 pacman 教做人。于是你选择了「延迟一点的 Arch」：内核晚一点、包测试多一点、论坛帖子暖一点。刻板印象：你既想拥有 Arch Wiki 的光环，又希望显卡驱动「点一下就好」。一旦滚挂，你会在「都怪 Manjaro」和「都怪我太懒」之间摇摆。",
  },
  NIXOS: {
    code: "NIXOS",
    cn: "NixOS 锁匠",
    emoji: "🔐",
    intro: "可复现，或死亡。",
    desc: "「在我机器上能跑」对你来说是侮辱；你要 flake.lock 锁死整个宇宙。你愿意写两百行 Nix 来自动化三个 apt install，并称之为优雅。回滚比前进更让你安心：`nixos-rebuild switch --rollback` 是你的 Ctrl+Z 信仰。别人约会带花，你约会带 `nix repl`。",
  },
  OPENSUSE: {
    code: "OPENSUSE",
    cn: "openSUSE 双面人",
    emoji: "🦎",
    intro: "Leap 稳重，Tumbleweed 狂野，YaST 全都要。",
    desc: "你对 YaST 有复杂感情：有时像瑞士军刀，有时像瑞士迷宫。你可能是「德国工程」信徒，也可能是单纯喜欢 chameleon 图标。刻板印象：你在稳定与滚动之间反复横跳，就像你在 btrfs 快照里反复拯救自己。",
  },
  GENTOO: {
    code: "GENTOO",
    cn: "Gentoo 铁匠",
    emoji: "🔥",
    intro: "CFLAGS 是玄学，CPU 是祭品。",
    desc: "装系统不是安装，是锻造：每一道 USE 旗标都是你对世界的态度声明。你曾在深夜 `emerge -av world`，只为 Firefox 快 0.3 秒——或只为听风扇合唱。二进制包？那是给时间值钱的人准备的。你的时间不值钱，所以值回票价。",
  },
  POP_OS: {
    code: "POP_OS",
    cn: "Pop!_OS 键盘侠",
    emoji: "🚀",
    intro: "平铺窗口 + 显卡友好 = 我的心跳。",
    desc: "你在意硬件，尤其是笔记本和显卡；你喜欢「开机就能干活」的工程师审美。Cosmic / GNOME 魔改是你的舒适区。刻板印象：你可能写过 Rust，也可能只是喜欢 Pop Shop 的秩序感——无论如何，你对「游戏 + 开发」双修的桌面有执念。",
  },
  ELEMENTARY: {
    code: "ELEMENTARY",
    cn: "elementary OS 美学信徒",
    emoji: "✨",
    intro: "像 macOS 不可怕，可怕的是不像得不够彻底。",
    desc: "你要的是一致、克制、赏心悦目的桌面：应用付费你理解，设计债你零容忍。终端可以存在，但最好也符合 Human Interface Guidelines。刻板印象：你对「Linux 桌面丑」这句话有生理性反驳冲动。",
  },
  KALI: {
    code: "KALI",
    cn: "Kali 脚本小子",
    emoji: "🕶️",
    intro: "我不是黑客，我只是工具包比较吵。",
    desc: "你的 ISO 可能比你的命令行知识更长。你装 Kali 可能是为了学习，也可能是为了壁纸和朋友圈——刻板印象先替你认罪。真正干活的人默默用 Debian netinst，你默默用 metasploit 菜单截图。温馨提示：请勿在 production 上 `apt full-upgrade` 当娱乐。",
  },
  ALPINE: {
    code: "ALPINE",
    cn: "Alpine 极简狂",
    emoji: "⛰️",
    intro: "musl 很小，容器很大。",
    desc: "你的 rootfs 比你表情包还小。你在意镜像体积、攻击面、以及「别在容器里跑 systemd 辩论」。刻板印象：你是 Docker 镜像里的常住民，主机？那是什么，能吃吗。",
  },
  VOID: {
    code: "VOID",
    cn: "Void 叛逆者",
    emoji: "🕳️",
    intro: "runit 很轻，社交也很轻。",
    desc: "你对 systemd 有意见，对 xbps 有感情。你喜欢小而快的社区发行版，像秘密俱乐部——人不多，但 wiki 条目刚好够用。刻板印象：你不是反对主流，只是反对「默认」。",
  },
  ENDEAVOUR: {
    code: "ENDEAVOUR",
    cn: "EndeavourOS 跳板人",
    emoji: "🛶",
    intro: "离 Arch 只差一次冷静的失败。",
    desc: "你想要 Arch 的生态，又希望安装器像人类语言。你在论坛里友好，在包管理器里勇敢。刻板印象：你是「迟早去装原生 Arch」的最大潜在人群——也可能永远停在「已经很像了」。",
  },
  HHHH: {
    code: "HHHH",
    cn: "发行版流浪汉",
    emoji: "🧳",
    intro: "标准原型库对你的脑回路集体罢工了。",
    desc: "你的十五维向量太前卫，最近匹配度都低于 60%。系统只能把你登记为「发行版流浪汉」：什么都能用，什么都不完全像；硬盘里五个引导项，心里没有归宿。建议：别纠结，继续折腾，DistroWatch 就是你的星座运势。",
  },
};

const NORMAL_TYPES = [
  { code: "STEAMOS", pattern: "MLH-MHM-HML-MMH-LHL" },
  { code: "DEBIAN", pattern: "LMH-HML-LMH-MLH-HML" },
  { code: "DEEPIN", pattern: "MMH-MMH-LML-HHM-MML" },
  { code: "UBUNTU", pattern: "HMH-MHM-HMH-LHM-MHM" },
  { code: "LINUX_MINT", pattern: "HMH-MML-HMH-LHM-LMM" },
  { code: "RHEL", pattern: "LLL-HHH-MLM-LHH-LLM" },
  { code: "CENTOS", pattern: "LLH-HHM-MLM-LHM-MLM" },
  { code: "FEDORA", pattern: "MHH-HMH-MHM-HMH-MMH" },
  { code: "SLACKWARE", pattern: "LHM-MLH-LLM-HML-LHL" },
  { code: "ARCH", pattern: "HHH-MHM-LHH-LHM-MHH" },
  { code: "MANJARO", pattern: "HHH-MMH-HMH-LHL-HMH" },
  { code: "NIXOS", pattern: "MLH-MLM-HML-HML-MHM" },
  { code: "OPENSUSE", pattern: "MMH-MHM-HML-MHM-MLH" },
  { code: "GENTOO", pattern: "HML-HLH-HHH-LMM-HML" },
  { code: "POP_OS", pattern: "HMH-HMH-MHH-MHM-HML" },
  { code: "ELEMENTARY", pattern: "MMH-HML-LHM-HMM-LHM" },
  { code: "KALI", pattern: "HMH-LHM-HMH-MHL-HMH" },
  { code: "ALPINE", pattern: "LLH-MLH-HML-LHM-HML" },
  { code: "VOID", pattern: "MLH-LHM-MHL-LHM-MHL" },
  { code: "ENDEAVOUR", pattern: "HHH-MHM-HMH-LHM-MHL" },
];

/** 16Personalities 式几何低多边形立绘（PNG），路径相对 index.html */
const TYPE_SPRITES = {
  STEAMOS: "assets/sprites/STEAMOS.png",
  DEBIAN: "assets/sprites/DEBIAN.png",
  DEEPIN: "assets/sprites/DEEPIN.png",
  UBUNTU: "assets/sprites/UBUNTU.png",
  LINUX_MINT: "assets/sprites/LINUX_MINT.png",
  RHEL: "assets/sprites/RHEL.png",
  CENTOS: "assets/sprites/CENTOS.png",
  FEDORA: "assets/sprites/FEDORA.png",
  SLACKWARE: "assets/sprites/SLACKWARE.png",
  ARCH: "assets/sprites/ARCH.png",
  MANJARO: "assets/sprites/MANJARO.png",
  NIXOS: "assets/sprites/NIXOS.png",
  OPENSUSE: "assets/sprites/OPENSUSE.png",
  GENTOO: "assets/sprites/GENTOO.png",
  POP_OS: "assets/sprites/POP_OS.png",
  ELEMENTARY: "assets/sprites/ELEMENTARY.png",
  KALI: "assets/sprites/KALI.png",
  ALPINE: "assets/sprites/ALPINE.png",
  VOID: "assets/sprites/VOID.png",
  ENDEAVOUR: "assets/sprites/ENDEAVOUR.png",
  HHHH: "assets/sprites/HHHH.png",
};

const DIM_EXPLANATIONS = {
  S1: {
    L: "宁可旧一点，也不要惊喜；更新是仪式，不是极限运动。",
    M: "会更新，但挑日子；备份与公告是你的护身符。",
    H: "不滚不舒服；新内核的味道比咖啡还提神。",
  },
  S2: {
    L: "美是虚荣，黑底绿字才是浪漫。",
    M: "要好看，但别耽误生产力。",
    H: "Dock 对齐到像素，主题仓库比家还大。",
  },
  S3: {
    L: "装完就算缘定三生，重装是下辈子的事。",
    M: "偶尔折腾，理性微调。",
    H: "硬盘分区表比感情史复杂，EFI 条目是勋章。",
  },
  E1: {
    L: "Homelab 也是生产，开心就好。",
    M: "看规模行事，小团队灵活，大厂严肃。",
    H: "变更窗口、回滚、审计，少一个心里发慌。",
  },
  E2: {
    L: "教程越细越好，从「打开终端」开始也不丢人。",
    M: "需要文档，但会跳过废话段落。",
    H: "宁可自己 man，也不想看别人鼠标轨迹。",
  },
  E3: {
    L: "远程协助？可以，我当番茄钟。",
    M: "可以帮，但别动我配置。",
    H: "键盘主权神圣不可侵犯，屏幕共享是最后底线。",
  },
  A1: {
    L: "闭源驱动？骂完记得装，帧数不会骗人。",
    M: "理想是自由的，显卡是现实的。",
    H: "非自由固件像沙子，硌脚就拆机。",
  },
  A2: {
    L: "先搜索，再试错，再问人。",
    M: "官方文档 + 搜索混用。",
    H: "RTFM 是礼貌，strace 是修养。",
  },
  A3: {
    L: "服务多几个无所谓，能跑就行。",
    M: "偶尔清理，随缘极简。",
    H: "多一个无用进程都心里咯噔。",
  },
  Ac1: {
    L: "源码是世界尽头，我是游客。",
    M: "能编译，但别让我常驻 /tmp。",
    H: "编译器是我的乐器，CFLAGS 是谱子。",
  },
  Ac2: {
    L: "等等党永远胜利，先看别人趟雷。",
    M: "读完提示再点，手不要快。",
    H: "升级像开盲盒，越刺激越精神。",
  },
  Ac3: {
    L: "能用有线就别无线，能睡就别通宵。",
    M: "修到好为止，但别影响上班。",
    H: "不 green 不罢休，dmesg 里没有红色才睡得着。",
  },
  So1: {
    L: "求助贴怎么短怎么来，心情是急的。",
    M: "带日志，讲步骤，讲人话。",
    H: "没版本号与日志的提问，不配得到回答。",
  },
  So2: {
    L: "截图不发，服务器不需要 vanity。",
    M: "偶尔发，证明我也能生产力。",
    H: "neofetch 是社交礼仪，配色是自我介绍。",
  },
  So3: {
    L: "工作系统与家用系统互不相欠。",
    M: "尽量同步 shell，别的随缘。",
    H: "白天社畜，晚上 ricer；人格切换比 runlevel 还快。",
  },
};

const dimensionOrder = ["S1", "S2", "S3", "E1", "E2", "E3", "A1", "A2", "A3", "Ac1", "Ac2", "Ac3", "So1", "So2", "So3"];

const app = {
  shuffledQuestions: [],
  answers: {},
};

const screens = {
  intro: document.getElementById("intro"),
  test: document.getElementById("test"),
  result: document.getElementById("result"),
};

const questionList = document.getElementById("questionList");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const submitBtn = document.getElementById("submitBtn");
const testHint = document.getElementById("testHint");

function showScreen(name) {
  Object.entries(screens).forEach(([key, el]) => {
    if (el) el.classList.toggle("active", key === name);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function getVisibleQuestions() {
  const visible = [...app.shuffledQuestions];
  const gateIndex = visible.findIndex((q) => q.id === "gaming_gate_q1");
  if (gateIndex !== -1 && app.answers["gaming_gate_q1"] === 3) {
    visible.splice(gateIndex + 1, 0, specialQuestions[1]);
  }
  return visible;
}

function getQuestionMetaLabel(q) {
  if (q.special) return "彩蛋题";
  return "维度已隐藏";
}

function renderQuestions() {
  const visibleQuestions = getVisibleQuestions();
  questionList.innerHTML = "";
  visibleQuestions.forEach((q, index) => {
    const card = document.createElement("article");
    card.className = "question";
    const opts = q.options
      .map((opt, i) => {
        const code = ["A", "B", "C", "D"][i] || String(i + 1);
        const checked = app.answers[q.id] === opt.value ? "checked" : "";
        return `
        <label class="opt">
          <input type="radio" name="${q.id}" value="${opt.value}" ${checked} />
          <span class="opt-code">${code}</span>
          <span class="opt-text">${escapeHtml(opt.label)}</span>
        </label>`;
      })
      .join("");
    card.innerHTML = `
      <div class="question-head">
        <span class="q-index">第 ${index + 1} 题</span>
        <span class="q-meta">${getQuestionMetaLabel(q)}</span>
      </div>
      <div class="question-title">${escapeHtml(q.text)}</div>
      <div class="options">${opts}</div>`;
    questionList.appendChild(card);
  });

  questionList.querySelectorAll('input[type="radio"]').forEach((input) => {
    input.addEventListener("change", (e) => {
      const { name, value } = e.target;
      app.answers[name] = Number(value);

      if (name === "gaming_gate_q1") {
        if (Number(value) !== 3) {
          delete app.answers["gaming_gate_q2"];
        }
        renderQuestions();
        return;
      }

      updateProgress();
    });
  });

  updateProgress();
}

function updateProgress() {
  const visibleQuestions = getVisibleQuestions();
  const total = visibleQuestions.length;
  const done = visibleQuestions.filter((q) => app.answers[q.id] !== undefined).length;
  const percent = total ? (done / total) * 100 : 0;
  if (progressBar) progressBar.style.width = `${percent}%`;
  if (progressText) progressText.textContent = `${done} / ${total}`;
  const complete = done === total && total > 0;
  if (submitBtn) submitBtn.disabled = !complete;
  if (testHint) {
    testHint.textContent = complete
      ? "都做完了。现在可以把你的包管理器人格交给结果页。"
      : "全选完才会放行。内核可以 panic，题不能不答完。";
  }
}

function sumToLevel(score) {
  if (score <= 3) return "L";
  if (score === 4) return "M";
  return "H";
}

function levelNum(level) {
  return { L: 1, M: 2, H: 3 }[level];
}

function parsePattern(pattern) {
  return pattern.replace(/-/g, "").split("");
}

function getSteamTriggered() {
  return app.answers[STEAM_TRIGGER_QUESTION_ID] === 3;
}

function computeResult() {
  const rawScores = {};
  const levels = {};
  dimensionOrder.forEach((dim) => {
    rawScores[dim] = 0;
  });

  questions.forEach((q) => {
    rawScores[q.dim] += Number(app.answers[q.id] || 0);
  });

  dimensionOrder.forEach((dim) => {
    levels[dim] = sumToLevel(rawScores[dim]);
  });

  const userVector = dimensionOrder.map((dim) => levelNum(levels[dim]));
  const ranked = NORMAL_TYPES.map((type) => {
    const vector = parsePattern(type.pattern).map(levelNum);
    let distance = 0;
    let exact = 0;
    for (let i = 0; i < vector.length; i++) {
      const diff = Math.abs(userVector[i] - vector[i]);
      distance += diff;
      if (diff === 0) exact += 1;
    }
    const similarity = Math.max(0, Math.round((1 - distance / 30) * 100));
    const lib = TYPE_LIBRARY[type.code];
    return { ...type, ...lib, distance, exact, similarity };
  }).sort((a, b) => {
    if (a.distance !== b.distance) return a.distance - b.distance;
    if (b.exact !== a.exact) return b.exact - a.exact;
    return b.similarity - a.similarity;
  });

  const bestNormal = ranked[0];
  const steamTriggered = getSteamTriggered();

  let finalType;
  let modeKicker = "你的主类型";
  let badge = `匹配度 ${bestNormal.similarity}% · 精准命中 ${bestNormal.exact}/15 维`;
  let sub = "维度命中度较高时，结果更像「刻板印象合订本」而非预言。";
  let special = false;
  let secondaryType = null;

  if (steamTriggered) {
    finalType = TYPE_LIBRARY.STEAMOS;
    secondaryType = bestNormal;
    modeKicker = "彩蛋：掌机星云已对齐";
    badge = "Steam 大屏模式强制接管 · 常规匹配让位于 Proton 信仰";
    sub = secondaryType ? `若忽略彩蛋，最接近的原型是 ${secondaryType.cn}（${secondaryType.similarity}%）。` : sub;
    special = true;
  } else if (bestNormal.similarity < 60) {
    finalType = TYPE_LIBRARY.HHHH;
    modeKicker = "系统强制兜底";
    badge = `标准发行版库最高匹配仅 ${bestNormal.similarity}%（${bestNormal.cn}）`;
    sub = "标准原型库对你的脑回路集体罢工了，于是登记为「发行版流浪汉」。";
    special = true;
  } else {
    finalType = bestNormal;
  }

  return {
    rawScores,
    levels,
    ranked,
    bestNormal,
    finalType,
    modeKicker,
    badge,
    sub,
    special,
    secondaryType,
  };
}

function renderDimList(result) {
  const dimList = document.getElementById("dimList");
  if (!dimList) return;
  dimList.innerHTML = dimensionOrder
    .map((dim) => {
      const level = result.levels[dim];
      const explanation = DIM_EXPLANATIONS[dim][level];
      return `
      <div class="dim-item">
        <div class="dim-item-top">
          <span class="dim-item-name">${dimensionMeta[dim].name}</span>
          <span class="dim-item-score">${level} · ${result.rawScores[dim]} 分</span>
        </div>
        <p>${explanation}</p>
      </div>`;
    })
    .join("");
}

function renderTop3(result) {
  const box = document.getElementById("top3Box");
  if (!box) return;
  const top = result.ranked.slice(0, 3);
  box.innerHTML = `
    <h3>匹配榜 Top 3</h3>
    <div class="top3-list-inner">
      ${top
        .map((t) => {
          const thumb = TYPE_SPRITES[t.code]
            ? `<img class="top3-sprite" src="${escapeHtml(TYPE_SPRITES[t.code])}" width="44" height="60" alt="" decoding="async" />`
            : `<span class="top3-sprite-fallback">${escapeHtml(t.emoji || "🐧")}</span>`;
          return `
        <div class="top3-item">
          ${thumb}
          <div class="top3-item-text">
            <strong>${escapeHtml(t.cn)}</strong>
            <span>${escapeHtml(t.code)} · 相似 ${t.similarity}%</span>
          </div>
          <div class="top3-score">${t.exact}/15 维</div>
        </div>`;
        })
        .join("")}
    </div>`;
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderResult() {
  const result = computeResult();
  const type = result.finalType;

  document.getElementById("resultModeKicker").textContent = result.modeKicker;
  document.getElementById("resultTypeName").textContent = `${type.code}（${type.cn}）`;
  document.getElementById("matchBadge").textContent = result.badge;
  document.getElementById("resultTypeSub").textContent = result.sub;
  document.getElementById("resultDesc").textContent = type.desc;
  document.getElementById("posterCaption").textContent = type.intro;

  const posterBox = document.getElementById("posterBox");
  const posterImage = document.getElementById("posterImage");
  const posterFallback = document.getElementById("posterFallback");
  const spriteSrc = TYPE_SPRITES[type.code];
  if (posterImage && posterBox) {
    posterImage.onload = null;
    posterImage.onerror = null;
    if (spriteSrc) {
      posterImage.alt = `${type.cn} 小人立绘`;
      posterImage.onerror = () => {
        posterBox.classList.remove("has-sprite");
        posterImage.removeAttribute("src");
        if (posterFallback) {
          posterFallback.hidden = false;
          posterFallback.textContent = type.emoji || "🐧";
        }
      };
      posterImage.src = spriteSrc;
      posterBox.classList.add("has-sprite");
      if (posterFallback) posterFallback.hidden = true;
    } else {
      posterImage.removeAttribute("src");
      posterImage.alt = "";
      posterBox.classList.remove("has-sprite");
      if (posterFallback) {
        posterFallback.hidden = false;
        posterFallback.textContent = type.emoji || "🐧";
      }
    }
  }

  document.getElementById("funNote").textContent = result.special
    ? "彩蛋与兜底结果均为玩梗设计。请勿用于选型、吵架、鄙视链或相亲。"
    : "本测试仅供娱乐，别拿它当职业规划、采购清单或鄙视链裁判。你可以笑，但别太当真。";

  renderDimList(result);
  renderTop3(result);
  showScreen("result");
}

function startTest() {
  app.answers = {};
  const shuffledRegular = shuffle(questions);
  const insertIndex = Math.floor(Math.random() * shuffledRegular.length) + 1;
  app.shuffledQuestions = [...shuffledRegular.slice(0, insertIndex), specialQuestions[0], ...shuffledRegular.slice(insertIndex)];
  renderQuestions();
  showScreen("test");
}

document.getElementById("startBtn")?.addEventListener("click", () => startTest());
document.getElementById("backIntroBtn")?.addEventListener("click", () => showScreen("intro"));
document.getElementById("submitBtn")?.addEventListener("click", renderResult);
document.getElementById("restartBtn")?.addEventListener("click", () => startTest());
document.getElementById("toTopBtn")?.addEventListener("click", () => showScreen("intro"));
