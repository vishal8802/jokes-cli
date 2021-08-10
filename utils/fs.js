const fs = require('fs');

const addJoke = (joke) => {
    try {
        fs.appendFileSync('jokes.txt', joke.trim() + '\n\n');
    } catch (err) {
        throw 'Something went wrong while writing the file';
    }
};

const getPopularJoke = () => {
    if(!fs.existsSync('jokes.txt')) return '';
    const jokes = fs.readFileSync('jokes.txt', 'utf8');
    const jokesArray = jokes.split('\n\n');
    const jokesMap = {};
    let maxOccured = jokesArray[0] || '';
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

const clearJokes = ()=>{
    fs.truncateSync('jokes.txt')
}

module.exports = { addJoke, getPopularJoke, clearJokes };
