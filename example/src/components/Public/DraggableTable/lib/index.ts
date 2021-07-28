/* eslint-disable @typescript-eslint/interface-name-prefix */

/**
 * 表格列配置项
 * @param title: 'name',  列名称
 * @param dataIndex: 'name',  列对应字段
 * @param key: 'name',  key
 * @param slots: { customRender: 'name' },  修改 slot 参数的值不会修改源数据，请配合 index 参数修改
 * @param width: 300,  列宽
 * @param align: 'left',  对其方式
 * @param ellipsis: true,  单行溢出省略
 */
 export interface IColumns {
  title: string;
  dataIndex: string;
  key?: string;
  width?: number|string;
  align?: string;
  ellipsis?: boolean;
  slots?: { customRender: string };
}

/**
 * props 入参
 * @param dataSource: Array<unknown>; table表格数据
 * @param columns: Array<IColumns>; table表格列
 * @param loading?: boolean; 表格loading状态
 * @param bordered?: boolean; 是否显示描边
 * @param rowSelect?: boolean; 是否需要复选框
 * @param rowSelectKey?: string; 复选框按照哪个字段处理选中状态，默认id，暂时未实现
 * @param tHeadStyle?: Record<string, unknown>; 表头样式
 */
export interface IProps {
  dataSource: Array<unknown>;
  columns: Array<IColumns>;
  loading?: boolean;
  bordered?: boolean;
  rowSelect?: boolean;
  rowSelectKey?: string;
  tHeadStyle?: Record<string, unknown>;
}

/**
 * emits 事件
 * @callback selectChange 当列的checkbox发生变化时触发，返回值为选中的所有keys
 * @callback end 拖拽结束时触发，返回值为排序后的数组
 */
export interface IEmits {
  selectChange: () => {selectRowKeys: string[]};
  end: () => IBaseRecord[];
}

/** 
 * row-record-基础类型
 * @param id: string; 唯一id，处理选中状态会用到
 * @param uid: string; lodash id
 * @param seq: number; 表格排序字段
 * @param isChecked: boolean; 选中状态
 */
export interface IBaseRecord {
  id: string; // to get row keys
  uid: string; // lodash id
  seq: number; // drag-seq
  isChecked: boolean; // record-select
}
