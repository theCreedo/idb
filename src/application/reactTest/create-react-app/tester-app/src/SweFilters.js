import React from 'react';
import ReactDOM from 'react-dom';
import Autocomplete from 'react-autocomplete';

const styles = {
  item: {
    padding: '2px 6px',
    cursor: 'default',
    background: 'grey',
    zIndex: '2'
  },

  highlightedItem: {
    color: 'white',
    background: 'hsl(200, 50%, 50%)',
    padding: '2px 6px',
    cursor: 'default'
  },

  menu: {
    border: 'solid 1px #ccc',
    position: 'absolute',
    maxHeight: '20%',
    overflow: 'auto',
    zIndex: '2'
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
    
    genreFilters() {
        return ([{name:'Alternative/Indie'}, {name:'Christian/Gospel'}, {name:'Classical/Opera'}, {name:'Country'}, {name:'Electronica/Dance'}, {name:'Jazz'}, {name:'Latin'}, {name:'Pop'}, {name:'Rap/Hip Hop'}, {name:'Rock'}, {name:'Soul/R&B'}, {name:'Soundtracks'}]);
    }
    
    labelFilters() {
        return ([{name: '19 Recordings Limited / Arista Nashville'}, {name: '222 Records/Interscope'}, {name: '4AD'}, {name: 'Alternative'}, {name: 'A&M'}, {name: 'A&M / Octone Records'}, {name: 'Arista'}, {name: 'Aspire Music Group LLC'}, {name: 'Ate a Star'}, {name: 'Atlantic Records'}, {name: 'Atlantic Records/ATG'}, {name: 'Atlantic Records UK'}, {name: 'Big Eye Music'}, {name: 'Bigshig Music'}, {name: 'BOC Records'}, {name: 'Bulldog Brothers'}, {name: 'Calderstone'}, {name: 'Canvasback/ATL'}, {name: 'Capitol Records'}, {name: 'Capitol Records Nashville'}, {name: 'Cash Money Records Inc.'}, {name: 'Cash Money Records/Motown Records'}, {name: 'Cash Money Records/Young Money Ent./Universal Records'}, {name: 'Columbia'}, {name: 'Columbia/Legacy'}, {name: 'CP Records'}, {name: 'CP Records Inc.'}, {name: 'Cult Hero Records'}, {name: 'Daptone Records'}, {name: 'Decaydance/Fueled By Ramen'}, {name: 'Def Jam Records'}, {name: 'Descendant Records'}, {name: 'Digital Distribution Trinidad and Tobago'}, {name: 'DigSin, LLC'}, {name: 'Disruptor Records/Columbia'}, {name: 'Domino Recording Co'}, {name: 'Downtown Music LLC. Downtown Records is a trademark of Downtown Music LLC'}, {name: 'Downtown Records - Catalog'}, {name: 'Down Up Down Music'}, {name: 'Elektra (NEK)'}, {name: 'EMI'}, {name: 'EMI Catalogue'}, {name: 'EMI Marketing'}, {name: 'Epic'}, {name: 'Epic/Legacy'}, {name: 'Epic/MJJ'}, {name: 'Epic/Phonogenic'}, {name: 'Epic Soundtrax'}, {name: 'F-Stop Records/Atlantic'}, {name: 'Fueled By Ramen'}, {name: 'Geffen'}, {name: 'Glacial Pace'}, {name: 'Glassnote'}, {name: 'Glassnote Entertainment Group'}, {name: 'Glassnote Records'}, {name: 'Green Hill (CHP)'}, {name: 'Hollywood Records'}, {name: 'Hollywood Records Inc.'}, {name: 'Humphead Records'}, {name: 'Interscope'}, {name: 'Interscope Records'}, {name: 'Island Records'}, {name: 'Iso/Columbia'}, {name: 'Jive'}, {name: 'Joseph Jonas/Republic Records'}, {name: 'J Records'}, {name: 'La-La Land Records'}, {name: 'Lava Music / Republic Records'}, {name: 'Longhorn Music'}, {name: 'Macklemore'}, {name: 'Marathon Media International Ltd.'}, {name: 'Marcophon'}, {name: 'Masterworks'}, {name: 'Mercury'}, {name: 'Mercury Records'}, {name: 'Modular'}, {name: 'Mr.305/Polo Grounds Music/RCA Records'}, {name: 'Mr Bongo'}, {name: 'Music World Music/Columbia'}, {name: 'Naxos'}, {name: 'Nettwerk Records'}, {name: 'New Rounder'}, {name: 'New West Records'}, {name: 'Nonesuch'}, {name: 'Parkwood Entertainment/Columbia'}, {name: 'Parlophone France'}, {name: 'Parlophone UK'}, {name: 'RCA/Legacy'}, {name: 'RCA Records Label'}, {name: 'RCA Victor'}, {name: 'RCR'}, {name: 'Reprise/WaterTower'}, {name: 'Rhino'}, {name: 'Rhino Atlantic'}, {name: 'Rhino/Warner Bros.'}, {name: 'Roc-A-Fella'}, {name: 'Roc-a-Fella Records'}, {name: 'Rock The World/IDJ/Kanye LP7'}, {name: 'Royal Philharmonic Orchestra'}, {name: 'S-Curve'}, {name: 'Shorthand Records'}, {name: 'Shorthand Records, LLC'}, {name: 'Shout! Factory Records'}, {name: 'Simply Media TV Ltd'}, {name: 'Sony BMG Music UK'}, {name: 'Sony Classical'}, {name: 'Sony Urban Music/Columbia'}, {name: 'Southern Ground/Atlantic'}, {name: 'ST2'}, {name: 'StarTime International/Columbia'}, {name: 'Strategic Marketing'}, {name: 'Streamline/Interscope Records'}, {name: 'Streamline/Kon Live/Interscope'}, {name: 'Sub Pop Records'}, {name: 'Sumthing Else Music Works'}, {name: 'Temporary Residence Ltd.'}, {name: 'Top Dawg / Aftermath / Interscope'}, {name: 'Top Dawg Entertainment / Aftermath Records / Interscope Records'}, {name: 'Top Dawg Entertainment/Aftermath Records/ Interscope Records'}, {name: 'Top Dawg Entertainment/Aftermath Records/Interscope Records'}, {name: 'Universal Classics & Jazz'}, {name: 'Universal/Island Def Jam'}, {name: 'Universal Music'}, {name: 'Universal Music Canada'}, {name: 'Universal Music Group'}, {name: 'Universal Records'}, {name: 'Universal Republic Records'}, {name: 'Universal Special Markets'}, {name: 'Universal Strategic Marketing'}, {name: 'UNIVERSAL (UC)'}, {name: 'Vanner Records/RCA Records Label Nashville'}, {name: 'Varese Sarabande'}, {name: 'Virgin'}, {name: 'Walt Disney Records'}, {name: 'Warner Bros.'}, {name: 'WaterTower Music'}, {name: 'Windstar Productions'}, {name: 'Wolf Tone'}, {name: 'XL Recordings'}, {name: 'XL Recordings/Columbia'}, {name: 'Zac Brown'}]);
    }
    
    cityFilters() {
        return ([{name: 'Abrera'}, {name: 'Adelaide'}, {name: 'Agoura Hills'}, {name: 'Albany'}, {name: 'Albuquerque'}, {name: 'Allentown'}, {name: 'Allston'}, {name: 'Alma'}, {name: 'Alpharetta'}, {name: 'Amagansett'}, {name: 'Ames'}, {name: 'Amsterdam'}, {name: 'Amsterdam-Zuidoost'}, {name: 'Anaheim'}, {name: 'Anchorage'}, {name: 'Ancona'}, {name: 'Ann Arbor'}, {name: 'Antwerp'}, {name: 'Antwerpen'}, {name: 'Arlington'}, {name: 'Arnhem'}, {name: 'Arras'}, {name: 'Asbury Park'}, {name: 'Asheville'}, {name: 'Aspen'}, {name: 'Athens'}, {name: 'Atlanta'}, {name: 'Atlantic City'}, {name: 'Auburn'}, {name: 'Auckland'}, {name: 'Austin'}, {name: 'Baden-Baden'}, {name: 'Baltimore'}, {name: 'Bangor'}, {name: 'Barcelona'}, {name: 'Belfast'}, {name: 'Belo Horizonte'}, {name: 'Benicassim'}, {name: 'Bentonville'}, {name: 'Bergen'}, {name: 'Berkeley'}, {name: 'Berlin'}, {name: 'Berne'}, {name: 'Bethel'}, {name: 'Beverly Hills'}, {name: 'Biddinghuizen'}, {name: 'Billings'}, {name: 'Birmingham'}, {name: 'Bloemendaal'}, {name: 'Boca Raton'}, {name: 'Bogotá'}, {name: 'Boise'}, {name: 'Bologna Bo'}, {name: 'Bonner Springs'}, {name: 'Boondall'}, {name: 'Bordeaux'}, {name: 'Boston'}, {name: 'Bratislava'}, {name: 'Brecon'}, {name: 'Bridgeport'}, {name: 'Bridlington'}, {name: 'Brighton'}, {name: 'Bristol'}, {name: 'Bristow'}, {name: 'Brooklyn'}, {name: 'Brookville'}, {name: 'Brossard'}, {name: 'Brownsville'}, {name: 'Brussels'}, {name: 'Budapest'}, {name: 'Buenos Aires'}, {name: 'Buffalo'}, {name: 'Burgettstown'}, {name: 'Burgos'}, {name: 'Burlington'}, {name: 'Byron Bay'}, {name: 'Cadott'}, {name: 'Calgary'}, {name: 'Cambridge'}, {name: 'Camden'}, {name: 'Canandaigua'}, {name: 'Cardiff'}, {name: 'Carhaix-Plouguer'}, {name: 'Carrboro'}, {name: 'Carrollton'}, {name: 'Cary'}, {name: 'Cavendish'}, {name: 'Cedar Rapids'}, {name: 'Central Point'}, {name: 'Charleston'}, {name: 'Charlotte'}, {name: 'Charlottesville'}, {name: 'Cheyenne'}, {name: 'Chibougamau'}, {name: 'Chicago'}, {name: 'Chula Vista'}, {name: 'Cincinnati'}, {name: 'Clearwater'}, {name: 'Cleveland'}, {name: 'Clifton Park'}, {name: 'Cluj'}, {name: 'Cologne'}, {name: 'Colorado Springs'}, {name: 'Columbia'}, {name: 'Columbus'}, {name: 'Concord'}, {name: 'Cooperstown'}, {name: 'Copenhagen'}, {name: 'Cork'}, {name: 'Costa Mesa'}, {name: 'Council Bluffs'}, {name: 'Cowansville'}, {name: 'Curitiba'}, {name: 'Cuyahoga Falls'}, {name: 'Dallas'}, {name: 'Daresbury'}, {name: 'Darien Center'}, {name: 'Darling Harbour'}, {name: 'Darmstadt'}, {name: 'Daytona Beach'}, {name: 'DÉcines Charpieu'}, {name: 'Del Mar'}, {name: 'Del Valle'}, {name: 'Denver'}, {name: 'Des Moines'}, {name: 'Detroit'}, {name: 'Detroit Lakes'}, {name: 'Distrito De Lima'}, {name: 'Dover'}, {name: 'Driftwood'}, {name: 'Drummondville'}, {name: 'Dübendorf'}, {name: 'Dublin'}, {name: 'Duluth'}, {name: 'Dundee'}, {name: 'Durant'}, {name: 'East Molesey'}, {name: 'East Rutherford'}, {name: 'Eastwood'}, {name: 'Eau Claire'}, {name: 'Edmonton'}, {name: 'Effingham'}, {name: 'Endicott'}, {name: 'Englewood'}, {name: 'Enniskillen'}, {name: 'Esch-Sur-Alzette'}, {name: 'Eugene'}, {name: 'Fairfield'}, {name: 'Fargo'}, {name: 'Ferrara'}, {name: 'Feyzin'}, {name: 'Fishers'}, {name: 'Flagstaff'}, {name: 'Florence'}, {name: 'Forest Hills'}, {name: 'Fort Collins'}, {name: 'Fort Madison'}, {name: 'Foxborough'}, {name: 'Frankfurt'}, {name: 'Frankfurt Am Main'}, {name: 'Franklin'}, {name: 'Frauenfeld'}, {name: 'Frederiksberg'}, {name: 'Freiburg'}, {name: 'Fresno'}, {name: 'Frisco'}, {name: 'Ft Lauderdale'}, {name: 'Galway'}, {name: 'Gaspé'}, {name: 'Gateshead'}, {name: 'Gdansk'}, {name: 'George'}, {name: 'Gilford'}, {name: 'Glasgow'}, {name: 'Glen Allen'}, {name: 'Glendale'}, {name: 'Gloucestershire'}, {name: 'Goteborg'}, {name: 'Göteborg'}, {name: 'Gräfenhainichen'}, {name: 'Grand Island'}, {name: 'Grand Rapids'}, {name: 'Greenville'}, {name: 'Guatemala City'}, {name: 'Gulf Shores'}, {name: 'Hamburg'}, {name: 'Hampton'}, {name: 'Hampton Beach'}, {name: 'Hannover'}, {name: 'Harrington'}, {name: 'Hartford'}, {name: 'Hasselt'}, {name: 'Hatfield'}, {name: 'Helsinki'}, {name: 'Hershey'}, {name: 'Highland Park'}, {name: 'Hilvarenbeek'}, {name: 'Hiroshima'}, {name: 'Holmdel'}, {name: 'Honolulu'}, {name: 'Hot Springs'}, {name: 'Houston'}, {name: 'Hunter'}, {name: 'Huntington Beach'}, {name: 'Indianapolis'}, {name: 'Indio'}, {name: 'Inglewood'}, {name: 'Irving'}, {name: 'Ithaca'}, {name: 'Ivins'}, {name: 'Jacksonville'}, {name: 'Joliette'}, {name: 'Kansas City'}, {name: 'Kaslo'}, {name: 'Kelowna'}, {name: 'Kent'}, {name: 'Kiev'}, {name: 'Kinder'}, {name: 'Knoxville'}, {name: 'København S'}, {name: 'Koln'}, {name: 'Köln'}, {name: 'Kortrijk'}, {name: 'Krakow'}, {name: 'Kristiansand'}, {name: 'Lake Charles'}, {name: 'Landover'}, {name: 'La Plata'}, {name: 'Laramie'}, {name: 'Las Vegas'}, {name: 'Lausanne'}, {name: 'Lebel-Sur-Quévillon'}, {name: 'Ledyard'}, {name: 'Leeds'}, {name: 'Leipzig'}, {name: 'Lille'}, {name: 'Lima'}, {name: 'Limerick City'}, {name: 'Lincoln'}, {name: 'Lisbon'}, {name: 'Little Rock'}, {name: 'Littleton'}, {name: 'Liverpool'}, {name: 'Lodz'}, {name: 'London'}, {name: 'Long Beach'}, {name: 'Los Angeles'}, {name: 'Louisville'}, {name: 'Lucca'}, {name: 'Lucerne'}, {name: 'Lynchburg'}, {name: 'Lynn'}, {name: 'Macclesfield'}, {name: 'Madison'}, {name: 'Madrid'}, {name: 'Makati'}, {name: 'Manchester'}, {name: 'Mansfield'}, {name: 'Margate Kent'}, {name: 'Marseille'}, {name: 'Maryland Heights'}, {name: 'Mashantucket'}, {name: 'Maya'}, {name: 'Mayer'}, {name: 'Melbourne'}, {name: 'Memphis'}, {name: 'Merrillville'}, {name: 'Mescalero'}, {name: 'México'}, {name: 'Miami'}, {name: 'Miami Beach'}, {name: 'Milan'}, {name: 'Milano'}, {name: 'Millvale'}, {name: 'Milwaukee'}, {name: 'Minden'}, {name: 'Minneapolis'}, {name: 'Missoula'}, {name: 'Miyagi'}, {name: 'Moline'}, {name: 'Monaco'}, {name: 'Moncton'}, {name: 'Monroe'}, {name: 'Monterrey'}, {name: 'Montreal'}, {name: 'Montréal'}, {name: 'Montreux'}, {name: 'Moore Park'}, {name: 'Morgantown'}, {name: 'Morrison'}, {name: 'Moscow'}, {name: 'Moskva'}, {name: 'Mountain Home'}, {name: 'Mountain View'}, {name: 'Mount Pleasant'}, {name: 'Mukawa'}, {name: 'München'}, {name: 'Munich'}, {name: 'Murphys'}, {name: 'Myrtle Beach'}, {name: 'Nampa'}, {name: 'Nantes'}, {name: 'Napa'}, {name: 'Naperville'}, {name: 'Nashville'}, {name: 'Nassau'}, {name: 'Neuhausen Ob Eck'}, {name: 'Newark'}, {name: 'New Bedford'}, {name: 'New Braunfels'}, {name: 'New Brunswick'}, {name: 'Newcastle'}, {name: 'New Haven'}, {name: 'New Orleans'}, {name: 'Newport'}, {name: 'Newquay'}, {name: 'New York'}, {name: 'Niagara Falls'}, {name: 'Nice'}, {name: 'Nimes'}, {name: 'Norfolk'}, {name: 'Norman Township'}, {name: 'Norrköping'}, {name: 'North Charleston'}, {name: 'Northfield'}, {name: 'Northwich'}, {name: 'Nottingham'}, {name: 'Novelty'}, {name: 'Nr Pickering Nth Yor'}, {name: 'Nyon'}, {name: 'Oakland'}, {name: 'Odemira'}, {name: 'Odense'}, {name: 'Oeiras'}, {name: 'Okazaki'}, {name: 'Oklahoma City'}, {name: 'Omaha'}, {name: 'Opfikon'}, {name: 'Orange Beach'}, {name: 'Orlando'}, {name: 'Oro-Medonte'}, {name: 'Osaka'}, {name: 'Oslo'}, {name: 'Ostend'}, {name: 'Ostrava'}, {name: 'Ottawa'}, {name: 'Pala'}, {name: 'Pamplona'}, {name: 'Panama City'}, {name: 'Panama City Beach'}, {name: 'Papillion'}, {name: 'Paris'}, {name: 'Park City'}, {name: 'Pasadena'}, {name: 'Paso Robles'}, {name: 'Peachtree City'}, {name: 'Pendleton'}, {name: 'Pensacola'}, {name: 'Peoria'}, {name: 'Perth'}, {name: 'Philadelphia'}, {name: 'Phoenix'}, {name: 'Piazzola Sul Brenta'}, {name: 'Pilton'}, {name: 'Pioneertown'}, {name: 'Pistoia'}, {name: 'Pittsburgh'}, {name: 'Pleasanton'}, {name: 'Pomona'}, {name: 'Pompano Beach'}, {name: 'Ponte Vedra Beach'}, {name: 'Poole'}, {name: 'Port Chester'}, {name: 'Portland'}, {name: 'Porto'}, {name: 'Prague'}, {name: 'Prince George'}, {name: 'Providence'}, {name: 'Pula'}, {name: 'Punta Cana'}, {name: 'Puyallup'}, {name: 'Quebec'}, {name: 'Québec'}, {name: 'Quebec City'}, {name: 'Raleigh'}, {name: 'Rathfarnham'}, {name: 'Reading'}, {name: 'Regina'}, {name: 'Reno'}, {name: 'Richardson'}, {name: 'Richmond'}, {name: 'Ridgefield'}, {name: 'Rimouski'}, {name: 'Rio De Janeiro'}, {name: 'Riviere-Du-Loup'}, {name: 'Robinsonville'}, {name: 'Rochester Hills'}, {name: 'Rocky Mount'}, {name: 'Rogers'}, {name: 'Roma'}, {name: 'Rome'}, {name: 'Roskilde'}, {name: 'Rotselaar'}, {name: 'Rotterdam'}, {name: 'Rouen'}, {name: 'Rouyn-Noranda'}, {name: 'Rugeley'}, {name: 'Sacramento'}, {name: 'Saint Charles'}, {name: 'Saint-Denis'}, {name: 'Saint Louis'}, {name: 'Saint Paul'}, {name: 'Saint-Père'}, {name: 'Saint Petersburg'}, {name: 'Salacgriva'}, {name: 'Salt Lake City'}, {name: 'San Antonio'}, {name: 'San Bernardino'}, {name: 'San Diego'}, {name: 'San Francisco'}, {name: 'San Jose'}, {name: 'San Juan'}, {name: 'San Mateo'}, {name: 'Santa Barbara'}, {name: 'Santa Clara'}, {name: 'Santa Rosa'}, {name: 'Santiago'}, {name: 'Sao Paulo'}, {name: 'Sapporo'}, {name: 'Saratoga'}, {name: 'Saratoga Springs'}, {name: 'Saskatoon'}, {name: 'Scheessel'}, {name: 'Scranton'}, {name: 'Seattle'}, {name: 'Seoul'}, {name: 'Sept-Îles'}, {name: 'Sheffield'}, {name: 'Shelburne'}, {name: 'Sioux Falls'}, {name: 'Snoqualmie'}, {name: 'Soacha'}, {name: 'Solana Beach'}, {name: 'Southampton'}, {name: 'Southwold'}, {name: 'Spokane'}, {name: 'Stateline'}, {name: 'St Augustine'}, {name: 'Stavroupoli'}, {name: 'Ste-Agathe-Des-Monts'}, {name: 'Sterling Heights'}, {name: 'St-Eustache'}, {name: 'St. Gallen'}, {name: 'St Louis'}, {name: 'Stockholm'}, {name: 'St Paul'}, {name: 'St. Petersburg'}, {name: 'St Polten'}, {name: 'Stradbally'}, {name: 'Strasbourg'}, {name: 'Stuttgart'}, {name: 'Suffolk'}, {name: 'Sunrise'}, {name: 'Surrey'}, {name: 'Sydney'}, {name: 'Syracuse'}, {name: 'Tacoma'}, {name: 'Tallahassee'}, {name: 'Tallinn'}, {name: 'Tampa'}, {name: 'Taylorsville'}, {name: 'Tel Aviv'}, {name: 'Tel Aviv-Yafo'}, {name: 'Telluride'}, {name: 'Thetford'}, {name: 'The Woodlands'}, {name: 'Thornville'}, {name: 'Tilburg'}, {name: 'Tlajomulco De Zúñiga'}, {name: 'Tokyo'}, {name: 'Toronto'}, {name: 'Toulouse'}, {name: 'Traverse City'}, {name: 'Trenčín'}, {name: 'Trondheim'}, {name: 'Tucson'}, {name: 'Tulsa'}, {name: 'Turin To'}, {name: 'Tuscaloosa'}, {name: 'Twickenham'}, {name: 'Tyagarah'}, {name: 'Uncasville'}, {name: 'University Park'}, {name: 'Utrecht'}, {name: 'Val-D’Or'}, {name: 'Valetta'}, {name: 'Valley Center'}, {name: 'Vancouver'}, {name: 'Van Wert'}, {name: 'Verona Vr'}, {name: 'Vienna'}, {name: 'Vienne'}, {name: 'Village Of Clarkston'}, {name: "Villeneuve-D'ascq"}, {name: 'Villeurbanne'}, {name: 'Vilnius'}, {name: 'Virginia Beach'}, {name: 'Viseu'}, {name: 'Wallingford'}, {name: 'Wantagh'}, {name: 'Warsaw'}, {name: 'Warszawa'}, {name: 'Washington'}, {name: 'Wellington'}, {name: 'Werchter'}, {name: 'West Hollywood'}, {name: 'West Palm Beach'}, {name: 'Westport'}, {name: 'West Valley City'}, {name: 'Wheatland'}, {name: 'Whistler'}, {name: 'Whitehouse Station'}, {name: 'Wien'}, {name: 'Wiesen'}, {name: 'Wilkesboro'}, {name: 'Wilmington'}, {name: 'Winnipeg'}, {name: 'Woodinville'}, {name: 'Yuzawa'}, {name: 'Yuzawa-Machi'}, {name: 'Zagreb'}, {name: 'Zurich'}]);
    }
    
    artistFilters() {
        return ([{name: '2Cellos'}, {name: 'ABBA'}, {name: 'Adele'}, {name: 'a-ha'}, {name: 'Alan Silvestri'}, {name: 'Alicia Keys'}, {name: 'alt-J'}, {name: 'Amy Winehouse'}, {name: 'Arctic Monkeys'}, {name: 'Bag Raiders'}, {name: 'Bedřich Smetana'}, {name: 'Beyoncé'}, {name: 'Bill Conti'}, {name: 'Blake Shelton'}, {name: 'Bobby Bazini'}, {name: 'Bon Jovi'}, {name: 'Brass Band Berner Oberland'}, {name: 'Brass Band Fröschl Hall'}, {name: 'Britney Spears'}, {name: 'Bronze Radio Return'}, {name: 'Bruce Springsteen'}, {name: 'Carrie Underwood'}, {name: 'Cast Of Mamma Mia The Movie'}, {name: 'Catfish and the Bottlemen'}, {name: 'Céline Dion'}, {name: 'Charles Bradley'}, {name: 'Christophe Beck'}, {name: 'COIN'}, {name: 'Coldplay'}, {name: 'Cold War Kids'}, {name: 'Daft Punk'}, {name: 'Darius Rucker'}, {name: 'Dave Matthews Band'}, {name: 'David Bowie'}, {name: 'Demi Lovato'}, {name: 'Desiigner'}, {name: 'Dexys Midnight Runners'}, {name: 'Django Walker'}, {name: 'DNCE'}, {name: 'Drake'}, {name: 'Dreaming Bull'}, {name: 'Duran Duran'}, {name: 'Ed Sheeran'}, {name: 'Elmer Bernstein'}, {name: 'Eminem'}, {name: 'Ennio Morricone'}, {name: 'Eric Hutchinson'}, {name: 'Explosions In The Sky'}, {name: 'Faded Paper Figures'}, {name: 'Finish Ticket'}, {name: 'fun.'}, {name: 'Future Islands'}, {name: 'Gary Jules'}, {name: 'Glass Animals'}, {name: 'Gorillaz'}, {name: 'Guster'}, {name: 'Hans Zimmer'}, {name: 'Hozier'}, {name: 'Imagine Dragons'}, {name: 'Imogen Heap'}, {name: 'James Horner'}, {name: 'James Horner, Simon Franglen'}, {name: 'James Newton Howard'}, {name: 'Jason Mraz'}, {name: 'JAY Z'}, {name: 'J.D. McPherson'}, {name: 'Jerry Goldsmith'}, {name: 'John Barry'}, {name: 'John Denver'}, {name: 'Johnny Cash'}, {name: 'John Powell'}, {name: 'John Williams'}, {name: 'Justin Hurwitz'}, {name: 'Justin Timberlake'}, {name: 'Kaleo'}, {name: 'Kanye West'}, {name: 'Kendrick Lamar'}, {name: 'Kenny Loggins'}, {name: 'Lady Gaga'}, {name: 'Leon Bridges'}, {name: 'Les Misérables Cast'}, {name: 'Lil Wayne'}, {name: 'Lorde'}, {name: 'Luke Bryan'}, {name: 'Macklemore & Ryan Lewis'}, {name: 'Madonna'}, {name: 'Maroon 5'}, {name: "Martin O'Donnell"}, {name: 'Max Steiner'}, {name: 'Maynard Ferguson'}, {name: 'Men Without Hats'}, {name: 'Michael Giacchino'}, {name: 'Michael Jackson'}, {name: 'Michael Kamen'}, {name: 'Miley Cyrus'}, {name: 'Miranda Lambert'}, {name: 'Modest Mouse'}, {name: 'Mumford & Sons'}, {name: 'Muse'}, {name: 'Natasha Bedingfield'}, {name: 'Neon Trees'}, {name: 'Nicholas Raine'}, {name: 'Orchestra Conducted By Alex North'}, {name: 'Panic! At The Disco'}, {name: 'Paulinho Da Viola'}, {name: 'Pentatonix'}, {name: 'Pitbull'}, {name: "Plain White T's"}, {name: 'Prince'}, {name: 'Queen'}, {name: 'Ramin Djawadi'}, {name: 'Ramones'}, {name: 'Ratatat'}, {name: 'REO Speedwagon'}, {name: 'Rick Astley'}, {name: 'Rihanna'}, {name: 'Royal Philharmonic Orchestra'}, {name: 'Selena Gomez'}, {name: "Sergio Mendes & Brasil '66"}, {name: 'Seu Jorge'}, {name: 'Simple Minds'}, {name: 'Smash Mouth'}, {name: 'Stan Getz'}, {name: "The B-52's"}, {name: 'The Beatles'}, {name: 'The Black Keys'}, {name: 'The Chainsmokers'}, {name: 'The English Beat'}, {name: 'The Head and the Heart'}, {name: 'The Lone Bellow'}, {name: 'The Lyndhurst Orchestra'}, {name: 'The Police'}, {name: 'The Red One Rocketman'}, {name: 'The Strokes'}, {name: 'The University of Texas Longhorn Band'}, {name: 'The Weeknd'}, {name: 'Twenty One Pilots'}, {name: 'Twisted Sister'}, {name: 'U2'}, {name: 'Various Artists'}, {name: 'Victor Young'}, {name: 'Voxtrot'}, {name: 'We The Kings'}, {name: 'Woodkid'}, {name: 'Zac Brown Band'}]);
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
        var inputItems;
        var filter = this.props.filterType;
        /* Must determine which filter options to display and feed into autocomplete */
        
        if (filter == 'country') {
            inputItems = this.countryFilters();
        }
        else if (filter == 'genre') {
            inputItems = this.genreFilters();
        }
        else if (filter == 'label') {
            inputItems = this.labelFilters();
        }
        else if (filter == 'city') {
            inputItems = this.cityFilters();
        }
       else if (filter == 'artistname') {
           inputItems = this.artistFilters();
       }
       else if (filter == 'explicit') {
           inputItems = [{name: 'clean'}, {name: 'explicit'}];
       }
       else if (filter == 'venue') {
           // inputItems = this.venueFilters();
           inputItems = [];
       }
       else {
           inputItems = [];
       }
        
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
                menuStyle={styles.menu}
                renderItem={
                    (item, isHighlighted) => (
                        <div style={isHighlighted ? styles.highlightedItem : styles.item} key={item.name}>{item.name}</div>
                )}
                />
        );
    }
}