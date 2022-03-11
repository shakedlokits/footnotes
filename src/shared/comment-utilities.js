export const stripCommentsFromText = (text) => {
  const commentRegex = /(\/\*\*\n(?:^ \*.*\n)* \*\/\n)/gm;
  return text.replace(commentRegex, '');
};
