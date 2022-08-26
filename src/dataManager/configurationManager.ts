import { workspace, WorkspaceFolder, Uri, ConfigurationChangeEvent, window } from 'vscode';
import * as path from 'path';
import Configuration from '../module/configuration';

class ConfigurationManager {
    constructor() {
        workspace.onDidChangeConfiguration((event: ConfigurationChangeEvent) => {
            if (event.affectsConfiguration('wotools.FolderPathForLocalPlugins')) {
                if (!path.isAbsolute(this.getConfiguration().localPluginDirPath)) {
                    window.showErrorMessage('Please enter the absolute path.');
                }
            }
        });
    }

    public configuration(scope?: Uri | WorkspaceFolder) {
        return workspace.getConfiguration('wotools', scope);
    }

    public getConfiguration(): Configuration {
        const localPluginDirPath = this.configuration().get<string>('FolderPathForLocalPlugins') || '';

        return new Configuration(localPluginDirPath);
    }
}

export default new ConfigurationManager();
