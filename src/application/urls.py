"""
urls.py

URL dispatch route mappings and error handlers

"""
from flask import render_template

from application import app

from application.views.public.public_warmup import PublicWarmup
from application.views.public.public_index import PublicIndex
from application.views.public.public_say_hello import PublicSayHello


# URL dispatch rules

# App Engine warm up handler
# See http://code.google.com/appengine/docs/python/config/appconfig.html#Warming_Requests
#app.add_url_rule('/_ah/warmup', 'public_warmup', view_func=PublicWarmup.as_view('public_warmup'))

app.add_url_rule('/', 'public_index', view_func=PublicIndex.as_view('public_index'))

#app.add_url_rule('/hello/<username>', 'public_say_hello', view_func=PublicSayHello.as_view('public_say_hello'))


# Error handlers

# Handle 404 errors


@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

# Handle 500 errors


@app.errorhandler(500)
def server_error(e):
    return render_template('500.html'), 500
