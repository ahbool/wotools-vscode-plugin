import * as vscode from 'vscode';
import * as path from 'path';
import configs from '../../woToolsConfigs';
import globalManager from '../../dataManager/globalManager';
import MainTreeNodeType from './mainTreeNodeType';
import ICategory from '../../module/category';
import IPlugin from '../../module/plugin';
import utils from '../../utils';

export class MainTreeNode {
    constructor(private _nodeType: MainTreeNodeType, private _nodeData: IPlugin | ICategory) {}

    public get label(): string | undefined {
        const displayName = this._nodeData.displayName;
        if (typeof displayName === 'string') {
            return displayName;
        }

        if (utils.json.isJson(displayName)) {
            return (<any>displayName)[globalManager.language];
        }
    }

    public get description(): string | undefined {
        const desc = this._nodeData.description;
        if (typeof desc === 'string') {
            return desc;
        }

        if (utils.json.isJson(desc)) {
            return (<any>desc)[globalManager.language];
        }
    }

    public get tooltip(): string | undefined {
        if (this._nodeType === MainTreeNodeType.category) {
            return `id: ${this._nodeData.id}`;
        }

        if (this._nodeType === MainTreeNodeType.plugin) {
            const data = this._nodeData as IPlugin;
            return `author: ${data.author}
version: ${data.version}
description: ${this.description}
category id: ${data.categoryId}`;
        }
    }

    public get id(): string {
        return this._nodeData.id;
    }

    public get nodeType(): MainTreeNodeType {
        return this._nodeType;
    }

    public get hasSubPlugin(): boolean {
        if (this._nodeType === MainTreeNodeType.plugin) {
            const data = this._nodeData as IPlugin;
            if (data.children && data.children.length > 0) {
                return true;
            }
        }
        return false;
    }

    public get nodeData(): IPlugin | ICategory {
        return this._nodeData;
    }

    public get command(): vscode.Command | undefined {
        let command;
        switch (this._nodeType) {
            case MainTreeNodeType.category:
                command = undefined;
                break;
            case MainTreeNodeType.plugin:
                command = {
                    title: '-',
                    command: 'wotools.selectPlugin',
                    arguments: [this.label, <IPlugin>this.nodeData],
                };
                break;
            default:
                break;
        }

        return command;
    }

    public get iconPath() {
        let iconName: string = '';
        let customIconPath: string = '';
        switch (this._nodeType) {
            case MainTreeNodeType.category:
                const categoryData = <ICategory>this.nodeData;
                if (categoryData.logo) {
                    iconName = categoryData.logo;
                } else {
                    iconName = configs.categoryIcon;
                }
                break;
            case MainTreeNodeType.plugin:
                const pluginData = <IPlugin>this.nodeData;
                if (pluginData.logo) {
                    customIconPath = path.join(pluginData._pluginDirAbsolutePath, pluginData.logo);
                } else {
                    iconName = configs.pluginIcon;
                }
                break;
        }

        if (customIconPath) {
            return customIconPath;
        }

        if (iconName.indexOf('.') === -1) {
            // The system icon
            return new vscode.ThemeIcon(iconName);
        }

        return {
            light: utils.tools.getAbsolutePath(`resources/light/${iconName}`),
            dark: utils.tools.getAbsolutePath(`resources/dark/${iconName}`),
        };
    }
}
