export interface OnConnectUseCase {
  connect: (idLogin: number) => Promise<void>
}
