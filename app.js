const { prompt } = require('./utils/prompt');
const request = require('./utils/request');
const { addJoke, getPopularJoke, clearJokes } = require('./utils/fs');
const chalk = require('chalk');
const log = console.log;

const BASE_URL = `https://icanhazdadjoke.com`;
let term = ``;

const init = async () => {
    if (process.argv.includes('leaderboard') && process.argv.includes('--clear')) {
        clearJokes();
        log(chalk.black.bgMagenta('\nLeaderboard cleared\n'))
        process.exit();
    }

    if (process.argv.includes('leaderboard')) {
        const popularJoke = getPopularJoke();
        if(!popularJoke){
            log(chalk.black.bgMagenta('\nNo jokes in leaderboard\n'));
            process.exit();

        }
        log(chalk.cyan('\nHere is a popular joke for you\n'));
        log(chalk.black.bgCyan(popularJoke + '\n\n'));
        process.exit();
    }

    const input = await prompt.get(['term']);
    term = input.term;
    console.clear();
    const jokesResponse = await request({
        method: 'GET',
        url: `${BASE_URL}/search` + (term ? `?term=${term}` : ''),
        headers: { Accept: 'application/json' }
    });

    const jokes = JSON.parse(jokesResponse).results;
    if (!jokes.length) {
        log(chalk.red(`\nNo jokes were found for the search term: ${term}\n`));
        process.exit();
    }

    const random = Math.floor(Math.random() * jokes.length);
    const randomJoke = jokes[random].joke;
    log(chalk.yellow('\nHere is a joke for you\n'));
    log(chalk.black.bgYellow(randomJoke))
    log('\n')
    addJoke(randomJoke);
};

init().catch((err) => {
    console.log(err)
    log(chalk.red.bold('Something went wrong'));
});
