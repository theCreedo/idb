#!flask/bin/python
from flask import Flask, jsonify, url_for, redirect, render_template
import flask_restless
from flask_sqlalchemy import SQLAlchemy
from models import db, Venue, Concert, Album, Artist, Track, app

# Create the Flask-Restless API manager.
manager = flask_restless.APIManager(app, flask_sqlalchemy_db=db)

# Create API endpoints, which will be available at /api/<tablename> by
# default. Allowed HTTP methods can be specified as well.
manager.create_api(Venue, methods=['GET', 'POST'], results_per_page=9)
manager.create_api(Concert, methods=['GET', 'POST'], results_per_page=9)
manager.create_api(Album, methods=['GET', 'POST'], results_per_page=9)
manager.create_api(Artist, methods=['GET', 'POST'], results_per_page=9)
manager.create_api(Track, methods=['GET', 'POST'], results_per_page=9)


@app.route('/')
@app.route('/home')
@app.route('/home.html')
def index():
	return render_template('home.html')



@app.route('/about')
@app.route('/about.html')
def about_page():
	return render_template('sweBootstrap/about.html')

# @app.route('/boswe')
# def api():
#     return "Welcome!"

@app.errorhandler(404)
def not_found(e):
	return render_template('404.html'), 404
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

@app.route('/api/sort/<string:collection>/<string:attribute>')
@app.route('/api/sort/<string:collection>/<string:attribute>/')
@app.route('/api/sort/<string:collection>/<string:attribute>/<string:direction>')
def collection_process(collection, attribute, direction='asc'):

	string = "/api/%s?q={\"order_by\":[{\"field\":\"%s\",\"direction\":\"%s\"}]}" % (collection, attribute, direction)
	return redirect(string)



@app.route('/api/filter/<collection>/<name>/<op>/<value>')
@app.route('/api/filters/<collection>/<name>/<op>/<value>')
@app.route('/api/filter/<collection>/<name>/<op>/<value>/')
@app.route('/api/filters/<collection>/<name>/<op>/<value>/')
def collection_process1(collection, name, op, value):
	string = "/api/%s?q={\"filters\":[{\"name\":\"%s\",\"op\":\"%s\", \"val\":\"%s\"}]}" % (collection, name, op, value)
	return redirect(string)

@app.route('/api')
@app.route('/api/')
def api():
	return render_template('api.html')

if __name__ == '__main__':
    app.run(debug=True)

