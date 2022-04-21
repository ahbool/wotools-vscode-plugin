import * as path from 'path';
import utils from '../utils';
import IPlugin from '../module/plugin';
import webviewManager from '../dataManager/webviewManager';

export default function selectPlugin(pluginName: string, data: IPlugin) {
    const defaultHtmlEntry = 'index.html';
    const defaultJsEntry = 'index.js';

    let entryFileName: string = '';
    let entryFileDir: string = data._pluginDirAbsolutePath;
    let isExists: boolean = false;

    if (data.main) {
        entryFileName = data.main;
        isExists = isExistsFile(entryFileDir, data.main);
    }

    if (!isExists) {
        entryFileName = defaultHtmlEntry;
        isExists = isExistsFile(entryFileDir, entryFileName);
    }
    if (!isExists) {
        entryFileName = defaultJsEntry;
        isExists = isExistsFile(entryFileDir, entryFileName);
    }

    if (!isExists) {
        diaplsyError();
        return;
    }

    const extname = path.extname(entryFileName);

    switch (extname) {
        case '.js':
            runJS(entryFileDir, entryFileName);
            break;
        case '.html':
            runHtml(path.join(entryFileDir, entryFileName), pluginName);
            break;
        default:
            diaplsyError();
            break;
    }
}

function isExistsFile(dirPath: string, fileName: string) {
    return utils.file.existsSync(path.join(dirPath, fileName));
}

function runJS(entryFileDir: string, entryFileName: string) {
    // TODO
    // const mainJS = require(path.join(entryFileDir, entryFileName)).default;
    console.log('runJS...');
}

function runHtml(entryFilePath: string, title: string) {
    const htmlContent = webviewManager.getWebViewContent(entryFilePath);
    webviewManager.showWebview({
        title,
        content: htmlContent,
        isSideMode: false,
    });
}

function diaplsyError() {
    utils.logger.error('Plug-in entry file only support index.html or index.js');
    utils.logger.warning('Please specify a value index.html or index.js in the "main" field of the plugin.json file');

    utils.prompt.showErrorMessage('Plug-in entry file only support index.html or index.js');
}
