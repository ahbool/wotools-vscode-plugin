import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { WEBVIEW_MESSAGE_TYPE } from '../common/constants';
import utils from '../utils';
import configs from '../woToolsConfigs';
import globalManager from './globalManager';

interface IMessage {
    type: string;
    data: any;
}

class WebviewManager implements vscode.Disposable {
    private readonly viewType: string = 'woTools.webview';
    private panel: vscode.WebviewPanel | undefined = undefined;

    public dispose(): void {
        if (this.panel) {
            this.panel.dispose();
        }
    }

    public getWebViewContent = (filePath: string) => {
        const dirPath = path.dirname(filePath);
        let html = fs.readFileSync(filePath, 'utf-8');
        html = this.insertWotoolsScript(html);
        html = html.replace(/(<link.+?href=["']|<script.+?src=["']|<img.+?src=["']|<a.+?href=["'])(.+?)["']/g, (m, $1, $2) => {
            const url: string = $2;
            if (url.startsWith('http://') || url.startsWith('https://')) {
                return $1 + $2 + '"';
            }
            return $1 + vscode.Uri.file(path.resolve(dirPath, $2)).with({ scheme: 'vscode-resource' }).toString() + '"';
        });
        return html;
    };

    private insertWotoolsScript = (htmlContent: string) => {
        let basejsPath = path.join(configs.builtinPluginDirPath, 'wotools-base.js');
        let initjsPath = path.join(configs.builtinPluginDirPath, 'wotools-init.js');

        basejsPath = utils.tools.getAbsolutePath(basejsPath);
        initjsPath = utils.tools.getAbsolutePath(initjsPath);

        htmlContent = htmlContent
            .replace(
                '<head>',
                `<head>
            <script src="${basejsPath}"></script>`
            )
            .replace(
                '</body>',
                `<script src="${initjsPath}"></script>
            </body>`
            );
        return htmlContent;
    };

    /**
     * Create a webview window
     * @param title title
     * @param content HTML text
     * @param isSideMode display in the side
     */
    public showWebview({ title, content, isSideMode = false }: { title?: string; content?: string; isSideMode?: boolean }): void {
        if (!this.panel) {
            this.panel = vscode.window.createWebviewPanel(
                this.viewType,
                title || '-',
                {
                    viewColumn: isSideMode ? vscode.ViewColumn.Two : vscode.ViewColumn.One,
                    preserveFocus: true,
                },
                {
                    enableScripts: true,
                }
            );

            this.panel.onDidDispose(this.onDidDisposeWebview, this);
            this.receiveMessage();
        } else {
            this.panel.reveal(isSideMode ? vscode.ViewColumn.Two : vscode.ViewColumn.One);
        }

        if (title) {
            this.panel.title = title;
        }

        if (content) {
            this.panel.webview.html = content;
        }
    }

    private receiveMessage() {
        if (!this.panel) {
            return;
        }
        this.panel.webview.onDidReceiveMessage(
            (msg: IMessage) => {
                this.handleMessage(msg);
            },
            undefined,
            globalManager.context?.subscriptions
        );
    }

    private handleMessage(msg: IMessage) {
        switch (msg.type) {
            case WEBVIEW_MESSAGE_TYPE.redirect:
                this.handleMessageForRedirectPage(msg.data);
                break;
            default:
                break;
        }
    }

    private handleMessageForRedirectPage(pagePath: string) {
        const htmlContent = this.getWebViewContent(pagePath);
        this.showWebview({
            content: htmlContent,
        });
    }

    private onDidDisposeWebview(): void {
        this.panel = undefined;
    }
}

export default new WebviewManager();