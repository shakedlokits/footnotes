#!/usr/bin/env node
import { logger } from './shared/logger.js'
import {
    getDiffParameters, getOriginalPatch,
} from './shared/diff-utilities.js'
import { backupFile, restoreFile } from './shared/file-system-utilities.js'
import { stripCommentsFromFile } from './shared/comment-utilities.js'

const parameters = getDiffParameters()
logger.info('Running diff with parameters', parameters)

const filePath = parameters.newFile
const isNotDeleted = filePath !== '/dev/null'

if (isNotDeleted) {
    backupFile(filePath)
    stripCommentsFromFile(filePath)
}

const originalPatch = getOriginalPatch(parameters.path)
logger.info('Received original patch', originalPatch)

if (isNotDeleted) {
    restoreFile(filePath)
}

process.stdout.write(originalPatch.diff);
