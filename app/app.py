#!flask/bin/python
from flask import Flask, jsonify
import flask.ext.sqlalchemy
import flask.ext.restless
from flask_sqlalchemy import SQLAlchemy


from models import db, Venue, Concert, Album, Artist, Track

app = Flask(__name__)

# Create the Flask-Restless API manager.
manager = flask.ext.restless.APIManager(app, flask_sqlalchemy_db=db)

# Create API endpoints, which will be available at /api/<tablename> by
# default. Allowed HTTP methods can be specified as well.
manager.create_api(Venue, methods=['GET', 'POST'])
manager.create_api(Concert, methods=['GET', 'POST'])
manager.create_api(Album, methods=['GET', 'POST'])
manager.create_api(Artist, methods=['GET', 'POST'])
manager.create_api(Track, methods=['GET', 'POST'])


# Set up getting database connection

@app.route('/')
def index():
    return "Hello, World!"

@app.route('/boswe')
def api():
    return "Welcome!"




if __name__ == '__main__':
    app.run(debug=True)

