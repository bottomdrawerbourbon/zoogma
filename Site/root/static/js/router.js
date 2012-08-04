/*** This file holds the routing fuinctionality for the site ***/

////////// Helper Functions //////////
/* Page Change */
var page_change = function(innerContent, callback) {
  $('#column_main').fadeOut('slow', function() {
      // Animation complete.
      // Start the new column_main element
      console.log(innerContent);
      var content = jQuery("<div id='column_main' />").append(innerContent);
  
      //content += innerContent;

      // Closing out the column_main element
      //content += "</div>";

      $('#column_main').replaceWith(content);

      $('#column_main').fadeIn('slow', function() {
          // Animation complete.
      });

      if(callback){
        callback();
      }
  });

};

/* Not found */
function not_found(){
  $("#content").html("<h1>404 Not Found</h1><p>The page you are looking for cannot be found!</p>");
  $("#content").addClass("error");
}

/* Exit effect */
function set_page_background(){
  $("#content").removeClass("error");
}

////////// Controller Functions //////////
var home_controller = function(){
    var new_content = jQuery('<div id="sliderHolder"> <div id="features"> <img class="slider-image" src="static/images/feature/campbiscoheader.jpg" /> <span class="slider-title"> <b>Zoogma to play this years camp bisco</b> </span> <div class="slider-content">Look at me!!!</div></div> </div>');
    new_content.coinslider({ 
        hoverPause: false,
        width: 700,
        opacity: 1,
        delay: 10000
    });
    page_change(new_content);

  };

var news_controller = function(){
  $.getJSON('/news/json', function(result) { 
    var newContent = "<div id='news-main'>" +
                     "<div id='news-heading'>";
    for (var i = 0; i < result.news.length; i++) {
        var object = result.news[i];
        newContent += "<div id='news-heading'>" + object.title + "</div>"+
                      "<div id='news-content'>" + object.story + "</div>"+
                      "<br/>";
    }
    newContent += "</div>" +
                  "</div>";
    page_change(newContent);
  });
};

var band_controller = function(){
  $.getJSON('/band', function(result) {
    var newContent = "<div id='band-info'><img src='static/images/zoogma-featured.png'/><div id='band-bio'><p>Zoogma combines the sonic diversity and precision of a DJ with the excitement and immediacy of a four piece rock group. Known for their energetic performances and retina pleasing light show, the band consistently dishes out heavy-weight beat-driven dance parties across the nation. Sets are kinetic, combining live improvisation with carefully crafted beats and melodic textures.</p>";
    newContent += "<p>Evolving in Oxford, MS, Zoogma's sound is an eclectic fusion of Electronica, Rock, Jazz, World, and Hip-Hop. This blend of genres results in a musical experience that appeals to a range of audiences, with a sound that is refreshingly original yet steeped in the dance music tradition. With the release of their debut album, Recreational Vehicles, along with a relentless tour schedule, the four members have already added their unique voice to the live electronic-rock scene.</p></div>";
  page_change(newContent);
  });
};

var gallery_controller = function(){

  var gallery = jQuery('<div id="gallery" />');
  // Get Facebook photo data
  // /* should use:https://graph.facebook.com/zoogmaband/albums */
  $.getJSON("https://graph.facebook.com/zoogmaband/photos", function(data){
    console.log(data);
    var photoArr = [];
    if(data.data){
      photoArr = data.data;
      _(photoArr).each(function(photoObj, photoObjIdx, origPhotoArr){
        if(photoObj.images.length > 0){
          //photoElm = jQuery('<div class="photo_album" id="fb_'+albumObj.id+'"/>');
          //album_cover = jQuery('<img id="photo_album_cover" src="'+albumObj.source+'" width="'+albumObj.width+'" height="'+albumObj.height+'" />');
          //album.append(album_cover);
          //_(albumObj.images).each(function(imageObj, imageObjIdx, imageArr){
          //<a href="images/image-1.jpg" rel="lightbox" title="my caption">image #1</a>
           photoElm = $('<a class="fancybox" rel="group" href="'+photoObj.images[0].source+'"><img src="'+photoObj.images[7].source+'" alt="" /></a>');
          //});
          gallery.append(photoElm); 
          
        }
      });

    }
    page_change(gallery, function(){ $(".fancybox").fancybox(); });
  });

  // Write to page
  //page_change('<div style="color:white;">Gallery</div>'); 
};

////////// Routing //////////
/* Home */
Path.map("#/home").to(function(){
  home_controller();
}).enter(set_page_background);
/* News */
Path.map("#/news").to(function(){
  news_controller();
}).enter(set_page_background);
/* Band */
Path.map("#/band").to(function(){
  band_controller();
}).enter(set_page_background);
/* Shows */
Path.map("#/shows").to(function(){ page_change('<div style="color:white;">Shows</div>'); }).enter(set_page_background);
/* Store */
Path.map("#/store").to(function(){ page_change('<div style="color:white;">Store</div>'); }).enter(set_page_background);
/* Music */
Path.map("#/music").to(function(){ page_change('<div style="color:white;">Music</div>'); }).enter(set_page_background);
/* Gallery */
Path.map("#/gallery").to(function(){
  gallery_controller();
}).enter(set_page_background);
/* Contact */
Path.map("#/shows").to(function(){ page_change('<div style="color:white;">Contact</div>'); }).enter(set_page_background);

////////// Setup //////////
Path.root("#/home");
Path.rescue(not_found);

$(document).ready(function(){
  Path.listen();
});
