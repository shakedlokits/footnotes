import {readFileSync, writeFileSync} from 'fs';
import { stripCommentsFromText } from './comment-utilities.js';

export const backupFile = (filePath) => {
  const fileContent = readFileSync(filePath, {encoding: 'utf8'});

  writeFileSync(`/tmp/${filePath}`, fileContent, {encoding: 'utf8'});
};

export const restoreFile = (filePath) => {
  const fileContent = readFileSync(`/tmp/${filePath}`, {encoding: 'utf8'});

  writeFileSync(filePath, fileContent, {encoding: 'utf8'});
};

export const stripCommentsFromFile = (filePath) => {
  const fileContent = readFileSync(filePath, {encoding: 'utf8'});

  const strippedContent = stripCommentsFromText(fileContent);
  writeFileSync(filePath, strippedContent, {encoding: 'utf8'});
};
