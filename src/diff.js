import { logger } from './shared/logger.js';
import { getOriginalPatch, getDiffParameters } from './shared/diff-utilities.js';
import { backupFile, restoreFile, stripCommentsFromFile } from './shared/file-utilities.js';

const parameters = getDiffParameters();
logger.info("Running diff with parameters", parameters);

const filePath = parameters.newFile;
const isNotDeleted = filePath !== '/dev/null';

if (isNotDeleted) {
  backupFile(filePath);
  stripCommentsFromFile(filePath);
}

const originalPatch = getOriginalPatch(parameters.path);
logger.info("Received original patch", originalPatch);

if (isNotDeleted) {
  restoreFile(filePath);
}

process.stdout.write(originalPatch.diff);
