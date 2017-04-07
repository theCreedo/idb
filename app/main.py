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




if __name__ == '__main__':
    app.run(debug=True)

