// console.log(process.argv);
const { prompt } = require('./utils/prompt');
const request = require('./utils/request');
const { addJoke, getPopularJoke } = require('./utils/fs');

const BASE_URL = `https://icanhazdadjoke.com`;
let term = ``;

const init = async () => {
    if (process.argv.includes('leaderboard')) {
        const popularJoke = getPopularJoke();
        console.log('Here is a popular joke for you');
        console.log(popularJoke);
        process.exit();
    }
    const input = await prompt.get(['term']);
    term = input.term;

    const jokesResponse = await request({
        method: 'GET',
        url: `${BASE_URL}/search` + (term ? `?term=${term}` : ''),
        headers: { Accept: 'application/json' }
    });

    const jokes = JSON.parse(jokesResponse).results;
    if (!jokes.length) {
        console.log(`No jokes were found for the search term: ${term}`);
        process.exit();
    }

    const random = Math.floor(Math.random() * jokes.length);
    const randomJoke = jokes[random].joke;
    console.log(`Here is a joke for you`);
    console.log(randomJoke);
    addJoke(randomJoke);
};

init().catch((err) => {
    console.log(err);
    console.log('Something went wrong');
});
