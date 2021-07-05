/* eslint-disable @typescript-eslint/interface-name-prefix */

/**
 * 表格列配置项
 * title: 'name',  列名称
 * dataIndex: 'name',  列对应字段
 * key: 'name',  key
 * slots: { customRender: 'name' },  修改 slot 参数的值不会修改源数据，请配合 index 参数修改
 * width: 300,  列宽
 * align: 'left',  对其方式
 * ellipsis: true,  单行溢出省略
 */
 export interface IColumns {
  title: string;
  dataIndex: string;
  key?: string;
  width?: number;
  align?: string;
  ellipsis?: boolean;
}

/**
 * props 入参
 */
export interface IProps {
  dataSource: Array<unknown>;
  columns: Array<IColumns>;
  rowSelect?: boolean;
  loading?: boolean;
  selectedRowKeys?: Array<unknown>;
  rowSelectKey?: string;
  selectedAll?: boolean;
  selectedReverse?: boolean;
}

/** 列-基础类型 */
export interface IBaseRecord {
  id: string; // to get row keys
  uid: string; // lodash id
  seq: number; // drag-seq
  isChecked: boolean; // record-select
}
