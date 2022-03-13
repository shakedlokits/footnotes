import { readdirSync, readFileSync, writeFileSync } from 'fs';
import shell from 'shelljs';
import { logger } from './logger.js';

export const backupFile = (filePath) => {
    const fileContent = readFileSync(filePath, { encoding: 'utf8' });

    writeFileSync(`/tmp/${filePath}`, fileContent, { encoding: 'utf8' });
};

export const restoreFile = (filePath) => {
    const fileContent = readFileSync(`/tmp/${filePath}`, { encoding: 'utf8' });

    writeFileSync(filePath, fileContent, { encoding: 'utf8' });
};

export const getDirectories = (path) => {
    return readdirSync(path, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name);
};

export const getWorkingDirectory = () => shell.pwd().toString();

export const createDirectory = (path) => {
    shell.mkdir('-p', path);
    logger.debug('Created directories', path);
};

export const readFile = (path) => shell.cat(path).toString();

export const writeFile = (path, text) => new shell.ShellString(text).to(path);

export const appendToFile = (path, text) =>
    new shell.ShellString(text).toEnd(path);
