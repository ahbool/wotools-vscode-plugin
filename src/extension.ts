import * as vscode from 'vscode';
import utils from './utils';
import globalManager from './dataManager/globalManager';
import commands from './commands';
import IPlugin from './module/plugin';
import mainTreeManager from './views/tree/mainTreeManager';
import MainTreeDataProvider from './views/tree/mainTreeDataProvider';

export function activate(context: vscode.ExtensionContext) {
    try {
        globalManager.setContext(context);
        globalManager.setVSCodeLanguage(vscode.env.language);
        mainTreeManager.initPluginData();

        const mainTreeDataProvider = new MainTreeDataProvider(context);

        const mainTreeView = vscode.window.createTreeView('mainTreeView', { treeDataProvider: mainTreeDataProvider });

        context.subscriptions.push(
            mainTreeView,
            vscode.commands.registerCommand('woTools.selectPlugin', (pluginName: string, data: IPlugin) => commands.selectPlugin(pluginName, data))
        );
    } catch (error) {
        utils.logger.error('---plugin runtime error---');
        utils.logger.error('', error);
        error && utils.prompt.showErrorMessage('runtime error:' + Object(error).message);
    }
}

export function deactivate() {}
