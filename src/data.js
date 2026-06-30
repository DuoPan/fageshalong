export const services = [
  {
    id: 'cut',
    name: '高级洗剪吹',
    category: '剪发',
    price: 88,
    duration: 60,
    popularity: 96,
    margin: 72,
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=80',
    tags: ['新客首选', '高复购'],
  },
  {
    id: 'color',
    name: '雾感染发',
    category: '染发',
    price: 368,
    duration: 150,
    popularity: 88,
    margin: 61,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80',
    tags: ['AI 推荐补色', '耗材联动'],
  },
  {
    id: 'perm',
    name: '空气感烫发',
    category: '烫发',
    price: 498,
    duration: 180,
    popularity: 81,
    margin: 58,
    image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=900&q=80',
    tags: ['长时段占用', '高客单'],
  },
  {
    id: 'care',
    name: '头皮护理 Spa',
    category: '护理',
    price: 168,
    duration: 75,
    popularity: 73,
    margin: 67,
    image: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=900&q=80',
    tags: ['会员套餐', '可加购'],
  },
];

export const stylists = [
  {
    id: 'leo',
    name: 'Leo 发哥',
    role: '创意总监',
    avatar: 'https://images.unsplash.com/photo-1618077360395-f3068be8e001?auto=format&fit=crop&w=400&q=80',
    skills: ['法式层次', '短发改造', '高端染烫'],
    rating: 4.98,
    bookings: 1280,
    status: '服务中',
    commission: 1268,
  },
  {
    id: 'mika',
    name: 'Mika',
    role: '染烫专家',
    avatar: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=400&q=80',
    skills: ['冷棕色', '雾感挑染', '发质修复'],
    rating: 4.92,
    bookings: 946,
    status: '可接单',
    commission: 930,
  },
  {
    id: 'jay',
    name: 'Jay',
    role: '资深设计师',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    skills: ['男士理容', '商务发型', '头皮护理'],
    rating: 4.89,
    bookings: 812,
    status: '待到店',
    commission: 784,
  },
  {
    id: 'nora',
    name: 'Nora',
    role: '护理顾问',
    avatar: 'https://images.unsplash.com/photo-1595475884562-073c30d45670?auto=format&fit=crop&w=400&q=80',
    skills: ['头皮护理', '会员转化', '造型建议'],
    rating: 4.95,
    bookings: 702,
    status: '休息中',
    commission: 612,
  },
];

export const initialAppointments = [
  { id: 1, time: '10:00', customer: '陈小姐', phone: '0422 118 909', service: '高级洗剪吹', stylist: 'Jay', station: 'A2', duration: 60, status: '待到店', value: 88 },
  { id: 2, time: '10:30', customer: 'Grace Lin', phone: '0418 667 210', service: '雾感染发', stylist: 'Mika', station: 'B1', duration: 150, status: '服务中', value: 368 },
  { id: 3, time: '11:15', customer: '王先生', phone: '0433 779 120', service: '男士理容', stylist: 'Leo 发哥', station: 'A1', duration: 45, status: '已完成', value: 108 },
  { id: 4, time: '13:00', customer: 'Olivia', phone: '0456 920 831', service: '空气感烫发', stylist: 'Leo 发哥', station: 'B2', duration: 180, status: '待到店', value: 498 },
  { id: 5, time: '15:30', customer: '刘女士', phone: '0411 326 088', service: '头皮护理 Spa', stylist: 'Nora', station: 'C1', duration: 75, status: '待到店', value: 168 },
  { id: 6, time: '16:45', customer: 'Hannah', phone: '0401 622 517', service: '雾感染发', stylist: 'Mika', station: 'B1', duration: 150, status: '爽约风险', value: 368 },
];

export const members = [
  { name: '陈小姐', level: '黑金会员', balance: 1280, visits: 22, tags: ['高消费客', '染烫客'], nextAction: '52 天未补色，建议发补色券', stylist: 'Mika' },
  { name: 'Grace Lin', level: '铂金会员', balance: 680, visits: 14, tags: ['生日月', '爱护理'], nextAction: '护理套餐剩 2 次', stylist: 'Nora' },
  { name: '王先生', level: '银卡会员', balance: 220, visits: 9, tags: ['男士理容'], nextAction: '30 天后来店剪发提醒', stylist: 'Jay' },
  { name: 'Olivia', level: '黑金会员', balance: 2060, visits: 31, tags: ['指定发哥', '高客单'], nextAction: '本次烫发后 7 天回访', stylist: 'Leo 发哥' },
];

export const inventory = [
  { name: '冷棕 7/71 染膏', stock: 8, unit: '支', threshold: 12, status: '低库存', cost: 21 },
  { name: '柔顺烫发水', stock: 16, unit: '瓶', threshold: 10, status: '正常', cost: 48 },
  { name: '头皮护理精华', stock: 5, unit: '盒', threshold: 8, status: '低库存', cost: 66 },
  { name: '修复洗护套装', stock: 26, unit: '套', threshold: 15, status: '热销', cost: 88 },
];

export const chartBars = [
  { label: '10', value: 42 },
  { label: '11', value: 68 },
  { label: '12', value: 38 },
  { label: '13', value: 75 },
  { label: '14', value: 92 },
  { label: '15', value: 86 },
  { label: '16', value: 64 },
  { label: '17', value: 78 },
  { label: '18', value: 55 },
];
