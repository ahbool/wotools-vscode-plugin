import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand("wotools-vscode-plugin.helloWorld", () => {
        vscode.window.showInformationMessage("Hello World from woTools-vscode-plugin!");
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
