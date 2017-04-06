import React from 'react';
import ReactDOM from 'react-dom';
import Pagination from 'rc-pagination';
// import 'rc-pagination/wassets/index.css';

//var Pagination = require('rc-pagination');
require('rc-pagination/assets/index.css');
export default class ReactGrid extends React.Component {

    onChange(current, pageSize) {
      console.log('onChange:current=', current);
      console.log('onChange:pageSize=', pageSize);
    
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
    
    /* Function that gets the spotlight JSON */
    loadSpotlightJSON(callback) {

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
    
    createGridItemTrack(data) {
        return (
            <div key={data.name} className="col-sm-4 col-xs-12 sweGridItem">
                <hr className="sweGridItemSpacer"></hr>
                <div className="clearfix"></div>
                <img className="sweGridImage" src={data.image_url}></img>
                 <h2 className="sweGridItemHeading"><a>{data.name}</a></h2>
                <hr></hr>
                <p className="sweGridItemContent">Popular Song: <a href="coldplayTrackPage.html">Adventure Of A Lifetime</a></p>
                <p className="sweGridItemContent">Artist Country: {data.country}</p>
                <p className="sweGridItemContent">Artist Decades: {data.decade}</p>
            </div>
        );    
    }
    
    createGridItemArtist(data) {
        //const popularSong = getSongInfo(data.popularSong);
        
//        <h2 className="sweGridItemHeading"><a onClick={() => this.handleClick({data})}>{data.name}</a></h2>
        
        return (
            <div key={data.name} className="col-sm-4 col-xs-12 sweGridItem">
                <hr className="sweGridItemSpacer"></hr>
                <div className="clearfix"></div>
                <img className="sweGridImage" src={data.image_url}></img>
                 <h2 className="sweGridItemHeading"><a>{data.name}</a></h2>
                <hr></hr>
                <p className="sweGridItemContent">Popular Song: <a href="coldplayTrackPage.html">Adventure Of A Lifetime</a></p>
                <p className="sweGridItemContent">Artist Country: {data.country}</p>
                <p className="sweGridItemContent">Artist Decades: {data.decade}</p>
            </div>
        );    
    }
    
    pagination() {
//        const getTotal = this.getTotal();
        return (
            <Pagination className="swePagination" defaultPageSize={9} defaultCurrent={9} total={27}/>
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
        
        var actual_JSON = JSON.parse('{"Artists": [{ "name": "Hans Zimmer","image_url": "https://i.scdn.co/image/14657235e8724181f8b32c6bfa54cdbf86d70852","country": "Germany","decade": "1980s / 1990s / 2000s / 1970s / 2010s","genre": "Soundtracks"}]}');
        
        for (var x in actual_JSON.Artists) {
            console.log(actual_JSON.Artists[x]);
            gridItems.push(this.createGridItemArtist(actual_JSON.Artists[x]));
          }
        
//        gridItems.push(this.createGridItem(actual_JSON[x]));
        
//        const length = 9;
//        var gridItems = [];
//        
//        for (var i = 0; i < links.length; i++) {
//            gridItems.push(this.createGridItem(jsonData[i]));
//        }
        
        console.log("Lookit: griditems: " + gridItems.length);
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
                <div className="row">{gridItems}</div>
                <Pagination defaultPageSize={9} onShowSizeChange={this.onShowSizeChange} onChange={this.onChange}defaultCurrent={9} total={27}/>
            </div>
        );
    }
}


ReactDOM.render(
 <ReactGrid/>,
 document.getElementById('content')
);