/* eslint-disable global-require */

/**
 * @description 展示组件列表
 *
 * @param name 组件名
 * @param nameEn 英文名&
 * @param image 展示图
 * @param path 具体展示页面地址
 * @param type 组件所属类型
 */
export interface ComponentFace {
  name: string;
  nameEn: string;
  image: string;
  path: string;
  type: string;
}
export const componentList: ComponentFace[] = [
  {
    name: '上传',
    nameEn: 'Upload',
    image: require('@/assets/img/exhibition/upload.png'),
    path: 'ExUpload',
    type: '',
  },
  // {
  //   name: '返回顶部',
  //   nameEn: 'ToTop',
  //   image: require('@/assets/img/exhibition/upload.png'),
  //   path: 'ExTop',
  //   type: '',
  // },
  {
    name: '文本省略',
    nameEn: 'Ellipsis',
    image: require('@/assets/img/exhibition/ell.png'),
    path: 'ExEllipsis',
    type: '',
  },
  {
    name: '数值波动',
    nameEn: 'Fluctuation',
    image: require('@/assets/img/exhibition/yyy.png'),
    path: 'ExFluctuation',
    type: '',
  },
  // {
  //   name: '城市构建',
  //   nameEn: 'CityBuild',
  //   image: require('@/assets/img/exhibition/upload.png'),
  //   path: 'ExCityBuilde',
  //   type: '',
  // },
  {
    name: '案例卡片',
    nameEn: 'CaseCardView',
    image: 'https://s3.jpg.cm/2021/05/19/O1cRe.png',
    path: 'ExCaseCard',
    type: '',
  },
  {
    name: '分配弹窗',
    nameEn: 'DistributeModalView',
    image: 'https://s3.jpg.cm/2021/05/19/O1nuH.png',
    path: 'ExDistributeModal',
    type: '',
  },
  {
    name: '表格拖拽',
    nameEn: 'DraggableTable',
    image: require('@/assets/img/exhibition/draggable.png'),
    path: 'ExDraggableTable',
    type: '',
  },
  {
    name: '基础Icon库',
    nameEn: 'BasicIcon',
    image: require('@/assets/img/exhibition/icon.png'),
    path: 'ExBasicIcon',
    type: '',
  },
];

export interface IIcon {
  type: string;
  text: string;
  color: string;
}
/** 可以直接从alicdn里找到json文件复制过来 */
export const BasicIconJson = {
  "id": "1988509",
  "name": "基础组件库",
  "font_family": "iconfont",
  "css_prefix_text": "icon",
  "description": "基础组件库",
  "glyphs": [
    {
      "icon_id": "10714341",
      "name": "预览-01",
      "font_class": "yulan-",
      "unicode": "e65c",
      "unicode_decimal": 58972
    },
    {
      "icon_id": "276884",
      "name": "导入",
      "font_class": "wechaticon19",
      "unicode": "e622",
      "unicode_decimal": 58914
    },
    {
      "icon_id": "17915840",
      "name": "下载",
      "font_class": "xiazai2",
      "unicode": "e618",
      "unicode_decimal": 58904
    },
    {
      "icon_id": "357515",
      "name": "退出",
      "font_class": "tuichu11",
      "unicode": "e815",
      "unicode_decimal": 59413
    },
    {
      "icon_id": "2777463",
      "name": "通知",
      "font_class": "tongzhi4",
      "unicode": "e9a5",
      "unicode_decimal": 59813
    },
    {
      "icon_id": "5118746",
      "name": "账号",
      "font_class": "zhanghao",
      "unicode": "e6a2",
      "unicode_decimal": 59042
    },
    {
      "icon_id": "14874507",
      "name": "添加",
      "font_class": "jia",
      "unicode": "e7b9",
      "unicode_decimal": 59321
    },
    {
      "icon_id": "3086750",
      "name": "下载",
      "font_class": "xiazai",
      "unicode": "e600",
      "unicode_decimal": 58880
    },
    {
      "icon_id": "5744149",
      "name": "重置",
      "font_class": "zhongzhi",
      "unicode": "e656",
      "unicode_decimal": 58966
    },
    {
      "icon_id": "12786661",
      "name": "分 享",
      "font_class": "fenxiang",
      "unicode": "e636",
      "unicode_decimal": 58934
    },
    {
      "icon_id": "11321368",
      "name": "查看",
      "font_class": "chakan",
      "unicode": "e6f0",
      "unicode_decimal": 59120
    },
    {
      "icon_id": "6167017",
      "name": "UCC-删 除",
      "font_class": "shanchu",
      "unicode": "e630",
      "unicode_decimal": 58928
    },
    {
      "icon_id": "27803",
      "name": "下载",
      "font_class": "xiazai1",
      "unicode": "e63c",
      "unicode_decimal": 58940
    },
    {
      "icon_id": "5430371",
      "name": "编辑",
      "font_class": "bianji4",
      "unicode": "eae5",
      "unicode_decimal": 60133
    },
    {
      "icon_id": "8339851",
      "name": "筛选",
      "font_class": "shaixuan1",
      "unicode": "e640",
      "unicode_decimal": 58944
    },
    {
      "icon_id": "12664998",
      "name": "排序",
      "font_class": "order-asc",
      "unicode": "e645",
      "unicode_decimal": 58949
    }
  ]
}
