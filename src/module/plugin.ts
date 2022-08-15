import ISubPlugin from './subPlugin';
export default interface IPlugin {
    id: string;
    main: string | undefined;
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
    logo: string;
    version: string;
    author: string;
    homepage: string;
    categoryId: string;
    disable: boolean;
    children: Array<ISubPlugin> | undefined;
    _pluginDirAbsolutePath: string;
}
