import { createLogger, format, transports } from 'winston';

export const logger = createLogger({
    transports: [new transports.File({ filename: '.footnotes/runtime.log' })],
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-dd HH:mm:ss,SSS' }),
        format.metadata({
            fillExcept: ['message', 'level', 'timestamp', 'label'],
        }),
        format.printf(
            (data) =>
                `${data.timestamp} [${data.level.toUpperCase()}] ${
                    data.message
                } ${data.metadata ? JSON.stringify(data.metadata) : ''}`
        )
    ),
    level: 'debug',
});
