window.Element &&
   !Element.prototype.closest &&
   (Element.prototype.closest = function (e) {
      var t,
         n = (this.document || this.ownerDocument).querySelectorAll(e),
         o = this;
      do {
         for (t = n.length; 0 <= --t && n.item(t) !== o; );
      } while (t < 0 && (o = o.parentElement));
      return o;
   }),
   (function () {
      function e(e, t) {
         t = t || { bubbles: !1, cancelable: !1, detail: void 0 };
         var n = document.createEvent("CustomEvent");
         return n.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), n;
      }
      "function" != typeof window.CustomEvent &&
         ((e.prototype = window.Event.prototype), (window.CustomEvent = e));
   })(),
   (function () {
      for (
         var r = 0, e = ["ms", "moz", "webkit", "o"], t = 0;
         t < e.length && !window.requestAnimationFrame;
         ++t
      )
         (window.requestAnimationFrame =
            window[e[t] + "RequestAnimationFrame"]),
            (window.cancelAnimationFrame =
               window[e[t] + "CancelAnimationFrame"] ||
               window[e[t] + "CancelRequestAnimationFrame"]);
      window.requestAnimationFrame ||
         (window.requestAnimationFrame = function (e, t) {
            var n = new Date().getTime(),
               o = Math.max(0, 16 - (n - r)),
               a = window.setTimeout(function () {
                  e(n + o);
               }, o);
            return (r = n + o), a;
         }),
         window.cancelAnimationFrame ||
            (window.cancelAnimationFrame = function (e) {
               clearTimeout(e);
            });
   })(),
   (function (e, t) {
      "function" == typeof define && define.amd
         ? define([], function () {
              return t(e);
           })
         : "object" == typeof exports
         ? (module.exports = t(e))
         : (e.SmoothScroll = t(e));
   })(
      "undefined" != typeof global
         ? global
         : "undefined" != typeof window
         ? window
         : this,
      function (S) {
         "use strict";
         function E() {
            var n = {};
            return (
               Array.prototype.forEach.call(arguments, function (e) {
                  for (var t in e) {
                     if (!e.hasOwnProperty(t)) return;
                     n[t] = e[t];
                  }
               }),
               n
            );
         }
         function i(e) {
            "#" === e.charAt(0) && (e = e.substr(1));
            for (
               var t,
                  n = String(e),
                  o = n.length,
                  a = -1,
                  r = "",
                  i = n.charCodeAt(0);
               ++a < o;

            ) {
               if (0 === (t = n.charCodeAt(a)))
                  throw new InvalidCharacterError(
                     "Invalid character: the input contains U+0000."
                  );
               r +=
                  (1 <= t && t <= 31) ||
                  127 == t ||
                  (0 === a && 48 <= t && t <= 57) ||
                  (1 === a && 48 <= t && t <= 57 && 45 === i)
                     ? "\\" + t.toString(16) + " "
                     : 128 <= t ||
                       45 === t ||
                       95 === t ||
                       (48 <= t && t <= 57) ||
                       (65 <= t && t <= 90) ||
                       (97 <= t && t <= 122)
                     ? n.charAt(a)
                     : "\\" + n.charAt(a);
            }
            return "#" + r;
         }
         function b() {
            return Math.max(
               document.body.scrollHeight,
               document.documentElement.scrollHeight,
               document.body.offsetHeight,
               document.documentElement.offsetHeight,
               document.body.clientHeight,
               document.documentElement.clientHeight
            );
         }
         function A(e, t, n, o) {
            t.emitEvents &&
               "function" == typeof S.CustomEvent &&
               ((o = new CustomEvent(e, {
                  bubbles: !0,
                  detail: { anchor: n, toggle: o },
               })),
               document.dispatchEvent(o));
         }
         var O = {
            ignore: "[data-scroll-ignore]",
            header: null,
            topOnEmptyHash: !0,
            speed: 500,
            speedAsDuration: !1,
            durationMax: null,
            durationMin: null,
            clip: !0,
            offset: 0,
            easing: "easeInOutCubic",
            customEasing: null,
            updateURL: !0,
            popstate: !0,
            emitEvents: !0,
         };
         return function (a, e) {
            var y,
               r,
               n,
               w,
               v = {
                  cancelScroll: function (e) {
                     cancelAnimationFrame(w),
                        (w = null),
                        e || A("scrollCancel", y);
                  },
               };
            v.animateScroll = function (a, r, e) {
               v.cancelScroll();
               var i,
                  s,
                  c,
                  u,
                  l,
                  d,
                  m,
                  f,
                  h,
                  p = E(y || O, e || {}),
                  g = "[object Number]" === Object.prototype.toString.call(a),
                  t = g || !a.tagName ? null : a;
               (g || t) &&
                  ((i = S.pageYOffset),
                  p.header && !n && (n = document.querySelector(p.header)),
                  (e = (e = n)
                     ? parseInt(S.getComputedStyle(e).height, 10) + e.offsetTop
                     : 0),
                  (u = g
                     ? a
                     : (function (e, t, n, o) {
                          var a = 0;
                          if (e.offsetParent)
                             for (; (a += e.offsetTop), (e = e.offsetParent); );
                          return (
                             (a = Math.max(a - t - n, 0)),
                             o && (a = Math.min(a, b() - S.innerHeight)),
                             a
                          );
                       })(
                          t,
                          e,
                          parseInt(
                             "function" == typeof p.offset
                                ? p.offset(a, r)
                                : p.offset,
                             10
                          ),
                          p.clip
                       )),
                  (l = u - i),
                  (d = b()),
                  (m = 0),
                  (e = (t = p).speedAsDuration
                     ? t.speed
                     : Math.abs((l / 1e3) * t.speed)),
                  (f =
                     t.durationMax && e > t.durationMax
                        ? t.durationMax
                        : t.durationMin && e < t.durationMin
                        ? t.durationMin
                        : parseInt(e, 10)),
                  (h = function (e) {
                     var t, n, o;
                     (m += e - (s = s || e)),
                        (c =
                           i +
                           l *
                              ((n = c = 1 < (c = 0 === f ? 0 : m / f) ? 1 : c),
                              "easeInQuad" === p.easing && (o = n * n),
                              "easeOutQuad" === p.easing && (o = n * (2 - n)),
                              "easeInOutQuad" === p.easing &&
                                 (o =
                                    n < 0.5 ? 2 * n * n : (4 - 2 * n) * n - 1),
                              "easeInCubic" === p.easing && (o = n * n * n),
                              "easeOutCubic" === p.easing &&
                                 (o = --n * n * n + 1),
                              "easeInOutCubic" === p.easing &&
                                 (o =
                                    n < 0.5
                                       ? 4 * n * n * n
                                       : (n - 1) * (2 * n - 2) * (2 * n - 2) +
                                         1),
                              "easeInQuart" === p.easing && (o = n * n * n * n),
                              "easeOutQuart" === p.easing &&
                                 (o = 1 - --n * n * n * n),
                              "easeInOutQuart" === p.easing &&
                                 (o =
                                    n < 0.5
                                       ? 8 * n * n * n * n
                                       : 1 - 8 * --n * n * n * n),
                              "easeInQuint" === p.easing &&
                                 (o = n * n * n * n * n),
                              "easeOutQuint" === p.easing &&
                                 (o = 1 + --n * n * n * n * n),
                              "easeInOutQuint" === p.easing &&
                                 (o =
                                    n < 0.5
                                       ? 16 * n * n * n * n * n
                                       : 1 + 16 * --n * n * n * n * n),
                              p.customEasing && (o = p.customEasing(n)),
                              o || n)),
                        S.scrollTo(0, Math.floor(c)),
                        (t = u),
                        (o = S.pageYOffset),
                        ((c == t ||
                           o == t ||
                           (i < t && S.innerHeight + o) >= d) &&
                           (v.cancelScroll(!0),
                           (n = t),
                           (o = g),
                           0 === (t = a) && document.body.focus(),
                           o ||
                              (t.focus(),
                              document.activeElement !== t &&
                                 (t.setAttribute("tabindex", "-1"),
                                 t.focus(),
                                 (t.style.outline = "none")),
                              S.scrollTo(0, n)),
                           A("scrollStop", p, a, r),
                           !(w = s = null))) ||
                           ((w = S.requestAnimationFrame(h)), (s = e));
                  }),
                  0 === S.pageYOffset && S.scrollTo(0, 0),
                  (e = a),
                  g ||
                     (history.pushState &&
                        p.updateURL &&
                        history.pushState(
                           { smoothScroll: JSON.stringify(p), anchor: e.id },
                           document.title,
                           e === document.documentElement ? "#top" : "#" + e.id
                        )),
                  "matchMedia" in S &&
                  S.matchMedia("(prefers-reduced-motion)").matches
                     ? S.scrollTo(0, Math.floor(u))
                     : (A("scrollStart", p, a, r),
                       v.cancelScroll(!0),
                       S.requestAnimationFrame(h)));
            };
            function t(e) {
               if (
                  !e.defaultPrevented &&
                  !(0 !== e.button || e.metaKey || e.ctrlKey || e.shiftKey) &&
                  "closest" in e.target &&
                  (r = e.target.closest(a)) &&
                  "a" === r.tagName.toLowerCase() &&
                  !e.target.closest(y.ignore) &&
                  r.hostname === S.location.hostname &&
                  r.pathname === S.location.pathname &&
                  /#/.test(r.href)
               ) {
                  var t, n;
                  try {
                     t = i(decodeURIComponent(r.hash));
                  } catch (e) {
                     t = i(r.hash);
                  }
                  if ("#" === t) {
                     if (!y.topOnEmptyHash) return;
                     n = document.documentElement;
                  } else n = document.querySelector(t);
                  (n = n || "#top" !== t ? n : document.documentElement) &&
                     (e.preventDefault(),
                     history.replaceState &&
                        y.updateURL &&
                        !history.state &&
                        ((o = (o = S.location.hash) || ""),
                        history.replaceState(
                           {
                              smoothScroll: JSON.stringify(y),
                              anchor: o || S.pageYOffset,
                           },
                           document.title,
                           o || S.location.href
                        )),
                     v.animateScroll(n, r));
               }
               var o;
            }
            function o(e) {
               var t;
               null !== history.state &&
                  history.state.smoothScroll &&
                  history.state.smoothScroll === JSON.stringify(y) &&
                  (("string" == typeof (t = history.state.anchor) &&
                     t &&
                     !(t = document.querySelector(i(history.state.anchor)))) ||
                     v.animateScroll(t, null, { updateURL: !1 }));
            }
            return (
               (v.destroy = function () {
                  y &&
                     (document.removeEventListener("click", t, !1),
                     S.removeEventListener("popstate", o, !1),
                     v.cancelScroll(),
                     (w = n = r = y = null));
               }),
               (function () {
                  if (
                     !(
                        "querySelector" in document &&
                        "addEventListener" in S &&
                        "requestAnimationFrame" in S &&
                        "closest" in S.Element.prototype
                     )
                  )
                     throw "Smooth Scroll: This browser does not support the required JavaScript methods and browser APIs.";
                  v.destroy(),
                     (y = E(O, e || {})),
                     (n = y.header ? document.querySelector(y.header) : null),
                     document.addEventListener("click", t, !1),
                     y.updateURL &&
                        y.popstate &&
                        S.addEventListener("popstate", o, !1);
               })(),
               v
            );
         };
      }
   );
var scroll = new SmoothScroll('a[href*="#"]', {
   speed: 500,
   speedAsDuration: !0,
});
