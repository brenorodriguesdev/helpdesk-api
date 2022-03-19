export interface OnDisconnectUseCase {
  disconnect: (idConnection: string) => Promise<void>
}
