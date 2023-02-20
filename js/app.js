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

document.addEventListener("DOMContentLoaded", function (event) {
   document.body.classList.remove("loading");

   function counter(id, start, duration) {
      let obj = id,
         current = start,
         range = parseInt(obj.getAttribute("data-num")) - start,
         increment = parseInt(obj.getAttribute("data-num")) > start ? 1 : -1,
         step = Math.abs(Math.floor(duration / range)),
         timer = setInterval(() => {
            current += increment;
            obj.textContent = current;
            if (current == parseInt(obj.getAttribute("data-num"))) {
               clearInterval(timer);
            }
         }, step);
   }

   let last_known_scroll_position = 0;
   let ticking = false;
   function doSomething(scroll_pos) {
      animOnScroll(10);
   }

   window.addEventListener("scroll", function (e) {
      last_known_scroll_position = window.scrollY;
      if (!ticking) {
         window.requestAnimationFrame(function () {
            doSomething(last_known_scroll_position);
            ticking = false;
         });
         ticking = true;
      }
   });

   const aminItems = document.querySelectorAll(".animate");

   function animOnScroll() {
      aminItems.forEach(function (aminItem) {
         let animItemHeight = aminItem.offsetHeight;
         let animItemOffset = offset(aminItem).top;
         let animStart = 2;

         let animItemPoint = window.innerHeight - animItemHeight / animStart;
         console.log(animItemPoint);
         if (animItemHeight > window.innerHeight) {
            animItemPoint = window.innerHeight - window.innerHeight / animStart;
         }
         if (
            pageYOffset > animItemOffset - animItemPoint &&
            pageYOffset < animItemOffset + animItemHeight
         ) {
            if (
               aminItem.classList.contains("count") &&
               !aminItem.classList.contains("animate-active")
            ) {
               counter(aminItem, 1, aminItem.getAttribute("data-duratation"));
            } else {
               if (aminItem.getAttribute("data-delay")) {
                  aminItem.style.transitionDelay =
                     aminItem.getAttribute("data-delay") + "ms";
               }
            }
            aminItem.classList.add("animate-active");
         }
      });
   }
   function offset(el) {
      const rect = el.getBoundingClientRect(),
         scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
         scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      return {
         top: rect.top + scrollTop,
         left: rect.left + scrollLeft,
      };
   }
   function doSomething(scroll_pos) {
      animOnScroll();
   }
   setTimeout(() => {
      animOnScroll();
   }, 10);
});
