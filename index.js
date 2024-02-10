const { Client, Events, GatewayIntentBits } = require('discord.js');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { dotenv } = require("dotenv");

// Grab Keys
dotenv.config();

// Gemini API Key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Create Discord Bot Client
const client = new Client({ 
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent], 
    disableEveryone: [false],
});

// Sends console message when online.
client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

//Set dedicated channel
const channel = process.env.CHANNEL_ID;

// Gemini-Discord Code
client.on('messageCreate', message => {
    //Checks for message sent by user, in correct channel, and history pattern
    if(!message.author.bot && message.channel.id == channel && historyLog[historyLog.length-1].role != "user"){
        //Checks for user > model pattern
         if (historyLog[historyLog.length-1].role != "user"){
            //Starts generation timer
            const start = Date.now();
            message.channel.send('*Generating*').then(msg => {setTimeout(() => msg.delete(), 2000)})
            geminiAI(message.content).then(text => {
                const end = Date.now();
                let timeTaken = ((end-start)*.001).toFixed(3);
                //Checks for empty message
                if (text !== ""){
                    //Checks Discord Message Limit
                    if (text.length > 1999){
                        let size = Math.ceil(text.length/2000);
                        let half = Math.ceil(text.length/size);
                        for(i = 0; i < size; i++){
                            message.channel.send(text.substring(i*half,(i+1) *half));
                        }
                        message.channel.send("\n***Generation Time: " +timeTaken+ 's***');
                    } else {
                        message.channel.send(text + " \n***Generation Time: " +timeTaken + 's***')
                    }
                }
            })
        }
      }
    }
})

//sets initial history
let historyLog = [
  {
    role: "user",
    parts: "Hello!",
  },
  {
    role: "model",
    parts: "How can I help you today?",
  },
];

// Gemini input - output
async function geminiAI(userInput) {
try{
    //Sets Ai saftey filters, can be (BLOCK_NONE, BLOCK_ONLY_HIGH, BLOCK_MEDIUM_AND_ABOVE, BLOCK_LOW_AND_ABOVE)
    const safetySettings = [
        { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
    ];
    const model = genAI.getGenerativeModel({ 
        model: "gemini-pro",
        safetySettings,
    });
    //Sets how Ai responds
    const chat = model.startChat({
        history: historyLog,
        safetySettings,
        generationConfig: {
            maxOutputTokens: 2048,
            topP: .01,
            temperature: .01,
            topK: 75,
        },
    });
    //Saves User input into history
    historyLog.push({
        role: "user",
        parts: userInput,
    });
    const msg = userInput;
    const result = await chat.sendMessage(msg);
    const response = await result.response;
    const text = response.text();
    //Saves Ai output into history
    historyLog.push({
        role: "model",
        parts: text,
    });
    // Limits history, Change limit to keep more history
    let limit = 30;
    if (historyLog.length >  limit) {
        historyLog.shift();
        historyLog.shift();
    }
    return text;
    } catch (error){
        console.log(error)
        const text = "Could Not Prompt AI, I have been reset.";
        historyLog = [{
            role: "user",
            parts: "Hello!",
        },
        {
            role: "model",
            parts: "How can I help you today?",
        },]
    return text
    } 
}

// Discord Bot API Key
client.login(process.env.DISCORD_API_KEY);