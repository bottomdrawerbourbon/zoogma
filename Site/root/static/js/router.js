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
        delay: 5000
      });
    });
  }); 

};

var news_controller = function(){
  $.getJSON('/news/json', function(result) { 
    var newContent = 
    "<div id='news-main'>" +
    "<h2>News</h2>" +
    "<hr style='width:95%'/>";
    for (var i = 0; i < result.posts.length; i++) {
        newContent += "<div class='news-post'>";
        var object = result.posts[i];
        //if( object.image_url ) {
        //    newContent += "<img src='" + object.image_url + "'/>";
        //}
        newContent += "<h3 class='news-heading'>" + object.title + "</h3>"+
                      "<div class='news-date'>" + object.expanded_date + "</div>" +
                      "<div class='news-content'>" + object.post + "</div>"+
                      "<br/>";
        newContent += "</div>";
    }
    newContent += "</div>";
    page_change(newContent);
  });
};

var shows_controller = function(){
  $.getJSON('/shows/json', function(result) { 
    var newContent = "<div id='shows-main'>";
    newContent +="<h2>Shows</h2>";
    newContent +="<hr style='width:95%'/>";
    newContent +="<div class='show-links'>" + 
                 "<a href='http://www.ticketmaster.com/Zoogma-tickets/artist/1467550'>Ticketmaster</a>" +
                 ' :: ' + 
                 "<a href='http://www.livenation.com/artists/47934/zoogma/past'>Live Nation</a>" +
                 ' :: ' + 
                 "<a href='http://www.jambase.com/artists/49704/Zoogma'>Jambase</a></div>";
    for (var i = 0; i < result.length; i++) {
        var object = result[i];
        newContent += 
         "<div class='show-row'>" + 
         "<span class='show-toggle'><img id='show-"+ object.id +"' src='/static/images/expand.png' onclick=\"javascript:$('#desc-" + object.id + "').css('display', 'block');$(this).css('display', 'none');$('#hide-"+ object.id +"').css('display', 'inline-block');\"/></span>" + 
         "<span class='show-toggle'><img style='display:none' id='hide-"+ object.id +"' src='/static/images/collapse.png' onclick=\"javascript:$('#desc-" + object.id + "').css('display', 'none');$(this).css('display', 'none');$('#show-"+ object.id +"').css('display', 'inline-block');\"/></span>" + 
         "<span class='date'>" + object.expanded_date + "</span>" +
         "<span class='venue'><a href='" + object.venue_url + "'>" + object.venue + "</a></span>" +
         "<span class='location'>" + object.city + "</span>" +
         "<span class='time'>" + object.expanded_time + "</span>" +
         "<div class='show-description-row' id='desc-" + object.id + "'>";

         if( !(object.additional_band === undefined) ) {
                newContent += "<div class='show-additional-band'>" + object.additional_band + "</div>";
         }

         if( !(object.venue_address === undefined) ) {
            newContent += "<div class='show-desc-address'>" + object.venue_address + "</div>";
         }

         if( !(object.venue_phone === undefined) ) {
            newContent += "<div class='show-desc-phone'>" + object.venue_phone + "</div>";
         }
         if( !(object.ticket_adv_price === undefined) ) {
                newContent += "<div class='show-adv-price'>Advanced Price: " + object.ticket_adv_price + "</div>";
         }
         if( !(object.ticket_dos_price === undefined) ) {
                newContent += "<div class='show-dos-price'>Door Price: " + object.ticket_dos_price + "</div>";
         }

         newContent += 
         "<div class='show-desc-social'>"+
         "<span class='show-desc-facebook'><img src='/static/images/fb_icon.png'/><a href='" + object.facebook_event_url + "'>Facebook event</a></span>" +
         " :: " + 
         "<span class='show-desc-tickets'><img width='15px' src='/static/images/ticket.png'/><a href='" + object.tickets_url + "'>Ticketing info</a></span>" +
         "</div>"+
         "</div>"+
         "</div>";
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
  var bandElm   = $('<div id="band-main" />');
  //    switchBtn = $('<div id="content-select" />'),
  var gearElm   = $('<div id="band-gear" style="display:none;" />');
  var bioElm    = $('<div id="band-info" />');

  
  var switchBtn = $('<div id="band-header"><span id="bio"><h2 style="display: inline-block;">Bio</h2></span><span id="gear" class="not-selected"><h2 style="display: inline-block;">Gear</h2></span></div><hr style="width:95%"/>');

  // Set up the switch when each span is pressed
  switchBtn.find('#bio').click(function(){
    switchBtn.find('#gear').addClass('not-selected');
    switchBtn.find('#bio').removeClass('not-selected');
    //gearElm.removeClass('not-selected');
    gearElm.hide();
    bioElm.show();
  });
  switchBtn.find('#gear').click(function(){
    switchBtn.find('#bio').addClass('not-selected');
    switchBtn.find('#gear').removeClass('not-selected');
    //gearElm.addClass('not-selected');
    //bioElm.removeClass('not-selected');
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

  var newContent = "<div id='shows-main'>";
  newContent +="<h2>Shows</h2>";

  var gallery = jQuery('<div id="gallery-main" />');
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
      gallery.prepend('<h2>Gallery</h2><hr style="width:95%"/>');
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
var music_controller = function(){
    var newContent = "<div id='music-main'>";
    newContent +="<h2>Music</h2>";
    newContent +="<hr style='width:95%'/>";

    newContent += "</div>" +
                  "</div>";
    page_change(newContent);
};
var store_controller = function(){
    var newContent = "<div id='store-main'>";
    newContent +="<h2>Store</h2>";
    newContent +="<hr style='width:95%'/>";
    newContent += "</div>" +
                  "</div>";
    page_change(newContent);
};
var contact_controller = function(){
    var newContent = "<div id='contact-main'>";
    newContent +="<h2>Contact</h2>";
    newContent +="<hr style='width:95%'/>";
    newContent += "</div>" +
                  "</div>";
    page_change(newContent);
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
Path.map("#/shows").to(function(){
  shows_controller();
}).enter(set_page_background);
/* Store */
Path.map("#/store").to(function(){ 
  store_controller();
}).enter(set_page_background);
/* Music */
Path.map("#/music").to(function(){ 
  music_controller();
}).enter(set_page_background);
/* Gallery */
Path.map("#/gallery").to(function(){
  gallery_controller();
}).enter(set_page_background);
Path.map("#/contact").to(function(){
  contact_controller();
}).enter(set_page_background);

/* Contact */
// Path.map("#/shows").to(function(){ page_change('<div style="color:white;">Contact</div>'); }).enter(set_page_background);

////////// Setup //////////
Path.root("#/home");
Path.rescue(not_found);

$(document).ready(function(){
  Path.listen();
});
