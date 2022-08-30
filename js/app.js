WebFontConfig = {
   google: { families: ["Montserrat:300,400,600,700&display=swap"] },
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
l.require(["../js/lazyload.min.js"], function () {
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
   var l = new Loader();
   l.require(["/js/siema.min.js"], function () {
      class SiemaWithDots extends Siema {
         addDots() {
            this.dots = document.createElement("div");
            this.dotContainer = document.createElement("div");
            this.dotContainer.classList.add("dots-container", "container");
            this.dots.classList.add("dots", "c-s");
            for (let i = 0; i < this.innerElements.length; i++) {
               const dot = document.createElement("button");
               dot.classList.add("dots-item");
               dot.addEventListener("click", () => {
                  this.goTo(i);
               });
               this.dots.appendChild(dot);
               this.dotContainer.appendChild(this.dots);
            }
            this.selector.parentNode.insertBefore(
               this.dotContainer,
               this.selector.nextSibling
            );
         }

         updateDots() {
            for (
               let i = 0;
               i < this.dots.querySelectorAll("button").length;
               i++
            ) {
               const addOrRemove = this.currentSlide === i ? "add" : "remove";
               this.dots
                  .querySelectorAll("button")
                  [i].classList[addOrRemove]("active");
            }
         }
         curentShowSlide() {
            return this.currentSlide;
         }
      }
      var reviewsSlider = new SiemaWithDots({
         selector: ".reviews-slider",
         duration: 400,
         easing: "ease-out",
         startIndex: 0,
         draggable: true,
         multipleDrag: true,
         threshold: 90,
         loop: false,
         rtl: false,
         perPage: 1,
         onInit: function () {
            this.addDots();
            this.updateDots();
         },
         onChange: function () {
            this.updateDots();
         },
      });
   });

   function setCookie(name, value) {
      var expires = "";
      expires = "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
      document.cookie = name + "=" + (value || "") + expires + "; path=/";
   }

   function getCookie(name) {
      var nameEQ = name + "=";
      var ca = document.cookie.split(";");
      for (var i = 0; i < ca.length; i++) {
         var c = ca[i];
         while (c.charAt(0) == " ") c = c.substring(1, c.length);
         if (c.indexOf(nameEQ) == 0)
            return c.substring(nameEQ.length, c.length);
      }
      return null;
   }

   let alertModal = document.querySelector(".cookies");
   let closeAlert = alertModal.querySelector(".applay-cookies");
   if (!getCookie("Cookies-alert")) {
      setTimeout(() => {
         alertModal.classList.add("show");
      }, 1000);
      closeAlert.addEventListener("click", function (e) {
         alertModal.classList.remove("show");
         setCookie("Cookies-alert", "show");
      });
   }

   var k = new Loader();
   k.require(["../js/scroll.js"]);

   document.body.classList.remove("loading");
   let last_known_scroll_position = 0;
   let ticking = false;

   function doSomething(scroll_pos) {
      animOnScroll();
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
         let animStart = 3;

         let animItemPoint = window.innerHeight - animItemHeight / animStart;
         if (animItemHeight > window.innerHeight) {
            animItemPoint = window.innerHeight - window.innerHeight / animStart;
         }
         if (
            pageYOffset > animItemOffset - animItemPoint &&
            pageYOffset < animItemOffset + animItemHeight
         ) {
            if (aminItem.classList.contains("hero-animation")) {
               aminItem.classList.add("will-start");
               setTimeout(() => {
                  aminItem.classList.add("animate-active");
               }, 300);
            } else {
               if (aminItem.getAttribute("data-delay")) {
                  aminItem.style.transitionDelay =
                     aminItem.getAttribute("data-delay") + "ms";
               }
               aminItem.classList.add("animate-active");
            }
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
   }, 50);

   let header = document.querySelector("header");
   let mobButton = document.querySelector(".mob-menu");
   mobButton.addEventListener("click", function (e) {
      header.classList.toggle("menu-show");
   });
});
