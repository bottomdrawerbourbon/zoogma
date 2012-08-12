/*** This file holds the routing fuinctionality for the site ***/

////////// Helper Functions //////////
/* Page Change */
var page_change = function(innerContent, callback) {
  $('#column_main').fadeOut('slow', function() {
      // Animation complete.
      // Start the new column_main element
      var content = jQuery("<div id='column_main' />").append(innerContent);
  
      $('#column_main').replaceWith(content);

      $('#column_main').fadeIn('slow', function() {
          // Animation complete.
      });

      // If callback given, execute now
      if(callback){
        callback();
      }
  });

};

/* Create homepage slide */
var create_slide = function(img_src, link_url, title, content){
  new_slide = $('<a class="slider-image" href="'+link_url+'" />');
  new_slide.append('<img class="slider-image" src="'+img_src+'" />');
  new_slide.append('<span><b style="color:white;">'+title+'</b></span>');
  new_slide.append('<div class="slider-content" >'+content+'</div>');

  return new_slide;
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
  var new_content = $('<div id="sliderHolder" />').append('<div id="features" />')

  new_content.find('#features').append(create_slide('static/images/feature/campbiscoheader.jpg', 'static/images/feature/campbiscoheader.jpg', 'Zoogma to play this years camp bisco', "<h2>Zoogma to play this year's Camp Bisco</h2><div><!-- start slipsum code --><p style='display:block;'>Your bones don't break, mine do. That's clear. Your cells react to bacteria and viruses differently than mine. You don't get sick, I do. That's also clear. But for some reason, you and I react the exact same way to water. We swallow it too fast, we choke. We get some in our lungs, we drown. However unreal it may seem, we are connected, you and I. We're on the same curve, just on opposite ends. </p><p style='display:block;'>You think water moves fast? You should see ice. It moves like it has a mind. Like it knows it killed the world once and got a taste for murder. After the avalanche, it took us a week to climb out. Now, I don't know exactly when we turned on each other, but I know that seven of us survived the slide... and only five made it out. Now we took an oath, that I'm breaking now. We said we'd say it was the snow that killed the other two, but it wasn't. Nature is lethal but it doesn't hold a candle to man. </p><!-- please do not remove this line --><div style='display:none;'><a href='http://slipsum.com'>lorem ipsum</a></div><!-- end slipsum code --></div>"));
  new_content.find('#features').append(create_slide('static/images/feature/campbiscoheader.jpg', 'static/images/feature/campbiscoheader.jpg', 'Zoogma to play NEXT years camp bisco', "<h2>Zoogma to play next year's Camp Bisco</h2><div><!-- start slipsum code --><p style='display:block;'>Now that there is the Tec-9, a crappy spray gun from South Miami. This gun is advertised as the most popular gun in American crime. Do you believe that shit? It actually says that in the little book that comes with it: the most popular gun in American crime. Like they're actually proud of that shit.</p><p style='display:block;'>Normally, both your asses would be dead as fucking fried chicken, but you happen to pull this shit while I'm in a transitional period so I don't wanna kill you, I wanna help you. But I can't give you this case, it don't belong to me. Besides, I've already been through too much shit this morning over this case to hand it over to your dumb ass.</p><!-- please do not remove this line --><div style='display:none;'><a href='http://slipsum.com'>lorem ipsum</a></div><!-- end slipsum code --></div>"));

  page_change(new_content, function(){
    $('#features').coinslider({ 
      hoverPause: true,
      width: 700,
      opacity: 1,
      delay: 1000
    });
  });

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
  // /* for albums: https://graph.facebook.com/zoogmaband/albums */
  $.getJSON("https://graph.facebook.com/zoogmaband/photos", function(data){
    if(data.data){
      var photoArr = data.data;
      _(photoArr).each(function(photoObj, photoObjIdx, origPhotoArr){
        if(photoObj.images.length > 0){
           photoElm = $('<a class="gallery-image-link" rel="group" href="'+photoObj.images[0].source+'"><img class="gallery-image" src="'+photoObj.images[7].source+'" alt="" /></a>');
          gallery.append(photoElm); 
          
        }
      });
      gallery.prepend('<h2>Gallery</h2>');
    }
    page_change(gallery, function(){
      $(".gallery-image-link").fancybox({
        openEffect: "none",
        closeEffect: "none",
        nextEffect: "none",
        prevEffect: "none"
      });
    });
  });

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
