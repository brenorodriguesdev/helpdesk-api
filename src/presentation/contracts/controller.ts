import { HttpRequest, HttpResponse } from './http'
import { SocketRequest } from './socket'

export interface Controller {
  handle: (httpRequest: HttpRequest) => Promise<HttpResponse>
}

export interface ControllerSocket {
  handle: (SocketRequest: SocketRequest) => Promise<void>
}
