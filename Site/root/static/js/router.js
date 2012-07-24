/*** This file holds the routing fuinctionality for the site ***/

////////// Helper Functions //////////
/* Page Change */
var pageChange = function(innerContent) {
  $('#column_main').fadeOut('slow', function() {
      // Animation complete.
      // Start the new column_main element
      var content = "<div id='column_main'>";
  
      content += innerContent;

      // Closing out the column_main element
      content += "</div>";

      $('#column_main').replaceWith(content);

      $('#column_main').fadeIn('slow', function() {
          // Animation complete.
      });
  });

};

/* Not found */
function notFound(){
  $("#content").html("<h1>404 Not Found</h1><p>The page you are looking for cannot be found!</p>");
  $("#content").addClass("error");
}

/* Exit effect */
function setPageBackground(){
  $("#content").removeClass("error");
}

////////// Routing //////////
/* News */
Path.map("#/news").to(function(){
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
    pageChange(newContent);
  });
}).enter(setPageBackground);

/* Band */
Path.map("#/band").to(function(){
  $.getJSON('/band', function(result) {
    var newContent = "<div id='band-info'><img src='static/images/zoogma-featured.png'/><div id='band-bio'><p>Zoogma combines the sonic diversity and precision of a DJ with the excitement and immediacy of a four piece rock group. Known for their energetic performances and retina pleasing light show, the band consistently dishes out heavy-weight beat-driven dance parties across the nation. Sets are kinetic, combining live improvisation with carefully crafted beats and melodic textures.</p>";
    newContent += "<p>Evolving in Oxford, MS, Zoogma's sound is an eclectic fusion of Electronica, Rock, Jazz, World, and Hip-Hop. This blend of genres results in a musical experience that appeals to a range of audiences, with a sound that is refreshingly original yet steeped in the dance music tradition. With the release of their debut album, Recreational Vehicles, along with a relentless tour schedule, the four members have already added their unique voice to the live electronic-rock scene.</p></div>";
  pageChange(newContent);
  });
}).enter(setPageBackground);

/* Shows */
Path.map("#/shows").to(function(){ pageChange('<div style="color:white;">Shows</div>'); }).enter(setPageBackground);
/* Store */
Path.map("#/store").to(function(){ pageChange('<div style="color:white;">Store</div>'); }).enter(setPageBackground);
/* Music */
Path.map("#/music").to(function(){ pageChange('<div style="color:white;">Music</div>'); }).enter(setPageBackground);
/* Gallery */
Path.map("#/gallery").to(function(){ pageChange('<div style="color:white;">Gallery</div>'); }).enter(setPageBackground);
/* Contact */
Path.map("#/shows").to(function(){ pageChange('<div style="color:white;">Contact</div>'); }).enter(setPageBackground);

////////// Setup //////////
Path.root("#/blah");
Path.rescue(notFound);

$(document).ready(function(){
  Path.listen();
});
