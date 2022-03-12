#!/usr/bin/env node
import { logger } from './shared/logger.js';
import { getFilterParameters } from './shared/diff-utilities.js';
import { stripCommentsFromText } from './shared/comment-utilities.js';

const parameters = getFilterParameters();
logger.info('Running clean filter with parameters', parameters);

const strippedContent = stripCommentsFromText(parameters.content);
logger.info('Stripping comments for clean filter', strippedContent);

process.stdout.write(strippedContent);
