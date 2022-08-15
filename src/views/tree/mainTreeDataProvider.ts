import * as vscode from 'vscode';
import mainTreeManager from './mainTreeManager';
import { MainTreeNode } from './mainTreeNode';
import MainTreeNodeType from './MainTreeNodeType';
import ICategory from '../../module/category';
import IPlugin from '../../module/plugin';

export default class MainTreeDataProvider implements vscode.TreeDataProvider<MainTreeNode> {
    private _onDidChangeTreeData: vscode.EventEmitter<MainTreeNode | undefined> = new vscode.EventEmitter<MainTreeNode | undefined>();
    readonly onDidChangeTreeData: vscode.Event<MainTreeNode | undefined> = this._onDidChangeTreeData.event;

    private context: vscode.ExtensionContext;
    private nodeList: MainTreeNode[] = [];

    constructor(context: vscode.ExtensionContext) {
        this.context = context;
    }

    refresh(): void {
        this._onDidChangeTreeData.fire(undefined);
    }

    getTreeItem(element: MainTreeNode): vscode.TreeItem | Thenable<vscode.TreeItem> {
        return {
            label: element.label,
            tooltip: element.tooltip,
            description: undefined, // element.description,
            collapsibleState:
                element.nodeType === MainTreeNodeType.plugin && !element.hasSubPlugin ? vscode.TreeItemCollapsibleState.None : vscode.TreeItemCollapsibleState.Expanded,
            iconPath: element.iconPath,
            command: element.nodeType === MainTreeNodeType.plugin && !element.hasSubPlugin ? element.command : undefined,
            contextValue: MainTreeNodeType[element.nodeType],
        };
    }

    async getChildren(element?: MainTreeNode): Promise<MainTreeNode[]> {
        if (element === undefined) {
            this.nodeList = mainTreeManager.getRootNodes();
        } else if (element.nodeType === MainTreeNodeType.category) {
            const categoryId = (element.nodeData as ICategory).id;
            this.nodeList = mainTreeManager.getChildrenNodes(categoryId);
        } else if (element.nodeType === MainTreeNodeType.plugin && element.hasSubPlugin) {
            const pluginData = element.nodeData as IPlugin;
            this.nodeList = mainTreeManager.getChildrenNodesForSubPlugin(pluginData);
        }

        return this.nodeList;
    }

    getParent(element?: MainTreeNode): vscode.ProviderResult<MainTreeNode> {
        return null;
    }

    public clear(): void {
        this.nodeList = [];
        mainTreeManager.dispose();
    }
}
