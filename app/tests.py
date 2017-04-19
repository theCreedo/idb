# Insert quality, not quantity tests

# pylint: disable = bad-whitespace
# pylint: disable = invalid-name
# pylint: disable = missing-docstring
# pylint: disable = no-member
# pylint: disable = too-many-arguments
# pylint: disable = too-many-instance-attributes
# pylint: disable = too-few-public-methods
# pylint: disable = superfluous-parens
# pylint: disable = no-self-use
# pylint: disable = undefined-variable
# pylint: disable = too-many-public-methods

# import os
import unittest
import requests

# from google.appengine.ext import testbed

# from application import app

from models import Track, Artist, Album, Concert, db, app, Venue

url = 'http://boswemianrhapsody.me/'
class TestCase(unittest.TestCase):

    def setUp(self):
        # Flask apps testing. See: http://flask.pocoo.org/docs/testing/
        app.config['TESTING'] = True
        app.config['CSRF_ENABLED'] = False
        self.app = app.test_client()
        # Setups app engine test bed. See:
        # http://code.google.com/appengine/docs/python/tools/localunittesting.
        #                       html#Introducing_the_Python_Testing_Utilities
    #     self.testbed = testbed.Testbed()
    #     self.testbed.activate()
    #     self.testbed.init_datastore_v3_stub()
    #     self.testbed.init_user_stub()
    #     self.testbed.init_memcache_stub()

    # def tearDown(self):
    #     self.testbed.deactivate()


    def test_db_create_track(self):
        track = Track('track_name', 'genre_name',
                      'release_date', 1, 0, 'url', True, 'uri')
        db.session.add(track)
        db.session.commit()
        track_result = Track.query.filter(Track.name == 'track_name').first()
        assert (track_result is track)

        db.session.delete(track)
        db.session.commit()
        assert Track.query.filter_by(name='track_name').first() is None

    def test_db_artist(self):
        artist = Artist('artist_name', 'url', 'country', 'decade', 'genre')
        db.session.add(artist)
        db.session.commit()
        artist_result = Artist.query.filter_by(name='artist_name').first()
        assert (artist_result is artist)

        db.session.delete(artist)
        db.session.commit()
        assert Artist.query.filter_by(name='artist_name').first() is None

    def test_db_album(self):
        album = Album('album_name', 'genre', 'release',
                      'url', 'label', 1, 'uri')
        db.session.add(album)
        db.session.commit()
        album_result = Album.query.filter_by(name='album_name').first()
        assert (album_result is album)

        db.session.delete(album)
        db.session.commit()
        assert Album.query.filter_by(name='album_name').first() is None

    def test_db_concert(self):
        concert = Concert('name', 'link', 'date', 'time')
        db.session.add(concert)
        db.session.commit()
        concert_result = Concert.query.filter_by(name='name').first()
        assert (concert_result is concert)

        db.session.delete(concert)
        db.session.commit()
        assert Concert.query.filter_by(name='name').first() is None

    def test_db_venue(self):
        venue = Venue('name', 'city', 'region', 'country', 0.0, 0.0)
        db.session.add(venue)
        db.session.commit()
        venue_result = Venue.query.filter_by(name='name').first()
        assert (venue_result is venue)

        db.session.delete(venue)
        db.session.commit()
        assert Venue.query.filter_by(name='name').first() is None

    def test_db_track_artist_relationship(self):
        track = Track('track_name', 'genre_name',
                      'release_date', 1, 0, 'url', True, 'uri')
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

        db.session.delete(track_result)
        db.session.delete(artist_result)
        db.session.commit()
        assert Track.query.filter_by(name='track_name').first() is None
        assert Artist.query.filter_by(name='artist_name').first() is None

    def test_db_relationship(self):
        track = Track('track_name', 'genre_name',
                      'release_date', 1, 0, 'url', True, 'uri')
        album = Album('album_name', 'genre', 'release',
                      'url', 'label', 1, 'uri')
        album.tracks.append(track)

        db.session.add(track)
        db.session.add(album)
        db.session.commit()

        track_result = Track.query.filter_by(name='track_name').first()
        album_result = Album.query.filter_by(name='album_name').first()
        assert (track_result is track)
        assert (album_result is album)
        assert (album.tracks[0] is track_result)
        assert (track.album is album_result)

        db.session.delete(track_result)
        db.session.delete(album_result)
        db.session.commit()
        assert Track.query.filter_by(name='track_name').first() is None
        assert Album.query.filter_by(name='album_name').first() is None

    # def test_db_aa_relationship(self):
    #     artist = Artist('artist_name', 'url', 'country', 'decade', 'genre')
    #     album = Album('album_name', 'genre', 'release',
    #                   'url', 'label', 1, 'uri')
    #     aa = Artist_Album_Association()

    #     artist.albums.append(aa)
    #     album.artists.append(aa)

    #     db.session.add(artist)
    #     db.session.add(album)
    #     db.session.commit()

    #     artist_result = Artist.query.filter_by(name='artist_name').first()
    #     album_result = Album.query.filter_by(name='album_name').first()
    #     aa_result = db.session.query(Artist_Album_Association).filter(
    #         Artist_Album_Association.artist_id == artist_result.id).filter(
    #             Artist_Album_Association.album_id == album_result.id).first()

    #     assert (artist_result is artist)
    #     assert (album_result is album)
    #     assert (album_result.artists[0] is aa_result)
    #     assert (artist_result.albums[0] is aa_result)
    #     assert (aa_result.artist is artist_result)
    #     assert (aa_result.album is album_result)

    #     db.session.delete(aa_result)
    #     db.session.delete(artist_result)
    #     db.session.delete(album_result)
    #     db.session.commit()
    #     assert (Artist.query.filter_by(name='artist_name').first() is None)
    #     assert (Album.query.filter_by(name='album_name').first() is None)
    #     assert (db.session.query(Artist_Album_Association).filter(
    #         Artist.id == artist_result.id).filter(Album.id == album_result.id).
    #             first() is None)

    # def test_db_cc_a_relationship(self):
    #     artist = Artist('artist_name', 'url', 'country', 'decade', 'genre')
    #     album = Album('album_name', 'genre', 'release',
    #                   'url', 'label', 1, 'uri')
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
    #     aa_result = db.session.query(Artist_Album_Association).filter(
    #         Artist_Album_Association.artist_id == artist_result.id).filter(
    #             Artist_Album_Association.album_id == album_result.id).first()
    #     concert_result = Concert.query.filter_by(name='concert_name').first()
    #     c_aa_result = db.session.query(Concert_AA_Association).filter(
    #         Concert_AA_Association.aa_id == aa_result.id).filter(
    #             Concert_AA_Association.concert_id == concert_result.id).first()

    #     assert (artist_result is artist)
    #     assert (album_result is album)
    #     assert (concert_result is concert)
    #     assert (c_aa_result is c_aa)
    #     assert (aa_result is aa)
    #     assert (concert_result.artist_album_pairs[0] is c_aa_result)
    #     assert (aa_result.concerts[0] is c_aa_result)

    #     db.session.delete(c_aa_result)
    #     db.session.delete(aa_result)
    #     db.session.delete(concert_result)
    #     db.session.delete(artist_result)
    #     db.session.delete(album_result)
    #     db.session.commit()
    #     assert (db.session.query(Artist_Album_Association).filter(
    #         Artist_Album_Association.artist_id == artist_result.id).filter(
    #             Artist_Album_Association.album_id == album_result.id).first()
    #             is None)
    #     assert (Concert.query.filter_by(name='concert_name').first() is None)
    #     assert (db.session.query(Concert_AA_Association).filter(
    #         Concert_AA_Association.aa_id == aa_result.id).filter(
    #             Concert_AA_Association.concert_id == concert_result.id).first()
    #             is None)
    #     assert (Artist.query.filter_by(name='artist_name').first() is None)
    #     assert (Album.query.filter_by(name='album_name').first() is None)

    def test_home_redirects(self):
        response = requests.get(url)
        self.assertEqual(response.status_code, 200)

    #Tests to see if boswemianrhapsody.me and boswemianrhapsody.me/home.html
    #are the same page
    def test_home_default(self):
        rv = requests.get(url)
        rv1 = requests.get(url + 'home.html')
        self.assertEqual(rv.content, rv1.content)

    #Tests to see if routing to about page works
    def test_about_redirect(self):
        response = requests.get(url + 'about')
        self.assertEqual(response.status_code, 200)


    #Tests to see if all the tables are accessible
    def test_table_redirect(self):
        response = requests.get(url + 'tracksTable')
        self.assertEqual(response.status_code, 200)


        response = requests.get(url + 'artistTable')
        self.assertEqual(response.status_code, 200)


        response = requests.get(url + 'albumsTable')
        self.assertEqual(response.status_code, 200)


        response = requests.get(url + 'concertsTable')
        self.assertEqual(response.status_code, 200)


    #Tests 404 page.
    def test_404(self):
        response = requests.get(url + 'nothing')
        self.assertEqual(response.status_code, 404)

    def test_api_redirect(self):
        response = requests.get(url + 'api')
        self.assertEqual(response.status_code, 200)

    def test_get_artist_data(self):
        response = requests.get(url + 'api/artists')
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.json()["num_results"] > 0)

    def test_get_tracks_data(self):
        response = requests.get(url + 'api/tracks')
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.json()["num_results"] > 0)

    def test_get_albums_data(self):
        response = requests.get(url + 'api/albums')
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.json()["num_results"] > 0)

    def test_get_concerts_data(self):
        response = requests.get(url + 'api/concerts')
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.json()["num_results"] > 0)

    def test_get_venues_data(self):
        response = requests.get(url + 'api/venues')
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.json()["num_results"] > 0)

    def test_sorting(self):
        attributes = ['artists', 'venues', 'albums', 'concerts', 'tracks']
        for i in attributes:
            response = requests.get(url + 'api/sort/'+ i +'/1/name/asc')
            self.assertEqual(response.status_code, 200)
            self.assertTrue(response.json()["num_results"] > 0)

    def test_filtering(self):
        attributes = ['artists', 'venues', 'albums', 'concerts', 'tracks']
        for i in attributes:
            response = requests.get(url + 'api/filter/' + i + '/1/name/eq/Smash Mouth')
            self.assertEqual(response.status_code, 200)
            self.assertTrue(response.json()["num_results"] >= 0)



        

if __name__ == '__main__':
    unittest.main()
