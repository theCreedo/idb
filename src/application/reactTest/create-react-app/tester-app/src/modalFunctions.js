export function masonryClick(e) {
        var foo = e.currentTarget;

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
    }

export function makeAlbumMasonry(imgUrl, albumTitle, albumId, state) {
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
    
export function makeArtistMasonry(imgUrl, artistName, artistId, state) { 
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
    
export function albumModal(data) {
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
    
export function concertModal(data) {
        var backgroundStyle, artistMasonry;
      var art = data.artist;
        
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
    
export function trackModal(data) {
        
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

export function artistModal(data) {
        var pop_track, albums, albumMasonry;
        var backgroundStyle;
        
        pop_track = data.tracks[data.tracks.length-1];
        albums = data.albums;
        albumMasonry = [];
        
        /* Set image for header */
        backgroundStyle = {
            background: 'url(' + data.image_url + ') no-repeat center center'
        };

        
        for (var x in albums) {
            var alb = albums[x];
            albumMasonry.push(this.makeAlbumMasonry(alb.album_cover_url, alb.name, alb.id,this.state.masonryToggle));
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