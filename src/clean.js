import { logger } from './shared/logger.js';
import { getFilterParameters } from './shared/diff-utilities.js';


const parameters = getFilterParameters();
logger.info("Running clean filter with parameters", parameters);
//
// const filePath = parameters.newFile;
// const isNotDeleted = filePath !== '/dev/null';
//
// if (isNotDeleted) {
//   backupFile(filePath);
//   stripCommentsFromFile(filePath);
// }
//
// const originalPatch = getOriginalPatch(parameters.path);
// logger.info("Received original patch", originalPatch);
//
// if (isNotDeleted) {
//   restoreFile(filePath);
// }

process.stdout.write(parameters.content);
