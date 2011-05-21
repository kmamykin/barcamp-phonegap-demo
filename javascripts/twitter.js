// Initialization of jQTouch instance
var jQT = new $.jQTouch({
  debug: false,
  formSelector: '.form',
  icon: '/apple-touch-icon.png',
  addGlossToIcon: false,
  startupScreen: '/images/mobile/mobile_startup.png',
  //useAnimations: false,  // This is a temp fix for "tap is not ready" jqtouch error
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
  self.username = ko.observable("");
  self.latestTweets = ko.observableArray([]);
  self.numberOfTweets = 0;

  self.userPageUrl = ko.dependentObservable(function() {
    return "http://twitter.com/" + self.username();
  }, self);

  self.twitterPageAnimationEnded = function(direction) {
    if (direction == 'in') {
      console.log("Page animated in. Loading tweets for " + self.username());
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
    var url = self.userTimelineUrl();
    console.log("loadTweets for " + self.username() + url);
    $.getJSON(url, {dataType:"jsonp"}, function(data) {
      console.log(data);
      self.latestTweets(data);
//      jQT.setPageHeight($("#twitter"));
    });
  };

  self.userTimelineUrl = function() {
    return "http://api.twitter.com/1/statuses/user_timeline.json"
            + "?screen_name=" + self.username()
            + "&count=" + self.numberOfTweets
            + "&include_rts=true&callback=?"
  };
};

var app = new ViewModel();

$(function() {
  console.log("Document ready!");
  app.username("kmamyk");

  // Loading indicator
  $(".ajax_indicator").ajaxStart(
          function () {
            console.log("ajaxStart");
            $(this).fadeIn();
          }).ajaxComplete(function () {
    console.log("ajaxComplete");
    $(this).fadeOut().hide();
  });
  app.numberOfTweets = 5;
  ko.applyBindings(app);
  app.loadTweets();
});
