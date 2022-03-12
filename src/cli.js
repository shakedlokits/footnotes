#!/usr/bin/env node
import { program } from 'commander';

program
    .name('footnotes')
    .description('Keep your own code commentary to yourself!')
    .version('1.0.0');

program
    .command('init')
    .description('Initializes a repository to use footnotes')
    .action(() => {
        console.log('Initializing the repository');
    });

program.parse();
