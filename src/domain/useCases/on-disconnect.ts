export interface OnDisconnectUseCase {
  disconnect: (idLogin: number) => Promise<void>
}
