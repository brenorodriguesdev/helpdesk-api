export interface HasherComparer {
  compare: (text: string, hashText: string) => Promise<boolean>
}
