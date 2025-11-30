import {
  FormControl_exports,
  init_FormControl,
  require_prop_types
} from "./chunk-L66AHSIG.js";
import "./chunk-6UGS3JE2.js";
import {
  require_react
} from "./chunk-N7PDAELF.js";
import {
  __commonJS,
  __toCommonJS
} from "./chunk-EWTE5DHJ.js";

// node_modules/time-number/dist/time-number.js
var require_time_number = __commonJS({
  "node_modules/time-number/dist/time-number.js"(exports, module) {
    module.exports = function(e) {
      function r(n) {
        if (t[n]) return t[n].exports;
        var o = t[n] = { exports: {}, id: n, loaded: false };
        return e[n].call(o.exports, o, o.exports, r), o.loaded = true, o.exports;
      }
      var t = {};
      return r.m = e, r.c = t, r.p = "", r(0);
    }([function(e, r, t) {
      e.exports = t(1);
    }, function(e, r) {
      "use strict";
      function t(e2) {
        return "time-number" === e2.message.substring(0, 11);
      }
      function n(e2) {
        for (var r2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 2, t2 = e2.toString(), n2 = r2 - t2.length, o2 = ""; o2.length < n2; ) o2 += "0";
        return "" + o2 + t2;
      }
      function o(e2, r2) {
        var t2 = r2.validate, o2 = r2.format, a2 = r2.leadingZero, i2 = parseInt(e2, 10);
        if (t2 && (i2 < 0 || i2 >= 86400)) throw new RangeError("time-number, timeFromInt(): rangeError, value supposed to be between 0 and 86399");
        var u2 = Math.floor(i2 / 3600), m2 = Math.floor((i2 - 3600 * u2) / 60), d2 = i2 - 3600 * u2 - 60 * m2, s = null;
        12 !== o2 && "12" !== o2 || (s = u2 < 12 ? "AM" : "PM", 0 === u2 ? u2 = 12 : u2 > 12 && (u2 -= 12));
        var f = [a2 ? n(u2) : u2, n(m2)];
        d2 && f.push(n(d2));
        var l = f.join(":");
        return s ? l + " " + s : l;
      }
      function a(e2) {
        return "boolean" == typeof e2 ? { validate: e2 } : e2;
      }
      function i(e2) {
        var r2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n2 = { validate: true, format: 24, leadingZero: true }, i2 = Object.assign({}, n2, a(r2)), u2 = i2.validate;
        if (!u2) return o(e2, i2);
        try {
          if (e2 - parseFloat(e2, 10) + 1 >= 0) return o(e2, i2);
          throw new Error();
        } catch (r3) {
          if (t(r3)) throw r3;
          throw new Error("time-number, timeFromInt(): invalud value: '" + e2 + "', supposed to be number");
        }
      }
      function u(e2, r2) {
        for (var t2 = r2.validate, n2 = e2.split(":"), o2 = n2.length; n2.length < 3; ) n2.push("0");
        var a2 = n2.map(function(e3) {
          return parseInt(e3, 10);
        });
        if (t2) {
          var i2 = a2[0];
          if (i2 < 0 || i2 > 23) throw new RangeError("time-number, timeToInt(): hours must be between 0 and 23, provided value: '" + e2 + "'");
          if (o2 > 1) {
            var u2 = a2[1];
            if (u2 < 0 || u2 > 59) throw new RangeError("time-number, timeToInt(): minutes must be between 0 and 59, provided value: '" + e2 + "'");
          }
          if (o2 > 2) {
            var m2 = a2[2];
            if (m2 < 0 || m2 > 59) throw new RangeError("time-number, timeToInt(): seconds must be between 0 and 59, provided value: '" + e2 + "'");
          }
        }
        return 3600 * a2[0] + 60 * a2[1] + a2[2];
      }
      function m(e2) {
        if (!e2 || !e2.match) return e2;
        if (!e2.match(/(am|pm)$/i)) return e2;
        if (e2.match(/^0+:/)) throw new Error("12h format can't have 00:30 AM, it should be 12:30 AM instead");
        return e2.match(/am$/i) ? e2.replace(/^(\d+)/, function(e3) {
          return "12" === e3 ? "0" : e3;
        }).replace(/\s*am$/i, "") : e2.replace(/^(\d+)/, function(e3) {
          return "12" === e3 ? e3 : (parseInt(e3, 10) + 12).toString();
        }).replace(/\s*pm$/i, "");
      }
      function d(e2) {
        var r2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n2 = { validate: true }, o2 = Object.assign({}, n2, a(r2)), i2 = o2.validate;
        if (!i2) {
          var d2 = m(e2);
          return u(d2, o2);
        }
        try {
          var s = m(e2);
          if (!s.match(/^\d+(:\d+(:\d+)?)?$/)) throw new Error();
          return u(s, o2);
        } catch (r3) {
          if (t(r3)) throw r3;
          throw new Error("time-number, timeToInt(): supported formats are 'HH', 'HH:mm', 'HH:mm:ss', provided value: '" + e2 + "' doesn't match any of them");
        }
      }
      Object.defineProperty(r, "__esModule", { value: true }), r.timeFromInt = i, r.timeToInt = d;
    }]);
  }
});

// node_modules/react-bootstrap-time-picker/dist/bundle.js
var require_bundle = __commonJS({
  "node_modules/react-bootstrap-time-picker/dist/bundle.js"(exports, module) {
    module.exports = function(t) {
      function e(r) {
        if (n[r]) return n[r].exports;
        var o = n[r] = { i: r, l: false, exports: {} };
        return t[r].call(o.exports, o, o.exports, e), o.l = true, o.exports;
      }
      var n = {};
      return e.m = t, e.c = n, e.d = function(t2, n2, r) {
        e.o(t2, n2) || Object.defineProperty(t2, n2, { configurable: false, enumerable: true, get: r });
      }, e.n = function(t2) {
        var n2 = t2 && t2.__esModule ? function() {
          return t2.default;
        } : function() {
          return t2;
        };
        return e.d(n2, "a", n2), n2;
      }, e.o = function(t2, e2) {
        return Object.prototype.hasOwnProperty.call(t2, e2);
      }, e.p = "", e(e.s = 0);
    }([function(t, e, n) {
      t.exports = n(1);
    }, function(t, e, n) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: true });
      var r = n(2);
      e.default = r.a;
    }, function(t, e, n) {
      "use strict";
      function r() {
        return r = Object.assign || function(t2) {
          for (var e2 = 1; e2 < arguments.length; e2++) {
            var n2 = arguments[e2];
            for (var r2 in n2) Object.prototype.hasOwnProperty.call(n2, r2) && (t2[r2] = n2[r2]);
          }
          return t2;
        }, r.apply(this, arguments);
      }
      function o(t2, e2) {
        if (null == t2) return {};
        var n2, r2, o2 = a(t2, e2);
        if (Object.getOwnPropertySymbols) {
          var u2 = Object.getOwnPropertySymbols(t2);
          for (r2 = 0; r2 < u2.length; r2++) n2 = u2[r2], e2.indexOf(n2) >= 0 || Object.prototype.propertyIsEnumerable.call(t2, n2) && (o2[n2] = t2[n2]);
        }
        return o2;
      }
      function a(t2, e2) {
        if (null == t2) return {};
        var n2, r2, o2 = {}, a2 = Object.keys(t2);
        for (r2 = 0; r2 < a2.length; r2++) n2 = a2[r2], e2.indexOf(n2) >= 0 || (o2[n2] = t2[n2]);
        return o2;
      }
      function u(t2) {
        function e2(t3) {
          var e3 = Object(v.timeFromInt)(t3, false);
          if (24 === l2) return e3;
          var n3 = e3.match(/^(\d+):/), r2 = parseInt(n3[1], 10);
          if (0 === r2) return "".concat(e3.replace(/^\d+/, "12"), " AM");
          if (r2 < 12) return "".concat(e3, " AM");
          if (12 === r2) return "".concat(e3, " PM");
          var o2 = r2 < 22 ? "0".concat(r2 - 12) : (r2 - 12).toString();
          return "".concat(e3.replace(/^\d+/, o2), " PM");
        }
        function n2() {
          for (var t3 = [], e3 = Object(v.timeToInt)(u2, false), n3 = Object(v.timeToInt)(y, false); n3 <= e3; n3 += 60 * g) t3.push(n3);
          return t3;
        }
        var a2 = t2.end, u2 = void 0 === a2 ? "23:59" : a2, i2 = t2.format, l2 = void 0 === i2 ? 12 : i2, f2 = t2.initialValue, p2 = void 0 === f2 ? "00:00" : f2, m2 = t2.onChange, d = void 0 === m2 ? function() {
        } : m2, b = t2.start, y = void 0 === b ? "00:00" : b, O = t2.step, g = void 0 === O ? 30 : O, h = t2.value, j = void 0 === h ? null : h, x = o(t2, ["end", "format", "initialValue", "onChange", "start", "step", "value"]), I = function() {
          return n2().map(function(t3) {
            return { key: t3, val: e2(t3) };
          });
        }(), P = I.map(function(t3) {
          var e3 = t3.key, n3 = t3.val;
          return c.a.createElement("option", { key: e3, value: e3 }, n3);
        }), M = j || p2;
        try {
          M = Object(v.timeToInt)(M);
        } catch (t3) {
          M = parseInt(M, 10);
        }
        return I.filter(function(t3) {
          var e3 = t3.key;
          return M === e3;
        }).length || (M = Object(v.timeToInt)(y)), c.a.createElement(s.a, r({ as: "select", onChange: function(t3) {
          d(parseInt(t3.target.value, 10));
        }, value: M }, x), P);
      }
      var i = n(3), c = n.n(i), l = n(4), f = n.n(l), p = n(5), s = n.n(p), v = n(6), m = (n.n(v), { end: f.a.string, format: f.a.number, initialValue: f.a.any, onChange: f.a.func, start: f.a.string, step: f.a.number, value: f.a.any });
      u.propTypes = m, e.a = u;
    }, function(t, e) {
      t.exports = require_react();
    }, function(t, e) {
      t.exports = require_prop_types();
    }, function(t, e) {
      t.exports = (init_FormControl(), __toCommonJS(FormControl_exports));
    }, function(t, e) {
      t.exports = require_time_number();
    }]);
  }
});
export default require_bundle();
//# sourceMappingURL=react-bootstrap-time-picker.js.map
