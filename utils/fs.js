const fs = require('fs');

const addJoke = (joke) => {
    try {
        fs.appendFileSync('jokes.txt', joke.trim() + '\n\n');
    } catch (err) {
        throw 'Something went wrong while writing the file';
    }
};

const getPopularJoke = () => {
    const jokes = fs.readFileSync('jokes.txt', 'utf8');
    const jokesArray = jokes.split('\n\n');
    const jokesMap = {};
    let maxOccured = jokesArray[0] || 'No Jokes in the leaderboard';
    jokesArray.forEach((joke) => {
        if (joke) {
            if (!jokesMap[joke]) jokesMap[joke] = 1;
            else {
                jokesMap[joke]++;
                if (jokesMap[joke] > jokesMap[maxOccured]) {
                    maxOccured = joke;
                }
            }
        }
    });
    return maxOccured;
};

module.exports = { addJoke, getPopularJoke };
