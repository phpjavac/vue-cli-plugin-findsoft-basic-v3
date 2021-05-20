export interface QuestionI {
  analysis: string;
  /**
   * 参考答案
   * exp: [1,0,0]
   */
  answer: string;
  /**
   * 题目id
   */
  id: string;
  /**
   * 选项内容
   * exp: [A选项内容,B选项内容,C选项内容]
   */
  metas: string;
  /**
   * 题目类型
   * exp: 0-单选题, 1-多选题,2-判断题,3-填空题
   */
  questionType: number;
  /**
   * 分值
   */
  score: number;
  /**
   * 排序
   */
  seq: number;
  /**
   * 题干
   */
  stem: string;
}

/**
 * 选项对象
 */
export class PMeta {
  uid = ''

  /**
   * 选项内容
   */
  meta = ''
}

/**
 * 可操作的问题对象接口
 */
export interface ParseQuestionI extends Question {
  pAnswer: Array<number|string|boolean|undefined>;
  pMetas: PMeta[];
}

/**
 * 可操作的问题类
 */
export class Question implements QuestionI {
    analysis = '';

    answer = '[0]';

    id = '';

    metas = '[]';

    questionType = 0;

    score = 0;

    seq = 0;

    stem = '';
}
