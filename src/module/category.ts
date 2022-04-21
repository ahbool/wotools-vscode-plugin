export default interface ICategory {
    id: string;
    displayName:
        | string
        | {
              en: string;
              'zh-cn': string;
          };
    description:
        | string
        | {
              en: string;
              'zh-cn': string;
          };
    order: number;
}
