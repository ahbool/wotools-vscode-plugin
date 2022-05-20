import * as path from 'path';
import utils from '../utils';
import IPlugin from '../module/plugin';
import webviewManager from '../dataManager/webviewManager';

export default function selectPlugin(pluginName: string, data: IPlugin) {
    const defaultHtmlEntry = 'index.html';
    const defaultJsEntry = 'index.js';
    const pluginDir: string = data._pluginDirAbsolutePath;

    let mainFileName: string = '';
    let isExists: boolean = false;
    let webviewIconPath: string | undefined;

    if (data.main) {
        mainFileName = data.main;
        isExists = isExistsFile(pluginDir, data.main);
    }

    if (!isExists) {
        mainFileName = defaultHtmlEntry;
        isExists = isExistsFile(pluginDir, mainFileName);
    }
    if (!isExists) {
        mainFileName = defaultJsEntry;
        isExists = isExistsFile(pluginDir, mainFileName);
    }

    if (!isExists) {
        diaplsyError();
        return;
    }

    if (data.logo) {
        webviewIconPath = path.join(pluginDir, data.logo);
    }

    const extname = path.extname(mainFileName);

    switch (extname) {
        case '.js':
            runJS(pluginDir, mainFileName);
            break;
        case '.html':
            runHtml(path.join(pluginDir, mainFileName), pluginName, webviewIconPath);
            break;
        default:
            diaplsyError();
            break;
    }
}

function isExistsFile(dirPath: string, fileName: string) {
    return utils.file.existsSync(path.join(dirPath, fileName));
}

function runJS(pluginDir: string, mainFileName: string) {
    // TODO
    // const mainJS = require(path.join(pluginDir, mainFileName)).default;
    console.log('runJS...');
}

function runHtml(entryFilePath: string, title: string, iconPath?: string) {
    const htmlContent = webviewManager.getWebViewContent(entryFilePath);
    webviewManager.showWebview({
        title,
        content: htmlContent,
        isSideMode: false,
        iconPath,
    });
}

function diaplsyError() {
    utils.logger.error('Plug-in entry file only support index.html or index.js');
    utils.logger.warning('Please specify a value index.html or index.js in the "main" field of the plugin.json file');

    utils.prompt.showErrorMessage('Plug-in entry file only support index.html or index.js');
}
