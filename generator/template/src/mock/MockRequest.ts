/**
 * @data 返回的mock数据
 * @message 模拟接口提示信息
 * @success 模拟是否接口请求成功失败
 */
class MockRequest {
  public data: unknown;

  public message: string | null;

  public success: boolean;

  constructor(data: unknown, message: string | null, success: boolean) {
    this.data = data;
    this.message = message;
    this.success = success;
  }
}

export interface AjaxDate {
  body: string;
  type: string;
  url: string;
}

export default MockRequest;
