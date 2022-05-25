import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import utils from '../../utils';
import globalManager from '../../dataManager/globalManager';
import woToolsConfigs from '../../woToolsConfigs';
import { MainTreeNode } from './mainTreeNode';
import MainTreeNodeType from './mainTreeNodeType';
import ICategory from '../../module/category';
import IPlugin from '../../module/plugin';

class MainTreeManager implements vscode.Disposable {
    private categoryList: Array<ICategory> = [];
    private pluginList: Array<IPlugin> = [];

    public getRootNodes(): MainTreeNode[] {
        this.categoryList.sort((a, b) => a.order - b.order);
        return this.categoryList.map((data) => new MainTreeNode(MainTreeNodeType.category, data));
    }

    public getChildrenNodes(categoryId: string): MainTreeNode[] {
        let currPluginList: IPlugin[] = [];

        if (categoryId === woToolsConfigs.otherCategoryId) {
            currPluginList = this.pluginList.filter((plugin) => {
                const isOtherCategory = plugin.categoryId === woToolsConfigs.otherCategoryId;
                const notFoundCategory = this.categoryList.findIndex((cat) => cat.id === plugin.categoryId) === -1;
                return isOtherCategory || notFoundCategory;
            });
        } else {
            currPluginList = this.pluginList.filter((x) => x.categoryId === categoryId);
        }
        return currPluginList.map((data) => new MainTreeNode(MainTreeNodeType.plugin, data));
    }

    private fetchCategoryList(): Array<ICategory> {
        const categoryFilePath = utils.tools.getAbsolutePath(woToolsConfigs.categoryJsonFilePath);
        const resource = utils.file.readJsonSync(categoryFilePath);

        return resource ? (resource as []) : [];
    }

    private fetchBuiltinPluginList(): IPlugin[] {
        const jsonDataList: IPlugin[] = [];
        const pluginDirPath = utils.tools.getAbsolutePath(woToolsConfigs.builtinPluginDirPath);
        let subFiles: string[] = [];

        try {
            subFiles = fs.readdirSync(pluginDirPath);
        } catch (err) {
            utils.logger.error('Load the plug-in', err);
            throw err;
        }

        subFiles.forEach((name) => {
            const filePath = path.join(pluginDirPath, name);
            const stat = fs.statSync(filePath);

            if (stat.isDirectory()) {
                const pluginConfigPath = path.join(filePath, woToolsConfigs.pluginConfigFileName);

                if (!utils.file.existsSync(pluginConfigPath)) {
                    utils.logger.warning('plugin.json file not found', pluginConfigPath);
                }

                const jsonData: any = utils.file.readJsonSync(pluginConfigPath);

                if (jsonData) {
                    jsonData['_pluginDirAbsolutePath'] = path.join(filePath, path.sep);
                    jsonDataList.push(jsonData as IPlugin);
                } else {
                    utils.logger.error('An error occurred while reading the file', pluginConfigPath);
                }
            }
        });

        return jsonDataList;
    }

    public initPluginData() {
        this.categoryList = this.fetchCategoryList();
        this.pluginList = this.fetchBuiltinPluginList();
    }

    public dispose(): void {
        this.categoryList = [];
        this.pluginList = [];
    }
}

export default new MainTreeManager();
