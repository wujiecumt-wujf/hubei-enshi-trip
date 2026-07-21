import fobaoshanLaunch from '../assets/trip/fobaoshan-launch.jpg'
import fobaoshanRapids from '../assets/trip/fobaoshan-rapids.jpg'
import pingshanBoats from '../assets/trip/pingshan-boats.jpg'
import pingshanWalkway from '../assets/trip/pingshan-walkway.jpg'
import tenglongShow from '../assets/trip/tenglong-show.jpg'
import tenglongWaterfall from '../assets/trip/tenglong-waterfall.jpg'
import xuanenFountain from '../assets/trip/xuanen-fountain.jpg'
import xuanenRiver from '../assets/trip/xuanen-river.jpg'

export type BookingCategory = '交通' | '住宿' | '门票'

export interface ScheduleItem {
  time: string
  title: string
  detail: string
  tag?: string
}

export interface HotelPlan {
  id: string
  date: string
  city: string
  name: string
  address: string
  price: string
  note: string
  url: string
}

export interface DayPlan {
  id: string
  dayNumber: number
  isoDate: string
  shortDate: string
  dateLabel: string
  weekday: string
  title: string
  route: string
  summary: string
  image: string
  imageAlt: string
  imageCredit: string
  detailImage?: string
  detailImageAlt?: string
  schedule: ScheduleItem[]
  warnings: string[]
  hotelId?: string
  phone?: {
    label: string
    number: string
  }
}

export interface BookingItem {
  id: string
  category: BookingCategory
  date: string
  title: string
  detail: string
  primaryLabel: string
  confirmLabel: string
  url?: string
  actionLabel?: string
  phone?: string
}

export interface ContingencyPlan {
  id: string
  dayId: string
  title: string
  trigger: string
  options: Array<{
    label: string
    detail: string
  }>
  phone?: string
}

export interface PackingGroup {
  id: string
  title: string
  description: string
  items: Array<{
    id: string
    label: string
  }>
}

export const hotels: HotelPlan[] = [
  {
    id: 'hotel-xuanen-ji',
    date: '8月5日',
    city: '宣恩',
    name: '全季酒店（宣恩县店）',
    address: '宣恩县兴隆首府B栋（县政府斜对面）',
    price: '房价与房态实时变化，以华住会为准',
    note: '距文澜桥公开信息标注步行约5分钟，夜游后可步行返店。',
    url: 'https://hotels.ctrip.com/hotels/121570265.html',
  },
  {
    id: 'hotel-enshi-railway-ji',
    date: '8月6日',
    city: '恩施',
    name: '全季酒店（恩施火车站店）',
    address: '恩施市金子坝街道金桂大道102号1号楼1楼',
    price: '房价与房态实时变化，以华住会为准',
    note: '距恩施站约0.88公里，公开信息称步行约10分钟，适合次日早班动车。',
    url: 'https://hotels.ctrip.com/hotels/135202452.html',
  },
  {
    id: 'hotel-lichuan-tenglong-ji',
    date: '8月7日',
    city: '利川',
    name: '全季酒店（恩施利川腾龙洞游客中心店）',
    address: '利川市东城办事处关东社区一组旅游路100号301幢',
    price: '房价与房态实时变化，以华住会为准',
    note: '距腾龙洞游客中心步行约8分钟、距利川站约4.8公里，并提供免费行李寄存。',
    url: 'https://hotels.ctrip.com/hotels/107442290.html',
  },
  {
    id: 'hotel-enshi-airport-hanting',
    date: '8月8日',
    city: '恩施',
    name: '汉庭酒店（恩施许家坪机场店）',
    address: '恩施市施州大道452号',
    price: '房价与房态实时变化，以华住会为准',
    note: '公开平台显示距许家坪机场约0.9—1.2公里，适合次日早班机。',
    url: 'https://hotels.ctrip.com/hotels/132256719.html',
  },
]

export const tripDays: DayPlan[] = [
  {
    id: 'day-1',
    dayNumber: 1,
    isoDate: '2026-08-05',
    shortDate: '8.05',
    dateLabel: '8月5日',
    weekday: '周三',
    title: '抵达宣恩 · 贡水河夜游',
    route: '徐州 → 南京 → 恩施 → 宣恩',
    summary: '把转机余量放在第一位，傍晚到宣恩后再按天气决定水上项目。',
    image: xuanenRiver,
    imageAlt: '贡水河夜间龙游贡水景观',
    imageCredit: '新华网，2024-08-29',
    detailImage: xuanenFountain,
    detailImageAlt: '贡水河音乐喷泉及沿岸夜景',
    schedule: [
      {
        time: '清晨',
        title: '徐州东 → 南京南',
        detail: '选择能在09:00左右或更早到南京南的车次；旧截图不能当作本次订单。',
        tag: '铁路',
      },
      {
        time: '约 09:00',
        title: '南京南 → 禄口机场 T1',
        detail: '地铁S1按门到门约60分钟预留；出租车按交通状况预留45—60分钟。',
        tag: '换乘',
      },
      {
        time: '计划 12:10',
        title: 'JD5761 南京 → 恩施',
        detail: '计划时刻12:10—14:00，航班号、航站楼和值机截止时间以最终订单为准。',
        tag: '航班',
      },
      {
        time: '14:30—16:30',
        title: '恩施机场 → 宣恩',
        detail: '取行李后前往全季酒店（宣恩县店）；山路和旺季交通按90分钟以上安排。',
        tag: '山路',
      },
      {
        time: '17:00—22:00',
        title: '文澜桥与贡水河夜游',
        detail: '文澜桥 → 沿河步道 → 兴隆老街晚餐 → 石板桥 → 返回酒店。',
        tag: '夜游',
      },
    ],
    warnings: [
      '“龙游贡水”、喷泉和其他演艺会因天气、客流及运营调整，不沿用旧场次。',
      '雷雨时取消水上项目和临水停留；小雨改走文澜桥—兴隆老街步行线。',
      '烤活鱼先确认鱼重、单价、配菜和辣度，避开水上项目临开场时点餐。',
    ],
    hotelId: 'hotel-xuanen-ji',
  },
  {
    id: 'day-2',
    dayNumber: 2,
    isoDate: '2026-08-06',
    shortDate: '8.06',
    dateLabel: '8月6日',
    weekday: '周四',
    title: '鹤峰屏山峡谷',
    route: '宣恩 → 屏山峡谷 → 恩施',
    summary: '较早分时入园，按单向峡谷线游览；离园后直接转住恩施站片区。',
    image: pingshanBoats,
    imageAlt: '屏山峡谷水域与游船',
    imageCredit: '新华网，2025-07-11',
    detailImage: pingshanWalkway,
    detailImageAlt: '游客沿屏山峡谷水边步道游览',
    schedule: [
      {
        time: '06:30—07:00',
        title: '早餐、退房、带齐证件',
        detail: '出发前确认预约时段、天气、游船状态和行李寄存。',
        tag: '确认',
      },
      {
        time: '07:00—09:00',
        title: '宣恩 → 屏山峡谷',
        detail: '包车或顺风车优先确认总价与等待；公共班车需前一日复核。',
        tag: '山路',
      },
      {
        time: '09:00—14:00',
        title: '屏山峡谷单向游览',
        detail: '游客中心 → 连续下峡谷台阶 → 码头乘船 → 出口接驳；旺季留出排队时间。',
        tag: '4—5小时',
      },
      {
        time: '14:00以后',
        title: '屏山 → 恩施站片区',
        detail: '提前落实离园车辆，按山路和晚高峰留足时间，入住全季酒店（恩施火车站店）。',
        tag: '转场',
      },
    ],
    warnings: [
      '标准体验包含连续台阶、湿滑步道和船段，不是“多数乘船、少量台阶”。',
      '同行人以最慢者为节奏；码头穿好救生衣，不抢船边机位。',
      '峡谷光束、水色和“悬浮船”效果受阳光、降雨及水位影响。',
    ],
    hotelId: 'hotel-enshi-railway-ji',
    phone: {
      label: '屏山峡谷咨询',
      number: '0718-5282222',
    },
  },
  {
    id: 'day-3',
    dayNumber: 3,
    isoDate: '2026-08-07',
    shortDate: '8.07',
    dateLabel: '8月7日',
    weekday: '周五',
    title: '利川 · 佛宝山漂流',
    route: '恩施 → 利川 → 佛宝山',
    summary: '这是全程关键节点：资格、开漂、下午批次和往返车辆缺一不可。',
    image: fobaoshanRapids,
    imageAlt: '游客穿戴头盔和救生衣通过佛宝山急流',
    imageCredit: '文旅利川，经网易转载，2025-08-01',
    detailImage: fobaoshanLaunch,
    detailImageAlt: '佛宝山漂流起漂区装备领取与排队',
    schedule: [
      {
        time: '早晨',
        title: '恩施站 → 利川站',
        detail: '从全季酒店（恩施火车站店）步行或打车前往恩施站，乘开售后的较早动车；到利川后寄存行李。',
        tag: '铁路',
      },
      {
        time: '上午',
        title: '利川 → 佛宝山',
        detail: '按景区电话答复选择直通车、包车或自驾，不凭旧攻略假设固定班车。',
        tag: '先确认',
      },
      {
        time: '中午至下午',
        title: '换装、接驳、漂流',
        detail: '按已确认批次预留停车、排队、装备领取和安全讲解时间。',
        tag: '4—6小时',
      },
      {
        time: '傍晚',
        title: '冲洗换衣 → 返回利川',
        detail: '清点人员和物品，及时更换湿衣，山风中注意保暖。',
        tag: '返程',
      },
    ],
    warnings: [
      '任何一个执行条件未确认，就改为利川休整或腾龙洞，不冒险赶漂。',
      '未得到下午批次明确答复前，不付款预订不可退包车或漂流票。',
      '饮酒、发热、明显不适、伤病未愈或景区判定不适合时主动放弃。',
    ],
    hotelId: 'hotel-lichuan-tenglong-ji',
    phone: {
      label: '佛宝山咨询',
      number: '0718-7106555',
    },
  },
  {
    id: 'day-4',
    dayNumber: 4,
    isoDate: '2026-08-08',
    shortDate: '8.08',
    dateLabel: '8月8日',
    weekday: '周六',
    title: '腾龙洞 · 返回恩施',
    route: '利川腾龙洞 → 恩施',
    summary: '先读当天演出表再倒排洞内路线，下午留足取行李和进站余量。',
    image: tenglongWaterfall,
    imageAlt: '腾龙洞卧龙吞江自然奇观',
    imageCredit: '新华社发，2025-07-11',
    detailImage: tenglongShow,
    detailImageAlt: '腾龙洞内实景剧夷水丽川',
    schedule: [
      {
        time: '08:00前后',
        title: '退房、寄存行李',
        detail: '在全季酒店（恩施利川腾龙洞游客中心店）寄存行李，轻装进入腾龙洞。',
        tag: '寄存',
      },
      {
        time: '上午至中午',
        title: '腾龙洞游览',
        detail: '读取当天演出表，按场次决定洞景优先或演出优先；按体力选择观光车。',
        tag: '4—5小时',
      },
      {
        time: '下午',
        title: '取行李 → 利川站 → 恩施站',
        detail: '给离场、叫车、取行李和进站留足余量；动车以12306订单为准。',
        tag: '铁路',
      },
      {
        time: '傍晚',
        title: '入住恩施',
        detail: '入住汉庭酒店（恩施许家坪机场店）。土司城只在时间与开放状态都允许时追加。',
        tag: '休整',
      },
    ],
    warnings: [
      '洞内深处体感约12—18℃，带可快速穿脱的薄外套。',
      '门票、观光车和演出是否分项，以2026购票页为准；旧价格不作承诺。',
      '距下一场不足60—90分钟时先去剧场；不要沿用旧攻略中的固定场次。',
    ],
    hotelId: 'hotel-enshi-airport-hanting',
  },
  {
    id: 'day-5',
    dayNumber: 5,
    isoDate: '2026-08-09',
    shortDate: '8.09',
    dateLabel: '8月9日',
    weekday: '周日',
    title: '返程 · 恩施到徐州',
    route: '恩施 → 南京 → 徐州',
    summary: '飞机与高铁不是同一联程订单，南京南返程保留2.5—3小时衔接。',
    image: xuanenFountain,
    imageAlt: '湖北恩施宣恩夜景，为五日旅程收尾',
    imageCredit: '新华网，2024-08-29',
    schedule: [
      {
        time: '建议 06:45',
        title: '机场汉庭 → 恩施机场 T1',
        detail: '公开平台显示酒店距机场约0.9—1.2公里，仍建议计入叫车、装行李和早班机场排队。',
        tag: '退房',
      },
      {
        time: '计划 09:25',
        title: 'JD5762 恩施 → 南京',
        detail: '计划时刻09:25—11:05；前一晚核对航班动态、航站楼和值机要求。',
        tag: '航班',
      },
      {
        time: '约 11:30—13:00',
        title: '禄口机场 → 南京南',
        detail: '取行李后乘S1或出租车，不按落地时刻购买无缓冲高铁。',
        tag: '换乘',
      },
      {
        time: '建议 13:30以后',
        title: '南京南 → 徐州东',
        detail: '选择可改签、衔接宽松的车次，具体以12306开售后的订单为准。',
        tag: '铁路',
      },
    ],
    warnings: [
      '前一晚核对JD5762航班动态、航站楼、行李额和值机截止时间。',
      '南京南返程票优先选择可改签车次，不为少等几十分钟承担误车风险。',
      '航班明显延误时先处理高铁改签，再决定机场到南京南的交通方式。',
    ],
  },
]

export const bookingItems: BookingItem[] = [
  {
    id: 'flight-out',
    category: '交通',
    date: '8月5日',
    title: 'JD5761 南京 → 恩施',
    detail: '计划12:10—14:00；核对日期、航站楼、行李额和值机截止时间。',
    primaryLabel: '已出票',
    confirmLabel: '48小时已复核',
  },
  {
    id: 'train-xuzhou-nanjing',
    category: '交通',
    date: '8月5日',
    title: '徐州东 → 南京南',
    detail: '选择09:00左右或更早到南京南的车次。',
    primaryLabel: '已出票',
    confirmLabel: '车次已复核',
    url: 'https://www.12306.cn/index/',
    actionLabel: '打开12306',
  },
  {
    id: 'train-enshi-lichuan',
    category: '交通',
    date: '8月7日',
    title: '恩施 → 利川',
    detail: '优先较早动车，为佛宝山交通和批次留余量。',
    primaryLabel: '已出票',
    confirmLabel: '车次已复核',
    url: 'https://www.12306.cn/index/',
    actionLabel: '打开12306',
  },
  {
    id: 'train-lichuan-enshi',
    category: '交通',
    date: '8月8日',
    title: '利川 → 恩施',
    detail: '按腾龙洞离场、取行李和进站所需时间选车。',
    primaryLabel: '已出票',
    confirmLabel: '车次已复核',
    url: 'https://www.12306.cn/index/',
    actionLabel: '打开12306',
  },
  {
    id: 'flight-home',
    category: '交通',
    date: '8月9日',
    title: 'JD5762 恩施 → 南京',
    detail: '计划09:25—11:05；核对日期、航站楼、行李额和值机截止时间。',
    primaryLabel: '已出票',
    confirmLabel: '48小时已复核',
  },
  {
    id: 'train-nanjing-xuzhou',
    category: '交通',
    date: '8月9日',
    title: '南京南 → 徐州东',
    detail: '与落地时间保留2.5—3小时，优先选择可改签车次。',
    primaryLabel: '已出票',
    confirmLabel: '车次已复核',
    url: 'https://www.12306.cn/index/',
    actionLabel: '打开12306',
  },
  ...hotels.map((hotel) => ({
    id: hotel.id,
    category: '住宿' as const,
    date: hotel.date,
    title: hotel.name,
    detail: `${hotel.price}；${hotel.note}`,
    primaryLabel: '已订房',
    confirmLabel: '取消政策已复核',
    url: hotel.url,
    actionLabel: '查看酒店',
  })),
  {
    id: 'xuanen-night',
    category: '门票',
    date: '8月5日',
    title: '宣恩夜间动态项目',
    detail: '查询当晚水上项目、检票点、末班、天气和取消规则。',
    primaryLabel: '当日公告已查',
    confirmLabel: '天气已复核',
  },
  {
    id: 'pingshan-ticket',
    category: '门票',
    date: '8月6日',
    title: '屏山峡谷分时预约',
    detail: '同步确认游船状态、行李寄存和离园接驳。',
    primaryLabel: '已预约',
    confirmLabel: '48小时已复核',
    phone: '0718-5282222',
  },
  {
    id: 'fobaoshan-ticket',
    category: '门票',
    date: '8月7日',
    title: '佛宝山漂流资格与批次',
    detail: '逐人报告年龄、身高和健康状况；确认下午批次后再锁交通。',
    primaryLabel: '资格与批次已确认',
    confirmLabel: '往返车辆已落实',
    phone: '0718-7106555',
  },
  {
    id: 'tenglong-ticket',
    category: '门票',
    date: '8月8日',
    title: '腾龙洞票种与演出',
    detail: '核对门票、观光车、演出是否分项，并按当天演出表倒排。',
    primaryLabel: '已购票',
    confirmLabel: '演出表已复核',
  },
]

export const contingencies: ContingencyPlan[] = [
  {
    id: 'xuanen-weather',
    dayId: 'day-1',
    title: '宣恩水上项目取消',
    trigger: '雷雨、强风，或当晚公告取消“龙游贡水”等水上项目。',
    options: [
      {
        label: '小雨方案',
        detail: '文澜桥 → 兴隆老街 → 沿河餐饮；缩短临水停留，步行结束后返店。',
      },
      {
        label: '雷雨方案',
        detail: '取消水上项目和河边拍摄，改为老街室内晚餐或直接回酒店休整。',
      },
    ],
  },
  {
    id: 'pingshan-closed',
    dayId: 'day-2',
    title: '屏山停航或无法入园',
    trigger: '景区宣布停航、闭园，或山路存在地质风险。',
    options: [
      {
        label: '不要强行前往',
        detail: '不从非正规入口进入，也不在没有返程保障的情况下上山。',
      },
      {
        label: '转恩施城区',
        detail: '提前回恩施，安排城区轻量活动并入住全季酒店（恩施火车站店），保住次日早班动车。',
      },
      {
        label: '提前去利川',
        detail: '若铁路与酒店允许，可提前执行后续交通，为佛宝山或腾龙洞增加余量。',
      },
    ],
    phone: '0718-5282222',
  },
  {
    id: 'fobaoshan-closed',
    dayId: 'day-3',
    title: '佛宝山不满足执行条件',
    trigger: '资格、开漂、下午批次或往返车辆任一项未确认，或当天停漂。',
    options: [
      {
        label: '陆上区安全开放',
        detail: '改走森林瀑布等陆上区域，严格按景区开放范围活动。',
      },
      {
        label: '腾龙洞可执行',
        detail: '若票务、演出和交通均已确认，提前执行D4腾龙洞行程。',
      },
      {
        label: '暴雨或交通不稳',
        detail: '返回利川休整，不新增山路行程；保留次日铁路和返恩施计划。',
      },
    ],
    phone: '0718-7106555',
  },
  {
    id: 'tenglong-change',
    dayId: 'day-4',
    title: '腾龙洞场次变化或极端天气',
    trigger: '演出取消、景区限流，或极端天气影响道路与铁路。',
    options: [
      {
        label: '普通雨天',
        detail: '景区正常开放时仍可游洞，先读当天演出表并缩减非核心区域。',
      },
      {
        label: '只取消演出',
        detail: '保留卧龙吞江、洞口和洞内地貌，提前离场取行李。',
      },
      {
        label: '交通受影响',
        detail: '优先处理利川至恩施铁路与当晚住宿，不追加土司城等活动。',
      },
    ],
  },
  {
    id: 'return-delay',
    dayId: 'day-5',
    title: '返程航班延误',
    trigger: 'JD5762延误，原南京南至徐州东车次可能赶不上。',
    options: [
      {
        label: '先改铁路',
        detail: '通过12306改签到更晚、可衔接的车次，不按计划落地时间冒险赶车。',
      },
      {
        label: '保留换乘余量',
        detail: '取行李后再决定S1或出租车；飞机和高铁通常不具备联程保护。',
      },
    ],
  },
]

export const fobaoshanGate = [
  { id: 'eligible', label: '所有人的年龄、身高和健康资格已确认' },
  { id: 'open', label: '景区已明确当日开漂' },
  { id: 'session', label: '已确认能赶上的下午批次' },
  { id: 'vehicle', label: '往返车辆、费用和等待安排已落实' },
]

export const packingGroups: PackingGroup[] = [
  {
    id: 'documents',
    title: '证件与订单',
    description: '关键资料在同行人手机留一份。',
    items: [
      { id: 'id-card', label: '身份证及儿童证件' },
      { id: 'orders', label: '航班、铁路、酒店和门票订单截图' },
      { id: 'phones', label: '景区电话与酒店地址离线保存' },
      { id: 'power', label: '充电器、充电宝和数据线' },
    ],
  },
  {
    id: 'walking',
    title: '山路与步行',
    description: '屏山台阶和湿滑步道按长距离步行准备。',
    items: [
      { id: 'shoes', label: '防滑运动鞋' },
      { id: 'sun', label: '帽子、防晒和驱蚊用品' },
      { id: 'water', label: '饮水和少量电解质' },
      { id: 'rain', label: '轻便雨具' },
    ],
  },
  {
    id: 'rafting',
    title: '佛宝山漂流',
    description: '证件和车钥匙使用双层防水。',
    items: [
      { id: 'water-shoes', label: '包脚涉水鞋' },
      { id: 'quick-dry', label: '速干衣和完整干衣' },
      { id: 'towel', label: '毛巾与双层密封袋' },
      { id: 'glasses', label: '眼镜固定绳' },
    ],
  },
  {
    id: 'cave-health',
    title: '洞穴与健康',
    description: '山路晕车与洞内温差提前处理。',
    items: [
      { id: 'jacket', label: '可快速穿脱的薄外套' },
      { id: 'motion-sickness', label: '晕车药' },
      { id: 'prescription', label: '个人处方药' },
      { id: 'first-aid', label: '简单外伤用品' },
    ],
  },
]