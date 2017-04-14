import React from 'react';
import ReactDOM from 'react-dom';
import Autocomplete from 'react-autocomplete';

const styles = {
  item: {
    padding: '2px 6px',
    cursor: 'default'
  },

  highlightedItem: {
    color: 'white',
    background: 'hsl(200, 50%, 50%)',
    padding: '2px 6px',
    cursor: 'default'
  },

  menu: {
    border: 'solid 1px #ccc'
  }
}

/* Some fuctions borrowed from react-autocomplete github repo */
export default class SWEAutocomplete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterString: this.props.filterString
        }
    }
    
    countryFilters() {
        return ([{name:'Australia'}, {name:'Austria'}, {name:'Barbados'}, {name:'Brazil'}, {name:'Canada'}, {name:'Croatia'}, {name:'England'}, {name:'France'}, {name:'Germany'}, {name:'Ireland'}, {name:'Italy'}, {name:'New Zealand'}, {name:'Norway'}, {name:'Scotland'}, {name:'Sweden'}, {name:'United Kingdom'}, {name:'United States'}]);
    }
    
    sortFilters (a, b, value) {
      const aLower = a.name.toLowerCase();
      const bLower = b.name.toLowerCase();
      const valueLower = value.toLowerCase();
      const queryPosA = aLower.indexOf(valueLower);
      const queryPosB = bLower.indexOf(valueLower);
      if (queryPosA !== queryPosB) {
        return queryPosA - queryPosB;
      }
      return aLower < bLower ? -1 : 1;
    }
    
    matchFilterToTerm (filter, value) {
      return (
        filter.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
      );
    }
    
    changeValue(value) {
        //alert("Updated value. Selected " + value);
        this.setState({filterString: value});
        this.props.onChange(value);
    }
    
    render() {
        var inputItems = this.countryFilters();
        
        return (
            <Autocomplete
                value={this.state.filterString}
                inputProps={{name: "filter type", id: "filter-type"}}
                items={inputItems}
                getItemValue={(item) => item.name}
                shouldItemRender={this.matchFilterToTerm}
                sortItems={this.sortFilters}
                onChange={(event, value) => this.changeValue(value)}
                onSelect={(event, value) => this.changeValue(value.name)}
                renderItem={
                    (item, isHighlighted) => (
                        <div style={isHighlighted ? styles.highlightedItem : styles.item} key={item.name}>{item.name}</div>
                )}
                />
        );
    }
}