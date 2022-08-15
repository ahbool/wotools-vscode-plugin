export default interface ISubPlugin {
    main: string | undefined;
    displayName:
        | string
        | {
              en: string;
              'zh-cn': string;
          };
}
