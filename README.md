# discord-gemini
Discord Bot Integration with Google Gemini Pro

Written in JS

ChatBot for Dedicated Discord Channel

Requires Node.js and npm

# Dependencies:

 - node.js - https://nodejs.org/en
 - npm
 - Discord Bot token
 - Google Cloud Gemini API key
 
# Setup

## Discord Bot Token

 1. Go to Discord Dev site - https://discord.com/developers/applications
 2. Create new application
 3. Go to bot tab and create new token, save this somewhere
 4. Enable server members intent and message content intent
 5. Go to OAuth2 tab, URL generator
 6. Select application.commands and bot
 7. Give read message and send message permissions.
 8. Use generated URL at bottom to add to server

## Google Gemini API Key

 1. Go to Google AI Studio to get key - https://makersuite.google.com/app/apikey
 2. Create new API key, save this somewhere

## Set up .env file

 1. Set GEMINI_API_KEY = Google Gemini API Key
 2. Set DISCORD_API_KEY = Discord Bot Token
 3. Set CHANNEL_ID = dedicated channel id for bot

## Setup npm dependencies

 1. Go to PowerShell and go into cloned repo
 2. Type in: npm i package.json

## Run

 1. Type in: node index.js
