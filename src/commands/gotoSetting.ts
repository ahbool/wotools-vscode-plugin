import * as vscode from 'vscode';

export default async function gotoSetting() {
    vscode.commands.executeCommand('workbench.action.openSettings', 'wotools');
}
