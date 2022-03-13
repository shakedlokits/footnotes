#!/usr/bin/env node
import { program } from 'commander'
import { configureRepository } from './shared/configuration-utilities.js'
import { logger } from './shared/logger.js'
import messages from './shared/messages.js'
import {
    createDirectory, getDirectories, getWorkingDirectory,
} from './shared/file-system-utilities.js'

const init = () => {
    const workingDirectory = getWorkingDirectory()
    const directories = getDirectories(workingDirectory)
    logger.info('Initializing project', { workingDirectory, directories })

    const isGitRepository = directories.includes('.git')
    if (!isGitRepository) {
        messages.cli.init.validations.git.publish()
        return
    }

    messages.cli.init.welcome.publish()

    createDirectory('.footnotes/objects')
    messages.cli.init.directories.publish()

    configureRepository()
    messages.cli.init.configuration.publish()

    messages.cli.init.success.publish()
}

program
    .name('footnotes')
    .description('Keep your own code commentary to yourself!')
    .version('1.0.0')

program
    .command('init')
    .description('Initializes a repository to use footnotes')
    .action(init);

program.parse();
