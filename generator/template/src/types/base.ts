import { AxiosRequestConfig } from 'axios';
/**
 * 基础类
 * 如列表查询，好像只有列表查询会用到😅
 */

/**
 * @description 基础查询接口
 *
 * @keyWord 关键字
 * @pageNo 页码
 * @pageSize 页条数
 * @sortDesc 是否降序
 * @sortName 排序字段
 */
export interface BaseSearchFace {
  keyWord?: string; // 关键字查询
  pageNo?: number; // 页码
  pageSize?: number; // 每页条数
  sortDesc?: boolean; // 是否降序
  sortName?: string; // 排序名
}

/**
 * @description 基础查询类
 *
 * @pageNo 页码
 * @pageSize 页条数
 * @seqAsc 升序
 * @seqColumn 排序字段
 * @keyWord 关键字
 */
export class BaseSearchClass {
  keyWord?: string;

  pageNo?: number;

  pageSize?: number;

  seqAsc?: boolean;

  seqColumn?: string;

  // 部分接口可能没有 关键字查询。如果需要就调用方法，传额外的参数接口报错。
  setKeyWord(val: string | undefined) {
    this.keyWord = val;
  }

  constructor(data: BaseSearchFace) {
    // base
    this.pageNo = data.pageNo;
    this.pageSize = data.pageSize;

    // 处理有排序的查询
    if (data.sortDesc !== undefined && data.sortName) {
      this.seqAsc = data.sortDesc;
      // 特别的排序字段，交给子类处理。父类只做赋值操作
      this.seqColumn = data.sortName;
    }
  }
}

/**
 * @description Antd-Upload-v3 所需接口
 *
 * @uid 文件唯一标识
 * @name 文件名
 * @status 状态码 uploading done error removed
 * @originFIleObj 文件对象
 *
 * @remark 暂时没找到暴露的interface，先从antd官网文档扒过来
 */
export interface Afile {
  uid: string; // 文件唯一标识，建议设置为负数，防止和内部产生的 id 冲突
  name: string; // 文件名
  status: 'uploading' | 'done' | 'error' | 'removed'; // 状态有：uploading done error removed
  response: {}; // '{"status": "success"}', // 服务端响应内容
  linkProps: {}; // '{"download": "image"}', // 下载链接额外的 HTML 属性
  xhr: XMLHttpRequest; // 'XMLHttpRequest{ ... }', // XMLHttpRequest Header

  // 文档没有标注，但是控制台打印的文件对象对应该字段
  originFileObj: File; // 文件对象
}

export interface Bread {
  breadcrumbName: string;
  path: string;
}

/**
 * 获取类的属性
 */
export type ClassKey<T, R = any> = {
  readonly [k in keyof T]: R;
};

/**
 * 自定义axios请求配置对象
 */
export type ReqConfig = AxiosRequestConfig & {
  /**
   * 省略useMock后根据全局变量判断是否使用mock接口
   */
  useMock?: boolean;

  /**
   * 请求网址
   */
  url: string;

  /**
   * 请求方法
   */
  method: string;
};
