import { readFileSync, writeFileSync } from 'fs';

export const stripCommentsFromText = (text) => {
    const commentRegex = /(\/\*\*\n(?:^ \*.*\n)* \*\/\n)/gm;
    return text.replace(commentRegex, '');
};

export const stripCommentsFromFile = (filePath) => {
    const fileContent = readFileSync(filePath, { encoding: 'utf8' });

    const strippedContent = stripCommentsFromText(fileContent);
    writeFileSync(filePath, strippedContent, { encoding: 'utf8' });
};
