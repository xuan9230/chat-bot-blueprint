from ResponseModel import ResponseModel
from prompt import system_context
from openai import AzureOpenAI
import os
from dotenv import load_dotenv
import json

load_dotenv()

model = "gpt-4"
client = AzureOpenAI(
    api_key=os.getenv("OPENAI_API_KEY"),
    api_version="2024-02-01",
    azure_endpoint=os.getenv("OPENAI_API_ENDPOINT"),
)

deployment_name = "iress-wm-poc"
attributes = {}
messages = []


def get_initial_messages():
    return [
        {"role": "system", "content": system_context},
    ]


def chat_completion(user_content: str):
    global messages
    user_message = {"role": "user", "content": user_content}

    if not messages:
        messages = get_initial_messages()

    messages.append(user_message)

    completion = client.chat.completions.create(
        model=deployment_name, messages=messages
    )

    ai_response = completion.choices[0].message.content
    print(ai_response)

    try:
        response_data = json.loads(ai_response)

        # Check if 'attributes' key exists in response_data and update global attributes
        if "attributes" in response_data:
            attributes.update(response_data["attributes"])

        ai_message = {"role": "assistant", "content": response_data["message"]}
        messages.append(ai_message)
        # return response_data
        return ResponseModel(
            message=response_data["message"],
            attributes=attributes,
        ).to_json()
    except json.JSONDecodeError:
        # TODO: handle JSONDecodeError and return the response accordingly
        messages.append({"role": "assistant", "content": ai_response})
        return ResponseModel(message=ai_response, attributes=attributes).to_json()
