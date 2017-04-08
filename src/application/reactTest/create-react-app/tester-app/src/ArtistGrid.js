import React from 'react';
import ReactDOM from 'react-dom';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import {openConcertModal, openTrackModal, openArtistModal, openAlbumModal} from './modals.js';
import './resources/css/sweStyle.css'
// import Modal from './modalTest';w
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
            <option value="name">Artist Name</option>
            <option value="country">Country</option>
            <option value="decade">Decade</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default class ReactGrid extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
          filterMode: 'name',
          sortMode: 'az',
          currentPage: 1,
          pageSize: 1,
          gridType: props.gridType,
          data: JSON.parse(this.makeAPIcall("{\n  \"num_results\": 1091, \n  \"objects\": [\n    {\n      \"artist_album_pairs\": [\n        {\n          \"aa_id\": 268, \n          \"concert_id\": 1, \n          \"id\": 1\n        }\n      ], \n      \"date\": \"2017-05-13\", \n      \"event_link\": \"http://www.bandsintown.com/event/13940407?app_id=boswemianrhapsody&artist=Smash+Mouth&came_from=67\", \n      \"id\": 1, \n      \"name\": \"Smash Mouth\", \n      \"time\": \"19:00:00\", \n      \"venue\": {\n        \"city\": \"Peachtree City\", \n        \"country\": \"United States\", \n        \"id\": 1, \n        \"latitude\": 33.384111, \n        \"longitude\": -84.57109, \n        \"name\": \"THE FRED \", \n        \"region\": \"GA\"\n      }, \n      \"venue_id\": 1\n    }, \n    {\n      \"artist_album_pairs\": [\n        {\n          \"aa_id\": 268, \n          \"concert_id\": 2, \n          \"id\": 2\n        }\n      ], \n      \"date\": \"2017-05-27\", \n      \"event_link\": \"http://www.bandsintown.com/event/14175478?app_id=boswemianrhapsody&artist=Smash+Mouth&came_from=67\", \n      \"id\": 2, \n      \"name\": \"Smash Mouth\", \n      \"time\": \"21:00:00\", \n      \"venue\": {\n        \"city\": \"Las Vegas\", \n        \"country\": \"United States\", \n        \"id\": 2, \n        \"latitude\": 36.1472468, \n        \"longitude\": -115.1560311, \n        \"name\": \"Stratosphere\", \n        \"region\": \"NV\"\n      }, \n      \"venue_id\": 2\n    }, \n    {\n      \"artist_album_pairs\": [\n        {\n          \"aa_id\": 268, \n          \"concert_id\": 3, \n          \"id\": 3\n        }\n      ], \n      \"date\": \"2017-06-09\", \n      \"event_link\": \"http://www.bandsintown.com/event/14190608?app_id=boswemianrhapsody&artist=Smash+Mouth&came_from=67\", \n      \"id\": 3, \n      \"name\": \"Smash Mouth\", \n      \"time\": \"21:00:00\", \n      \"venue\": {\n        \"city\": \"Fishers\", \n        \"country\": \"United States\", \n        \"id\": 3, \n        \"latitude\": 39.9602351, \n        \"longitude\": -86.0161593, \n        \"name\": \"Nickel Plate Amphitheater\", \n        \"region\": \"IN\"\n      }, \n      \"venue_id\": 3\n    }, \n    {\n      \"artist_album_pairs\": [\n        {\n          \"aa_id\": 268, \n          \"concert_id\": 4, \n          \"id\": 4\n        }\n      ], \n      \"date\": \"2017-06-10\", \n      \"event_link\": \"http://www.bandsintown.com/event/14275014?app_id=boswemianrhapsody&artist=Smash+Mouth&came_from=67\", \n      \"id\": 4, \n      \"name\": \"Smash Mouth\", \n      \"time\": \"17:00:00\", \n      \"venue\": {\n        \"city\": \"Burlington\", \n        \"country\": \"Canada\", \n        \"id\": 4, \n        \"latitude\": 43.32276, \n        \"longitude\": -79.79744, \n        \"name\": \"SOUND OF MUSIC FEST\", \n        \"region\": \"ON\"\n      }, \n      \"venue_id\": 4\n    }, \n    {\n      \"artist_album_pairs\": [\n        {\n          \"aa_id\": 268, \n          \"concert_id\": 5, \n          \"id\": 5\n        }\n      ], \n      \"date\": \"2017-06-17\", \n      \"event_link\": \"http://www.bandsintown.com/event/14093224?app_id=boswemianrhapsody&artist=Smash+Mouth&came_from=67\", \n      \"id\": 5, \n      \"name\": \"Smash Mouth\", \n      \"time\": \"19:00:00\", \n      \"venue\": {\n        \"city\": \"San Mateo\", \n        \"country\": \"United States\", \n        \"id\": 5, \n        \"latitude\": 37.5630556, \n        \"longitude\": -122.3244444, \n        \"name\": \"San Mateo County Fair\", \n        \"region\": \"CA\"\n      }, \n      \"venue_id\": 5\n    }, \n    {\n      \"artist_album_pairs\": [\n        {\n          \"aa_id\": 268, \n          \"concert_id\": 6, \n          \"id\": 6\n        }\n      ], \n      \"date\": \"2017-06-24\", \n      \"event_link\": \"http://www.bandsintown.com/event/14192713?app_id=boswemianrhapsody&artist=Smash+Mouth&came_from=67\", \n      \"id\": 6, \n      \"name\": \"Smash Mouth\", \n      \"time\": \"20:00:00\", \n      \"venue\": {\n        \"city\": \"Oklahoma City\", \n        \"country\": \"United States\", \n        \"id\": 6, \n        \"latitude\": 35.5813165, \n        \"longitude\": -97.4421952, \n        \"name\": \"FRONTIER CITY \", \n        \"region\": \"OK\"\n      }, \n      \"venue_id\": 6\n    }, \n    {\n      \"artist_album_pairs\": [\n        {\n          \"aa_id\": 268, \n          \"concert_id\": 7, \n          \"id\": 7\n        }\n      ], \n      \"date\": \"2017-07-14\", \n      \"event_link\": \"http://www.bandsintown.com/event/14152274?app_id=boswemianrhapsody&artist=Smash+Mouth&came_from=67\", \n      \"id\": 7, \n      \"name\": \"Smash Mouth\", \n      \"time\": \"19:00:00\", \n      \"venue\": {\n        \"city\": \"Central Point\", \n        \"country\": \"United States\", \n        \"id\": 7, \n        \"latitude\": 42.3798905, \n        \"longitude\": -122.9038373, \n        \"name\": \"Jackson\", \n        \"region\": \"OR\"\n      }, \n      \"venue_id\": 7\n    }, \n    {\n      \"artist_album_pairs\": [\n        {\n          \"aa_id\": 268, \n          \"concert_id\": 8, \n          \"id\": 8\n        }\n      ], \n      \"date\": \"2017-09-15\", \n      \"event_link\": \"http://www.bandsintown.com/event/14199474?app_id=boswemianrhapsody&artist=Smash+Mouth&came_from=67\", \n      \"id\": 8, \n      \"name\": \"Smash Mouth\", \n      \"time\": \"00:00:00\", \n      \"venue\": {\n        \"city\": \"Del Mar\", \n        \"country\": \"United States\", \n        \"id\": 8, \n        \"latitude\": 32.972428, \n        \"longitude\": -117.258067, \n        \"name\": \"KAABOO Del Mar\", \n        \"region\": \"CA\"\n      }, \n      \"venue_id\": 8\n    }, \n    {\n      \"artist_album_pairs\": [\n        {\n          \"aa_id\": 270, \n          \"concert_id\": 9, \n          \"id\": 9\n        }\n      ], \n      \"date\": \"2017-06-02\", \n      \"event_link\": \"http://www.bandsintown.com/event/14246553?app_id=boswemianrhapsody&artist=Bag+Raiders&came_from=67\", \n      \"id\": 9, \n      \"name\": \"Bag Raiders\", \n      \"time\": \"19:00:00\", \n      \"venue\": {\n        \"city\": \"San Diego\", \n        \"country\": \"United States\", \n        \"id\": 9, \n        \"latitude\": 32.715695, \n        \"longitude\": -117.161719, \n        \"name\": \"The Observatory North Park\", \n        \"region\": \"CA\"\n      }, \n      \"venue_id\": 9\n    }\n  ], \n  \"page\": 1, \n  \"total_pages\": 122\n}"))
        };
        
        this.updateGridData = this.updateGridData.bind(this);
    }
    
//    data: JSON.parse(this.makeAPIcall("/api/artists"))
    
//    JSON.parse('{"num_results": 3, "objects": [{ "name": "Hans Zimmer","image_url": "https://i.scdn.co/image/14657235e8724181f8b32c6bfa54cdbf86d70852","country": "Germany","decade": "1980s / 1990s / 2000s / 1970s / 2010s","genre": "Soundtracks"},{"name": "Bag Raiders","image_url": "https://i.scdn.co/image/eefd846c0b91dfdfd88bcfa1047469c052df0bf1","country": "Australia","decade": "2000s / 2010s","genre": "Electronica/Dance"},{"name": "Ramin Djawadi","image_url": "https://i.scdn.co/image/7f2676e08576f569de15238efe3f2e3cc84c82b6", "country": "Germany","decade": "2000s / 2010s","genre": "Soundtracks"}]}')

    // componentDidMount() {
    //     this.refs.nv.addEventListener("nv-enter", this.updateGridData);
    // }

    // componentWillUnmount() {
    //     this.refs.nv.removeEventListener("nv-enter", this.updateGridData);
    // }
    
   updateGridData(current, pageSize) {
       var cur = current;
       if(cur == undefined)
           cur = 1;
        console.log("State current " + this.state.currentPage + " passed current " + cur + " this is " + this.state.data + " and this " + pageSize);
        this.setState({currentPage: cur});
        this.pageChange(cur);
   }

   makeSortFilter(sortMode, filterMode) {
       console.log("Sort from the grid " + sortMode + " filter " + filterMode);
       this.setState({sortMode: sortMode});
       this.setState({filterMode: filterMode});
       console.log("And here from my state: Sort: " + this.state.sortMode + " and filter " + this.state.filterMode);
       this.updateGridData(this.state.currentPage);
   }
    
   pageChange(current) {
       console.log("I am on change listenr", current);
       var sort;
       var filter = this.state.filterMode;
       var page = current;
       var type = "artists";
       
       if(this.state.sortMode == "az")
           sort = "asc";
       else
           sort = "desc";
//       alert("Sort: " + sort + " filter " + filter + " page "  + current);
//       this.setState({data: JSON.parse(this.makeAPIcall("/api/sort/" + type + "/" + page + "/" + filter + "/" + sort))});
//       this.setState({data: JSON.parse(this.makeAPIcall("/api/" + type + "?page=" + page + "&q={\'order_by\':[{\'field\':'"+filter+"\',\'direction\':\'"+sort+"\'}]}"))});
//       this.setState({data: JSON.parse(this.makeAPIcall("/api/" + type + "?page=" + page))});
       this.setState({data: JSON.parse("{\n  \"num_results\": 1091, \n  \"objects\": [\n    {\n      \"artist_album_pairs\": [\n        {\n          \"aa_id\": 268, \n          \"concert_id\": 1, \n          \"id\": 1\n        }\n      ], \n      \"date\": \"2017-05-13\", \n      \"event_link\": \"http://www.bandsintown.com/event/13940407?app_id=boswemianrhapsody&artist=Smash+Mouth&came_from=67\", \n      \"id\": 1, \n      \"name\": \"Smash Mouth\", \n      \"time\": \"19:00:00\", \n      \"venue\": {\n        \"city\": \"Peachtree City\", \n        \"country\": \"United States\", \n        \"id\": 1, \n        \"latitude\": 33.384111, \n        \"longitude\": -84.57109, \n        \"name\": \"THE FRED \", \n        \"region\": \"GA\"\n      }, \n      \"venue_id\": 1\n    }, \n    {\n      \"artist_album_pairs\": [\n        {\n          \"aa_id\": 268, \n          \"concert_id\": 2, \n          \"id\": 2\n        }\n      ], \n      \"date\": \"2017-05-27\", \n      \"event_link\": \"http://www.bandsintown.com/event/14175478?app_id=boswemianrhapsody&artist=Smash+Mouth&came_from=67\", \n      \"id\": 2, \n      \"name\": \"Smash Mouth\", \n      \"time\": \"21:00:00\", \n      \"venue\": {\n        \"city\": \"Las Vegas\", \n        \"country\": \"United States\", \n        \"id\": 2, \n        \"latitude\": 36.1472468, \n        \"longitude\": -115.1560311, \n        \"name\": \"Stratosphere\", \n        \"region\": \"NV\"\n      }, \n      \"venue_id\": 2\n    }, \n    {\n      \"artist_album_pairs\": [\n        {\n          \"aa_id\": 268, \n          \"concert_id\": 3, \n          \"id\": 3\n        }\n      ], \n      \"date\": \"2017-06-09\", \n      \"event_link\": \"http://www.bandsintown.com/event/14190608?app_id=boswemianrhapsody&artist=Smash+Mouth&came_from=67\", \n      \"id\": 3, \n      \"name\": \"Smash Mouth\", \n      \"time\": \"21:00:00\", \n      \"venue\": {\n        \"city\": \"Fishers\", \n        \"country\": \"United States\", \n        \"id\": 3, \n        \"latitude\": 39.9602351, \n        \"longitude\": -86.0161593, \n        \"name\": \"Nickel Plate Amphitheater\", \n        \"region\": \"IN\"\n      }, \n      \"venue_id\": 3\n    }, \n    {\n      \"artist_album_pairs\": [\n        {\n          \"aa_id\": 268, \n          \"concert_id\": 4, \n          \"id\": 4\n        }\n      ], \n      \"date\": \"2017-06-10\", \n      \"event_link\": \"http://www.bandsintown.com/event/14275014?app_id=boswemianrhapsody&artist=Smash+Mouth&came_from=67\", \n      \"id\": 4, \n      \"name\": \"Smash Mouth\", \n      \"time\": \"17:00:00\", \n      \"venue\": {\n        \"city\": \"Burlington\", \n        \"country\": \"Canada\", \n        \"id\": 4, \n        \"latitude\": 43.32276, \n        \"longitude\": -79.79744, \n        \"name\": \"SOUND OF MUSIC FEST\", \n        \"region\": \"ON\"\n      }, \n      \"venue_id\": 4\n    }, \n    {\n      \"artist_album_pairs\": [\n        {\n          \"aa_id\": 268, \n          \"concert_id\": 5, \n          \"id\": 5\n        }\n      ], \n      \"date\": \"2017-06-17\", \n      \"event_link\": \"http://www.bandsintown.com/event/14093224?app_id=boswemianrhapsody&artist=Smash+Mouth&came_from=67\", \n      \"id\": 5, \n      \"name\": \"Smash Mouth\", \n      \"time\": \"19:00:00\", \n      \"venue\": {\n        \"city\": \"San Mateo\", \n        \"country\": \"United States\", \n        \"id\": 5, \n        \"latitude\": 37.5630556, \n        \"longitude\": -122.3244444, \n        \"name\": \"San Mateo County Fair\", \n        \"region\": \"CA\"\n      }, \n      \"venue_id\": 5\n    }, \n    {\n      \"artist_album_pairs\": [\n        {\n          \"aa_id\": 268, \n          \"concert_id\": 6, \n          \"id\": 6\n        }\n      ], \n      \"date\": \"2017-06-24\", \n      \"event_link\": \"http://www.bandsintown.com/event/14192713?app_id=boswemianrhapsody&artist=Smash+Mouth&came_from=67\", \n      \"id\": 6, \n      \"name\": \"Smash Mouth\", \n      \"time\": \"20:00:00\", \n      \"venue\": {\n        \"city\": \"Oklahoma City\", \n        \"country\": \"United States\", \n        \"id\": 6, \n        \"latitude\": 35.5813165, \n        \"longitude\": -97.4421952, \n        \"name\": \"FRONTIER CITY \", \n        \"region\": \"OK\"\n      }, \n      \"venue_id\": 6\n    }, \n    {\n      \"artist_album_pairs\": [\n        {\n          \"aa_id\": 268, \n          \"concert_id\": 7, \n          \"id\": 7\n        }\n      ], \n      \"date\": \"2017-07-14\", \n      \"event_link\": \"http://www.bandsintown.com/event/14152274?app_id=boswemianrhapsody&artist=Smash+Mouth&came_from=67\", \n      \"id\": 7, \n      \"name\": \"Smash Mouth\", \n      \"time\": \"19:00:00\", \n      \"venue\": {\n        \"city\": \"Central Point\", \n        \"country\": \"United States\", \n        \"id\": 7, \n        \"latitude\": 42.3798905, \n        \"longitude\": -122.9038373, \n        \"name\": \"Jackson\", \n        \"region\": \"OR\"\n      }, \n      \"venue_id\": 7\n    }, \n    {\n      \"artist_album_pairs\": [\n        {\n          \"aa_id\": 268, \n          \"concert_id\": 8, \n          \"id\": 8\n        }\n      ], \n      \"date\": \"2017-09-15\", \n      \"event_link\": \"http://www.bandsintown.com/event/14199474?app_id=boswemianrhapsody&artist=Smash+Mouth&came_from=67\", \n      \"id\": 8, \n      \"name\": \"Smash Mouth\", \n      \"time\": \"00:00:00\", \n      \"venue\": {\n        \"city\": \"Del Mar\", \n        \"country\": \"United States\", \n        \"id\": 8, \n        \"latitude\": 32.972428, \n        \"longitude\": -117.258067, \n        \"name\": \"KAABOO Del Mar\", \n        \"region\": \"CA\"\n      }, \n      \"venue_id\": 8\n    }, \n    {\n      \"artist_album_pairs\": [\n        {\n          \"aa_id\": 270, \n          \"concert_id\": 9, \n          \"id\": 9\n        }\n      ], \n      \"date\": \"2017-06-02\", \n      \"event_link\": \"http://www.bandsintown.com/event/14246553?app_id=boswemianrhapsody&artist=Bag+Raiders&came_from=67\", \n      \"id\": 9, \n      \"name\": \"Bag Raiders\", \n      \"time\": \"19:00:00\", \n      \"venue\": {\n        \"city\": \"San Diego\", \n        \"country\": \"United States\", \n        \"id\": 9, \n        \"latitude\": 32.715695, \n        \"longitude\": -117.161719, \n        \"name\": \"The Observatory North Park\", \n        \"region\": \"CA\"\n      }, \n      \"venue_id\": 9\n    }\n  ], \n  \"page\": 1, \n  \"total_pages\": 122\n}")});
        // console.log(props);
   }
    
//  componentDidMount() {
//     this.updateGridData();
//  }

    onChange(current, pageSize) {
      console.log('onChange:current=', current);
      console.log('onChange:pageSize=', pageSize);
      console.log(this);
        
//      this.pageChange(current);

      // onChangeListener(this);
      // this.setState({
      //   currentPage: current
      // });
      // this.setState({currentPage: current});
//      this.setState({data: })
    
      /* Using the current, we can change the query to ask for this specific 
      page of results. We can use page size if needed? */
    }
    
    /* Returns parsed JSON object of API results */
    makeAPIcall( call ) {
        var xmlHTTP = new XMLHttpRequest();

//        call = "www.boswemianrhapsody.me" + call;
//        xmlHTTP.open('GET',"https://api-content.dropbox.com/1/files/auto/" + file + "?access_token=" + auth,false);
//        xmlHTTP.overrideMimeType("application/json");
        xmlHTTP.open('GET',call,false);

//        xmlHTTP.setRequestHeader("Access-Control-Allow-Origin","*");
//        xmlHTTP.setRequestHeader("Content-Type","application/json");

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
        
        // console.log(data);

        return data;
    }
    
//    fetchData( url ) {
//        fetch("www.boswemianrhapsody.me/api/artists", {
//          method: "GET",
//          headers: {
//            "Content-Type": "application/json",
//            "Access-Control-Allow-Origin": "http://boswemianrhapsody.me/"
//          }
//        }).then(function(response) {
//          console.log(response.status);
//          console.log(response.text());
////          console.log(response.json());
//          return response.json();
//        }, function(error) {
//          console.log(error.message);
//        })
//    }
//    
//    /* Function that gets the spotlight JSON */
//    makeAPIcallJSON(callback) {
//
//        var xobj = new XMLHttpRequest();
//            xobj.overrideMimeType("application/json");
//        xobj.open('GET', 'www.boswemianrhapsody.me/api/artists', true); // Replace 'my_data' with the path to your file
//        xobj.onreadystatechange = function () {
//              if (xobj.readyState == 4 && xobj.status == "200") {
//                // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
//                console.log(xobj.responseText);
//                callback(xobj.responseText);
//              }
//        };
//        xobj.send(null);
//     }
    
    createGridItemConcert(data) {
//        var artist = this.makeAPIcall("/api/album/" + data.artist_album_pairs[0].aa_id);
        var artist = JSON.parse("{\n  \"albums\": [\n    {\n      \"album_id\": 100, \n      \"artist_id\": 69, \n      \"id\": 100\n    }, \n    {\n      \"album_id\": 101, \n      \"artist_id\": 69, \n      \"id\": 101\n    }\n  ], \n  \"country\": \"England\", \n  \"decade\": \"1960s\", \n  \"genre\": \"Pop\", \n  \"id\": 69, \n  \"image_url\": \"https://i.scdn.co/image/934c57df9fbdbbaa5e93b55994a4cb9571fd2085\", \n  \"name\": \"The Beatles\", \n  \"tracks\": [\n    {\n      \"album_id\": 101, \n      \"artist_id\": 69, \n      \"duration\": 25986, \n      \"explicit\": false, \n      \"genre\": \"Unavailable\", \n      \"id\": 1511, \n      \"name\": \"Her Majesty - Remastered\", \n      \"popularity\": 5, \n      \"preview_url\": \"https://p.scdn.co/mp3-preview/23e262b75073c3dfe735527eaf4aa91eb2e48f2f?cid=null\", \n      \"release_date\": \"1969-09-26\", \n      \"spotify_uri\": \"spotify:track:6UCFZ9ZOFRxK8oak7MdPZu\"\n    }, \n    {\n      \"album_id\": 100, \n      \"artist_id\": 69, \n      \"duration\": 219440, \n      \"explicit\": false, \n      \"genre\": \"Pop\", \n      \"id\": 1494, \n      \"name\": \"The Long And Winding Road - Remastered 2015\", \n      \"popularity\": 48, \n      \"preview_url\": \"https://p.scdn.co/mp3-preview/3a6df1fc4b9605011bff4f7c35fb31ba3ec88dc2?cid=null\", \n      \"release_date\": \"2000-11-13\", \n      \"spotify_uri\": \"spotify:track:5xhP99gVBIkpr7omcdCeiy\"\n    }, \n    {\n      \"album_id\": 101, \n      \"artist_id\": 69, \n      \"duration\": 72640, \n      \"explicit\": false, \n      \"genre\": \"Unavailable\", \n      \"id\": 1506, \n      \"name\": \"Polythene Pam - Remastered\", \n      \"popularity\": 51, \n      \"preview_url\": \"https://p.scdn.co/mp3-preview/87ea6659fd004f4dc9455d1156701eb2302a47c8?cid=null\", \n      \"release_date\": \"1969-09-26\", \n      \"spotify_uri\": \"spotify:track:1FTCA6wQwulQFokDddKE68\"\n    }, \n    {\n      \"album_id\": 101, \n      \"artist_id\": 69, \n      \"duration\": 66533, \n      \"explicit\": false, \n      \"genre\": \"Unavailable\", \n      \"id\": 1505, \n      \"name\": \"Mean Mr Mustard - Remastered\", \n      \"popularity\": 51, \n      \"preview_url\": \"https://p.scdn.co/mp3-preview/01d0284a465ed8c9e7c9a8ec3dcb2a9ccd0ffb8c?cid=null\", \n      \"release_date\": \"1969-09-26\", \n      \"spotify_uri\": \"spotify:track:4JOyMhad5dD81uGYLGgKrS\"\n    }, \n    {\n      \"album_id\": 100, \n      \"artist_id\": 69, \n      \"duration\": 136826, \n      \"explicit\": false, \n      \"genre\": \"Pop\", \n      \"id\": 1487, \n      \"name\": \"Lady Madonna - Remastered 2015\", \n      \"popularity\": 52, \n      \"preview_url\": \"https://p.scdn.co/mp3-preview/4f0b64cf221f7114992e6df3c8835b1146940338?cid=null\", \n      \"release_date\": \"2000-11-13\", \n      \"spotify_uri\": \"spotify:track:1raiIrqaqRAqZmQWZlLuBd\"\n    }, \n    {\n      \"album_id\": 101, \n      \"artist_id\": 69, \n      \"duration\": 141613, \n      \"explicit\": false, \n      \"genre\": \"Unavailable\", \n      \"id\": 1510, \n      \"name\": \"The End - Remastered\", \n      \"popularity\": 52, \n      \"preview_url\": \"https://p.scdn.co/mp3-preview/9e7ddaeac5596534bf1bd0402edfe8180ffd39b0?cid=null\", \n      \"release_date\": \"1969-09-26\", \n      \"spotify_uri\": \"spotify:track:5aHHf6jrqDRb1fcBmue2kn\"\n    }, \n    {\n      \"album_id\": 101, \n      \"artist_id\": 69, \n      \"duration\": 146266, \n      \"explicit\": false, \n      \"genre\": \"Unavailable\", \n      \"id\": 1504, \n      \"name\": \"Sun King - Remastered\", \n      \"popularity\": 52, \n      \"preview_url\": \"https://p.scdn.co/mp3-preview/557051e66827ae0777265d0309d8ddde8eea5297?cid=null\", \n      \"release_date\": \"1969-09-26\", \n      \"spotify_uri\": \"spotify:track:4nwKdZID1ht0lDBJ5h2p87\"\n    }, \n    {\n      \"album_id\": 100, \n      \"artist_id\": 69, \n      \"duration\": 181413, \n      \"explicit\": false, \n      \"genre\": \"Pop\", \n      \"id\": 1491, \n      \"name\": \"Something - Remastered 2015\", \n      \"popularity\": 52, \n      \"preview_url\": \"https://p.scdn.co/mp3-preview/5de6d78267784637c4a0abe6fe3f99394131d031?cid=null\", \n      \"release_date\": \"2000-11-13\", \n      \"spotify_uri\": \"spotify:track:7mzNk14FElnA5DOKQyBrM0\"\n    }, \n    {\n      \"album_id\": 100, \n      \"artist_id\": 69, \n      \"duration\": 258693, \n      \"explicit\": false, \n      \"genre\": \"Pop\", \n      \"id\": 1492, \n      \"name\": \"Come Together - Remastered 2015\", \n      \"popularity\": 52, \n      \"preview_url\": \"https://p.scdn.co/mp3-preview/2195bf07da7aa1ed6ed0027900cffeccd7d7f7c8?cid=null\", \n      \"release_date\": \"2000-11-13\", \n      \"spotify_uri\": \"spotify:track:3CEFDHJSiERlfwRujZ1CkJ\"\n    }, \n    {\n      \"album_id\": 100, \n      \"artist_id\": 69, \n      \"duration\": 179480, \n      \"explicit\": false, \n      \"genre\": \"Pop\", \n      \"id\": 1490, \n      \"name\": \"The Ballad Of John And Yoko - Remastered 2015\", \n      \"popularity\": 52, \n      \"preview_url\": \"https://p.scdn.co/mp3-preview/ebcd8e4c5e5c9837e3cc8bbdb93ce7ca365a8cb1?cid=null\", \n      \"release_date\": \"2000-11-13\", \n      \"spotify_uri\": \"spotify:track:1F7s27lLKshLPt9TPCgMDL\"\n    }, \n    {\n      \"album_id\": 101, \n      \"artist_id\": 69, \n      \"duration\": 118626, \n      \"explicit\": false, \n      \"genre\": \"Unavailable\", \n      \"id\": 1507, \n      \"name\": \"She Came In Through The Bathroom Window - Remastered\", \n      \"popularity\": 53, \n      \"preview_url\": \"https://p.scdn.co/mp3-preview/1a339c343c06eec9cbafbd389d9b02c4cd03e50d?cid=null\", \n      \"release_date\": \"1969-09-26\", \n      \"spotify_uri\": \"spotify:track:2jtUGFsqanQ82zqDlhiKIp\"\n    }, \n    {\n      \"album_id\": 101, \n      \"artist_id\": 69, \n      \"duration\": 242973, \n      \"explicit\": false, \n      \"genre\": \"Unavailable\", \n      \"id\": 1503, \n      \"name\": \"You Never Give Me Your Money - Remastered\", \n      \"popularity\": 53, \n      \"preview_url\": \"https://p.scdn.co/mp3-preview/58d1b4c2116f7a3d5e5598d1d046ee5c3f4e0ce2?cid=null\", \n      \"release_date\": \"1969-09-26\", \n      \"spotify_uri\": \"spotify:track:1jOLTO379yIu9aMnCkpMQl\"\n    }, \n    {\n      \"album_id\": 100, \n      \"artist_id\": 69, \n      \"duration\": 116160, \n      \"explicit\": false, \n      \"genre\": \"Pop\", \n      \"id\": 1469, \n      \"name\": \"From Me To You - Mono / Remastered\", \n      \"popularity\": 53, \n      \"preview_url\": \"https://p.scdn.co/mp3-preview/ee020cf9697bbb808e7ce905ce1fe0f786cd3d90?cid=null\", \n      \"release_date\": \"2000-11-13\", \n      \"spotify_uri\": \"spotify:track:1euKWJfJSfPhgSendPrcXb\"\n    }, \n    {\n      \"album_id\": 100, \n      \"artist_id\": 69, \n      \"duration\": 163320, \n      \"explicit\": false, \n      \"genre\": \"Pop\", \n      \"id\": 1475, \n      \"name\": \"Eight Days A Week - Remastered 2015\", \n      \"popularity\": 53, \n      \"preview_url\": \"https://p.scdn.co/mp3-preview/7a75c419cc028f8268e4b2a0211422b6fa39537b?cid=null\", \n      \"release_date\": \"2000-11-13\", \n      \"spotify_uri\": \"spotify:track:5ylLypaOksxWd75YrGtx2N\"\n    }, \n    {\n      \"album_id\": 100, \n      \"artist_id\": 69, \n      \"duration\": 190120, \n      \"explicit\": false, \n      \"genre\": \"Pop\", \n      \"id\": 1476, \n      \"name\": \"Ticket To Ride - Remastered 2015\", \n      \"popularity\": 53, \n      \"preview_url\": \"https://p.scdn.co/mp3-preview/70bea6b196d56d1c06490e51caf107643b5e022a?cid=null\", \n      \"release_date\": \"2000-11-13\", \n      \"spotify_uri\": \"spotify:track:7nhrlsT1P4qsslp28UA1BI\"\n    }, \n    {\n      \"album_id\": 100, \n      \"artist_id\": 69, \n      \"duration\": 230440, \n      \"explicit\": false, \n      \"genre\": \"Pop\", \n      \"id\": 1493, \n      \"name\": \"Let It Be - Remastered 2015\", \n      \"popularity\": 53, \n      \"preview_url\": \"https://p.scdn.co/mp3-preview/cd2a7eb953cd321b4536774604c742ee416edf84?cid=null\", \n      \"release_date\": \"2000-11-13\", \n      \"spotify_uri\": \"spotify:track:4qsVPnhbvEooD1bSNqvvh0\"\n    }, \n    {\n      \"album_id\": 100, \n      \"artist_id\": 69, \n      \"duration\": 180520, \n      \"explicit\": false, \n      \"genre\": \"Pop\", \n      \"id\": 1484, \n      \"name\": \"Penny Lane - Remastered 2015\", \n      \"popularity\": 53, \n      \"preview_url\": \"https://p.scdn.co/mp3-preview/48c01b4110e1386627149e8b257e8665d4d386b4?cid=null\", \n      \"release_date\": \"2000-11-13\", \n      \"spotify_uri\": \"spotify:track:7afyyi8zn4FzWbcJ70F56V\"\n    }, \n    {\n      \"album_id\": 100, \n      \"artist_id\": 69, \n      \"duration\": 191773, \n      \"explicit\": false, \n      \"genre\": \"Pop\", \n      \"id\": 1489, \n      \"name\": \"Get Back - Remastered 2015\", \n      \"popularity\": 53, \n      \"preview_url\": \"https://p.scdn.co/mp3-preview/4fe80179b6b2de69d9a0289f51271c0a714e2355?cid=null\", \n      \"release_date\": \"2000-11-13\", \n      \"spotify_uri\": \"spotify:track:6zmQ8bzlDIfngjy0Ba3w46\"\n    }, \n    {\n      \"album_id\": 100, \n      \"artist_id\": 69, \n      \"duration\": 207786, \n      \"explicit\": false, \n      \"genre\": \"Pop\", \n      \"id\": 1486, \n      \"name\": \"Hello, Goodbye - Remastered 2015\", \n      \"popularity\": 54, \n      \"preview_url\": \"https://p.scdn.co/mp3-preview/39e68b462fcdd12d1e83b86a77d4b63cb4d6592a?cid=null\", \n      \"release_date\": \"2000-11-13\", \n      \"spotify_uri\": \"spotify:track:0hqjsgWRfMBf2s8xsvRq1M\"\n    }, \n    {\n      \"album_id\": 100, \n      \"artist_id\": 69, \n      \"duration\": 158800, \n      \"explicit\": false, \n      \"genre\": \"Pop\", \n      \"id\": 1482, \n      \"name\": \"Yellow Submarine - Remastered 2015\", \n      \"popularity\": 54, \n      \"preview_url\": \"https://p.scdn.co/mp3-preview/436756271e402f2d29b8290e9777b39bd4e25f3a?cid=null\", \n      \"release_date\": \"2000-11-13\", \n      \"spotify_uri\": \"spotify:track:7zRmGvtSy36Jr19U5OInJT\"\n    }, \n    {\n      \"album_id\": 100, \n      \"artist_id\": 69, \n      \"duration\": 138200, \n      \"explicit\": false, \n      \"genre\": \"Pop\", \n      \"id\": 1481, \n      \"name\": \"Paperback Writer - Remastered 2015\", \n      \"popularity\": 54, \n      \"preview_url\": \"https://p.scdn.co/mp3-preview/e555323db424ffc68d73d6e8d30a6e75cb61b7ec?cid=null\", \n      \"release_date\": \"2000-11-13\", \n      \"spotify_uri\": \"spotify:track:0Ui8KPWZbJJQ2Y0CIQuVqX\"\n    }, \n    {\n      \"album_id\": 101, \n      \"artist_id\": 69, \n      \"duration\": 207920, \n      \"explicit\": false, \n      \"genre\": \"Unavailable\", \n      \"id\": 1497, \n      \"name\": \"Maxwell's Silver Hammer - Remastered\", \n      \"popularity\": 54, \n      \"preview_url\": \"https://p.scdn.co/mp3-preview/787a545c1b2587147953580311df4b7a0e76e524?cid=null\", \n      \"release_date\": \"1969-09-26\", \n      \"spotify_uri\": \"spotify:track:2S8xyNRJX1XQdo3qnTuovI\"\n    }, \n    {\n      \"album_id\": 101, \n      \"artist_id\": 69, \n      \"duration\": 96466, \n      \"explicit\": false, \n      \"genre\": \"Unavailable\", \n      \"id\": 1509, \n      \"name\": \"Carry That Weight - Remastered\", \n      \"popularity\": 54, \n      \"preview_url\": \"https://p.scdn.co/mp3-preview/b589bc66ae65b7b1336c554229fc711a00123e9a?cid=null\", \n      \"release_date\": \"1969-09-26\", \n      \"spotify_uri\": \"spotify:track:5eZrW59C3UgBhkqNlowEID\"\n    }, \n    {\n      \"album_id\": 100, \n      \"artist_id\": 69, \n      \"duration\": 152920, \n      \"explicit\": false, \n      \"genre\": \"Pop\", \n      \"id\": 1473, \n      \"name\": \"A Hard Day's Night - Remastered 2015\", \n      \"popularity\": 54, \n      \"preview_url\": \"https://p.scdn.co/mp3-preview/74d66ae98bcd5e00e6d937b7ae58b7e8ab1d92b5?cid=null\", \n      \"release_date\": \"2000-11-13\", \n      \"spotify_uri\": \"spotify:track:1pctwlBtIcKIjQMzsVcGHB\"\n    }, \n    {\n      \"album_id\": 100, \n      \"artist_id\": 69, \n      \"duration\": 131213, \n      \"explicit\": false, \n      \"genre\": \"Pop\", \n      \"id\": 1472, \n      \"name\": \"Can't Buy Me Love - Remastered 2015\", \n      \"popularity\": 54, \n      \"preview_url\": \"https://p.scdn.co/mp3-preview/7852faddb5d8280ea490b4e19af2d29f36fe6a4e?cid=null\", \n      \"release_date\": \"2000-11-13\", \n      \"spotify_uri\": \"spotify:track:38Vb1J5W5LOs0i7SAF76pa\"\n    }, \n    {\n      \"album_id\": 100, \n      \"artist_id\": 69, \n      \"duration\": 227760, \n      \"explicit\": false, \n      \"genre\": \"Pop\", \n      \"id\": 1485, \n      \"name\": \"All You Need Is Love - Remastered 2015\", \n      \"popularity\": 55, \n      \"preview_url\": \"https://p.scdn.co/mp3-preview/27d90389de76f4349d06e0429d1a403a82892539?cid=null\", \n      \"release_date\": \"2000-11-13\", \n      \"spotify_uri\": \"spotify:track:6KqiVlOLfDzJViJVAPym1p\"\n    }, \n    {\n      \"album_id\": 100, \n      \"artist_id\": 69, \n      \"duration\": 139346, \n      \"explicit\": false, \n      \"genre\": \"Pop\", \n      \"id\": 1474, \n      \"name\": \"I Feel Fine - Remastered 2015\", \n      \"popularity\": 55, \n      \"preview_url\": \"https://p.scdn.co/mp3-preview/9520e00787627a647aacdcf1083720d202e8e2b9?cid=null\", \n      \"release_date\": \"2000-11-13\", \n      \"spotify_uri\": \"spotify:track:5hhF25sWnZvXhimOHLjTRE\"\n    }, \n    {\n      \"album_id\": 100, \n      \"artist_id\": 69, \n      \"duration\": 139240, \n      \"explicit\": false, \n      \"genre\": \"Pop\", \n      \"id\": 1477, \n      \"name\": \"Help! - Remastered 2015\", \n      \"popularity\": 55, \n      \"preview_url\": \"https://p.scdn.co/mp3-preview/46aeed8650533caf77314fe7e46a015516bcaa1a?cid=null\", \n      \"release_date\": \"2000-11-13\", \n      \"spotify_uri\": \"spotify:track:3Smida2eCUsLzDcmZqXEZ3\"\n    }, \n    {\n      \"album_id\": 100, \n      \"artist_id\": 69, \n      \"duration\": 125320, \n      \"explicit\": false, \n      \"genre\": \"Pop\", \n      \"id\": 1478, \n      \"name\": \"Yesterday - Remastered 2015\", \n      \"popularity\": 55, \n      \"preview_url\": \"https://p.scdn.co/mp3-preview/e638596e63c970345ba5e53a346bfcb78d216481?cid=null\", \n      \"release_date\": \"2000-11-13\", \n      \"spotify_uri\": \"spotify:track:4E5rL7YL0hVUPqeMSpjEF2\"\n    }, \n    {\n      \"album_id\": 100, \n      \"artist_id\": 69, \n      \"duration\": 140173, \n      \"explicit\": false, \n      \"genre\": \"Pop\", \n      \"id\": 1468, \n      \"name\": \"Love Me Do - Mono / Remastered\", \n      \"popularity\": 55, \n      \"preview_url\": \"https://p.scdn.co/mp3-preview/afae97f4c5d9519ded075c98a56011b0e8676640?cid=null\", \n      \"release_date\": \"2000-11-13\", \n      \"spotify_uri\": \"spotify:track:4aX3n1Pn6jiCbvqBL8eqyP\"\n    }, \n    {\n      \"album_id\": 101, \n      \"artist_id\": 69, \n      \"duration\": 91760, \n      \"explicit\": false, \n      \"genre\": \"Unavailable\", \n      \"id\": 1508, \n      \"name\": \"Golden Slumbers - Remastered\", \n      \"popularity\": 55, \n      \"preview_url\": \"https://p.scdn.co/mp3-preview/3942f29931224deb0637ff9b4c8705c5bb6befb8?cid=null\", \n      \"release_date\": \"1969-09-26\", \n      \"spotify_uri\": \"spotify:track:01SfTM5nfCou5gQL70r6gs\"\n    }, \n    {\n      \"album_id\": 100, \n      \"artist_id\": 69, \n      \"duration\": 125866, \n      \"explicit\": false, \n      \"genre\": \"Pop\", \n      \"id\": 1483, \n      \"name\": \"Eleanor Rigby - Remastered 2015\", \n      \"popularity\": 56, \n      \"preview_url\": \"https://p.scdn.co/mp3-preview/31f2051d8340e313ef1fa677f33085eef65f7e24?cid=null\", \n      \"release_date\": \"2000-11-13\", \n      \"spotify_uri\": \"spotify:track:0Wv8IXRUDZOfmFJHC1VOFI\"\n    }, \n    {\n      \"album_id\": 101, \n      \"artist_id\": 69, \n      \"duration\": 467320, \n      \"explicit\": false, \n      \"genre\": \"Unavailable\", \n      \"id\": 1500, \n      \"name\": \"I Want You (She's So Heavy) - Remastered\", \n      \"popularity\": 56, \n      \"preview_url\": \"https://p.scdn.co/mp3-preview/819817da335577e25e3f458a6e43e21e3cc4dc29?cid=null\", \n      \"release_date\": \"1969-09-26\", \n      \"spotify_uri\": \"spotify:track:3Z25k4ZF6QENy2d9YatsM5\"\n    }, \n    {\n      \"album_id\": 101, \n      \"artist_id\": 69, \n      \"duration\": 170720, \n      \"explicit\": false, \n      \"genre\": \"Unavailable\", \n      \"id\": 1499, \n      \"name\": \"Octopus's Garden - Remastered\", \n      \"popularity\": 56, \n      \"preview_url\": \"https://p.scdn.co/mp3-preview/d497f6bd6a1f04ab388ade1fb9fd1fec975ba102?cid=null\", \n      \"release_date\": \"1969-09-26\", \n      \"spotify_uri\": \"spotify:track:0suLngfo7rJoetk7Ub6N8l\"\n    }, \n    {\n      \"album_id\": 101, \n      \"artist_id\": 69, \n      \"duration\": 165666, \n      \"explicit\": false, \n      \"genre\": \"Unavailable\", \n      \"id\": 1502, \n      \"name\": \"Because - Remastered\", \n      \"popularity\": 56, \n      \"preview_url\": \"https://p.scdn.co/mp3-preview/7b4b29004dd96e64f5907ea5bc067d9cb0d98ed4?cid=null\", \n      \"release_date\": \"1969-09-26\", \n      \"spotify_uri\": \"spotify:track:1rxoyGj1QuPoVi8fOft1Kt\"\n    }, \n    {\n      \"album_id\": 100, \n      \"artist_id\": 69, \n      \"duration\": 135693, \n      \"explicit\": false, \n      \"genre\": \"Pop\", \n      \"id\": 1480, \n      \"name\": \"We Can Work It Out - Remastered 2015\", \n      \"popularity\": 57, \n      \"preview_url\": \"https://p.scdn.co/mp3-preview/b848ff7f6dc33ffe3e2c489ef8f4555bd22896f4?cid=null\", \n      \"release_date\": \"2000-11-13\", \n      \"spotify_uri\": \"spotify:track:1hTUFqJuQAMjXVGwUPWDqi\"\n    }, \n    {\n      \"album_id\": 101, \n      \"artist_id\": 69, \n      \"duration\": 207240, \n      \"explicit\": false, \n      \"genre\": \"Unavailable\", \n      \"id\": 1498, \n      \"name\": \"Oh! Darling - Remastered\", \n      \"popularity\": 58, \n      \"preview_url\": \"https://p.scdn.co/mp3-preview/370ce7da9ef9a47d066eaedef22a56086b1c0039?cid=null\", \n      \"release_date\": \"1969-09-26\", \n      \"spotify_uri\": \"spotify:track:2mxByJWOajjiVsLWjNXvDJ\"\n    }, \n    {\n      \"album_id\": 100, \n      \"artist_id\": 69, \n      \"duration\": 140920, \n      \"explicit\": false, \n      \"genre\": \"Pop\", \n      \"id\": 1470, \n      \"name\": \"She Loves You - Mono / Remastered\", \n      \"popularity\": 58, \n      \"preview_url\": \"https://p.scdn.co/mp3-preview/413fe2fe350d89e9bead5deb260f763f845cc84d?cid=null\", \n      \"release_date\": \"2000-11-13\", \n      \"spotify_uri\": \"spotify:track:6nEkxYIEnrbYH7h1hJ8Xn6\"\n    }, \n    {\n      \"album_id\": 100, \n      \"artist_id\": 69, \n      \"duration\": 169000, \n      \"explicit\": false, \n      \"genre\": \"Pop\", \n      \"id\": 1479, \n      \"name\": \"Day Tripper - Remastered 2015\", \n      \"popularity\": 58, \n      \"preview_url\": \"https://p.scdn.co/mp3-preview/f0f3594e9dc4e7ab7b649446a228c6ab3e5c96f3?cid=null\", \n      \"release_date\": \"2000-11-13\", \n      \"spotify_uri\": \"spotify:track:29b2b96jozyD9GPCkOrVLs\"\n    }, \n    {\n      \"album_id\": 101, \n      \"artist_id\": 69, \n      \"duration\": 182293, \n      \"explicit\": false, \n      \"genre\": \"Unavailable\", \n      \"id\": 1496, \n      \"name\": \"Something - Remastered\", \n      \"popularity\": 60, \n      \"preview_url\": \"https://p.scdn.co/mp3-preview/c6f693ae5275fa2693450cb3fcbe4321d7bf0f2e?cid=null\", \n      \"release_date\": \"1969-09-26\", \n      \"spotify_uri\": \"spotify:track:0pNeVovbiZHkulpGeOx1Gj\"\n    }, \n    {\n      \"album_id\": 100, \n      \"artist_id\": 69, \n      \"duration\": 145746, \n      \"explicit\": false, \n      \"genre\": \"Pop\", \n      \"id\": 1471, \n      \"name\": \"I Want To Hold Your Hand - Remastered 2015\", \n      \"popularity\": 64, \n      \"preview_url\": \"https://p.scdn.co/mp3-preview/d7e6b26957825e64b3546bd7365b74baa1ce3046?cid=null\", \n      \"release_date\": \"2000-11-13\", \n      \"spotify_uri\": \"spotify:track:4pbG9SUmWIvsROVLF0zF9s\"\n    }, \n    {\n      \"album_id\": 100, \n      \"artist_id\": 69, \n      \"duration\": 425653, \n      \"explicit\": false, \n      \"genre\": \"Pop\", \n      \"id\": 1488, \n      \"name\": \"Hey Jude - Remastered 2015\", \n      \"popularity\": 66, \n      \"preview_url\": \"https://p.scdn.co/mp3-preview/c718fc992246a4b070500515880bed0b517631ab?cid=null\", \n      \"release_date\": \"2000-11-13\", \n      \"spotify_uri\": \"spotify:track:0aym2LBJBk9DAYuHHutrIl\"\n    }, \n    {\n      \"album_id\": 101, \n      \"artist_id\": 69, \n      \"duration\": 259946, \n      \"explicit\": false, \n      \"genre\": \"Unavailable\", \n      \"id\": 1495, \n      \"name\": \"Come Together - Remastered\", \n      \"popularity\": 68, \n      \"preview_url\": \"https://p.scdn.co/mp3-preview/83090a4db6899eaca689ae35f69126dbe65d94c9?cid=null\", \n      \"release_date\": \"1969-09-26\", \n      \"spotify_uri\": \"spotify:track:2EqlS6tkEnglzr7tkKAAYD\"\n    }, \n    {\n      \"album_id\": 101, \n      \"artist_id\": 69, \n      \"duration\": 185733, \n      \"explicit\": false, \n      \"genre\": \"Unavailable\", \n      \"id\": 1501, \n      \"name\": \"Here Comes The Sun - Remastered\", \n      \"popularity\": 71, \n      \"preview_url\": \"https://p.scdn.co/mp3-preview/6902e7da51d2f17e5369d57dadf8ce7d2a123f99?cid=null\", \n      \"release_date\": \"1969-09-26\", \n      \"spotify_uri\": \"spotify:track:6dGnYIeXmHdcikdzNNDMm2\"\n    }\n  ]\n}");
//        var artist = {
//            id: -1,
//            name: 'frontend',
//            image_url: 'http://thedosemusic.com/wp-content/uploads/2016/03/Screen-Shot-2016-03-02-at-1.51.37-PM.png'
//        };
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
                 <h2 className="sweGridItemHeading"><a id={data.id} className="trackModalTgt">{data.name}</a></h2>
                <hr></hr>
                <p className="sweGridItemContent">Artist: <a id={data.artist.id} className="artistModalTgt">{data.artist.name}</a></p>
                <p className="sweGridItemContent">Album: <a id={data.album.id} className="albumModalTgt">{data.album.name}</a></p>
                <p className="sweGridItemContent">Released: {data.release_date}</p>
                <p className="sweGridItemContent">Duration: {(data.duration/1000)} Seconds</p>
                <p className="sweGridItemContent">Popularity: {data.popularity}</p>
                <p className="sweGridItemContent">Genre: {data.genre}</p>
            </div>
        );    
    }
    
    createGridItemAlbum(data) {
        var albumArtist = this.makeAPIcall("/api/artist/" + data.artists[0].artist_id);
//        var albumArtist = {
//            id: 'foo',
//            name: 'bar'
//        };
        return (
            <div key={data.name} className="col-sm-4 col-xs-12 sweGridItem">
                <hr className="sweGridItemSpacer"></hr>
                <div className="clearfix"></div>
                <img className="sweGridImage" src={data.album_cover_url}></img>
                 <h2 className="sweGridItemHeading"><a id={data.id} className="albumModalTgt">{data.name}</a></h2>
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
        
        console.log(data.name + " Size: " + data.tracks.length);
        
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
                <p className="sweGridItemContent">Artist Decades: {data.decade}</p>
            </div>
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
        
        console.log(actual_JSON);
        
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
        
        for (var x in actual_JSON.objects) {
            console.log(x);
            if(x < 3)
                gridItems.push(this.createGridItemConcert(actual_JSON.objects[x]));
            else if(x < 6)
                gridItems2.push(this.createGridItemConcert(actual_JSON.objects[x]));
            else
                gridItems3.push(this.createGridItemConcert(actual_JSON.objects[x]));
          }
        
        /* TRACK */
        
//        for (var x in actual_JSON.objects) {
//            console.log(x);
//            if(x < 3)
//                gridItems.push(this.createGridItemTrack(actual_JSON.objects[x]));
//            else if(x < 6)
//                gridItems2.push(this.createGridItemTrack(actual_JSON.objects[x]));
//            else
//                gridItems3.push(this.createGridItemTrack(actual_JSON.objects[x]));
//          }
        
//        const pagination = this.pagination(1, num_results);
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
                        <h1 className="sweGridTitle">{this.state.gridType + " Table"}</h1>
                    </div>
                </div>
                <SortingForm sortMode={this.state.sortMode} filterMode={this.state.filterMode} onChange={(sortMode, filterMode) => this.makeSortFilter(sortMode, filterMode)}/>
                <div className="row">{gridItems}</div>
                <div className="row">{gridItems2}</div>
                <div className="row">{gridItems3}</div>
                <Pagination pageSize={this.state.pageSize} defaultCurrent={1} current={this.state.currentPage} onChange={this.updateGridData} total={Math.ceil(num_results/9)}/>
            </div>
        );
    }
}


ReactDOM.render(
 <ReactGrid gridType={"concerts"}/>,
 document.getElementById('content')
);