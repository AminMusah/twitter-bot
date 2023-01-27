const rwClient = require('./twitterClient')

const tweet = async () => {
    try {
        await rwClient.v2.tweet({
            text:'hi!'
        })
    } catch (error) {
        console.error(error)
    }
}

tweet()

console.log('hello')
