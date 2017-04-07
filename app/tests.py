# Insert quality, not quantity tests

import os
import unittest

# from google.appengine.ext import testbed

# from application import app

from models import Track, Artist, Album, Concert, Artist_Album_Association, Concert_AA_Association, db, app, Venue


class TestCase(unittest.TestCase):

    def setUp(self):
        # Flask apps testing. See: http://flask.pocoo.org/docs/testing/
        app.config['TESTING'] = True
        app.config['CSRF_ENABLED'] = False
        self.app = app.test_client()
        # Setups app engine test bed. See:
        # http://code.google.com/appengine/docs/python/tools/localunittesting.html#Introducing_the_Python_Testing_Utilities
    #     self.testbed = testbed.Testbed()
    #     self.testbed.activate()
    #     self.testbed.init_datastore_v3_stub()
    #     self.testbed.init_user_stub()
    #     self.testbed.init_memcache_stub()

    # def tearDown(self):
    #     self.testbed.deactivate()

    # # Test to see if going to the main URL actually works
    # def test_home_redirects(self):
    #     rv = self.app.get('/')
    #     assert rv.status == '302 FOUND'

    # # Tests to see if boswemianrhapsody.me and boswemianrhapsody.me/home.html
    # # are the same page
    # def test_home_default(self):
    #     rv = self.app.get('/')
    #     rv1 = self.app.get('/home.html')

    #     assert rv.data == rv1.data

    # # Tests to see if routing to about page works
    # def test_about_redirect(self):
    #     rv = self.app.get('/about.html')
    #     assert rv.status == '302 FOUND'
    #     assert 'Meet BoSWEmian Rhapsody' in rv.data

    # # Tests to see if all the tables are accessible
    # def test_table_redirect(self):
    #     rv = self.app.get('/tracksTable.html')
    #     assert rv.status == '302 FOUND'
    #     assert 'Tracks Table' in rv.data

    #     rv = self.app.get('/artistTable.html')
    #     assert rv.status == '302 FOUND'
    #     assert 'Artist Table' in rv.data

    #     rv = self.app.get('/albumsTable.html')
    #     assert rv.status == '302 FOUND'
    #     assert 'Albums Table' in rv.data

    #     rv = self.app.get('/concertsTable.html')
    #     assert rv.status == '302 FOUND'
    #     assert 'Concerts Table' in rv.data

    # # Tests to see if posting a new album to the album table works
    # def test_post_album(self):
    #     rv = self.app.post('/albumsTable.html', data=dict(
    #         name='A Head Full of Dreams'
    #     ), follow_redirects=True)
    #     assert 'Added' in rv.data

    #     rv = self.app.get('/albumsTable.html')
    #     assert 'No albums' not in rv.data
    #     assert 'A Head Full of Dreams' in rv.data

    # # Tests to see if the posted album can be modified
    # def test_put_album(self):
    #     test_post_album()
    #     rv = self.app.put('/albumsTable.html', data=dict(
    #         id=2000
    #             name='A Head Full Of Dreams'
    #     ), follow_redirects=True)
    #     assert rv.status == '200 SUCCESS'
    #     assert 'A Head Full Of Dreams' in rv.data

    # # Tests to see if it is possible to go to the album page after
    # # it has been posted
    # def test_album_table_redirect(self):
    #     test_post_album()
    #     rv = self.app.get('/coldplayAlbumPage.html')
    #     assert rv.status == '302 FOUND'
    #     assert 'A Head Full of Dreams' in rv.data

    # # Tests posting a track to the track table.
    # def test_post_track(self):
    #     rv = self.app.post('/tracksTable.html', data=dict(
    #         name='Adventure of a Lifetime',
    #         id=2000
    #     ), follow_redirects=True)
    #     assert 'Added' in rv.data

    #     rv = self.app.get('/tracksTable.html')
    #     assert 'No tracks' not in rv.data
    #     assert 'Adventure of a Lifetime' in rv.data

    # # Tests modifying a posted track. Documentation will show that
    # # this is different from modifying an album since a track requires
    # # both a name AND an ID, rather than just and ID.
    # def test_put_track(self):
    #     rv = self.app.put('/tracksTable.html', data=dict(
    #         id=2000
    #             name='Adventure Of A Lifetime'
    #     ), follow_redirects=True)

    #     assert rv.status == '200 SUCCESS'
    #     assert 'Adventure Of A Lifetime' in rv.data

    # # Tests 404 page.
    # def test_404(self):
    #     rv = self.app.get('/missing')
    #     assert rv.status == '404 NOT FOUND'
    #     assert '<h1>Not found</h1>' in rv.data

    def test_db01_create_track(self):
        track = Track('track_name', 'genre_name', 'release_date', 1, 0, 'url', True, 'uri')
        db.session.add(track)
        db.session.commit()
        track_result = Track.query.filter(Track.name=='track_name').first()
        assert (track_result is track)

    def test_db02_delete_track(self):
        track = Track.query.filter_by(name='track_name').first()
        assert track is not None
        db.session.delete(track)
        db.session.commit()
        assert Track.query.filter_by(name='track_name').first() is None

    def test_db03_create_artist(self):
        artist = Artist('artist_name', 'url', 'country', 'decade', 'genre')
        db.session.add(artist)
        db.session.commit()
        artist_result = Artist.query.filter_by(name='artist_name').first()
        assert (artist_result is artist)

    def test_db04_delete_artist(self):
        artist = Artist.query.filter_by(name='artist_name').first()
        assert artist is not None
        db.session.delete(artist)
        db.session.commit()
        assert Artist.query.filter_by(name='artist_name').first() is None

    def test_db05_create_album(self):
        album = Album('album_name', 'genre', 'release', 'url', 'label', 1, 'uri')
        db.session.add(album)
        db.session.commit()
        album_result = Album.query.filter_by(name='album_name').first()
        assert (album_result is album)

    def test_db06_delete_album(self):
        album = Album.query.filter_by(name='album_name').first()
        assert album is not None
        db.session.delete(album)
        db.session.commit()
        assert Album.query.filter_by(name='album_name').first() is None

    def test_db07_create_concert(self):
        concert = Concert('name', 'link', 'date', 'time')
        db.session.add(concert)
        db.session.commit()
        concert_result = Concert.query.filter_by(name='name').first()
        assert (concert_result is concert)

    def test_db08_delete_concert(self):
        concert = Concert.query.filter_by(name='name').first()
        assert concert is not None
        db.session.delete(concert)
        db.session.commit()
        assert Concert.query.filter_by(name='name').first() is None

    def test_db09_create_venue(self):
        venue = Venue('name', 'city', 'region', 'country', 0.0, 0.0)
        db.session.add(venue)
        db.session.commit()
        venue_result = Venue.query.filter_by(name='name').first()
        assert (venue_result is venue)

    def test_db10_delete_venue(self):
        venue = Venue.query.filter_by(name='name').first()
        assert venue is not None
        db.session.delete(venue)
        db.session.commit()
        assert Venue.query.filter_by(name='name').first() is None

    def test_db11_create_track_artist_relationship(self):
        track = Track('track_name', 'genre_name', 'release_date', 1, 0, 'url', True, 'uri')
        artist = Artist('artist_name', 'url', 'country', 'decade', 'genre')
        artist.tracks.append(track)
        db.session.add(track)
        db.session.add(artist)
        db.session.commit()

        track_result = Track.query.filter_by(name='track_name').first()
        artist_result = Artist.query.filter_by(name='artist_name').first()
        assert (track_result is track)
        assert (artist_result is artist)
        assert (artist.tracks[0] is track_result)
        assert (track.artist is artist_result)

    def test_db12_delete_track_artist_relationship(self):
        track_result = Track.query.filter_by(name='track_name').first()
        artist_result = Artist.query.filter_by(name='artist_name').first()
        assert (track_result is not None)
        assert (artist_result is not None)

        db.session.delete(track_result)
        db.session.delete(artist_result)
        db.session.commit()
        assert Track.query.filter_by(name='track_name').first() is None
        assert Artist.query.filter_by(name='artist_name').first() is None

    # def test_db_track_album_relationship(self):
    #     track = Track('track_name', 'genre_name', 'release_date', 1, 0, 'url', True, 'uri')
    #     album = Album('album_name', 'genre', 'release', 'url', 'label', 1, 'uri')
    #     album.tracks.append(track)

    #     db.session.add(track)
    #     db.session.add(album)
    #     db.session.commit()

    #     track_result = Track.query.filter_by(name='track_name').first()
    #     album_result = Album.query.filter_by(name='album_name').first()
    #     # assert (track_result is track)
    #     # assert (album_result is album)
    #     assert (album.tracks[0].id == track_result.id)
    #     assert (track.album_id == album_result.id)

    # def test_db_delete_track_album_relationship(self):
    #     track_result = Track.query.filter_by(name='track_name').first()
    #     album_result = Album.query.filter_by(name='album_name').first()
    #     assert (track_result is not None)
    #     assert (album_result is not None)

    #     db.session.delete(track_result)
    #     db.session.delete(album_result)
    #     db.session.commit()
    #     assert Track.query.filter_by(name='track_name').first() is None
    #     assert Album.query.filter_by(name='album_name').first() is None

    # def test_db_aa_relationship(self):
    #     artist = Artist('artist_name', 'url', 'country', 'decade', 'genre')
    #     album = Album('album_name', 'genre', 'release', 'url', 'label', 1, 'uri')
    #     aa = Artist_Album_Association()

    #     artist.albums.append(aa)
    #     album.artists.append(aa)

    #     db.session.add(artist)
    #     db.session.add(album)
    #     db.session.commit()

    #     artist_result = Artist.query.filter_by(name='artist_name').first()
    #     album_result = Album.query.filter_by(name='album_name').first()
    #     aa_result = db.session.query(Artist_Album_Association).filter(Artist.id==artist_result.id).filter(Album.id==album_result.id).first()
    #     # assert (artist_result is artist)
    #     # assert (album_result is album)
    #     assert (album_result.artists[0].artist_id == artist_result.id)
    #     assert (artist_result.albums[0].album_id == album_result.id)
    #     assert (aa_result.artist_id == artist_result.id)
    #     assert (aa_result.album_id == album_result.id)

    # def test_db_delete_aa_relationship(self):
    #     artist_result = Artist.query.filter_by(name='artist_name').first()
    #     album_result = Album.query.filter_by(name='album_name').first()
    #     aa_result = db.session.query(Artist_Album_Association).filter(Artist.id==artist_result.id).filter(Album.id==album_result.id).first()
    #     assert (artist_result is not None)
    #     assert (album_result is not None)
    #     assert (aa_result is not None)

    #     db.session.delete(artist_result)
    #     db.session.delete(album_result)
    #     db.session.delete(aa_result)
    #     db.session.commit()
    #     assert (Artist.query.filter_by(name='artist_name').first() is None)
    #     assert (Album.query.filter_by(name='album_name').first() is None)
    #     assert (db.session.query(Artist_Album_Association).filter(Artist.id==artist_result.id).filter(Album.id==album_result.id).first() is None)

    # def test_db_concert_aa_relationship(self):
    #     artist = Artist('artist_name', 'url', 'country', 'decade', 'genre')
    #     album = Album('album_name', 'genre', 'release', 'url', 'label', 1, 'uri')
    #     aa = Artist_Album_Association()

    #     concert = Concert('concert_name', 'link', 'date', 'time')
    #     c_aa = Concert_AA_Association()

    #     aa.concerts.append(c_aa)
    #     concert.artist_album_pairs.append(c_aa)

    #     artist.albums.append(aa)
    #     album.artists.append(aa)

    #     db.session.add(artist)
    #     db.session.add(album)

    #     db.session.add(concert)
    #     db.session.commit()
        
    #     artist_result = Artist.query.filter_by(name='artist_name').first()
    #     album_result = Album.query.filter_by(name='album_name').first()
    #     aa_result = db.session.query(Artist_Album_Association).filter(Artist.id==artist_result.id).filter(Album.id==album_result.id).first()
    #     concert_result = Concert.query.filter_by(name='concert_name').first()
    #     c_aa_result = db.session.query(Concert_AA_Association).filter(Concert.id==concert_result.id).filter(Artist_Album_Association.id==aa_result.id).first()

    #     # assert (artist_result is artist)
    #     # assert (album_result is album)
    #     assert (concert_result.artist_album_pairs[0].id == aa_result.id)
    #     assert (aa_result.concerts[0].id == concert_result.id)
    #     assert (c_aa_result.concert_id == concert_result.id)
    #     assert (c_aa_result.aa_id == aa_result.id)

    # def test_db_delete_concert_aa_relationship(self):
    #     aa_result = db.session.query(Artist_Album_Association).filter(Artist.id==artist_result.id).filter(Album.id==album_result.id).first()
    #     concert_result = Concert.query.filter_by(name='concert_name').first()
    #     c_aa_result = db.session.query(Concert_AA_Association).filter(Concert.id==concert_result.id).filter(Artist_Album_Association.id==aa_result.id).first()

    #     artist_result = Artist.query.filter_by(name='artist_name').first()
    #     album_result = Album.query.filter_by(name='album_name').first()        

    #     assert (aa_result is not None)
    #     assert (concert_result is not None)
    #     assert (c_aa_result is not None)

    #     db.session.delete(aa_result)
    #     db.session.delete(concert_result)
    #     db.session.delete(c_aa_result)
    #     db.session.commit()
    #     assert (db.session.query(Artist_Album_Association).filter(Artist.id==artist_result.id).filter(Album.id==album_result.id).first() is None)
    #     assert (Concert.query.filter_by(name='concert_name').first() is None)
    #     assert (db.session.query(Concert_AA_Association).filter(Concert.id==concert_result.id).filter(Artist_Album_Association.id==aa_result.id).first() is None)



if __name__ == '__main__':
    unittest.main()
