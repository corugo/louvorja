var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { s as shallowRef, u as unref, c as computed, r as reactive, n as nextTick, d as defineComponent$1, i as inject$1, h, p as provide, a as ref, w as watch, e as effectScope, m as markRaw, b as isRef, f as isReactive, t as toRaw, g as getCurrentScope, o as onScopeDispose, j as getCurrentInstance$1, k as toRefs, l as watchEffect, q as capitalize$2, v as shallowReactive, x as camelize, y as createVNode, z as mergeProps, A as onBeforeUnmount, B as readonly, C as onDeactivated, D as onActivated, E as onMounted, _ as _export_sfc, F as CONFIG, G as openBlock, H as createBlock, I as withCtx, J as createTextVNode, K as createElementBlock, L as renderList, M as Fragment, N as withModifiers, O as createBaseVNode, P as normalizeStyle, T as Transition, Q as resolveDynamicComponent, R as resolveComponent, S as toDisplayString$1, U as pushScopeId, V as popScopeId, W as TransitionGroup, X as onBeforeMount, Y as withDirectives, Z as resolveDirective, $ as vShow, a0 as toRef, a1 as Text, a2 as cloneVNode, a3 as toHandlers, a4 as Teleport, a5 as onBeforeUpdate, a6 as vModelText, a7 as onUnmounted, a8 as renderSlot, a9 as createApp } from "./_plugin-vue_export-helper-7660c2c6.js";
const control = "";
const _imports_0 = "" + new URL("louvor-ja-9a86ca8e.svg", import.meta.url).href;
/*!
  * vue-router v4.1.6
  * (c) 2022 Eduardo San Martin Morote
  * @license MIT
  */
const isBrowser = typeof window !== "undefined";
function isESModule(obj) {
  return obj.__esModule || obj[Symbol.toStringTag] === "Module";
}
const assign$2 = Object.assign;
function applyToParams(fn, params) {
  const newParams = {};
  for (const key in params) {
    const value = params[key];
    newParams[key] = isArray$1(value) ? value.map(fn) : fn(value);
  }
  return newParams;
}
const noop$1 = () => {
};
const isArray$1 = Array.isArray;
const TRAILING_SLASH_RE = /\/$/;
const removeTrailingSlash = (path) => path.replace(TRAILING_SLASH_RE, "");
function parseURL(parseQuery2, location2, currentLocation = "/") {
  let path, query = {}, searchString = "", hash = "";
  const hashPos = location2.indexOf("#");
  let searchPos = location2.indexOf("?");
  if (hashPos < searchPos && hashPos >= 0) {
    searchPos = -1;
  }
  if (searchPos > -1) {
    path = location2.slice(0, searchPos);
    searchString = location2.slice(searchPos + 1, hashPos > -1 ? hashPos : location2.length);
    query = parseQuery2(searchString);
  }
  if (hashPos > -1) {
    path = path || location2.slice(0, hashPos);
    hash = location2.slice(hashPos, location2.length);
  }
  path = resolveRelativePath(path != null ? path : location2, currentLocation);
  return {
    fullPath: path + (searchString && "?") + searchString + hash,
    path,
    query,
    hash
  };
}
function stringifyURL(stringifyQuery2, location2) {
  const query = location2.query ? stringifyQuery2(location2.query) : "";
  return location2.path + (query && "?") + query + (location2.hash || "");
}
function stripBase(pathname, base) {
  if (!base || !pathname.toLowerCase().startsWith(base.toLowerCase()))
    return pathname;
  return pathname.slice(base.length) || "/";
}
function isSameRouteLocation(stringifyQuery2, a, b) {
  const aLastIndex = a.matched.length - 1;
  const bLastIndex = b.matched.length - 1;
  return aLastIndex > -1 && aLastIndex === bLastIndex && isSameRouteRecord(a.matched[aLastIndex], b.matched[bLastIndex]) && isSameRouteLocationParams(a.params, b.params) && stringifyQuery2(a.query) === stringifyQuery2(b.query) && a.hash === b.hash;
}
function isSameRouteRecord(a, b) {
  return (a.aliasOf || a) === (b.aliasOf || b);
}
function isSameRouteLocationParams(a, b) {
  if (Object.keys(a).length !== Object.keys(b).length)
    return false;
  for (const key in a) {
    if (!isSameRouteLocationParamsValue(a[key], b[key]))
      return false;
  }
  return true;
}
function isSameRouteLocationParamsValue(a, b) {
  return isArray$1(a) ? isEquivalentArray(a, b) : isArray$1(b) ? isEquivalentArray(b, a) : a === b;
}
function isEquivalentArray(a, b) {
  return isArray$1(b) ? a.length === b.length && a.every((value, i2) => value === b[i2]) : a.length === 1 && a[0] === b;
}
function resolveRelativePath(to, from) {
  if (to.startsWith("/"))
    return to;
  if (!to)
    return from;
  const fromSegments = from.split("/");
  const toSegments = to.split("/");
  let position = fromSegments.length - 1;
  let toPosition;
  let segment;
  for (toPosition = 0; toPosition < toSegments.length; toPosition++) {
    segment = toSegments[toPosition];
    if (segment === ".")
      continue;
    if (segment === "..") {
      if (position > 1)
        position--;
    } else
      break;
  }
  return fromSegments.slice(0, position).join("/") + "/" + toSegments.slice(toPosition - (toPosition === toSegments.length ? 1 : 0)).join("/");
}
var NavigationType;
(function(NavigationType2) {
  NavigationType2["pop"] = "pop";
  NavigationType2["push"] = "push";
})(NavigationType || (NavigationType = {}));
var NavigationDirection;
(function(NavigationDirection2) {
  NavigationDirection2["back"] = "back";
  NavigationDirection2["forward"] = "forward";
  NavigationDirection2["unknown"] = "";
})(NavigationDirection || (NavigationDirection = {}));
function normalizeBase(base) {
  if (!base) {
    if (isBrowser) {
      const baseEl = document.querySelector("base");
      base = baseEl && baseEl.getAttribute("href") || "/";
      base = base.replace(/^\w+:\/\/[^\/]+/, "");
    } else {
      base = "/";
    }
  }
  if (base[0] !== "/" && base[0] !== "#")
    base = "/" + base;
  return removeTrailingSlash(base);
}
const BEFORE_HASH_RE = /^[^#]+#/;
function createHref(base, location2) {
  return base.replace(BEFORE_HASH_RE, "#") + location2;
}
function getElementPosition(el, offset) {
  const docRect = document.documentElement.getBoundingClientRect();
  const elRect = el.getBoundingClientRect();
  return {
    behavior: offset.behavior,
    left: elRect.left - docRect.left - (offset.left || 0),
    top: elRect.top - docRect.top - (offset.top || 0)
  };
}
const computeScrollPosition = () => ({
  left: window.pageXOffset,
  top: window.pageYOffset
});
function scrollToPosition(position) {
  let scrollToOptions;
  if ("el" in position) {
    const positionEl = position.el;
    const isIdSelector = typeof positionEl === "string" && positionEl.startsWith("#");
    const el = typeof positionEl === "string" ? isIdSelector ? document.getElementById(positionEl.slice(1)) : document.querySelector(positionEl) : positionEl;
    if (!el) {
      return;
    }
    scrollToOptions = getElementPosition(el, position);
  } else {
    scrollToOptions = position;
  }
  if ("scrollBehavior" in document.documentElement.style)
    window.scrollTo(scrollToOptions);
  else {
    window.scrollTo(scrollToOptions.left != null ? scrollToOptions.left : window.pageXOffset, scrollToOptions.top != null ? scrollToOptions.top : window.pageYOffset);
  }
}
function getScrollKey(path, delta2) {
  const position = history.state ? history.state.position - delta2 : -1;
  return position + path;
}
const scrollPositions = /* @__PURE__ */ new Map();
function saveScrollPosition(key, scrollPosition) {
  scrollPositions.set(key, scrollPosition);
}
function getSavedScrollPosition(key) {
  const scroll = scrollPositions.get(key);
  scrollPositions.delete(key);
  return scroll;
}
let createBaseLocation = () => location.protocol + "//" + location.host;
function createCurrentLocation(base, location2) {
  const { pathname, search, hash } = location2;
  const hashPos = base.indexOf("#");
  if (hashPos > -1) {
    let slicePos = hash.includes(base.slice(hashPos)) ? base.slice(hashPos).length : 1;
    let pathFromHash = hash.slice(slicePos);
    if (pathFromHash[0] !== "/")
      pathFromHash = "/" + pathFromHash;
    return stripBase(pathFromHash, "");
  }
  const path = stripBase(pathname, base);
  return path + search + hash;
}
function useHistoryListeners(base, historyState, currentLocation, replace2) {
  let listeners = [];
  let teardowns = [];
  let pauseState = null;
  const popStateHandler = ({ state }) => {
    const to = createCurrentLocation(base, location);
    const from = currentLocation.value;
    const fromState = historyState.value;
    let delta2 = 0;
    if (state) {
      currentLocation.value = to;
      historyState.value = state;
      if (pauseState && pauseState === from) {
        pauseState = null;
        return;
      }
      delta2 = fromState ? state.position - fromState.position : 0;
    } else {
      replace2(to);
    }
    listeners.forEach((listener) => {
      listener(currentLocation.value, from, {
        delta: delta2,
        type: NavigationType.pop,
        direction: delta2 ? delta2 > 0 ? NavigationDirection.forward : NavigationDirection.back : NavigationDirection.unknown
      });
    });
  };
  function pauseListeners() {
    pauseState = currentLocation.value;
  }
  function listen(callback) {
    listeners.push(callback);
    const teardown = () => {
      const index = listeners.indexOf(callback);
      if (index > -1)
        listeners.splice(index, 1);
    };
    teardowns.push(teardown);
    return teardown;
  }
  function beforeUnloadListener() {
    const { history: history2 } = window;
    if (!history2.state)
      return;
    history2.replaceState(assign$2({}, history2.state, { scroll: computeScrollPosition() }), "");
  }
  function destroy() {
    for (const teardown of teardowns)
      teardown();
    teardowns = [];
    window.removeEventListener("popstate", popStateHandler);
    window.removeEventListener("beforeunload", beforeUnloadListener);
  }
  window.addEventListener("popstate", popStateHandler);
  window.addEventListener("beforeunload", beforeUnloadListener);
  return {
    pauseListeners,
    listen,
    destroy
  };
}
function buildState(back, current, forward, replaced = false, computeScroll = false) {
  return {
    back,
    current,
    forward,
    replaced,
    position: window.history.length,
    scroll: computeScroll ? computeScrollPosition() : null
  };
}
function useHistoryStateNavigation(base) {
  const { history: history2, location: location2 } = window;
  const currentLocation = {
    value: createCurrentLocation(base, location2)
  };
  const historyState = { value: history2.state };
  if (!historyState.value) {
    changeLocation(currentLocation.value, {
      back: null,
      current: currentLocation.value,
      forward: null,
      // the length is off by one, we need to decrease it
      position: history2.length - 1,
      replaced: true,
      // don't add a scroll as the user may have an anchor, and we want
      // scrollBehavior to be triggered without a saved position
      scroll: null
    }, true);
  }
  function changeLocation(to, state, replace3) {
    const hashIndex = base.indexOf("#");
    const url = hashIndex > -1 ? (location2.host && document.querySelector("base") ? base : base.slice(hashIndex)) + to : createBaseLocation() + base + to;
    try {
      history2[replace3 ? "replaceState" : "pushState"](state, "", url);
      historyState.value = state;
    } catch (err) {
      {
        console.error(err);
      }
      location2[replace3 ? "replace" : "assign"](url);
    }
  }
  function replace2(to, data2) {
    const state = assign$2({}, history2.state, buildState(
      historyState.value.back,
      // keep back and forward entries but override current position
      to,
      historyState.value.forward,
      true
    ), data2, { position: historyState.value.position });
    changeLocation(to, state, true);
    currentLocation.value = to;
  }
  function push2(to, data2) {
    const currentState = assign$2(
      {},
      // use current history state to gracefully handle a wrong call to
      // history.replaceState
      // https://github.com/vuejs/router/issues/366
      historyState.value,
      history2.state,
      {
        forward: to,
        scroll: computeScrollPosition()
      }
    );
    changeLocation(currentState.current, currentState, true);
    const state = assign$2({}, buildState(currentLocation.value, to, null), { position: currentState.position + 1 }, data2);
    changeLocation(to, state, false);
    currentLocation.value = to;
  }
  return {
    location: currentLocation,
    state: historyState,
    push: push2,
    replace: replace2
  };
}
function createWebHistory(base) {
  base = normalizeBase(base);
  const historyNavigation = useHistoryStateNavigation(base);
  const historyListeners = useHistoryListeners(base, historyNavigation.state, historyNavigation.location, historyNavigation.replace);
  function go(delta2, triggerListeners = true) {
    if (!triggerListeners)
      historyListeners.pauseListeners();
    history.go(delta2);
  }
  const routerHistory = assign$2({
    // it's overridden right after
    location: "",
    base,
    go,
    createHref: createHref.bind(null, base)
  }, historyNavigation, historyListeners);
  Object.defineProperty(routerHistory, "location", {
    enumerable: true,
    get: () => historyNavigation.location.value
  });
  Object.defineProperty(routerHistory, "state", {
    enumerable: true,
    get: () => historyNavigation.state.value
  });
  return routerHistory;
}
function createWebHashHistory(base) {
  base = location.host ? base || location.pathname + location.search : "";
  if (!base.includes("#"))
    base += "#";
  return createWebHistory(base);
}
function isRouteLocation(route) {
  return typeof route === "string" || route && typeof route === "object";
}
function isRouteName(name2) {
  return typeof name2 === "string" || typeof name2 === "symbol";
}
const START_LOCATION_NORMALIZED = {
  path: "/",
  name: void 0,
  params: {},
  query: {},
  hash: "",
  fullPath: "/",
  matched: [],
  meta: {},
  redirectedFrom: void 0
};
const NavigationFailureSymbol = Symbol("");
var NavigationFailureType;
(function(NavigationFailureType2) {
  NavigationFailureType2[NavigationFailureType2["aborted"] = 4] = "aborted";
  NavigationFailureType2[NavigationFailureType2["cancelled"] = 8] = "cancelled";
  NavigationFailureType2[NavigationFailureType2["duplicated"] = 16] = "duplicated";
})(NavigationFailureType || (NavigationFailureType = {}));
function createRouterError(type, params) {
  {
    return assign$2(new Error(), {
      type,
      [NavigationFailureSymbol]: true
    }, params);
  }
}
function isNavigationFailure(error, type) {
  return error instanceof Error && NavigationFailureSymbol in error && (type == null || !!(error.type & type));
}
const BASE_PARAM_PATTERN = "[^/]+?";
const BASE_PATH_PARSER_OPTIONS = {
  sensitive: false,
  strict: false,
  start: true,
  end: true
};
const REGEX_CHARS_RE = /[.+*?^${}()[\]/\\]/g;
function tokensToParser(segments, extraOptions) {
  const options = assign$2({}, BASE_PATH_PARSER_OPTIONS, extraOptions);
  const score = [];
  let pattern = options.start ? "^" : "";
  const keys3 = [];
  for (const segment of segments) {
    const segmentScores = segment.length ? [] : [
      90
      /* PathScore.Root */
    ];
    if (options.strict && !segment.length)
      pattern += "/";
    for (let tokenIndex = 0; tokenIndex < segment.length; tokenIndex++) {
      const token = segment[tokenIndex];
      let subSegmentScore = 40 + (options.sensitive ? 0.25 : 0);
      if (token.type === 0) {
        if (!tokenIndex)
          pattern += "/";
        pattern += token.value.replace(REGEX_CHARS_RE, "\\$&");
        subSegmentScore += 40;
      } else if (token.type === 1) {
        const { value, repeatable, optional, regexp } = token;
        keys3.push({
          name: value,
          repeatable,
          optional
        });
        const re4 = regexp ? regexp : BASE_PARAM_PATTERN;
        if (re4 !== BASE_PARAM_PATTERN) {
          subSegmentScore += 10;
          try {
            new RegExp(`(${re4})`);
          } catch (err) {
            throw new Error(`Invalid custom RegExp for param "${value}" (${re4}): ` + err.message);
          }
        }
        let subPattern = repeatable ? `((?:${re4})(?:/(?:${re4}))*)` : `(${re4})`;
        if (!tokenIndex)
          subPattern = // avoid an optional / if there are more segments e.g. /:p?-static
          // or /:p?-:p2
          optional && segment.length < 2 ? `(?:/${subPattern})` : "/" + subPattern;
        if (optional)
          subPattern += "?";
        pattern += subPattern;
        subSegmentScore += 20;
        if (optional)
          subSegmentScore += -8;
        if (repeatable)
          subSegmentScore += -20;
        if (re4 === ".*")
          subSegmentScore += -50;
      }
      segmentScores.push(subSegmentScore);
    }
    score.push(segmentScores);
  }
  if (options.strict && options.end) {
    const i2 = score.length - 1;
    score[i2][score[i2].length - 1] += 0.7000000000000001;
  }
  if (!options.strict)
    pattern += "/?";
  if (options.end)
    pattern += "$";
  else if (options.strict)
    pattern += "(?:/|$)";
  const re3 = new RegExp(pattern, options.sensitive ? "" : "i");
  function parse2(path) {
    const match2 = path.match(re3);
    const params = {};
    if (!match2)
      return null;
    for (let i2 = 1; i2 < match2.length; i2++) {
      const value = match2[i2] || "";
      const key = keys3[i2 - 1];
      params[key.name] = value && key.repeatable ? value.split("/") : value;
    }
    return params;
  }
  function stringify(params) {
    let path = "";
    let avoidDuplicatedSlash = false;
    for (const segment of segments) {
      if (!avoidDuplicatedSlash || !path.endsWith("/"))
        path += "/";
      avoidDuplicatedSlash = false;
      for (const token of segment) {
        if (token.type === 0) {
          path += token.value;
        } else if (token.type === 1) {
          const { value, repeatable, optional } = token;
          const param = value in params ? params[value] : "";
          if (isArray$1(param) && !repeatable) {
            throw new Error(`Provided param "${value}" is an array but it is not repeatable (* or + modifiers)`);
          }
          const text = isArray$1(param) ? param.join("/") : param;
          if (!text) {
            if (optional) {
              if (segment.length < 2) {
                if (path.endsWith("/"))
                  path = path.slice(0, -1);
                else
                  avoidDuplicatedSlash = true;
              }
            } else
              throw new Error(`Missing required param "${value}"`);
          }
          path += text;
        }
      }
    }
    return path || "/";
  }
  return {
    re: re3,
    score,
    keys: keys3,
    parse: parse2,
    stringify
  };
}
function compareScoreArray(a, b) {
  let i2 = 0;
  while (i2 < a.length && i2 < b.length) {
    const diff = b[i2] - a[i2];
    if (diff)
      return diff;
    i2++;
  }
  if (a.length < b.length) {
    return a.length === 1 && a[0] === 40 + 40 ? -1 : 1;
  } else if (a.length > b.length) {
    return b.length === 1 && b[0] === 40 + 40 ? 1 : -1;
  }
  return 0;
}
function comparePathParserScore(a, b) {
  let i2 = 0;
  const aScore = a.score;
  const bScore = b.score;
  while (i2 < aScore.length && i2 < bScore.length) {
    const comp = compareScoreArray(aScore[i2], bScore[i2]);
    if (comp)
      return comp;
    i2++;
  }
  if (Math.abs(bScore.length - aScore.length) === 1) {
    if (isLastScoreNegative(aScore))
      return 1;
    if (isLastScoreNegative(bScore))
      return -1;
  }
  return bScore.length - aScore.length;
}
function isLastScoreNegative(score) {
  const last = score[score.length - 1];
  return score.length > 0 && last[last.length - 1] < 0;
}
const ROOT_TOKEN = {
  type: 0,
  value: ""
};
const VALID_PARAM_RE = /[a-zA-Z0-9_]/;
function tokenizePath(path) {
  if (!path)
    return [[]];
  if (path === "/")
    return [[ROOT_TOKEN]];
  if (!path.startsWith("/")) {
    throw new Error(`Invalid path "${path}"`);
  }
  function crash(message2) {
    throw new Error(`ERR (${state})/"${buffer}": ${message2}`);
  }
  let state = 0;
  let previousState = state;
  const tokens = [];
  let segment;
  function finalizeSegment() {
    if (segment)
      tokens.push(segment);
    segment = [];
  }
  let i2 = 0;
  let char;
  let buffer = "";
  let customRe = "";
  function consumeBuffer() {
    if (!buffer)
      return;
    if (state === 0) {
      segment.push({
        type: 0,
        value: buffer
      });
    } else if (state === 1 || state === 2 || state === 3) {
      if (segment.length > 1 && (char === "*" || char === "+"))
        crash(`A repeatable param (${buffer}) must be alone in its segment. eg: '/:ids+.`);
      segment.push({
        type: 1,
        value: buffer,
        regexp: customRe,
        repeatable: char === "*" || char === "+",
        optional: char === "*" || char === "?"
      });
    } else {
      crash("Invalid state to consume buffer");
    }
    buffer = "";
  }
  function addCharToBuffer() {
    buffer += char;
  }
  while (i2 < path.length) {
    char = path[i2++];
    if (char === "\\" && state !== 2) {
      previousState = state;
      state = 4;
      continue;
    }
    switch (state) {
      case 0:
        if (char === "/") {
          if (buffer) {
            consumeBuffer();
          }
          finalizeSegment();
        } else if (char === ":") {
          consumeBuffer();
          state = 1;
        } else {
          addCharToBuffer();
        }
        break;
      case 4:
        addCharToBuffer();
        state = previousState;
        break;
      case 1:
        if (char === "(") {
          state = 2;
        } else if (VALID_PARAM_RE.test(char)) {
          addCharToBuffer();
        } else {
          consumeBuffer();
          state = 0;
          if (char !== "*" && char !== "?" && char !== "+")
            i2--;
        }
        break;
      case 2:
        if (char === ")") {
          if (customRe[customRe.length - 1] == "\\")
            customRe = customRe.slice(0, -1) + char;
          else
            state = 3;
        } else {
          customRe += char;
        }
        break;
      case 3:
        consumeBuffer();
        state = 0;
        if (char !== "*" && char !== "?" && char !== "+")
          i2--;
        customRe = "";
        break;
      default:
        crash("Unknown state");
        break;
    }
  }
  if (state === 2)
    crash(`Unfinished custom RegExp for param "${buffer}"`);
  consumeBuffer();
  finalizeSegment();
  return tokens;
}
function createRouteRecordMatcher(record, parent, options) {
  const parser = tokensToParser(tokenizePath(record.path), options);
  const matcher = assign$2(parser, {
    record,
    parent,
    // these needs to be populated by the parent
    children: [],
    alias: []
  });
  if (parent) {
    if (!matcher.record.aliasOf === !parent.record.aliasOf)
      parent.children.push(matcher);
  }
  return matcher;
}
function createRouterMatcher(routes2, globalOptions) {
  const matchers = [];
  const matcherMap = /* @__PURE__ */ new Map();
  globalOptions = mergeOptions({ strict: false, end: true, sensitive: false }, globalOptions);
  function getRecordMatcher(name2) {
    return matcherMap.get(name2);
  }
  function addRoute(record, parent, originalRecord) {
    const isRootAdd = !originalRecord;
    const mainNormalizedRecord = normalizeRouteRecord(record);
    mainNormalizedRecord.aliasOf = originalRecord && originalRecord.record;
    const options = mergeOptions(globalOptions, record);
    const normalizedRecords = [
      mainNormalizedRecord
    ];
    if ("alias" in record) {
      const aliases2 = typeof record.alias === "string" ? [record.alias] : record.alias;
      for (const alias of aliases2) {
        normalizedRecords.push(assign$2({}, mainNormalizedRecord, {
          // this allows us to hold a copy of the `components` option
          // so that async components cache is hold on the original record
          components: originalRecord ? originalRecord.record.components : mainNormalizedRecord.components,
          path: alias,
          // we might be the child of an alias
          aliasOf: originalRecord ? originalRecord.record : mainNormalizedRecord
          // the aliases are always of the same kind as the original since they
          // are defined on the same record
        }));
      }
    }
    let matcher;
    let originalMatcher;
    for (const normalizedRecord of normalizedRecords) {
      const { path } = normalizedRecord;
      if (parent && path[0] !== "/") {
        const parentPath = parent.record.path;
        const connectingSlash = parentPath[parentPath.length - 1] === "/" ? "" : "/";
        normalizedRecord.path = parent.record.path + (path && connectingSlash + path);
      }
      matcher = createRouteRecordMatcher(normalizedRecord, parent, options);
      if (originalRecord) {
        originalRecord.alias.push(matcher);
      } else {
        originalMatcher = originalMatcher || matcher;
        if (originalMatcher !== matcher)
          originalMatcher.alias.push(matcher);
        if (isRootAdd && record.name && !isAliasRecord(matcher))
          removeRoute(record.name);
      }
      if (mainNormalizedRecord.children) {
        const children = mainNormalizedRecord.children;
        for (let i2 = 0; i2 < children.length; i2++) {
          addRoute(children[i2], matcher, originalRecord && originalRecord.children[i2]);
        }
      }
      originalRecord = originalRecord || matcher;
      if (matcher.record.components && Object.keys(matcher.record.components).length || matcher.record.name || matcher.record.redirect) {
        insertMatcher(matcher);
      }
    }
    return originalMatcher ? () => {
      removeRoute(originalMatcher);
    } : noop$1;
  }
  function removeRoute(matcherRef) {
    if (isRouteName(matcherRef)) {
      const matcher = matcherMap.get(matcherRef);
      if (matcher) {
        matcherMap.delete(matcherRef);
        matchers.splice(matchers.indexOf(matcher), 1);
        matcher.children.forEach(removeRoute);
        matcher.alias.forEach(removeRoute);
      }
    } else {
      const index = matchers.indexOf(matcherRef);
      if (index > -1) {
        matchers.splice(index, 1);
        if (matcherRef.record.name)
          matcherMap.delete(matcherRef.record.name);
        matcherRef.children.forEach(removeRoute);
        matcherRef.alias.forEach(removeRoute);
      }
    }
  }
  function getRoutes() {
    return matchers;
  }
  function insertMatcher(matcher) {
    let i2 = 0;
    while (i2 < matchers.length && comparePathParserScore(matcher, matchers[i2]) >= 0 && (matcher.record.path !== matchers[i2].record.path || !isRecordChildOf(matcher, matchers[i2])))
      i2++;
    matchers.splice(i2, 0, matcher);
    if (matcher.record.name && !isAliasRecord(matcher))
      matcherMap.set(matcher.record.name, matcher);
  }
  function resolve(location2, currentLocation) {
    let matcher;
    let params = {};
    let path;
    let name2;
    if ("name" in location2 && location2.name) {
      matcher = matcherMap.get(location2.name);
      if (!matcher)
        throw createRouterError(1, {
          location: location2
        });
      name2 = matcher.record.name;
      params = assign$2(
        // paramsFromLocation is a new object
        paramsFromLocation(
          currentLocation.params,
          // only keep params that exist in the resolved location
          // TODO: only keep optional params coming from a parent record
          matcher.keys.filter((k2) => !k2.optional).map((k2) => k2.name)
        ),
        // discard any existing params in the current location that do not exist here
        // #1497 this ensures better active/exact matching
        location2.params && paramsFromLocation(location2.params, matcher.keys.map((k2) => k2.name))
      );
      path = matcher.stringify(params);
    } else if ("path" in location2) {
      path = location2.path;
      matcher = matchers.find((m2) => m2.re.test(path));
      if (matcher) {
        params = matcher.parse(path);
        name2 = matcher.record.name;
      }
    } else {
      matcher = currentLocation.name ? matcherMap.get(currentLocation.name) : matchers.find((m2) => m2.re.test(currentLocation.path));
      if (!matcher)
        throw createRouterError(1, {
          location: location2,
          currentLocation
        });
      name2 = matcher.record.name;
      params = assign$2({}, currentLocation.params, location2.params);
      path = matcher.stringify(params);
    }
    const matched = [];
    let parentMatcher = matcher;
    while (parentMatcher) {
      matched.unshift(parentMatcher.record);
      parentMatcher = parentMatcher.parent;
    }
    return {
      name: name2,
      path,
      params,
      matched,
      meta: mergeMetaFields(matched)
    };
  }
  routes2.forEach((route) => addRoute(route));
  return { addRoute, resolve, removeRoute, getRoutes, getRecordMatcher };
}
function paramsFromLocation(params, keys3) {
  const newParams = {};
  for (const key of keys3) {
    if (key in params)
      newParams[key] = params[key];
  }
  return newParams;
}
function normalizeRouteRecord(record) {
  return {
    path: record.path,
    redirect: record.redirect,
    name: record.name,
    meta: record.meta || {},
    aliasOf: void 0,
    beforeEnter: record.beforeEnter,
    props: normalizeRecordProps(record),
    children: record.children || [],
    instances: {},
    leaveGuards: /* @__PURE__ */ new Set(),
    updateGuards: /* @__PURE__ */ new Set(),
    enterCallbacks: {},
    components: "components" in record ? record.components || null : record.component && { default: record.component }
  };
}
function normalizeRecordProps(record) {
  const propsObject = {};
  const props = record.props || false;
  if ("component" in record) {
    propsObject.default = props;
  } else {
    for (const name2 in record.components)
      propsObject[name2] = typeof props === "boolean" ? props : props[name2];
  }
  return propsObject;
}
function isAliasRecord(record) {
  while (record) {
    if (record.record.aliasOf)
      return true;
    record = record.parent;
  }
  return false;
}
function mergeMetaFields(matched) {
  return matched.reduce((meta, record) => assign$2(meta, record.meta), {});
}
function mergeOptions(defaults, partialOptions) {
  const options = {};
  for (const key in defaults) {
    options[key] = key in partialOptions ? partialOptions[key] : defaults[key];
  }
  return options;
}
function isRecordChildOf(record, parent) {
  return parent.children.some((child) => child === record || isRecordChildOf(record, child));
}
const HASH_RE = /#/g;
const AMPERSAND_RE = /&/g;
const SLASH_RE = /\//g;
const EQUAL_RE = /=/g;
const IM_RE = /\?/g;
const PLUS_RE = /\+/g;
const ENC_BRACKET_OPEN_RE = /%5B/g;
const ENC_BRACKET_CLOSE_RE = /%5D/g;
const ENC_CARET_RE = /%5E/g;
const ENC_BACKTICK_RE = /%60/g;
const ENC_CURLY_OPEN_RE = /%7B/g;
const ENC_PIPE_RE = /%7C/g;
const ENC_CURLY_CLOSE_RE = /%7D/g;
const ENC_SPACE_RE = /%20/g;
function commonEncode(text) {
  return encodeURI("" + text).replace(ENC_PIPE_RE, "|").replace(ENC_BRACKET_OPEN_RE, "[").replace(ENC_BRACKET_CLOSE_RE, "]");
}
function encodeHash(text) {
  return commonEncode(text).replace(ENC_CURLY_OPEN_RE, "{").replace(ENC_CURLY_CLOSE_RE, "}").replace(ENC_CARET_RE, "^");
}
function encodeQueryValue(text) {
  return commonEncode(text).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CURLY_OPEN_RE, "{").replace(ENC_CURLY_CLOSE_RE, "}").replace(ENC_CARET_RE, "^");
}
function encodeQueryKey(text) {
  return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
function encodePath(text) {
  return commonEncode(text).replace(HASH_RE, "%23").replace(IM_RE, "%3F");
}
function encodeParam(text) {
  return text == null ? "" : encodePath(text).replace(SLASH_RE, "%2F");
}
function decode(text) {
  try {
    return decodeURIComponent("" + text);
  } catch (err) {
  }
  return "" + text;
}
function parseQuery(search) {
  const query = {};
  if (search === "" || search === "?")
    return query;
  const hasLeadingIM = search[0] === "?";
  const searchParams = (hasLeadingIM ? search.slice(1) : search).split("&");
  for (let i2 = 0; i2 < searchParams.length; ++i2) {
    const searchParam = searchParams[i2].replace(PLUS_RE, " ");
    const eqPos = searchParam.indexOf("=");
    const key = decode(eqPos < 0 ? searchParam : searchParam.slice(0, eqPos));
    const value = eqPos < 0 ? null : decode(searchParam.slice(eqPos + 1));
    if (key in query) {
      let currentValue = query[key];
      if (!isArray$1(currentValue)) {
        currentValue = query[key] = [currentValue];
      }
      currentValue.push(value);
    } else {
      query[key] = value;
    }
  }
  return query;
}
function stringifyQuery(query) {
  let search = "";
  for (let key in query) {
    const value = query[key];
    key = encodeQueryKey(key);
    if (value == null) {
      if (value !== void 0) {
        search += (search.length ? "&" : "") + key;
      }
      continue;
    }
    const values = isArray$1(value) ? value.map((v) => v && encodeQueryValue(v)) : [value && encodeQueryValue(value)];
    values.forEach((value2) => {
      if (value2 !== void 0) {
        search += (search.length ? "&" : "") + key;
        if (value2 != null)
          search += "=" + value2;
      }
    });
  }
  return search;
}
function normalizeQuery(query) {
  const normalizedQuery = {};
  for (const key in query) {
    const value = query[key];
    if (value !== void 0) {
      normalizedQuery[key] = isArray$1(value) ? value.map((v) => v == null ? null : "" + v) : value == null ? value : "" + value;
    }
  }
  return normalizedQuery;
}
const matchedRouteKey = Symbol("");
const viewDepthKey = Symbol("");
const routerKey = Symbol("");
const routeLocationKey = Symbol("");
const routerViewLocationKey = Symbol("");
function useCallbacks() {
  let handlers = [];
  function add(handler) {
    handlers.push(handler);
    return () => {
      const i2 = handlers.indexOf(handler);
      if (i2 > -1)
        handlers.splice(i2, 1);
    };
  }
  function reset() {
    handlers = [];
  }
  return {
    add,
    list: () => handlers,
    reset
  };
}
function guardToPromiseFn(guard, to, from, record, name2) {
  const enterCallbackArray = record && (record.enterCallbacks[name2] = record.enterCallbacks[name2] || []);
  return () => new Promise((resolve, reject) => {
    const next = (valid) => {
      if (valid === false) {
        reject(createRouterError(4, {
          from,
          to
        }));
      } else if (valid instanceof Error) {
        reject(valid);
      } else if (isRouteLocation(valid)) {
        reject(createRouterError(2, {
          from: to,
          to: valid
        }));
      } else {
        if (enterCallbackArray && // since enterCallbackArray is truthy, both record and name also are
        record.enterCallbacks[name2] === enterCallbackArray && typeof valid === "function") {
          enterCallbackArray.push(valid);
        }
        resolve();
      }
    };
    const guardReturn = guard.call(record && record.instances[name2], to, from, next);
    let guardCall = Promise.resolve(guardReturn);
    if (guard.length < 3)
      guardCall = guardCall.then(next);
    guardCall.catch((err) => reject(err));
  });
}
function extractComponentsGuards(matched, guardType, to, from) {
  const guards = [];
  for (const record of matched) {
    for (const name2 in record.components) {
      let rawComponent = record.components[name2];
      if (guardType !== "beforeRouteEnter" && !record.instances[name2])
        continue;
      if (isRouteComponent(rawComponent)) {
        const options = rawComponent.__vccOpts || rawComponent;
        const guard = options[guardType];
        guard && guards.push(guardToPromiseFn(guard, to, from, record, name2));
      } else {
        let componentPromise = rawComponent();
        guards.push(() => componentPromise.then((resolved) => {
          if (!resolved)
            return Promise.reject(new Error(`Couldn't resolve component "${name2}" at "${record.path}"`));
          const resolvedComponent = isESModule(resolved) ? resolved.default : resolved;
          record.components[name2] = resolvedComponent;
          const options = resolvedComponent.__vccOpts || resolvedComponent;
          const guard = options[guardType];
          return guard && guardToPromiseFn(guard, to, from, record, name2)();
        }));
      }
    }
  }
  return guards;
}
function isRouteComponent(component) {
  return typeof component === "object" || "displayName" in component || "props" in component || "__vccOpts" in component;
}
function useLink$1(props) {
  const router2 = inject$1(routerKey);
  const currentRoute = inject$1(routeLocationKey);
  const route = computed(() => router2.resolve(unref(props.to)));
  const activeRecordIndex = computed(() => {
    const { matched } = route.value;
    const { length } = matched;
    const routeMatched = matched[length - 1];
    const currentMatched = currentRoute.matched;
    if (!routeMatched || !currentMatched.length)
      return -1;
    const index = currentMatched.findIndex(isSameRouteRecord.bind(null, routeMatched));
    if (index > -1)
      return index;
    const parentRecordPath = getOriginalPath(matched[length - 2]);
    return (
      // we are dealing with nested routes
      length > 1 && // if the parent and matched route have the same path, this link is
      // referring to the empty child. Or we currently are on a different
      // child of the same parent
      getOriginalPath(routeMatched) === parentRecordPath && // avoid comparing the child with its parent
      currentMatched[currentMatched.length - 1].path !== parentRecordPath ? currentMatched.findIndex(isSameRouteRecord.bind(null, matched[length - 2])) : index
    );
  });
  const isActive = computed(() => activeRecordIndex.value > -1 && includesParams(currentRoute.params, route.value.params));
  const isExactActive = computed(() => activeRecordIndex.value > -1 && activeRecordIndex.value === currentRoute.matched.length - 1 && isSameRouteLocationParams(currentRoute.params, route.value.params));
  function navigate(e2 = {}) {
    if (guardEvent(e2)) {
      return router2[unref(props.replace) ? "replace" : "push"](
        unref(props.to)
        // avoid uncaught errors are they are logged anyway
      ).catch(noop$1);
    }
    return Promise.resolve();
  }
  return {
    route,
    href: computed(() => route.value.href),
    isActive,
    isExactActive,
    navigate
  };
}
const RouterLinkImpl = /* @__PURE__ */ defineComponent$1({
  name: "RouterLink",
  compatConfig: { MODE: 3 },
  props: {
    to: {
      type: [String, Object],
      required: true
    },
    replace: Boolean,
    activeClass: String,
    // inactiveClass: String,
    exactActiveClass: String,
    custom: Boolean,
    ariaCurrentValue: {
      type: String,
      default: "page"
    }
  },
  useLink: useLink$1,
  setup(props, { slots }) {
    const link = reactive(useLink$1(props));
    const { options } = inject$1(routerKey);
    const elClass = computed(() => ({
      [getLinkClass(props.activeClass, options.linkActiveClass, "router-link-active")]: link.isActive,
      // [getLinkClass(
      //   props.inactiveClass,
      //   options.linkInactiveClass,
      //   'router-link-inactive'
      // )]: !link.isExactActive,
      [getLinkClass(props.exactActiveClass, options.linkExactActiveClass, "router-link-exact-active")]: link.isExactActive
    }));
    return () => {
      const children = slots.default && slots.default(link);
      return props.custom ? children : h("a", {
        "aria-current": link.isExactActive ? props.ariaCurrentValue : null,
        href: link.href,
        // this would override user added attrs but Vue will still add
        // the listener, so we end up triggering both
        onClick: link.navigate,
        class: elClass.value
      }, children);
    };
  }
});
const RouterLink = RouterLinkImpl;
function guardEvent(e2) {
  if (e2.metaKey || e2.altKey || e2.ctrlKey || e2.shiftKey)
    return;
  if (e2.defaultPrevented)
    return;
  if (e2.button !== void 0 && e2.button !== 0)
    return;
  if (e2.currentTarget && e2.currentTarget.getAttribute) {
    const target = e2.currentTarget.getAttribute("target");
    if (/\b_blank\b/i.test(target))
      return;
  }
  if (e2.preventDefault)
    e2.preventDefault();
  return true;
}
function includesParams(outer, inner) {
  for (const key in inner) {
    const innerValue = inner[key];
    const outerValue = outer[key];
    if (typeof innerValue === "string") {
      if (innerValue !== outerValue)
        return false;
    } else {
      if (!isArray$1(outerValue) || outerValue.length !== innerValue.length || innerValue.some((value, i2) => value !== outerValue[i2]))
        return false;
    }
  }
  return true;
}
function getOriginalPath(record) {
  return record ? record.aliasOf ? record.aliasOf.path : record.path : "";
}
const getLinkClass = (propClass, globalClass, defaultClass) => propClass != null ? propClass : globalClass != null ? globalClass : defaultClass;
const RouterViewImpl = /* @__PURE__ */ defineComponent$1({
  name: "RouterView",
  // #674 we manually inherit them
  inheritAttrs: false,
  props: {
    name: {
      type: String,
      default: "default"
    },
    route: Object
  },
  // Better compat for @vue/compat users
  // https://github.com/vuejs/router/issues/1315
  compatConfig: { MODE: 3 },
  setup(props, { attrs, slots }) {
    const injectedRoute = inject$1(routerViewLocationKey);
    const routeToDisplay = computed(() => props.route || injectedRoute.value);
    const injectedDepth = inject$1(viewDepthKey, 0);
    const depth = computed(() => {
      let initialDepth = unref(injectedDepth);
      const { matched } = routeToDisplay.value;
      let matchedRoute;
      while ((matchedRoute = matched[initialDepth]) && !matchedRoute.components) {
        initialDepth++;
      }
      return initialDepth;
    });
    const matchedRouteRef = computed(() => routeToDisplay.value.matched[depth.value]);
    provide(viewDepthKey, computed(() => depth.value + 1));
    provide(matchedRouteKey, matchedRouteRef);
    provide(routerViewLocationKey, routeToDisplay);
    const viewRef = ref();
    watch(() => [viewRef.value, matchedRouteRef.value, props.name], ([instance, to, name2], [oldInstance, from, oldName]) => {
      if (to) {
        to.instances[name2] = instance;
        if (from && from !== to && instance && instance === oldInstance) {
          if (!to.leaveGuards.size) {
            to.leaveGuards = from.leaveGuards;
          }
          if (!to.updateGuards.size) {
            to.updateGuards = from.updateGuards;
          }
        }
      }
      if (instance && to && (!from || !isSameRouteRecord(to, from) || !oldInstance)) {
        (to.enterCallbacks[name2] || []).forEach((callback) => callback(instance));
      }
    }, { flush: "post" });
    return () => {
      const route = routeToDisplay.value;
      const currentName = props.name;
      const matchedRoute = matchedRouteRef.value;
      const ViewComponent = matchedRoute && matchedRoute.components[currentName];
      if (!ViewComponent) {
        return normalizeSlot(slots.default, { Component: ViewComponent, route });
      }
      const routePropsOption = matchedRoute.props[currentName];
      const routeProps = routePropsOption ? routePropsOption === true ? route.params : typeof routePropsOption === "function" ? routePropsOption(route) : routePropsOption : null;
      const onVnodeUnmounted = (vnode) => {
        if (vnode.component.isUnmounted) {
          matchedRoute.instances[currentName] = null;
        }
      };
      const component = h(ViewComponent, assign$2({}, routeProps, attrs, {
        onVnodeUnmounted,
        ref: viewRef
      }));
      return (
        // pass the vnode to the slot as a prop.
        // h and <component :is="..."> both accept vnodes
        normalizeSlot(slots.default, { Component: component, route }) || component
      );
    };
  }
});
function normalizeSlot(slot, data2) {
  if (!slot)
    return null;
  const slotContent = slot(data2);
  return slotContent.length === 1 ? slotContent[0] : slotContent;
}
const RouterView = RouterViewImpl;
function createRouter(options) {
  const matcher = createRouterMatcher(options.routes, options);
  const parseQuery$1 = options.parseQuery || parseQuery;
  const stringifyQuery$1 = options.stringifyQuery || stringifyQuery;
  const routerHistory = options.history;
  const beforeGuards = useCallbacks();
  const beforeResolveGuards = useCallbacks();
  const afterGuards = useCallbacks();
  const currentRoute = shallowRef(START_LOCATION_NORMALIZED);
  let pendingLocation = START_LOCATION_NORMALIZED;
  if (isBrowser && options.scrollBehavior && "scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  const normalizeParams = applyToParams.bind(null, (paramValue) => "" + paramValue);
  const encodeParams = applyToParams.bind(null, encodeParam);
  const decodeParams = (
    // @ts-expect-error: intentionally avoid the type check
    applyToParams.bind(null, decode)
  );
  function addRoute(parentOrRoute, route) {
    let parent;
    let record;
    if (isRouteName(parentOrRoute)) {
      parent = matcher.getRecordMatcher(parentOrRoute);
      record = route;
    } else {
      record = parentOrRoute;
    }
    return matcher.addRoute(record, parent);
  }
  function removeRoute(name2) {
    const recordMatcher = matcher.getRecordMatcher(name2);
    if (recordMatcher) {
      matcher.removeRoute(recordMatcher);
    }
  }
  function getRoutes() {
    return matcher.getRoutes().map((routeMatcher) => routeMatcher.record);
  }
  function hasRoute(name2) {
    return !!matcher.getRecordMatcher(name2);
  }
  function resolve(rawLocation, currentLocation) {
    currentLocation = assign$2({}, currentLocation || currentRoute.value);
    if (typeof rawLocation === "string") {
      const locationNormalized = parseURL(parseQuery$1, rawLocation, currentLocation.path);
      const matchedRoute2 = matcher.resolve({ path: locationNormalized.path }, currentLocation);
      const href2 = routerHistory.createHref(locationNormalized.fullPath);
      return assign$2(locationNormalized, matchedRoute2, {
        params: decodeParams(matchedRoute2.params),
        hash: decode(locationNormalized.hash),
        redirectedFrom: void 0,
        href: href2
      });
    }
    let matcherLocation;
    if ("path" in rawLocation) {
      matcherLocation = assign$2({}, rawLocation, {
        path: parseURL(parseQuery$1, rawLocation.path, currentLocation.path).path
      });
    } else {
      const targetParams = assign$2({}, rawLocation.params);
      for (const key in targetParams) {
        if (targetParams[key] == null) {
          delete targetParams[key];
        }
      }
      matcherLocation = assign$2({}, rawLocation, {
        params: encodeParams(rawLocation.params)
      });
      currentLocation.params = encodeParams(currentLocation.params);
    }
    const matchedRoute = matcher.resolve(matcherLocation, currentLocation);
    const hash = rawLocation.hash || "";
    matchedRoute.params = normalizeParams(decodeParams(matchedRoute.params));
    const fullPath = stringifyURL(stringifyQuery$1, assign$2({}, rawLocation, {
      hash: encodeHash(hash),
      path: matchedRoute.path
    }));
    const href = routerHistory.createHref(fullPath);
    return assign$2({
      fullPath,
      // keep the hash encoded so fullPath is effectively path + encodedQuery +
      // hash
      hash,
      query: (
        // if the user is using a custom query lib like qs, we might have
        // nested objects, so we keep the query as is, meaning it can contain
        // numbers at `$route.query`, but at the point, the user will have to
        // use their own type anyway.
        // https://github.com/vuejs/router/issues/328#issuecomment-649481567
        stringifyQuery$1 === stringifyQuery ? normalizeQuery(rawLocation.query) : rawLocation.query || {}
      )
    }, matchedRoute, {
      redirectedFrom: void 0,
      href
    });
  }
  function locationAsObject(to) {
    return typeof to === "string" ? parseURL(parseQuery$1, to, currentRoute.value.path) : assign$2({}, to);
  }
  function checkCanceledNavigation(to, from) {
    if (pendingLocation !== to) {
      return createRouterError(8, {
        from,
        to
      });
    }
  }
  function push2(to) {
    return pushWithRedirect(to);
  }
  function replace2(to) {
    return push2(assign$2(locationAsObject(to), { replace: true }));
  }
  function handleRedirectRecord(to) {
    const lastMatched = to.matched[to.matched.length - 1];
    if (lastMatched && lastMatched.redirect) {
      const { redirect } = lastMatched;
      let newTargetLocation = typeof redirect === "function" ? redirect(to) : redirect;
      if (typeof newTargetLocation === "string") {
        newTargetLocation = newTargetLocation.includes("?") || newTargetLocation.includes("#") ? newTargetLocation = locationAsObject(newTargetLocation) : (
          // force empty params
          { path: newTargetLocation }
        );
        newTargetLocation.params = {};
      }
      return assign$2({
        query: to.query,
        hash: to.hash,
        // avoid transferring params if the redirect has a path
        params: "path" in newTargetLocation ? {} : to.params
      }, newTargetLocation);
    }
  }
  function pushWithRedirect(to, redirectedFrom) {
    const targetLocation = pendingLocation = resolve(to);
    const from = currentRoute.value;
    const data2 = to.state;
    const force = to.force;
    const replace3 = to.replace === true;
    const shouldRedirect = handleRedirectRecord(targetLocation);
    if (shouldRedirect)
      return pushWithRedirect(
        assign$2(locationAsObject(shouldRedirect), {
          state: typeof shouldRedirect === "object" ? assign$2({}, data2, shouldRedirect.state) : data2,
          force,
          replace: replace3
        }),
        // keep original redirectedFrom if it exists
        redirectedFrom || targetLocation
      );
    const toLocation = targetLocation;
    toLocation.redirectedFrom = redirectedFrom;
    let failure;
    if (!force && isSameRouteLocation(stringifyQuery$1, from, targetLocation)) {
      failure = createRouterError(16, { to: toLocation, from });
      handleScroll(
        from,
        from,
        // this is a push, the only way for it to be triggered from a
        // history.listen is with a redirect, which makes it become a push
        true,
        // This cannot be the first navigation because the initial location
        // cannot be manually navigated to
        false
      );
    }
    return (failure ? Promise.resolve(failure) : navigate(toLocation, from)).catch((error) => isNavigationFailure(error) ? (
      // navigation redirects still mark the router as ready
      isNavigationFailure(
        error,
        2
        /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
      ) ? error : markAsReady(error)
    ) : (
      // reject any unknown error
      triggerError(error, toLocation, from)
    )).then((failure2) => {
      if (failure2) {
        if (isNavigationFailure(
          failure2,
          2
          /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
        )) {
          return pushWithRedirect(
            // keep options
            assign$2({
              // preserve an existing replacement but allow the redirect to override it
              replace: replace3
            }, locationAsObject(failure2.to), {
              state: typeof failure2.to === "object" ? assign$2({}, data2, failure2.to.state) : data2,
              force
            }),
            // preserve the original redirectedFrom if any
            redirectedFrom || toLocation
          );
        }
      } else {
        failure2 = finalizeNavigation(toLocation, from, true, replace3, data2);
      }
      triggerAfterEach(toLocation, from, failure2);
      return failure2;
    });
  }
  function checkCanceledNavigationAndReject(to, from) {
    const error = checkCanceledNavigation(to, from);
    return error ? Promise.reject(error) : Promise.resolve();
  }
  function navigate(to, from) {
    let guards;
    const [leavingRecords, updatingRecords, enteringRecords] = extractChangingRecords(to, from);
    guards = extractComponentsGuards(leavingRecords.reverse(), "beforeRouteLeave", to, from);
    for (const record of leavingRecords) {
      record.leaveGuards.forEach((guard) => {
        guards.push(guardToPromiseFn(guard, to, from));
      });
    }
    const canceledNavigationCheck = checkCanceledNavigationAndReject.bind(null, to, from);
    guards.push(canceledNavigationCheck);
    return runGuardQueue(guards).then(() => {
      guards = [];
      for (const guard of beforeGuards.list()) {
        guards.push(guardToPromiseFn(guard, to, from));
      }
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      guards = extractComponentsGuards(updatingRecords, "beforeRouteUpdate", to, from);
      for (const record of updatingRecords) {
        record.updateGuards.forEach((guard) => {
          guards.push(guardToPromiseFn(guard, to, from));
        });
      }
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      guards = [];
      for (const record of to.matched) {
        if (record.beforeEnter && !from.matched.includes(record)) {
          if (isArray$1(record.beforeEnter)) {
            for (const beforeEnter of record.beforeEnter)
              guards.push(guardToPromiseFn(beforeEnter, to, from));
          } else {
            guards.push(guardToPromiseFn(record.beforeEnter, to, from));
          }
        }
      }
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      to.matched.forEach((record) => record.enterCallbacks = {});
      guards = extractComponentsGuards(enteringRecords, "beforeRouteEnter", to, from);
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      guards = [];
      for (const guard of beforeResolveGuards.list()) {
        guards.push(guardToPromiseFn(guard, to, from));
      }
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).catch((err) => isNavigationFailure(
      err,
      8
      /* ErrorTypes.NAVIGATION_CANCELLED */
    ) ? err : Promise.reject(err));
  }
  function triggerAfterEach(to, from, failure) {
    for (const guard of afterGuards.list())
      guard(to, from, failure);
  }
  function finalizeNavigation(toLocation, from, isPush, replace3, data2) {
    const error = checkCanceledNavigation(toLocation, from);
    if (error)
      return error;
    const isFirstNavigation = from === START_LOCATION_NORMALIZED;
    const state = !isBrowser ? {} : history.state;
    if (isPush) {
      if (replace3 || isFirstNavigation)
        routerHistory.replace(toLocation.fullPath, assign$2({
          scroll: isFirstNavigation && state && state.scroll
        }, data2));
      else
        routerHistory.push(toLocation.fullPath, data2);
    }
    currentRoute.value = toLocation;
    handleScroll(toLocation, from, isPush, isFirstNavigation);
    markAsReady();
  }
  let removeHistoryListener;
  function setupListeners() {
    if (removeHistoryListener)
      return;
    removeHistoryListener = routerHistory.listen((to, _from, info) => {
      if (!router2.listening)
        return;
      const toLocation = resolve(to);
      const shouldRedirect = handleRedirectRecord(toLocation);
      if (shouldRedirect) {
        pushWithRedirect(assign$2(shouldRedirect, { replace: true }), toLocation).catch(noop$1);
        return;
      }
      pendingLocation = toLocation;
      const from = currentRoute.value;
      if (isBrowser) {
        saveScrollPosition(getScrollKey(from.fullPath, info.delta), computeScrollPosition());
      }
      navigate(toLocation, from).catch((error) => {
        if (isNavigationFailure(
          error,
          4 | 8
          /* ErrorTypes.NAVIGATION_CANCELLED */
        )) {
          return error;
        }
        if (isNavigationFailure(
          error,
          2
          /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
        )) {
          pushWithRedirect(
            error.to,
            toLocation
            // avoid an uncaught rejection, let push call triggerError
          ).then((failure) => {
            if (isNavigationFailure(
              failure,
              4 | 16
              /* ErrorTypes.NAVIGATION_DUPLICATED */
            ) && !info.delta && info.type === NavigationType.pop) {
              routerHistory.go(-1, false);
            }
          }).catch(noop$1);
          return Promise.reject();
        }
        if (info.delta) {
          routerHistory.go(-info.delta, false);
        }
        return triggerError(error, toLocation, from);
      }).then((failure) => {
        failure = failure || finalizeNavigation(
          // after navigation, all matched components are resolved
          toLocation,
          from,
          false
        );
        if (failure) {
          if (info.delta && // a new navigation has been triggered, so we do not want to revert, that will change the current history
          // entry while a different route is displayed
          !isNavigationFailure(
            failure,
            8
            /* ErrorTypes.NAVIGATION_CANCELLED */
          )) {
            routerHistory.go(-info.delta, false);
          } else if (info.type === NavigationType.pop && isNavigationFailure(
            failure,
            4 | 16
            /* ErrorTypes.NAVIGATION_DUPLICATED */
          )) {
            routerHistory.go(-1, false);
          }
        }
        triggerAfterEach(toLocation, from, failure);
      }).catch(noop$1);
    });
  }
  let readyHandlers = useCallbacks();
  let errorHandlers = useCallbacks();
  let ready;
  function triggerError(error, to, from) {
    markAsReady(error);
    const list = errorHandlers.list();
    if (list.length) {
      list.forEach((handler) => handler(error, to, from));
    } else {
      console.error(error);
    }
    return Promise.reject(error);
  }
  function isReady() {
    if (ready && currentRoute.value !== START_LOCATION_NORMALIZED)
      return Promise.resolve();
    return new Promise((resolve2, reject) => {
      readyHandlers.add([resolve2, reject]);
    });
  }
  function markAsReady(err) {
    if (!ready) {
      ready = !err;
      setupListeners();
      readyHandlers.list().forEach(([resolve2, reject]) => err ? reject(err) : resolve2());
      readyHandlers.reset();
    }
    return err;
  }
  function handleScroll(to, from, isPush, isFirstNavigation) {
    const { scrollBehavior } = options;
    if (!isBrowser || !scrollBehavior)
      return Promise.resolve();
    const scrollPosition = !isPush && getSavedScrollPosition(getScrollKey(to.fullPath, 0)) || (isFirstNavigation || !isPush) && history.state && history.state.scroll || null;
    return nextTick().then(() => scrollBehavior(to, from, scrollPosition)).then((position) => position && scrollToPosition(position)).catch((err) => triggerError(err, to, from));
  }
  const go = (delta2) => routerHistory.go(delta2);
  let started;
  const installedApps = /* @__PURE__ */ new Set();
  const router2 = {
    currentRoute,
    listening: true,
    addRoute,
    removeRoute,
    hasRoute,
    getRoutes,
    resolve,
    options,
    push: push2,
    replace: replace2,
    go,
    back: () => go(-1),
    forward: () => go(1),
    beforeEach: beforeGuards.add,
    beforeResolve: beforeResolveGuards.add,
    afterEach: afterGuards.add,
    onError: errorHandlers.add,
    isReady,
    install(app2) {
      const router3 = this;
      app2.component("RouterLink", RouterLink);
      app2.component("RouterView", RouterView);
      app2.config.globalProperties.$router = router3;
      Object.defineProperty(app2.config.globalProperties, "$route", {
        enumerable: true,
        get: () => unref(currentRoute)
      });
      if (isBrowser && // used for the initial navigation client side to avoid pushing
      // multiple times when the router is used in multiple apps
      !started && currentRoute.value === START_LOCATION_NORMALIZED) {
        started = true;
        push2(routerHistory.location).catch((err) => {
        });
      }
      const reactiveRoute = {};
      for (const key in START_LOCATION_NORMALIZED) {
        reactiveRoute[key] = computed(() => currentRoute.value[key]);
      }
      app2.provide(routerKey, router3);
      app2.provide(routeLocationKey, reactive(reactiveRoute));
      app2.provide(routerViewLocationKey, currentRoute);
      const unmountApp = app2.unmount;
      installedApps.add(app2);
      app2.unmount = function() {
        installedApps.delete(app2);
        if (installedApps.size < 1) {
          pendingLocation = START_LOCATION_NORMALIZED;
          removeHistoryListener && removeHistoryListener();
          removeHistoryListener = null;
          currentRoute.value = START_LOCATION_NORMALIZED;
          started = false;
          ready = false;
        }
        unmountApp();
      };
    }
  };
  return router2;
}
function runGuardQueue(guards) {
  return guards.reduce((promise, guard) => promise.then(() => guard()), Promise.resolve());
}
function extractChangingRecords(to, from) {
  const leavingRecords = [];
  const updatingRecords = [];
  const enteringRecords = [];
  const len = Math.max(from.matched.length, to.matched.length);
  for (let i2 = 0; i2 < len; i2++) {
    const recordFrom = from.matched[i2];
    if (recordFrom) {
      if (to.matched.find((record) => isSameRouteRecord(record, recordFrom)))
        updatingRecords.push(recordFrom);
      else
        leavingRecords.push(recordFrom);
    }
    const recordTo = to.matched[i2];
    if (recordTo) {
      if (!from.matched.find((record) => isSameRouteRecord(record, recordTo))) {
        enteringRecords.push(recordTo);
      }
    }
  }
  return [leavingRecords, updatingRecords, enteringRecords];
}
function useRouter$1() {
  return inject$1(routerKey);
}
var isVue2 = false;
/*!
  * pinia v2.0.28
  * (c) 2022 Eduardo San Martin Morote
  * @license MIT
  */
let activePinia;
const setActivePinia = (pinia) => activePinia = pinia;
const piniaSymbol = (
  /* istanbul ignore next */
  Symbol()
);
function isPlainObject$1(o2) {
  return o2 && typeof o2 === "object" && Object.prototype.toString.call(o2) === "[object Object]" && typeof o2.toJSON !== "function";
}
var MutationType;
(function(MutationType2) {
  MutationType2["direct"] = "direct";
  MutationType2["patchObject"] = "patch object";
  MutationType2["patchFunction"] = "patch function";
})(MutationType || (MutationType = {}));
function createPinia() {
  const scope = effectScope(true);
  const state = scope.run(() => ref({}));
  let _p = [];
  let toBeInstalled = [];
  const pinia = markRaw({
    install(app2) {
      setActivePinia(pinia);
      {
        pinia._a = app2;
        app2.provide(piniaSymbol, pinia);
        app2.config.globalProperties.$pinia = pinia;
        toBeInstalled.forEach((plugin) => _p.push(plugin));
        toBeInstalled = [];
      }
    },
    use(plugin) {
      if (!this._a && !isVue2) {
        toBeInstalled.push(plugin);
      } else {
        _p.push(plugin);
      }
      return this;
    },
    _p,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: scope,
    _s: /* @__PURE__ */ new Map(),
    state
  });
  return pinia;
}
const noop = () => {
};
function addSubscription(subscriptions, callback, detached, onCleanup = noop) {
  subscriptions.push(callback);
  const removeSubscription = () => {
    const idx = subscriptions.indexOf(callback);
    if (idx > -1) {
      subscriptions.splice(idx, 1);
      onCleanup();
    }
  };
  if (!detached && getCurrentScope()) {
    onScopeDispose(removeSubscription);
  }
  return removeSubscription;
}
function triggerSubscriptions(subscriptions, ...args) {
  subscriptions.slice().forEach((callback) => {
    callback(...args);
  });
}
function mergeReactiveObjects(target, patchToApply) {
  if (target instanceof Map && patchToApply instanceof Map) {
    patchToApply.forEach((value, key) => target.set(key, value));
  }
  if (target instanceof Set && patchToApply instanceof Set) {
    patchToApply.forEach(target.add, target);
  }
  for (const key in patchToApply) {
    if (!patchToApply.hasOwnProperty(key))
      continue;
    const subPatch = patchToApply[key];
    const targetValue = target[key];
    if (isPlainObject$1(targetValue) && isPlainObject$1(subPatch) && target.hasOwnProperty(key) && !isRef(subPatch) && !isReactive(subPatch)) {
      target[key] = mergeReactiveObjects(targetValue, subPatch);
    } else {
      target[key] = subPatch;
    }
  }
  return target;
}
const skipHydrateSymbol = (
  /* istanbul ignore next */
  Symbol()
);
function shouldHydrate(obj) {
  return !isPlainObject$1(obj) || !obj.hasOwnProperty(skipHydrateSymbol);
}
const { assign: assign$1 } = Object;
function isComputed(o2) {
  return !!(isRef(o2) && o2.effect);
}
function createOptionsStore(id2, options, pinia, hot) {
  const { state, actions, getters } = options;
  const initialState = pinia.state.value[id2];
  let store;
  function setup() {
    if (!initialState && true) {
      {
        pinia.state.value[id2] = state ? state() : {};
      }
    }
    const localState = toRefs(pinia.state.value[id2]);
    return assign$1(localState, actions, Object.keys(getters || {}).reduce((computedGetters, name2) => {
      computedGetters[name2] = markRaw(computed(() => {
        setActivePinia(pinia);
        const store2 = pinia._s.get(id2);
        return getters[name2].call(store2, store2);
      }));
      return computedGetters;
    }, {}));
  }
  store = createSetupStore(id2, setup, options, pinia, hot, true);
  store.$reset = function $reset() {
    const newState = state ? state() : {};
    this.$patch(($state) => {
      assign$1($state, newState);
    });
  };
  return store;
}
function createSetupStore($id, setup, options = {}, pinia, hot, isOptionsStore) {
  let scope;
  const optionsForPlugin = assign$1({ actions: {} }, options);
  const $subscribeOptions = {
    deep: true
    // flush: 'post',
  };
  let isListening;
  let isSyncListening;
  let subscriptions = markRaw([]);
  let actionSubscriptions = markRaw([]);
  let debuggerEvents;
  const initialState = pinia.state.value[$id];
  if (!isOptionsStore && !initialState && true) {
    {
      pinia.state.value[$id] = {};
    }
  }
  ref({});
  let activeListener;
  function $patch(partialStateOrMutator) {
    let subscriptionMutation;
    isListening = isSyncListening = false;
    if (typeof partialStateOrMutator === "function") {
      partialStateOrMutator(pinia.state.value[$id]);
      subscriptionMutation = {
        type: MutationType.patchFunction,
        storeId: $id,
        events: debuggerEvents
      };
    } else {
      mergeReactiveObjects(pinia.state.value[$id], partialStateOrMutator);
      subscriptionMutation = {
        type: MutationType.patchObject,
        payload: partialStateOrMutator,
        storeId: $id,
        events: debuggerEvents
      };
    }
    const myListenerId = activeListener = Symbol();
    nextTick().then(() => {
      if (activeListener === myListenerId) {
        isListening = true;
      }
    });
    isSyncListening = true;
    triggerSubscriptions(subscriptions, subscriptionMutation, pinia.state.value[$id]);
  }
  const $reset = noop;
  function $dispose() {
    scope.stop();
    subscriptions = [];
    actionSubscriptions = [];
    pinia._s.delete($id);
  }
  function wrapAction(name2, action) {
    return function() {
      setActivePinia(pinia);
      const args = Array.from(arguments);
      const afterCallbackList = [];
      const onErrorCallbackList = [];
      function after(callback) {
        afterCallbackList.push(callback);
      }
      function onError(callback) {
        onErrorCallbackList.push(callback);
      }
      triggerSubscriptions(actionSubscriptions, {
        args,
        name: name2,
        store,
        after,
        onError
      });
      let ret;
      try {
        ret = action.apply(this && this.$id === $id ? this : store, args);
      } catch (error) {
        triggerSubscriptions(onErrorCallbackList, error);
        throw error;
      }
      if (ret instanceof Promise) {
        return ret.then((value) => {
          triggerSubscriptions(afterCallbackList, value);
          return value;
        }).catch((error) => {
          triggerSubscriptions(onErrorCallbackList, error);
          return Promise.reject(error);
        });
      }
      triggerSubscriptions(afterCallbackList, ret);
      return ret;
    };
  }
  const partialStore = {
    _p: pinia,
    // _s: scope,
    $id,
    $onAction: addSubscription.bind(null, actionSubscriptions),
    $patch,
    $reset,
    $subscribe(callback, options2 = {}) {
      const removeSubscription = addSubscription(subscriptions, callback, options2.detached, () => stopWatcher());
      const stopWatcher = scope.run(() => watch(() => pinia.state.value[$id], (state) => {
        if (options2.flush === "sync" ? isSyncListening : isListening) {
          callback({
            storeId: $id,
            type: MutationType.direct,
            events: debuggerEvents
          }, state);
        }
      }, assign$1({}, $subscribeOptions, options2)));
      return removeSubscription;
    },
    $dispose
  };
  const store = reactive(partialStore);
  pinia._s.set($id, store);
  const setupStore = pinia._e.run(() => {
    scope = effectScope();
    return scope.run(() => setup());
  });
  for (const key in setupStore) {
    const prop = setupStore[key];
    if (isRef(prop) && !isComputed(prop) || isReactive(prop)) {
      if (!isOptionsStore) {
        if (initialState && shouldHydrate(prop)) {
          if (isRef(prop)) {
            prop.value = initialState[key];
          } else {
            mergeReactiveObjects(prop, initialState[key]);
          }
        }
        {
          pinia.state.value[$id][key] = prop;
        }
      }
    } else if (typeof prop === "function") {
      const actionValue = wrapAction(key, prop);
      {
        setupStore[key] = actionValue;
      }
      optionsForPlugin.actions[key] = prop;
    } else
      ;
  }
  {
    assign$1(store, setupStore);
    assign$1(toRaw(store), setupStore);
  }
  Object.defineProperty(store, "$state", {
    get: () => pinia.state.value[$id],
    set: (state) => {
      $patch(($state) => {
        assign$1($state, state);
      });
    }
  });
  pinia._p.forEach((extender) => {
    {
      assign$1(store, scope.run(() => extender({
        store,
        app: pinia._a,
        pinia,
        options: optionsForPlugin
      })));
    }
  });
  if (initialState && isOptionsStore && options.hydrate) {
    options.hydrate(store.$state, initialState);
  }
  isListening = true;
  isSyncListening = true;
  return store;
}
function defineStore(idOrOptions, setup, setupOptions) {
  let id2;
  let options;
  const isSetupStore = typeof setup === "function";
  if (typeof idOrOptions === "string") {
    id2 = idOrOptions;
    options = isSetupStore ? setupOptions : setup;
  } else {
    options = idOrOptions;
    id2 = idOrOptions.id;
  }
  function useStore(pinia, hot) {
    const currentInstance = getCurrentInstance$1();
    pinia = pinia || currentInstance && inject$1(piniaSymbol, null);
    if (pinia)
      setActivePinia(pinia);
    pinia = activePinia;
    if (!pinia._s.has(id2)) {
      if (isSetupStore) {
        createSetupStore(id2, setup, options, pinia);
      } else {
        createOptionsStore(id2, options, pinia);
      }
    }
    const store = pinia._s.get(id2);
    return store;
  }
  useStore.$id = id2;
  return useStore;
}
const defaultMainStore = Object.freeze({
  ui: {
    theme: "auto",
    accent: "#880000"
  }
});
function initMainStore() {
  return defaultMainStore;
}
const main = defineStore("main", initMainStore);
function _classPrivateFieldInitSpec(obj, privateMap, value) {
  _checkPrivateRedeclaration(obj, privateMap);
  privateMap.set(obj, value);
}
function _checkPrivateRedeclaration(obj, privateCollection) {
  if (privateCollection.has(obj)) {
    throw new TypeError("Cannot initialize the same private elements twice on an object");
  }
}
function _classPrivateFieldSet(receiver, privateMap, value) {
  var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set");
  _classApplyDescriptorSet(receiver, descriptor, value);
  return value;
}
function _classApplyDescriptorSet(receiver, descriptor, value) {
  if (descriptor.set) {
    descriptor.set.call(receiver, value);
  } else {
    if (!descriptor.writable) {
      throw new TypeError("attempted to set read only private field");
    }
    descriptor.value = value;
  }
}
function _classPrivateFieldGet(receiver, privateMap) {
  var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get");
  return _classApplyDescriptorGet(receiver, descriptor);
}
function _classExtractFieldDescriptor(receiver, privateMap, action) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to " + action + " private field on non-instance");
  }
  return privateMap.get(receiver);
}
function _classApplyDescriptorGet(receiver, descriptor) {
  if (descriptor.get) {
    return descriptor.get.call(receiver);
  }
  return descriptor.value;
}
function getNestedValue(obj, path, fallback) {
  const last = path.length - 1;
  if (last < 0)
    return obj === void 0 ? fallback : obj;
  for (let i2 = 0; i2 < last; i2++) {
    if (obj == null) {
      return fallback;
    }
    obj = obj[path[i2]];
  }
  if (obj == null)
    return fallback;
  return obj[path[last]] === void 0 ? fallback : obj[path[last]];
}
function deepEqual(a, b) {
  if (a === b)
    return true;
  if (a instanceof Date && b instanceof Date && a.getTime() !== b.getTime()) {
    return false;
  }
  if (a !== Object(a) || b !== Object(b)) {
    return false;
  }
  const props = Object.keys(a);
  if (props.length !== Object.keys(b).length) {
    return false;
  }
  return props.every((p) => deepEqual(a[p], b[p]));
}
function getObjectValueByPath(obj, path, fallback) {
  if (obj == null || !path || typeof path !== "string")
    return fallback;
  if (obj[path] !== void 0)
    return obj[path];
  path = path.replace(/\[(\w+)\]/g, ".$1");
  path = path.replace(/^\./, "");
  return getNestedValue(obj, path.split("."), fallback);
}
function getPropertyFromItem(item, property, fallback) {
  if (property == null)
    return item === void 0 ? fallback : item;
  if (item !== Object(item)) {
    if (typeof property !== "function")
      return fallback;
    const value2 = property(item, fallback);
    return typeof value2 === "undefined" ? fallback : value2;
  }
  if (typeof property === "string")
    return getObjectValueByPath(item, property, fallback);
  if (Array.isArray(property))
    return getNestedValue(item, property, fallback);
  if (typeof property !== "function")
    return fallback;
  const value = property(item, fallback);
  return typeof value === "undefined" ? fallback : value;
}
function createRange(length) {
  let start = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  return Array.from({
    length
  }, (v, k2) => start + k2);
}
function convertToUnit(str) {
  let unit = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "px";
  if (str == null || str === "") {
    return void 0;
  } else if (isNaN(+str)) {
    return String(str);
  } else if (!isFinite(+str)) {
    return void 0;
  } else {
    return `${Number(str)}${unit}`;
  }
}
function isObject$9(obj) {
  return obj !== null && typeof obj === "object" && !Array.isArray(obj);
}
function isComponentInstance(obj) {
  return obj == null ? void 0 : obj.$el;
}
const keyCodes = Object.freeze({
  enter: 13,
  tab: 9,
  delete: 46,
  esc: 27,
  space: 32,
  up: 38,
  down: 40,
  left: 37,
  right: 39,
  end: 35,
  home: 36,
  del: 46,
  backspace: 8,
  insert: 45,
  pageup: 33,
  pagedown: 34,
  shift: 16
});
const keyValues = Object.freeze({
  enter: "Enter",
  tab: "Tab",
  delete: "Delete",
  esc: "Escape",
  space: "Space",
  up: "ArrowUp",
  down: "ArrowDown",
  left: "ArrowLeft",
  right: "ArrowRight",
  end: "End",
  home: "Home",
  del: "Delete",
  backspace: "Backspace",
  insert: "Insert",
  pageup: "PageUp",
  pagedown: "PageDown",
  shift: "Shift"
});
function keys$2(o2) {
  return Object.keys(o2);
}
function pick(obj, paths) {
  const found = /* @__PURE__ */ Object.create(null);
  const rest = /* @__PURE__ */ Object.create(null);
  for (const key in obj) {
    if (paths.some((path) => path instanceof RegExp ? path.test(key) : path === key)) {
      found[key] = obj[key];
    } else {
      rest[key] = obj[key];
    }
  }
  return [found, rest];
}
function omit(obj, exclude) {
  const clone = {
    ...obj
  };
  exclude.forEach((prop) => delete clone[prop]);
  return clone;
}
function filterInputAttrs(attrs) {
  return pick(attrs, ["class", "style", "id", /^data-/]);
}
function wrapInArray(v) {
  return v == null ? [] : Array.isArray(v) ? v : [v];
}
function clamp(value) {
  let min2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  let max2 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
  return Math.max(min2, Math.min(max2, value));
}
function padEnd(str, length) {
  let char = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "0";
  return str + char.repeat(Math.max(0, length - str.length));
}
function chunk(str) {
  let size = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
  const chunked = [];
  let index = 0;
  while (index < str.length) {
    chunked.push(str.substr(index, size));
    index += size;
  }
  return chunked;
}
function humanReadableFileSize(bytes) {
  let base = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1e3;
  if (bytes < base) {
    return `${bytes} B`;
  }
  const prefix = base === 1024 ? ["Ki", "Mi", "Gi"] : ["k", "M", "G"];
  let unit = -1;
  while (Math.abs(bytes) >= base && unit < prefix.length - 1) {
    bytes /= base;
    ++unit;
  }
  return `${bytes.toFixed(1)} ${prefix[unit]}B`;
}
function mergeDeep() {
  let source = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  let target = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  let arrayFn = arguments.length > 2 ? arguments[2] : void 0;
  const out = {};
  for (const key in source) {
    out[key] = source[key];
  }
  for (const key in target) {
    const sourceProperty = source[key];
    const targetProperty = target[key];
    if (isObject$9(sourceProperty) && isObject$9(targetProperty)) {
      out[key] = mergeDeep(sourceProperty, targetProperty, arrayFn);
      continue;
    }
    if (Array.isArray(sourceProperty) && Array.isArray(targetProperty) && arrayFn) {
      out[key] = arrayFn(sourceProperty, targetProperty);
      continue;
    }
    out[key] = targetProperty;
  }
  return out;
}
function toKebabCase() {
  let str = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
  return str.replace(/[^a-z]/gi, "-").replace(/\B([A-Z])/g, "-$1").toLowerCase();
}
function findChildrenWithProvide(key, vnode) {
  if (!vnode || typeof vnode !== "object")
    return [];
  if (Array.isArray(vnode)) {
    return vnode.map((child) => findChildrenWithProvide(key, child)).flat(1);
  } else if (Array.isArray(vnode.children)) {
    return vnode.children.map((child) => findChildrenWithProvide(key, child)).flat(1);
  } else if (vnode.component) {
    if (Object.getOwnPropertySymbols(vnode.component.provides).includes(key)) {
      return [vnode.component];
    } else if (vnode.component.subTree) {
      return findChildrenWithProvide(key, vnode.component.subTree).flat(1);
    }
  }
  return [];
}
var _arr = /* @__PURE__ */ new WeakMap();
var _pointer = /* @__PURE__ */ new WeakMap();
class CircularBuffer {
  constructor(size) {
    _classPrivateFieldInitSpec(this, _arr, {
      writable: true,
      value: []
    });
    _classPrivateFieldInitSpec(this, _pointer, {
      writable: true,
      value: 0
    });
    this.size = size;
  }
  push(val) {
    _classPrivateFieldGet(this, _arr)[_classPrivateFieldGet(this, _pointer)] = val;
    _classPrivateFieldSet(this, _pointer, (_classPrivateFieldGet(this, _pointer) + 1) % this.size);
  }
  values() {
    return _classPrivateFieldGet(this, _arr).slice(_classPrivateFieldGet(this, _pointer)).concat(_classPrivateFieldGet(this, _arr).slice(0, _classPrivateFieldGet(this, _pointer)));
  }
}
function getEventCoordinates(e2) {
  if ("touches" in e2) {
    return {
      clientX: e2.touches[0].clientX,
      clientY: e2.touches[0].clientY
    };
  }
  return {
    clientX: e2.clientX,
    clientY: e2.clientY
  };
}
function destructComputed(getter) {
  const refs = reactive({});
  const base = computed(getter);
  watchEffect(() => {
    for (const key in base.value) {
      refs[key] = base.value[key];
    }
  }, {
    flush: "sync"
  });
  return toRefs(refs);
}
function includes(arr, val) {
  return arr.includes(val);
}
const onRE = /^on[^a-z]/;
const isOn = (key) => onRE.test(key);
const EventProp = [Function, Array];
function hasEvent(props, name2) {
  name2 = "on" + capitalize$2(name2);
  return !!(props[name2] || props[`${name2}Once`] || props[`${name2}Capture`] || props[`${name2}OnceCapture`] || props[`${name2}CaptureOnce`]);
}
function callEvent(handler) {
  for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }
  if (Array.isArray(handler)) {
    for (const h2 of handler) {
      h2(...args);
    }
  } else if (typeof handler === "function") {
    handler(...args);
  }
}
const block = ["top", "bottom"];
const inline = ["start", "end", "left", "right"];
function parseAnchor(anchor, isRtl) {
  let [side, align] = anchor.split(" ");
  if (!align) {
    align = includes(block, side) ? "start" : includes(inline, side) ? "top" : "center";
  }
  return {
    side: toPhysical(side, isRtl),
    align: toPhysical(align, isRtl)
  };
}
function toPhysical(str, isRtl) {
  if (str === "start")
    return isRtl ? "right" : "left";
  if (str === "end")
    return isRtl ? "left" : "right";
  return str;
}
function flipSide(anchor) {
  return {
    side: {
      center: "center",
      top: "bottom",
      bottom: "top",
      left: "right",
      right: "left"
    }[anchor.side],
    align: anchor.align
  };
}
function flipAlign(anchor) {
  return {
    side: anchor.side,
    align: {
      center: "center",
      top: "bottom",
      bottom: "top",
      left: "right",
      right: "left"
    }[anchor.align]
  };
}
function flipCorner(anchor) {
  return {
    side: anchor.align,
    align: anchor.side
  };
}
function getAxis(anchor) {
  return includes(block, anchor.side) ? "y" : "x";
}
class Box {
  constructor(_ref) {
    let {
      x: x2,
      y,
      width,
      height
    } = _ref;
    this.x = x2;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  get top() {
    return this.y;
  }
  get bottom() {
    return this.y + this.height;
  }
  get left() {
    return this.x;
  }
  get right() {
    return this.x + this.width;
  }
}
function getOverflow(a, b) {
  return {
    x: {
      before: Math.max(0, b.left - a.left),
      after: Math.max(0, a.right - b.right)
    },
    y: {
      before: Math.max(0, b.top - a.top),
      after: Math.max(0, a.bottom - b.bottom)
    }
  };
}
function nullifyTransforms(el) {
  const rect = el.getBoundingClientRect();
  const style = getComputedStyle(el);
  const tx = style.transform;
  if (tx) {
    let ta, sx, sy, dx, dy;
    if (tx.startsWith("matrix3d(")) {
      ta = tx.slice(9, -1).split(/, /);
      sx = +ta[0];
      sy = +ta[5];
      dx = +ta[12];
      dy = +ta[13];
    } else if (tx.startsWith("matrix(")) {
      ta = tx.slice(7, -1).split(/, /);
      sx = +ta[0];
      sy = +ta[3];
      dx = +ta[4];
      dy = +ta[5];
    } else {
      return new Box(rect);
    }
    const to = style.transformOrigin;
    const x2 = rect.x - dx - (1 - sx) * parseFloat(to);
    const y = rect.y - dy - (1 - sy) * parseFloat(to.slice(to.indexOf(" ") + 1));
    const w2 = sx ? rect.width / sx : el.offsetWidth + 1;
    const h2 = sy ? rect.height / sy : el.offsetHeight + 1;
    return new Box({
      x: x2,
      y,
      width: w2,
      height: h2
    });
  } else {
    return new Box(rect);
  }
}
function animate(el, keyframes, options) {
  if (typeof el.animate === "undefined")
    return {
      finished: Promise.resolve()
    };
  const animation = el.animate(keyframes, options);
  if (typeof animation.finished === "undefined") {
    animation.finished = new Promise((resolve) => {
      animation.onfinish = () => {
        resolve(animation);
      };
    });
  }
  return animation;
}
function createMessage(message2, vm, parent) {
  if (parent) {
    vm = {
      __isVue: true,
      $parent: parent,
      $options: vm
    };
  }
  if (vm) {
    vm.$_alreadyWarned = vm.$_alreadyWarned || [];
    if (vm.$_alreadyWarned.includes(message2))
      return;
    vm.$_alreadyWarned.push(message2);
  }
  return `[Vuetify] ${message2}` + (vm ? generateComponentTrace(vm) : "");
}
function consoleWarn(message2, vm, parent) {
  const newMessage = createMessage(message2, vm, parent);
  newMessage != null && console.warn(newMessage);
}
function consoleError(message2, vm, parent) {
  const newMessage = createMessage(message2, vm, parent);
  newMessage != null && console.error(newMessage);
}
const classifyRE = /(?:^|[-_])(\w)/g;
const classify = (str) => str.replace(classifyRE, (c) => c.toUpperCase()).replace(/[-_]/g, "");
function formatComponentName(vm, includeFile) {
  if (vm.$root === vm) {
    return "<Root>";
  }
  const options = typeof vm === "function" && vm.cid != null ? vm.options : vm.__isVue ? vm.$options || vm.constructor.options : vm || {};
  let name2 = options.name || options._componentTag;
  const file = options.__file;
  if (!name2 && file) {
    const match2 = file.match(/([^/\\]+)\.vue$/);
    name2 = match2 == null ? void 0 : match2[1];
  }
  return (name2 ? `<${classify(name2)}>` : `<Anonymous>`) + (file && includeFile !== false ? ` at ${file}` : "");
}
function generateComponentTrace(vm) {
  if (vm.__isVue && vm.$parent) {
    const tree = [];
    let currentRecursiveSequence = 0;
    while (vm) {
      if (tree.length > 0) {
        const last = tree[tree.length - 1];
        if (last.constructor === vm.constructor) {
          currentRecursiveSequence++;
          vm = vm.$parent;
          continue;
        } else if (currentRecursiveSequence > 0) {
          tree[tree.length - 1] = [last, currentRecursiveSequence];
          currentRecursiveSequence = 0;
        }
      }
      tree.push(vm);
      vm = vm.$parent;
    }
    return "\n\nfound in\n\n" + tree.map((vm2, i2) => `${i2 === 0 ? "---> " : " ".repeat(5 + i2 * 2)}${Array.isArray(vm2) ? `${formatComponentName(vm2[0])}... (${vm2[1]} recursive calls)` : formatComponentName(vm2)}`).join("\n");
  } else {
    return `

(found in ${formatComponentName(vm)})`;
  }
}
const srgbForwardMatrix = [[3.2406, -1.5372, -0.4986], [-0.9689, 1.8758, 0.0415], [0.0557, -0.204, 1.057]];
const srgbForwardTransform = (C2) => C2 <= 31308e-7 ? C2 * 12.92 : 1.055 * C2 ** (1 / 2.4) - 0.055;
const srgbReverseMatrix = [[0.4124, 0.3576, 0.1805], [0.2126, 0.7152, 0.0722], [0.0193, 0.1192, 0.9505]];
const srgbReverseTransform = (C2) => C2 <= 0.04045 ? C2 / 12.92 : ((C2 + 0.055) / 1.055) ** 2.4;
function fromXYZ$1(xyz) {
  const rgb2 = Array(3);
  const transform2 = srgbForwardTransform;
  const matrix = srgbForwardMatrix;
  for (let i2 = 0; i2 < 3; ++i2) {
    rgb2[i2] = Math.round(clamp(transform2(matrix[i2][0] * xyz[0] + matrix[i2][1] * xyz[1] + matrix[i2][2] * xyz[2])) * 255);
  }
  return {
    r: rgb2[0],
    g: rgb2[1],
    b: rgb2[2]
  };
}
function toXYZ$1(_ref) {
  let {
    r: r2,
    g,
    b
  } = _ref;
  const xyz = [0, 0, 0];
  const transform2 = srgbReverseTransform;
  const matrix = srgbReverseMatrix;
  r2 = transform2(r2 / 255);
  g = transform2(g / 255);
  b = transform2(b / 255);
  for (let i2 = 0; i2 < 3; ++i2) {
    xyz[i2] = matrix[i2][0] * r2 + matrix[i2][1] * g + matrix[i2][2] * b;
  }
  return xyz;
}
const delta = 0.20689655172413793;
const cielabForwardTransform = (t2) => t2 > delta ** 3 ? Math.cbrt(t2) : t2 / (3 * delta ** 2) + 4 / 29;
const cielabReverseTransform = (t2) => t2 > delta ? t2 ** 3 : 3 * delta ** 2 * (t2 - 4 / 29);
function fromXYZ(xyz) {
  const transform2 = cielabForwardTransform;
  const transformedY = transform2(xyz[1]);
  return [116 * transformedY - 16, 500 * (transform2(xyz[0] / 0.95047) - transformedY), 200 * (transformedY - transform2(xyz[2] / 1.08883))];
}
function toXYZ(lab) {
  const transform2 = cielabReverseTransform;
  const Ln = (lab[0] + 16) / 116;
  return [transform2(Ln + lab[1] / 500) * 0.95047, transform2(Ln), transform2(Ln - lab[2] / 200) * 1.08883];
}
function isCssColor(color) {
  return !!color && /^(#|var\(--|(rgb|hsl)a?\()/.test(color);
}
function parseColor$1(color) {
  if (typeof color === "number") {
    if (isNaN(color) || color < 0 || color > 16777215) {
      consoleWarn(`'${color}' is not a valid hex color`);
    }
    return {
      r: (color & 16711680) >> 16,
      g: (color & 65280) >> 8,
      b: color & 255
    };
  } else if (typeof color === "string") {
    let hex2 = color.startsWith("#") ? color.slice(1) : color;
    if ([3, 4].includes(hex2.length)) {
      hex2 = hex2.split("").map((char) => char + char).join("");
    } else if (![6, 8].includes(hex2.length)) {
      consoleWarn(`'${color}' is not a valid hex(a) color`);
    }
    const int = parseInt(hex2, 16);
    if (isNaN(int) || int < 0 || int > 4294967295) {
      consoleWarn(`'${color}' is not a valid hex(a) color`);
    }
    return HexToRGB(hex2);
  } else {
    throw new TypeError(`Colors can only be numbers or strings, recieved ${color == null ? color : color.constructor.name} instead`);
  }
}
function HSVtoRGB(hsva) {
  const {
    h: h2,
    s,
    v,
    a
  } = hsva;
  const f = (n2) => {
    const k2 = (n2 + h2 / 60) % 6;
    return v - v * s * Math.max(Math.min(k2, 4 - k2, 1), 0);
  };
  const rgb2 = [f(5), f(3), f(1)].map((v2) => Math.round(v2 * 255));
  return {
    r: rgb2[0],
    g: rgb2[1],
    b: rgb2[2],
    a
  };
}
function RGBtoHSV(rgba2) {
  if (!rgba2)
    return {
      h: 0,
      s: 1,
      v: 1,
      a: 1
    };
  const r2 = rgba2.r / 255;
  const g = rgba2.g / 255;
  const b = rgba2.b / 255;
  const max2 = Math.max(r2, g, b);
  const min2 = Math.min(r2, g, b);
  let h2 = 0;
  if (max2 !== min2) {
    if (max2 === r2) {
      h2 = 60 * (0 + (g - b) / (max2 - min2));
    } else if (max2 === g) {
      h2 = 60 * (2 + (b - r2) / (max2 - min2));
    } else if (max2 === b) {
      h2 = 60 * (4 + (r2 - g) / (max2 - min2));
    }
  }
  if (h2 < 0)
    h2 = h2 + 360;
  const s = max2 === 0 ? 0 : (max2 - min2) / max2;
  const hsv = [h2, s, max2];
  return {
    h: hsv[0],
    s: hsv[1],
    v: hsv[2],
    a: rgba2.a
  };
}
function HSVtoHSL(hsva) {
  const {
    h: h2,
    s,
    v,
    a
  } = hsva;
  const l2 = v - v * s / 2;
  const sprime = l2 === 1 || l2 === 0 ? 0 : (v - l2) / Math.min(l2, 1 - l2);
  return {
    h: h2,
    s: sprime,
    l: l2,
    a
  };
}
function HSLtoHSV(hsl2) {
  const {
    h: h2,
    s,
    l: l2,
    a
  } = hsl2;
  const v = l2 + s * Math.min(l2, 1 - l2);
  const sprime = v === 0 ? 0 : 2 - 2 * l2 / v;
  return {
    h: h2,
    s: sprime,
    v,
    a
  };
}
function RGBtoCSS(_ref) {
  let {
    r: r2,
    g,
    b,
    a
  } = _ref;
  return a === void 0 ? `rgb(${r2}, ${g}, ${b})` : `rgba(${r2}, ${g}, ${b}, ${a})`;
}
function HSVtoCSS(hsva) {
  return RGBtoCSS(HSVtoRGB(hsva));
}
function toHex(v) {
  const h2 = Math.round(v).toString(16);
  return ("00".substr(0, 2 - h2.length) + h2).toUpperCase();
}
function RGBtoHex(_ref2) {
  let {
    r: r2,
    g,
    b,
    a
  } = _ref2;
  return `#${[toHex(r2), toHex(g), toHex(b), a !== void 0 ? toHex(Math.round(a * 255)) : "FF"].join("")}`;
}
function HexToRGB(hex2) {
  let [r2, g, b, a] = chunk(hex2, 2).map((c) => parseInt(c, 16));
  a = a === void 0 ? a : Math.round(a / 255 * 100) / 100;
  return {
    r: r2,
    g,
    b,
    a
  };
}
function HexToHSV(hex2) {
  const rgb2 = HexToRGB(hex2);
  return RGBtoHSV(rgb2);
}
function HSVtoHex(hsva) {
  return RGBtoHex(HSVtoRGB(hsva));
}
function parseHex(hex2) {
  if (hex2.startsWith("#")) {
    hex2 = hex2.slice(1);
  }
  hex2 = hex2.replace(/([^0-9a-f])/gi, "F");
  if (hex2.length === 3 || hex2.length === 4) {
    hex2 = hex2.split("").map((x2) => x2 + x2).join("");
  }
  if (hex2.length === 6) {
    hex2 = padEnd(hex2, 8, "F");
  } else {
    hex2 = padEnd(padEnd(hex2, 6), 8, "F");
  }
  return hex2;
}
function lighten(value, amount) {
  const lab = fromXYZ(toXYZ$1(value));
  lab[0] = lab[0] + amount * 10;
  return fromXYZ$1(toXYZ(lab));
}
function darken(value, amount) {
  const lab = fromXYZ(toXYZ$1(value));
  lab[0] = lab[0] - amount * 10;
  return fromXYZ$1(toXYZ(lab));
}
function getLuma(color) {
  const rgb2 = parseColor$1(color);
  return toXYZ$1(rgb2)[1];
}
function getContrast(first, second) {
  const l1 = getLuma(first);
  const l2 = getLuma(second);
  const light = Math.max(l1, l2);
  const dark = Math.min(l1, l2);
  return (light + 0.05) / (dark + 0.05);
}
function getCurrentInstance(name2, message2) {
  const vm = getCurrentInstance$1();
  if (!vm) {
    throw new Error(`[Vuetify] ${name2} ${message2 || "must be called from inside a setup function"}`);
  }
  return vm;
}
function getCurrentInstanceName() {
  let name2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "composables";
  const vm = getCurrentInstance(name2).type;
  return toKebabCase((vm == null ? void 0 : vm.aliasName) || (vm == null ? void 0 : vm.name));
}
let _uid = 0;
let _map = /* @__PURE__ */ new WeakMap();
function getUid() {
  const vm = getCurrentInstance("getUid");
  if (_map.has(vm))
    return _map.get(vm);
  else {
    const uid2 = _uid++;
    _map.set(vm, uid2);
    return uid2;
  }
}
getUid.reset = () => {
  _uid = 0;
  _map = /* @__PURE__ */ new WeakMap();
};
function injectSelf(key) {
  const {
    provides
  } = getCurrentInstance("injectSelf");
  if (provides && key in provides) {
    return provides[key];
  }
}
function useToggleScope(source, cb) {
  let scope;
  watch(source, (active) => {
    if (active && !scope) {
      scope = effectScope();
      scope.run(cb);
    } else if (!active) {
      var _scope;
      (_scope = scope) == null ? void 0 : _scope.stop();
      scope = void 0;
    }
  }, {
    immediate: true
  });
  onScopeDispose(() => {
    var _scope2;
    (_scope2 = scope) == null ? void 0 : _scope2.stop();
  });
}
function propsFactory(props, source) {
  return (defaults) => {
    return Object.keys(props).reduce((obj, prop) => {
      const isObjectDefinition = typeof props[prop] === "object" && props[prop] != null && !Array.isArray(props[prop]);
      const definition = isObjectDefinition ? props[prop] : {
        type: props[prop]
      };
      if (defaults && prop in defaults) {
        obj[prop] = {
          ...definition,
          default: defaults[prop]
        };
      } else {
        obj[prop] = definition;
      }
      if (source && !obj[prop].source) {
        obj[prop].source = source;
      }
      return obj;
    }, {});
  };
}
function propIsDefined(vnode, prop) {
  var _vnode$props, _vnode$props2;
  return ((_vnode$props = vnode.props) == null ? void 0 : _vnode$props.hasOwnProperty(prop)) || ((_vnode$props2 = vnode.props) == null ? void 0 : _vnode$props2.hasOwnProperty(toKebabCase(prop)));
}
const defineComponent = function defineComponent2(options) {
  options._setup = options._setup ?? options.setup;
  if (!options.name) {
    consoleWarn("The component is missing an explicit name, unable to generate default prop value");
    return options;
  }
  if (options._setup) {
    options.props = options.props ?? {};
    options.props = propsFactory(options.props, toKebabCase(options.name))();
    options.props._as = String;
    options.setup = function setup(props, ctx) {
      const vm = getCurrentInstance$1();
      const defaults = useDefaults();
      const _subcomponentDefaults = shallowRef();
      const _props = shallowReactive({
        ...toRaw(props)
      });
      watchEffect(() => {
        const globalDefaults = defaults.value.global;
        const componentDefaults = defaults.value[props._as ?? options.name];
        if (componentDefaults) {
          const subComponents = Object.entries(componentDefaults).filter((_ref) => {
            let [key] = _ref;
            return key.startsWith(key[0].toUpperCase());
          });
          if (subComponents.length)
            _subcomponentDefaults.value = Object.fromEntries(subComponents);
        }
        for (const prop of Object.keys(props)) {
          let newVal = props[prop];
          if (!propIsDefined(vm.vnode, prop)) {
            newVal = (componentDefaults == null ? void 0 : componentDefaults[prop]) ?? (globalDefaults == null ? void 0 : globalDefaults[prop]) ?? props[prop];
          }
          if (_props[prop] !== newVal) {
            _props[prop] = newVal;
          }
        }
      });
      const setupBindings = options._setup(_props, ctx);
      useToggleScope(_subcomponentDefaults, () => {
        var _injectSelf;
        provideDefaults(mergeDeep(((_injectSelf = injectSelf(DefaultsSymbol)) == null ? void 0 : _injectSelf.value) ?? {}, _subcomponentDefaults.value));
      });
      return setupBindings;
    };
  }
  return options;
};
function genericComponent() {
  let exposeDefaults = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : true;
  return (options) => (exposeDefaults ? defineComponent : defineComponent$1)(options);
}
function createSimpleFunctional(klass) {
  let tag = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "div";
  let name2 = arguments.length > 2 ? arguments[2] : void 0;
  return defineComponent({
    name: name2 ?? capitalize$2(camelize(klass.replace(/__/g, "-"))),
    props: {
      tag: {
        type: String,
        default: tag
      }
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      return () => {
        var _slots$default;
        return h(props.tag, {
          class: klass
        }, (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots));
      };
    }
  });
}
function attachedRoot(node) {
  if (typeof node.getRootNode !== "function") {
    while (node.parentNode)
      node = node.parentNode;
    if (node !== document)
      return null;
    return document;
  }
  const root = node.getRootNode();
  if (root !== document && root.getRootNode({
    composed: true
  }) !== document)
    return null;
  return root;
}
const standardEasing = "cubic-bezier(0.4, 0, 0.2, 1)";
const deceleratedEasing = "cubic-bezier(0.0, 0, 0.2, 1)";
const acceleratedEasing = "cubic-bezier(0.4, 0, 1, 1)";
function getScrollParent(el) {
  while (el) {
    if (hasScrollbar(el))
      return el;
    el = el.parentElement;
  }
  return document.scrollingElement;
}
function getScrollParents(el, stopAt) {
  const elements = [];
  if (stopAt && el && !stopAt.contains(el))
    return elements;
  while (el) {
    if (hasScrollbar(el))
      elements.push(el);
    if (el === stopAt)
      break;
    el = el.parentElement;
  }
  return elements;
}
function hasScrollbar(el) {
  if (!el || el.nodeType !== Node.ELEMENT_NODE)
    return false;
  const style = window.getComputedStyle(el);
  return style.overflowY === "scroll" || style.overflowY === "auto" && el.scrollHeight > el.clientHeight;
}
const IN_BROWSER = typeof window !== "undefined";
const SUPPORTS_INTERSECTION = IN_BROWSER && "IntersectionObserver" in window;
const SUPPORTS_TOUCH = IN_BROWSER && ("ontouchstart" in window || window.navigator.maxTouchPoints > 0);
const SUPPORTS_FOCUS_VISIBLE = IN_BROWSER && typeof CSS !== "undefined" && CSS.supports("selector(:focus-visible)");
function isFixedPosition(el) {
  while (el) {
    if (window.getComputedStyle(el).position === "fixed") {
      return true;
    }
    el = el.offsetParent;
  }
  return false;
}
function useRender(render) {
  const vm = getCurrentInstance("useRender");
  vm.render = render;
}
const DefaultsSymbol = Symbol.for("vuetify:defaults");
function createDefaults(options) {
  return ref(options ?? {});
}
function useDefaults() {
  const defaults = inject$1(DefaultsSymbol);
  if (!defaults)
    throw new Error("[Vuetify] Could not find defaults instance");
  return defaults;
}
function provideDefaults(defaults, options) {
  const injectedDefaults = useDefaults();
  const providedDefaults = ref(defaults);
  const newDefaults = computed(() => {
    const scoped = unref(options == null ? void 0 : options.scoped);
    const reset = unref(options == null ? void 0 : options.reset);
    const root = unref(options == null ? void 0 : options.root);
    let properties = mergeDeep(providedDefaults.value, {
      prev: injectedDefaults.value
    });
    if (scoped)
      return properties;
    if (reset || root) {
      const len = Number(reset || Infinity);
      for (let i2 = 0; i2 <= len; i2++) {
        if (!properties.prev)
          break;
        properties = properties.prev;
      }
      return properties;
    }
    return mergeDeep(properties.prev, properties);
  });
  provide(DefaultsSymbol, newDefaults);
  return newDefaults;
}
const DisplaySymbol = Symbol.for("vuetify:display");
const defaultDisplayOptions = {
  mobileBreakpoint: "lg",
  thresholds: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
    xxl: 2560
  }
};
const parseDisplayOptions = function() {
  let options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : defaultDisplayOptions;
  return mergeDeep(defaultDisplayOptions, options);
};
function getClientWidth(isHydrate) {
  return IN_BROWSER && !isHydrate ? window.innerWidth : 0;
}
function getClientHeight(isHydrate) {
  return IN_BROWSER && !isHydrate ? window.innerHeight : 0;
}
function getPlatform() {
  const userAgent2 = IN_BROWSER ? window.navigator.userAgent : "ssr";
  function match2(regexp) {
    return Boolean(userAgent2.match(regexp));
  }
  const android = match2(/android/i);
  const ios = match2(/iphone|ipad|ipod/i);
  const cordova = match2(/cordova/i);
  const electron = match2(/electron/i);
  const chrome = match2(/chrome/i);
  const edge = match2(/edge/i);
  const firefox = match2(/firefox/i);
  const opera = match2(/opera/i);
  const win = match2(/win/i);
  const mac = match2(/mac/i);
  const linux = match2(/linux/i);
  const ssr = match2(/ssr/i);
  return {
    android,
    ios,
    cordova,
    electron,
    chrome,
    edge,
    firefox,
    opera,
    win,
    mac,
    linux,
    touch: SUPPORTS_TOUCH,
    ssr
  };
}
function createDisplay(options, ssr) {
  const {
    thresholds,
    mobileBreakpoint
  } = parseDisplayOptions(options);
  const height = ref(getClientHeight(ssr));
  const platform = getPlatform();
  const state = reactive({});
  const width = ref(getClientWidth(ssr));
  function update() {
    height.value = getClientHeight();
    width.value = getClientWidth();
  }
  watchEffect(() => {
    const xs = width.value < thresholds.sm;
    const sm = width.value < thresholds.md && !xs;
    const md = width.value < thresholds.lg && !(sm || xs);
    const lg = width.value < thresholds.xl && !(md || sm || xs);
    const xl = width.value < thresholds.xxl && !(lg || md || sm || xs);
    const xxl = width.value >= thresholds.xxl;
    const name2 = xs ? "xs" : sm ? "sm" : md ? "md" : lg ? "lg" : xl ? "xl" : "xxl";
    const breakpointValue = typeof mobileBreakpoint === "number" ? mobileBreakpoint : thresholds[mobileBreakpoint];
    const mobile = !platform.ssr ? width.value < breakpointValue : platform.android || platform.ios || platform.opera;
    state.xs = xs;
    state.sm = sm;
    state.md = md;
    state.lg = lg;
    state.xl = xl;
    state.xxl = xxl;
    state.smAndUp = !xs;
    state.mdAndUp = !(xs || sm);
    state.lgAndUp = !(xs || sm || md);
    state.xlAndUp = !(xs || sm || md || lg);
    state.smAndDown = !(md || lg || xl || xxl);
    state.mdAndDown = !(lg || xl || xxl);
    state.lgAndDown = !(xl || xxl);
    state.xlAndDown = !xxl;
    state.name = name2;
    state.height = height.value;
    state.width = width.value;
    state.mobile = mobile;
    state.mobileBreakpoint = mobileBreakpoint;
    state.platform = platform;
    state.thresholds = thresholds;
  });
  if (IN_BROWSER) {
    window.addEventListener("resize", update, {
      passive: true
    });
  }
  return {
    ...toRefs(state),
    update,
    ssr: !!ssr
  };
}
function useDisplay() {
  const display = inject$1(DisplaySymbol);
  if (!display)
    throw new Error("Could not find Vuetify display injection");
  return display;
}
const aliases = {
  collapse: "mdi-chevron-up",
  complete: "mdi-check",
  cancel: "mdi-close-circle",
  close: "mdi-close",
  delete: "mdi-close-circle",
  // delete (e.g. v-chip close)
  clear: "mdi-close-circle",
  success: "mdi-check-circle",
  info: "mdi-information",
  warning: "mdi-alert-circle",
  error: "mdi-close-circle",
  prev: "mdi-chevron-left",
  next: "mdi-chevron-right",
  checkboxOn: "mdi-checkbox-marked",
  checkboxOff: "mdi-checkbox-blank-outline",
  checkboxIndeterminate: "mdi-minus-box",
  delimiter: "mdi-circle",
  // for carousel
  sortAsc: "mdi-arrow-up",
  sortDesc: "mdi-arrow-down",
  expand: "mdi-chevron-down",
  menu: "mdi-menu",
  subgroup: "mdi-menu-down",
  dropdown: "mdi-menu-down",
  radioOn: "mdi-radiobox-marked",
  radioOff: "mdi-radiobox-blank",
  edit: "mdi-pencil",
  ratingEmpty: "mdi-star-outline",
  ratingFull: "mdi-star",
  ratingHalf: "mdi-star-half-full",
  loading: "mdi-cached",
  first: "mdi-page-first",
  last: "mdi-page-last",
  unfold: "mdi-unfold-more-horizontal",
  file: "mdi-paperclip",
  plus: "mdi-plus",
  minus: "mdi-minus"
};
const mdi = {
  // Not using mergeProps here, functional components merge props by default (?)
  component: (props) => h(VClassIcon, {
    ...props,
    class: "mdi"
  })
};
const IconValue = [String, Function, Object];
const IconSymbol = Symbol.for("vuetify:icons");
const makeIconProps = propsFactory({
  icon: {
    type: IconValue
  },
  // Could not remove this and use makeTagProps, types complained because it is not required
  tag: {
    type: String,
    required: true
  }
}, "icon");
const VComponentIcon = defineComponent({
  name: "VComponentIcon",
  props: makeIconProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    return () => {
      var _slots$default;
      return createVNode(props.tag, null, {
        default: () => [props.icon ? createVNode(props.icon, null, null) : (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)]
      });
    };
  }
});
const VSvgIcon = defineComponent({
  name: "VSvgIcon",
  inheritAttrs: false,
  props: makeIconProps(),
  setup(props, _ref2) {
    let {
      attrs
    } = _ref2;
    return () => {
      return createVNode(props.tag, mergeProps(attrs, {
        "style": null
      }), {
        default: () => [createVNode("svg", {
          "class": "v-icon__svg",
          "xmlns": "http://www.w3.org/2000/svg",
          "viewBox": "0 0 24 24",
          "role": "img",
          "aria-hidden": "true"
        }, [createVNode("path", {
          "d": props.icon
        }, null)])]
      });
    };
  }
});
const VLigatureIcon = defineComponent({
  name: "VLigatureIcon",
  props: makeIconProps(),
  setup(props) {
    return () => {
      return createVNode(props.tag, null, {
        default: () => [props.icon]
      });
    };
  }
});
const VClassIcon = defineComponent({
  name: "VClassIcon",
  props: makeIconProps(),
  setup(props) {
    return () => {
      return createVNode(props.tag, {
        "class": props.icon
      }, null);
    };
  }
});
const defaultSets = {
  svg: {
    component: VSvgIcon
  },
  class: {
    component: VClassIcon
  }
};
function createIcons(options) {
  return mergeDeep({
    defaultSet: "mdi",
    sets: {
      ...defaultSets,
      mdi
    },
    aliases
  }, options);
}
const useIcon = (props) => {
  const icons = inject$1(IconSymbol);
  if (!icons)
    throw new Error("Missing Vuetify Icons provide!");
  const iconData = computed(() => {
    const iconAlias = isRef(props) ? props.value : props.icon;
    if (!iconAlias)
      return {
        component: VComponentIcon
      };
    let icon = iconAlias;
    if (typeof icon === "string") {
      icon = icon.trim();
      if (icon.startsWith("$")) {
        var _icons$aliases;
        icon = (_icons$aliases = icons.aliases) == null ? void 0 : _icons$aliases[icon.slice(1)];
      }
    }
    if (!icon)
      throw new Error(`Could not find aliased icon "${iconAlias}"`);
    if (typeof icon !== "string") {
      return {
        component: VComponentIcon,
        icon
      };
    }
    const iconSetName = Object.keys(icons.sets).find((setName) => typeof icon === "string" && icon.startsWith(`${setName}:`));
    const iconName = iconSetName ? icon.slice(iconSetName.length + 1) : icon;
    const iconSet = icons.sets[iconSetName ?? icons.defaultSet];
    return {
      component: iconSet.component,
      icon: iconName
    };
  });
  return {
    iconData
  };
};
function useProxiedModel(props, prop, defaultValue) {
  let transformIn = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : (v) => v;
  let transformOut = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : (v) => v;
  const vm = getCurrentInstance("useProxiedModel");
  const internal = ref(props[prop] !== void 0 ? props[prop] : defaultValue);
  const kebabProp = toKebabCase(prop);
  const checkKebab = kebabProp !== prop;
  const isControlled = checkKebab ? computed(() => {
    var _vm$vnode$props, _vm$vnode$props2, _vm$vnode$props3, _vm$vnode$props4;
    void props[prop];
    return !!(((_vm$vnode$props = vm.vnode.props) != null && _vm$vnode$props.hasOwnProperty(prop) || (_vm$vnode$props2 = vm.vnode.props) != null && _vm$vnode$props2.hasOwnProperty(kebabProp)) && ((_vm$vnode$props3 = vm.vnode.props) != null && _vm$vnode$props3.hasOwnProperty(`onUpdate:${prop}`) || (_vm$vnode$props4 = vm.vnode.props) != null && _vm$vnode$props4.hasOwnProperty(`onUpdate:${kebabProp}`)));
  }) : computed(() => {
    var _vm$vnode$props5, _vm$vnode$props6;
    void props[prop];
    return !!((_vm$vnode$props5 = vm.vnode.props) != null && _vm$vnode$props5.hasOwnProperty(prop) && (_vm$vnode$props6 = vm.vnode.props) != null && _vm$vnode$props6.hasOwnProperty(`onUpdate:${prop}`));
  });
  useToggleScope(() => !isControlled.value, () => {
    watch(() => props[prop], (val) => {
      internal.value = val;
    });
  });
  const model = computed({
    get() {
      return transformIn(isControlled.value ? props[prop] : internal.value);
    },
    set(value) {
      const newValue = transformOut(value);
      if ((isControlled.value ? props[prop] : internal.value) === newValue || transformIn(isControlled.value ? props[prop] : internal.value) === value) {
        return;
      }
      internal.value = newValue;
      vm == null ? void 0 : vm.emit(`update:${prop}`, newValue);
    }
  });
  Object.defineProperty(model, "externalValue", {
    get: () => isControlled.value ? props[prop] : internal.value
  });
  return model;
}
const en = {
  badge: "Badge",
  close: "Close",
  dataIterator: {
    noResultsText: "No matching records found",
    loadingText: "Loading items..."
  },
  dataTable: {
    itemsPerPageText: "Rows per page:",
    ariaLabel: {
      sortDescending: "Sorted descending.",
      sortAscending: "Sorted ascending.",
      sortNone: "Not sorted.",
      activateNone: "Activate to remove sorting.",
      activateDescending: "Activate to sort descending.",
      activateAscending: "Activate to sort ascending."
    },
    sortBy: "Sort by"
  },
  dataFooter: {
    itemsPerPageText: "Items per page:",
    itemsPerPageAll: "All",
    nextPage: "Next page",
    prevPage: "Previous page",
    firstPage: "First page",
    lastPage: "Last page",
    pageText: "{0}-{1} of {2}"
  },
  datePicker: {
    itemsSelected: "{0} selected",
    nextMonthAriaLabel: "Next month",
    nextYearAriaLabel: "Next year",
    prevMonthAriaLabel: "Previous month",
    prevYearAriaLabel: "Previous year"
  },
  noDataText: "No data available",
  carousel: {
    prev: "Previous visual",
    next: "Next visual",
    ariaLabel: {
      delimiter: "Carousel slide {0} of {1}"
    }
  },
  calendar: {
    moreEvents: "{0} more"
  },
  input: {
    clear: "Clear {0}",
    prependAction: "{0} prepended action",
    appendAction: "{0} appended action"
  },
  fileInput: {
    counter: "{0} files",
    counterSize: "{0} files ({1} in total)"
  },
  timePicker: {
    am: "AM",
    pm: "PM"
  },
  pagination: {
    ariaLabel: {
      root: "Pagination Navigation",
      next: "Next page",
      previous: "Previous page",
      page: "Goto Page {0}",
      currentPage: "Page {0}, Current Page",
      first: "First page",
      last: "Last page"
    }
  },
  rating: {
    ariaLabel: {
      item: "Rating {0} of {1}"
    }
  }
};
const LANG_PREFIX = "$vuetify.";
const replace$2 = (str, params) => {
  return str.replace(/\{(\d+)\}/g, (match2, index) => {
    return String(params[+index]);
  });
};
const createTranslateFunction = (current, fallback, messages) => {
  return function(key) {
    for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      params[_key - 1] = arguments[_key];
    }
    if (!key.startsWith(LANG_PREFIX)) {
      return replace$2(key, params);
    }
    const shortKey = key.replace(LANG_PREFIX, "");
    const currentLocale = current.value && messages.value[current.value];
    const fallbackLocale = fallback.value && messages.value[fallback.value];
    let str = getObjectValueByPath(currentLocale, shortKey, null);
    if (!str) {
      consoleWarn(`Translation key "${key}" not found in "${current.value}", trying fallback locale`);
      str = getObjectValueByPath(fallbackLocale, shortKey, null);
    }
    if (!str) {
      consoleError(`Translation key "${key}" not found in fallback`);
      str = key;
    }
    if (typeof str !== "string") {
      consoleError(`Translation key "${key}" has a non-string value`);
      str = key;
    }
    return replace$2(str, params);
  };
};
function createNumberFunction(current, fallback) {
  return (value, options) => {
    const numberFormat = new Intl.NumberFormat([current.value, fallback.value], options);
    return numberFormat.format(value);
  };
}
function useProvided(props, prop, provided) {
  const internal = useProxiedModel(props, prop, props[prop] ?? provided.value);
  internal.value = props[prop] ?? provided.value;
  watch(provided, (v) => {
    if (props[prop] == null) {
      internal.value = provided.value;
    }
  });
  return internal;
}
function createProvideFunction(state) {
  return (props) => {
    const current = useProvided(props, "locale", state.current);
    const fallback = useProvided(props, "fallback", state.fallback);
    const messages = useProvided(props, "messages", state.messages);
    return {
      name: "vuetify",
      current,
      fallback,
      messages,
      t: createTranslateFunction(current, fallback, messages),
      n: createNumberFunction(current, fallback),
      provide: createProvideFunction({
        current,
        fallback,
        messages
      })
    };
  };
}
function createVuetifyAdapter(options) {
  const current = ref((options == null ? void 0 : options.locale) ?? "en");
  const fallback = ref((options == null ? void 0 : options.fallback) ?? "en");
  const messages = ref({
    en,
    ...options == null ? void 0 : options.messages
  });
  return {
    name: "vuetify",
    current,
    fallback,
    messages,
    t: createTranslateFunction(current, fallback, messages),
    n: createNumberFunction(current, fallback),
    provide: createProvideFunction({
      current,
      fallback,
      messages
    })
  };
}
const es$1 = {
  badge: "Placa",
  close: "Cerrar",
  dataIterator: {
    noResultsText: "Ningún elemento coincide con la búsqueda",
    loadingText: "Cargando..."
  },
  dataTable: {
    itemsPerPageText: "Filas por página:",
    ariaLabel: {
      sortDescending: "Orden descendente.",
      sortAscending: "Orden ascendente.",
      sortNone: "Sin ordenar.",
      activateNone: "Pulse para quitar orden.",
      activateDescending: "Pulse para ordenar descendente.",
      activateAscending: "Pulse para ordenar ascendente."
    },
    sortBy: "Ordenado por"
  },
  dataFooter: {
    itemsPerPageText: "Elementos por página:",
    itemsPerPageAll: "Todos",
    nextPage: "Página siguiente",
    prevPage: "Página anterior",
    firstPage: "Primer página",
    lastPage: "Última página",
    pageText: "{0}-{1} de {2}"
  },
  datePicker: {
    itemsSelected: "{0} seleccionados",
    nextMonthAriaLabel: "Próximo mes",
    nextYearAriaLabel: "Próximo año",
    prevMonthAriaLabel: "Mes anterior",
    prevYearAriaLabel: "Año anterior"
  },
  noDataText: "No hay datos disponibles",
  carousel: {
    prev: "Visual anterior",
    next: "Visual siguiente",
    ariaLabel: {
      delimiter: "Visual {0} de {1}"
    }
  },
  calendar: {
    moreEvents: "{0} más"
  },
  input: {
    clear: "Clear {0}",
    prependAction: "{0} prepended action",
    appendAction: "{0} appended action"
  },
  fileInput: {
    counter: "{0} archivos",
    counterSize: "{0} archivos ({1} en total)"
  },
  timePicker: {
    am: "AM",
    pm: "PM"
  },
  pagination: {
    ariaLabel: {
      root: "Navegación de paginación",
      next: "Página siguiente",
      previous: "Página anterior",
      page: "Ir a la página {0}",
      currentPage: "Página actual, página {0}",
      first: "First page",
      last: "Last page"
    }
  },
  rating: {
    ariaLabel: {
      item: "Puntuación {0} de {1}"
    }
  }
};
const pt$2 = {
  badge: "Distintivo",
  close: "Fechar",
  dataIterator: {
    noResultsText: "Nenhum dado encontrado",
    loadingText: "Carregando itens..."
  },
  dataTable: {
    itemsPerPageText: "Linhas por página:",
    ariaLabel: {
      sortDescending: "Ordenado decrescente.",
      sortAscending: "Ordenado crescente.",
      sortNone: "Não ordenado.",
      activateNone: "Ative para remover a ordenação.",
      activateDescending: "Ative para ordenar decrescente.",
      activateAscending: "Ative para ordenar crescente."
    },
    sortBy: "Ordenar por"
  },
  dataFooter: {
    itemsPerPageText: "Itens por página:",
    itemsPerPageAll: "Todos",
    nextPage: "Próxima página",
    prevPage: "Página anterior",
    firstPage: "Primeira página",
    lastPage: "Última página",
    pageText: "{0}-{1} de {2}"
  },
  datePicker: {
    itemsSelected: "{0} selecionado(s)",
    nextMonthAriaLabel: "Próximo mês",
    nextYearAriaLabel: "Próximo ano",
    prevMonthAriaLabel: "Mês anterior",
    prevYearAriaLabel: "Ano anterior"
  },
  noDataText: "Não há dados disponíveis",
  carousel: {
    prev: "Visão anterior",
    next: "Próxima visão",
    ariaLabel: {
      delimiter: "Slide {0} de {1} do carrossel"
    }
  },
  calendar: {
    moreEvents: "Mais {0}"
  },
  input: {
    clear: "Clear {0}",
    prependAction: "{0} prepended action",
    appendAction: "{0} appended action"
  },
  fileInput: {
    counter: "{0} arquivo(s)",
    counterSize: "{0} arquivo(s) ({1} no total)"
  },
  timePicker: {
    am: "AM",
    pm: "PM"
  },
  pagination: {
    ariaLabel: {
      root: "Navegação de paginação",
      next: "Próxima página",
      previous: "Página anterior",
      page: "Ir à página {0}",
      currentPage: "Página atual, página {0}",
      first: "First page",
      last: "Last page"
    }
  },
  rating: {
    ariaLabel: {
      item: "Rating {0} of {1}"
    }
  }
};
const defaultRtl = {
  af: false,
  ar: true,
  bg: false,
  ca: false,
  ckb: false,
  cs: false,
  de: false,
  el: false,
  en: false,
  es: false,
  et: false,
  fa: false,
  fi: false,
  fr: false,
  hr: false,
  hu: false,
  he: true,
  id: false,
  it: false,
  ja: false,
  ko: false,
  lv: false,
  lt: false,
  nl: false,
  no: false,
  pl: false,
  pt: false,
  ro: false,
  ru: false,
  sk: false,
  sl: false,
  srCyrl: false,
  srLatn: false,
  sv: false,
  th: false,
  tr: false,
  az: false,
  uk: false,
  vi: false,
  zhHans: false,
  zhHant: false
};
const LocaleSymbol = Symbol.for("vuetify:locale");
function isLocaleInstance(obj) {
  return obj.name != null;
}
function createLocale(options) {
  const i18n2 = options != null && options.adapter && isLocaleInstance(options == null ? void 0 : options.adapter) ? options == null ? void 0 : options.adapter : createVuetifyAdapter(options);
  const rtl = createRtl(i18n2, options);
  return {
    ...i18n2,
    ...rtl
  };
}
function useLocale() {
  const locale = inject$1(LocaleSymbol);
  if (!locale)
    throw new Error("[Vuetify] Could not find injected locale instance");
  return locale;
}
function provideLocale(props) {
  const locale = inject$1(LocaleSymbol);
  if (!locale)
    throw new Error("[Vuetify] Could not find injected locale instance");
  const i18n2 = locale.provide(props);
  const rtl = provideRtl(i18n2, locale.rtl, props);
  const data2 = {
    ...i18n2,
    ...rtl
  };
  provide(LocaleSymbol, data2);
  return data2;
}
function createRtl(i18n2, options) {
  const rtl = ref((options == null ? void 0 : options.rtl) ?? defaultRtl);
  const isRtl = computed(() => rtl.value[i18n2.current.value] ?? false);
  return {
    isRtl,
    rtl,
    rtlClasses: computed(() => `v-locale--is-${isRtl.value ? "rtl" : "ltr"}`)
  };
}
function provideRtl(locale, rtl, props) {
  const isRtl = computed(() => props.rtl ?? rtl.value[locale.current.value] ?? false);
  return {
    isRtl,
    rtl,
    rtlClasses: computed(() => `v-locale--is-${isRtl.value ? "rtl" : "ltr"}`)
  };
}
function useRtl() {
  const locale = inject$1(LocaleSymbol);
  if (!locale)
    throw new Error("[Vuetify] Could not find injected rtl instance");
  return {
    isRtl: locale.isRtl,
    rtlClasses: locale.rtlClasses
  };
}
const mainTRC = 2.4;
const Rco = 0.2126729;
const Gco = 0.7151522;
const Bco = 0.072175;
const normBG = 0.55;
const normTXT = 0.58;
const revTXT = 0.57;
const revBG = 0.62;
const blkThrs = 0.03;
const blkClmp = 1.45;
const deltaYmin = 5e-4;
const scaleBoW = 1.25;
const scaleWoB = 1.25;
const loConThresh = 0.078;
const loConFactor = 12.82051282051282;
const loConOffset = 0.06;
const loClip = 1e-3;
function APCAcontrast(text, background) {
  const Rtxt = (text.r / 255) ** mainTRC;
  const Gtxt = (text.g / 255) ** mainTRC;
  const Btxt = (text.b / 255) ** mainTRC;
  const Rbg = (background.r / 255) ** mainTRC;
  const Gbg = (background.g / 255) ** mainTRC;
  const Bbg = (background.b / 255) ** mainTRC;
  let Ytxt = Rtxt * Rco + Gtxt * Gco + Btxt * Bco;
  let Ybg = Rbg * Rco + Gbg * Gco + Bbg * Bco;
  if (Ytxt <= blkThrs)
    Ytxt += (blkThrs - Ytxt) ** blkClmp;
  if (Ybg <= blkThrs)
    Ybg += (blkThrs - Ybg) ** blkClmp;
  if (Math.abs(Ybg - Ytxt) < deltaYmin)
    return 0;
  let outputContrast;
  if (Ybg > Ytxt) {
    const SAPC = (Ybg ** normBG - Ytxt ** normTXT) * scaleBoW;
    outputContrast = SAPC < loClip ? 0 : SAPC < loConThresh ? SAPC - SAPC * loConFactor * loConOffset : SAPC - loConOffset;
  } else {
    const SAPC = (Ybg ** revBG - Ytxt ** revTXT) * scaleWoB;
    outputContrast = SAPC > -loClip ? 0 : SAPC > -loConThresh ? SAPC - SAPC * loConFactor * loConOffset : SAPC + loConOffset;
  }
  return outputContrast * 100;
}
const ThemeSymbol = Symbol.for("vuetify:theme");
const makeThemeProps = propsFactory({
  theme: String
}, "theme");
const defaultThemeOptions = {
  defaultTheme: "light",
  variations: {
    colors: [],
    lighten: 0,
    darken: 0
  },
  themes: {
    light: {
      dark: false,
      colors: {
        background: "#FFFFFF",
        surface: "#FFFFFF",
        "surface-variant": "#424242",
        "on-surface-variant": "#EEEEEE",
        primary: "#6200EE",
        "primary-darken-1": "#3700B3",
        secondary: "#03DAC6",
        "secondary-darken-1": "#018786",
        error: "#B00020",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FB8C00"
      },
      variables: {
        "border-color": "#000000",
        "border-opacity": 0.12,
        "high-emphasis-opacity": 0.87,
        "medium-emphasis-opacity": 0.6,
        "disabled-opacity": 0.38,
        "idle-opacity": 0.04,
        "hover-opacity": 0.04,
        "focus-opacity": 0.12,
        "selected-opacity": 0.08,
        "activated-opacity": 0.12,
        "pressed-opacity": 0.12,
        "dragged-opacity": 0.08,
        "theme-kbd": "#212529",
        "theme-on-kbd": "#FFFFFF",
        "theme-code": "#F5F5F5",
        "theme-on-code": "#000000"
      }
    },
    dark: {
      dark: true,
      colors: {
        background: "#121212",
        surface: "#212121",
        "surface-variant": "#BDBDBD",
        "on-surface-variant": "#424242",
        primary: "#BB86FC",
        "primary-darken-1": "#3700B3",
        secondary: "#03DAC5",
        "secondary-darken-1": "#03DAC5",
        error: "#CF6679",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FB8C00"
      },
      variables: {
        "border-color": "#FFFFFF",
        "border-opacity": 0.12,
        "high-emphasis-opacity": 0.87,
        "medium-emphasis-opacity": 0.6,
        "disabled-opacity": 0.38,
        "idle-opacity": 0.1,
        "hover-opacity": 0.04,
        "focus-opacity": 0.12,
        "selected-opacity": 0.08,
        "activated-opacity": 0.12,
        "pressed-opacity": 0.16,
        "dragged-opacity": 0.08,
        "theme-kbd": "#212529",
        "theme-on-kbd": "#FFFFFF",
        "theme-code": "#343434",
        "theme-on-code": "#CCCCCC"
      }
    }
  }
};
function parseThemeOptions() {
  let options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : defaultThemeOptions;
  if (!options)
    return {
      ...defaultThemeOptions,
      isDisabled: true
    };
  const themes = {};
  for (const [key, theme2] of Object.entries(options.themes ?? {})) {
    var _defaultThemeOptions$, _defaultThemeOptions$2;
    const defaultTheme2 = theme2.dark || key === "dark" ? (_defaultThemeOptions$ = defaultThemeOptions.themes) == null ? void 0 : _defaultThemeOptions$.dark : (_defaultThemeOptions$2 = defaultThemeOptions.themes) == null ? void 0 : _defaultThemeOptions$2.light;
    themes[key] = mergeDeep(defaultTheme2, theme2);
  }
  return mergeDeep(defaultThemeOptions, {
    ...options,
    themes
  });
}
function createTheme(options) {
  const parsedOptions = reactive(parseThemeOptions(options));
  const name2 = ref(parsedOptions.defaultTheme);
  const themes = ref(parsedOptions.themes);
  const computedThemes = computed(() => {
    const acc = {};
    for (const [name3, original] of Object.entries(themes.value)) {
      const theme2 = acc[name3] = {
        ...original,
        colors: {
          ...original.colors
        }
      };
      if (parsedOptions.variations) {
        for (const name4 of parsedOptions.variations.colors) {
          const color = theme2.colors[name4];
          if (!color)
            continue;
          for (const variation of ["lighten", "darken"]) {
            const fn = variation === "lighten" ? lighten : darken;
            for (const amount of createRange(parsedOptions.variations[variation], 1)) {
              theme2.colors[`${name4}-${variation}-${amount}`] = RGBtoHex(fn(parseColor$1(color), amount));
            }
          }
        }
      }
      for (const color of Object.keys(theme2.colors)) {
        if (/^on-[a-z]/.test(color) || theme2.colors[`on-${color}`])
          continue;
        const onColor = `on-${color}`;
        const colorVal = parseColor$1(theme2.colors[color]);
        const blackContrast = Math.abs(APCAcontrast(parseColor$1(0), colorVal));
        const whiteContrast = Math.abs(APCAcontrast(parseColor$1(16777215), colorVal));
        theme2.colors[onColor] = whiteContrast > Math.min(blackContrast, 50) ? "#fff" : "#000";
      }
    }
    return acc;
  });
  const current = computed(() => computedThemes.value[name2.value]);
  const styles = computed(() => {
    const lines = [];
    if (current.value.dark) {
      createCssClass(lines, ":root", ["color-scheme: dark"]);
    }
    for (const [themeName, theme2] of Object.entries(computedThemes.value)) {
      const {
        variables,
        dark
      } = theme2;
      createCssClass(lines, `.v-theme--${themeName}`, [`color-scheme: ${dark ? "dark" : "normal"}`, ...genCssVariables(theme2), ...Object.keys(variables).map((key) => {
        const value = variables[key];
        const color = typeof value === "string" && value.startsWith("#") ? parseColor$1(value) : void 0;
        const rgb2 = color ? `${color.r}, ${color.g}, ${color.b}` : void 0;
        return `--v-${key}: ${rgb2 ?? value}`;
      })]);
    }
    const bgLines = [];
    const fgLines = [];
    const colors2 = new Set(Object.values(computedThemes.value).flatMap((theme2) => Object.keys(theme2.colors)));
    for (const key of colors2) {
      if (/^on-[a-z]/.test(key)) {
        createCssClass(fgLines, `.${key}`, [`color: rgb(var(--v-theme-${key})) !important`]);
      } else {
        createCssClass(bgLines, `.bg-${key}`, [`--v-theme-overlay-multiplier: var(--v-theme-${key}-overlay-multiplier)`, `background: rgb(var(--v-theme-${key})) !important`, `color: rgb(var(--v-theme-on-${key})) !important`]);
        createCssClass(fgLines, `.text-${key}`, [`color: rgb(var(--v-theme-${key})) !important`]);
        createCssClass(fgLines, `.border-${key}`, [`--v-border-color: var(--v-theme-${key})`]);
      }
    }
    lines.push(...bgLines, ...fgLines);
    return lines.map((str, i2) => i2 === 0 ? str : `    ${str}`).join("");
  });
  function install2(app2) {
    const head = app2._context.provides.usehead;
    if (head) {
      head.addHeadObjs(computed(() => {
        const style = {
          children: styles.value,
          type: "text/css",
          id: "vuetify-theme-stylesheet"
        };
        if (parsedOptions.cspNonce)
          style.nonce = parsedOptions.cspNonce;
        return {
          style: [style]
        };
      }));
      if (IN_BROWSER) {
        watchEffect(() => head.updateDOM());
      }
    } else {
      let updateStyles = function() {
        if (parsedOptions.isDisabled)
          return;
        if (typeof document !== "undefined" && !styleEl) {
          const el = document.createElement("style");
          el.type = "text/css";
          el.id = "vuetify-theme-stylesheet";
          if (parsedOptions.cspNonce)
            el.setAttribute("nonce", parsedOptions.cspNonce);
          styleEl = el;
          document.head.appendChild(styleEl);
        }
        if (styleEl)
          styleEl.innerHTML = styles.value;
      };
      let styleEl = IN_BROWSER ? document.getElementById("vuetify-theme-stylesheet") : null;
      watch(styles, updateStyles, {
        immediate: true
      });
    }
  }
  const themeClasses = computed(() => parsedOptions.isDisabled ? void 0 : `v-theme--${name2.value}`);
  return {
    install: install2,
    isDisabled: parsedOptions.isDisabled,
    name: name2,
    themes,
    current,
    computedThemes,
    themeClasses,
    styles,
    global: {
      name: name2,
      current
    }
  };
}
function provideTheme(props) {
  getCurrentInstance("provideTheme");
  const theme2 = inject$1(ThemeSymbol, null);
  if (!theme2)
    throw new Error("Could not find Vuetify theme injection");
  const name2 = computed(() => {
    return props.theme ?? (theme2 == null ? void 0 : theme2.name.value);
  });
  const themeClasses = computed(() => theme2.isDisabled ? void 0 : `v-theme--${name2.value}`);
  const newTheme = {
    ...theme2,
    name: name2,
    themeClasses
  };
  provide(ThemeSymbol, newTheme);
  return newTheme;
}
function useTheme() {
  getCurrentInstance("useTheme");
  const theme2 = inject$1(ThemeSymbol, null);
  if (!theme2)
    throw new Error("Could not find Vuetify theme injection");
  return theme2;
}
function createCssClass(lines, selector, content) {
  lines.push(`${selector} {
`, ...content.map((line) => `  ${line};
`), "}\n");
}
function genCssVariables(theme2) {
  const lightOverlay = theme2.dark ? 2 : 1;
  const darkOverlay = theme2.dark ? 1 : 2;
  const variables = [];
  for (const [key, value] of Object.entries(theme2.colors)) {
    const rgb2 = parseColor$1(value);
    variables.push(`--v-theme-${key}: ${rgb2.r},${rgb2.g},${rgb2.b}`);
    if (!key.startsWith("on-")) {
      variables.push(`--v-theme-${key}-overlay-multiplier: ${getLuma(value) > 0.18 ? lightOverlay : darkOverlay}`);
    }
  }
  return variables;
}
function useResizeObserver(callback) {
  const resizeRef = ref();
  const contentRect = ref();
  if (IN_BROWSER) {
    const observer = new ResizeObserver((entries) => {
      callback == null ? void 0 : callback(entries, observer);
      if (!entries.length)
        return;
      contentRect.value = entries[0].contentRect;
    });
    onBeforeUnmount(() => {
      observer.disconnect();
    });
    watch(resizeRef, (newValue, oldValue) => {
      if (oldValue) {
        observer.unobserve(oldValue);
        contentRect.value = void 0;
      }
      if (newValue)
        observer.observe(newValue);
    }, {
      flush: "post"
    });
  }
  return {
    resizeRef,
    contentRect: readonly(contentRect)
  };
}
const VuetifyLayoutKey = Symbol.for("vuetify:layout");
const VuetifyLayoutItemKey = Symbol.for("vuetify:layout-item");
const ROOT_ZINDEX = 1e3;
const makeLayoutProps = propsFactory({
  overlaps: {
    type: Array,
    default: () => []
  },
  fullHeight: Boolean
}, "layout");
const makeLayoutItemProps = propsFactory({
  name: {
    type: String
  },
  order: {
    type: [Number, String],
    default: 0
  },
  absolute: Boolean
}, "layout-item");
function useLayout() {
  const layout = inject$1(VuetifyLayoutKey);
  if (!layout)
    throw new Error("[Vuetify] Could not find injected layout");
  return {
    getLayoutItem: layout.getLayoutItem,
    mainRect: layout.mainRect,
    mainStyles: layout.mainStyles
  };
}
function useLayoutItem(options) {
  const layout = inject$1(VuetifyLayoutKey);
  if (!layout)
    throw new Error("[Vuetify] Could not find injected layout");
  const id2 = options.id ?? `layout-item-${getUid()}`;
  const vm = getCurrentInstance("useLayoutItem");
  provide(VuetifyLayoutItemKey, {
    id: id2
  });
  const isKeptAlive = ref(false);
  onDeactivated(() => isKeptAlive.value = true);
  onActivated(() => isKeptAlive.value = false);
  const {
    layoutItemStyles,
    layoutItemScrimStyles
  } = layout.register(vm, {
    ...options,
    active: computed(() => isKeptAlive.value ? false : options.active.value),
    id: id2
  });
  onBeforeUnmount(() => layout.unregister(id2));
  return {
    layoutItemStyles,
    layoutRect: layout.layoutRect,
    layoutItemScrimStyles
  };
}
const generateLayers = (layout, positions, layoutSizes, activeItems) => {
  let previousLayer = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  };
  const layers = [{
    id: "",
    layer: {
      ...previousLayer
    }
  }];
  for (const id2 of layout) {
    const position = positions.get(id2);
    const amount = layoutSizes.get(id2);
    const active = activeItems.get(id2);
    if (!position || !amount || !active)
      continue;
    const layer = {
      ...previousLayer,
      [position.value]: parseInt(previousLayer[position.value], 10) + (active.value ? parseInt(amount.value, 10) : 0)
    };
    layers.push({
      id: id2,
      layer
    });
    previousLayer = layer;
  }
  return layers;
};
function createLayout(props) {
  const parentLayout = inject$1(VuetifyLayoutKey, null);
  const rootZIndex = computed(() => parentLayout ? parentLayout.rootZIndex.value - 100 : ROOT_ZINDEX);
  const registered = ref([]);
  const positions = reactive(/* @__PURE__ */ new Map());
  const layoutSizes = reactive(/* @__PURE__ */ new Map());
  const priorities = reactive(/* @__PURE__ */ new Map());
  const activeItems = reactive(/* @__PURE__ */ new Map());
  const disabledTransitions = reactive(/* @__PURE__ */ new Map());
  const {
    resizeRef,
    contentRect: layoutRect
  } = useResizeObserver();
  const computedOverlaps = computed(() => {
    const map = /* @__PURE__ */ new Map();
    const overlaps = props.overlaps ?? [];
    for (const overlap of overlaps.filter((item) => item.includes(":"))) {
      const [top, bottom] = overlap.split(":");
      if (!registered.value.includes(top) || !registered.value.includes(bottom))
        continue;
      const topPosition = positions.get(top);
      const bottomPosition = positions.get(bottom);
      const topAmount = layoutSizes.get(top);
      const bottomAmount = layoutSizes.get(bottom);
      if (!topPosition || !bottomPosition || !topAmount || !bottomAmount)
        continue;
      map.set(bottom, {
        position: topPosition.value,
        amount: parseInt(topAmount.value, 10)
      });
      map.set(top, {
        position: bottomPosition.value,
        amount: -parseInt(bottomAmount.value, 10)
      });
    }
    return map;
  });
  const layers = computed(() => {
    const uniquePriorities = [...new Set([...priorities.values()].map((p) => p.value))].sort((a, b) => a - b);
    const layout = [];
    for (const p of uniquePriorities) {
      const items2 = registered.value.filter((id2) => {
        var _priorities$get;
        return ((_priorities$get = priorities.get(id2)) == null ? void 0 : _priorities$get.value) === p;
      });
      layout.push(...items2);
    }
    return generateLayers(layout, positions, layoutSizes, activeItems);
  });
  const transitionsEnabled = computed(() => {
    return !Array.from(disabledTransitions.values()).some((ref2) => ref2.value);
  });
  const mainRect = computed(() => {
    return layers.value[layers.value.length - 1].layer;
  });
  const mainStyles = computed(() => {
    return {
      "--v-layout-left": convertToUnit(mainRect.value.left),
      "--v-layout-right": convertToUnit(mainRect.value.right),
      "--v-layout-top": convertToUnit(mainRect.value.top),
      "--v-layout-bottom": convertToUnit(mainRect.value.bottom),
      ...transitionsEnabled.value ? void 0 : {
        transition: "none"
      }
    };
  });
  const items = computed(() => {
    return layers.value.slice(1).map((_ref, index) => {
      let {
        id: id2
      } = _ref;
      const {
        layer
      } = layers.value[index];
      const size = layoutSizes.get(id2);
      const position = positions.get(id2);
      return {
        id: id2,
        ...layer,
        size: Number(size.value),
        position: position.value
      };
    });
  });
  const getLayoutItem = (id2) => {
    return items.value.find((item) => item.id === id2);
  };
  const rootVm = getCurrentInstance("createLayout");
  const isMounted = ref(false);
  onMounted(() => {
    isMounted.value = true;
  });
  provide(VuetifyLayoutKey, {
    register: (vm, _ref2) => {
      let {
        id: id2,
        order,
        position,
        layoutSize,
        elementSize,
        active,
        disableTransitions,
        absolute
      } = _ref2;
      priorities.set(id2, order);
      positions.set(id2, position);
      layoutSizes.set(id2, layoutSize);
      activeItems.set(id2, active);
      disableTransitions && disabledTransitions.set(id2, disableTransitions);
      const instances = findChildrenWithProvide(VuetifyLayoutItemKey, rootVm == null ? void 0 : rootVm.vnode);
      const instanceIndex = instances.indexOf(vm);
      if (instanceIndex > -1)
        registered.value.splice(instanceIndex, 0, id2);
      else
        registered.value.push(id2);
      const index = computed(() => items.value.findIndex((i2) => i2.id === id2));
      const zIndex = computed(() => rootZIndex.value + layers.value.length * 2 - index.value * 2);
      const layoutItemStyles = computed(() => {
        const isHorizontal = position.value === "left" || position.value === "right";
        const isOppositeHorizontal = position.value === "right";
        const isOppositeVertical = position.value === "bottom";
        const styles = {
          [position.value]: 0,
          zIndex: zIndex.value,
          transform: `translate${isHorizontal ? "X" : "Y"}(${(active.value ? 0 : -110) * (isOppositeHorizontal || isOppositeVertical ? -1 : 1)}%)`,
          position: absolute.value || rootZIndex.value !== ROOT_ZINDEX ? "absolute" : "fixed",
          ...transitionsEnabled.value ? void 0 : {
            transition: "none"
          }
        };
        if (!isMounted.value)
          return styles;
        const item = items.value[index.value];
        if (!item)
          throw new Error(`[Vuetify] Could not find layout item "${id2}"`);
        const overlap = computedOverlaps.value.get(id2);
        if (overlap) {
          item[overlap.position] += overlap.amount;
        }
        return {
          ...styles,
          height: isHorizontal ? `calc(100% - ${item.top}px - ${item.bottom}px)` : elementSize.value ? `${elementSize.value}px` : void 0,
          left: isOppositeHorizontal ? void 0 : `${item.left}px`,
          right: isOppositeHorizontal ? `${item.right}px` : void 0,
          top: position.value !== "bottom" ? `${item.top}px` : void 0,
          bottom: position.value !== "top" ? `${item.bottom}px` : void 0,
          width: !isHorizontal ? `calc(100% - ${item.left}px - ${item.right}px)` : elementSize.value ? `${elementSize.value}px` : void 0
        };
      });
      const layoutItemScrimStyles = computed(() => ({
        zIndex: zIndex.value - 1
      }));
      return {
        layoutItemStyles,
        layoutItemScrimStyles,
        zIndex
      };
    },
    unregister: (id2) => {
      priorities.delete(id2);
      positions.delete(id2);
      layoutSizes.delete(id2);
      activeItems.delete(id2);
      disabledTransitions.delete(id2);
      registered.value = registered.value.filter((v) => v !== id2);
    },
    mainRect,
    mainStyles,
    getLayoutItem,
    items,
    layoutRect,
    rootZIndex
  });
  const layoutClasses = computed(() => ["v-layout", {
    "v-layout--full-height": props.fullHeight
  }]);
  const layoutStyles = computed(() => ({
    zIndex: rootZIndex.value,
    position: parentLayout ? "relative" : void 0,
    overflow: parentLayout ? "hidden" : void 0
  }));
  return {
    layoutClasses,
    layoutStyles,
    getLayoutItem,
    items,
    layoutRect,
    layoutRef: resizeRef
  };
}
function createVuetify() {
  let vuetify2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  const {
    blueprint,
    ...rest
  } = vuetify2;
  const options = mergeDeep(blueprint, rest);
  const {
    aliases: aliases2 = {},
    components: components2 = {},
    directives: directives2 = {}
  } = options;
  const defaults = createDefaults(options.defaults);
  const display = createDisplay(options.display, options.ssr);
  const theme2 = createTheme(options.theme);
  const icons = createIcons(options.icons);
  const locale = createLocale(options.locale);
  const install2 = (app2) => {
    for (const key in directives2) {
      app2.directive(key, directives2[key]);
    }
    for (const key in components2) {
      app2.component(key, components2[key]);
    }
    for (const key in aliases2) {
      app2.component(key, defineComponent({
        ...aliases2[key],
        name: key,
        aliasName: aliases2[key].name
      }));
    }
    theme2.install(app2);
    app2.provide(DefaultsSymbol, defaults);
    app2.provide(DisplaySymbol, display);
    app2.provide(ThemeSymbol, theme2);
    app2.provide(IconSymbol, icons);
    app2.provide(LocaleSymbol, locale);
    if (IN_BROWSER && options.ssr) {
      if (app2.$nuxt) {
        app2.$nuxt.hook("app:suspense:resolve", () => {
          display.update();
        });
      } else {
        const {
          mount
        } = app2;
        app2.mount = function() {
          const vm = mount(...arguments);
          nextTick(() => display.update());
          app2.mount = mount;
          return vm;
        };
      }
    }
    getUid.reset();
    {
      app2.mixin({
        computed: {
          $vuetify() {
            return reactive({
              defaults: inject.call(this, DefaultsSymbol),
              display: inject.call(this, DisplaySymbol),
              theme: inject.call(this, ThemeSymbol),
              icons: inject.call(this, IconSymbol),
              locale: inject.call(this, LocaleSymbol)
            });
          }
        }
      });
    }
  };
  return {
    install: install2,
    defaults,
    display,
    theme: theme2,
    icons,
    locale
  };
}
const version$3 = "3.1.0";
createVuetify.version = version$3;
function inject(key) {
  var _vm$parent, _vm$vnode$appContext;
  const vm = this.$;
  const provides = ((_vm$parent = vm.parent) == null ? void 0 : _vm$parent.provides) ?? ((_vm$vnode$appContext = vm.vnode.appContext) == null ? void 0 : _vm$vnode$appContext.provides);
  if (provides && key in provides) {
    return provides[key];
  }
}
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x2) {
  return x2 && x2.__esModule && Object.prototype.hasOwnProperty.call(x2, "default") ? x2["default"] : x2;
}
function filename(meta) {
  return meta.url.split("/").slice(-1)[0];
}
function basename(meta) {
  return filename(meta).split(".")[0];
}
function capitalize$1(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
class ThemeDefinition {
  constructor() {
    /**
     * @type {boolean}
     */
    __publicField(this, "dark");
    /**
     * @type {Colors}
     */
    __publicField(this, "colors");
  }
  //variables: Record<string, string | number>;
}
const DARK = "dark";
const LIGHT = "light";
let NamedThemeDefinition$2 = class NamedThemeDefinition extends ThemeDefinition {
  constructor() {
    super(...arguments);
    /**
     * Theme name.
     * @type {string}
     */
    __publicField(this, "name");
  }
};
function id$3(meta) {
  return basename(meta);
}
function name$2(meta) {
  const name2 = id$3(meta).replace(/([A-Z])/g, " $1");
  return name2.charAt(0).toUpperCase() + name2.slice(1);
}
function isDarkMode() {
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
}
function defaultTheme() {
  return isDarkMode() ? DARK : LIGHT;
}
const theme = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DARK,
  LIGHT,
  NamedThemeDefinition: NamedThemeDefinition$2,
  defaultTheme,
  id: id$3,
  isDarkMode,
  name: name$2
}, Symbol.toStringTag, { value: "Module" }));
const Control_vue_vue_type_style_index_0_scoped_72b0a2de_lang = "";
const _withScopeId = (n2) => (pushScopeId("data-v-72b0a2de"), n2 = n2(), popScopeId(), n2);
const _hoisted_1 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("img", {
  style: { "height": "100%", "width": "36px" },
  src: _imports_0
}, null, -1));
const _hoisted_2 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("span", { class: "ml-4 d-none d-sm-inline-block" }, "Louvor JA", -1));
const _hoisted_3 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("span", { class: "ml-4 d-none d-sm-inline-block" }, "Liturgy", -1));
const _hoisted_4 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("span", { class: "ml-4 d-none d-sm-inline-block" }, "Tools", -1));
const _hoisted_5 = ["src"];
const _hoisted_6 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("p", null, "Louvor JA ©2023 - All rights reserved", -1));
const _sfc_main = {
  __name: "Control",
  setup(__props) {
    const router2 = useRouter$1();
    onMounted(() => router2.push({ name: CONFIG.app.startPage }));
    window.document.title = CONFIG.app.name;
    const drawerRight = ref(null);
    const aspectRatio = ref("16/9");
    const { defaultTheme: defaultTheme2, isDarkMode: isDarkMode2, NamedThemeDefinition: NamedThemeDefinition3 } = theme;
    const store = main();
    const theme$1 = useTheme();
    const themes = Object.entries(theme$1.themes.value).map((t2) => {
      return {
        id: t2[0],
        name: t2[1].name || capitalize$1(t2[0]),
        dark: t2[1].dark
      };
    });
    themes.splice(0, 0, {
      id: "auto",
      name: "Auto",
      dark: isDarkMode2()
    });
    const toggleTheme = (newTheme) => {
      newTheme = typeof newTheme === "string" ? newTheme : newTheme.toString();
      if (newTheme === "auto") {
        selectedTheme.value = store.ui.theme = newTheme;
        theme$1.global.name.value = defaultTheme2();
      } else if (store.ui.theme === "auto") {
        selectedTheme.value = theme$1.global.name.value = newTheme;
      } else {
        selectedTheme.value = theme$1.global.name.value = store.ui.theme = newTheme;
      }
    };
    const projectionUrl = `${window.location.origin}${window.location.pathname.replace("/control", "/projection")}`;
    const openProjection = () => {
      window.open(`${projectionUrl}?mode=projection`, "projection");
    };
    store.ui.theme = theme$1.global.name.value;
    const selectedTheme = ref(store.ui.theme);
    watch(selectedTheme, (n2, o2) => toggleTheme(n2));
    const iconFor = (theme2) => {
      return theme2.dark ? "mdi-weather-night" : "mdi-weather-sunny";
    };
    const themeIcon = computed(() => {
      console.log(selectedTheme.value);
      return iconFor(themes.filter((t2) => t2.id === selectedTheme.value)[0]);
    });
    window.matchMedia("(prefers-color-scheme: dark)").addListener(() => {
      toggleTheme(defaultTheme2());
    });
    return (_ctx, _cache) => {
      const _component_v_system_bar = resolveComponent("v-system-bar");
      const _component_v_tab = resolveComponent("v-tab");
      const _component_v_icon = resolveComponent("v-icon");
      const _component_v_tooltip = resolveComponent("v-tooltip");
      const _component_v_tabs = resolveComponent("v-tabs");
      const _component_v_btn = resolveComponent("v-btn");
      const _component_v_list_item = resolveComponent("v-list-item");
      const _component_v_list = resolveComponent("v-list");
      const _component_v_menu = resolveComponent("v-menu");
      const _component_v_app_bar = resolveComponent("v-app-bar");
      const _component_v_navigation_drawer = resolveComponent("v-navigation-drawer");
      const _component_router_view = resolveComponent("router-view");
      const _component_v_container = resolveComponent("v-container");
      const _component_v_main = resolveComponent("v-main");
      const _component_v_row = resolveComponent("v-row");
      const _component_v_footer = resolveComponent("v-footer");
      const _component_v_layout = resolveComponent("v-layout");
      const _component_v_app = resolveComponent("v-app");
      return openBlock(), createBlock(_component_v_app, { "full-height": "" }, {
        default: withCtx(() => [
          createVNode(_component_v_layout, { "full-height": "" }, {
            default: withCtx(() => [
              createVNode(_component_v_system_bar, null, {
                default: withCtx(() => [
                  createTextVNode("system status: is WEb? is Desktop? server websocket status? projection activated?")
                ]),
                _: 1
              }),
              createVNode(_component_v_app_bar, {
                density: "compact",
                ref: "app-bar"
              }, {
                title: withCtx(() => [
                  createVNode(_component_v_tabs, {
                    centered: "",
                    grow: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_v_tab, { to: { name: "home" } }, {
                        default: withCtx(() => [
                          _hoisted_1,
                          _hoisted_2
                        ]),
                        _: 1
                      }),
                      createVNode(_component_v_tab, {
                        to: { name: "liturgy" },
                        ripple: "",
                        exact: ""
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_v_icon, { size: "x-large" }, {
                            default: withCtx(() => [
                              createTextVNode("mdi-church")
                            ]),
                            _: 1
                          }),
                          _hoisted_3,
                          createVNode(_component_v_tooltip, {
                            activator: "parent",
                            location: "bottom"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Liturgy ")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_v_tab, {
                        to: { name: "tools" },
                        ripple: "",
                        exact: ""
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_v_icon, { size: "x-large" }, {
                            default: withCtx(() => [
                              createTextVNode("mdi-toolbox")
                            ]),
                            _: 1
                          }),
                          _hoisted_4,
                          createVNode(_component_v_tooltip, {
                            activator: "parent",
                            location: "bottom"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Tools ")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                append: withCtx(() => [
                  createVNode(_component_v_menu, {
                    bottom: "",
                    left: "",
                    "close-on-content-click": true,
                    transition: "slide-y-transition"
                  }, {
                    activator: withCtx(({ props }) => [
                      createVNode(_component_v_btn, mergeProps({ icon: unref(themeIcon) }, props), null, 16, ["icon"])
                    ]),
                    default: withCtx(() => [
                      createVNode(_component_v_list, { density: "compact" }, {
                        default: withCtx(() => [
                          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(themes), (theme2) => {
                            return openBlock(), createBlock(_component_v_list_item, {
                              key: theme2.id
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_v_list_item, {
                                  onClick: ($event) => toggleTheme(theme2.id)
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_v_icon, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString$1(iconFor(theme2)), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createTextVNode(" " + toDisplayString$1(theme2.name), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["onClick"])
                              ]),
                              _: 2
                            }, 1024);
                          }), 128))
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                default: withCtx(() => [
                  createVNode(_component_v_btn, {
                    icon: "",
                    onClick: _cache[0] || (_cache[0] = withModifiers(($event) => openProjection(), ["stop"]))
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_v_icon, null, {
                        default: withCtx(() => [
                          createTextVNode("mdi-monitor-screenshot")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_v_btn, {
                    icon: "",
                    onClick: _cache[1] || (_cache[1] = withModifiers(($event) => drawerRight.value = !drawerRight.value, ["stop"]))
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_v_icon, null, {
                        default: withCtx(() => [
                          createTextVNode("mdi-monitor-eye")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 512),
              createVNode(_component_v_navigation_drawer, {
                location: "right",
                modelValue: drawerRight.value,
                "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => drawerRight.value = $event),
                permanent: ""
              }, {
                default: withCtx(() => [
                  createBaseVNode("div", null, [
                    createVNode(_component_v_btn, {
                      width: "33.33333%",
                      onClick: _cache[2] || (_cache[2] = ($event) => aspectRatio.value = "4/3"),
                      variant: aspectRatio.value === "4/3" ? "tonal" : "text"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" 4/3 ")
                      ]),
                      _: 1
                    }, 8, ["variant"]),
                    createVNode(_component_v_btn, {
                      width: "33.33333%",
                      onClick: _cache[3] || (_cache[3] = ($event) => aspectRatio.value = "16/9"),
                      variant: aspectRatio.value === "16/9" ? "tonal" : "text"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" 16/9 ")
                      ]),
                      _: 1
                    }, 8, ["variant"]),
                    createVNode(_component_v_btn, {
                      width: "33.33333%",
                      onClick: _cache[4] || (_cache[4] = ($event) => aspectRatio.value = "1/1"),
                      variant: aspectRatio.value !== "16/9" && aspectRatio.value !== "4/3" ? "tonal" : "text"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Screen "),
                        createVNode(_component_v_tooltip, {
                          activator: "parent",
                          location: "left"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Should use projection screen aspect ratio ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["variant"])
                  ]),
                  createBaseVNode("div", {
                    class: "preview",
                    style: normalizeStyle({ aspectRatio: aspectRatio.value })
                  }, [
                    createBaseVNode("iframe", {
                      src: `${projectionUrl}?mode=preview`
                    }, " ", 8, _hoisted_5)
                  ], 4)
                ]),
                _: 1
              }, 8, ["modelValue"]),
              createVNode(_component_v_main, { scrollable: "" }, {
                default: withCtx(() => [
                  createVNode(_component_v_container, { fluid: "" }, {
                    default: withCtx(() => [
                      createVNode(_component_router_view, null, {
                        default: withCtx(({ Component, route }) => [
                          createVNode(Transition, { name: "fade" }, {
                            default: withCtx(() => [
                              (openBlock(), createBlock(resolveDynamicComponent(Component), {
                                key: route.path
                              }))
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_v_footer, { app: "" }, {
                default: withCtx(() => [
                  createVNode(_component_v_row, {
                    justify: "center",
                    "no-gutters": ""
                  }, {
                    default: withCtx(() => [
                      _hoisted_6
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      });
    };
  }
};
const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-72b0a2de"]]);
const scriptRel = "modulepreload";
const assetsURL = function(dep, importerUrl) {
  return new URL(dep, importerUrl).href;
};
const seen = {};
const __vitePreload = function preload(baseModule, deps, importerUrl) {
  if (!deps || deps.length === 0) {
    return baseModule();
  }
  const links = document.getElementsByTagName("link");
  return Promise.all(deps.map((dep) => {
    dep = assetsURL(dep, importerUrl);
    if (dep in seen)
      return;
    seen[dep] = true;
    const isCss = dep.endsWith(".css");
    const cssSelector = isCss ? '[rel="stylesheet"]' : "";
    const isBaseRelative = !!importerUrl;
    if (isBaseRelative) {
      for (let i2 = links.length - 1; i2 >= 0; i2--) {
        const link2 = links[i2];
        if (link2.href === dep && (!isCss || link2.rel === "stylesheet")) {
          return;
        }
      }
    } else if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
      return;
    }
    const link = document.createElement("link");
    link.rel = isCss ? "stylesheet" : scriptRel;
    if (!isCss) {
      link.as = "script";
      link.crossOrigin = "";
    }
    link.href = dep;
    document.head.appendChild(link);
    if (isCss) {
      return new Promise((res, rej) => {
        link.addEventListener("load", res);
        link.addEventListener("error", () => rej(new Error(`Unable to preload CSS for ${dep}`)));
      });
    }
  })).then(() => baseModule());
};
const routes = [
  {
    path: "/",
    name: "home",
    component: () => __vitePreload(() => import("./Home-b424964d.js"), true ? ["./Home-b424964d.js","./_plugin-vue_export-helper-7660c2c6.js"] : void 0, import.meta.url)
  },
  {
    path: "/liturgy",
    name: "liturgy",
    component: () => __vitePreload(() => import("./Liturgy-df6b5c85.js"), true ? ["./Liturgy-df6b5c85.js","./_plugin-vue_export-helper-7660c2c6.js"] : void 0, import.meta.url)
  },
  {
    path: "/tools",
    name: "tools",
    component: () => __vitePreload(() => import("./Tools-b84b1072.js"), true ? ["./Tools-b84b1072.js","./_plugin-vue_export-helper-7660c2c6.js"] : void 0, import.meta.url)
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/error"
  }
];
const router = createRouter({
  history: createWebHashHistory(),
  routes
});
const VApp$1 = "";
const VApp = defineComponent({
  name: "VApp",
  props: {
    ...makeLayoutProps({
      fullHeight: true
    }),
    ...makeThemeProps()
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const theme2 = provideTheme(props);
    const {
      layoutClasses,
      layoutStyles,
      getLayoutItem,
      items,
      layoutRef
    } = createLayout(props);
    const {
      rtlClasses
    } = useRtl();
    useRender(() => {
      var _slots$default;
      return createVNode("div", {
        "ref": layoutRef,
        "class": ["v-application", theme2.themeClasses.value, layoutClasses.value, rtlClasses.value],
        "style": layoutStyles.value
      }, [createVNode("div", {
        "class": "v-application__wrap"
      }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)])]);
    });
    return {
      getLayoutItem,
      items,
      theme: theme2
    };
  }
});
const VAppBar$1 = "";
const VToolbar$1 = "";
const VDefaultsProvider = defineComponent$1({
  name: "VDefaultsProvider",
  props: {
    defaults: Object,
    reset: [Number, String],
    root: Boolean,
    scoped: Boolean
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      defaults,
      reset,
      root,
      scoped
    } = toRefs(props);
    provideDefaults(defaults, {
      reset,
      root,
      scoped
    });
    return () => {
      var _slots$default;
      return (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots);
    };
  }
});
function createCssTransition(name2) {
  let origin = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "top center 0";
  let mode = arguments.length > 2 ? arguments[2] : void 0;
  return defineComponent({
    name: name2,
    props: {
      group: Boolean,
      hideOnLeave: Boolean,
      leaveAbsolute: Boolean,
      mode: {
        type: String,
        default: mode
      },
      origin: {
        type: String,
        default: origin
      }
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      return () => {
        const tag = props.group ? TransitionGroup : Transition;
        return h(tag, {
          name: name2,
          mode: props.mode,
          onBeforeEnter(el) {
            el.style.transformOrigin = props.origin;
          },
          onLeave(el) {
            if (props.leaveAbsolute) {
              const {
                offsetTop,
                offsetLeft,
                offsetWidth,
                offsetHeight
              } = el;
              el._transitionInitialStyles = {
                position: el.style.position,
                top: el.style.top,
                left: el.style.left,
                width: el.style.width,
                height: el.style.height
              };
              el.style.position = "absolute";
              el.style.top = `${offsetTop}px`;
              el.style.left = `${offsetLeft}px`;
              el.style.width = `${offsetWidth}px`;
              el.style.height = `${offsetHeight}px`;
            }
            if (props.hideOnLeave) {
              el.style.setProperty("display", "none", "important");
            }
          },
          onAfterLeave(el) {
            if (props.leaveAbsolute && el != null && el._transitionInitialStyles) {
              const {
                position,
                top,
                left,
                width,
                height
              } = el._transitionInitialStyles;
              delete el._transitionInitialStyles;
              el.style.position = position || "";
              el.style.top = top || "";
              el.style.left = left || "";
              el.style.width = width || "";
              el.style.height = height || "";
            }
          }
        }, slots.default);
      };
    }
  });
}
function createJavascriptTransition(name2, functions) {
  let mode = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "in-out";
  return defineComponent({
    name: name2,
    props: {
      mode: {
        type: String,
        default: mode
      }
    },
    setup(props, _ref2) {
      let {
        slots
      } = _ref2;
      return () => {
        return h(Transition, {
          name: name2,
          // mode: props.mode, // TODO: vuejs/vue-next#3104
          ...functions
        }, slots.default);
      };
    }
  });
}
function ExpandTransitionGenerator() {
  let expandedParentClass = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
  let x2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
  const sizeProperty = x2 ? "width" : "height";
  const offsetProperty = camelize(`offset-${sizeProperty}`);
  return {
    onBeforeEnter(el) {
      el._parent = el.parentNode;
      el._initialStyle = {
        transition: el.style.transition,
        overflow: el.style.overflow,
        [sizeProperty]: el.style[sizeProperty]
      };
    },
    onEnter(el) {
      const initialStyle = el._initialStyle;
      el.style.setProperty("transition", "none", "important");
      el.style.overflow = "hidden";
      const offset = `${el[offsetProperty]}px`;
      el.style[sizeProperty] = "0";
      void el.offsetHeight;
      el.style.transition = initialStyle.transition;
      if (expandedParentClass && el._parent) {
        el._parent.classList.add(expandedParentClass);
      }
      requestAnimationFrame(() => {
        el.style[sizeProperty] = offset;
      });
    },
    onAfterEnter: resetStyles,
    onEnterCancelled: resetStyles,
    onLeave(el) {
      el._initialStyle = {
        transition: "",
        overflow: el.style.overflow,
        [sizeProperty]: el.style[sizeProperty]
      };
      el.style.overflow = "hidden";
      el.style[sizeProperty] = `${el[offsetProperty]}px`;
      void el.offsetHeight;
      requestAnimationFrame(() => el.style[sizeProperty] = "0");
    },
    onAfterLeave,
    onLeaveCancelled: onAfterLeave
  };
  function onAfterLeave(el) {
    if (expandedParentClass && el._parent) {
      el._parent.classList.remove(expandedParentClass);
    }
    resetStyles(el);
  }
  function resetStyles(el) {
    const size = el._initialStyle[sizeProperty];
    el.style.overflow = el._initialStyle.overflow;
    if (size != null)
      el.style[sizeProperty] = size;
    delete el._initialStyle;
  }
}
const VDialogTransition = defineComponent({
  name: "VDialogTransition",
  props: {
    target: Object
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const functions = {
      onBeforeEnter(el) {
        el.style.pointerEvents = "none";
        el.style.visibility = "hidden";
      },
      async onEnter(el, done) {
        var _getChildren;
        await new Promise((resolve) => requestAnimationFrame(resolve));
        await new Promise((resolve) => requestAnimationFrame(resolve));
        el.style.visibility = "";
        const {
          x: x2,
          y,
          sx,
          sy,
          speed
        } = getDimensions(props.target, el);
        const animation = animate(el, [{
          transform: `translate(${x2}px, ${y}px) scale(${sx}, ${sy})`,
          opacity: 0
        }, {
          transform: ""
        }], {
          duration: 225 * speed,
          easing: deceleratedEasing
        });
        (_getChildren = getChildren(el)) == null ? void 0 : _getChildren.forEach((el2) => {
          animate(el2, [{
            opacity: 0
          }, {
            opacity: 0,
            offset: 0.33
          }, {
            opacity: 1
          }], {
            duration: 225 * 2 * speed,
            easing: standardEasing
          });
        });
        animation.finished.then(() => done());
      },
      onAfterEnter(el) {
        el.style.removeProperty("pointer-events");
      },
      onBeforeLeave(el) {
        el.style.pointerEvents = "none";
      },
      async onLeave(el, done) {
        var _getChildren2;
        await new Promise((resolve) => requestAnimationFrame(resolve));
        const {
          x: x2,
          y,
          sx,
          sy,
          speed
        } = getDimensions(props.target, el);
        const animation = animate(el, [{
          transform: ""
        }, {
          transform: `translate(${x2}px, ${y}px) scale(${sx}, ${sy})`,
          opacity: 0
        }], {
          duration: 125 * speed,
          easing: acceleratedEasing
        });
        animation.finished.then(() => done());
        (_getChildren2 = getChildren(el)) == null ? void 0 : _getChildren2.forEach((el2) => {
          animate(el2, [{}, {
            opacity: 0,
            offset: 0.2
          }, {
            opacity: 0
          }], {
            duration: 125 * 2 * speed,
            easing: standardEasing
          });
        });
      },
      onAfterLeave(el) {
        el.style.removeProperty("pointer-events");
      }
    };
    return () => {
      return props.target ? createVNode(Transition, mergeProps({
        "name": "dialog-transition"
      }, functions, {
        "css": false
      }), slots) : createVNode(Transition, {
        "name": "dialog-transition"
      }, slots);
    };
  }
});
function getChildren(el) {
  var _el$querySelector;
  const els = (_el$querySelector = el.querySelector(":scope > .v-card, :scope > .v-sheet, :scope > .v-list")) == null ? void 0 : _el$querySelector.children;
  return els && [...els];
}
function getDimensions(target, el) {
  const targetBox = target.getBoundingClientRect();
  const elBox = nullifyTransforms(el);
  const [originX, originY] = getComputedStyle(el).transformOrigin.split(" ").map((v) => parseFloat(v));
  const [anchorSide, anchorOffset] = getComputedStyle(el).getPropertyValue("--v-overlay-anchor-origin").split(" ");
  let offsetX = targetBox.left + targetBox.width / 2;
  if (anchorSide === "left" || anchorOffset === "left") {
    offsetX -= targetBox.width / 2;
  } else if (anchorSide === "right" || anchorOffset === "right") {
    offsetX += targetBox.width / 2;
  }
  let offsetY = targetBox.top + targetBox.height / 2;
  if (anchorSide === "top" || anchorOffset === "top") {
    offsetY -= targetBox.height / 2;
  } else if (anchorSide === "bottom" || anchorOffset === "bottom") {
    offsetY += targetBox.height / 2;
  }
  const tsx = targetBox.width / elBox.width;
  const tsy = targetBox.height / elBox.height;
  const maxs = Math.max(1, tsx, tsy);
  const sx = tsx / maxs || 0;
  const sy = tsy / maxs || 0;
  const asa = elBox.width * elBox.height / (window.innerWidth * window.innerHeight);
  const speed = asa > 0.12 ? Math.min(1.5, (asa - 0.12) * 10 + 1) : 1;
  return {
    x: offsetX - (originX + elBox.left),
    y: offsetY - (originY + elBox.top),
    sx,
    sy,
    speed
  };
}
const VFabTransition = createCssTransition("fab-transition", "center center", "out-in");
const VDialogBottomTransition = createCssTransition("dialog-bottom-transition");
const VDialogTopTransition = createCssTransition("dialog-top-transition");
const VFadeTransition = createCssTransition("fade-transition");
const VScaleTransition = createCssTransition("scale-transition");
const VScrollXTransition = createCssTransition("scroll-x-transition");
const VScrollXReverseTransition = createCssTransition("scroll-x-reverse-transition");
const VScrollYTransition = createCssTransition("scroll-y-transition");
const VScrollYReverseTransition = createCssTransition("scroll-y-reverse-transition");
const VSlideXTransition = createCssTransition("slide-x-transition");
const VSlideXReverseTransition = createCssTransition("slide-x-reverse-transition");
const VSlideYTransition = createCssTransition("slide-y-transition");
const VSlideYReverseTransition = createCssTransition("slide-y-reverse-transition");
const VExpandTransition = createJavascriptTransition("expand-transition", ExpandTransitionGenerator());
const VExpandXTransition = createJavascriptTransition("expand-x-transition", ExpandTransitionGenerator("", true));
const VImg$1 = "";
const VResponsive$1 = "";
const makeDimensionProps = propsFactory({
  height: [Number, String],
  maxHeight: [Number, String],
  maxWidth: [Number, String],
  minHeight: [Number, String],
  minWidth: [Number, String],
  width: [Number, String]
}, "dimension");
function useDimension(props) {
  const dimensionStyles = computed(() => ({
    height: convertToUnit(props.height),
    maxHeight: convertToUnit(props.maxHeight),
    maxWidth: convertToUnit(props.maxWidth),
    minHeight: convertToUnit(props.minHeight),
    minWidth: convertToUnit(props.minWidth),
    width: convertToUnit(props.width)
  }));
  return {
    dimensionStyles
  };
}
function useAspectStyles(props) {
  return {
    aspectStyles: computed(() => {
      const ratio = Number(props.aspectRatio);
      return ratio ? {
        paddingBottom: String(1 / ratio * 100) + "%"
      } : void 0;
    })
  };
}
const VResponsive = defineComponent({
  name: "VResponsive",
  props: {
    aspectRatio: [String, Number],
    contentClass: String,
    ...makeDimensionProps()
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      aspectStyles
    } = useAspectStyles(props);
    const {
      dimensionStyles
    } = useDimension(props);
    useRender(() => {
      var _slots$additional;
      return createVNode("div", {
        "class": "v-responsive",
        "style": dimensionStyles.value
      }, [createVNode("div", {
        "class": "v-responsive__sizer",
        "style": aspectStyles.value
      }, null), (_slots$additional = slots.additional) == null ? void 0 : _slots$additional.call(slots), slots.default && createVNode("div", {
        "class": ["v-responsive__content", props.contentClass]
      }, [slots.default()])]);
    });
    return {};
  }
});
function mounted$5(el, binding) {
  if (!SUPPORTS_INTERSECTION)
    return;
  const modifiers = binding.modifiers || {};
  const value = binding.value;
  const {
    handler,
    options
  } = typeof value === "object" ? value : {
    handler: value,
    options: {}
  };
  const observer = new IntersectionObserver(function() {
    var _el$_observe;
    let entries = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    let observer2 = arguments.length > 1 ? arguments[1] : void 0;
    const _observe = (_el$_observe = el._observe) == null ? void 0 : _el$_observe[binding.instance.$.uid];
    if (!_observe)
      return;
    const isIntersecting = entries.some((entry) => entry.isIntersecting);
    if (handler && (!modifiers.quiet || _observe.init) && (!modifiers.once || isIntersecting || _observe.init)) {
      handler(isIntersecting, entries, observer2);
    }
    if (isIntersecting && modifiers.once)
      unmounted$5(el, binding);
    else
      _observe.init = true;
  }, options);
  el._observe = Object(el._observe);
  el._observe[binding.instance.$.uid] = {
    init: false,
    observer
  };
  observer.observe(el);
}
function unmounted$5(el, binding) {
  var _el$_observe2;
  const observe = (_el$_observe2 = el._observe) == null ? void 0 : _el$_observe2[binding.instance.$.uid];
  if (!observe)
    return;
  observe.observer.unobserve(el);
  delete el._observe[binding.instance.$.uid];
}
const Intersect = {
  mounted: mounted$5,
  unmounted: unmounted$5
};
const makeTransitionProps = propsFactory({
  transition: {
    type: [Boolean, String, Object],
    default: "fade-transition",
    validator: (val) => val !== true
  }
}, "transition");
const MaybeTransition = (props, _ref) => {
  let {
    slots
  } = _ref;
  const {
    transition,
    ...rest
  } = props;
  const {
    component = Transition,
    ...customProps
  } = typeof transition === "object" ? transition : {};
  return h(component, mergeProps(typeof transition === "string" ? {
    name: transition
  } : customProps, rest), slots);
};
const VImg = defineComponent({
  name: "VImg",
  directives: {
    intersect: Intersect
  },
  props: {
    aspectRatio: [String, Number],
    alt: String,
    cover: Boolean,
    eager: Boolean,
    gradient: String,
    lazySrc: String,
    options: {
      type: Object,
      // For more information on types, navigate to:
      // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
      default: () => ({
        root: void 0,
        rootMargin: void 0,
        threshold: void 0
      })
    },
    sizes: String,
    src: {
      type: [String, Object],
      default: ""
    },
    srcset: String,
    width: [String, Number],
    ...makeTransitionProps()
  },
  emits: {
    loadstart: (event) => true,
    load: (event) => true,
    error: (event) => true
  },
  setup(props, _ref) {
    let {
      emit,
      slots
    } = _ref;
    const currentSrc = ref("");
    const image = ref();
    const state = ref(props.eager ? "loading" : "idle");
    const naturalWidth = ref();
    const naturalHeight = ref();
    const normalisedSrc = computed(() => {
      return props.src && typeof props.src === "object" ? {
        src: props.src.src,
        srcset: props.srcset || props.src.srcset,
        lazySrc: props.lazySrc || props.src.lazySrc,
        aspect: Number(props.aspectRatio || props.src.aspect || 0)
      } : {
        src: props.src,
        srcset: props.srcset,
        lazySrc: props.lazySrc,
        aspect: Number(props.aspectRatio || 0)
      };
    });
    const aspectRatio = computed(() => {
      return normalisedSrc.value.aspect || naturalWidth.value / naturalHeight.value || 0;
    });
    watch(() => props.src, () => {
      init(state.value !== "idle");
    });
    watch(aspectRatio, (val, oldVal) => {
      if (!val && oldVal && image.value) {
        pollForSize(image.value);
      }
    });
    onBeforeMount(() => init());
    function init(isIntersecting) {
      if (props.eager && isIntersecting)
        return;
      if (SUPPORTS_INTERSECTION && !isIntersecting && !props.eager)
        return;
      state.value = "loading";
      if (normalisedSrc.value.lazySrc) {
        const lazyImg = new Image();
        lazyImg.src = normalisedSrc.value.lazySrc;
        pollForSize(lazyImg, null);
      }
      if (!normalisedSrc.value.src)
        return;
      nextTick(() => {
        var _image$value, _image$value2;
        emit("loadstart", ((_image$value = image.value) == null ? void 0 : _image$value.currentSrc) || normalisedSrc.value.src);
        if ((_image$value2 = image.value) != null && _image$value2.complete) {
          if (!image.value.naturalWidth) {
            onError();
          }
          if (state.value === "error")
            return;
          if (!aspectRatio.value)
            pollForSize(image.value, null);
          onLoad();
        } else {
          if (!aspectRatio.value)
            pollForSize(image.value);
          getSrc();
        }
      });
    }
    function onLoad() {
      var _image$value3;
      getSrc();
      state.value = "loaded";
      emit("load", ((_image$value3 = image.value) == null ? void 0 : _image$value3.currentSrc) || normalisedSrc.value.src);
    }
    function onError() {
      var _image$value4;
      state.value = "error";
      emit("error", ((_image$value4 = image.value) == null ? void 0 : _image$value4.currentSrc) || normalisedSrc.value.src);
    }
    function getSrc() {
      const img = image.value;
      if (img)
        currentSrc.value = img.currentSrc || img.src;
    }
    let timer = -1;
    function pollForSize(img) {
      let timeout = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 100;
      const poll = () => {
        clearTimeout(timer);
        const {
          naturalHeight: imgHeight,
          naturalWidth: imgWidth
        } = img;
        if (imgHeight || imgWidth) {
          naturalWidth.value = imgWidth;
          naturalHeight.value = imgHeight;
        } else if (!img.complete && state.value === "loading" && timeout != null) {
          timer = window.setTimeout(poll, timeout);
        } else if (img.currentSrc.endsWith(".svg") || img.currentSrc.startsWith("data:image/svg+xml")) {
          naturalWidth.value = 1;
          naturalHeight.value = 1;
        }
      };
      poll();
    }
    const containClasses = computed(() => ({
      "v-img__img--cover": props.cover,
      "v-img__img--contain": !props.cover
    }));
    const __image = () => {
      var _slots$sources;
      if (!normalisedSrc.value.src || state.value === "idle")
        return null;
      const img = createVNode("img", {
        "class": ["v-img__img", containClasses.value],
        "src": normalisedSrc.value.src,
        "srcset": normalisedSrc.value.srcset,
        "alt": "",
        "sizes": props.sizes,
        "ref": image,
        "onLoad": onLoad,
        "onError": onError
      }, null);
      const sources = (_slots$sources = slots.sources) == null ? void 0 : _slots$sources.call(slots);
      return createVNode(MaybeTransition, {
        "transition": props.transition,
        "appear": true
      }, {
        default: () => [withDirectives(sources ? createVNode("picture", {
          "class": "v-img__picture"
        }, [sources, img]) : img, [[vShow, state.value === "loaded"]])]
      });
    };
    const __preloadImage = () => createVNode(MaybeTransition, {
      "transition": props.transition
    }, {
      default: () => [normalisedSrc.value.lazySrc && state.value !== "loaded" && createVNode("img", {
        "class": ["v-img__img", "v-img__img--preload", containClasses.value],
        "src": normalisedSrc.value.lazySrc,
        "alt": ""
      }, null)]
    });
    const __placeholder = () => {
      if (!slots.placeholder)
        return null;
      return createVNode(MaybeTransition, {
        "transition": props.transition,
        "appear": true
      }, {
        default: () => [(state.value === "loading" || state.value === "error" && !slots.error) && createVNode("div", {
          "class": "v-img__placeholder"
        }, [slots.placeholder()])]
      });
    };
    const __error = () => {
      if (!slots.error)
        return null;
      return createVNode(MaybeTransition, {
        "transition": props.transition,
        "appear": true
      }, {
        default: () => [state.value === "error" && createVNode("div", {
          "class": "v-img__error"
        }, [slots.error()])]
      });
    };
    const __gradient = () => {
      if (!props.gradient)
        return null;
      return createVNode("div", {
        "class": "v-img__gradient",
        "style": {
          backgroundImage: `linear-gradient(${props.gradient})`
        }
      }, null);
    };
    const isBooted = ref(false);
    {
      const stop = watch(aspectRatio, (val) => {
        if (val) {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              isBooted.value = true;
            });
          });
          stop();
        }
      });
    }
    useRender(() => withDirectives(createVNode(VResponsive, {
      "class": ["v-img", {
        "v-img--booting": !isBooted.value
      }],
      "style": {
        width: convertToUnit(props.width === "auto" ? naturalWidth.value : props.width)
      },
      "aspectRatio": aspectRatio.value,
      "aria-label": props.alt,
      "role": props.alt ? "img" : void 0
    }, {
      additional: () => createVNode(Fragment, null, [createVNode(__image, null, null), createVNode(__preloadImage, null, null), createVNode(__gradient, null, null), createVNode(__placeholder, null, null), createVNode(__error, null, null)]),
      default: slots.default
    }), [[resolveDirective("intersect"), {
      handler: init,
      options: props.options
    }, null, {
      once: true
    }]]));
    return {
      currentSrc,
      image,
      state,
      naturalWidth,
      naturalHeight
    };
  }
});
const makeTagProps = propsFactory({
  tag: {
    type: String,
    default: "div"
  }
}, "tag");
const VToolbarTitle = genericComponent()({
  name: "VToolbarTitle",
  props: {
    text: String,
    ...makeTagProps()
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => {
      var _slots$default;
      const hasText = !!(slots.default || slots.text || props.text);
      return createVNode(props.tag, {
        "class": "v-toolbar-title"
      }, {
        default: () => [hasText && createVNode("div", {
          "class": "v-toolbar-title__placeholder"
        }, [slots.text ? slots.text() : props.text, (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)])]
      });
    });
    return {};
  }
});
const makeBorderProps = propsFactory({
  border: [Boolean, Number, String]
}, "border");
function useBorder(props) {
  let name2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getCurrentInstanceName();
  const borderClasses = computed(() => {
    const border = isRef(props) ? props.value : props.border;
    const classes = [];
    if (border === true || border === "") {
      classes.push(`${name2}--border`);
    } else if (typeof border === "string" || border === 0) {
      for (const value of String(border).split(" ")) {
        classes.push(`border-${value}`);
      }
    }
    return classes;
  });
  return {
    borderClasses
  };
}
const makeElevationProps = propsFactory({
  elevation: {
    type: [Number, String],
    validator(v) {
      const value = parseInt(v);
      return !isNaN(value) && value >= 0 && // Material Design has a maximum elevation of 24
      // https://material.io/design/environment/elevation.html#default-elevations
      value <= 24;
    }
  }
}, "elevation");
function useElevation(props) {
  const elevationClasses = computed(() => {
    const elevation = isRef(props) ? props.value : props.elevation;
    const classes = [];
    if (elevation == null)
      return classes;
    classes.push(`elevation-${elevation}`);
    return classes;
  });
  return {
    elevationClasses
  };
}
const makeRoundedProps = propsFactory({
  rounded: {
    type: [Boolean, Number, String],
    default: void 0
  }
}, "rounded");
function useRounded(props) {
  let name2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getCurrentInstanceName();
  const roundedClasses = computed(() => {
    const rounded = isRef(props) ? props.value : props.rounded;
    const classes = [];
    if (rounded === true || rounded === "") {
      classes.push(`${name2}--rounded`);
    } else if (typeof rounded === "string" || rounded === 0) {
      for (const value of String(rounded).split(" ")) {
        classes.push(`rounded-${value}`);
      }
    }
    return classes;
  });
  return {
    roundedClasses
  };
}
function useColor(colors2) {
  return destructComputed(() => {
    const classes = [];
    const styles = {};
    if (colors2.value.background) {
      if (isCssColor(colors2.value.background)) {
        styles.backgroundColor = colors2.value.background;
      } else {
        classes.push(`bg-${colors2.value.background}`);
      }
    }
    if (colors2.value.text) {
      if (isCssColor(colors2.value.text)) {
        styles.color = colors2.value.text;
        styles.caretColor = colors2.value.text;
      } else {
        classes.push(`text-${colors2.value.text}`);
      }
    }
    return {
      colorClasses: classes,
      colorStyles: styles
    };
  });
}
function useTextColor(props, name2) {
  const colors2 = computed(() => ({
    text: isRef(props) ? props.value : name2 ? props[name2] : null
  }));
  const {
    colorClasses: textColorClasses,
    colorStyles: textColorStyles
  } = useColor(colors2);
  return {
    textColorClasses,
    textColorStyles
  };
}
function useBackgroundColor(props, name2) {
  const colors2 = computed(() => ({
    background: isRef(props) ? props.value : name2 ? props[name2] : null
  }));
  const {
    colorClasses: backgroundColorClasses,
    colorStyles: backgroundColorStyles
  } = useColor(colors2);
  return {
    backgroundColorClasses,
    backgroundColorStyles
  };
}
const allowedDensities$1 = [null, "prominent", "default", "comfortable", "compact"];
const makeVToolbarProps = propsFactory({
  absolute: Boolean,
  collapse: Boolean,
  color: String,
  density: {
    type: String,
    default: "default",
    validator: (v) => allowedDensities$1.includes(v)
  },
  extended: Boolean,
  extensionHeight: {
    type: [Number, String],
    default: 48
  },
  flat: Boolean,
  floating: Boolean,
  height: {
    type: [Number, String],
    default: 64
  },
  image: String,
  title: String,
  ...makeBorderProps(),
  ...makeElevationProps(),
  ...makeRoundedProps(),
  ...makeTagProps({
    tag: "header"
  }),
  ...makeThemeProps()
}, "v-toolbar");
const VToolbar = genericComponent()({
  name: "VToolbar",
  props: makeVToolbarProps(),
  setup(props, _ref) {
    var _slots$extension;
    let {
      slots
    } = _ref;
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(toRef(props, "color"));
    const {
      borderClasses
    } = useBorder(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      roundedClasses
    } = useRounded(props);
    const {
      themeClasses
    } = provideTheme(props);
    const isExtended = ref(!!(props.extended || (_slots$extension = slots.extension) != null && _slots$extension.call(slots)));
    const contentHeight = computed(() => parseInt(Number(props.height) + (props.density === "prominent" ? Number(props.height) : 0) - (props.density === "comfortable" ? 8 : 0) - (props.density === "compact" ? 16 : 0), 10));
    const extensionHeight = computed(() => isExtended.value ? parseInt(Number(props.extensionHeight) + (props.density === "prominent" ? Number(props.extensionHeight) : 0) - (props.density === "comfortable" ? 4 : 0) - (props.density === "compact" ? 8 : 0), 10) : 0);
    provideDefaults({
      VBtn: {
        variant: "text"
      }
    });
    useRender(() => {
      var _slots$extension2, _slots$image, _slots$prepend, _slots$default, _slots$append;
      const hasTitle = !!(props.title || slots.title);
      const hasImage = !!(slots.image || props.image);
      const extension = (_slots$extension2 = slots.extension) == null ? void 0 : _slots$extension2.call(slots);
      isExtended.value = !!(props.extended || extension);
      return createVNode(props.tag, {
        "class": ["v-toolbar", {
          "v-toolbar--absolute": props.absolute,
          "v-toolbar--collapse": props.collapse,
          "v-toolbar--flat": props.flat,
          "v-toolbar--floating": props.floating,
          [`v-toolbar--density-${props.density}`]: true
        }, backgroundColorClasses.value, borderClasses.value, elevationClasses.value, roundedClasses.value, themeClasses.value],
        "style": [backgroundColorStyles.value]
      }, {
        default: () => [hasImage && createVNode("div", {
          "key": "image",
          "class": "v-toolbar__image"
        }, [createVNode(VDefaultsProvider, {
          "defaults": {
            VImg: {
              cover: true,
              src: props.image
            }
          }
        }, {
          default: () => [slots.image ? (_slots$image = slots.image) == null ? void 0 : _slots$image.call(slots) : createVNode(VImg, null, null)]
        })]), createVNode(VDefaultsProvider, {
          "defaults": {
            VTabs: {
              height: convertToUnit(contentHeight.value)
            }
          }
        }, {
          default: () => [createVNode("div", {
            "class": "v-toolbar__content",
            "style": {
              height: convertToUnit(contentHeight.value)
            }
          }, [slots.prepend && createVNode("div", {
            "class": "v-toolbar__prepend"
          }, [(_slots$prepend = slots.prepend) == null ? void 0 : _slots$prepend.call(slots)]), hasTitle && createVNode(VToolbarTitle, {
            "key": "title",
            "text": props.title
          }, {
            text: slots.title
          }), (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots), slots.append && createVNode("div", {
            "class": "v-toolbar__append"
          }, [(_slots$append = slots.append) == null ? void 0 : _slots$append.call(slots)])])]
        }), createVNode(VDefaultsProvider, {
          "defaults": {
            VTabs: {
              height: convertToUnit(extensionHeight.value)
            }
          }
        }, {
          default: () => [createVNode(VExpandTransition, null, {
            default: () => [isExtended.value && createVNode("div", {
              "class": "v-toolbar__extension",
              "style": {
                height: convertToUnit(extensionHeight.value)
              }
            }, [extension])]
          })]
        })]
      });
    });
    return {
      contentHeight,
      extensionHeight
    };
  }
});
function filterToolbarProps(props) {
  return pick(props, Object.keys((VToolbar == null ? void 0 : VToolbar.props) ?? {}));
}
const VAppBar = genericComponent()({
  name: "VAppBar",
  props: {
    // TODO: Implement scrolling techniques
    // hideOnScroll: Boolean
    // invertedScroll: Boolean
    // collapseOnScroll: Boolean
    // elevateOnScroll: Boolean
    // shrinkOnScroll: Boolean
    // fadeImageOnScroll: Boolean
    modelValue: {
      type: Boolean,
      default: true
    },
    location: {
      type: String,
      default: "top",
      validator: (value) => ["top", "bottom"].includes(value)
    },
    ...makeVToolbarProps(),
    ...makeLayoutItemProps(),
    height: {
      type: [Number, String],
      default: 64
    }
  },
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const vToolbarRef = ref();
    const isActive = useProxiedModel(props, "modelValue");
    const height = computed(() => {
      var _vToolbarRef$value, _vToolbarRef$value2;
      const height2 = ((_vToolbarRef$value = vToolbarRef.value) == null ? void 0 : _vToolbarRef$value.contentHeight) ?? 0;
      const extensionHeight = ((_vToolbarRef$value2 = vToolbarRef.value) == null ? void 0 : _vToolbarRef$value2.extensionHeight) ?? 0;
      return height2 + extensionHeight;
    });
    const {
      layoutItemStyles
    } = useLayoutItem({
      id: props.name,
      order: computed(() => parseInt(props.order, 10)),
      position: toRef(props, "location"),
      layoutSize: height,
      elementSize: height,
      active: isActive,
      absolute: toRef(props, "absolute")
    });
    useRender(() => {
      const [toolbarProps] = filterToolbarProps(props);
      return createVNode(VToolbar, mergeProps({
        "ref": vToolbarRef,
        "class": ["v-app-bar", {
          "v-app-bar--bottom": props.location === "bottom"
        }],
        "style": {
          ...layoutItemStyles.value,
          height: void 0
        }
      }, toolbarProps), slots);
    });
    return {};
  }
});
const VBtn$1 = "";
const VBtnToggle$1 = "";
const VBtnGroup$1 = "";
const allowedDensities = [null, "default", "comfortable", "compact"];
const makeDensityProps = propsFactory({
  density: {
    type: String,
    default: "default",
    validator: (v) => allowedDensities.includes(v)
  }
}, "density");
function useDensity(props) {
  let name2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getCurrentInstanceName();
  const densityClasses = computed(() => {
    return `${name2}--density-${props.density}`;
  });
  return {
    densityClasses
  };
}
const allowedVariants$2 = ["elevated", "flat", "tonal", "outlined", "text", "plain"];
function genOverlays(isClickable, name2) {
  return createVNode(Fragment, null, [isClickable && createVNode("span", {
    "key": "overlay",
    "class": `${name2}__overlay`
  }, null), createVNode("span", {
    "key": "underlay",
    "class": `${name2}__underlay`
  }, null)]);
}
const makeVariantProps = propsFactory({
  color: String,
  variant: {
    type: String,
    default: "elevated",
    validator: (v) => allowedVariants$2.includes(v)
  }
}, "variant");
function useVariant(props) {
  let name2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getCurrentInstanceName();
  const variantClasses = computed(() => {
    const {
      variant
    } = unref(props);
    return `${name2}--variant-${variant}`;
  });
  const {
    colorClasses,
    colorStyles
  } = useColor(computed(() => {
    const {
      variant,
      color
    } = unref(props);
    return {
      [["elevated", "flat"].includes(variant) ? "background" : "text"]: color
    };
  }));
  return {
    colorClasses,
    colorStyles,
    variantClasses
  };
}
const VBtnGroup = defineComponent({
  name: "VBtnGroup",
  props: {
    divided: Boolean,
    ...makeBorderProps(),
    ...makeDensityProps(),
    ...makeElevationProps(),
    ...makeRoundedProps(),
    ...makeTagProps(),
    ...makeThemeProps(),
    ...makeVariantProps()
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      densityClasses
    } = useDensity(props);
    const {
      borderClasses
    } = useBorder(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      roundedClasses
    } = useRounded(props);
    provideDefaults({
      VBtn: {
        height: "auto",
        color: toRef(props, "color"),
        density: toRef(props, "density"),
        flat: true,
        variant: toRef(props, "variant")
      }
    });
    useRender(() => {
      return createVNode(props.tag, {
        "class": ["v-btn-group", {
          "v-btn-group--divided": props.divided
        }, themeClasses.value, borderClasses.value, densityClasses.value, elevationClasses.value, roundedClasses.value]
      }, slots);
    });
  }
});
const makeGroupProps = propsFactory({
  modelValue: {
    type: null,
    default: void 0
  },
  multiple: Boolean,
  mandatory: [Boolean, String],
  max: Number,
  selectedClass: String,
  disabled: Boolean
}, "group");
const makeGroupItemProps = propsFactory({
  value: null,
  disabled: Boolean,
  selectedClass: String
}, "group-item");
function useGroupItem(props, injectKey) {
  let required = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
  const vm = getCurrentInstance("useGroupItem");
  if (!vm) {
    throw new Error("[Vuetify] useGroupItem composable must be used inside a component setup function");
  }
  const id2 = getUid();
  provide(Symbol.for(`${injectKey.description}:id`), id2);
  const group = inject$1(injectKey, null);
  if (!group) {
    if (!required)
      return group;
    throw new Error(`[Vuetify] Could not find useGroup injection with symbol ${injectKey.description}`);
  }
  const value = toRef(props, "value");
  const disabled = computed(() => group.disabled.value || props.disabled);
  group.register({
    id: id2,
    value,
    disabled
  }, vm);
  onBeforeUnmount(() => {
    group.unregister(id2);
  });
  const isSelected = computed(() => {
    return group.isSelected(id2);
  });
  const selectedClass = computed(() => isSelected.value && [group.selectedClass.value, props.selectedClass]);
  watch(isSelected, (value2) => {
    vm.emit("group:selected", {
      value: value2
    });
  });
  return {
    id: id2,
    isSelected,
    toggle: () => group.select(id2, !isSelected.value),
    select: (value2) => group.select(id2, value2),
    selectedClass,
    value,
    disabled,
    group
  };
}
function useGroup(props, injectKey) {
  let isUnmounted = false;
  const items = reactive([]);
  const selected = useProxiedModel(props, "modelValue", [], (v) => {
    if (v == null)
      return [];
    return getIds(items, wrapInArray(v));
  }, (v) => {
    const arr = getValues(items, v);
    return props.multiple ? arr : arr[0];
  });
  const groupVm = getCurrentInstance("useGroup");
  function register(item, vm) {
    const unwrapped = item;
    const key = Symbol.for(`${injectKey.description}:id`);
    const children = findChildrenWithProvide(key, groupVm == null ? void 0 : groupVm.vnode);
    const index = children.indexOf(vm);
    if (index > -1) {
      items.splice(index, 0, unwrapped);
    } else {
      items.push(unwrapped);
    }
  }
  function unregister(id2) {
    if (isUnmounted)
      return;
    forceMandatoryValue();
    const index = items.findIndex((item) => item.id === id2);
    items.splice(index, 1);
  }
  function forceMandatoryValue() {
    const item = items.find((item2) => !item2.disabled);
    if (item && props.mandatory === "force" && !selected.value.length) {
      selected.value = [item.id];
    }
  }
  onMounted(() => {
    forceMandatoryValue();
  });
  onBeforeUnmount(() => {
    isUnmounted = true;
  });
  function select(id2, value) {
    const item = items.find((item2) => item2.id === id2);
    if (value && item != null && item.disabled)
      return;
    if (props.multiple) {
      const internalValue = selected.value.slice();
      const index = internalValue.findIndex((v) => v === id2);
      const isSelected = ~index;
      value = value ?? !isSelected;
      if (isSelected && props.mandatory && internalValue.length <= 1)
        return;
      if (!isSelected && props.max != null && internalValue.length + 1 > props.max)
        return;
      if (index < 0 && value)
        internalValue.push(id2);
      else if (index >= 0 && !value)
        internalValue.splice(index, 1);
      selected.value = internalValue;
    } else {
      const isSelected = selected.value.includes(id2);
      if (props.mandatory && isSelected)
        return;
      selected.value = value ?? !isSelected ? [id2] : [];
    }
  }
  function step(offset) {
    if (props.multiple)
      consoleWarn('This method is not supported when using "multiple" prop');
    if (!selected.value.length) {
      const item = items.find((item2) => !item2.disabled);
      item && (selected.value = [item.id]);
    } else {
      const currentId = selected.value[0];
      const currentIndex = items.findIndex((i2) => i2.id === currentId);
      let newIndex = (currentIndex + offset) % items.length;
      let newItem = items[newIndex];
      while (newItem.disabled && newIndex !== currentIndex) {
        newIndex = (newIndex + offset) % items.length;
        newItem = items[newIndex];
      }
      if (newItem.disabled)
        return;
      selected.value = [items[newIndex].id];
    }
  }
  const state = {
    register,
    unregister,
    selected,
    select,
    disabled: toRef(props, "disabled"),
    prev: () => step(items.length - 1),
    next: () => step(1),
    isSelected: (id2) => selected.value.includes(id2),
    selectedClass: computed(() => props.selectedClass),
    items: computed(() => items),
    getItemIndex: (value) => getItemIndex(items, value)
  };
  provide(injectKey, state);
  return state;
}
function getItemIndex(items, value) {
  const ids = getIds(items, [value]);
  if (!ids.length)
    return -1;
  return items.findIndex((item) => item.id === ids[0]);
}
function getIds(items, modelValue) {
  const ids = [];
  for (let i2 = 0; i2 < items.length; i2++) {
    const item = items[i2];
    if (item.value != null) {
      if (modelValue.find((value) => deepEqual(value, item.value)) != null) {
        ids.push(item.id);
      }
    } else if (modelValue.includes(i2)) {
      ids.push(item.id);
    }
  }
  return ids;
}
function getValues(items, ids) {
  const values = [];
  for (let i2 = 0; i2 < items.length; i2++) {
    const item = items[i2];
    if (ids.includes(item.id)) {
      values.push(item.value != null ? item.value : i2);
    }
  }
  return values;
}
const VBtnToggleSymbol = Symbol.for("vuetify:v-btn-toggle");
const VBtnToggle = genericComponent()({
  name: "VBtnToggle",
  props: makeGroupProps(),
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      isSelected,
      next,
      prev,
      select,
      selected
    } = useGroup(props, VBtnToggleSymbol);
    useRender(() => {
      var _slots$default;
      return createVNode(VBtnGroup, {
        "class": "v-btn-toggle"
      }, {
        default: () => [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, {
          isSelected,
          next,
          prev,
          select,
          selected
        })]
      });
    });
    return {
      next,
      prev,
      select
    };
  }
});
const VIcon$1 = "";
const predefinedSizes = ["x-small", "small", "default", "large", "x-large"];
const makeSizeProps = propsFactory({
  size: {
    type: [String, Number],
    default: "default"
  }
}, "size");
function useSize(props) {
  let name2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getCurrentInstanceName();
  return destructComputed(() => {
    let sizeClasses;
    let sizeStyles;
    if (includes(predefinedSizes, props.size)) {
      sizeClasses = `${name2}--size-${props.size}`;
    } else if (props.size) {
      sizeStyles = {
        width: convertToUnit(props.size),
        height: convertToUnit(props.size)
      };
    }
    return {
      sizeClasses,
      sizeStyles
    };
  });
}
const makeVIconProps = propsFactory({
  color: String,
  start: Boolean,
  end: Boolean,
  icon: IconValue,
  ...makeSizeProps(),
  ...makeTagProps({
    tag: "i"
  }),
  ...makeThemeProps()
}, "v-icon");
const VIcon = defineComponent({
  name: "VIcon",
  props: makeVIconProps(),
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    let slotIcon;
    if (slots.default) {
      slotIcon = computed(() => {
        var _slots$default, _slot$filter$;
        const slot = (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots);
        if (!slot)
          return;
        return (_slot$filter$ = slot.filter((node) => node.type === Text && node.children && typeof node.children === "string")[0]) == null ? void 0 : _slot$filter$.children;
      });
    }
    const {
      themeClasses
    } = provideTheme(props);
    const {
      iconData
    } = useIcon(slotIcon || props);
    const {
      sizeClasses
    } = useSize(props);
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(toRef(props, "color"));
    useRender(() => {
      var _slots$default2;
      return createVNode(iconData.value.component, {
        "tag": props.tag,
        "icon": iconData.value.icon,
        "class": ["v-icon", "notranslate", themeClasses.value, sizeClasses.value, textColorClasses.value, {
          "v-icon--clickable": !!attrs.onClick,
          "v-icon--start": props.start,
          "v-icon--end": props.end
        }],
        "style": [!sizeClasses.value ? {
          fontSize: convertToUnit(props.size),
          height: convertToUnit(props.size),
          width: convertToUnit(props.size)
        } : void 0, textColorStyles.value],
        "role": attrs.onClick ? "button" : void 0,
        "aria-hidden": !attrs.onClick
      }, {
        default: () => [(_slots$default2 = slots.default) == null ? void 0 : _slots$default2.call(slots)]
      });
    });
    return {};
  }
});
const VProgressCircular$1 = "";
function useIntersectionObserver(callback) {
  const intersectionRef = ref();
  const isIntersecting = ref(false);
  if (SUPPORTS_INTERSECTION) {
    const observer = new IntersectionObserver((entries) => {
      callback == null ? void 0 : callback(entries, observer);
      isIntersecting.value = !!entries.find((entry) => entry.isIntersecting);
    });
    onBeforeUnmount(() => {
      observer.disconnect();
    });
    watch(intersectionRef, (newValue, oldValue) => {
      if (oldValue) {
        observer.unobserve(oldValue);
        isIntersecting.value = false;
      }
      if (newValue)
        observer.observe(newValue);
    }, {
      flush: "post"
    });
  }
  return {
    intersectionRef,
    isIntersecting
  };
}
const VProgressCircular = defineComponent({
  name: "VProgressCircular",
  props: {
    bgColor: String,
    color: String,
    indeterminate: [Boolean, String],
    modelValue: {
      type: [Number, String],
      default: 0
    },
    rotate: {
      type: [Number, String],
      default: 0
    },
    width: {
      type: [Number, String],
      default: 4
    },
    ...makeSizeProps(),
    ...makeTagProps({
      tag: "div"
    }),
    ...makeThemeProps()
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const MAGIC_RADIUS_CONSTANT = 20;
    const CIRCUMFERENCE = 2 * Math.PI * MAGIC_RADIUS_CONSTANT;
    const root = ref();
    const {
      themeClasses
    } = provideTheme(props);
    const {
      sizeClasses,
      sizeStyles
    } = useSize(props);
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(toRef(props, "color"));
    const {
      textColorClasses: underlayColorClasses,
      textColorStyles: underlayColorStyles
    } = useTextColor(toRef(props, "bgColor"));
    const {
      intersectionRef,
      isIntersecting
    } = useIntersectionObserver();
    const {
      resizeRef,
      contentRect
    } = useResizeObserver();
    const normalizedValue = computed(() => Math.max(0, Math.min(100, parseFloat(props.modelValue))));
    const width = computed(() => Number(props.width));
    const size = computed(() => {
      return sizeStyles.value ? Number(props.size) : contentRect.value ? contentRect.value.width : Math.max(width.value, 32);
    });
    const diameter = computed(() => MAGIC_RADIUS_CONSTANT / (1 - width.value / size.value) * 2);
    const strokeWidth = computed(() => width.value / size.value * diameter.value);
    const strokeDashOffset = computed(() => convertToUnit((100 - normalizedValue.value) / 100 * CIRCUMFERENCE));
    watchEffect(() => {
      intersectionRef.value = root.value;
      resizeRef.value = root.value;
    });
    useRender(() => createVNode(props.tag, {
      "ref": root,
      "class": ["v-progress-circular", {
        "v-progress-circular--indeterminate": !!props.indeterminate,
        "v-progress-circular--visible": isIntersecting.value,
        "v-progress-circular--disable-shrink": props.indeterminate === "disable-shrink"
      }, themeClasses.value, sizeClasses.value, textColorClasses.value],
      "style": [sizeStyles.value, textColorStyles.value],
      "role": "progressbar",
      "aria-valuemin": "0",
      "aria-valuemax": "100",
      "aria-valuenow": props.indeterminate ? void 0 : normalizedValue.value
    }, {
      default: () => [createVNode("svg", {
        "style": {
          transform: `rotate(calc(-90deg + ${Number(props.rotate)}deg))`
        },
        "xmlns": "http://www.w3.org/2000/svg",
        "viewBox": `0 0 ${diameter.value} ${diameter.value}`
      }, [createVNode("circle", {
        "class": ["v-progress-circular__underlay", underlayColorClasses.value],
        "style": underlayColorStyles.value,
        "fill": "transparent",
        "cx": "50%",
        "cy": "50%",
        "r": MAGIC_RADIUS_CONSTANT,
        "stroke-width": strokeWidth.value,
        "stroke-dasharray": CIRCUMFERENCE,
        "stroke-dashoffset": 0
      }, null), createVNode("circle", {
        "class": "v-progress-circular__overlay",
        "fill": "transparent",
        "cx": "50%",
        "cy": "50%",
        "r": MAGIC_RADIUS_CONSTANT,
        "stroke-width": strokeWidth.value,
        "stroke-dasharray": CIRCUMFERENCE,
        "stroke-dashoffset": strokeDashOffset.value
      }, null)]), slots.default && createVNode("div", {
        "class": "v-progress-circular__content"
      }, [slots.default({
        value: normalizedValue.value
      })])]
    }));
    return {};
  }
});
const VRipple = "";
const stopSymbol = Symbol("rippleStop");
const DELAY_RIPPLE = 80;
function transform$1(el, value) {
  el.style.transform = value;
  el.style.webkitTransform = value;
}
function opacity(el, value) {
  el.style.opacity = `calc(${value} * var(--v-theme-overlay-multiplier))`;
}
function isTouchEvent(e2) {
  return e2.constructor.name === "TouchEvent";
}
function isKeyboardEvent(e2) {
  return e2.constructor.name === "KeyboardEvent";
}
const calculate = function(e2, el) {
  var _el$_ripple;
  let value = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  let localX = 0;
  let localY = 0;
  if (!isKeyboardEvent(e2)) {
    const offset = el.getBoundingClientRect();
    const target = isTouchEvent(e2) ? e2.touches[e2.touches.length - 1] : e2;
    localX = target.clientX - offset.left;
    localY = target.clientY - offset.top;
  }
  let radius = 0;
  let scale = 0.3;
  if ((_el$_ripple = el._ripple) != null && _el$_ripple.circle) {
    scale = 0.15;
    radius = el.clientWidth / 2;
    radius = value.center ? radius : radius + Math.sqrt((localX - radius) ** 2 + (localY - radius) ** 2) / 4;
  } else {
    radius = Math.sqrt(el.clientWidth ** 2 + el.clientHeight ** 2) / 2;
  }
  const centerX = `${(el.clientWidth - radius * 2) / 2}px`;
  const centerY = `${(el.clientHeight - radius * 2) / 2}px`;
  const x2 = value.center ? centerX : `${localX - radius}px`;
  const y = value.center ? centerY : `${localY - radius}px`;
  return {
    radius,
    scale,
    x: x2,
    y,
    centerX,
    centerY
  };
};
const ripples = {
  /* eslint-disable max-statements */
  show(e2, el) {
    var _el$_ripple2;
    let value = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    if (!(el != null && (_el$_ripple2 = el._ripple) != null && _el$_ripple2.enabled)) {
      return;
    }
    const container = document.createElement("span");
    const animation = document.createElement("span");
    container.appendChild(animation);
    container.className = "v-ripple__container";
    if (value.class) {
      container.className += ` ${value.class}`;
    }
    const {
      radius,
      scale,
      x: x2,
      y,
      centerX,
      centerY
    } = calculate(e2, el, value);
    const size = `${radius * 2}px`;
    animation.className = "v-ripple__animation";
    animation.style.width = size;
    animation.style.height = size;
    el.appendChild(container);
    const computed2 = window.getComputedStyle(el);
    if (computed2 && computed2.position === "static") {
      el.style.position = "relative";
      el.dataset.previousPosition = "static";
    }
    animation.classList.add("v-ripple__animation--enter");
    animation.classList.add("v-ripple__animation--visible");
    transform$1(animation, `translate(${x2}, ${y}) scale3d(${scale},${scale},${scale})`);
    opacity(animation, 0);
    animation.dataset.activated = String(performance.now());
    setTimeout(() => {
      animation.classList.remove("v-ripple__animation--enter");
      animation.classList.add("v-ripple__animation--in");
      transform$1(animation, `translate(${centerX}, ${centerY}) scale3d(1,1,1)`);
      opacity(animation, 0.08);
    }, 0);
  },
  hide(el) {
    var _el$_ripple3;
    if (!(el != null && (_el$_ripple3 = el._ripple) != null && _el$_ripple3.enabled))
      return;
    const ripples2 = el.getElementsByClassName("v-ripple__animation");
    if (ripples2.length === 0)
      return;
    const animation = ripples2[ripples2.length - 1];
    if (animation.dataset.isHiding)
      return;
    else
      animation.dataset.isHiding = "true";
    const diff = performance.now() - Number(animation.dataset.activated);
    const delay = Math.max(250 - diff, 0);
    setTimeout(() => {
      animation.classList.remove("v-ripple__animation--in");
      animation.classList.add("v-ripple__animation--out");
      opacity(animation, 0);
      setTimeout(() => {
        const ripples3 = el.getElementsByClassName("v-ripple__animation");
        if (ripples3.length === 1 && el.dataset.previousPosition) {
          el.style.position = el.dataset.previousPosition;
          delete el.dataset.previousPosition;
        }
        animation.parentNode && el.removeChild(animation.parentNode);
      }, 300);
    }, delay);
  }
};
function isRippleEnabled(value) {
  return typeof value === "undefined" || !!value;
}
function rippleShow(e2) {
  const value = {};
  const element = e2.currentTarget;
  if (!(element != null && element._ripple) || element._ripple.touched || e2[stopSymbol])
    return;
  e2[stopSymbol] = true;
  if (isTouchEvent(e2)) {
    element._ripple.touched = true;
    element._ripple.isTouch = true;
  } else {
    if (element._ripple.isTouch)
      return;
  }
  value.center = element._ripple.centered || isKeyboardEvent(e2);
  if (element._ripple.class) {
    value.class = element._ripple.class;
  }
  if (isTouchEvent(e2)) {
    if (element._ripple.showTimerCommit)
      return;
    element._ripple.showTimerCommit = () => {
      ripples.show(e2, element, value);
    };
    element._ripple.showTimer = window.setTimeout(() => {
      var _element$_ripple;
      if (element != null && (_element$_ripple = element._ripple) != null && _element$_ripple.showTimerCommit) {
        element._ripple.showTimerCommit();
        element._ripple.showTimerCommit = null;
      }
    }, DELAY_RIPPLE);
  } else {
    ripples.show(e2, element, value);
  }
}
function rippleStop(e2) {
  e2[stopSymbol] = true;
}
function rippleHide(e2) {
  const element = e2.currentTarget;
  if (!element || !element._ripple)
    return;
  window.clearTimeout(element._ripple.showTimer);
  if (e2.type === "touchend" && element._ripple.showTimerCommit) {
    element._ripple.showTimerCommit();
    element._ripple.showTimerCommit = null;
    element._ripple.showTimer = window.setTimeout(() => {
      rippleHide(e2);
    });
    return;
  }
  window.setTimeout(() => {
    if (element._ripple) {
      element._ripple.touched = false;
    }
  });
  ripples.hide(element);
}
function rippleCancelShow(e2) {
  const element = e2.currentTarget;
  if (!element || !element._ripple)
    return;
  if (element._ripple.showTimerCommit) {
    element._ripple.showTimerCommit = null;
  }
  window.clearTimeout(element._ripple.showTimer);
}
let keyboardRipple = false;
function keyboardRippleShow(e2) {
  if (!keyboardRipple && (e2.keyCode === keyCodes.enter || e2.keyCode === keyCodes.space)) {
    keyboardRipple = true;
    rippleShow(e2);
  }
}
function keyboardRippleHide(e2) {
  keyboardRipple = false;
  rippleHide(e2);
}
function focusRippleHide(e2) {
  if (keyboardRipple) {
    keyboardRipple = false;
    rippleHide(e2);
  }
}
function updateRipple(el, binding, wasEnabled) {
  const {
    value,
    modifiers
  } = binding;
  const enabled = isRippleEnabled(value);
  if (!enabled) {
    ripples.hide(el);
  }
  el._ripple = el._ripple ?? {};
  el._ripple.enabled = enabled;
  el._ripple.centered = modifiers.center;
  el._ripple.circle = modifiers.circle;
  if (isObject$9(value) && value.class) {
    el._ripple.class = value.class;
  }
  if (enabled && !wasEnabled) {
    if (modifiers.stop) {
      el.addEventListener("touchstart", rippleStop, {
        passive: true
      });
      el.addEventListener("mousedown", rippleStop);
      return;
    }
    el.addEventListener("touchstart", rippleShow, {
      passive: true
    });
    el.addEventListener("touchend", rippleHide, {
      passive: true
    });
    el.addEventListener("touchmove", rippleCancelShow, {
      passive: true
    });
    el.addEventListener("touchcancel", rippleHide);
    el.addEventListener("mousedown", rippleShow);
    el.addEventListener("mouseup", rippleHide);
    el.addEventListener("mouseleave", rippleHide);
    el.addEventListener("keydown", keyboardRippleShow);
    el.addEventListener("keyup", keyboardRippleHide);
    el.addEventListener("blur", focusRippleHide);
    el.addEventListener("dragstart", rippleHide, {
      passive: true
    });
  } else if (!enabled && wasEnabled) {
    removeListeners(el);
  }
}
function removeListeners(el) {
  el.removeEventListener("mousedown", rippleShow);
  el.removeEventListener("touchstart", rippleShow);
  el.removeEventListener("touchend", rippleHide);
  el.removeEventListener("touchmove", rippleCancelShow);
  el.removeEventListener("touchcancel", rippleHide);
  el.removeEventListener("mouseup", rippleHide);
  el.removeEventListener("mouseleave", rippleHide);
  el.removeEventListener("keydown", keyboardRippleShow);
  el.removeEventListener("keyup", keyboardRippleHide);
  el.removeEventListener("dragstart", rippleHide);
  el.removeEventListener("blur", focusRippleHide);
}
function mounted$4(el, binding) {
  updateRipple(el, binding, false);
}
function unmounted$4(el) {
  delete el._ripple;
  removeListeners(el);
}
function updated$1(el, binding) {
  if (binding.value === binding.oldValue) {
    return;
  }
  const wasEnabled = isRippleEnabled(binding.oldValue);
  updateRipple(el, binding, wasEnabled);
}
const Ripple = {
  mounted: mounted$4,
  unmounted: unmounted$4,
  updated: updated$1
};
const VProgressLinear$1 = "";
const VProgressLinear = defineComponent({
  name: "VProgressLinear",
  props: {
    active: {
      type: Boolean,
      default: true
    },
    bgColor: String,
    bgOpacity: [Number, String],
    bufferValue: {
      type: [Number, String],
      default: 0
    },
    clickable: Boolean,
    color: String,
    height: {
      type: [Number, String],
      default: 4
    },
    indeterminate: Boolean,
    max: {
      type: [Number, String],
      default: 100
    },
    modelValue: {
      type: [Number, String],
      default: 0
    },
    reverse: Boolean,
    stream: Boolean,
    striped: Boolean,
    roundedBar: Boolean,
    ...makeRoundedProps(),
    ...makeTagProps(),
    ...makeThemeProps()
  },
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const progress = useProxiedModel(props, "modelValue");
    const {
      isRtl
    } = useRtl();
    const {
      themeClasses
    } = provideTheme(props);
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(props, "color");
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(computed(() => props.bgColor || props.color));
    const {
      backgroundColorClasses: barColorClasses,
      backgroundColorStyles: barColorStyles
    } = useBackgroundColor(props, "color");
    const {
      roundedClasses
    } = useRounded(props);
    const {
      intersectionRef,
      isIntersecting
    } = useIntersectionObserver();
    const max2 = computed(() => parseInt(props.max, 10));
    const height = computed(() => parseInt(props.height, 10));
    const normalizedBuffer = computed(() => parseFloat(props.bufferValue) / max2.value * 100);
    const normalizedValue = computed(() => parseFloat(progress.value) / max2.value * 100);
    const isReversed = computed(() => isRtl.value !== props.reverse);
    const transition = computed(() => props.indeterminate ? "fade-transition" : "slide-x-transition");
    const opacity2 = computed(() => {
      return props.bgOpacity == null ? props.bgOpacity : parseFloat(props.bgOpacity);
    });
    function handleClick(e2) {
      if (!intersectionRef.value)
        return;
      const {
        left,
        right,
        width
      } = intersectionRef.value.getBoundingClientRect();
      const value = isReversed.value ? width - e2.clientX + (right - width) : e2.clientX - left;
      progress.value = Math.round(value / width * max2.value);
    }
    useRender(() => createVNode(props.tag, {
      "ref": intersectionRef,
      "class": ["v-progress-linear", {
        "v-progress-linear--active": props.active && isIntersecting.value,
        "v-progress-linear--reverse": isReversed.value,
        "v-progress-linear--rounded": props.rounded,
        "v-progress-linear--rounded-bar": props.roundedBar,
        "v-progress-linear--striped": props.striped
      }, roundedClasses.value, themeClasses.value],
      "style": {
        height: props.active ? convertToUnit(height.value) : 0,
        "--v-progress-linear-height": convertToUnit(height.value)
      },
      "role": "progressbar",
      "aria-hidden": props.active ? "false" : "true",
      "aria-valuemin": "0",
      "aria-valuemax": props.max,
      "aria-valuenow": props.indeterminate ? void 0 : normalizedValue.value,
      "onClick": props.clickable && handleClick
    }, {
      default: () => [props.stream && createVNode("div", {
        "key": "stream",
        "class": ["v-progress-linear__stream", textColorClasses.value],
        "style": {
          ...textColorStyles.value,
          [isReversed.value ? "left" : "right"]: convertToUnit(-height.value),
          borderTop: `${convertToUnit(height.value / 2)} dotted`,
          opacity: opacity2.value,
          top: `calc(50% - ${convertToUnit(height.value / 4)})`,
          width: convertToUnit(100 - normalizedBuffer.value, "%"),
          "--v-progress-linear-stream-to": convertToUnit(height.value * (isReversed.value ? 1 : -1))
        }
      }, null), createVNode("div", {
        "class": ["v-progress-linear__background", backgroundColorClasses.value],
        "style": [backgroundColorStyles.value, {
          opacity: opacity2.value,
          width: convertToUnit(!props.stream ? 100 : normalizedBuffer.value, "%")
        }]
      }, null), createVNode(Transition, {
        "name": transition.value
      }, {
        default: () => [!props.indeterminate ? createVNode("div", {
          "class": ["v-progress-linear__determinate", barColorClasses.value],
          "style": [barColorStyles.value, {
            width: convertToUnit(normalizedValue.value, "%")
          }]
        }, null) : createVNode("div", {
          "class": "v-progress-linear__indeterminate"
        }, [["long", "short"].map((bar) => createVNode("div", {
          "key": bar,
          "class": ["v-progress-linear__indeterminate", bar, barColorClasses.value],
          "style": barColorStyles.value
        }, null))])]
      }), slots.default && createVNode("div", {
        "class": "v-progress-linear__content"
      }, [slots.default({
        value: normalizedValue.value,
        buffer: normalizedBuffer.value
      })])]
    }));
    return {};
  }
});
const makeLoaderProps = propsFactory({
  loading: [Boolean, String]
}, "loader");
function useLoader(props) {
  let name2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getCurrentInstanceName();
  const loaderClasses = computed(() => ({
    [`${name2}--loading`]: props.loading
  }));
  return {
    loaderClasses
  };
}
function LoaderSlot(props, _ref) {
  var _slots$default;
  let {
    slots
  } = _ref;
  return createVNode("div", {
    "class": `${props.name}__loader`
  }, [((_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, {
    color: props.color,
    isActive: props.active
  })) || createVNode(VProgressLinear, {
    "active": props.active,
    "color": props.color,
    "height": "2",
    "indeterminate": true
  }, null)]);
}
const oppositeMap = {
  center: "center",
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left"
};
const makeLocationProps = propsFactory({
  location: String
}, "location");
function useLocation(props) {
  let opposite = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
  let offset = arguments.length > 2 ? arguments[2] : void 0;
  const {
    isRtl
  } = useRtl();
  const locationStyles = computed(() => {
    if (!props.location)
      return {};
    const {
      side,
      align
    } = parseAnchor(props.location.split(" ").length > 1 ? props.location : `${props.location} center`, isRtl.value);
    function getOffset2(side2) {
      return offset ? offset(side2) : 0;
    }
    const styles = {};
    if (side !== "center") {
      if (opposite)
        styles[oppositeMap[side]] = `calc(100% - ${getOffset2(side)}px)`;
      else
        styles[side] = 0;
    }
    if (align !== "center") {
      if (opposite)
        styles[oppositeMap[align]] = `calc(100% - ${getOffset2(align)}px)`;
      else
        styles[align] = 0;
    } else {
      if (side === "center")
        styles.top = styles.left = "50%";
      else {
        styles[{
          top: "left",
          bottom: "left",
          left: "top",
          right: "top"
        }[side]] = "50%";
      }
      styles.transform = {
        top: "translateX(-50%)",
        bottom: "translateX(-50%)",
        left: "translateY(-50%)",
        right: "translateY(-50%)",
        center: "translate(-50%, -50%)"
      }[side];
    }
    return styles;
  });
  return {
    locationStyles
  };
}
const positionValues = ["static", "relative", "fixed", "absolute", "sticky"];
const makePositionProps = propsFactory({
  position: {
    type: String,
    validator: (
      /* istanbul ignore next */
      (v) => positionValues.includes(v)
    )
  }
}, "position");
function usePosition(props) {
  let name2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getCurrentInstanceName();
  const positionClasses = computed(() => {
    return props.position ? `${name2}--${props.position}` : void 0;
  });
  return {
    positionClasses
  };
}
function useRouter() {
  var _getCurrentInstance, _getCurrentInstance$p;
  return (_getCurrentInstance = getCurrentInstance("useRouter")) == null ? void 0 : (_getCurrentInstance$p = _getCurrentInstance.proxy) == null ? void 0 : _getCurrentInstance$p.$router;
}
function useLink(props, attrs) {
  const RouterLink2 = resolveDynamicComponent("RouterLink");
  const isLink = computed(() => !!(props.href || props.to));
  const isClickable = computed(() => {
    return (isLink == null ? void 0 : isLink.value) || hasEvent(attrs, "click") || hasEvent(props, "click");
  });
  if (typeof RouterLink2 === "string") {
    return {
      isLink,
      isClickable,
      href: toRef(props, "href")
    };
  }
  const link = props.to ? RouterLink2.useLink(props) : void 0;
  return {
    isLink,
    isClickable,
    route: link == null ? void 0 : link.route,
    navigate: link == null ? void 0 : link.navigate,
    isActive: link && computed(() => {
      var _link$isExactActive, _link$isActive;
      return props.exact ? (_link$isExactActive = link.isExactActive) == null ? void 0 : _link$isExactActive.value : (_link$isActive = link.isActive) == null ? void 0 : _link$isActive.value;
    }),
    href: computed(() => props.to ? link == null ? void 0 : link.route.value.href : props.href)
  };
}
const makeRouterProps = propsFactory({
  href: String,
  replace: Boolean,
  to: [String, Object],
  exact: Boolean
}, "router");
let inTransition = false;
function useBackButton(router2, cb) {
  let popped = false;
  let removeBefore;
  let removeAfter;
  if (IN_BROWSER) {
    nextTick(() => {
      window.addEventListener("popstate", onPopstate);
      removeBefore = router2 == null ? void 0 : router2.beforeEach((to, from, next) => {
        if (!inTransition) {
          setTimeout(() => popped ? cb(next) : next());
        } else {
          popped ? cb(next) : next();
        }
        inTransition = true;
      });
      removeAfter = router2 == null ? void 0 : router2.afterEach(() => {
        inTransition = false;
      });
    });
    onScopeDispose(() => {
      var _removeBefore, _removeAfter;
      window.removeEventListener("popstate", onPopstate);
      (_removeBefore = removeBefore) == null ? void 0 : _removeBefore();
      (_removeAfter = removeAfter) == null ? void 0 : _removeAfter();
    });
  }
  function onPopstate(e2) {
    var _e$state;
    if ((_e$state = e2.state) != null && _e$state.replaced)
      return;
    popped = true;
    setTimeout(() => popped = false);
  }
}
function useSelectLink(link, select) {
  watch(() => {
    var _link$isActive;
    return (_link$isActive = link.isActive) == null ? void 0 : _link$isActive.value;
  }, (isActive) => {
    if (link.isLink.value && isActive && select) {
      nextTick(() => {
        select(true);
      });
    }
  }, {
    immediate: true
  });
}
const VBtn = defineComponent({
  name: "VBtn",
  directives: {
    Ripple
  },
  props: {
    active: {
      type: Boolean,
      default: void 0
    },
    symbol: {
      type: null,
      default: VBtnToggleSymbol
    },
    flat: Boolean,
    icon: [Boolean, String, Function, Object],
    prependIcon: IconValue,
    appendIcon: IconValue,
    block: Boolean,
    stacked: Boolean,
    ripple: {
      type: Boolean,
      default: true
    },
    ...makeBorderProps(),
    ...makeRoundedProps(),
    ...makeDensityProps(),
    ...makeDimensionProps(),
    ...makeElevationProps(),
    ...makeGroupItemProps(),
    ...makeLoaderProps(),
    ...makeLocationProps(),
    ...makePositionProps(),
    ...makeRouterProps(),
    ...makeSizeProps(),
    ...makeTagProps({
      tag: "button"
    }),
    ...makeThemeProps(),
    ...makeVariantProps({
      variant: "elevated"
    })
  },
  emits: {
    "group:selected": (val) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      borderClasses
    } = useBorder(props);
    const {
      colorClasses,
      colorStyles,
      variantClasses
    } = useVariant(props);
    const {
      densityClasses
    } = useDensity(props);
    const {
      dimensionStyles
    } = useDimension(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      loaderClasses
    } = useLoader(props);
    const {
      locationStyles
    } = useLocation(props);
    const {
      positionClasses
    } = usePosition(props);
    const {
      roundedClasses
    } = useRounded(props);
    const {
      sizeClasses,
      sizeStyles
    } = useSize(props);
    const group = useGroupItem(props, props.symbol, false);
    const link = useLink(props, attrs);
    const isActive = computed(() => {
      var _link$isActive;
      return props.active !== false && (props.active || ((_link$isActive = link.isActive) == null ? void 0 : _link$isActive.value) || (group == null ? void 0 : group.isSelected.value));
    });
    const isDisabled = computed(() => (group == null ? void 0 : group.disabled.value) || props.disabled);
    const isElevated = computed(() => {
      return props.variant === "elevated" && !(props.disabled || props.flat || props.border);
    });
    useSelectLink(link, group == null ? void 0 : group.select);
    useRender(() => {
      var _slots$prepend, _slots$default, _slots$append, _slots$loader;
      const Tag = link.isLink.value ? "a" : props.tag;
      const hasColor = !group || group.isSelected.value;
      const hasPrepend = !!(props.prependIcon || slots.prepend);
      const hasAppend = !!(props.appendIcon || slots.append);
      const hasIcon = !!(props.icon && props.icon !== true);
      return withDirectives(createVNode(Tag, {
        "type": Tag === "a" ? void 0 : "button",
        "class": ["v-btn", group == null ? void 0 : group.selectedClass.value, {
          "v-btn--active": isActive.value,
          "v-btn--block": props.block,
          "v-btn--disabled": isDisabled.value,
          "v-btn--elevated": isElevated.value,
          "v-btn--flat": props.flat,
          "v-btn--icon": !!props.icon,
          "v-btn--loading": props.loading,
          "v-btn--stacked": props.stacked
        }, themeClasses.value, borderClasses.value, hasColor ? colorClasses.value : void 0, densityClasses.value, elevationClasses.value, loaderClasses.value, positionClasses.value, roundedClasses.value, sizeClasses.value, variantClasses.value],
        "style": [hasColor ? colorStyles.value : void 0, dimensionStyles.value, locationStyles.value, sizeStyles.value],
        "disabled": isDisabled.value || void 0,
        "href": link.href.value,
        "onClick": (e2) => {
          var _link$navigate;
          if (isDisabled.value)
            return;
          (_link$navigate = link.navigate) == null ? void 0 : _link$navigate.call(link, e2);
          group == null ? void 0 : group.toggle();
        }
      }, {
        default: () => [genOverlays(true, "v-btn"), !props.icon && hasPrepend && createVNode(VDefaultsProvider, {
          "key": "prepend",
          "defaults": {
            VIcon: {
              icon: props.prependIcon
            }
          }
        }, {
          default: () => [createVNode("span", {
            "class": "v-btn__prepend"
          }, [((_slots$prepend = slots.prepend) == null ? void 0 : _slots$prepend.call(slots)) ?? createVNode(VIcon, null, null)])]
        }), createVNode("span", {
          "class": "v-btn__content",
          "data-no-activator": ""
        }, [createVNode(VDefaultsProvider, {
          "key": "content",
          "defaults": {
            VIcon: {
              icon: hasIcon ? props.icon : void 0
            }
          }
        }, {
          default: () => [((_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)) ?? (hasIcon && createVNode(VIcon, {
            "key": "icon"
          }, null))]
        })]), !props.icon && hasAppend && createVNode(VDefaultsProvider, {
          "key": "append",
          "defaults": {
            VIcon: {
              icon: props.appendIcon
            }
          }
        }, {
          default: () => [createVNode("span", {
            "class": "v-btn__append"
          }, [((_slots$append = slots.append) == null ? void 0 : _slots$append.call(slots)) ?? createVNode(VIcon, null, null)])]
        }), !!props.loading && createVNode("span", {
          "key": "loader",
          "class": "v-btn__loader"
        }, [((_slots$loader = slots.loader) == null ? void 0 : _slots$loader.call(slots)) ?? createVNode(VProgressCircular, {
          "color": typeof props.loading === "boolean" ? void 0 : props.loading,
          "indeterminate": true,
          "size": "23",
          "width": "2"
        }, null)])]
      }), [[resolveDirective("ripple"), !isDisabled.value && props.ripple, null]]);
    });
    return {};
  }
});
const VAppBarNavIcon = defineComponent({
  name: "VAppBarNavIcon",
  props: {
    icon: {
      type: IconValue,
      default: "$menu"
    }
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => createVNode(VBtn, {
      "class": "v-app-bar-nav-icon",
      "icon": props.icon
    }, slots));
    return {};
  }
});
const VToolbarItems = defineComponent({
  name: "VToolbarItems",
  props: makeVariantProps({
    variant: "text"
  }),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    provideDefaults({
      VBtn: {
        color: toRef(props, "color"),
        height: "inherit",
        variant: toRef(props, "variant")
      }
    });
    useRender(() => {
      var _slots$default;
      return createVNode("div", {
        "class": "v-toolbar-items"
      }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)]);
    });
    return {};
  }
});
const VAppBarTitle = defineComponent({
  name: "VAppBarTitle",
  props: {
    ...VToolbarTitle.props
  },
  setup(_2, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => createVNode(VToolbarTitle, {
      "class": "v-app-bar-title"
    }, slots));
    return {};
  }
});
const VAlert$1 = "";
const VAlertTitle = createSimpleFunctional("v-alert-title");
const allowedTypes = ["success", "info", "warning", "error"];
const VAlert = defineComponent({
  name: "VAlert",
  props: {
    border: {
      type: [Boolean, String],
      validator: (val) => {
        return typeof val === "boolean" || ["top", "end", "bottom", "start"].includes(val);
      }
    },
    borderColor: String,
    closable: Boolean,
    closeIcon: {
      type: IconValue,
      default: "$close"
    },
    closeLabel: {
      type: String,
      default: "$vuetify.close"
    },
    icon: {
      type: [Boolean, String, Function, Object],
      default: null
    },
    modelValue: {
      type: Boolean,
      default: true
    },
    prominent: Boolean,
    title: String,
    text: String,
    type: {
      type: String,
      validator: (val) => allowedTypes.includes(val)
    },
    ...makeDensityProps(),
    ...makeDimensionProps(),
    ...makeElevationProps(),
    ...makeLocationProps(),
    ...makePositionProps(),
    ...makeRoundedProps(),
    ...makeTagProps(),
    ...makeThemeProps(),
    ...makeVariantProps({
      variant: "flat"
    })
  },
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const isActive = useProxiedModel(props, "modelValue");
    const icon = computed(() => {
      if (props.icon === false)
        return void 0;
      if (!props.type)
        return props.icon;
      return props.icon ?? `$${props.type}`;
    });
    const variantProps = computed(() => ({
      color: props.color ?? props.type,
      variant: props.variant
    }));
    const {
      themeClasses
    } = provideTheme(props);
    const {
      colorClasses,
      colorStyles,
      variantClasses
    } = useVariant(variantProps);
    const {
      densityClasses
    } = useDensity(props);
    const {
      dimensionStyles
    } = useDimension(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      locationStyles
    } = useLocation(props);
    const {
      positionClasses
    } = usePosition(props);
    const {
      roundedClasses
    } = useRounded(props);
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(toRef(props, "borderColor"));
    const {
      t: t2
    } = useLocale();
    const closeProps = computed(() => ({
      "aria-label": t2(props.closeLabel),
      onClick(e2) {
        isActive.value = false;
      }
    }));
    return () => {
      var _slots$default, _slots$close;
      const hasPrepend = !!(slots.prepend || icon.value);
      const hasTitle = !!(slots.title || props.title);
      const hasText = !!(props.text || slots.text);
      const hasClose = !!(slots.close || props.closable);
      return isActive.value && createVNode(props.tag, {
        "class": ["v-alert", props.border && {
          "v-alert--border": !!props.border,
          [`v-alert--border-${props.border === true ? "start" : props.border}`]: true
        }, {
          "v-alert--prominent": props.prominent
        }, themeClasses.value, colorClasses.value, densityClasses.value, elevationClasses.value, positionClasses.value, roundedClasses.value, variantClasses.value],
        "style": [colorStyles.value, dimensionStyles.value, locationStyles.value],
        "role": "alert"
      }, {
        default: () => [genOverlays(false, "v-alert"), props.border && createVNode("div", {
          "key": "border",
          "class": ["v-alert__border", textColorClasses.value],
          "style": textColorStyles.value
        }, null), hasPrepend && createVNode(VDefaultsProvider, {
          "key": "prepend",
          "defaults": {
            VIcon: {
              density: props.density,
              icon: icon.value,
              size: props.prominent ? 44 : 28
            }
          }
        }, {
          default: () => [createVNode("div", {
            "class": "v-alert__prepend"
          }, [slots.prepend ? slots.prepend() : icon.value && createVNode(VIcon, null, null)])]
        }), createVNode("div", {
          "class": "v-alert__content"
        }, [hasTitle && createVNode(VAlertTitle, {
          "key": "title"
        }, {
          default: () => [slots.title ? slots.title() : props.title]
        }), hasText && (slots.text ? slots.text() : props.text), (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)]), slots.append && createVNode("div", {
          "key": "append",
          "class": "v-alert__append"
        }, [slots.append()]), hasClose && createVNode(VDefaultsProvider, {
          "key": "close",
          "defaults": {
            VBtn: {
              icon: props.closeIcon,
              size: "x-small",
              variant: "text"
            }
          }
        }, {
          default: () => [createVNode("div", {
            "class": "v-alert__close"
          }, [((_slots$close = slots.close) == null ? void 0 : _slots$close.call(slots, {
            props: closeProps.value
          })) ?? createVNode(VBtn, closeProps.value, null)])]
        })]
      });
    };
  }
});
const VAutocomplete$1 = "";
const VSelect$1 = "";
const VTextField$1 = "";
const VField$1 = "";
function useInputIcon(props) {
  const {
    t: t2
  } = useLocale();
  function InputIcon(_ref) {
    let {
      name: name2
    } = _ref;
    const localeKey = {
      prepend: "prependAction",
      prependInner: "prependAction",
      append: "appendAction",
      appendInner: "appendAction",
      clear: "clear"
    }[name2];
    const listener = props[`onClick:${name2}`];
    const label = listener && localeKey ? t2(`$vuetify.input.${localeKey}`, props.label ?? "") : void 0;
    return createVNode(VIcon, {
      "icon": props[`${name2}Icon`],
      "aria-label": label,
      "onClick": listener
    }, null);
  }
  return {
    InputIcon
  };
}
const VLabel$1 = "";
const VLabel = defineComponent({
  name: "VLabel",
  props: {
    text: String,
    clickable: Boolean,
    ...makeThemeProps()
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => {
      var _slots$default;
      return createVNode("label", {
        "class": ["v-label", {
          "v-label--clickable": props.clickable
        }]
      }, [props.text, (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)]);
    });
    return {};
  }
});
const VFieldLabel = defineComponent({
  name: "VFieldLabel",
  props: {
    floating: Boolean
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => createVNode(VLabel, {
      "class": ["v-field-label", {
        "v-field-label--floating": props.floating
      }],
      "aria-hidden": props.floating || void 0
    }, slots));
    return {};
  }
});
const makeFocusProps = propsFactory({
  focused: Boolean
}, "focus");
function useFocus(props) {
  let name2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getCurrentInstanceName();
  const isFocused = useProxiedModel(props, "focused");
  const focusClasses = computed(() => {
    return {
      [`${name2}--focused`]: isFocused.value
    };
  });
  function focus() {
    isFocused.value = true;
  }
  function blur() {
    isFocused.value = false;
  }
  return {
    focusClasses,
    isFocused,
    focus,
    blur
  };
}
const allowedVariants$1 = ["underlined", "outlined", "filled", "solo", "plain"];
const makeVFieldProps = propsFactory({
  appendInnerIcon: IconValue,
  bgColor: String,
  clearable: Boolean,
  clearIcon: {
    type: IconValue,
    default: "$clear"
  },
  active: Boolean,
  color: String,
  dirty: Boolean,
  disabled: Boolean,
  error: Boolean,
  label: String,
  persistentClear: Boolean,
  prependInnerIcon: IconValue,
  reverse: Boolean,
  singleLine: Boolean,
  variant: {
    type: String,
    default: "filled",
    validator: (v) => allowedVariants$1.includes(v)
  },
  "onClick:clear": EventProp,
  "onClick:appendInner": EventProp,
  "onClick:prependInner": EventProp,
  ...makeThemeProps(),
  ...makeLoaderProps()
}, "v-field");
const VField = genericComponent()({
  name: "VField",
  inheritAttrs: false,
  props: {
    id: String,
    ...makeFocusProps(),
    ...makeVFieldProps()
  },
  emits: {
    "click:control": (e2) => true,
    "update:focused": (focused) => true,
    "update:modelValue": (val) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      emit,
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      loaderClasses
    } = useLoader(props);
    const {
      focusClasses,
      isFocused,
      focus,
      blur
    } = useFocus(props);
    const {
      InputIcon
    } = useInputIcon(props);
    const isActive = computed(() => props.dirty || props.active);
    const hasLabel = computed(() => !props.singleLine && !!(props.label || slots.label));
    const uid2 = getUid();
    const id2 = computed(() => props.id || `input-${uid2}`);
    const labelRef = ref();
    const floatingLabelRef = ref();
    const controlRef = ref();
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(toRef(props, "bgColor"));
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(computed(() => {
      return isActive.value && isFocused.value && !props.error && !props.disabled ? props.color : void 0;
    }));
    watch(isActive, (val) => {
      if (hasLabel.value) {
        const el = labelRef.value.$el;
        const targetEl = floatingLabelRef.value.$el;
        const rect = nullifyTransforms(el);
        const targetRect = targetEl.getBoundingClientRect();
        const x2 = targetRect.x - rect.x;
        const y = targetRect.y - rect.y - (rect.height / 2 - targetRect.height / 2);
        const targetWidth = targetRect.width / 0.75;
        const width = Math.abs(targetWidth - rect.width) > 1 ? {
          maxWidth: convertToUnit(targetWidth)
        } : void 0;
        const style = getComputedStyle(el);
        const targetStyle = getComputedStyle(targetEl);
        const duration = parseFloat(style.transitionDuration) * 1e3 || 150;
        const scale = parseFloat(targetStyle.getPropertyValue("--v-field-label-scale"));
        const color = targetStyle.getPropertyValue("color");
        el.style.visibility = "visible";
        targetEl.style.visibility = "hidden";
        animate(el, {
          transform: `translate(${x2}px, ${y}px) scale(${scale})`,
          color,
          ...width
        }, {
          duration,
          easing: standardEasing,
          direction: val ? "normal" : "reverse"
        }).finished.then(() => {
          el.style.removeProperty("visibility");
          targetEl.style.removeProperty("visibility");
        });
      }
    }, {
      flush: "post"
    });
    const slotProps = computed(() => ({
      isActive,
      isFocused,
      controlRef,
      blur,
      focus
    }));
    function onClick(e2) {
      if (e2.target !== document.activeElement) {
        e2.preventDefault();
      }
      emit("click:control", e2);
    }
    useRender(() => {
      var _slots$prependInner, _slots$default, _slots$appendInner;
      const isOutlined = props.variant === "outlined";
      const hasPrepend = slots["prepend-inner"] || props.prependInnerIcon;
      const hasClear = !!(props.clearable || slots.clear);
      const hasAppend = !!(slots["append-inner"] || props.appendInnerIcon || hasClear);
      const label = slots.label ? slots.label({
        label: props.label,
        props: {
          for: id2.value
        }
      }) : props.label;
      return createVNode("div", mergeProps({
        "class": ["v-field", {
          "v-field--active": isActive.value,
          "v-field--appended": hasAppend,
          "v-field--disabled": props.disabled,
          "v-field--dirty": props.dirty,
          "v-field--error": props.error,
          "v-field--has-background": !!props.bgColor,
          "v-field--persistent-clear": props.persistentClear,
          "v-field--prepended": hasPrepend,
          "v-field--reverse": props.reverse,
          "v-field--single-line": props.singleLine,
          "v-field--no-label": !label,
          [`v-field--variant-${props.variant}`]: true
        }, themeClasses.value, backgroundColorClasses.value, focusClasses.value, loaderClasses.value],
        "style": [backgroundColorStyles.value, textColorStyles.value],
        "onClick": onClick
      }, attrs), [createVNode("div", {
        "class": "v-field__overlay"
      }, null), createVNode(LoaderSlot, {
        "name": "v-field",
        "active": !!props.loading,
        "color": props.error ? "error" : props.color
      }, {
        default: slots.loader
      }), hasPrepend && createVNode("div", {
        "key": "prepend",
        "class": "v-field__prepend-inner"
      }, [props.prependInnerIcon && createVNode(InputIcon, {
        "key": "prepend-icon",
        "name": "prependInner"
      }, null), (_slots$prependInner = slots["prepend-inner"]) == null ? void 0 : _slots$prependInner.call(slots, slotProps.value)]), createVNode("div", {
        "class": "v-field__field",
        "data-no-activator": ""
      }, [["solo", "filled"].includes(props.variant) && hasLabel.value && createVNode(VFieldLabel, {
        "key": "floating-label",
        "ref": floatingLabelRef,
        "class": [textColorClasses.value],
        "floating": true,
        "for": id2.value
      }, {
        default: () => [label]
      }), createVNode(VFieldLabel, {
        "ref": labelRef,
        "for": id2.value
      }, {
        default: () => [label]
      }), (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, {
        ...slotProps.value,
        props: {
          id: id2.value,
          class: "v-field__input"
        },
        focus,
        blur
      })]), hasClear && createVNode(VExpandXTransition, {
        "key": "clear"
      }, {
        default: () => [withDirectives(createVNode("div", {
          "class": "v-field__clearable"
        }, [slots.clear ? slots.clear() : createVNode(InputIcon, {
          "name": "clear"
        }, null)]), [[vShow, props.dirty]])]
      }), hasAppend && createVNode("div", {
        "key": "append",
        "class": "v-field__append-inner"
      }, [(_slots$appendInner = slots["append-inner"]) == null ? void 0 : _slots$appendInner.call(slots, slotProps.value), props.appendInnerIcon && createVNode(InputIcon, {
        "key": "append-icon",
        "name": "appendInner"
      }, null)]), createVNode("div", {
        "class": ["v-field__outline", textColorClasses.value]
      }, [isOutlined && createVNode(Fragment, null, [createVNode("div", {
        "class": "v-field__outline__start"
      }, null), hasLabel.value && createVNode("div", {
        "class": "v-field__outline__notch"
      }, [createVNode(VFieldLabel, {
        "ref": floatingLabelRef,
        "floating": true,
        "for": id2.value
      }, {
        default: () => [label]
      })]), createVNode("div", {
        "class": "v-field__outline__end"
      }, null)]), ["plain", "underlined"].includes(props.variant) && hasLabel.value && createVNode(VFieldLabel, {
        "ref": floatingLabelRef,
        "floating": true,
        "for": id2.value
      }, {
        default: () => [label]
      })])]);
    });
    return {
      controlRef
    };
  }
});
function filterFieldProps(attrs) {
  const keys3 = Object.keys(VField.props).filter((k2) => !isOn(k2));
  return pick(attrs, keys3);
}
const VInput$1 = "";
const VMessages$1 = "";
const VMessages = defineComponent({
  name: "VMessages",
  props: {
    active: Boolean,
    color: String,
    messages: {
      type: [Array, String],
      default: () => []
    },
    ...makeTransitionProps({
      transition: {
        component: VSlideYTransition,
        leaveAbsolute: true,
        group: true
      }
    })
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const messages = computed(() => wrapInArray(props.messages));
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(computed(() => props.color));
    useRender(() => createVNode(MaybeTransition, {
      "transition": props.transition,
      "tag": "div",
      "class": ["v-messages", textColorClasses.value],
      "style": textColorStyles.value
    }, {
      default: () => [props.active && messages.value.map((message2, i2) => createVNode("div", {
        "class": "v-messages__message",
        "key": `${i2}-${messages.value}`
      }, [slots.message ? slots.message({
        message: message2
      }) : message2]))]
    }));
    return {};
  }
});
const FormKey = Symbol.for("vuetify:form");
const makeFormProps = propsFactory({
  disabled: Boolean,
  fastFail: Boolean,
  lazyValidation: Boolean,
  readonly: Boolean,
  modelValue: {
    type: Boolean,
    default: null
  },
  validateOn: {
    type: String,
    default: "input"
  }
}, "form");
function createForm(props) {
  const model = useProxiedModel(props, "modelValue");
  const isDisabled = computed(() => props.disabled);
  const isReadonly = computed(() => props.readonly);
  const isValidating = ref(false);
  const items = ref([]);
  const errors = ref([]);
  async function validate() {
    const results = [];
    let valid = true;
    errors.value = [];
    isValidating.value = true;
    for (const item of items.value) {
      const itemErrorMessages = await item.validate();
      if (itemErrorMessages.length > 0) {
        valid = false;
        results.push({
          id: item.id,
          errorMessages: itemErrorMessages
        });
      }
      if (!valid && props.fastFail)
        break;
    }
    errors.value = results;
    isValidating.value = false;
    return {
      valid,
      errors: errors.value
    };
  }
  function reset() {
    items.value.forEach((item) => item.reset());
    model.value = null;
  }
  function resetValidation() {
    items.value.forEach((item) => item.resetValidation());
    errors.value = [];
    model.value = null;
  }
  watch(items, () => {
    let valid = 0;
    let invalid = 0;
    const results = [];
    for (const item of items.value) {
      if (item.isValid === false) {
        invalid++;
        results.push({
          id: item.id,
          errorMessages: item.errorMessages
        });
      } else if (item.isValid === true)
        valid++;
    }
    errors.value = results;
    model.value = invalid > 0 ? false : valid === items.value.length ? true : null;
  }, {
    deep: true
  });
  provide(FormKey, {
    register: (_ref) => {
      let {
        id: id2,
        validate: validate2,
        reset: reset2,
        resetValidation: resetValidation2
      } = _ref;
      if (items.value.some((item) => item.id === id2)) {
        consoleWarn(`Duplicate input name "${id2}"`);
      }
      items.value.push({
        id: id2,
        validate: validate2,
        reset: reset2,
        resetValidation: resetValidation2,
        isValid: null,
        errorMessages: []
      });
    },
    unregister: (id2) => {
      items.value = items.value.filter((item) => {
        return item.id !== id2;
      });
    },
    update: (id2, isValid, errorMessages) => {
      const found = items.value.find((item) => item.id === id2);
      if (!found)
        return;
      found.isValid = isValid;
      found.errorMessages = errorMessages;
    },
    isDisabled,
    isReadonly,
    isValidating,
    items,
    validateOn: toRef(props, "validateOn")
  });
  return {
    errors,
    isDisabled,
    isReadonly,
    isValidating,
    items,
    validate,
    reset,
    resetValidation
  };
}
function useForm() {
  return inject$1(FormKey, null);
}
const makeValidationProps = propsFactory({
  disabled: Boolean,
  error: Boolean,
  errorMessages: {
    type: [Array, String],
    default: () => []
  },
  maxErrors: {
    type: [Number, String],
    default: 1
  },
  name: String,
  label: String,
  readonly: Boolean,
  rules: {
    type: Array,
    default: () => []
  },
  modelValue: null,
  validateOn: String,
  validationValue: null,
  ...makeFocusProps()
}, "validation");
function useValidation(props) {
  let name2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getCurrentInstanceName();
  let id2 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : getUid();
  const model = useProxiedModel(props, "modelValue");
  const validationModel = computed(() => props.validationValue === void 0 ? model.value : props.validationValue);
  const form = useForm();
  const internalErrorMessages = ref([]);
  const isPristine = ref(true);
  const isDirty = computed(() => !!(wrapInArray(model.value === "" ? null : model.value).length || wrapInArray(validationModel.value === "" ? null : validationModel.value).length));
  const isDisabled = computed(() => !!(props.disabled || form != null && form.isDisabled.value));
  const isReadonly = computed(() => !!(props.readonly || form != null && form.isReadonly.value));
  const errorMessages = computed(() => {
    return props.errorMessages.length ? wrapInArray(props.errorMessages).slice(0, Math.max(0, +props.maxErrors)) : internalErrorMessages.value;
  });
  const isValid = computed(() => {
    if (props.error || errorMessages.value.length)
      return false;
    if (!props.rules.length)
      return true;
    return isPristine.value ? null : true;
  });
  const isValidating = ref(false);
  const validationClasses = computed(() => {
    return {
      [`${name2}--error`]: isValid.value === false,
      [`${name2}--dirty`]: isDirty.value,
      [`${name2}--disabled`]: isDisabled.value,
      [`${name2}--readonly`]: isReadonly.value
    };
  });
  const uid2 = computed(() => props.name ?? unref(id2));
  onBeforeMount(() => {
    form == null ? void 0 : form.register({
      id: uid2.value,
      validate,
      reset,
      resetValidation
    });
  });
  onBeforeUnmount(() => {
    form == null ? void 0 : form.unregister(uid2.value);
  });
  const validateOn = computed(() => props.validateOn || (form == null ? void 0 : form.validateOn.value) || "input");
  onMounted(() => form == null ? void 0 : form.update(uid2.value, isValid.value, errorMessages.value));
  useToggleScope(() => validateOn.value === "input", () => {
    watch(validationModel, () => {
      if (validationModel.value != null) {
        validate();
      } else if (props.focused) {
        const unwatch = watch(() => props.focused, (val) => {
          if (!val)
            validate();
          unwatch();
        });
      }
    });
  });
  useToggleScope(() => validateOn.value === "blur", () => {
    watch(() => props.focused, (val) => {
      if (!val)
        validate();
    });
  });
  watch(isValid, () => {
    form == null ? void 0 : form.update(uid2.value, isValid.value, errorMessages.value);
  });
  function reset() {
    resetValidation();
    model.value = null;
  }
  function resetValidation() {
    isPristine.value = true;
    internalErrorMessages.value = [];
  }
  async function validate() {
    const results = [];
    isValidating.value = true;
    for (const rule of props.rules) {
      if (results.length >= (props.maxErrors ?? 1)) {
        break;
      }
      const handler = typeof rule === "function" ? rule : () => rule;
      const result = await handler(validationModel.value);
      if (result === true)
        continue;
      if (typeof result !== "string") {
        console.warn(`${result} is not a valid value. Rule functions must return boolean true or a string.`);
        continue;
      }
      results.push(result);
    }
    internalErrorMessages.value = results;
    isValidating.value = false;
    isPristine.value = false;
    return internalErrorMessages.value;
  }
  return {
    errorMessages,
    isDirty,
    isDisabled,
    isReadonly,
    isPristine,
    isValid,
    isValidating,
    reset,
    resetValidation,
    validate,
    validationClasses
  };
}
const makeVInputProps = propsFactory({
  id: String,
  appendIcon: IconValue,
  prependIcon: IconValue,
  hideDetails: [Boolean, String],
  messages: {
    type: [Array, String],
    default: () => []
  },
  direction: {
    type: String,
    default: "horizontal",
    validator: (v) => ["horizontal", "vertical"].includes(v)
  },
  "onClick:prepend": EventProp,
  "onClick:append": EventProp,
  ...makeDensityProps(),
  ...makeValidationProps()
}, "v-input");
const VInput = genericComponent()({
  name: "VInput",
  props: {
    ...makeVInputProps()
  },
  emits: {
    "update:modelValue": (val) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      slots,
      emit
    } = _ref;
    const {
      densityClasses
    } = useDensity(props);
    const {
      InputIcon
    } = useInputIcon(props);
    const uid2 = getUid();
    const id2 = computed(() => props.id || `input-${uid2}`);
    const {
      errorMessages,
      isDirty,
      isDisabled,
      isReadonly,
      isPristine,
      isValid,
      isValidating,
      reset,
      resetValidation,
      validate,
      validationClasses
    } = useValidation(props, "v-input", id2);
    const slotProps = computed(() => ({
      id: id2,
      isDirty,
      isDisabled,
      isReadonly,
      isPristine,
      isValid,
      isValidating,
      reset,
      resetValidation,
      validate
    }));
    useRender(() => {
      var _props$messages, _slots$prepend, _slots$default, _slots$append, _slots$details;
      const hasPrepend = !!(slots.prepend || props.prependIcon);
      const hasAppend = !!(slots.append || props.appendIcon);
      const hasMessages = !!((_props$messages = props.messages) != null && _props$messages.length || errorMessages.value.length);
      const hasDetails = !props.hideDetails || props.hideDetails === "auto" && (hasMessages || !!slots.details);
      return createVNode("div", {
        "class": ["v-input", `v-input--${props.direction}`, densityClasses.value, validationClasses.value]
      }, [hasPrepend && createVNode("div", {
        "key": "prepend",
        "class": "v-input__prepend"
      }, [(_slots$prepend = slots.prepend) == null ? void 0 : _slots$prepend.call(slots, slotProps.value), props.prependIcon && createVNode(InputIcon, {
        "key": "prepend-icon",
        "name": "prepend"
      }, null)]), slots.default && createVNode("div", {
        "class": "v-input__control"
      }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, slotProps.value)]), hasAppend && createVNode("div", {
        "key": "append",
        "class": "v-input__append"
      }, [props.appendIcon && createVNode(InputIcon, {
        "key": "append-icon",
        "name": "append"
      }, null), (_slots$append = slots.append) == null ? void 0 : _slots$append.call(slots, slotProps.value)]), hasDetails && createVNode("div", {
        "class": "v-input__details"
      }, [createVNode(VMessages, {
        "active": hasMessages,
        "messages": errorMessages.value.length > 0 ? errorMessages.value : props.messages
      }, {
        message: slots.message
      }), (_slots$details = slots.details) == null ? void 0 : _slots$details.call(slots, slotProps.value)])]);
    });
    return {
      reset,
      resetValidation,
      validate
    };
  }
});
function filterInputProps(props) {
  const keys3 = Object.keys(VInput.props).filter((k2) => !isOn(k2));
  return pick(props, keys3);
}
const VCounter$1 = "";
const VCounter = defineComponent({
  name: "VCounter",
  functional: true,
  props: {
    active: Boolean,
    max: [Number, String],
    value: {
      type: [Number, String],
      default: 0
    },
    ...makeTransitionProps({
      transition: {
        component: VSlideYTransition
      }
    })
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const counter = computed(() => {
      return props.max ? `${props.value} / ${props.max}` : String(props.value);
    });
    useRender(() => createVNode(MaybeTransition, {
      "transition": props.transition
    }, {
      default: () => [withDirectives(createVNode("div", {
        "class": "v-counter"
      }, [slots.default ? slots.default({
        counter: counter.value,
        max: props.max,
        value: props.value
      }) : counter.value]), [[vShow, props.active]])]
    }));
    return {};
  }
});
const Refs = Symbol("Forwarded refs");
function forwardRefs(target) {
  for (var _len = arguments.length, refs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    refs[_key - 1] = arguments[_key];
  }
  target[Refs] = refs;
  return new Proxy(target, {
    get(target2, key) {
      if (Reflect.has(target2, key)) {
        return Reflect.get(target2, key);
      }
      for (const ref2 of refs) {
        if (ref2.value && Reflect.has(ref2.value, key)) {
          const val = Reflect.get(ref2.value, key);
          return typeof val === "function" ? val.bind(ref2.value) : val;
        }
      }
    },
    getOwnPropertyDescriptor(target2, key) {
      const descriptor = Reflect.getOwnPropertyDescriptor(target2, key);
      if (descriptor)
        return descriptor;
      if (typeof key === "symbol" || key.startsWith("__"))
        return;
      for (const ref2 of refs) {
        if (!ref2.value)
          continue;
        const descriptor2 = Reflect.getOwnPropertyDescriptor(ref2.value, key);
        if (descriptor2)
          return descriptor2;
        if ("_" in ref2.value && "setupState" in ref2.value._) {
          const descriptor3 = Reflect.getOwnPropertyDescriptor(ref2.value._.setupState, key);
          if (descriptor3)
            return descriptor3;
        }
      }
      for (const ref2 of refs) {
        let obj = ref2.value && Object.getPrototypeOf(ref2.value);
        while (obj) {
          const descriptor2 = Reflect.getOwnPropertyDescriptor(obj, key);
          if (descriptor2)
            return descriptor2;
          obj = Object.getPrototypeOf(obj);
        }
      }
      for (const ref2 of refs) {
        const childRefs = ref2.value && ref2.value[Refs];
        if (!childRefs)
          continue;
        const queue = childRefs.slice();
        while (queue.length) {
          const ref3 = queue.shift();
          const descriptor2 = Reflect.getOwnPropertyDescriptor(ref3.value, key);
          if (descriptor2)
            return descriptor2;
          const childRefs2 = ref3.value && ref3.value[Refs];
          if (childRefs2)
            queue.push(...childRefs2);
        }
      }
      return void 0;
    }
  });
}
const activeTypes = ["color", "file", "time", "date", "datetime-local", "week", "month"];
const makeVTextFieldProps = propsFactory({
  autofocus: Boolean,
  counter: [Boolean, Number, String],
  counterValue: Function,
  hint: String,
  persistentHint: Boolean,
  prefix: String,
  placeholder: String,
  persistentPlaceholder: Boolean,
  persistentCounter: Boolean,
  suffix: String,
  type: {
    type: String,
    default: "text"
  },
  ...makeVInputProps(),
  ...makeVFieldProps()
}, "v-text-field");
const VTextField = genericComponent()({
  name: "VTextField",
  directives: {
    Intersect
  },
  inheritAttrs: false,
  props: makeVTextFieldProps(),
  emits: {
    "click:control": (e2) => true,
    "click:input": (e2) => true,
    "update:focused": (focused) => true,
    "update:modelValue": (val) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      emit,
      slots
    } = _ref;
    const model = useProxiedModel(props, "modelValue");
    const {
      isFocused,
      focus,
      blur
    } = useFocus(props);
    const counterValue = computed(() => {
      return typeof props.counterValue === "function" ? props.counterValue(model.value) : (model.value ?? "").toString().length;
    });
    const max2 = computed(() => {
      if (attrs.maxlength)
        return attrs.maxlength;
      if (!props.counter || typeof props.counter !== "number" && typeof props.counter !== "string")
        return void 0;
      return props.counter;
    });
    function onIntersect(isIntersecting, entries) {
      var _entries$0$target, _entries$0$target$foc;
      if (!props.autofocus || !isIntersecting)
        return;
      (_entries$0$target = entries[0].target) == null ? void 0 : (_entries$0$target$foc = _entries$0$target.focus) == null ? void 0 : _entries$0$target$foc.call(_entries$0$target);
    }
    const vInputRef = ref();
    const vFieldRef = ref();
    const inputRef = ref();
    const isActive = computed(() => activeTypes.includes(props.type) || props.persistentPlaceholder || isFocused.value);
    const messages = computed(() => {
      return props.messages.length ? props.messages : isFocused.value || props.persistentHint ? props.hint : "";
    });
    function onFocus() {
      if (inputRef.value !== document.activeElement) {
        var _inputRef$value;
        (_inputRef$value = inputRef.value) == null ? void 0 : _inputRef$value.focus();
      }
      if (!isFocused.value)
        focus();
    }
    function onControlClick(e2) {
      onFocus();
      emit("click:control", e2);
    }
    function onClear(e2) {
      e2.stopPropagation();
      onFocus();
      nextTick(() => {
        model.value = null;
        callEvent(props["onClick:clear"], e2);
      });
    }
    function onInput(e2) {
      model.value = e2.target.value;
    }
    useRender(() => {
      const hasCounter = !!(slots.counter || props.counter || props.counterValue);
      const hasDetails = !!(hasCounter || slots.details);
      const [rootAttrs, inputAttrs] = filterInputAttrs(attrs);
      const [{
        modelValue: _2,
        ...inputProps
      }] = filterInputProps(props);
      const [fieldProps] = filterFieldProps(props);
      return createVNode(VInput, mergeProps({
        "ref": vInputRef,
        "modelValue": model.value,
        "onUpdate:modelValue": ($event) => model.value = $event,
        "class": ["v-text-field", {
          "v-text-field--prefixed": props.prefix,
          "v-text-field--suffixed": props.suffix,
          "v-text-field--flush-details": ["plain", "underlined"].includes(props.variant)
        }],
        "onClick:prepend": props["onClick:prepend"],
        "onClick:append": props["onClick:append"]
      }, rootAttrs, inputProps, {
        "focused": isFocused.value,
        "messages": messages.value
      }), {
        ...slots,
        default: (_ref2) => {
          let {
            id: id2,
            isDisabled,
            isDirty,
            isReadonly,
            isValid
          } = _ref2;
          return createVNode(VField, mergeProps({
            "ref": vFieldRef,
            "onMousedown": (e2) => {
              if (e2.target === inputRef.value)
                return;
              e2.preventDefault();
            },
            "onClick:control": onControlClick,
            "onClick:clear": onClear,
            "onClick:prependInner": props["onClick:prependInner"],
            "onClick:appendInner": props["onClick:appendInner"],
            "role": "textbox"
          }, fieldProps, {
            "id": id2.value,
            "active": isActive.value || isDirty.value,
            "dirty": isDirty.value || props.dirty,
            "focused": isFocused.value,
            "error": isValid.value === false
          }), {
            ...slots,
            default: (_ref3) => {
              let {
                props: {
                  class: fieldClass,
                  ...slotProps
                }
              } = _ref3;
              const inputNode = withDirectives(createVNode("input", mergeProps({
                "ref": inputRef,
                "value": model.value,
                "onInput": onInput,
                "autofocus": props.autofocus,
                "readonly": isReadonly.value,
                "disabled": isDisabled.value,
                "name": props.name,
                "placeholder": props.placeholder,
                "size": 1,
                "type": props.type,
                "onFocus": onFocus,
                "onBlur": blur
              }, slotProps, inputAttrs), null), [[resolveDirective("intersect"), {
                handler: onIntersect
              }, null, {
                once: true
              }]]);
              return createVNode(Fragment, null, [props.prefix && createVNode("span", {
                "class": "v-text-field__prefix"
              }, [props.prefix]), slots.default ? createVNode("div", {
                "class": fieldClass,
                "onClick": (e2) => emit("click:input", e2),
                "data-no-activator": ""
              }, [slots.default(), inputNode]) : cloneVNode(inputNode, {
                class: fieldClass
              }), props.suffix && createVNode("span", {
                "class": "v-text-field__suffix"
              }, [props.suffix])]);
            }
          });
        },
        details: hasDetails ? (slotProps) => {
          var _slots$details;
          return createVNode(Fragment, null, [(_slots$details = slots.details) == null ? void 0 : _slots$details.call(slots, slotProps), hasCounter && createVNode(Fragment, null, [createVNode("span", null, null), createVNode(VCounter, {
            "active": props.persistentCounter || isFocused.value,
            "value": counterValue.value,
            "max": max2.value
          }, slots.counter)])]);
        } : void 0
      });
    });
    return forwardRefs({}, vInputRef, vFieldRef, inputRef);
  }
});
function filterVTextFieldProps(props) {
  return pick(props, Object.keys(VTextField.props));
}
const VCheckbox$1 = "";
const VSelectionControl$1 = "";
const VSelectionControlGroup$1 = "";
const VSelectionControlGroupSymbol = Symbol.for("vuetify:selection-control-group");
const makeSelectionControlGroupProps = propsFactory({
  color: String,
  disabled: Boolean,
  error: Boolean,
  id: String,
  inline: Boolean,
  falseIcon: IconValue,
  trueIcon: IconValue,
  ripple: {
    type: Boolean,
    default: true
  },
  multiple: {
    type: Boolean,
    default: null
  },
  name: String,
  readonly: Boolean,
  modelValue: null,
  type: String,
  valueComparator: {
    type: Function,
    default: deepEqual
  },
  ...makeThemeProps(),
  ...makeDensityProps()
}, "v-selection-control-group");
const VSelectionControlGroup = defineComponent({
  name: "VSelectionControlGroup",
  props: {
    defaultsTarget: {
      type: String,
      default: "VSelectionControl"
    },
    ...makeSelectionControlGroupProps()
  },
  emits: {
    "update:modelValue": (val) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const modelValue = useProxiedModel(props, "modelValue");
    const uid2 = getUid();
    const id2 = computed(() => props.id || `v-selection-control-group-${uid2}`);
    const name2 = computed(() => props.name || id2.value);
    const updateHandlers = /* @__PURE__ */ new Set();
    provide(VSelectionControlGroupSymbol, {
      modelValue,
      forceUpdate: () => {
        updateHandlers.forEach((fn) => fn());
      },
      onForceUpdate: (cb) => {
        updateHandlers.add(cb);
        onScopeDispose(() => {
          updateHandlers.delete(cb);
        });
      }
    });
    provideDefaults({
      [props.defaultsTarget]: {
        color: toRef(props, "color"),
        disabled: toRef(props, "disabled"),
        density: toRef(props, "density"),
        error: toRef(props, "error"),
        inline: toRef(props, "inline"),
        modelValue,
        multiple: computed(() => !!props.multiple || props.multiple == null && Array.isArray(modelValue.value)),
        name: name2,
        falseIcon: toRef(props, "falseIcon"),
        trueIcon: toRef(props, "trueIcon"),
        readonly: toRef(props, "readonly"),
        ripple: toRef(props, "ripple"),
        type: toRef(props, "type"),
        valueComparator: toRef(props, "valueComparator")
      }
    });
    useRender(() => {
      var _slots$default;
      return createVNode("div", {
        "class": ["v-selection-control-group", {
          "v-selection-control-group--inline": props.inline
        }],
        "role": props.type === "radio" ? "radiogroup" : void 0
      }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)]);
    });
    return {};
  }
});
const makeSelectionControlProps = propsFactory({
  label: String,
  trueValue: null,
  falseValue: null,
  value: null,
  ...makeSelectionControlGroupProps()
}, "v-selection-control");
function useSelectionControl(props) {
  const group = inject$1(VSelectionControlGroupSymbol, void 0);
  const {
    densityClasses
  } = useDensity(props);
  const modelValue = useProxiedModel(props, "modelValue");
  const trueValue = computed(() => props.trueValue !== void 0 ? props.trueValue : props.value !== void 0 ? props.value : true);
  const falseValue = computed(() => props.falseValue !== void 0 ? props.falseValue : false);
  const isMultiple = computed(() => !!props.multiple || props.multiple == null && Array.isArray(modelValue.value));
  const model = computed({
    get() {
      const val = group ? group.modelValue.value : modelValue.value;
      return isMultiple.value ? val.some((v) => props.valueComparator(v, trueValue.value)) : props.valueComparator(val, trueValue.value);
    },
    set(val) {
      if (props.readonly)
        return;
      const currentValue = val ? trueValue.value : falseValue.value;
      let newVal = currentValue;
      if (isMultiple.value) {
        newVal = val ? [...wrapInArray(modelValue.value), currentValue] : wrapInArray(modelValue.value).filter((item) => !props.valueComparator(item, trueValue.value));
      }
      if (group) {
        group.modelValue.value = newVal;
      } else {
        modelValue.value = newVal;
      }
    }
  });
  const {
    textColorClasses,
    textColorStyles
  } = useTextColor(computed(() => {
    return model.value && !props.error && !props.disabled ? props.color : void 0;
  }));
  const icon = computed(() => model.value ? props.trueIcon : props.falseIcon);
  return {
    group,
    densityClasses,
    trueValue,
    falseValue,
    model,
    textColorClasses,
    textColorStyles,
    icon
  };
}
const VSelectionControl = genericComponent()({
  name: "VSelectionControl",
  directives: {
    Ripple
  },
  inheritAttrs: false,
  props: makeSelectionControlProps(),
  emits: {
    "update:modelValue": (val) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const {
      group,
      densityClasses,
      icon,
      model,
      textColorClasses,
      textColorStyles,
      trueValue
    } = useSelectionControl(props);
    const uid2 = getUid();
    const id2 = computed(() => props.id || `input-${uid2}`);
    const isFocused = ref(false);
    const isFocusVisible = ref(false);
    const input = ref();
    group == null ? void 0 : group.onForceUpdate(() => {
      if (input.value) {
        input.value.checked = model.value;
      }
    });
    function onFocus(e2) {
      isFocused.value = true;
      if (!SUPPORTS_FOCUS_VISIBLE || SUPPORTS_FOCUS_VISIBLE && e2.target.matches(":focus-visible")) {
        isFocusVisible.value = true;
      }
    }
    function onBlur() {
      isFocused.value = false;
      isFocusVisible.value = false;
    }
    function onInput(e2) {
      if (props.readonly && group) {
        nextTick(() => group.forceUpdate());
      }
      model.value = e2.target.checked;
    }
    useRender(() => {
      var _slots$default, _slots$input;
      const label = slots.label ? slots.label({
        label: props.label,
        props: {
          for: id2.value
        }
      }) : props.label;
      const [rootAttrs, inputAttrs] = filterInputAttrs(attrs);
      return createVNode("div", mergeProps({
        "class": ["v-selection-control", {
          "v-selection-control--dirty": model.value,
          "v-selection-control--disabled": props.disabled,
          "v-selection-control--error": props.error,
          "v-selection-control--focused": isFocused.value,
          "v-selection-control--focus-visible": isFocusVisible.value,
          "v-selection-control--inline": props.inline
        }, densityClasses.value]
      }, rootAttrs), [createVNode("div", {
        "class": ["v-selection-control__wrapper", textColorClasses.value],
        "style": textColorStyles.value
      }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots), withDirectives(createVNode("div", {
        "class": ["v-selection-control__input"]
      }, [icon.value && createVNode(VIcon, {
        "key": "icon",
        "icon": icon.value
      }, null), createVNode("input", mergeProps({
        "ref": input,
        "checked": model.value,
        "disabled": props.disabled,
        "id": id2.value,
        "onBlur": onBlur,
        "onFocus": onFocus,
        "onInput": onInput,
        "aria-disabled": props.readonly,
        "type": props.type,
        "value": trueValue.value,
        "name": props.name,
        "aria-checked": props.type === "checkbox" ? model.value : void 0
      }, inputAttrs), null), (_slots$input = slots.input) == null ? void 0 : _slots$input.call(slots, {
        model,
        textColorClasses,
        textColorStyles,
        props: {
          onFocus,
          onBlur,
          id: id2.value
        }
      })]), [[resolveDirective("ripple"), props.ripple && [!props.disabled && !props.readonly, null, ["center", "circle"]]]])]), label && createVNode(VLabel, {
        "for": id2.value,
        "clickable": true
      }, {
        default: () => [label]
      })]);
    });
    return {
      isFocused,
      input
    };
  }
});
function filterControlProps(props) {
  return pick(props, Object.keys(VSelectionControl.props));
}
const makeVCheckboxBtnProps = propsFactory({
  indeterminate: Boolean,
  indeterminateIcon: {
    type: IconValue,
    default: "$checkboxIndeterminate"
  },
  ...makeSelectionControlProps({
    falseIcon: "$checkboxOff",
    trueIcon: "$checkboxOn"
  })
}, "v-checkbox-btn");
const VCheckboxBtn = defineComponent({
  name: "VCheckboxBtn",
  props: makeVCheckboxBtnProps(),
  emits: {
    "update:modelValue": (value) => true,
    "update:indeterminate": (val) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const indeterminate = useProxiedModel(props, "indeterminate");
    const model = useProxiedModel(props, "modelValue");
    function onChange(v) {
      if (indeterminate.value) {
        indeterminate.value = false;
      }
    }
    const falseIcon = computed(() => {
      return props.indeterminate ? props.indeterminateIcon : props.falseIcon;
    });
    const trueIcon = computed(() => {
      return props.indeterminate ? props.indeterminateIcon : props.trueIcon;
    });
    useRender(() => createVNode(VSelectionControl, mergeProps(props, {
      "modelValue": model.value,
      "onUpdate:modelValue": [($event) => model.value = $event, onChange],
      "class": "v-checkbox-btn",
      "type": "checkbox",
      "inline": true,
      "falseIcon": falseIcon.value,
      "trueIcon": trueIcon.value,
      "aria-checked": props.indeterminate ? "mixed" : void 0
    }), slots));
    return {};
  }
});
function filterCheckboxBtnProps(props) {
  return pick(props, Object.keys(VCheckboxBtn.props));
}
const VCheckbox = defineComponent({
  name: "VCheckbox",
  inheritAttrs: false,
  props: {
    ...makeVInputProps(),
    ...makeVCheckboxBtnProps()
  },
  emits: {
    "update:focused": (focused) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const {
      isFocused,
      focus,
      blur
    } = useFocus(props);
    const uid2 = getUid();
    const id2 = computed(() => props.id || `checkbox-${uid2}`);
    useRender(() => {
      const [inputAttrs, controlAttrs] = filterInputAttrs(attrs);
      const [inputProps, _1] = filterInputProps(props);
      const [checkboxProps, _2] = filterCheckboxBtnProps(props);
      return createVNode(VInput, mergeProps({
        "class": "v-checkbox"
      }, inputAttrs, inputProps, {
        "id": id2.value,
        "focused": isFocused.value
      }), {
        ...slots,
        default: (_ref2) => {
          let {
            id: id3,
            isDisabled,
            isReadonly
          } = _ref2;
          return createVNode(VCheckboxBtn, mergeProps(checkboxProps, {
            "id": id3.value,
            "disabled": isDisabled.value,
            "readonly": isReadonly.value
          }, controlAttrs, {
            "onFocus": focus,
            "onBlur": blur
          }), slots);
        }
      });
    });
    return {};
  }
});
const VChip$1 = "";
const VAvatar$1 = "";
const makeVAvatarProps = propsFactory({
  start: Boolean,
  end: Boolean,
  icon: IconValue,
  image: String,
  ...makeDensityProps(),
  ...makeRoundedProps(),
  ...makeSizeProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
  ...makeVariantProps({
    variant: "flat"
  })
}, "v-avatar");
const VAvatar = defineComponent({
  name: "VAvatar",
  props: makeVAvatarProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      colorClasses,
      colorStyles,
      variantClasses
    } = useVariant(props);
    const {
      densityClasses
    } = useDensity(props);
    const {
      roundedClasses
    } = useRounded(props);
    const {
      sizeClasses,
      sizeStyles
    } = useSize(props);
    useRender(() => {
      var _slots$default;
      return createVNode(props.tag, {
        "class": ["v-avatar", {
          "v-avatar--start": props.start,
          "v-avatar--end": props.end
        }, themeClasses.value, colorClasses.value, densityClasses.value, roundedClasses.value, sizeClasses.value, variantClasses.value],
        "style": [colorStyles.value, sizeStyles.value]
      }, {
        default: () => [props.image ? createVNode(VImg, {
          "key": "image",
          "src": props.image,
          "alt": "",
          "cover": true
        }, null) : props.icon ? createVNode(VIcon, {
          "key": "icon",
          "icon": props.icon
        }, null) : (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots), genOverlays(false, "v-avatar")]
      });
    });
    return {};
  }
});
const VChipGroup$1 = "";
const VChipGroupSymbol = Symbol.for("vuetify:v-chip-group");
const VChipGroup = defineComponent({
  name: "VChipGroup",
  props: {
    column: Boolean,
    filter: Boolean,
    valueComparator: {
      type: Function,
      default: deepEqual
    },
    ...makeGroupProps({
      selectedClass: "v-chip--selected"
    }),
    ...makeTagProps(),
    ...makeThemeProps(),
    ...makeVariantProps({
      variant: "tonal"
    })
  },
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      isSelected,
      select,
      next,
      prev,
      selected
    } = useGroup(props, VChipGroupSymbol);
    provideDefaults({
      VChip: {
        color: toRef(props, "color"),
        filter: toRef(props, "filter"),
        variant: toRef(props, "variant")
      }
    });
    useRender(() => {
      var _slots$default;
      return createVNode(props.tag, {
        "class": ["v-chip-group", {
          "v-chip-group--column": props.column
        }, themeClasses.value]
      }, {
        default: () => [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, {
          isSelected,
          select,
          next,
          prev,
          selected: selected.value
        })]
      });
    });
    return {};
  }
});
const VChip = defineComponent({
  name: "VChip",
  directives: {
    Ripple
  },
  props: {
    activeClass: String,
    appendAvatar: String,
    appendIcon: IconValue,
    closable: Boolean,
    closeIcon: {
      type: IconValue,
      default: "$delete"
    },
    closeLabel: {
      type: String,
      default: "$vuetify.close"
    },
    draggable: Boolean,
    filter: Boolean,
    filterIcon: {
      type: String,
      default: "$complete"
    },
    label: Boolean,
    link: Boolean,
    pill: Boolean,
    prependAvatar: String,
    prependIcon: IconValue,
    ripple: {
      type: Boolean,
      default: true
    },
    text: String,
    modelValue: {
      type: Boolean,
      default: true
    },
    ...makeBorderProps(),
    ...makeDensityProps(),
    ...makeElevationProps(),
    ...makeGroupItemProps(),
    ...makeRoundedProps(),
    ...makeRouterProps(),
    ...makeSizeProps(),
    ...makeTagProps({
      tag: "span"
    }),
    ...makeThemeProps(),
    ...makeVariantProps({
      variant: "tonal"
    })
  },
  emits: {
    "click:close": (e2) => true,
    "update:modelValue": (value) => true,
    "group:selected": (val) => true,
    click: (e2) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      emit,
      slots
    } = _ref;
    const {
      borderClasses
    } = useBorder(props);
    const {
      colorClasses,
      colorStyles,
      variantClasses
    } = useVariant(props);
    const {
      densityClasses
    } = useDensity(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      roundedClasses
    } = useRounded(props);
    const {
      sizeClasses
    } = useSize(props);
    const {
      themeClasses
    } = provideTheme(props);
    const isActive = useProxiedModel(props, "modelValue");
    const group = useGroupItem(props, VChipGroupSymbol, false);
    const link = useLink(props, attrs);
    const isClickable = computed(() => !props.disabled && (!!group || link.isClickable.value || props.link));
    function onCloseClick(e2) {
      isActive.value = false;
      emit("click:close", e2);
    }
    function onClick(e2) {
      var _link$navigate;
      emit("click", e2);
      if (!isClickable.value)
        return;
      (_link$navigate = link.navigate) == null ? void 0 : _link$navigate.call(link, e2);
      group == null ? void 0 : group.toggle();
    }
    return () => {
      var _slots$default;
      const Tag = link.isLink.value ? "a" : props.tag;
      const hasAppend = !!(slots.append || props.appendIcon || props.appendAvatar);
      const hasClose = !!(slots.close || props.closable);
      const hasFilter = !!(slots.filter || props.filter) && group;
      const hasPrepend = !!(slots.prepend || props.prependIcon || props.prependAvatar);
      const hasColor = !group || group.isSelected.value;
      return isActive.value && withDirectives(createVNode(Tag, {
        "class": ["v-chip", {
          "v-chip--disabled": props.disabled,
          "v-chip--label": props.label,
          "v-chip--link": isClickable.value,
          "v-chip--filter": hasFilter,
          "v-chip--pill": props.pill
        }, themeClasses.value, borderClasses.value, hasColor ? colorClasses.value : void 0, densityClasses.value, elevationClasses.value, roundedClasses.value, sizeClasses.value, variantClasses.value, group == null ? void 0 : group.selectedClass.value],
        "style": [hasColor ? colorStyles.value : void 0],
        "disabled": props.disabled || void 0,
        "draggable": props.draggable,
        "href": link.href.value,
        "onClick": onClick
      }, {
        default: () => [genOverlays(isClickable.value, "v-chip"), hasFilter && createVNode(VDefaultsProvider, {
          "key": "filter",
          "defaults": {
            VIcon: {
              icon: props.filterIcon
            }
          }
        }, {
          default: () => [createVNode(VExpandXTransition, null, {
            default: () => [withDirectives(createVNode("div", {
              "class": "v-chip__filter"
            }, [slots.filter ? slots.filter() : createVNode(VIcon, null, null)]), [[vShow, group.isSelected.value]])]
          })]
        }), hasPrepend && createVNode(VDefaultsProvider, {
          "key": "prepend",
          "defaults": {
            VAvatar: {
              image: props.prependAvatar
            },
            VIcon: {
              icon: props.prependIcon
            }
          }
        }, {
          default: () => [slots.prepend ? createVNode("div", {
            "class": "v-chip__prepend"
          }, [slots.prepend()]) : props.prependAvatar ? createVNode(VAvatar, {
            "start": true
          }, null) : props.prependIcon ? createVNode(VIcon, {
            "start": true
          }, null) : void 0]
        }), ((_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, {
          isSelected: group == null ? void 0 : group.isSelected.value,
          selectedClass: group == null ? void 0 : group.selectedClass.value,
          select: group == null ? void 0 : group.select,
          toggle: group == null ? void 0 : group.toggle,
          value: group == null ? void 0 : group.value.value,
          disabled: props.disabled
        })) ?? props.text, hasAppend && createVNode(VDefaultsProvider, {
          "key": "append",
          "defaults": {
            VAvatar: {
              image: props.appendAvatar
            },
            VIcon: {
              icon: props.appendIcon
            }
          }
        }, {
          default: () => [slots.append ? createVNode("div", {
            "class": "v-chip__append"
          }, [slots.append()]) : props.appendAvatar ? createVNode(VAvatar, {
            "end": true
          }, null) : props.appendIcon ? createVNode(VIcon, {
            "end": true
          }, null) : void 0]
        }), hasClose && createVNode(VDefaultsProvider, {
          "key": "close",
          "defaults": {
            VIcon: {
              icon: props.closeIcon,
              size: "x-small"
            }
          }
        }, {
          default: () => [createVNode("div", {
            "class": "v-chip__close",
            "onClick": onCloseClick
          }, [slots.close ? slots.close() : createVNode(VIcon, null, null)])]
        })]
      }), [[resolveDirective("ripple"), isClickable.value && props.ripple, null]]);
    };
  }
});
const VList$1 = "";
const VDivider$1 = "";
const VDivider = defineComponent({
  name: "VDivider",
  props: {
    color: String,
    inset: Boolean,
    length: [Number, String],
    thickness: [Number, String],
    vertical: Boolean,
    ...makeThemeProps()
  },
  setup(props, _ref) {
    let {
      attrs
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(toRef(props, "color"));
    const dividerStyles = computed(() => {
      const styles = {};
      if (props.length) {
        styles[props.vertical ? "maxHeight" : "maxWidth"] = convertToUnit(props.length);
      }
      if (props.thickness) {
        styles[props.vertical ? "borderRightWidth" : "borderTopWidth"] = convertToUnit(props.thickness);
      }
      return styles;
    });
    useRender(() => createVNode("hr", {
      "class": [{
        "v-divider": true,
        "v-divider--inset": props.inset,
        "v-divider--vertical": props.vertical
      }, themeClasses.value, backgroundColorClasses.value],
      "style": [dividerStyles.value, backgroundColorStyles.value],
      "aria-orientation": !attrs.role || attrs.role === "separator" ? props.vertical ? "vertical" : "horizontal" : void 0,
      "role": `${attrs.role || "separator"}`
    }, null));
    return {};
  }
});
const ListKey = Symbol.for("vuetify:list");
function createList() {
  const parent = inject$1(ListKey, {
    hasPrepend: ref(false),
    updateHasPrepend: () => null
  });
  const data2 = {
    hasPrepend: ref(false),
    updateHasPrepend: (value) => {
      if (value)
        data2.hasPrepend.value = value;
    }
  };
  provide(ListKey, data2);
  return parent;
}
function useList() {
  return inject$1(ListKey, null);
}
const singleOpenStrategy = {
  open: (_ref) => {
    let {
      id: id2,
      value,
      opened,
      parents
    } = _ref;
    if (value) {
      const newOpened = /* @__PURE__ */ new Set();
      newOpened.add(id2);
      let parent = parents.get(id2);
      while (parent != null) {
        newOpened.add(parent);
        parent = parents.get(parent);
      }
      return newOpened;
    } else {
      opened.delete(id2);
      return opened;
    }
  },
  select: () => null
};
const multipleOpenStrategy = {
  open: (_ref2) => {
    let {
      id: id2,
      value,
      opened,
      parents
    } = _ref2;
    if (value) {
      let parent = parents.get(id2);
      opened.add(id2);
      while (parent != null && parent !== id2) {
        opened.add(parent);
        parent = parents.get(parent);
      }
      return opened;
    } else {
      opened.delete(id2);
    }
    return opened;
  },
  select: () => null
};
const listOpenStrategy = {
  open: multipleOpenStrategy.open,
  select: (_ref3) => {
    let {
      id: id2,
      value,
      opened,
      parents
    } = _ref3;
    if (!value)
      return opened;
    const path = [];
    let parent = parents.get(id2);
    while (parent != null) {
      path.push(parent);
      parent = parents.get(parent);
    }
    return new Set(path);
  }
};
const independentSelectStrategy = (mandatory) => {
  const strategy = {
    select: (_ref) => {
      let {
        id: id2,
        value,
        selected
      } = _ref;
      if (mandatory && !value) {
        const on = Array.from(selected.entries()).reduce((arr, _ref2) => {
          let [key, value2] = _ref2;
          return value2 === "on" ? [...arr, key] : arr;
        }, []);
        if (on.length === 1 && on[0] === id2)
          return selected;
      }
      selected.set(id2, value ? "on" : "off");
      return selected;
    },
    in: (v, children, parents) => {
      let map = /* @__PURE__ */ new Map();
      for (const id2 of v || []) {
        map = strategy.select({
          id: id2,
          value: true,
          selected: new Map(map),
          children,
          parents
        });
      }
      return map;
    },
    out: (v) => {
      const arr = [];
      for (const [key, value] of v.entries()) {
        if (value === "on")
          arr.push(key);
      }
      return arr;
    }
  };
  return strategy;
};
const independentSingleSelectStrategy = (mandatory) => {
  const parentStrategy = independentSelectStrategy(mandatory);
  const strategy = {
    select: (_ref3) => {
      let {
        selected,
        id: id2,
        ...rest
      } = _ref3;
      const singleSelected = selected.has(id2) ? /* @__PURE__ */ new Map([[id2, selected.get(id2)]]) : /* @__PURE__ */ new Map();
      return parentStrategy.select({
        ...rest,
        id: id2,
        selected: singleSelected
      });
    },
    in: (v, children, parents) => {
      let map = /* @__PURE__ */ new Map();
      if (v != null && v.length) {
        map = parentStrategy.in(v.slice(0, 1), children, parents);
      }
      return map;
    },
    out: (v, children, parents) => {
      return parentStrategy.out(v, children, parents);
    }
  };
  return strategy;
};
const leafSelectStrategy = (mandatory) => {
  const parentStrategy = independentSelectStrategy(mandatory);
  const strategy = {
    select: (_ref4) => {
      let {
        id: id2,
        selected,
        children,
        ...rest
      } = _ref4;
      if (children.has(id2))
        return selected;
      return parentStrategy.select({
        id: id2,
        selected,
        children,
        ...rest
      });
    },
    in: parentStrategy.in,
    out: parentStrategy.out
  };
  return strategy;
};
const leafSingleSelectStrategy = (mandatory) => {
  const parentStrategy = independentSingleSelectStrategy(mandatory);
  const strategy = {
    select: (_ref5) => {
      let {
        id: id2,
        selected,
        children,
        ...rest
      } = _ref5;
      if (children.has(id2))
        return selected;
      return parentStrategy.select({
        id: id2,
        selected,
        children,
        ...rest
      });
    },
    in: parentStrategy.in,
    out: parentStrategy.out
  };
  return strategy;
};
const classicSelectStrategy = (mandatory) => {
  const strategy = {
    select: (_ref6) => {
      let {
        id: id2,
        value,
        selected,
        children,
        parents
      } = _ref6;
      const original = new Map(selected);
      const items = [id2];
      while (items.length) {
        const item = items.shift();
        selected.set(item, value ? "on" : "off");
        if (children.has(item)) {
          items.push(...children.get(item));
        }
      }
      let parent = parents.get(id2);
      while (parent) {
        const childrenIds = children.get(parent);
        const everySelected = childrenIds.every((cid) => selected.get(cid) === "on");
        const noneSelected = childrenIds.every((cid) => !selected.has(cid) || selected.get(cid) === "off");
        selected.set(parent, everySelected ? "on" : noneSelected ? "off" : "indeterminate");
        parent = parents.get(parent);
      }
      if (mandatory && !value) {
        const on = Array.from(selected.entries()).reduce((arr, _ref7) => {
          let [key, value2] = _ref7;
          return value2 === "on" ? [...arr, key] : arr;
        }, []);
        if (on.length === 0)
          return original;
      }
      return selected;
    },
    in: (v, children, parents) => {
      let map = /* @__PURE__ */ new Map();
      for (const id2 of v || []) {
        map = strategy.select({
          id: id2,
          value: true,
          selected: new Map(map),
          children,
          parents
        });
      }
      return map;
    },
    out: (v, children) => {
      const arr = [];
      for (const [key, value] of v.entries()) {
        if (value === "on" && !children.has(key))
          arr.push(key);
      }
      return arr;
    }
  };
  return strategy;
};
const VNestedSymbol = Symbol.for("vuetify:nested");
const emptyNested = {
  id: ref(),
  root: {
    register: () => null,
    unregister: () => null,
    parents: ref(/* @__PURE__ */ new Map()),
    children: ref(/* @__PURE__ */ new Map()),
    open: () => null,
    openOnSelect: () => null,
    select: () => null,
    opened: ref(/* @__PURE__ */ new Set()),
    selected: ref(/* @__PURE__ */ new Map()),
    selectedValues: ref([])
  }
};
const makeNestedProps = propsFactory({
  selectStrategy: [String, Function],
  openStrategy: [String, Object],
  opened: Array,
  selected: Array,
  mandatory: Boolean
}, "nested");
const useNested = (props) => {
  let isUnmounted = false;
  const children = ref(/* @__PURE__ */ new Map());
  const parents = ref(/* @__PURE__ */ new Map());
  const opened = useProxiedModel(props, "opened", props.opened, (v) => new Set(v), (v) => [...v.values()]);
  const selectStrategy = computed(() => {
    if (typeof props.selectStrategy === "object")
      return props.selectStrategy;
    switch (props.selectStrategy) {
      case "single-leaf":
        return leafSingleSelectStrategy(props.mandatory);
      case "leaf":
        return leafSelectStrategy(props.mandatory);
      case "independent":
        return independentSelectStrategy(props.mandatory);
      case "single-independent":
        return independentSingleSelectStrategy(props.mandatory);
      case "classic":
      default:
        return classicSelectStrategy(props.mandatory);
    }
  });
  const openStrategy = computed(() => {
    if (typeof props.openStrategy === "object")
      return props.openStrategy;
    switch (props.openStrategy) {
      case "list":
        return listOpenStrategy;
      case "single":
        return singleOpenStrategy;
      case "multiple":
      default:
        return multipleOpenStrategy;
    }
  });
  const selected = useProxiedModel(props, "selected", props.selected, (v) => selectStrategy.value.in(v, children.value, parents.value), (v) => selectStrategy.value.out(v, children.value, parents.value));
  onBeforeUnmount(() => {
    isUnmounted = true;
  });
  function getPath(id2) {
    const path = [];
    let parent = id2;
    while (parent != null) {
      path.unshift(parent);
      parent = parents.value.get(parent);
    }
    return path;
  }
  const vm = getCurrentInstance("nested");
  const nested = {
    id: ref(),
    root: {
      opened,
      selected,
      selectedValues: computed(() => {
        const arr = [];
        for (const [key, value] of selected.value.entries()) {
          if (value === "on")
            arr.push(key);
        }
        return arr;
      }),
      register: (id2, parentId, isGroup) => {
        parentId && id2 !== parentId && parents.value.set(id2, parentId);
        isGroup && children.value.set(id2, []);
        if (parentId != null) {
          children.value.set(parentId, [...children.value.get(parentId) || [], id2]);
        }
      },
      unregister: (id2) => {
        if (isUnmounted)
          return;
        children.value.delete(id2);
        const parent = parents.value.get(id2);
        if (parent) {
          const list = children.value.get(parent) ?? [];
          children.value.set(parent, list.filter((child) => child !== id2));
        }
        parents.value.delete(id2);
        opened.value.delete(id2);
      },
      open: (id2, value, event) => {
        vm.emit("click:open", {
          id: id2,
          value,
          path: getPath(id2),
          event
        });
        const newOpened = openStrategy.value.open({
          id: id2,
          value,
          opened: new Set(opened.value),
          children: children.value,
          parents: parents.value,
          event
        });
        newOpened && (opened.value = newOpened);
      },
      openOnSelect: (id2, value, event) => {
        const newOpened = openStrategy.value.select({
          id: id2,
          value,
          selected: new Map(selected.value),
          opened: new Set(opened.value),
          children: children.value,
          parents: parents.value,
          event
        });
        newOpened && (opened.value = newOpened);
      },
      select: (id2, value, event) => {
        vm.emit("click:select", {
          id: id2,
          value,
          path: getPath(id2),
          event
        });
        const newSelected = selectStrategy.value.select({
          id: id2,
          value,
          selected: new Map(selected.value),
          children: children.value,
          parents: parents.value,
          event
        });
        newSelected && (selected.value = newSelected);
        nested.root.openOnSelect(id2, value, event);
      },
      children,
      parents
    }
  };
  provide(VNestedSymbol, nested);
  return nested.root;
};
const useNestedItem = (id2, isGroup) => {
  const parent = inject$1(VNestedSymbol, emptyNested);
  const computedId = computed(() => id2.value ?? Symbol(getUid()));
  const item = {
    ...parent,
    id: computedId,
    open: (open, e2) => parent.root.open(computedId.value, open, e2),
    openOnSelect: (open, e2) => parent.root.openOnSelect(computedId.value, open, e2),
    isOpen: computed(() => parent.root.opened.value.has(computedId.value)),
    parent: computed(() => parent.root.parents.value.get(computedId.value)),
    select: (selected, e2) => parent.root.select(computedId.value, selected, e2),
    isSelected: computed(() => parent.root.selected.value.get(computedId.value) === "on"),
    isIndeterminate: computed(() => parent.root.selected.value.get(computedId.value) === "indeterminate"),
    isLeaf: computed(() => !parent.root.children.value.get(computedId.value)),
    isGroupActivator: parent.isGroupActivator
  };
  !parent.isGroupActivator && parent.root.register(computedId.value, parent.id.value, isGroup);
  onBeforeUnmount(() => {
    !parent.isGroupActivator && parent.root.unregister(computedId.value);
  });
  isGroup && provide(VNestedSymbol, item);
  return item;
};
const useNestedGroupActivator = () => {
  const parent = inject$1(VNestedSymbol, emptyNested);
  provide(VNestedSymbol, {
    ...parent,
    isGroupActivator: true
  });
};
const VListGroupActivator = defineComponent({
  name: "VListGroupActivator",
  setup(_2, _ref) {
    let {
      slots
    } = _ref;
    useNestedGroupActivator();
    return () => {
      var _slots$default;
      return (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots);
    };
  }
});
const makeVListGroupProps = propsFactory({
  activeColor: String,
  color: String,
  collapseIcon: {
    type: IconValue,
    default: "$collapse"
  },
  expandIcon: {
    type: IconValue,
    default: "$expand"
  },
  prependIcon: IconValue,
  appendIcon: IconValue,
  fluid: Boolean,
  subgroup: Boolean,
  value: null,
  ...makeTagProps()
}, "v-list-group");
const VListGroup = genericComponent()({
  name: "VListGroup",
  props: {
    title: String,
    ...makeVListGroupProps()
  },
  setup(props, _ref2) {
    let {
      slots
    } = _ref2;
    const {
      isOpen,
      open,
      id: _id
    } = useNestedItem(toRef(props, "value"), true);
    const id2 = computed(() => `v-list-group--id-${String(_id.value)}`);
    const list = useList();
    function onClick(e2) {
      open(!isOpen.value, e2);
    }
    const activatorProps = computed(() => ({
      onClick,
      class: "v-list-group__header",
      id: id2.value
    }));
    const toggleIcon = computed(() => isOpen.value ? props.collapseIcon : props.expandIcon);
    useRender(() => {
      var _slots$default2;
      return createVNode(props.tag, {
        "class": ["v-list-group", {
          "v-list-group--prepend": list == null ? void 0 : list.hasPrepend.value,
          "v-list-group--fluid": props.fluid,
          "v-list-group--subgroup": props.subgroup,
          "v-list-group--open": isOpen.value
        }]
      }, {
        default: () => [slots.activator && createVNode(VDefaultsProvider, {
          "defaults": {
            VListItem: {
              active: isOpen.value,
              activeColor: props.activeColor,
              color: props.color,
              prependIcon: props.prependIcon || props.subgroup && toggleIcon.value,
              appendIcon: props.appendIcon || !props.subgroup && toggleIcon.value,
              title: props.title,
              value: props.value
            }
          }
        }, {
          default: () => [createVNode(VListGroupActivator, null, {
            default: () => [slots.activator({
              props: activatorProps.value,
              isOpen
            })]
          })]
        }), createVNode(VExpandTransition, null, {
          default: () => [withDirectives(createVNode("div", {
            "class": "v-list-group__items",
            "role": "group",
            "aria-labelledby": id2.value
          }, [(_slots$default2 = slots.default) == null ? void 0 : _slots$default2.call(slots)]), [[vShow, isOpen.value]])]
        })]
      });
    });
    return {};
  }
});
function filterListGroupProps(props) {
  return pick(props, Object.keys(VListGroup.props));
}
const VListItem$1 = "";
const VListItemSubtitle = createSimpleFunctional("v-list-item-subtitle");
const VListItemTitle = createSimpleFunctional("v-list-item-title");
const VListItem = genericComponent()({
  name: "VListItem",
  directives: {
    Ripple
  },
  props: {
    active: {
      type: Boolean,
      default: void 0
    },
    activeClass: String,
    activeColor: String,
    appendAvatar: String,
    appendIcon: IconValue,
    disabled: Boolean,
    lines: String,
    link: {
      type: Boolean,
      default: void 0
    },
    nav: Boolean,
    prependAvatar: String,
    prependIcon: IconValue,
    subtitle: [String, Number, Boolean],
    title: [String, Number, Boolean],
    value: null,
    onClick: EventProp,
    onClickOnce: EventProp,
    ...makeBorderProps(),
    ...makeDensityProps(),
    ...makeDimensionProps(),
    ...makeElevationProps(),
    ...makeRoundedProps(),
    ...makeRouterProps(),
    ...makeTagProps(),
    ...makeThemeProps(),
    ...makeVariantProps({
      variant: "text"
    })
  },
  emits: {
    click: (e2) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      slots,
      emit
    } = _ref;
    const link = useLink(props, attrs);
    const id2 = computed(() => props.value ?? link.href.value);
    const {
      select,
      isSelected,
      isIndeterminate,
      isGroupActivator,
      root,
      parent,
      openOnSelect
    } = useNestedItem(id2, false);
    const list = useList();
    const isActive = computed(() => {
      var _link$isActive;
      return props.active !== false && (props.active || ((_link$isActive = link.isActive) == null ? void 0 : _link$isActive.value) || isSelected.value);
    });
    const isLink = computed(() => props.link !== false && link.isLink.value);
    const isClickable = computed(() => !props.disabled && props.link !== false && (props.link || link.isClickable.value || props.value != null && !!list));
    const roundedProps = computed(() => props.rounded || props.nav);
    const variantProps = computed(() => ({
      color: isActive.value ? props.activeColor ?? props.color : props.color,
      variant: props.variant
    }));
    watch(() => {
      var _link$isActive2;
      return (_link$isActive2 = link.isActive) == null ? void 0 : _link$isActive2.value;
    }, (val) => {
      if (val && parent.value != null) {
        root.open(parent.value, true);
      }
      if (val) {
        openOnSelect(val);
      }
    }, {
      immediate: true
    });
    const {
      themeClasses
    } = provideTheme(props);
    const {
      borderClasses
    } = useBorder(props);
    const {
      colorClasses,
      colorStyles,
      variantClasses
    } = useVariant(variantProps);
    const {
      densityClasses
    } = useDensity(props);
    const {
      dimensionStyles
    } = useDimension(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      roundedClasses
    } = useRounded(roundedProps);
    const lineClasses = computed(() => props.lines ? `v-list-item--${props.lines}-line` : void 0);
    const slotProps = computed(() => ({
      isActive: isActive.value,
      select,
      isSelected: isSelected.value,
      isIndeterminate: isIndeterminate.value
    }));
    function onClick(e2) {
      var _link$navigate;
      emit("click", e2);
      if (isGroupActivator || !isClickable.value)
        return;
      (_link$navigate = link.navigate) == null ? void 0 : _link$navigate.call(link, e2);
      props.value != null && select(!isSelected.value, e2);
    }
    function onKeyDown(e2) {
      if (e2.key === "Enter" || e2.key === " ") {
        e2.preventDefault();
        onClick(e2);
      }
    }
    useRender(() => {
      var _slots$prepend, _slots$title, _slots$subtitle, _slots$default, _slots$append;
      const Tag = isLink.value ? "a" : props.tag;
      const hasColor = !list || isSelected.value || isActive.value;
      const hasTitle = slots.title || props.title;
      const hasSubtitle = slots.subtitle || props.subtitle;
      const hasAppend = !!(slots.append || props.appendAvatar || props.appendIcon);
      const hasPrepend = !!(slots.prepend || props.prependAvatar || props.prependIcon);
      list == null ? void 0 : list.updateHasPrepend(hasPrepend);
      return withDirectives(createVNode(Tag, {
        "class": ["v-list-item", {
          "v-list-item--active": isActive.value,
          "v-list-item--disabled": props.disabled,
          "v-list-item--link": isClickable.value,
          "v-list-item--nav": props.nav,
          "v-list-item--prepend": !hasPrepend && (list == null ? void 0 : list.hasPrepend.value),
          [`${props.activeClass}`]: props.activeClass && isActive.value
        }, themeClasses.value, borderClasses.value, hasColor ? colorClasses.value : void 0, densityClasses.value, elevationClasses.value, lineClasses.value, roundedClasses.value, variantClasses.value],
        "style": [hasColor ? colorStyles.value : void 0, dimensionStyles.value],
        "href": link.href.value,
        "tabindex": isClickable.value ? 0 : void 0,
        "onClick": onClick,
        "onKeydown": isClickable.value && !isLink.value && onKeyDown
      }, {
        default: () => [genOverlays(isClickable.value || isActive.value, "v-list-item"), hasPrepend && createVNode(VDefaultsProvider, {
          "key": "prepend",
          "defaults": {
            VAvatar: {
              density: props.density,
              image: props.prependAvatar
            },
            VIcon: {
              density: props.density,
              icon: props.prependIcon
            },
            VListItemAction: {
              start: true
            }
          }
        }, {
          default: () => [createVNode("div", {
            "class": "v-list-item__prepend"
          }, [props.prependAvatar && createVNode(VAvatar, {
            "key": "prepend-avatar"
          }, null), props.prependIcon && createVNode(VIcon, {
            "key": "prepend-icon"
          }, null), (_slots$prepend = slots.prepend) == null ? void 0 : _slots$prepend.call(slots, slotProps.value)])]
        }), createVNode("div", {
          "class": "v-list-item__content",
          "data-no-activator": ""
        }, [hasTitle && createVNode(VListItemTitle, {
          "key": "title"
        }, {
          default: () => [((_slots$title = slots.title) == null ? void 0 : _slots$title.call(slots, {
            title: props.title
          })) ?? props.title]
        }), hasSubtitle && createVNode(VListItemSubtitle, {
          "key": "subtitle"
        }, {
          default: () => [((_slots$subtitle = slots.subtitle) == null ? void 0 : _slots$subtitle.call(slots, {
            subtitle: props.subtitle
          })) ?? props.subtitle]
        }), (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, slotProps.value)]), hasAppend && createVNode(VDefaultsProvider, {
          "key": "append",
          "defaults": {
            VAvatar: {
              density: props.density,
              image: props.appendAvatar
            },
            VIcon: {
              density: props.density,
              icon: props.appendIcon
            },
            VListItemAction: {
              end: true
            }
          }
        }, {
          default: () => [createVNode("div", {
            "class": "v-list-item__append"
          }, [(_slots$append = slots.append) == null ? void 0 : _slots$append.call(slots, slotProps.value), props.appendIcon && createVNode(VIcon, {
            "key": "append-icon"
          }, null), props.appendAvatar && createVNode(VAvatar, {
            "key": "append-avatar"
          }, null)])]
        })]
      }), [[resolveDirective("ripple"), isClickable.value]]);
    });
    return {};
  }
});
const VListSubheader = defineComponent({
  name: "VListSubheader",
  props: {
    color: String,
    inset: Boolean,
    sticky: Boolean,
    title: String,
    ...makeTagProps()
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(toRef(props, "color"));
    useRender(() => {
      var _slots$default;
      const hasText = !!(slots.default || props.title);
      return createVNode(props.tag, {
        "class": ["v-list-subheader", {
          "v-list-subheader--inset": props.inset,
          "v-list-subheader--sticky": props.sticky
        }, textColorClasses.value],
        "style": {
          textColorStyles
        }
      }, {
        default: () => [hasText && createVNode("div", {
          "class": "v-list-subheader__text"
        }, [((_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)) ?? props.title])]
      });
    });
    return {};
  }
});
const VListChildren = genericComponent()({
  name: "VListChildren",
  props: {
    items: Array
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    createList();
    return () => {
      var _slots$default, _props$items;
      return ((_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)) ?? ((_props$items = props.items) == null ? void 0 : _props$items.map((_ref2) => {
        let {
          children,
          props: itemProps,
          type,
          raw: item
        } = _ref2;
        if (type === "divider") {
          var _slots$divider;
          return ((_slots$divider = slots.divider) == null ? void 0 : _slots$divider.call(slots, {
            props: itemProps
          })) ?? createVNode(VDivider, itemProps, null);
        }
        if (type === "subheader") {
          var _slots$subheader;
          return ((_slots$subheader = slots.subheader) == null ? void 0 : _slots$subheader.call(slots, {
            props: itemProps
          })) ?? createVNode(VListSubheader, itemProps, {
            default: slots.subheader
          });
        }
        const slotsWithItem = {
          subtitle: slots.subtitle ? (slotProps) => {
            var _slots$subtitle;
            return (_slots$subtitle = slots.subtitle) == null ? void 0 : _slots$subtitle.call(slots, {
              ...slotProps,
              item
            });
          } : void 0,
          prepend: slots.prepend ? (slotProps) => {
            var _slots$prepend;
            return (_slots$prepend = slots.prepend) == null ? void 0 : _slots$prepend.call(slots, {
              ...slotProps,
              item
            });
          } : void 0,
          append: slots.append ? (slotProps) => {
            var _slots$append;
            return (_slots$append = slots.append) == null ? void 0 : _slots$append.call(slots, {
              ...slotProps,
              item
            });
          } : void 0,
          default: slots.default ? (slotProps) => {
            var _slots$default2;
            return (_slots$default2 = slots.default) == null ? void 0 : _slots$default2.call(slots, {
              ...slotProps,
              item
            });
          } : void 0,
          title: slots.title ? (slotProps) => {
            var _slots$title;
            return (_slots$title = slots.title) == null ? void 0 : _slots$title.call(slots, {
              ...slotProps,
              item
            });
          } : void 0
        };
        const [listGroupProps, _1] = filterListGroupProps(itemProps);
        return children ? createVNode(VListGroup, mergeProps({
          "value": itemProps == null ? void 0 : itemProps.value
        }, listGroupProps), {
          activator: (_ref3) => {
            let {
              props: activatorProps
            } = _ref3;
            return slots.header ? slots.header({
              ...itemProps,
              ...activatorProps
            }) : createVNode(VListItem, mergeProps(itemProps, activatorProps), slotsWithItem);
          },
          default: () => createVNode(VListChildren, {
            "items": children
          }, slots)
        }) : slots.item ? slots.item(itemProps) : createVNode(VListItem, itemProps, slotsWithItem);
      }));
    };
  }
});
const makeItemsProps = propsFactory({
  items: {
    type: Array,
    default: () => []
  },
  itemTitle: {
    type: [String, Array, Function],
    default: "title"
  },
  itemValue: {
    type: [String, Array, Function],
    default: "value"
  },
  itemChildren: {
    type: [Boolean, String, Array, Function],
    default: "children"
  },
  itemProps: {
    type: [Boolean, String, Array, Function],
    default: "props"
  },
  returnObject: Boolean
}, "item");
function transformItem$1(props, item) {
  const title2 = getPropertyFromItem(item, props.itemTitle, item);
  const value = props.returnObject ? item : getPropertyFromItem(item, props.itemValue, title2);
  const children = getPropertyFromItem(item, props.itemChildren);
  const itemProps = props.itemProps === true ? typeof item === "object" && item != null && !Array.isArray(item) ? "children" in item ? pick(item, ["children"])[1] : item : void 0 : getPropertyFromItem(item, props.itemProps);
  const _props = {
    title: title2,
    value,
    ...itemProps
  };
  return {
    title: String(_props.title ?? ""),
    value: _props.value,
    props: _props,
    children: Array.isArray(children) ? transformItems$1(props, children) : void 0,
    raw: item
  };
}
function transformItems$1(props, items) {
  const array = [];
  for (const item of items) {
    array.push(transformItem$1(props, item));
  }
  return array;
}
function useItems(props) {
  const items = computed(() => transformItems$1(props, props.items));
  function transformIn(value) {
    return value.map((item) => transformItem$1(props, item));
  }
  function transformOut(value) {
    return value.map((_ref) => {
      let {
        props: props2
      } = _ref;
      return props2.value;
    });
  }
  return {
    items,
    transformIn,
    transformOut
  };
}
function transformItem(props, item) {
  const type = getPropertyFromItem(item, props.itemType, "item");
  const title2 = typeof item === "string" ? item : getPropertyFromItem(item, props.itemTitle);
  const value = getPropertyFromItem(item, props.itemValue, void 0);
  const children = getPropertyFromItem(item, props.itemChildren);
  const itemProps = props.itemProps === true ? pick(item, ["children"])[1] : getPropertyFromItem(item, props.itemProps);
  const _props = {
    title: title2,
    value,
    ...itemProps
  };
  return {
    type,
    title: _props.title,
    value: _props.value,
    props: _props,
    children: type === "item" && children ? transformItems(props, children) : void 0,
    raw: item
  };
}
function transformItems(props, items) {
  const array = [];
  for (const item of items) {
    array.push(transformItem(props, item));
  }
  return array;
}
function useListItems(props) {
  const items = computed(() => transformItems(props, props.items));
  return {
    items
  };
}
const VList = genericComponent()({
  name: "VList",
  props: {
    activeColor: String,
    activeClass: String,
    bgColor: String,
    disabled: Boolean,
    lines: {
      type: [Boolean, String],
      default: "one"
    },
    nav: Boolean,
    ...makeNestedProps({
      selectStrategy: "single-leaf",
      openStrategy: "list"
    }),
    ...makeBorderProps(),
    ...makeDensityProps(),
    ...makeDimensionProps(),
    ...makeElevationProps(),
    itemType: {
      type: String,
      default: "type"
    },
    ...makeItemsProps(),
    ...makeRoundedProps(),
    ...makeTagProps(),
    ...makeThemeProps(),
    ...makeVariantProps({
      variant: "text"
    })
  },
  emits: {
    "update:selected": (val) => true,
    "update:opened": (val) => true,
    "click:open": (value) => true,
    "click:select": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      items
    } = useListItems(props);
    const {
      themeClasses
    } = provideTheme(props);
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(toRef(props, "bgColor"));
    const {
      borderClasses
    } = useBorder(props);
    const {
      densityClasses
    } = useDensity(props);
    const {
      dimensionStyles
    } = useDimension(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      roundedClasses
    } = useRounded(props);
    const {
      open,
      select
    } = useNested(props);
    const lineClasses = computed(() => props.lines ? `v-list--${props.lines}-line` : void 0);
    const activeColor = toRef(props, "activeColor");
    const color = toRef(props, "color");
    createList();
    provideDefaults({
      VListGroup: {
        activeColor,
        color
      },
      VListItem: {
        activeClass: toRef(props, "activeClass"),
        activeColor,
        color,
        density: toRef(props, "density"),
        disabled: toRef(props, "disabled"),
        lines: toRef(props, "lines"),
        nav: toRef(props, "nav"),
        variant: toRef(props, "variant")
      }
    });
    const isFocused = ref(false);
    const contentRef = ref();
    function onFocusin(e2) {
      isFocused.value = true;
    }
    function onFocusout(e2) {
      isFocused.value = false;
    }
    function onFocus(e2) {
      var _contentRef$value;
      if (!isFocused.value && !(e2.relatedTarget && (_contentRef$value = contentRef.value) != null && _contentRef$value.contains(e2.relatedTarget)))
        focus();
    }
    function onKeydown(e2) {
      if (!contentRef.value)
        return;
      if (e2.key === "ArrowDown") {
        focus("next");
      } else if (e2.key === "ArrowUp") {
        focus("prev");
      } else if (e2.key === "Home") {
        focus("first");
      } else if (e2.key === "End") {
        focus("last");
      } else {
        return;
      }
      e2.preventDefault();
    }
    function focus(location2) {
      if (!contentRef.value)
        return;
      const focusable = [...contentRef.value.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')].filter((el) => !el.hasAttribute("disabled"));
      const idx = focusable.indexOf(document.activeElement);
      if (!location2) {
        if (!contentRef.value.contains(document.activeElement)) {
          var _focusable$;
          (_focusable$ = focusable[0]) == null ? void 0 : _focusable$.focus();
        }
      } else if (location2 === "first") {
        var _focusable$2;
        (_focusable$2 = focusable[0]) == null ? void 0 : _focusable$2.focus();
      } else if (location2 === "last") {
        var _focusable$at;
        (_focusable$at = focusable.at(-1)) == null ? void 0 : _focusable$at.focus();
      } else {
        let el;
        let idxx = idx;
        const inc2 = location2 === "next" ? 1 : -1;
        do {
          idxx += inc2;
          el = focusable[idxx];
        } while ((!el || el.offsetParent == null) && idxx < focusable.length && idxx >= 0);
        if (el)
          el.focus();
        else
          focus(location2 === "next" ? "first" : "last");
      }
    }
    useRender(() => {
      return createVNode(props.tag, {
        "ref": contentRef,
        "class": ["v-list", {
          "v-list--disabled": props.disabled,
          "v-list--nav": props.nav
        }, themeClasses.value, backgroundColorClasses.value, borderClasses.value, densityClasses.value, elevationClasses.value, lineClasses.value, roundedClasses.value],
        "style": [backgroundColorStyles.value, dimensionStyles.value],
        "role": "listbox",
        "aria-activedescendant": void 0,
        "onFocusin": onFocusin,
        "onFocusout": onFocusout,
        "onFocus": onFocus,
        "onKeydown": onKeydown
      }, {
        default: () => [createVNode(VListChildren, {
          "items": items.value
        }, slots)]
      });
    });
    return {
      open,
      select,
      focus
    };
  }
});
const VListImg = createSimpleFunctional("v-list-img");
const VListItemAction = defineComponent({
  name: "VListItemAction",
  props: {
    start: Boolean,
    end: Boolean,
    ...makeTagProps()
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => createVNode(props.tag, {
      "class": ["v-list-item-action", {
        "v-list-item-action--start": props.start,
        "v-list-item-action--end": props.end
      }]
    }, slots));
    return {};
  }
});
const VListItemMedia = defineComponent({
  name: "VListItemMedia",
  props: {
    start: Boolean,
    end: Boolean,
    ...makeTagProps()
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => {
      return createVNode(props.tag, {
        "class": ["v-list-item-media", {
          "v-list-item-media--start": props.start,
          "v-list-item-media--end": props.end
        }]
      }, slots);
    });
    return {};
  }
});
const VMenu$1 = "";
const VOverlay$1 = "";
const makeDelayProps = propsFactory({
  closeDelay: [Number, String],
  openDelay: [Number, String]
}, "delay");
function useDelay(props, cb) {
  const delays = {};
  const runDelayFactory = (prop) => () => {
    if (!IN_BROWSER)
      return Promise.resolve(true);
    const active = prop === "openDelay";
    delays.closeDelay && window.clearTimeout(delays.closeDelay);
    delete delays.closeDelay;
    delays.openDelay && window.clearTimeout(delays.openDelay);
    delete delays.openDelay;
    return new Promise((resolve) => {
      const delay = parseInt(props[prop] ?? 0, 10);
      delays[prop] = window.setTimeout(() => {
        cb == null ? void 0 : cb(active);
        resolve(active);
      }, delay);
    });
  };
  return {
    runCloseDelay: runDelayFactory("closeDelay"),
    runOpenDelay: runDelayFactory("openDelay")
  };
}
const VMenuSymbol = Symbol.for("vuetify:v-menu");
const makeActivatorProps = propsFactory({
  activator: [String, Object],
  activatorProps: {
    type: Object,
    default: () => ({})
  },
  openOnClick: {
    type: Boolean,
    default: void 0
  },
  openOnHover: Boolean,
  openOnFocus: {
    type: Boolean,
    default: void 0
  },
  closeOnContentClick: Boolean,
  ...makeDelayProps()
}, "v-overlay-activator");
function useActivator(props, _ref) {
  let {
    isActive,
    isTop
  } = _ref;
  const activatorEl = ref();
  let isHovered = false;
  let isFocused = false;
  let firstEnter = true;
  const openOnFocus = computed(() => props.openOnFocus || props.openOnFocus == null && props.openOnHover);
  const openOnClick = computed(() => props.openOnClick || props.openOnClick == null && !props.openOnHover && !openOnFocus.value);
  const {
    runOpenDelay,
    runCloseDelay
  } = useDelay(props, (value) => {
    if (value === (props.openOnHover && isHovered || openOnFocus.value && isFocused) && !(props.openOnHover && isActive.value && !isTop.value)) {
      if (isActive.value !== value) {
        firstEnter = true;
      }
      isActive.value = value;
    }
  });
  const availableEvents = {
    click: (e2) => {
      e2.stopPropagation();
      activatorEl.value = e2.currentTarget || e2.target;
      isActive.value = !isActive.value;
    },
    mouseenter: (e2) => {
      isHovered = true;
      activatorEl.value = e2.currentTarget || e2.target;
      runOpenDelay();
    },
    mouseleave: (e2) => {
      isHovered = false;
      runCloseDelay();
    },
    focus: (e2) => {
      if (SUPPORTS_FOCUS_VISIBLE && !e2.target.matches(":focus-visible"))
        return;
      isFocused = true;
      e2.stopPropagation();
      activatorEl.value = e2.currentTarget || e2.target;
      runOpenDelay();
    },
    blur: (e2) => {
      isFocused = false;
      e2.stopPropagation();
      runCloseDelay();
    }
  };
  const activatorEvents = computed(() => {
    const events = {};
    if (openOnClick.value) {
      events.click = availableEvents.click;
    }
    if (props.openOnHover) {
      events.mouseenter = availableEvents.mouseenter;
      events.mouseleave = availableEvents.mouseleave;
    }
    if (openOnFocus.value) {
      events.focus = availableEvents.focus;
      events.blur = availableEvents.blur;
    }
    return events;
  });
  const contentEvents = computed(() => {
    const events = {};
    if (props.openOnHover) {
      events.mouseenter = () => {
        isHovered = true;
        runOpenDelay();
      };
      events.mouseleave = () => {
        isHovered = false;
        runCloseDelay();
      };
    }
    if (props.closeOnContentClick) {
      const menu = inject$1(VMenuSymbol, null);
      events.click = () => {
        isActive.value = false;
        menu == null ? void 0 : menu.closeParents();
      };
    }
    return events;
  });
  const scrimEvents = computed(() => {
    const events = {};
    if (props.openOnHover) {
      events.mouseenter = () => {
        if (firstEnter) {
          isHovered = true;
          firstEnter = false;
          runOpenDelay();
        }
      };
      events.mouseleave = () => {
        isHovered = false;
        runCloseDelay();
      };
    }
    return events;
  });
  watch(isTop, (val) => {
    if (val && (props.openOnHover && !isHovered && (!openOnFocus.value || !isFocused) || openOnFocus.value && !isFocused && (!props.openOnHover || !isHovered))) {
      isActive.value = false;
    }
  });
  const activatorRef = ref();
  watchEffect(() => {
    if (!activatorRef.value)
      return;
    nextTick(() => {
      const activator = activatorRef.value;
      activatorEl.value = isComponentInstance(activator) ? activator.$el : activator;
    });
  });
  const vm = getCurrentInstance("useActivator");
  let scope;
  watch(() => !!props.activator, (val) => {
    if (val && IN_BROWSER) {
      scope = effectScope();
      scope.run(() => {
        _useActivator(props, vm, {
          activatorEl,
          activatorEvents
        });
      });
    } else if (scope) {
      scope.stop();
    }
  }, {
    flush: "post",
    immediate: true
  });
  onScopeDispose(() => {
    var _scope;
    (_scope = scope) == null ? void 0 : _scope.stop();
  });
  return {
    activatorEl,
    activatorRef,
    activatorEvents,
    contentEvents,
    scrimEvents
  };
}
function _useActivator(props, vm, _ref2) {
  let {
    activatorEl,
    activatorEvents
  } = _ref2;
  watch(() => props.activator, (val, oldVal) => {
    if (oldVal && val !== oldVal) {
      const activator = getActivator(oldVal);
      activator && unbindActivatorProps(activator);
    }
    if (val) {
      nextTick(() => bindActivatorProps());
    }
  }, {
    immediate: true
  });
  watch(() => props.activatorProps, () => {
    bindActivatorProps();
  });
  onScopeDispose(() => {
    unbindActivatorProps();
  });
  function bindActivatorProps() {
    let el = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : getActivator();
    let _props = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : props.activatorProps;
    if (!el)
      return;
    Object.entries(activatorEvents.value).forEach((_ref3) => {
      let [name2, cb] = _ref3;
      el.addEventListener(name2, cb);
    });
    Object.keys(_props).forEach((k2) => {
      if (_props[k2] == null) {
        el.removeAttribute(k2);
      } else {
        el.setAttribute(k2, _props[k2]);
      }
    });
  }
  function unbindActivatorProps() {
    let el = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : getActivator();
    let _props = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : props.activatorProps;
    if (!el)
      return;
    Object.entries(activatorEvents.value).forEach((_ref4) => {
      let [name2, cb] = _ref4;
      el.removeEventListener(name2, cb);
    });
    Object.keys(_props).forEach((k2) => {
      el.removeAttribute(k2);
    });
  }
  function getActivator() {
    var _activator;
    let selector = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : props.activator;
    let activator;
    if (selector) {
      if (selector === "parent") {
        var _vm$proxy, _vm$proxy$$el;
        let el = vm == null ? void 0 : (_vm$proxy = vm.proxy) == null ? void 0 : (_vm$proxy$$el = _vm$proxy.$el) == null ? void 0 : _vm$proxy$$el.parentNode;
        while (el.hasAttribute("data-no-activator")) {
          el = el.parentNode;
        }
        activator = el;
      } else if (typeof selector === "string") {
        activator = document.querySelector(selector);
      } else if ("$el" in selector) {
        activator = selector.$el;
      } else {
        activator = selector;
      }
    }
    activatorEl.value = ((_activator = activator) == null ? void 0 : _activator.nodeType) === Node.ELEMENT_NODE ? activator : null;
    return activatorEl.value;
  }
}
const makeLazyProps = propsFactory({
  eager: Boolean
}, "lazy");
function useLazy(props, active) {
  const isBooted = ref(false);
  const hasContent = computed(() => isBooted.value || props.eager || active.value);
  watch(active, () => isBooted.value = true);
  function onAfterLeave() {
    if (!props.eager)
      isBooted.value = false;
  }
  return {
    isBooted,
    hasContent,
    onAfterLeave
  };
}
function elementToViewport(point, offset) {
  return {
    x: point.x + offset.x,
    y: point.y + offset.y
  };
}
function getOffset$1(a, b) {
  return {
    x: a.x - b.x,
    y: a.y - b.y
  };
}
function anchorToPoint(anchor, box) {
  if (anchor.side === "top" || anchor.side === "bottom") {
    const {
      side,
      align
    } = anchor;
    const x2 = align === "left" ? 0 : align === "center" ? box.width / 2 : align === "right" ? box.width : align;
    const y = side === "top" ? 0 : side === "bottom" ? box.height : side;
    return elementToViewport({
      x: x2,
      y
    }, box);
  } else if (anchor.side === "left" || anchor.side === "right") {
    const {
      side,
      align
    } = anchor;
    const x2 = side === "left" ? 0 : side === "right" ? box.width : side;
    const y = align === "top" ? 0 : align === "center" ? box.height / 2 : align === "bottom" ? box.height : align;
    return elementToViewport({
      x: x2,
      y
    }, box);
  }
  return elementToViewport({
    x: box.width / 2,
    y: box.height / 2
  }, box);
}
const locationStrategies = {
  static: staticLocationStrategy,
  // specific viewport position, usually centered
  connected: connectedLocationStrategy
  // connected to a certain element
};
const makeLocationStrategyProps = propsFactory({
  locationStrategy: {
    type: [String, Function],
    default: "static",
    validator: (val) => typeof val === "function" || val in locationStrategies
  },
  location: {
    type: String,
    default: "bottom"
  },
  origin: {
    type: String,
    default: "auto"
  },
  offset: [Number, String, Array]
}, "v-overlay-location-strategies");
function useLocationStrategies(props, data2) {
  const contentStyles = ref({});
  const updateLocation = ref();
  let scope;
  watchEffect(async () => {
    var _scope;
    (_scope = scope) == null ? void 0 : _scope.stop();
    updateLocation.value = void 0;
    if (!(IN_BROWSER && data2.isActive.value && props.locationStrategy))
      return;
    scope = effectScope();
    if (!(props.locationStrategy === "connected")) {
      await nextTick();
    }
    scope.run(() => {
      if (typeof props.locationStrategy === "function") {
        var _props$locationStrate;
        updateLocation.value = (_props$locationStrate = props.locationStrategy(data2, props, contentStyles)) == null ? void 0 : _props$locationStrate.updateLocation;
      } else {
        var _locationStrategies$p;
        updateLocation.value = (_locationStrategies$p = locationStrategies[props.locationStrategy](data2, props, contentStyles)) == null ? void 0 : _locationStrategies$p.updateLocation;
      }
    });
  });
  IN_BROWSER && window.addEventListener("resize", onResize, {
    passive: true
  });
  onScopeDispose(() => {
    var _scope2;
    IN_BROWSER && window.removeEventListener("resize", onResize);
    updateLocation.value = void 0;
    (_scope2 = scope) == null ? void 0 : _scope2.stop();
  });
  function onResize(e2) {
    var _updateLocation$value;
    (_updateLocation$value = updateLocation.value) == null ? void 0 : _updateLocation$value.call(updateLocation, e2);
  }
  return {
    contentStyles,
    updateLocation
  };
}
function staticLocationStrategy() {
}
function getIntrinsicSize(el) {
  const contentBox = nullifyTransforms(el);
  contentBox.x -= parseFloat(el.style.left || 0);
  contentBox.y -= parseFloat(el.style.top || 0);
  return contentBox;
}
function connectedLocationStrategy(data2, props, contentStyles) {
  const activatorFixed = isFixedPosition(data2.activatorEl.value);
  if (activatorFixed) {
    Object.assign(contentStyles.value, {
      position: "fixed"
    });
  }
  const {
    preferredAnchor,
    preferredOrigin
  } = destructComputed(() => {
    const parsedAnchor = parseAnchor(props.location, data2.isRtl.value);
    const parsedOrigin = props.origin === "overlap" ? parsedAnchor : props.origin === "auto" ? flipSide(parsedAnchor) : parseAnchor(props.origin, data2.isRtl.value);
    if (parsedAnchor.side === parsedOrigin.side && parsedAnchor.align === flipAlign(parsedOrigin).align) {
      return {
        preferredAnchor: flipCorner(parsedAnchor),
        preferredOrigin: flipCorner(parsedOrigin)
      };
    } else {
      return {
        preferredAnchor: parsedAnchor,
        preferredOrigin: parsedOrigin
      };
    }
  });
  const [minWidth, minHeight, maxWidth, maxHeight] = ["minWidth", "minHeight", "maxWidth", "maxHeight"].map((key) => {
    return computed(() => {
      const val = parseFloat(props[key]);
      return isNaN(val) ? Infinity : val;
    });
  });
  const offset = computed(() => {
    if (Array.isArray(props.offset)) {
      return props.offset;
    }
    if (typeof props.offset === "string") {
      const offset2 = props.offset.split(" ").map(parseFloat);
      if (offset2.length < 2)
        offset2.push(0);
      return offset2;
    }
    return typeof props.offset === "number" ? [props.offset, 0] : [0, 0];
  });
  let observe = false;
  const observer = new ResizeObserver(() => {
    if (observe)
      updateLocation();
  });
  watch([data2.activatorEl, data2.contentEl], (_ref, _ref2) => {
    let [newActivatorEl, newContentEl] = _ref;
    let [oldActivatorEl, oldContentEl] = _ref2;
    if (oldActivatorEl)
      observer.unobserve(oldActivatorEl);
    if (newActivatorEl)
      observer.observe(newActivatorEl);
    if (oldContentEl)
      observer.unobserve(oldContentEl);
    if (newContentEl)
      observer.observe(newContentEl);
  }, {
    immediate: true
  });
  onScopeDispose(() => {
    observer.disconnect();
  });
  function updateLocation() {
    observe = false;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => observe = true);
    });
    if (!data2.activatorEl.value || !data2.contentEl.value)
      return;
    const targetBox = data2.activatorEl.value.getBoundingClientRect();
    const contentBox = getIntrinsicSize(data2.contentEl.value);
    const scrollParents = getScrollParents(data2.contentEl.value);
    const viewportMargin = 12;
    if (!scrollParents.length) {
      scrollParents.push(document.documentElement);
      if (!(data2.contentEl.value.style.top && data2.contentEl.value.style.left)) {
        contentBox.x += parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-x") || 0);
        contentBox.y += parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-y") || 0);
      }
    }
    const viewport = scrollParents.reduce((box, el) => {
      const rect = el.getBoundingClientRect();
      const scrollBox = new Box({
        x: el === document.documentElement ? 0 : rect.x,
        y: el === document.documentElement ? 0 : rect.y,
        width: el.clientWidth,
        height: el.clientHeight
      });
      if (box) {
        return new Box({
          x: Math.max(box.left, scrollBox.left),
          y: Math.max(box.top, scrollBox.top),
          width: Math.min(box.right, scrollBox.right) - Math.max(box.left, scrollBox.left),
          height: Math.min(box.bottom, scrollBox.bottom) - Math.max(box.top, scrollBox.top)
        });
      }
      return scrollBox;
    }, void 0);
    viewport.x += viewportMargin;
    viewport.y += viewportMargin;
    viewport.width -= viewportMargin * 2;
    viewport.height -= viewportMargin * 2;
    let placement = {
      anchor: preferredAnchor.value,
      origin: preferredOrigin.value
    };
    function checkOverflow(_placement) {
      const box = new Box(contentBox);
      const targetPoint = anchorToPoint(_placement.anchor, targetBox);
      const contentPoint = anchorToPoint(_placement.origin, box);
      let {
        x: x3,
        y: y2
      } = getOffset$1(targetPoint, contentPoint);
      switch (_placement.anchor.side) {
        case "top":
          y2 -= offset.value[0];
          break;
        case "bottom":
          y2 += offset.value[0];
          break;
        case "left":
          x3 -= offset.value[0];
          break;
        case "right":
          x3 += offset.value[0];
          break;
      }
      switch (_placement.anchor.align) {
        case "top":
          y2 -= offset.value[1];
          break;
        case "bottom":
          y2 += offset.value[1];
          break;
        case "left":
          x3 -= offset.value[1];
          break;
        case "right":
          x3 += offset.value[1];
          break;
      }
      box.x += x3;
      box.y += y2;
      box.width = Math.min(box.width, maxWidth.value);
      box.height = Math.min(box.height, maxHeight.value);
      const overflows = getOverflow(box, viewport);
      return {
        overflows,
        x: x3,
        y: y2
      };
    }
    let x2 = 0;
    let y = 0;
    const available = {
      x: 0,
      y: 0
    };
    const flipped = {
      x: false,
      y: false
    };
    let resets = -1;
    while (true) {
      if (resets++ > 10) {
        consoleError("Infinite loop detected in connectedLocationStrategy");
        break;
      }
      const {
        x: _x,
        y: _y,
        overflows
      } = checkOverflow(placement);
      x2 += _x;
      y += _y;
      contentBox.x += _x;
      contentBox.y += _y;
      {
        const axis2 = getAxis(placement.anchor);
        const hasOverflowX = overflows.x.before || overflows.x.after;
        const hasOverflowY = overflows.y.before || overflows.y.after;
        let reset = false;
        ["x", "y"].forEach((key) => {
          if (key === "x" && hasOverflowX && !flipped.x || key === "y" && hasOverflowY && !flipped.y) {
            const newPlacement = {
              anchor: {
                ...placement.anchor
              },
              origin: {
                ...placement.origin
              }
            };
            const flip = key === "x" ? axis2 === "y" ? flipAlign : flipSide : axis2 === "y" ? flipSide : flipAlign;
            newPlacement.anchor = flip(newPlacement.anchor);
            newPlacement.origin = flip(newPlacement.origin);
            const {
              overflows: newOverflows
            } = checkOverflow(newPlacement);
            if (newOverflows[key].before <= overflows[key].before && newOverflows[key].after <= overflows[key].after || newOverflows[key].before + newOverflows[key].after < (overflows[key].before + overflows[key].after) / 2) {
              placement = newPlacement;
              reset = flipped[key] = true;
            }
          }
        });
        if (reset)
          continue;
      }
      if (overflows.x.before) {
        x2 += overflows.x.before;
        contentBox.x += overflows.x.before;
      }
      if (overflows.x.after) {
        x2 -= overflows.x.after;
        contentBox.x -= overflows.x.after;
      }
      if (overflows.y.before) {
        y += overflows.y.before;
        contentBox.y += overflows.y.before;
      }
      if (overflows.y.after) {
        y -= overflows.y.after;
        contentBox.y -= overflows.y.after;
      }
      {
        const overflows2 = getOverflow(contentBox, viewport);
        available.x = viewport.width - overflows2.x.before - overflows2.x.after;
        available.y = viewport.height - overflows2.y.before - overflows2.y.after;
        x2 += overflows2.x.before;
        contentBox.x += overflows2.x.before;
        y += overflows2.y.before;
        contentBox.y += overflows2.y.before;
      }
      break;
    }
    const axis = getAxis(placement.anchor);
    Object.assign(contentStyles.value, {
      "--v-overlay-anchor-origin": `${placement.anchor.side} ${placement.anchor.align}`,
      transformOrigin: `${placement.origin.side} ${placement.origin.align}`,
      // transform: `translate(${pixelRound(x)}px, ${pixelRound(y)}px)`,
      top: convertToUnit(pixelRound(y)),
      left: convertToUnit(pixelRound(x2)),
      minWidth: convertToUnit(axis === "y" ? Math.min(minWidth.value, targetBox.width) : minWidth.value),
      maxWidth: convertToUnit(pixelCeil(clamp(available.x, minWidth.value === Infinity ? 0 : minWidth.value, maxWidth.value))),
      maxHeight: convertToUnit(pixelCeil(clamp(available.y, minHeight.value === Infinity ? 0 : minHeight.value, maxHeight.value)))
    });
  }
  watch(() => [preferredAnchor.value, preferredOrigin.value, props.offset, props.minWidth, props.minHeight, props.maxWidth, props.maxHeight], () => updateLocation(), {
    immediate: !activatorFixed
  });
  if (activatorFixed)
    nextTick(() => updateLocation());
  requestAnimationFrame(() => {
    if (contentStyles.value.maxHeight)
      updateLocation();
  });
  return {
    updateLocation
  };
}
function pixelRound(val) {
  return Math.round(val * devicePixelRatio) / devicePixelRatio;
}
function pixelCeil(val) {
  return Math.ceil(val * devicePixelRatio) / devicePixelRatio;
}
let clean = true;
const frames = [];
function requestNewFrame(cb) {
  if (!clean || frames.length) {
    frames.push(cb);
    run();
  } else {
    clean = false;
    cb();
    run();
  }
}
let raf = -1;
function run() {
  cancelAnimationFrame(raf);
  raf = requestAnimationFrame(() => {
    const frame = frames.shift();
    if (frame)
      frame();
    if (frames.length)
      run();
    else
      clean = true;
  });
}
const scrollStrategies = {
  none: null,
  close: closeScrollStrategy,
  block: blockScrollStrategy,
  reposition: repositionScrollStrategy
};
const makeScrollStrategyProps = propsFactory({
  scrollStrategy: {
    type: [String, Function],
    default: "block",
    validator: (val) => typeof val === "function" || val in scrollStrategies
  }
}, "v-overlay-scroll-strategies");
function useScrollStrategies(props, data2) {
  if (!IN_BROWSER)
    return;
  let scope;
  watchEffect(async () => {
    var _scope;
    (_scope = scope) == null ? void 0 : _scope.stop();
    if (!(data2.isActive.value && props.scrollStrategy))
      return;
    scope = effectScope();
    await nextTick();
    scope.run(() => {
      if (typeof props.scrollStrategy === "function") {
        props.scrollStrategy(data2, props);
      } else {
        var _scrollStrategies$pro;
        (_scrollStrategies$pro = scrollStrategies[props.scrollStrategy]) == null ? void 0 : _scrollStrategies$pro.call(scrollStrategies, data2, props);
      }
    });
  });
  onScopeDispose(() => {
    var _scope2;
    (_scope2 = scope) == null ? void 0 : _scope2.stop();
  });
}
function closeScrollStrategy(data2) {
  function onScroll(e2) {
    data2.isActive.value = false;
  }
  bindScroll(data2.activatorEl.value ?? data2.contentEl.value, onScroll);
}
function blockScrollStrategy(data2, props) {
  var _data$root$value;
  const offsetParent = (_data$root$value = data2.root.value) == null ? void 0 : _data$root$value.offsetParent;
  const scrollElements = [.../* @__PURE__ */ new Set([...getScrollParents(data2.activatorEl.value, props.contained ? offsetParent : void 0), ...getScrollParents(data2.contentEl.value, props.contained ? offsetParent : void 0)])].filter((el) => !el.classList.contains("v-overlay-scroll-blocked"));
  const scrollbarWidth = window.innerWidth - document.documentElement.offsetWidth;
  const scrollableParent = ((el) => hasScrollbar(el) && el)(offsetParent || document.documentElement);
  if (scrollableParent) {
    data2.root.value.classList.add("v-overlay--scroll-blocked");
  }
  scrollElements.forEach((el, i2) => {
    el.style.setProperty("--v-body-scroll-x", convertToUnit(-el.scrollLeft));
    el.style.setProperty("--v-body-scroll-y", convertToUnit(-el.scrollTop));
    el.style.setProperty("--v-scrollbar-offset", convertToUnit(scrollbarWidth));
    el.classList.add("v-overlay-scroll-blocked");
  });
  onScopeDispose(() => {
    scrollElements.forEach((el, i2) => {
      const x2 = parseFloat(el.style.getPropertyValue("--v-body-scroll-x"));
      const y = parseFloat(el.style.getPropertyValue("--v-body-scroll-y"));
      el.style.removeProperty("--v-body-scroll-x");
      el.style.removeProperty("--v-body-scroll-y");
      el.style.removeProperty("--v-scrollbar-offset");
      el.classList.remove("v-overlay-scroll-blocked");
      el.scrollLeft = -x2;
      el.scrollTop = -y;
    });
    if (scrollableParent) {
      data2.root.value.classList.remove("v-overlay--scroll-blocked");
    }
  });
}
function repositionScrollStrategy(data2) {
  let slow = false;
  let raf2 = -1;
  function update(e2) {
    requestNewFrame(() => {
      var _data$updateLocation$, _data$updateLocation;
      const start = performance.now();
      (_data$updateLocation$ = (_data$updateLocation = data2.updateLocation).value) == null ? void 0 : _data$updateLocation$.call(_data$updateLocation, e2);
      const time = performance.now() - start;
      slow = time / (1e3 / 60) > 2;
    });
  }
  bindScroll(data2.activatorEl.value ?? data2.contentEl.value, (e2) => {
    if (slow) {
      cancelAnimationFrame(raf2);
      raf2 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => {
          update(e2);
        });
      });
    } else {
      update(e2);
    }
  });
}
function bindScroll(el, onScroll) {
  const scrollElements = [document, ...getScrollParents(el)];
  scrollElements.forEach((el2) => {
    el2.addEventListener("scroll", onScroll, {
      passive: true
    });
  });
  onScopeDispose(() => {
    scrollElements.forEach((el2) => {
      el2.removeEventListener("scroll", onScroll);
    });
  });
}
function useHydration() {
  if (!IN_BROWSER)
    return ref(false);
  const {
    ssr
  } = useDisplay();
  if (ssr) {
    const isMounted = ref(false);
    onMounted(() => {
      isMounted.value = true;
    });
    return isMounted;
  } else {
    return ref(true);
  }
}
function useScopeId() {
  const vm = getCurrentInstance("useScopeId");
  const scopeId = vm.vnode.scopeId;
  return {
    scopeId: scopeId ? {
      [scopeId]: ""
    } : void 0
  };
}
const StackSymbol = Symbol.for("vuetify:stack");
const globalStack = reactive([]);
function useStack(isActive, zIndex, disableGlobalStack) {
  const vm = getCurrentInstance("useStack");
  const createStackEntry = !disableGlobalStack;
  const parent = inject$1(StackSymbol, void 0);
  const stack = reactive({
    activeChildren: /* @__PURE__ */ new Set()
  });
  provide(StackSymbol, stack);
  const _zIndex = ref(+zIndex.value);
  useToggleScope(isActive, () => {
    var _globalStack$at;
    const lastZIndex = (_globalStack$at = globalStack.at(-1)) == null ? void 0 : _globalStack$at[1];
    _zIndex.value = lastZIndex ? lastZIndex + 10 : +zIndex.value;
    if (createStackEntry) {
      globalStack.push([vm.uid, _zIndex.value]);
    }
    parent == null ? void 0 : parent.activeChildren.add(vm.uid);
    onScopeDispose(() => {
      if (createStackEntry) {
        const idx = globalStack.findIndex((v) => v[0] === vm.uid);
        globalStack.splice(idx, 1);
      }
      parent == null ? void 0 : parent.activeChildren.delete(vm.uid);
    });
  });
  const globalTop = ref(true);
  if (createStackEntry) {
    watchEffect(() => {
      var _globalStack$at2;
      const _isTop = ((_globalStack$at2 = globalStack.at(-1)) == null ? void 0 : _globalStack$at2[0]) === vm.uid;
      setTimeout(() => globalTop.value = _isTop);
    });
  }
  const localTop = computed(() => !stack.activeChildren.size);
  return {
    globalTop: readonly(globalTop),
    localTop,
    stackStyles: computed(() => ({
      zIndex: _zIndex.value
    }))
  };
}
function useTeleport(target) {
  const teleportTarget = computed(() => {
    const _target = target.value;
    if (_target === true || !IN_BROWSER)
      return void 0;
    const targetElement = _target === false ? document.body : typeof _target === "string" ? document.querySelector(_target) : _target;
    if (targetElement == null) {
      return void 0;
    }
    if (!useTeleport.cache.has(targetElement)) {
      const el = document.createElement("div");
      el.className = "v-overlay-container";
      targetElement.appendChild(el);
      useTeleport.cache.set(targetElement, el);
    }
    return useTeleport.cache.get(targetElement);
  });
  return {
    teleportTarget
  };
}
useTeleport.cache = /* @__PURE__ */ new WeakMap();
function defaultConditional() {
  return true;
}
function checkEvent(e2, el, binding) {
  if (!e2 || checkIsActive(e2, binding) === false)
    return false;
  const root = attachedRoot(el);
  if (typeof ShadowRoot !== "undefined" && root instanceof ShadowRoot && root.host === e2.target)
    return false;
  const elements = (typeof binding.value === "object" && binding.value.include || (() => []))();
  elements.push(el);
  return !elements.some((el2) => el2 == null ? void 0 : el2.contains(e2.target));
}
function checkIsActive(e2, binding) {
  const isActive = typeof binding.value === "object" && binding.value.closeConditional || defaultConditional;
  return isActive(e2);
}
function directive(e2, el, binding) {
  const handler = typeof binding.value === "function" ? binding.value : binding.value.handler;
  el._clickOutside.lastMousedownWasOutside && checkEvent(e2, el, binding) && setTimeout(() => {
    checkIsActive(e2, binding) && handler && handler(e2);
  }, 0);
}
function handleShadow(el, callback) {
  const root = attachedRoot(el);
  callback(document);
  if (typeof ShadowRoot !== "undefined" && root instanceof ShadowRoot) {
    callback(root);
  }
}
const ClickOutside = {
  // [data-app] may not be found
  // if using bind, inserted makes
  // sure that the root element is
  // available, iOS does not support
  // clicks on body
  mounted(el, binding) {
    const onClick = (e2) => directive(e2, el, binding);
    const onMousedown = (e2) => {
      el._clickOutside.lastMousedownWasOutside = checkEvent(e2, el, binding);
    };
    handleShadow(el, (app2) => {
      app2.addEventListener("click", onClick, true);
      app2.addEventListener("mousedown", onMousedown, true);
    });
    if (!el._clickOutside) {
      el._clickOutside = {
        lastMousedownWasOutside: true
      };
    }
    el._clickOutside[binding.instance.$.uid] = {
      onClick,
      onMousedown
    };
  },
  unmounted(el, binding) {
    if (!el._clickOutside)
      return;
    handleShadow(el, (app2) => {
      var _el$_clickOutside;
      if (!app2 || !((_el$_clickOutside = el._clickOutside) != null && _el$_clickOutside[binding.instance.$.uid]))
        return;
      const {
        onClick,
        onMousedown
      } = el._clickOutside[binding.instance.$.uid];
      app2.removeEventListener("click", onClick, true);
      app2.removeEventListener("mousedown", onMousedown, true);
    });
    delete el._clickOutside[binding.instance.$.uid];
  }
};
function Scrim(props) {
  const {
    modelValue,
    color,
    ...rest
  } = props;
  return createVNode(Transition, {
    "name": "fade-transition",
    "appear": true
  }, {
    default: () => [props.modelValue && createVNode("div", mergeProps({
      "class": ["v-overlay__scrim", props.color.backgroundColorClasses.value],
      "style": props.color.backgroundColorStyles.value
    }, rest), null)]
  });
}
const makeVOverlayProps = propsFactory({
  absolute: Boolean,
  attach: [Boolean, String, Object],
  closeOnBack: {
    type: Boolean,
    default: true
  },
  contained: Boolean,
  contentClass: null,
  contentProps: null,
  disabled: Boolean,
  noClickAnimation: Boolean,
  modelValue: Boolean,
  persistent: Boolean,
  scrim: {
    type: [String, Boolean],
    default: true
  },
  zIndex: {
    type: [Number, String],
    default: 2e3
  },
  ...makeActivatorProps(),
  ...makeDimensionProps(),
  ...makeLazyProps(),
  ...makeLocationStrategyProps(),
  ...makeScrollStrategyProps(),
  ...makeThemeProps(),
  ...makeTransitionProps()
}, "v-overlay");
const VOverlay = genericComponent()({
  name: "VOverlay",
  directives: {
    ClickOutside
  },
  inheritAttrs: false,
  props: {
    _disableGlobalStack: Boolean,
    ...makeVOverlayProps()
  },
  emits: {
    "click:outside": (e2) => true,
    "update:modelValue": (value) => true,
    afterLeave: () => true
  },
  setup(props, _ref) {
    let {
      slots,
      attrs,
      emit
    } = _ref;
    const model = useProxiedModel(props, "modelValue");
    const isActive = computed({
      get: () => model.value,
      set: (v) => {
        if (!(v && props.disabled))
          model.value = v;
      }
    });
    const {
      teleportTarget
    } = useTeleport(computed(() => props.attach || props.contained));
    const {
      themeClasses
    } = provideTheme(props);
    const {
      rtlClasses,
      isRtl
    } = useRtl();
    const {
      hasContent,
      onAfterLeave
    } = useLazy(props, isActive);
    const scrimColor = useBackgroundColor(computed(() => {
      return typeof props.scrim === "string" ? props.scrim : null;
    }));
    const {
      globalTop,
      localTop,
      stackStyles
    } = useStack(isActive, toRef(props, "zIndex"), props._disableGlobalStack);
    const {
      activatorEl,
      activatorRef,
      activatorEvents,
      contentEvents,
      scrimEvents
    } = useActivator(props, {
      isActive,
      isTop: localTop
    });
    const {
      dimensionStyles
    } = useDimension(props);
    const isMounted = useHydration();
    const {
      scopeId
    } = useScopeId();
    watch(() => props.disabled, (v) => {
      if (v)
        isActive.value = false;
    });
    const root = ref();
    const contentEl = ref();
    const {
      contentStyles,
      updateLocation
    } = useLocationStrategies(props, {
      isRtl,
      contentEl,
      activatorEl,
      isActive
    });
    useScrollStrategies(props, {
      root,
      contentEl,
      activatorEl,
      isActive,
      updateLocation
    });
    function onClickOutside(e2) {
      emit("click:outside", e2);
      if (!props.persistent)
        isActive.value = false;
      else
        animateClick();
    }
    function closeConditional() {
      return isActive.value && globalTop.value;
    }
    IN_BROWSER && watch(isActive, (val) => {
      if (val) {
        window.addEventListener("keydown", onKeydown);
      } else {
        window.removeEventListener("keydown", onKeydown);
      }
    }, {
      immediate: true
    });
    function onKeydown(e2) {
      if (e2.key === "Escape" && globalTop.value) {
        if (!props.persistent) {
          isActive.value = false;
        } else
          animateClick();
      }
    }
    const router2 = useRouter();
    useToggleScope(() => props.closeOnBack, () => {
      useBackButton(router2, (next) => {
        if (globalTop.value && isActive.value) {
          next(false);
          if (!props.persistent)
            isActive.value = false;
          else
            animateClick();
        } else {
          next();
        }
      });
    });
    const top = ref();
    watch(() => isActive.value && (props.absolute || props.contained) && teleportTarget.value == null, (val) => {
      if (val) {
        const scrollParent = getScrollParent(root.value);
        if (scrollParent && scrollParent !== document.scrollingElement) {
          top.value = scrollParent.scrollTop;
        }
      }
    });
    function animateClick() {
      if (props.noClickAnimation)
        return;
      contentEl.value && animate(contentEl.value, [{
        transformOrigin: "center"
      }, {
        transform: "scale(1.03)"
      }, {
        transformOrigin: "center"
      }], {
        duration: 150,
        easing: standardEasing
      });
    }
    useRender(() => {
      var _slots$activator, _slots$default;
      return createVNode(Fragment, null, [(_slots$activator = slots.activator) == null ? void 0 : _slots$activator.call(slots, {
        isActive: isActive.value,
        props: mergeProps({
          ref: activatorRef
        }, toHandlers(activatorEvents.value), props.activatorProps)
      }), isMounted.value && createVNode(Teleport, {
        "disabled": !teleportTarget.value,
        "to": teleportTarget.value
      }, {
        default: () => [hasContent.value && createVNode("div", mergeProps({
          "class": ["v-overlay", {
            "v-overlay--absolute": props.absolute || props.contained,
            "v-overlay--active": isActive.value,
            "v-overlay--contained": props.contained
          }, themeClasses.value, rtlClasses.value],
          "style": [stackStyles.value, {
            top: convertToUnit(top.value)
          }],
          "ref": root
        }, scopeId, attrs), [createVNode(Scrim, mergeProps({
          "color": scrimColor,
          "modelValue": isActive.value && !!props.scrim
        }, toHandlers(scrimEvents.value)), null), createVNode(MaybeTransition, {
          "appear": true,
          "persisted": true,
          "transition": props.transition,
          "target": activatorEl.value,
          "onAfterLeave": () => {
            onAfterLeave();
            emit("afterLeave");
          }
        }, {
          default: () => [withDirectives(createVNode("div", mergeProps({
            "ref": contentEl,
            "class": ["v-overlay__content", props.contentClass],
            "style": [dimensionStyles.value, contentStyles.value]
          }, toHandlers(contentEvents.value), props.contentProps), [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, {
            isActive
          })]), [[vShow, isActive.value], [resolveDirective("click-outside"), {
            handler: onClickOutside,
            closeConditional,
            include: () => [activatorEl.value]
          }]])]
        })])]
      })]);
    });
    return {
      activatorEl,
      animateClick,
      contentEl,
      globalTop,
      localTop,
      updateLocation
    };
  }
});
function filterVOverlayProps(props) {
  return pick(props, Object.keys(VOverlay.props));
}
const VMenu = genericComponent()({
  name: "VMenu",
  props: {
    // TODO
    // disableKeys: Boolean,
    id: String,
    ...omit(makeVOverlayProps({
      closeDelay: 250,
      closeOnContentClick: true,
      locationStrategy: "connected",
      openDelay: 300,
      scrim: false,
      scrollStrategy: "reposition",
      transition: {
        component: VDialogTransition
      }
    }), ["absolute"])
  },
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const isActive = useProxiedModel(props, "modelValue");
    const {
      scopeId
    } = useScopeId();
    const uid2 = getUid();
    const id2 = computed(() => props.id || `v-menu-${uid2}`);
    const overlay = ref();
    const parent = inject$1(VMenuSymbol, null);
    let openChildren = 0;
    provide(VMenuSymbol, {
      register() {
        ++openChildren;
      },
      unregister() {
        --openChildren;
      },
      closeParents() {
        setTimeout(() => {
          if (!openChildren) {
            isActive.value = false;
            parent == null ? void 0 : parent.closeParents();
          }
        }, 40);
      }
    });
    watch(isActive, (val) => {
      val ? parent == null ? void 0 : parent.register() : parent == null ? void 0 : parent.unregister();
    });
    function onClickOutside() {
      parent == null ? void 0 : parent.closeParents();
    }
    useRender(() => {
      const [overlayProps] = filterVOverlayProps(props);
      return createVNode(VOverlay, mergeProps({
        "ref": overlay,
        "class": ["v-menu"]
      }, overlayProps, {
        "modelValue": isActive.value,
        "onUpdate:modelValue": ($event) => isActive.value = $event,
        "absolute": true,
        "activatorProps": mergeProps({
          "aria-haspopup": "menu",
          "aria-expanded": String(isActive.value),
          "aria-owns": id2.value
        }, props.activatorProps),
        "onClick:outside": onClickOutside
      }, scopeId), {
        activator: slots.activator,
        default: function() {
          var _slots$default;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          return createVNode(VDefaultsProvider, {
            "root": true
          }, {
            default: () => [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, ...args)]
          });
        }
      });
    });
    return forwardRefs({
      id: id2
    }, overlay);
  }
});
const makeSelectProps = propsFactory({
  chips: Boolean,
  closableChips: Boolean,
  eager: Boolean,
  hideNoData: Boolean,
  hideSelected: Boolean,
  menu: Boolean,
  menuIcon: {
    type: IconValue,
    default: "$dropdown"
  },
  menuProps: {
    type: Object
  },
  multiple: Boolean,
  noDataText: {
    type: String,
    default: "$vuetify.noDataText"
  },
  openOnClear: Boolean,
  valueComparator: {
    type: Function,
    default: deepEqual
  },
  ...makeItemsProps({
    itemChildren: false
  })
}, "v-select");
const VSelect = genericComponent()({
  name: "VSelect",
  props: {
    ...makeSelectProps(),
    ...omit(makeVTextFieldProps({
      modelValue: null
    }), ["validationValue", "dirty", "appendInnerIcon"]),
    ...makeTransitionProps({
      transition: {
        component: VDialogTransition
      }
    })
  },
  emits: {
    "update:modelValue": (val) => true,
    "update:menu": (val) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      t: t2
    } = useLocale();
    const vTextFieldRef = ref();
    const menu = useProxiedModel(props, "menu");
    const {
      items,
      transformIn,
      transformOut
    } = useItems(props);
    const model = useProxiedModel(props, "modelValue", [], (v) => transformIn(wrapInArray(v)), (v) => {
      const transformed = transformOut(v);
      return props.multiple ? transformed : transformed[0] ?? null;
    });
    const selections = computed(() => {
      return model.value.map((v) => {
        return items.value.find((item) => props.valueComparator(item.value, v.value)) || v;
      });
    });
    const selected = computed(() => selections.value.map((selection) => selection.props.value));
    const listRef = ref();
    function onClear(e2) {
      model.value = [];
      if (props.openOnClear) {
        menu.value = true;
      }
    }
    function onClickControl() {
      if (props.hideNoData && !items.value.length || props.readonly)
        return;
      menu.value = !menu.value;
    }
    function onKeydown(e2) {
      if (props.readonly)
        return;
      if (["Enter", "ArrowDown", " "].includes(e2.key)) {
        e2.preventDefault();
        menu.value = true;
      }
      if (["Escape", "Tab"].includes(e2.key)) {
        menu.value = false;
      }
      if (e2.key === "ArrowDown") {
        var _listRef$value;
        (_listRef$value = listRef.value) == null ? void 0 : _listRef$value.focus("next");
      } else if (e2.key === "ArrowUp") {
        var _listRef$value2;
        e2.preventDefault();
        (_listRef$value2 = listRef.value) == null ? void 0 : _listRef$value2.focus("prev");
      } else if (e2.key === "Home") {
        var _listRef$value3;
        e2.preventDefault();
        (_listRef$value3 = listRef.value) == null ? void 0 : _listRef$value3.focus("first");
      } else if (e2.key === "End") {
        var _listRef$value4;
        e2.preventDefault();
        (_listRef$value4 = listRef.value) == null ? void 0 : _listRef$value4.focus("last");
      }
    }
    function select(item) {
      if (props.multiple) {
        const index = selected.value.findIndex((selection) => selection === item.value);
        if (index === -1) {
          model.value = [...model.value, item];
        } else {
          const value = [...model.value];
          value.splice(index, 1);
          model.value = value;
        }
      } else {
        model.value = [item];
        menu.value = false;
      }
    }
    function onBlur(e2) {
      var _listRef$value5;
      if (!((_listRef$value5 = listRef.value) != null && _listRef$value5.$el.contains(e2.relatedTarget))) {
        menu.value = false;
      }
    }
    function onFocusout(e2) {
      if (e2.relatedTarget == null) {
        var _vTextFieldRef$value;
        (_vTextFieldRef$value = vTextFieldRef.value) == null ? void 0 : _vTextFieldRef$value.focus();
      }
    }
    useRender(() => {
      const hasChips = !!(props.chips || slots.chip);
      const [textFieldProps] = filterVTextFieldProps(props);
      return createVNode(VTextField, mergeProps({
        "ref": vTextFieldRef
      }, textFieldProps, {
        "modelValue": model.value.map((v) => v.props.value).join(", "),
        "onUpdate:modelValue": (v) => {
          if (v == null)
            model.value = [];
        },
        "validationValue": model.externalValue,
        "dirty": model.value.length > 0,
        "class": ["v-select", {
          "v-select--active-menu": menu.value,
          "v-select--chips": !!props.chips,
          [`v-select--${props.multiple ? "multiple" : "single"}`]: true,
          "v-select--selected": model.value.length
        }],
        "appendInnerIcon": props.menuIcon,
        "readonly": true,
        "onClick:clear": onClear,
        "onClick:control": onClickControl,
        "onBlur": onBlur,
        "onKeydown": onKeydown
      }), {
        ...slots,
        default: () => {
          var _slots$noData, _slots$prependItem, _slots$appendItem;
          return createVNode(Fragment, null, [createVNode(VMenu, mergeProps({
            "modelValue": menu.value,
            "onUpdate:modelValue": ($event) => menu.value = $event,
            "activator": "parent",
            "contentClass": "v-select__content",
            "eager": props.eager,
            "openOnClick": false,
            "closeOnContentClick": false,
            "transition": props.transition
          }, props.menuProps), {
            default: () => [createVNode(VList, {
              "ref": listRef,
              "selected": selected.value,
              "selectStrategy": props.multiple ? "independent" : "single-independent",
              "onMousedown": (e2) => e2.preventDefault(),
              "onFocusout": onFocusout
            }, {
              default: () => [!items.value.length && !props.hideNoData && (((_slots$noData = slots["no-data"]) == null ? void 0 : _slots$noData.call(slots)) ?? createVNode(VListItem, {
                "title": t2(props.noDataText)
              }, null)), (_slots$prependItem = slots["prepend-item"]) == null ? void 0 : _slots$prependItem.call(slots), items.value.map((item, index) => {
                if (slots.item) {
                  var _slots$item;
                  return (_slots$item = slots.item) == null ? void 0 : _slots$item.call(slots, {
                    item,
                    index,
                    props: mergeProps(item.props, {
                      onClick: () => select(item)
                    })
                  });
                }
                return createVNode(VListItem, mergeProps({
                  "key": index
                }, item.props, {
                  "onClick": () => select(item)
                }), {
                  prepend: (_ref2) => {
                    let {
                      isSelected
                    } = _ref2;
                    return props.multiple && !props.hideSelected ? createVNode(VCheckboxBtn, {
                      "modelValue": isSelected,
                      "ripple": false
                    }, null) : void 0;
                  }
                });
              }), (_slots$appendItem = slots["append-item"]) == null ? void 0 : _slots$appendItem.call(slots)]
            })]
          }), selections.value.map((item, index) => {
            function onChipClose(e2) {
              e2.stopPropagation();
              e2.preventDefault();
              select(item);
            }
            const slotProps = {
              "onClick:close": onChipClose,
              modelValue: true,
              "onUpdate:modelValue": void 0
            };
            return createVNode("div", {
              "key": item.value,
              "class": "v-select__selection"
            }, [hasChips ? createVNode(VDefaultsProvider, {
              "defaults": {
                VChip: {
                  closable: props.closableChips,
                  size: "small",
                  text: item.title
                }
              }
            }, {
              default: () => [slots.chip ? slots.chip({
                item,
                index,
                props: slotProps
              }) : createVNode(VChip, slotProps, null)]
            }) : slots.selection ? slots.selection({
              item,
              index
            }) : createVNode("span", {
              "class": "v-select__selection-text"
            }, [item.title, props.multiple && index < selections.value.length - 1 && createVNode("span", {
              "class": "v-select__selection-comma"
            }, [createTextVNode(",")])])]);
          })]);
        }
      });
    });
    return forwardRefs({
      menu,
      select
    }, vTextFieldRef);
  }
});
const defaultFilter = (value, query, item) => {
  if (value == null || query == null)
    return -1;
  return value.toString().toLocaleLowerCase().indexOf(query.toString().toLocaleLowerCase());
};
const makeFilterProps = propsFactory({
  customFilter: Function,
  customKeyFilter: Object,
  filterKeys: [Array, String],
  filterMode: {
    type: String,
    default: "intersection"
  },
  noFilter: Boolean
}, "filter");
function filterItems(items, query, options) {
  const array = [];
  const filter = (options == null ? void 0 : options.default) ?? defaultFilter;
  const keys3 = options != null && options.filterKeys ? wrapInArray(options.filterKeys) : false;
  const customFiltersLength = Object.keys((options == null ? void 0 : options.customKeyFilter) ?? {}).length;
  if (!(items != null && items.length))
    return array;
  loop:
    for (let i2 = 0; i2 < items.length; i2++) {
      const item = items[i2].raw;
      const customMatches = {};
      const defaultMatches = {};
      let match2 = -1;
      if (query && !(options != null && options.noFilter)) {
        if (typeof item === "object") {
          const filterKeys = keys3 || Object.keys(item);
          for (const key of filterKeys) {
            var _options$customKeyFil;
            const value = getPropertyFromItem(item, key, item);
            const keyFilter = options == null ? void 0 : (_options$customKeyFil = options.customKeyFilter) == null ? void 0 : _options$customKeyFil[key];
            match2 = keyFilter ? keyFilter(value, query, item) : filter(value, query, item);
            if (match2 !== -1 && match2 !== false) {
              if (keyFilter)
                customMatches[key] = match2;
              else
                defaultMatches[key] = match2;
            } else if ((options == null ? void 0 : options.filterMode) === "every") {
              continue loop;
            }
          }
        } else {
          match2 = filter(item, query, item);
          if (match2 !== -1 && match2 !== false) {
            defaultMatches.title = match2;
          }
        }
        const defaultMatchesLength = Object.keys(defaultMatches).length;
        const customMatchesLength = Object.keys(customMatches).length;
        if (!defaultMatchesLength && !customMatchesLength)
          continue;
        if ((options == null ? void 0 : options.filterMode) === "union" && customMatchesLength !== customFiltersLength && !defaultMatchesLength)
          continue;
        if ((options == null ? void 0 : options.filterMode) === "intersection" && (customMatchesLength !== customFiltersLength || !defaultMatchesLength))
          continue;
      }
      array.push({
        index: i2,
        matches: {
          ...defaultMatches,
          ...customMatches
        }
      });
    }
  return array;
}
function useFilter(props, items, query) {
  const strQuery = computed(() => typeof (query == null ? void 0 : query.value) !== "string" && typeof (query == null ? void 0 : query.value) !== "number" ? "" : String(query.value));
  const filteredItems = ref([]);
  const filteredMatches = ref(/* @__PURE__ */ new Map());
  watchEffect(() => {
    filteredItems.value = [];
    filteredMatches.value = /* @__PURE__ */ new Map();
    const transformedItems = unref(items);
    const results = filterItems(transformedItems, strQuery.value, {
      customKeyFilter: props.customKeyFilter,
      default: props.customFilter,
      filterKeys: props.filterKeys,
      filterMode: props.filterMode,
      noFilter: props.noFilter
    });
    results.forEach((_ref) => {
      let {
        index,
        matches
      } = _ref;
      const item = transformedItems[index];
      filteredItems.value.push(item);
      filteredMatches.value.set(item.value, matches);
    });
  });
  function getMatches(item) {
    return filteredMatches.value.get(item.value);
  }
  return {
    filteredItems,
    filteredMatches,
    getMatches
  };
}
function highlightResult$1(text, matches, length) {
  if (matches == null)
    return text;
  if (Array.isArray(matches))
    throw new Error("Multiple matches is not implemented");
  return typeof matches === "number" && ~matches ? createVNode(Fragment, null, [createVNode("span", {
    "class": "v-autocomplete__unmask"
  }, [text.substr(0, matches)]), createVNode("span", {
    "class": "v-autocomplete__mask"
  }, [text.substr(matches, length)]), createVNode("span", {
    "class": "v-autocomplete__unmask"
  }, [text.substr(matches + length)])]) : text;
}
const VAutocomplete = genericComponent()({
  name: "VAutocomplete",
  props: {
    // TODO: implement post keyboard support
    // autoSelectFirst: Boolean,
    search: String,
    ...makeFilterProps({
      filterKeys: ["title"]
    }),
    ...makeSelectProps(),
    ...omit(makeVTextFieldProps({
      modelValue: null
    }), ["validationValue", "dirty", "appendInnerIcon"]),
    ...makeTransitionProps({
      transition: false
    })
  },
  emits: {
    "update:search": (val) => true,
    "update:modelValue": (val) => true,
    "update:menu": (val) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      t: t2
    } = useLocale();
    const vTextFieldRef = ref();
    const isFocused = ref(false);
    const isPristine = ref(true);
    const menu = useProxiedModel(props, "menu");
    const {
      items,
      transformIn,
      transformOut
    } = useItems(props);
    const search = useProxiedModel(props, "search", "");
    const model = useProxiedModel(props, "modelValue", [], (v) => transformIn(wrapInArray(v)), (v) => {
      const transformed = transformOut(v);
      return props.multiple ? transformed : transformed[0] ?? null;
    });
    const {
      filteredItems,
      getMatches
    } = useFilter(props, items, computed(() => isPristine.value ? void 0 : search.value));
    const selections = computed(() => {
      return model.value.map((v) => {
        return items.value.find((item) => props.valueComparator(item.value, v.value)) || v;
      });
    });
    const selected = computed(() => selections.value.map((selection) => selection.props.value));
    const listRef = ref();
    function onClear(e2) {
      model.value = [];
      if (props.openOnClear) {
        menu.value = true;
      }
      search.value = "";
    }
    function onClickControl() {
      if (props.hideNoData && !items.value.length || props.readonly)
        return;
      menu.value = true;
    }
    function onKeydown(e2) {
      if (props.readonly)
        return;
      if (["Enter", "ArrowDown"].includes(e2.key)) {
        menu.value = true;
      }
      if (["Escape"].includes(e2.key)) {
        menu.value = false;
      }
      if (["Enter", "Escape", "Tab"].includes(e2.key)) {
        isPristine.value = true;
      }
      if (e2.key === "ArrowDown") {
        var _listRef$value;
        e2.preventDefault();
        (_listRef$value = listRef.value) == null ? void 0 : _listRef$value.focus("next");
      } else if (e2.key === "ArrowUp") {
        var _listRef$value2;
        e2.preventDefault();
        (_listRef$value2 = listRef.value) == null ? void 0 : _listRef$value2.focus("prev");
      }
    }
    function onInput(e2) {
      search.value = e2.target.value;
    }
    function onAfterLeave() {
      if (isFocused.value)
        isPristine.value = true;
    }
    function onFocusin(e2) {
      isFocused.value = true;
    }
    function onFocusout(e2) {
      if (e2.relatedTarget == null) {
        var _vTextFieldRef$value;
        (_vTextFieldRef$value = vTextFieldRef.value) == null ? void 0 : _vTextFieldRef$value.focus();
      }
    }
    const isSelecting = ref(false);
    function select(item) {
      if (props.multiple) {
        const index = selected.value.findIndex((selection) => selection === item.value);
        if (index === -1) {
          model.value = [...model.value, item];
          search.value = "";
        } else {
          const value = [...model.value];
          value.splice(index, 1);
          model.value = value;
        }
      } else {
        model.value = [item];
        isSelecting.value = true;
        if (!slots.selection) {
          search.value = item.title;
        }
        menu.value = false;
        isPristine.value = true;
        nextTick(() => isSelecting.value = false);
      }
    }
    watch(isFocused, (val) => {
      if (val) {
        var _selections$value$at;
        isSelecting.value = true;
        search.value = props.multiple || !!slots.selection ? "" : String(((_selections$value$at = selections.value.at(-1)) == null ? void 0 : _selections$value$at.props.title) ?? "");
        isPristine.value = true;
        nextTick(() => isSelecting.value = false);
      } else {
        menu.value = false;
        search.value = "";
      }
    });
    watch(search, (val) => {
      if (!isFocused.value || isSelecting.value)
        return;
      if (val)
        menu.value = true;
      isPristine.value = !val;
    });
    useRender(() => {
      const hasChips = !!(props.chips || slots.chip);
      const [textFieldProps] = filterVTextFieldProps(props);
      return createVNode(VTextField, mergeProps({
        "ref": vTextFieldRef
      }, textFieldProps, {
        "modelValue": search.value,
        "onUpdate:modelValue": (v) => {
          if (v == null)
            model.value = [];
        },
        "validationValue": model.externalValue,
        "dirty": model.value.length > 0,
        "onInput": onInput,
        "class": ["v-autocomplete", {
          "v-autocomplete--active-menu": menu.value,
          "v-autocomplete--chips": !!props.chips,
          [`v-autocomplete--${props.multiple ? "multiple" : "single"}`]: true,
          "v-autocomplete--selection-slot": !!slots.selection
        }],
        "appendInnerIcon": props.menuIcon,
        "readonly": props.readonly,
        "onClick:clear": onClear,
        "onClick:control": onClickControl,
        "onClick:input": onClickControl,
        "onFocus": () => isFocused.value = true,
        "onBlur": () => isFocused.value = false,
        "onKeydown": onKeydown
      }), {
        ...slots,
        default: () => {
          var _slots$noData, _slots$prependItem, _slots$appendItem;
          return createVNode(Fragment, null, [createVNode(VMenu, mergeProps({
            "modelValue": menu.value,
            "onUpdate:modelValue": ($event) => menu.value = $event,
            "activator": "parent",
            "contentClass": "v-autocomplete__content",
            "eager": props.eager,
            "openOnClick": false,
            "closeOnContentClick": false,
            "transition": props.transition,
            "onAfterLeave": onAfterLeave
          }, props.menuProps), {
            default: () => [createVNode(VList, {
              "ref": listRef,
              "selected": selected.value,
              "selectStrategy": props.multiple ? "independent" : "single-independent",
              "onMousedown": (e2) => e2.preventDefault(),
              "onFocusin": onFocusin,
              "onFocusout": onFocusout
            }, {
              default: () => [!filteredItems.value.length && !props.hideNoData && (((_slots$noData = slots["no-data"]) == null ? void 0 : _slots$noData.call(slots)) ?? createVNode(VListItem, {
                "title": t2(props.noDataText)
              }, null)), (_slots$prependItem = slots["prepend-item"]) == null ? void 0 : _slots$prependItem.call(slots), filteredItems.value.map((item, index) => {
                var _slots$item;
                return ((_slots$item = slots.item) == null ? void 0 : _slots$item.call(slots, {
                  item,
                  index,
                  props: mergeProps(item.props, {
                    onClick: () => select(item)
                  })
                })) ?? createVNode(VListItem, mergeProps({
                  "key": index
                }, item.props, {
                  "onClick": () => select(item)
                }), {
                  prepend: (_ref2) => {
                    let {
                      isSelected
                    } = _ref2;
                    return props.multiple && !props.hideSelected ? createVNode(VCheckboxBtn, {
                      "modelValue": isSelected,
                      "ripple": false
                    }, null) : void 0;
                  },
                  title: () => {
                    var _getMatches, _search$value;
                    return isPristine.value ? item.title : highlightResult$1(item.title, (_getMatches = getMatches(item)) == null ? void 0 : _getMatches.title, ((_search$value = search.value) == null ? void 0 : _search$value.length) ?? 0);
                  }
                });
              }), (_slots$appendItem = slots["append-item"]) == null ? void 0 : _slots$appendItem.call(slots)]
            })]
          }), selections.value.map((item, index) => {
            function onChipClose(e2) {
              e2.stopPropagation();
              e2.preventDefault();
              select(item);
            }
            const slotProps = {
              "onClick:close": onChipClose,
              modelValue: true,
              "onUpdate:modelValue": void 0
            };
            return createVNode("div", {
              "key": item.value,
              "class": "v-autocomplete__selection"
            }, [hasChips ? createVNode(VDefaultsProvider, {
              "defaults": {
                VChip: {
                  closable: props.closableChips,
                  size: "small",
                  text: item.title
                }
              }
            }, {
              default: () => [slots.chip ? slots.chip({
                item,
                index,
                props: slotProps
              }) : createVNode(VChip, slotProps, null)]
            }) : slots.selection ? slots.selection({
              item,
              index
            }) : createVNode("span", {
              "class": "v-autocomplete__selection-text"
            }, [item.title, props.multiple && index < selections.value.length - 1 && createVNode("span", {
              "class": "v-autocomplete__selection-comma"
            }, [createTextVNode(",")])])]);
          })]);
        }
      });
    });
    return forwardRefs({
      isFocused,
      isPristine,
      menu,
      search,
      filteredItems,
      select
    }, vTextFieldRef);
  }
});
const VBadge$1 = "";
const VBadge = defineComponent({
  name: "VBadge",
  inheritAttrs: false,
  props: {
    bordered: Boolean,
    color: String,
    content: [Number, String],
    dot: Boolean,
    floating: Boolean,
    icon: IconValue,
    inline: Boolean,
    label: {
      type: String,
      default: "$vuetify.badge"
    },
    max: [Number, String],
    modelValue: {
      type: Boolean,
      default: true
    },
    offsetX: [Number, String],
    offsetY: [Number, String],
    textColor: String,
    ...makeLocationProps({
      location: "top end"
    }),
    ...makeRoundedProps(),
    ...makeTagProps(),
    ...makeThemeProps(),
    ...makeTransitionProps({
      transition: "scale-rotate-transition"
    })
  },
  setup(props, ctx) {
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(toRef(props, "color"));
    const {
      roundedClasses
    } = useRounded(props);
    const {
      t: t2
    } = useLocale();
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(toRef(props, "textColor"));
    const {
      themeClasses
    } = useTheme();
    const {
      locationStyles
    } = useLocation(props, true, (side) => {
      const base = props.floating ? props.dot ? 2 : 4 : props.dot ? 8 : 12;
      return base + (["top", "bottom"].includes(side) ? +(props.offsetY ?? 0) : ["left", "right"].includes(side) ? +(props.offsetX ?? 0) : 0);
    });
    useRender(() => {
      var _ctx$slots$default, _ctx$slots, _ctx$slots$badge, _ctx$slots2;
      const value = Number(props.content);
      const content = !props.max || isNaN(value) ? props.content : value <= props.max ? value : `${props.max}+`;
      const [badgeAttrs, attrs] = pick(ctx.attrs, ["aria-atomic", "aria-label", "aria-live", "role", "title"]);
      return createVNode(props.tag, mergeProps({
        "class": ["v-badge", {
          "v-badge--bordered": props.bordered,
          "v-badge--dot": props.dot,
          "v-badge--floating": props.floating,
          "v-badge--inline": props.inline
        }]
      }, attrs), {
        default: () => [createVNode("div", {
          "class": "v-badge__wrapper"
        }, [(_ctx$slots$default = (_ctx$slots = ctx.slots).default) == null ? void 0 : _ctx$slots$default.call(_ctx$slots), createVNode(MaybeTransition, {
          "transition": props.transition
        }, {
          default: () => [withDirectives(createVNode("span", mergeProps({
            "class": ["v-badge__badge", themeClasses.value, backgroundColorClasses.value, roundedClasses.value, textColorClasses.value],
            "style": [backgroundColorStyles.value, textColorStyles.value, props.inline ? {} : locationStyles.value],
            "aria-atomic": "true",
            "aria-label": t2(props.label, value),
            "aria-live": "polite",
            "role": "status"
          }, badgeAttrs), [props.dot ? void 0 : ctx.slots.badge ? (_ctx$slots$badge = (_ctx$slots2 = ctx.slots).badge) == null ? void 0 : _ctx$slots$badge.call(_ctx$slots2) : props.icon ? createVNode(VIcon, {
            "icon": props.icon
          }, null) : content]), [[vShow, props.modelValue]])]
        })])]
      });
    });
    return {};
  }
});
const VBanner$1 = "";
const VBannerActions = defineComponent({
  name: "VBannerActions",
  props: {
    color: String,
    density: String
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    provideDefaults({
      VBtn: {
        color: props.color,
        density: props.density,
        variant: "text"
      }
    });
    useRender(() => {
      var _slots$default;
      return createVNode("div", {
        "class": "v-banner-actions"
      }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)]);
    });
    return {};
  }
});
const VBannerText = createSimpleFunctional("v-banner-text");
const VBanner = defineComponent({
  name: "VBanner",
  props: {
    avatar: String,
    color: String,
    icon: IconValue,
    lines: String,
    stacked: Boolean,
    sticky: Boolean,
    text: String,
    ...makeBorderProps(),
    ...makeDensityProps(),
    ...makeDimensionProps(),
    ...makeElevationProps(),
    ...makeLocationProps(),
    ...makePositionProps(),
    ...makeRoundedProps(),
    ...makeTagProps(),
    ...makeThemeProps()
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      borderClasses
    } = useBorder(props);
    const {
      densityClasses
    } = useDensity(props);
    const {
      mobile
    } = useDisplay();
    const {
      dimensionStyles
    } = useDimension(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      locationStyles
    } = useLocation(props);
    const {
      positionClasses
    } = usePosition(props);
    const {
      roundedClasses
    } = useRounded(props);
    const {
      themeClasses
    } = provideTheme(props);
    const color = toRef(props, "color");
    const density = toRef(props, "density");
    provideDefaults({
      VBannerActions: {
        color,
        density
      }
    });
    useRender(() => {
      var _slots$default;
      const hasText = !!(props.text || slots.text);
      const hasPrepend = !!(slots.prepend || props.avatar || props.icon);
      return createVNode(props.tag, {
        "class": ["v-banner", {
          "v-banner--stacked": props.stacked || mobile.value,
          "v-banner--sticky": props.sticky,
          [`v-banner--${props.lines}-line`]: !!props.lines
        }, borderClasses.value, densityClasses.value, elevationClasses.value, positionClasses.value, roundedClasses.value, themeClasses.value],
        "style": [dimensionStyles.value, locationStyles.value],
        "role": "banner"
      }, {
        default: () => [hasPrepend && createVNode(VDefaultsProvider, {
          "key": "prepend",
          "defaults": {
            VAvatar: {
              color: color.value,
              density: density.value,
              icon: props.icon,
              image: props.avatar
            }
          }
        }, {
          default: () => [createVNode("div", {
            "class": "v-banner__prepend"
          }, [slots.prepend ? slots.prepend() : (props.avatar || props.icon) && createVNode(VAvatar, null, null)])]
        }), createVNode("div", {
          "class": "v-banner__content"
        }, [hasText && createVNode(VBannerText, {
          "key": "text"
        }, {
          default: () => [slots.text ? slots.text() : props.text]
        }), (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)]), slots.actions && createVNode(VBannerActions, null, {
          default: () => [slots.actions()]
        })]
      });
    });
  }
});
const VBottomNavigation$1 = "";
const VBottomNavigation = defineComponent({
  name: "VBottomNavigation",
  props: {
    bgColor: String,
    color: String,
    grow: Boolean,
    mode: {
      type: String,
      validator: (v) => !v || ["horizontal", "shift"].includes(v)
    },
    height: {
      type: [Number, String],
      default: 56
    },
    active: {
      type: Boolean,
      default: true
    },
    ...makeBorderProps(),
    ...makeDensityProps(),
    ...makeElevationProps(),
    ...makeRoundedProps(),
    ...makeLayoutItemProps({
      name: "bottom-navigation"
    }),
    ...makeTagProps({
      tag: "header"
    }),
    ...makeGroupProps({
      modelValue: true,
      selectedClass: "v-btn--selected"
    }),
    ...makeThemeProps()
  },
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = useTheme();
    const {
      borderClasses
    } = useBorder(props);
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(toRef(props, "bgColor"));
    const {
      densityClasses
    } = useDensity(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      roundedClasses
    } = useRounded(props);
    const height = computed(() => Number(props.height) - (props.density === "comfortable" ? 8 : 0) - (props.density === "compact" ? 16 : 0));
    const isActive = toRef(props, "active");
    const {
      layoutItemStyles
    } = useLayoutItem({
      id: props.name,
      order: computed(() => parseInt(props.order, 10)),
      position: computed(() => "bottom"),
      layoutSize: computed(() => isActive.value ? height.value : 0),
      elementSize: height,
      active: isActive,
      absolute: toRef(props, "absolute")
    });
    useGroup(props, VBtnToggleSymbol);
    provideDefaults({
      VBtn: {
        color: toRef(props, "color"),
        density: toRef(props, "density"),
        stacked: computed(() => props.mode !== "horizontal"),
        variant: "text"
      }
    }, {
      scoped: true
    });
    useRender(() => {
      return createVNode(props.tag, {
        "class": ["v-bottom-navigation", {
          "v-bottom-navigation--active": isActive.value,
          "v-bottom-navigation--grow": props.grow,
          "v-bottom-navigation--shift": props.mode === "shift"
        }, themeClasses.value, backgroundColorClasses.value, borderClasses.value, densityClasses.value, elevationClasses.value, roundedClasses.value],
        "style": [backgroundColorStyles.value, layoutItemStyles.value, {
          height: convertToUnit(height.value),
          transform: `translateY(${convertToUnit(!isActive.value ? 100 : 0, "%")})`
        }]
      }, {
        default: () => [slots.default && createVNode("div", {
          "class": "v-bottom-navigation__content"
        }, [slots.default()])]
      });
    });
    return {};
  }
});
const VBreadcrumbs$1 = "";
const VBreadcrumbsDivider = defineComponent({
  name: "VBreadcrumbsDivider",
  props: {
    divider: [Number, String]
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => {
      var _slots$default;
      return createVNode("li", {
        "class": "v-breadcrumbs-divider"
      }, [(slots == null ? void 0 : (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)) ?? props.divider]);
    });
    return {};
  }
});
const VBreadcrumbsItem = defineComponent({
  name: "VBreadcrumbsItem",
  props: {
    active: Boolean,
    activeClass: String,
    activeColor: String,
    color: String,
    disabled: Boolean,
    title: String,
    ...makeRouterProps(),
    ...makeTagProps({
      tag: "li"
    })
  },
  setup(props, _ref) {
    let {
      slots,
      attrs
    } = _ref;
    const link = useLink(props, attrs);
    const isActive = computed(() => {
      var _link$isActive;
      return props.active || ((_link$isActive = link.isActive) == null ? void 0 : _link$isActive.value);
    });
    const color = computed(() => isActive.value ? props.activeColor : props.color);
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(color);
    useRender(() => {
      var _slots$default;
      const Tag = link.isLink.value ? "a" : props.tag;
      return createVNode(Tag, {
        "class": ["v-breadcrumbs-item", {
          "v-breadcrumbs-item--active": isActive.value,
          "v-breadcrumbs-item--disabled": props.disabled,
          "v-breadcrumbs-item--link": link.isLink.value,
          [`${props.activeClass}`]: isActive.value && props.activeClass
        }, textColorClasses.value],
        "style": [textColorStyles.value],
        "href": link.href.value,
        "aria-current": isActive.value ? "page" : void 0,
        "onClick": link.navigate
      }, {
        default: () => [((_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)) ?? props.title]
      });
    });
    return {};
  }
});
const VBreadcrumbs = genericComponent()({
  name: "VBreadcrumbs",
  props: {
    activeClass: String,
    activeColor: String,
    bgColor: String,
    color: String,
    disabled: Boolean,
    divider: {
      type: String,
      default: "/"
    },
    icon: IconValue,
    items: {
      type: Array,
      default: () => []
    },
    ...makeDensityProps(),
    ...makeRoundedProps(),
    ...makeTagProps({
      tag: "ul"
    })
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(toRef(props, "bgColor"));
    const {
      densityClasses
    } = useDensity(props);
    const {
      roundedClasses
    } = useRounded(props);
    provideDefaults({
      VBreadcrumbsDivider: {
        divider: toRef(props, "divider")
      },
      VBreadcrumbsItem: {
        activeClass: toRef(props, "activeClass"),
        activeColor: toRef(props, "activeColor"),
        color: toRef(props, "color"),
        disabled: toRef(props, "disabled")
      }
    });
    useRender(() => {
      var _slots$default;
      const hasPrepend = !!(slots.prepend || props.icon);
      return createVNode(props.tag, {
        "class": ["v-breadcrumbs", backgroundColorClasses.value, densityClasses.value, roundedClasses.value],
        "style": backgroundColorStyles.value
      }, {
        default: () => [hasPrepend && createVNode(VDefaultsProvider, {
          "key": "prepend",
          "defaults": {
            VIcon: {
              icon: props.icon,
              start: true
            }
          }
        }, {
          default: () => [createVNode("div", {
            "class": "v-breadcrumbs__prepend"
          }, [slots.prepend ? slots.prepend() : props.icon && createVNode(VIcon, null, null)])]
        }), props.items.map((item, index, array) => createVNode(Fragment, null, [createVNode(VBreadcrumbsItem, mergeProps({
          "key": index,
          "disabled": index >= array.length - 1
        }, typeof item === "string" ? {
          title: item
        } : item), {
          default: slots.title ? () => {
            var _slots$title;
            return (_slots$title = slots.title) == null ? void 0 : _slots$title.call(slots, {
              item,
              index
            });
          } : void 0
        }), index < array.length - 1 && createVNode(VBreadcrumbsDivider, null, {
          default: slots.divider ? () => {
            var _slots$divider;
            return (_slots$divider = slots.divider) == null ? void 0 : _slots$divider.call(slots, {
              item,
              index
            });
          } : void 0
        })])), (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)]
      });
    });
    return {};
  }
});
const VCard$1 = "";
const VCardActions = defineComponent({
  name: "VCardActions",
  setup(_2, _ref) {
    let {
      slots
    } = _ref;
    provideDefaults({
      VBtn: {
        variant: "text"
      }
    });
    useRender(() => {
      var _slots$default;
      return createVNode("div", {
        "class": "v-card-actions"
      }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)]);
    });
    return {};
  }
});
const VCardSubtitle = createSimpleFunctional("v-card-subtitle");
const VCardTitle = createSimpleFunctional("v-card-title");
const VCardItem = defineComponent({
  name: "VCardItem",
  props: {
    appendAvatar: String,
    appendIcon: IconValue,
    prependAvatar: String,
    prependIcon: IconValue,
    subtitle: String,
    title: String,
    ...makeDensityProps()
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => {
      var _slots$prepend, _slots$title, _slots$subtitle, _slots$default, _slots$append;
      const hasPrepend = !!(props.prependAvatar || props.prependIcon || slots.prepend);
      const hasAppend = !!(props.appendAvatar || props.appendIcon || slots.append);
      const hasTitle = !!(props.title || slots.title);
      const hasSubtitle = !!(props.subtitle || slots.subtitle);
      return createVNode("div", {
        "class": "v-card-item"
      }, [hasPrepend && createVNode(VDefaultsProvider, {
        "key": "prepend",
        "defaults": {
          VAvatar: {
            density: props.density,
            icon: props.prependIcon,
            image: props.prependAvatar
          },
          VIcon: {
            density: props.density,
            icon: props.prependIcon
          }
        }
      }, {
        default: () => [createVNode("div", {
          "class": "v-card-item__prepend"
        }, [((_slots$prepend = slots.prepend) == null ? void 0 : _slots$prepend.call(slots)) ?? createVNode(VAvatar, null, null)])]
      }), createVNode("div", {
        "class": "v-card-item__content"
      }, [hasTitle && createVNode(VCardTitle, {
        "key": "title"
      }, {
        default: () => [((_slots$title = slots.title) == null ? void 0 : _slots$title.call(slots)) ?? props.title]
      }), hasSubtitle && createVNode(VCardSubtitle, {
        "key": "subtitle"
      }, {
        default: () => [((_slots$subtitle = slots.subtitle) == null ? void 0 : _slots$subtitle.call(slots)) ?? props.subtitle]
      }), (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)]), hasAppend && createVNode(VDefaultsProvider, {
        "key": "append",
        "defaults": {
          VAvatar: {
            density: props.density,
            icon: props.appendIcon,
            image: props.appendAvatar
          },
          VIcon: {
            density: props.density,
            icon: props.appendIcon
          }
        }
      }, {
        default: () => [createVNode("div", {
          "class": "v-card-item__append"
        }, [((_slots$append = slots.append) == null ? void 0 : _slots$append.call(slots)) ?? createVNode(VAvatar, null, null)])]
      })]);
    });
    return {};
  }
});
const VCardText = createSimpleFunctional("v-card-text");
const VCard = defineComponent({
  name: "VCard",
  directives: {
    Ripple
  },
  props: {
    appendAvatar: String,
    appendIcon: IconValue,
    disabled: Boolean,
    flat: Boolean,
    hover: Boolean,
    image: String,
    link: {
      type: Boolean,
      default: void 0
    },
    prependAvatar: String,
    prependIcon: IconValue,
    ripple: Boolean,
    subtitle: String,
    text: String,
    title: String,
    ...makeThemeProps(),
    ...makeBorderProps(),
    ...makeDensityProps(),
    ...makeDimensionProps(),
    ...makeElevationProps(),
    ...makeLoaderProps(),
    ...makeLocationProps(),
    ...makePositionProps(),
    ...makeRoundedProps(),
    ...makeRouterProps(),
    ...makeTagProps(),
    ...makeVariantProps({
      variant: "elevated"
    })
  },
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      borderClasses
    } = useBorder(props);
    const {
      colorClasses,
      colorStyles,
      variantClasses
    } = useVariant(props);
    const {
      densityClasses
    } = useDensity(props);
    const {
      dimensionStyles
    } = useDimension(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      loaderClasses
    } = useLoader(props);
    const {
      locationStyles
    } = useLocation(props);
    const {
      positionClasses
    } = usePosition(props);
    const {
      roundedClasses
    } = useRounded(props);
    const link = useLink(props, attrs);
    const isLink = computed(() => props.link !== false && link.isLink.value);
    const isClickable = computed(() => !props.disabled && props.link !== false && (props.link || link.isClickable.value));
    useRender(() => {
      var _slots$image, _slots$text, _slots$default;
      const Tag = isLink.value ? "a" : props.tag;
      const hasTitle = !!(slots.title || props.title);
      const hasSubtitle = !!(slots.subtitle || props.subtitle);
      const hasHeader = hasTitle || hasSubtitle;
      const hasAppend = !!(slots.append || props.appendAvatar || props.appendIcon);
      const hasPrepend = !!(slots.prepend || props.prependAvatar || props.prependIcon);
      const hasImage = !!(slots.image || props.image);
      const hasCardItem = hasHeader || hasPrepend || hasAppend;
      const hasText = !!(slots.text || props.text);
      return withDirectives(createVNode(Tag, {
        "class": ["v-card", {
          "v-card--disabled": props.disabled,
          "v-card--flat": props.flat,
          "v-card--hover": props.hover && !(props.disabled || props.flat),
          "v-card--link": isClickable.value
        }, themeClasses.value, borderClasses.value, colorClasses.value, densityClasses.value, elevationClasses.value, loaderClasses.value, positionClasses.value, roundedClasses.value, variantClasses.value],
        "style": [colorStyles.value, dimensionStyles.value, locationStyles.value],
        "href": link.href.value,
        "onClick": isClickable.value && link.navigate,
        "tabindex": props.disabled ? -1 : void 0
      }, {
        default: () => [hasImage && createVNode(VDefaultsProvider, {
          "key": "image",
          "defaults": {
            VImg: {
              cover: true,
              src: props.image
            }
          }
        }, {
          default: () => [createVNode("div", {
            "class": "v-card__image"
          }, [((_slots$image = slots.image) == null ? void 0 : _slots$image.call(slots)) ?? createVNode(VImg, null, null)])]
        }), createVNode(LoaderSlot, {
          "name": "v-card",
          "active": !!props.loading,
          "color": typeof props.loading === "boolean" ? void 0 : props.loading
        }, {
          default: slots.loader
        }), hasCardItem && createVNode(VCardItem, {
          "key": "item",
          "prependAvatar": props.prependAvatar,
          "prependIcon": props.prependIcon,
          "title": props.title,
          "subtitle": props.subtitle,
          "appendAvatar": props.appendAvatar,
          "appendIcon": props.appendIcon
        }, {
          default: slots.item,
          prepend: slots.prepend,
          title: slots.title,
          subtitle: slots.subtitle,
          append: slots.append
        }), hasText && createVNode(VCardText, {
          "key": "text"
        }, {
          default: () => [((_slots$text = slots.text) == null ? void 0 : _slots$text.call(slots)) ?? props.text]
        }), (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots), slots.actions && createVNode(VCardActions, null, {
          default: slots.actions
        }), genOverlays(isClickable.value, "v-card")]
      }), [[resolveDirective("ripple"), isClickable.value]]);
    });
    return {};
  }
});
const VCarousel$1 = "";
const VWindow$1 = "";
const handleGesture = (wrapper) => {
  const {
    touchstartX,
    touchendX,
    touchstartY,
    touchendY
  } = wrapper;
  const dirRatio = 0.5;
  const minDistance = 16;
  wrapper.offsetX = touchendX - touchstartX;
  wrapper.offsetY = touchendY - touchstartY;
  if (Math.abs(wrapper.offsetY) < dirRatio * Math.abs(wrapper.offsetX)) {
    wrapper.left && touchendX < touchstartX - minDistance && wrapper.left(wrapper);
    wrapper.right && touchendX > touchstartX + minDistance && wrapper.right(wrapper);
  }
  if (Math.abs(wrapper.offsetX) < dirRatio * Math.abs(wrapper.offsetY)) {
    wrapper.up && touchendY < touchstartY - minDistance && wrapper.up(wrapper);
    wrapper.down && touchendY > touchstartY + minDistance && wrapper.down(wrapper);
  }
};
function touchstart(event, wrapper) {
  var _wrapper$start;
  const touch = event.changedTouches[0];
  wrapper.touchstartX = touch.clientX;
  wrapper.touchstartY = touch.clientY;
  (_wrapper$start = wrapper.start) == null ? void 0 : _wrapper$start.call(wrapper, {
    originalEvent: event,
    ...wrapper
  });
}
function touchend(event, wrapper) {
  var _wrapper$end;
  const touch = event.changedTouches[0];
  wrapper.touchendX = touch.clientX;
  wrapper.touchendY = touch.clientY;
  (_wrapper$end = wrapper.end) == null ? void 0 : _wrapper$end.call(wrapper, {
    originalEvent: event,
    ...wrapper
  });
  handleGesture(wrapper);
}
function touchmove(event, wrapper) {
  var _wrapper$move;
  const touch = event.changedTouches[0];
  wrapper.touchmoveX = touch.clientX;
  wrapper.touchmoveY = touch.clientY;
  (_wrapper$move = wrapper.move) == null ? void 0 : _wrapper$move.call(wrapper, {
    originalEvent: event,
    ...wrapper
  });
}
function createHandlers() {
  let value = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  const wrapper = {
    touchstartX: 0,
    touchstartY: 0,
    touchendX: 0,
    touchendY: 0,
    touchmoveX: 0,
    touchmoveY: 0,
    offsetX: 0,
    offsetY: 0,
    left: value.left,
    right: value.right,
    up: value.up,
    down: value.down,
    start: value.start,
    move: value.move,
    end: value.end
  };
  return {
    touchstart: (e2) => touchstart(e2, wrapper),
    touchend: (e2) => touchend(e2, wrapper),
    touchmove: (e2) => touchmove(e2, wrapper)
  };
}
function mounted$3(el, binding) {
  var _binding$instance;
  const value = binding.value;
  const target = value != null && value.parent ? el.parentElement : el;
  const options = (value == null ? void 0 : value.options) ?? {
    passive: true
  };
  const uid2 = (_binding$instance = binding.instance) == null ? void 0 : _binding$instance.$.uid;
  if (!target || !uid2)
    return;
  const handlers = createHandlers(binding.value);
  target._touchHandlers = target._touchHandlers ?? /* @__PURE__ */ Object.create(null);
  target._touchHandlers[uid2] = handlers;
  keys$2(handlers).forEach((eventName) => {
    target.addEventListener(eventName, handlers[eventName], options);
  });
}
function unmounted$3(el, binding) {
  var _binding$value, _binding$instance2;
  const target = (_binding$value = binding.value) != null && _binding$value.parent ? el.parentElement : el;
  const uid2 = (_binding$instance2 = binding.instance) == null ? void 0 : _binding$instance2.$.uid;
  if (!(target != null && target._touchHandlers) || !uid2)
    return;
  const handlers = target._touchHandlers[uid2];
  keys$2(handlers).forEach((eventName) => {
    target.removeEventListener(eventName, handlers[eventName]);
  });
  delete target._touchHandlers[uid2];
}
const Touch = {
  mounted: mounted$3,
  unmounted: unmounted$3
};
const VWindowSymbol = Symbol.for("vuetify:v-window");
const VWindowGroupSymbol = Symbol.for("vuetify:v-window-group");
const VWindow = genericComponent()({
  name: "VWindow",
  directives: {
    Touch
  },
  props: {
    continuous: Boolean,
    nextIcon: {
      type: [Boolean, String, Function, Object],
      default: "$next"
    },
    prevIcon: {
      type: [Boolean, String, Function, Object],
      default: "$prev"
    },
    reverse: Boolean,
    showArrows: {
      type: [Boolean, String],
      validator: (v) => typeof v === "boolean" || v === "hover"
    },
    touch: {
      type: [Object, Boolean],
      default: void 0
    },
    direction: {
      type: String,
      default: "horizontal"
    },
    modelValue: null,
    disabled: Boolean,
    selectedClass: {
      type: String,
      default: "v-window-item--active"
    },
    // TODO: mandatory should probably not be exposed but do this for now
    mandatory: {
      default: "force"
    },
    ...makeTagProps(),
    ...makeThemeProps()
  },
  emits: {
    "update:modelValue": (v) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      isRtl
    } = useRtl();
    const {
      t: t2
    } = useLocale();
    const group = useGroup(props, VWindowGroupSymbol);
    const rootRef = ref();
    const isRtlReverse = computed(() => isRtl.value ? !props.reverse : props.reverse);
    const isReversed = ref(false);
    const transition = computed(() => {
      const axis = props.direction === "vertical" ? "y" : "x";
      const reverse = isRtlReverse.value ? !isReversed.value : isReversed.value;
      const direction = reverse ? "-reverse" : "";
      return `v-window-${axis}${direction}-transition`;
    });
    const transitionCount = ref(0);
    const transitionHeight = ref(void 0);
    const activeIndex = computed(() => {
      return group.items.value.findIndex((item) => group.selected.value.includes(item.id));
    });
    watch(activeIndex, (newVal, oldVal) => {
      const itemsLength = group.items.value.length;
      const lastIndex = itemsLength - 1;
      if (itemsLength <= 2) {
        isReversed.value = newVal < oldVal;
      } else if (newVal === lastIndex && oldVal === 0) {
        isReversed.value = true;
      } else if (newVal === 0 && oldVal === lastIndex) {
        isReversed.value = false;
      } else {
        isReversed.value = newVal < oldVal;
      }
    });
    provide(VWindowSymbol, {
      transition,
      isReversed,
      transitionCount,
      transitionHeight,
      rootRef
    });
    const canMoveBack = computed(() => props.continuous || activeIndex.value !== 0);
    const canMoveForward = computed(() => props.continuous || activeIndex.value !== group.items.value.length - 1);
    function prev() {
      canMoveBack.value && group.prev();
    }
    function next() {
      canMoveForward.value && group.next();
    }
    const arrows = computed(() => {
      const arrows2 = [];
      const prevProps = {
        icon: isRtl.value ? props.nextIcon : props.prevIcon,
        class: `v-window__${isRtlReverse.value ? "right" : "left"}`,
        onClick: group.prev,
        ariaLabel: t2("$vuetify.carousel.prev")
      };
      arrows2.push(canMoveBack.value ? slots.prev ? slots.prev({
        props: prevProps
      }) : createVNode(VBtn, prevProps, null) : createVNode("div", null, null));
      const nextProps = {
        icon: isRtl.value ? props.prevIcon : props.nextIcon,
        class: `v-window__${isRtlReverse.value ? "left" : "right"}`,
        onClick: group.next,
        ariaLabel: t2("$vuetify.carousel.next")
      };
      arrows2.push(canMoveForward.value ? slots.next ? slots.next({
        props: nextProps
      }) : createVNode(VBtn, nextProps, null) : createVNode("div", null, null));
      return arrows2;
    });
    const touchOptions = computed(() => {
      if (props.touch === false)
        return props.touch;
      const options = {
        left: () => {
          isRtlReverse.value ? prev() : next();
        },
        right: () => {
          isRtlReverse.value ? next() : prev();
        },
        start: (_ref2) => {
          let {
            originalEvent
          } = _ref2;
          originalEvent.stopPropagation();
        }
      };
      return {
        ...options,
        ...props.touch === true ? {} : props.touch
      };
    });
    useRender(() => {
      var _slots$default, _slots$additional;
      return withDirectives(createVNode(props.tag, {
        "ref": rootRef,
        "class": ["v-window", {
          "v-window--show-arrows-on-hover": props.showArrows === "hover"
        }, themeClasses.value]
      }, {
        default: () => [createVNode("div", {
          "class": "v-window__container",
          "style": {
            height: transitionHeight.value
          }
        }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, {
          group
        }), props.showArrows !== false && createVNode("div", {
          "class": "v-window__controls"
        }, [arrows.value])]), (_slots$additional = slots.additional) == null ? void 0 : _slots$additional.call(slots, {
          group
        })]
      }), [[resolveDirective("touch"), touchOptions.value]]);
    });
    return {
      group
    };
  }
});
function useSsrBoot() {
  const isBooted = ref(false);
  onMounted(() => {
    window.requestAnimationFrame(() => {
      isBooted.value = true;
    });
  });
  const ssrBootStyles = computed(() => !isBooted.value ? {
    transition: "none !important"
  } : void 0);
  return {
    ssrBootStyles,
    isBooted: readonly(isBooted)
  };
}
const VWindowItem = defineComponent({
  name: "VWindowItem",
  directives: {
    Touch
  },
  props: {
    reverseTransition: {
      type: [Boolean, String],
      default: void 0
    },
    transition: {
      type: [Boolean, String],
      default: void 0
    },
    ...makeGroupItemProps(),
    ...makeLazyProps()
  },
  emits: {
    "group:selected": (val) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const window2 = inject$1(VWindowSymbol);
    const groupItem = useGroupItem(props, VWindowGroupSymbol);
    const {
      isBooted
    } = useSsrBoot();
    if (!window2 || !groupItem)
      throw new Error("[Vuetify] VWindowItem must be used inside VWindow");
    const isTransitioning = ref(false);
    const hasTransition = computed(() => window2.isReversed.value ? props.reverseTransition !== false : props.transition !== false);
    function onAfterTransition() {
      if (!isTransitioning.value || !window2) {
        return;
      }
      isTransitioning.value = false;
      if (window2.transitionCount.value > 0) {
        window2.transitionCount.value -= 1;
        if (window2.transitionCount.value === 0) {
          window2.transitionHeight.value = void 0;
        }
      }
    }
    function onBeforeTransition() {
      if (isTransitioning.value || !window2) {
        return;
      }
      isTransitioning.value = true;
      if (window2.transitionCount.value === 0) {
        var _window$rootRef$value;
        window2.transitionHeight.value = convertToUnit((_window$rootRef$value = window2.rootRef.value) == null ? void 0 : _window$rootRef$value.clientHeight);
      }
      window2.transitionCount.value += 1;
    }
    function onTransitionCancelled() {
      onAfterTransition();
    }
    function onEnterTransition(el) {
      if (!isTransitioning.value) {
        return;
      }
      nextTick(() => {
        if (!hasTransition.value || !isTransitioning.value || !window2) {
          return;
        }
        window2.transitionHeight.value = convertToUnit(el.clientHeight);
      });
    }
    const transition = computed(() => {
      const name2 = window2.isReversed.value ? props.reverseTransition : props.transition;
      return !hasTransition.value ? false : {
        name: typeof name2 !== "string" ? window2.transition.value : name2,
        onBeforeEnter: onBeforeTransition,
        onAfterEnter: onAfterTransition,
        onEnterCancelled: onTransitionCancelled,
        onBeforeLeave: onBeforeTransition,
        onAfterLeave: onAfterTransition,
        onLeaveCancelled: onTransitionCancelled,
        onEnter: onEnterTransition
      };
    });
    const {
      hasContent
    } = useLazy(props, groupItem.isSelected);
    useRender(() => {
      var _slots$default;
      return createVNode(MaybeTransition, {
        "transition": isBooted.value && transition.value
      }, {
        default: () => [withDirectives(createVNode("div", {
          "class": ["v-window-item", groupItem.selectedClass.value]
        }, [hasContent.value && ((_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots))]), [[vShow, groupItem.isSelected.value]])]
      });
    });
    return {};
  }
});
const VCarousel = defineComponent({
  name: "VCarousel",
  props: {
    color: String,
    cycle: Boolean,
    delimiterIcon: {
      type: IconValue,
      default: "$delimiter"
    },
    height: {
      type: [Number, String],
      default: 500
    },
    hideDelimiters: Boolean,
    hideDelimiterBackground: Boolean,
    interval: {
      type: [Number, String],
      default: 6e3,
      validator: (value) => value > 0
    },
    modelValue: null,
    progress: [Boolean, String],
    showArrows: {
      type: [Boolean, String],
      default: true,
      validator: (v) => typeof v === "boolean" || v === "hover"
    },
    verticalDelimiters: [Boolean, String]
  },
  emits: {
    "update:modelValue": (val) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const model = useProxiedModel(props, "modelValue");
    const {
      t: t2
    } = useLocale();
    const windowRef = ref();
    let slideTimeout = -1;
    watch(model, restartTimeout);
    watch(() => props.interval, restartTimeout);
    watch(() => props.cycle, (val) => {
      if (val)
        restartTimeout();
      else
        window.clearTimeout(slideTimeout);
    });
    onMounted(startTimeout);
    function startTimeout() {
      if (!props.cycle || !windowRef.value)
        return;
      slideTimeout = window.setTimeout(windowRef.value.group.next, +props.interval > 0 ? +props.interval : 6e3);
    }
    function restartTimeout() {
      window.clearTimeout(slideTimeout);
      window.requestAnimationFrame(startTimeout);
    }
    useRender(() => createVNode(VWindow, {
      "ref": windowRef,
      "modelValue": model.value,
      "onUpdate:modelValue": ($event) => model.value = $event,
      "class": ["v-carousel", {
        "v-carousel--hide-delimiter-background": props.hideDelimiterBackground,
        "v-carousel--vertical-delimiters": props.verticalDelimiters
      }],
      "style": {
        height: convertToUnit(props.height)
      },
      "continuous": true,
      "mandatory": "force",
      "showArrows": props.showArrows
    }, {
      default: slots.default,
      additional: (_ref2) => {
        let {
          group
        } = _ref2;
        return createVNode(Fragment, null, [!props.hideDelimiters && createVNode("div", {
          "class": "v-carousel__controls",
          "style": {
            left: props.verticalDelimiters === "left" && props.verticalDelimiters ? 0 : "auto",
            right: props.verticalDelimiters === "right" ? 0 : "auto"
          }
        }, [group.items.value.length > 0 && createVNode(VDefaultsProvider, {
          "defaults": {
            VBtn: {
              color: props.color,
              icon: props.delimiterIcon,
              size: "x-small",
              variant: "text"
            }
          },
          "scoped": true
        }, {
          default: () => [group.items.value.map((item, index) => {
            const props2 = {
              "aria-label": t2("$vuetify.carousel.ariaLabel.delimiter", index + 1, group.items.value.length),
              class: [group.isSelected(item.id) && "v-btn--active"],
              onClick: () => group.select(item.id, true)
            };
            return slots.item ? slots.item({
              props: props2,
              item
            }) : createVNode(VBtn, mergeProps(item, props2), null);
          })]
        })]), props.progress && createVNode(VProgressLinear, {
          "class": "v-carousel__progress",
          "color": typeof props.progress === "string" ? props.progress : void 0,
          "modelValue": (group.getItemIndex(model.value) + 1) / group.items.value.length * 100
        }, null)]);
      },
      prev: slots.prev,
      next: slots.next
    }));
    return {};
  }
});
const VCarouselItem = defineComponent({
  name: "VCarouselItem",
  inheritAttrs: false,
  props: {
    value: null
  },
  setup(props, _ref) {
    let {
      slots,
      attrs
    } = _ref;
    useRender(() => createVNode(VWindowItem, {
      "class": "v-carousel-item",
      "value": props.value
    }, {
      default: () => [createVNode(VImg, attrs, slots)]
    }));
  }
});
const VCode$1 = "";
const VCode = createSimpleFunctional("v-code");
const VColorPicker$1 = "";
const VColorPickerCanvas$1 = "";
const VColorPickerCanvas = defineComponent({
  name: "VColorPickerCanvas",
  props: {
    color: {
      type: Object
    },
    disabled: Boolean,
    dotSize: {
      type: [Number, String],
      default: 10
    },
    height: {
      type: [Number, String],
      default: 150
    },
    width: {
      type: [Number, String],
      default: 300
    }
  },
  emits: {
    "update:color": (color) => true,
    "update:position": (hue) => true
  },
  setup(props, _ref) {
    let {
      emit
    } = _ref;
    const isInteracting = ref(false);
    const isOutsideUpdate = ref(false);
    const dotPosition = ref({
      x: 0,
      y: 0
    });
    const dotStyles = computed(() => {
      const {
        x: x2,
        y
      } = dotPosition.value;
      const radius = parseInt(props.dotSize, 10) / 2;
      return {
        width: convertToUnit(props.dotSize),
        height: convertToUnit(props.dotSize),
        transform: `translate(${convertToUnit(x2 - radius)}, ${convertToUnit(y - radius)})`
      };
    });
    const canvasRef = ref();
    function updateDotPosition(x2, y, rect) {
      const {
        left,
        top,
        width,
        height
      } = rect;
      dotPosition.value = {
        x: clamp(x2 - left, 0, width),
        y: clamp(y - top, 0, height)
      };
    }
    function handleClick(e2) {
      if (props.disabled || !canvasRef.value)
        return;
      updateDotPosition(e2.clientX, e2.clientY, canvasRef.value.getBoundingClientRect());
    }
    function handleMouseDown(e2) {
      e2.preventDefault();
      if (props.disabled)
        return;
      isInteracting.value = true;
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleMouseMove);
      window.addEventListener("touchend", handleMouseUp);
    }
    function handleMouseMove(e2) {
      if (props.disabled || !canvasRef.value)
        return;
      isInteracting.value = true;
      const coords = getEventCoordinates(e2);
      updateDotPosition(coords.clientX, coords.clientY, canvasRef.value.getBoundingClientRect());
    }
    function handleMouseUp() {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleMouseMove);
      window.removeEventListener("touchend", handleMouseUp);
    }
    watch(dotPosition, () => {
      var _props$color, _props$color2;
      if (isOutsideUpdate.value) {
        isOutsideUpdate.value = false;
        return;
      }
      if (!canvasRef.value)
        return;
      const {
        width,
        height
      } = canvasRef.value.getBoundingClientRect();
      const {
        x: x2,
        y
      } = dotPosition.value;
      emit("update:color", {
        h: ((_props$color = props.color) == null ? void 0 : _props$color.h) ?? 0,
        s: clamp(x2, 0, width) / width,
        v: 1 - clamp(y, 0, height) / height,
        a: ((_props$color2 = props.color) == null ? void 0 : _props$color2.a) ?? 1
      });
    });
    function updateCanvas() {
      var _props$color3;
      if (!canvasRef.value)
        return;
      const canvas = canvasRef.value;
      const ctx = canvas.getContext("2d");
      if (!ctx)
        return;
      const saturationGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      saturationGradient.addColorStop(0, "hsla(0, 0%, 100%, 1)");
      saturationGradient.addColorStop(1, `hsla(${((_props$color3 = props.color) == null ? void 0 : _props$color3.h) ?? 0}, 100%, 50%, 1)`);
      ctx.fillStyle = saturationGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const valueGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      valueGradient.addColorStop(0, "hsla(0, 0%, 100%, 0)");
      valueGradient.addColorStop(1, "hsla(0, 0%, 0%, 1)");
      ctx.fillStyle = valueGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    watch(() => {
      var _props$color4;
      return (_props$color4 = props.color) == null ? void 0 : _props$color4.h;
    }, updateCanvas, {
      immediate: true
    });
    watch(() => props.color, () => {
      if (isInteracting.value) {
        isInteracting.value = false;
        return;
      }
      if (!props.color)
        return;
      isOutsideUpdate.value = true;
      dotPosition.value = {
        x: props.color.s * parseInt(props.width, 10),
        y: (1 - props.color.v) * parseInt(props.height, 10)
      };
    }, {
      deep: true,
      immediate: true
    });
    onMounted(() => updateCanvas());
    useRender(() => createVNode("div", {
      "class": "v-color-picker-canvas",
      "style": {
        width: convertToUnit(props.width),
        height: convertToUnit(props.height)
      },
      "onClick": handleClick,
      "onMousedown": handleMouseDown,
      "onTouchstart": handleMouseDown
    }, [createVNode("canvas", {
      "ref": canvasRef,
      "width": props.width,
      "height": props.height
    }, null), createVNode("div", {
      "class": ["v-color-picker-canvas__dot", {
        "v-color-picker-canvas__dot--disabled": props.disabled
      }],
      "style": dotStyles.value
    }, null)]));
    return {};
  }
});
const VColorPickerEdit$1 = "";
var _rgba$inputs;
function has$1(obj, key) {
  return key.every((k2) => obj.hasOwnProperty(k2));
}
function parseColor(color) {
  if (!color)
    return null;
  let hsva = null;
  if (typeof color === "string") {
    const hex2 = parseHex(color);
    hsva = HexToHSV(hex2);
  }
  if (typeof color === "object") {
    if (has$1(color, ["r", "g", "b"])) {
      hsva = RGBtoHSV(color);
    } else if (has$1(color, ["h", "s", "l"])) {
      hsva = HSLtoHSV(color);
    } else if (has$1(color, ["h", "s", "v"])) {
      hsva = color;
    }
  }
  return hsva != null ? {
    ...hsva,
    a: hsva.a ?? 1
  } : null;
}
function stripAlpha(color, stripAlpha2) {
  if (stripAlpha2) {
    const {
      a,
      ...rest
    } = color;
    return rest;
  }
  return color;
}
function extractColor(color, input) {
  if (input == null || typeof input === "string") {
    const hex2 = HSVtoHex(color);
    if (color.a === 1)
      return hex2.slice(0, 7);
    else
      return hex2;
  }
  if (typeof input === "object") {
    let converted;
    if (has$1(input, ["r", "g", "b"]))
      converted = HSVtoRGB(color);
    else if (has$1(input, ["h", "s", "l"]))
      converted = HSVtoHSL(color);
    else if (has$1(input, ["h", "s", "v"]))
      converted = color;
    return stripAlpha(converted, !has$1(input, ["a"]));
  }
  return color;
}
const nullColor = {
  h: 0,
  s: 0,
  v: 1,
  a: 1
};
const rgba = {
  inputProps: {
    type: "number",
    min: 0
  },
  inputs: [{
    label: "R",
    max: 255,
    step: 1,
    getValue: (c) => Math.round(c.r),
    getColor: (c, v) => ({
      ...c,
      r: Number(v)
    })
  }, {
    label: "G",
    max: 255,
    step: 1,
    getValue: (c) => Math.round(c.g),
    getColor: (c, v) => ({
      ...c,
      g: Number(v)
    })
  }, {
    label: "B",
    max: 255,
    step: 1,
    getValue: (c) => Math.round(c.b),
    getColor: (c, v) => ({
      ...c,
      b: Number(v)
    })
  }, {
    label: "A",
    max: 1,
    step: 0.01,
    getValue: (_ref) => {
      let {
        a
      } = _ref;
      return a ? Math.round(a * 100) / 100 : 1;
    },
    getColor: (c, v) => ({
      ...c,
      a: Number(v)
    })
  }],
  to: HSVtoRGB,
  from: RGBtoHSV
};
const rgb = {
  ...rgba,
  inputs: (_rgba$inputs = rgba.inputs) == null ? void 0 : _rgba$inputs.slice(0, 3)
};
const hsla = {
  inputProps: {
    type: "number",
    min: 0
  },
  inputs: [{
    label: "H",
    max: 360,
    step: 1,
    getValue: (c) => Math.round(c.h),
    getColor: (c, v) => ({
      ...c,
      h: Number(v)
    })
  }, {
    label: "S",
    max: 1,
    step: 0.01,
    getValue: (c) => Math.round(c.s * 100) / 100,
    getColor: (c, v) => ({
      ...c,
      s: Number(v)
    })
  }, {
    label: "L",
    max: 1,
    step: 0.01,
    getValue: (c) => Math.round(c.l * 100) / 100,
    getColor: (c, v) => ({
      ...c,
      l: Number(v)
    })
  }, {
    label: "A",
    max: 1,
    step: 0.01,
    getValue: (_ref2) => {
      let {
        a
      } = _ref2;
      return a ? Math.round(a * 100) / 100 : 1;
    },
    getColor: (c, v) => ({
      ...c,
      a: Number(v)
    })
  }],
  to: HSVtoHSL,
  from: HSLtoHSV
};
const hsl = {
  ...hsla,
  inputs: hsla.inputs.slice(0, 3)
};
const hexa = {
  inputProps: {
    type: "text"
  },
  inputs: [{
    label: "HEXA",
    getValue: (c) => c,
    getColor: (c, v) => v
  }],
  to: HSVtoHex,
  from: HexToHSV
};
const hex = {
  ...hexa,
  inputs: [{
    label: "HEX",
    getValue: (c) => c.slice(0, 7),
    getColor: (c, v) => v
  }]
};
const modes = {
  rgb,
  rgba,
  hsl,
  hsla,
  hex,
  hexa
};
const VColorPickerInput = (_ref) => {
  let {
    label,
    ...rest
  } = _ref;
  return createVNode("div", {
    "class": "v-color-picker-edit__input"
  }, [createVNode("input", rest, null), createVNode("span", null, [label])]);
};
const VColorPickerEdit = defineComponent({
  name: "VColorPickerEdit",
  props: {
    color: Object,
    disabled: Boolean,
    mode: {
      type: String,
      default: "rgba",
      validator: (v) => Object.keys(modes).includes(v)
    },
    modes: {
      type: Array,
      default: () => Object.keys(modes),
      validator: (v) => Array.isArray(v) && v.every((m2) => Object.keys(modes).includes(m2))
    }
  },
  emits: {
    "update:color": (color) => true,
    "update:mode": (mode) => true
  },
  setup(props, _ref2) {
    let {
      emit
    } = _ref2;
    const enabledModes = computed(() => {
      return props.modes.map((key) => ({
        ...modes[key],
        name: key
      }));
    });
    const inputs = computed(() => {
      var _mode$inputs;
      const mode = enabledModes.value.find((m2) => m2.name === props.mode);
      if (!mode)
        return [];
      const color = props.color ? mode.to(props.color) : {};
      return (_mode$inputs = mode.inputs) == null ? void 0 : _mode$inputs.map((_ref3) => {
        let {
          getValue,
          getColor,
          ...inputProps
        } = _ref3;
        return {
          ...mode.inputProps,
          ...inputProps,
          disabled: props.disabled,
          value: getValue(color),
          onChange: (e2) => {
            const target = e2.target;
            if (!target)
              return;
            emit("update:color", mode.from(getColor(color, target.value)));
          }
        };
      });
    });
    useRender(() => {
      var _inputs$value;
      return createVNode("div", {
        "class": "v-color-picker-edit"
      }, [(_inputs$value = inputs.value) == null ? void 0 : _inputs$value.map((props2) => createVNode(VColorPickerInput, props2, null)), enabledModes.value.length > 1 && createVNode(VBtn, {
        "icon": "$unfold",
        "size": "x-small",
        "variant": "plain",
        "onClick": () => {
          const mi = enabledModes.value.findIndex((m2) => m2.name === props.mode);
          emit("update:mode", enabledModes.value[(mi + 1) % enabledModes.value.length].name);
        }
      }, null)]);
    });
    return {};
  }
});
const VColorPickerPreview$1 = "";
const VSlider$1 = "";
const VSliderThumb$1 = "";
const VSliderSymbol = Symbol.for("vuetify:v-slider");
function getOffset(e2, el, direction) {
  const vertical = direction === "vertical";
  const rect = el.getBoundingClientRect();
  const touch = "touches" in e2 ? e2.touches[0] : e2;
  return vertical ? touch.clientY - (rect.top + rect.height / 2) : touch.clientX - (rect.left + rect.width / 2);
}
function getPosition(e2, position) {
  if ("touches" in e2 && e2.touches.length)
    return e2.touches[0][position];
  else if ("changedTouches" in e2 && e2.changedTouches.length)
    return e2.changedTouches[0][position];
  else
    return e2[position];
}
const makeSliderProps = propsFactory({
  disabled: Boolean,
  error: Boolean,
  readonly: Boolean,
  max: {
    type: [Number, String],
    default: 100
  },
  min: {
    type: [Number, String],
    default: 0
  },
  step: {
    type: [Number, String],
    default: 0
  },
  thumbColor: String,
  thumbLabel: {
    type: [Boolean, String],
    default: void 0,
    validator: (v) => typeof v === "boolean" || v === "always"
  },
  thumbSize: {
    type: [Number, String],
    default: 20
  },
  showTicks: {
    type: [Boolean, String],
    default: false,
    validator: (v) => typeof v === "boolean" || v === "always"
  },
  ticks: {
    type: [Array, Object]
  },
  tickSize: {
    type: [Number, String],
    default: 2
  },
  color: String,
  trackColor: String,
  trackFillColor: String,
  trackSize: {
    type: [Number, String],
    default: 4
  },
  direction: {
    type: String,
    default: "horizontal",
    validator: (v) => ["vertical", "horizontal"].includes(v)
  },
  reverse: Boolean,
  ...makeRoundedProps(),
  ...makeElevationProps({
    elevation: 2
  })
}, "slider");
const useSlider = (_ref) => {
  let {
    props,
    handleSliderMouseUp,
    handleMouseMove,
    getActiveThumb
  } = _ref;
  const {
    isRtl
  } = useRtl();
  const isReversed = toRef(props, "reverse");
  const horizontalDirection = computed(() => {
    let hd = isRtl.value ? "rtl" : "ltr";
    if (props.reverse) {
      hd = hd === "rtl" ? "ltr" : "rtl";
    }
    return hd;
  });
  const min2 = computed(() => parseFloat(props.min));
  const max2 = computed(() => parseFloat(props.max));
  const step = computed(() => props.step > 0 ? parseFloat(props.step) : 0);
  const decimals = computed(() => {
    const trimmedStep = step.value.toString().trim();
    return trimmedStep.includes(".") ? trimmedStep.length - trimmedStep.indexOf(".") - 1 : 0;
  });
  const thumbSize = computed(() => parseInt(props.thumbSize, 10));
  const tickSize = computed(() => parseInt(props.tickSize, 10));
  const trackSize = computed(() => parseInt(props.trackSize, 10));
  const numTicks = computed(() => (max2.value - min2.value) / step.value);
  const disabled = toRef(props, "disabled");
  const vertical = computed(() => props.direction === "vertical");
  const thumbColor = computed(() => props.error || props.disabled ? void 0 : props.thumbColor ?? props.color);
  const trackColor = computed(() => props.error || props.disabled ? void 0 : props.trackColor ?? props.color);
  const trackFillColor = computed(() => props.error || props.disabled ? void 0 : props.trackFillColor ?? props.color);
  const mousePressed = ref(false);
  const startOffset = ref(0);
  const trackContainerRef = ref();
  const activeThumbRef = ref();
  function roundValue(value) {
    if (step.value <= 0)
      return value;
    const clamped = clamp(value, min2.value, max2.value);
    const offset = min2.value % step.value;
    const newValue = Math.round((clamped - offset) / step.value) * step.value + offset;
    return parseFloat(Math.min(newValue, max2.value).toFixed(decimals.value));
  }
  function parseMouseMove(e2) {
    var _trackContainerRef$va;
    const vertical2 = props.direction === "vertical";
    const start = vertical2 ? "top" : "left";
    const length = vertical2 ? "height" : "width";
    const position2 = vertical2 ? "clientY" : "clientX";
    const {
      [start]: trackStart,
      [length]: trackLength
    } = (_trackContainerRef$va = trackContainerRef.value) == null ? void 0 : _trackContainerRef$va.$el.getBoundingClientRect();
    const clickOffset = getPosition(e2, position2);
    let clickPos = Math.min(Math.max((clickOffset - trackStart - startOffset.value) / trackLength, 0), 1) || 0;
    if (vertical2 || horizontalDirection.value === "rtl")
      clickPos = 1 - clickPos;
    return roundValue(min2.value + clickPos * (max2.value - min2.value));
  }
  let thumbMoved = false;
  const handleStop = (e2) => {
    if (!thumbMoved) {
      startOffset.value = 0;
      handleSliderMouseUp(parseMouseMove(e2));
    }
    mousePressed.value = false;
    thumbMoved = false;
    startOffset.value = 0;
  };
  const handleStart = (e2) => {
    activeThumbRef.value = getActiveThumb(e2);
    if (!activeThumbRef.value)
      return;
    activeThumbRef.value.focus();
    mousePressed.value = true;
    if (activeThumbRef.value.contains(e2.target)) {
      thumbMoved = true;
      startOffset.value = getOffset(e2, activeThumbRef.value, props.direction);
    } else {
      startOffset.value = 0;
      handleMouseMove(parseMouseMove(e2));
    }
  };
  const moveListenerOptions = {
    passive: true,
    capture: true
  };
  function onMouseMove(e2) {
    thumbMoved = true;
    handleMouseMove(parseMouseMove(e2));
  }
  function onSliderMouseUp(e2) {
    e2.stopPropagation();
    e2.preventDefault();
    handleStop(e2);
    window.removeEventListener("mousemove", onMouseMove, moveListenerOptions);
    window.removeEventListener("mouseup", onSliderMouseUp);
  }
  function onSliderTouchend(e2) {
    var _e$target;
    handleStop(e2);
    window.removeEventListener("touchmove", onMouseMove, moveListenerOptions);
    (_e$target = e2.target) == null ? void 0 : _e$target.removeEventListener("touchend", onSliderTouchend);
  }
  function onSliderTouchstart(e2) {
    var _e$target2;
    handleStart(e2);
    window.addEventListener("touchmove", onMouseMove, moveListenerOptions);
    (_e$target2 = e2.target) == null ? void 0 : _e$target2.addEventListener("touchend", onSliderTouchend, {
      passive: false
    });
  }
  function onSliderMousedown(e2) {
    e2.preventDefault();
    handleStart(e2);
    window.addEventListener("mousemove", onMouseMove, moveListenerOptions);
    window.addEventListener("mouseup", onSliderMouseUp, {
      passive: false
    });
  }
  const position = (val) => {
    const percentage = (val - min2.value) / (max2.value - min2.value) * 100;
    return clamp(isNaN(percentage) ? 0 : percentage, 0, 100);
  };
  const parsedTicks = computed(() => {
    if (!props.ticks) {
      return numTicks.value !== Infinity ? createRange(numTicks.value + 1).map((t2) => {
        const value = min2.value + t2 * step.value;
        return {
          value,
          position: position(value)
        };
      }) : [];
    }
    if (Array.isArray(props.ticks))
      return props.ticks.map((t2) => ({
        value: t2,
        position: position(t2),
        label: t2.toString()
      }));
    return Object.keys(props.ticks).map((key) => ({
      value: parseFloat(key),
      position: position(parseFloat(key)),
      label: props.ticks[key]
    }));
  });
  const hasLabels = computed(() => parsedTicks.value.some((_ref2) => {
    let {
      label
    } = _ref2;
    return !!label;
  }));
  const data2 = {
    activeThumbRef,
    color: toRef(props, "color"),
    decimals,
    disabled,
    direction: toRef(props, "direction"),
    elevation: toRef(props, "elevation"),
    hasLabels,
    horizontalDirection,
    isReversed,
    min: min2,
    max: max2,
    mousePressed,
    numTicks,
    onSliderMousedown,
    onSliderTouchstart,
    parsedTicks,
    parseMouseMove,
    position,
    readonly: toRef(props, "readonly"),
    rounded: toRef(props, "rounded"),
    roundValue,
    showTicks: toRef(props, "showTicks"),
    startOffset,
    step,
    thumbSize,
    thumbColor,
    thumbLabel: toRef(props, "thumbLabel"),
    ticks: toRef(props, "ticks"),
    tickSize,
    trackColor,
    trackContainerRef,
    trackFillColor,
    trackSize,
    vertical
  };
  provide(VSliderSymbol, data2);
  return data2;
};
const VSliderThumb = defineComponent({
  name: "VSliderThumb",
  directives: {
    Ripple
  },
  props: {
    focused: Boolean,
    max: {
      type: Number,
      required: true
    },
    min: {
      type: Number,
      required: true
    },
    modelValue: {
      type: Number,
      required: true
    },
    position: {
      type: Number,
      required: true
    }
  },
  emits: {
    "update:modelValue": (v) => true
  },
  setup(props, _ref) {
    let {
      slots,
      emit
    } = _ref;
    const slider = inject$1(VSliderSymbol);
    if (!slider)
      throw new Error("[Vuetify] v-slider-thumb must be used inside v-slider or v-range-slider");
    const {
      thumbColor,
      step,
      vertical,
      disabled,
      thumbSize,
      thumbLabel,
      direction,
      readonly: readonly2,
      elevation,
      isReversed,
      horizontalDirection,
      mousePressed,
      decimals
    } = slider;
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(thumbColor);
    const {
      pageup,
      pagedown,
      end,
      home: home2,
      left,
      right,
      down,
      up
    } = keyValues;
    const relevantKeys = [pageup, pagedown, end, home2, left, right, down, up];
    const multipliers = computed(() => {
      if (step.value)
        return [1, 2, 3];
      else
        return [1, 5, 10];
    });
    function parseKeydown(e2, value) {
      if (!relevantKeys.includes(e2.key))
        return;
      e2.preventDefault();
      const _step = step.value || 0.1;
      const steps = (props.max - props.min) / _step;
      if ([left, right, down, up].includes(e2.key)) {
        const increase = horizontalDirection.value === "rtl" ? [left, up] : [right, up];
        const direction2 = increase.includes(e2.key) ? 1 : -1;
        const multiplier = e2.shiftKey ? 2 : e2.ctrlKey ? 1 : 0;
        value = value + direction2 * _step * multipliers.value[multiplier];
      } else if (e2.key === home2) {
        value = props.min;
      } else if (e2.key === end) {
        value = props.max;
      } else {
        const direction2 = e2.key === pagedown ? 1 : -1;
        value = value - direction2 * _step * (steps > 100 ? steps / 10 : 10);
      }
      return Math.max(props.min, Math.min(props.max, value));
    }
    function onKeydown(e2) {
      const newValue = parseKeydown(e2, props.modelValue);
      newValue != null && emit("update:modelValue", newValue);
    }
    useRender(() => {
      var _slots$thumbLabel;
      const positionPercentage = convertToUnit(vertical.value || isReversed.value ? 100 - props.position : props.position, "%");
      const {
        elevationClasses
      } = useElevation(computed(() => !disabled.value ? elevation.value : void 0));
      return createVNode("div", {
        "class": ["v-slider-thumb", {
          "v-slider-thumb--focused": props.focused,
          "v-slider-thumb--pressed": props.focused && mousePressed.value
        }],
        "style": {
          "--v-slider-thumb-position": positionPercentage,
          "--v-slider-thumb-size": convertToUnit(thumbSize.value)
        },
        "role": "slider",
        "tabindex": disabled.value ? -1 : 0,
        "aria-valuemin": props.min,
        "aria-valuemax": props.max,
        "aria-valuenow": props.modelValue,
        "aria-readonly": readonly2.value,
        "aria-orientation": direction.value,
        "onKeydown": !readonly2.value ? onKeydown : void 0
      }, [createVNode("div", {
        "class": ["v-slider-thumb__surface", textColorClasses.value, elevationClasses.value],
        "style": {
          ...textColorStyles.value
        }
      }, null), withDirectives(createVNode("div", {
        "class": ["v-slider-thumb__ripple", textColorClasses.value],
        "style": textColorStyles.value
      }, null), [[resolveDirective("ripple"), true, null, {
        circle: true,
        center: true
      }]]), createVNode(VScaleTransition, {
        "origin": "bottom center"
      }, {
        default: () => [withDirectives(createVNode("div", {
          "class": "v-slider-thumb__label-container"
        }, [createVNode("div", {
          "class": ["v-slider-thumb__label"]
        }, [createVNode("div", null, [((_slots$thumbLabel = slots["thumb-label"]) == null ? void 0 : _slots$thumbLabel.call(slots, {
          modelValue: props.modelValue
        })) ?? props.modelValue.toFixed(step.value ? decimals.value : 1)])])]), [[vShow, thumbLabel.value && props.focused || thumbLabel.value === "always"]])]
      })]);
    });
    return {};
  }
});
const VSliderTrack$1 = "";
const VSliderTrack = defineComponent({
  name: "VSliderTrack",
  props: {
    start: {
      type: Number,
      required: true
    },
    stop: {
      type: Number,
      required: true
    }
  },
  emits: {},
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const slider = inject$1(VSliderSymbol);
    if (!slider)
      throw new Error("[Vuetify] v-slider-track must be inside v-slider or v-range-slider");
    const {
      color,
      horizontalDirection,
      parsedTicks,
      rounded,
      showTicks,
      tickSize,
      trackColor,
      trackFillColor,
      trackSize,
      vertical,
      min: min2,
      max: max2
    } = slider;
    const {
      roundedClasses
    } = useRounded(rounded);
    const {
      backgroundColorClasses: trackFillColorClasses,
      backgroundColorStyles: trackFillColorStyles
    } = useBackgroundColor(trackFillColor);
    const {
      backgroundColorClasses: trackColorClasses,
      backgroundColorStyles: trackColorStyles
    } = useBackgroundColor(trackColor);
    const startDir = computed(() => `inset-${vertical.value ? "block-end" : "inline-start"}`);
    const endDir = computed(() => vertical.value ? "height" : "width");
    const backgroundStyles = computed(() => {
      return {
        [startDir.value]: "0%",
        [endDir.value]: "100%"
      };
    });
    const trackFillWidth = computed(() => props.stop - props.start);
    const trackFillStyles = computed(() => {
      return {
        [startDir.value]: convertToUnit(props.start, "%"),
        [endDir.value]: convertToUnit(trackFillWidth.value, "%")
      };
    });
    const computedTicks = computed(() => {
      const ticks = vertical.value ? parsedTicks.value.slice().reverse() : parsedTicks.value;
      return ticks.map((tick, index) => {
        var _slots$tickLabel;
        const directionProperty = vertical.value ? "bottom" : "margin-inline-start";
        const directionValue = tick.value !== min2.value && tick.value !== max2.value ? convertToUnit(tick.position, "%") : void 0;
        return createVNode("div", {
          "key": tick.value,
          "class": ["v-slider-track__tick", {
            "v-slider-track__tick--filled": tick.position >= props.start && tick.position <= props.stop,
            "v-slider-track__tick--first": tick.value === min2.value,
            "v-slider-track__tick--last": tick.value === max2.value
          }],
          "style": {
            [directionProperty]: directionValue
          }
        }, [(tick.label || slots["tick-label"]) && createVNode("div", {
          "class": "v-slider-track__tick-label"
        }, [((_slots$tickLabel = slots["tick-label"]) == null ? void 0 : _slots$tickLabel.call(slots, {
          tick,
          index
        })) ?? tick.label])]);
      });
    });
    useRender(() => {
      return createVNode("div", {
        "class": ["v-slider-track", roundedClasses.value],
        "style": {
          "--v-slider-track-size": convertToUnit(trackSize.value),
          "--v-slider-tick-size": convertToUnit(tickSize.value),
          direction: !vertical.value ? horizontalDirection.value : void 0
        }
      }, [createVNode("div", {
        "class": ["v-slider-track__background", trackColorClasses.value, {
          "v-slider-track__background--opacity": !!color.value || !trackFillColor.value
        }],
        "style": {
          ...backgroundStyles.value,
          ...trackColorStyles.value
        }
      }, null), createVNode("div", {
        "class": ["v-slider-track__fill", trackFillColorClasses.value],
        "style": {
          ...trackFillStyles.value,
          ...trackFillColorStyles.value
        }
      }, null), showTicks.value && createVNode("div", {
        "class": ["v-slider-track__ticks", {
          "v-slider-track__ticks--always-show": showTicks.value === "always"
        }]
      }, [computedTicks.value])]);
    });
    return {};
  }
});
const VSlider = defineComponent({
  name: "VSlider",
  props: {
    ...makeFocusProps(),
    ...makeSliderProps(),
    ...makeVInputProps(),
    modelValue: {
      type: [Number, String],
      default: 0
    }
  },
  emits: {
    "update:focused": (value) => true,
    "update:modelValue": (v) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const thumbContainerRef = ref();
    const {
      min: min2,
      max: max2,
      mousePressed,
      roundValue,
      onSliderMousedown,
      onSliderTouchstart,
      trackContainerRef,
      position,
      hasLabels,
      readonly: readonly2
    } = useSlider({
      props,
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      handleSliderMouseUp: (newValue) => model.value = roundValue(newValue),
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      handleMouseMove: (newValue) => model.value = roundValue(newValue),
      getActiveThumb: () => {
        var _thumbContainerRef$va;
        return (_thumbContainerRef$va = thumbContainerRef.value) == null ? void 0 : _thumbContainerRef$va.$el;
      }
    });
    const model = useProxiedModel(props, "modelValue", void 0, (v) => {
      const value = typeof v === "string" ? parseFloat(v) : v == null ? min2.value : v;
      return roundValue(value);
    });
    const {
      isFocused,
      focus,
      blur
    } = useFocus(props);
    const trackStop = computed(() => position(model.value));
    useRender(() => {
      const [inputProps, _2] = filterInputProps(props);
      const hasPrepend = !!(props.label || slots.label || slots.prepend);
      return createVNode(VInput, mergeProps({
        "class": ["v-slider", {
          "v-slider--has-labels": !!slots["tick-label"] || hasLabels.value,
          "v-slider--focused": isFocused.value,
          "v-slider--pressed": mousePressed.value,
          "v-slider--disabled": props.disabled
        }]
      }, inputProps, {
        "focused": isFocused.value
      }), {
        ...slots,
        prepend: hasPrepend ? (slotProps) => {
          var _slots$label, _slots$prepend;
          return createVNode(Fragment, null, [((_slots$label = slots.label) == null ? void 0 : _slots$label.call(slots, slotProps)) ?? props.label ? createVNode(VLabel, {
            "class": "v-slider__label",
            "text": props.label
          }, null) : void 0, (_slots$prepend = slots.prepend) == null ? void 0 : _slots$prepend.call(slots, slotProps)]);
        } : void 0,
        default: (_ref2) => {
          let {
            id: id2
          } = _ref2;
          return createVNode("div", {
            "class": "v-slider__container",
            "onMousedown": !readonly2.value ? onSliderMousedown : void 0,
            "onTouchstartPassive": !readonly2.value ? onSliderTouchstart : void 0
          }, [createVNode("input", {
            "id": id2.value,
            "name": props.name || id2.value,
            "disabled": props.disabled,
            "readonly": props.readonly,
            "tabindex": "-1",
            "value": model.value
          }, null), createVNode(VSliderTrack, {
            "ref": trackContainerRef,
            "start": 0,
            "stop": trackStop.value
          }, {
            "tick-label": slots["tick-label"]
          }), createVNode(VSliderThumb, {
            "ref": thumbContainerRef,
            "focused": isFocused.value,
            "min": min2.value,
            "max": max2.value,
            "modelValue": model.value,
            "onUpdate:modelValue": (v) => model.value = v,
            "position": trackStop.value,
            "elevation": props.elevation,
            "onFocus": focus,
            "onBlur": blur
          }, {
            "thumb-label": slots["thumb-label"]
          })]);
        }
      });
    });
    return {};
  }
});
const VColorPickerPreview = defineComponent({
  name: "VColorPickerPreview",
  props: {
    color: {
      type: Object
    },
    disabled: Boolean,
    hideAlpha: Boolean
  },
  emits: {
    "update:color": (color) => true
  },
  setup(props, _ref) {
    let {
      emit
    } = _ref;
    useRender(() => {
      var _props$color, _props$color2;
      return createVNode("div", {
        "class": ["v-color-picker-preview", {
          "v-color-picker-preview--hide-alpha": props.hideAlpha
        }]
      }, [createVNode("div", {
        "class": "v-color-picker-preview__dot"
      }, [createVNode("div", {
        "style": {
          background: HSVtoCSS(props.color ?? nullColor)
        }
      }, null)]), createVNode("div", {
        "class": "v-color-picker-preview__sliders"
      }, [createVNode(VSlider, {
        "class": "v-color-picker-preview__track v-color-picker-preview__hue",
        "modelValue": (_props$color = props.color) == null ? void 0 : _props$color.h,
        "onUpdate:modelValue": (h2) => emit("update:color", {
          ...props.color ?? nullColor,
          h: h2
        }),
        "step": 0,
        "min": 0,
        "max": 360,
        "disabled": props.disabled,
        "thumbSize": 14,
        "trackSize": 8,
        "trackFillColor": "white",
        "hideDetails": true
      }, null), !props.hideAlpha && createVNode(VSlider, {
        "class": "v-color-picker-preview__track v-color-picker-preview__alpha",
        "modelValue": (_props$color2 = props.color) == null ? void 0 : _props$color2.a,
        "onUpdate:modelValue": (a) => emit("update:color", {
          ...props.color ?? nullColor,
          a
        }),
        "step": 0,
        "min": 0,
        "max": 1,
        "disabled": props.disabled,
        "thumbSize": 14,
        "trackSize": 8,
        "trackFillColor": "white",
        "hideDetails": true
      }, null)])]);
    });
    return {};
  }
});
const VColorPickerSwatches$1 = "";
const red = Object.freeze({
  base: "#f44336",
  lighten5: "#ffebee",
  lighten4: "#ffcdd2",
  lighten3: "#ef9a9a",
  lighten2: "#e57373",
  lighten1: "#ef5350",
  darken1: "#e53935",
  darken2: "#d32f2f",
  darken3: "#c62828",
  darken4: "#b71c1c",
  accent1: "#ff8a80",
  accent2: "#ff5252",
  accent3: "#ff1744",
  accent4: "#d50000"
});
const pink = Object.freeze({
  base: "#e91e63",
  lighten5: "#fce4ec",
  lighten4: "#f8bbd0",
  lighten3: "#f48fb1",
  lighten2: "#f06292",
  lighten1: "#ec407a",
  darken1: "#d81b60",
  darken2: "#c2185b",
  darken3: "#ad1457",
  darken4: "#880e4f",
  accent1: "#ff80ab",
  accent2: "#ff4081",
  accent3: "#f50057",
  accent4: "#c51162"
});
const purple = Object.freeze({
  base: "#9c27b0",
  lighten5: "#f3e5f5",
  lighten4: "#e1bee7",
  lighten3: "#ce93d8",
  lighten2: "#ba68c8",
  lighten1: "#ab47bc",
  darken1: "#8e24aa",
  darken2: "#7b1fa2",
  darken3: "#6a1b9a",
  darken4: "#4a148c",
  accent1: "#ea80fc",
  accent2: "#e040fb",
  accent3: "#d500f9",
  accent4: "#aa00ff"
});
const deepPurple = Object.freeze({
  base: "#673ab7",
  lighten5: "#ede7f6",
  lighten4: "#d1c4e9",
  lighten3: "#b39ddb",
  lighten2: "#9575cd",
  lighten1: "#7e57c2",
  darken1: "#5e35b1",
  darken2: "#512da8",
  darken3: "#4527a0",
  darken4: "#311b92",
  accent1: "#b388ff",
  accent2: "#7c4dff",
  accent3: "#651fff",
  accent4: "#6200ea"
});
const indigo = Object.freeze({
  base: "#3f51b5",
  lighten5: "#e8eaf6",
  lighten4: "#c5cae9",
  lighten3: "#9fa8da",
  lighten2: "#7986cb",
  lighten1: "#5c6bc0",
  darken1: "#3949ab",
  darken2: "#303f9f",
  darken3: "#283593",
  darken4: "#1a237e",
  accent1: "#8c9eff",
  accent2: "#536dfe",
  accent3: "#3d5afe",
  accent4: "#304ffe"
});
const blue = Object.freeze({
  base: "#2196f3",
  lighten5: "#e3f2fd",
  lighten4: "#bbdefb",
  lighten3: "#90caf9",
  lighten2: "#64b5f6",
  lighten1: "#42a5f5",
  darken1: "#1e88e5",
  darken2: "#1976d2",
  darken3: "#1565c0",
  darken4: "#0d47a1",
  accent1: "#82b1ff",
  accent2: "#448aff",
  accent3: "#2979ff",
  accent4: "#2962ff"
});
const lightBlue = Object.freeze({
  base: "#03a9f4",
  lighten5: "#e1f5fe",
  lighten4: "#b3e5fc",
  lighten3: "#81d4fa",
  lighten2: "#4fc3f7",
  lighten1: "#29b6f6",
  darken1: "#039be5",
  darken2: "#0288d1",
  darken3: "#0277bd",
  darken4: "#01579b",
  accent1: "#80d8ff",
  accent2: "#40c4ff",
  accent3: "#00b0ff",
  accent4: "#0091ea"
});
const cyan = Object.freeze({
  base: "#00bcd4",
  lighten5: "#e0f7fa",
  lighten4: "#b2ebf2",
  lighten3: "#80deea",
  lighten2: "#4dd0e1",
  lighten1: "#26c6da",
  darken1: "#00acc1",
  darken2: "#0097a7",
  darken3: "#00838f",
  darken4: "#006064",
  accent1: "#84ffff",
  accent2: "#18ffff",
  accent3: "#00e5ff",
  accent4: "#00b8d4"
});
const teal = Object.freeze({
  base: "#009688",
  lighten5: "#e0f2f1",
  lighten4: "#b2dfdb",
  lighten3: "#80cbc4",
  lighten2: "#4db6ac",
  lighten1: "#26a69a",
  darken1: "#00897b",
  darken2: "#00796b",
  darken3: "#00695c",
  darken4: "#004d40",
  accent1: "#a7ffeb",
  accent2: "#64ffda",
  accent3: "#1de9b6",
  accent4: "#00bfa5"
});
const green = Object.freeze({
  base: "#4caf50",
  lighten5: "#e8f5e9",
  lighten4: "#c8e6c9",
  lighten3: "#a5d6a7",
  lighten2: "#81c784",
  lighten1: "#66bb6a",
  darken1: "#43a047",
  darken2: "#388e3c",
  darken3: "#2e7d32",
  darken4: "#1b5e20",
  accent1: "#b9f6ca",
  accent2: "#69f0ae",
  accent3: "#00e676",
  accent4: "#00c853"
});
const lightGreen = Object.freeze({
  base: "#8bc34a",
  lighten5: "#f1f8e9",
  lighten4: "#dcedc8",
  lighten3: "#c5e1a5",
  lighten2: "#aed581",
  lighten1: "#9ccc65",
  darken1: "#7cb342",
  darken2: "#689f38",
  darken3: "#558b2f",
  darken4: "#33691e",
  accent1: "#ccff90",
  accent2: "#b2ff59",
  accent3: "#76ff03",
  accent4: "#64dd17"
});
const lime = Object.freeze({
  base: "#cddc39",
  lighten5: "#f9fbe7",
  lighten4: "#f0f4c3",
  lighten3: "#e6ee9c",
  lighten2: "#dce775",
  lighten1: "#d4e157",
  darken1: "#c0ca33",
  darken2: "#afb42b",
  darken3: "#9e9d24",
  darken4: "#827717",
  accent1: "#f4ff81",
  accent2: "#eeff41",
  accent3: "#c6ff00",
  accent4: "#aeea00"
});
const yellow = Object.freeze({
  base: "#ffeb3b",
  lighten5: "#fffde7",
  lighten4: "#fff9c4",
  lighten3: "#fff59d",
  lighten2: "#fff176",
  lighten1: "#ffee58",
  darken1: "#fdd835",
  darken2: "#fbc02d",
  darken3: "#f9a825",
  darken4: "#f57f17",
  accent1: "#ffff8d",
  accent2: "#ffff00",
  accent3: "#ffea00",
  accent4: "#ffd600"
});
const amber = Object.freeze({
  base: "#ffc107",
  lighten5: "#fff8e1",
  lighten4: "#ffecb3",
  lighten3: "#ffe082",
  lighten2: "#ffd54f",
  lighten1: "#ffca28",
  darken1: "#ffb300",
  darken2: "#ffa000",
  darken3: "#ff8f00",
  darken4: "#ff6f00",
  accent1: "#ffe57f",
  accent2: "#ffd740",
  accent3: "#ffc400",
  accent4: "#ffab00"
});
const orange = Object.freeze({
  base: "#ff9800",
  lighten5: "#fff3e0",
  lighten4: "#ffe0b2",
  lighten3: "#ffcc80",
  lighten2: "#ffb74d",
  lighten1: "#ffa726",
  darken1: "#fb8c00",
  darken2: "#f57c00",
  darken3: "#ef6c00",
  darken4: "#e65100",
  accent1: "#ffd180",
  accent2: "#ffab40",
  accent3: "#ff9100",
  accent4: "#ff6d00"
});
const deepOrange = Object.freeze({
  base: "#ff5722",
  lighten5: "#fbe9e7",
  lighten4: "#ffccbc",
  lighten3: "#ffab91",
  lighten2: "#ff8a65",
  lighten1: "#ff7043",
  darken1: "#f4511e",
  darken2: "#e64a19",
  darken3: "#d84315",
  darken4: "#bf360c",
  accent1: "#ff9e80",
  accent2: "#ff6e40",
  accent3: "#ff3d00",
  accent4: "#dd2c00"
});
const brown = Object.freeze({
  base: "#795548",
  lighten5: "#efebe9",
  lighten4: "#d7ccc8",
  lighten3: "#bcaaa4",
  lighten2: "#a1887f",
  lighten1: "#8d6e63",
  darken1: "#6d4c41",
  darken2: "#5d4037",
  darken3: "#4e342e",
  darken4: "#3e2723"
});
const blueGrey = Object.freeze({
  base: "#607d8b",
  lighten5: "#eceff1",
  lighten4: "#cfd8dc",
  lighten3: "#b0bec5",
  lighten2: "#90a4ae",
  lighten1: "#78909c",
  darken1: "#546e7a",
  darken2: "#455a64",
  darken3: "#37474f",
  darken4: "#263238"
});
const grey = Object.freeze({
  base: "#9e9e9e",
  lighten5: "#fafafa",
  lighten4: "#f5f5f5",
  lighten3: "#eeeeee",
  lighten2: "#e0e0e0",
  lighten1: "#bdbdbd",
  darken1: "#757575",
  darken2: "#616161",
  darken3: "#424242",
  darken4: "#212121"
});
const shades = Object.freeze({
  black: "#000000",
  white: "#ffffff",
  transparent: "#ffffff00"
});
const colors = Object.freeze({
  red,
  pink,
  purple,
  deepPurple,
  indigo,
  blue,
  lightBlue,
  cyan,
  teal,
  green,
  lightGreen,
  lime,
  yellow,
  amber,
  orange,
  deepOrange,
  brown,
  blueGrey,
  grey,
  shades
});
function parseDefaultColors(colors2) {
  return Object.keys(colors2).map((key) => {
    const color = colors2[key];
    return color.base ? [color.base, color.darken4, color.darken3, color.darken2, color.darken1, color.lighten1, color.lighten2, color.lighten3, color.lighten4, color.lighten5] : [color.black, color.white, color.transparent];
  });
}
const VColorPickerSwatches = defineComponent({
  name: "VColorPickerSwatches",
  props: {
    swatches: {
      type: Array,
      default: () => parseDefaultColors(colors)
    },
    disabled: Boolean,
    color: Object,
    maxHeight: [Number, String]
  },
  emits: {
    "update:color": (color) => true
  },
  setup(props, _ref) {
    let {
      emit
    } = _ref;
    useRender(() => createVNode("div", {
      "class": "v-color-picker-swatches",
      "style": {
        maxHeight: convertToUnit(props.maxHeight)
      }
    }, [createVNode("div", null, [props.swatches.map((swatch) => createVNode("div", {
      "class": "v-color-picker-swatches__swatch"
    }, [swatch.map((color) => {
      const hsva = parseColor(color);
      return createVNode("div", {
        "class": "v-color-picker-swatches__color",
        "onClick": () => hsva && emit("update:color", hsva)
      }, [createVNode("div", {
        "style": {
          background: color
        }
      }, [props.color && deepEqual(props.color, hsva) ? createVNode(VIcon, {
        "size": "x-small",
        "icon": "$success",
        "color": getContrast(color, "#FFFFFF") > 2 ? "white" : "black"
      }, null) : void 0])]);
    })]))])]));
    return {};
  }
});
const VSheet$1 = "";
const VSheet = defineComponent({
  name: "VSheet",
  props: {
    color: String,
    ...makeBorderProps(),
    ...makeDimensionProps(),
    ...makeElevationProps(),
    ...makeLocationProps(),
    ...makePositionProps(),
    ...makeRoundedProps(),
    ...makeTagProps(),
    ...makeThemeProps()
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(toRef(props, "color"));
    const {
      borderClasses
    } = useBorder(props);
    const {
      dimensionStyles
    } = useDimension(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      locationStyles
    } = useLocation(props);
    const {
      positionClasses
    } = usePosition(props);
    const {
      roundedClasses
    } = useRounded(props);
    return () => createVNode(props.tag, {
      "class": ["v-sheet", themeClasses.value, backgroundColorClasses.value, borderClasses.value, elevationClasses.value, positionClasses.value, roundedClasses.value],
      "style": [backgroundColorStyles.value, dimensionStyles.value, locationStyles.value]
    }, slots);
  }
});
const VColorPicker = defineComponent({
  name: "VColorPicker",
  props: {
    canvasHeight: {
      type: [String, Number],
      default: 150
    },
    disabled: Boolean,
    dotSize: {
      type: [Number, String],
      default: 10
    },
    hideCanvas: Boolean,
    hideSliders: Boolean,
    hideInputs: Boolean,
    mode: {
      type: String,
      default: "rgba",
      validator: (v) => Object.keys(modes).includes(v)
    },
    modes: {
      type: Array,
      default: () => Object.keys(modes),
      validator: (v) => Array.isArray(v) && v.every((m2) => Object.keys(modes).includes(m2))
    },
    showSwatches: Boolean,
    swatches: Array,
    swatchesMaxHeight: {
      type: [Number, String],
      default: 150
    },
    modelValue: {
      type: [Object, String]
    },
    width: {
      type: [Number, String],
      default: 300
    },
    ...makeElevationProps(),
    ...makeRoundedProps(),
    ...makeThemeProps()
  },
  emits: {
    "update:modelValue": (color) => true,
    "update:mode": (mode) => true
  },
  setup(props) {
    const mode = useProxiedModel(props, "mode");
    const lastPickedColor = ref(null);
    const currentColor = useProxiedModel(props, "modelValue", void 0, (v) => {
      let c = parseColor(v);
      if (!c)
        return null;
      if (lastPickedColor.value) {
        c = {
          ...c,
          h: lastPickedColor.value.h
        };
        lastPickedColor.value = null;
      }
      return c;
    }, (v) => {
      if (!v)
        return null;
      return extractColor(v, props.modelValue);
    });
    const updateColor = (hsva) => {
      currentColor.value = hsva;
      lastPickedColor.value = hsva;
    };
    onMounted(() => {
      if (!props.modes.includes(mode.value))
        mode.value = props.modes[0];
    });
    useRender(() => createVNode(VSheet, {
      "rounded": props.rounded,
      "elevation": props.elevation,
      "theme": props.theme,
      "class": ["v-color-picker"],
      "style": {
        "--v-color-picker-color-hsv": HSVtoCSS({
          ...currentColor.value ?? nullColor,
          a: 1
        })
      },
      "maxWidth": props.width
    }, {
      default: () => [!props.hideCanvas && createVNode(VColorPickerCanvas, {
        "key": "canvas",
        "color": currentColor.value,
        "onUpdate:color": updateColor,
        "disabled": props.disabled,
        "dotSize": props.dotSize,
        "width": props.width,
        "height": props.canvasHeight
      }, null), (!props.hideSliders || !props.hideInputs) && createVNode("div", {
        "key": "controls",
        "class": "v-color-picker__controls"
      }, [!props.hideSliders && createVNode(VColorPickerPreview, {
        "key": "preview",
        "color": currentColor.value,
        "onUpdate:color": updateColor,
        "hideAlpha": !mode.value.endsWith("a"),
        "disabled": props.disabled
      }, null), !props.hideInputs && createVNode(VColorPickerEdit, {
        "key": "edit",
        "modes": props.modes,
        "mode": mode.value,
        "onUpdate:mode": (m2) => mode.value = m2,
        "color": currentColor.value,
        "onUpdate:color": updateColor,
        "disabled": props.disabled
      }, null)]), props.showSwatches && createVNode(VColorPickerSwatches, {
        "key": "swatches",
        "color": currentColor.value,
        "onUpdate:color": updateColor,
        "maxHeight": props.swatchesMaxHeight,
        "swatches": props.swatches,
        "disabled": props.disabled
      }, null)]
    }));
    return {};
  }
});
const VCombobox$1 = "";
function highlightResult(text, matches, length) {
  if (matches == null)
    return text;
  if (Array.isArray(matches))
    throw new Error("Multiple matches is not implemented");
  return typeof matches === "number" && ~matches ? createVNode(Fragment, null, [createVNode("span", {
    "class": "v-combobox__unmask"
  }, [text.substr(0, matches)]), createVNode("span", {
    "class": "v-combobox__mask"
  }, [text.substr(matches, length)]), createVNode("span", {
    "class": "v-combobox__unmask"
  }, [text.substr(matches + length)])]) : text;
}
const VCombobox = genericComponent()({
  name: "VCombobox",
  props: {
    // TODO: implement post keyboard support
    // autoSelectFirst: Boolean,
    delimiters: Array,
    ...makeFilterProps({
      filterKeys: ["title"]
    }),
    ...makeSelectProps({
      hideNoData: true,
      returnObject: true
    }),
    ...omit(makeVTextFieldProps({
      modelValue: null
    }), ["validationValue", "dirty", "appendInnerIcon"]),
    ...makeTransitionProps({
      transition: false
    })
  },
  emits: {
    "update:modelValue": (val) => true,
    "update:search": (val) => true,
    "update:menu": (val) => true
  },
  setup(props, _ref) {
    var _model$value$;
    let {
      emit,
      slots
    } = _ref;
    const {
      t: t2
    } = useLocale();
    const vTextFieldRef = ref();
    const isFocused = ref(false);
    const isPristine = ref(true);
    const menu = useProxiedModel(props, "menu");
    const selectionIndex = ref(-1);
    const color = computed(() => {
      var _vTextFieldRef$value;
      return (_vTextFieldRef$value = vTextFieldRef.value) == null ? void 0 : _vTextFieldRef$value.color;
    });
    const {
      items,
      transformIn,
      transformOut
    } = useItems(props);
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(color);
    const model = useProxiedModel(props, "modelValue", [], (v) => transformIn(wrapInArray(v || [])), (v) => {
      const transformed = transformOut(v);
      return props.multiple ? transformed : transformed[0] ?? null;
    });
    const _search = ref(!props.multiple ? ((_model$value$ = model.value[0]) == null ? void 0 : _model$value$.title) ?? "" : "");
    const search = computed({
      get: () => {
        return _search.value;
      },
      set: (val) => {
        var _props$delimiters;
        _search.value = val;
        if (!props.multiple) {
          model.value = [transformItem$1(props, val)];
        }
        if (val && props.multiple && (_props$delimiters = props.delimiters) != null && _props$delimiters.length) {
          const values = val.split(new RegExp(`(?:${props.delimiters.join("|")})+`));
          if (values.length > 1) {
            values.forEach((v) => {
              v = v.trim();
              if (v)
                select(transformItem$1(props, v));
            });
            _search.value = "";
          }
        }
        if (!val)
          selectionIndex.value = -1;
        if (isFocused.value)
          menu.value = true;
        isPristine.value = !val;
      }
    });
    watch(_search, (value) => {
      emit("update:search", value);
    });
    watch(model, (value) => {
      if (!props.multiple) {
        var _value$;
        _search.value = ((_value$ = value[0]) == null ? void 0 : _value$.title) ?? "";
      }
    });
    const {
      filteredItems,
      getMatches
    } = useFilter(props, items, computed(() => isPristine.value ? void 0 : search.value));
    const selections = computed(() => {
      return model.value.map((v) => {
        return items.value.find((item) => props.valueComparator(item.value, v.value)) || v;
      });
    });
    const selected = computed(() => selections.value.map((selection2) => selection2.props.value));
    const selection = computed(() => selections.value[selectionIndex.value]);
    const listRef = ref();
    function onClear(e2) {
      model.value = [];
      if (props.openOnClear) {
        menu.value = true;
      }
    }
    function onClickControl() {
      if (props.hideNoData && !items.value.length || props.readonly)
        return;
      menu.value = true;
    }
    function onKeydown(e2) {
      if (props.readonly)
        return;
      const selectionStart = vTextFieldRef.value.selectionStart;
      const length = selected.value.length;
      if (selectionIndex.value > -1)
        e2.preventDefault();
      if (["Enter", "ArrowDown"].includes(e2.key)) {
        menu.value = true;
      }
      if (["Escape"].includes(e2.key)) {
        menu.value = false;
      }
      if (["Enter", "Escape", "Tab"].includes(e2.key)) {
        isPristine.value = true;
      }
      if (e2.key === "ArrowDown") {
        var _listRef$value;
        e2.preventDefault();
        (_listRef$value = listRef.value) == null ? void 0 : _listRef$value.focus("next");
      } else if (e2.key === "ArrowUp") {
        var _listRef$value2;
        e2.preventDefault();
        (_listRef$value2 = listRef.value) == null ? void 0 : _listRef$value2.focus("prev");
      }
      if (!props.multiple)
        return;
      if (["Backspace", "Delete"].includes(e2.key)) {
        if (selectionIndex.value < 0) {
          if (e2.key === "Backspace" && !search.value) {
            selectionIndex.value = length - 1;
          }
          return;
        }
        select(selection.value);
        nextTick(() => !selection.value && (selectionIndex.value = length - 2));
      }
      if (e2.key === "ArrowLeft") {
        if (selectionIndex.value < 0 && selectionStart > 0)
          return;
        const prev = selectionIndex.value > -1 ? selectionIndex.value - 1 : length - 1;
        if (selections.value[prev]) {
          selectionIndex.value = prev;
        } else {
          selectionIndex.value = -1;
          vTextFieldRef.value.setSelectionRange(search.value.length, search.value.length);
        }
      }
      if (e2.key === "ArrowRight") {
        if (selectionIndex.value < 0)
          return;
        const next = selectionIndex.value + 1;
        if (selections.value[next]) {
          selectionIndex.value = next;
        } else {
          selectionIndex.value = -1;
          vTextFieldRef.value.setSelectionRange(0, 0);
        }
      }
      if (e2.key === "Enter") {
        select(transformItem$1(props, search.value));
        search.value = "";
      }
    }
    function onAfterLeave() {
      if (isFocused.value)
        isPristine.value = true;
    }
    function select(item) {
      if (props.multiple) {
        const index = selected.value.findIndex((selection2) => selection2 === item.value);
        if (index === -1) {
          model.value = [...model.value, item];
        } else {
          const value = [...model.value];
          value.splice(index, 1);
          model.value = value;
        }
        search.value = "";
      } else {
        model.value = [item];
        _search.value = item.title;
        nextTick(() => {
          menu.value = false;
          isPristine.value = true;
        });
      }
    }
    function onFocusin(e2) {
      isFocused.value = true;
    }
    function onFocusout(e2) {
      if (e2.relatedTarget == null) {
        var _vTextFieldRef$value2;
        (_vTextFieldRef$value2 = vTextFieldRef.value) == null ? void 0 : _vTextFieldRef$value2.focus();
      }
    }
    watch(filteredItems, (val) => {
      if (!val.length && props.hideNoData)
        menu.value = false;
    });
    watch(isFocused, (val) => {
      if (val) {
        selectionIndex.value = -1;
      } else {
        menu.value = false;
        if (!props.multiple || !search.value)
          return;
        model.value = [...model.value, transformItem$1(props, search.value)];
        search.value = "";
      }
    });
    useRender(() => {
      const hasChips = !!(props.chips || slots.chip);
      const [textFieldProps] = filterVTextFieldProps(props);
      return createVNode(VTextField, mergeProps({
        "ref": vTextFieldRef
      }, textFieldProps, {
        "modelValue": search.value,
        "onUpdate:modelValue": [($event) => search.value = $event, (v) => {
          if (v == null)
            model.value = [];
        }],
        "validationValue": model.externalValue,
        "dirty": model.value.length > 0,
        "class": ["v-combobox", {
          "v-combobox--active-menu": menu.value,
          "v-combobox--chips": !!props.chips,
          "v-combobox--selecting-index": selectionIndex.value > -1,
          [`v-combobox--${props.multiple ? "multiple" : "single"}`]: true
        }],
        "appendInnerIcon": props.items.length ? props.menuIcon : void 0,
        "readonly": props.readonly,
        "onClick:clear": onClear,
        "onClick:control": onClickControl,
        "onClick:input": onClickControl,
        "onFocus": () => isFocused.value = true,
        "onBlur": () => isFocused.value = false,
        "onKeydown": onKeydown
      }), {
        ...slots,
        default: () => {
          var _slots$noData, _slots$prependItem, _slots$appendItem;
          return createVNode(Fragment, null, [createVNode(VMenu, mergeProps({
            "modelValue": menu.value,
            "onUpdate:modelValue": ($event) => menu.value = $event,
            "activator": "parent",
            "contentClass": "v-combobox__content",
            "eager": props.eager,
            "openOnClick": false,
            "closeOnContentClick": false,
            "transition": props.transition,
            "onAfterLeave": onAfterLeave
          }, props.menuProps), {
            default: () => [createVNode(VList, {
              "ref": listRef,
              "selected": selected.value,
              "selectStrategy": props.multiple ? "independent" : "single-independent",
              "onMousedown": (e2) => e2.preventDefault(),
              "onFocusin": onFocusin,
              "onFocusout": onFocusout
            }, {
              default: () => [!filteredItems.value.length && !props.hideNoData && (((_slots$noData = slots["no-data"]) == null ? void 0 : _slots$noData.call(slots)) ?? createVNode(VListItem, {
                "title": t2(props.noDataText)
              }, null)), (_slots$prependItem = slots["prepend-item"]) == null ? void 0 : _slots$prependItem.call(slots), filteredItems.value.map((item, index) => {
                var _slots$item;
                return ((_slots$item = slots.item) == null ? void 0 : _slots$item.call(slots, {
                  item,
                  index,
                  props: mergeProps(item.props, {
                    onClick: () => select(item)
                  })
                })) ?? createVNode(VListItem, mergeProps({
                  "key": index
                }, item.props, {
                  "onClick": () => select(item)
                }), {
                  prepend: (_ref2) => {
                    let {
                      isSelected
                    } = _ref2;
                    return props.multiple && !props.hideSelected ? createVNode(VCheckboxBtn, {
                      "modelValue": isSelected,
                      "ripple": false
                    }, null) : void 0;
                  },
                  title: () => {
                    var _getMatches, _search$value;
                    return isPristine.value ? item.title : highlightResult(item.title, (_getMatches = getMatches(item)) == null ? void 0 : _getMatches.title, ((_search$value = search.value) == null ? void 0 : _search$value.length) ?? 0);
                  }
                });
              }), (_slots$appendItem = slots["append-item"]) == null ? void 0 : _slots$appendItem.call(slots)]
            })]
          }), selections.value.map((item, index) => {
            function onChipClose(e2) {
              e2.stopPropagation();
              e2.preventDefault();
              select(item);
            }
            const slotProps = {
              "onClick:close": onChipClose,
              modelValue: true,
              "onUpdate:modelValue": void 0
            };
            return createVNode("div", {
              "key": item.value,
              "class": ["v-combobox__selection", index === selectionIndex.value && ["v-combobox__selection--selected", textColorClasses.value]],
              "style": index === selectionIndex.value ? textColorStyles.value : {}
            }, [hasChips ? createVNode(VDefaultsProvider, {
              "defaults": {
                VChip: {
                  closable: props.closableChips,
                  size: "small",
                  text: item.title
                }
              }
            }, {
              default: () => [slots.chip ? slots.chip({
                item,
                index,
                props: slotProps
              }) : createVNode(VChip, slotProps, null)]
            }) : slots.selection ? slots.selection({
              item,
              index
            }) : createVNode("span", {
              "class": "v-combobox__selection-text"
            }, [item.title, props.multiple && index < selections.value.length - 1 && createVNode("span", {
              "class": "v-combobox__selection-comma"
            }, [createTextVNode(",")])])]);
          })]);
        }
      });
    });
    return forwardRefs({
      isFocused,
      isPristine,
      menu,
      search,
      selectionIndex,
      filteredItems,
      select
    }, vTextFieldRef);
  }
});
const VDialog$1 = "";
const VDialog = genericComponent()({
  name: "VDialog",
  props: {
    fullscreen: Boolean,
    retainFocus: {
      type: Boolean,
      default: true
    },
    scrollable: Boolean,
    ...makeVOverlayProps({
      origin: "center center",
      scrollStrategy: "block",
      transition: {
        component: VDialogTransition
      },
      zIndex: 2400
    })
  },
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const isActive = useProxiedModel(props, "modelValue");
    const {
      scopeId
    } = useScopeId();
    const overlay = ref();
    function onFocusin(e2) {
      var _overlay$value, _overlay$value2;
      const before = e2.relatedTarget;
      const after = e2.target;
      if (before !== after && (_overlay$value = overlay.value) != null && _overlay$value.contentEl && (_overlay$value2 = overlay.value) != null && _overlay$value2.globalTop && // It isn't the document or the dialog body
      ![document, overlay.value.contentEl].includes(after) && // It isn't inside the dialog body
      !overlay.value.contentEl.contains(after)) {
        const focusable = [...overlay.value.contentEl.querySelectorAll('button, [href], input:not([type="hidden"]), select, textarea, [tabindex]:not([tabindex="-1"])')].filter((el) => !el.hasAttribute("disabled") && !el.matches('[tabindex="-1"]'));
        if (!focusable.length)
          return;
        const firstElement = focusable[0];
        const lastElement = focusable[focusable.length - 1];
        if (before === firstElement) {
          lastElement.focus();
        } else {
          firstElement.focus();
        }
      }
    }
    if (IN_BROWSER) {
      watch(() => isActive.value && props.retainFocus, (val) => {
        val ? document.addEventListener("focusin", onFocusin) : document.removeEventListener("focusin", onFocusin);
      }, {
        immediate: true
      });
    }
    watch(isActive, async (val) => {
      await nextTick();
      if (val) {
        var _contentEl;
        (_contentEl = overlay.value.contentEl) == null ? void 0 : _contentEl.focus({
          preventScroll: true
        });
      } else {
        var _activatorEl;
        (_activatorEl = overlay.value.activatorEl) == null ? void 0 : _activatorEl.focus({
          preventScroll: true
        });
      }
    });
    useRender(() => {
      const [overlayProps] = filterVOverlayProps(props);
      return createVNode(VOverlay, mergeProps({
        "ref": overlay,
        "class": ["v-dialog", {
          "v-dialog--fullscreen": props.fullscreen,
          "v-dialog--scrollable": props.scrollable
        }]
      }, overlayProps, {
        "modelValue": isActive.value,
        "onUpdate:modelValue": ($event) => isActive.value = $event,
        "aria-role": "dialog",
        "aria-modal": "true",
        "activatorProps": mergeProps({
          "aria-haspopup": "dialog",
          "aria-expanded": String(isActive.value)
        }, props.activatorProps)
      }, scopeId), {
        activator: slots.activator,
        default: function() {
          var _slots$default;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          return createVNode(VDefaultsProvider, {
            "root": true
          }, {
            default: () => [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, ...args)]
          });
        }
      });
    });
    return forwardRefs({}, overlay);
  }
});
const VExpansionPanel$1 = "";
const VExpansionPanelSymbol = Symbol.for("vuetify:v-expansion-panel");
const allowedVariants = ["default", "accordion", "inset", "popout"];
const VExpansionPanels = defineComponent({
  name: "VExpansionPanels",
  props: {
    color: String,
    variant: {
      type: String,
      default: "default",
      validator: (v) => allowedVariants.includes(v)
    },
    readonly: Boolean,
    ...makeGroupProps(),
    ...makeTagProps(),
    ...makeThemeProps()
  },
  emits: {
    "update:modelValue": (val) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useGroup(props, VExpansionPanelSymbol);
    const {
      themeClasses
    } = provideTheme(props);
    const variantClass = computed(() => props.variant && `v-expansion-panels--variant-${props.variant}`);
    provideDefaults({
      VExpansionPanel: {
        color: toRef(props, "color")
      },
      VExpansionPanelTitle: {
        readonly: toRef(props, "readonly")
      }
    });
    useRender(() => createVNode(props.tag, {
      "class": ["v-expansion-panels", themeClasses.value, variantClass.value]
    }, slots));
    return {};
  }
});
const makeVExpansionPanelTitleProps = propsFactory({
  color: String,
  expandIcon: {
    type: IconValue,
    default: "$expand"
  },
  collapseIcon: {
    type: IconValue,
    default: "$collapse"
  },
  hideActions: Boolean,
  ripple: {
    type: [Boolean, Object],
    default: false
  },
  readonly: Boolean
}, "v-expansion-panel-title");
const VExpansionPanelTitle = defineComponent({
  name: "VExpansionPanelTitle",
  directives: {
    Ripple
  },
  props: {
    ...makeVExpansionPanelTitleProps()
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const expansionPanel = inject$1(VExpansionPanelSymbol);
    if (!expansionPanel)
      throw new Error("[Vuetify] v-expansion-panel-title needs to be placed inside v-expansion-panel");
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(props, "color");
    const slotProps = computed(() => ({
      collapseIcon: props.collapseIcon,
      disabled: expansionPanel.disabled.value,
      expanded: expansionPanel.isSelected.value,
      expandIcon: props.expandIcon,
      readonly: props.readonly
    }));
    useRender(() => {
      var _slots$default;
      return withDirectives(createVNode("button", {
        "class": ["v-expansion-panel-title", {
          "v-expansion-panel-title--active": expansionPanel.isSelected.value
        }, backgroundColorClasses.value],
        "style": backgroundColorStyles.value,
        "type": "button",
        "tabindex": expansionPanel.disabled.value ? -1 : void 0,
        "disabled": expansionPanel.disabled.value,
        "aria-expanded": expansionPanel.isSelected.value,
        "onClick": !props.readonly ? expansionPanel.toggle : void 0
      }, [createVNode("span", {
        "class": "v-expansion-panel-title__overlay"
      }, null), (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, slotProps.value), !props.hideActions && createVNode("span", {
        "class": "v-expansion-panel-title__icon"
      }, [slots.actions ? slots.actions(slotProps.value) : createVNode(VIcon, {
        "icon": expansionPanel.isSelected.value ? props.collapseIcon : props.expandIcon
      }, null)])]), [[resolveDirective("ripple"), props.ripple]]);
    });
    return {};
  }
});
const VExpansionPanelText = defineComponent({
  name: "VExpansionPanelText",
  props: {
    ...makeLazyProps()
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const expansionPanel = inject$1(VExpansionPanelSymbol);
    if (!expansionPanel)
      throw new Error("[Vuetify] v-expansion-panel-text needs to be placed inside v-expansion-panel");
    const {
      hasContent,
      onAfterLeave
    } = useLazy(props, expansionPanel.isSelected);
    useRender(() => {
      var _slots$default;
      return createVNode(VExpandTransition, {
        "onAfterLeave": onAfterLeave
      }, {
        default: () => [withDirectives(createVNode("div", {
          "class": "v-expansion-panel-text"
        }, [slots.default && hasContent.value && createVNode("div", {
          "class": "v-expansion-panel-text__wrapper"
        }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)])]), [[vShow, expansionPanel.isSelected.value]])]
      });
    });
    return {};
  }
});
const VExpansionPanel = defineComponent({
  name: "VExpansionPanel",
  props: {
    title: String,
    text: String,
    bgColor: String,
    ...makeElevationProps(),
    ...makeGroupItemProps(),
    ...makeLazyProps(),
    ...makeRoundedProps(),
    ...makeTagProps(),
    ...makeVExpansionPanelTitleProps()
  },
  emits: {
    "group:selected": (val) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const groupItem = useGroupItem(props, VExpansionPanelSymbol);
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(props, "bgColor");
    const {
      elevationClasses
    } = useElevation(props);
    const {
      roundedClasses
    } = useRounded(props);
    const isDisabled = computed(() => (groupItem == null ? void 0 : groupItem.disabled.value) || props.disabled);
    const selectedIndices = computed(() => groupItem.group.items.value.reduce((arr, item, index) => {
      if (groupItem.group.selected.value.includes(item.id))
        arr.push(index);
      return arr;
    }, []));
    const isBeforeSelected = computed(() => {
      const index = groupItem.group.items.value.findIndex((item) => item.id === groupItem.id);
      return !groupItem.isSelected.value && selectedIndices.value.some((selectedIndex) => selectedIndex - index === 1);
    });
    const isAfterSelected = computed(() => {
      const index = groupItem.group.items.value.findIndex((item) => item.id === groupItem.id);
      return !groupItem.isSelected.value && selectedIndices.value.some((selectedIndex) => selectedIndex - index === -1);
    });
    provide(VExpansionPanelSymbol, groupItem);
    useRender(() => {
      var _slots$default;
      const hasText = !!(slots.text || props.text);
      const hasTitle = !!(slots.title || props.title);
      return createVNode(props.tag, {
        "class": ["v-expansion-panel", {
          "v-expansion-panel--active": groupItem.isSelected.value,
          "v-expansion-panel--before-active": isBeforeSelected.value,
          "v-expansion-panel--after-active": isAfterSelected.value,
          "v-expansion-panel--disabled": isDisabled.value
        }, roundedClasses.value, backgroundColorClasses.value],
        "style": backgroundColorStyles.value,
        "aria-expanded": groupItem.isSelected.value
      }, {
        default: () => [createVNode("div", {
          "class": ["v-expansion-panel__shadow", ...elevationClasses.value]
        }, null), hasTitle && createVNode(VExpansionPanelTitle, {
          "key": "title",
          "collapseIcon": props.collapseIcon,
          "color": props.color,
          "expandIcon": props.expandIcon,
          "hideActions": props.hideActions,
          "ripple": props.ripple
        }, {
          default: () => [slots.title ? slots.title() : props.title]
        }), hasText && createVNode(VExpansionPanelText, {
          "key": "text",
          "eager": props.eager
        }, {
          default: () => [slots.text ? slots.text() : props.text]
        }), (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)]
      });
    });
    return {};
  }
});
const VFileInput$1 = "";
const VFileInput = defineComponent({
  name: "VFileInput",
  inheritAttrs: false,
  props: {
    chips: Boolean,
    counter: Boolean,
    counterSizeString: {
      type: String,
      default: "$vuetify.fileInput.counterSize"
    },
    counterString: {
      type: String,
      default: "$vuetify.fileInput.counter"
    },
    multiple: Boolean,
    hint: String,
    persistentHint: Boolean,
    placeholder: String,
    showSize: {
      type: [Boolean, Number],
      default: false,
      validator: (v) => {
        return typeof v === "boolean" || [1e3, 1024].includes(v);
      }
    },
    ...makeVInputProps({
      prependIcon: "$file"
    }),
    modelValue: {
      type: Array,
      default: () => [],
      validator: (val) => {
        return wrapInArray(val).every((v) => v != null && typeof v === "object");
      }
    },
    ...makeVFieldProps({
      clearable: true
    })
  },
  emits: {
    "click:control": (e2) => true,
    "update:modelValue": (files) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      emit,
      slots
    } = _ref;
    const {
      t: t2
    } = useLocale();
    const model = useProxiedModel(props, "modelValue");
    const base = computed(() => typeof props.showSize !== "boolean" ? props.showSize : void 0);
    const totalBytes = computed(() => (model.value ?? []).reduce((bytes, _ref2) => {
      let {
        size = 0
      } = _ref2;
      return bytes + size;
    }, 0));
    const totalBytesReadable = computed(() => humanReadableFileSize(totalBytes.value, base.value));
    const fileNames = computed(() => (model.value ?? []).map((file) => {
      const {
        name: name2 = "",
        size = 0
      } = file;
      return !props.showSize ? name2 : `${name2} (${humanReadableFileSize(size, base.value)})`;
    }));
    const counterValue = computed(() => {
      var _model$value;
      const fileCount = ((_model$value = model.value) == null ? void 0 : _model$value.length) ?? 0;
      if (props.showSize)
        return t2(props.counterSizeString, fileCount, totalBytesReadable.value);
      else
        return t2(props.counterString, fileCount);
    });
    const vInputRef = ref();
    const vFieldRef = ref();
    const isFocused = ref(false);
    const inputRef = ref();
    const messages = computed(() => {
      return props.messages.length ? props.messages : props.persistentHint ? props.hint : "";
    });
    function onFocus() {
      if (inputRef.value !== document.activeElement) {
        var _inputRef$value;
        (_inputRef$value = inputRef.value) == null ? void 0 : _inputRef$value.focus();
      }
      if (!isFocused.value) {
        isFocused.value = true;
      }
    }
    function onClickPrepend(e2) {
      callEvent(props["onClick:prepend"], e2);
      onControlClick(e2);
    }
    function onControlClick(e2) {
      var _inputRef$value2;
      (_inputRef$value2 = inputRef.value) == null ? void 0 : _inputRef$value2.click();
      emit("click:control", e2);
    }
    function onClear(e2) {
      e2.stopPropagation();
      onFocus();
      nextTick(() => {
        model.value = [];
        if (inputRef != null && inputRef.value) {
          inputRef.value.value = "";
        }
        callEvent(props["onClick:clear"], e2);
      });
    }
    useRender(() => {
      const hasCounter = !!(slots.counter || props.counter);
      const hasDetails = !!(hasCounter || slots.details);
      const [rootAttrs, inputAttrs] = filterInputAttrs(attrs);
      const [{
        modelValue: _2,
        ...inputProps
      }] = filterInputProps(props);
      const [fieldProps] = filterFieldProps(props);
      return createVNode(VInput, mergeProps({
        "ref": vInputRef,
        "modelValue": model.value,
        "onUpdate:modelValue": ($event) => model.value = $event,
        "class": "v-file-input",
        "onClick:prepend": onClickPrepend,
        "onClick:append": props["onClick:append"]
      }, rootAttrs, inputProps, {
        "focused": isFocused.value,
        "messages": messages.value
      }), {
        ...slots,
        default: (_ref3) => {
          let {
            isDisabled,
            isDirty,
            isReadonly,
            isValid
          } = _ref3;
          return createVNode(VField, mergeProps({
            "ref": vFieldRef,
            "prepend-icon": props.prependIcon,
            "onClick:control": onControlClick,
            "onClick:clear": onClear,
            "onClick:prependInner": props["onClick:prependInner"],
            "onClick:appendInner": props["onClick:appendInner"]
          }, fieldProps, {
            "active": isDirty.value || isFocused.value,
            "dirty": isDirty.value,
            "focused": isFocused.value,
            "error": isValid.value === false
          }), {
            ...slots,
            default: (_ref4) => {
              var _model$value2;
              let {
                props: {
                  class: fieldClass,
                  ...slotProps
                }
              } = _ref4;
              return createVNode(Fragment, null, [createVNode("input", mergeProps({
                "ref": inputRef,
                "type": "file",
                "readonly": isReadonly.value,
                "disabled": isDisabled.value,
                "multiple": props.multiple,
                "name": props.name,
                "onClick": (e2) => {
                  e2.stopPropagation();
                  onFocus();
                },
                "onChange": (e2) => {
                  if (!e2.target)
                    return;
                  const target = e2.target;
                  model.value = [...target.files ?? []];
                },
                "onFocus": onFocus,
                "onBlur": () => isFocused.value = false
              }, slotProps, inputAttrs), null), createVNode("div", {
                "class": fieldClass
              }, [!!((_model$value2 = model.value) != null && _model$value2.length) && (slots.selection ? slots.selection({
                fileNames: fileNames.value,
                totalBytes: totalBytes.value,
                totalBytesReadable: totalBytesReadable.value
              }) : props.chips ? fileNames.value.map((text) => createVNode(VChip, {
                "key": text,
                "size": "small",
                "color": props.color
              }, {
                default: () => [text]
              })) : fileNames.value.join(", "))])]);
            }
          });
        },
        details: hasDetails ? (slotProps) => {
          var _slots$details, _model$value3;
          return createVNode(Fragment, null, [(_slots$details = slots.details) == null ? void 0 : _slots$details.call(slots, slotProps), hasCounter && createVNode(Fragment, null, [createVNode("span", null, null), createVNode(VCounter, {
            "active": !!((_model$value3 = model.value) != null && _model$value3.length),
            "value": counterValue.value
          }, slots.counter)])]);
        } : void 0
      });
    });
    return forwardRefs({}, vInputRef, vFieldRef, inputRef);
  }
});
const VFooter$1 = "";
const VFooter = defineComponent({
  name: "VFooter",
  props: {
    app: Boolean,
    color: String,
    height: {
      type: [Number, String],
      default: "auto"
    },
    ...makeBorderProps(),
    ...makeElevationProps(),
    ...makeLayoutItemProps(),
    ...makeRoundedProps(),
    ...makeTagProps({
      tag: "footer"
    }),
    ...makeThemeProps()
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(toRef(props, "color"));
    const {
      borderClasses
    } = useBorder(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      roundedClasses
    } = useRounded(props);
    const autoHeight = ref(32);
    const {
      resizeRef
    } = useResizeObserver((entries) => {
      if (!entries.length)
        return;
      autoHeight.value = entries[0].target.clientHeight;
    });
    const height = computed(() => props.height === "auto" ? autoHeight.value : parseInt(props.height, 10));
    const {
      layoutItemStyles
    } = useLayoutItem({
      id: props.name,
      order: computed(() => parseInt(props.order, 10)),
      position: computed(() => "bottom"),
      layoutSize: height,
      elementSize: computed(() => props.height === "auto" ? void 0 : height.value),
      active: computed(() => props.app),
      absolute: toRef(props, "absolute")
    });
    useRender(() => createVNode(props.tag, {
      "ref": resizeRef,
      "class": ["v-footer", themeClasses.value, backgroundColorClasses.value, borderClasses.value, elevationClasses.value, roundedClasses.value],
      "style": [backgroundColorStyles.value, props.app ? layoutItemStyles.value : void 0]
    }, slots));
    return {};
  }
});
const VForm = defineComponent({
  name: "VForm",
  props: {
    ...makeFormProps()
  },
  emits: {
    "update:modelValue": (val) => true,
    submit: (e2) => true
  },
  setup(props, _ref) {
    let {
      slots,
      emit
    } = _ref;
    const form = createForm(props);
    const formRef = ref();
    function onReset(e2) {
      e2.preventDefault();
      form.reset();
    }
    function onSubmit(_e2) {
      const e2 = _e2;
      const ready = form.validate();
      e2.then = ready.then.bind(ready);
      e2.catch = ready.catch.bind(ready);
      e2.finally = ready.finally.bind(ready);
      emit("submit", e2);
      if (!e2.defaultPrevented) {
        ready.then((_ref2) => {
          let {
            valid
          } = _ref2;
          if (valid) {
            var _formRef$value;
            (_formRef$value = formRef.value) == null ? void 0 : _formRef$value.submit();
          }
        });
      }
      e2.preventDefault();
    }
    useRender(() => {
      var _slots$default;
      return createVNode("form", {
        "ref": formRef,
        "class": "v-form",
        "novalidate": true,
        "onReset": onReset,
        "onSubmit": onSubmit
      }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, form)]);
    });
    return forwardRefs(form, formRef);
  }
});
const VGrid = "";
const VContainer = defineComponent({
  name: "VContainer",
  props: {
    fluid: {
      type: Boolean,
      default: false
    },
    ...makeTagProps()
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => createVNode(props.tag, {
      "class": ["v-container", {
        "v-container--fluid": props.fluid
      }]
    }, slots));
    return {};
  }
});
const breakpoints$1 = ["sm", "md", "lg", "xl", "xxl"];
const breakpointProps = (() => {
  return breakpoints$1.reduce((props, val) => {
    props[val] = {
      type: [Boolean, String, Number],
      default: false
    };
    return props;
  }, {});
})();
const offsetProps = (() => {
  return breakpoints$1.reduce((props, val) => {
    props["offset" + capitalize$2(val)] = {
      type: [String, Number],
      default: null
    };
    return props;
  }, {});
})();
const orderProps = (() => {
  return breakpoints$1.reduce((props, val) => {
    props["order" + capitalize$2(val)] = {
      type: [String, Number],
      default: null
    };
    return props;
  }, {});
})();
const propMap$1 = {
  col: Object.keys(breakpointProps),
  offset: Object.keys(offsetProps),
  order: Object.keys(orderProps)
};
function breakpointClass$1(type, prop, val) {
  let className = type;
  if (val == null || val === false) {
    return void 0;
  }
  if (prop) {
    const breakpoint = prop.replace(type, "");
    className += `-${breakpoint}`;
  }
  if (type === "col") {
    className = "v-" + className;
  }
  if (type === "col" && (val === "" || val === true)) {
    return className.toLowerCase();
  }
  className += `-${val}`;
  return className.toLowerCase();
}
const ALIGN_SELF_VALUES = ["auto", "start", "end", "center", "baseline", "stretch"];
const VCol = defineComponent({
  name: "VCol",
  props: {
    cols: {
      type: [Boolean, String, Number],
      default: false
    },
    ...breakpointProps,
    offset: {
      type: [String, Number],
      default: null
    },
    ...offsetProps,
    order: {
      type: [String, Number],
      default: null
    },
    ...orderProps,
    alignSelf: {
      type: String,
      default: null,
      validator: (str) => ALIGN_SELF_VALUES.includes(str)
    },
    ...makeTagProps()
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const classes = computed(() => {
      const classList = [];
      let type;
      for (type in propMap$1) {
        propMap$1[type].forEach((prop) => {
          const value = props[prop];
          const className = breakpointClass$1(type, prop, value);
          if (className)
            classList.push(className);
        });
      }
      const hasColClasses = classList.some((className) => className.startsWith("v-col-"));
      classList.push({
        // Default to .v-col if no other col-{bp}-* classes generated nor `cols` specified.
        "v-col": !hasColClasses || !props.cols,
        [`v-col-${props.cols}`]: props.cols,
        [`offset-${props.offset}`]: props.offset,
        [`order-${props.order}`]: props.order,
        [`align-self-${props.alignSelf}`]: props.alignSelf
      });
      return classList;
    });
    return () => {
      var _slots$default;
      return h(props.tag, {
        class: classes.value
      }, (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots));
    };
  }
});
const breakpoints = ["sm", "md", "lg", "xl", "xxl"];
const ALIGNMENT = ["start", "end", "center"];
const SPACE = ["space-between", "space-around", "space-evenly"];
function makeRowProps(prefix, def) {
  return breakpoints.reduce((props, val) => {
    props[prefix + capitalize$2(val)] = def();
    return props;
  }, {});
}
const ALIGN_VALUES = [...ALIGNMENT, "baseline", "stretch"];
const alignValidator = (str) => ALIGN_VALUES.includes(str);
const alignProps = makeRowProps("align", () => ({
  type: String,
  default: null,
  validator: alignValidator
}));
const JUSTIFY_VALUES = [...ALIGNMENT, ...SPACE];
const justifyValidator = (str) => JUSTIFY_VALUES.includes(str);
const justifyProps = makeRowProps("justify", () => ({
  type: String,
  default: null,
  validator: justifyValidator
}));
const ALIGN_CONTENT_VALUES = [...ALIGNMENT, ...SPACE, "stretch"];
const alignContentValidator = (str) => ALIGN_CONTENT_VALUES.includes(str);
const alignContentProps = makeRowProps("alignContent", () => ({
  type: String,
  default: null,
  validator: alignContentValidator
}));
const propMap = {
  align: Object.keys(alignProps),
  justify: Object.keys(justifyProps),
  alignContent: Object.keys(alignContentProps)
};
const classMap = {
  align: "align",
  justify: "justify",
  alignContent: "align-content"
};
function breakpointClass(type, prop, val) {
  let className = classMap[type];
  if (val == null) {
    return void 0;
  }
  if (prop) {
    const breakpoint = prop.replace(type, "");
    className += `-${breakpoint}`;
  }
  className += `-${val}`;
  return className.toLowerCase();
}
const VRow = defineComponent({
  name: "VRow",
  props: {
    dense: Boolean,
    noGutters: Boolean,
    align: {
      type: String,
      default: null,
      validator: alignValidator
    },
    ...alignProps,
    justify: {
      type: String,
      default: null,
      validator: justifyValidator
    },
    ...justifyProps,
    alignContent: {
      type: String,
      default: null,
      validator: alignContentValidator
    },
    ...alignContentProps,
    ...makeTagProps()
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const classes = computed(() => {
      const classList = [];
      let type;
      for (type in propMap) {
        propMap[type].forEach((prop) => {
          const value = props[prop];
          const className = breakpointClass(type, prop, value);
          if (className)
            classList.push(className);
        });
      }
      classList.push({
        "v-row--no-gutters": props.noGutters,
        "v-row--dense": props.dense,
        [`align-${props.align}`]: props.align,
        [`justify-${props.justify}`]: props.justify,
        [`align-content-${props.alignContent}`]: props.alignContent
      });
      return classList;
    });
    return () => {
      var _slots$default;
      return h(props.tag, {
        class: ["v-row", classes.value]
      }, (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots));
    };
  }
});
const VSpacer = createSimpleFunctional("flex-grow-1", "div", "VSpacer");
const VHover = defineComponent({
  name: "VHover",
  props: {
    disabled: Boolean,
    modelValue: {
      type: Boolean,
      default: void 0
    },
    ...makeDelayProps()
  },
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const isHovering = useProxiedModel(props, "modelValue");
    const {
      runOpenDelay,
      runCloseDelay
    } = useDelay(props, (value) => !props.disabled && (isHovering.value = value));
    return () => {
      var _slots$default;
      return (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, {
        isHovering: isHovering.value,
        props: {
          onMouseenter: runOpenDelay,
          onMouseleave: runCloseDelay
        }
      });
    };
  }
});
const VItemGroup$1 = "";
const VItemGroupSymbol = Symbol.for("vuetify:v-item-group");
const VItemGroup = defineComponent({
  name: "VItemGroup",
  props: {
    ...makeGroupProps({
      selectedClass: "v-item--selected"
    }),
    ...makeTagProps(),
    ...makeThemeProps()
  },
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      isSelected,
      select,
      next,
      prev,
      selected
    } = useGroup(props, VItemGroupSymbol);
    return () => {
      var _slots$default;
      return createVNode(props.tag, {
        "class": ["v-item-group", themeClasses.value]
      }, {
        default: () => [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, {
          isSelected,
          select,
          next,
          prev,
          selected: selected.value
        })]
      });
    };
  }
});
const VItem = genericComponent()({
  name: "VItem",
  props: makeGroupItemProps(),
  emits: {
    "group:selected": (val) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      isSelected,
      select,
      toggle,
      selectedClass,
      value,
      disabled
    } = useGroupItem(props, VItemGroupSymbol);
    return () => {
      var _slots$default;
      return (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, {
        isSelected: isSelected.value,
        selectedClass: selectedClass.value,
        select,
        toggle,
        value: value.value,
        disabled: disabled.value
      });
    };
  }
});
const VKbd$1 = "";
const VKbd = createSimpleFunctional("v-kbd");
const VLayout$1 = "";
const VLayout = defineComponent({
  name: "VLayout",
  props: makeLayoutProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      layoutClasses,
      layoutStyles,
      getLayoutItem,
      items,
      layoutRef
    } = createLayout(props);
    useRender(() => {
      var _slots$default;
      return createVNode("div", {
        "ref": layoutRef,
        "class": layoutClasses.value,
        "style": layoutStyles.value
      }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)]);
    });
    return {
      getLayoutItem,
      items
    };
  }
});
const VLayoutItem$1 = "";
const VLayoutItem = defineComponent({
  name: "VLayoutItem",
  props: {
    position: {
      type: String,
      required: true
    },
    size: {
      type: [Number, String],
      default: 300
    },
    modelValue: Boolean,
    ...makeLayoutItemProps()
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      layoutItemStyles
    } = useLayoutItem({
      id: props.name,
      order: computed(() => parseInt(props.order, 10)),
      position: toRef(props, "position"),
      elementSize: toRef(props, "size"),
      layoutSize: toRef(props, "size"),
      active: toRef(props, "modelValue"),
      absolute: toRef(props, "absolute")
    });
    return () => {
      var _slots$default;
      return createVNode("div", {
        "class": ["v-layout-item"],
        "style": layoutItemStyles.value
      }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)]);
    };
  }
});
const VLazy = defineComponent({
  name: "VLazy",
  directives: {
    intersect: Intersect
  },
  props: {
    modelValue: Boolean,
    options: {
      type: Object,
      // For more information on types, navigate to:
      // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
      default: () => ({
        root: void 0,
        rootMargin: void 0,
        threshold: void 0
      })
    },
    ...makeDimensionProps(),
    ...makeTagProps(),
    ...makeTransitionProps({
      transition: "fade-transition"
    })
  },
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      dimensionStyles
    } = useDimension(props);
    const isActive = useProxiedModel(props, "modelValue");
    function onIntersect(isIntersecting) {
      if (isActive.value)
        return;
      isActive.value = isIntersecting;
    }
    useRender(() => {
      var _slots$default;
      return withDirectives(createVNode(props.tag, {
        "class": "v-lazy",
        "style": dimensionStyles.value
      }, {
        default: () => [isActive.value && createVNode(MaybeTransition, {
          "transition": props.transition,
          "appear": true
        }, {
          default: () => [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)]
        })]
      }), [[resolveDirective("intersect"), onIntersect, props.options]]);
    });
    return {};
  }
});
const VLocaleProvider$1 = "";
const VLocaleProvider = defineComponent({
  name: "VLocaleProvider",
  props: {
    locale: String,
    fallbackLocale: String,
    messages: Object,
    rtl: {
      type: Boolean,
      default: void 0
    }
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      rtlClasses
    } = provideLocale(props);
    useRender(() => {
      var _slots$default;
      return createVNode("div", {
        "class": ["v-locale-provider", rtlClasses.value]
      }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)]);
    });
    return {};
  }
});
const VMain$1 = "";
const VMain = defineComponent({
  name: "VMain",
  props: {
    scrollable: Boolean,
    ...makeTagProps({
      tag: "main"
    })
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      mainStyles
    } = useLayout();
    const {
      ssrBootStyles
    } = useSsrBoot();
    useRender(() => {
      var _slots$default, _slots$default2;
      return createVNode(props.tag, {
        "class": ["v-main", {
          "v-main--scrollable": props.scrollable
        }],
        "style": [mainStyles.value, ssrBootStyles.value]
      }, {
        default: () => [props.scrollable ? createVNode("div", {
          "class": "v-main__scroller"
        }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)]) : (_slots$default2 = slots.default) == null ? void 0 : _slots$default2.call(slots)]
      });
    });
    return {};
  }
});
const VNavigationDrawer$1 = "";
function useSticky(_ref) {
  let {
    rootEl,
    isSticky,
    layoutItemStyles
  } = _ref;
  const isStuck = ref(false);
  const stuckPosition = ref(0);
  const stickyStyles = computed(() => {
    const side = typeof isStuck.value === "boolean" ? "top" : isStuck.value;
    return [isSticky.value ? {
      top: "auto",
      bottom: "auto",
      height: void 0
    } : void 0, isStuck.value ? {
      [side]: convertToUnit(stuckPosition.value)
    } : {
      top: layoutItemStyles.value.top
    }];
  });
  onMounted(() => {
    watch(isSticky, (val) => {
      if (val) {
        window.addEventListener("scroll", onScroll, {
          passive: true
        });
      } else {
        window.removeEventListener("scroll", onScroll);
      }
    }, {
      immediate: true
    });
  });
  onBeforeUnmount(() => {
    document.removeEventListener("scroll", onScroll);
  });
  let lastScrollTop = 0;
  function onScroll() {
    const direction = lastScrollTop > window.scrollY ? "up" : "down";
    const rect = rootEl.value.getBoundingClientRect();
    const layoutTop = parseFloat(layoutItemStyles.value.top ?? 0);
    const top = window.scrollY - Math.max(0, stuckPosition.value - layoutTop);
    const bottom = rect.height + Math.max(stuckPosition.value, layoutTop) - window.scrollY - window.innerHeight;
    if (rect.height < window.innerHeight - layoutTop) {
      isStuck.value = "top";
      stuckPosition.value = layoutTop;
    } else if (direction === "up" && isStuck.value === "bottom" || direction === "down" && isStuck.value === "top") {
      stuckPosition.value = window.scrollY + rect.top;
      isStuck.value = true;
    } else if (direction === "down" && bottom <= 0) {
      stuckPosition.value = 0;
      isStuck.value = "bottom";
    } else if (direction === "up" && top <= 0) {
      stuckPosition.value = rect.top + top;
      isStuck.value = "top";
    }
    lastScrollTop = window.scrollY;
  }
  return {
    isStuck,
    stickyStyles
  };
}
const HORIZON = 100;
const HISTORY = 20;
function kineticEnergyToVelocity(work) {
  const sqrt2 = 1.41421356237;
  return (work < 0 ? -1 : 1) * Math.sqrt(Math.abs(work)) * sqrt2;
}
function calculateImpulseVelocity(samples) {
  if (samples.length < 2) {
    return 0;
  }
  if (samples.length === 2) {
    if (samples[1].t === samples[0].t) {
      return 0;
    }
    return (samples[1].d - samples[0].d) / (samples[1].t - samples[0].t);
  }
  let work = 0;
  for (let i2 = samples.length - 1; i2 > 0; i2--) {
    if (samples[i2].t === samples[i2 - 1].t) {
      continue;
    }
    const vprev = kineticEnergyToVelocity(work);
    const vcurr = (samples[i2].d - samples[i2 - 1].d) / (samples[i2].t - samples[i2 - 1].t);
    work += (vcurr - vprev) * Math.abs(vcurr);
    if (i2 === samples.length - 1) {
      work *= 0.5;
    }
  }
  return kineticEnergyToVelocity(work) * 1e3;
}
function useVelocity() {
  const touches = {};
  function addMovement(e2) {
    Array.from(e2.changedTouches).forEach((touch) => {
      const samples = touches[touch.identifier] ?? (touches[touch.identifier] = new CircularBuffer(HISTORY));
      samples.push([e2.timeStamp, touch]);
    });
  }
  function endTouch(e2) {
    Array.from(e2.changedTouches).forEach((touch) => {
      delete touches[touch.identifier];
    });
  }
  function getVelocity(id2) {
    var _touches$id;
    const samples = (_touches$id = touches[id2]) == null ? void 0 : _touches$id.values().reverse();
    if (!samples) {
      throw new Error(`No samples for touch id ${id2}`);
    }
    const newest = samples[0];
    const x2 = [];
    const y = [];
    for (const val of samples) {
      if (newest[0] - val[0] > HORIZON)
        break;
      x2.push({
        t: val[0],
        d: val[1].clientX
      });
      y.push({
        t: val[0],
        d: val[1].clientY
      });
    }
    return {
      x: calculateImpulseVelocity(x2),
      y: calculateImpulseVelocity(y),
      get direction() {
        const {
          x: x3,
          y: y2
        } = this;
        const [absX, absY] = [Math.abs(x3), Math.abs(y2)];
        return absX > absY && x3 >= 0 ? "right" : absX > absY && x3 <= 0 ? "left" : absY > absX && y2 >= 0 ? "down" : absY > absX && y2 <= 0 ? "up" : oops$1();
      }
    };
  }
  return {
    addMovement,
    endTouch,
    getVelocity
  };
}
function oops$1() {
  throw new Error();
}
function useTouch(_ref) {
  let {
    isActive,
    isTemporary,
    width,
    touchless,
    position
  } = _ref;
  onMounted(() => {
    window.addEventListener("touchstart", onTouchstart, {
      passive: true
    });
    window.addEventListener("touchmove", onTouchmove, {
      passive: false
    });
    window.addEventListener("touchend", onTouchend, {
      passive: true
    });
  });
  onBeforeUnmount(() => {
    window.removeEventListener("touchstart", onTouchstart);
    window.removeEventListener("touchmove", onTouchmove);
    window.removeEventListener("touchend", onTouchend);
  });
  const isHorizontal = computed(() => position.value !== "bottom");
  const {
    addMovement,
    endTouch,
    getVelocity
  } = useVelocity();
  let maybeDragging = false;
  const isDragging = ref(false);
  const dragProgress = ref(0);
  const offset = ref(0);
  let start;
  function getOffset2(pos, active) {
    return (position.value === "left" ? pos : position.value === "right" ? document.documentElement.clientWidth - pos : position.value === "bottom" ? document.documentElement.clientHeight - pos : oops()) - (active ? width.value : 0);
  }
  function getProgress(pos) {
    let limit = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
    const progress = position.value === "left" ? (pos - offset.value) / width.value : position.value === "right" ? (document.documentElement.clientWidth - pos - offset.value) / width.value : position.value === "bottom" ? (document.documentElement.clientHeight - pos - offset.value) / width.value : oops();
    return limit ? Math.max(0, Math.min(1, progress)) : progress;
  }
  function onTouchstart(e2) {
    if (touchless.value)
      return;
    const touchX = e2.changedTouches[0].clientX;
    const touchY = e2.changedTouches[0].clientY;
    const touchZone = 25;
    const inTouchZone = position.value === "left" ? touchX < touchZone : position.value === "right" ? touchX > document.documentElement.clientWidth - touchZone : position.value === "bottom" ? touchY > document.documentElement.clientHeight - touchZone : oops();
    const inElement = isActive.value && (position.value === "left" ? touchX < width.value : position.value === "right" ? touchX > document.documentElement.clientWidth - width.value : position.value === "bottom" ? touchY > document.documentElement.clientHeight - width.value : oops());
    if (inTouchZone || inElement || isActive.value && isTemporary.value) {
      maybeDragging = true;
      start = [touchX, touchY];
      offset.value = getOffset2(isHorizontal.value ? touchX : touchY, isActive.value);
      dragProgress.value = getProgress(isHorizontal.value ? touchX : touchY);
      endTouch(e2);
      addMovement(e2);
    }
  }
  function onTouchmove(e2) {
    const touchX = e2.changedTouches[0].clientX;
    const touchY = e2.changedTouches[0].clientY;
    if (maybeDragging) {
      if (!e2.cancelable) {
        maybeDragging = false;
        return;
      }
      const dx = Math.abs(touchX - start[0]);
      const dy = Math.abs(touchY - start[1]);
      const thresholdMet = isHorizontal.value ? dx > dy && dx > 3 : dy > dx && dy > 3;
      if (thresholdMet) {
        isDragging.value = true;
        maybeDragging = false;
      } else if ((isHorizontal.value ? dy : dx) > 3) {
        maybeDragging = false;
      }
    }
    if (!isDragging.value)
      return;
    e2.preventDefault();
    addMovement(e2);
    const progress = getProgress(isHorizontal.value ? touchX : touchY, false);
    dragProgress.value = Math.max(0, Math.min(1, progress));
    if (progress > 1) {
      offset.value = getOffset2(isHorizontal.value ? touchX : touchY, true);
    } else if (progress < 0) {
      offset.value = getOffset2(isHorizontal.value ? touchX : touchY, false);
    }
  }
  function onTouchend(e2) {
    maybeDragging = false;
    if (!isDragging.value)
      return;
    addMovement(e2);
    isDragging.value = false;
    const velocity = getVelocity(e2.changedTouches[0].identifier);
    const vx = Math.abs(velocity.x);
    const vy = Math.abs(velocity.y);
    const thresholdMet = isHorizontal.value ? vx > vy && vx > 400 : vy > vx && vy > 3;
    if (thresholdMet) {
      isActive.value = velocity.direction === ({
        left: "right",
        right: "left",
        bottom: "up"
      }[position.value] || oops());
    } else {
      isActive.value = dragProgress.value > 0.5;
    }
  }
  const dragStyles = computed(() => {
    return isDragging.value ? {
      transform: position.value === "left" ? `translateX(calc(-100% + ${dragProgress.value * width.value}px))` : position.value === "right" ? `translateX(calc(100% - ${dragProgress.value * width.value}px))` : position.value === "bottom" ? `translateY(calc(100% - ${dragProgress.value * width.value}px))` : oops(),
      transition: "none"
    } : void 0;
  });
  return {
    isDragging,
    dragProgress,
    dragStyles
  };
}
function oops() {
  throw new Error();
}
const locations = ["start", "end", "left", "right", "bottom"];
const VNavigationDrawer = defineComponent({
  name: "VNavigationDrawer",
  props: {
    color: String,
    disableResizeWatcher: Boolean,
    disableRouteWatcher: Boolean,
    expandOnHover: Boolean,
    floating: Boolean,
    modelValue: {
      type: Boolean,
      default: null
    },
    permanent: Boolean,
    rail: {
      type: Boolean,
      default: null
    },
    railWidth: {
      type: [Number, String],
      default: 56
    },
    scrim: {
      type: [String, Boolean],
      default: true
    },
    image: String,
    temporary: Boolean,
    touchless: Boolean,
    width: {
      type: [Number, String],
      default: 256
    },
    location: {
      type: String,
      default: "start",
      validator: (value) => locations.includes(value)
    },
    sticky: Boolean,
    ...makeBorderProps(),
    ...makeElevationProps(),
    ...makeLayoutItemProps(),
    ...makeRoundedProps(),
    ...makeTagProps({
      tag: "nav"
    }),
    ...makeThemeProps()
  },
  emits: {
    "update:modelValue": (val) => true,
    "update:rail": (val) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      emit,
      slots
    } = _ref;
    const {
      isRtl
    } = useRtl();
    const {
      themeClasses
    } = provideTheme(props);
    const {
      borderClasses
    } = useBorder(props);
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(toRef(props, "color"));
    const {
      elevationClasses
    } = useElevation(props);
    const {
      mobile
    } = useDisplay();
    const {
      roundedClasses
    } = useRounded(props);
    const router2 = useRouter();
    const isActive = useProxiedModel(props, "modelValue", null, (v) => !!v);
    const {
      ssrBootStyles
    } = useSsrBoot();
    const rootEl = ref();
    const isHovering = ref(false);
    const width = computed(() => {
      return props.rail && props.expandOnHover && isHovering.value ? Number(props.width) : Number(props.rail ? props.railWidth : props.width);
    });
    const location2 = computed(() => {
      return toPhysical(props.location, isRtl.value);
    });
    const isTemporary = computed(() => !props.permanent && (mobile.value || props.temporary));
    const isSticky = computed(() => props.sticky && !isTemporary.value && location2.value !== "bottom");
    if (props.expandOnHover && props.rail != null) {
      watch(isHovering, (val) => emit("update:rail", !val));
    }
    if (!props.disableResizeWatcher) {
      watch(isTemporary, (val) => !props.permanent && nextTick(() => isActive.value = !val));
    }
    if (!props.disableRouteWatcher && router2) {
      watch(router2.currentRoute, () => isTemporary.value && (isActive.value = false));
    }
    watch(() => props.permanent, (val) => {
      if (val)
        isActive.value = true;
    });
    onBeforeMount(() => {
      if (props.modelValue != null || isTemporary.value)
        return;
      isActive.value = props.permanent || !mobile.value;
    });
    const {
      isDragging,
      dragProgress,
      dragStyles
    } = useTouch({
      isActive,
      isTemporary,
      width,
      touchless: toRef(props, "touchless"),
      position: location2
    });
    const layoutSize = computed(() => {
      const size = isTemporary.value ? 0 : props.rail && props.expandOnHover ? Number(props.railWidth) : width.value;
      return isDragging.value ? size * dragProgress.value : size;
    });
    const {
      layoutItemStyles,
      layoutRect,
      layoutItemScrimStyles
    } = useLayoutItem({
      id: props.name,
      order: computed(() => parseInt(props.order, 10)),
      position: location2,
      layoutSize,
      elementSize: width,
      active: computed(() => isActive.value || isDragging.value),
      disableTransitions: computed(() => isDragging.value),
      absolute: computed(() => // eslint-disable-next-line @typescript-eslint/no-use-before-define
      props.absolute || isSticky.value && typeof isStuck.value !== "string")
    });
    const {
      isStuck,
      stickyStyles
    } = useSticky({
      rootEl,
      isSticky,
      layoutItemStyles
    });
    const scrimColor = useBackgroundColor(computed(() => {
      return typeof props.scrim === "string" ? props.scrim : null;
    }));
    const scrimStyles = computed(() => ({
      ...isDragging.value ? {
        opacity: dragProgress.value * 0.2,
        transition: "none"
      } : void 0,
      ...layoutRect.value ? {
        left: convertToUnit(layoutRect.value.left),
        right: convertToUnit(layoutRect.value.right),
        top: convertToUnit(layoutRect.value.top),
        bottom: convertToUnit(layoutRect.value.bottom)
      } : void 0,
      ...layoutItemScrimStyles.value
    }));
    provideDefaults({
      VList: {
        bgColor: "transparent"
      }
    });
    useRender(() => {
      var _slots$image, _slots$prepend, _slots$default, _slots$append;
      const hasImage = slots.image || props.image;
      return createVNode(Fragment, null, [createVNode(props.tag, mergeProps({
        "ref": rootEl,
        "onMouseenter": () => isHovering.value = true,
        "onMouseleave": () => isHovering.value = false,
        "class": ["v-navigation-drawer", `v-navigation-drawer--${location2.value}`, {
          "v-navigation-drawer--expand-on-hover": props.expandOnHover,
          "v-navigation-drawer--floating": props.floating,
          "v-navigation-drawer--is-hovering": isHovering.value,
          "v-navigation-drawer--rail": props.rail,
          "v-navigation-drawer--temporary": isTemporary.value,
          "v-navigation-drawer--active": isActive.value,
          "v-navigation-drawer--sticky": isSticky.value
        }, themeClasses.value, backgroundColorClasses.value, borderClasses.value, elevationClasses.value, roundedClasses.value],
        "style": [backgroundColorStyles.value, layoutItemStyles.value, dragStyles.value, ssrBootStyles.value, stickyStyles.value]
      }, attrs), {
        default: () => [hasImage && createVNode("div", {
          "key": "image",
          "class": "v-navigation-drawer__img"
        }, [slots.image ? (_slots$image = slots.image) == null ? void 0 : _slots$image.call(slots, {
          image: props.image
        }) : createVNode("img", {
          "src": props.image,
          "alt": ""
        }, null)]), slots.prepend && createVNode("div", {
          "class": "v-navigation-drawer__prepend"
        }, [(_slots$prepend = slots.prepend) == null ? void 0 : _slots$prepend.call(slots)]), createVNode("div", {
          "class": "v-navigation-drawer__content"
        }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)]), slots.append && createVNode("div", {
          "class": "v-navigation-drawer__append"
        }, [(_slots$append = slots.append) == null ? void 0 : _slots$append.call(slots)])]
      }), createVNode(Transition, {
        "name": "fade-transition"
      }, {
        default: () => [isTemporary.value && (isDragging.value || isActive.value) && !!props.scrim && createVNode("div", {
          "class": ["v-navigation-drawer__scrim", scrimColor.backgroundColorClasses.value],
          "style": [scrimStyles.value, scrimColor.backgroundColorStyles.value],
          "onClick": () => isActive.value = false
        }, null)]
      })]);
    });
    return {
      isStuck
    };
  }
});
const VNoSsr = defineComponent({
  name: "VNoSsr",
  setup(_2, _ref) {
    let {
      slots
    } = _ref;
    const show = useHydration();
    return () => {
      var _slots$default;
      return show.value && ((_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots));
    };
  }
});
const VPagination$1 = "";
function useRefs() {
  const refs = ref([]);
  onBeforeUpdate(() => refs.value = []);
  function updateRef(e2, i2) {
    refs.value[i2] = e2;
  }
  return {
    refs,
    updateRef
  };
}
const VPagination = defineComponent({
  name: "VPagination",
  props: {
    activeColor: String,
    start: {
      type: [Number, String],
      default: 1
    },
    modelValue: {
      type: Number,
      default: (props) => props.start
    },
    disabled: Boolean,
    length: {
      type: [Number, String],
      default: 1,
      validator: (val) => val % 1 === 0
    },
    totalVisible: [Number, String],
    firstIcon: {
      type: IconValue,
      default: "$first"
    },
    prevIcon: {
      type: IconValue,
      default: "$prev"
    },
    nextIcon: {
      type: IconValue,
      default: "$next"
    },
    lastIcon: {
      type: IconValue,
      default: "$last"
    },
    ariaLabel: {
      type: String,
      default: "$vuetify.pagination.ariaLabel.root"
    },
    pageAriaLabel: {
      type: String,
      default: "$vuetify.pagination.ariaLabel.page"
    },
    currentPageAriaLabel: {
      type: String,
      default: "$vuetify.pagination.ariaLabel.currentPage"
    },
    firstAriaLabel: {
      type: String,
      default: "$vuetify.pagination.ariaLabel.first"
    },
    previousAriaLabel: {
      type: String,
      default: "$vuetify.pagination.ariaLabel.previous"
    },
    nextAriaLabel: {
      type: String,
      default: "$vuetify.pagination.ariaLabel.next"
    },
    lastAriaLabel: {
      type: String,
      default: "$vuetify.pagination.ariaLabel.last"
    },
    ellipsis: {
      type: String,
      default: "..."
    },
    showFirstLastPage: Boolean,
    ...makeBorderProps(),
    ...makeDensityProps(),
    ...makeElevationProps(),
    ...makeRoundedProps(),
    ...makeSizeProps(),
    ...makeTagProps({
      tag: "nav"
    }),
    ...makeThemeProps(),
    ...makeVariantProps({
      variant: "text"
    })
  },
  emits: {
    "update:modelValue": (value) => true,
    first: (value) => true,
    prev: (value) => true,
    next: (value) => true,
    last: (value) => true
  },
  setup(props, _ref) {
    let {
      slots,
      emit
    } = _ref;
    const page = useProxiedModel(props, "modelValue");
    const {
      t: t2,
      n: n2
    } = useLocale();
    const {
      isRtl
    } = useRtl();
    const {
      themeClasses
    } = provideTheme(props);
    const {
      width
    } = useDisplay();
    const maxButtons = ref(-1);
    provideDefaults(void 0, {
      scoped: true
    });
    const {
      resizeRef
    } = useResizeObserver((entries) => {
      if (!entries.length)
        return;
      const {
        target,
        contentRect
      } = entries[0];
      const firstItem = target.querySelector(".v-pagination__list > *");
      if (!firstItem)
        return;
      const totalWidth = contentRect.width;
      const itemWidth = firstItem.offsetWidth + parseFloat(getComputedStyle(firstItem).marginRight) * 2;
      maxButtons.value = getMax(totalWidth, itemWidth);
    });
    const length = computed(() => parseInt(props.length, 10));
    const start = computed(() => parseInt(props.start, 10));
    const totalVisible = computed(() => {
      if (props.totalVisible)
        return parseInt(props.totalVisible, 10);
      else if (maxButtons.value >= 0)
        return maxButtons.value;
      return getMax(width.value, 58);
    });
    function getMax(totalWidth, itemWidth) {
      const minButtons = props.showFirstLastPage ? 5 : 3;
      return Math.max(0, Math.floor(
        // Round to two decimal places to avoid floating point errors
        +((totalWidth - itemWidth * minButtons) / itemWidth).toFixed(2)
      ));
    }
    const range = computed(() => {
      if (length.value <= 0 || isNaN(length.value) || length.value > Number.MAX_SAFE_INTEGER)
        return [];
      if (totalVisible.value <= 1)
        return [page.value];
      if (length.value <= totalVisible.value) {
        return createRange(length.value, start.value);
      }
      const even = totalVisible.value % 2 === 0;
      const middle = even ? totalVisible.value / 2 : Math.floor(totalVisible.value / 2);
      const left = even ? middle : middle + 1;
      const right = length.value - middle;
      if (left - page.value >= 0) {
        return [...createRange(Math.max(1, totalVisible.value - 1), start.value), props.ellipsis, length.value];
      } else if (page.value - right >= (even ? 1 : 0)) {
        const rangeLength = totalVisible.value - 1;
        const rangeStart = length.value - rangeLength + start.value;
        return [start.value, props.ellipsis, ...createRange(rangeLength, rangeStart)];
      } else {
        const rangeLength = Math.max(1, totalVisible.value - 3);
        const rangeStart = rangeLength === 1 ? page.value : page.value - Math.ceil(rangeLength / 2) + start.value;
        return [start.value, props.ellipsis, ...createRange(rangeLength, rangeStart), props.ellipsis, length.value];
      }
    });
    function setValue(e2, value, event) {
      e2.preventDefault();
      page.value = value;
      event && emit(event, value);
    }
    const {
      refs,
      updateRef
    } = useRefs();
    provideDefaults({
      VPaginationBtn: {
        color: toRef(props, "color"),
        border: toRef(props, "border"),
        density: toRef(props, "density"),
        size: toRef(props, "size"),
        variant: toRef(props, "variant"),
        rounded: toRef(props, "rounded"),
        elevation: toRef(props, "elevation")
      }
    });
    const items = computed(() => {
      return range.value.map((item, index) => {
        const ref2 = (e2) => updateRef(e2, index);
        if (typeof item === "string") {
          return {
            isActive: false,
            key: `ellipsis-${index}`,
            page: item,
            props: {
              ref: ref2,
              ellipsis: true,
              icon: true,
              disabled: true
            }
          };
        } else {
          const isActive = item === page.value;
          return {
            isActive,
            key: item,
            page: n2(item),
            props: {
              ref: ref2,
              ellipsis: false,
              icon: true,
              disabled: !!props.disabled || props.length < 2,
              color: isActive ? props.activeColor : props.color,
              ariaCurrent: isActive,
              ariaLabel: t2(isActive ? props.currentPageAriaLabel : props.pageAriaLabel, index + 1),
              onClick: (e2) => setValue(e2, item)
            }
          };
        }
      });
    });
    const controls = computed(() => {
      const prevDisabled = !!props.disabled || page.value <= start.value;
      const nextDisabled = !!props.disabled || page.value >= start.value + length.value - 1;
      return {
        first: props.showFirstLastPage ? {
          icon: isRtl.value ? props.lastIcon : props.firstIcon,
          onClick: (e2) => setValue(e2, start.value, "first"),
          disabled: prevDisabled,
          ariaLabel: t2(props.firstAriaLabel),
          ariaDisabled: prevDisabled
        } : void 0,
        prev: {
          icon: isRtl.value ? props.nextIcon : props.prevIcon,
          onClick: (e2) => setValue(e2, page.value - 1, "prev"),
          disabled: prevDisabled,
          ariaLabel: t2(props.previousAriaLabel),
          ariaDisabled: prevDisabled
        },
        next: {
          icon: isRtl.value ? props.prevIcon : props.nextIcon,
          onClick: (e2) => setValue(e2, page.value + 1, "next"),
          disabled: nextDisabled,
          ariaLabel: t2(props.nextAriaLabel),
          ariaDisabled: nextDisabled
        },
        last: props.showFirstLastPage ? {
          icon: isRtl.value ? props.firstIcon : props.lastIcon,
          onClick: (e2) => setValue(e2, start.value + length.value - 1, "last"),
          disabled: nextDisabled,
          ariaLabel: t2(props.lastAriaLabel),
          ariaDisabled: nextDisabled
        } : void 0
      };
    });
    function updateFocus() {
      var _refs$value$currentIn;
      const currentIndex = page.value - start.value;
      (_refs$value$currentIn = refs.value[currentIndex]) == null ? void 0 : _refs$value$currentIn.$el.focus();
    }
    function onKeydown(e2) {
      if (e2.key === keyValues.left && !props.disabled && page.value > props.start) {
        page.value = page.value - 1;
        nextTick(updateFocus);
      } else if (e2.key === keyValues.right && !props.disabled && page.value < start.value + length.value - 1) {
        page.value = page.value + 1;
        nextTick(updateFocus);
      }
    }
    useRender(() => createVNode(props.tag, {
      "ref": resizeRef,
      "class": ["v-pagination", themeClasses.value],
      "role": "navigation",
      "aria-label": t2(props.ariaLabel),
      "onKeydown": onKeydown,
      "data-test": "v-pagination-root"
    }, {
      default: () => [createVNode("ul", {
        "class": "v-pagination__list"
      }, [props.showFirstLastPage && createVNode("li", {
        "key": "first",
        "class": "v-pagination__first",
        "data-test": "v-pagination-first"
      }, [slots.first ? slots.first(controls.value.first) : createVNode(VBtn, mergeProps({
        "_as": "VPaginationBtn"
      }, controls.value.first), null)]), createVNode("li", {
        "key": "prev",
        "class": "v-pagination__prev",
        "data-test": "v-pagination-prev"
      }, [slots.prev ? slots.prev(controls.value.prev) : createVNode(VBtn, mergeProps({
        "_as": "VPaginationBtn"
      }, controls.value.prev), null)]), items.value.map((item, index) => createVNode("li", {
        "key": item.key,
        "class": ["v-pagination__item", {
          "v-pagination__item--is-active": item.isActive
        }],
        "data-test": "v-pagination-item"
      }, [slots.item ? slots.item(item) : createVNode(VBtn, mergeProps({
        "_as": "VPaginationBtn"
      }, item.props), {
        default: () => [item.page]
      })])), createVNode("li", {
        "key": "next",
        "class": "v-pagination__next",
        "data-test": "v-pagination-next"
      }, [slots.next ? slots.next(controls.value.next) : createVNode(VBtn, mergeProps({
        "_as": "VPaginationBtn"
      }, controls.value.next), null)]), props.showFirstLastPage && createVNode("li", {
        "key": "last",
        "class": "v-pagination__last",
        "data-test": "v-pagination-last"
      }, [slots.last ? slots.last(controls.value.last) : createVNode(VBtn, mergeProps({
        "_as": "VPaginationBtn"
      }, controls.value.last), null)])])]
    }));
    return {};
  }
});
const VParallax$1 = "";
function floor$1(val) {
  return Math.floor(Math.abs(val)) * Math.sign(val);
}
const VParallax = defineComponent({
  name: "VParallax",
  props: {
    scale: {
      type: [Number, String],
      default: 0.5
    }
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      intersectionRef,
      isIntersecting
    } = useIntersectionObserver();
    const {
      resizeRef,
      contentRect
    } = useResizeObserver();
    const {
      height: displayHeight
    } = useDisplay();
    const root = ref();
    watchEffect(() => {
      var _root$value;
      intersectionRef.value = resizeRef.value = (_root$value = root.value) == null ? void 0 : _root$value.$el;
    });
    let scrollParent;
    watch(isIntersecting, (val) => {
      if (val) {
        scrollParent = getScrollParent(intersectionRef.value);
        scrollParent = scrollParent === document.scrollingElement ? document : scrollParent;
        scrollParent.addEventListener("scroll", onScroll, {
          passive: true
        });
        onScroll();
      } else {
        scrollParent.removeEventListener("scroll", onScroll);
      }
    });
    onBeforeUnmount(() => {
      var _scrollParent;
      (_scrollParent = scrollParent) == null ? void 0 : _scrollParent.removeEventListener("scroll", onScroll);
    });
    watch(displayHeight, onScroll);
    watch(() => {
      var _contentRect$value;
      return (_contentRect$value = contentRect.value) == null ? void 0 : _contentRect$value.height;
    }, onScroll);
    const scale = computed(() => {
      return 1 - clamp(+props.scale);
    });
    let frame = -1;
    function onScroll() {
      if (!isIntersecting.value)
        return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        var _root$value2;
        const el = ((_root$value2 = root.value) == null ? void 0 : _root$value2.$el).querySelector(".v-img__img");
        if (!el)
          return;
        const scrollHeight = scrollParent.clientHeight ?? document.documentElement.clientHeight;
        const scrollPos = scrollParent.scrollTop ?? window.scrollY;
        const top = intersectionRef.value.offsetTop;
        const height = contentRect.value.height;
        const center = top + (height - scrollHeight) / 2;
        const translate2 = floor$1((scrollPos - center) * scale.value);
        const sizeScale = Math.max(1, (scale.value * (scrollHeight - height) + height) / height);
        el.style.setProperty("transform", `translateY(${translate2}px) scale(${sizeScale})`);
      });
    }
    useRender(() => createVNode(VImg, {
      "class": ["v-parallax", {
        "v-parallax--active": isIntersecting.value
      }],
      "ref": root,
      "cover": true,
      "onLoadstart": onScroll,
      "onLoad": onScroll
    }, slots));
    return {};
  }
});
const VRadio = defineComponent({
  name: "VRadio",
  props: {
    ...makeSelectionControlProps({
      falseIcon: "$radioOff",
      trueIcon: "$radioOn"
    })
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => createVNode(VSelectionControl, mergeProps(props, {
      "class": "v-radio",
      "type": "radio"
    }), slots));
    return {};
  }
});
const VRadioGroup$1 = "";
const VRadioGroup = defineComponent({
  name: "VRadioGroup",
  inheritAttrs: false,
  props: {
    height: {
      type: [Number, String],
      default: "auto"
    },
    ...makeVInputProps(),
    ...omit(makeSelectionControlGroupProps(), ["multiple"]),
    trueIcon: {
      type: IconValue,
      default: "$radioOn"
    },
    falseIcon: {
      type: IconValue,
      default: "$radioOff"
    },
    type: {
      type: String,
      default: "radio"
    }
  },
  emits: {
    "update:modelValue": (val) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const uid2 = getUid();
    const id2 = computed(() => props.id || `radio-group-${uid2}`);
    const model = useProxiedModel(props, "modelValue");
    useRender(() => {
      const [inputAttrs, controlAttrs] = filterInputAttrs(attrs);
      const [inputProps, _1] = filterInputProps(props);
      const [controlProps, _2] = filterControlProps({
        ...props,
        multiple: false
      });
      const label = slots.label ? slots.label({
        label: props.label,
        props: {
          for: id2.value
        }
      }) : props.label;
      return createVNode(VInput, mergeProps({
        "class": "v-radio-group"
      }, inputAttrs, inputProps, {
        "modelValue": model.value,
        "onUpdate:modelValue": ($event) => model.value = $event,
        "id": id2.value
      }), {
        ...slots,
        default: (_ref2) => {
          let {
            id: id3,
            isDisabled,
            isReadonly
          } = _ref2;
          return createVNode(Fragment, null, [label && createVNode(VLabel, {
            "id": id3.value
          }, {
            default: () => [label]
          }), createVNode(VSelectionControlGroup, mergeProps(controlProps, {
            "id": id3.value,
            "defaultsTarget": "VRadio",
            "trueIcon": props.trueIcon,
            "falseIcon": props.falseIcon,
            "type": props.type,
            "disabled": isDisabled.value,
            "readonly": isReadonly.value,
            "aria-labelledby": label ? id3.value : void 0
          }, controlAttrs, {
            "modelValue": model.value,
            "onUpdate:modelValue": ($event) => model.value = $event
          }), slots)]);
        }
      });
    });
    return {};
  }
});
const VRangeSlider = defineComponent({
  name: "VRangeSlider",
  props: {
    ...makeFocusProps(),
    ...makeVInputProps(),
    ...makeSliderProps(),
    strict: Boolean,
    modelValue: {
      type: Array,
      default: () => [0, 0]
    }
  },
  emits: {
    "update:focused": (value) => true,
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const startThumbRef = ref();
    const stopThumbRef = ref();
    const inputRef = ref();
    function getActiveThumb(e2) {
      if (!startThumbRef.value || !stopThumbRef.value)
        return;
      const startOffset = getOffset(e2, startThumbRef.value.$el, props.direction);
      const stopOffset = getOffset(e2, stopThumbRef.value.$el, props.direction);
      const a = Math.abs(startOffset);
      const b = Math.abs(stopOffset);
      return a < b || a === b && startOffset < 0 ? startThumbRef.value.$el : stopThumbRef.value.$el;
    }
    const {
      activeThumbRef,
      hasLabels,
      max: max2,
      min: min2,
      mousePressed,
      onSliderMousedown,
      onSliderTouchstart,
      position,
      roundValue,
      trackContainerRef
    } = useSlider({
      /* eslint-disable @typescript-eslint/no-use-before-define */
      props,
      handleSliderMouseUp: (newValue) => {
        var _startThumbRef$value;
        model.value = activeThumbRef.value === ((_startThumbRef$value = startThumbRef.value) == null ? void 0 : _startThumbRef$value.$el) ? [newValue, model.value[1]] : [model.value[0], newValue];
      },
      handleMouseMove: (newValue) => {
        var _startThumbRef$value3;
        const [start, stop] = model.value;
        if (!props.strict && start === stop && start !== min2.value) {
          var _stopThumbRef$value, _startThumbRef$value2, _activeThumbRef$value;
          activeThumbRef.value = newValue > start ? (_stopThumbRef$value = stopThumbRef.value) == null ? void 0 : _stopThumbRef$value.$el : (_startThumbRef$value2 = startThumbRef.value) == null ? void 0 : _startThumbRef$value2.$el;
          (_activeThumbRef$value = activeThumbRef.value) == null ? void 0 : _activeThumbRef$value.focus();
        }
        if (activeThumbRef.value === ((_startThumbRef$value3 = startThumbRef.value) == null ? void 0 : _startThumbRef$value3.$el)) {
          model.value = [Math.min(newValue, stop), stop];
        } else {
          model.value = [start, Math.max(start, newValue)];
        }
      },
      getActiveThumb
      /* eslint-enable @typescript-eslint/no-use-before-define */
    });
    const model = useProxiedModel(props, "modelValue", void 0, (arr) => {
      if (!arr || !arr.length)
        return [0, 0];
      return arr.map((value) => roundValue(value));
    });
    const {
      isFocused,
      focus,
      blur
    } = useFocus(props);
    const trackStart = computed(() => position(model.value[0]));
    const trackStop = computed(() => position(model.value[1]));
    useRender(() => {
      const [inputProps, _2] = filterInputProps(props);
      const hasPrepend = !!(props.label || slots.label || slots.prepend);
      return createVNode(VInput, mergeProps({
        "class": ["v-slider", "v-range-slider", {
          "v-slider--has-labels": !!slots["tick-label"] || hasLabels.value,
          "v-slider--focused": isFocused.value,
          "v-slider--pressed": mousePressed.value,
          "v-slider--disabled": props.disabled
        }],
        "ref": inputRef
      }, inputProps, {
        "focused": isFocused.value
      }), {
        ...slots,
        prepend: hasPrepend ? (slotProps) => {
          var _slots$label, _slots$prepend;
          return createVNode(Fragment, null, [((_slots$label = slots.label) == null ? void 0 : _slots$label.call(slots, slotProps)) ?? props.label ? createVNode(VLabel, {
            "class": "v-slider__label",
            "text": props.label
          }, null) : void 0, (_slots$prepend = slots.prepend) == null ? void 0 : _slots$prepend.call(slots, slotProps)]);
        } : void 0,
        default: (_ref2) => {
          var _startThumbRef$value4, _stopThumbRef$value4;
          let {
            id: id2
          } = _ref2;
          return createVNode("div", {
            "class": "v-slider__container",
            "onMousedown": onSliderMousedown,
            "onTouchstartPassive": onSliderTouchstart
          }, [createVNode("input", {
            "id": `${id2.value}_start`,
            "name": props.name || id2.value,
            "disabled": props.disabled,
            "readonly": props.readonly,
            "tabindex": "-1",
            "value": model.value[0]
          }, null), createVNode("input", {
            "id": `${id2.value}_stop`,
            "name": props.name || id2.value,
            "disabled": props.disabled,
            "readonly": props.readonly,
            "tabindex": "-1",
            "value": model.value[1]
          }, null), createVNode(VSliderTrack, {
            "ref": trackContainerRef,
            "start": trackStart.value,
            "stop": trackStop.value
          }, {
            "tick-label": slots["tick-label"]
          }), createVNode(VSliderThumb, {
            "ref": startThumbRef,
            "focused": isFocused && activeThumbRef.value === ((_startThumbRef$value4 = startThumbRef.value) == null ? void 0 : _startThumbRef$value4.$el),
            "modelValue": model.value[0],
            "onUpdate:modelValue": (v) => model.value = [v, model.value[1]],
            "onFocus": (e2) => {
              var _startThumbRef$value5, _stopThumbRef$value2;
              focus();
              activeThumbRef.value = (_startThumbRef$value5 = startThumbRef.value) == null ? void 0 : _startThumbRef$value5.$el;
              if (model.value[0] === model.value[1] && model.value[1] === min2.value && e2.relatedTarget !== ((_stopThumbRef$value2 = stopThumbRef.value) == null ? void 0 : _stopThumbRef$value2.$el)) {
                var _startThumbRef$value6, _stopThumbRef$value3;
                (_startThumbRef$value6 = startThumbRef.value) == null ? void 0 : _startThumbRef$value6.$el.blur();
                (_stopThumbRef$value3 = stopThumbRef.value) == null ? void 0 : _stopThumbRef$value3.$el.focus();
              }
            },
            "onBlur": () => {
              blur();
              activeThumbRef.value = void 0;
            },
            "min": min2.value,
            "max": model.value[1],
            "position": trackStart.value
          }, {
            "thumb-label": slots["thumb-label"]
          }), createVNode(VSliderThumb, {
            "ref": stopThumbRef,
            "focused": isFocused && activeThumbRef.value === ((_stopThumbRef$value4 = stopThumbRef.value) == null ? void 0 : _stopThumbRef$value4.$el),
            "modelValue": model.value[1],
            "onUpdate:modelValue": (v) => model.value = [model.value[0], v],
            "onFocus": (e2) => {
              var _stopThumbRef$value5, _startThumbRef$value7;
              focus();
              activeThumbRef.value = (_stopThumbRef$value5 = stopThumbRef.value) == null ? void 0 : _stopThumbRef$value5.$el;
              if (model.value[0] === model.value[1] && model.value[0] === max2.value && e2.relatedTarget !== ((_startThumbRef$value7 = startThumbRef.value) == null ? void 0 : _startThumbRef$value7.$el)) {
                var _stopThumbRef$value6, _startThumbRef$value8;
                (_stopThumbRef$value6 = stopThumbRef.value) == null ? void 0 : _stopThumbRef$value6.$el.blur();
                (_startThumbRef$value8 = startThumbRef.value) == null ? void 0 : _startThumbRef$value8.$el.focus();
              }
            },
            "onBlur": () => {
              blur();
              activeThumbRef.value = void 0;
            },
            "min": model.value[0],
            "max": max2.value,
            "position": trackStop.value
          }, {
            "thumb-label": slots["thumb-label"]
          })]);
        }
      });
    });
    return {};
  }
});
const VRating$1 = "";
const VRating = genericComponent()({
  name: "VRating",
  props: {
    name: String,
    itemAriaLabel: {
      type: String,
      default: "$vuetify.rating.ariaLabel.item"
    },
    activeColor: String,
    color: String,
    clearable: Boolean,
    disabled: Boolean,
    emptyIcon: {
      type: IconValue,
      default: "$ratingEmpty"
    },
    fullIcon: {
      type: IconValue,
      default: "$ratingFull"
    },
    halfIncrements: Boolean,
    hover: Boolean,
    length: {
      type: [Number, String],
      default: 5
    },
    readonly: Boolean,
    modelValue: {
      type: [Number, String],
      default: 0
    },
    itemLabels: Array,
    itemLabelPosition: {
      type: String,
      default: "top",
      validator: (v) => ["top", "bottom"].includes(v)
    },
    ripple: Boolean,
    ...makeDensityProps(),
    ...makeSizeProps(),
    ...makeTagProps(),
    ...makeThemeProps()
  },
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      t: t2
    } = useLocale();
    const {
      themeClasses
    } = provideTheme(props);
    const rating = useProxiedModel(props, "modelValue");
    const normalizedValue = computed(() => clamp(parseFloat(rating.value), 0, +props.length));
    const range = computed(() => createRange(Number(props.length), 1));
    const increments = computed(() => range.value.flatMap((v) => props.halfIncrements ? [v - 0.5, v] : [v]));
    const hoverIndex = ref(-1);
    const focusIndex = ref(-1);
    const firstRef = ref();
    let isClicking = false;
    const itemState = computed(() => increments.value.map((value) => {
      const isHovering = props.hover && hoverIndex.value > -1;
      const isFilled = normalizedValue.value >= value;
      const isHovered = hoverIndex.value >= value;
      const isFullIcon = isHovering ? isHovered : isFilled;
      const icon = isFullIcon ? props.fullIcon : props.emptyIcon;
      const activeColor = props.activeColor ?? props.color;
      const color = isFilled || isHovered ? activeColor : props.color;
      return {
        isFilled,
        isHovered,
        icon,
        color
      };
    }));
    const eventState = computed(() => [0, ...increments.value].map((value) => {
      function onMouseenter() {
        hoverIndex.value = value;
      }
      function onMouseleave() {
        hoverIndex.value = -1;
      }
      function onFocus() {
        if (value === 0 && normalizedValue.value === 0) {
          var _firstRef$value;
          (_firstRef$value = firstRef.value) == null ? void 0 : _firstRef$value.focus();
        } else {
          focusIndex.value = value;
        }
      }
      function onBlur() {
        if (!isClicking)
          focusIndex.value = -1;
      }
      function onClick() {
        if (props.disabled || props.readonly)
          return;
        rating.value = normalizedValue.value === value && props.clearable ? 0 : value;
      }
      return {
        onMouseenter: props.hover ? onMouseenter : void 0,
        onMouseleave: props.hover ? onMouseleave : void 0,
        onFocus,
        onBlur,
        onClick
      };
    }));
    function onMousedown() {
      isClicking = true;
    }
    function onMouseup() {
      isClicking = false;
    }
    const name2 = computed(() => props.name ?? `v-rating-${getUid()}`);
    function VRatingItem(_ref2) {
      var _itemState$value$inde, _itemState$value$inde2;
      let {
        value,
        index,
        showStar = true
      } = _ref2;
      const {
        onMouseenter,
        onMouseleave,
        onFocus,
        onBlur,
        onClick
      } = eventState.value[index + 1];
      const id2 = `${name2.value}-${String(value).replace(".", "-")}`;
      const btnProps = {
        color: (_itemState$value$inde = itemState.value[index]) == null ? void 0 : _itemState$value$inde.color,
        density: props.density,
        disabled: props.disabled,
        icon: (_itemState$value$inde2 = itemState.value[index]) == null ? void 0 : _itemState$value$inde2.icon,
        ripple: props.ripple,
        size: props.size,
        tag: "span",
        variant: "plain"
      };
      return createVNode(Fragment, null, [createVNode("label", {
        "for": id2,
        "class": {
          "v-rating__item--half": props.halfIncrements && value % 1 > 0,
          "v-rating__item--full": props.halfIncrements && value % 1 === 0
        },
        "onMousedown": onMousedown,
        "onMouseup": onMouseup,
        "onMouseenter": onMouseenter,
        "onMouseleave": onMouseleave
      }, [createVNode("span", {
        "class": "v-rating__hidden"
      }, [t2(props.itemAriaLabel, value, props.length)]), !showStar ? void 0 : slots.item ? slots.item({
        ...itemState.value[index],
        props: btnProps,
        value,
        index
      }) : createVNode(VBtn, btnProps, null)]), createVNode("input", {
        "class": "v-rating__hidden",
        "name": name2.value,
        "id": id2,
        "type": "radio",
        "value": value,
        "checked": normalizedValue.value === value,
        "onClick": onClick,
        "onFocus": onFocus,
        "onBlur": onBlur,
        "ref": index === 0 ? firstRef : void 0,
        "readonly": props.readonly,
        "disabled": props.disabled
      }, null)]);
    }
    function createLabel(labelProps) {
      if (slots["item-label"])
        return slots["item-label"](labelProps);
      if (labelProps.label)
        return createVNode("span", null, [labelProps.label]);
      return createVNode("span", null, [createTextVNode(" ")]);
    }
    useRender(() => {
      var _props$itemLabels;
      const hasLabels = !!((_props$itemLabels = props.itemLabels) != null && _props$itemLabels.length) || slots["item-label"];
      return createVNode(props.tag, {
        "class": ["v-rating", {
          "v-rating--hover": props.hover,
          "v-rating--readonly": props.readonly
        }, themeClasses.value]
      }, {
        default: () => [createVNode(VRatingItem, {
          "value": 0,
          "index": -1,
          "showStar": false
        }, null), range.value.map((value, i2) => {
          var _props$itemLabels2, _props$itemLabels3;
          return createVNode("div", {
            "class": "v-rating__wrapper"
          }, [hasLabels && props.itemLabelPosition === "top" ? createLabel({
            value,
            index: i2,
            label: (_props$itemLabels2 = props.itemLabels) == null ? void 0 : _props$itemLabels2[i2]
          }) : void 0, createVNode("div", {
            "class": ["v-rating__item", {
              "v-rating__item--focused": Math.ceil(focusIndex.value) === value
            }]
          }, [props.halfIncrements ? createVNode(Fragment, null, [createVNode(VRatingItem, {
            "value": value - 0.5,
            "index": i2 * 2
          }, null), createVNode(VRatingItem, {
            "value": value,
            "index": i2 * 2 + 1
          }, null)]) : createVNode(VRatingItem, {
            "value": value,
            "index": i2
          }, null)]), hasLabels && props.itemLabelPosition === "bottom" ? createLabel({
            value,
            index: i2,
            label: (_props$itemLabels3 = props.itemLabels) == null ? void 0 : _props$itemLabels3[i2]
          }) : void 0]);
        })]
      });
    });
    return {};
  }
});
const VSlideGroup$1 = "";
function bias(val) {
  const c = 0.501;
  const x2 = Math.abs(val);
  return Math.sign(val) * (x2 / ((1 / c - 2) * (1 - x2) + 1));
}
function calculateUpdatedOffset(_ref) {
  let {
    selectedElement,
    containerSize,
    contentSize,
    isRtl,
    currentScrollOffset,
    isHorizontal
  } = _ref;
  const clientSize = isHorizontal ? selectedElement.clientWidth : selectedElement.clientHeight;
  const offsetStart = isHorizontal ? selectedElement.offsetLeft : selectedElement.offsetTop;
  const adjustedOffsetStart = isRtl && isHorizontal ? contentSize - offsetStart - clientSize : offsetStart;
  const totalSize = containerSize + currentScrollOffset;
  const itemOffset = clientSize + adjustedOffsetStart;
  const additionalOffset = clientSize * 0.4;
  if (adjustedOffsetStart <= currentScrollOffset) {
    currentScrollOffset = Math.max(adjustedOffsetStart - additionalOffset, 0);
  } else if (totalSize <= itemOffset) {
    currentScrollOffset = Math.min(currentScrollOffset - (totalSize - itemOffset - additionalOffset), contentSize - containerSize);
  }
  return currentScrollOffset;
}
function calculateCenteredOffset(_ref2) {
  let {
    selectedElement,
    containerSize,
    contentSize,
    isRtl,
    isHorizontal
  } = _ref2;
  const clientSize = isHorizontal ? selectedElement.clientWidth : selectedElement.clientHeight;
  const offsetStart = isHorizontal ? selectedElement.offsetLeft : selectedElement.offsetTop;
  const offsetCentered = isRtl && isHorizontal ? contentSize - offsetStart - clientSize / 2 - containerSize / 2 : offsetStart + clientSize / 2 - containerSize / 2;
  return Math.min(contentSize - containerSize, Math.max(0, offsetCentered));
}
const VSlideGroupSymbol = Symbol.for("vuetify:v-slide-group");
const VSlideGroup = genericComponent()({
  name: "VSlideGroup",
  props: {
    centerActive: Boolean,
    direction: {
      type: String,
      default: "horizontal"
    },
    symbol: {
      type: null,
      default: VSlideGroupSymbol
    },
    nextIcon: {
      type: IconValue,
      default: "$next"
    },
    prevIcon: {
      type: IconValue,
      default: "$prev"
    },
    showArrows: {
      type: [Boolean, String],
      validator: (v) => typeof v === "boolean" || ["always", "desktop", "mobile"].includes(v)
    },
    ...makeTagProps(),
    ...makeGroupProps({
      selectedClass: "v-slide-group-item--active"
    })
  },
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      isRtl
    } = useRtl();
    const {
      mobile
    } = useDisplay();
    const group = useGroup(props, props.symbol);
    const isOverflowing = ref(false);
    const scrollOffset = ref(0);
    const containerSize = ref(0);
    const contentSize = ref(0);
    const isHorizontal = computed(() => props.direction === "horizontal");
    const {
      resizeRef: containerRef,
      contentRect: containerRect
    } = useResizeObserver();
    const {
      resizeRef: contentRef,
      contentRect
    } = useResizeObserver();
    const firstSelectedIndex = computed(() => {
      if (!group.selected.value.length)
        return -1;
      return group.items.value.findIndex((item) => item.id === group.selected.value[0]);
    });
    const lastSelectedIndex = computed(() => {
      if (!group.selected.value.length)
        return -1;
      return group.items.value.findIndex((item) => item.id === group.selected.value[group.selected.value.length - 1]);
    });
    if (IN_BROWSER) {
      let frame = -1;
      watch(() => [group.selected.value, containerRect.value, contentRect.value, isHorizontal.value], () => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          if (containerRect.value && contentRect.value) {
            const sizeProperty = isHorizontal.value ? "width" : "height";
            containerSize.value = containerRect.value[sizeProperty];
            contentSize.value = contentRect.value[sizeProperty];
            isOverflowing.value = containerSize.value + 1 < contentSize.value;
          }
          if (firstSelectedIndex.value >= 0 && contentRef.value) {
            const selectedElement = contentRef.value.children[lastSelectedIndex.value];
            if (firstSelectedIndex.value === 0 || !isOverflowing.value) {
              scrollOffset.value = 0;
            } else if (props.centerActive) {
              scrollOffset.value = calculateCenteredOffset({
                selectedElement,
                containerSize: containerSize.value,
                contentSize: contentSize.value,
                isRtl: isRtl.value,
                isHorizontal: isHorizontal.value
              });
            } else if (isOverflowing.value) {
              scrollOffset.value = calculateUpdatedOffset({
                selectedElement,
                containerSize: containerSize.value,
                contentSize: contentSize.value,
                isRtl: isRtl.value,
                currentScrollOffset: scrollOffset.value,
                isHorizontal: isHorizontal.value
              });
            }
          }
        });
      });
    }
    const disableTransition = ref(false);
    let startTouch = 0;
    let startOffset = 0;
    function onTouchstart(e2) {
      const sizeProperty = isHorizontal.value ? "clientX" : "clientY";
      const sign = isRtl.value && isHorizontal.value ? -1 : 1;
      startOffset = sign * scrollOffset.value;
      startTouch = e2.touches[0][sizeProperty];
      disableTransition.value = true;
    }
    function onTouchmove(e2) {
      if (!isOverflowing.value)
        return;
      const sizeProperty = isHorizontal.value ? "clientX" : "clientY";
      const sign = isRtl.value && isHorizontal.value ? -1 : 1;
      scrollOffset.value = sign * (startOffset + startTouch - e2.touches[0][sizeProperty]);
    }
    function onTouchend(e2) {
      const maxScrollOffset = contentSize.value - containerSize.value;
      if (scrollOffset.value < 0 || !isOverflowing.value) {
        scrollOffset.value = 0;
      } else if (scrollOffset.value >= maxScrollOffset) {
        scrollOffset.value = maxScrollOffset;
      }
      disableTransition.value = false;
    }
    function onScroll() {
      if (!containerRef.value)
        return;
      containerRef.value[isHorizontal.value ? "scrollLeft" : "scrollTop"] = 0;
    }
    const isFocused = ref(false);
    function onFocusin(e2) {
      isFocused.value = true;
      if (!isOverflowing.value || !contentRef.value)
        return;
      for (const el of e2.composedPath()) {
        for (const item of contentRef.value.children) {
          if (item === el) {
            scrollOffset.value = calculateUpdatedOffset({
              selectedElement: item,
              containerSize: containerSize.value,
              contentSize: contentSize.value,
              isRtl: isRtl.value,
              currentScrollOffset: scrollOffset.value,
              isHorizontal: isHorizontal.value
            });
            return;
          }
        }
      }
    }
    function onFocusout(e2) {
      isFocused.value = false;
    }
    function onFocus(e2) {
      var _contentRef$value;
      if (!isFocused.value && !(e2.relatedTarget && (_contentRef$value = contentRef.value) != null && _contentRef$value.contains(e2.relatedTarget)))
        focus();
    }
    function onKeydown(e2) {
      if (!contentRef.value)
        return;
      if (isHorizontal.value) {
        if (e2.key === "ArrowRight") {
          focus(isRtl.value ? "prev" : "next");
        } else if (e2.key === "ArrowLeft") {
          focus(isRtl.value ? "next" : "prev");
        }
      } else {
        if (e2.key === "ArrowDown") {
          focus("next");
        } else if (e2.key === "ArrowUp") {
          focus("prev");
        }
      }
      if (e2.key === "Home") {
        focus("first");
      } else if (e2.key === "End") {
        focus("last");
      }
    }
    function focus(location2) {
      if (!contentRef.value)
        return;
      if (!location2) {
        var _focusable$;
        const focusable = [...contentRef.value.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')].filter((el) => !el.hasAttribute("disabled"));
        (_focusable$ = focusable[0]) == null ? void 0 : _focusable$.focus();
      } else if (location2 === "next") {
        var _contentRef$value$que;
        const el = (_contentRef$value$que = contentRef.value.querySelector(":focus")) == null ? void 0 : _contentRef$value$que.nextElementSibling;
        if (el)
          el.focus();
        else
          focus("first");
      } else if (location2 === "prev") {
        var _contentRef$value$que2;
        const el = (_contentRef$value$que2 = contentRef.value.querySelector(":focus")) == null ? void 0 : _contentRef$value$que2.previousElementSibling;
        if (el)
          el.focus();
        else
          focus("last");
      } else if (location2 === "first") {
        var _contentRef$value$fir;
        (_contentRef$value$fir = contentRef.value.firstElementChild) == null ? void 0 : _contentRef$value$fir.focus();
      } else if (location2 === "last") {
        var _contentRef$value$las;
        (_contentRef$value$las = contentRef.value.lastElementChild) == null ? void 0 : _contentRef$value$las.focus();
      }
    }
    function scrollTo(location2) {
      const newAbsoluteOffset = scrollOffset.value + (location2 === "prev" ? -1 : 1) * containerSize.value;
      scrollOffset.value = clamp(newAbsoluteOffset, 0, contentSize.value - containerSize.value);
    }
    const contentStyles = computed(() => {
      let scrollAmount = scrollOffset.value > contentSize.value - containerSize.value ? -(contentSize.value - containerSize.value) + bias(contentSize.value - containerSize.value - scrollOffset.value) : -scrollOffset.value;
      if (scrollOffset.value <= 0) {
        scrollAmount = bias(-scrollOffset.value);
      }
      const sign = isRtl.value && isHorizontal.value ? -1 : 1;
      return {
        transform: `translate${isHorizontal.value ? "X" : "Y"}(${sign * scrollAmount}px)`,
        transition: disableTransition.value ? "none" : "",
        willChange: disableTransition.value ? "transform" : ""
      };
    });
    const slotProps = computed(() => ({
      next: group.next,
      prev: group.prev,
      select: group.select,
      isSelected: group.isSelected
    }));
    const hasAffixes = computed(() => {
      switch (props.showArrows) {
        case "always":
          return true;
        case "desktop":
          return !mobile.value;
        case true:
          return isOverflowing.value || Math.abs(scrollOffset.value) > 0;
        case "mobile":
          return mobile.value || isOverflowing.value || Math.abs(scrollOffset.value) > 0;
        default:
          return !mobile.value && (isOverflowing.value || Math.abs(scrollOffset.value) > 0);
      }
    });
    const hasPrev = computed(() => {
      return Math.abs(scrollOffset.value) > 0;
    });
    const hasNext = computed(() => {
      return contentSize.value > Math.abs(scrollOffset.value) + containerSize.value;
    });
    useRender(() => {
      var _slots$prev, _slots$default, _slots$next;
      return createVNode(props.tag, {
        "class": ["v-slide-group", {
          "v-slide-group--vertical": !isHorizontal.value,
          "v-slide-group--has-affixes": hasAffixes.value,
          "v-slide-group--is-overflowing": isOverflowing.value
        }],
        "tabindex": isFocused.value || group.selected.value.length ? -1 : 0,
        "onFocus": onFocus
      }, {
        default: () => [hasAffixes.value && createVNode("div", {
          "key": "prev",
          "class": ["v-slide-group__prev", {
            "v-slide-group__prev--disabled": !hasPrev.value
          }],
          "onClick": () => scrollTo("prev")
        }, [((_slots$prev = slots.prev) == null ? void 0 : _slots$prev.call(slots, slotProps.value)) ?? createVNode(VFadeTransition, null, {
          default: () => [createVNode(VIcon, {
            "icon": isRtl.value ? props.nextIcon : props.prevIcon
          }, null)]
        })]), createVNode("div", {
          "key": "container",
          "ref": containerRef,
          "class": "v-slide-group__container",
          "onScroll": onScroll
        }, [createVNode("div", {
          "ref": contentRef,
          "class": "v-slide-group__content",
          "style": contentStyles.value,
          "onTouchstartPassive": onTouchstart,
          "onTouchmovePassive": onTouchmove,
          "onTouchendPassive": onTouchend,
          "onFocusin": onFocusin,
          "onFocusout": onFocusout,
          "onKeydown": onKeydown
        }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, slotProps.value)])]), hasAffixes.value && createVNode("div", {
          "key": "next",
          "class": ["v-slide-group__next", {
            "v-slide-group__next--disabled": !hasNext.value
          }],
          "onClick": () => scrollTo("next")
        }, [((_slots$next = slots.next) == null ? void 0 : _slots$next.call(slots, slotProps.value)) ?? createVNode(VFadeTransition, null, {
          default: () => [createVNode(VIcon, {
            "icon": isRtl.value ? props.prevIcon : props.nextIcon
          }, null)]
        })])]
      });
    });
    return {
      selected: group.selected,
      scrollTo,
      scrollOffset,
      focus
    };
  }
});
const VSlideGroupItem = genericComponent()({
  name: "VSlideGroupItem",
  props: {
    ...makeGroupItemProps()
  },
  emits: {
    "group:selected": (val) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const slideGroupItem = useGroupItem(props, VSlideGroupSymbol);
    return () => {
      var _slots$default;
      return (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, {
        isSelected: slideGroupItem.isSelected.value,
        select: slideGroupItem.select,
        toggle: slideGroupItem.toggle,
        selectedClass: slideGroupItem.selectedClass.value
      });
    };
  }
});
const VSnackbar$1 = "";
const VSnackbar = genericComponent()({
  name: "VSnackbar",
  props: {
    multiLine: Boolean,
    timeout: {
      type: [Number, String],
      default: 5e3
    },
    vertical: Boolean,
    ...makeLocationProps({
      location: "bottom"
    }),
    ...makePositionProps(),
    ...makeRoundedProps(),
    ...makeVariantProps(),
    ...makeThemeProps(),
    ...omit(makeVOverlayProps({
      transition: "v-snackbar-transition"
    }), ["persistent", "noClickAnimation", "scrim", "scrollStrategy"])
  },
  emits: {
    "update:modelValue": (v) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const isActive = useProxiedModel(props, "modelValue");
    const {
      locationStyles
    } = useLocation(props);
    const {
      positionClasses
    } = usePosition(props);
    const {
      scopeId
    } = useScopeId();
    const {
      themeClasses
    } = provideTheme(props);
    const {
      colorClasses,
      colorStyles,
      variantClasses
    } = useVariant(props);
    const {
      roundedClasses
    } = useRounded(props);
    const overlay = ref();
    watch(isActive, startTimeout);
    watch(() => props.timeout, startTimeout);
    onMounted(() => {
      if (isActive.value)
        startTimeout();
    });
    let activeTimeout = -1;
    function startTimeout() {
      window.clearTimeout(activeTimeout);
      const timeout = Number(props.timeout);
      if (!isActive.value || timeout === -1)
        return;
      activeTimeout = window.setTimeout(() => {
        isActive.value = false;
      }, timeout);
    }
    function onPointerenter() {
      window.clearTimeout(activeTimeout);
    }
    useRender(() => {
      const [overlayProps] = filterVOverlayProps(props);
      return createVNode(VOverlay, mergeProps({
        "ref": overlay,
        "class": ["v-snackbar", {
          "v-snackbar--active": isActive.value,
          "v-snackbar--multi-line": props.multiLine && !props.vertical,
          "v-snackbar--vertical": props.vertical
        }, positionClasses.value]
      }, overlayProps, {
        "modelValue": isActive.value,
        "onUpdate:modelValue": ($event) => isActive.value = $event,
        "contentProps": mergeProps({
          style: locationStyles.value
        }, overlayProps.contentProps),
        "persistent": true,
        "noClickAnimation": true,
        "scrim": false,
        "scrollStrategy": "none"
      }, scopeId), {
        default: () => [createVNode("div", {
          "class": ["v-snackbar__wrapper", themeClasses.value, colorClasses.value, roundedClasses.value, variantClasses.value],
          "style": [colorStyles.value],
          "onPointerenter": onPointerenter,
          "onPointerleave": startTimeout
        }, [genOverlays(false, "v-snackbar"), slots.default && createVNode("div", {
          "class": "v-snackbar__content",
          "role": "status",
          "aria-live": "polite"
        }, [slots.default()]), slots.actions && createVNode(VDefaultsProvider, {
          "defaults": {
            VBtn: {
              variant: "text",
              ripple: false
            }
          }
        }, {
          default: () => [createVNode("div", {
            "class": "v-snackbar__actions"
          }, [slots.actions()])]
        })])],
        activator: slots.activator
      });
    });
    return forwardRefs({}, overlay);
  }
});
const VSwitch$1 = "";
const VSwitch = defineComponent({
  name: "VSwitch",
  inheritAttrs: false,
  props: {
    indeterminate: Boolean,
    inset: Boolean,
    flat: Boolean,
    loading: {
      type: [Boolean, String],
      default: false
    },
    ...makeVInputProps(),
    ...makeSelectionControlProps()
  },
  emits: {
    "update:focused": (focused) => true,
    "update:modelValue": () => true,
    "update:indeterminate": (val) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const indeterminate = useProxiedModel(props, "indeterminate");
    const model = useProxiedModel(props, "modelValue");
    const {
      loaderClasses
    } = useLoader(props);
    const {
      isFocused,
      focus,
      blur
    } = useFocus(props);
    const loaderColor = computed(() => {
      return typeof props.loading === "string" && props.loading !== "" ? props.loading : props.color;
    });
    const uid2 = getUid();
    const id2 = computed(() => props.id || `switch-${uid2}`);
    function onChange() {
      if (indeterminate.value) {
        indeterminate.value = false;
      }
    }
    useRender(() => {
      const [inputAttrs, controlAttrs] = filterInputAttrs(attrs);
      const [inputProps, _1] = filterInputProps(props);
      const [controlProps, _2] = filterControlProps(props);
      const control2 = ref();
      function onClick() {
        var _control$value, _control$value$input;
        (_control$value = control2.value) == null ? void 0 : (_control$value$input = _control$value.input) == null ? void 0 : _control$value$input.click();
      }
      return createVNode(VInput, mergeProps({
        "class": ["v-switch", {
          "v-switch--inset": props.inset
        }, {
          "v-switch--indeterminate": indeterminate.value
        }, loaderClasses.value]
      }, inputAttrs, inputProps, {
        "id": id2.value,
        "focused": isFocused.value
      }), {
        ...slots,
        default: (_ref2) => {
          let {
            id: id3,
            isDisabled,
            isReadonly,
            isValid
          } = _ref2;
          return createVNode(VSelectionControl, mergeProps({
            "ref": control2
          }, controlProps, {
            "modelValue": model.value,
            "onUpdate:modelValue": [($event) => model.value = $event, onChange],
            "id": id3.value,
            "type": "checkbox",
            "aria-checked": indeterminate.value ? "mixed" : void 0,
            "disabled": isDisabled.value,
            "readonly": isReadonly.value,
            "onFocus": focus,
            "onBlur": blur
          }, controlAttrs), {
            ...slots,
            default: () => createVNode("div", {
              "class": "v-switch__track",
              "onClick": onClick
            }, null),
            input: (_ref3) => {
              let {
                textColorClasses,
                textColorStyles
              } = _ref3;
              return createVNode("div", {
                "class": ["v-switch__thumb", textColorClasses.value],
                "style": textColorStyles.value
              }, [props.loading && createVNode(LoaderSlot, {
                "name": "v-switch",
                "active": true,
                "color": isValid.value === false ? void 0 : loaderColor.value
              }, {
                default: (slotProps) => slots.loader ? slots.loader(slotProps) : createVNode(VProgressCircular, {
                  "active": slotProps.isActive,
                  "color": slotProps.color,
                  "indeterminate": true,
                  "size": "16",
                  "width": "2"
                }, null)
              })]);
            }
          });
        }
      });
    });
    return {};
  }
});
const VSystemBar$1 = "";
const VSystemBar = defineComponent({
  name: "VSystemBar",
  props: {
    color: String,
    height: [Number, String],
    window: Boolean,
    ...makeElevationProps(),
    ...makeLayoutItemProps(),
    ...makeRoundedProps(),
    ...makeTagProps(),
    ...makeThemeProps()
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(toRef(props, "color"));
    const {
      elevationClasses
    } = useElevation(props);
    const {
      roundedClasses
    } = useRounded(props);
    const height = computed(() => props.height ?? (props.window ? 32 : 24));
    const {
      layoutItemStyles
    } = useLayoutItem({
      id: props.name,
      order: computed(() => parseInt(props.order, 10)),
      position: ref("top"),
      layoutSize: height,
      elementSize: height,
      active: computed(() => true),
      absolute: toRef(props, "absolute")
    });
    useRender(() => createVNode(props.tag, {
      "class": ["v-system-bar", {
        "v-system-bar--window": props.window
      }, themeClasses.value, backgroundColorClasses.value, elevationClasses.value, roundedClasses.value],
      "style": [backgroundColorStyles.value, layoutItemStyles.value]
    }, slots));
    return {};
  }
});
const VTabs$1 = "";
const VTab$1 = "";
const VTabsSymbol = Symbol.for("vuetify:v-tabs");
const VTab = defineComponent({
  name: "VTab",
  props: {
    fixed: Boolean,
    icon: [Boolean, String, Function, Object],
    prependIcon: IconValue,
    appendIcon: IconValue,
    stacked: Boolean,
    title: String,
    ripple: {
      type: Boolean,
      default: true
    },
    color: String,
    sliderColor: String,
    hideSlider: Boolean,
    direction: {
      type: String,
      default: "horizontal"
    },
    ...makeTagProps(),
    ...makeRouterProps(),
    ...makeGroupItemProps({
      selectedClass: "v-tab--selected"
    }),
    ...makeThemeProps()
  },
  setup(props, _ref) {
    let {
      slots,
      attrs
    } = _ref;
    const {
      textColorClasses: sliderColorClasses,
      textColorStyles: sliderColorStyles
    } = useTextColor(props, "sliderColor");
    const isHorizontal = computed(() => props.direction === "horizontal");
    const isSelected = ref(false);
    const rootEl = ref();
    const sliderEl = ref();
    function updateSlider(_ref2) {
      let {
        value
      } = _ref2;
      isSelected.value = value;
      if (value) {
        var _rootEl$value, _rootEl$value$$el$par;
        const prevEl = (_rootEl$value = rootEl.value) == null ? void 0 : (_rootEl$value$$el$par = _rootEl$value.$el.parentElement) == null ? void 0 : _rootEl$value$$el$par.querySelector(".v-tab--selected .v-tab__slider");
        const nextEl = sliderEl.value;
        if (!prevEl || !nextEl)
          return;
        const color = getComputedStyle(prevEl).color;
        const prevBox = prevEl.getBoundingClientRect();
        const nextBox = nextEl.getBoundingClientRect();
        const xy = isHorizontal.value ? "x" : "y";
        const XY = isHorizontal.value ? "X" : "Y";
        const rightBottom = isHorizontal.value ? "right" : "bottom";
        const widthHeight = isHorizontal.value ? "width" : "height";
        const prevPos = prevBox[xy];
        const nextPos = nextBox[xy];
        const delta2 = prevPos > nextPos ? prevBox[rightBottom] - nextBox[rightBottom] : prevBox[xy] - nextBox[xy];
        const origin = Math.sign(delta2) > 0 ? isHorizontal.value ? "right" : "bottom" : Math.sign(delta2) < 0 ? isHorizontal.value ? "left" : "top" : "center";
        const size = Math.abs(delta2) + (Math.sign(delta2) < 0 ? prevBox[widthHeight] : nextBox[widthHeight]);
        const scale = size / Math.max(prevBox[widthHeight], nextBox[widthHeight]);
        const initialScale = prevBox[widthHeight] / nextBox[widthHeight];
        const sigma = 1.5;
        animate(nextEl, {
          backgroundColor: [color, ""],
          transform: [`translate${XY}(${delta2}px) scale${XY}(${initialScale})`, `translate${XY}(${delta2 / sigma}px) scale${XY}(${(scale - 1) / sigma + 1})`, ""],
          transformOrigin: Array(3).fill(origin)
        }, {
          duration: 225,
          easing: standardEasing
        });
      }
    }
    useRender(() => {
      const [btnProps] = pick(props, ["href", "to", "replace", "icon", "stacked", "prependIcon", "appendIcon", "ripple", "theme", "disabled", "selectedClass", "value", "color"]);
      return createVNode(VBtn, mergeProps({
        "_as": "VTab",
        "symbol": VTabsSymbol,
        "ref": rootEl,
        "class": ["v-tab"],
        "tabindex": isSelected.value ? 0 : -1,
        "role": "tab",
        "aria-selected": String(isSelected.value),
        "active": false,
        "block": props.fixed,
        "maxWidth": props.fixed ? 300 : void 0,
        "variant": "text",
        "rounded": 0
      }, btnProps, attrs, {
        "onGroup:selected": updateSlider
      }), {
        default: () => [slots.default ? slots.default() : props.title, !props.hideSlider && createVNode("div", {
          "ref": sliderEl,
          "class": ["v-tab__slider", sliderColorClasses.value],
          "style": sliderColorStyles.value
        }, null)]
      });
    });
    return {};
  }
});
function parseItems(items) {
  if (!items)
    return [];
  return items.map((item) => {
    if (typeof item === "string")
      return {
        title: item,
        value: item
      };
    return item;
  });
}
const VTabs = defineComponent({
  name: "VTabs",
  props: {
    alignTabs: {
      type: String,
      default: "start"
    },
    color: String,
    direction: {
      type: String,
      default: "horizontal"
    },
    fixedTabs: Boolean,
    items: {
      type: Array,
      default: () => []
    },
    stacked: Boolean,
    bgColor: String,
    grow: Boolean,
    height: {
      type: [Number, String],
      default: void 0
    },
    hideSlider: Boolean,
    sliderColor: String,
    modelValue: null,
    mandatory: {
      type: [Boolean, String],
      default: "force"
    },
    ...makeDensityProps(),
    ...makeTagProps()
  },
  emits: {
    "update:modelValue": (v) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const model = useProxiedModel(props, "modelValue");
    const parsedItems = computed(() => parseItems(props.items));
    const {
      densityClasses
    } = useDensity(props);
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(toRef(props, "bgColor"));
    provideDefaults({
      VTab: {
        color: toRef(props, "color"),
        direction: toRef(props, "direction"),
        stacked: toRef(props, "stacked"),
        fixed: toRef(props, "fixedTabs"),
        sliderColor: toRef(props, "sliderColor"),
        hideSlider: toRef(props, "hideSlider")
      }
    });
    useRender(() => createVNode(VSlideGroup, {
      "modelValue": model.value,
      "onUpdate:modelValue": ($event) => model.value = $event,
      "class": ["v-tabs", `v-tabs--${props.direction}`, `v-tabs--align-tabs-${props.alignTabs}`, {
        "v-tabs--fixed-tabs": props.fixedTabs,
        "v-tabs--grow": props.grow,
        "v-tabs--stacked": props.stacked
      }, densityClasses.value, backgroundColorClasses.value],
      "style": [{
        "--v-tabs-height": convertToUnit(props.height)
      }, backgroundColorStyles.value],
      "role": "tablist",
      "symbol": VTabsSymbol,
      "mandatory": props.mandatory,
      "direction": props.direction
    }, {
      default: () => [slots.default ? slots.default() : parsedItems.value.map((item) => createVNode(VTab, mergeProps(item, {
        "key": item.title
      }), null))]
    }));
    return {};
  }
});
const VTable$1 = "";
const VTable = defineComponent({
  name: "VTable",
  props: {
    fixedHeader: Boolean,
    fixedFooter: Boolean,
    height: [Number, String],
    hover: Boolean,
    ...makeDensityProps(),
    ...makeTagProps(),
    ...makeThemeProps()
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      densityClasses
    } = useDensity(props);
    useRender(() => {
      var _slots$top, _slots$wrapper, _slots$bottom;
      return createVNode(props.tag, {
        "class": ["v-table", {
          "v-table--fixed-height": !!props.height,
          "v-table--fixed-header": props.fixedHeader,
          "v-table--fixed-footer": props.fixedFooter,
          "v-table--has-top": !!slots.top,
          "v-table--has-bottom": !!slots.bottom,
          "v-table--hover": props.hover
        }, themeClasses.value, densityClasses.value]
      }, {
        default: () => [(_slots$top = slots.top) == null ? void 0 : _slots$top.call(slots), slots.default ? createVNode("div", {
          "class": "v-table__wrapper",
          "style": {
            height: convertToUnit(props.height)
          }
        }, [createVNode("table", null, [slots.default()])]) : (_slots$wrapper = slots.wrapper) == null ? void 0 : _slots$wrapper.call(slots), (_slots$bottom = slots.bottom) == null ? void 0 : _slots$bottom.call(slots)]
      });
    });
    return {};
  }
});
const VTextarea$1 = "";
const VTextarea = defineComponent({
  name: "VTextarea",
  directives: {
    Intersect
  },
  inheritAttrs: false,
  props: {
    autoGrow: Boolean,
    autofocus: Boolean,
    counter: [Boolean, Number, String],
    counterValue: Function,
    hint: String,
    persistentHint: Boolean,
    prefix: String,
    placeholder: String,
    persistentPlaceholder: Boolean,
    persistentCounter: Boolean,
    noResize: Boolean,
    rows: {
      type: [Number, String],
      default: 5,
      validator: (v) => !isNaN(parseFloat(v))
    },
    maxRows: {
      type: [Number, String],
      validator: (v) => !isNaN(parseFloat(v))
    },
    suffix: String,
    ...makeVInputProps(),
    ...makeVFieldProps()
  },
  emits: {
    "click:control": (e2) => true,
    "update:focused": (focused) => true,
    "update:modelValue": (val) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      emit,
      slots
    } = _ref;
    const model = useProxiedModel(props, "modelValue");
    const {
      isFocused,
      focus,
      blur
    } = useFocus(props);
    const counterValue = computed(() => {
      return typeof props.counterValue === "function" ? props.counterValue(model.value) : (model.value || "").toString().length;
    });
    const max2 = computed(() => {
      if (attrs.maxlength)
        return attrs.maxlength;
      if (!props.counter || typeof props.counter !== "number" && typeof props.counter !== "string")
        return void 0;
      return props.counter;
    });
    function onIntersect(isIntersecting, entries) {
      var _entries$0$target, _entries$0$target$foc;
      if (!props.autofocus || !isIntersecting)
        return;
      (_entries$0$target = entries[0].target) == null ? void 0 : (_entries$0$target$foc = _entries$0$target.focus) == null ? void 0 : _entries$0$target$foc.call(_entries$0$target);
    }
    const vInputRef = ref();
    const vFieldRef = ref();
    const controlHeight = ref("");
    const textareaRef = ref();
    const isActive = computed(() => isFocused.value || props.persistentPlaceholder);
    const messages = computed(() => {
      return props.messages.length ? props.messages : isActive.value || props.persistentHint ? props.hint : "";
    });
    function onFocus() {
      if (textareaRef.value !== document.activeElement) {
        var _textareaRef$value;
        (_textareaRef$value = textareaRef.value) == null ? void 0 : _textareaRef$value.focus();
      }
      if (!isFocused.value)
        focus();
    }
    function onControlClick(e2) {
      onFocus();
      emit("click:control", e2);
    }
    function onClear(e2) {
      e2.stopPropagation();
      onFocus();
      nextTick(() => {
        model.value = "";
        callEvent(props["onClick:clear"], e2);
      });
    }
    function onInput(e2) {
      model.value = e2.target.value;
    }
    const sizerRef = ref();
    function calculateInputHeight() {
      if (!props.autoGrow)
        return;
      nextTick(() => {
        if (!sizerRef.value || !vFieldRef.value)
          return;
        const style = getComputedStyle(sizerRef.value);
        const fieldStyle = getComputedStyle(vFieldRef.value.$el);
        const padding = parseFloat(style.getPropertyValue("--v-field-padding-top")) + parseFloat(style.getPropertyValue("--v-input-padding-top")) + parseFloat(style.getPropertyValue("--v-field-padding-bottom"));
        const height = sizerRef.value.scrollHeight;
        const lineHeight = parseFloat(style.lineHeight);
        const minHeight = Math.max(parseFloat(props.rows) * lineHeight + padding, parseFloat(fieldStyle.getPropertyValue("--v-input-control-height")));
        const maxHeight = parseFloat(props.maxRows) * lineHeight + padding || Infinity;
        controlHeight.value = convertToUnit(clamp(height ?? 0, minHeight, maxHeight));
      });
    }
    onMounted(calculateInputHeight);
    watch(model, calculateInputHeight);
    watch(() => props.rows, calculateInputHeight);
    watch(() => props.maxRows, calculateInputHeight);
    watch(() => props.density, calculateInputHeight);
    let observer;
    watch(sizerRef, (val) => {
      if (val) {
        observer = new ResizeObserver(calculateInputHeight);
        observer.observe(sizerRef.value);
      } else {
        var _observer;
        (_observer = observer) == null ? void 0 : _observer.disconnect();
      }
    });
    onBeforeUnmount(() => {
      var _observer2;
      (_observer2 = observer) == null ? void 0 : _observer2.disconnect();
    });
    useRender(() => {
      const hasCounter = !!(slots.counter || props.counter || props.counterValue);
      const hasDetails = !!(hasCounter || slots.details);
      const [rootAttrs, inputAttrs] = filterInputAttrs(attrs);
      const [{
        modelValue: _2,
        ...inputProps
      }] = filterInputProps(props);
      const [fieldProps] = filterFieldProps(props);
      return createVNode(VInput, mergeProps({
        "ref": vInputRef,
        "modelValue": model.value,
        "onUpdate:modelValue": ($event) => model.value = $event,
        "class": ["v-textarea v-text-field", {
          "v-textarea--prefixed": props.prefix,
          "v-textarea--suffixed": props.suffix,
          "v-text-field--prefixed": props.prefix,
          "v-text-field--suffixed": props.suffix,
          "v-textarea--auto-grow": props.autoGrow,
          "v-textarea--no-resize": props.noResize || props.autoGrow,
          "v-text-field--flush-details": ["plain", "underlined"].includes(props.variant)
        }],
        "onClick:prepend": props["onClick:prepend"],
        "onClick:append": props["onClick:append"]
      }, rootAttrs, inputProps, {
        "focused": isFocused.value,
        "messages": messages.value
      }), {
        ...slots,
        default: (_ref2) => {
          let {
            isDisabled,
            isDirty,
            isReadonly,
            isValid
          } = _ref2;
          return createVNode(VField, mergeProps({
            "ref": vFieldRef,
            "style": {
              "--v-textarea-control-height": controlHeight.value
            },
            "onClick:control": onControlClick,
            "onClick:clear": onClear,
            "onClick:prependInner": props["onClick:prependInner"],
            "onClick:appendInner": props["onClick:appendInner"],
            "role": "textbox"
          }, fieldProps, {
            "active": isActive.value || isDirty.value,
            "dirty": isDirty.value || props.dirty,
            "focused": isFocused.value,
            "error": isValid.value === false
          }), {
            ...slots,
            default: (_ref3) => {
              let {
                props: {
                  class: fieldClass,
                  ...slotProps
                }
              } = _ref3;
              return createVNode(Fragment, null, [props.prefix && createVNode("span", {
                "class": "v-text-field__prefix"
              }, [props.prefix]), withDirectives(createVNode("textarea", mergeProps({
                "ref": textareaRef,
                "class": fieldClass,
                "value": model.value,
                "onInput": onInput,
                "autofocus": props.autofocus,
                "readonly": isReadonly.value,
                "disabled": isDisabled.value,
                "placeholder": props.placeholder,
                "rows": props.rows,
                "name": props.name,
                "onFocus": onFocus,
                "onBlur": blur
              }, slotProps, inputAttrs), null), [[resolveDirective("intersect"), {
                handler: onIntersect
              }, null, {
                once: true
              }]]), props.autoGrow && withDirectives(createVNode("textarea", {
                "class": [fieldClass, "v-textarea__sizer"],
                "onUpdate:modelValue": ($event) => model.value = $event,
                "ref": sizerRef,
                "readonly": true,
                "aria-hidden": "true"
              }, null), [[vModelText, model.value]]), props.suffix && createVNode("span", {
                "class": "v-text-field__suffix"
              }, [props.suffix])]);
            }
          });
        },
        details: hasDetails ? (slotProps) => {
          var _slots$details;
          return createVNode(Fragment, null, [(_slots$details = slots.details) == null ? void 0 : _slots$details.call(slots, slotProps), hasCounter && createVNode(Fragment, null, [createVNode("span", null, null), createVNode(VCounter, {
            "active": props.persistentCounter || isFocused.value,
            "value": counterValue.value,
            "max": max2.value
          }, slots.counter)])]);
        } : void 0
      });
    });
    return forwardRefs({}, vInputRef, vFieldRef, textareaRef);
  }
});
const VThemeProvider$1 = "";
const VThemeProvider = defineComponent({
  name: "VThemeProvider",
  props: {
    withBackground: Boolean,
    ...makeThemeProps(),
    ...makeTagProps()
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    return () => {
      var _slots$default, _slots$default2;
      if (!props.withBackground)
        return (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots);
      return createVNode(props.tag, {
        "class": ["v-theme-provider", themeClasses.value]
      }, {
        default: () => [(_slots$default2 = slots.default) == null ? void 0 : _slots$default2.call(slots)]
      });
    };
  }
});
const VTimeline$1 = "";
const VTimeline = defineComponent({
  name: "VTimeline",
  props: {
    align: {
      type: String,
      default: "center",
      validator: (v) => ["center", "start"].includes(v)
    },
    direction: {
      type: String,
      default: "vertical",
      validator: (v) => ["vertical", "horizontal"].includes(v)
    },
    justify: {
      type: String,
      default: "auto",
      validator: (v) => ["auto", "center"].includes(v)
    },
    side: {
      type: String,
      validator: (v) => v == null || ["start", "end"].includes(v)
    },
    lineInset: {
      type: [String, Number],
      default: 0
    },
    lineThickness: {
      type: [String, Number],
      default: 2
    },
    lineColor: String,
    truncateLine: {
      type: String,
      validator: (v) => ["start", "end", "both"].includes(v)
    },
    ...makeDensityProps(),
    ...makeTagProps(),
    ...makeThemeProps()
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      densityClasses
    } = useDensity(props);
    provideDefaults({
      VTimelineDivider: {
        lineColor: toRef(props, "lineColor")
      },
      VTimelineItem: {
        density: toRef(props, "density"),
        lineInset: toRef(props, "lineInset")
      }
    });
    const sideClasses = computed(() => {
      const side = props.side ? props.side : props.density !== "default" ? "end" : null;
      return side && `v-timeline--side-${side}`;
    });
    const truncateClasses = computed(() => {
      const classes = ["v-timeline--truncate-line-start", "v-timeline--truncate-line-end"];
      switch (props.truncateLine) {
        case "both":
          return classes;
        case "start":
          return classes[0];
        case "end":
          return classes[1];
        default:
          return null;
      }
    });
    useRender(() => createVNode(props.tag, {
      "class": ["v-timeline", `v-timeline--${props.direction}`, `v-timeline--align-${props.align}`, `v-timeline--justify-${props.justify}`, truncateClasses.value, {
        "v-timeline--inset-line": !!props.lineInset
      }, themeClasses.value, densityClasses.value, sideClasses.value],
      "style": {
        "--v-timeline-line-thickness": convertToUnit(props.lineThickness)
      }
    }, slots));
    return {};
  }
});
const VTimelineDivider = defineComponent({
  name: "VTimelineDivider",
  props: {
    dotColor: String,
    fillDot: Boolean,
    hideDot: Boolean,
    icon: IconValue,
    iconColor: String,
    lineColor: String,
    ...makeRoundedProps(),
    ...makeSizeProps(),
    ...makeElevationProps()
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      sizeClasses,
      sizeStyles
    } = useSize(props, "v-timeline-divider__dot");
    const {
      backgroundColorStyles,
      backgroundColorClasses
    } = useBackgroundColor(toRef(props, "dotColor"));
    const {
      roundedClasses
    } = useRounded(props, "v-timeline-divider__dot");
    const {
      elevationClasses
    } = useElevation(props);
    const {
      backgroundColorClasses: lineColorClasses,
      backgroundColorStyles: lineColorStyles
    } = useBackgroundColor(toRef(props, "lineColor"));
    provideDefaults({
      VIcon: {
        color: toRef(props, "iconColor"),
        icon: toRef(props, "icon"),
        size: toRef(props, "size")
      }
    });
    useRender(() => {
      var _slots$default;
      return createVNode("div", {
        "class": ["v-timeline-divider", {
          "v-timeline-divider--fill-dot": props.fillDot
        }]
      }, [createVNode("div", {
        "class": ["v-timeline-divider__before", lineColorClasses.value],
        "style": lineColorStyles.value
      }, null), !props.hideDot && createVNode("div", {
        "key": "dot",
        "class": ["v-timeline-divider__dot", elevationClasses.value, roundedClasses.value, sizeClasses.value],
        "style": sizeStyles.value
      }, [createVNode("div", {
        "class": ["v-timeline-divider__inner-dot", backgroundColorClasses.value, roundedClasses.value],
        "style": backgroundColorStyles.value
      }, [((_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)) ?? (props.icon ? createVNode(VIcon, null, null) : void 0)])]), createVNode("div", {
        "class": ["v-timeline-divider__after", lineColorClasses.value],
        "style": lineColorStyles.value
      }, null)]);
    });
    return {};
  }
});
const VTimelineItem = defineComponent({
  name: "VTimelineItem",
  props: {
    density: String,
    dotColor: String,
    fillDot: Boolean,
    hideDot: Boolean,
    hideOpposite: {
      type: Boolean,
      default: void 0
    },
    icon: IconValue,
    iconColor: String,
    lineInset: [Number, String],
    ...makeRoundedProps(),
    ...makeElevationProps(),
    ...makeSizeProps(),
    ...makeTagProps(),
    ...makeDimensionProps()
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      dimensionStyles
    } = useDimension(props);
    const dotSize = ref(0);
    const dotRef = ref();
    watch(dotRef, (newValue) => {
      var _newValue$$el$querySe;
      if (!newValue)
        return;
      dotSize.value = ((_newValue$$el$querySe = newValue.$el.querySelector(".v-timeline-divider__dot")) == null ? void 0 : _newValue$$el$querySe.getBoundingClientRect().width) ?? 0;
    }, {
      flush: "post"
    });
    useRender(() => {
      var _slots$default, _slots$opposite;
      return createVNode("div", {
        "class": ["v-timeline-item", {
          "v-timeline-item--fill-dot": props.fillDot
        }],
        "style": {
          "--v-timeline-dot-size": convertToUnit(dotSize.value),
          "--v-timeline-line-inset": props.lineInset ? `calc(var(--v-timeline-dot-size) / 2 + ${convertToUnit(props.lineInset)})` : convertToUnit(0)
        }
      }, [createVNode("div", {
        "class": "v-timeline-item__body",
        "style": dimensionStyles.value
      }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)]), createVNode(VTimelineDivider, {
        "ref": dotRef,
        "hideDot": props.hideDot,
        "icon": props.icon,
        "iconColor": props.iconColor,
        "size": props.size,
        "elevation": props.elevation,
        "dotColor": props.dotColor,
        "fillDot": props.fillDot,
        "rounded": props.rounded
      }, {
        default: slots.icon
      }), props.density !== "compact" && createVNode("div", {
        "class": "v-timeline-item__opposite"
      }, [!props.hideOpposite && ((_slots$opposite = slots.opposite) == null ? void 0 : _slots$opposite.call(slots))])]);
    });
    return {};
  }
});
const VTooltip$1 = "";
const VTooltip = genericComponent()({
  name: "VTooltip",
  props: {
    id: String,
    text: String,
    ...omit(makeVOverlayProps({
      closeOnBack: false,
      location: "end",
      locationStrategy: "connected",
      minWidth: 0,
      offset: 10,
      openOnClick: false,
      openOnHover: true,
      origin: "auto",
      scrim: false,
      scrollStrategy: "reposition",
      transition: false
    }), ["absolute", "persistent", "eager"])
  },
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const isActive = useProxiedModel(props, "modelValue");
    const {
      scopeId
    } = useScopeId();
    const uid2 = getUid();
    const id2 = computed(() => props.id || `v-tooltip-${uid2}`);
    const overlay = ref();
    const location2 = computed(() => {
      return props.location.split(" ").length > 1 ? props.location : props.location + " center";
    });
    const origin = computed(() => {
      return props.origin === "auto" || props.origin === "overlap" || props.origin.split(" ").length > 1 || props.location.split(" ").length > 1 ? props.origin : props.origin + " center";
    });
    const transition = computed(() => {
      if (props.transition)
        return props.transition;
      return isActive.value ? "scale-transition" : "fade-transition";
    });
    useRender(() => {
      const [overlayProps] = filterVOverlayProps(props);
      return createVNode(VOverlay, mergeProps({
        "ref": overlay,
        "class": ["v-tooltip"],
        "id": id2.value
      }, overlayProps, {
        "modelValue": isActive.value,
        "onUpdate:modelValue": ($event) => isActive.value = $event,
        "transition": transition.value,
        "absolute": true,
        "location": location2.value,
        "origin": origin.value,
        "persistent": true,
        "role": "tooltip",
        "eager": true,
        "activatorProps": mergeProps({
          "aria-describedby": id2.value
        }, props.activatorProps),
        "_disableGlobalStack": true
      }, scopeId), {
        activator: slots.activator,
        default: function() {
          var _slots$default;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          return ((_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, ...args)) ?? props.text;
        }
      });
    });
    return forwardRefs({}, overlay);
  }
});
const VValidation = defineComponent({
  name: "VValidation",
  props: {
    ...makeValidationProps()
  },
  emits: {
    "update:modelValue": (val) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const validation = useValidation(props, "validation");
    return () => {
      var _slots$default;
      return (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, validation);
    };
  }
});
const components = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  VAlert,
  VAlertTitle,
  VApp,
  VAppBar,
  VAppBarNavIcon,
  VAppBarTitle,
  VAutocomplete,
  VAvatar,
  VBadge,
  VBanner,
  VBannerActions,
  VBannerText,
  VBottomNavigation,
  VBreadcrumbs,
  VBreadcrumbsDivider,
  VBreadcrumbsItem,
  VBtn,
  VBtnGroup,
  VBtnToggle,
  VCard,
  VCardActions,
  VCardItem,
  VCardSubtitle,
  VCardText,
  VCardTitle,
  VCarousel,
  VCarouselItem,
  VCheckbox,
  VCheckboxBtn,
  VChip,
  VChipGroup,
  VClassIcon,
  VCode,
  VCol,
  VColorPicker,
  VCombobox,
  VComponentIcon,
  VContainer,
  VCounter,
  VDefaultsProvider,
  VDialog,
  VDialogBottomTransition,
  VDialogTopTransition,
  VDialogTransition,
  VDivider,
  VExpandTransition,
  VExpandXTransition,
  VExpansionPanel,
  VExpansionPanelText,
  VExpansionPanelTitle,
  VExpansionPanels,
  VFabTransition,
  VFadeTransition,
  VField,
  VFieldLabel,
  VFileInput,
  VFooter,
  VForm,
  VHover,
  VIcon,
  VImg,
  VInput,
  VItem,
  VItemGroup,
  VKbd,
  VLabel,
  VLayout,
  VLayoutItem,
  VLazy,
  VLigatureIcon,
  VList,
  VListGroup,
  VListImg,
  VListItem,
  VListItemAction,
  VListItemMedia,
  VListItemSubtitle,
  VListItemTitle,
  VListSubheader,
  VLocaleProvider,
  VMain,
  VMenu,
  VMessages,
  VNavigationDrawer,
  VNoSsr,
  VOverlay,
  VPagination,
  VParallax,
  VProgressCircular,
  VProgressLinear,
  VRadio,
  VRadioGroup,
  VRangeSlider,
  VRating,
  VResponsive,
  VRow,
  VScaleTransition,
  VScrollXReverseTransition,
  VScrollXTransition,
  VScrollYReverseTransition,
  VScrollYTransition,
  VSelect,
  VSelectionControl,
  VSelectionControlGroup,
  VSheet,
  VSlideGroup,
  VSlideGroupItem,
  VSlideXReverseTransition,
  VSlideXTransition,
  VSlideYReverseTransition,
  VSlideYTransition,
  VSlider,
  VSnackbar,
  VSpacer,
  VSvgIcon,
  VSwitch,
  VSystemBar,
  VTab,
  VTable,
  VTabs,
  VTextField,
  VTextarea,
  VThemeProvider,
  VTimeline,
  VTimelineItem,
  VToolbar,
  VToolbarItems,
  VToolbarTitle,
  VTooltip,
  VValidation,
  VWindow,
  VWindowItem
}, Symbol.toStringTag, { value: "Module" }));
function mounted$2(el, binding) {
  const modifiers = binding.modifiers || {};
  const value = binding.value;
  const {
    once,
    immediate,
    ...modifierKeys
  } = modifiers;
  const defaultValue = !Object.keys(modifierKeys).length;
  const {
    handler,
    options
  } = typeof value === "object" ? value : {
    handler: value,
    options: {
      attributes: (modifierKeys == null ? void 0 : modifierKeys.attr) ?? defaultValue,
      characterData: (modifierKeys == null ? void 0 : modifierKeys.char) ?? defaultValue,
      childList: (modifierKeys == null ? void 0 : modifierKeys.child) ?? defaultValue,
      subtree: (modifierKeys == null ? void 0 : modifierKeys.sub) ?? defaultValue
    }
  };
  const observer = new MutationObserver(function() {
    let mutations = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    let observer2 = arguments.length > 1 ? arguments[1] : void 0;
    handler == null ? void 0 : handler(mutations, observer2);
    if (once)
      unmounted$2(el, binding);
  });
  if (immediate)
    handler == null ? void 0 : handler([], observer);
  el._mutate = Object(el._mutate);
  el._mutate[binding.instance.$.uid] = {
    observer
  };
  observer.observe(el, options);
}
function unmounted$2(el, binding) {
  var _el$_mutate;
  if (!((_el$_mutate = el._mutate) != null && _el$_mutate[binding.instance.$.uid]))
    return;
  el._mutate[binding.instance.$.uid].observer.disconnect();
  delete el._mutate[binding.instance.$.uid];
}
const Mutate = {
  mounted: mounted$2,
  unmounted: unmounted$2
};
function mounted$1(el, binding) {
  var _binding$modifiers, _binding$modifiers2;
  const handler = binding.value;
  const options = {
    passive: !((_binding$modifiers = binding.modifiers) != null && _binding$modifiers.active)
  };
  window.addEventListener("resize", handler, options);
  el._onResize = Object(el._onResize);
  el._onResize[binding.instance.$.uid] = {
    handler,
    options
  };
  if (!((_binding$modifiers2 = binding.modifiers) != null && _binding$modifiers2.quiet)) {
    handler();
  }
}
function unmounted$1(el, binding) {
  var _el$_onResize;
  if (!((_el$_onResize = el._onResize) != null && _el$_onResize[binding.instance.$.uid]))
    return;
  const {
    handler,
    options
  } = el._onResize[binding.instance.$.uid];
  window.removeEventListener("resize", handler, options);
  delete el._onResize[binding.instance.$.uid];
}
const Resize = {
  mounted: mounted$1,
  unmounted: unmounted$1
};
function mounted(el, binding) {
  const {
    self: self2 = false
  } = binding.modifiers ?? {};
  const value = binding.value;
  const options = typeof value === "object" && value.options || {
    passive: true
  };
  const handler = typeof value === "function" || "handleEvent" in value ? value : value.handler;
  const target = self2 ? el : binding.arg ? document.querySelector(binding.arg) : window;
  if (!target)
    return;
  target.addEventListener("scroll", handler, options);
  el._onScroll = Object(el._onScroll);
  el._onScroll[binding.instance.$.uid] = {
    handler,
    options,
    // Don't reference self
    target: self2 ? void 0 : target
  };
}
function unmounted(el, binding) {
  var _el$_onScroll;
  if (!((_el$_onScroll = el._onScroll) != null && _el$_onScroll[binding.instance.$.uid]))
    return;
  const {
    handler,
    options,
    target = el
  } = el._onScroll[binding.instance.$.uid];
  target.removeEventListener("scroll", handler, options);
  delete el._onScroll[binding.instance.$.uid];
}
function updated(el, binding) {
  if (binding.value === binding.oldValue)
    return;
  unmounted(el, binding);
  mounted(el, binding);
}
const Scroll = {
  mounted,
  unmounted,
  updated
};
const directives = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ClickOutside,
  Intersect,
  Mutate,
  Resize,
  Ripple,
  Scroll,
  Touch
}, Symbol.toStringTag, { value: "Module" }));
const md1 = {
  defaults: {
    global: {
      rounded: "sm"
    },
    VAvatar: {
      rounded: "circle"
    },
    VAutocomplete: {
      variant: "underlined"
    },
    VBanner: {
      color: "primary"
    },
    VBtn: {
      color: "primary",
      rounded: 0
    },
    VCheckbox: {
      color: "secondary"
    },
    VCombobox: {
      variant: "underlined"
    },
    VSelect: {
      variant: "underlined"
    },
    VSlider: {
      color: "primary"
    },
    VTabs: {
      color: "primary"
    },
    VTextarea: {
      variant: "underlined"
    },
    VTextField: {
      variant: "underlined"
    }
  },
  icons: {
    defaultSet: "mdi",
    sets: {
      mdi
    }
  },
  theme: {
    themes: {
      light: {
        colors: {
          primary: "#3F51B5",
          "primary-darken-1": "#303F9F",
          "primary-lighten-1": "#C5CAE9",
          secondary: "#FF4081",
          "secondary-darken-1": "#F50057",
          "secondary-lighten-1": "#FF80AB",
          accent: "#009688"
        }
      }
    }
  }
};
const { id: id$2, name: name$1, NamedThemeDefinition: NamedThemeDefinition$1 } = theme;
const lightCustom = {
  id: id$2(import.meta),
  theme: {
    dark: false,
    name: name$1(import.meta),
    colors: {
      background: "#FFFFFF",
      surface: "#FFFFFF",
      primary: "#6200EE",
      "primary-darken-1": "#3700B3",
      secondary: "#03DAC6",
      "secondary-darken-1": "#018786",
      error: "#B00020",
      info: "#2196F3",
      success: "#4CAF50",
      warning: "#FB8C00"
    }
  }
};
const { id: id$1, name, NamedThemeDefinition: NamedThemeDefinition2 } = theme;
const darkCustom = {
  id: id$1(import.meta),
  theme: {
    dark: true,
    name: name(import.meta),
    colors: {
      background: "#000000",
      surface: "#000000",
      primary: "#9DFF11",
      "primary-darken-1": "#C8FF4C",
      secondary: "#FC2539",
      "secondary-darken-1": "#FDACC0",
      error: "#4FFFDF",
      info: "#DE690C",
      success: "#B350AF",
      warning: "#0473FF"
    }
  }
};
const THEMES = Object.fromEntries(
  [lightCustom, darkCustom].map((t2) => [t2.id, t2.theme])
);
const vuetify = createVuetify({
  blueprint: md1,
  theme: {
    defaultTheme: defaultTheme(),
    themes: { ...THEMES }
  },
  components,
  directives,
  locale: {
    locale: "pt",
    messages: { pt: pt$2, es: es$1 }
  }
});
/*!
  * shared v9.2.2
  * (c) 2022 kazuya kawaguchi
  * Released under the MIT License.
  */
const inBrowser = typeof window !== "undefined";
const hasSymbol = typeof Symbol === "function" && typeof Symbol.toStringTag === "symbol";
const makeSymbol = (name2) => hasSymbol ? Symbol(name2) : name2;
const generateFormatCacheKey = (locale, key, source) => friendlyJSONstringify({ l: locale, k: key, s: source });
const friendlyJSONstringify = (json) => JSON.stringify(json).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g, "\\u0027");
const isNumber = (val) => typeof val === "number" && isFinite(val);
const isDate = (val) => toTypeString(val) === "[object Date]";
const isRegExp$1 = (val) => toTypeString(val) === "[object RegExp]";
const isEmptyObject = (val) => isPlainObject(val) && Object.keys(val).length === 0;
function warn(msg, err) {
  if (typeof console !== "undefined") {
    console.warn(`[intlify] ` + msg);
    if (err) {
      console.warn(err.stack);
    }
  }
}
const assign = Object.assign;
let _globalThis;
const getGlobalThis = () => {
  return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
};
function escapeHtml(rawText) {
  return rawText.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
const hasOwnProperty$1 = Object.prototype.hasOwnProperty;
function hasOwn$9(obj, key) {
  return hasOwnProperty$1.call(obj, key);
}
const isArray = Array.isArray;
const isFunction = (val) => typeof val === "function";
const isString = (val) => typeof val === "string";
const isBoolean = (val) => typeof val === "boolean";
const isObject$8 = (val) => // eslint-disable-line
val !== null && typeof val === "object";
const objectToString$1 = Object.prototype.toString;
const toTypeString = (value) => objectToString$1.call(value);
const isPlainObject = (val) => toTypeString(val) === "[object Object]";
const toDisplayString = (val) => {
  return val == null ? "" : isArray(val) || isPlainObject(val) && val.toString === objectToString$1 ? JSON.stringify(val, null, 2) : String(val);
};
/*!
  * message-compiler v9.2.2
  * (c) 2022 kazuya kawaguchi
  * Released under the MIT License.
  */
const CompileErrorCodes = {
  // tokenizer error codes
  EXPECTED_TOKEN: 1,
  INVALID_TOKEN_IN_PLACEHOLDER: 2,
  UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER: 3,
  UNKNOWN_ESCAPE_SEQUENCE: 4,
  INVALID_UNICODE_ESCAPE_SEQUENCE: 5,
  UNBALANCED_CLOSING_BRACE: 6,
  UNTERMINATED_CLOSING_BRACE: 7,
  EMPTY_PLACEHOLDER: 8,
  NOT_ALLOW_NEST_PLACEHOLDER: 9,
  INVALID_LINKED_FORMAT: 10,
  // parser error codes
  MUST_HAVE_MESSAGES_IN_PLURAL: 11,
  UNEXPECTED_EMPTY_LINKED_MODIFIER: 12,
  UNEXPECTED_EMPTY_LINKED_KEY: 13,
  UNEXPECTED_LEXICAL_ANALYSIS: 14,
  // Special value for higher-order compilers to pick up the last code
  // to avoid collision of error codes. This should always be kept as the last
  // item.
  __EXTEND_POINT__: 15
};
function createCompileError(code2, loc, options = {}) {
  const { domain, messages, args } = options;
  const msg = code2;
  const error = new SyntaxError(String(msg));
  error.code = code2;
  if (loc) {
    error.location = loc;
  }
  error.domain = domain;
  return error;
}
function defaultOnError(error) {
  throw error;
}
function createPosition(line, column, offset) {
  return { line, column, offset };
}
function createLocation(start, end, source) {
  const loc = { start, end };
  if (source != null) {
    loc.source = source;
  }
  return loc;
}
const CHAR_SP = " ";
const CHAR_CR = "\r";
const CHAR_LF = "\n";
const CHAR_LS = String.fromCharCode(8232);
const CHAR_PS = String.fromCharCode(8233);
function createScanner(str) {
  const _buf = str;
  let _index = 0;
  let _line = 1;
  let _column = 1;
  let _peekOffset = 0;
  const isCRLF = (index2) => _buf[index2] === CHAR_CR && _buf[index2 + 1] === CHAR_LF;
  const isLF = (index2) => _buf[index2] === CHAR_LF;
  const isPS = (index2) => _buf[index2] === CHAR_PS;
  const isLS = (index2) => _buf[index2] === CHAR_LS;
  const isLineEnd = (index2) => isCRLF(index2) || isLF(index2) || isPS(index2) || isLS(index2);
  const index = () => _index;
  const line = () => _line;
  const column = () => _column;
  const peekOffset = () => _peekOffset;
  const charAt2 = (offset) => isCRLF(offset) || isPS(offset) || isLS(offset) ? CHAR_LF : _buf[offset];
  const currentChar = () => charAt2(_index);
  const currentPeek = () => charAt2(_index + _peekOffset);
  function next() {
    _peekOffset = 0;
    if (isLineEnd(_index)) {
      _line++;
      _column = 0;
    }
    if (isCRLF(_index)) {
      _index++;
    }
    _index++;
    _column++;
    return _buf[_index];
  }
  function peek() {
    if (isCRLF(_index + _peekOffset)) {
      _peekOffset++;
    }
    _peekOffset++;
    return _buf[_index + _peekOffset];
  }
  function reset() {
    _index = 0;
    _line = 1;
    _column = 1;
    _peekOffset = 0;
  }
  function resetPeek(offset = 0) {
    _peekOffset = offset;
  }
  function skipToPeek() {
    const target = _index + _peekOffset;
    while (target !== _index) {
      next();
    }
    _peekOffset = 0;
  }
  return {
    index,
    line,
    column,
    peekOffset,
    charAt: charAt2,
    currentChar,
    currentPeek,
    next,
    peek,
    reset,
    resetPeek,
    skipToPeek
  };
}
const EOF = void 0;
const LITERAL_DELIMITER = "'";
const ERROR_DOMAIN$1 = "tokenizer";
function createTokenizer(source, options = {}) {
  const location2 = options.location !== false;
  const _scnr = createScanner(source);
  const currentOffset = () => _scnr.index();
  const currentPosition = () => createPosition(_scnr.line(), _scnr.column(), _scnr.index());
  const _initLoc = currentPosition();
  const _initOffset = currentOffset();
  const _context = {
    currentType: 14,
    offset: _initOffset,
    startLoc: _initLoc,
    endLoc: _initLoc,
    lastType: 14,
    lastOffset: _initOffset,
    lastStartLoc: _initLoc,
    lastEndLoc: _initLoc,
    braceNest: 0,
    inLinked: false,
    text: ""
  };
  const context = () => _context;
  const { onError } = options;
  function emitError(code2, pos, offset, ...args) {
    const ctx = context();
    pos.column += offset;
    pos.offset += offset;
    if (onError) {
      const loc = createLocation(ctx.startLoc, pos);
      const err = createCompileError(code2, loc, {
        domain: ERROR_DOMAIN$1,
        args
      });
      onError(err);
    }
  }
  function getToken(context2, type, value) {
    context2.endLoc = currentPosition();
    context2.currentType = type;
    const token = { type };
    if (location2) {
      token.loc = createLocation(context2.startLoc, context2.endLoc);
    }
    if (value != null) {
      token.value = value;
    }
    return token;
  }
  const getEndToken = (context2) => getToken(
    context2,
    14
    /* EOF */
  );
  function eat(scnr, ch) {
    if (scnr.currentChar() === ch) {
      scnr.next();
      return ch;
    } else {
      emitError(CompileErrorCodes.EXPECTED_TOKEN, currentPosition(), 0, ch);
      return "";
    }
  }
  function peekSpaces(scnr) {
    let buf = "";
    while (scnr.currentPeek() === CHAR_SP || scnr.currentPeek() === CHAR_LF) {
      buf += scnr.currentPeek();
      scnr.peek();
    }
    return buf;
  }
  function skipSpaces(scnr) {
    const buf = peekSpaces(scnr);
    scnr.skipToPeek();
    return buf;
  }
  function isIdentifierStart(ch) {
    if (ch === EOF) {
      return false;
    }
    const cc = ch.charCodeAt(0);
    return cc >= 97 && cc <= 122 || cc >= 65 && cc <= 90 || // A-Z
    cc === 95;
  }
  function isNumberStart(ch) {
    if (ch === EOF) {
      return false;
    }
    const cc = ch.charCodeAt(0);
    return cc >= 48 && cc <= 57;
  }
  function isNamedIdentifierStart(scnr, context2) {
    const { currentType } = context2;
    if (currentType !== 2) {
      return false;
    }
    peekSpaces(scnr);
    const ret = isIdentifierStart(scnr.currentPeek());
    scnr.resetPeek();
    return ret;
  }
  function isListIdentifierStart(scnr, context2) {
    const { currentType } = context2;
    if (currentType !== 2) {
      return false;
    }
    peekSpaces(scnr);
    const ch = scnr.currentPeek() === "-" ? scnr.peek() : scnr.currentPeek();
    const ret = isNumberStart(ch);
    scnr.resetPeek();
    return ret;
  }
  function isLiteralStart(scnr, context2) {
    const { currentType } = context2;
    if (currentType !== 2) {
      return false;
    }
    peekSpaces(scnr);
    const ret = scnr.currentPeek() === LITERAL_DELIMITER;
    scnr.resetPeek();
    return ret;
  }
  function isLinkedDotStart(scnr, context2) {
    const { currentType } = context2;
    if (currentType !== 8) {
      return false;
    }
    peekSpaces(scnr);
    const ret = scnr.currentPeek() === ".";
    scnr.resetPeek();
    return ret;
  }
  function isLinkedModifierStart(scnr, context2) {
    const { currentType } = context2;
    if (currentType !== 9) {
      return false;
    }
    peekSpaces(scnr);
    const ret = isIdentifierStart(scnr.currentPeek());
    scnr.resetPeek();
    return ret;
  }
  function isLinkedDelimiterStart(scnr, context2) {
    const { currentType } = context2;
    if (!(currentType === 8 || currentType === 12)) {
      return false;
    }
    peekSpaces(scnr);
    const ret = scnr.currentPeek() === ":";
    scnr.resetPeek();
    return ret;
  }
  function isLinkedReferStart(scnr, context2) {
    const { currentType } = context2;
    if (currentType !== 10) {
      return false;
    }
    const fn = () => {
      const ch = scnr.currentPeek();
      if (ch === "{") {
        return isIdentifierStart(scnr.peek());
      } else if (ch === "@" || ch === "%" || ch === "|" || ch === ":" || ch === "." || ch === CHAR_SP || !ch) {
        return false;
      } else if (ch === CHAR_LF) {
        scnr.peek();
        return fn();
      } else {
        return isIdentifierStart(ch);
      }
    };
    const ret = fn();
    scnr.resetPeek();
    return ret;
  }
  function isPluralStart(scnr) {
    peekSpaces(scnr);
    const ret = scnr.currentPeek() === "|";
    scnr.resetPeek();
    return ret;
  }
  function detectModuloStart(scnr) {
    const spaces = peekSpaces(scnr);
    const ret = scnr.currentPeek() === "%" && scnr.peek() === "{";
    scnr.resetPeek();
    return {
      isModulo: ret,
      hasSpace: spaces.length > 0
    };
  }
  function isTextStart(scnr, reset = true) {
    const fn = (hasSpace = false, prev = "", detectModulo = false) => {
      const ch = scnr.currentPeek();
      if (ch === "{") {
        return prev === "%" ? false : hasSpace;
      } else if (ch === "@" || !ch) {
        return prev === "%" ? true : hasSpace;
      } else if (ch === "%") {
        scnr.peek();
        return fn(hasSpace, "%", true);
      } else if (ch === "|") {
        return prev === "%" || detectModulo ? true : !(prev === CHAR_SP || prev === CHAR_LF);
      } else if (ch === CHAR_SP) {
        scnr.peek();
        return fn(true, CHAR_SP, detectModulo);
      } else if (ch === CHAR_LF) {
        scnr.peek();
        return fn(true, CHAR_LF, detectModulo);
      } else {
        return true;
      }
    };
    const ret = fn();
    reset && scnr.resetPeek();
    return ret;
  }
  function takeChar(scnr, fn) {
    const ch = scnr.currentChar();
    if (ch === EOF) {
      return EOF;
    }
    if (fn(ch)) {
      scnr.next();
      return ch;
    }
    return null;
  }
  function takeIdentifierChar(scnr) {
    const closure = (ch) => {
      const cc = ch.charCodeAt(0);
      return cc >= 97 && cc <= 122 || cc >= 65 && cc <= 90 || cc >= 48 && cc <= 57 || // 0-9
      cc === 95 || // _
      cc === 36;
    };
    return takeChar(scnr, closure);
  }
  function takeDigit(scnr) {
    const closure = (ch) => {
      const cc = ch.charCodeAt(0);
      return cc >= 48 && cc <= 57;
    };
    return takeChar(scnr, closure);
  }
  function takeHexDigit(scnr) {
    const closure = (ch) => {
      const cc = ch.charCodeAt(0);
      return cc >= 48 && cc <= 57 || cc >= 65 && cc <= 70 || cc >= 97 && cc <= 102;
    };
    return takeChar(scnr, closure);
  }
  function getDigits(scnr) {
    let ch = "";
    let num = "";
    while (ch = takeDigit(scnr)) {
      num += ch;
    }
    return num;
  }
  function readModulo(scnr) {
    skipSpaces(scnr);
    const ch = scnr.currentChar();
    if (ch !== "%") {
      emitError(CompileErrorCodes.EXPECTED_TOKEN, currentPosition(), 0, ch);
    }
    scnr.next();
    return "%";
  }
  function readText(scnr) {
    let buf = "";
    while (true) {
      const ch = scnr.currentChar();
      if (ch === "{" || ch === "}" || ch === "@" || ch === "|" || !ch) {
        break;
      } else if (ch === "%") {
        if (isTextStart(scnr)) {
          buf += ch;
          scnr.next();
        } else {
          break;
        }
      } else if (ch === CHAR_SP || ch === CHAR_LF) {
        if (isTextStart(scnr)) {
          buf += ch;
          scnr.next();
        } else if (isPluralStart(scnr)) {
          break;
        } else {
          buf += ch;
          scnr.next();
        }
      } else {
        buf += ch;
        scnr.next();
      }
    }
    return buf;
  }
  function readNamedIdentifier(scnr) {
    skipSpaces(scnr);
    let ch = "";
    let name2 = "";
    while (ch = takeIdentifierChar(scnr)) {
      name2 += ch;
    }
    if (scnr.currentChar() === EOF) {
      emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
    }
    return name2;
  }
  function readListIdentifier(scnr) {
    skipSpaces(scnr);
    let value = "";
    if (scnr.currentChar() === "-") {
      scnr.next();
      value += `-${getDigits(scnr)}`;
    } else {
      value += getDigits(scnr);
    }
    if (scnr.currentChar() === EOF) {
      emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
    }
    return value;
  }
  function readLiteral(scnr) {
    skipSpaces(scnr);
    eat(scnr, `'`);
    let ch = "";
    let literal = "";
    const fn = (x2) => x2 !== LITERAL_DELIMITER && x2 !== CHAR_LF;
    while (ch = takeChar(scnr, fn)) {
      if (ch === "\\") {
        literal += readEscapeSequence(scnr);
      } else {
        literal += ch;
      }
    }
    const current = scnr.currentChar();
    if (current === CHAR_LF || current === EOF) {
      emitError(CompileErrorCodes.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER, currentPosition(), 0);
      if (current === CHAR_LF) {
        scnr.next();
        eat(scnr, `'`);
      }
      return literal;
    }
    eat(scnr, `'`);
    return literal;
  }
  function readEscapeSequence(scnr) {
    const ch = scnr.currentChar();
    switch (ch) {
      case "\\":
      case `'`:
        scnr.next();
        return `\\${ch}`;
      case "u":
        return readUnicodeEscapeSequence(scnr, ch, 4);
      case "U":
        return readUnicodeEscapeSequence(scnr, ch, 6);
      default:
        emitError(CompileErrorCodes.UNKNOWN_ESCAPE_SEQUENCE, currentPosition(), 0, ch);
        return "";
    }
  }
  function readUnicodeEscapeSequence(scnr, unicode, digits) {
    eat(scnr, unicode);
    let sequence = "";
    for (let i2 = 0; i2 < digits; i2++) {
      const ch = takeHexDigit(scnr);
      if (!ch) {
        emitError(CompileErrorCodes.INVALID_UNICODE_ESCAPE_SEQUENCE, currentPosition(), 0, `\\${unicode}${sequence}${scnr.currentChar()}`);
        break;
      }
      sequence += ch;
    }
    return `\\${unicode}${sequence}`;
  }
  function readInvalidIdentifier(scnr) {
    skipSpaces(scnr);
    let ch = "";
    let identifiers = "";
    const closure = (ch2) => ch2 !== "{" && ch2 !== "}" && ch2 !== CHAR_SP && ch2 !== CHAR_LF;
    while (ch = takeChar(scnr, closure)) {
      identifiers += ch;
    }
    return identifiers;
  }
  function readLinkedModifier(scnr) {
    let ch = "";
    let name2 = "";
    while (ch = takeIdentifierChar(scnr)) {
      name2 += ch;
    }
    return name2;
  }
  function readLinkedRefer(scnr) {
    const fn = (detect = false, buf) => {
      const ch = scnr.currentChar();
      if (ch === "{" || ch === "%" || ch === "@" || ch === "|" || !ch) {
        return buf;
      } else if (ch === CHAR_SP) {
        return buf;
      } else if (ch === CHAR_LF) {
        buf += ch;
        scnr.next();
        return fn(detect, buf);
      } else {
        buf += ch;
        scnr.next();
        return fn(true, buf);
      }
    };
    return fn(false, "");
  }
  function readPlural(scnr) {
    skipSpaces(scnr);
    const plural = eat(
      scnr,
      "|"
      /* Pipe */
    );
    skipSpaces(scnr);
    return plural;
  }
  function readTokenInPlaceholder(scnr, context2) {
    let token = null;
    const ch = scnr.currentChar();
    switch (ch) {
      case "{":
        if (context2.braceNest >= 1) {
          emitError(CompileErrorCodes.NOT_ALLOW_NEST_PLACEHOLDER, currentPosition(), 0);
        }
        scnr.next();
        token = getToken(
          context2,
          2,
          "{"
          /* BraceLeft */
        );
        skipSpaces(scnr);
        context2.braceNest++;
        return token;
      case "}":
        if (context2.braceNest > 0 && context2.currentType === 2) {
          emitError(CompileErrorCodes.EMPTY_PLACEHOLDER, currentPosition(), 0);
        }
        scnr.next();
        token = getToken(
          context2,
          3,
          "}"
          /* BraceRight */
        );
        context2.braceNest--;
        context2.braceNest > 0 && skipSpaces(scnr);
        if (context2.inLinked && context2.braceNest === 0) {
          context2.inLinked = false;
        }
        return token;
      case "@":
        if (context2.braceNest > 0) {
          emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
        }
        token = readTokenInLinked(scnr, context2) || getEndToken(context2);
        context2.braceNest = 0;
        return token;
      default:
        let validNamedIdentifier = true;
        let validListIdentifier = true;
        let validLiteral = true;
        if (isPluralStart(scnr)) {
          if (context2.braceNest > 0) {
            emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
          }
          token = getToken(context2, 1, readPlural(scnr));
          context2.braceNest = 0;
          context2.inLinked = false;
          return token;
        }
        if (context2.braceNest > 0 && (context2.currentType === 5 || context2.currentType === 6 || context2.currentType === 7)) {
          emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
          context2.braceNest = 0;
          return readToken(scnr, context2);
        }
        if (validNamedIdentifier = isNamedIdentifierStart(scnr, context2)) {
          token = getToken(context2, 5, readNamedIdentifier(scnr));
          skipSpaces(scnr);
          return token;
        }
        if (validListIdentifier = isListIdentifierStart(scnr, context2)) {
          token = getToken(context2, 6, readListIdentifier(scnr));
          skipSpaces(scnr);
          return token;
        }
        if (validLiteral = isLiteralStart(scnr, context2)) {
          token = getToken(context2, 7, readLiteral(scnr));
          skipSpaces(scnr);
          return token;
        }
        if (!validNamedIdentifier && !validListIdentifier && !validLiteral) {
          token = getToken(context2, 13, readInvalidIdentifier(scnr));
          emitError(CompileErrorCodes.INVALID_TOKEN_IN_PLACEHOLDER, currentPosition(), 0, token.value);
          skipSpaces(scnr);
          return token;
        }
        break;
    }
    return token;
  }
  function readTokenInLinked(scnr, context2) {
    const { currentType } = context2;
    let token = null;
    const ch = scnr.currentChar();
    if ((currentType === 8 || currentType === 9 || currentType === 12 || currentType === 10) && (ch === CHAR_LF || ch === CHAR_SP)) {
      emitError(CompileErrorCodes.INVALID_LINKED_FORMAT, currentPosition(), 0);
    }
    switch (ch) {
      case "@":
        scnr.next();
        token = getToken(
          context2,
          8,
          "@"
          /* LinkedAlias */
        );
        context2.inLinked = true;
        return token;
      case ".":
        skipSpaces(scnr);
        scnr.next();
        return getToken(
          context2,
          9,
          "."
          /* LinkedDot */
        );
      case ":":
        skipSpaces(scnr);
        scnr.next();
        return getToken(
          context2,
          10,
          ":"
          /* LinkedDelimiter */
        );
      default:
        if (isPluralStart(scnr)) {
          token = getToken(context2, 1, readPlural(scnr));
          context2.braceNest = 0;
          context2.inLinked = false;
          return token;
        }
        if (isLinkedDotStart(scnr, context2) || isLinkedDelimiterStart(scnr, context2)) {
          skipSpaces(scnr);
          return readTokenInLinked(scnr, context2);
        }
        if (isLinkedModifierStart(scnr, context2)) {
          skipSpaces(scnr);
          return getToken(context2, 12, readLinkedModifier(scnr));
        }
        if (isLinkedReferStart(scnr, context2)) {
          skipSpaces(scnr);
          if (ch === "{") {
            return readTokenInPlaceholder(scnr, context2) || token;
          } else {
            return getToken(context2, 11, readLinkedRefer(scnr));
          }
        }
        if (currentType === 8) {
          emitError(CompileErrorCodes.INVALID_LINKED_FORMAT, currentPosition(), 0);
        }
        context2.braceNest = 0;
        context2.inLinked = false;
        return readToken(scnr, context2);
    }
  }
  function readToken(scnr, context2) {
    let token = {
      type: 14
      /* EOF */
    };
    if (context2.braceNest > 0) {
      return readTokenInPlaceholder(scnr, context2) || getEndToken(context2);
    }
    if (context2.inLinked) {
      return readTokenInLinked(scnr, context2) || getEndToken(context2);
    }
    const ch = scnr.currentChar();
    switch (ch) {
      case "{":
        return readTokenInPlaceholder(scnr, context2) || getEndToken(context2);
      case "}":
        emitError(CompileErrorCodes.UNBALANCED_CLOSING_BRACE, currentPosition(), 0);
        scnr.next();
        return getToken(
          context2,
          3,
          "}"
          /* BraceRight */
        );
      case "@":
        return readTokenInLinked(scnr, context2) || getEndToken(context2);
      default:
        if (isPluralStart(scnr)) {
          token = getToken(context2, 1, readPlural(scnr));
          context2.braceNest = 0;
          context2.inLinked = false;
          return token;
        }
        const { isModulo, hasSpace } = detectModuloStart(scnr);
        if (isModulo) {
          return hasSpace ? getToken(context2, 0, readText(scnr)) : getToken(context2, 4, readModulo(scnr));
        }
        if (isTextStart(scnr)) {
          return getToken(context2, 0, readText(scnr));
        }
        break;
    }
    return token;
  }
  function nextToken() {
    const { currentType, offset, startLoc, endLoc } = _context;
    _context.lastType = currentType;
    _context.lastOffset = offset;
    _context.lastStartLoc = startLoc;
    _context.lastEndLoc = endLoc;
    _context.offset = currentOffset();
    _context.startLoc = currentPosition();
    if (_scnr.currentChar() === EOF) {
      return getToken(
        _context,
        14
        /* EOF */
      );
    }
    return readToken(_scnr, _context);
  }
  return {
    nextToken,
    currentOffset,
    currentPosition,
    context
  };
}
const ERROR_DOMAIN = "parser";
const KNOWN_ESCAPES = /(?:\\\\|\\'|\\u([0-9a-fA-F]{4})|\\U([0-9a-fA-F]{6}))/g;
function fromEscapeSequence(match2, codePoint4, codePoint6) {
  switch (match2) {
    case `\\\\`:
      return `\\`;
    case `\\'`:
      return `'`;
    default: {
      const codePoint = parseInt(codePoint4 || codePoint6, 16);
      if (codePoint <= 55295 || codePoint >= 57344) {
        return String.fromCodePoint(codePoint);
      }
      return "�";
    }
  }
}
function createParser(options = {}) {
  const location2 = options.location !== false;
  const { onError } = options;
  function emitError(tokenzer, code2, start, offset, ...args) {
    const end = tokenzer.currentPosition();
    end.offset += offset;
    end.column += offset;
    if (onError) {
      const loc = createLocation(start, end);
      const err = createCompileError(code2, loc, {
        domain: ERROR_DOMAIN,
        args
      });
      onError(err);
    }
  }
  function startNode(type, offset, loc) {
    const node = {
      type,
      start: offset,
      end: offset
    };
    if (location2) {
      node.loc = { start: loc, end: loc };
    }
    return node;
  }
  function endNode(node, offset, pos, type) {
    node.end = offset;
    if (type) {
      node.type = type;
    }
    if (location2 && node.loc) {
      node.loc.end = pos;
    }
  }
  function parseText(tokenizer, value) {
    const context = tokenizer.context();
    const node = startNode(3, context.offset, context.startLoc);
    node.value = value;
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  function parseList(tokenizer, index) {
    const context = tokenizer.context();
    const { lastOffset: offset, lastStartLoc: loc } = context;
    const node = startNode(5, offset, loc);
    node.index = parseInt(index, 10);
    tokenizer.nextToken();
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  function parseNamed(tokenizer, key) {
    const context = tokenizer.context();
    const { lastOffset: offset, lastStartLoc: loc } = context;
    const node = startNode(4, offset, loc);
    node.key = key;
    tokenizer.nextToken();
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  function parseLiteral(tokenizer, value) {
    const context = tokenizer.context();
    const { lastOffset: offset, lastStartLoc: loc } = context;
    const node = startNode(9, offset, loc);
    node.value = value.replace(KNOWN_ESCAPES, fromEscapeSequence);
    tokenizer.nextToken();
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  function parseLinkedModifier(tokenizer) {
    const token = tokenizer.nextToken();
    const context = tokenizer.context();
    const { lastOffset: offset, lastStartLoc: loc } = context;
    const node = startNode(8, offset, loc);
    if (token.type !== 12) {
      emitError(tokenizer, CompileErrorCodes.UNEXPECTED_EMPTY_LINKED_MODIFIER, context.lastStartLoc, 0);
      node.value = "";
      endNode(node, offset, loc);
      return {
        nextConsumeToken: token,
        node
      };
    }
    if (token.value == null) {
      emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
    }
    node.value = token.value || "";
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return {
      node
    };
  }
  function parseLinkedKey(tokenizer, value) {
    const context = tokenizer.context();
    const node = startNode(7, context.offset, context.startLoc);
    node.value = value;
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  function parseLinked(tokenizer) {
    const context = tokenizer.context();
    const linkedNode = startNode(6, context.offset, context.startLoc);
    let token = tokenizer.nextToken();
    if (token.type === 9) {
      const parsed = parseLinkedModifier(tokenizer);
      linkedNode.modifier = parsed.node;
      token = parsed.nextConsumeToken || tokenizer.nextToken();
    }
    if (token.type !== 10) {
      emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
    }
    token = tokenizer.nextToken();
    if (token.type === 2) {
      token = tokenizer.nextToken();
    }
    switch (token.type) {
      case 11:
        if (token.value == null) {
          emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
        }
        linkedNode.key = parseLinkedKey(tokenizer, token.value || "");
        break;
      case 5:
        if (token.value == null) {
          emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
        }
        linkedNode.key = parseNamed(tokenizer, token.value || "");
        break;
      case 6:
        if (token.value == null) {
          emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
        }
        linkedNode.key = parseList(tokenizer, token.value || "");
        break;
      case 7:
        if (token.value == null) {
          emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
        }
        linkedNode.key = parseLiteral(tokenizer, token.value || "");
        break;
      default:
        emitError(tokenizer, CompileErrorCodes.UNEXPECTED_EMPTY_LINKED_KEY, context.lastStartLoc, 0);
        const nextContext = tokenizer.context();
        const emptyLinkedKeyNode = startNode(7, nextContext.offset, nextContext.startLoc);
        emptyLinkedKeyNode.value = "";
        endNode(emptyLinkedKeyNode, nextContext.offset, nextContext.startLoc);
        linkedNode.key = emptyLinkedKeyNode;
        endNode(linkedNode, nextContext.offset, nextContext.startLoc);
        return {
          nextConsumeToken: token,
          node: linkedNode
        };
    }
    endNode(linkedNode, tokenizer.currentOffset(), tokenizer.currentPosition());
    return {
      node: linkedNode
    };
  }
  function parseMessage(tokenizer) {
    const context = tokenizer.context();
    const startOffset = context.currentType === 1 ? tokenizer.currentOffset() : context.offset;
    const startLoc = context.currentType === 1 ? context.endLoc : context.startLoc;
    const node = startNode(2, startOffset, startLoc);
    node.items = [];
    let nextToken = null;
    do {
      const token = nextToken || tokenizer.nextToken();
      nextToken = null;
      switch (token.type) {
        case 0:
          if (token.value == null) {
            emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
          }
          node.items.push(parseText(tokenizer, token.value || ""));
          break;
        case 6:
          if (token.value == null) {
            emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
          }
          node.items.push(parseList(tokenizer, token.value || ""));
          break;
        case 5:
          if (token.value == null) {
            emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
          }
          node.items.push(parseNamed(tokenizer, token.value || ""));
          break;
        case 7:
          if (token.value == null) {
            emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
          }
          node.items.push(parseLiteral(tokenizer, token.value || ""));
          break;
        case 8:
          const parsed = parseLinked(tokenizer);
          node.items.push(parsed.node);
          nextToken = parsed.nextConsumeToken || null;
          break;
      }
    } while (context.currentType !== 14 && context.currentType !== 1);
    const endOffset = context.currentType === 1 ? context.lastOffset : tokenizer.currentOffset();
    const endLoc = context.currentType === 1 ? context.lastEndLoc : tokenizer.currentPosition();
    endNode(node, endOffset, endLoc);
    return node;
  }
  function parsePlural(tokenizer, offset, loc, msgNode) {
    const context = tokenizer.context();
    let hasEmptyMessage = msgNode.items.length === 0;
    const node = startNode(1, offset, loc);
    node.cases = [];
    node.cases.push(msgNode);
    do {
      const msg = parseMessage(tokenizer);
      if (!hasEmptyMessage) {
        hasEmptyMessage = msg.items.length === 0;
      }
      node.cases.push(msg);
    } while (context.currentType !== 14);
    if (hasEmptyMessage) {
      emitError(tokenizer, CompileErrorCodes.MUST_HAVE_MESSAGES_IN_PLURAL, loc, 0);
    }
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  function parseResource(tokenizer) {
    const context = tokenizer.context();
    const { offset, startLoc } = context;
    const msgNode = parseMessage(tokenizer);
    if (context.currentType === 14) {
      return msgNode;
    } else {
      return parsePlural(tokenizer, offset, startLoc, msgNode);
    }
  }
  function parse2(source) {
    const tokenizer = createTokenizer(source, assign({}, options));
    const context = tokenizer.context();
    const node = startNode(0, context.offset, context.startLoc);
    if (location2 && node.loc) {
      node.loc.source = source;
    }
    node.body = parseResource(tokenizer);
    if (context.currentType !== 14) {
      emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, source[context.offset] || "");
    }
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  return { parse: parse2 };
}
function getTokenCaption(token) {
  if (token.type === 14) {
    return "EOF";
  }
  const name2 = (token.value || "").replace(/\r?\n/gu, "\\n");
  return name2.length > 10 ? name2.slice(0, 9) + "…" : name2;
}
function createTransformer(ast, options = {}) {
  const _context = {
    ast,
    helpers: /* @__PURE__ */ new Set()
  };
  const context = () => _context;
  const helper = (name2) => {
    _context.helpers.add(name2);
    return name2;
  };
  return { context, helper };
}
function traverseNodes(nodes, transformer) {
  for (let i2 = 0; i2 < nodes.length; i2++) {
    traverseNode(nodes[i2], transformer);
  }
}
function traverseNode(node, transformer) {
  switch (node.type) {
    case 1:
      traverseNodes(node.cases, transformer);
      transformer.helper(
        "plural"
        /* PLURAL */
      );
      break;
    case 2:
      traverseNodes(node.items, transformer);
      break;
    case 6:
      const linked = node;
      traverseNode(linked.key, transformer);
      transformer.helper(
        "linked"
        /* LINKED */
      );
      transformer.helper(
        "type"
        /* TYPE */
      );
      break;
    case 5:
      transformer.helper(
        "interpolate"
        /* INTERPOLATE */
      );
      transformer.helper(
        "list"
        /* LIST */
      );
      break;
    case 4:
      transformer.helper(
        "interpolate"
        /* INTERPOLATE */
      );
      transformer.helper(
        "named"
        /* NAMED */
      );
      break;
  }
}
function transform(ast, options = {}) {
  const transformer = createTransformer(ast);
  transformer.helper(
    "normalize"
    /* NORMALIZE */
  );
  ast.body && traverseNode(ast.body, transformer);
  const context = transformer.context();
  ast.helpers = Array.from(context.helpers);
}
function createCodeGenerator(ast, options) {
  const { sourceMap, filename: filename2, breakLineCode, needIndent: _needIndent } = options;
  const _context = {
    source: ast.loc.source,
    filename: filename2,
    code: "",
    column: 1,
    line: 1,
    offset: 0,
    map: void 0,
    breakLineCode,
    needIndent: _needIndent,
    indentLevel: 0
  };
  const context = () => _context;
  function push2(code2, node) {
    _context.code += code2;
  }
  function _newline(n2, withBreakLine = true) {
    const _breakLineCode = withBreakLine ? breakLineCode : "";
    push2(_needIndent ? _breakLineCode + `  `.repeat(n2) : _breakLineCode);
  }
  function indent(withNewLine = true) {
    const level = ++_context.indentLevel;
    withNewLine && _newline(level);
  }
  function deindent(withNewLine = true) {
    const level = --_context.indentLevel;
    withNewLine && _newline(level);
  }
  function newline() {
    _newline(_context.indentLevel);
  }
  const helper = (key) => `_${key}`;
  const needIndent = () => _context.needIndent;
  return {
    context,
    push: push2,
    indent,
    deindent,
    newline,
    helper,
    needIndent
  };
}
function generateLinkedNode(generator, node) {
  const { helper } = generator;
  generator.push(`${helper(
    "linked"
    /* LINKED */
  )}(`);
  generateNode(generator, node.key);
  if (node.modifier) {
    generator.push(`, `);
    generateNode(generator, node.modifier);
    generator.push(`, _type`);
  } else {
    generator.push(`, undefined, _type`);
  }
  generator.push(`)`);
}
function generateMessageNode(generator, node) {
  const { helper, needIndent } = generator;
  generator.push(`${helper(
    "normalize"
    /* NORMALIZE */
  )}([`);
  generator.indent(needIndent());
  const length = node.items.length;
  for (let i2 = 0; i2 < length; i2++) {
    generateNode(generator, node.items[i2]);
    if (i2 === length - 1) {
      break;
    }
    generator.push(", ");
  }
  generator.deindent(needIndent());
  generator.push("])");
}
function generatePluralNode(generator, node) {
  const { helper, needIndent } = generator;
  if (node.cases.length > 1) {
    generator.push(`${helper(
      "plural"
      /* PLURAL */
    )}([`);
    generator.indent(needIndent());
    const length = node.cases.length;
    for (let i2 = 0; i2 < length; i2++) {
      generateNode(generator, node.cases[i2]);
      if (i2 === length - 1) {
        break;
      }
      generator.push(", ");
    }
    generator.deindent(needIndent());
    generator.push(`])`);
  }
}
function generateResource(generator, node) {
  if (node.body) {
    generateNode(generator, node.body);
  } else {
    generator.push("null");
  }
}
function generateNode(generator, node) {
  const { helper } = generator;
  switch (node.type) {
    case 0:
      generateResource(generator, node);
      break;
    case 1:
      generatePluralNode(generator, node);
      break;
    case 2:
      generateMessageNode(generator, node);
      break;
    case 6:
      generateLinkedNode(generator, node);
      break;
    case 8:
      generator.push(JSON.stringify(node.value), node);
      break;
    case 7:
      generator.push(JSON.stringify(node.value), node);
      break;
    case 5:
      generator.push(`${helper(
        "interpolate"
        /* INTERPOLATE */
      )}(${helper(
        "list"
        /* LIST */
      )}(${node.index}))`, node);
      break;
    case 4:
      generator.push(`${helper(
        "interpolate"
        /* INTERPOLATE */
      )}(${helper(
        "named"
        /* NAMED */
      )}(${JSON.stringify(node.key)}))`, node);
      break;
    case 9:
      generator.push(JSON.stringify(node.value), node);
      break;
    case 3:
      generator.push(JSON.stringify(node.value), node);
      break;
  }
}
const generate = (ast, options = {}) => {
  const mode = isString(options.mode) ? options.mode : "normal";
  const filename2 = isString(options.filename) ? options.filename : "message.intl";
  const sourceMap = !!options.sourceMap;
  const breakLineCode = options.breakLineCode != null ? options.breakLineCode : mode === "arrow" ? ";" : "\n";
  const needIndent = options.needIndent ? options.needIndent : mode !== "arrow";
  const helpers = ast.helpers || [];
  const generator = createCodeGenerator(ast, {
    mode,
    filename: filename2,
    sourceMap,
    breakLineCode,
    needIndent
  });
  generator.push(mode === "normal" ? `function __msg__ (ctx) {` : `(ctx) => {`);
  generator.indent(needIndent);
  if (helpers.length > 0) {
    generator.push(`const { ${helpers.map((s) => `${s}: _${s}`).join(", ")} } = ctx`);
    generator.newline();
  }
  generator.push(`return `);
  generateNode(generator, ast);
  generator.deindent(needIndent);
  generator.push(`}`);
  const { code: code2, map } = generator.context();
  return {
    ast,
    code: code2,
    map: map ? map.toJSON() : void 0
    // eslint-disable-line @typescript-eslint/no-explicit-any
  };
};
function baseCompile(source, options = {}) {
  const assignedOptions = assign({}, options);
  const parser = createParser(assignedOptions);
  const ast = parser.parse(source);
  transform(ast, assignedOptions);
  return generate(ast, assignedOptions);
}
/*!
  * devtools-if v9.2.2
  * (c) 2022 kazuya kawaguchi
  * Released under the MIT License.
  */
const IntlifyDevToolsHooks = {
  I18nInit: "i18n:init",
  FunctionTranslate: "function:translate"
};
/*!
  * core-base v9.2.2
  * (c) 2022 kazuya kawaguchi
  * Released under the MIT License.
  */
const pathStateMachine = [];
pathStateMachine[
  0
  /* BEFORE_PATH */
] = {
  [
    "w"
    /* WORKSPACE */
  ]: [
    0
    /* BEFORE_PATH */
  ],
  [
    "i"
    /* IDENT */
  ]: [
    3,
    0
    /* APPEND */
  ],
  [
    "["
    /* LEFT_BRACKET */
  ]: [
    4
    /* IN_SUB_PATH */
  ],
  [
    "o"
    /* END_OF_FAIL */
  ]: [
    7
    /* AFTER_PATH */
  ]
};
pathStateMachine[
  1
  /* IN_PATH */
] = {
  [
    "w"
    /* WORKSPACE */
  ]: [
    1
    /* IN_PATH */
  ],
  [
    "."
    /* DOT */
  ]: [
    2
    /* BEFORE_IDENT */
  ],
  [
    "["
    /* LEFT_BRACKET */
  ]: [
    4
    /* IN_SUB_PATH */
  ],
  [
    "o"
    /* END_OF_FAIL */
  ]: [
    7
    /* AFTER_PATH */
  ]
};
pathStateMachine[
  2
  /* BEFORE_IDENT */
] = {
  [
    "w"
    /* WORKSPACE */
  ]: [
    2
    /* BEFORE_IDENT */
  ],
  [
    "i"
    /* IDENT */
  ]: [
    3,
    0
    /* APPEND */
  ],
  [
    "0"
    /* ZERO */
  ]: [
    3,
    0
    /* APPEND */
  ]
};
pathStateMachine[
  3
  /* IN_IDENT */
] = {
  [
    "i"
    /* IDENT */
  ]: [
    3,
    0
    /* APPEND */
  ],
  [
    "0"
    /* ZERO */
  ]: [
    3,
    0
    /* APPEND */
  ],
  [
    "w"
    /* WORKSPACE */
  ]: [
    1,
    1
    /* PUSH */
  ],
  [
    "."
    /* DOT */
  ]: [
    2,
    1
    /* PUSH */
  ],
  [
    "["
    /* LEFT_BRACKET */
  ]: [
    4,
    1
    /* PUSH */
  ],
  [
    "o"
    /* END_OF_FAIL */
  ]: [
    7,
    1
    /* PUSH */
  ]
};
pathStateMachine[
  4
  /* IN_SUB_PATH */
] = {
  [
    "'"
    /* SINGLE_QUOTE */
  ]: [
    5,
    0
    /* APPEND */
  ],
  [
    '"'
    /* DOUBLE_QUOTE */
  ]: [
    6,
    0
    /* APPEND */
  ],
  [
    "["
    /* LEFT_BRACKET */
  ]: [
    4,
    2
    /* INC_SUB_PATH_DEPTH */
  ],
  [
    "]"
    /* RIGHT_BRACKET */
  ]: [
    1,
    3
    /* PUSH_SUB_PATH */
  ],
  [
    "o"
    /* END_OF_FAIL */
  ]: 8,
  [
    "l"
    /* ELSE */
  ]: [
    4,
    0
    /* APPEND */
  ]
};
pathStateMachine[
  5
  /* IN_SINGLE_QUOTE */
] = {
  [
    "'"
    /* SINGLE_QUOTE */
  ]: [
    4,
    0
    /* APPEND */
  ],
  [
    "o"
    /* END_OF_FAIL */
  ]: 8,
  [
    "l"
    /* ELSE */
  ]: [
    5,
    0
    /* APPEND */
  ]
};
pathStateMachine[
  6
  /* IN_DOUBLE_QUOTE */
] = {
  [
    '"'
    /* DOUBLE_QUOTE */
  ]: [
    4,
    0
    /* APPEND */
  ],
  [
    "o"
    /* END_OF_FAIL */
  ]: 8,
  [
    "l"
    /* ELSE */
  ]: [
    6,
    0
    /* APPEND */
  ]
};
const literalValueRE = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
function isLiteral(exp) {
  return literalValueRE.test(exp);
}
function stripQuotes(str) {
  const a = str.charCodeAt(0);
  const b = str.charCodeAt(str.length - 1);
  return a === b && (a === 34 || a === 39) ? str.slice(1, -1) : str;
}
function getPathCharType(ch) {
  if (ch === void 0 || ch === null) {
    return "o";
  }
  const code2 = ch.charCodeAt(0);
  switch (code2) {
    case 91:
    case 93:
    case 46:
    case 34:
    case 39:
      return ch;
    case 95:
    case 36:
    case 45:
      return "i";
    case 9:
    case 10:
    case 13:
    case 160:
    case 65279:
    case 8232:
    case 8233:
      return "w";
  }
  return "i";
}
function formatSubPath(path) {
  const trimmed = path.trim();
  if (path.charAt(0) === "0" && isNaN(parseInt(path))) {
    return false;
  }
  return isLiteral(trimmed) ? stripQuotes(trimmed) : "*" + trimmed;
}
function parse(path) {
  const keys3 = [];
  let index = -1;
  let mode = 0;
  let subPathDepth = 0;
  let c;
  let key;
  let newChar;
  let type;
  let transition;
  let action;
  let typeMap;
  const actions = [];
  actions[
    0
    /* APPEND */
  ] = () => {
    if (key === void 0) {
      key = newChar;
    } else {
      key += newChar;
    }
  };
  actions[
    1
    /* PUSH */
  ] = () => {
    if (key !== void 0) {
      keys3.push(key);
      key = void 0;
    }
  };
  actions[
    2
    /* INC_SUB_PATH_DEPTH */
  ] = () => {
    actions[
      0
      /* APPEND */
    ]();
    subPathDepth++;
  };
  actions[
    3
    /* PUSH_SUB_PATH */
  ] = () => {
    if (subPathDepth > 0) {
      subPathDepth--;
      mode = 4;
      actions[
        0
        /* APPEND */
      ]();
    } else {
      subPathDepth = 0;
      if (key === void 0) {
        return false;
      }
      key = formatSubPath(key);
      if (key === false) {
        return false;
      } else {
        actions[
          1
          /* PUSH */
        ]();
      }
    }
  };
  function maybeUnescapeQuote() {
    const nextChar = path[index + 1];
    if (mode === 5 && nextChar === "'" || mode === 6 && nextChar === '"') {
      index++;
      newChar = "\\" + nextChar;
      actions[
        0
        /* APPEND */
      ]();
      return true;
    }
  }
  while (mode !== null) {
    index++;
    c = path[index];
    if (c === "\\" && maybeUnescapeQuote()) {
      continue;
    }
    type = getPathCharType(c);
    typeMap = pathStateMachine[mode];
    transition = typeMap[type] || typeMap[
      "l"
      /* ELSE */
    ] || 8;
    if (transition === 8) {
      return;
    }
    mode = transition[0];
    if (transition[1] !== void 0) {
      action = actions[transition[1]];
      if (action) {
        newChar = c;
        if (action() === false) {
          return;
        }
      }
    }
    if (mode === 7) {
      return keys3;
    }
  }
}
const cache = /* @__PURE__ */ new Map();
function resolveWithKeyValue(obj, path) {
  return isObject$8(obj) ? obj[path] : null;
}
function resolveValue(obj, path) {
  if (!isObject$8(obj)) {
    return null;
  }
  let hit = cache.get(path);
  if (!hit) {
    hit = parse(path);
    if (hit) {
      cache.set(path, hit);
    }
  }
  if (!hit) {
    return null;
  }
  const len = hit.length;
  let last = obj;
  let i2 = 0;
  while (i2 < len) {
    const val = last[hit[i2]];
    if (val === void 0) {
      return null;
    }
    last = val;
    i2++;
  }
  return last;
}
const DEFAULT_MODIFIER = (str) => str;
const DEFAULT_MESSAGE = (ctx) => "";
const DEFAULT_MESSAGE_DATA_TYPE = "text";
const DEFAULT_NORMALIZE = (values) => values.length === 0 ? "" : values.join("");
const DEFAULT_INTERPOLATE = toDisplayString;
function pluralDefault(choice, choicesLength) {
  choice = Math.abs(choice);
  if (choicesLength === 2) {
    return choice ? choice > 1 ? 1 : 0 : 1;
  }
  return choice ? Math.min(choice, 2) : 0;
}
function getPluralIndex(options) {
  const index = isNumber(options.pluralIndex) ? options.pluralIndex : -1;
  return options.named && (isNumber(options.named.count) || isNumber(options.named.n)) ? isNumber(options.named.count) ? options.named.count : isNumber(options.named.n) ? options.named.n : index : index;
}
function normalizeNamed(pluralIndex, props) {
  if (!props.count) {
    props.count = pluralIndex;
  }
  if (!props.n) {
    props.n = pluralIndex;
  }
}
function createMessageContext(options = {}) {
  const locale = options.locale;
  const pluralIndex = getPluralIndex(options);
  const pluralRule = isObject$8(options.pluralRules) && isString(locale) && isFunction(options.pluralRules[locale]) ? options.pluralRules[locale] : pluralDefault;
  const orgPluralRule = isObject$8(options.pluralRules) && isString(locale) && isFunction(options.pluralRules[locale]) ? pluralDefault : void 0;
  const plural = (messages) => {
    return messages[pluralRule(pluralIndex, messages.length, orgPluralRule)];
  };
  const _list = options.list || [];
  const list = (index) => _list[index];
  const _named = options.named || {};
  isNumber(options.pluralIndex) && normalizeNamed(pluralIndex, _named);
  const named = (key) => _named[key];
  function message2(key) {
    const msg = isFunction(options.messages) ? options.messages(key) : isObject$8(options.messages) ? options.messages[key] : false;
    return !msg ? options.parent ? options.parent.message(key) : DEFAULT_MESSAGE : msg;
  }
  const _modifier = (name2) => options.modifiers ? options.modifiers[name2] : DEFAULT_MODIFIER;
  const normalize2 = isPlainObject(options.processor) && isFunction(options.processor.normalize) ? options.processor.normalize : DEFAULT_NORMALIZE;
  const interpolate = isPlainObject(options.processor) && isFunction(options.processor.interpolate) ? options.processor.interpolate : DEFAULT_INTERPOLATE;
  const type = isPlainObject(options.processor) && isString(options.processor.type) ? options.processor.type : DEFAULT_MESSAGE_DATA_TYPE;
  const linked = (key, ...args) => {
    const [arg1, arg2] = args;
    let type2 = "text";
    let modifier = "";
    if (args.length === 1) {
      if (isObject$8(arg1)) {
        modifier = arg1.modifier || modifier;
        type2 = arg1.type || type2;
      } else if (isString(arg1)) {
        modifier = arg1 || modifier;
      }
    } else if (args.length === 2) {
      if (isString(arg1)) {
        modifier = arg1 || modifier;
      }
      if (isString(arg2)) {
        type2 = arg2 || type2;
      }
    }
    let msg = message2(key)(ctx);
    if (type2 === "vnode" && isArray(msg) && modifier) {
      msg = msg[0];
    }
    return modifier ? _modifier(modifier)(msg, type2) : msg;
  };
  const ctx = {
    [
      "list"
      /* LIST */
    ]: list,
    [
      "named"
      /* NAMED */
    ]: named,
    [
      "plural"
      /* PLURAL */
    ]: plural,
    [
      "linked"
      /* LINKED */
    ]: linked,
    [
      "message"
      /* MESSAGE */
    ]: message2,
    [
      "type"
      /* TYPE */
    ]: type,
    [
      "interpolate"
      /* INTERPOLATE */
    ]: interpolate,
    [
      "normalize"
      /* NORMALIZE */
    ]: normalize2
  };
  return ctx;
}
let devtools = null;
function setDevToolsHook(hook) {
  devtools = hook;
}
function initI18nDevTools(i18n2, version2, meta) {
  devtools && devtools.emit(IntlifyDevToolsHooks.I18nInit, {
    timestamp: Date.now(),
    i18n: i18n2,
    version: version2,
    meta
  });
}
const translateDevTools = /* @__PURE__ */ createDevToolsHook(IntlifyDevToolsHooks.FunctionTranslate);
function createDevToolsHook(hook) {
  return (payloads) => devtools && devtools.emit(hook, payloads);
}
const CoreWarnCodes = {
  NOT_FOUND_KEY: 1,
  FALLBACK_TO_TRANSLATE: 2,
  CANNOT_FORMAT_NUMBER: 3,
  FALLBACK_TO_NUMBER_FORMAT: 4,
  CANNOT_FORMAT_DATE: 5,
  FALLBACK_TO_DATE_FORMAT: 6,
  __EXTEND_POINT__: 7
};
function fallbackWithSimple(ctx, fallback, start) {
  return [.../* @__PURE__ */ new Set([
    start,
    ...isArray(fallback) ? fallback : isObject$8(fallback) ? Object.keys(fallback) : isString(fallback) ? [fallback] : [start]
  ])];
}
function fallbackWithLocaleChain(ctx, fallback, start) {
  const startLocale = isString(start) ? start : DEFAULT_LOCALE;
  const context = ctx;
  if (!context.__localeChainCache) {
    context.__localeChainCache = /* @__PURE__ */ new Map();
  }
  let chain = context.__localeChainCache.get(startLocale);
  if (!chain) {
    chain = [];
    let block2 = [start];
    while (isArray(block2)) {
      block2 = appendBlockToChain(chain, block2, fallback);
    }
    const defaults = isArray(fallback) || !isPlainObject(fallback) ? fallback : fallback["default"] ? fallback["default"] : null;
    block2 = isString(defaults) ? [defaults] : defaults;
    if (isArray(block2)) {
      appendBlockToChain(chain, block2, false);
    }
    context.__localeChainCache.set(startLocale, chain);
  }
  return chain;
}
function appendBlockToChain(chain, block2, blocks) {
  let follow = true;
  for (let i2 = 0; i2 < block2.length && isBoolean(follow); i2++) {
    const locale = block2[i2];
    if (isString(locale)) {
      follow = appendLocaleToChain(chain, block2[i2], blocks);
    }
  }
  return follow;
}
function appendLocaleToChain(chain, locale, blocks) {
  let follow;
  const tokens = locale.split("-");
  do {
    const target = tokens.join("-");
    follow = appendItemToChain(chain, target, blocks);
    tokens.splice(-1, 1);
  } while (tokens.length && follow === true);
  return follow;
}
function appendItemToChain(chain, target, blocks) {
  let follow = false;
  if (!chain.includes(target)) {
    follow = true;
    if (target) {
      follow = target[target.length - 1] !== "!";
      const locale = target.replace(/!/g, "");
      chain.push(locale);
      if ((isArray(blocks) || isPlainObject(blocks)) && blocks[locale]) {
        follow = blocks[locale];
      }
    }
  }
  return follow;
}
const VERSION$1 = "9.2.2";
const NOT_REOSLVED = -1;
const DEFAULT_LOCALE = "en-US";
const MISSING_RESOLVE_VALUE = "";
const capitalize = (str) => `${str.charAt(0).toLocaleUpperCase()}${str.substr(1)}`;
function getDefaultLinkedModifiers() {
  return {
    upper: (val, type) => {
      return type === "text" && isString(val) ? val.toUpperCase() : type === "vnode" && isObject$8(val) && "__v_isVNode" in val ? val.children.toUpperCase() : val;
    },
    lower: (val, type) => {
      return type === "text" && isString(val) ? val.toLowerCase() : type === "vnode" && isObject$8(val) && "__v_isVNode" in val ? val.children.toLowerCase() : val;
    },
    capitalize: (val, type) => {
      return type === "text" && isString(val) ? capitalize(val) : type === "vnode" && isObject$8(val) && "__v_isVNode" in val ? capitalize(val.children) : val;
    }
  };
}
let _compiler;
function registerMessageCompiler(compiler) {
  _compiler = compiler;
}
let _resolver;
function registerMessageResolver(resolver) {
  _resolver = resolver;
}
let _fallbacker;
function registerLocaleFallbacker(fallbacker) {
  _fallbacker = fallbacker;
}
let _additionalMeta = null;
const setAdditionalMeta = (meta) => {
  _additionalMeta = meta;
};
const getAdditionalMeta = () => _additionalMeta;
let _fallbackContext = null;
const setFallbackContext = (context) => {
  _fallbackContext = context;
};
const getFallbackContext = () => _fallbackContext;
let _cid = 0;
function createCoreContext(options = {}) {
  const version2 = isString(options.version) ? options.version : VERSION$1;
  const locale = isString(options.locale) ? options.locale : DEFAULT_LOCALE;
  const fallbackLocale = isArray(options.fallbackLocale) || isPlainObject(options.fallbackLocale) || isString(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : locale;
  const messages = isPlainObject(options.messages) ? options.messages : { [locale]: {} };
  const datetimeFormats = isPlainObject(options.datetimeFormats) ? options.datetimeFormats : { [locale]: {} };
  const numberFormats = isPlainObject(options.numberFormats) ? options.numberFormats : { [locale]: {} };
  const modifiers = assign({}, options.modifiers || {}, getDefaultLinkedModifiers());
  const pluralRules = options.pluralRules || {};
  const missing = isFunction(options.missing) ? options.missing : null;
  const missingWarn = isBoolean(options.missingWarn) || isRegExp$1(options.missingWarn) ? options.missingWarn : true;
  const fallbackWarn = isBoolean(options.fallbackWarn) || isRegExp$1(options.fallbackWarn) ? options.fallbackWarn : true;
  const fallbackFormat = !!options.fallbackFormat;
  const unresolving = !!options.unresolving;
  const postTranslation = isFunction(options.postTranslation) ? options.postTranslation : null;
  const processor = isPlainObject(options.processor) ? options.processor : null;
  const warnHtmlMessage = isBoolean(options.warnHtmlMessage) ? options.warnHtmlMessage : true;
  const escapeParameter = !!options.escapeParameter;
  const messageCompiler = isFunction(options.messageCompiler) ? options.messageCompiler : _compiler;
  const messageResolver = isFunction(options.messageResolver) ? options.messageResolver : _resolver || resolveWithKeyValue;
  const localeFallbacker = isFunction(options.localeFallbacker) ? options.localeFallbacker : _fallbacker || fallbackWithSimple;
  const fallbackContext = isObject$8(options.fallbackContext) ? options.fallbackContext : void 0;
  const onWarn = isFunction(options.onWarn) ? options.onWarn : warn;
  const internalOptions = options;
  const __datetimeFormatters = isObject$8(internalOptions.__datetimeFormatters) ? internalOptions.__datetimeFormatters : /* @__PURE__ */ new Map();
  const __numberFormatters = isObject$8(internalOptions.__numberFormatters) ? internalOptions.__numberFormatters : /* @__PURE__ */ new Map();
  const __meta = isObject$8(internalOptions.__meta) ? internalOptions.__meta : {};
  _cid++;
  const context = {
    version: version2,
    cid: _cid,
    locale,
    fallbackLocale,
    messages,
    modifiers,
    pluralRules,
    missing,
    missingWarn,
    fallbackWarn,
    fallbackFormat,
    unresolving,
    postTranslation,
    processor,
    warnHtmlMessage,
    escapeParameter,
    messageCompiler,
    messageResolver,
    localeFallbacker,
    fallbackContext,
    onWarn,
    __meta
  };
  {
    context.datetimeFormats = datetimeFormats;
    context.numberFormats = numberFormats;
    context.__datetimeFormatters = __datetimeFormatters;
    context.__numberFormatters = __numberFormatters;
  }
  if (__INTLIFY_PROD_DEVTOOLS__) {
    initI18nDevTools(context, version2, __meta);
  }
  return context;
}
function handleMissing(context, key, locale, missingWarn, type) {
  const { missing, onWarn } = context;
  if (missing !== null) {
    const ret = missing(context, locale, key, type);
    return isString(ret) ? ret : key;
  } else {
    return key;
  }
}
function updateFallbackLocale(ctx, locale, fallback) {
  const context = ctx;
  context.__localeChainCache = /* @__PURE__ */ new Map();
  ctx.localeFallbacker(ctx, fallback, locale);
}
const defaultOnCacheKey = (source) => source;
let compileCache = /* @__PURE__ */ Object.create(null);
function compileToFunction(source, options = {}) {
  {
    const onCacheKey = options.onCacheKey || defaultOnCacheKey;
    const key = onCacheKey(source);
    const cached = compileCache[key];
    if (cached) {
      return cached;
    }
    let occurred = false;
    const onError = options.onError || defaultOnError;
    options.onError = (err) => {
      occurred = true;
      onError(err);
    };
    const { code: code2 } = baseCompile(source, options);
    const msg = new Function(`return ${code2}`)();
    return !occurred ? compileCache[key] = msg : msg;
  }
}
let code$1 = CompileErrorCodes.__EXTEND_POINT__;
const inc$1 = () => ++code$1;
const CoreErrorCodes = {
  INVALID_ARGUMENT: code$1,
  INVALID_DATE_ARGUMENT: inc$1(),
  INVALID_ISO_DATE_ARGUMENT: inc$1(),
  __EXTEND_POINT__: inc$1()
  // 18
};
function createCoreError(code2) {
  return createCompileError(code2, null, void 0);
}
const NOOP_MESSAGE_FUNCTION = () => "";
const isMessageFunction = (val) => isFunction(val);
function translate(context, ...args) {
  const { fallbackFormat, postTranslation, unresolving, messageCompiler, fallbackLocale, messages } = context;
  const [key, options] = parseTranslateArgs(...args);
  const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
  const fallbackWarn = isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
  const escapeParameter = isBoolean(options.escapeParameter) ? options.escapeParameter : context.escapeParameter;
  const resolvedMessage = !!options.resolvedMessage;
  const defaultMsgOrKey = isString(options.default) || isBoolean(options.default) ? !isBoolean(options.default) ? options.default : !messageCompiler ? () => key : key : fallbackFormat ? !messageCompiler ? () => key : key : "";
  const enableDefaultMsg = fallbackFormat || defaultMsgOrKey !== "";
  const locale = isString(options.locale) ? options.locale : context.locale;
  escapeParameter && escapeParams(options);
  let [formatScope, targetLocale, message2] = !resolvedMessage ? resolveMessageFormat(context, key, locale, fallbackLocale, fallbackWarn, missingWarn) : [
    key,
    locale,
    messages[locale] || {}
  ];
  let format = formatScope;
  let cacheBaseKey = key;
  if (!resolvedMessage && !(isString(format) || isMessageFunction(format))) {
    if (enableDefaultMsg) {
      format = defaultMsgOrKey;
      cacheBaseKey = format;
    }
  }
  if (!resolvedMessage && (!(isString(format) || isMessageFunction(format)) || !isString(targetLocale))) {
    return unresolving ? NOT_REOSLVED : key;
  }
  let occurred = false;
  const errorDetector = () => {
    occurred = true;
  };
  const msg = !isMessageFunction(format) ? compileMessageFormat(context, key, targetLocale, format, cacheBaseKey, errorDetector) : format;
  if (occurred) {
    return format;
  }
  const ctxOptions = getMessageContextOptions(context, targetLocale, message2, options);
  const msgContext = createMessageContext(ctxOptions);
  const messaged = evaluateMessage(context, msg, msgContext);
  const ret = postTranslation ? postTranslation(messaged, key) : messaged;
  if (__INTLIFY_PROD_DEVTOOLS__) {
    const payloads = {
      timestamp: Date.now(),
      key: isString(key) ? key : isMessageFunction(format) ? format.key : "",
      locale: targetLocale || (isMessageFunction(format) ? format.locale : ""),
      format: isString(format) ? format : isMessageFunction(format) ? format.source : "",
      message: ret
    };
    payloads.meta = assign({}, context.__meta, getAdditionalMeta() || {});
    translateDevTools(payloads);
  }
  return ret;
}
function escapeParams(options) {
  if (isArray(options.list)) {
    options.list = options.list.map((item) => isString(item) ? escapeHtml(item) : item);
  } else if (isObject$8(options.named)) {
    Object.keys(options.named).forEach((key) => {
      if (isString(options.named[key])) {
        options.named[key] = escapeHtml(options.named[key]);
      }
    });
  }
}
function resolveMessageFormat(context, key, locale, fallbackLocale, fallbackWarn, missingWarn) {
  const { messages, onWarn, messageResolver: resolveValue2, localeFallbacker } = context;
  const locales = localeFallbacker(context, fallbackLocale, locale);
  let message2 = {};
  let targetLocale;
  let format = null;
  const type = "translate";
  for (let i2 = 0; i2 < locales.length; i2++) {
    targetLocale = locales[i2];
    message2 = messages[targetLocale] || {};
    if ((format = resolveValue2(message2, key)) === null) {
      format = message2[key];
    }
    if (isString(format) || isFunction(format))
      break;
    const missingRet = handleMissing(
      context,
      // eslint-disable-line @typescript-eslint/no-explicit-any
      key,
      targetLocale,
      missingWarn,
      type
    );
    if (missingRet !== key) {
      format = missingRet;
    }
  }
  return [format, targetLocale, message2];
}
function compileMessageFormat(context, key, targetLocale, format, cacheBaseKey, errorDetector) {
  const { messageCompiler, warnHtmlMessage } = context;
  if (isMessageFunction(format)) {
    const msg2 = format;
    msg2.locale = msg2.locale || targetLocale;
    msg2.key = msg2.key || key;
    return msg2;
  }
  if (messageCompiler == null) {
    const msg2 = () => format;
    msg2.locale = targetLocale;
    msg2.key = key;
    return msg2;
  }
  const msg = messageCompiler(format, getCompileOptions(context, targetLocale, cacheBaseKey, format, warnHtmlMessage, errorDetector));
  msg.locale = targetLocale;
  msg.key = key;
  msg.source = format;
  return msg;
}
function evaluateMessage(context, msg, msgCtx) {
  const messaged = msg(msgCtx);
  return messaged;
}
function parseTranslateArgs(...args) {
  const [arg1, arg2, arg3] = args;
  const options = {};
  if (!isString(arg1) && !isNumber(arg1) && !isMessageFunction(arg1)) {
    throw createCoreError(CoreErrorCodes.INVALID_ARGUMENT);
  }
  const key = isNumber(arg1) ? String(arg1) : isMessageFunction(arg1) ? arg1 : arg1;
  if (isNumber(arg2)) {
    options.plural = arg2;
  } else if (isString(arg2)) {
    options.default = arg2;
  } else if (isPlainObject(arg2) && !isEmptyObject(arg2)) {
    options.named = arg2;
  } else if (isArray(arg2)) {
    options.list = arg2;
  }
  if (isNumber(arg3)) {
    options.plural = arg3;
  } else if (isString(arg3)) {
    options.default = arg3;
  } else if (isPlainObject(arg3)) {
    assign(options, arg3);
  }
  return [key, options];
}
function getCompileOptions(context, locale, key, source, warnHtmlMessage, errorDetector) {
  return {
    warnHtmlMessage,
    onError: (err) => {
      errorDetector && errorDetector(err);
      {
        throw err;
      }
    },
    onCacheKey: (source2) => generateFormatCacheKey(locale, key, source2)
  };
}
function getMessageContextOptions(context, locale, message2, options) {
  const { modifiers, pluralRules, messageResolver: resolveValue2, fallbackLocale, fallbackWarn, missingWarn, fallbackContext } = context;
  const resolveMessage = (key) => {
    let val = resolveValue2(message2, key);
    if (val == null && fallbackContext) {
      const [, , message3] = resolveMessageFormat(fallbackContext, key, locale, fallbackLocale, fallbackWarn, missingWarn);
      val = resolveValue2(message3, key);
    }
    if (isString(val)) {
      let occurred = false;
      const errorDetector = () => {
        occurred = true;
      };
      const msg = compileMessageFormat(context, key, locale, val, key, errorDetector);
      return !occurred ? msg : NOOP_MESSAGE_FUNCTION;
    } else if (isMessageFunction(val)) {
      return val;
    } else {
      return NOOP_MESSAGE_FUNCTION;
    }
  };
  const ctxOptions = {
    locale,
    modifiers,
    pluralRules,
    messages: resolveMessage
  };
  if (context.processor) {
    ctxOptions.processor = context.processor;
  }
  if (options.list) {
    ctxOptions.list = options.list;
  }
  if (options.named) {
    ctxOptions.named = options.named;
  }
  if (isNumber(options.plural)) {
    ctxOptions.pluralIndex = options.plural;
  }
  return ctxOptions;
}
function datetime(context, ...args) {
  const { datetimeFormats, unresolving, fallbackLocale, onWarn, localeFallbacker } = context;
  const { __datetimeFormatters } = context;
  const [key, value, options, overrides] = parseDateTimeArgs(...args);
  const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
  isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
  const part = !!options.part;
  const locale = isString(options.locale) ? options.locale : context.locale;
  const locales = localeFallbacker(
    context,
    // eslint-disable-line @typescript-eslint/no-explicit-any
    fallbackLocale,
    locale
  );
  if (!isString(key) || key === "") {
    return new Intl.DateTimeFormat(locale, overrides).format(value);
  }
  let datetimeFormat = {};
  let targetLocale;
  let format = null;
  const type = "datetime format";
  for (let i2 = 0; i2 < locales.length; i2++) {
    targetLocale = locales[i2];
    datetimeFormat = datetimeFormats[targetLocale] || {};
    format = datetimeFormat[key];
    if (isPlainObject(format))
      break;
    handleMissing(context, key, targetLocale, missingWarn, type);
  }
  if (!isPlainObject(format) || !isString(targetLocale)) {
    return unresolving ? NOT_REOSLVED : key;
  }
  let id2 = `${targetLocale}__${key}`;
  if (!isEmptyObject(overrides)) {
    id2 = `${id2}__${JSON.stringify(overrides)}`;
  }
  let formatter = __datetimeFormatters.get(id2);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat(targetLocale, assign({}, format, overrides));
    __datetimeFormatters.set(id2, formatter);
  }
  return !part ? formatter.format(value) : formatter.formatToParts(value);
}
const DATETIME_FORMAT_OPTIONS_KEYS = [
  "localeMatcher",
  "weekday",
  "era",
  "year",
  "month",
  "day",
  "hour",
  "minute",
  "second",
  "timeZoneName",
  "formatMatcher",
  "hour12",
  "timeZone",
  "dateStyle",
  "timeStyle",
  "calendar",
  "dayPeriod",
  "numberingSystem",
  "hourCycle",
  "fractionalSecondDigits"
];
function parseDateTimeArgs(...args) {
  const [arg1, arg2, arg3, arg4] = args;
  const options = {};
  let overrides = {};
  let value;
  if (isString(arg1)) {
    const matches = arg1.match(/(\d{4}-\d{2}-\d{2})(T|\s)?(.*)/);
    if (!matches) {
      throw createCoreError(CoreErrorCodes.INVALID_ISO_DATE_ARGUMENT);
    }
    const dateTime = matches[3] ? matches[3].trim().startsWith("T") ? `${matches[1].trim()}${matches[3].trim()}` : `${matches[1].trim()}T${matches[3].trim()}` : matches[1].trim();
    value = new Date(dateTime);
    try {
      value.toISOString();
    } catch (e2) {
      throw createCoreError(CoreErrorCodes.INVALID_ISO_DATE_ARGUMENT);
    }
  } else if (isDate(arg1)) {
    if (isNaN(arg1.getTime())) {
      throw createCoreError(CoreErrorCodes.INVALID_DATE_ARGUMENT);
    }
    value = arg1;
  } else if (isNumber(arg1)) {
    value = arg1;
  } else {
    throw createCoreError(CoreErrorCodes.INVALID_ARGUMENT);
  }
  if (isString(arg2)) {
    options.key = arg2;
  } else if (isPlainObject(arg2)) {
    Object.keys(arg2).forEach((key) => {
      if (DATETIME_FORMAT_OPTIONS_KEYS.includes(key)) {
        overrides[key] = arg2[key];
      } else {
        options[key] = arg2[key];
      }
    });
  }
  if (isString(arg3)) {
    options.locale = arg3;
  } else if (isPlainObject(arg3)) {
    overrides = arg3;
  }
  if (isPlainObject(arg4)) {
    overrides = arg4;
  }
  return [options.key || "", value, options, overrides];
}
function clearDateTimeFormat(ctx, locale, format) {
  const context = ctx;
  for (const key in format) {
    const id2 = `${locale}__${key}`;
    if (!context.__datetimeFormatters.has(id2)) {
      continue;
    }
    context.__datetimeFormatters.delete(id2);
  }
}
function number$2(context, ...args) {
  const { numberFormats, unresolving, fallbackLocale, onWarn, localeFallbacker } = context;
  const { __numberFormatters } = context;
  const [key, value, options, overrides] = parseNumberArgs(...args);
  const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
  isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
  const part = !!options.part;
  const locale = isString(options.locale) ? options.locale : context.locale;
  const locales = localeFallbacker(
    context,
    // eslint-disable-line @typescript-eslint/no-explicit-any
    fallbackLocale,
    locale
  );
  if (!isString(key) || key === "") {
    return new Intl.NumberFormat(locale, overrides).format(value);
  }
  let numberFormat = {};
  let targetLocale;
  let format = null;
  const type = "number format";
  for (let i2 = 0; i2 < locales.length; i2++) {
    targetLocale = locales[i2];
    numberFormat = numberFormats[targetLocale] || {};
    format = numberFormat[key];
    if (isPlainObject(format))
      break;
    handleMissing(context, key, targetLocale, missingWarn, type);
  }
  if (!isPlainObject(format) || !isString(targetLocale)) {
    return unresolving ? NOT_REOSLVED : key;
  }
  let id2 = `${targetLocale}__${key}`;
  if (!isEmptyObject(overrides)) {
    id2 = `${id2}__${JSON.stringify(overrides)}`;
  }
  let formatter = __numberFormatters.get(id2);
  if (!formatter) {
    formatter = new Intl.NumberFormat(targetLocale, assign({}, format, overrides));
    __numberFormatters.set(id2, formatter);
  }
  return !part ? formatter.format(value) : formatter.formatToParts(value);
}
const NUMBER_FORMAT_OPTIONS_KEYS = [
  "localeMatcher",
  "style",
  "currency",
  "currencyDisplay",
  "currencySign",
  "useGrouping",
  "minimumIntegerDigits",
  "minimumFractionDigits",
  "maximumFractionDigits",
  "minimumSignificantDigits",
  "maximumSignificantDigits",
  "compactDisplay",
  "notation",
  "signDisplay",
  "unit",
  "unitDisplay",
  "roundingMode",
  "roundingPriority",
  "roundingIncrement",
  "trailingZeroDisplay"
];
function parseNumberArgs(...args) {
  const [arg1, arg2, arg3, arg4] = args;
  const options = {};
  let overrides = {};
  if (!isNumber(arg1)) {
    throw createCoreError(CoreErrorCodes.INVALID_ARGUMENT);
  }
  const value = arg1;
  if (isString(arg2)) {
    options.key = arg2;
  } else if (isPlainObject(arg2)) {
    Object.keys(arg2).forEach((key) => {
      if (NUMBER_FORMAT_OPTIONS_KEYS.includes(key)) {
        overrides[key] = arg2[key];
      } else {
        options[key] = arg2[key];
      }
    });
  }
  if (isString(arg3)) {
    options.locale = arg3;
  } else if (isPlainObject(arg3)) {
    overrides = arg3;
  }
  if (isPlainObject(arg4)) {
    overrides = arg4;
  }
  return [options.key || "", value, options, overrides];
}
function clearNumberFormat(ctx, locale, format) {
  const context = ctx;
  for (const key in format) {
    const id2 = `${locale}__${key}`;
    if (!context.__numberFormatters.has(id2)) {
      continue;
    }
    context.__numberFormatters.delete(id2);
  }
}
{
  if (typeof __INTLIFY_PROD_DEVTOOLS__ !== "boolean") {
    getGlobalThis().__INTLIFY_PROD_DEVTOOLS__ = false;
  }
}
/*!
  * vue-i18n v9.2.2
  * (c) 2022 kazuya kawaguchi
  * Released under the MIT License.
  */
const VERSION = "9.2.2";
function initFeatureFlags() {
  if (typeof __VUE_I18N_FULL_INSTALL__ !== "boolean") {
    getGlobalThis().__VUE_I18N_FULL_INSTALL__ = true;
  }
  if (typeof __VUE_I18N_LEGACY_API__ !== "boolean") {
    getGlobalThis().__VUE_I18N_LEGACY_API__ = true;
  }
  if (typeof __INTLIFY_PROD_DEVTOOLS__ !== "boolean") {
    getGlobalThis().__INTLIFY_PROD_DEVTOOLS__ = false;
  }
}
CoreWarnCodes.__EXTEND_POINT__;
let code = CompileErrorCodes.__EXTEND_POINT__;
const inc = () => ++code;
const I18nErrorCodes = {
  // composer module errors
  UNEXPECTED_RETURN_TYPE: code,
  // legacy module errors
  INVALID_ARGUMENT: inc(),
  // i18n module errors
  MUST_BE_CALL_SETUP_TOP: inc(),
  NOT_INSLALLED: inc(),
  NOT_AVAILABLE_IN_LEGACY_MODE: inc(),
  // directive module errors
  REQUIRED_VALUE: inc(),
  INVALID_VALUE: inc(),
  // vue-devtools errors
  CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN: inc(),
  NOT_INSLALLED_WITH_PROVIDE: inc(),
  // unexpected error
  UNEXPECTED_ERROR: inc(),
  // not compatible legacy vue-i18n constructor
  NOT_COMPATIBLE_LEGACY_VUE_I18N: inc(),
  // bridge support vue 2.x only
  BRIDGE_SUPPORT_VUE_2_ONLY: inc(),
  // need to define `i18n` option in `allowComposition: true` and `useScope: 'local' at `useI18n``
  MUST_DEFINE_I18N_OPTION_IN_ALLOW_COMPOSITION: inc(),
  // Not available Compostion API in Legacy API mode. Please make sure that the legacy API mode is working properly
  NOT_AVAILABLE_COMPOSITION_IN_LEGACY: inc(),
  // for enhancement
  __EXTEND_POINT__: inc()
  // 29
};
function createI18nError(code2, ...args) {
  return createCompileError(code2, null, void 0);
}
const TransrateVNodeSymbol = /* @__PURE__ */ makeSymbol("__transrateVNode");
const DatetimePartsSymbol = /* @__PURE__ */ makeSymbol("__datetimeParts");
const NumberPartsSymbol = /* @__PURE__ */ makeSymbol("__numberParts");
const SetPluralRulesSymbol = makeSymbol("__setPluralRules");
makeSymbol("__intlifyMeta");
const InejctWithOption = /* @__PURE__ */ makeSymbol("__injectWithOption");
function handleFlatJson(obj) {
  if (!isObject$8(obj)) {
    return obj;
  }
  for (const key in obj) {
    if (!hasOwn$9(obj, key)) {
      continue;
    }
    if (!key.includes(".")) {
      if (isObject$8(obj[key])) {
        handleFlatJson(obj[key]);
      }
    } else {
      const subKeys = key.split(".");
      const lastIndex = subKeys.length - 1;
      let currentObj = obj;
      for (let i2 = 0; i2 < lastIndex; i2++) {
        if (!(subKeys[i2] in currentObj)) {
          currentObj[subKeys[i2]] = {};
        }
        currentObj = currentObj[subKeys[i2]];
      }
      currentObj[subKeys[lastIndex]] = obj[key];
      delete obj[key];
      if (isObject$8(currentObj[subKeys[lastIndex]])) {
        handleFlatJson(currentObj[subKeys[lastIndex]]);
      }
    }
  }
  return obj;
}
function getLocaleMessages(locale, options) {
  const { messages, __i18n, messageResolver, flatJson } = options;
  const ret = isPlainObject(messages) ? messages : isArray(__i18n) ? {} : { [locale]: {} };
  if (isArray(__i18n)) {
    __i18n.forEach((custom) => {
      if ("locale" in custom && "resource" in custom) {
        const { locale: locale2, resource } = custom;
        if (locale2) {
          ret[locale2] = ret[locale2] || {};
          deepCopy(resource, ret[locale2]);
        } else {
          deepCopy(resource, ret);
        }
      } else {
        isString(custom) && deepCopy(JSON.parse(custom), ret);
      }
    });
  }
  if (messageResolver == null && flatJson) {
    for (const key in ret) {
      if (hasOwn$9(ret, key)) {
        handleFlatJson(ret[key]);
      }
    }
  }
  return ret;
}
const isNotObjectOrIsArray = (val) => !isObject$8(val) || isArray(val);
function deepCopy(src, des) {
  if (isNotObjectOrIsArray(src) || isNotObjectOrIsArray(des)) {
    throw createI18nError(I18nErrorCodes.INVALID_VALUE);
  }
  for (const key in src) {
    if (hasOwn$9(src, key)) {
      if (isNotObjectOrIsArray(src[key]) || isNotObjectOrIsArray(des[key])) {
        des[key] = src[key];
      } else {
        deepCopy(src[key], des[key]);
      }
    }
  }
}
function getComponentOptions(instance) {
  return instance.type;
}
function adjustI18nResources(global2, options, componentOptions) {
  let messages = isObject$8(options.messages) ? options.messages : {};
  if ("__i18nGlobal" in componentOptions) {
    messages = getLocaleMessages(global2.locale.value, {
      messages,
      __i18n: componentOptions.__i18nGlobal
    });
  }
  const locales = Object.keys(messages);
  if (locales.length) {
    locales.forEach((locale) => {
      global2.mergeLocaleMessage(locale, messages[locale]);
    });
  }
  {
    if (isObject$8(options.datetimeFormats)) {
      const locales2 = Object.keys(options.datetimeFormats);
      if (locales2.length) {
        locales2.forEach((locale) => {
          global2.mergeDateTimeFormat(locale, options.datetimeFormats[locale]);
        });
      }
    }
    if (isObject$8(options.numberFormats)) {
      const locales2 = Object.keys(options.numberFormats);
      if (locales2.length) {
        locales2.forEach((locale) => {
          global2.mergeNumberFormat(locale, options.numberFormats[locale]);
        });
      }
    }
  }
}
function createTextNode(key) {
  return createVNode(Text, null, key, 0);
}
const DEVTOOLS_META = "__INTLIFY_META__";
let composerID = 0;
function defineCoreMissingHandler(missing) {
  return (ctx, locale, key, type) => {
    return missing(locale, key, getCurrentInstance$1() || void 0, type);
  };
}
const getMetaInfo = () => {
  const instance = getCurrentInstance$1();
  let meta = null;
  return instance && (meta = getComponentOptions(instance)[DEVTOOLS_META]) ? { [DEVTOOLS_META]: meta } : null;
};
function createComposer(options = {}, VueI18nLegacy) {
  const { __root } = options;
  const _isGlobal = __root === void 0;
  let _inheritLocale = isBoolean(options.inheritLocale) ? options.inheritLocale : true;
  const _locale = ref(
    // prettier-ignore
    __root && _inheritLocale ? __root.locale.value : isString(options.locale) ? options.locale : DEFAULT_LOCALE
  );
  const _fallbackLocale = ref(
    // prettier-ignore
    __root && _inheritLocale ? __root.fallbackLocale.value : isString(options.fallbackLocale) || isArray(options.fallbackLocale) || isPlainObject(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : _locale.value
  );
  const _messages = ref(getLocaleMessages(_locale.value, options));
  const _datetimeFormats = ref(isPlainObject(options.datetimeFormats) ? options.datetimeFormats : { [_locale.value]: {} });
  const _numberFormats = ref(isPlainObject(options.numberFormats) ? options.numberFormats : { [_locale.value]: {} });
  let _missingWarn = __root ? __root.missingWarn : isBoolean(options.missingWarn) || isRegExp$1(options.missingWarn) ? options.missingWarn : true;
  let _fallbackWarn = __root ? __root.fallbackWarn : isBoolean(options.fallbackWarn) || isRegExp$1(options.fallbackWarn) ? options.fallbackWarn : true;
  let _fallbackRoot = __root ? __root.fallbackRoot : isBoolean(options.fallbackRoot) ? options.fallbackRoot : true;
  let _fallbackFormat = !!options.fallbackFormat;
  let _missing = isFunction(options.missing) ? options.missing : null;
  let _runtimeMissing = isFunction(options.missing) ? defineCoreMissingHandler(options.missing) : null;
  let _postTranslation = isFunction(options.postTranslation) ? options.postTranslation : null;
  let _warnHtmlMessage = __root ? __root.warnHtmlMessage : isBoolean(options.warnHtmlMessage) ? options.warnHtmlMessage : true;
  let _escapeParameter = !!options.escapeParameter;
  const _modifiers = __root ? __root.modifiers : isPlainObject(options.modifiers) ? options.modifiers : {};
  let _pluralRules = options.pluralRules || __root && __root.pluralRules;
  let _context;
  const getCoreContext = () => {
    _isGlobal && setFallbackContext(null);
    const ctxOptions = {
      version: VERSION,
      locale: _locale.value,
      fallbackLocale: _fallbackLocale.value,
      messages: _messages.value,
      modifiers: _modifiers,
      pluralRules: _pluralRules,
      missing: _runtimeMissing === null ? void 0 : _runtimeMissing,
      missingWarn: _missingWarn,
      fallbackWarn: _fallbackWarn,
      fallbackFormat: _fallbackFormat,
      unresolving: true,
      postTranslation: _postTranslation === null ? void 0 : _postTranslation,
      warnHtmlMessage: _warnHtmlMessage,
      escapeParameter: _escapeParameter,
      messageResolver: options.messageResolver,
      __meta: { framework: "vue" }
    };
    {
      ctxOptions.datetimeFormats = _datetimeFormats.value;
      ctxOptions.numberFormats = _numberFormats.value;
      ctxOptions.__datetimeFormatters = isPlainObject(_context) ? _context.__datetimeFormatters : void 0;
      ctxOptions.__numberFormatters = isPlainObject(_context) ? _context.__numberFormatters : void 0;
    }
    const ctx = createCoreContext(ctxOptions);
    _isGlobal && setFallbackContext(ctx);
    return ctx;
  };
  _context = getCoreContext();
  updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
  function trackReactivityValues() {
    return [
      _locale.value,
      _fallbackLocale.value,
      _messages.value,
      _datetimeFormats.value,
      _numberFormats.value
    ];
  }
  const locale = computed({
    get: () => _locale.value,
    set: (val) => {
      _locale.value = val;
      _context.locale = _locale.value;
    }
  });
  const fallbackLocale = computed({
    get: () => _fallbackLocale.value,
    set: (val) => {
      _fallbackLocale.value = val;
      _context.fallbackLocale = _fallbackLocale.value;
      updateFallbackLocale(_context, _locale.value, val);
    }
  });
  const messages = computed(() => _messages.value);
  const datetimeFormats = /* @__PURE__ */ computed(() => _datetimeFormats.value);
  const numberFormats = /* @__PURE__ */ computed(() => _numberFormats.value);
  function getPostTranslationHandler() {
    return isFunction(_postTranslation) ? _postTranslation : null;
  }
  function setPostTranslationHandler(handler) {
    _postTranslation = handler;
    _context.postTranslation = handler;
  }
  function getMissingHandler() {
    return _missing;
  }
  function setMissingHandler(handler) {
    if (handler !== null) {
      _runtimeMissing = defineCoreMissingHandler(handler);
    }
    _missing = handler;
    _context.missing = _runtimeMissing;
  }
  const wrapWithDeps = (fn, argumentParser, warnType, fallbackSuccess, fallbackFail, successCondition) => {
    trackReactivityValues();
    let ret;
    if (__INTLIFY_PROD_DEVTOOLS__) {
      try {
        setAdditionalMeta(getMetaInfo());
        if (!_isGlobal) {
          _context.fallbackContext = __root ? getFallbackContext() : void 0;
        }
        ret = fn(_context);
      } finally {
        setAdditionalMeta(null);
        if (!_isGlobal) {
          _context.fallbackContext = void 0;
        }
      }
    } else {
      ret = fn(_context);
    }
    if (isNumber(ret) && ret === NOT_REOSLVED) {
      const [key, arg2] = argumentParser();
      return __root && _fallbackRoot ? fallbackSuccess(__root) : fallbackFail(key);
    } else if (successCondition(ret)) {
      return ret;
    } else {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_RETURN_TYPE);
    }
  };
  function t2(...args) {
    return wrapWithDeps((context) => Reflect.apply(translate, null, [context, ...args]), () => parseTranslateArgs(...args), "translate", (root) => Reflect.apply(root.t, root, [...args]), (key) => key, (val) => isString(val));
  }
  function rt2(...args) {
    const [arg1, arg2, arg3] = args;
    if (arg3 && !isObject$8(arg3)) {
      throw createI18nError(I18nErrorCodes.INVALID_ARGUMENT);
    }
    return t2(...[arg1, arg2, assign({ resolvedMessage: true }, arg3 || {})]);
  }
  function d(...args) {
    return wrapWithDeps((context) => Reflect.apply(datetime, null, [context, ...args]), () => parseDateTimeArgs(...args), "datetime format", (root) => Reflect.apply(root.d, root, [...args]), () => MISSING_RESOLVE_VALUE, (val) => isString(val));
  }
  function n2(...args) {
    return wrapWithDeps((context) => Reflect.apply(number$2, null, [context, ...args]), () => parseNumberArgs(...args), "number format", (root) => Reflect.apply(root.n, root, [...args]), () => MISSING_RESOLVE_VALUE, (val) => isString(val));
  }
  function normalize2(values) {
    return values.map((val) => isString(val) || isNumber(val) || isBoolean(val) ? createTextNode(String(val)) : val);
  }
  const interpolate = (val) => val;
  const processor = {
    normalize: normalize2,
    interpolate,
    type: "vnode"
  };
  function transrateVNode(...args) {
    return wrapWithDeps(
      (context) => {
        let ret;
        const _context2 = context;
        try {
          _context2.processor = processor;
          ret = Reflect.apply(translate, null, [_context2, ...args]);
        } finally {
          _context2.processor = null;
        }
        return ret;
      },
      () => parseTranslateArgs(...args),
      "translate",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (root) => root[TransrateVNodeSymbol](...args),
      (key) => [createTextNode(key)],
      (val) => isArray(val)
    );
  }
  function numberParts(...args) {
    return wrapWithDeps(
      (context) => Reflect.apply(number$2, null, [context, ...args]),
      () => parseNumberArgs(...args),
      "number format",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (root) => root[NumberPartsSymbol](...args),
      () => [],
      (val) => isString(val) || isArray(val)
    );
  }
  function datetimeParts(...args) {
    return wrapWithDeps(
      (context) => Reflect.apply(datetime, null, [context, ...args]),
      () => parseDateTimeArgs(...args),
      "datetime format",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (root) => root[DatetimePartsSymbol](...args),
      () => [],
      (val) => isString(val) || isArray(val)
    );
  }
  function setPluralRules(rules) {
    _pluralRules = rules;
    _context.pluralRules = _pluralRules;
  }
  function te2(key, locale2) {
    const targetLocale = isString(locale2) ? locale2 : _locale.value;
    const message2 = getLocaleMessage(targetLocale);
    return _context.messageResolver(message2, key) !== null;
  }
  function resolveMessages(key) {
    let messages2 = null;
    const locales = fallbackWithLocaleChain(_context, _fallbackLocale.value, _locale.value);
    for (let i2 = 0; i2 < locales.length; i2++) {
      const targetLocaleMessages = _messages.value[locales[i2]] || {};
      const messageValue = _context.messageResolver(targetLocaleMessages, key);
      if (messageValue != null) {
        messages2 = messageValue;
        break;
      }
    }
    return messages2;
  }
  function tm(key) {
    const messages2 = resolveMessages(key);
    return messages2 != null ? messages2 : __root ? __root.tm(key) || {} : {};
  }
  function getLocaleMessage(locale2) {
    return _messages.value[locale2] || {};
  }
  function setLocaleMessage(locale2, message2) {
    _messages.value[locale2] = message2;
    _context.messages = _messages.value;
  }
  function mergeLocaleMessage(locale2, message2) {
    _messages.value[locale2] = _messages.value[locale2] || {};
    deepCopy(message2, _messages.value[locale2]);
    _context.messages = _messages.value;
  }
  function getDateTimeFormat(locale2) {
    return _datetimeFormats.value[locale2] || {};
  }
  function setDateTimeFormat(locale2, format) {
    _datetimeFormats.value[locale2] = format;
    _context.datetimeFormats = _datetimeFormats.value;
    clearDateTimeFormat(_context, locale2, format);
  }
  function mergeDateTimeFormat(locale2, format) {
    _datetimeFormats.value[locale2] = assign(_datetimeFormats.value[locale2] || {}, format);
    _context.datetimeFormats = _datetimeFormats.value;
    clearDateTimeFormat(_context, locale2, format);
  }
  function getNumberFormat(locale2) {
    return _numberFormats.value[locale2] || {};
  }
  function setNumberFormat(locale2, format) {
    _numberFormats.value[locale2] = format;
    _context.numberFormats = _numberFormats.value;
    clearNumberFormat(_context, locale2, format);
  }
  function mergeNumberFormat(locale2, format) {
    _numberFormats.value[locale2] = assign(_numberFormats.value[locale2] || {}, format);
    _context.numberFormats = _numberFormats.value;
    clearNumberFormat(_context, locale2, format);
  }
  composerID++;
  if (__root && inBrowser) {
    watch(__root.locale, (val) => {
      if (_inheritLocale) {
        _locale.value = val;
        _context.locale = val;
        updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
      }
    });
    watch(__root.fallbackLocale, (val) => {
      if (_inheritLocale) {
        _fallbackLocale.value = val;
        _context.fallbackLocale = val;
        updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
      }
    });
  }
  const composer = {
    id: composerID,
    locale,
    fallbackLocale,
    get inheritLocale() {
      return _inheritLocale;
    },
    set inheritLocale(val) {
      _inheritLocale = val;
      if (val && __root) {
        _locale.value = __root.locale.value;
        _fallbackLocale.value = __root.fallbackLocale.value;
        updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
      }
    },
    get availableLocales() {
      return Object.keys(_messages.value).sort();
    },
    messages,
    get modifiers() {
      return _modifiers;
    },
    get pluralRules() {
      return _pluralRules || {};
    },
    get isGlobal() {
      return _isGlobal;
    },
    get missingWarn() {
      return _missingWarn;
    },
    set missingWarn(val) {
      _missingWarn = val;
      _context.missingWarn = _missingWarn;
    },
    get fallbackWarn() {
      return _fallbackWarn;
    },
    set fallbackWarn(val) {
      _fallbackWarn = val;
      _context.fallbackWarn = _fallbackWarn;
    },
    get fallbackRoot() {
      return _fallbackRoot;
    },
    set fallbackRoot(val) {
      _fallbackRoot = val;
    },
    get fallbackFormat() {
      return _fallbackFormat;
    },
    set fallbackFormat(val) {
      _fallbackFormat = val;
      _context.fallbackFormat = _fallbackFormat;
    },
    get warnHtmlMessage() {
      return _warnHtmlMessage;
    },
    set warnHtmlMessage(val) {
      _warnHtmlMessage = val;
      _context.warnHtmlMessage = val;
    },
    get escapeParameter() {
      return _escapeParameter;
    },
    set escapeParameter(val) {
      _escapeParameter = val;
      _context.escapeParameter = val;
    },
    t: t2,
    getLocaleMessage,
    setLocaleMessage,
    mergeLocaleMessage,
    getPostTranslationHandler,
    setPostTranslationHandler,
    getMissingHandler,
    setMissingHandler,
    [SetPluralRulesSymbol]: setPluralRules
  };
  {
    composer.datetimeFormats = datetimeFormats;
    composer.numberFormats = numberFormats;
    composer.rt = rt2;
    composer.te = te2;
    composer.tm = tm;
    composer.d = d;
    composer.n = n2;
    composer.getDateTimeFormat = getDateTimeFormat;
    composer.setDateTimeFormat = setDateTimeFormat;
    composer.mergeDateTimeFormat = mergeDateTimeFormat;
    composer.getNumberFormat = getNumberFormat;
    composer.setNumberFormat = setNumberFormat;
    composer.mergeNumberFormat = mergeNumberFormat;
    composer[InejctWithOption] = options.__injectWithOption;
    composer[TransrateVNodeSymbol] = transrateVNode;
    composer[DatetimePartsSymbol] = datetimeParts;
    composer[NumberPartsSymbol] = numberParts;
  }
  return composer;
}
function convertComposerOptions(options) {
  const locale = isString(options.locale) ? options.locale : DEFAULT_LOCALE;
  const fallbackLocale = isString(options.fallbackLocale) || isArray(options.fallbackLocale) || isPlainObject(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : locale;
  const missing = isFunction(options.missing) ? options.missing : void 0;
  const missingWarn = isBoolean(options.silentTranslationWarn) || isRegExp$1(options.silentTranslationWarn) ? !options.silentTranslationWarn : true;
  const fallbackWarn = isBoolean(options.silentFallbackWarn) || isRegExp$1(options.silentFallbackWarn) ? !options.silentFallbackWarn : true;
  const fallbackRoot = isBoolean(options.fallbackRoot) ? options.fallbackRoot : true;
  const fallbackFormat = !!options.formatFallbackMessages;
  const modifiers = isPlainObject(options.modifiers) ? options.modifiers : {};
  const pluralizationRules = options.pluralizationRules;
  const postTranslation = isFunction(options.postTranslation) ? options.postTranslation : void 0;
  const warnHtmlMessage = isString(options.warnHtmlInMessage) ? options.warnHtmlInMessage !== "off" : true;
  const escapeParameter = !!options.escapeParameterHtml;
  const inheritLocale = isBoolean(options.sync) ? options.sync : true;
  let messages = options.messages;
  if (isPlainObject(options.sharedMessages)) {
    const sharedMessages = options.sharedMessages;
    const locales = Object.keys(sharedMessages);
    messages = locales.reduce((messages2, locale2) => {
      const message2 = messages2[locale2] || (messages2[locale2] = {});
      assign(message2, sharedMessages[locale2]);
      return messages2;
    }, messages || {});
  }
  const { __i18n, __root, __injectWithOption } = options;
  const datetimeFormats = options.datetimeFormats;
  const numberFormats = options.numberFormats;
  const flatJson = options.flatJson;
  return {
    locale,
    fallbackLocale,
    messages,
    flatJson,
    datetimeFormats,
    numberFormats,
    missing,
    missingWarn,
    fallbackWarn,
    fallbackRoot,
    fallbackFormat,
    modifiers,
    pluralRules: pluralizationRules,
    postTranslation,
    warnHtmlMessage,
    escapeParameter,
    messageResolver: options.messageResolver,
    inheritLocale,
    __i18n,
    __root,
    __injectWithOption
  };
}
function createVueI18n(options = {}, VueI18nLegacy) {
  {
    const composer = createComposer(convertComposerOptions(options));
    const vueI18n = {
      // id
      id: composer.id,
      // locale
      get locale() {
        return composer.locale.value;
      },
      set locale(val) {
        composer.locale.value = val;
      },
      // fallbackLocale
      get fallbackLocale() {
        return composer.fallbackLocale.value;
      },
      set fallbackLocale(val) {
        composer.fallbackLocale.value = val;
      },
      // messages
      get messages() {
        return composer.messages.value;
      },
      // datetimeFormats
      get datetimeFormats() {
        return composer.datetimeFormats.value;
      },
      // numberFormats
      get numberFormats() {
        return composer.numberFormats.value;
      },
      // availableLocales
      get availableLocales() {
        return composer.availableLocales;
      },
      // formatter
      get formatter() {
        return {
          interpolate() {
            return [];
          }
        };
      },
      set formatter(val) {
      },
      // missing
      get missing() {
        return composer.getMissingHandler();
      },
      set missing(handler) {
        composer.setMissingHandler(handler);
      },
      // silentTranslationWarn
      get silentTranslationWarn() {
        return isBoolean(composer.missingWarn) ? !composer.missingWarn : composer.missingWarn;
      },
      set silentTranslationWarn(val) {
        composer.missingWarn = isBoolean(val) ? !val : val;
      },
      // silentFallbackWarn
      get silentFallbackWarn() {
        return isBoolean(composer.fallbackWarn) ? !composer.fallbackWarn : composer.fallbackWarn;
      },
      set silentFallbackWarn(val) {
        composer.fallbackWarn = isBoolean(val) ? !val : val;
      },
      // modifiers
      get modifiers() {
        return composer.modifiers;
      },
      // formatFallbackMessages
      get formatFallbackMessages() {
        return composer.fallbackFormat;
      },
      set formatFallbackMessages(val) {
        composer.fallbackFormat = val;
      },
      // postTranslation
      get postTranslation() {
        return composer.getPostTranslationHandler();
      },
      set postTranslation(handler) {
        composer.setPostTranslationHandler(handler);
      },
      // sync
      get sync() {
        return composer.inheritLocale;
      },
      set sync(val) {
        composer.inheritLocale = val;
      },
      // warnInHtmlMessage
      get warnHtmlInMessage() {
        return composer.warnHtmlMessage ? "warn" : "off";
      },
      set warnHtmlInMessage(val) {
        composer.warnHtmlMessage = val !== "off";
      },
      // escapeParameterHtml
      get escapeParameterHtml() {
        return composer.escapeParameter;
      },
      set escapeParameterHtml(val) {
        composer.escapeParameter = val;
      },
      // preserveDirectiveContent
      get preserveDirectiveContent() {
        return true;
      },
      set preserveDirectiveContent(val) {
      },
      // pluralizationRules
      get pluralizationRules() {
        return composer.pluralRules || {};
      },
      // for internal
      __composer: composer,
      // t
      t(...args) {
        const [arg1, arg2, arg3] = args;
        const options2 = {};
        let list = null;
        let named = null;
        if (!isString(arg1)) {
          throw createI18nError(I18nErrorCodes.INVALID_ARGUMENT);
        }
        const key = arg1;
        if (isString(arg2)) {
          options2.locale = arg2;
        } else if (isArray(arg2)) {
          list = arg2;
        } else if (isPlainObject(arg2)) {
          named = arg2;
        }
        if (isArray(arg3)) {
          list = arg3;
        } else if (isPlainObject(arg3)) {
          named = arg3;
        }
        return Reflect.apply(composer.t, composer, [
          key,
          list || named || {},
          options2
        ]);
      },
      rt(...args) {
        return Reflect.apply(composer.rt, composer, [...args]);
      },
      // tc
      tc(...args) {
        const [arg1, arg2, arg3] = args;
        const options2 = { plural: 1 };
        let list = null;
        let named = null;
        if (!isString(arg1)) {
          throw createI18nError(I18nErrorCodes.INVALID_ARGUMENT);
        }
        const key = arg1;
        if (isString(arg2)) {
          options2.locale = arg2;
        } else if (isNumber(arg2)) {
          options2.plural = arg2;
        } else if (isArray(arg2)) {
          list = arg2;
        } else if (isPlainObject(arg2)) {
          named = arg2;
        }
        if (isString(arg3)) {
          options2.locale = arg3;
        } else if (isArray(arg3)) {
          list = arg3;
        } else if (isPlainObject(arg3)) {
          named = arg3;
        }
        return Reflect.apply(composer.t, composer, [
          key,
          list || named || {},
          options2
        ]);
      },
      // te
      te(key, locale) {
        return composer.te(key, locale);
      },
      // tm
      tm(key) {
        return composer.tm(key);
      },
      // getLocaleMessage
      getLocaleMessage(locale) {
        return composer.getLocaleMessage(locale);
      },
      // setLocaleMessage
      setLocaleMessage(locale, message2) {
        composer.setLocaleMessage(locale, message2);
      },
      // mergeLocaleMessage
      mergeLocaleMessage(locale, message2) {
        composer.mergeLocaleMessage(locale, message2);
      },
      // d
      d(...args) {
        return Reflect.apply(composer.d, composer, [...args]);
      },
      // getDateTimeFormat
      getDateTimeFormat(locale) {
        return composer.getDateTimeFormat(locale);
      },
      // setDateTimeFormat
      setDateTimeFormat(locale, format) {
        composer.setDateTimeFormat(locale, format);
      },
      // mergeDateTimeFormat
      mergeDateTimeFormat(locale, format) {
        composer.mergeDateTimeFormat(locale, format);
      },
      // n
      n(...args) {
        return Reflect.apply(composer.n, composer, [...args]);
      },
      // getNumberFormat
      getNumberFormat(locale) {
        return composer.getNumberFormat(locale);
      },
      // setNumberFormat
      setNumberFormat(locale, format) {
        composer.setNumberFormat(locale, format);
      },
      // mergeNumberFormat
      mergeNumberFormat(locale, format) {
        composer.mergeNumberFormat(locale, format);
      },
      // getChoiceIndex
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      getChoiceIndex(choice, choicesLength) {
        return -1;
      },
      // for internal
      __onComponentInstanceCreated(target) {
        const { componentInstanceCreatedListener } = options;
        if (componentInstanceCreatedListener) {
          componentInstanceCreatedListener(target, vueI18n);
        }
      }
    };
    return vueI18n;
  }
}
const baseFormatProps = {
  tag: {
    type: [String, Object]
  },
  locale: {
    type: String
  },
  scope: {
    type: String,
    // NOTE: avoid https://github.com/microsoft/rushstack/issues/1050
    validator: (val) => val === "parent" || val === "global",
    default: "parent"
    /* ComponetI18nScope */
  },
  i18n: {
    type: Object
  }
};
function getInterpolateArg({ slots }, keys3) {
  if (keys3.length === 1 && keys3[0] === "default") {
    const ret = slots.default ? slots.default() : [];
    return ret.reduce((slot, current) => {
      return slot = [
        ...slot,
        ...isArray(current.children) ? current.children : [current]
      ];
    }, []);
  } else {
    return keys3.reduce((arg, key) => {
      const slot = slots[key];
      if (slot) {
        arg[key] = slot();
      }
      return arg;
    }, {});
  }
}
function getFragmentableTag(tag) {
  return Fragment;
}
const Translation = (
  /* defineComponent */
  {
    /* eslint-disable */
    name: "i18n-t",
    props: assign({
      keypath: {
        type: String,
        required: true
      },
      plural: {
        type: [Number, String],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        validator: (val) => isNumber(val) || !isNaN(val)
      }
    }, baseFormatProps),
    /* eslint-enable */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setup(props, context) {
      const { slots, attrs } = context;
      const i18n2 = props.i18n || useI18n({
        useScope: props.scope,
        __useComponent: true
      });
      return () => {
        const keys3 = Object.keys(slots).filter((key) => key !== "_");
        const options = {};
        if (props.locale) {
          options.locale = props.locale;
        }
        if (props.plural !== void 0) {
          options.plural = isString(props.plural) ? +props.plural : props.plural;
        }
        const arg = getInterpolateArg(context, keys3);
        const children = i18n2[TransrateVNodeSymbol](props.keypath, arg, options);
        const assignedAttrs = assign({}, attrs);
        const tag = isString(props.tag) || isObject$8(props.tag) ? props.tag : getFragmentableTag();
        return h(tag, assignedAttrs, children);
      };
    }
  }
);
function isVNode(target) {
  return isArray(target) && !isString(target[0]);
}
function renderFormatter(props, context, slotKeys, partFormatter) {
  const { slots, attrs } = context;
  return () => {
    const options = { part: true };
    let overrides = {};
    if (props.locale) {
      options.locale = props.locale;
    }
    if (isString(props.format)) {
      options.key = props.format;
    } else if (isObject$8(props.format)) {
      if (isString(props.format.key)) {
        options.key = props.format.key;
      }
      overrides = Object.keys(props.format).reduce((options2, prop) => {
        return slotKeys.includes(prop) ? assign({}, options2, { [prop]: props.format[prop] }) : options2;
      }, {});
    }
    const parts = partFormatter(...[props.value, options, overrides]);
    let children = [options.key];
    if (isArray(parts)) {
      children = parts.map((part, index) => {
        const slot = slots[part.type];
        const node = slot ? slot({ [part.type]: part.value, index, parts }) : [part.value];
        if (isVNode(node)) {
          node[0].key = `${part.type}-${index}`;
        }
        return node;
      });
    } else if (isString(parts)) {
      children = [parts];
    }
    const assignedAttrs = assign({}, attrs);
    const tag = isString(props.tag) || isObject$8(props.tag) ? props.tag : getFragmentableTag();
    return h(tag, assignedAttrs, children);
  };
}
const NumberFormat = (
  /* defineComponent */
  {
    /* eslint-disable */
    name: "i18n-n",
    props: assign({
      value: {
        type: Number,
        required: true
      },
      format: {
        type: [String, Object]
      }
    }, baseFormatProps),
    /* eslint-enable */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setup(props, context) {
      const i18n2 = props.i18n || useI18n({ useScope: "parent", __useComponent: true });
      return renderFormatter(props, context, NUMBER_FORMAT_OPTIONS_KEYS, (...args) => // eslint-disable-next-line @typescript-eslint/no-explicit-any
      i18n2[NumberPartsSymbol](...args));
    }
  }
);
const DatetimeFormat = (
  /*defineComponent */
  {
    /* eslint-disable */
    name: "i18n-d",
    props: assign({
      value: {
        type: [Number, Date],
        required: true
      },
      format: {
        type: [String, Object]
      }
    }, baseFormatProps),
    /* eslint-enable */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setup(props, context) {
      const i18n2 = props.i18n || useI18n({ useScope: "parent", __useComponent: true });
      return renderFormatter(props, context, DATETIME_FORMAT_OPTIONS_KEYS, (...args) => // eslint-disable-next-line @typescript-eslint/no-explicit-any
      i18n2[DatetimePartsSymbol](...args));
    }
  }
);
function getComposer$2(i18n2, instance) {
  const i18nInternal = i18n2;
  if (i18n2.mode === "composition") {
    return i18nInternal.__getInstance(instance) || i18n2.global;
  } else {
    const vueI18n = i18nInternal.__getInstance(instance);
    return vueI18n != null ? vueI18n.__composer : i18n2.global.__composer;
  }
}
function vTDirective(i18n2) {
  const _process = (binding) => {
    const { instance, modifiers, value } = binding;
    if (!instance || !instance.$) {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
    }
    const composer = getComposer$2(i18n2, instance.$);
    const parsedValue = parseValue(value);
    return [
      Reflect.apply(composer.t, composer, [...makeParams(parsedValue)]),
      composer
    ];
  };
  const register = (el, binding) => {
    const [textContent, composer] = _process(binding);
    if (inBrowser && i18n2.global === composer) {
      el.__i18nWatcher = watch(composer.locale, () => {
        binding.instance && binding.instance.$forceUpdate();
      });
    }
    el.__composer = composer;
    el.textContent = textContent;
  };
  const unregister = (el) => {
    if (inBrowser && el.__i18nWatcher) {
      el.__i18nWatcher();
      el.__i18nWatcher = void 0;
      delete el.__i18nWatcher;
    }
    if (el.__composer) {
      el.__composer = void 0;
      delete el.__composer;
    }
  };
  const update = (el, { value }) => {
    if (el.__composer) {
      const composer = el.__composer;
      const parsedValue = parseValue(value);
      el.textContent = Reflect.apply(composer.t, composer, [
        ...makeParams(parsedValue)
      ]);
    }
  };
  const getSSRProps = (binding) => {
    const [textContent] = _process(binding);
    return { textContent };
  };
  return {
    created: register,
    unmounted: unregister,
    beforeUpdate: update,
    getSSRProps
  };
}
function parseValue(value) {
  if (isString(value)) {
    return { path: value };
  } else if (isPlainObject(value)) {
    if (!("path" in value)) {
      throw createI18nError(I18nErrorCodes.REQUIRED_VALUE, "path");
    }
    return value;
  } else {
    throw createI18nError(I18nErrorCodes.INVALID_VALUE);
  }
}
function makeParams(value) {
  const { path, locale, args, choice, plural } = value;
  const options = {};
  const named = args || {};
  if (isString(locale)) {
    options.locale = locale;
  }
  if (isNumber(choice)) {
    options.plural = choice;
  }
  if (isNumber(plural)) {
    options.plural = plural;
  }
  return [path, named, options];
}
function apply(app2, i18n2, ...options) {
  const pluginOptions = isPlainObject(options[0]) ? options[0] : {};
  const useI18nComponentName = !!pluginOptions.useI18nComponentName;
  const globalInstall = isBoolean(pluginOptions.globalInstall) ? pluginOptions.globalInstall : true;
  if (globalInstall) {
    app2.component(!useI18nComponentName ? Translation.name : "i18n", Translation);
    app2.component(NumberFormat.name, NumberFormat);
    app2.component(DatetimeFormat.name, DatetimeFormat);
  }
  {
    app2.directive("t", vTDirective(i18n2));
  }
}
function defineMixin(vuei18n, composer, i18n2) {
  return {
    beforeCreate() {
      const instance = getCurrentInstance$1();
      if (!instance) {
        throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
      }
      const options = this.$options;
      if (options.i18n) {
        const optionsI18n = options.i18n;
        if (options.__i18n) {
          optionsI18n.__i18n = options.__i18n;
        }
        optionsI18n.__root = composer;
        if (this === this.$root) {
          this.$i18n = mergeToRoot(vuei18n, optionsI18n);
        } else {
          optionsI18n.__injectWithOption = true;
          this.$i18n = createVueI18n(optionsI18n);
        }
      } else if (options.__i18n) {
        if (this === this.$root) {
          this.$i18n = mergeToRoot(vuei18n, options);
        } else {
          this.$i18n = createVueI18n({
            __i18n: options.__i18n,
            __injectWithOption: true,
            __root: composer
          });
        }
      } else {
        this.$i18n = vuei18n;
      }
      if (options.__i18nGlobal) {
        adjustI18nResources(composer, options, options);
      }
      vuei18n.__onComponentInstanceCreated(this.$i18n);
      i18n2.__setInstance(instance, this.$i18n);
      this.$t = (...args) => this.$i18n.t(...args);
      this.$rt = (...args) => this.$i18n.rt(...args);
      this.$tc = (...args) => this.$i18n.tc(...args);
      this.$te = (key, locale) => this.$i18n.te(key, locale);
      this.$d = (...args) => this.$i18n.d(...args);
      this.$n = (...args) => this.$i18n.n(...args);
      this.$tm = (key) => this.$i18n.tm(key);
    },
    mounted() {
    },
    unmounted() {
      const instance = getCurrentInstance$1();
      if (!instance) {
        throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
      }
      delete this.$t;
      delete this.$rt;
      delete this.$tc;
      delete this.$te;
      delete this.$d;
      delete this.$n;
      delete this.$tm;
      i18n2.__deleteInstance(instance);
      delete this.$i18n;
    }
  };
}
function mergeToRoot(root, options) {
  root.locale = options.locale || root.locale;
  root.fallbackLocale = options.fallbackLocale || root.fallbackLocale;
  root.missing = options.missing || root.missing;
  root.silentTranslationWarn = options.silentTranslationWarn || root.silentFallbackWarn;
  root.silentFallbackWarn = options.silentFallbackWarn || root.silentFallbackWarn;
  root.formatFallbackMessages = options.formatFallbackMessages || root.formatFallbackMessages;
  root.postTranslation = options.postTranslation || root.postTranslation;
  root.warnHtmlInMessage = options.warnHtmlInMessage || root.warnHtmlInMessage;
  root.escapeParameterHtml = options.escapeParameterHtml || root.escapeParameterHtml;
  root.sync = options.sync || root.sync;
  root.__composer[SetPluralRulesSymbol](options.pluralizationRules || root.pluralizationRules);
  const messages = getLocaleMessages(root.locale, {
    messages: options.messages,
    __i18n: options.__i18n
  });
  Object.keys(messages).forEach((locale) => root.mergeLocaleMessage(locale, messages[locale]));
  if (options.datetimeFormats) {
    Object.keys(options.datetimeFormats).forEach((locale) => root.mergeDateTimeFormat(locale, options.datetimeFormats[locale]));
  }
  if (options.numberFormats) {
    Object.keys(options.numberFormats).forEach((locale) => root.mergeNumberFormat(locale, options.numberFormats[locale]));
  }
  return root;
}
const I18nInjectionKey = /* @__PURE__ */ makeSymbol("global-vue-i18n");
function createI18n(options = {}, VueI18nLegacy) {
  const __legacyMode = __VUE_I18N_LEGACY_API__ && isBoolean(options.legacy) ? options.legacy : __VUE_I18N_LEGACY_API__;
  const __globalInjection = isBoolean(options.globalInjection) ? options.globalInjection : true;
  const __allowComposition = __VUE_I18N_LEGACY_API__ && __legacyMode ? !!options.allowComposition : true;
  const __instances = /* @__PURE__ */ new Map();
  const [globalScope, __global] = createGlobal(options, __legacyMode);
  const symbol = makeSymbol("");
  function __getInstance(component) {
    return __instances.get(component) || null;
  }
  function __setInstance(component, instance) {
    __instances.set(component, instance);
  }
  function __deleteInstance(component) {
    __instances.delete(component);
  }
  {
    const i18n2 = {
      // mode
      get mode() {
        return __VUE_I18N_LEGACY_API__ && __legacyMode ? "legacy" : "composition";
      },
      // allowComposition
      get allowComposition() {
        return __allowComposition;
      },
      // install plugin
      async install(app2, ...options2) {
        app2.__VUE_I18N_SYMBOL__ = symbol;
        app2.provide(app2.__VUE_I18N_SYMBOL__, i18n2);
        if (!__legacyMode && __globalInjection) {
          injectGlobalFields(app2, i18n2.global);
        }
        if (__VUE_I18N_FULL_INSTALL__) {
          apply(app2, i18n2, ...options2);
        }
        if (__VUE_I18N_LEGACY_API__ && __legacyMode) {
          app2.mixin(defineMixin(__global, __global.__composer, i18n2));
        }
        const unmountApp = app2.unmount;
        app2.unmount = () => {
          i18n2.dispose();
          unmountApp();
        };
      },
      // global accessor
      get global() {
        return __global;
      },
      dispose() {
        globalScope.stop();
      },
      // @internal
      __instances,
      // @internal
      __getInstance,
      // @internal
      __setInstance,
      // @internal
      __deleteInstance
    };
    return i18n2;
  }
}
function useI18n(options = {}) {
  const instance = getCurrentInstance$1();
  if (instance == null) {
    throw createI18nError(I18nErrorCodes.MUST_BE_CALL_SETUP_TOP);
  }
  if (!instance.isCE && instance.appContext.app != null && !instance.appContext.app.__VUE_I18N_SYMBOL__) {
    throw createI18nError(I18nErrorCodes.NOT_INSLALLED);
  }
  const i18n2 = getI18nInstance(instance);
  const global2 = getGlobalComposer(i18n2);
  const componentOptions = getComponentOptions(instance);
  const scope = getScope(options, componentOptions);
  if (__VUE_I18N_LEGACY_API__) {
    if (i18n2.mode === "legacy" && !options.__useComponent) {
      if (!i18n2.allowComposition) {
        throw createI18nError(I18nErrorCodes.NOT_AVAILABLE_IN_LEGACY_MODE);
      }
      return useI18nForLegacy(instance, scope, global2, options);
    }
  }
  if (scope === "global") {
    adjustI18nResources(global2, options, componentOptions);
    return global2;
  }
  if (scope === "parent") {
    let composer2 = getComposer(i18n2, instance, options.__useComponent);
    if (composer2 == null) {
      composer2 = global2;
    }
    return composer2;
  }
  const i18nInternal = i18n2;
  let composer = i18nInternal.__getInstance(instance);
  if (composer == null) {
    const composerOptions = assign({}, options);
    if ("__i18n" in componentOptions) {
      composerOptions.__i18n = componentOptions.__i18n;
    }
    if (global2) {
      composerOptions.__root = global2;
    }
    composer = createComposer(composerOptions);
    setupLifeCycle(i18nInternal, instance);
    i18nInternal.__setInstance(instance, composer);
  }
  return composer;
}
function createGlobal(options, legacyMode, VueI18nLegacy) {
  const scope = effectScope();
  {
    const obj = __VUE_I18N_LEGACY_API__ && legacyMode ? scope.run(() => createVueI18n(options)) : scope.run(() => createComposer(options));
    if (obj == null) {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
    }
    return [scope, obj];
  }
}
function getI18nInstance(instance) {
  {
    const i18n2 = inject$1(!instance.isCE ? instance.appContext.app.__VUE_I18N_SYMBOL__ : I18nInjectionKey);
    if (!i18n2) {
      throw createI18nError(!instance.isCE ? I18nErrorCodes.UNEXPECTED_ERROR : I18nErrorCodes.NOT_INSLALLED_WITH_PROVIDE);
    }
    return i18n2;
  }
}
function getScope(options, componentOptions) {
  return isEmptyObject(options) ? "__i18n" in componentOptions ? "local" : "global" : !options.useScope ? "local" : options.useScope;
}
function getGlobalComposer(i18n2) {
  return i18n2.mode === "composition" ? i18n2.global : i18n2.global.__composer;
}
function getComposer(i18n2, target, useComponent = false) {
  let composer = null;
  const root = target.root;
  let current = target.parent;
  while (current != null) {
    const i18nInternal = i18n2;
    if (i18n2.mode === "composition") {
      composer = i18nInternal.__getInstance(current);
    } else {
      if (__VUE_I18N_LEGACY_API__) {
        const vueI18n = i18nInternal.__getInstance(current);
        if (vueI18n != null) {
          composer = vueI18n.__composer;
          if (useComponent && composer && !composer[InejctWithOption]) {
            composer = null;
          }
        }
      }
    }
    if (composer != null) {
      break;
    }
    if (root === current) {
      break;
    }
    current = current.parent;
  }
  return composer;
}
function setupLifeCycle(i18n2, target, composer) {
  {
    onMounted(() => {
    }, target);
    onUnmounted(() => {
      i18n2.__deleteInstance(target);
    }, target);
  }
}
function useI18nForLegacy(instance, scope, root, options = {}) {
  const isLocale = scope === "local";
  const _composer = shallowRef(null);
  if (isLocale && instance.proxy && !(instance.proxy.$options.i18n || instance.proxy.$options.__i18n)) {
    throw createI18nError(I18nErrorCodes.MUST_DEFINE_I18N_OPTION_IN_ALLOW_COMPOSITION);
  }
  const _inheritLocale = isBoolean(options.inheritLocale) ? options.inheritLocale : true;
  const _locale = ref(
    // prettier-ignore
    isLocale && _inheritLocale ? root.locale.value : isString(options.locale) ? options.locale : DEFAULT_LOCALE
  );
  const _fallbackLocale = ref(
    // prettier-ignore
    isLocale && _inheritLocale ? root.fallbackLocale.value : isString(options.fallbackLocale) || isArray(options.fallbackLocale) || isPlainObject(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : _locale.value
  );
  const _messages = ref(getLocaleMessages(_locale.value, options));
  const _datetimeFormats = ref(isPlainObject(options.datetimeFormats) ? options.datetimeFormats : { [_locale.value]: {} });
  const _numberFormats = ref(isPlainObject(options.numberFormats) ? options.numberFormats : { [_locale.value]: {} });
  const _missingWarn = isLocale ? root.missingWarn : isBoolean(options.missingWarn) || isRegExp$1(options.missingWarn) ? options.missingWarn : true;
  const _fallbackWarn = isLocale ? root.fallbackWarn : isBoolean(options.fallbackWarn) || isRegExp$1(options.fallbackWarn) ? options.fallbackWarn : true;
  const _fallbackRoot = isLocale ? root.fallbackRoot : isBoolean(options.fallbackRoot) ? options.fallbackRoot : true;
  const _fallbackFormat = !!options.fallbackFormat;
  const _missing = isFunction(options.missing) ? options.missing : null;
  const _postTranslation = isFunction(options.postTranslation) ? options.postTranslation : null;
  const _warnHtmlMessage = isLocale ? root.warnHtmlMessage : isBoolean(options.warnHtmlMessage) ? options.warnHtmlMessage : true;
  const _escapeParameter = !!options.escapeParameter;
  const _modifiers = isLocale ? root.modifiers : isPlainObject(options.modifiers) ? options.modifiers : {};
  const _pluralRules = options.pluralRules || isLocale && root.pluralRules;
  function trackReactivityValues() {
    return [
      _locale.value,
      _fallbackLocale.value,
      _messages.value,
      _datetimeFormats.value,
      _numberFormats.value
    ];
  }
  const locale = computed({
    get: () => {
      return _composer.value ? _composer.value.locale.value : _locale.value;
    },
    set: (val) => {
      if (_composer.value) {
        _composer.value.locale.value = val;
      }
      _locale.value = val;
    }
  });
  const fallbackLocale = computed({
    get: () => {
      return _composer.value ? _composer.value.fallbackLocale.value : _fallbackLocale.value;
    },
    set: (val) => {
      if (_composer.value) {
        _composer.value.fallbackLocale.value = val;
      }
      _fallbackLocale.value = val;
    }
  });
  const messages = computed(() => {
    if (_composer.value) {
      return _composer.value.messages.value;
    } else {
      return _messages.value;
    }
  });
  const datetimeFormats = computed(() => _datetimeFormats.value);
  const numberFormats = computed(() => _numberFormats.value);
  function getPostTranslationHandler() {
    return _composer.value ? _composer.value.getPostTranslationHandler() : _postTranslation;
  }
  function setPostTranslationHandler(handler) {
    if (_composer.value) {
      _composer.value.setPostTranslationHandler(handler);
    }
  }
  function getMissingHandler() {
    return _composer.value ? _composer.value.getMissingHandler() : _missing;
  }
  function setMissingHandler(handler) {
    if (_composer.value) {
      _composer.value.setMissingHandler(handler);
    }
  }
  function warpWithDeps(fn) {
    trackReactivityValues();
    return fn();
  }
  function t2(...args) {
    return _composer.value ? warpWithDeps(() => Reflect.apply(_composer.value.t, null, [...args])) : warpWithDeps(() => "");
  }
  function rt2(...args) {
    return _composer.value ? Reflect.apply(_composer.value.rt, null, [...args]) : "";
  }
  function d(...args) {
    return _composer.value ? warpWithDeps(() => Reflect.apply(_composer.value.d, null, [...args])) : warpWithDeps(() => "");
  }
  function n2(...args) {
    return _composer.value ? warpWithDeps(() => Reflect.apply(_composer.value.n, null, [...args])) : warpWithDeps(() => "");
  }
  function tm(key) {
    return _composer.value ? _composer.value.tm(key) : {};
  }
  function te2(key, locale2) {
    return _composer.value ? _composer.value.te(key, locale2) : false;
  }
  function getLocaleMessage(locale2) {
    return _composer.value ? _composer.value.getLocaleMessage(locale2) : {};
  }
  function setLocaleMessage(locale2, message2) {
    if (_composer.value) {
      _composer.value.setLocaleMessage(locale2, message2);
      _messages.value[locale2] = message2;
    }
  }
  function mergeLocaleMessage(locale2, message2) {
    if (_composer.value) {
      _composer.value.mergeLocaleMessage(locale2, message2);
    }
  }
  function getDateTimeFormat(locale2) {
    return _composer.value ? _composer.value.getDateTimeFormat(locale2) : {};
  }
  function setDateTimeFormat(locale2, format) {
    if (_composer.value) {
      _composer.value.setDateTimeFormat(locale2, format);
      _datetimeFormats.value[locale2] = format;
    }
  }
  function mergeDateTimeFormat(locale2, format) {
    if (_composer.value) {
      _composer.value.mergeDateTimeFormat(locale2, format);
    }
  }
  function getNumberFormat(locale2) {
    return _composer.value ? _composer.value.getNumberFormat(locale2) : {};
  }
  function setNumberFormat(locale2, format) {
    if (_composer.value) {
      _composer.value.setNumberFormat(locale2, format);
      _numberFormats.value[locale2] = format;
    }
  }
  function mergeNumberFormat(locale2, format) {
    if (_composer.value) {
      _composer.value.mergeNumberFormat(locale2, format);
    }
  }
  const wrapper = {
    get id() {
      return _composer.value ? _composer.value.id : -1;
    },
    locale,
    fallbackLocale,
    messages,
    datetimeFormats,
    numberFormats,
    get inheritLocale() {
      return _composer.value ? _composer.value.inheritLocale : _inheritLocale;
    },
    set inheritLocale(val) {
      if (_composer.value) {
        _composer.value.inheritLocale = val;
      }
    },
    get availableLocales() {
      return _composer.value ? _composer.value.availableLocales : Object.keys(_messages.value);
    },
    get modifiers() {
      return _composer.value ? _composer.value.modifiers : _modifiers;
    },
    get pluralRules() {
      return _composer.value ? _composer.value.pluralRules : _pluralRules;
    },
    get isGlobal() {
      return _composer.value ? _composer.value.isGlobal : false;
    },
    get missingWarn() {
      return _composer.value ? _composer.value.missingWarn : _missingWarn;
    },
    set missingWarn(val) {
      if (_composer.value) {
        _composer.value.missingWarn = val;
      }
    },
    get fallbackWarn() {
      return _composer.value ? _composer.value.fallbackWarn : _fallbackWarn;
    },
    set fallbackWarn(val) {
      if (_composer.value) {
        _composer.value.missingWarn = val;
      }
    },
    get fallbackRoot() {
      return _composer.value ? _composer.value.fallbackRoot : _fallbackRoot;
    },
    set fallbackRoot(val) {
      if (_composer.value) {
        _composer.value.fallbackRoot = val;
      }
    },
    get fallbackFormat() {
      return _composer.value ? _composer.value.fallbackFormat : _fallbackFormat;
    },
    set fallbackFormat(val) {
      if (_composer.value) {
        _composer.value.fallbackFormat = val;
      }
    },
    get warnHtmlMessage() {
      return _composer.value ? _composer.value.warnHtmlMessage : _warnHtmlMessage;
    },
    set warnHtmlMessage(val) {
      if (_composer.value) {
        _composer.value.warnHtmlMessage = val;
      }
    },
    get escapeParameter() {
      return _composer.value ? _composer.value.escapeParameter : _escapeParameter;
    },
    set escapeParameter(val) {
      if (_composer.value) {
        _composer.value.escapeParameter = val;
      }
    },
    t: t2,
    getPostTranslationHandler,
    setPostTranslationHandler,
    getMissingHandler,
    setMissingHandler,
    rt: rt2,
    d,
    n: n2,
    tm,
    te: te2,
    getLocaleMessage,
    setLocaleMessage,
    mergeLocaleMessage,
    getDateTimeFormat,
    setDateTimeFormat,
    mergeDateTimeFormat,
    getNumberFormat,
    setNumberFormat,
    mergeNumberFormat
  };
  function sync(composer) {
    composer.locale.value = _locale.value;
    composer.fallbackLocale.value = _fallbackLocale.value;
    Object.keys(_messages.value).forEach((locale2) => {
      composer.mergeLocaleMessage(locale2, _messages.value[locale2]);
    });
    Object.keys(_datetimeFormats.value).forEach((locale2) => {
      composer.mergeDateTimeFormat(locale2, _datetimeFormats.value[locale2]);
    });
    Object.keys(_numberFormats.value).forEach((locale2) => {
      composer.mergeNumberFormat(locale2, _numberFormats.value[locale2]);
    });
    composer.escapeParameter = _escapeParameter;
    composer.fallbackFormat = _fallbackFormat;
    composer.fallbackRoot = _fallbackRoot;
    composer.fallbackWarn = _fallbackWarn;
    composer.missingWarn = _missingWarn;
    composer.warnHtmlMessage = _warnHtmlMessage;
  }
  onBeforeMount(() => {
    if (instance.proxy == null || instance.proxy.$i18n == null) {
      throw createI18nError(I18nErrorCodes.NOT_AVAILABLE_COMPOSITION_IN_LEGACY);
    }
    const composer = _composer.value = instance.proxy.$i18n.__composer;
    if (scope === "global") {
      _locale.value = composer.locale.value;
      _fallbackLocale.value = composer.fallbackLocale.value;
      _messages.value = composer.messages.value;
      _datetimeFormats.value = composer.datetimeFormats.value;
      _numberFormats.value = composer.numberFormats.value;
    } else if (isLocale) {
      sync(composer);
    }
  });
  return wrapper;
}
const globalExportProps = [
  "locale",
  "fallbackLocale",
  "availableLocales"
];
const globalExportMethods = ["t", "rt", "d", "n", "tm"];
function injectGlobalFields(app2, composer) {
  const i18n2 = /* @__PURE__ */ Object.create(null);
  globalExportProps.forEach((prop) => {
    const desc = Object.getOwnPropertyDescriptor(composer, prop);
    if (!desc) {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
    }
    const wrap = isRef(desc.value) ? {
      get() {
        return desc.value.value;
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      set(val) {
        desc.value.value = val;
      }
    } : {
      get() {
        return desc.get && desc.get();
      }
    };
    Object.defineProperty(i18n2, prop, wrap);
  });
  app2.config.globalProperties.$i18n = i18n2;
  globalExportMethods.forEach((method) => {
    const desc = Object.getOwnPropertyDescriptor(composer, method);
    if (!desc || !desc.value) {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
    }
    Object.defineProperty(app2.config.globalProperties, `$${method}`, desc);
  });
}
registerMessageCompiler(compileToFunction);
registerMessageResolver(resolveValue);
registerLocaleFallbacker(fallbackWithLocaleChain);
{
  initFeatureFlags();
}
if (__INTLIFY_PROD_DEVTOOLS__) {
  const target = getGlobalThis();
  target.__INTLIFY__ = true;
  setDevToolsHook(target.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__);
}
const app$2 = {
  name: "Loor JA"
};
const message$1 = {
  "task-in-progress": "¡Hay una tarea en progreso en esta pestaña! Cerrar la tarea primero",
  "no-data-text": "No hay datos para mostrar",
  "no-results-text": "Ningún resultado encontrado",
  "loading-text": "Cargando...",
  "hymnal-not-downloaded": "El himnario no se descargó en su programa. ¡Ve a la tienda y descarga el himnario!",
  "musics-not-downloaded": "No se han descargado canciones en su programa. ¡Ve a la tienda y descarga las canciones!",
  "label-hymn-name-or-number": "Ingrese el nombre o número del himno",
  "label-song-name": "Introduce el nombre de la canción"
};
const initials$1 = {
  sung: "CA",
  instrumental: "PB",
  "without-audio": "SA"
};
const home$1 = "Comienzo";
const hymnal$1 = "Himnario Adventista";
const bible$1 = "Biblia";
const liturgy$1 = "Liturgia";
const stopwatch$1 = "Cronógrafo";
const clock$1 = "Reloj";
const sweepstake$1 = "Sorteo";
const collections$1 = "Colecciones";
const utilities$1 = "Utilidades";
const number$1 = "Número";
const title$1 = "Título";
const album$1 = "Álbum";
const slide$1 = "Slide";
const instrumental$1 = "Playback";
const sung$1 = "Cantado";
const lyrics$1 = "Letra de musica";
const version$2 = "Versión";
const track$1 = "Rango";
const close$1 = "Cerca";
const es = {
  app: app$2,
  message: message$1,
  initials: initials$1,
  home: home$1,
  hymnal: hymnal$1,
  "find-musics": "Encontrar Canciones",
  "online-videos": "Vídeos En-línea",
  bible: bible$1,
  liturgy: liturgy$1,
  "scheduled-items": "Elementos Programados",
  stopwatch: stopwatch$1,
  clock: clock$1,
  "worship-timer": "Temporizador de Adoración",
  sweepstake: sweepstake$1,
  "slide-editor": "Editor",
  collections: collections$1,
  "online-collections": "Colecciones En-Llínea",
  utilities: utilities$1,
  "task-in-progress": "Tarea en progreso",
  "refresh-page": "Actualizar Página",
  "access-store": "Tienda de Acceso",
  number: number$1,
  title: title$1,
  album: album$1,
  slide: slide$1,
  "instrumental-slide": "Slide Playback",
  instrumental: instrumental$1,
  sung: sung$1,
  "slide-without-audio": "Slide sin Audio",
  "without-audio": "Sin Audio",
  "listen-to-music": "Oír Música",
  "listen-to-instrumental-music": "Oír Música Playback",
  lyrics: lyrics$1,
  version: version$2,
  track: track$1,
  close: close$1,
  "annual-collections": "Varias Colecciones",
  "various-collections": "Colecciones Anuales"
};
const app$1 = {
  name: "Louvor JA"
};
const message = {
  "task-in-progress": "Existe uma tarefa em andamento nesta aba! Encerre a tarefa primeiro",
  "no-data-text": "Não há dados para serem exibidos",
  "no-results-text": "Nenhum resultado encontrado",
  "loading-text": "Carregando...",
  "hymnal-not-downloaded": "O hinário não foi baixado em seu programa. Acesse a loja e faça o download do hinário!",
  "musics-not-downloaded": "Nenhuma música foi baixada em seu programa. Acesse a loja e faça o download das músicas!",
  "label-hymn-name-or-number": "Digite o nome ou número do hino",
  "label-song-name": "Digite o nome da música"
};
const initials = {
  sung: "CA",
  instrumental: "PB",
  "without-audio": "SA"
};
const home = "Início";
const hymnal = "Hinário Adventista";
const bible = "Bíblia";
const liturgy = "Liturgia";
const stopwatch = "Cronômetro";
const clock = "Relógio";
const sweepstake = "Sorteio";
const collections = "Coletâneas";
const utilities = "Utilitários";
const number = "Número";
const title = "Título";
const album = "Álbum";
const slide = "Slide";
const instrumental = "Playback";
const sung = "Cantado";
const lyrics = "Letra da Música";
const version$1 = "Versão";
const track = "Faixa";
const close = "Fechar";
const pt$1 = {
  app: app$1,
  message,
  initials,
  home,
  hymnal,
  "find-musics": "Localizar Músicas",
  "online-videos": "Vídeos On-line",
  bible,
  liturgy,
  "scheduled-items": "Itens Agendados",
  stopwatch,
  clock,
  "worship-timer": "Cronômetro de Culto",
  sweepstake,
  "slide-editor": "Editor",
  collections,
  "online-collections": "Coletâneas On-line",
  utilities,
  "task-in-progress": "Tarefa em andamento",
  "refresh-page": "Atualizar Página",
  "access-store": "Acessar Loja",
  number,
  title,
  album,
  slide,
  "instrumental-slide": "Slide Playback",
  instrumental,
  sung,
  "slide-without-audio": "Slide sem Áudio",
  "without-audio": "Sem Áudio",
  "listen-to-music": "Ouvir Música",
  "listen-to-instrumental-music": "Ouvir Música Playback",
  lyrics,
  version: version$1,
  track,
  close,
  "annual-collections": "Coletâneas Anuais",
  "various-collections": "Coletâneas Diversas"
};
const i18n = createI18n({
  locale: "pt",
  messages: {
    es,
    pt: pt$1
  }
});
var check = function(it2) {
  return it2 && it2.Math == Math && it2;
};
var global$e = (
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == "object" && globalThis) || check(typeof window == "object" && window) || // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == "object" && self) || check(typeof commonjsGlobal == "object" && commonjsGlobal) || function() {
    return this;
  }() || Function("return this")()
);
var objectGetOwnPropertyDescriptor = {};
var fails$e = function(exec2) {
  try {
    return !!exec2();
  } catch (error) {
    return true;
  }
};
var fails$d = fails$e;
var descriptors = !fails$d(function() {
  return Object.defineProperty({}, 1, { get: function() {
    return 7;
  } })[1] != 7;
});
var fails$c = fails$e;
var functionBindNative = !fails$c(function() {
  var test2 = function() {
  }.bind();
  return typeof test2 != "function" || test2.hasOwnProperty("prototype");
});
var NATIVE_BIND$1 = functionBindNative;
var call$6 = Function.prototype.call;
var functionCall = NATIVE_BIND$1 ? call$6.bind(call$6) : function() {
  return call$6.apply(call$6, arguments);
};
var objectPropertyIsEnumerable = {};
var $propertyIsEnumerable = {}.propertyIsEnumerable;
var getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;
var NASHORN_BUG = getOwnPropertyDescriptor$1 && !$propertyIsEnumerable.call({ 1: 2 }, 1);
objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V2) {
  var descriptor = getOwnPropertyDescriptor$1(this, V2);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;
var createPropertyDescriptor$2 = function(bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value
  };
};
var NATIVE_BIND = functionBindNative;
var FunctionPrototype$1 = Function.prototype;
var call$5 = FunctionPrototype$1.call;
var uncurryThisWithBind = NATIVE_BIND && FunctionPrototype$1.bind.bind(call$5, call$5);
var functionUncurryThis = NATIVE_BIND ? uncurryThisWithBind : function(fn) {
  return function() {
    return call$5.apply(fn, arguments);
  };
};
var uncurryThis$a = functionUncurryThis;
var toString$6 = uncurryThis$a({}.toString);
var stringSlice$2 = uncurryThis$a("".slice);
var classofRaw$1 = function(it2) {
  return stringSlice$2(toString$6(it2), 8, -1);
};
var uncurryThis$9 = functionUncurryThis;
var fails$b = fails$e;
var classof$4 = classofRaw$1;
var $Object$3 = Object;
var split = uncurryThis$9("".split);
var indexedObject = fails$b(function() {
  return !$Object$3("z").propertyIsEnumerable(0);
}) ? function(it2) {
  return classof$4(it2) == "String" ? split(it2, "") : $Object$3(it2);
} : $Object$3;
var isNullOrUndefined$2 = function(it2) {
  return it2 === null || it2 === void 0;
};
var isNullOrUndefined$1 = isNullOrUndefined$2;
var $TypeError$6 = TypeError;
var requireObjectCoercible$2 = function(it2) {
  if (isNullOrUndefined$1(it2))
    throw $TypeError$6("Can't call method on " + it2);
  return it2;
};
var IndexedObject = indexedObject;
var requireObjectCoercible$1 = requireObjectCoercible$2;
var toIndexedObject$4 = function(it2) {
  return IndexedObject(requireObjectCoercible$1(it2));
};
var documentAll$2 = typeof document == "object" && document.all;
var IS_HTMLDDA = typeof documentAll$2 == "undefined" && documentAll$2 !== void 0;
var documentAll_1 = {
  all: documentAll$2,
  IS_HTMLDDA
};
var $documentAll$1 = documentAll_1;
var documentAll$1 = $documentAll$1.all;
var isCallable$d = $documentAll$1.IS_HTMLDDA ? function(argument) {
  return typeof argument == "function" || argument === documentAll$1;
} : function(argument) {
  return typeof argument == "function";
};
var isCallable$c = isCallable$d;
var $documentAll = documentAll_1;
var documentAll = $documentAll.all;
var isObject$7 = $documentAll.IS_HTMLDDA ? function(it2) {
  return typeof it2 == "object" ? it2 !== null : isCallable$c(it2) || it2 === documentAll;
} : function(it2) {
  return typeof it2 == "object" ? it2 !== null : isCallable$c(it2);
};
var global$d = global$e;
var isCallable$b = isCallable$d;
var aFunction = function(argument) {
  return isCallable$b(argument) ? argument : void 0;
};
var getBuiltIn$5 = function(namespace, method) {
  return arguments.length < 2 ? aFunction(global$d[namespace]) : global$d[namespace] && global$d[namespace][method];
};
var uncurryThis$8 = functionUncurryThis;
var objectIsPrototypeOf = uncurryThis$8({}.isPrototypeOf);
var getBuiltIn$4 = getBuiltIn$5;
var engineUserAgent = getBuiltIn$4("navigator", "userAgent") || "";
var global$c = global$e;
var userAgent = engineUserAgent;
var process = global$c.process;
var Deno = global$c.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;
if (v8) {
  match = v8.split(".");
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}
if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match)
      version = +match[1];
  }
}
var engineV8Version = version;
var V8_VERSION = engineV8Version;
var fails$a = fails$e;
var symbolConstructorDetection = !!Object.getOwnPropertySymbols && !fails$a(function() {
  var symbol = Symbol();
  return !String(symbol) || !(Object(symbol) instanceof Symbol) || // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
  !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});
var NATIVE_SYMBOL$1 = symbolConstructorDetection;
var useSymbolAsUid = NATIVE_SYMBOL$1 && !Symbol.sham && typeof Symbol.iterator == "symbol";
var getBuiltIn$3 = getBuiltIn$5;
var isCallable$a = isCallable$d;
var isPrototypeOf$2 = objectIsPrototypeOf;
var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;
var $Object$2 = Object;
var isSymbol$2 = USE_SYMBOL_AS_UID$1 ? function(it2) {
  return typeof it2 == "symbol";
} : function(it2) {
  var $Symbol = getBuiltIn$3("Symbol");
  return isCallable$a($Symbol) && isPrototypeOf$2($Symbol.prototype, $Object$2(it2));
};
var $String$3 = String;
var tryToString$1 = function(argument) {
  try {
    return $String$3(argument);
  } catch (error) {
    return "Object";
  }
};
var isCallable$9 = isCallable$d;
var tryToString = tryToString$1;
var $TypeError$5 = TypeError;
var aCallable$1 = function(argument) {
  if (isCallable$9(argument))
    return argument;
  throw $TypeError$5(tryToString(argument) + " is not a function");
};
var aCallable = aCallable$1;
var isNullOrUndefined = isNullOrUndefined$2;
var getMethod$1 = function(V2, P2) {
  var func = V2[P2];
  return isNullOrUndefined(func) ? void 0 : aCallable(func);
};
var call$4 = functionCall;
var isCallable$8 = isCallable$d;
var isObject$6 = isObject$7;
var $TypeError$4 = TypeError;
var ordinaryToPrimitive$1 = function(input, pref) {
  var fn, val;
  if (pref === "string" && isCallable$8(fn = input.toString) && !isObject$6(val = call$4(fn, input)))
    return val;
  if (isCallable$8(fn = input.valueOf) && !isObject$6(val = call$4(fn, input)))
    return val;
  if (pref !== "string" && isCallable$8(fn = input.toString) && !isObject$6(val = call$4(fn, input)))
    return val;
  throw $TypeError$4("Can't convert object to primitive value");
};
var sharedExports = {};
var shared$4 = {
  get exports() {
    return sharedExports;
  },
  set exports(v) {
    sharedExports = v;
  }
};
var global$b = global$e;
var defineProperty$2 = Object.defineProperty;
var defineGlobalProperty$3 = function(key, value) {
  try {
    defineProperty$2(global$b, key, { value, configurable: true, writable: true });
  } catch (error) {
    global$b[key] = value;
  }
  return value;
};
var global$a = global$e;
var defineGlobalProperty$2 = defineGlobalProperty$3;
var SHARED = "__core-js_shared__";
var store$3 = global$a[SHARED] || defineGlobalProperty$2(SHARED, {});
var sharedStore = store$3;
var store$2 = sharedStore;
(shared$4.exports = function(key, value) {
  return store$2[key] || (store$2[key] = value !== void 0 ? value : {});
})("versions", []).push({
  version: "3.27.1",
  mode: "global",
  copyright: "© 2014-2022 Denis Pushkarev (zloirock.ru)",
  license: "https://github.com/zloirock/core-js/blob/v3.27.1/LICENSE",
  source: "https://github.com/zloirock/core-js"
});
var requireObjectCoercible = requireObjectCoercible$2;
var $Object$1 = Object;
var toObject$2 = function(argument) {
  return $Object$1(requireObjectCoercible(argument));
};
var uncurryThis$7 = functionUncurryThis;
var toObject$1 = toObject$2;
var hasOwnProperty = uncurryThis$7({}.hasOwnProperty);
var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it2, key) {
  return hasOwnProperty(toObject$1(it2), key);
};
var uncurryThis$6 = functionUncurryThis;
var id = 0;
var postfix = Math.random();
var toString$5 = uncurryThis$6(1 .toString);
var uid$2 = function(key) {
  return "Symbol(" + (key === void 0 ? "" : key) + ")_" + toString$5(++id + postfix, 36);
};
var global$9 = global$e;
var shared$3 = sharedExports;
var hasOwn$8 = hasOwnProperty_1;
var uid$1 = uid$2;
var NATIVE_SYMBOL = symbolConstructorDetection;
var USE_SYMBOL_AS_UID = useSymbolAsUid;
var WellKnownSymbolsStore = shared$3("wks");
var Symbol$1 = global$9.Symbol;
var symbolFor = Symbol$1 && Symbol$1["for"];
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$1;
var wellKnownSymbol$6 = function(name2) {
  if (!hasOwn$8(WellKnownSymbolsStore, name2) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name2] == "string")) {
    var description = "Symbol." + name2;
    if (NATIVE_SYMBOL && hasOwn$8(Symbol$1, name2)) {
      WellKnownSymbolsStore[name2] = Symbol$1[name2];
    } else if (USE_SYMBOL_AS_UID && symbolFor) {
      WellKnownSymbolsStore[name2] = symbolFor(description);
    } else {
      WellKnownSymbolsStore[name2] = createWellKnownSymbol(description);
    }
  }
  return WellKnownSymbolsStore[name2];
};
var call$3 = functionCall;
var isObject$5 = isObject$7;
var isSymbol$1 = isSymbol$2;
var getMethod = getMethod$1;
var ordinaryToPrimitive = ordinaryToPrimitive$1;
var wellKnownSymbol$5 = wellKnownSymbol$6;
var $TypeError$3 = TypeError;
var TO_PRIMITIVE = wellKnownSymbol$5("toPrimitive");
var toPrimitive$1 = function(input, pref) {
  if (!isObject$5(input) || isSymbol$1(input))
    return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === void 0)
      pref = "default";
    result = call$3(exoticToPrim, input, pref);
    if (!isObject$5(result) || isSymbol$1(result))
      return result;
    throw $TypeError$3("Can't convert object to primitive value");
  }
  if (pref === void 0)
    pref = "number";
  return ordinaryToPrimitive(input, pref);
};
var toPrimitive = toPrimitive$1;
var isSymbol = isSymbol$2;
var toPropertyKey$2 = function(argument) {
  var key = toPrimitive(argument, "string");
  return isSymbol(key) ? key : key + "";
};
var global$8 = global$e;
var isObject$4 = isObject$7;
var document$1 = global$8.document;
var EXISTS$1 = isObject$4(document$1) && isObject$4(document$1.createElement);
var documentCreateElement$1 = function(it2) {
  return EXISTS$1 ? document$1.createElement(it2) : {};
};
var DESCRIPTORS$9 = descriptors;
var fails$9 = fails$e;
var createElement = documentCreateElement$1;
var ie8DomDefine = !DESCRIPTORS$9 && !fails$9(function() {
  return Object.defineProperty(createElement("div"), "a", {
    get: function() {
      return 7;
    }
  }).a != 7;
});
var DESCRIPTORS$8 = descriptors;
var call$2 = functionCall;
var propertyIsEnumerableModule = objectPropertyIsEnumerable;
var createPropertyDescriptor$1 = createPropertyDescriptor$2;
var toIndexedObject$3 = toIndexedObject$4;
var toPropertyKey$1 = toPropertyKey$2;
var hasOwn$7 = hasOwnProperty_1;
var IE8_DOM_DEFINE$1 = ie8DomDefine;
var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;
objectGetOwnPropertyDescriptor.f = DESCRIPTORS$8 ? $getOwnPropertyDescriptor$1 : function getOwnPropertyDescriptor(O2, P2) {
  O2 = toIndexedObject$3(O2);
  P2 = toPropertyKey$1(P2);
  if (IE8_DOM_DEFINE$1)
    try {
      return $getOwnPropertyDescriptor$1(O2, P2);
    } catch (error) {
    }
  if (hasOwn$7(O2, P2))
    return createPropertyDescriptor$1(!call$2(propertyIsEnumerableModule.f, O2, P2), O2[P2]);
};
var objectDefineProperty = {};
var DESCRIPTORS$7 = descriptors;
var fails$8 = fails$e;
var v8PrototypeDefineBug = DESCRIPTORS$7 && fails$8(function() {
  return Object.defineProperty(function() {
  }, "prototype", {
    value: 42,
    writable: false
  }).prototype != 42;
});
var isObject$3 = isObject$7;
var $String$2 = String;
var $TypeError$2 = TypeError;
var anObject$7 = function(argument) {
  if (isObject$3(argument))
    return argument;
  throw $TypeError$2($String$2(argument) + " is not an object");
};
var DESCRIPTORS$6 = descriptors;
var IE8_DOM_DEFINE = ie8DomDefine;
var V8_PROTOTYPE_DEFINE_BUG$1 = v8PrototypeDefineBug;
var anObject$6 = anObject$7;
var toPropertyKey = toPropertyKey$2;
var $TypeError$1 = TypeError;
var $defineProperty = Object.defineProperty;
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = "enumerable";
var CONFIGURABLE$1 = "configurable";
var WRITABLE = "writable";
objectDefineProperty.f = DESCRIPTORS$6 ? V8_PROTOTYPE_DEFINE_BUG$1 ? function defineProperty(O2, P2, Attributes) {
  anObject$6(O2);
  P2 = toPropertyKey(P2);
  anObject$6(Attributes);
  if (typeof O2 === "function" && P2 === "prototype" && "value" in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor(O2, P2);
    if (current && current[WRITABLE]) {
      O2[P2] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE$1 in Attributes ? Attributes[CONFIGURABLE$1] : current[CONFIGURABLE$1],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  }
  return $defineProperty(O2, P2, Attributes);
} : $defineProperty : function defineProperty2(O2, P2, Attributes) {
  anObject$6(O2);
  P2 = toPropertyKey(P2);
  anObject$6(Attributes);
  if (IE8_DOM_DEFINE)
    try {
      return $defineProperty(O2, P2, Attributes);
    } catch (error) {
    }
  if ("get" in Attributes || "set" in Attributes)
    throw $TypeError$1("Accessors not supported");
  if ("value" in Attributes)
    O2[P2] = Attributes.value;
  return O2;
};
var DESCRIPTORS$5 = descriptors;
var definePropertyModule$4 = objectDefineProperty;
var createPropertyDescriptor = createPropertyDescriptor$2;
var createNonEnumerableProperty$3 = DESCRIPTORS$5 ? function(object, key, value) {
  return definePropertyModule$4.f(object, key, createPropertyDescriptor(1, value));
} : function(object, key, value) {
  object[key] = value;
  return object;
};
var makeBuiltInExports = {};
var makeBuiltIn$2 = {
  get exports() {
    return makeBuiltInExports;
  },
  set exports(v) {
    makeBuiltInExports = v;
  }
};
var DESCRIPTORS$4 = descriptors;
var hasOwn$6 = hasOwnProperty_1;
var FunctionPrototype = Function.prototype;
var getDescriptor = DESCRIPTORS$4 && Object.getOwnPropertyDescriptor;
var EXISTS = hasOwn$6(FunctionPrototype, "name");
var PROPER = EXISTS && function something() {
}.name === "something";
var CONFIGURABLE = EXISTS && (!DESCRIPTORS$4 || DESCRIPTORS$4 && getDescriptor(FunctionPrototype, "name").configurable);
var functionName = {
  EXISTS,
  PROPER,
  CONFIGURABLE
};
var uncurryThis$5 = functionUncurryThis;
var isCallable$7 = isCallable$d;
var store$1 = sharedStore;
var functionToString = uncurryThis$5(Function.toString);
if (!isCallable$7(store$1.inspectSource)) {
  store$1.inspectSource = function(it2) {
    return functionToString(it2);
  };
}
var inspectSource$1 = store$1.inspectSource;
var global$7 = global$e;
var isCallable$6 = isCallable$d;
var WeakMap$2 = global$7.WeakMap;
var weakMapBasicDetection = isCallable$6(WeakMap$2) && /native code/.test(String(WeakMap$2));
var shared$2 = sharedExports;
var uid = uid$2;
var keys$1 = shared$2("keys");
var sharedKey$2 = function(key) {
  return keys$1[key] || (keys$1[key] = uid(key));
};
var hiddenKeys$4 = {};
var NATIVE_WEAK_MAP = weakMapBasicDetection;
var global$6 = global$e;
var isObject$2 = isObject$7;
var createNonEnumerableProperty$2 = createNonEnumerableProperty$3;
var hasOwn$5 = hasOwnProperty_1;
var shared$1 = sharedStore;
var sharedKey$1 = sharedKey$2;
var hiddenKeys$3 = hiddenKeys$4;
var OBJECT_ALREADY_INITIALIZED = "Object already initialized";
var TypeError$1 = global$6.TypeError;
var WeakMap$1 = global$6.WeakMap;
var set, get, has;
var enforce = function(it2) {
  return has(it2) ? get(it2) : set(it2, {});
};
var getterFor = function(TYPE) {
  return function(it2) {
    var state;
    if (!isObject$2(it2) || (state = get(it2)).type !== TYPE) {
      throw TypeError$1("Incompatible receiver, " + TYPE + " required");
    }
    return state;
  };
};
if (NATIVE_WEAK_MAP || shared$1.state) {
  var store = shared$1.state || (shared$1.state = new WeakMap$1());
  store.get = store.get;
  store.has = store.has;
  store.set = store.set;
  set = function(it2, metadata) {
    if (store.has(it2))
      throw TypeError$1(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it2;
    store.set(it2, metadata);
    return metadata;
  };
  get = function(it2) {
    return store.get(it2) || {};
  };
  has = function(it2) {
    return store.has(it2);
  };
} else {
  var STATE = sharedKey$1("state");
  hiddenKeys$3[STATE] = true;
  set = function(it2, metadata) {
    if (hasOwn$5(it2, STATE))
      throw TypeError$1(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it2;
    createNonEnumerableProperty$2(it2, STATE, metadata);
    return metadata;
  };
  get = function(it2) {
    return hasOwn$5(it2, STATE) ? it2[STATE] : {};
  };
  has = function(it2) {
    return hasOwn$5(it2, STATE);
  };
}
var internalState = {
  set,
  get,
  has,
  enforce,
  getterFor
};
var fails$7 = fails$e;
var isCallable$5 = isCallable$d;
var hasOwn$4 = hasOwnProperty_1;
var DESCRIPTORS$3 = descriptors;
var CONFIGURABLE_FUNCTION_NAME = functionName.CONFIGURABLE;
var inspectSource = inspectSource$1;
var InternalStateModule = internalState;
var enforceInternalState$1 = InternalStateModule.enforce;
var getInternalState$1 = InternalStateModule.get;
var defineProperty$1 = Object.defineProperty;
var CONFIGURABLE_LENGTH = DESCRIPTORS$3 && !fails$7(function() {
  return defineProperty$1(function() {
  }, "length", { value: 8 }).length !== 8;
});
var TEMPLATE = String(String).split("String");
var makeBuiltIn$1 = makeBuiltIn$2.exports = function(value, name2, options) {
  if (String(name2).slice(0, 7) === "Symbol(") {
    name2 = "[" + String(name2).replace(/^Symbol\(([^)]*)\)/, "$1") + "]";
  }
  if (options && options.getter)
    name2 = "get " + name2;
  if (options && options.setter)
    name2 = "set " + name2;
  if (!hasOwn$4(value, "name") || CONFIGURABLE_FUNCTION_NAME && value.name !== name2) {
    if (DESCRIPTORS$3)
      defineProperty$1(value, "name", { value: name2, configurable: true });
    else
      value.name = name2;
  }
  if (CONFIGURABLE_LENGTH && options && hasOwn$4(options, "arity") && value.length !== options.arity) {
    defineProperty$1(value, "length", { value: options.arity });
  }
  try {
    if (options && hasOwn$4(options, "constructor") && options.constructor) {
      if (DESCRIPTORS$3)
        defineProperty$1(value, "prototype", { writable: false });
    } else if (value.prototype)
      value.prototype = void 0;
  } catch (error) {
  }
  var state = enforceInternalState$1(value);
  if (!hasOwn$4(state, "source")) {
    state.source = TEMPLATE.join(typeof name2 == "string" ? name2 : "");
  }
  return value;
};
Function.prototype.toString = makeBuiltIn$1(function toString2() {
  return isCallable$5(this) && getInternalState$1(this).source || inspectSource(this);
}, "toString");
var isCallable$4 = isCallable$d;
var definePropertyModule$3 = objectDefineProperty;
var makeBuiltIn = makeBuiltInExports;
var defineGlobalProperty$1 = defineGlobalProperty$3;
var defineBuiltIn$4 = function(O2, key, value, options) {
  if (!options)
    options = {};
  var simple = options.enumerable;
  var name2 = options.name !== void 0 ? options.name : key;
  if (isCallable$4(value))
    makeBuiltIn(value, name2, options);
  if (options.global) {
    if (simple)
      O2[key] = value;
    else
      defineGlobalProperty$1(key, value);
  } else {
    try {
      if (!options.unsafe)
        delete O2[key];
      else if (O2[key])
        simple = true;
    } catch (error) {
    }
    if (simple)
      O2[key] = value;
    else
      definePropertyModule$3.f(O2, key, {
        value,
        enumerable: false,
        configurable: !options.nonConfigurable,
        writable: !options.nonWritable
      });
  }
  return O2;
};
var objectGetOwnPropertyNames = {};
var ceil = Math.ceil;
var floor = Math.floor;
var mathTrunc = Math.trunc || function trunc(x2) {
  var n2 = +x2;
  return (n2 > 0 ? floor : ceil)(n2);
};
var trunc2 = mathTrunc;
var toIntegerOrInfinity$2 = function(argument) {
  var number2 = +argument;
  return number2 !== number2 || number2 === 0 ? 0 : trunc2(number2);
};
var toIntegerOrInfinity$1 = toIntegerOrInfinity$2;
var max = Math.max;
var min$1 = Math.min;
var toAbsoluteIndex$1 = function(index, length) {
  var integer = toIntegerOrInfinity$1(index);
  return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
};
var toIntegerOrInfinity = toIntegerOrInfinity$2;
var min = Math.min;
var toLength$1 = function(argument) {
  return argument > 0 ? min(toIntegerOrInfinity(argument), 9007199254740991) : 0;
};
var toLength = toLength$1;
var lengthOfArrayLike$1 = function(obj) {
  return toLength(obj.length);
};
var toIndexedObject$2 = toIndexedObject$4;
var toAbsoluteIndex = toAbsoluteIndex$1;
var lengthOfArrayLike = lengthOfArrayLike$1;
var createMethod = function(IS_INCLUDES) {
  return function($this, el, fromIndex) {
    var O2 = toIndexedObject$2($this);
    var length = lengthOfArrayLike(O2);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    if (IS_INCLUDES && el != el)
      while (length > index) {
        value = O2[index++];
        if (value != value)
          return true;
      }
    else
      for (; length > index; index++) {
        if ((IS_INCLUDES || index in O2) && O2[index] === el)
          return IS_INCLUDES || index || 0;
      }
    return !IS_INCLUDES && -1;
  };
};
var arrayIncludes = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};
var uncurryThis$4 = functionUncurryThis;
var hasOwn$3 = hasOwnProperty_1;
var toIndexedObject$1 = toIndexedObject$4;
var indexOf$1 = arrayIncludes.indexOf;
var hiddenKeys$2 = hiddenKeys$4;
var push = uncurryThis$4([].push);
var objectKeysInternal = function(object, names) {
  var O2 = toIndexedObject$1(object);
  var i2 = 0;
  var result = [];
  var key;
  for (key in O2)
    !hasOwn$3(hiddenKeys$2, key) && hasOwn$3(O2, key) && push(result, key);
  while (names.length > i2)
    if (hasOwn$3(O2, key = names[i2++])) {
      ~indexOf$1(result, key) || push(result, key);
    }
  return result;
};
var enumBugKeys$3 = [
  "constructor",
  "hasOwnProperty",
  "isPrototypeOf",
  "propertyIsEnumerable",
  "toLocaleString",
  "toString",
  "valueOf"
];
var internalObjectKeys$1 = objectKeysInternal;
var enumBugKeys$2 = enumBugKeys$3;
var hiddenKeys$1 = enumBugKeys$2.concat("length", "prototype");
objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O2) {
  return internalObjectKeys$1(O2, hiddenKeys$1);
};
var objectGetOwnPropertySymbols = {};
objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;
var getBuiltIn$2 = getBuiltIn$5;
var uncurryThis$3 = functionUncurryThis;
var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
var anObject$5 = anObject$7;
var concat = uncurryThis$3([].concat);
var ownKeys$1 = getBuiltIn$2("Reflect", "ownKeys") || function ownKeys(it2) {
  var keys3 = getOwnPropertyNamesModule.f(anObject$5(it2));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat(keys3, getOwnPropertySymbols(it2)) : keys3;
};
var hasOwn$2 = hasOwnProperty_1;
var ownKeys2 = ownKeys$1;
var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
var definePropertyModule$2 = objectDefineProperty;
var copyConstructorProperties$1 = function(target, source, exceptions) {
  var keys3 = ownKeys2(source);
  var defineProperty4 = definePropertyModule$2.f;
  var getOwnPropertyDescriptor3 = getOwnPropertyDescriptorModule.f;
  for (var i2 = 0; i2 < keys3.length; i2++) {
    var key = keys3[i2];
    if (!hasOwn$2(target, key) && !(exceptions && hasOwn$2(exceptions, key))) {
      defineProperty4(target, key, getOwnPropertyDescriptor3(source, key));
    }
  }
};
var fails$6 = fails$e;
var isCallable$3 = isCallable$d;
var replacement = /#|\.prototype\./;
var isForced$2 = function(feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true : value == NATIVE ? false : isCallable$3(detection) ? fails$6(detection) : !!detection;
};
var normalize = isForced$2.normalize = function(string) {
  return String(string).replace(replacement, ".").toLowerCase();
};
var data = isForced$2.data = {};
var NATIVE = isForced$2.NATIVE = "N";
var POLYFILL = isForced$2.POLYFILL = "P";
var isForced_1 = isForced$2;
var global$5 = global$e;
var getOwnPropertyDescriptor2 = objectGetOwnPropertyDescriptor.f;
var createNonEnumerableProperty$1 = createNonEnumerableProperty$3;
var defineBuiltIn$3 = defineBuiltIn$4;
var defineGlobalProperty = defineGlobalProperty$3;
var copyConstructorProperties = copyConstructorProperties$1;
var isForced$1 = isForced_1;
var _export = function(options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global$5;
  } else if (STATIC) {
    target = global$5[TARGET] || defineGlobalProperty(TARGET, {});
  } else {
    target = (global$5[TARGET] || {}).prototype;
  }
  if (target)
    for (key in source) {
      sourceProperty = source[key];
      if (options.dontCallGetSet) {
        descriptor = getOwnPropertyDescriptor2(target, key);
        targetProperty = descriptor && descriptor.value;
      } else
        targetProperty = target[key];
      FORCED = isForced$1(GLOBAL ? key : TARGET + (STATIC ? "." : "#") + key, options.forced);
      if (!FORCED && targetProperty !== void 0) {
        if (typeof sourceProperty == typeof targetProperty)
          continue;
        copyConstructorProperties(sourceProperty, targetProperty);
      }
      if (options.sham || targetProperty && targetProperty.sham) {
        createNonEnumerableProperty$1(sourceProperty, "sham", true);
      }
      defineBuiltIn$3(target, key, sourceProperty, options);
    }
};
var internalObjectKeys = objectKeysInternal;
var enumBugKeys$1 = enumBugKeys$3;
var objectKeys$1 = Object.keys || function keys(O2) {
  return internalObjectKeys(O2, enumBugKeys$1);
};
var $$2 = _export;
var toObject = toObject$2;
var nativeKeys = objectKeys$1;
var fails$5 = fails$e;
var FAILS_ON_PRIMITIVES = fails$5(function() {
  nativeKeys(1);
});
$$2({ target: "Object", stat: true, forced: FAILS_ON_PRIMITIVES }, {
  keys: function keys2(it2) {
    return nativeKeys(toObject(it2));
  }
});
var wellKnownSymbol$4 = wellKnownSymbol$6;
var TO_STRING_TAG$1 = wellKnownSymbol$4("toStringTag");
var test = {};
test[TO_STRING_TAG$1] = "z";
var toStringTagSupport = String(test) === "[object z]";
var TO_STRING_TAG_SUPPORT$2 = toStringTagSupport;
var isCallable$2 = isCallable$d;
var classofRaw = classofRaw$1;
var wellKnownSymbol$3 = wellKnownSymbol$6;
var TO_STRING_TAG = wellKnownSymbol$3("toStringTag");
var $Object = Object;
var CORRECT_ARGUMENTS = classofRaw(function() {
  return arguments;
}()) == "Arguments";
var tryGet = function(it2, key) {
  try {
    return it2[key];
  } catch (error) {
  }
};
var classof$3 = TO_STRING_TAG_SUPPORT$2 ? classofRaw : function(it2) {
  var O2, tag, result;
  return it2 === void 0 ? "Undefined" : it2 === null ? "Null" : typeof (tag = tryGet(O2 = $Object(it2), TO_STRING_TAG)) == "string" ? tag : CORRECT_ARGUMENTS ? classofRaw(O2) : (result = classofRaw(O2)) == "Object" && isCallable$2(O2.callee) ? "Arguments" : result;
};
var TO_STRING_TAG_SUPPORT$1 = toStringTagSupport;
var classof$2 = classof$3;
var objectToString = TO_STRING_TAG_SUPPORT$1 ? {}.toString : function toString3() {
  return "[object " + classof$2(this) + "]";
};
var TO_STRING_TAG_SUPPORT = toStringTagSupport;
var defineBuiltIn$2 = defineBuiltIn$4;
var toString$4 = objectToString;
if (!TO_STRING_TAG_SUPPORT) {
  defineBuiltIn$2(Object.prototype, "toString", toString$4, { unsafe: true });
}
var isCallable$1 = isCallable$d;
var $String$1 = String;
var $TypeError = TypeError;
var aPossiblePrototype$1 = function(argument) {
  if (typeof argument == "object" || isCallable$1(argument))
    return argument;
  throw $TypeError("Can't set " + $String$1(argument) + " as a prototype");
};
var uncurryThis$2 = functionUncurryThis;
var anObject$4 = anObject$7;
var aPossiblePrototype = aPossiblePrototype$1;
var objectSetPrototypeOf = Object.setPrototypeOf || ("__proto__" in {} ? function() {
  var CORRECT_SETTER = false;
  var test2 = {};
  var setter;
  try {
    setter = uncurryThis$2(Object.getOwnPropertyDescriptor(Object.prototype, "__proto__").set);
    setter(test2, []);
    CORRECT_SETTER = test2 instanceof Array;
  } catch (error) {
  }
  return function setPrototypeOf2(O2, proto) {
    anObject$4(O2);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER)
      setter(O2, proto);
    else
      O2.__proto__ = proto;
    return O2;
  };
}() : void 0);
var isCallable = isCallable$d;
var isObject$1 = isObject$7;
var setPrototypeOf = objectSetPrototypeOf;
var inheritIfRequired$1 = function($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (// it can work only with native `setPrototypeOf`
  setPrototypeOf && // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
  isCallable(NewTarget = dummy.constructor) && NewTarget !== Wrapper && isObject$1(NewTargetPrototype = NewTarget.prototype) && NewTargetPrototype !== Wrapper.prototype)
    setPrototypeOf($this, NewTargetPrototype);
  return $this;
};
var isObject = isObject$7;
var classof$1 = classofRaw$1;
var wellKnownSymbol$2 = wellKnownSymbol$6;
var MATCH$1 = wellKnownSymbol$2("match");
var isRegexp = function(it2) {
  var isRegExp2;
  return isObject(it2) && ((isRegExp2 = it2[MATCH$1]) !== void 0 ? !!isRegExp2 : classof$1(it2) == "RegExp");
};
var classof = classof$3;
var $String = String;
var toString$3 = function(argument) {
  if (classof(argument) === "Symbol")
    throw TypeError("Cannot convert a Symbol value to a string");
  return $String(argument);
};
var anObject$3 = anObject$7;
var regexpFlags$1 = function() {
  var that = anObject$3(this);
  var result = "";
  if (that.hasIndices)
    result += "d";
  if (that.global)
    result += "g";
  if (that.ignoreCase)
    result += "i";
  if (that.multiline)
    result += "m";
  if (that.dotAll)
    result += "s";
  if (that.unicode)
    result += "u";
  if (that.unicodeSets)
    result += "v";
  if (that.sticky)
    result += "y";
  return result;
};
var call$1 = functionCall;
var hasOwn$1 = hasOwnProperty_1;
var isPrototypeOf$1 = objectIsPrototypeOf;
var regExpFlags = regexpFlags$1;
var RegExpPrototype$2 = RegExp.prototype;
var regexpGetFlags = function(R2) {
  var flags = R2.flags;
  return flags === void 0 && !("flags" in RegExpPrototype$2) && !hasOwn$1(R2, "flags") && isPrototypeOf$1(RegExpPrototype$2, R2) ? call$1(regExpFlags, R2) : flags;
};
var fails$4 = fails$e;
var global$4 = global$e;
var $RegExp$2 = global$4.RegExp;
var UNSUPPORTED_Y$2 = fails$4(function() {
  var re3 = $RegExp$2("a", "y");
  re3.lastIndex = 2;
  return re3.exec("abcd") != null;
});
var MISSED_STICKY$1 = UNSUPPORTED_Y$2 || fails$4(function() {
  return !$RegExp$2("a", "y").sticky;
});
var BROKEN_CARET = UNSUPPORTED_Y$2 || fails$4(function() {
  var re3 = $RegExp$2("^r", "gy");
  re3.lastIndex = 2;
  return re3.exec("str") != null;
});
var regexpStickyHelpers = {
  BROKEN_CARET,
  MISSED_STICKY: MISSED_STICKY$1,
  UNSUPPORTED_Y: UNSUPPORTED_Y$2
};
var defineProperty3 = objectDefineProperty.f;
var proxyAccessor$1 = function(Target, Source, key) {
  key in Target || defineProperty3(Target, key, {
    configurable: true,
    get: function() {
      return Source[key];
    },
    set: function(it2) {
      Source[key] = it2;
    }
  });
};
var getBuiltIn$1 = getBuiltIn$5;
var definePropertyModule$1 = objectDefineProperty;
var wellKnownSymbol$1 = wellKnownSymbol$6;
var DESCRIPTORS$2 = descriptors;
var SPECIES = wellKnownSymbol$1("species");
var setSpecies$1 = function(CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn$1(CONSTRUCTOR_NAME);
  var defineProperty4 = definePropertyModule$1.f;
  if (DESCRIPTORS$2 && Constructor && !Constructor[SPECIES]) {
    defineProperty4(Constructor, SPECIES, {
      configurable: true,
      get: function() {
        return this;
      }
    });
  }
};
var fails$3 = fails$e;
var global$3 = global$e;
var $RegExp$1 = global$3.RegExp;
var regexpUnsupportedDotAll = fails$3(function() {
  var re3 = $RegExp$1(".", "s");
  return !(re3.dotAll && re3.exec("\n") && re3.flags === "s");
});
var fails$2 = fails$e;
var global$2 = global$e;
var $RegExp = global$2.RegExp;
var regexpUnsupportedNcg = fails$2(function() {
  var re3 = $RegExp("(?<a>b)", "g");
  return re3.exec("b").groups.a !== "b" || "b".replace(re3, "$<a>c") !== "bc";
});
var DESCRIPTORS$1 = descriptors;
var global$1 = global$e;
var uncurryThis$1 = functionUncurryThis;
var isForced = isForced_1;
var inheritIfRequired = inheritIfRequired$1;
var createNonEnumerableProperty = createNonEnumerableProperty$3;
var getOwnPropertyNames2 = objectGetOwnPropertyNames.f;
var isPrototypeOf = objectIsPrototypeOf;
var isRegExp = isRegexp;
var toString$2 = toString$3;
var getRegExpFlags$1 = regexpGetFlags;
var stickyHelpers$1 = regexpStickyHelpers;
var proxyAccessor = proxyAccessor$1;
var defineBuiltIn$1 = defineBuiltIn$4;
var fails$1 = fails$e;
var hasOwn2 = hasOwnProperty_1;
var enforceInternalState = internalState.enforce;
var setSpecies = setSpecies$1;
var wellKnownSymbol = wellKnownSymbol$6;
var UNSUPPORTED_DOT_ALL$1 = regexpUnsupportedDotAll;
var UNSUPPORTED_NCG$1 = regexpUnsupportedNcg;
var MATCH = wellKnownSymbol("match");
var NativeRegExp = global$1.RegExp;
var RegExpPrototype$1 = NativeRegExp.prototype;
var SyntaxError$1 = global$1.SyntaxError;
var exec$1 = uncurryThis$1(RegExpPrototype$1.exec);
var charAt$1 = uncurryThis$1("".charAt);
var replace$1 = uncurryThis$1("".replace);
var stringIndexOf = uncurryThis$1("".indexOf);
var stringSlice$1 = uncurryThis$1("".slice);
var IS_NCG = /^\?<[^\s\d!#%&*+<=>@^][^\s!#%&*+<=>@^]*>/;
var re1 = /a/g;
var re2 = /a/g;
var CORRECT_NEW = new NativeRegExp(re1) !== re1;
var MISSED_STICKY = stickyHelpers$1.MISSED_STICKY;
var UNSUPPORTED_Y$1 = stickyHelpers$1.UNSUPPORTED_Y;
var BASE_FORCED = DESCRIPTORS$1 && (!CORRECT_NEW || MISSED_STICKY || UNSUPPORTED_DOT_ALL$1 || UNSUPPORTED_NCG$1 || fails$1(function() {
  re2[MATCH] = false;
  return NativeRegExp(re1) != re1 || NativeRegExp(re2) == re2 || NativeRegExp(re1, "i") != "/a/i";
}));
var handleDotAll = function(string) {
  var length = string.length;
  var index = 0;
  var result = "";
  var brackets = false;
  var chr;
  for (; index <= length; index++) {
    chr = charAt$1(string, index);
    if (chr === "\\") {
      result += chr + charAt$1(string, ++index);
      continue;
    }
    if (!brackets && chr === ".") {
      result += "[\\s\\S]";
    } else {
      if (chr === "[") {
        brackets = true;
      } else if (chr === "]") {
        brackets = false;
      }
      result += chr;
    }
  }
  return result;
};
var handleNCG = function(string) {
  var length = string.length;
  var index = 0;
  var result = "";
  var named = [];
  var names = {};
  var brackets = false;
  var ncg = false;
  var groupid = 0;
  var groupname = "";
  var chr;
  for (; index <= length; index++) {
    chr = charAt$1(string, index);
    if (chr === "\\") {
      chr = chr + charAt$1(string, ++index);
    } else if (chr === "]") {
      brackets = false;
    } else if (!brackets)
      switch (true) {
        case chr === "[":
          brackets = true;
          break;
        case chr === "(":
          if (exec$1(IS_NCG, stringSlice$1(string, index + 1))) {
            index += 2;
            ncg = true;
          }
          result += chr;
          groupid++;
          continue;
        case (chr === ">" && ncg):
          if (groupname === "" || hasOwn2(names, groupname)) {
            throw new SyntaxError$1("Invalid capture group name");
          }
          names[groupname] = true;
          named[named.length] = [groupname, groupid];
          ncg = false;
          groupname = "";
          continue;
      }
    if (ncg)
      groupname += chr;
    else
      result += chr;
  }
  return [result, named];
};
if (isForced("RegExp", BASE_FORCED)) {
  var RegExpWrapper = function RegExp2(pattern, flags) {
    var thisIsRegExp = isPrototypeOf(RegExpPrototype$1, this);
    var patternIsRegExp = isRegExp(pattern);
    var flagsAreUndefined = flags === void 0;
    var groups = [];
    var rawPattern = pattern;
    var rawFlags, dotAll, sticky, handled, result, state;
    if (!thisIsRegExp && patternIsRegExp && flagsAreUndefined && pattern.constructor === RegExpWrapper) {
      return pattern;
    }
    if (patternIsRegExp || isPrototypeOf(RegExpPrototype$1, pattern)) {
      pattern = pattern.source;
      if (flagsAreUndefined)
        flags = getRegExpFlags$1(rawPattern);
    }
    pattern = pattern === void 0 ? "" : toString$2(pattern);
    flags = flags === void 0 ? "" : toString$2(flags);
    rawPattern = pattern;
    if (UNSUPPORTED_DOT_ALL$1 && "dotAll" in re1) {
      dotAll = !!flags && stringIndexOf(flags, "s") > -1;
      if (dotAll)
        flags = replace$1(flags, /s/g, "");
    }
    rawFlags = flags;
    if (MISSED_STICKY && "sticky" in re1) {
      sticky = !!flags && stringIndexOf(flags, "y") > -1;
      if (sticky && UNSUPPORTED_Y$1)
        flags = replace$1(flags, /y/g, "");
    }
    if (UNSUPPORTED_NCG$1) {
      handled = handleNCG(pattern);
      pattern = handled[0];
      groups = handled[1];
    }
    result = inheritIfRequired(NativeRegExp(pattern, flags), thisIsRegExp ? this : RegExpPrototype$1, RegExpWrapper);
    if (dotAll || sticky || groups.length) {
      state = enforceInternalState(result);
      if (dotAll) {
        state.dotAll = true;
        state.raw = RegExpWrapper(handleDotAll(pattern), rawFlags);
      }
      if (sticky)
        state.sticky = true;
      if (groups.length)
        state.groups = groups;
    }
    if (pattern !== rawPattern)
      try {
        createNonEnumerableProperty(result, "source", rawPattern === "" ? "(?:)" : rawPattern);
      } catch (error) {
      }
    return result;
  };
  for (var keys3 = getOwnPropertyNames2(NativeRegExp), index = 0; keys3.length > index; ) {
    proxyAccessor(RegExpWrapper, NativeRegExp, keys3[index++]);
  }
  RegExpPrototype$1.constructor = RegExpWrapper;
  RegExpWrapper.prototype = RegExpPrototype$1;
  defineBuiltIn$1(global$1, "RegExp", RegExpWrapper, { constructor: true });
}
setSpecies("RegExp");
var objectDefineProperties = {};
var DESCRIPTORS = descriptors;
var V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug;
var definePropertyModule = objectDefineProperty;
var anObject$2 = anObject$7;
var toIndexedObject = toIndexedObject$4;
var objectKeys = objectKeys$1;
objectDefineProperties.f = DESCRIPTORS && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O2, Properties) {
  anObject$2(O2);
  var props = toIndexedObject(Properties);
  var keys3 = objectKeys(Properties);
  var length = keys3.length;
  var index = 0;
  var key;
  while (length > index)
    definePropertyModule.f(O2, key = keys3[index++], props[key]);
  return O2;
};
var getBuiltIn = getBuiltIn$5;
var html$1 = getBuiltIn("document", "documentElement");
var anObject$1 = anObject$7;
var definePropertiesModule = objectDefineProperties;
var enumBugKeys = enumBugKeys$3;
var hiddenKeys = hiddenKeys$4;
var html = html$1;
var documentCreateElement = documentCreateElement$1;
var sharedKey = sharedKey$2;
var GT = ">";
var LT = "<";
var PROTOTYPE = "prototype";
var SCRIPT = "script";
var IE_PROTO = sharedKey("IE_PROTO");
var EmptyConstructor = function() {
};
var scriptTag = function(content) {
  return LT + SCRIPT + GT + content + LT + "/" + SCRIPT + GT;
};
var NullProtoObjectViaActiveX = function(activeXDocument2) {
  activeXDocument2.write(scriptTag(""));
  activeXDocument2.close();
  var temp = activeXDocument2.parentWindow.Object;
  activeXDocument2 = null;
  return temp;
};
var NullProtoObjectViaIFrame = function() {
  var iframe = documentCreateElement("iframe");
  var JS = "java" + SCRIPT + ":";
  var iframeDocument;
  iframe.style.display = "none";
  html.appendChild(iframe);
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag("document.F=Object"));
  iframeDocument.close();
  return iframeDocument.F;
};
var activeXDocument;
var NullProtoObject = function() {
  try {
    activeXDocument = new ActiveXObject("htmlfile");
  } catch (error) {
  }
  NullProtoObject = typeof document != "undefined" ? document.domain && activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame() : NullProtoObjectViaActiveX(activeXDocument);
  var length = enumBugKeys.length;
  while (length--)
    delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};
hiddenKeys[IE_PROTO] = true;
var objectCreate = Object.create || function create(O2, Properties) {
  var result;
  if (O2 !== null) {
    EmptyConstructor[PROTOTYPE] = anObject$1(O2);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    result[IE_PROTO] = O2;
  } else
    result = NullProtoObject();
  return Properties === void 0 ? result : definePropertiesModule.f(result, Properties);
};
var call = functionCall;
var uncurryThis = functionUncurryThis;
var toString$1 = toString$3;
var regexpFlags = regexpFlags$1;
var stickyHelpers = regexpStickyHelpers;
var shared = sharedExports;
var create2 = objectCreate;
var getInternalState = internalState.get;
var UNSUPPORTED_DOT_ALL = regexpUnsupportedDotAll;
var UNSUPPORTED_NCG = regexpUnsupportedNcg;
var nativeReplace = shared("native-string-replace", String.prototype.replace);
var nativeExec = RegExp.prototype.exec;
var patchedExec = nativeExec;
var charAt = uncurryThis("".charAt);
var indexOf = uncurryThis("".indexOf);
var replace = uncurryThis("".replace);
var stringSlice = uncurryThis("".slice);
var UPDATES_LAST_INDEX_WRONG = function() {
  var re12 = /a/;
  var re22 = /b*/g;
  call(nativeExec, re12, "a");
  call(nativeExec, re22, "a");
  return re12.lastIndex !== 0 || re22.lastIndex !== 0;
}();
var UNSUPPORTED_Y = stickyHelpers.BROKEN_CARET;
var NPCG_INCLUDED = /()??/.exec("")[1] !== void 0;
var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG;
if (PATCH) {
  patchedExec = function exec2(string) {
    var re3 = this;
    var state = getInternalState(re3);
    var str = toString$1(string);
    var raw = state.raw;
    var result, reCopy, lastIndex, match2, i2, object, group;
    if (raw) {
      raw.lastIndex = re3.lastIndex;
      result = call(patchedExec, raw, str);
      re3.lastIndex = raw.lastIndex;
      return result;
    }
    var groups = state.groups;
    var sticky = UNSUPPORTED_Y && re3.sticky;
    var flags = call(regexpFlags, re3);
    var source = re3.source;
    var charsAdded = 0;
    var strCopy = str;
    if (sticky) {
      flags = replace(flags, "y", "");
      if (indexOf(flags, "g") === -1) {
        flags += "g";
      }
      strCopy = stringSlice(str, re3.lastIndex);
      if (re3.lastIndex > 0 && (!re3.multiline || re3.multiline && charAt(str, re3.lastIndex - 1) !== "\n")) {
        source = "(?: " + source + ")";
        strCopy = " " + strCopy;
        charsAdded++;
      }
      reCopy = new RegExp("^(?:" + source + ")", flags);
    }
    if (NPCG_INCLUDED) {
      reCopy = new RegExp("^" + source + "$(?!\\s)", flags);
    }
    if (UPDATES_LAST_INDEX_WRONG)
      lastIndex = re3.lastIndex;
    match2 = call(nativeExec, sticky ? reCopy : re3, strCopy);
    if (sticky) {
      if (match2) {
        match2.input = stringSlice(match2.input, charsAdded);
        match2[0] = stringSlice(match2[0], charsAdded);
        match2.index = re3.lastIndex;
        re3.lastIndex += match2[0].length;
      } else
        re3.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match2) {
      re3.lastIndex = re3.global ? match2.index + match2[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match2 && match2.length > 1) {
      call(nativeReplace, match2[0], reCopy, function() {
        for (i2 = 1; i2 < arguments.length - 2; i2++) {
          if (arguments[i2] === void 0)
            match2[i2] = void 0;
        }
      });
    }
    if (match2 && groups) {
      match2.groups = object = create2(null);
      for (i2 = 0; i2 < groups.length; i2++) {
        group = groups[i2];
        object[group[0]] = match2[group[1]];
      }
    }
    return match2;
  };
}
var regexpExec = patchedExec;
var $$1 = _export;
var exec = regexpExec;
$$1({ target: "RegExp", proto: true, forced: /./.exec !== exec }, {
  exec
});
var PROPER_FUNCTION_NAME = functionName.PROPER;
var defineBuiltIn = defineBuiltIn$4;
var anObject = anObject$7;
var $toString = toString$3;
var fails = fails$e;
var getRegExpFlags = regexpGetFlags;
var TO_STRING = "toString";
var RegExpPrototype = RegExp.prototype;
var nativeToString = RegExpPrototype[TO_STRING];
var NOT_GENERIC = fails(function() {
  return nativeToString.call({ source: "a", flags: "b" }) != "/a/b";
});
var INCORRECT_NAME = PROPER_FUNCTION_NAME && nativeToString.name != TO_STRING;
if (NOT_GENERIC || INCORRECT_NAME) {
  defineBuiltIn(RegExp.prototype, TO_STRING, function toString4() {
    var R2 = anObject(this);
    var pattern = $toString(R2.source);
    var flags = $toString(getRegExpFlags(R2));
    return "/" + pattern + "/" + flags;
  }, { unsafe: true });
}
function _typeof(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof2(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof = function _typeof2(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof(obj);
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i2 = 0; i2 < props.length; i2++) {
    var descriptor = props[i2];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties(Constructor, staticProps);
  return Constructor;
}
var StorageClass = function() {
  function StorageClass2() {
    var storage = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : window.localStorage;
    _classCallCheck(this, StorageClass2);
    this.storage = window.localStorage;
    this.namespace = "pro_";
    this.storage = storage;
  }
  _createClass(StorageClass2, [{
    key: "config",
    value: function config(namespace) {
      if (namespace === false) {
        this.namespace = "";
        return;
      }
      if (namespace) {
        this.namespace = namespace;
      }
    }
  }, {
    key: "clearStorage",
    value: function clearStorage(option) {
      var res = {
        errMsg: "clearStorage:ok"
      };
      if (option) {
        var success = option.success, fail = option.fail, complete = option.complete;
        try {
          this.clearStorageSync();
          success && success(res);
          complete && complete(res);
        } catch (_unused) {
          var _res = {
            errMsg: "clearStorage:fail"
          };
          fail && fail(_res);
          complete && complete(_res);
          return Promise.reject(_res);
        }
      }
      return Promise.resolve(res);
    }
  }, {
    key: "clearStorageSync",
    value: function clearStorageSync() {
      var removedKeys = [];
      for (var i2 = 0; i2 < this.storage.length; i2++) {
        var key = this.storage.key(i2);
        if (!key) {
          continue;
        }
        var regexp = new RegExp("^".concat(this.namespace, ".+"), "i");
        if (!regexp.test(key)) {
          continue;
        }
        removedKeys.push(key);
      }
      for (var _key in removedKeys) {
        this.storage.removeItem(removedKeys[_key]);
      }
    }
  }, {
    key: "getStorage",
    value: function getStorage(option) {
      var key = option.key, success = option.success, fail = option.fail, complete = option.complete;
      var res = {
        errMsg: "getStorage:ok"
      };
      var successRes = {
        errMsg: "getStorage:ok",
        data: ""
      };
      var _this$getItem = this.getItem(key), result = _this$getItem.result, data2 = _this$getItem.data;
      if (result) {
        var val = data2;
        successRes.data = val.value;
      } else {
        res.errMsg = "getStorage:fail data not found";
        fail && fail(res);
        complete && complete(res);
        return Promise.reject(res);
      }
      success && success(successRes);
      complete && complete(successRes);
      return Promise.resolve(successRes);
    }
  }, {
    key: "getStorageInfo",
    value: function getStorageInfo(option) {
      var res = {
        errMsg: "getStorageInfo:ok"
      };
      if (option) {
        var success = option.success, complete = option.complete, fail = option.fail;
        try {
          var info = this.getStorageInfoSync();
          success && success(info);
          complete && complete(res);
        } catch (_unused2) {
          fail && fail(res);
          complete && complete(res);
        }
      }
      return Promise.resolve(res);
    }
  }, {
    key: "getStorageInfoSync",
    value: function getStorageInfoSync() {
      return {
        keys: Object.keys(this.storage),
        limitSize: 0,
        currentSize: 0,
        keysLength: this.storage.length
      };
    }
  }, {
    key: "hasKey",
    value: function hasKey(key) {
      var res = this.getItem(key);
      return res.result;
    }
  }, {
    key: "isExpire",
    value: function isExpire(key) {
      var res = this.getItem(key);
      if (res.result) {
        var data2 = res.data;
        if (data2.expire === null) {
          return false;
        }
        return data2.expire < new Date().getTime();
      }
      return false;
    }
  }, {
    key: "key",
    value: function key(index) {
      return this.storage.key(index);
    }
  }, {
    key: "removeStorage",
    value: function removeStorage(option) {
      var key = option.key, success = option.success, fail = option.fail, complete = option.complete;
      var res = {
        errMsg: "removeStorage:ok"
      };
      if (!this.hasKey(key)) {
        res.errMsg = "key ".concat(key, " not exists !");
        fail && fail(res);
        complete && complete(res);
        return Promise.reject(res);
      }
      this.removeStorageSync(key);
      success && success(res);
      complete && complete(res);
      return Promise.resolve(res);
    }
  }, {
    key: "removeStorageSync",
    value: function removeStorageSync(key) {
      return this.storage.removeItem(this.getItemKey(key));
    }
  }, {
    key: "setStorage",
    value: function setStorage(option) {
      var key = option.key, data2 = option.data, success = option.success, fail = option.fail, complete = option.complete;
      var res = {
        errMsg: "setStorage:ok"
      };
      try {
        this.setStorageSync(key, data2);
        if (this.hasKey(key)) {
          success && success(res);
          complete && complete(res);
          return Promise.resolve(res);
        } else {
          res.errMsg = "key ".concat(key, " setStorage2:fail");
          fail && fail(res);
          complete && complete(res);
          return Promise.reject(res);
        }
      } catch (e2) {
        res.errMsg = "key ".concat(key, " setStorage:fail");
        fail && fail(res);
        complete && complete(res);
        return Promise.reject(res);
      }
    }
  }, {
    key: "setStorageSync",
    value: function setStorageSync(key, data2, expire) {
      var storeData = {
        value: data2,
        expire: expire ? new Date().getTime() + expire : null
      };
      var stringifyValue = JSON.stringify(storeData);
      this.storage.setItem(this.getItemKey(key), stringifyValue);
    }
  }, {
    key: "getItemKey",
    value: function getItemKey(key) {
      return this.namespace + key;
    }
  }, {
    key: "getItem",
    value: function getItem(key) {
      try {
        var item;
        var data2 = this.storage.getItem(this.getItemKey(key));
        if (data2 !== null) {
          item = JSON.parse(data2);
        }
        if (item && _typeof(item) === "object" && "expire" in item && "value" in item) {
          return {
            result: true,
            data: item
          };
        }
      } catch (e2) {
        return {
          result: false
        };
      }
      return {
        result: false
      };
    }
  }, {
    key: "getStorageSync",
    value: function getStorageSync(key) {
      var res = this.getItem(key);
      if (res.result) {
        var data2 = res.data;
        if (!this.isExpire(key)) {
          return data2.value;
        }
      }
      return void 0;
    }
  }]);
  return StorageClass2;
}();
var StorageType;
(function(StorageType2) {
  StorageType2["Session"] = "session";
  StorageType2["Local"] = "local";
  StorageType2["WebSQL"] = "webSQL";
  StorageType2["IndexDB"] = "indexDB";
})(StorageType || (StorageType = {}));
var webStorage = new StorageClass();
var Vue3Storage = {
  install: function install(app2, options) {
    var _options$namespace;
    var _options = {
      storage: (options === null || options === void 0 ? void 0 : options.storage) || StorageType.Local,
      namespace: (_options$namespace = options === null || options === void 0 ? void 0 : options.namespace) !== null && _options$namespace !== void 0 ? _options$namespace : "pro_"
    };
    if (typeof window === "undefined") {
      throw new Error('Vue3Storage: Storage "'.concat(_options.storage, '" is not supported'));
    }
    var storage;
    switch (_options.storage) {
      case StorageType.Local:
        storage = window.localStorage;
        break;
      case StorageType.Session:
        storage = window.sessionStorage;
        break;
      default:
        throw new Error('Vue3Storage: Storage "'.concat(_options.storage, '" is not supported yet'));
    }
    webStorage = new StorageClass(storage);
    webStorage.config(_options.namespace);
    app2.config.globalProperties.$storage = webStorage;
  }
};
var e = Object.defineProperty, t = Object.defineProperties, n = Object.getOwnPropertyDescriptors, r = Object.getOwnPropertySymbols, o = Object.prototype.hasOwnProperty, l = Object.prototype.propertyIsEnumerable, i = (t2, n2, r2) => n2 in t2 ? e(t2, n2, { enumerable: true, configurable: true, writable: true, value: r2 }) : t2[n2] = r2;
var m = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};
var w = function(e2) {
  return e2;
};
var j = function(e2, t2, n2) {
  switch (n2.length) {
    case 0:
      return e2.call(t2);
    case 1:
      return e2.call(t2, n2[0]);
    case 2:
      return e2.call(t2, n2[0], n2[1]);
    case 3:
      return e2.call(t2, n2[0], n2[1], n2[2]);
  }
  return e2.apply(t2, n2);
}, F = Math.max;
var O = function(e2, t2, n2) {
  return t2 = F(void 0 === t2 ? e2.length - 1 : t2, 0), function() {
    for (var r2 = arguments, o2 = -1, l2 = F(r2.length - t2, 0), i2 = Array(l2); ++o2 < l2; )
      i2[o2] = r2[t2 + o2];
    o2 = -1;
    for (var c = Array(t2 + 1); ++o2 < t2; )
      c[o2] = r2[o2];
    return c[t2] = n2(i2), j(e2, this, c);
  };
};
var E = function(e2) {
  return function() {
    return e2;
  };
}, x = "object" == typeof m && m && m.Object === Object && m, k = x, S = "object" == typeof self && self && self.Object === Object && self, P = k || S || Function("return this")(), C = P.Symbol, A = C, _ = Object.prototype, q = _.hasOwnProperty, I = _.toString, B = A ? A.toStringTag : void 0;
var L = function(e2) {
  var t2 = q.call(e2, B), n2 = e2[B];
  try {
    e2[B] = void 0;
    var r2 = true;
  } catch (l2) {
  }
  var o2 = I.call(e2);
  return r2 && (t2 ? e2[B] = n2 : delete e2[B]), o2;
}, T = Object.prototype.toString;
var $ = L, R = function(e2) {
  return T.call(e2);
}, z = C ? C.toStringTag : void 0;
var M = function(e2) {
  return null == e2 ? void 0 === e2 ? "[object Undefined]" : "[object Null]" : z && z in Object(e2) ? $(e2) : R(e2);
};
var U = function(e2) {
  var t2 = typeof e2;
  return null != e2 && ("object" == t2 || "function" == t2);
}, V = M, D = U;
var N, W = function(e2) {
  if (!D(e2))
    return false;
  var t2 = V(e2);
  return "[object Function]" == t2 || "[object GeneratorFunction]" == t2 || "[object AsyncFunction]" == t2 || "[object Proxy]" == t2;
}, G = P["__core-js_shared__"], H = (N = /[^.]+$/.exec(G && G.keys && G.keys.IE_PROTO || "")) ? "Symbol(src)_1." + N : "";
var J = function(e2) {
  return !!H && H in e2;
}, K = Function.prototype.toString;
var Q = W, X = J, Y = U, Z = function(e2) {
  if (null != e2) {
    try {
      return K.call(e2);
    } catch (t2) {
    }
    try {
      return e2 + "";
    } catch (t2) {
    }
  }
  return "";
}, ee = /^\[object .+?Constructor\]$/, te = Function.prototype, ne = Object.prototype, re = te.toString, oe = ne.hasOwnProperty, le = RegExp("^" + re.call(oe).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
var ie = function(e2) {
  return !(!Y(e2) || X(e2)) && (Q(e2) ? le : ee).test(Z(e2));
}, ce = function(e2, t2) {
  return null == e2 ? void 0 : e2[t2];
};
var se = function(e2, t2) {
  var n2 = ce(e2, t2);
  return ie(n2) ? n2 : void 0;
}, ue = function() {
  try {
    var e2 = se(Object, "defineProperty");
    return e2({}, "", {}), e2;
  } catch (t2) {
  }
}(), ae = E, fe = ue, pe = fe ? function(e2, t2) {
  return fe(e2, "toString", { configurable: true, enumerable: false, value: ae(t2), writable: true });
} : w, de = Date.now;
var be = function(e2) {
  var t2 = 0, n2 = 0;
  return function() {
    var r2 = de(), o2 = 16 - (r2 - n2);
    if (n2 = r2, o2 > 0) {
      if (++t2 >= 800)
        return arguments[0];
    } else
      t2 = 0;
    return e2.apply(void 0, arguments);
  };
}(pe), ye = w, he = O, ve = be;
var ge = function(e2, t2) {
  return ve(he(e2, t2, ye), e2 + "");
};
var me = function(e2, t2) {
  return e2 === t2 || e2 != e2 && t2 != t2;
};
var we = function(e2) {
  return "number" == typeof e2 && e2 > -1 && e2 % 1 == 0 && e2 <= 9007199254740991;
}, je = W, Fe = we;
var Oe = function(e2) {
  return null != e2 && Fe(e2.length) && !je(e2);
}, Ee = /^(?:0|[1-9]\d*)$/;
var xe = function(e2, t2) {
  var n2 = typeof e2;
  return !!(t2 = null == t2 ? 9007199254740991 : t2) && ("number" == n2 || "symbol" != n2 && Ee.test(e2)) && e2 > -1 && e2 % 1 == 0 && e2 < t2;
}, ke = me, Se = Oe, Pe = xe, Ce = U;
var Ae = function(e2, t2, n2) {
  if (!Ce(n2))
    return false;
  var r2 = typeof t2;
  return !!("number" == r2 ? Se(n2) && Pe(t2, n2.length) : "string" == r2 && t2 in n2) && ke(n2[t2], e2);
};
var _e = function(e2, t2) {
  for (var n2 = -1, r2 = Array(e2); ++n2 < e2; )
    r2[n2] = t2(n2);
  return r2;
};
var qe = function(e2) {
  return null != e2 && "object" == typeof e2;
}, Ie = M, Be = qe;
var Le, Te, $e, Re, ze, Me, Ue, Ve, De = function(e2) {
  return Be(e2) && "[object Arguments]" == Ie(e2);
}, Ne = qe, We = Object.prototype, Ge = We.hasOwnProperty, He = We.propertyIsEnumerable, Je = De(function() {
  return arguments;
}()) ? De : function(e2) {
  return Ne(e2) && Ge.call(e2, "callee") && !He.call(e2, "callee");
}, Ke = Array.isArray, Qe = { exports: {} };
Le = Qe, $e = P, Re = function() {
  return false;
}, ze = (Te = Qe.exports) && !Te.nodeType && Te, Me = ze && Le && !Le.nodeType && Le, Ue = Me && Me.exports === ze ? $e.Buffer : void 0, Ve = (Ue ? Ue.isBuffer : void 0) || Re, Le.exports = Ve;
var Xe = M, Ye = we, Ze = qe, et = {};
et["[object Float32Array]"] = et["[object Float64Array]"] = et["[object Int8Array]"] = et["[object Int16Array]"] = et["[object Int32Array]"] = et["[object Uint8Array]"] = et["[object Uint8ClampedArray]"] = et["[object Uint16Array]"] = et["[object Uint32Array]"] = true, et["[object Arguments]"] = et["[object Array]"] = et["[object ArrayBuffer]"] = et["[object Boolean]"] = et["[object DataView]"] = et["[object Date]"] = et["[object Error]"] = et["[object Function]"] = et["[object Map]"] = et["[object Number]"] = et["[object Object]"] = et["[object RegExp]"] = et["[object Set]"] = et["[object String]"] = et["[object WeakMap]"] = false;
var tt = function(e2) {
  return Ze(e2) && Ye(e2.length) && !!et[Xe(e2)];
};
var nt = function(e2) {
  return function(t2) {
    return e2(t2);
  };
}, rt = { exports: {} };
!function(e2, t2) {
  var n2 = x, r2 = t2 && !t2.nodeType && t2, o2 = r2 && e2 && !e2.nodeType && e2, l2 = o2 && o2.exports === r2 && n2.process, i2 = function() {
    try {
      var e3 = o2 && o2.require && o2.require("util").types;
      return e3 || l2 && l2.binding && l2.binding("util");
    } catch (t3) {
    }
  }();
  e2.exports = i2;
}(rt, rt.exports);
var ot = tt, lt = nt, it = rt.exports, ct = it && it.isTypedArray, st = ct ? lt(ct) : ot, ut = _e, at = Je, ft = Ke, pt = Qe.exports, dt = xe, bt = st, yt = Object.prototype.hasOwnProperty;
var ht = function(e2, t2) {
  var n2 = ft(e2), r2 = !n2 && at(e2), o2 = !n2 && !r2 && pt(e2), l2 = !n2 && !r2 && !o2 && bt(e2), i2 = n2 || r2 || o2 || l2, c = i2 ? ut(e2.length, String) : [], s = c.length;
  for (var u in e2)
    !t2 && !yt.call(e2, u) || i2 && ("length" == u || o2 && ("offset" == u || "parent" == u) || l2 && ("buffer" == u || "byteLength" == u || "byteOffset" == u) || dt(u, s)) || c.push(u);
  return c;
}, vt = Object.prototype;
var gt = U, mt = function(e2) {
  var t2 = e2 && e2.constructor;
  return e2 === ("function" == typeof t2 && t2.prototype || vt);
}, wt = function(e2) {
  var t2 = [];
  if (null != e2)
    for (var n2 in Object(e2))
      t2.push(n2);
  return t2;
}, jt = Object.prototype.hasOwnProperty;
var Ft = ht, Ot = function(e2) {
  if (!gt(e2))
    return wt(e2);
  var t2 = mt(e2), n2 = [];
  for (var r2 in e2)
    ("constructor" != r2 || !t2 && jt.call(e2, r2)) && n2.push(r2);
  return n2;
}, Et = Oe;
var xt = ge, kt = me, St = Ae, Pt = function(e2) {
  return Et(e2) ? Ft(e2, true) : Ot(e2);
}, Ct = Object.prototype, At = Ct.hasOwnProperty, _t = xt(function(e2, t2) {
  e2 = Object(e2);
  var n2 = -1, r2 = t2.length, o2 = r2 > 2 ? t2[2] : void 0;
  for (o2 && St(t2[0], t2[1], o2) && (r2 = 1); ++n2 < r2; )
    for (var l2 = t2[n2], i2 = Pt(l2), c = -1, s = i2.length; ++c < s; ) {
      var u = i2[c], a = e2[u];
      (void 0 === a || kt(a, Ct[u]) && !At.call(e2, u)) && (e2[u] = l2[u]);
    }
  return e2;
}), qt = { exports: {} };
/*!
* screenfull
* v5.1.0 - 2020-12-24
* (c) Sindre Sorhus; MIT License
*/
!function(e2) {
  var t2, n2, r2, o2, l2;
  t2 = "undefined" != typeof window && void 0 !== window.document ? window.document : {}, n2 = e2.exports, r2 = function() {
    for (var e3, n3 = [["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"], ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"], ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror"], ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"], ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]], r3 = 0, o3 = n3.length, l3 = {}; r3 < o3; r3++)
      if ((e3 = n3[r3]) && e3[1] in t2) {
        for (r3 = 0; r3 < e3.length; r3++)
          l3[n3[0][r3]] = e3[r3];
        return l3;
      }
    return false;
  }(), o2 = { change: r2.fullscreenchange, error: r2.fullscreenerror }, l2 = { request: function(e3, n3) {
    return new Promise(function(o3, l3) {
      var i2 = function() {
        this.off("change", i2), o3();
      }.bind(this);
      this.on("change", i2);
      var c = (e3 = e3 || t2.documentElement)[r2.requestFullscreen](n3);
      c instanceof Promise && c.then(i2).catch(l3);
    }.bind(this));
  }, exit: function() {
    return new Promise(function(e3, n3) {
      if (this.isFullscreen) {
        var o3 = function() {
          this.off("change", o3), e3();
        }.bind(this);
        this.on("change", o3);
        var l3 = t2[r2.exitFullscreen]();
        l3 instanceof Promise && l3.then(o3).catch(n3);
      } else
        e3();
    }.bind(this));
  }, toggle: function(e3, t3) {
    return this.isFullscreen ? this.exit() : this.request(e3, t3);
  }, onchange: function(e3) {
    this.on("change", e3);
  }, onerror: function(e3) {
    this.on("error", e3);
  }, on: function(e3, n3) {
    var r3 = o2[e3];
    r3 && t2.addEventListener(r3, n3, false);
  }, off: function(e3, n3) {
    var r3 = o2[e3];
    r3 && t2.removeEventListener(r3, n3, false);
  }, raw: r2 }, r2 ? (Object.defineProperties(l2, { isFullscreen: { get: function() {
    return Boolean(t2[r2.fullscreenElement]);
  } }, element: { enumerable: true, get: function() {
    return t2[r2.fullscreenElement];
  } }, isEnabled: { enumerable: true, get: function() {
    return Boolean(t2[r2.fullscreenEnabled]);
  } } }), n2 ? e2.exports = l2 : window.screenfull = l2) : n2 ? e2.exports = { isEnabled: false } : window.screenfull = { isEnabled: false };
}(qt);
var It = qt.exports;
const Bt = It;
var Lt = defineComponent$1({ props: { modelValue: { type: Boolean, default: false }, fullscreen: { type: Boolean, default: false }, exitOnClickWrapper: { type: Boolean, default: true }, fullscreenClass: { type: String, default: "fullscreen" }, pageOnly: { type: Boolean, default: false }, teleport: { type: Boolean, default: false } }, emits: ["change", "update:modelValue", "update:fullscreen"], setup(e2, { emit: c }) {
  const d = ref(), b = reactive({ isFullscreen: false, isEnabled: Bt.isEnabled }), y = computed(() => e2.pageOnly || !Bt.isEnabled), h2 = computed(() => (y.value || e2.teleport) && b.isFullscreen ? { position: "fixed", left: "0", top: "0", width: "100%", height: "100%" } : void 0);
  function v() {
    c("change", b.isFullscreen), c("update:modelValue", b.isFullscreen), c("update:fullscreen", b.isFullscreen);
  }
  function g() {
    Bt.isFullscreen || Bt.off("change", g), b.isFullscreen = Bt.isFullscreen, v();
  }
  function m2(e3) {
    "Escape" === e3.key && j2();
  }
  function w2() {
    y.value ? (b.isFullscreen = true, v(), document.removeEventListener("keyup", m2), document.addEventListener("keyup", m2)) : (Bt.off("change", g), Bt.on("change", g), Bt.request(e2.teleport ? document.body : d.value));
  }
  function j2() {
    b.isFullscreen && (y.value ? (b.isFullscreen = false, v(), document.removeEventListener("keyup", m2)) : Bt.exit());
  }
  return watch(() => e2.fullscreen, (e3) => {
    e3 !== b.isFullscreen && (e3 ? w2() : j2());
  }), watch(() => e2.modelValue, (e3) => {
    e3 !== b.isFullscreen && (e3 ? w2() : j2());
  }), F2 = ((e3, t2) => {
    for (var n2 in t2 || (t2 = {}))
      o.call(t2, n2) && i(e3, n2, t2[n2]);
    if (r)
      for (var n2 of r(t2))
        l.call(t2, n2) && i(e3, n2, t2[n2]);
    return e3;
  })({ wrapper: d, wrapperStyle: h2 }, toRefs(b)), t(F2, n({ toggle: function(e3) {
    void 0 === e3 ? b.isFullscreen ? j2() : w2() : e3 ? w2() : j2();
  }, request: w2, exit: j2, shadeClick: function(t2) {
    t2.target === d.value && e2.exitOnClickWrapper && j2();
  } }));
  var F2;
} });
Lt.render = function(e2, t2, n2, r2, o2, l2) {
  return openBlock(), createBlock(Teleport, { to: "body", disabled: !e2.teleport || !e2.fullscreen }, [createVNode("div", mergeProps({ ref: "wrapper" }, e2.$attrs, { style: e2.wrapperStyle, class: { [e2.fullscreenClass]: e2.isFullscreen }, onClick: t2[1] || (t2[1] = (t3) => e2.shadeClick(t3)) }), [renderSlot(e2.$slots, "default")], 16)], 8, ["disabled"]);
};
const Tt = "undefined" != typeof window && null !== window;
!function() {
  if (Tt && "IntersectionObserver" in window && "IntersectionObserverEntry" in window && "intersectionRatio" in window.IntersectionObserverEntry.prototype)
    return "isIntersecting" in window.IntersectionObserverEntry.prototype || Object.defineProperty(window.IntersectionObserverEntry.prototype, "isIntersecting", { get() {
      return this.intersectionRatio > 0;
    } }), true;
}();
const $t = Object.prototype.propertyIsEnumerable, Rt = Object.getOwnPropertySymbols;
function zt(e2) {
  return "function" == typeof e2 || "[object Object]" === toString.call(e2);
}
function Mt(e2) {
  return "__proto__" !== e2 && "constructor" !== e2 && "prototype" !== e2;
}
function Ut(e2, ...t2) {
  if (!zt(e2))
    throw new TypeError("expected the first argument to be an object");
  if (0 === t2.length || "function" != typeof Symbol || "function" != typeof Rt)
    return e2;
  for (const n2 of t2) {
    const t3 = Rt(n2);
    for (const r2 of t3)
      $t.call(n2, r2) && (e2[r2] = n2[r2]);
  }
  return e2;
}
function Vt(e2, ...t2) {
  let n2 = 0;
  var r2;
  for (("object" == typeof (r2 = e2) ? null === r2 : "function" != typeof r2) && (e2 = t2[n2++]), e2 || (e2 = {}); n2 < t2.length; n2++)
    if (zt(t2[n2])) {
      for (const r3 of Object.keys(t2[n2]))
        Mt(r3) && (zt(e2[r3]) && zt(t2[n2][r3]) ? Vt(e2[r3], t2[n2][r3]) : e2[r3] = t2[n2][r3]);
      Ut(e2, t2[n2]);
    }
  return e2;
}
const Dt = It;
class Nt {
  constructor(e2) {
    this.fullscreenClass = "fullscreen", this.teleport = false, this.pageOnly = false, e2 && Vt(this, e2);
  }
}
let Wt, Gt;
function Ht(e2, t2) {
  e2.style.position = t2.position, e2.style.left = t2.left, e2.style.top = t2.top, e2.style.width = t2.width, e2.style.height = t2.height;
}
function Jt(e2) {
  const t2 = e2.element;
  t2 && (t2.classList.remove(e2.options.fullscreenClass), (e2.options.teleport || e2.options.pageOnly) && (e2.options.teleport && Gt && (Gt.insertBefore(t2, Wt), Gt.removeChild(Wt)), t2.__styleCache && Ht(t2, t2.__styleCache)));
}
const Kt = { options: new Nt(), element: null, isFullscreen: false, isEnabled: Dt.isEnabled, toggle(e2, t2, n2) {
  return void 0 === n2 ? this.isFullscreen ? this.exit() : this.request(e2, t2) : n2 ? this.request(e2, t2) : this.exit();
}, request(e2, t2) {
  if (this.isFullscreen)
    return Promise.resolve();
  if (e2 || (e2 = document.body), this.options = new Nt(t2), e2 === document.body && (this.options.teleport = false), Dt.isEnabled || (this.options.pageOnly = true), e2.classList.add(this.options.fullscreenClass), this.options.teleport || this.options.pageOnly) {
    const { position: t3, left: n2, top: r2, width: o2, height: l2 } = e2.style;
    e2.__styleCache = { position: t3, left: n2, top: r2, width: o2, height: l2 }, Ht(e2, { position: "fixed", left: "0", top: "0", width: "100%", height: "100%" });
  }
  if (this.options.teleport && (Gt = e2.parentNode, Gt && (Wt = document.createComment("fullscreen-token"), Gt.insertBefore(Wt, e2), document.body.appendChild(e2))), this.options.pageOnly) {
    const t3 = (e3) => {
      "Escape" === e3.key && (document.removeEventListener("keyup", t3), this.exit());
    };
    return this.isFullscreen = true, this.element = e2, document.removeEventListener("keyup", t3), document.addEventListener("keyup", t3), this.options.callback && this.options.callback(this.isFullscreen), Promise.resolve();
  }
  {
    const t3 = () => {
      Dt.isFullscreen || (Dt.off("change", t3), Jt(this)), this.isFullscreen = Dt.isFullscreen, this.options.teleport ? this.element = e2 || null : this.element = Dt.element, this.options.callback && this.options.callback(Dt.isFullscreen);
    };
    return Dt.on("change", t3), Dt.request(this.options.teleport ? document.body : e2);
  }
}, exit() {
  return this.isFullscreen ? this.options.pageOnly ? (Jt(this), this.isFullscreen = false, this.element = null, this.options.callback && this.options.callback(this.isFullscreen), Promise.resolve()) : Dt.exit() : Promise.resolve();
} }, Qt = (e2, t2, n2) => {
  const i2 = () => {
    let e3;
    const n3 = { teleport: t2.modifiers.teleport, pageOnly: t2.modifiers.pageOnly };
    if (t2.value)
      if ("string" == typeof t2.value)
        e3 = t2.value;
      else {
        const i3 = t2.value, { target: c } = i3, s = ((e4, t3) => {
          var n4 = {};
          for (var i4 in e4)
            o.call(e4, i4) && t3.indexOf(i4) < 0 && (n4[i4] = e4[i4]);
          if (null != e4 && r)
            for (var i4 of r(e4))
              t3.indexOf(i4) < 0 && l.call(e4, i4) && (n4[i4] = e4[i4]);
          return n4;
        })(i3, ["target"]);
        e3 = c, Vt(n3, s);
      }
    "string" == typeof e3 && (e3 = document.querySelector(e3)), Kt.toggle(e3, n3);
  };
  e2._onClickFullScreen && e2.removeEventListener("click", e2._onClickFullScreen), e2.addEventListener("click", i2), e2._onClickFullScreen = i2;
};
var Xt = { install(e2, { name: t2 = "fullscreen" } = {}) {
  e2.config.globalProperties[`$${t2}`] = Kt, e2.component(t2, _t(Lt, { name: t2 })), e2.directive(t2, Qt);
} };
var distExports = {};
var dist = {
  get exports() {
    return distExports;
  },
  set exports(v) {
    distExports = v;
  }
};
(function(module, exports) {
  !function(e2, t2) {
    module.exports = t2();
  }("undefined" != typeof self ? self : commonjsGlobal, function() {
    return function(e2) {
      function t2(r2) {
        if (n2[r2])
          return n2[r2].exports;
        var o2 = n2[r2] = { i: r2, l: false, exports: {} };
        return e2[r2].call(o2.exports, o2, o2.exports, t2), o2.l = true, o2.exports;
      }
      var n2 = {};
      return t2.m = e2, t2.c = n2, t2.d = function(e3, n3, r2) {
        t2.o(e3, n3) || Object.defineProperty(e3, n3, { configurable: false, enumerable: true, get: r2 });
      }, t2.n = function(e3) {
        var n3 = e3 && e3.__esModule ? function() {
          return e3.default;
        } : function() {
          return e3;
        };
        return t2.d(n3, "a", n3), n3;
      }, t2.o = function(e3, t3) {
        return Object.prototype.hasOwnProperty.call(e3, t3);
      }, t2.p = "../dist/", t2(t2.s = 0);
    }([function(e2, t2, n2) {
      (function(r2) {
        function o2(e3) {
          if (Array.isArray(e3)) {
            for (var t3 = 0, n3 = Array(e3.length); t3 < e3.length; t3++)
              n3[t3] = e3[t3];
            return n3;
          }
          return Array.from(e3);
        }
        var c;
        n2(2), n2(3);
        var i2 = {}, u = {}, a = [], l2 = [], s = false, f = function(e3) {
          return e3 = "string" == typeof e3 ? JSON.parse(e3.replace(/\'/gi, '"')) : e3, e3 instanceof Array ? { "": e3 } : e3;
        }, p = function(e3, t3, n3, r3) {
          var o3 = true === n3.modifiers.push, c2 = true === n3.modifiers.avoid, i3 = true == !n3.modifiers.focus, u2 = true === n3.modifiers.once, l3 = true === n3.modifiers.propagte;
          c2 ? (a = a.filter(function(e4) {
            return !e4 === t3;
          }), a.push(t3)) : (v({ b: e3, push: o3, once: u2, focus: i3, propagte: l3, el: r3.el }), console.log("doing fixed mapping"));
        }, d = function(e3, t3) {
          for (var n3 in e3) {
            var r3 = i2.encodeKey(e3[n3]), o3 = u[r3].el.indexOf(t3);
            u[r3].el.length > 1 && o3 > -1 ? u[r3].el.splice(o3, 1) : delete u[r3];
          }
        };
        i2.install = function(e3, t3) {
          l2 = [].concat(o2(t3 && t3.prevent ? t3.prevent : [])), console.log("installing..."), e3.directive("shortkey", { beforeMount: function(e4, t4, n3) {
            var r3 = f(t4.value);
            p(r3, e4, t4, n3);
          }, updated: function(e4, t4, n3) {
            var r3 = f(t4.oldValue);
            d(r3, e4);
            var o3 = f(t4.value);
            p(o3, e4, t4, n3);
          }, unmounted: function(e4, t4) {
            var n3 = f(t4.value);
            d(n3, e4);
          } });
        }, i2.decodeKey = function(e3) {
          return y(e3);
        }, i2.encodeKey = function(e3) {
          var t3 = {};
          t3.shiftKey = e3.includes("shift"), t3.ctrlKey = e3.includes("ctrl"), t3.metaKey = e3.includes("meta"), t3.altKey = e3.includes("alt");
          var n3 = y(t3);
          return n3 += e3.filter(function(e4) {
            return !["shift", "ctrl", "meta", "alt"].includes(e4);
          }).join("");
        };
        var y = function(e3) {
          var t3 = "";
          return ("Shift" === e3.key || e3.shiftKey) && (t3 += "shift"), ("Control" === e3.key || e3.ctrlKey) && (t3 += "ctrl"), ("Meta" === e3.key || e3.metaKey) && (t3 += "meta"), ("Alt" === e3.key || e3.altKey) && (t3 += "alt"), "ArrowUp" === e3.key && (t3 += "arrowup"), "ArrowLeft" === e3.key && (t3 += "arrowleft"), "ArrowRight" === e3.key && (t3 += "arrowright"), "ArrowDown" === e3.key && (t3 += "arrowdown"), "AltGraph" === e3.key && (t3 += "altgraph"), "Escape" === e3.key && (t3 += "esc"), "Enter" === e3.key && (t3 += "enter"), "Tab" === e3.key && (t3 += "tab"), " " === e3.key && (t3 += "space"), "PageUp" === e3.key && (t3 += "pageup"), "PageDown" === e3.key && (t3 += "pagedown"), "Home" === e3.key && (t3 += "home"), "End" === e3.key && (t3 += "end"), "Delete" === e3.key && (t3 += "del"), "Backspace" === e3.key && (t3 += "backspace"), "Insert" === e3.key && (t3 += "insert"), "NumLock" === e3.key && (t3 += "numlock"), "CapsLock" === e3.key && (t3 += "capslock"), "Pause" === e3.key && (t3 += "pause"), "ContextMenu" === e3.key && (t3 += "contextmenu"), "ScrollLock" === e3.key && (t3 += "scrolllock"), "BrowserHome" === e3.key && (t3 += "browserhome"), "MediaSelect" === e3.key && (t3 += "mediaselect"), (e3.key && " " !== e3.key && 1 === e3.key.length || /F\d{1,2}|\//g.test(e3.key)) && (t3 += e3.key.toLowerCase()), t3;
        }, h2 = function(e3) {
          var t3 = new CustomEvent("shortkey", { bubbles: false });
          u[e3].key && (t3.srcKey = u[e3].key);
          var n3 = u[e3].el;
          console.log(u), console.log("pKey:", e3), console.log(n3), u[e3].propagte ? n3.forEach(function(e4) {
            return e4.dispatchEvent(t3);
          }) : n3[n3.length - 1].dispatchEvent(t3);
        };
        i2.keyDown = function(e3) {
          (!u[e3].once && !u[e3].push || u[e3].push && !s) && h2(e3);
        }, r2 && Object({ NODE_ENV: "production" }) && function() {
          document.addEventListener("keydown", function(e3) {
            var t3 = i2.decodeKey(e3);
            if (m2(t3)) {
              if (u[t3].propagte || (e3.preventDefault(), e3.stopPropagation()), u[t3].focus)
                i2.keyDown(t3), s = true;
              else if (!s) {
                var n3 = u[t3].el;
                n3[n3.length - 1].focus(), s = true;
              }
            }
          }, true), document.addEventListener("keyup", function(e3) {
            var t3 = i2.decodeKey(e3);
            m2(t3) && (u[t3].propagte || (e3.preventDefault(), e3.stopPropagation()), (u[t3].once || u[t3].push) && h2(t3)), s = false;
          }, true);
        }();
        var v = function(e3) {
          var t3 = e3.b, n3 = e3.push, r3 = e3.once, o3 = e3.focus, c2 = e3.propagte, a2 = e3.el;
          for (var l3 in t3) {
            var s2 = i2.encodeKey(t3[l3]), f2 = u[s2] && u[s2].el ? u[s2].el : [], p2 = u[s2] && u[s2].propagte;
            f2.push(a2), u[s2] = { push: n3, once: r3, focus: o3, key: l3, propagte: p2 || c2, el: f2 };
          }
        }, m2 = function(e3) {
          var t3 = !!a.find(function(e4) {
            return e4 === document.activeElement;
          }), n3 = !!l2.find(function(e4) {
            return document.activeElement && document.activeElement.matches(e4);
          });
          return !!u[e3] && !(t3 || n3);
        };
        void 0 !== e2 && e2.exports ? e2.exports = i2 : void 0 !== (c = function() {
          return i2;
        }.call(t2, n2, t2, e2)) && (e2.exports = c);
      }).call(t2, n2(1));
    }, function(e2, t2) {
      function n2() {
        throw new Error("setTimeout has not been defined");
      }
      function r2() {
        throw new Error("clearTimeout has not been defined");
      }
      function o2(e3) {
        if (s === setTimeout)
          return setTimeout(e3, 0);
        if ((s === n2 || !s) && setTimeout)
          return s = setTimeout, setTimeout(e3, 0);
        try {
          return s(e3, 0);
        } catch (t3) {
          try {
            return s.call(null, e3, 0);
          } catch (t4) {
            return s.call(this, e3, 0);
          }
        }
      }
      function c(e3) {
        if (f === clearTimeout)
          return clearTimeout(e3);
        if ((f === r2 || !f) && clearTimeout)
          return f = clearTimeout, clearTimeout(e3);
        try {
          return f(e3);
        } catch (t3) {
          try {
            return f.call(null, e3);
          } catch (t4) {
            return f.call(this, e3);
          }
        }
      }
      function i2() {
        h2 && d && (h2 = false, d.length ? y = d.concat(y) : v = -1, y.length && u());
      }
      function u() {
        if (!h2) {
          var e3 = o2(i2);
          h2 = true;
          for (var t3 = y.length; t3; ) {
            for (d = y, y = []; ++v < t3; )
              d && d[v].run();
            v = -1, t3 = y.length;
          }
          d = null, h2 = false, c(e3);
        }
      }
      function a(e3, t3) {
        this.fun = e3, this.array = t3;
      }
      function l2() {
      }
      var s, f, p = e2.exports = {};
      !function() {
        try {
          s = "function" == typeof setTimeout ? setTimeout : n2;
        } catch (e3) {
          s = n2;
        }
        try {
          f = "function" == typeof clearTimeout ? clearTimeout : r2;
        } catch (e3) {
          f = r2;
        }
      }();
      var d, y = [], h2 = false, v = -1;
      p.nextTick = function(e3) {
        var t3 = new Array(arguments.length - 1);
        if (arguments.length > 1)
          for (var n3 = 1; n3 < arguments.length; n3++)
            t3[n3 - 1] = arguments[n3];
        y.push(new a(e3, t3)), 1 !== y.length || h2 || o2(u);
      }, a.prototype.run = function() {
        this.fun.apply(null, this.array);
      }, p.title = "browser", p.browser = true, p.env = {}, p.argv = [], p.version = "", p.versions = {}, p.on = l2, p.addListener = l2, p.once = l2, p.off = l2, p.removeListener = l2, p.removeAllListeners = l2, p.emit = l2, p.prependListener = l2, p.prependOnceListener = l2, p.listeners = function(e3) {
        return [];
      }, p.binding = function(e3) {
        throw new Error("process.binding is not supported");
      }, p.cwd = function() {
        return "/";
      }, p.chdir = function(e3) {
        throw new Error("process.chdir is not supported");
      }, p.umask = function() {
        return 0;
      };
    }, function(e2, t2) {
      Element.prototype.matches || (Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector);
    }, function(e2, t2) {
      !function() {
        if ("undefined" != typeof window)
          try {
            var e3 = new window.CustomEvent("test", { cancelable: true });
            if (e3.preventDefault(), true !== e3.defaultPrevented)
              throw new Error("Could not prevent default");
          } catch (e4) {
            var t3 = function(e5, t4) {
              var n2, r2;
              return t4 = t4 || {}, t4.bubbles = !!t4.bubbles, t4.cancelable = !!t4.cancelable, n2 = document.createEvent("CustomEvent"), n2.initCustomEvent(e5, t4.bubbles, t4.cancelable, t4.detail), r2 = n2.preventDefault, n2.preventDefault = function() {
                r2.call(this);
                try {
                  Object.defineProperty(this, "defaultPrevented", { get: function() {
                    return true;
                  } });
                } catch (e6) {
                  this.defaultPrevented = true;
                }
              }, n2;
            };
            t3.prototype = window.Event.prototype, window.CustomEvent = t3;
          }
      }();
    }]);
  });
})(dist);
const ShortKey = /* @__PURE__ */ getDefaultExportFromCjs(distExports);
const app = createApp(App);
app.use(i18n).use(router).use(ShortKey, { prevent: ["input", "textarea"] }).use(createPinia()).use(Vue3Storage, { namespace: "lja_", storage: StorageType.Local }).use(vuetify).use(Xt).mount("#app");