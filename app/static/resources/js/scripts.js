$(document).ready(function() {
//    alert("Hello World");
    var $grid = $('.grid').masonry({
      gutter: 10,
      fitWidth: true,
      itemSelector: '.grid-item'
    });

    $grid.on( 'click', '.grid-item-content', function( event ) {
      // $( event.currentTarget ).parent('.grid-item').toggleClass('is-expanded');
      $( event.currentTarget ).children('.MartistCellInfoContainer').toggleClass('expand-description');
      $( event.currentTarget ).children('.MartistCellImgContainer').toggleClass('expand-coverArt');
      // $( event.currentTarget ).children('.MalbumCellInfoContainer').toggleClass('expand-description');
      // $( event.currentTarget ).children('.MalbumCellImgContainer').toggleClass('expand-coverArt');
      $grid.masonry('layout');
    });

     $('[data-toggle="tooltip"]').tooltip();
});

function changeSong(song) {
    $('#spotifyEmbed').attr("src", song);
}
