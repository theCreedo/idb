#!flask/bin/python
from flask import Flask, jsonify
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


@app.route('/')
def index():
	db.session.query(Track).all()
 	return 'Hello World'

# @app.route('/boswe')
# def api():
#     return "Welcome!"




if __name__ == '__main__':
    app.run(debug=True)

