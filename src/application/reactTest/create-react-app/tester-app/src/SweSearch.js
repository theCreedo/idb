import React from 'react';
import ReactDOM from 'react-dom';
import Pagination from 'rc-pagination';
import {Modal} from 'react-bootstrap';
import {Button} from 'react-bootstrap/lib';
import Masonry from 'react-masonry-component';
import 'rc-pagination/assets/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './resources/css/sweStyle.css';
import './resources/css/pagePO.css'; 

const trackAttrs = ["name", "genre", "release_date", "preview_url", "spotify_uri"];
const concertAttrs = ["name", "event_link", "date", "time"];
const albumAttrs = ["name", "genre", "release_date", "album_cover_url", "label", "spotify_uri"];
const artistAttrs = ["name", "genre", "image_url", "country", "decade"];

const style = {
	showMe: {
		backgroundColor: 'green'
	},
	header: {
		fontSize: '4em',
		textAlign: 'center'
	},
	search: {
		width: '100%',
		textAlign: 'center',
		backgroundColor: 'lightblue'
	},
	results: {
		textAlign: 'center',
		backgroundColor: 'lightgreen',
		height: '100%'
	},
	pagination: {
		textAlign: 'center',
		backgroundColor: 'sandybrown'
	},
	searchHit: {

	},
	searchHighlight: {
		backgroundColor: 'lightyellow'
	},
	resultCard: {
		height: '100px'
	},
	resultH3: {

	}
};

export default class SWESearch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchString: '',
			pageSize: 9,
			currentPage: 1,
			modalData: '',
			masonryToggle: false,
			data: ''
		};

		this.updateSearchString = this.updateSearchString.bind(this);
		this.makeSearch = this.makeSearch.bind(this);
		this.updateGridData = this.updateGridData.bind(this);
		this.closeModal = this.closeModal.bind(this);
	}

				// data: JSON.parse('{"num_results": 44, "results": [{"type": "track", "data": {"id": 2051, "name": "Cold Toes On The Cold Floor", "genre": "Alternative/Indie", "release_date": "2011", "duration": 246533, "popularity": 30, "preview_url": "https://p.scdn.co/mp3-preview/043aabedd83d617073d49f5854c5f8e87a58d9ea?cid=null", "explicit": false, "spotify_uri": "spotify:track:53pxfMtiDcbkMxVqK4XHes", "artist_id": 78, "album_id": 141}}, {"type": "artist", "data": {"id": 78, "name": "Cold War Kids", "image_url": "https://i.scdn.co/image/84c1bdd4f601303b7babad834f743f16b483dcd2", "country": "United States", "decade": "2000s / 2010s", "genre": "Alternative/Indie"}}, {"type": "album", "data": {"id": 279, "name": "The Earth Is Not a Cold Dead Place", "genre": "Alternative/Indie", "release_date": "2003-11-04", "album_cover_url": "https://i.scdn.co/image/ab07c9072bbe413d8187125010d0b3f6025803fa", "label": "Temporary Residence Ltd.", "number_of_tracks": 5, "spotify_uri": "spotify:album:1JU4XTyTzADBQE1KpM0Wtx", "artist_id": 141}}, {"type": "concert", "data": {"id": 921, "name": "Cold War Kids", "event_link": "http://www.bandsintown.com/event/14084240?app_id=boswemianrhapsody&artist=Cold+War+Kids&came_from=67", "date": "2017-06-03", "time": "12:00:00"}}, {"type": "track", "data": {"id": 576, "name": "Cold Shoulder", "genre": "Pop", "release_date": "2008-01-28", "duration": 191866, "popularity": 5, "preview_url": null, "explicit": false, "spotify_uri": "spotify:track:1VFNCshuHOrW6HXsZKAoHP", "artist_id": 37, "album_id": 39}}, {"type": "concert", "data": {"id": 922, "name": "Cold War Kids", "event_link": "http://www.bandsintown.com/event/14098003?app_id=boswemianrhapsody&artist=Cold+War+Kids&came_from=67", "date": "2017-06-08", "time": "18:00:00"}}, {"type": "track", "data": {"id": 1659, "name": "The Cold Part", "genre": "Alternative/Indie", "release_date": "2000", "duration": 300773, "popularity": 39, "preview_url": "https://p.scdn.co/mp3-preview/6ca038e29025396dc2a924c92b5086a2947bbbcc?cid=null", "explicit": false, "spotify_uri": "spotify:track:7IE6yI0EyTgLC7TkLp9uv5", "artist_id": 72, "album_id": 111}}, {"type": "concert", "data": {"id": 923, "name": "Cold War Kids", "event_link": "http://www.bandsintown.com/event/13661811?app_id=boswemianrhapsody&artist=Cold+War+Kids&came_from=67", "date": "2017-06-09", "time": "19:00:00"}}, {"type": "track", "data": {"id": 1160, "name": "Cold Arms", "genre": "Alternative/Indie", "release_date": "2015-05-04", "duration": 169906, "popularity": 52, "preview_url": "https://p.scdn.co/mp3-preview/55586a5ae1d397d38145de4cdc25871d66430127?cid=null", "explicit": false, "spotify_uri": "spotify:track:1jmHb63g94JWrQC2lN3LKK", "artist_id": 59, "album_id": 77}}, {"type": "concert", "data": {"id": 924, "name": "Cold War Kids", "event_link": "http://www.bandsintown.com/event/14348748?app_id=boswemianrhapsody&artist=Cold+War+Kids&came_from=67", "date": "2017-06-10", "time": "12:00:00"}}, {"type": "track", "data": {"id": 3340, "name": "Straight Outta Cold Beer", "genre": "Country", "release_date": "2016-05-20", "duration": 165466, "popularity": 55, "preview_url": "https://p.scdn.co/mp3-preview/9518aec2e2b586014c6064a9873e366cec6239bd?cid=null", "explicit": false, "spotify_uri": "spotify:track:0elJ9OdhVl2yp4WJrtg5mm", "artist_id": 110, "album_id": 226}}, {"type": "concert", "data": {"id": 925, "name": "Cold War Kids", "event_link": "http://www.bandsintown.com/event/14348253?app_id=boswemianrhapsody&artist=Cold+War+Kids&came_from=67", "date": "2017-07-05", "time": "19:00:00"}}, {"type": "concert", "data": {"id": 926, "name": "Cold War Kids", "event_link": "http://www.bandsintown.com/event/14348254?app_id=boswemianrhapsody&artist=Cold+War+Kids&came_from=67", "date": "2017-07-06", "time": "19:00:00"}}, {"type": "concert", "data": {"id": 927, "name": "Cold War Kids", "event_link": "http://www.bandsintown.com/event/14348255?app_id=boswemianrhapsody&artist=Cold+War+Kids&came_from=67", "date": "2017-07-07", "time": "19:00:00"}}, {"type": "concert", "data": {"id": 928, "name": "Cold War Kids", "event_link": "http://www.bandsintown.com/event/14383433?app_id=boswemianrhapsody&artist=Cold+War+Kids&came_from=67", "date": "2017-07-14", "time": "20:00:00"}}, {"type": "concert", "data": {"id": 929, "name": "Cold War Kids", "event_link": "http://www.bandsintown.com/event/13960823?app_id=boswemianrhapsody&artist=Cold+War+Kids&came_from=67", "date": "2017-08-02", "time": "19:00:00"}}, {"type": "concert", "data": {"id": 930, "name": "Cold War Kids", "event_link": "http://www.bandsintown.com/event/14292312?app_id=boswemianrhapsody&artist=Cold+War+Kids&came_from=67", "date": "2017-08-03", "time": "19:00:00"}}, {"type": "concert", "data": {"id": 931, "name": "Cold War Kids", "event_link": "http://www.bandsintown.com/event/13960810?app_id=boswemianrhapsody&artist=Cold+War+Kids&came_from=67", "date": "2017-08-05", "time": "19:00:00"}}, {"type": "concert", "data": {"id": 932, "name": "Cold War Kids", "event_link": "http://www.bandsintown.com/event/14292330?app_id=boswemianrhapsody&artist=Cold+War+Kids&came_from=67", "date": "2017-08-08", "time": "19:00:00"}}, {"type": "concert", "data": {"id": 933, "name": "Cold War Kids", "event_link": "http://www.bandsintown.com/event/13960795?app_id=boswemianrhapsody&artist=Cold+War+Kids&came_from=67", "date": "2017-08-11", "time": "19:00:00"}}, {"type": "concert", "data": {"id": 934, "name": "Cold War Kids", "event_link": "http://www.bandsintown.com/event/13960796?app_id=boswemianrhapsody&artist=Cold+War+Kids&came_from=67", "date": "2017-08-12", "time": "19:00:00"}}, {"type": "concert", "data": {"id": 935, "name": "Cold War Kids", "event_link": "http://www.bandsintown.com/event/13960805?app_id=boswemianrhapsody&artist=Cold+War+Kids&came_from=67", "date": "2017-08-15", "time": "19:00:00"}}, {"type": "concert", "data": {"id": 936, "name": "Cold War Kids", "event_link": "http://www.bandsintown.com/event/13960806?app_id=boswemianrhapsody&artist=Cold+War+Kids&came_from=67", "date": "2017-08-17", "time": "19:00:00"}}, {"type": "concert", "data": {"id": 937, "name": "Cold War Kids", "event_link": "http://www.bandsintown.com/event/13960797?app_id=boswemianrhapsody&artist=Cold+War+Kids&came_from=67", "date": "2017-08-18", "time": "19:00:00"}}, {"type": "concert", "data": {"id": 938, "name": "Cold War Kids", "event_link": "http://www.bandsintown.com/event/13960798?app_id=boswemianrhapsody&artist=Cold+War+Kids&came_from=67", "date": "2017-08-19", "time": "19:00:00"}}, {"type": "concert", "data": {"id": 939, "name": "Cold War Kids", "event_link": "http://www.bandsintown.com/event/13960799?app_id=boswemianrhapsody&artist=Cold+War+Kids&came_from=67", "date": "2017-08-20", "time": "19:00:00"}}, {"type": "concert", "data": {"id": 940, "name": "Cold War Kids", "event_link": "http://www.bandsintown.com/event/13960800?app_id=boswemianrhapsody&artist=Cold+War+Kids&came_from=67", "date": "2017-08-24", "time": "19:00:00"}}, {"type": "concert", "data": {"id": 941, "name": "Cold War Kids", "event_link": "http://www.bandsintown.com/event/13960801?app_id=boswemianrhapsody&artist=Cold+War+Kids&came_from=67", "date": "2017-08-25", "time": "19:00:00"}}, {"type": "concert", "data": {"id": 942, "name": "Cold War Kids", "event_link": "http://www.bandsintown.com/event/14292337?app_id=boswemianrhapsody&artist=Cold+War+Kids&came_from=67", "date": "2017-09-07", "time": "19:00:00"}}, {"type": "concert", "data": {"id": 943, "name": "Cold War Kids", "event_link": "http://www.bandsintown.com/event/14292343?app_id=boswemianrhapsody&artist=Cold+War+Kids&came_from=67", "date": "2017-09-08", "time": "19:00:00"}}, {"type": "concert", "data": {"id": 944, "name": "Cold War Kids", "event_link": "http://www.bandsintown.com/event/14292375?app_id=boswemianrhapsody&artist=Cold+War+Kids&came_from=67", "date": "2017-09-09", "time": "19:00:00"}}, {"type": "concert", "data": {"id": 945, "name": "Cold War Kids", "event_link": "http://www.bandsintown.com/event/14292362?app_id=boswemianrhapsody&artist=Cold+War+Kids&came_from=67", "date": "2017-09-10", "time": "19:00:00"}}, {"type": "concert", "data": {"id": 946, "name": "Cold War Kids", "event_link": "http://www.bandsintown.com/event/13960824?app_id=boswemianrhapsody&artist=Cold+War+Kids&came_from=67", "date": "2017-09-13", "time": "19:00:00"}}, {"type": "concert", "data": {"id": 947, "name": "Cold War Kids", "event_link": "http://www.bandsintown.com/event/13960826?app_id=boswemianrhapsody&artist=Cold+War+Kids&came_from=67", "date": "2017-09-14", "time": "19:00:00"}}, {"type": "concert", "data": {"id": 948, "name": "Cold War Kids", "event_link": "http://www.bandsintown.com/event/13960828?app_id=boswemianrhapsody&artist=Cold+War+Kids&came_from=67", "date": "2017-09-15", "time": "19:00:00"}}, {"type": "concert", "data": {"id": 949, "name": "Cold War Kids", "event_link": "http://www.bandsintown.com/event/13960829?app_id=boswemianrhapsody&artist=Cold+War+Kids&came_from=67", "date": "2017-09-16", "time": "19:00:00"}}, {"type": "concert", "data": {"id": 950, "name": "Cold War Kids", "event_link": "http://www.bandsintown.com/event/13960831?app_id=boswemianrhapsody&artist=Cold+War+Kids&came_from=67", "date": "2017-09-19", "time": "19:00:00"}}, {"type": "concert", "data": {"id": 951, "name": "Cold War Kids", "event_link": "http://www.bandsintown.com/event/14292389?app_id=boswemianrhapsody&artist=Cold+War+Kids&came_from=67", "date": "2017-09-21", "time": "19:00:00"}}, {"type": "concert", "data": {"id": 952, "name": "Cold War Kids", "event_link": "http://www.bandsintown.com/event/14292422?app_id=boswemianrhapsody&artist=Cold+War+Kids&came_from=67", "date": "2017-09-22", "time": "19:00:00"}}, {"type": "concert", "data": {"id": 953, "name": "Cold War Kids", "event_link": "http://www.bandsintown.com/event/14292428?app_id=boswemianrhapsody&artist=Cold+War+Kids&came_from=67", "date": "2017-09-23", "time": "19:00:00"}}, {"type": "concert", "data": {"id": 954, "name": "Cold War Kids", "event_link": "http://www.bandsintown.com/event/13960811?app_id=boswemianrhapsody&artist=Cold+War+Kids&came_from=67", "date": "2017-09-26", "time": "19:00:00"}}, {"type": "concert", "data": {"id": 955, "name": "Cold War Kids", "event_link": "http://www.bandsintown.com/event/13960812?app_id=boswemianrhapsody&artist=Cold+War+Kids&came_from=67", "date": "2017-09-28", "time": "19:00:00"}}, {"type": "concert", "data": {"id": 956, "name": "Cold War Kids", "event_link": "http://www.bandsintown.com/event/14234070?app_id=boswemianrhapsody&artist=Cold+War+Kids&came_from=67", "date": "2017-09-29", "time": "19:00:00"}}, {"type": "concert", "data": {"id": 957, "name": "Cold War Kids", "event_link": "http://www.bandsintown.com/event/14292432?app_id=boswemianrhapsody&artist=Cold+War+Kids&came_from=67", "date": "2017-09-30", "time": "19:00:00"}}]}')


	updateGridData(current, pageSize) {
  	var cur = current;
		if(cur == undefined)
		   cur = 1;
		this.setState({currentPage: cur});
		// this.pageChange(cur);
  }

  pageChange(page) {

  }

	updateSearchString(event) {
		// console.log("Search string: " + event.target.value);
		// this.setState({searchString: event.target.value});
	}

	makeSearch(event) {
		// alert("SEARCH for tasty " + this.state.searchString);
		var searchString = event.currentTarget.parentNode.parentNode.children[1].value;
		this.setState({searchString: searchString});
		this.setState({data: JSON.parse(this.makeAPIcall("/api/search/" + searchString))}, function () {
			this.updateGridData(1);
		});
		// this.setState({data: JSON.parse(this.makeAPIcall("/api/search/" + this.state.searchString))});
	}

	makeSearchCall(searchString) {
		this.setState({data: JSON.parse(this.makeAPIcall("/api/search/" + searchString))});
	}

	getHits(target, targetLength, raw, attr) {
		var result = -1;
		var index;
		var match;

		// console.log("Raw: " + raw);
		if (raw != null && ((raw.toLowerCase().indexOf(target)) != -1)) {
			index = raw.toLowerCase().indexOf(target);
			match = raw.substring(index, index + targetLength);
			console.log("Target: " + target + "Raw: " + raw);
			console.log("Index: " + index + " Raw Call " + raw.toLowerCase().indexOf(target) + " Match: " + match);
			result = (<div key={match+attr+raw.length} className="col-xs-6">{attr}: contains <span className="sweSearchHighlight">{match}</span><br/></div>);
		}

		return result;
	}

	makeArtistCard(data) {
		var searchString = (this.state.searchString).toLowerCase();
		var searchLength = searchString.length;
		var hits = [];

		var temp;
		/* Going through all attributes */
		for (var x in artistAttrs) {
			/* Returns HTML if hit, -1 if no */
			temp = this.getHits(searchString, searchLength, data[artistAttrs[x]], artistAttrs[x]);
			if (temp != -1)
				hits.push(temp);
		}

		return (
				<div key={data.name+data.id} className="col-xs-4 sweSearchResultCard">
					<h3>Artist</h3>
					<h3><a onClick={() => {this.openArtistModal(data.id)}}>{data.name}</a></h3>
					<div className="row">{hits}</div>
				</div>
			);
	}

	makeAlbumCard(data) {
		var searchString = (this.state.searchString).toLowerCase();
		var searchLength = searchString.length;
		var hits = [];

		var temp;
		/* Going through all attributes */
		for (var x in albumAttrs) {
			/* Returns HTML if hit, -1 if no */
			temp = this.getHits(searchString, searchLength, data[albumAttrs[x]], albumAttrs[x]);
			if (temp != -1)
				hits.push(temp);
		}

		return (
				<div key={data.name+data.id} className="col-xs-4 sweSearchResultCard">
					<h3>Album</h3>
					<h3><a onClick={() => {this.openAlbumModal(data.id)}}>{data.name}</a></h3>
					<div className="row">{hits}</div>
				</div>
			);
	}

	makeTrackCard(data) {
		var searchString = (this.state.searchString).toLowerCase();
		var searchLength = searchString.length;
		var hits = [];

		var temp;
		/* Going through all attributes */
		for (var x in trackAttrs) {
			/* Returns HTML if hit, -1 if no */
			temp = this.getHits(searchString, searchLength, data[trackAttrs[x]], trackAttrs[x]);
			if (temp != -1)
				hits.push(temp);
		}

		return (
				<div key={data.name+data.id} className="col-xs-4 sweSearchResultCard">
					<h3>Track</h3>
					<h3><a onClick={() => {this.openTrackModal(data.id)}}>{data.name}</a></h3>
					<div className="row">{hits}</div>
				</div>
			);
	}

	makeConcertCard(data) {
		var searchString = (this.state.searchString).toLowerCase();
		var searchLength = searchString.length;
		var hits = [];

		var temp;
		/* Going through all attributes */
		for (var x in concertAttrs) {
			/* Returns HTML if hit, -1 if no */
			temp = this.getHits(searchString, searchLength, data[concertAttrs[x]], concertAttrs[x]);
			if (temp != -1)
				hits.push(temp);
		}

		return (
				<div key={data.name+data.id} className="col-xs-4 sweSearchResultCard">
					<h3>Concert</h3>
					<h3><a onClick={() => {this.openConcertModal(data.id)}}>{data.name}</a></h3>
					<div className="row">{hits}</div>
				</div>
			);
	}

	openTrackModal(id) {
//      alert('opening track modal ' + id);
      var data = JSON.parse(this.makeAPIcall("/api/tracks/" + id));
      this.setState({modalData: 'tracks'});
      this.setState({modalHTML: this.trackModal(data)});
      this.setState({showModal: true});
   }
    
  openArtistModal(id) {
//      alert('opening artist modal ' + id);
      var data = JSON.parse(this.makeAPIcall("/api/artists/" + id));
//      this.setState({modalData: data});
      this.setState({modalData: 'artistis'});
      this.setState({modalHTML: this.artistModal(data)});
      this.setState({showModal: true});
  }
    
   openAlbumModal(id) {
//      alert('opening album modal ' + id);
      var data = JSON.parse(this.makeAPIcall("/api/albums/" + id));
      this.setState({modalData: 'albums'});
      this.setState({modalHTML: this.albumModal(data)});
      this.setState({showModal: true});
   }
    
  openConcertModal(id) {
//      alert('opening concert modal ' + id);
      var data = JSON.parse(this.makeAPIcall("/api/concerts/" + id));
      this.setState({modalData: 'concerts'});
      this.setState({modalHTML: this.concertModal(data)});
      this.setState({showModal: true});
      
   }

	closeModal() {
       this.setState({showModal: false, masonryToggle: false});
   }

	makeAPIcall( call ) {
        var xmlHTTP = new XMLHttpRequest();

        xmlHTTP.open('GET',call,false);

        var data;
        xmlHTTP.onload = function(e)
        {
//            console.log("Getting on load: " + this.response);
            data = this.response;
        }

        // Send request
        xmlHTTP.send();
        
        // console.log(data);

        return data;
    }

	masonryClick(e) {
        var foo = e.currentTarget;

        if(foo.getAttribute("data-open") == 0) {
//            alert("Elem was closed");
            foo.children[0].className = 'MartistCellImgContainer expand-coverArt';
            foo.children[1].className = 'MartistCellInfoContainer expand-description';
            foo.setAttribute('data-open', "1");
        }
        else {
//            alert("Elem was open");
            foo.children[0].className = 'MartistCellImgContainer';
            foo.children[1].className = 'MartistCellInfoContainer';
            foo.setAttribute('data-open', "0");
        }
    }

    makeAlbumMasonry(imgUrl, albumTitle, albumId, state) {
        return (
            <div key={albumTitle+albumId} className='grid-item'>
                <div data-open={"0"} onClick={(e) => this.masonryClick(e)} className='grid-item-content'>
                    <div className={this.state.masonryToggle ? 'MartistCellImgContainer expand-coverArt' : 'MartistCellImgContainer'}><img src={imgUrl}/></div>
                    <div className={this.state.masonryToggle ? 'MartistCellInfoContainer expand-description' : 'MartistCellInfoContainer'}>
                        <h3 className='artistInfo-title'>{albumTitle}</h3>
                        <br></br>
                        <button onClick={() => this.openAlbumModal(albumId)} className='btn btn-default'>Go to Album</button>
                    </div>
                </div>
            </div>
        );
    }
    
    makeArtistMasonry(imgUrl, artistName, artistId, state) {
        
        return (
            <div key={artistName+artistId} className='grid-item'>
                <div data-open={"0"} onClick={(e) => this.masonryClick(e)} className={this.state.masonryToggle ? 'grid-item-content expand-coverArt' : 'grid-item-content'}>
                    <div className={this.state.masonryToggle ? "MartistCellImgContainer expand-coverArt" : "MartistCellImgContainer"}><img src={imgUrl}/></div>
                    <div className={this.state.masonryToggle ? "MartistCellInfoContainer expand-description" : "MartistCellInfoContainer"}>
                        <h3 className='artistInfo-title'>{artistName}</h3>
                        <br></br>
                        <button onClick={() => this.openArtistModal(artistId)} className='btn btn-default'>Artist</button>
                    </div>
                </div>
            </div>
        );
    }
    
    albumModal(data) {
        var backgroundStyle, artistMasonry;
        var art = data.artist;
        
        
        artistMasonry = this.makeArtistMasonry(art.image_url, art.name, art.id, this.state.masonryToggle);
        
        backgroundStyle = {
            background: 'url(' + data.album_cover_url + ') no-repeat center center'
        };
        
        return (
            <Modal.Body>
                <div className="content-section-a">
                    <div className="container popupInfoHeader">
                        <div className="row">
                            <div className="col-xs-12">
                                <h1 className="popupInfoTitle">{data.name}</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content-section-b">
                    <div id ="albumCoverArtTgt" className="albumInfoCoverImg" style={backgroundStyle}></div>
                </div>
                <div className="content-section-a">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-xs-12 col-md-4">
                                <hr className="popupHeaderSpacer"></hr>
                                <div className="clearfix"></div>
                                <h2 className="popupDetailHeader">Artists</h2>
                                <Masonry className={"grid container-fluid"} elementType={'div'}>{artistMasonry}</Masonry>
                            </div>
                            <div className="col-xs-12 col-md-4">
                                <hr className="popupHeaderSpacer"></hr>
                                <div className="clearfix"></div>
                                <h2 className="popupDetailHeader">Genre</h2>
                                <h3 id ="albumGenreTgt" className="popupDetailContent">{data.genre}</h3>
                            </div>
                            <div className="col-xs-12 col-md-4">
                                <hr className="popupHeaderSpacer"></hr>
                                <div className="clearfix"></div>
                                <h2 className="popupDetailHeader">Label</h2>
                                <h3 id="albumLabelTgt" className="popupDetailContent">{data.label}</h3>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12 col-md-4">
                                <hr className="popupHeaderSpacer"></hr>
                                <div className="clearfix"></div>
                                <h2 className="popupDetailHeader">Date</h2>
                                <h3 id="albumDateTgt" className="popupDetailContent">{data.release_date}</h3>
                            </div>
                            <div className="col-xs-12 col-md-8">
                                <hr className="popupHeaderSpacer"></hr>
                                <div className="clearfix"></div>
                                <h2 className="popupDetailHeader">Songs</h2>
                                <h3 id="albumSongTgt" className="popupDetailContent">{data.number_of_tracks}</h3>
                                <div className="spotifyContainer">
                                    <iframe id ="albumSpotifyEmbed" className="popupSpotifyPlaylist" src={"https://embed.spotify.com/?uri=" + data.spotify_uri} frameBorder={"0"} allowTransparency={"true"}></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        );
    }
    
    concertModal(data) {
        var backgroundStyle, artistMasonry;
      var art = data.artist;
        
        artistMasonry = this.makeArtistMasonry(art.image_url, data.name, art.id, this.state.masonryToggle);
        
        backgroundStyle = {
            background: 'url(' + data.album.album_cover_url + ') no-repeat center center'
        };
        
        return (
            <Modal.Body>
                <div className="content-section-a">
                    <div className="container popupInfoHeader">
                        <div className="row">
                            <div className="col-xs-12">
                                <h1 className="popupInfoTitle">{data.name}</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content-section-b">
                    <div id ="albumCoverArtTgt" className="albumInfoCoverImg" style={backgroundStyle}></div>
                </div>
                <div className="content-section-a">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-xs-12 col-md-4">
                                <hr className="popupHeaderSpacer"></hr>
                                <div className="clearfix"></div>
                                <h2 className="popupDetailHeader">Venue</h2>
                                <h3 id="concertVenueTgt" className="popupDetailContent">{data.venue.name}</h3>
                            </div>
                            <div className="col-xs-12 col-md-4">
                                <hr className="popupHeaderSpacer"></hr>
                                <div className="clearfix"></div>
                                <h2 className="popupDetailHeader">Date</h2>
                                <h3 id="concertDateTgt" className="popupDetailContent">{data.date}</h3>
                            </div>
                            <div className="col-xs-12 col-md-4">
                                <hr className="popupHeaderSpacer"></hr>
                                <div className="clearfix"></div>
                                <h2 className="popupDetailHeader">Time</h2>
                                <h3 id="concertTimeTgt" className="popupDetailContent">{data.time}</h3>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12 col-md-4">
                                <hr className="popupHeaderSpacer"></hr>
                                <div className="clearfix"></div>
                                <h2 className="popupDetailHeader">Link</h2>
                                <h3 className="popupDetailContent"><a target={"_blank"} href={data.event_link}>More Info</a></h3>
                            </div>
                            <div className="col-xs-12 col-md-8">
                                <hr className="popupHeaderSpacer"></hr>
                                <div className="clearfix"></div>
                                <h2 className="popupDetailHeader">Lineup</h2>
                                <Masonry className={"grid container-fluid"} elementType={'div'}>{artistMasonry}</Masonry>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        );
    }
    
    trackModal(data) {
        
        var explicitStyle, backgroundStyle, masonryAlbums, masonryArtists; 
        
        /* Set explicit tag */
        if (data.explicit == false) {
            explicitStyle = {
                display: 'none'
            };
        }
        else {
            explicitStyle = {
                display: 'block'
            }
        }
        
        /* Set image for header */
        backgroundStyle = {
            background: 'url(' + data.album.album_cover_url + ') no-repeat center center'
        };
        
        masonryAlbums = this.makeAlbumMasonry(data.album.album_cover_url, data.album.name, data.album.id, this.state.masonryToggle);
        masonryArtists = this.makeArtistMasonry(data.artist.image_url, data.artist.name, data.artist.id, this.state.masonryToggle);
        
        return (
            <Modal.Body>
                <div className="content-section-a">
                    <div className="container popupInfoHeader">
                        <div className="row">
                            <div className="col-xs-12">
                                <h1 id="trackTitleTgt" className="popupInfoTitle">{data.name}<span style={explicitStyle} className="label label-danger popupExplicitMarker">Explicit</span></h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content-section-b">
                    <div id="trackArtistImgTgt" className="albumInfoCoverImg" style={backgroundStyle}></div>
                </div>
                <div className="content-section-a">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-xs-12 col-md-6">
                                <hr className="popupHeaderSpacer"></hr>
                                <div className="clearfix"></div>
                                <h2 className="popupDetailHeader">Genre</h2>
                                <h3 id="trackGenreTgt" className="popupDetailContent">{data.genre}</h3>
                            </div>
                            <div className="col-xs-12 col-md-6">
                                <hr className="popupHeaderSpacer"></hr>
                                <div className="clearfix"></div>
                                <h2 className="popupDetailHeader">Date Released</h2>
                                <h3 id="trackDateTgt" className="popupDetailContent">{data.release_date}</h3>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12 col-md-6">
                                <hr className="popupHeaderSpacer"></hr>
                                <div className="clearfix"></div>
                                <h2 className="popupDetailHeader">Duration</h2>
                                <h3 id="trackDurationTgt" className="popupDetailContent">{data.duration/1000} seconds</h3>
                            </div>
                            <div className="col-xs-12 col-md-6">
                                <hr className="popupHeaderSpacer"></hr>
                                <div className="clearfix"></div>
                                <h2 className="popupDetailHeader">Popularity</h2>
                                <h3 id="trackPopularityTgt" className="popupDetailContent">{data.popularity}</h3>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-6">
                                <hr className="popupHeaderSpacer"></hr>
                                <div className="clearfix"></div>
                                <h2 className="popupDetailHeader">Artists</h2>
                                <Masonry className={"grid container-fluid"} elementType={'div'}>{masonryArtists}</Masonry>
                            </div>
                            <div className="col-xs-6">
                                <hr className="popupHeaderSpacer"></hr>
                                <div className="clearfix"></div>
                                <h2 className="popupDetailHeader">Albums</h2>
                                <Masonry className={"grid container-fluid"} elementType={'div'}>{masonryAlbums}</Masonry>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12 col-md-12">
                                <hr className="popupHeaderSpacer"></hr>
                                <div className="clearfix"></div>
                                <h2 className="popupDetailHeader">Song</h2>
                                <div className="spotifyContainer">
                                    <iframe id="trackSpotifyEmbed" className="popupSpotifyEmbed" src={"https://embed.spotify.com/?uri=" + data.spotify_uri} frameBorder={"0"} allowTransparency={"true"}></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        );
    }

    artistModal(data) {
        var pop_track, albums, albumMasonry;
        var backgroundStyle;
        
        pop_track = data.tracks[data.tracks.length-1];
        albums = data.albums;
        albumMasonry = [];
        
        /* Set image for header */
        backgroundStyle = {
            background: 'url(' + data.image_url + ') no-repeat center center'
        };

        
        for (var x in albums) {
            var alb = albums[x];
            albumMasonry.push(this.makeAlbumMasonry(alb.album_cover_url, alb.name, alb.id,this.state.masonryToggle));
        }
        return (
            <Modal.Body>
            <div className="content-section-a">
                <div className="container popupInfoHeader">
                    <div className="row">
                        <div className="col-xs-12">
                            <h1 className="popupInfoTitle">{data.name}</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className="content-section-b">
                <div className="artistInfoCoverImg" style={backgroundStyle}></div>
            </div>
            <div className="content-section-a">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xs-12 col-md-6">
                            <hr className="popupHeaderSpacer"></hr>
                            <div className="clearfix"></div>
                            <h2 className="popupDetailHeader">Country</h2>
                            <h3 className="popupDetailContent">{data.country}</h3>
                        </div>
                        <div className="col-xs-12 col-md-6">
                            <hr className="popupHeaderSpacer"></hr>
                            <div className="clearfix"></div>
                            <h2 className="popupDetailHeader">Decade</h2>
                            <h3 className="popupDetailContent">{data.decade}</h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12 col-md-6">
                            <hr className="popupHeaderSpacer"></hr>
                            <div className="clearfix"></div>
                            <h2 className="popupDetailHeader">Genres</h2>
                            <h3 className="popupDetailContent">{data.genre}</h3>
                        </div>
                        <div className="col-xs-12 col-md-6">
                            <hr className="popupHeaderSpacer"></hr>
                            <div className="clearfix"></div>
                            <h2 className="popupDetailHeader">Most Popular</h2>
                            <div className="spotifyContainer">
                                <iframe className="popupSpotifyEmbed" src={"https://embed.spotify.com/?uri=" + pop_track.spotify_uri} frameBorder={"0"} allowTransparency={"true"}></iframe>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12">
                            <hr className="popupHeaderSpacer"></hr>
                            <div className="clearfix"></div>
                            <h2 className="popupDetailHeader">Albums</h2>
                            <Masonry className={"grid container-fluid"} elementType={'div'}>{albumMasonry}</Masonry>
                        </div>
                    </div>
                </div>
            </div>
            </Modal.Body>
        );
    }

	render() {

		var data = this.state.data;
		var array = data.results;
		var arrayStep = this.state.currentPage * 9;
		var loopStart;
		var numberOfPages = Math.ceil((parseInt(data.num_results)/9));

		if (data != ''){
			/* Handle case where step is larger than number of objects, use number of objects */
			if (arrayStep > data.num_results) {
				arrayStep = data.num_results;
			}

			/* If the array step ends up less than 9 */
			if ((arrayStep - 9) < 0)
				loopStart = 0;
			else
				loopStart = arrayStep - 9;

	// Math.ceil(data.num_results/9)
			console.log(data);
			console.log("Should be " + (data.num_results/9) + " pages. Serving indicies starting at " + (arrayStep-9) + " to arrayStep " + arrayStep);
			var cardItems = [];
			var cardItems2 = [];
			var cardItems3 = [];

			var temp;
			var count = 0;
			for (var x = loopStart; x < arrayStep; x++) {
				var card;

				temp = array[x];
				if ( temp.type == "artist") {
					card = this.makeArtistCard(temp.data);
				}
				else if (temp.type == "album") {
					card = this.makeAlbumCard(temp.data);
				}
				else if (temp.type == "track") {
					card = this.makeTrackCard(temp.data);
				}
				else {
					card = this.makeConcertCard(temp.data);
				}

				if (count < 3)
					cardItems.push(card);
				else if (count < 6)
					cardItems2.push(card);
				else
					cardItems3.push(card);
				count++;
			}
		}

		console.log(cardItems);
		console.log("Hey. There should this number of total items: " + numberOfPages);

		return (
				<div className="container sweGridContainer">
					<div className="row"><div className="col-xs-12 sweSearchHeader">Search</div></div>
					<div className="sweSearchBar">
						<div className="input-group">
							<span className="input-group-addon">Search Across Models</span>
							<input type="text" onChange={this.updateSearchString} className="form-control text-center" placeholder="Input search here..."/>
							<span className="input-group-btn">
								<button className="btn btn-default" onClick={this.makeSearch} type="button">Search!</button>
							</span>
						</div>
					</div>
					<div className="row">{cardItems}</div>
					<div className="row">{cardItems2}</div>
					<div className="row">{cardItems3}</div>
					<Pagination pageSize={this.state.pageSize} defaultCurrent={1} current={this.state.currentPage} onChange={this.updateGridData} total={data.num_results}/>
					<Modal bsSize="large" show={this.state.showModal} onHide={this.closeModal}>
              {this.state.modalHTML}          
            <Modal.Footer>
              <Button onClick={this.closeModal}>Close</Button>
            </Modal.Footer>
          </Modal>
				</div>
			);
	}	
}