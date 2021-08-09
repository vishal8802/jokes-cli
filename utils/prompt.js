const prompt = require('prompt');

const start = () => {
    return prompt.start();
};

const get = async (fields) => {
    try {
        const res = await prompt.get(fields);
        return res;
    } catch (error) {
        throw 'Something went wrong'
    }
};

module.exports = { prompt: { start, get } };
