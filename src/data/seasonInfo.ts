import type { SeasonMonth } from '@/types';

export const seasonInfo: SeasonMonth[] = [
  // ==================== 东京 (tokyo) ====================
  // 1月
  {
    month: 1,
    destinationId: 'tokyo',
    score: 3,
    weather: '寒冷干燥，2-10°C',
    highlights: ['新年参拜', '神社初�的', '温泉旅行'],
    risks: ['气温较低', '部分景点新年休业'],
    tags: ['雪季'],
  },
  // 2月
  {
    month: 2,
    destinationId: 'tokyo',
    score: 3,
    weather: '寒冷干燥，3-10°C',
    highlights: ['梅花观赏', '温泉旅行', '草莓采摘'],
    risks: ['气温较低', '偶有降雪'],
    tags: ['雪季', '淡季'],
  },
  // 3月
  {
    month: 3,
    destinationId: 'tokyo',
    score: 5,
    weather: '渐暖回春，10-17°C',
    highlights: ['早樱绽放', '赏花野餐', '上野公园'],
    risks: ['早晚温差大', '花期受天气影响'],
    tags: ['花期'],
  },
  // 4月
  {
    month: 4,
    destinationId: 'tokyo',
    score: 5,
    weather: '温暖宜人，12-20°C',
    highlights: ['樱花满开', '赏花名所巡礼', '目黑川夜樱'],
    risks: ['游客众多', '住宿紧张需提前预订'],
    tags: ['花期', '旺季'],
  },
  // 5月
  {
    month: 5,
    destinationId: 'tokyo',
    score: 4,
    weather: '晴朗舒适，16-24°C',
    highlights: ['新绿时节', '紫藤花观赏', '黄金周活动'],
    risks: ['黄金周期间人流量大', '部分景点拥挤'],
    tags: ['平季'],
  },
  // 6月
  {
    month: 6,
    destinationId: 'tokyo',
    score: 3,
    weather: '闷热潮湿，20-26°C',
    highlights: ['紫阳花盛开', '梅雨季独特风情'],
    risks: ['梅雨季多雨', '湿度较高体感闷热'],
    tags: ['雨季'],
  },
  // 7月
  {
    month: 7,
    destinationId: 'tokyo',
    score: 4,
    weather: '炎热潮湿，24-31°C',
    highlights: ['花火大会', '夏日祭典', '浴衣体验'],
    risks: ['高温酷暑', '突发雷阵雨'],
    tags: ['烟花季', '旺季'],
  },
  // 8月
  {
    month: 8,
    destinationId: 'tokyo',
    score: 4,
    weather: '酷暑高温，25-33°C',
    highlights: ['花火大会', '盂兰盆节', '夏日祭典'],
    risks: ['持续高温', '紫外线强烈'],
    tags: ['烟花季', '旺季'],
  },
  // 9月
  {
    month: 9,
    destinationId: 'tokyo',
    score: 3,
    weather: '暑气渐消，22-29°C',
    highlights: ['秋季美食', '中秋赏月'],
    risks: ['台风频发', '暴雨可能影响行程'],
    tags: ['台风季'],
  },
  // 10月
  {
    month: 10,
    destinationId: 'tokyo',
    score: 4,
    weather: '秋高气爽，15-23°C',
    highlights: ['红叶渐染', '秋季美食节', '万圣节活动'],
    risks: ['偶有台风尾声', '早晚渐凉'],
    tags: ['平季'],
  },
  // 11月
  {
    month: 11,
    destinationId: 'tokyo',
    score: 5,
    weather: '凉爽宜人，10-18°C',
    highlights: ['枫叶最佳观赏期', '明治神宫外苑银杏', '红叶狩'],
    risks: ['热门赏枫点人多', '需提前预订住宿'],
    tags: ['枫叶季', '旺季'],
  },
  // 12月
  {
    month: 12,
    destinationId: 'tokyo',
    score: 4,
    weather: '寒冷干燥，4-12°C',
    highlights: ['圣诞灯饰', '温泉旅行', '北海道雪景'],
    risks: ['气温低需保暖', '年末交通拥挤'],
    tags: ['雪季'],
  },

  // ==================== 巴黎 (paris) ====================
  // 1月
  {
    month: 1,
    destinationId: 'paris',
    score: 2,
    weather: '阴冷潮湿，2-7°C',
    highlights: ['冬季打折季', '博物馆深度游', '人少清静'],
    risks: ['日照时间短', '阴雨天气多'],
    tags: ['淡季'],
  },
  // 2月
  {
    month: 2,
    destinationId: 'paris',
    score: 2,
    weather: '阴冷潮湿，3-8°C',
    highlights: ['情人节浪漫之都', '博物馆免排队', '咖啡馆文化'],
    risks: ['气温较低', '户外活动受限'],
    tags: ['淡季'],
  },
  // 3月
  {
    month: 3,
    destinationId: 'paris',
    score: 3,
    weather: '初春微寒，5-13°C',
    highlights: ['初春花园萌芽', '塞纳河漫步', '游客较少'],
    risks: ['天气不稳定', '早晚仍冷'],
    tags: ['平季'],
  },
  // 4月
  {
    month: 4,
    destinationId: 'paris',
    score: 5,
    weather: '春暖花开，7-16°C',
    highlights: ['春暖花开', '卢森堡公园花海', '户外露台咖啡'],
    risks: ['偶有春雨', '复活节期间游客增多'],
    tags: ['花期', '旺季'],
  },
  // 5月
  {
    month: 5,
    destinationId: 'paris',
    score: 5,
    weather: '晴朗温暖，11-20°C',
    highlights: ['完美天气', '户外野餐', '莫奈花园'],
    risks: ['热门景点排队渐长', '需提前购票'],
    tags: ['旺季'],
  },
  // 6月
  {
    month: 6,
    destinationId: 'paris',
    score: 5,
    weather: '阳光充沛，14-23°C',
    highlights: ['最长白昼', '音乐节', '塞纳河游船'],
    risks: ['旅游旺季价格上涨', '需提前预订'],
    tags: ['旺季'],
  },
  // 7月
  {
    month: 7,
    destinationId: 'paris',
    score: 3,
    weather: '炎热晴朗，16-26°C',
    highlights: ['国庆烟火', '塞纳河畔沙滩', '露天电影'],
    risks: ['游客高峰', '部分店铺因暑假休业'],
    tags: ['旺季'],
  },
  // 8月
  {
    month: 8,
    destinationId: 'paris',
    score: 3,
    weather: '炎热晴朗，16-26°C',
    highlights: ['巴黎沙滩节', '户外活动丰富'],
    risks: ['游客高峰', '本地人度假许多餐厅关门'],
    tags: ['旺季'],
  },
  // 9月
  {
    month: 9,
    destinationId: 'paris',
    score: 5,
    weather: '秋高气爽，13-22°C',
    highlights: ['天气舒适', '文化季开幕', '时装周'],
    risks: ['文化活动期间住宿紧张', '价格略有上涨'],
    tags: ['平季'],
  },
  // 10月
  {
    month: 10,
    destinationId: 'paris',
    score: 5,
    weather: '金秋时节，9-17°C',
    highlights: ['秋色迷人', '博物馆新展', '街头摄影最佳'],
    risks: ['日照渐短', '需备外套'],
    tags: ['平季'],
  },
  // 11月
  {
    month: 11,
    destinationId: 'paris',
    score: 3,
    weather: '深秋微寒，5-11°C',
    highlights: ['深秋落叶', '博物馆人少', '美酒佳节'],
    risks: ['阴雨天气增多', '日照时间短'],
    tags: ['淡季'],
  },
  // 12月
  {
    month: 12,
    destinationId: 'paris',
    score: 4,
    weather: '寒冷有节日氛围，3-8°C',
    highlights: ['圣诞集市', '香榭丽舍灯饰', '节日氛围浓厚'],
    risks: ['气温较低', '圣诞期间部分景点休息'],
    tags: ['旺季'],
  },

  // ==================== 新西兰 (new-zealand) ====================
  // 1月
  {
    month: 1,
    destinationId: 'new-zealand',
    score: 5,
    weather: '夏季温暖，13-23°C',
    highlights: ['夏季户外运动', '自驾公路旅行', '海滩活动'],
    risks: ['旺季住宿紧张', '热门步道需预订'],
    tags: ['旺季'],
  },
  // 2月
  {
    month: 2,
    destinationId: 'new-zealand',
    score: 5,
    weather: '夏季温暖，13-23°C',
    highlights: ['夏季尾声', '薰衣草花田', '特卡波湖星空'],
    risks: ['部分地区紫外线极强', '需做好防晒'],
    tags: ['旺季'],
  },
  // 3月
  {
    month: 3,
    destinationId: 'new-zealand',
    score: 4,
    weather: '初秋凉爽，11-20°C',
    highlights: ['初秋色彩', '葡萄采摘季', '马尔堡酒庄'],
    risks: ['早晚温差加大', '部分夏季活动结束'],
    tags: ['平季'],
  },
  // 4月
  {
    month: 4,
    destinationId: 'new-zealand',
    score: 4,
    weather: '秋意渐浓，8-17°C',
    highlights: ['秋色绚烂', '箭镇金叶', '温泉享受'],
    risks: ['白天渐短', '山区可能降温明显'],
    tags: ['平季'],
  },
  // 5月
  {
    month: 5,
    destinationId: 'new-zealand',
    score: 3,
    weather: '深秋寒凉，5-13°C',
    highlights: ['深秋风光', '雪山初现', '淡季优惠'],
    risks: ['气温下降明显', '部分步道因天气关闭'],
    tags: ['淡季'],
  },
  // 6月
  {
    month: 6,
    destinationId: 'new-zealand',
    score: 3,
    weather: '冬季寒冷，3-10°C',
    highlights: ['滑雪季开始', '皇后镇滑雪场', '冬季星空'],
    risks: ['山区道路可能结冰', '日照时间短'],
    tags: ['雪季', '淡季'],
  },
  // 7月
  {
    month: 7,
    destinationId: 'new-zealand',
    score: 3,
    weather: '冬季寒冷，2-10°C',
    highlights: ['滑雪旺季', '瓦纳卡滑雪', '冬季温泉'],
    risks: ['气温最低', '部分道路需雪链'],
    tags: ['雪季'],
  },
  // 8月
  {
    month: 8,
    destinationId: 'new-zealand',
    score: 3,
    weather: '冬末微寒，3-11°C',
    highlights: ['滑雪季', '冬季景观壮美', '观鲸季节'],
    risks: ['天气多变', '高山地区仍有大雪'],
    tags: ['雪季'],
  },
  // 9月
  {
    month: 9,
    destinationId: 'new-zealand',
    score: 4,
    weather: '初春回暖，5-14°C',
    highlights: ['春季来临', '羊驼宝宝出生季', '花季开始'],
    risks: ['天气不稳定', '春季多风'],
    tags: ['花期'],
  },
  // 10月
  {
    month: 10,
    destinationId: 'new-zealand',
    score: 4,
    weather: '春暖花开，7-16°C',
    highlights: ['鲁冰花初放', '蒂卡波湖区', '步道重新开放'],
    risks: ['天气仍有波动', '早晚偏凉'],
    tags: ['花期'],
  },
  // 11月
  {
    month: 11,
    destinationId: 'new-zealand',
    score: 5,
    weather: '温暖宜人，9-19°C',
    highlights: ['鲁冰花盛开', '户外徒步最佳', '米尔福德步道'],
    risks: ['热门步道需提前预约', '紫外线渐强'],
    tags: ['花期', '旺季'],
  },
  // 12月
  {
    month: 12,
    destinationId: 'new-zealand',
    score: 5,
    weather: '夏季开始，12-22°C',
    highlights: ['最佳自驾季节', '冰川徒步', '峡湾巡游'],
    risks: ['圣诞旺季价格高', '需提前预订住宿和活动'],
    tags: ['旺季'],
  },

  // ==================== 曼谷 (bangkok) ====================
  // 1月
  {
    month: 1,
    destinationId: 'bangkok',
    score: 5,
    weather: '凉爽舒适，25-32°C',
    highlights: ['凉季最佳天气', '寺庙巡礼', '夜市美食'],
    risks: ['旺季游客较多', '热门景点排队'],
    tags: ['旺季'],
  },
  // 2月
  {
    month: 2,
    destinationId: 'bangkok',
    score: 5,
    weather: '凉爽干燥，26-33°C',
    highlights: ['春节庆典', '水上市场', '大皇宫参观'],
    risks: ['春节期间华人游客多', '部分价格上涨'],
    tags: ['旺季'],
  },
  // 3月
  {
    month: 3,
    destinationId: 'bangkok',
    score: 3,
    weather: '炎热干燥，28-35°C',
    highlights: ['热季开始', '室内商场购物', '泰式按摩'],
    risks: ['高温炎热', '户外活动需防暑'],
    tags: ['淡季'],
  },
  // 4月
  {
    month: 4,
    destinationId: 'bangkok',
    score: 3,
    weather: '酷热难耐，30-38°C',
    highlights: ['泼水节狂欢', '宋干节体验', '热带水果季'],
    risks: ['全年最热', '中暑风险高'],
    tags: ['淡季'],
  },
  // 5月
  {
    month: 5,
    destinationId: 'bangkok',
    score: 3,
    weather: '闷热多雨，29-35°C',
    highlights: ['雨季初临', '热带水果丰富', '淡季优惠'],
    risks: ['午后雷阵雨', '湿度较高'],
    tags: ['淡季'],
  },
  // 6月
  {
    month: 6,
    destinationId: 'bangkok',
    score: 2,
    weather: '闷热多雨，27-33°C',
    highlights: ['雨季绿意盎然', '淡季折扣多', '室内景点'],
    risks: ['降雨频繁', '部分地区可能积水'],
    tags: ['雨季'],
  },
  // 7月
  {
    month: 7,
    destinationId: 'bangkok',
    score: 2,
    weather: '闷热多雨，27-33°C',
    highlights: ['守夏节', '淡季住宿优惠', '本地美食探索'],
    risks: ['持续降雨', '交通可能受影响'],
    tags: ['雨季'],
  },
  // 8月
  {
    month: 8,
    destinationId: 'bangkok',
    score: 2,
    weather: '闷热多雨，27-32°C',
    highlights: ['母亲节庆典', '淡季深度游', '美食市场'],
    risks: ['雨季高峰', '偶有洪涝风险'],
    tags: ['雨季'],
  },
  // 9月
  {
    month: 9,
    destinationId: 'bangkok',
    score: 2,
    weather: '闷热多雨，27-32°C',
    highlights: ['素食节', '淡季优惠最多', '文化体验'],
    risks: ['全年降雨量最大', '出行需备雨具'],
    tags: ['雨季'],
  },
  // 10月
  {
    month: 10,
    destinationId: 'bangkok',
    score: 3,
    weather: '雨季尾声，27-33°C',
    highlights: ['水灯节临近', '雨季渐退', '寺庙清净'],
    risks: ['仍有阵雨', '湿度偏高'],
    tags: ['雨季'],
  },
  // 11月
  {
    month: 11,
    destinationId: 'bangkok',
    score: 5,
    weather: '凉爽宜人，25-32°C',
    highlights: ['水灯节', '凉季开始', '最佳旅行月份'],
    risks: ['水灯节期间人流量大', '住宿需提前预订'],
    tags: ['旺季'],
  },
  // 12月
  {
    month: 12,
    destinationId: 'bangkok',
    score: 5,
    weather: '凉爽干燥，25-31°C',
    highlights: ['跨年倒计时', '凉季舒适', '夜市热闹'],
    risks: ['圣诞跨年游客多', '机票住宿价格高'],
    tags: ['旺季'],
  },

  // ==================== 罗马 (rome) ====================
  // 1月
  {
    month: 1,
    destinationId: 'rome',
    score: 2,
    weather: '阴冷潮湿，5-12°C',
    highlights: ['冬季打折季', '博物馆深度游', '人少清静'],
    risks: ['阴雨较多', '日照时间短'],
    tags: ['淡季'],
  },
  // 2月
  {
    month: 2,
    destinationId: 'rome',
    score: 2,
    weather: '阴冷微湿，5-13°C',
    highlights: ['狂欢节', '博物馆免排队', '淡季优惠'],
    risks: ['天气不稳定', '部分景点缩短营业时间'],
    tags: ['淡季'],
  },
  // 3月
  {
    month: 3,
    destinationId: 'rome',
    score: 3,
    weather: '初春渐暖，7-15°C',
    highlights: ['春季来临', '复活节活动', '游客渐增'],
    risks: ['天气多变', '早晚偏冷'],
    tags: ['淡季'],
  },
  // 4月
  {
    month: 4,
    destinationId: 'rome',
    score: 5,
    weather: '温暖宜人，10-20°C',
    highlights: ['完美天气', '西班牙阶梯花展', '户外用餐'],
    risks: ['复活节前后游客增多', '需提前预订景点门票'],
    tags: ['旺季'],
  },
  // 5月
  {
    month: 5,
    destinationId: 'rome',
    score: 5,
    weather: '晴朗温暖，15-25°C',
    highlights: ['最佳旅行月份', '鲜花盛开', '户外活动丰富'],
    risks: ['游客数量上升', '热门景点需排队'],
    tags: ['旺季'],
  },
  // 6月
  {
    month: 6,
    destinationId: 'rome',
    score: 5,
    weather: '阳光明媚，18-28°C',
    highlights: ['长日照', '露天音乐会', '广场夜生活'],
    risks: ['气温渐高', '需做好防晒'],
    tags: ['旺季'],
  },
  // 7月
  {
    month: 7,
    destinationId: 'rome',
    score: 3,
    weather: '炎热干燥，22-33°C',
    highlights: ['夏日夜游', '露天电影', '夏季折扣'],
    risks: ['酷暑难耐', '游客高峰拥挤'],
    tags: ['旺季'],
  },
  // 8月
  {
    month: 8,
    destinationId: 'rome',
    score: 3,
    weather: '酷暑高温，25-35°C',
    highlights: ['八月假期氛围', '夜间活动', '周边海滩'],
    risks: ['全年最热', '部分餐厅商铺休假关门'],
    tags: ['旺季'],
  },
  // 9月
  {
    month: 9,
    destinationId: 'rome',
    score: 5,
    weather: '秋高气爽，20-28°C',
    highlights: ['天气宜人', '文化活动季', '葡萄酒季'],
    risks: ['偶有阵雨', '夏秋之交天气偶有波动'],
    tags: ['平季'],
  },
  // 10月
  {
    month: 10,
    destinationId: 'rome',
    score: 5,
    weather: '温和舒适，18-23°C',
    highlights: ['秋色优美', '美食节', '松露季'],
    risks: ['降雨概率增加', '日照渐短'],
    tags: ['平季'],
  },
  // 11月
  {
    month: 11,
    destinationId: 'rome',
    score: 3,
    weather: '凉爽多雨，8-17°C',
    highlights: ['深秋古城', '博物馆人少', '美食体验'],
    risks: ['阴雨天气增多', '部分户外景点体验下降'],
    tags: ['淡季'],
  },
  // 12月
  {
    month: 12,
    destinationId: 'rome',
    score: 3,
    weather: '寒冷有节日感，5-13°C',
    highlights: ['圣诞装饰', '梵蒂冈圣诞弥撒', '新年烟火'],
    risks: ['气温低', '圣诞期间部分景点休息'],
    tags: ['淡季'],
  },

  // ==================== 云南 (yunnan) ====================
  // 1月
  {
    month: 1,
    destinationId: 'yunnan',
    score: 3,
    weather: '干燥寒冷，2-15°C',
    highlights: ['冬日暖阳', '滇池红嘴鸥', '腊梅观赏'],
    risks: ['高海拔地区寒冷', '山区道路可能结冰'],
    tags: ['淡季'],
  },
  // 2月
  {
    month: 2,
    destinationId: 'yunnan',
    score: 3,
    weather: '干燥渐暖，4-17°C',
    highlights: ['罗平油菜花', '春节民俗', '早春气息'],
    risks: ['春节期间游客多', '昼夜温差大'],
    tags: ['淡季'],
  },
  // 3月
  {
    month: 3,
    destinationId: 'yunnan',
    score: 5,
    weather: '春暖花开，8-22°C',
    highlights: ['大理樱花', '春茶采摘', '油菜花海'],
    risks: ['紫外线较强', '需注意防晒'],
    tags: ['花期'],
  },
  // 4月
  {
    month: 4,
    destinationId: 'yunnan',
    score: 5,
    weather: '温暖舒适，12-25°C',
    highlights: ['泼水节', '丽江古城', '杜鹃花盛开'],
    risks: ['泼水节期间住宿紧张', '热门景区拥挤'],
    tags: ['花期'],
  },
  // 5月
  {
    month: 5,
    destinationId: 'yunnan',
    score: 5,
    weather: '晴朗宜人，15-25°C',
    highlights: ['蓝花楹盛开', '普洱茶山', '香格里拉花海'],
    risks: ['雨季将至偶有阵雨', '高海拔地区需注意高反'],
    tags: ['花期'],
  },
  // 6月
  {
    month: 6,
    destinationId: 'yunnan',
    score: 3,
    weather: '温暖多雨，17-25°C',
    highlights: ['雨季绿意盎然', '野生菌美食', '梯田注水'],
    risks: ['降雨频繁', '山区可能有滑坡风险'],
    tags: ['雨季'],
  },
  // 7月
  {
    month: 7,
    destinationId: 'yunnan',
    score: 3,
    weather: '温润多雨，18-25°C',
    highlights: ['野生菌季', '普达措国家公园', '元阳梯田'],
    risks: ['持续降雨', '道路可能受泥石流影响'],
    tags: ['雨季'],
  },
  // 8月
  {
    month: 8,
    destinationId: 'yunnan',
    score: 3,
    weather: '温润多雨，17-25°C',
    highlights: ['暑期避暑', '野生菌丰收', '泸沽湖'],
    risks: ['雨季高峰', '暑期游客较多'],
    tags: ['雨季'],
  },
  // 9月
  {
    month: 9,
    destinationId: 'yunnan',
    score: 4,
    weather: '雨季渐退，15-23°C',
    highlights: ['秋季来临', '梯田金黄', '大理洱海'],
    risks: ['仍有阵雨', '早晚温差增大'],
    tags: ['平季'],
  },
  // 10月
  {
    month: 10,
    destinationId: 'yunnan',
    score: 5,
    weather: '秋高气爽，12-22°C',
    highlights: ['秋色绝美', '腾冲银杏村', '香格里拉狼毒花'],
    risks: ['国庆期间游客爆满', '需提前预订'],
    tags: ['平季'],
  },
  // 11月
  {
    month: 11,
    destinationId: 'yunnan',
    score: 4,
    weather: '凉爽干燥，8-20°C',
    highlights: ['银杏村最佳', '候鸟迁徙', '冬樱花'],
    risks: ['高海拔地区偏冷', '部分山区道路不便'],
    tags: ['平季'],
  },
  // 12月
  {
    month: 12,
    destinationId: 'yunnan',
    score: 3,
    weather: '干燥偏冷，3-16°C',
    highlights: ['冬日阳光', '滇池海鸥', '温泉度假'],
    risks: ['高海拔地区严寒', '昼夜温差极大'],
    tags: ['淡季'],
  },
];
