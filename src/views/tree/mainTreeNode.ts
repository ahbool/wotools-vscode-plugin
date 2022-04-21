import * as vscode from 'vscode';
import * as path from 'path';
import weToolsConfigs from '../../woToolsConfigs';
import globalManager from '../../dataManager/globalManager';
import MainTreeNodeType from './mainTreeNodeType';
import IPlugin from '../../module/plugin';
import ICategory from '../../module/category';
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

    public get tooltip(): string | undefined {
        if (this._nodeType === MainTreeNodeType.category) {
            return `id: ${this._nodeData.id}`;
        }

        if (this._nodeType === MainTreeNodeType.plugin) {
            const data = this._nodeData as IPlugin;
            return `author: ${data.author}
version: ${data.version}
description: ${data.description}
category id: ${data.categoryId}`;
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

    public get id(): string {
        return this._nodeData.id;
    }

    public get nodeType(): MainTreeNodeType {
        return this._nodeType;
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
                    command: 'woTools.selectPlugin',
                    arguments: [this.label, <IPlugin>this.nodeData],
                };
                break;
            default:
                break;
        }

        return command;
    }

    public get iconPath() {
        let iconName: string;
        switch (this._nodeType) {
            case MainTreeNodeType.category:
                iconName = weToolsConfigs.categoryIcon;
                break;
            case MainTreeNodeType.plugin:
                iconName = weToolsConfigs.pluginIcon;
                break;
        }

        return {
            light: utils.tools.getAbsolutePath(`resources/light/${iconName}`),
            dark: utils.tools.getAbsolutePath(`resources/dark/${iconName}`),
        };
    }
}