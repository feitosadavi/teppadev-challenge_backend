export interface HttpResponse<T = any> {
  statusCode: number,
  body: T
}

export interface Controller<Req = any, Res = any> {
  handle (request: Req): Promise<HttpResponse<Res>>
}
