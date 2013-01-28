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
// home_controller()
// Sets the slider on the homepage
var home_controller = function(){
  
  // Variables
  var new_content = $('<div id="sliderHolder" />').append('<div id="features" />'); // Structure for image slider

  // Get slider data
  $.getJSON('/news/json?featured=1', function(data) {
    // Loop through posts and add them to the slider structure
    for(idx in data.posts){
      //data.posts[idx].image_url = 'http://zoogma.bottomdrawerbourbon.com/media/images/zoog_tour_poster_20130105.jpg';
      new_content.find('#features').append(create_slide(data.posts[idx].image_url, '/news/json?id='+data.posts[idx].id, data.posts[idx].title, data.posts[idx].post));
    }
    // Add slider structure to page
    page_change(new_content, function(){
      $('#features').coinslider({ 
        hoverPause: true,
        width: 700,
        opacity: 1,
        delay: 1500
      });
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

// band_controller()
// Sets the band page
var band_controller = function(){
  
  // Variables
  var bandElm   = $('<div id="band" />'),
      switchBtn = $('<div id="content-select" />'),
      gearElm   = $('<div id="band-gear" style="display:none;" />'),
      bioElm    = $('<div id="band-info" />');

  // Setup content selector
  switchBtn.append('<input type="radio" name="content" id="content-select-input-bio" value="bio" checked="checked" /><label for="content-select-input-bio">Bio</label>')
           .append('<input type="radio" name="content" id="content-select-input-gear" value="gear" /><label for="content-select-input-gear">Gear</label>')
           .buttonset();
  switchBtn.find('#content-select-input-bio').click(function(){
    gearElm.hide();
    bioElm.show();
  });
  switchBtn.find('#content-select-input-gear').click(function(){
    bioElm.hide();
    gearElm.show();
  });

  // Get band data
  $.getJSON('/band/json', function(data){

    // Build Gear
    // Loop through members
    for(memberIdx in data.endorsements){
      var memberElm = $('<div class="member" />');
          nameElm = $('<span class="member-name">'+memberIdx+'</span> <span class="copy">is endorsed by:</span>'),
          endorsementElm = $('<div class="member-endorsements" />');
      for(endorsementIdx in data.endorsements[memberIdx]){
        endorsementElm.append('<a href="'+data.endorsements[memberIdx][endorsementIdx].url+'">'+data.endorsements[memberIdx][endorsementIdx].company+'</a><span class="comma">, </span>'); 
      }
      endorsementElm.find('.comma:last-child').remove();
      memberElm.append(nameElm).append(endorsementElm);
      gearElm.append(memberElm);
    }

    // Build Bio
    bioElm.append('<img src="'+data.bio.image_url+'" />')
          .append('<div id="band-bio">'+data.bio.post+'</div>');
  });

  // Add all elements to #band element
  bandElm.append(switchBtn)
         .append(bioElm)
         .append(gearElm);

  // Add #band element to page
  page_change(bandElm);

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
