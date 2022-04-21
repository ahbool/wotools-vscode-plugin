import * as vscode from 'vscode';

class GlobalManager {
    public context?: vscode.ExtensionContext;
    public language: string = 'zh-cn';

    public setContext(context: vscode.ExtensionContext) {
        this.context = context;
    }
    public get _context(): vscode.ExtensionContext {
        return this.context as vscode.ExtensionContext;
    }

    public setVSCodeLanguage(language: string) {
        this.language = vscode.env.language;
    }
}

export default new GlobalManager();
