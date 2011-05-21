// Initialization of jQTouch instance
var jQT = new $.jQTouch({
  debug: false,
  formSelector: '.form',
  icon: '/apple-touch-icon.png',
  addGlossToIcon: false,
  startupScreen: '/images/mobile/mobile_startup.png',
  //  preloadImages: [
  //    '/javascripts/jqtouch/themes/apple/img/back_button.png',
  //    '/javascripts/jqtouch/themes/apple/img/back_button_clicked.png',
  //    '/javascripts/jqtouch/themes/apple/img/button_clicked.png',
  //    '/javascripts/jqtouch/themes/apple/img/grayButton.png',
  //    '/javascripts/jqtouch/themes/apple/img/whiteButton.png',
  //    '/javascripts/jqtouch/themes/apple/img/loading.gif'
  //  ],
  statusBar: 'black'
});

var ViewModel = function() {
  var self = this;
  self.searchQuery = ko.observable("");
  self.latestTweets = ko.observableArray([]);
  self.numberOfTweets = 0;

  self.userPageUrl = ko.dependentObservable(function() {
    return "#" + self.searchQuery();
  }, self);

  self.twitterPageAnimationEnded = function(direction) {
    if (direction == 'in') {
      console.log("Page animated in. Loading tweets for " + self.searchQuery());
    }
  };

  self.twitterPageRefreshClicked = function() {
    self.loadTweets();
  };

  self.showMoreTweetsClicked = function() {
    self.numberOfTweets += 10;
    self.loadTweets();
  };

  self.loadTweets = function() {
    var url = self.searchUrl();
    console.log("loadTweets for " + self.searchQuery() + url);
    $.getJSON(url, {dataType:"jsonp"}, function(data) {
      console.log(data);
      self.latestTweets(data["results"]);
    });
  };

  self.searchUrl = function() {
    return "http://search.twitter.com/search.json"
            + "?q=" + self.searchQuery()
            + "&rpp=" + self.numberOfTweets
            + "&callback=?"
  };
};

var app = new ViewModel();

$(function() {
  console.log("Document ready!");
  app.searchQuery("barcampnyc");

  // Loading indicator
  $(".ajax_indicator").ajaxStart(
          function () {
            console.log("ajaxStart");
            $(this).fadeIn();
          }).ajaxComplete(function () {
    console.log("ajaxComplete");
    $(this).fadeOut().hide();
  });
  app.numberOfTweets = 10;
  ko.applyBindings(app);
  app.loadTweets();
});
