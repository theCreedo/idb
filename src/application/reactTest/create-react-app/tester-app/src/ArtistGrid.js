import React from 'react';
import ReactDOM from 'react-dom';
import Pagination from 'rc-pagination';
import {Modal} from 'react-bootstrap';
import {Button} from 'react-bootstrap/lib';
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
                 filterMode: this.props.filterMode};

    this.handleSortChange = this.handleSortChange.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSortChange(event) {
    this.setState({sortMode: event.target.value});
  }

  handleFilterChange(event) {
    this.setState({filterMode: event.target.value});
  }
    
  handleSubmit(event) {
    var sort = this.state.sortMode;
    var filter = this.state.filterMode;
//    alert('Sorting ' + sort + " with filter " + filter);
    event.preventDefault();
    this.props.onChange(sort, filter);
    //this.onChange(event);
    //event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Sort:
          <select value={this.state.value} onChange={this.handleSortChange}>
            <option value="az">A to Z</option>
            <option value="za">Z to A</option>
          </select>
        </label>
        <label>
          Filter: 
          <select value={this.state.value} onChange={this.handleFilterChange}>
            <option value="name">Track Name</option>
            <option value="artist_id">Group by Artist</option>
            <option value="album_id">Group by Album</option>
            <option value="genre">Genre</option>
            <option value="popularity">Popularity</option>
            <option value="explicit">Is explicit</option>
            <option value="duration">Length</option>
            <option value="release_date">Release</option>
          </select>
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
          gridType: props.gridType,
          modalHTML: '',
          data: JSON.parse(this.makeAPIcall("/api/tracks")),
          showModal: false,
          modalData: JSON.parse(this.makeAPIcall("/api/artists/3")),
          modalType: this.props.gridType
        };
        
        this.updateGridData = this.updateGridData.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    
//    data: JSON.parse(this.makeAPIcall("/api/artists"))
    
//    JSON.parse('{"num_results": 3, "objects": [{ "name": "Hans Zimmer","image_url": "https://i.scdn.co/image/14657235e8724181f8b32c6bfa54cdbf86d70852","country": "Germany","decade": "1980s / 1990s / 2000s / 1970s / 2010s","genre": "Soundtracks"},{"name": "Bag Raiders","image_url": "https://i.scdn.co/image/eefd846c0b91dfdfd88bcfa1047469c052df0bf1","country": "Australia","decade": "2000s / 2010s","genre": "Electronica/Dance"},{"name": "Ramin Djawadi","image_url": "https://i.scdn.co/image/7f2676e08576f569de15238efe3f2e3cc84c82b6", "country": "Germany","decade": "2000s / 2010s","genre": "Soundtracks"}]}')
    
   openTrackModal(id) {
       alert('opening track modal ' + id);
       this.setState({modalData: JSON.parse(this.makeAPIcall("/api/tracks/" + id))});
   }
    
  openArtistModal(id) {
      alert('opening artist modal ' + id);
      var data = JSON.parse(this.makeAPIcall("/api/artists/" + id));
//      this.setState({modalData: data});
      this.setState({modalData: 'artistis'});
      this.setState({modalHTML: this.artistModal(data)});
      this.setState({showModal: true});
  }
    
   openAlbumModal(id) {
       alert('opening album modal ' + id);
       this.setState({modalData: JSON.parse(this.makeAPIcall("/api/albums/" + id))});
   }
    
  openConcertModal(id) {
       alert('opening concert modal ' + id);
       this.setState({modalData: JSON.parse(this.makeAPIcall("/api/concerts/" + id))});
   }
    
   closeModal() {
       this.setState({showModal: false});
   }
    
   updateGridData(current, pageSize) {
       var cur = current;
       if(cur == undefined)
           cur = 1;
//        console.log("State current " + this.state.currentPage + " passed current " + cur + " this is " + this.state.data + " and this " + pageSize);
        this.setState({currentPage: cur});
        this.pageChange(cur);
   }

   makeSortFilter(sortMode, filterMode) {
//       console.log("Sort from the grid " + sortMode + " filter " + filterMode);
       this.setState({sortMode: sortMode});
       this.setState({filterMode: filterMode});
//       console.log("And here from my state: Sort: " + this.state.sortMode + " and filter " + this.state.filterMode);
       this.updateGridData(this.state.currentPage);
   }
    
   pageChange(current) {
       //console.log("I am on change listenr", current);
       var sort;
       var filter = this.state.filterMode;
       var page = current;
       var type = this.state.gridType;
       
       if(this.state.sortMode == "az")
           sort = "asc";
       else
           sort = "desc";
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
        var aap = JSON.parse(this.makeAPIcall("/api/artist_album_pairs/"+ data.artist_album_pairs[0].aa_id));
        var artist = JSON.parse(this.makeAPIcall("/api/artists/" + aap.artist_id));
       
        return (
            <div key={data.id} className="col-sm-4 col-xs-12 sweGridItem">
                <hr className="sweGridItemSpacer"></hr>
                <div className="clearfix"></div>
                <img className="sweGridImage" src={artist.image_url}></img>
                 <h2 className="sweGridItemHeading"><a id={data.id} className="concertModalTgt">{data.name}</a></h2>
                <hr></hr>
                <p className="sweGridItemContent">Venue: {data.venue.name}</p>
                <p className="sweGridItemContent">Artists: <a id={artist.id} className="artistModalTgt">{artist.name}</a></p>
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
                <p className="sweGridItemContent">Album: <a id={data.album.id} className="albumModalTgt">{data.album.name}</a></p>
                <p className="sweGridItemContent">Released: {data.release_date}</p>
                <p className="sweGridItemContent">Duration: {(data.duration/1000)} Seconds</p>
                <p className="sweGridItemContent">Popularity: {data.popularity}</p>
                <p className="sweGridItemContent">Genre: {data.genre}</p>
            </div>
        );    
    }
    
    createGridItemAlbum(data) {
        var albumArtist = this.makeAPIcall("/api/artists/" + data.artists[0].artist_id);
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
                <p className="sweGridItemContent">Artist: <a id={albumArtist.id} className="artistModalTgt">{albumArtist.name}</a></p>
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
                 <h2 className="sweGridItemHeading"><a id={data.id} className="artistModalTgt">{data.name}</a></h2>
                <hr></hr>
                <p className="sweGridItemContent">Popular Song: <a id={mostPopularTrack.id} className="trackModalTgt">{mostPopularTrack.name}</a></p>
                <p className="sweGridItemContent">Artist Country: {data.country}</p>
                <p className="sweGridItemContent">Genres: {data.genre}</p>
                <p className="sweGridItemContent">Artist Decades: {data.decade}</p>
            </div>
        );    
    }

    makeAlbumMasonry(imgUrl, albumTitle, albumId) {
        return (
            <div key={albumTitle+albumId} className='grid-item'>
                <div className='grid-item-content'>
                    <div className='MartistCellImgContainer'><img src={imgUrl}/></div>
                    <div className='MartistCellInfoContainer'>
                        <h3 className='artistInfo-title'>{albumTitle}</h3>
                        <br></br>
                        <button onClick={() => this.props.albumModalFn(albumId)} className='btn btn-default'>Go to Album</button>
                    </div>
                </div>
            </div>
        );
    }
    
    makeArtistMasonry(imgUrl, artistName, artistId) {
        return (
            <div key={artistName+artistId} className='grid-item'>
                <div className='grid-item-content'>
                    <div className='MartistCellImgContainer'><img src={imgUrl}/></div>
                    <div className='MartistCellInfoContainer'>
                        <h3 className='artistInfo-title'>{artistName}</h3>
                        <br></br>
                        <button onClick={() => this.props.artistModalFn(artistId)} className='btn btn-default'>Artist</button>
                    </div>
                </div>
            </div>
        );
    }

    artistModal(data) {
        var pop_track, albums, albumMasonry;
        var backgroundStyle;
        
//        data = this.state.modalData;
        pop_track = data.tracks[data.tracks.length-1];
        albums = data.albums;
        albumMasonry = [];
        
        console.log("Album in artist modal: " + data.album);
        
        /* Set image for header */
        backgroundStyle = {
            background: 'url(' + data.image_url + ') no-repeat center center'
        };
//                    background-size: 'cover' 

        
        for (var x in albums) {
            var alb = JSON.parse(this.makeAPIcall("http://www.boswemianrhapsody.me/api/albums/"+ albums[x].album_id));
            albumMasonry.push(this.makeAlbumMasonry(alb.album_cover_url, alb.name, alb.id));
        }
        
        console.log("Returning artist modal with artist " + data.id);
        
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
                                <iframe className="popupSpotifyEmbed" src={"https://embed.spotify.com/?uri=" + pop_track.spotify_uri} frameborder={"0"} allowtransparency={"true"}></iframe>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12">
                            <hr className="popupHeaderSpacer"></hr>
                            <div className="clearfix"></div>
                            <h2 className="popupDetailHeader">Albums</h2>
                            <div className="container-fluid grid">{albumMasonry}</div>
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
        

        /* ARTIST OK */
        
//        for (var x in actual_JSON.objects) {
//            console.log(x);
//            if(x < 3)
//                gridItems.push(this.createGridItemArtist(actual_JSON.objects[x]));
//            else if(x < 6)
//                gridItems2.push(this.createGridItemArtist(actual_JSON.objects[x]));
//            else
//                gridItems3.push(this.createGridItemArtist(actual_JSON.objects[x]));
//          }
//        
        /* ALBUM OK */
        
//        for (var x in actual_JSON.objects) {
//            console.log(x);
//            if(x < 3)
//                gridItems.push(this.createGridItemAlbum(actual_JSON.objects[x]));
//            else if(x < 6)
//                gridItems2.push(this.createGridItemAlbum(actual_JSON.objects[x]));
//            else
//                gridItems3.push(this.createGridItemAlbum(actual_JSON.objects[x]));
//          }
        
        /* CONCERT OK */
        
//        for (var x in actual_JSON.objects) {
//            console.log(x);
//            if(x < 3)
//                gridItems.push(this.createGridItemConcert(actual_JSON.objects[x]));
//            else if(x < 6)
//                gridItems2.push(this.createGridItemConcert(actual_JSON.objects[x]));
//            else
//                gridItems3.push(this.createGridItemConcert(actual_JSON.objects[x]));
//          }
        
        /* TRACK */
        
        for (var x in actual_JSON.objects) {
            console.log(x);
            if(x < 3)
                gridItems.push(this.createGridItemTrack(actual_JSON.objects[x]));
            else if(x < 6)
                gridItems2.push(this.createGridItemTrack(actual_JSON.objects[x]));
            else
                gridItems3.push(this.createGridItemTrack(actual_JSON.objects[x]));
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
        console.log("Modal show " + this.state.showModal);
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
                <SortingForm sortMode={this.state.sortMode} filterMode={this.state.filterMode} onChange={(sortMode, filterMode) => this.makeSortFilter(sortMode, filterMode)}/>
                <Button
                  bsStyle="primary"
                  bsSize="large"
                  onClick={this.modalOpen}
                >
                  Launch demo modal
                </Button>
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
 <ReactGrid gridType={"tracks"}/>,
 document.getElementById('content')
);