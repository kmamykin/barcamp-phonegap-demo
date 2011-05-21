// Define custom KO bindings
ko.bindingHandlers.href = {
  init: function(element, valueAccessor, allBindingsAccessor, viewModel) {
    // This will be called when the binding is first applied to an element
    // Set up any initial state, event handlers, etc. here
  },
  update: function(element, valueAccessor, allBindingsAccessor, viewModel) {
    // This will be called once when the binding is first applied to an element,
    // and again whenever the associated observable changes value.
    // Update the DOM element based on the supplied values here.

    var value = valueAccessor();
    //console.log("Updating href with value " + value);
    // whether or not the supplied model property is observable, get its current value
    var valueUnwrapped = ko.utils.unwrapObservable(value);
    //console.log("Updating href with valueUnwrapped " + valueUnwrapped);
    $(element).attr("href", valueUnwrapped);
  }
};
ko.bindingHandlers.src = {
  init: function(element, valueAccessor, allBindingsAccessor, viewModel) {
  },
  update: function(element, valueAccessor, allBindingsAccessor, viewModel) {
    var valueUnwrapped = ko.utils.unwrapObservable(valueAccessor());
    $(element).attr("src", valueUnwrapped);
  }
};
ko.bindingHandlers.pageAnimationEnd = {
  init: function(element, valueAccessor, allBindingsAccessor, viewModel) {
    $(element).bind('pageAnimationEnd', function(event, info) {
      console.log("pageAnimationEnd fired with direction " + info.direction);
      // get the link which triggered the animation, if possible
      var referrer = $(this).data('referrer');
      var method = valueAccessor();
      method(info.direction, referrer);
    })
  },
  update: function(element, valueAccessor, allBindingsAccessor, viewModel) {
    // do nothing as valueAccessor is not expected to return anything
  }
};
ko.bindingHandlers.pullToRefresh = {
  init: function(element, valueAccessor, allBindingsAccessor, viewModel) {
    // code below worked inside TwtterViewModel.pageAnimationEnded()
    // Needs to be reworked to be general purpose
    var page = $("#twitter");
    var iscroll = new iScroll($('.' + jQT.barsSettings.wrapper, page).attr('id'), {
      hScrollbar: false,
      desktopCompatibility: true,
      pullToRefresh: 'both',
      onPullDown: function(){
        console.log("onPullDown");
        self.refreshTweetsClicked();
        refresh(iscroll);
      },
      onPullUp: function(){
        console.log("onPullUp");
        self.showMoreTweetsClicked();
        refresh(iscroll);
      }
    });
    function refresh(obj) {
      setTimeout(function () {
        console.log("refreshing " + obj);
        obj.refresh();
      }, 0);
    }
    page.data('iscroll', iscroll);

    jQT.init_iScroll(page);
  },
  update: function(element, valueAccessor, allBindingsAccessor, viewModel) {
    var valueUnwrapped = ko.utils.unwrapObservable(valueAccessor());
    $(element).attr("src", valueUnwrapped);
  }
};
