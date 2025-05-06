# Discord-Gemini

A Discord chatbot that integrates with **Google Gemini 2.5 Pro (Preview)** and supports **local AI image generation** via SDWebUI Forge API.

Built with JavaScript and powered by Node.js, this bot enables real-time, multi-user conversations with Gemini and image generation within a dedicated Discord channel.

---
##  Features

-  **Chatbot Integration**: Connects to Google Gemini 2.5 Pro for intelligent conversation.
-  **User Differentiation**: Tracks users to deliver individualized replies within a shared channel.
-  **Local AI Image Generation**: Supports grounded image prompts using SDWebUI Forge via API.
-  **Environment-based Config**: Secure `.env` setup for credentials and deployment flexibility.

---

## Requirements

- [Node.js](https://nodejs.org/en)
- npm
- Discord Bot Token
- Google Gemini API Key

---

## Setup

### 1. Discord Bot Token

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application
3. Navigate to the **Bot** tab:
   - Click "Add Bot"
   - Enable **Server Members Intent** and **Message Content Intent**
   - Generate and save your **bot token**
4. Go to the **OAuth2** tab → URL Generator:
   - Select `application.commands` and `bot`
   - Under **Bot Permissions**, enable:
     - Read Messages/View Channels
     - Send Messages
   - Use the generated URL at the bottom to invite your bot to your server

### 2. Google Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Generate an API key for Gemini 2.5 Pro (Preview)
3. Save the key securely

### 3. Environment Configuration

Create a `.env` file in the project root with the following:

```env
GEMINI_API_KEY=your_google_api_key
DISCORD_API_KEY=your_discord_bot_token
CHANNEL_ID=your_discord_channel_id
```

### 4. Install Dependencies

```bash
npm install
```

---

## Run the Bot

```bash
node index.js
```

---

## Repository Structure

```
discord-gemini/
├── index.js
├── .env
├── package.json
├── README.md
```

---

## Technologies Used

- Node.js
- Discord.js
- Google Gemini Pro API (2.5, preview)
- SDWebUI Forge (for local AI-generated image support)

---

## Notes

- This project is currently under development and may evolve as APIs and features are updated.
- Ensure SDWebUI Forge is running and accessible for image generation functionality.

---

## License

MIT

---

## Links

- [GitHub Repository](https://github.com/kdcao1/discord-geminipro-chatbot)
- [Google AI Studio](https://makersuite.google.com/app/apikey)
- [Discord Developer Portal](https://discord.com/developers/applications)
