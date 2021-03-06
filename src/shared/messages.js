import chalk from 'chalk'

String.prototype.publish = function () { console.log(this) };

export default {
    cli: {
        init: {
            welcome: `Welcome to ${chalk.blue('footnotes!')}π Let's get you up and running in a jiffy`,
            validations: {
                git: `Oh no, we are currently only supporting ${chalk.red('git repositories')}, Sorry π’`,
                alreadyInitialized: `It seems like you already initialized ${chalk.blue('footnotes')}, we'll make sure everything's fineπ`
            },
            directories: `Creating directories π`,
            configuration: `Adding configurations π οΈ`,
            success: `${chalk.green('And we\'re done!')} Enjoy using footnotes β`
        }
    }
};
