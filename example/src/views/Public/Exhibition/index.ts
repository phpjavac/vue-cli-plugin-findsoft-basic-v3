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
    image: 'https://s3.jpg.cm/2021/05/18/OqL58.jpg',
    path: 'ExCaseCard',
    type: '',
  },
];

export const e = '站空';
