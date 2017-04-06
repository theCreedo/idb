import React from 'react';
import ReactDOM from 'react-dom';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import {openConcertModal, openTrackModal, openArtistModal, openAlbumModal} from './modals.js';

//var Pagination = require('rc-pagination');

export default class ReactGrid extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
          currentPage: 1,
          gridType: props.gridType,
          data: JSON.parse('{"num_results": 3, "objects": [{ "name": "Hans Zimmer","image_url": "https://i.scdn.co/image/14657235e8724181f8b32c6bfa54cdbf86d70852","country": "Germany","decade": "1980s / 1990s / 2000s / 1970s / 2010s","genre": "Soundtracks"},{"name": "Bag Raiders","image_url": "https://i.scdn.co/image/eefd846c0b91dfdfd88bcfa1047469c052df0bf1","country": "Australia","decade": "2000s / 2010s","genre": "Electronica/Dance"},{"name": "Ramin Djawadi","image_url": "https://i.scdn.co/image/7f2676e08576f569de15238efe3f2e3cc84c82b6", "country": "Germany","decade": "2000s / 2010s","genre": "Soundtracks"}]}')
        };
        
       // this.updateGridData = this.updateGridData.bind(this);
    }

    // componentDidMount() {
    //     this.refs.nv.addEventListener("nv-enter", this.updateGridData);
    // }

    // componentWillUnmount() {
    //     this.refs.nv.removeEventListener("nv-enter", this.updateGridData);
    // }
    
   updateGridData(e) {
        console.log(e);
   }

   onChangeListener(e) {
        console.log("I am on change listenr", e);
        // console.log(props);
   }

    onChange(current, pageSize) {
      console.log('onChange:current=', current);
      console.log('onChange:pageSize=', pageSize);
      console.log(this);

      // onChangeListener(this);
      // this.setState({
      //   currentPage: current
      // });
      // this.setState({currentPage: current});
//      this.setState({data: })
    
      /* Using the current, we can change the query to ask for this specific 
      page of results. We can use page size if needed? */
    }
    
    triggerFiltering(type) {
        alert("Filtering of type " + type);
        // Change data
        // Reset/Rerender?
    }
    
    triggerSorting(type) {
        alert("Sorting of type " + type);
    }
    
    /* Returns parsed JSON object of API results */
    makeAPIcall( call ) {
        var xmlHTTP = new XMLHttpRequest();

//        xmlHTTP.open('GET',"https://api-content.dropbox.com/1/files/auto/" + file + "?access_token=" + auth,false);
        xmlHTTP.open('GET',call,false);


        // Arraybuffer response to put into B64
        //xmlHTTP.responseType = 'text';

        var data;
        xmlHTTP.onload = function(e)
        {
            console.log(this.response);
            data = this.response;
        }

        // Send request
        xmlHTTP.send();

        return data;
    }
    
    /* Function that gets the spotlight JSON */
    makeAPIcallJSON(callback) {

        var xobj = new XMLHttpRequest();
            xobj.overrideMimeType("application/json");
        xobj.open('GET', 'resources/js/artistsTest.json', true); // Replace 'my_data' with the path to your file
        xobj.onreadystatechange = function () {
              if (xobj.readyState == 4 && xobj.status == "200") {
                // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
                callback(xobj.responseText);
              }
        };
        xobj.send(null);
     }
    
    createGridItemConcert(data) {
        var artist = this.makeAPIcall("boswemianrhapsody.me/api/album/" + data.artist_album_pairs[0].aa_id);
        return (
            <div key={data.name} className="col-sm-4 col-xs-12 sweGridItem">
                <hr className="sweGridItemSpacer"></hr>
                <div className="clearfix"></div>
                <img className="sweGridImage" src={data.artist}></img>
                 <h2 className="sweGridItemHeading"><a onclick={openConcertModal(data.id)}>{data.name}</a></h2>
                <hr></hr>
                <p className="sweGridItemContent">Venue: {data.venue.name}</p>
                <p className="sweGridItemContent">Artists: <a>Adventure Of A Lifetime</a></p>
                <p className="sweGridItemContent">Event Link: {data.event_link}</p>
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
                <img className="sweGridImage" src={data.album[0].album_cover_url}></img>
                 <h2 className="sweGridItemHeading"><a onclick={openTrackModal(data.id)}>{data.name}</a></h2>
                <hr></hr>
                <p className="sweGridItemContent">Artist: <a onclick={openArtistModal(data.artist[0].id)}>{data.artist[0].name}</a></p>
                <p className="sweGridItemContent">Album: <a onclick={openAlbumModal(data.album_id)}>{data.album[0].name}</a></p>
                <p className="sweGridItemContent">Released: {data.release_date}</p>
                <p className="sweGridItemContent">Duration: {data.duration}</p>
                <p className="sweGridItemContent">Popularity: {data.popularity}</p>
                <p className="sweGridItemContent">Genre: {data.genre}</p>
            </div>
        );    
    }
    
    createGridItemAlbum(data) {
        var albumArtist = this.makeAPIcall("boswemianrhapsody.me/api/artist/" + data.artists[0].artist_id);
        return (
            <div key={data.name} className="col-sm-4 col-xs-12 sweGridItem">
                <hr className="sweGridItemSpacer"></hr>
                <div className="clearfix"></div>
                <img className="sweGridImage" src={data.album_cover_url}></img>
                 <h2 className="sweGridItemHeading"><a onclick={openAlbumModal(data.id)}>{data.name}</a></h2>
                <hr></hr>
                <p className="sweGridItemContent">Artist: <a onclick={openArtistModal(albumArtist.id)}>{albumArtist.name}</a></p>
                <p className="sweGridItemContent">Album: <a onclick={openAlbumModal(data.id)}>{data.name}</a></p>
                <p className="sweGridItemContent">Label: {data.label}</p>
                <p className="sweGridItemContent">Genre: {data.genre}</p>
                <p className="sweGridItemContent">Number of Songs: {data.number_of_tracks}</p>
            </div>
        );    
    }
    
    createGridItemArtist(data) {
        //const popularSong = getSongInfo(data.popularSong);
        
//        <h2 className="sweGridItemHeading"><a onClick={() => this.handleClick({data})}>{data.name}</a></h2>
        
        var mostPopularTrack = data.tracks[data.tracks.length - 1];
        
        return (
            <div key={data.name} className="col-sm-4 col-xs-12 sweGridItem">
                <hr className="sweGridItemSpacer"></hr>
                <div className="clearfix"></div>
                <img className="sweGridImage" src={data.image_url}></img>
                 <h2 className="sweGridItemHeading"><a onclick={openArtistModal(data.id)}>{data.name}</a></h2>
                <hr></hr>
                <p className="sweGridItemContent">Popular Song: <a onclick={openTrackModal(mostPopularTrack.id)}>{mostPopularTrack.name}</a></p>
                <p className="sweGridItemContent">Artist Country: {data.country}</p>
                <p className="sweGridItemContent">Artist Decades: {data.decade}</p>
            </div>
        );    
    }
    
    pagination() {
//        const getTotal = this.getTotal();
        return (
            <Pagination className="swePagination" defaultPageSize={1} defaultCurrent={1} total={27}/>
        );
    }
    
    render() {
        
        var gridItems = [];
//        var that = this;
//        this.loadSpotlightJSON(function(response) {
//          // Parse JSON string into object
//          var actual_JSON = JSON.parse(response);
////          console.log(actual_JSON);
////          console.log(actual_JSON.Artists.length);
////            
////            
////          console.log("Inside promise: " + that);
//            
//          for (var x in actual_JSON.Artists) {
//            console.log(actual_JSON.Artists[x]);
//            gridItems.push(that.createGridItem(actual_JSON.Artists[x]));
//          }
//            
//        });
        
//        var actual_JSON = JSON.parse('{"num_results": 3, "objects": [{ "name": "Hans Zimmer","image_url": "https://i.scdn.co/image/14657235e8724181f8b32c6bfa54cdbf86d70852","country": "Germany","decade": "1980s / 1990s / 2000s / 1970s / 2010s","genre": "Soundtracks"},{"name": "Bag Raiders","image_url": "https://i.scdn.co/image/eefd846c0b91dfdfd88bcfa1047469c052df0bf1","country": "Australia","decade": "2000s / 2010s","genre": "Electronica/Dance"},{"name": "Ramin Djawadi","image_url": "https://i.scdn.co/image/7f2676e08576f569de15238efe3f2e3cc84c82b6", "country": "Germany","decade": "2000s / 2010s","genre": "Soundtracks"}]}');
        
        var actual_JSON = this.state.data;
        
        if (actual_JSON == undefined) {
            
        }
        
        console.log(this.state.data);
        
        const num_results = actual_JSON.num_results;
        for (var x in actual_JSON.objects) {
            console.log(actual_JSON.objects[x]);
            gridItems.push(this.createGridItemArtist(actual_JSON.objects[x]));
          }
        
//        gridItems.push(this.createGridItem(actual_JSON[x]));
        
//        const length = 9;
//        var gridItems = [];
//        
//        for (var i = 0; i < links.length; i++) {
//            gridItems.push(this.createGridItem(jsonData[i]));
//        }
        
        console.log("Lookit: griditems: " + gridItems.length);
        var curState = this.state;
        return (
            <div className="container sweGridContainer">
                <div className="row">
                    <div className="col-xs-12">
                        <h1 className="sweGridTitle">Artist Table</h1>
                    </div>
                </div>
                <div className="row sweGridSorts">
                    <div className="col-xs-12">
                        <div className="btn-group">
                          <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Sort <span className="caret"></span>
                          </button>
                          <ul className="dropdown-menu sweSortDropdown">
                              <li className=""><a onClick={() => this.triggerSorting('az')}>A to Z</a></li>
                              <li className=""><a onClick={() => this.triggerSorting('za')}>Z to A</a></li>
                            </ul>
                        </div>
                        <div className="btn-group">
                          <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Filter <span className="caret"></span>
                          </button>
                          <ul className="dropdown-menu sweSortDropdown">
                              <li className=""><a onClick={() => this.triggerFiltering('name')}>Artist Name</a></li>
                              <li className=""><a onClick={() => this.triggerFiltering('country')}>Country</a></li>
                              <li className=""><a onClick={() => this.triggerFiltering('decade')}>Decade</a></li>
                            </ul>
                        </div>
                    </div> 
                </div>
                <div className="row">{gridItems[this.state.current]}</div>
                <Pagination pageSize={1} onChange={this.onChange} current={this.state.current} total={num_results}/>
            </div>
        );
    }
}


//ReactDOM.render(
//  <ReactGrid/>,
//  document.getElementById('reactTgt')
//);