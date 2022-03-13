import { appendToFile, readFile, writeFile } from './file-system-utilities.js';
import { logger } from './logger.js'

const CONFIGURATIONS = [
    {
        path: '.gitattributes',
        content: '* filter=footnotes-filter',
    },
    {
        path: '.git/config',
        content: `[filter "footnotes-filter"]
        clean = "footnotes-clean"
        smudge = "cat"`,
    },
    {
        path: '.gitignore',
        content: '.footnotes',
    },
];

const CONFIGURATIONS_REGEX =
    /^# START footnotes configuration\n(?<content>(?:\n|.)*?)^# END footnotes configuration\n/gm;

const formatConfiguration = (configuration) => {
    return `
# START footnotes configuration
# DO NOT CHANGE THESE HEADERS
${configuration}
# END footnotes configuration
`;
};

const stripConfigurations = (text) =>
    text.replace(CONFIGURATIONS_REGEX, '');

const stripConfigurationsFromFile = (path) => {
    const fileContent = readFile(path);
    const strippedContent = stripConfigurations(fileContent);

    writeFile(path, strippedContent);
}

const addConfigurationToFile = (path, configuration) => {
    const formattedConfiguration = formatConfiguration(configuration);

    appendToFile(path, formattedConfiguration);
}

export const configureRepository = () => {
    CONFIGURATIONS.forEach((configuration) => {
        stripConfigurationsFromFile(configuration.path)
        addConfigurationToFile(configuration.path, configuration.content)
    });
    logger.info('Created configurations');
}
