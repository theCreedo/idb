# Insert quality, not quantity tests

import os
import unittest

from google.appengine.ext import testbed

from application import app

from models import Track, Artist, Album, Concert, Artist_Album_Association, Concert_AA_Association, db


class TestCase(unittest.TestCase):

    def setUp(self):
        # Flask apps testing. See: http://flask.pocoo.org/docs/testing/
        app.config['TESTING'] = True
        app.config['CSRF_ENABLED'] = False
        self.app = app.test_client()
        # Setups app engine test bed. See:
        # http://code.google.com/appengine/docs/python/tools/localunittesting.html#Introducing_the_Python_Testing_Utilities
        self.testbed = testbed.Testbed()
        self.testbed.activate()
        self.testbed.init_datastore_v3_stub()
        self.testbed.init_user_stub()
        self.testbed.init_memcache_stub()

    def tearDown(self):
        self.testbed.deactivate()

    # Test to see if going to the main URL actually works
    def test_home_redirects(self):
        rv = self.app.get('/')
        assert rv.status == '302 FOUND'

    # Tests to see if boswemianrhapsody.me and boswemianrhapsody.me/home.html
    # are the same page
    def test_home_default(self):
        rv = self.app.get('/')
        rv1 = self.app.get('/home.html')

        assert rv.data == rv1.data

    # Tests to see if routing to about page works
    def test_about_redirect(self):
        rv = self.app.get('/about.html')
        assert rv.status == '302 FOUND'
        assert 'Meet BoSWEmian Rhapsody' in rv.data

    # Tests to see if all the tables are accessible
    def test_table_redirect(self):
        rv = self.app.get('/tracksTable.html')
        assert rv.status == '302 FOUND'
        assert 'Tracks Table' in rv.data

        rv = self.app.get('/artistTable.html')
        assert rv.status == '302 FOUND'
        assert 'Artist Table' in rv.data

        rv = self.app.get('/albumsTable.html')
        assert rv.status == '302 FOUND'
        assert 'Albums Table' in rv.data

        rv = self.app.get('/concertsTable.html')
        assert rv.status == '302 FOUND'
        assert 'Concerts Table' in rv.data

    # Tests to see if posting a new album to the album table works
    def test_post_album(self):
        rv = self.app.post('/albumsTable.html', data=dict(
            name='A Head Full of Dreams'
        ), follow_redirects=True)
        assert 'Added' in rv.data

        rv = self.app.get('/albumsTable.html')
        assert 'No albums' not in rv.data
        assert 'A Head Full of Dreams' in rv.data

    # Tests to see if the posted album can be modified
    def test_put_album(self):
        test_post_album()
        rv = self.app.put('/albumsTable.html', data=dict(
            id=2000
                name='A Head Full Of Dreams'
        ), follow_redirects=True)
        assert rv.status == '200 SUCCESS'
        assert 'A Head Full Of Dreams' in rv.data

    # Tests to see if it is possible to go to the album page after
    # it has been posted
    def test_album_table_redirect(self):
        test_post_album()
        rv = self.app.get('/coldplayAlbumPage.html')
        assert rv.status == '302 FOUND'
        assert 'A Head Full of Dreams' in rv.data

    # Tests posting a track to the track table.
    def test_post_track(self):
        rv = self.app.post('/tracksTable.html', data=dict(
            name='Adventure of a Lifetime',
            id=2000
        ), follow_redirects=True)
        assert 'Added' in rv.data

        rv = self.app.get('/tracksTable.html')
        assert 'No tracks' not in rv.data
        assert 'Adventure of a Lifetime' in rv.data

    # Tests modifying a posted track. Documentation will show that
    # this is different from modifying an album since a track requires
    # both a name AND an ID, rather than just and ID.
    def test_put_track(self):
        rv = self.app.put('/tracksTable.html', data=dict(
            id=2000
                name='Adventure Of A Lifetime'
        ), follow_redirects=True)

        assert rv.status == '200 SUCCESS'
        assert 'Adventure Of A Lifetime' in rv.data

    # Tests 404 page.
    def test_404(self):
        rv = self.app.get('/missing')
        assert rv.status == '404 NOT FOUND'
        assert '<h1>Not found</h1>' in rv.data

    def test_db_create_track(self):
        track = Track('track_name', 'genre_name', 'release_date', 1, 0, 'url', True)
        db.session.add(track)
        db.session.commit()
        track_result = db.session.query(Track).filter_by(name='track_name').first()
        assert (track_result is track)

    # def test_db_delete_track(self):

    def test_db_create_artist(self):
        artist = Artist('artist_name', 'url', 'country', 'decade', 'genre')
        db.session.add(artist)
        db.session.commit()
        artist_result = db.session.query(Artist).filter_by(name='artist_name').first()
        assert (artist_result is artist)

    def test_db_create_album(self):
        album = Album('album_name', 'genre', 'release', 'url', 'label', 1)
        db.session.add(album)
        db.session.commit()
        album_result = db.session.query(Album).filter_by(name='album_name').first()
        assert (album_result is album)

    def test_db_create_concert(self):
        concert = Concert('name', 'link', 'date', 'time')
        db.session.add(concert)
        db.session.commit()
        concert_result = db.session.query(Concert).filter_by(name='concert_name').first()
        assert (concert_result is concert)


if __name__ == '__main__':
    unittest.main()
