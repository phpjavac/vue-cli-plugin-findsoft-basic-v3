export interface ICardData {
  id: string;
  /**
   * 封面图片
   */
  path: string;
  /**
   * 案例名
   */
  title: string;
  /**
   * 案例类型
   */
  types: string[];
  /**
   * 是否已发布
   */
  publish: boolean;
  /**
   * 创建者
   */
  creator: string;
}

export class CardData implements ICardData {
  id = '';

  path = '';

  title = '';

  types: string[] = [];

  publish = false;

  creator = '';

  constructor(c: Partial<ICardData>) {
    Object.assign(this, c);
  }
}
