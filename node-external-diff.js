import shell from "shelljs";
import { createLogger, transports, format } from "winston";
import parseDiff from 'parse-diff';
import {readFileSync} from 'fs';
import DiffMatchPatch from 'diff-match-patch';

const logger = createLogger({
  transports: [new transports.File({ filename: ".footnotes.log" })],
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-dd HH:mm:ss,SSS" }),
    format.metadata({ fillExcept: ["message", "level", "timestamp", "label"] }),
    format.printf(
      (data) =>
        `${data.timestamp} [${data.level.toUpperCase()}] ${data.message} ${
          data.metadata ? JSON.stringify(data.metadata) : ""
        }`
    )
  ),
  level: "debug",
});

const getParameters = () => {
  const [path, oldFile, oldHex, oldMode, newFile, newHex, newMode] =
    process.argv.slice(2);

  return { path, oldFile, oldHex, oldMode, newFile, newHex, newMode };
};

const getOriginalPatch = (filePath) => {
  const { stdout, stderr, code } = shell.exec(
    `git diff --no-ext-diff --exit-code -- ${filePath}`,
    { silent: true }
  );

  return { diff: stdout, error: stderr, fileCount: code };
};

function formatGitPatch(structuredPatch) {
  const patchLines = [];

  patchLines.push(`diff --git a/${structuredPatch.from} b/${structuredPatch.to}`);
  patchLines.push(`index ${structuredPatch.index.join(' ')}`);

  patchLines.push(`--- a/${structuredPatch.from}`);
  patchLines.push(`--- b/${structuredPatch.to}`);

  structuredPatch.chunks.forEach(chunk => {
    patchLines.push(chunk.content);

    chunk.changes.forEach(change => {
      patchLines.push(change.content);
    })
  })

  return patchLines.join('\n') + '\n';
}

const parameters = getParameters();
logger.info("Running diff with parameters", parameters);

const originalPatch = getOriginalPatch(parameters.path);
logger.info("Received original patch", originalPatch);

const [structuredPatch] = parseDiff(originalPatch.diff);
logger.info("Parsed patch", structuredPatch);

const patch = formatGitPatch(structuredPatch);
logger.info("Reformatted parsed patch", patch);

process.stdout.write(patch);
