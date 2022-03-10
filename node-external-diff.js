import shell from "shelljs";
import { createLogger, transports, format } from "winston";

const logger = createLogger({
  transports: [new transports.File({ filename: ".external-diff.log" })],
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

const getNativeFileDiff = (filePath) => {
  const { stdout, stderr, code } = shell.exec(
    `git diff --no-ext-diff --exit-code -- ${filePath}`,
    { silent: true }
  );

  return { diff: stdout, error: stderr, fileCount: code };
};

const parameters = getParameters();
logger.info("Running diff with parameters", parameters);

const nativeResponse = getNativeFileDiff(parameters.path);
logger.info("Received diff response", nativeResponse);

process.stdout.write(nativeResponse.diff);
