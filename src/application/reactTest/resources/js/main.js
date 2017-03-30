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

class FilterBar extends React.Component {

    handleClick(type) {
        console.log(type);
    }
    
    createDynamicLink (i, name, title) {
        const stringOfName = name.toString();
        return (<li key={i}><a key={title} onClick={() => this.handleClick({stringOfName})}>{title}</a></li>);
    }
    
    render() {
        const links = ['artist', 'country', 'decade'];
        const titles = ['Artist Name', 'Country', 'decade'];
        var dynamicLinks = [];
        for (var i = 0; i < links.length; i++) {
            dynamicLinks.push(this.createDynamicLink(i, links[i], titles[i]));
        }
        
        const az = 'az';
        
        return (
            <div className="col-xs-12">
                    <div className="btn-group">
                      <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Sort <span className="caret"></span>
                      </button>
                      <ul className="dropdown-menu sweSortDropdown">
                          <li className=""><a onClick={() => this.handleClick({az})}>A to Z</a></li>
                          <li className=""><a onClick={() => this.handleClick('za')}>Z to A</a></li>
                      </ul>
                    </div>
                    <div className="btn-group">
                      <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Filter <span className="caret"></span>
                      </button>
                      <ul className="dropdown-menu sweSortDropdown">
                          {dynamicLinks}
                      </ul>
                    </div>
            </div>
        );
    }
}


ReactDOM.render(
  <FilterBar/>,
  document.getElementById('artistReactTgt')
);