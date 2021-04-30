/* eslint-disable @typescript-eslint/no-explicit-any */
import { cloneDeep, uniqueId } from 'lodash';
import { ref } from 'vue';
import { ParseQuestionI, Question } from './interface';

const questionTypes = ref([
  {
    name: '单选题',
  },
  {
    name: '多选题',
  },
  {
    name: '判断题',
  },
  {
    name: '填空题',
  },
]);

/**
 * 把原始问题转化为可操作的问题
 * @param d Question
 * @returns 解析后的问题对象
 */
const parseData = (d: Question): ParseQuestionI => {
  const data = cloneDeep(d);
  data.metas = data.metas || '[]';
  data.answer = data.answer || '[]';
  const metas = JSON.parse(data.metas as string) as string[];
  const answer = JSON.parse(data.answer as string) as number[];
  if (!answer.length) answer.push(0);
  if ([0, 1].includes(data.questionType)) {
    (data as any).pMetas = metas.map((m) => ({
      uid: uniqueId(),
      meta: m,
    }));
  } else {
    // 判断题和填空题没有 metas, 设为空数组
    (data as any).pMetas = [];
  }
  // if (!answer.length) {
  //   handleQTypeChange(dataClone.questionType, dataClone);
  // }
  (data as any).pAnswer = answer;

  return data as unknown as ParseQuestionI;
};

/**
 * 把可操作的问题对象转化为原始问题
 * @param d 可操作的问题对象
 * @returns 原始问题
 */
const reverseData = (d: ParseQuestionI): Question => {
  const data = cloneDeep(d);
  data.answer = JSON.stringify(data.pAnswer);
  data.metas = JSON.stringify(data.pMetas.map((m) => m.meta));
  delete (data as any).pAnswer;
  delete (data as any).pMetas;
  return data as unknown as Question;
};

export {
  questionTypes,
  parseData,
  reverseData,
};
