!(function (t, n) {
   "object" == typeof exports && "undefined" != typeof module
      ? (module.exports = n())
      : "function" == typeof define && define.amd
      ? define(n)
      : ((t = t || self).LazyLoad = n());
})(this, function () {
   "use strict";
   function n() {
      return (n =
         Object.assign ||
         function (t) {
            for (var n = 1; n < arguments.length; n++) {
               var e,
                  a = arguments[n];
               for (e in a)
                  Object.prototype.hasOwnProperty.call(a, e) && (t[e] = a[e]);
            }
            return t;
         }).apply(this, arguments);
   }
   function o(t) {
      return n({}, W, t);
   }
   function i(t, n) {
      var e,
         a = new t(n);
      try {
         e = new CustomEvent("LazyLoad::Initialized", {
            detail: { instance: a },
         });
      } catch (t) {
         (e = document.createEvent("CustomEvent")).initCustomEvent(
            "LazyLoad::Initialized",
            !1,
            !1,
            { instance: a }
         );
      }
      window.dispatchEvent(e);
   }
   function s(t, n) {
      return t.getAttribute("data-" + n);
   }
   function c(t, n, e) {
      (n = "data-" + n),
         null !== e ? t.setAttribute(n, e) : t.removeAttribute(n);
   }
   function d(t) {
      return s(t, "ll-status");
   }
   function f(t, n) {
      return c(t, "ll-status", n);
   }
   function _(t) {
      return f(t, null), 0;
   }
   function g(t) {
      return null === d(t);
   }
   function l(t) {
      return "native" === d(t);
   }
   function v(t, n, e, a) {
      t && (void 0 === a ? (void 0 === e ? t(n) : t(n, e)) : t(n, e, a));
   }
   function u(t, n) {
      K ? t.classList.add(n) : (t.className += (t.className ? " " : "") + n);
   }
   function p(t, n) {
      K
         ? t.classList.remove(n)
         : (t.className = t.className
              .replace(new RegExp("(^|\\s+)" + n + "(\\s+|$)"), " ")
              .replace(/^\s+/, "")
              .replace(/\s+$/, ""));
   }
   function b(t) {
      return t.llTempImage;
   }
   function h(t, n) {
      !n || ((n = n._observer) && n.unobserve(t));
   }
   function m(t, n) {
      t && (t.loadingCount += n);
   }
   function E(t, n) {
      t && (t.toLoadCount = n);
   }
   function e(t) {
      for (var n, e = [], a = 0; (n = t.children[a]); a += 1)
         "SOURCE" === n.tagName && e.push(n);
      return e;
   }
   function a(t, n, e) {
      e && t.setAttribute(n, e);
   }
   function r(t, n) {
      t.removeAttribute(n);
   }
   function I(t) {
      return !!t.llOriginalAttrs;
   }
   function y(t) {
      var n;
      I(t) ||
         (((n = {}).src = t.getAttribute("src")),
         (n.srcset = t.getAttribute("srcset")),
         (n.sizes = t.getAttribute("sizes")),
         (t.llOriginalAttrs = n));
   }
   function A(t) {
      var n;
      I(t) &&
         ((n = t.llOriginalAttrs),
         a(t, "src", n.src),
         a(t, "srcset", n.srcset),
         a(t, "sizes", n.sizes));
   }
   function L(t, n) {
      a(t, "sizes", s(t, n.data_sizes)),
         a(t, "srcset", s(t, n.data_srcset)),
         a(t, "src", s(t, n.data_src));
   }
   function w(t) {
      r(t, "src"), r(t, "srcset"), r(t, "sizes");
   }
   function z(t, n) {
      (t = t.parentNode) && "PICTURE" === t.tagName && e(t).forEach(n);
   }
   function k(t, n) {
      e(t).forEach(n);
   }
   function O(t, n) {
      var e = Y[t.tagName];
      e && e(t, n);
   }
   function C(t, n, e) {
      m(e, 1),
         u(t, n.class_loading),
         f(t, "loading"),
         v(n.callback_loading, t, e);
   }
   function N(t, n) {
      var e = Z[t.tagName];
      e
         ? e(t, n)
         : (c((t = t), (n = n).data_bg, null), c(t, n.data_bg_hidpi, null));
   }
   function x(t, n) {
      !n || 0 < n.loadingCount || 0 < n.toLoadCount || v(t.callback_finish, n);
   }
   function M(t, n, e) {
      t.addEventListener(n, e), (t.llEvLisnrs[n] = e);
   }
   function R(t) {
      return !!t.llEvLisnrs;
   }
   function G(t) {
      if (R(t)) {
         var n,
            e = t.llEvLisnrs;
         for (n in e) {
            var a = e[n];
            (i = n), (a = a), t.removeEventListener(i, a);
         }
         delete t.llEvLisnrs;
      }
      var i;
   }
   function T(t, n, e) {
      delete t.llTempImage,
         m(e, -1),
         e && --e.toLoadCount,
         p(t, n.class_loading),
         n.unobserve_completed && h(t, e);
   }
   function D(e, a, i) {
      var r = b(e) || e;
      R(r) ||
         (function (t) {
            R(t) || (t.llEvLisnrs = {});
            var n = "VIDEO" === t.tagName ? "loadeddata" : "load";
            M(t, n, function (t) {
               !(function (t, n, e, a) {
                  var i = l(n);
                  T(n, e, a),
                     u(n, e.class_loaded),
                     f(n, "loaded"),
                     N(n, e),
                     v(e.callback_loaded, n, a),
                     i || x(e, a);
               })(0, e, a, i),
                  G(r);
            }),
               M(t, "error", function (t) {
                  !(function (t, n, e, a) {
                     var i = l(n);
                     T(n, e, a),
                        u(n, e.class_error),
                        f(n, "error"),
                        v(e.callback_error, n, a),
                        i || x(e, a);
                  })(0, e, a, i),
                     G(r);
               });
         })(r);
   }
   function F(t, n, e) {
      var a, i, r, o, l;
      (t.llTempImage = document.createElement("IMG")),
         D(t, n, e),
         (r = e),
         (o = s((a = t), (i = n).data_bg)),
         (l = s(a, i.data_bg_hidpi)),
         (o = Q && l ? l : o) &&
            ((a.style.backgroundImage = 'url("'.concat(o, '")')),
            b(a).setAttribute("src", o),
            C(a, i, r)),
         (i = e),
         (t = s((r = t), (e = n).data_bg_multi)),
         (n = s(r, e.data_bg_multi_hidpi)),
         (n = Q && n ? n : t) &&
            ((r.style.backgroundImage = n),
            (t = i),
            u((n = r), (i = e).class_applied),
            f(n, "applied"),
            c((r = n), (e = i).data_bg_multi, null),
            c(r, e.data_bg_multi_hidpi, null),
            i.unobserve_completed && h(n, i),
            v(i.callback_applied, n, t));
   }
   function V(t, n, e) {
      var a, i, r;
      -1 < tt.indexOf(t.tagName)
         ? (D((a = t), (i = n), (r = e)), O(a, i), C(a, i, r))
         : F(t, n, e);
   }
   function j(t) {
      return t.use_native && "loading" in HTMLImageElement.prototype;
   }
   function P(t, c, u) {
      t.forEach(function (t) {
         return t.isIntersecting || 0 < t.intersectionRatio
            ? ((r = t.target),
              (o = t),
              (l = c),
              (s = u),
              f(r, "entered"),
              l.unobserve_entered && h(r, s),
              v(l.callback_enter, r, o, s),
              void (0 <= X.indexOf(d(r)) || V(r, l, s)))
            : ((n = t.target),
              (e = t),
              (a = c),
              (i = u),
              void (
                 g(n) ||
                 ((o = n),
                 (r = e),
                 (l = i),
                 (s = a).cancel_on_exit &&
                    "loading" === d(o) &&
                    "IMG" === o.tagName &&
                    (G(o),
                    z((t = o), function (t) {
                       w(t);
                    }),
                    w(t),
                    z((t = o), function (t) {
                       A(t);
                    }),
                    A(t),
                    p(o, s.class_loading),
                    m(l, -1),
                    _(o),
                    v(s.callback_cancel, o, r, l)),
                 v(a.callback_exit, n, e, i))
              ));
         var n, e, a, i, r, o, l, s;
      });
   }
   function S(t) {
      return Array.prototype.slice.call(t);
   }
   function U(t) {
      return t.container.querySelectorAll(t.elements_selector);
   }
   function $(t) {
      return "error" === d(t);
   }
   function q(t, n) {
      return (n = t || U(n)), S(n).filter(g);
   }
   function t(t, n) {
      var a,
         i,
         e,
         r,
         t = o(t);
      (this._settings = t),
         (this.loadingCount = 0),
         (e = t),
         (r = this),
         J &&
            !j(e) &&
            (r._observer = new IntersectionObserver(
               function (t) {
                  P(t, e, r);
               },
               {
                  root: e.container === document ? null : e.container,
                  rootMargin: e.thresholds || e.threshold + "px",
               }
            )),
         (a = t),
         (i = this),
         H &&
            window.addEventListener("online", function () {
               var n, t, e;
               (t = i),
                  (e = U((n = a))),
                  S(e)
                     .filter($)
                     .forEach(function (t) {
                        p(t, n.class_error), _(t);
                     }),
                  t.update();
            }),
         this.update(n);
   }
   var H = "undefined" != typeof window,
      B =
         (H && !("onscroll" in window)) ||
         ("undefined" != typeof navigator &&
            /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent)),
      J = H && "IntersectionObserver" in window,
      K = H && "classList" in document.createElement("p"),
      Q = H && 1 < window.devicePixelRatio,
      W = {
         elements_selector: ".lazy",
         container: B || H ? document : null,
         threshold: 300,
         thresholds: null,
         data_src: "src",
         data_srcset: "srcset",
         data_sizes: "sizes",
         data_bg: "bg",
         data_bg_hidpi: "bg-hidpi",
         data_bg_multi: "bg-multi",
         data_bg_multi_hidpi: "bg-multi-hidpi",
         data_poster: "poster",
         class_applied: "applied",
         class_loading: "loading",
         class_loaded: "loaded",
         class_error: "error",
         unobserve_completed: !0,
         unobserve_entered: !1,
         cancel_on_exit: !0,
         callback_enter: null,
         callback_exit: null,
         callback_applied: null,
         callback_loading: null,
         callback_loaded: null,
         callback_error: null,
         callback_finish: null,
         callback_cancel: null,
         use_native: !1,
      },
      X = ["loading", "loaded", "applied", "error"],
      Y = {
         IMG: function (t, n) {
            z(t, function (t) {
               y(t), L(t, n);
            }),
               y(t),
               L(t, n);
         },
         IFRAME: function (t, n) {
            a(t, "src", s(t, n.data_src));
         },
         VIDEO: function (t, n) {
            k(t, function (t) {
               a(t, "src", s(t, n.data_src));
            }),
               a(t, "poster", s(t, n.data_poster)),
               a(t, "src", s(t, n.data_src)),
               t.load();
         },
      },
      Z = {
         IMG: function (t, n) {
            c(t, n.data_src, null),
               c(t, n.data_srcset, null),
               c(t, n.data_sizes, null),
               z(t, function (t) {
                  c(t, n.data_srcset, null), c(t, n.data_sizes, null);
               });
         },
         IFRAME: function (t, n) {
            c(t, n.data_src, null);
         },
         VIDEO: function (t, n) {
            c(t, n.data_src, null),
               c(t, n.data_poster, null),
               k(t, function (t) {
                  c(t, n.data_src, null);
               });
         },
      },
      tt = ["IMG", "IFRAME", "VIDEO"],
      nt = ["IMG", "IFRAME"];
   return (
      (t.prototype = {
         update: function (t) {
            var n,
               e,
               a,
               i = this._settings,
               r = q(t, i);
            E(this, r.length),
               !B && J
                  ? j(i)
                     ? ((e = i),
                       (a = this),
                       r.forEach(function (t) {
                          var n;
                          -1 !== nt.indexOf(t.tagName) &&
                             (t.setAttribute("loading", "lazy"),
                             D((n = t), (t = e), a),
                             O(n, t),
                             N(n, t),
                             f(n, "native"));
                       }),
                       E(a, 0))
                     : ((t = r),
                       (i = this._observer).disconnect(),
                       (n = i),
                       t.forEach(function (t) {
                          n.observe(t);
                       }))
                  : this.loadAll(r);
         },
         destroy: function () {
            this._observer && this._observer.disconnect(),
               U(this._settings).forEach(function (t) {
                  delete t.llOriginalAttrs;
               }),
               delete this._observer,
               delete this._settings,
               delete this.loadingCount,
               delete this.toLoadCount;
         },
         loadAll: function (t) {
            var n = this,
               e = this._settings;
            q(t, e).forEach(function (t) {
               h(t, n), V(t, e, n);
            });
         },
      }),
      (t.load = function (t, n) {
         n = o(n);
         V(t, n);
      }),
      (t.resetStatus = function (t) {
         _(t);
      }),
      H &&
         (function (t, n) {
            if (n)
               if (n.length) for (var e, a = 0; (e = n[a]); a += 1) i(t, e);
               else i(t, n);
         })(t, window.lazyLoadOptions),
      t
   );
});
