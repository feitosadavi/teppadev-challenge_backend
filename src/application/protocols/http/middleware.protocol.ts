interface HttpResponse<T = any> {
  statusCode: number,
  body: T
}

export interface IMiddleware<Req = any, Res = any> {
  handle (request: Req): Promise<HttpResponse<Res>>
}
