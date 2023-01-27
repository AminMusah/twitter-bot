const rwClient = require("./twitterClient");
require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});

const openai = new OpenAIApi(configuration);

const generateText = async () => {
  const prompt = "write a famous quote";

  try {
    const response = await openai.createCompletion({
      prompt,
      n: 1,
      model: "text-davinci-003",
      max_tokens: 2048,
      temperature: 1,
    });
    console.log(response.data.choices[0].text);
    let result = response.data.choices[0].text;


    //Tweet
    const tweet = async () => {
      try {
        await rwClient.v2.tweet({
          text: result,
        });
      } catch (error) {
        console.error(error);
      }
    };

    setInterval(function () {
      // code to be executed every 24 hours
      tweet();
    }, 86400000);
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
};



const quote = generateText();
console.log(quote);

console.log("hello");
