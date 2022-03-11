import shell from 'shelljs';

export const getDiffParameters = () => {
  const [path, oldFile, oldHex, oldMode, newFile, newHex, newMode] =
    process.argv.slice(2);

  return { path, oldFile, oldHex, oldMode, newFile, newHex, newMode };
};

export const getFilterParameters = () => {
  const [content] = process.argv.slice(2);

  return { content };
};

export const getOriginalPatch = (filePath) => {
  const { stdout, stderr, code } = shell.exec(
    `git diff --no-ext-diff --exit-code -- ${filePath}`,
    { silent: true }
  );

  return { diff: stdout, error: stderr, fileCount: code };
};
