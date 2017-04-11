import React from 'react';
import Modal from 'react-bootstrap';

export default class SWEModal extends React.Component {
    constructor() {
        super(props);
        this.state = {
            type: this.props.type,
            data: this.props.data,
            modalOpen: this.props.modalOpen
        }
    }
    
    makeAPIcall( call ) {
        var xmlHTTP = new XMLHttpRequest();

        xmlHTTP.open('GET',call,false);

        var data;
        xmlHTTP.onload = function(e)
        {
            data = this.response;
        }

        // Send request
        xmlHTTP.send();

        return data;
    }
    
    setDataAlbum() {
        
    }
    
    setDataTrack() {
        
    }
    
    setDataArtist() {
        
    }
    
    setDataConcert() {
        
    }
    
    trackModal() {
        var data;
        var backgroundStyle;
        var explicitStyle;
        
        data = this.state.data;
        
        /* Set explicit tag */
        if (data.explicit == true) {
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
//        background-size: 'cover' 
        
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
    
    artistModal() {
        var data, pop_track, albums, albumMasonry;
        var backgroundStyle;
        
        data = this.state.data;
        pop_track = data.tracks[data.tracks.length-1];
        albums = data.albums;
        albumMasonry = [];
        
        /* Set image for header */
        backgroundStyle = {
            background: 'url(' + data.album.album_cover_url + ') no-repeat center center'
        };
//                    background-size: 'cover' 

        
        for (var x in albums) {
            var alb = JSON.parse(makeAPIcall("http://www.boswemianrhapsody.me/api/albums/"+ albums[x].album_id));
            albumMasonry.push(this.makeAlbumMasonry(alb.album_cover_url, alb.name, alb.id));
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
        var modalHTML;
        if (this.state.type == 'track') {
            modalHTML = this.trackModal();
        }
        else if (this.state.type == 'album') {
            modalHTML = this.albumModal();
        }
        else if (this.state.type == 'artist') {
            modalHTML = this.artistModal();
        }
        else {
            modalHTML = this.concertModal();
        }
        
        return (
            <Modal bsSize={"large"} show={this.state.modalOpen} onHide={this.props.close}>
              {modalHTML}            
              <Modal.Footer>
                <Button onClick={this.props.close}>Close</Button>
              </Modal.Footer>
            </Modal>
        );
    }
}