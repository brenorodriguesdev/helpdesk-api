export interface HttpRequest {
  body?: any
  params?: any
  query?: any
}

export interface HttpResponse {
  statusCode: number
  data?: any
}
