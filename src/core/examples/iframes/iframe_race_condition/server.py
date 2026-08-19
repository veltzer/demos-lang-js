#!/usr/bin/python3

""" Tiny flask server for the iframe race-condition demo. """

import time

from flask import Flask

app = Flask(
    "server",
    static_url_path="",
    static_folder="",
)

@app.route("/")
def default():
    """ Serve the demo index page. """
    return app.send_static_file("index.html")

@app.route("/iframe")
def iframe():
    """ Serve the iframe content page. """
    return app.send_static_file("iframe.html")

@app.route("/away")
def away():
    """ Serve the away page after a long delay. """
    time.sleep(13)
    return app.send_static_file("away.html")

@app.route("/doit")
def doit():
    """ Respond after a very long delay. """
    time.sleep(30)
    return "response"

@app.route("/delay")
def delay():
    """ Respond after a short delay. """
    time.sleep(3)
    return ""

app.run(port=8000, host="127.0.0.1")
