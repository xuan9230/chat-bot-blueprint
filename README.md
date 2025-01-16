# chat-bot-blueprint

A template to build a full-stack, genAI powered chat bot app fast and reliably.


This template includes:
1. Frontend React app: chat bot, information summary and dashboard
1. Backend: Python Flask API server, connected to OpenAI API
1. Deployment: docker-compose file for the integrated full-stack app

## To build and deploy the app

1. Create an openAI deployment, could be any cloud environment, e.g. Azure
1. Get the OpenAI API license key, API endpoint and deployment name from the deployment LLM instance
1. Create an `.env` file following the `.env_sample` at the root and replace with your credentials
1. Facilitate your command to gpt in `prompt.py`

The app will then be functioning and ready to deploy.

## To run the app:

`cd frontend && npm start`

`cd backend && flask --app server --debug run`

## Architecture

<img width="719" alt="image" src="https://github.com/user-attachments/assets/64a24c4d-0c79-454c-b13d-243844f991c9">

