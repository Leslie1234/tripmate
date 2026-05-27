import type { ChecklistItem } from '@/types';

export const checklistItems: ChecklistItem[] = [
  // ==================== 证件类 ====================
  {
    id: 'cert-1',
    category: '证件类',
    name: '护照',
    required: true,
  },
  {
    id: 'cert-2',
    category: '证件类',
    name: '签证',
    required: true,
  },
  {
    id: 'cert-3',
    category: '证件类',
    name: '身份证',
    required: true,
  },
  {
    id: 'cert-4',
    category: '证件类',
    name: '驾照/国际驾照',
    required: false,
  },
  {
    id: 'cert-5',
    category: '证件类',
    name: '酒店订单打印件',
    required: true,
  },
  {
    id: 'cert-6',
    category: '证件类',
    name: '机票订单',
    required: true,
  },

  // ==================== 支付类 ====================
  {
    id: 'pay-1',
    category: '支付类',
    name: '信用卡',
    required: true,
  },
  {
    id: 'pay-2',
    category: '支付类',
    name: '当地现金',
    required: true,
  },
  {
    id: 'pay-3',
    category: '支付类',
    name: '支付App（支付宝/微信/Apple Pay）',
    required: false,
  },
  {
    id: 'pay-4',
    category: '支付类',
    name: '银行卡',
    required: false,
  },

  // ==================== 通信类 ====================
  {
    id: 'comm-1',
    category: '通信类',
    name: '当地电话卡/eSIM',
    required: true,
  },
  {
    id: 'comm-2',
    category: '通信类',
    name: '充电宝',
    required: true,
  },
  {
    id: 'comm-3',
    category: '通信类',
    name: '国际漫游套餐',
    required: false,
  },

  // ==================== 交通类 ====================
  {
    id: 'trans-1',
    category: '交通类',
    name: '交通卡（Suica/Navigo/八达通等）',
    required: true,
  },
  {
    id: 'trans-2',
    category: '交通类',
    name: '地铁导航App',
    required: false,
  },
  {
    id: 'trans-3',
    category: '交通类',
    name: '打车App（Grab/Uber等）',
    required: false,
  },
  {
    id: 'trans-4',
    category: '交通类',
    name: '租车材料（驾照翻译件/预订单）',
    required: false,
  },

  // ==================== 保险类 ====================
  {
    id: 'ins-1',
    category: '保险类',
    name: '旅行保险',
    required: true,
  },
  {
    id: 'ins-2',
    category: '保险类',
    name: '医疗保险',
    required: false,
  },
  {
    id: 'ins-3',
    category: '保险类',
    name: '航班延误险',
    required: false,
  },

  // ==================== 生活类 ====================
  {
    id: 'life-1',
    category: '生活类',
    name: '转换插头',
    required: true,
  },
  {
    id: 'life-2',
    category: '生活类',
    name: '常用药品（肠胃药/感冒药/创可贴）',
    required: true,
  },
  {
    id: 'life-3',
    category: '生活类',
    name: '雨具（折叠伞/雨衣）',
    required: false,
  },
  {
    id: 'life-4',
    category: '生活类',
    name: '防晒用品（防晒霜/墨镜/帽子）',
    required: false,
  },
  {
    id: 'life-5',
    category: '生活类',
    name: '舒适鞋子',
    required: true,
  },
  {
    id: 'life-6',
    category: '生活类',
    name: '洗漱用品',
    required: false,
  },

  // ==================== 预约类 ====================
  {
    id: 'book-1',
    category: '预约类',
    name: '热门景点门票预订',
    required: true,
  },
  {
    id: 'book-2',
    category: '预约类',
    name: '博物馆/美术馆预约',
    required: false,
  },
  {
    id: 'book-3',
    category: '预约类',
    name: '特色餐厅预约',
    required: false,
  },
  {
    id: 'book-4',
    category: '预约类',
    name: '当地体验活动预约（和服/烹饪课/潜水等）',
    required: false,
  },
];
