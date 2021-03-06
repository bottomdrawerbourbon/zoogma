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
  new_slide.append('<img class="slider-image" style="width:300px;" src="'+img_src+'" />');
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
      var title;
      var post;
      if( data.posts[idx].post  ) { post  = data.posts[idx].post;  } else { post  = ""; }
      if( data.posts[idx].title ) { title = data.posts[idx].title; } else { title = ""; }

      new_content.find('#features').append(create_slide(data.posts[idx].image_url, '/news/json?id='+data.posts[idx].id, title, post));
    }
    // Add slider structure to page
    page_change(new_content, function(){
      $('#features').coinslider({ 
        hoverPause: true,
        width: 700,
        opacity: 1,
        delay: 5000,
        links: false,
        navigation: false
      });
    });
  }); 

};

var news_controller = function(){
    // Variables
    var newsElm    = $('<div id="news-main" />');
    var twitterElm = $('<div id="news-twitter" style="display:none;" />');
    var fbElm      = $('<div id="news-facebook" style="display:none;" />');
    var instaElm   = $('<div id="news-instagram" style="display:none;" />');
    var postElm    = $('<div id="news-post" />');

    var switchBtn = $('<div id="news-header">' + 
                      '<span id="news" class="sub-button"><h2 style="display: inline-block;">News</h2></span>' + 
                      '<span id="twitter" class="not-selected sub-button"><h2 style="display: inline-block;">Twitter</h2></span>' + 
//                      '<span id="facebook" class="not-selected sub-button"><h2 style="display: inline-block;">Facebook</h2></span>' + 
//                      '<span id="instagram" class="not-selected sub-button"><h2 style="display: inline-block;">Instagram</h2></span>' + 
                      '</div><hr style="width:95%"/>');

    // Set up the switch when each span is pressed
    switchBtn.find('#news').click(function(){
      switchBtn.find('#twitter').addClass('not-selected');
//      switchBtn.find('#facebook').addClass('not-selected');
//      switchBtn.find('#instagram').addClass('not-selected');
      switchBtn.find('#news').removeClass('not-selected');
      twitterElm.hide();
//      fbElm.hide();
//      instaElm.hide();
      postElm.show();
    });
    switchBtn.find('#twitter').click(function(){
      switchBtn.find('#twitter').removeClass('not-selected');
//      switchBtn.find('#facebook').addClass('not-selected');
//      switchBtn.find('#instagram').addClass('not-selected');
      switchBtn.find('#news').addClass('not-selected');
      //gearElm.addClass('not-selected');
      //bioElm.removeClass('not-selected');
      twitterElm.show();
      postElm.hide();
      $('#twitter3').empty();
      $('#twitter3').twitterSearch({
        term: 'Zoogma',
        animOut: { opacity: 1 }, // no fade
        avatar: false,
        anchors: true,
        bird: false,
        colorExterior: '#ddd',
        colorInterior: 'black',
        pause:   true,
        time: false,
        timeout: 2000,
        title: ''
      });
    });
//    switchBtn.find('#facebook').click(function(){
//      switchBtn.find('#twitter').addClass('not-selected');
//      switchBtn.find('#facebook').removeClass('not-selected');
//      switchBtn.find('#instagram').addClass('not-selected');
//      switchBtn.find('#news').addClass('not-selected');
//      twitterElm.hide();
//      fbElm.show();
//      instaElm.hide();
//      postElm.hide();
//      $('#facebook').socialist({
//        networks: [
//            //{name:'linkedin',id:'buddy-media'},
//            {name:'facebook',id:'zoogmaband'},
//            //{name:'pinterest',id:'potterybarn'},
//            //{name:'twitter',id:'in1dotcom'},
//            //{name:'googleplus',id:'105588557807820541973/posts'},
//            //{name:'rss',id:' http://feeds.feedburner.com/good/lbvp'},
//            //{name:'rss',id:'http://www.makebetterwebsites.com/feed/'},
//            //{name:'craigslist',id:'boo',areaName:'southcoast'},
//            //{name:'rss',id:'http://www.houzz.com/getGalleries/featured/out-rss'}
//           ],
//        isotope:false,
//        random:false,
//        fields:['source','heading','text','date','followers','likes']
//      });
//
//    });
//    switchBtn.find('#instagram').click(function(){
//      switchBtn.find('#twitter').addClass('not-selected');
//      switchBtn.find('#facebook').addClass('not-selected');
//      switchBtn.find('#instagram').removeClass('not-selected');
//      switchBtn.find('#news').addClass('not-selected');
//      twitterElm.hide();
//      fbElm.hide();
//      instaElm.show();
//      postElm.hide();
//    });
//
  
    // Get band data
    $.getJSON('/news/json', function(result) {
      var newsContent = '';
      for (var i = 0; i < result.posts.length; i++) {
          newsContent += "<div class='news-post'>";
          var object = result.posts[i];
          //if( object.image_url ) {
          //    newContent += "<img src='" + object.image_url + "'/>";
          //}
          newsContent += "<h3 class='news-heading'>" + object.title + "</h3>"+
                         "<div class='news-date'>" + object.expanded_date + "</div>" +
                         "<div class='news-content'>" + object.post + "</div>"+
                         "<br/>";
          newsContent += "</div>";
      }
      postElm.append(newsContent);
    });
  
    twitterElm.append('<div id="twitter3" title="Mouse away to resume scrolling tweets"></div>');
    fbElm.append('<div id="facebook"></div>');
    instaElm.append('<div id="twitter3" title="Mouse away to resume scrolling tweets"></div>');

    // Add all elements to #band element
    newsElm.append(switchBtn)
           .append(twitterElm)
//           .append(fbElm)
//           .append(instaElm)
           .append(postElm);
  
    // Add #band element to page
    page_change(newsElm);


//    var newContent = 
//    "<div id='news-main'>" +
//    "<h2>News</h2>" +
//    "<hr style='width:95%'/>";
//    for (var i = 0; i < result.posts.length; i++) {
//        newContent += "<div class='news-post'>";
//        var object = result.posts[i];
//        //if( object.image_url ) {
//        //    newContent += "<img src='" + object.image_url + "'/>";
//        //}
//        newContent += "<h3 class='news-heading'>" + object.title + "</h3>"+
//                      "<div class='news-date'>" + object.expanded_date + "</div>" +
//                      "<div class='news-content'>" + object.post + "</div>"+
//                      "<br/>";
//        newContent += "</div>";
//    }
//    newContent += "</div>";
//    page_change(newContent);
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

         newContent += "<div class='show-desc-social'>";
         if( !(object.facebook_event_url === undefined) ) {
                newContent += "<span class='show-desc-facebook'><img src='/static/images/fb_icon.png'/><a href='" + 
                              object.facebook_event_url + 
                              "'>Facebook event</a></span>";
         }
         if( !(object.tickets_url === undefined) ) {
                newContent += ":: <span class='show-desc-tickets'><img width='15px' src='/static/images/ticket.png'/><a href='" + 
                              object.tickets_url + 
                              "'>Ticketing Info</a></span>";
         }

         newContent +="</div></div></div>";


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

  
  var switchBtn = $('<div id="band-header"><span id="bio" class="sub-button"><h2 style="display: inline-block;">Bio</h2></span><span id="gear" class="not-selected sub-button"><h2 style="display: inline-block;">Gear</h2></span></div><hr style="width:95%"/>');

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
    //for(memberIdx in data.endorsements){
    //  var memberElm = $('<div class="member" />');
    //      nameElm = $('<span class="member-name">'+memberIdx+'</span> <span class="copy">is endorsed by:</span>'),
    //      endorsementElm = $('<div class="member-endorsements" />');
    //  for(endorsementIdx in data.endorsements[memberIdx]){
    //    endorsementElm.append('<a href="'+data.endorsements[memberIdx][endorsementIdx].url+'">'+data.endorsements[memberIdx][endorsementIdx].company+'</a><span class="comma">, </span>'); 
    //  }
    //  endorsementElm.find('.comma:last-child').remove();
    //  memberElm.append(nameElm).append(endorsementElm);
    //  gearElm.append(memberElm);
    //}
    gearElm.append('<div>Coming Soon</div>');

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

  $.getJSON('/music/discography/json', function(result) { 
    var newContent = 
    "<div id='music-main'>" +
    "<h2>Discography</h2>" +
    "<hr style='width:95%'/>";
    // The outer array will be albums
    for (var i = 0; i < result.length; i++) {
        var object = result[i];
        
        newContent += '<div class="music-album">';
        // Get the album data
        newContent += '<h3>' + object.title + '</h3>';
        newContent += '<div class="music-album-cover"><img src="' + object.album_cover + '" style="width: 200px" /></div>';
        newContent += '<div class="music-right-column">';
        newContent += '<table class="music-tracks">';
        // Loop over the tracks and populate each row
        for (var j = 0; j < object.tracks.length; j++) {
            var track = object.tracks[j];
            newContent += '<tr>';
            newContent += '<td class="music-track-number">' + track.track_number + '.</td>';
            newContent += '<td class="music-track-title">' + track.title + ' <span class="track-length">(' + track.track_length + ')</span></td>';
            newContent += '</tr>';
        }
        newContent += '</table>';

        if( !(object.download_url === undefined) ) {
            newContent += '<div class="music-download"><a href="' + object.download_url + '">Download</a></div>';
        }
        newContent += '<div class="music-release-date"> Released ' + object.release_date+ '</div>';


        newContent += '</div>';
        newContent += '<div style="clear:both"></div>';
        newContent += '</div>';
    }
    newContent += "</div>" +
                  "</div>";

    page_change(newContent);
  });
};
var store_controller = function(){
    var newContent = "<div id='store-main'>";
    newContent +="<h2>Store</h2>";
    newContent +="<hr style='width:95%'/>";
    newContent += "<span style='margin-left:20px'>Coming Soon</span>";
    newContent += "</div>" +
                  "</div>";
    page_change(newContent);
};
var contact_controller = function(){
    var newContent = "<div id='contact-main'>";
    newContent +="<h2>Contact</h2>";
    newContent +="<hr style='width:95%'/><br />";
    newContent += "<div style='margin-left:20px'>Booking: Owen Gray - <a href='mailto:Owen@Madison-House.com'>Owen@Madison-House.com</a> - Madison House Inc, Boulder, CO.</div><br />" +
                  "<div style='margin-left:20px'>Management: <a href='mailto:mgmt@ZOOGMA.net'>mgmt@ZOOGMA.net</a></div><br />" +
                  "<div style='margin-left:20px'>Sign Up for our Street Team- Help Promote and win prizes and tickets to our shows!  <a href='mailto:ZOOGMAstreetteam@gmail.com'>ZOOGMAstreetteam@gmail.com</a></div><br />";
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
