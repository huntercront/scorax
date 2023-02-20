WebFontConfig = {
   google: { families: ["Inter:200,300,400,500&display=swap"] },
};

(function (d) {
   var wf = d.createElement("script"),
      s = d.scripts[0];
   wf.src = "https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js";
   wf.async = true;
   s.parentNode.insertBefore(wf, s);
})(document);

//loader function
var Loader = function () {};
Loader.prototype = {
   require: function (scripts, callback) {
      this.loadCount = 0;
      this.totalRequired = scripts.length;
      this.callback = callback;
      for (var i = 0; i < scripts.length; i++) {
         this.writeScript(scripts[i]);
      }
   },
   loaded: function (evt) {
      this.loadCount++;
      if (
         this.loadCount == this.totalRequired &&
         typeof this.callback == "function"
      )
         this.callback.call();
   },
   writeScript: function (src) {
      var self = this;
      var s = document.createElement("script");
      s.type = "text/javascript";
      s.defer = true;
      s.src = src;
      s.addEventListener(
         "load",
         function (e) {
            self.loaded(e);
         },
         false
      );
      var head = document.getElementsByTagName("head")[0];
      head.appendChild(s);
   },
};

var l = new Loader();
l.require(["./js/lazy-load.js"], function () {
   var callback_loaded = function (element) {
      element.classList.remove("lazy");
      if (element.closest(".lazy-img")) {
         element.closest(".lazy-img").classList.remove("lazy-progress");
      }
   };
   Lazy = new LazyLoad({
      callback_loaded: callback_loaded,
   });
});
