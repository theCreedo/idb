//var filterbarComponent = React.createClass({
//    render: function(){
//        return (
//            <div className="col-xs-12">
//                    <div className="btn-group">
//                      <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//                        Sort <span className="caret"></span>
//                      </button>
//                      <ul className="dropdown-menu sweSortDropdown">
//                          <li className="disabled"><a href="#">A to Z</a></li>
//                          <li className="disabled"><a href="#">Z to A</a></li>
//                      </ul>
//                    </div>
//                    <div className="btn-group">
//                      <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//                        Filter <span className="caret"></span>
//                      </button>
//                      <ul className="dropdown-menu sweSortDropdown">
//                          <li className="disabled"><a href="#">Artist Name</a></li>
//                          <li className="disabled"><a href="#">Country</a></li>
//                          <li className="disabled"><a href="#">Decade</a></li>
//                      </ul>
//                    </div>
//            </div>
//        );
//    }
//});

//class DynamicLink extends React.Component {    
//    constructor(a, b){
//        super();
//        this.props.name = a;
//        this.props.title = b;
//    }
//    
//    render() {
//        name = this.name;
//        title = this.title;
//        return (
//            <a onClick={handleClick({name})}>{title}</a>
//        );    
//    }
//}

class ReactGrid extends React.Component {
    
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
    
    createGridItem(data) {
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
                <p className="sweGridItemContent">Artist Decades: {data.decades}</p>
            </div>
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
            gridItems.push(this.createGridItem(actual_JSON.Artists[x]));
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
            <div className="row">{gridItems}</div>
        );
    }
}

//class FilterBar extends React.Component {
//
//    handleClick(type) {
//        console.log(type);
//    }
//    
//    createDynamicLink (i, name, title) {
//        const stringOfName = name.toString();
//        return (<li key={i}><a key={title} onClick={() => this.handleClick({stringOfName})}>{title}</a></li>);
//    }
//    
//    render() {
//        const links = ['artist', 'country', 'decade'];
//        const titles = ['Artist Name', 'Country', 'decade'];
//        var dynamicLinks = [];
//        for (var i = 0; i < links.length; i++) {
//            dynamicLinks.push(this.createDynamicLink(i, links[i], titles[i]));
//        }
//        
//        const az = 'az';
//        
//        return (
//            <div className="col-xs-12">
//                    <div className="btn-group">
//                      <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//                        Sort <span className="caret"></span>
//                      </button>
//                      <ul className="dropdown-menu sweSortDropdown">
//                          <li className=""><a onClick={() => this.handleClick({az})}>A to Z</a></li>
//                          <li className=""><a onClick={() => this.handleClick('za')}>Z to A</a></li>
//                      </ul>
//                    </div>
//                    <div className="btn-group">
//                      <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//                        Filter <span className="caret"></span>
//                      </button>
//                      <ul className="dropdown-menu sweSortDropdown">
//                          {dynamicLinks}
//                      </ul>
//                    </div>
//            </div>
//        );
//    }
//}


ReactDOM.render(
  <ReactGrid/>,
  document.getElementById('reactGridTgt')
);