export interface Encrypter {
  encrypt: (values: object) => Promise<string>
}
