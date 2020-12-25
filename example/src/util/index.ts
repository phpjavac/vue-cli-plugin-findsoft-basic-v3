import moment, { Moment } from 'moment';
import { isProxy, toRaw } from 'vue';

/**
 * @description Rankpicker 时间转换，因为Proxy下的Rank数组 Proxy|Moment统一转换
 * @param MomentArr Moment数组【Proxy|Moment, Proxy|Moment】 
 * @param type format类型 默认YYYY-MM-DD
 * @return ['日期', '日期']
 */
export const momentProxyTrans = (MomentArr: [Moment|{}, Moment|{}], type = 'date') => {
  if (MomentArr.length) {
    const format = type === 'date' ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm:ss';
    let startTime = ''; let endTime = '';
    if (isProxy(MomentArr[0])) {
      startTime = moment(toRaw(MomentArr[0])).format(format);
    } else {
      startTime = moment(MomentArr[0]).format(format);
    }
    if (isProxy(MomentArr[1])) {
      endTime = moment(toRaw(MomentArr[1])).format(format);
    } else {
      endTime = moment(MomentArr[1]).format(format);
    }
    return [startTime, endTime];
  }
  return ['', ''];
};

/**
 * @description 转换单个Moment时间
 * @param MomentData 需要转换的时间 Moment|Proxy 
 * @param type format类型 默认YYYY-MM-DD
 * @return 日期|undefined
 */
export const momentTransSingle = (MomentData: Moment|undefined, type = 'date') => {
  if (MomentData) {
    const format = type === 'date' ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm:ss';
    if (isProxy(MomentData)) {
      return moment(toRaw(MomentData)).format(format);
    }
    return moment(MomentData).format(format);
  }
  return undefined;
};
