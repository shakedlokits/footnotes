import chalk from 'chalk'

String.prototype.publish = function () { console.log(this) };

export default {
    cli: {
        init: {
            welcome: `Welcome to ${chalk.blue('footnotes!')}🎉 Let's get you up and running in a jiffy`,
            validations: {
                git: `Oh no, we are currently only supporting ${chalk.red('git repositories')}, Sorry 😢`,
                alreadyInitialized: `It seems like you already initialized ${chalk.blue('footnotes')}, we'll make sure everything's fine🙏`
            },
            directories: `Creating directories 🗂`,
            configuration: `Adding configurations 🛠️`,
            success: `${chalk.green('And we\'re done!')} Enjoy using footnotes ✅`
        }
    }
};
