#!flask/bin/python
from flask import Flask, jsonify, redirect, url_for, request
import flask.ext.restless
from flask_sqlalchemy import SQLAlchemy
from models import db, Venue, Concert, Album, Artist, Track, app

# Create the Flask-Restless API manager.
manager = flask.ext.restless.APIManager(app, flask_sqlalchemy_db=db)

# Create API endpoints, which will be available at /api/<tablename> by
# default. Allowed HTTP methods can be specified as well.
manager.create_api(Venue, methods=['GET', 'POST'], results_per_page=9)
manager.create_api(Concert, methods=['GET', 'POST'], results_per_page=9)
manager.create_api(Album, methods=['GET', 'POST'], results_per_page=9)
manager.create_api(Artist, methods=['GET', 'POST'], results_per_page=9)
manager.create_api(Track, methods=['GET', 'POST'], results_per_page=9)


'''
Still need to figure out this function
Have to render the home.html correctly
'''
# @app.route('/')
# def index():
#     return redirect(url_for('static', filename='sweBootstrap/home.html'))


'''
Three ways of approaching this:
1. http://flask.pocoo.org/docs/0.12/quickstart/#http-methods
This may be good in regards to calls using flask.
Problem, no clue how it works in hand.

2. http://docs.python-requests.org/en/master/user/quickstart/#quickstart
This may be good - calling requests on the endpoints of local machine.
Problem is that it may not be able to make requests on local machine
Additional problem is that the requests seems to take a long time and not return anything

3. Build your own route, analyze the endpoints, and through it, create a
url that you can then redirect to, containing the finished query, so that data
is displayed.
Problem is that there are errors when endpoints do illegal things
f.e. you can't have an /api/<collection>/<string-based-value> in replacement
of an integer value.
Additional problem is finding a good endpoint to work with, and having
it build correctly. This may be completely wrong in that you can't
do a Get request with queries.
ALMOST CONFIRMED 3 WILL PROBABLY NOT WORK, but WORTH A TRY IF 1 AND 2 DON'T
'''
@app.route('/sort/<collection>/<name>/<direction>')
def collection_process(collection, name, direction='asc'):
	return redirect(url_for('/api/' + collection + '?q={' + "\"order_by\":[{\"field\":\"" + name + "\",\"direction\":\"" + direction + "\"}])"))
	# string = 'http://127.0.0.1:5000/api/' + collection + '?q={' + "\"order_by\":[{\"field\":\"" + name + "\",\"direction\":\"" + direction + "\"}])"
	# r = requests.get(string)


@app.route('/api/<collection>/filter/<name>/<op>/<value>')
def collection_process1(collection, name, op, value):
	if isinstance(value, int):
		return redirect(url_for('/api/' + collection + '?q={' + "\"filters\":[{\"name\":" + name + ",\"op\":" + op + ",\"val\":" + value + "\"}])"))




if __name__ == '__main__':
    app.run(debug=True)

