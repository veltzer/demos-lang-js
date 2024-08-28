#!/usr/bin/python3

from flask import Flask
import time

app = Flask(
    "server",
    static_url_path="",
    static_folder="",
)

@app.route("/")
def default():
    return app.send_static_file("index.html")

@app.route("/iframe")
def iframe():
    return app.send_static_file("iframe.html")

@app.route("/away")
def away():
    time.sleep(13);
    return app.send_static_file("away.html")

@app.route("/doit")
def doit():
    time.sleep(30);
    return "response"

@app.route("/delay")
def delay():
    time.sleep(3);
    return ""

app.run(port=8000, host="127.0.0.1")
