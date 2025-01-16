import os
from datetime import timedelta
import langchain
from dotenv import load_dotenv
from flask import render_template
from flask_cors import CORS
from flask import Flask, request, jsonify, session
from llm import chat_completion

langchain.debug = True
langchain.verbose = True
# LOADS ENVIRON VARIABLE FROM .env Files
load_dotenv()
# openai_api_key = os.getenv("OPENAI_API_KEY")
PORT = os.environ.get("ENV_PORT")

# INIT SERVER - previous cofig
app = Flask(__name__)
app.config["SECRET_KEY"] = "123456"
app.config["CORS_ORIGIN_ALLOW_ALL"] = True
app.config["CORS_SUPPORTS_CREDENTIALS"] = True
app.config["PERMANENT_SESSION_LIFETIME"] = timedelta(minutes=30)
CORS(app)
cors = CORS(app, resource={r"/*": {"origins": "*"}})
app.config["CORS_HEADERS"] = "application/json"


@app.before_request
def check_session():
    if "memory" not in session:
        session["memory"] = []


@app.route("/")
def hello():
    return render_template("index.html")


@app.route("/submit", methods=["POST"])
def generate():
    body = request.get_json()
    question = body["question"]
    result = chat_completion(question)
    return jsonify(result)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=PORT)
