import shell from 'shelljs';
import { readFileSync } from 'fs';

export const getDiffParameters = () => {
  const [path, oldFile, oldHex, oldMode, newFile, newHex, newMode] =
    process.argv.slice(2);

  return { path, oldFile, oldHex, oldMode, newFile, newHex, newMode };
};

export const getFilterParameters = () => ({ content: readFileSync(0, 'utf-8') });

export const getOriginalPatch = (filePath) => {
  const { stdout, stderr, code } = shell.exec(
    `git diff --no-ext-diff --exit-code -- ${filePath}`,
    { silent: true }
  );

  return { diff: stdout, error: stderr, fileCount: code };
};
