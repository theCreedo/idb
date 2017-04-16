import React from 'react';
import ReactDOM from 'react-dom';
import Pagination from 'rc-pagination';
import {Modal} from 'react-bootstrap';
import {Button} from 'react-bootstrap/lib';
import Masonry from 'react-masonry-component';
import SWEAutocomplete from './SweFilters.js'; 
import 'rc-pagination/assets/index.css';
//import {openConcertModal, openTrackModal, openArtistModal, openAlbumModal} from './modals.js';
 import './resources/css/sweStyle.css';
 import './resources/css/pagePO.css';
 import 'bootstrap/dist/css/bootstrap.min.css';
//import Modal from './modalTest';
//import SWEModal from './sweModal.js';
//var Pagination = require('rc-pagination');

class SortingForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {sortMode: this.props.sortMode,
                 filterMode: this.props.filterMode,
                 filterString: this.props.filterString};

    this.handleSortChange = this.handleSortChange.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.updateFilterString = this.updateFilterString.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSortChange(event) {
    this.setState({sortMode: event.target.value});
  }

  handleFilterChange(event) {
    this.setState({filterMode: event.target.value});
  }

  updateFilterString(value) {
      this.setState({filterString: value});
  }
    
   handleSubmit(event) {
    var sort = this.state.sortMode;
    var filter = this.state.filterMode;
    var filterString = this.state.filterString;
//    alert('Sorting ' + sort + " with filter " + filter);
    event.preventDefault();
    this.props.onChange(sort, filter, filterString);
    //this.onChange(event);
    //event.preventDefault();
  }

  trackOptions() {
      return (
          <select value={this.state.value} onChange={this.handleFilterChange}>
            <option value="trackname">Track Name</option>
            <option value="artist_id">Group by Artist</option>
            <option value="album_id">Group by Album</option>
            <option value="genre">Genre</option>
            <option value="popularity">Popularity</option>
            <option value="explicit">Explicit</option>
            <option value="duration">Length</option>
            <option value="release_date">Release</option>
          </select>
      );
  }
    
  albumOptions() {
      return (
          <select value={this.state.value} onChange={this.handleFilterChange}>
            <option value="albumname">Album Name</option>
            <option value="release_date">Release Date</option>
            <option value="label">Label</option>
            <option value="genre">Genre</option>
            <option value="number_of_tracks">No. of Songs</option>
          </select>
      );
  }
    
  artistOptions() {
      return (
          <select value={this.state.value} onChange={this.handleFilterChange}>
            <option value="artistname">Artist Name</option>
            <option value="country">Country</option>
            <option value="genre">Genre</option>
            <option value="decade">Decade</option>
          </select>
      );
  }
    
  concertOptions() {
      return (
          <select value={this.state.value} onChange={this.handleFilterChange}>
            <option value="artistname">Artist</option>
            <option value="date">Country</option>
            <option value="time">Start Time</option>
          </select>
      );
  }

  render() {
      var options = this.trackOptions();
      var filter = this.state.filterMode;
      var gridType = this.props.gridType;
      var conditionalStyle;
      
      if (gridType == "tracks") {
          options = this.trackOptions();
      }
      else if (gridType == "artists") {
          options = this.artistOptions();
      }
      else if (gridType == "albums") {
          options = this.albumOptions();
      }
      else {
          options = this.concertOptions();
      }
      
      if (filter != "artistname" && filter != "city" && filter != "label"
            && filter != "genre" && filter != "country"){
            conditionalStyle = "invisible";
            //this.setState({filterString: ''});
        }
        else {
            conditionalStyle = "";
        }
      
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Ordering:
          <select value={this.state.value} onChange={this.handleSortChange}>
            <option value="az">Ascending</option>
            <option value="za">Descending</option>
          </select>
        </label>
        <label>
          Sort: 
          {options}
        </label>
        <label className={conditionalStyle}>
        Filter Query: 
        <SWEAutocomplete className={conditionalStyle} onChange={this.updateFilterString} filterType={this.state.filterMode} filterString={this.state.filterString}/>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

/* React Bootstrap REQUIRES these imports 
    
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"> (WE IMPORT THIS)
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/<react-version>/react.min.js"></script> (GOT IT)
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/<react-version>/react-dom.min.js"></script> (GOT IT)
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react-bootstrap/<version>/react-bootstrap.min.js"></script> (NPM THIS npm install react-bootstrap)
    
    https://react-bootstrap.github.io/components.html#modals
*/

//class SWEModal extends React.Component {
//    constructor(props) {
//        
//    }
//}

export default class ReactGrid extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
          filterMode: 'name',
          sortMode: 'az',
          currentPage: 1,
          pageSize: 1,
          gridType: this.props.gridType,
          modalHTML: '',
          data: JSON.parse(this.makeAPIcall("/api/" + this.props.gridType + "?page=" + 1 + "&q={\"order_by\":[{\"field\":\"name\",\"direction\":\"asc\"}]}")),
          showModal: false,
          modalData: '',
          modalType: this.props.gridType,
          masonryToggle: false, 
          filterString: ''
        };
        
        this.updateGridData = this.updateGridData.bind(this);
        this.makeSortFilter = this.makeSortFilter.bind(this);
        this.closeModal = this.closeModal.bind(this);
//        this.masonryClick = this.masonryClick.bind(this);
    }
    
//    data: JSON.parse(this.makeAPIcall("/api/artists"))
    
//    JSON.parse('{"num_results": 3, "objects": [{ "name": "Hans Zimmer","image_url": "https://i.scdn.co/image/14657235e8724181f8b32c6bfa54cdbf86d70852","country": "Germany","decade": "1980s / 1990s / 2000s / 1970s / 2010s","genre": "Soundtracks"},{"name": "Bag Raiders","image_url": "https://i.scdn.co/image/eefd846c0b91dfdfd88bcfa1047469c052df0bf1","country": "Australia","decade": "2000s / 2010s","genre": "Electronica/Dance"},{"name": "Ramin Djawadi","image_url": "https://i.scdn.co/image/7f2676e08576f569de15238efe3f2e3cc84c82b6", "country": "Germany","decade": "2000s / 2010s","genre": "Soundtracks"}]}')
    
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
    
   updateGridData(current, pageSize) {
       var cur = current;
       if(cur == undefined)
           cur = 1;
//        console.log("State current " + this.state.currentPage + " passed current " + cur + " this is " + this.state.data + " and this " + pageSize);
        this.setState({currentPage: cur});
        this.pageChange(cur);
   }

   makeSortFilter(sortMode, filterMode, filterString) {
       console.log("Sort from the grid " + sortMode + " field " + filterMode + " filter string " + filterString);
       /* Check: Do I need to set the states here or is it already set for me through props?? */
       this.setState({sortMode: sortMode});
       this.setState({filterMode: filterMode});
       this.setState({filterString: filterString});
//       console.log("And here from my state: Sort: " + this.state.sortMode + " and filter " + this.state.filterMode);
       this.updateGridData(this.state.currentPage);
   }
    
   pageChange(current) {
       //console.log("I am on change listenr", current);
       var sort;
       var filter = this.state.filterMode;
       var page = current;
       var type = this.state.gridType;
       var filterQuery = this.state.filterString;
       
       if(this.state.sortMode == "az")
           sort = "asc";
       else
           sort = "desc";
       
       if (filter == "trackname" || filter == "artistname" || filter == "albumname") {
           filter = "name"
       }
       
       console.log("Updating page with sort by type " + filter + " and query " + filterQuery);
//       alert("Sort: " + sort + " filter " + filter + " page "  + current);
//       this.setState({data: JSON.parse(this.makeAPIcall("/api/sort/" + type + "/" + page + "/" + filter + "/" + sort))});
       this.setState({data: JSON.parse(this.makeAPIcall("/api/" + type + "?page=" + page + "&q={\"order_by\":[{\"field\":\""+filter+"\",\"direction\":\""+sort+"\"}]}"))});
//       this.setState({data: JSON.parse(this.makeAPIcall("/api/" + type + "?page=" + page))});
        // console.log(props);
   }
    
    /* Returns parsed JSON object of API results */
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
    
    createGridItemConcert(data) {
        var artist = data.artist;
       
        return (
            <div key={data.id} className="col-sm-4 col-xs-12 sweGridItem">
                <hr className="sweGridItemSpacer"></hr>
                <div className="clearfix"></div>
                <img className="sweGridImage" src={artist.image_url}></img>
                 <h2 className="sweGridItemHeading"><a id={data.id} onClick={() =>{this.openConcertModal(data.id)}} className="concertModalTgt">{data.name}</a></h2>
                <hr></hr>
                <p className="sweGridItemContent">Venue: {data.venue.name}</p>
                <p className="sweGridItemContent">Artists: <a id={artist.id} onClick={() =>{this.openArtistModal(artist.id)}} className="artistModalTgt">{artist.name}</a></p>
                <p className="sweGridItemContent">Event Link: <a target={"_blank"} href={data.event_link}>Learn More</a></p>
                <p className="sweGridItemContent">Date: {data.date}</p>
                <p className="sweGridItemContent">Time: {data.time}</p>
            </div>
        );    
    }
    
    createGridItemTrack(data) {
        return (
            <div key={data.name} className="col-sm-4 col-xs-12 sweGridItem">
                <hr className="sweGridItemSpacer"></hr>
                <div className="clearfix"></div>
                <img className="sweGridImage" src={data.album.album_cover_url}></img>
                <h2 className="sweGridItemHeading"><a onClick={() =>{this.openTrackModal(data.id)}} id={data.id} className="trackModalTgt">{data.name}</a></h2>
                <hr></hr>
                <p className="sweGridItemContent">Artist: <a onClick={() =>{this.openArtistModal(data.artist.id)}} id={data.artist.id} className="artistModalTgt">{data.artist.name}</a></p>
                <p className="sweGridItemContent">Album: <a onClick={() =>{this.openAlbumModal(data.album.id)}} id={data.album.id} className="albumModalTgt">{data.album.name}</a></p>
                <p className="sweGridItemContent">Released: {data.release_date}</p>
                <p className="sweGridItemContent">Duration: {(data.duration/1000)} Seconds</p>
                <p className="sweGridItemContent">Popularity: {data.popularity}</p>
                <p className="sweGridItemContent">Genre: {data.genre}</p>
            </div>
        );    
    }
    
    createGridItemAlbum(data) {
        var albumArtist = data.artist;
//        var albumArtist = {
//            id: 'foo',
//            name: 'bar'
//        };
        return (
            <div key={data.name} className="col-sm-4 col-xs-12 sweGridItem">
                <hr className="sweGridItemSpacer"></hr>
                <div className="clearfix"></div>
                <img className="sweGridImage" src={data.album_cover_url}></img>
                 <h2 className="sweGridItemHeading"><a onClick={() =>{this.openAlbumModal(data.id)}} id={data.id} className="albumModalTgt">{data.name}</a></h2>
                <hr></hr>
                <p className="sweGridItemContent">Artist: <a id={albumArtist.id} onClick={() =>{this.openArtistModal(albumArtist.id)}} className="artistModalTgt">{albumArtist.name}</a></p>
                <p className="sweGridItemContent">Released: {data.release_date}</p>
                <p className="sweGridItemContent">Label: {data.label}</p>
                <p className="sweGridItemContent">Genre: {data.genre}</p>
                <p className="sweGridItemContent">Number of Songs: {data.number_of_tracks}</p>
            </div>
        );    
    }
    
    createGridItemArtist(data) {
        //const popularSong = getSongInfo(data.popularSong);
        
//        <h2 className="sweGridItemHeading"><a onClick={() => this.handleClick({data})}>{data.name}</a></h2>
        
//        console.log(data.name + " Size: " + data.tracks.length);
        
        var mostPopularTrack;
        if (data.tracks != undefined)
            mostPopularTrack = data.tracks[data.tracks.length-1];
        else {
            mostPopularTrack = {
                id: -1,
                name: "none"
            }
        }
        // onclick={openTrackModal(mostPopularTrack.id)}
        // onclick={openArtistModal(data.id)}
//        const clicker = "onclick=openTrackModal(" + mostPopularTrack.id +")";
        return (
            <div key={data.name} className="col-sm-4 col-xs-12 sweGridItem">
                <hr className="sweGridItemSpacer"></hr>
                <div className="clearfix"></div>
                <img className="sweGridImage" src={data.image_url}></img>
                 <h2 className="sweGridItemHeading"><a id={data.id} onClick={() =>{this.openArtistModal(data.id)}} className="artistModalTgt">{data.name}</a></h2>
                <hr></hr>
                <p className="sweGridItemContent">Popular Song: <a id={mostPopularTrack.id} onClick={() =>{this.openTrackModal(mostPopularTrack.id)}} className="trackModalTgt">{mostPopularTrack.name}</a></p>
                <p className="sweGridItemContent">Artist Country: {data.country}</p>
                <p className="sweGridItemContent">Genres: {data.genre}</p>
                <p className="sweGridItemContent">Artist Decades: {data.decade}</p>
            </div>
        );    
    }
    
    masonryClick(e) {
        var foo = e.currentTarget;
//        console.log("Masonry click! Current toggle: " + this.state.masonryToggle + " will be changed to opposite. This: " + e.currentTarget.children);
//        for (var i = 0; i < foo.children.length; i++) {
//            console.log(foo.children[i].tagName);
//        }
        //console.log("Foo value " + foo.getAttribute("data-open"));
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
        
//        if (this.state.masonryToggle) {
//            foo.children[0].className = 'MartistCellImgContainer expand-coverArt';
//            foo.children[1].className = 'MartistCellInfoContainer expand-description';
//        }
//        else {
//            foo.children[0].className = 'MartistCellImgContainer';
//            foo.children[1].className = 'MartistCellInfoContainer';
//        }
//        this.setState({masonryToggle: !this.state.masonryToggle});
//        foo.setAttribute('data-open', "1");
    }

    makeAlbumMasonry(imgUrl, albumTitle, albumId, state) {
        //console.log("Passed state is " + state + " while this.state is " + this.state.masonryToggle);
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
        //console.log("Passed state is " + state + " while this.state is " + this.state.masonryToggle);
        
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

//<div id="albumGridTgt" data-masonry={"{'itemSelector':'.grid-item'}"}className="grid container-fluid">{artistMasonry}</div>
    
    concertModal(data) {
        var backgroundStyle, artistMasonry;
      var art = data.artist;
        
        //console.log("Making concert modal");
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

//<div id="concertLineupTgt" className="grid container-fluid" data-masonry='{ "itemSelector": ".grid-item"}'>{artistMasonry}</div>
    
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
        
//        data = this.state.modalData;
        pop_track = data.tracks[data.tracks.length-1];
        albums = data.albums;
        albumMasonry = [];
        
        //console.log("Album in artist modal: " + data.album);
        
        /* Set image for header */
        backgroundStyle = {
            background: 'url(' + data.image_url + ') no-repeat center center'
        };
//                    background-size: 'cover' 

        
        for (var x in albums) {
            var alb = albums[x];
            albumMasonry.push(this.makeAlbumMasonry(alb.album_cover_url, alb.name, alb.id,this.state.masonryToggle));
        }
        
        //console.log("Returning artist modal with artist " + data.id);
        
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
        
        var gridItems = [];
        var gridItems2 = [];
        var gridItems3 = [];
        
        var actual_JSON = this.state.data;
//        var actual_JSON = JSON.parse(this.makeAPIcall( 'http://www.boswemianrhapsody.me/api/artists' ));
//        var actual_JSON = this.fetchData('www.boswemianrhapsody.me/api/artists');
        var that = this;
        
        if (actual_JSON == undefined) {
            alert("'CRAP. Could not load data! RUINING THE APP! Sorry!' - Alex Jones");
        }
        
//        console.log(actual_JSON);
        
        const num_results = actual_JSON.num_results;
        const pageSize = this.state.pageSize;
        

        var gridType = this.state.gridType;
        
        if (gridType == "artists") {
        /* ARTIST OK */
        
            for (var x in actual_JSON.objects) {
                console.log(x);
                if(x < 3)
                    gridItems.push(this.createGridItemArtist(actual_JSON.objects[x]));
                else if(x < 6)
                    gridItems2.push(this.createGridItemArtist(actual_JSON.objects[x]));
                else
                    gridItems3.push(this.createGridItemArtist(actual_JSON.objects[x]));
              }
        }
        else if (gridType == "albums") {
//        
        /* ALBUM OK */
        
            for (var x in actual_JSON.objects) {
                console.log(x);
                if(x < 3)
                    gridItems.push(this.createGridItemAlbum(actual_JSON.objects[x]));
                else if(x < 6)
                    gridItems2.push(this.createGridItemAlbum(actual_JSON.objects[x]));
                else
                    gridItems3.push(this.createGridItemAlbum(actual_JSON.objects[x]));
              }
        }
        
        else if(gridType == "concerts") {
           for (var x in actual_JSON.objects) {
               console.log(x);
               if(x < 3)
                   gridItems.push(this.createGridItemConcert(actual_JSON.objects[x]));
               else if(x < 6)
                   gridItems2.push(this.createGridItemConcert(actual_JSON.objects[x]));
               else
                   gridItems3.push(this.createGridItemConcert(actual_JSON.objects[x]));
             }
        }
        
        /* TRACK */
        else {
            for (var x in actual_JSON.objects) {
             console.log(x);
             if(x < 3)
                 gridItems.push(this.createGridItemTrack(actual_JSON.objects[x]));
             else if(x < 6)
                 gridItems2.push(this.createGridItemTrack(actual_JSON.objects[x]));
             else
                 gridItems3.push(this.createGridItemTrack(actual_JSON.objects[x]));
            }
        }
        
//        const pagination = this.pagination(1, num_results);
//        gridItems.push(this.createGridItem(actual_JSON[x]));
        
//        const length = 9;
//        var gridItems = [];
//        
//        for (var i = 0; i < links.length; i++) {
//            gridItems.push(this.createGridItem(jsonData[i]));
//        }
//        var modalHTML;
//        console.log("Modal type " + this.state.modalType);
//        if (this.state.type == 'tracks') {
////            modalHTML = this.trackModal();
//            modalHTML = this.artistModal();
//        }
//        else if (this.state.type == 'albums') {
//            modalHTML = this.albumModal();
//        }
//        else if (this.state.type == 'artists') {
//            modalHTML = this.artistModal();
//        }
//        else {
////            modalHTML = this.concertModal();
//        }
        

        
//        console.log("Lookit: griditems: " + gridItems.length);
//        console.log("Modal data " + this.state.modalData);
        //console.log("Modal show " + this.state.showModal);
//        console.log("Modal HTML " + modalHTML);
//        this.setState({showModal: true});
        var curState = this.state;
        return (
            <div className="container sweGridContainer">
                <div className="row">
                    <div className="col-xs-12">
                        <h1 className="sweGridTitle">{this.state.gridType + " Table"}</h1>
                    </div>
                </div>
                <SortingForm gridType={this.state.gridType} sortMode={this.state.sortMode} filterMode={this.state.filterMode} onChange={(sortMode, filterMode, filterString) => this.makeSortFilter(sortMode, filterMode, filterString)}/>
                <div className="row">{gridItems}</div>
                <div className="row">{gridItems2}</div>
                <div className="row">{gridItems3}</div>
                <Pagination pageSize={this.state.pageSize} defaultCurrent={1} current={this.state.currentPage} onChange={this.updateGridData} total={Math.ceil(num_results/9)}/>
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

//<SWEModal type={this.state.modalType} data={this.state.modalData} modalOpen={this.state.showModal} close={this.closeModal} artistModalFn={this.openArtistModal} albumModalFn={this.openAlbumModal} />

//<Modal bsSize={"large"} show={this.state.modalOpen} onHide={this.closeModal}>
//                  {modalHTML}            
//                  <Modal.Footer>
//                    <Button onClick={this.closeModal}>Close</Button>
//                  </Modal.Footer>
//                </Modal>


ReactDOM.render(
 <ReactGrid gridType={"albums"}/>,
 document.getElementById('content')
);