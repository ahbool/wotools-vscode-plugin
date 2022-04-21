import * as path from 'path';

export const getAbsolutePath = (fileOrDir: string) => {
    const currPath = fileOrDir.replace(/\//g, path.sep).replace(/\\/g, path.sep);
    return path.join(__dirname, '..', currPath);
};
