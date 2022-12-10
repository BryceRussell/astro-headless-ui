import * as adapter from '@astrojs/netlify/netlify-functions.js';
import { escape } from 'html-escaper';
/* empty css                                                *//* empty css                                                *//* empty css                                          */import { optimize } from 'svgo';
/* empty css                                        *//* empty css                                      *//* empty css                                 *//* empty css                                 *//* empty css                                  *//* empty css                                 *//* empty css                             *//* empty css                             */import 'mime';
import 'cookie';
import 'kleur/colors';
import 'string-width';
import 'path-browserify';
import { compile } from 'path-to-regexp';

const ASTRO_VERSION = "1.6.5";

function createDeprecatedFetchContentFn() {
  return () => {
    throw new Error("Deprecated: Astro.fetchContent() has been replaced with Astro.glob().");
  };
}
function createAstroGlobFn() {
  const globHandler = (importMetaGlobResult, globValue) => {
    let allEntries = [...Object.values(importMetaGlobResult)];
    if (allEntries.length === 0) {
      throw new Error(`Astro.glob(${JSON.stringify(globValue())}) - no matches found.`);
    }
    return Promise.all(allEntries.map((fn) => fn()));
  };
  return globHandler;
}
function createAstro(filePathname, _site, projectRootStr) {
  const site = _site ? new URL(_site) : void 0;
  const referenceURL = new URL(filePathname, `http://localhost`);
  const projectRoot = new URL(projectRootStr);
  return {
    site,
    generator: `Astro v${ASTRO_VERSION}`,
    fetchContent: createDeprecatedFetchContentFn(),
    glob: createAstroGlobFn(),
    resolve(...segments) {
      let resolved = segments.reduce((u, segment) => new URL(segment, u), referenceURL).pathname;
      if (resolved.startsWith(projectRoot.pathname)) {
        resolved = "/" + resolved.slice(projectRoot.pathname.length);
      }
      return resolved;
    }
  };
}

const escapeHTML = escape;
class HTMLBytes extends Uint8Array {
}
Object.defineProperty(HTMLBytes.prototype, Symbol.toStringTag, {
  get() {
    return "HTMLBytes";
  }
});
class HTMLString extends String {
  get [Symbol.toStringTag]() {
    return "HTMLString";
  }
}
const markHTMLString = (value) => {
  if (value instanceof HTMLString) {
    return value;
  }
  if (typeof value === "string") {
    return new HTMLString(value);
  }
  return value;
};
function isHTMLString(value) {
  return Object.prototype.toString.call(value) === "[object HTMLString]";
}
function markHTMLBytes(bytes) {
  return new HTMLBytes(bytes);
}
async function* unescapeChunksAsync(iterable) {
  for await (const chunk of iterable) {
    yield unescapeHTML(chunk);
  }
}
function* unescapeChunks(iterable) {
  for (const chunk of iterable) {
    yield unescapeHTML(chunk);
  }
}
function unescapeHTML(str) {
  if (!!str && typeof str === "object") {
    if (str instanceof Uint8Array) {
      return markHTMLBytes(str);
    } else if (str instanceof Response && str.body) {
      const body = str.body;
      return unescapeChunksAsync(body);
    } else if (typeof str.then === "function") {
      return Promise.resolve(str).then((value) => {
        return unescapeHTML(value);
      });
    } else if (Symbol.iterator in str) {
      return unescapeChunks(str);
    } else if (Symbol.asyncIterator in str) {
      return unescapeChunksAsync(str);
    }
  }
  return markHTMLString(str);
}

var idle_prebuilt_default = `(self.Astro=self.Astro||{}).idle=t=>{const e=async()=>{await(await t())()};"requestIdleCallback"in window?window.requestIdleCallback(e):setTimeout(e,200)},window.dispatchEvent(new Event("astro:idle"));`;

var load_prebuilt_default = `(self.Astro=self.Astro||{}).load=a=>{(async()=>await(await a())())()},window.dispatchEvent(new Event("astro:load"));`;

var media_prebuilt_default = `(self.Astro=self.Astro||{}).media=(s,a)=>{const t=async()=>{await(await s())()};if(a.value){const e=matchMedia(a.value);e.matches?t():e.addEventListener("change",t,{once:!0})}},window.dispatchEvent(new Event("astro:media"));`;

var only_prebuilt_default = `(self.Astro=self.Astro||{}).only=t=>{(async()=>await(await t())())()},window.dispatchEvent(new Event("astro:only"));`;

var visible_prebuilt_default = `(self.Astro=self.Astro||{}).visible=(s,c,n)=>{const r=async()=>{await(await s())()};let i=new IntersectionObserver(e=>{for(const t of e)if(!!t.isIntersecting){i.disconnect(),r();break}});for(let e=0;e<n.children.length;e++){const t=n.children[e];i.observe(t)}},window.dispatchEvent(new Event("astro:visible"));`;

var astro_island_prebuilt_default = `var l;{const c={0:t=>t,1:t=>JSON.parse(t,o),2:t=>new RegExp(t),3:t=>new Date(t),4:t=>new Map(JSON.parse(t,o)),5:t=>new Set(JSON.parse(t,o)),6:t=>BigInt(t),7:t=>new URL(t),8:t=>new Uint8Array(JSON.parse(t)),9:t=>new Uint16Array(JSON.parse(t)),10:t=>new Uint32Array(JSON.parse(t))},o=(t,s)=>{if(t===""||!Array.isArray(s))return s;const[e,n]=s;return e in c?c[e](n):void 0};customElements.get("astro-island")||customElements.define("astro-island",(l=class extends HTMLElement{constructor(){super(...arguments);this.hydrate=()=>{if(!this.hydrator||this.parentElement&&this.parentElement.closest("astro-island[ssr]"))return;const s=this.querySelectorAll("astro-slot"),e={},n=this.querySelectorAll("template[data-astro-template]");for(const r of n){const i=r.closest(this.tagName);!i||!i.isSameNode(this)||(e[r.getAttribute("data-astro-template")||"default"]=r.innerHTML,r.remove())}for(const r of s){const i=r.closest(this.tagName);!i||!i.isSameNode(this)||(e[r.getAttribute("name")||"default"]=r.innerHTML)}const a=this.hasAttribute("props")?JSON.parse(this.getAttribute("props"),o):{};this.hydrator(this)(this.Component,a,e,{client:this.getAttribute("client")}),this.removeAttribute("ssr"),window.removeEventListener("astro:hydrate",this.hydrate),window.dispatchEvent(new CustomEvent("astro:hydrate"))}}connectedCallback(){!this.hasAttribute("await-children")||this.firstChild?this.childrenConnectedCallback():new MutationObserver((s,e)=>{e.disconnect(),this.childrenConnectedCallback()}).observe(this,{childList:!0})}async childrenConnectedCallback(){window.addEventListener("astro:hydrate",this.hydrate);let s=this.getAttribute("before-hydration-url");s&&await import(s),this.start()}start(){const s=JSON.parse(this.getAttribute("opts")),e=this.getAttribute("client");if(Astro[e]===void 0){window.addEventListener(\`astro:\${e}\`,()=>this.start(),{once:!0});return}Astro[e](async()=>{const n=this.getAttribute("renderer-url"),[a,{default:r}]=await Promise.all([import(this.getAttribute("component-url")),n?import(n):()=>()=>{}]),i=this.getAttribute("component-export")||"default";if(!i.includes("."))this.Component=a[i];else{this.Component=a;for(const d of i.split("."))this.Component=this.Component[d]}return this.hydrator=r,this.hydrate},s,this)}attributeChangedCallback(){this.hydrator&&this.hydrate()}},l.observedAttributes=["props"],l))}`;

function determineIfNeedsHydrationScript(result) {
  if (result._metadata.hasHydrationScript) {
    return false;
  }
  return result._metadata.hasHydrationScript = true;
}
const hydrationScripts = {
  idle: idle_prebuilt_default,
  load: load_prebuilt_default,
  only: only_prebuilt_default,
  media: media_prebuilt_default,
  visible: visible_prebuilt_default
};
function determinesIfNeedsDirectiveScript(result, directive) {
  if (result._metadata.hasDirectives.has(directive)) {
    return false;
  }
  result._metadata.hasDirectives.add(directive);
  return true;
}
function getDirectiveScriptText(directive) {
  if (!(directive in hydrationScripts)) {
    throw new Error(`Unknown directive: ${directive}`);
  }
  const directiveScriptText = hydrationScripts[directive];
  return directiveScriptText;
}
function getPrescripts(type, directive) {
  switch (type) {
    case "both":
      return `<style>astro-island,astro-slot{display:contents}</style><script>${getDirectiveScriptText(directive) + astro_island_prebuilt_default}<\/script>`;
    case "directive":
      return `<script>${getDirectiveScriptText(directive)}<\/script>`;
  }
  return "";
}

const PROP_TYPE = {
  Value: 0,
  JSON: 1,
  RegExp: 2,
  Date: 3,
  Map: 4,
  Set: 5,
  BigInt: 6,
  URL: 7,
  Uint8Array: 8,
  Uint16Array: 9,
  Uint32Array: 10
};
function serializeArray(value, metadata = {}, parents = /* @__PURE__ */ new WeakSet()) {
  if (parents.has(value)) {
    throw new Error(`Cyclic reference detected while serializing props for <${metadata.displayName} client:${metadata.hydrate}>!

Cyclic references cannot be safely serialized for client-side usage. Please remove the cyclic reference.`);
  }
  parents.add(value);
  const serialized = value.map((v) => {
    return convertToSerializedForm(v, metadata, parents);
  });
  parents.delete(value);
  return serialized;
}
function serializeObject(value, metadata = {}, parents = /* @__PURE__ */ new WeakSet()) {
  if (parents.has(value)) {
    throw new Error(`Cyclic reference detected while serializing props for <${metadata.displayName} client:${metadata.hydrate}>!

Cyclic references cannot be safely serialized for client-side usage. Please remove the cyclic reference.`);
  }
  parents.add(value);
  const serialized = Object.fromEntries(
    Object.entries(value).map(([k, v]) => {
      return [k, convertToSerializedForm(v, metadata, parents)];
    })
  );
  parents.delete(value);
  return serialized;
}
function convertToSerializedForm(value, metadata = {}, parents = /* @__PURE__ */ new WeakSet()) {
  const tag = Object.prototype.toString.call(value);
  switch (tag) {
    case "[object Date]": {
      return [PROP_TYPE.Date, value.toISOString()];
    }
    case "[object RegExp]": {
      return [PROP_TYPE.RegExp, value.source];
    }
    case "[object Map]": {
      return [
        PROP_TYPE.Map,
        JSON.stringify(serializeArray(Array.from(value), metadata, parents))
      ];
    }
    case "[object Set]": {
      return [
        PROP_TYPE.Set,
        JSON.stringify(serializeArray(Array.from(value), metadata, parents))
      ];
    }
    case "[object BigInt]": {
      return [PROP_TYPE.BigInt, value.toString()];
    }
    case "[object URL]": {
      return [PROP_TYPE.URL, value.toString()];
    }
    case "[object Array]": {
      return [PROP_TYPE.JSON, JSON.stringify(serializeArray(value, metadata, parents))];
    }
    case "[object Uint8Array]": {
      return [PROP_TYPE.Uint8Array, JSON.stringify(Array.from(value))];
    }
    case "[object Uint16Array]": {
      return [PROP_TYPE.Uint16Array, JSON.stringify(Array.from(value))];
    }
    case "[object Uint32Array]": {
      return [PROP_TYPE.Uint32Array, JSON.stringify(Array.from(value))];
    }
    default: {
      if (value !== null && typeof value === "object") {
        return [PROP_TYPE.Value, serializeObject(value, metadata, parents)];
      } else {
        return [PROP_TYPE.Value, value];
      }
    }
  }
}
function serializeProps(props, metadata) {
  const serialized = JSON.stringify(serializeObject(props, metadata));
  return serialized;
}

function serializeListValue(value) {
  const hash = {};
  push(value);
  return Object.keys(hash).join(" ");
  function push(item) {
    if (item && typeof item.forEach === "function")
      item.forEach(push);
    else if (item === Object(item))
      Object.keys(item).forEach((name) => {
        if (item[name])
          push(name);
      });
    else {
      item = item === false || item == null ? "" : String(item).trim();
      if (item) {
        item.split(/\s+/).forEach((name) => {
          hash[name] = true;
        });
      }
    }
  }
}

const HydrationDirectivesRaw = ["load", "idle", "media", "visible", "only"];
const HydrationDirectives = new Set(HydrationDirectivesRaw);
const HydrationDirectiveProps = new Set(HydrationDirectivesRaw.map((n) => `client:${n}`));
function extractDirectives(inputProps) {
  let extracted = {
    isPage: false,
    hydration: null,
    props: {}
  };
  for (const [key, value] of Object.entries(inputProps)) {
    if (key.startsWith("server:")) {
      if (key === "server:root") {
        extracted.isPage = true;
      }
    }
    if (key.startsWith("client:")) {
      if (!extracted.hydration) {
        extracted.hydration = {
          directive: "",
          value: "",
          componentUrl: "",
          componentExport: { value: "" }
        };
      }
      switch (key) {
        case "client:component-path": {
          extracted.hydration.componentUrl = value;
          break;
        }
        case "client:component-export": {
          extracted.hydration.componentExport.value = value;
          break;
        }
        case "client:component-hydration": {
          break;
        }
        case "client:display-name": {
          break;
        }
        default: {
          extracted.hydration.directive = key.split(":")[1];
          extracted.hydration.value = value;
          if (!HydrationDirectives.has(extracted.hydration.directive)) {
            throw new Error(
              `Error: invalid hydration directive "${key}". Supported hydration methods: ${Array.from(
                HydrationDirectiveProps
              ).join(", ")}`
            );
          }
          if (extracted.hydration.directive === "media" && typeof extracted.hydration.value !== "string") {
            throw new Error(
              'Error: Media query must be provided for "client:media", similar to client:media="(max-width: 600px)"'
            );
          }
          break;
        }
      }
    } else if (key === "class:list") {
      if (value) {
        extracted.props[key.slice(0, -5)] = serializeListValue(value);
      }
    } else {
      extracted.props[key] = value;
    }
  }
  return extracted;
}
async function generateHydrateScript(scriptOptions, metadata) {
  const { renderer, result, astroId, props, attrs } = scriptOptions;
  const { hydrate, componentUrl, componentExport } = metadata;
  if (!componentExport.value) {
    throw new Error(
      `Unable to resolve a valid export for "${metadata.displayName}"! Please open an issue at https://astro.build/issues!`
    );
  }
  const island = {
    children: "",
    props: {
      uid: astroId
    }
  };
  if (attrs) {
    for (const [key, value] of Object.entries(attrs)) {
      island.props[key] = escapeHTML(value);
    }
  }
  island.props["component-url"] = await result.resolve(decodeURI(componentUrl));
  if (renderer.clientEntrypoint) {
    island.props["component-export"] = componentExport.value;
    island.props["renderer-url"] = await result.resolve(decodeURI(renderer.clientEntrypoint));
    island.props["props"] = escapeHTML(serializeProps(props, metadata));
  }
  island.props["ssr"] = "";
  island.props["client"] = hydrate;
  let beforeHydrationUrl = await result.resolve("astro:scripts/before-hydration.js");
  if (beforeHydrationUrl.length) {
    island.props["before-hydration-url"] = beforeHydrationUrl;
  }
  island.props["opts"] = escapeHTML(
    JSON.stringify({
      name: metadata.displayName,
      value: metadata.hydrateArgs || ""
    })
  );
  return island;
}

function validateComponentProps(props, displayName) {
  var _a;
  if (((_a = (Object.assign({"BASE_URL":"/","MODE":"production","DEV":false,"PROD":true},{}))) == null ? void 0 : _a.DEV) && props != null) {
    for (const prop of Object.keys(props)) {
      if (HydrationDirectiveProps.has(prop)) {
        console.warn(
          `You are attempting to render <${displayName} ${prop} />, but ${displayName} is an Astro component. Astro components do not render in the client and should not have a hydration directive. Please use a framework component for client rendering.`
        );
      }
    }
  }
}
class AstroComponent {
  constructor(htmlParts, expressions) {
    this.htmlParts = htmlParts;
    this.expressions = expressions;
  }
  get [Symbol.toStringTag]() {
    return "AstroComponent";
  }
  async *[Symbol.asyncIterator]() {
    const { htmlParts, expressions } = this;
    for (let i = 0; i < htmlParts.length; i++) {
      const html = htmlParts[i];
      const expression = expressions[i];
      yield markHTMLString(html);
      yield* renderChild(expression);
    }
  }
}
function isAstroComponent(obj) {
  return typeof obj === "object" && Object.prototype.toString.call(obj) === "[object AstroComponent]";
}
function isAstroComponentFactory(obj) {
  return obj == null ? false : obj.isAstroComponentFactory === true;
}
async function* renderAstroComponent(component) {
  for await (const value of component) {
    if (value || value === 0) {
      for await (const chunk of renderChild(value)) {
        switch (chunk.type) {
          case "directive": {
            yield chunk;
            break;
          }
          default: {
            yield markHTMLString(chunk);
            break;
          }
        }
      }
    }
  }
}
async function renderToString(result, componentFactory, props, children) {
  const Component = await componentFactory(result, props, children);
  if (!isAstroComponent(Component)) {
    const response = Component;
    throw response;
  }
  let parts = new HTMLParts();
  for await (const chunk of renderAstroComponent(Component)) {
    parts.append(chunk, result);
  }
  return parts.toString();
}
async function renderToIterable(result, componentFactory, displayName, props, children) {
  validateComponentProps(props, displayName);
  const Component = await componentFactory(result, props, children);
  if (!isAstroComponent(Component)) {
    console.warn(
      `Returning a Response is only supported inside of page components. Consider refactoring this logic into something like a function that can be used in the page.`
    );
    const response = Component;
    throw response;
  }
  return renderAstroComponent(Component);
}
async function renderTemplate(htmlParts, ...expressions) {
  return new AstroComponent(htmlParts, expressions);
}

async function* renderChild(child) {
  child = await child;
  if (child instanceof SlotString) {
    if (child.instructions) {
      yield* child.instructions;
    }
    yield child;
  } else if (isHTMLString(child)) {
    yield child;
  } else if (Array.isArray(child)) {
    for (const value of child) {
      yield markHTMLString(await renderChild(value));
    }
  } else if (typeof child === "function") {
    yield* renderChild(child());
  } else if (typeof child === "string") {
    yield markHTMLString(escapeHTML(child));
  } else if (!child && child !== 0) ; else if (child instanceof AstroComponent || Object.prototype.toString.call(child) === "[object AstroComponent]") {
    yield* renderAstroComponent(child);
  } else if (ArrayBuffer.isView(child)) {
    yield child;
  } else if (typeof child === "object" && (Symbol.asyncIterator in child || Symbol.iterator in child)) {
    yield* child;
  } else {
    yield child;
  }
}

const slotString = Symbol.for("astro:slot-string");
class SlotString extends HTMLString {
  constructor(content, instructions) {
    super(content);
    this.instructions = instructions;
    this[slotString] = true;
  }
}
function isSlotString(str) {
  return !!str[slotString];
}
async function renderSlot(_result, slotted, fallback) {
  if (slotted) {
    let iterator = renderChild(slotted);
    let content = "";
    let instructions = null;
    for await (const chunk of iterator) {
      if (chunk.type === "directive") {
        if (instructions === null) {
          instructions = [];
        }
        instructions.push(chunk);
      } else {
        content += chunk;
      }
    }
    return markHTMLString(new SlotString(content, instructions));
  }
  return fallback;
}
async function renderSlots(result, slots = {}) {
  let slotInstructions = null;
  let children = {};
  if (slots) {
    await Promise.all(
      Object.entries(slots).map(
        ([key, value]) => renderSlot(result, value).then((output) => {
          if (output.instructions) {
            if (slotInstructions === null) {
              slotInstructions = [];
            }
            slotInstructions.push(...output.instructions);
          }
          children[key] = output;
        })
      )
    );
  }
  return { slotInstructions, children };
}

const Fragment = Symbol.for("astro:fragment");
const Renderer = Symbol.for("astro:renderer");
const encoder = new TextEncoder();
const decoder = new TextDecoder();
function stringifyChunk(result, chunk) {
  switch (chunk.type) {
    case "directive": {
      const { hydration } = chunk;
      let needsHydrationScript = hydration && determineIfNeedsHydrationScript(result);
      let needsDirectiveScript = hydration && determinesIfNeedsDirectiveScript(result, hydration.directive);
      let prescriptType = needsHydrationScript ? "both" : needsDirectiveScript ? "directive" : null;
      if (prescriptType) {
        let prescripts = getPrescripts(prescriptType, hydration.directive);
        return markHTMLString(prescripts);
      } else {
        return "";
      }
    }
    default: {
      if (isSlotString(chunk)) {
        let out = "";
        const c = chunk;
        if (c.instructions) {
          for (const instr of c.instructions) {
            out += stringifyChunk(result, instr);
          }
        }
        out += chunk.toString();
        return out;
      }
      return chunk.toString();
    }
  }
}
class HTMLParts {
  constructor() {
    this.parts = "";
  }
  append(part, result) {
    if (ArrayBuffer.isView(part)) {
      this.parts += decoder.decode(part);
    } else {
      this.parts += stringifyChunk(result, part);
    }
  }
  toString() {
    return this.parts;
  }
  toArrayBuffer() {
    return encoder.encode(this.parts);
  }
}

const ClientOnlyPlaceholder = "astro-client-only";
const skipAstroJSXCheck = /* @__PURE__ */ new WeakSet();
let originalConsoleError;
let consoleFilterRefs = 0;
async function renderJSX(result, vnode) {
  switch (true) {
    case vnode instanceof HTMLString:
      if (vnode.toString().trim() === "") {
        return "";
      }
      return vnode;
    case typeof vnode === "string":
      return markHTMLString(escapeHTML(vnode));
    case typeof vnode === "function":
      return vnode;
    case (!vnode && vnode !== 0):
      return "";
    case Array.isArray(vnode):
      return markHTMLString(
        (await Promise.all(vnode.map((v) => renderJSX(result, v)))).join("")
      );
  }
  if (isVNode(vnode)) {
    switch (true) {
      case !vnode.type: {
        throw new Error(`Unable to render ${result._metadata.pathname} because it contains an undefined Component!
Did you forget to import the component or is it possible there is a typo?`);
      }
      case vnode.type === Symbol.for("astro:fragment"):
        return renderJSX(result, vnode.props.children);
      case vnode.type.isAstroComponentFactory: {
        let props = {};
        let slots = {};
        for (const [key, value] of Object.entries(vnode.props ?? {})) {
          if (key === "children" || value && typeof value === "object" && value["$$slot"]) {
            slots[key === "children" ? "default" : key] = () => renderJSX(result, value);
          } else {
            props[key] = value;
          }
        }
        return markHTMLString(await renderToString(result, vnode.type, props, slots));
      }
      case (!vnode.type && vnode.type !== 0):
        return "";
      case (typeof vnode.type === "string" && vnode.type !== ClientOnlyPlaceholder):
        return markHTMLString(await renderElement$1(result, vnode.type, vnode.props ?? {}));
    }
    if (vnode.type) {
      let extractSlots2 = function(child) {
        if (Array.isArray(child)) {
          return child.map((c) => extractSlots2(c));
        }
        if (!isVNode(child)) {
          _slots.default.push(child);
          return;
        }
        if ("slot" in child.props) {
          _slots[child.props.slot] = [..._slots[child.props.slot] ?? [], child];
          delete child.props.slot;
          return;
        }
        _slots.default.push(child);
      };
      if (typeof vnode.type === "function" && vnode.type["astro:renderer"]) {
        skipAstroJSXCheck.add(vnode.type);
      }
      if (typeof vnode.type === "function" && vnode.props["server:root"]) {
        const output2 = await vnode.type(vnode.props ?? {});
        return await renderJSX(result, output2);
      }
      if (typeof vnode.type === "function" && !skipAstroJSXCheck.has(vnode.type)) {
        useConsoleFilter();
        try {
          const output2 = await vnode.type(vnode.props ?? {});
          if (output2 && output2[AstroJSX]) {
            return await renderJSX(result, output2);
          } else if (!output2) {
            return await renderJSX(result, output2);
          }
        } catch (e) {
          skipAstroJSXCheck.add(vnode.type);
        } finally {
          finishUsingConsoleFilter();
        }
      }
      const { children = null, ...props } = vnode.props ?? {};
      const _slots = {
        default: []
      };
      extractSlots2(children);
      for (const [key, value] of Object.entries(props)) {
        if (value["$$slot"]) {
          _slots[key] = value;
          delete props[key];
        }
      }
      const slotPromises = [];
      const slots = {};
      for (const [key, value] of Object.entries(_slots)) {
        slotPromises.push(
          renderJSX(result, value).then((output2) => {
            if (output2.toString().trim().length === 0)
              return;
            slots[key] = () => output2;
          })
        );
      }
      await Promise.all(slotPromises);
      let output;
      if (vnode.type === ClientOnlyPlaceholder && vnode.props["client:only"]) {
        output = await renderComponent(
          result,
          vnode.props["client:display-name"] ?? "",
          null,
          props,
          slots
        );
      } else {
        output = await renderComponent(
          result,
          typeof vnode.type === "function" ? vnode.type.name : vnode.type,
          vnode.type,
          props,
          slots
        );
      }
      if (typeof output !== "string" && Symbol.asyncIterator in output) {
        let parts = new HTMLParts();
        for await (const chunk of output) {
          parts.append(chunk, result);
        }
        return markHTMLString(parts.toString());
      } else {
        return markHTMLString(output);
      }
    }
  }
  return markHTMLString(`${vnode}`);
}
async function renderElement$1(result, tag, { children, ...props }) {
  return markHTMLString(
    `<${tag}${spreadAttributes(props)}${markHTMLString(
      (children == null || children == "") && voidElementNames.test(tag) ? `/>` : `>${children == null ? "" : await renderJSX(result, children)}</${tag}>`
    )}`
  );
}
function useConsoleFilter() {
  consoleFilterRefs++;
  if (!originalConsoleError) {
    originalConsoleError = console.error;
    try {
      console.error = filteredConsoleError;
    } catch (error) {
    }
  }
}
function finishUsingConsoleFilter() {
  consoleFilterRefs--;
}
function filteredConsoleError(msg, ...rest) {
  if (consoleFilterRefs > 0 && typeof msg === "string") {
    const isKnownReactHookError = msg.includes("Warning: Invalid hook call.") && msg.includes("https://reactjs.org/link/invalid-hook-call");
    if (isKnownReactHookError)
      return;
  }
  originalConsoleError(msg, ...rest);
}

/**
 * shortdash - https://github.com/bibig/node-shorthash
 *
 * @license
 *
 * (The MIT License)
 *
 * Copyright (c) 2013 Bibig <bibig@me.com>
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
const dictionary = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXY";
const binary = dictionary.length;
function bitwise(str) {
  let hash = 0;
  if (str.length === 0)
    return hash;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    hash = (hash << 5) - hash + ch;
    hash = hash & hash;
  }
  return hash;
}
function shorthash(text) {
  let num;
  let result = "";
  let integer = bitwise(text);
  const sign = integer < 0 ? "Z" : "";
  integer = Math.abs(integer);
  while (integer >= binary) {
    num = integer % binary;
    integer = Math.floor(integer / binary);
    result = dictionary[num] + result;
  }
  if (integer > 0) {
    result = dictionary[integer] + result;
  }
  return sign + result;
}

const voidElementNames = /^(area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/i;
const htmlBooleanAttributes = /^(allowfullscreen|async|autofocus|autoplay|controls|default|defer|disabled|disablepictureinpicture|disableremoteplayback|formnovalidate|hidden|loop|nomodule|novalidate|open|playsinline|readonly|required|reversed|scoped|seamless|itemscope)$/i;
const htmlEnumAttributes = /^(contenteditable|draggable|spellcheck|value)$/i;
const svgEnumAttributes = /^(autoReverse|externalResourcesRequired|focusable|preserveAlpha)$/i;
const STATIC_DIRECTIVES = /* @__PURE__ */ new Set(["set:html", "set:text"]);
const toIdent = (k) => k.trim().replace(/(?:(?!^)\b\w|\s+|[^\w]+)/g, (match, index) => {
  if (/[^\w]|\s/.test(match))
    return "";
  return index === 0 ? match : match.toUpperCase();
});
const toAttributeString = (value, shouldEscape = true) => shouldEscape ? String(value).replace(/&/g, "&#38;").replace(/"/g, "&#34;") : value;
const kebab = (k) => k.toLowerCase() === k ? k : k.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
const toStyleString = (obj) => Object.entries(obj).map(([k, v]) => `${kebab(k)}:${v}`).join(";");
function defineScriptVars(vars) {
  let output = "";
  for (const [key, value] of Object.entries(vars)) {
    output += `const ${toIdent(key)} = ${JSON.stringify(value)};
`;
  }
  return markHTMLString(output);
}
function formatList(values) {
  if (values.length === 1) {
    return values[0];
  }
  return `${values.slice(0, -1).join(", ")} or ${values[values.length - 1]}`;
}
function addAttribute(value, key, shouldEscape = true) {
  if (value == null) {
    return "";
  }
  if (value === false) {
    if (htmlEnumAttributes.test(key) || svgEnumAttributes.test(key)) {
      return markHTMLString(` ${key}="false"`);
    }
    return "";
  }
  if (STATIC_DIRECTIVES.has(key)) {
    console.warn(`[astro] The "${key}" directive cannot be applied dynamically at runtime. It will not be rendered as an attribute.

Make sure to use the static attribute syntax (\`${key}={value}\`) instead of the dynamic spread syntax (\`{...{ "${key}": value }}\`).`);
    return "";
  }
  if (key === "class:list") {
    const listValue = toAttributeString(serializeListValue(value), shouldEscape);
    if (listValue === "") {
      return "";
    }
    return markHTMLString(` ${key.slice(0, -5)}="${listValue}"`);
  }
  if (key === "style" && !(value instanceof HTMLString) && typeof value === "object") {
    return markHTMLString(` ${key}="${toAttributeString(toStyleString(value), shouldEscape)}"`);
  }
  if (key === "className") {
    return markHTMLString(` class="${toAttributeString(value, shouldEscape)}"`);
  }
  if (value === true && (key.startsWith("data-") || htmlBooleanAttributes.test(key))) {
    return markHTMLString(` ${key}`);
  } else {
    return markHTMLString(` ${key}="${toAttributeString(value, shouldEscape)}"`);
  }
}
function internalSpreadAttributes(values, shouldEscape = true) {
  let output = "";
  for (const [key, value] of Object.entries(values)) {
    output += addAttribute(value, key, shouldEscape);
  }
  return markHTMLString(output);
}
function renderElement(name, { props: _props, children = "" }, shouldEscape = true) {
  const { lang: _, "data-astro-id": astroId, "define:vars": defineVars, ...props } = _props;
  if (defineVars) {
    if (name === "style") {
      delete props["is:global"];
      delete props["is:scoped"];
    }
    if (name === "script") {
      delete props.hoist;
      children = defineScriptVars(defineVars) + "\n" + children;
    }
  }
  if ((children == null || children == "") && voidElementNames.test(name)) {
    return `<${name}${internalSpreadAttributes(props, shouldEscape)} />`;
  }
  return `<${name}${internalSpreadAttributes(props, shouldEscape)}>${children}</${name}>`;
}

function componentIsHTMLElement(Component) {
  return typeof HTMLElement !== "undefined" && HTMLElement.isPrototypeOf(Component);
}
async function renderHTMLElement(result, constructor, props, slots) {
  const name = getHTMLElementName(constructor);
  let attrHTML = "";
  for (const attr in props) {
    attrHTML += ` ${attr}="${toAttributeString(await props[attr])}"`;
  }
  return markHTMLString(
    `<${name}${attrHTML}>${await renderSlot(result, slots == null ? void 0 : slots.default)}</${name}>`
  );
}
function getHTMLElementName(constructor) {
  const definedName = customElements.getName(constructor);
  if (definedName)
    return definedName;
  const assignedName = constructor.name.replace(/^HTML|Element$/g, "").replace(/[A-Z]/g, "-$&").toLowerCase().replace(/^-/, "html-");
  return assignedName;
}

const rendererAliases = /* @__PURE__ */ new Map([["solid", "solid-js"]]);
function guessRenderers(componentUrl) {
  const extname = componentUrl == null ? void 0 : componentUrl.split(".").pop();
  switch (extname) {
    case "svelte":
      return ["@astrojs/svelte"];
    case "vue":
      return ["@astrojs/vue"];
    case "jsx":
    case "tsx":
      return ["@astrojs/react", "@astrojs/preact", "@astrojs/vue (jsx)"];
    default:
      return ["@astrojs/react", "@astrojs/preact", "@astrojs/vue", "@astrojs/svelte"];
  }
}
function getComponentType(Component) {
  if (Component === Fragment) {
    return "fragment";
  }
  if (Component && typeof Component === "object" && Component["astro:html"]) {
    return "html";
  }
  if (isAstroComponentFactory(Component)) {
    return "astro-factory";
  }
  return "unknown";
}
async function renderComponent(result, displayName, Component, _props, slots = {}) {
  var _a;
  Component = await Component ?? Component;
  switch (getComponentType(Component)) {
    case "fragment": {
      const children2 = await renderSlot(result, slots == null ? void 0 : slots.default);
      if (children2 == null) {
        return children2;
      }
      return markHTMLString(children2);
    }
    case "html": {
      const { slotInstructions: slotInstructions2, children: children2 } = await renderSlots(result, slots);
      const html2 = Component.render({ slots: children2 });
      const hydrationHtml = slotInstructions2 ? slotInstructions2.map((instr) => stringifyChunk(result, instr)).join("") : "";
      return markHTMLString(hydrationHtml + html2);
    }
    case "astro-factory": {
      async function* renderAstroComponentInline() {
        let iterable = await renderToIterable(result, Component, displayName, _props, slots);
        yield* iterable;
      }
      return renderAstroComponentInline();
    }
  }
  if (!Component && !_props["client:only"]) {
    throw new Error(
      `Unable to render ${displayName} because it is ${Component}!
Did you forget to import the component or is it possible there is a typo?`
    );
  }
  const { renderers } = result._metadata;
  const metadata = { displayName };
  const { hydration, isPage, props } = extractDirectives(_props);
  let html = "";
  let attrs = void 0;
  if (hydration) {
    metadata.hydrate = hydration.directive;
    metadata.hydrateArgs = hydration.value;
    metadata.componentExport = hydration.componentExport;
    metadata.componentUrl = hydration.componentUrl;
  }
  const probableRendererNames = guessRenderers(metadata.componentUrl);
  if (Array.isArray(renderers) && renderers.length === 0 && typeof Component !== "string" && !componentIsHTMLElement(Component)) {
    const message = `Unable to render ${metadata.displayName}!

There are no \`integrations\` set in your \`astro.config.mjs\` file.
Did you mean to add ${formatList(probableRendererNames.map((r) => "`" + r + "`"))}?`;
    throw new Error(message);
  }
  const { children, slotInstructions } = await renderSlots(result, slots);
  let renderer;
  if (metadata.hydrate !== "only") {
    let isTagged = false;
    try {
      isTagged = Component && Component[Renderer];
    } catch {
    }
    if (isTagged) {
      const rendererName = Component[Renderer];
      renderer = renderers.find(({ name }) => name === rendererName);
    }
    if (!renderer) {
      let error;
      for (const r of renderers) {
        try {
          if (await r.ssr.check.call({ result }, Component, props, children)) {
            renderer = r;
            break;
          }
        } catch (e) {
          error ?? (error = e);
        }
      }
      if (!renderer && error) {
        throw error;
      }
    }
    if (!renderer && typeof HTMLElement === "function" && componentIsHTMLElement(Component)) {
      const output = renderHTMLElement(result, Component, _props, slots);
      return output;
    }
  } else {
    if (metadata.hydrateArgs) {
      const passedName = metadata.hydrateArgs;
      const rendererName = rendererAliases.has(passedName) ? rendererAliases.get(passedName) : passedName;
      renderer = renderers.find(
        ({ name }) => name === `@astrojs/${rendererName}` || name === rendererName
      );
    }
    if (!renderer && renderers.length === 1) {
      renderer = renderers[0];
    }
    if (!renderer) {
      const extname = (_a = metadata.componentUrl) == null ? void 0 : _a.split(".").pop();
      renderer = renderers.filter(
        ({ name }) => name === `@astrojs/${extname}` || name === extname
      )[0];
    }
  }
  if (!renderer) {
    if (metadata.hydrate === "only") {
      throw new Error(`Unable to render ${metadata.displayName}!

Using the \`client:only\` hydration strategy, Astro needs a hint to use the correct renderer.
Did you mean to pass <${metadata.displayName} client:only="${probableRendererNames.map((r) => r.replace("@astrojs/", "")).join("|")}" />
`);
    } else if (typeof Component !== "string") {
      const matchingRenderers = renderers.filter((r) => probableRendererNames.includes(r.name));
      const plural = renderers.length > 1;
      if (matchingRenderers.length === 0) {
        throw new Error(`Unable to render ${metadata.displayName}!

There ${plural ? "are" : "is"} ${renderers.length} renderer${plural ? "s" : ""} configured in your \`astro.config.mjs\` file,
but ${plural ? "none were" : "it was not"} able to server-side render ${metadata.displayName}.

Did you mean to enable ${formatList(probableRendererNames.map((r) => "`" + r + "`"))}?`);
      } else if (matchingRenderers.length === 1) {
        renderer = matchingRenderers[0];
        ({ html, attrs } = await renderer.ssr.renderToStaticMarkup.call(
          { result },
          Component,
          props,
          children,
          metadata
        ));
      } else {
        throw new Error(`Unable to render ${metadata.displayName}!

This component likely uses ${formatList(probableRendererNames)},
but Astro encountered an error during server-side rendering.

Please ensure that ${metadata.displayName}:
1. Does not unconditionally access browser-specific globals like \`window\` or \`document\`.
   If this is unavoidable, use the \`client:only\` hydration directive.
2. Does not conditionally return \`null\` or \`undefined\` when rendered on the server.

If you're still stuck, please open an issue on GitHub or join us at https://astro.build/chat.`);
      }
    }
  } else {
    if (metadata.hydrate === "only") {
      html = await renderSlot(result, slots == null ? void 0 : slots.fallback);
    } else {
      ({ html, attrs } = await renderer.ssr.renderToStaticMarkup.call(
        { result },
        Component,
        props,
        children,
        metadata
      ));
    }
  }
  if (renderer && !renderer.clientEntrypoint && renderer.name !== "@astrojs/lit" && metadata.hydrate) {
    throw new Error(
      `${metadata.displayName} component has a \`client:${metadata.hydrate}\` directive, but no client entrypoint was provided by ${renderer.name}!`
    );
  }
  if (!html && typeof Component === "string") {
    const childSlots = Object.values(children).join("");
    const iterable = renderAstroComponent(
      await renderTemplate`<${Component}${internalSpreadAttributes(props)}${markHTMLString(
        childSlots === "" && voidElementNames.test(Component) ? `/>` : `>${childSlots}</${Component}>`
      )}`
    );
    html = "";
    for await (const chunk of iterable) {
      html += chunk;
    }
  }
  if (!hydration) {
    return async function* () {
      if (slotInstructions) {
        yield* slotInstructions;
      }
      if (isPage || (renderer == null ? void 0 : renderer.name) === "astro:jsx") {
        yield html;
      } else {
        yield markHTMLString(html.replace(/\<\/?astro-slot\>/g, ""));
      }
    }();
  }
  const astroId = shorthash(
    `<!--${metadata.componentExport.value}:${metadata.componentUrl}-->
${html}
${serializeProps(
      props,
      metadata
    )}`
  );
  const island = await generateHydrateScript(
    { renderer, result, astroId, props, attrs },
    metadata
  );
  let unrenderedSlots = [];
  if (html) {
    if (Object.keys(children).length > 0) {
      for (const key of Object.keys(children)) {
        if (!html.includes(key === "default" ? `<astro-slot>` : `<astro-slot name="${key}">`)) {
          unrenderedSlots.push(key);
        }
      }
    }
  } else {
    unrenderedSlots = Object.keys(children);
  }
  const template = unrenderedSlots.length > 0 ? unrenderedSlots.map(
    (key) => `<template data-astro-template${key !== "default" ? `="${key}"` : ""}>${children[key]}</template>`
  ).join("") : "";
  island.children = `${html ?? ""}${template}`;
  if (island.children) {
    island.props["await-children"] = "";
  }
  async function* renderAll() {
    if (slotInstructions) {
      yield* slotInstructions;
    }
    yield { type: "directive", hydration, result };
    yield markHTMLString(renderElement("astro-island", island, false));
  }
  return renderAll();
}

const uniqueElements = (item, index, all) => {
  const props = JSON.stringify(item.props);
  const children = item.children;
  return index === all.findIndex((i) => JSON.stringify(i.props) === props && i.children == children);
};
function renderHead(result) {
  result._metadata.hasRenderedHead = true;
  const styles = Array.from(result.styles).filter(uniqueElements).map((style) => renderElement("style", style));
  result.styles.clear();
  const scripts = Array.from(result.scripts).filter(uniqueElements).map((script, i) => {
    return renderElement("script", script, false);
  });
  const links = Array.from(result.links).filter(uniqueElements).map((link) => renderElement("link", link, false));
  return markHTMLString(links.join("\n") + styles.join("\n") + scripts.join("\n"));
}
async function* maybeRenderHead(result) {
  if (result._metadata.hasRenderedHead) {
    return;
  }
  yield renderHead(result);
}

typeof process === "object" && Object.prototype.toString.call(process) === "[object process]";

function createComponent(cb) {
  cb.isAstroComponentFactory = true;
  return cb;
}
function spreadAttributes(values, _name, { class: scopedClassName } = {}) {
  let output = "";
  if (scopedClassName) {
    if (typeof values.class !== "undefined") {
      values.class += ` ${scopedClassName}`;
    } else if (typeof values["class:list"] !== "undefined") {
      values["class:list"] = [values["class:list"], scopedClassName];
    } else {
      values.class = scopedClassName;
    }
  }
  for (const [key, value] of Object.entries(values)) {
    output += addAttribute(value, key, true);
  }
  return markHTMLString(output);
}

const AstroJSX = "astro:jsx";
const Empty = Symbol("empty");
const toSlotName = (slotAttr) => slotAttr;
function isVNode(vnode) {
  return vnode && typeof vnode === "object" && vnode[AstroJSX];
}
function transformSlots(vnode) {
  if (typeof vnode.type === "string")
    return vnode;
  const slots = {};
  if (isVNode(vnode.props.children)) {
    const child = vnode.props.children;
    if (!isVNode(child))
      return;
    if (!("slot" in child.props))
      return;
    const name = toSlotName(child.props.slot);
    slots[name] = [child];
    slots[name]["$$slot"] = true;
    delete child.props.slot;
    delete vnode.props.children;
  }
  if (Array.isArray(vnode.props.children)) {
    vnode.props.children = vnode.props.children.map((child) => {
      if (!isVNode(child))
        return child;
      if (!("slot" in child.props))
        return child;
      const name = toSlotName(child.props.slot);
      if (Array.isArray(slots[name])) {
        slots[name].push(child);
      } else {
        slots[name] = [child];
        slots[name]["$$slot"] = true;
      }
      delete child.props.slot;
      return Empty;
    }).filter((v) => v !== Empty);
  }
  Object.assign(vnode.props, slots);
}
function markRawChildren(child) {
  if (typeof child === "string")
    return markHTMLString(child);
  if (Array.isArray(child))
    return child.map((c) => markRawChildren(c));
  return child;
}
function transformSetDirectives(vnode) {
  if (!("set:html" in vnode.props || "set:text" in vnode.props))
    return;
  if ("set:html" in vnode.props) {
    const children = markRawChildren(vnode.props["set:html"]);
    delete vnode.props["set:html"];
    Object.assign(vnode.props, { children });
    return;
  }
  if ("set:text" in vnode.props) {
    const children = vnode.props["set:text"];
    delete vnode.props["set:text"];
    Object.assign(vnode.props, { children });
    return;
  }
}
function createVNode(type, props) {
  const vnode = {
    [Renderer]: "astro:jsx",
    [AstroJSX]: true,
    type,
    props: props ?? {}
  };
  transformSetDirectives(vnode);
  transformSlots(vnode);
  return vnode;
}

const slotName = (str) => str.trim().replace(/[-_]([a-z])/g, (_, w) => w.toUpperCase());
async function check(Component, props, { default: children = null, ...slotted } = {}) {
  if (typeof Component !== "function")
    return false;
  const slots = {};
  for (const [key, value] of Object.entries(slotted)) {
    const name = slotName(key);
    slots[name] = value;
  }
  try {
    const result = await Component({ ...props, ...slots, children });
    return result[AstroJSX];
  } catch (e) {
  }
  return false;
}
async function renderToStaticMarkup(Component, props = {}, { default: children = null, ...slotted } = {}) {
  const slots = {};
  for (const [key, value] of Object.entries(slotted)) {
    const name = slotName(key);
    slots[name] = value;
  }
  const { result } = this;
  const html = await renderJSX(result, createVNode(Component, { ...props, ...slots, children }));
  return { html };
}
var server_default = {
  check,
  renderToStaticMarkup
};

const $$Astro$v = createAstro("C:/Users/bryce/Desktop/Projects/astro-headless-ui/package/style-components/AnimatedSpriteSheet.astro", "", "file:///C:/Users/bryce/Desktop/Projects/astro-headless-ui/");
const $$AnimatedSpriteSheet = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$v, $$props, $$slots);
  Astro2.self = $$AnimatedSpriteSheet;
  const {
    is: Is = "div",
    name = "sprite-animation",
    url,
    cols = 1,
    rows = 1,
    height,
    width,
    speed = 1e3,
    class: _class,
    ...attrs
  } = Astro2.props;
  const horizontal = cols > 1 && rows === 1 ? true : false;
  const vertical = rows > 1 && cols === 1 ? true : false;
  const grid = cols > 1 && rows > 1 ? true : false;
  return renderTemplate`${renderComponent($$result, "Is", Is, { ...attrs, "class:list": [name, _class] }, { "default": () => renderTemplate`${renderSlot($$result, $$slots["default"])}` })}

<style>${unescapeHTML(` .${name} { height: ${height / rows}px; width: ${width / cols}px; background: transparent url(${url}) 0 0 no-repeat; animation: ${horizontal ? `${name}-x ${speed}ms steps(${cols}) infinite;` : ""} ${vertical ? `${name}-y ${speed}ms steps(${rows}) infinite;` : ""} ${grid ? `${name}-x ${speed}ms steps(${cols}) infinite,${name}-y ${speed * rows}ms steps(${rows}) infinite;` : ""} } ${horizontal || grid ? ` @keyframes ${name}-x { 0% {background-position-x: 0px;} 100% { background-position-x: -${width}px; } } ` : ""} ${vertical || grid ? ` @keyframes ${name}-y { 0% {background-position-y: 0px;} 100% { background-position-y: -${height}px; } } ` : ""} `)}</style>`;
});

const $$Astro$u = createAstro("C:/Users/bryce/Desktop/Projects/astro-headless-ui/package/style-components/ThemeIcon.astro", "", "file:///C:/Users/bryce/Desktop/Projects/astro-headless-ui/");
const $$ThemeIcon = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$u, $$props, $$slots);
  Astro2.self = $$ThemeIcon;
  const {
    is: Is = "span",
    size = "1rem",
    name = "theme-icons",
    theme = "body.dark",
    animation = "height",
    speed = "250",
    class: _class,
    ...attrs
  } = Astro2.props;
  if (!Number.isInteger(+speed))
    console.warn("<ThemeIcon>: 'speed' prop must be a number or string number");
  const height = animation === "height";
  const width = animation === "width";
  const opacity = animation === "opacity";
  return renderTemplate`${renderComponent($$result, "Is", Is, { ...attrs, "class:list": [name, _class] }, { "default": () => renderTemplate`${renderSlot($$result, $$slots["default"])}` })}

<style>${unescapeHTML(`.${name}{position:relative;display:block;height:${size};width:${size};}.${name} *:nth-child(1){position:absolute;inset:0;height:100%;width:100%;${animation ? `transition:${animation} ${speed}ms;` : ""}}.${name} *:nth-child(2){position:absolute;inset:0;height:${height ? "0" : "100%"};width:${width ? "0" : "100%"};${opacity ? `opacity:0;` : ""}${animation ? `transition:${animation} ${speed}ms;` : ""}}${theme} .${name} *:nth-child(1){${animation}:0;}${theme} .${name} *:nth-child(2){${animation}:100%;}`)}</style>`;
});

const $$Astro$t = createAstro("C:/Users/bryce/Desktop/Projects/astro-headless-ui/package/components/Rating.astro", "", "file:///C:/Users/bryce/Desktop/Projects/astro-headless-ui/");
const $$Rating$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$t, $$props, $$slots);
  Astro2.self = $$Rating$1;
  const {
    total = 5,
    active = 0
  } = Astro2.props;
  return renderTemplate`${[...Array(Math.floor(+active))].map((_) => renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": () => renderTemplate`${unescapeHTML(Astro2.slots.render("active"))}` })}`)}
${+active - Math.floor(+active) > 0 && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": () => renderTemplate`${unescapeHTML(Astro2.slots.render("half"))}` })}`}
${[...Array(Math.floor(+total - +active))].map((_) => renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": () => renderTemplate`${unescapeHTML(Astro2.slots.render("disabled"))}` })}`)}`;
});

const $$Astro$s = createAstro("C:/Users/bryce/Desktop/Projects/astro-headless-ui/package/components/Link.astro", "", "file:///C:/Users/bryce/Desktop/Projects/astro-headless-ui/");
const $$Link = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$s, $$props, $$slots);
  Astro2.self = $$Link;
  const {
    text,
    active,
    mode = "join",
    ...attrs
  } = Astro2.props;
  var calc = { text, ...attrs };
  if (mode === "join" && active) {
    for (const [key, val] of Object.entries(active)) {
      if (!key)
        continue;
      if (key === "text")
        calc[key] = void 0;
      if (calc[key])
        calc[key] += val;
      else
        calc[key] = val;
    }
  } else if (mode === "spread" && active)
    calc = { ...calc, ...active };
  else if (mode === "replace" && active)
    calc = { ...active };
  return renderTemplate`${(_) => {
    if (Astro2.url.pathname === attrs.href) {
      if (Astro2.slots.has("active"))
        return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": () => renderTemplate`${unescapeHTML(Astro2.slots.render("active"))}` })}`;
      if (active)
        return renderTemplate`${maybeRenderHead($$result)}<a${spreadAttributes(calc)}>${calc.text}${renderComponent($$result, "Fragment", Fragment, {}, { "default": () => renderTemplate`${unescapeHTML(Astro2.slots.render("default"))}` })}</a>`;
    }
    return renderTemplate`<a${spreadAttributes(attrs)}>${text}${renderComponent($$result, "Fragment", Fragment, {}, { "default": () => renderTemplate`${unescapeHTML(Astro2.slots.render("default"))}` })}</a>`;
  }}`;
});

const $$Astro$r = createAstro("C:/Users/bryce/Desktop/Projects/astro-headless-ui/package/components/Navigation.astro", "", "file:///C:/Users/bryce/Desktop/Projects/astro-headless-ui/");
const $$Navigation = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$r, $$props, $$slots);
  Astro2.self = $$Navigation;
  const {
    links,
    defaults,
    active,
    mode
  } = Astro2.props;
  return renderTemplate`${links.map((link) => {
    const attrs = { active, mode, ...defaults, ...link };
    if (Object.keys(Astro2.slots).length > 0) {
      if (Astro2.url.pathname === link.href && Astro2.slots.has("active"))
        return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": () => renderTemplate`${unescapeHTML(Astro2.slots.render("active", [attrs]))}` })}`;
      return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": () => renderTemplate`${unescapeHTML(Astro2.slots.render("default", [attrs]))}` })}`;
    }
    return renderTemplate`${renderComponent($$result, "Link", $$Link, { ...attrs })}`;
  })}`;
});

const $$Astro$q = createAstro("C:/Users/bryce/Desktop/Projects/astro-headless-ui/package/components/Breadcrumb.astro", "", "file:///C:/Users/bryce/Desktop/Projects/astro-headless-ui/");
const $$Breadcrumb$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$q, $$props, $$slots);
  Astro2.self = $$Breadcrumb$1;
  const {
    index = "Home",
    collapse = false,
    start = 1,
    end = 3
  } = Astro2.props;
  let {
    url = Astro2.url
  } = Astro2.props;
  if (typeof url === "string")
    url = new URL(url);
  const slugs = url.pathname.endsWith("/") ? url.pathname.slice(0, -1).split("/") : url.pathname.split("/");
  function disabled(i) {
    if (i + 1 > (index ? +start : +start + 1) && i < slugs.length - +end)
      return true;
    return false;
  }
  var previous = "";
  return renderTemplate`${slugs.map((slug, i) => {
    let text = slug;
    if (i === 0) {
      if (index === false)
        return false;
      text = "" + index;
    }
    previous = `${previous}${slug}/`;
    const param = {
      href: i === 0 ? "/" : previous.slice(0, -1),
      slug,
      text
    };
    if (Object.keys(Astro2.slots).length > 0) {
      if (Astro2.slots.has("active") && i === slugs.length - 1)
        return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": () => renderTemplate`${unescapeHTML(Astro2.slots.render("active", [param]))}` })}`;
      if (Astro2.slots.has("disabled") && collapse && disabled(i))
        return !disabled(i - 1) && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": () => renderTemplate`${unescapeHTML(Astro2.slots.render("disabled", [param]))}` })}`;
      if (Astro2.slots.has(slug))
        return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": () => renderTemplate`${unescapeHTML(Astro2.slots.render(slug, [param]))}` })}`;
      if (Astro2.slots.has("" + i))
        return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": () => renderTemplate`${unescapeHTML(Astro2.slots.render("" + i, [param]))}` })}`;
      return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": () => renderTemplate`${unescapeHTML(Astro2.slots.render("default", [param]))}` })}`;
    }
    if (collapse && disabled(i))
      return !disabled(i - 1) && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": () => renderTemplate`${maybeRenderHead($$result)}<span class="disabled">...</span><span class="divider">/</span>` })}`;
    if (i === slugs.length - 1)
      return renderTemplate`<span class="active">${text}</span>`;
    return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": () => renderTemplate`<a${addAttribute(param.href, "href")}>${text}</a><span class="divider">/</span>` })}`;
  })}`;
});

const $$Astro$p = createAstro("C:/Users/bryce/Desktop/Projects/astro-headless-ui/package/components/Paginate.astro", "", "file:///C:/Users/bryce/Desktop/Projects/astro-headless-ui/");
const $$Paginate = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$p, $$props, $$slots);
  Astro2.self = $$Paginate;
  const {
    data = [],
    size = 10,
    page = 1
  } = Astro2.props;
  const last = Math.max(1, Math.ceil(data.length / +size));
  const pages = [...Array(last).keys()].map((n) => {
    const num = n + 1;
    const start = +size === Infinity ? 0 : (num - 1) * +size;
    const end = Math.min(start + +size, data.length);
    return {
      data: data.slice(start, end),
      start,
      end: end - 1,
      size,
      total: data.length,
      current: num ? num : void 0,
      last
    };
  });
  return renderTemplate`${(_) => {
    if (!Number.isInteger(+page) || page > last)
      return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": () => renderTemplate`${unescapeHTML(Astro2.slots.render("error", [pages.pop()]))}` })}`;
    if (Astro2.slots.has("" + page))
      return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": () => renderTemplate`${unescapeHTML(Astro2.slots.render("" + page, [pages[+page - 1]]))}` })}`;
    return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": () => renderTemplate`${unescapeHTML(Astro2.slots.render("default", [pages[+page - 1]]))}` })}`;
  }}`;
});

const $$Astro$o = createAstro("C:/Users/bryce/Desktop/Projects/astro-headless-ui/package/components/Pagination.astro", "", "file:///C:/Users/bryce/Desktop/Projects/astro-headless-ui/");
const $$Pagination = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$o, $$props, $$slots);
  Astro2.self = $$Pagination;
  const {
    url = "",
    total,
    current,
    start = 2,
    end = 2,
    middle = 2,
    before = middle,
    after = middle,
    index,
    commas = true,
    collapse = true
  } = Astro2.props;
  function disabled(page) {
    if (!collapse)
      return false;
    else if (+current === page)
      return false;
    else if (page <= +start || page >= +total - (+end - 1))
      return false;
    else if (page >= +current - +before && page <= +current + +after)
      return false;
    else
      return true;
  }
  return renderTemplate`${Array.from({ length: +total }, (_, i) => i + 1).map((i) => {
    let slot;
    if (+current === i)
      slot = "active";
    else if (i !== 1 && disabled(i) && !disabled(i - 1))
      slot = "disabled";
    else if (!disabled(i)) {
      if (i === 1)
        slot = "first";
      else if (i === +current - 1)
        slot = "before";
      else if (i === +current + 1)
        slot = "after";
      else if (i === +total)
        slot = "last";
      else
        slot = "link";
    }
    const param = {
      number: commas ? Intl.NumberFormat("en-us").format(i) : i,
      href: i === 1 ? index ? `${url}/` : `${url}/${i}` : `${url}/${i}`,
      slot
    };
    if (Object.keys(Astro2.slots).length > 0) {
      if (Astro2.slots.has("" + i))
        return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": () => renderTemplate`${unescapeHTML(Astro2.slots.render("" + i, [param]))}` })}`;
      if (Astro2.slots.has(slot))
        return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": () => renderTemplate`${unescapeHTML(Astro2.slots.render(slot, [param]))}` })}`;
      if (slot)
        return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": () => renderTemplate`${unescapeHTML(Astro2.slots.render("default", [param]))}` })}`;
    }
    if (slot === "active")
      return renderTemplate`${maybeRenderHead($$result)}<span class="active">${param.number}</span>`;
    if (slot === "disabled")
      return renderTemplate`<span class="disabled">...</span>`;
    if (slot)
      return renderTemplate`<a${addAttribute(param.href, "href")}>${param.number}</a>`;
  })}`;
});

const $$Astro$n = createAstro("C:/Users/bryce/Desktop/Projects/astro-headless-ui/package/components/Map.astro", "", "file:///C:/Users/bryce/Desktop/Projects/astro-headless-ui/");
const $$Map$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$n, $$props, $$slots);
  Astro2.self = $$Map$1;
  const array = Object.entries(Astro2.props).map(([key, val]) => {
    if (Number.isInteger(+key))
      return val;
  });
  return renderTemplate`${array.map((item, i) => {
    if (Astro2.slots.has("" + i))
      return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": () => renderTemplate`${unescapeHTML(Astro2.slots.render("" + i, [array.at(i)]))}` })}`;
    if (i === array.length - 1 && Astro2.slots.has("last"))
      return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": () => renderTemplate`${unescapeHTML(Astro2.slots.render("last", [array.pop()]))}` })}`;
    return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": () => renderTemplate`${unescapeHTML(Astro2.slots.render("default", [item]))}` })}`;
  })}`;
});

var __freeze$4 = Object.freeze;
var __defProp$4 = Object.defineProperty;
var __template$4 = (cooked, raw) => __freeze$4(__defProp$4(cooked, "raw", { value: __freeze$4(raw || cooked.slice()) }));
var _a$4;
const $$Astro$m = createAstro("C:/Users/bryce/Desktop/Projects/astro-headless-ui/package/client-components/ThemeToggle.astro", "", "file:///C:/Users/bryce/Desktop/Projects/astro-headless-ui/");
const $$ThemeToggle$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$m, $$props, $$slots);
  Astro2.self = $$ThemeToggle$1;
  const {
    selector: _selector = "body",
    theme: _theme = "dark",
    dark: _dark,
    ...attrs
  } = Astro2.props;
  const _scope = _selector.replace(/[^a-z0-9]/gi, "");
  const _attrs = {
    onclick: `${_scope}${_theme}Toggle()`,
    "aria-label": `toggle ${_theme} theme`,
    ...attrs
  };
  return renderTemplate(_a$4 || (_a$4 = __template$4(["<script>(function(){", "\n    const session = `${scope}Theme`\n    const func = `${scope}${theme}Toggle`\n    const classes = document.querySelector(sel).classList\n    // Persist Theme before doing aything else\n    sessionStorage.getItem(session) === theme && classes.add(theme)\n    // Initialize themes object, stores all themes relted to a selector\n    window.themes = window.themes || {}\n    window.themes[sel] = window.themes[sel] || []\n    // Add theme if it doesnt exist inside themes object\n    !window.themes[sel].includes(theme) && window.themes[sel].push(theme)\n    // Delecare function that toggles the theme\n    window[func] = (toggle=!classes.contains(theme)) => {\n        // Remove all other themes from the classList\n        classes.forEach(c => c !== theme && window.themes[sel].includes(c) && classes.remove(c))\n        // Add or remove class from classList and sessionStorage\n        toggle\n            ? (classes.add(theme), sessionStorage.setItem(session, theme))\n            : (classes.remove(theme), sessionStorage.setItem(session, ''))\n    }\n    // If theme is declared as dark attach listener for system prefrence change\n    dark && window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', v => window[func](v.matches))\n})();<\/script>\n\n", "<button", ">\n    ", "\n</button>"], ["<script>(function(){", "\n    const session = \\`\\${scope}Theme\\`\n    const func = \\`\\${scope}\\${theme}Toggle\\`\n    const classes = document.querySelector(sel).classList\n    // Persist Theme before doing aything else\n    sessionStorage.getItem(session) === theme && classes.add(theme)\n    // Initialize themes object, stores all themes relted to a selector\n    window.themes = window.themes || {}\n    window.themes[sel] = window.themes[sel] || []\n    // Add theme if it doesnt exist inside themes object\n    !window.themes[sel].includes(theme) && window.themes[sel].push(theme)\n    // Delecare function that toggles the theme\n    window[func] = (toggle=!classes.contains(theme)) => {\n        // Remove all other themes from the classList\n        classes.forEach(c => c !== theme && window.themes[sel].includes(c) && classes.remove(c))\n        // Add or remove class from classList and sessionStorage\n        toggle\n            ? (classes.add(theme), sessionStorage.setItem(session, theme))\n            : (classes.remove(theme), sessionStorage.setItem(session, ''))\n    }\n    // If theme is declared as dark attach listener for system prefrence change\n    dark && window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', v => window[func](v.matches))\n})();<\/script>\n\n", "<button", ">\n    ", "\n</button>"])), defineScriptVars({
    sel: _selector,
    scope: _scope,
    theme: _theme,
    dark: _dark
  }), maybeRenderHead($$result), spreadAttributes(_attrs), renderSlot($$result, $$slots["default"]));
});

const $$Astro$l = createAstro("C:/Users/bryce/Desktop/Projects/astro-headless-ui/package/scripts/NoScriptProp.astro", "", "file:///C:/Users/bryce/Desktop/Projects/astro-headless-ui/");
const $$NoScriptProp = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$l, $$props, $$slots);
  Astro2.self = $$NoScriptProp;
  const {
    selector = ":root",
    property = "noscript",
    className = "noscript-hide"
  } = Astro2.props;
  return renderTemplate`<style>${unescapeHTML(`
    ${selector} {
        --${property}: false;
    }
    .${className} {
        display: var(--noscript, none);
    }
`)}</style>

${maybeRenderHead($$result)}<noscript>
    <style>${unescapeHTML(`
        ${selector} {
            --${property}: initial !important;
        }
    `)}</style>
</noscript>`;
});

var __freeze$3 = Object.freeze;
var __defProp$3 = Object.defineProperty;
var __template$3 = (cooked, raw) => __freeze$3(__defProp$3(cooked, "raw", { value: __freeze$3(raw || cooked.slice()) }));
var _a$3;
const $$Astro$k = createAstro("C:/Users/bryce/Desktop/Projects/astro-headless-ui/package/scripts/ScrollProp.astro", "", "file:///C:/Users/bryce/Desktop/Projects/astro-headless-ui/");
const $$ScrollProp = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$k, $$props, $$slots);
  Astro2.self = $$ScrollProp;
  const {
    selector = ":root",
    attach = selector,
    property = "scroll"
  } = Astro2.props;
  return renderTemplate(_a$3 || (_a$3 = __template$3(["<script>(function(){", `
    const t = document.querySelector(a)
    const e = [":root", "html"].includes(s)?window:document.querySelector(s)
    e.addEventListener('scroll', () => {
        t.style.setProperty(y, t.scrollTop);
        t.style.setProperty(x, t.scrollLeft);
    }, false);
})();<\/script>`])), defineScriptVars({
    s: selector,
    a: attach,
    x: `--${property}-X`,
    y: `--${property}-Y`
  }));
});

var __freeze$2 = Object.freeze;
var __defProp$2 = Object.defineProperty;
var __template$2 = (cooked, raw) => __freeze$2(__defProp$2(cooked, "raw", { value: __freeze$2(raw || cooked.slice()) }));
var _a$2;
const $$Astro$j = createAstro("C:/Users/bryce/Desktop/Projects/astro-headless-ui/package/scripts/MouseProp.astro", "", "file:///C:/Users/bryce/Desktop/Projects/astro-headless-ui/");
const $$MouseProp = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$j, $$props, $$slots);
  Astro2.self = $$MouseProp;
  const {
    selector = ":root",
    attach = selector,
    property = "mouse"
  } = Astro2.props;
  return renderTemplate(_a$2 || (_a$2 = __template$2(["<script>(function(){", `
    const t = document.querySelector(a)
    const e = [":root", "html", "body"].includes(s)?window:document.querySelector(s)
    const b = e===t
    e.addEventListener('mousemove', (v) => {
        t.style.setProperty(x, b?v.offsetX:v.clientX);
        t.style.setProperty(y, b?v.offsetY:v.clientY);
    }, false);
})();<\/script>`])), defineScriptVars({
    s: selector,
    a: attach,
    x: `--${property}-X`,
    y: `--${property}-Y`
  }));
});

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(raw || cooked.slice()) }));
var _a$1;
const $$Astro$i = createAstro("C:/Users/bryce/Desktop/Projects/astro-headless-ui/package/scripts/KeyboardProp.astro", "", "file:///C:/Users/bryce/Desktop/Projects/astro-headless-ui/");
const $$KeyboardProp = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$i, $$props, $$slots);
  Astro2.self = $$KeyboardProp;
  const {
    selector = ":root",
    attach = selector,
    property = "keyboard"
  } = Astro2.props;
  return renderTemplate(_a$1 || (_a$1 = __template$1(["<script>(function(){", `
    const t = document.querySelector(a)
    const e = [":root", "html", "body"].includes(s)?window:document.querySelector(s)
    e.addEventListener('keydown', v => {
        !v.repeat&&t.style.setProperty(k, \`'\${v.key}'\`)
    }, false);
})();<\/script>`], ["<script>(function(){", `
    const t = document.querySelector(a)
    const e = [":root", "html", "body"].includes(s)?window:document.querySelector(s)
    e.addEventListener('keydown', v => {
        !v.repeat&&t.style.setProperty(k, \\\`'\\\${v.key}'\\\`)
    }, false);
})();<\/script>`])), defineScriptVars({
    s: selector,
    a: attach,
    k: `--${property}-key`
  }));
});

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro$h = createAstro("C:/Users/bryce/Desktop/Projects/astro-headless-ui/package/scripts/NetworkProp.astro", "", "file:///C:/Users/bryce/Desktop/Projects/astro-headless-ui/");
const $$NetworkProp = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$h, $$props, $$slots);
  Astro2.self = $$NetworkProp;
  const {
    attach = ":root",
    property = "network"
  } = Astro2.props;
  return renderTemplate(_a || (_a = __template(["<script>(function(){", "\n    if (navigator.connection) {\n        const e = document.querySelector(a)\n        function updateNetworkProps(i=navigator.connection) {\n            e.style.setProperty(`--${property}-type`, `'${i.type||''}'`)\n            e.style.setProperty(`--${property}-band`, `'${i.effectiveType||''}'`)\n            e.style.setProperty(`--${property}-downlink`, i.downlink||0)\n            e.style.setProperty(`--${property}-downlink-max`, i.downlinkMax||0)\n            e.style.setProperty(`--${property}-rtt`, i.rtt||0)\n            e.style.setProperty(`--${property}-saveData`, i.saveData?'initial':false)\n        }\n        e.style.setProperty(`--${property}-saveData`, false)\n        updateNetworkProps()\n        navigator.connection.onchange = i => updateNetworkProps(i.target);\n    }\n})();<\/script>\n\n"], ["<script>(function(){", "\n    if (navigator.connection) {\n        const e = document.querySelector(a)\n        function updateNetworkProps(i=navigator.connection) {\n            e.style.setProperty(\\`--\\${property}-type\\`, \\`'\\${i.type||''}'\\`)\n            e.style.setProperty(\\`--\\${property}-band\\`, \\`'\\${i.effectiveType||''}'\\`)\n            e.style.setProperty(\\`--\\${property}-downlink\\`, i.downlink||0)\n            e.style.setProperty(\\`--\\${property}-downlink-max\\`, i.downlinkMax||0)\n            e.style.setProperty(\\`--\\${property}-rtt\\`, i.rtt||0)\n            e.style.setProperty(\\`--\\${property}-saveData\\`, i.saveData?'initial':false)\n        }\n        e.style.setProperty(\\`--\\${property}-saveData\\`, false)\n        updateNetworkProps()\n        navigator.connection.onchange = i => updateNetworkProps(i.target);\n    }\n})();<\/script>\n\n"])), defineScriptVars({
    a: attach,
    property
  }));
});

const $$Astro$g = createAstro("C:/Users/bryce/Desktop/Projects/astro-headless-ui/src/layouts/Base.astro", "", "file:///C:/Users/bryce/Desktop/Projects/astro-headless-ui/");
const $$Base = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$g, $$props, $$slots);
  Astro2.self = $$Base;
  return renderTemplate`<html lang="en">
	<head>
		<meta charset="utf-8">
		<link rel="icon" type="image/svg+xml" href="/favicon.svg">
		<meta name="viewport" content="width=device-width">
	${renderHead($$result)}</head>
	<body>
		<nav class="breadcrumb">
			${renderComponent($$result, "Breadcrumb", $$Breadcrumb$1, {})}
		</nav>
		${renderSlot($$result, $$slots["default"])}
	</body></html>`;
});

const $$Astro$f = createAstro("C:/Users/bryce/Desktop/Projects/astro-headless-ui/src/pages/index.astro", "", "file:///C:/Users/bryce/Desktop/Projects/astro-headless-ui/");
const $$Index$3 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$f, $$props, $$slots);
  Astro2.self = $$Index$3;
  return renderTemplate`${renderComponent($$result, "Base", $$Base, {}, { "default": () => renderTemplate`${maybeRenderHead($$result)}<h1>astro-headless-ui</h1><p>A headless component library for Astro</p><h2>SSR / SSG</h2><h3>Style Components</h3><ul>
		<li><a href="/animated-spritesheet">AnimatedSpriteSheet</a></li>
	</ul><h3>Components</h3><ul>
		<li><a href="/rating">Rating</a></li>
		<li><a href="/links">Navigation / Link</a></li>
		<li><a href="/pagination">Paginate / Pagination</a></li>
		<li><a href="/breadcrumb">Breadcrumb</a></li>
		<li><a href="/map">Map</a></li>
	</ul><h3>Client Components</h3><ul>
		<li><a href="/theme-toggle">ThemeToggle / ThemeIcon</a></li>
	</ul><h3>Client Scripts</h3><ul>
		<li>
			<a href="/css-properties">Dynamic CSS Properties</a>
			<ul>
				<li><strong>ScrollProp</strong>: Window/Element Scroll X/Y position</li>
				<li><strong>MouseProp</strong>: Window/Element Mouse X/Y Position</li>
				<li><strong>KeyboardProp</strong>: Window/Element Last Key Press</li>
				<li><strong>NetworkProp</strong>: Network Information API</li>
				<li><strong>NoScriptProp</strong>: CSS Javascript detector</li>
			</ul>
		</li>
	</ul>` })}`;
});

const $$file$b = "C:/Users/bryce/Desktop/Projects/astro-headless-ui/src/pages/index.astro";
const $$url$b = "";

const _page0 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index$3,
  file: $$file$b,
  url: $$url$b
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$e = createAstro("C:/Users/bryce/Desktop/Projects/astro-headless-ui/src/pages/animated-spritesheet.astro", "", "file:///C:/Users/bryce/Desktop/Projects/astro-headless-ui/");
const $$AnimatedSpritesheet = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$e, $$props, $$slots);
  Astro2.self = $$AnimatedSpritesheet;
  return renderTemplate`${renderComponent($$result, "Base", $$Base, {}, { "default": () => renderTemplate`${maybeRenderHead($$result)}<h1>AnimatedSpriteSheet</h1><p>Easily animate a spritesheet</p><h2>horizontal</h2><section>
        ${renderComponent($$result, "AnimatedSpriteSheet", $$AnimatedSpriteSheet, { "url": "/xmastree.png", "name": "xmas", "height": 142, "width": 1515, "cols": 15 })}
        ${renderComponent($$result, "AnimatedSpriteSheet", $$AnimatedSpriteSheet, { "url": "/coin.png", "name": "coin", "height": 129, "width": 561, "cols": 4 })}
    </section><h2>Vertical</h2><h2>Grid</h2><section>
        ${renderComponent($$result, "AnimatedSpriteSheet", $$AnimatedSpriteSheet, { "url": "/cat.png", "name": "cat", "height": 1932, "width": 1098, "cols": 2, "rows": 4, "speed": 300 })}
        ${renderComponent($$result, "AnimatedSpriteSheet", $$AnimatedSpriteSheet, { "url": "/monster.png", "name": "monster", "height": 355, "width": 710, "cols": 6, "rows": 3 })}
        ${renderComponent($$result, "AnimatedSpriteSheet", $$AnimatedSpriteSheet, { "url": "/guy.png", "name": "guy", "height": 448, "width": 480, "cols": 6, "rows": 4, "speed": 500 })}
        ${renderComponent($$result, "AnimatedSpriteSheet", $$AnimatedSpriteSheet, { "url": "/boom.png", "name": "boom", "height": 605, "width": 1207, "cols": 8, "rows": 4 })}
        ${renderComponent($$result, "AnimatedSpriteSheet", $$AnimatedSpriteSheet, { "url": "/test-grid.png", "name": "test-grid", "height": 128, "width": 128, "cols": 4, "rows": 4 })}
        ${renderComponent($$result, "AnimatedSpriteSheet", $$AnimatedSpriteSheet, { "url": "/test-grid-tall.png", "name": "test-grid-tall", "height": 256, "width": 64, "cols": 2, "rows": 8 })}
        ${renderComponent($$result, "AnimatedSpriteSheet", $$AnimatedSpriteSheet, { "url": "/test-grid-long.png", "name": "test-grid-long", "height": 64, "width": 256, "cols": 8, "rows": 2 })}
    </section>${renderComponent($$result, "ScrollProp", $$ScrollProp, {})}` })}`;
});

const $$file$a = "C:/Users/bryce/Desktop/Projects/astro-headless-ui/src/pages/animated-spritesheet.astro";
const $$url$a = "/animated-spritesheet";

const _page1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$AnimatedSpritesheet,
  file: $$file$a,
  url: $$url$a
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$d = createAstro("C:/Users/bryce/Desktop/Projects/astro-headless-ui/src/pages/css-properties.astro", "", "file:///C:/Users/bryce/Desktop/Projects/astro-headless-ui/");
const $$CssProperties = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$d, $$props, $$slots);
  Astro2.self = $$CssProperties;
  return renderTemplate`${renderComponent($$result, "Base", $$Base, {}, { "default": () => renderTemplate`${maybeRenderHead($$result)}<main>
        <h1>CSS Properties</h1>

        <p>A Collection of utility variables</p>

        <hr>

        <h2>HTML/CSS Only</h2>

        <h3>NoScript Property and Class</h3>
        <p>Custom property for displaying styles when javascript is disabled</p>
        <p><strong>Toggle javascript on/off: </strong></p>
        <p><strong>'noscript-hide'</strong> class: <span class="noscript-hide" style="text-decoration:underline;color:green;">This text only visible when javascript is enabled</span></p>
        <p id="noscript" style="color:var(--noscript, red);">This text is only red if javascript is disabled</p>
        ${renderComponent($$result, "NoScriptProp", $$NoScriptProp, {})}

        <hr>

        <h2>Client Side Scripts</h2>

        <h3>Scroll Property</h3>
        <p>The top/left offsets of the scroll position inside the window or an element</p>
        <p id="scrollY">Window Scroll Y:</p>
        <p id="scrollX">Window Scroll X:</p>
        <p><strong>Target specific element:</strong></p>
        <div id="e-scroll" style="overflow:scroll;height:6rem;background-color:lightblue;">
            <div style="position:relative;height:100rem;width:100rem;">
                <div style="position:sticky;top:0;left:0;width:fit-content;height:fit-content;padding:.5rem;">
                    <p id="e-scrollY">Element Scroll Y:</p>
                    <p id="e-scrollX">Element Scroll X:</p>
                </div>
            </div>
        </div>
        ${renderComponent($$result, "ScrollProp", $$ScrollProp, {})}
        ${renderComponent($$result, "ScrollProp", $$ScrollProp, { "property": "e-scroll", "selector": "#e-scroll" })}

        <h3>Mouse Properties</h3>
        <p>The X/Y position of the mouse inside the window or inside of an element</p>
        <p id="mouseX">Window Mouse X:</p>
        <p id="mouseY">Window Mouse Y:</p>
        <p><strong>Target specific element:</strong></p>
        <div id="e-mouse" style="height:10rem;padding:.5rem;background-color:lightblue;">
            <p id="e-mouseX">Element Mouse X:</p>
            <p id="e-mouseY">Element Mouse Y:</p>
        </div>
        ${renderComponent($$result, "MouseProp", $$MouseProp, {})}
        ${renderComponent($$result, "MouseProp", $$MouseProp, { "property": "e-mouse", "selector": "#e-mouse" })}

        <h3>Keyboard Properties</h3>
        <p id="keyboard-key">Last key:</p>
        <div>
            <label for="e-keyboard" id="e-keyboard-key" style="margin-right:.25rem;">Last key in input:</label>
            <input id="e-keyboard">
        </div>
        ${renderComponent($$result, "KeyboardProp", $$KeyboardProp, {})}
        ${renderComponent($$result, "KeyboardProp", $$KeyboardProp, { "selector": "#e-keyboard", "attach": ":root", "property": "e-keyboard" })}

        <hr>

        <h2>Limited Compatibility</h2>

        <h3>Network Information Properties</h3>
        <p><strong>Experimental</strong> does not work with <strong>Firefox</strong>: <a href="https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation#browser_compatibility">compatibility table</a></p>
        <p id="network-type">Network type:</p>
        <p id="network-band">Network band:</p>
        <p id="network-downlink">Network downlink:</p>
        <p id="network-downlink-max">Network downlink maximum:</p>
        <p id="network-rtt">Network round time trip:</p>
        <p id="network-saveData"><strong>'saveData-hide'</strong> class: <span class="saveData-hide" style="color:green;">This text is hidden if the user has set a reduced data usage option on the user agent.</span></p>
        ${renderComponent($$result, "NetworkProp", $$NetworkProp, {})}
    </main>` })}`;
});

const $$file$9 = "C:/Users/bryce/Desktop/Projects/astro-headless-ui/src/pages/css-properties.astro";
const $$url$9 = "/css-properties";

const _page2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$CssProperties,
  file: $$file$9,
  url: $$url$9
}, Symbol.toStringTag, { value: 'Module' }));

const SPRITESHEET_NAMESPACE = `astroicon`;

const baseURL = "https://api.astroicon.dev/v1/";
const requests = /* @__PURE__ */ new Map();
const fetchCache = /* @__PURE__ */ new Map();
async function get(pack, name) {
  const url = new URL(`./${pack}/${name}`, baseURL).toString();
  if (requests.has(url)) {
    return await requests.get(url);
  }
  if (fetchCache.has(url)) {
    return fetchCache.get(url);
  }
  let request = async () => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(await res.text());
    }
    const contentType = res.headers.get("Content-Type");
    if (!contentType.includes("svg")) {
      throw new Error(`[astro-icon] Unable to load "${name}" because it did not resolve to an SVG!

Recieved the following "Content-Type":
${contentType}`);
    }
    const svg = await res.text();
    fetchCache.set(url, svg);
    requests.delete(url);
    return svg;
  };
  let promise = request();
  requests.set(url, promise);
  return await promise;
}

const splitAttrsTokenizer = /([a-z0-9_\:\-]*)\s*?=\s*?(['"]?)(.*?)\2\s+/gim;
const domParserTokenizer = /(?:<(\/?)([a-zA-Z][a-zA-Z0-9\:]*)(?:\s([^>]*?))?((?:\s*\/)?)>|(<\!\-\-)([\s\S]*?)(\-\->)|(<\!\[CDATA\[)([\s\S]*?)(\]\]>))/gm;
const splitAttrs = (str) => {
  let res = {};
  let token;
  if (str) {
    splitAttrsTokenizer.lastIndex = 0;
    str = " " + (str || "") + " ";
    while (token = splitAttrsTokenizer.exec(str)) {
      res[token[1]] = token[3];
    }
  }
  return res;
};
function optimizeSvg(contents, name, options) {
  return optimize(contents, {
    plugins: [
      "removeDoctype",
      "removeXMLProcInst",
      "removeComments",
      "removeMetadata",
      "removeXMLNS",
      "removeEditorsNSData",
      "cleanupAttrs",
      "minifyStyles",
      "convertStyleToAttrs",
      {
        name: "cleanupIDs",
        params: { prefix: `${SPRITESHEET_NAMESPACE}:${name}` }
      },
      "removeRasterImages",
      "removeUselessDefs",
      "cleanupNumericValues",
      "cleanupListOfValues",
      "convertColors",
      "removeUnknownsAndDefaults",
      "removeNonInheritableGroupAttrs",
      "removeUselessStrokeAndFill",
      "removeViewBox",
      "cleanupEnableBackground",
      "removeHiddenElems",
      "removeEmptyText",
      "convertShapeToPath",
      "moveElemsAttrsToGroup",
      "moveGroupAttrsToElems",
      "collapseGroups",
      "convertPathData",
      "convertTransform",
      "removeEmptyAttrs",
      "removeEmptyContainers",
      "mergePaths",
      "removeUnusedNS",
      "sortAttrs",
      "removeTitle",
      "removeDesc",
      "removeDimensions",
      "removeStyleElement",
      "removeScriptElement"
    ]
  }).data;
}
const preprocessCache = /* @__PURE__ */ new Map();
function preprocess(contents, name, { optimize }) {
  if (preprocessCache.has(contents)) {
    return preprocessCache.get(contents);
  }
  if (optimize) {
    contents = optimizeSvg(contents, name);
  }
  domParserTokenizer.lastIndex = 0;
  let result = contents;
  let token;
  if (contents) {
    while (token = domParserTokenizer.exec(contents)) {
      const tag = token[2];
      if (tag === "svg") {
        const attrs = splitAttrs(token[3]);
        result = contents.slice(domParserTokenizer.lastIndex).replace(/<\/svg>/gim, "").trim();
        const value = { innerHTML: result, defaultProps: attrs };
        preprocessCache.set(contents, value);
        return value;
      }
    }
  }
}
function normalizeProps(inputProps) {
  const size = inputProps.size;
  delete inputProps.size;
  const w = inputProps.width ?? size;
  const h = inputProps.height ?? size;
  const width = w ? toAttributeSize(w) : void 0;
  const height = h ? toAttributeSize(h) : void 0;
  return { ...inputProps, width, height };
}
const toAttributeSize = (size) => String(size).replace(/(?<=[0-9])x$/, "em");
async function load(name, inputProps, optimize) {
  const key = name;
  if (!name) {
    throw new Error("<Icon> requires a name!");
  }
  let svg = "";
  let filepath = "";
  if (name.includes(":")) {
    const [pack, ..._name] = name.split(":");
    name = _name.join(":");
    filepath = `/src/icons/${pack}`;
    let get$1;
    try {
      const files = /* #__PURE__ */ Object.assign({});
      const keys = Object.fromEntries(
        Object.keys(files).map((key2) => [key2.replace(/\.[cm]?[jt]s$/, ""), key2])
      );
      if (!(filepath in keys)) {
        throw new Error(`Could not find the file "${filepath}"`);
      }
      const mod = files[keys[filepath]];
      if (typeof mod.default !== "function") {
        throw new Error(
          `[astro-icon] "${filepath}" did not export a default function!`
        );
      }
      get$1 = mod.default;
    } catch (e) {
    }
    if (typeof get$1 === "undefined") {
      get$1 = get.bind(null, pack);
    }
    const contents = await get$1(name, inputProps);
    if (!contents) {
      throw new Error(
        `<Icon pack="${pack}" name="${name}" /> did not return an icon!`
      );
    }
    if (!/<svg/gim.test(contents)) {
      throw new Error(
        `Unable to process "<Icon pack="${pack}" name="${name}" />" because an SVG string was not returned!

Recieved the following content:
${contents}`
      );
    }
    svg = contents;
  } else {
    filepath = `/src/icons/${name}.svg`;
    try {
      const files = /* #__PURE__ */ Object.assign({});
      if (!(filepath in files)) {
        throw new Error(`Could not find the file "${filepath}"`);
      }
      const contents = files[filepath];
      if (!/<svg/gim.test(contents)) {
        throw new Error(
          `Unable to process "${filepath}" because it is not an SVG!

Recieved the following content:
${contents}`
        );
      }
      svg = contents;
    } catch (e) {
      throw new Error(
        `[astro-icon] Unable to load "${filepath}". Does the file exist?`
      );
    }
  }
  const { innerHTML, defaultProps } = preprocess(svg, key, { optimize });
  if (!innerHTML.trim()) {
    throw new Error(`Unable to parse "${filepath}"!`);
  }
  return {
    innerHTML,
    props: { ...defaultProps, ...normalizeProps(inputProps) }
  };
}

const $$Astro$c = createAstro("C:/Users/bryce/Desktop/Projects/astro-headless-ui/node_modules/astro-icon/lib/Icon.astro", "", "file:///C:/Users/bryce/Desktop/Projects/astro-headless-ui/");
const $$Icon = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$c, $$props, $$slots);
  Astro2.self = $$Icon;
  let { name, pack, title, optimize = true, class: className, ...inputProps } = Astro2.props;
  let props = {};
  if (pack) {
    name = `${pack}:${name}`;
  }
  let innerHTML = "";
  try {
    const svg = await load(name, { ...inputProps, class: className }, optimize);
    innerHTML = svg.innerHTML;
    props = svg.props;
  } catch (e) {
    {
      throw new Error(`[astro-icon] Unable to load icon "${name}"!
${e}`);
    }
  }
  return renderTemplate`${maybeRenderHead($$result)}<svg${spreadAttributes(props)}${addAttribute(name, "astro-icon")}>${unescapeHTML((title ? `<title>${title}</title>` : "") + innerHTML)}</svg>`;
});

const sprites = /* @__PURE__ */ new WeakMap();
function trackSprite(request, name) {
  let currentSet = sprites.get(request);
  if (!currentSet) {
    currentSet = /* @__PURE__ */ new Set([name]);
  } else {
    currentSet.add(name);
  }
  sprites.set(request, currentSet);
}
const warned = /* @__PURE__ */ new Set();
async function getUsedSprites(request) {
  const currentSet = sprites.get(request);
  if (currentSet) {
    return Array.from(currentSet);
  }
  if (!warned.has(request)) {
    const { pathname } = new URL(request.url);
    console.log(`[astro-icon] No sprites found while rendering "${pathname}"`);
    warned.add(request);
  }
  return [];
}

const $$Astro$b = createAstro("C:/Users/bryce/Desktop/Projects/astro-headless-ui/node_modules/astro-icon/lib/Spritesheet.astro", "", "file:///C:/Users/bryce/Desktop/Projects/astro-headless-ui/");
const $$Spritesheet = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$b, $$props, $$slots);
  Astro2.self = $$Spritesheet;
  const { optimize = true, style, ...props } = Astro2.props;
  const names = await getUsedSprites(Astro2.request);
  const icons = await Promise.all(names.map((name) => {
    return load(name, {}, optimize).then((res) => ({ ...res, name })).catch((e) => {
      {
        throw new Error(`[astro-icon] Unable to load icon "${name}"!
${e}`);
      }
    });
  }));
  return renderTemplate`${maybeRenderHead($$result)}<svg${addAttribute(`position: absolute; width: 0; height: 0; overflow: hidden; ${style ?? ""}`.trim(), "style")}${spreadAttributes({ "aria-hidden": true, ...props })} astro-icon-spritesheet>
    ${icons.map((icon) => renderTemplate`<symbol${spreadAttributes(icon.props)}${addAttribute(`${SPRITESHEET_NAMESPACE}:${icon.name}`, "id")}>${unescapeHTML(icon.innerHTML)}</symbol>`)}
</svg>`;
});

const $$Astro$a = createAstro("C:/Users/bryce/Desktop/Projects/astro-headless-ui/node_modules/astro-icon/lib/SpriteProvider.astro", "", "file:///C:/Users/bryce/Desktop/Projects/astro-headless-ui/");
const $$SpriteProvider = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$a, $$props, $$slots);
  Astro2.self = $$SpriteProvider;
  const content = await Astro2.slots.render("default");
  return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": () => renderTemplate`${unescapeHTML(content)}` })}
${renderComponent($$result, "Spritesheet", $$Spritesheet, {})}
`;
});

const $$Astro$9 = createAstro("C:/Users/bryce/Desktop/Projects/astro-headless-ui/node_modules/astro-icon/lib/Sprite.astro", "", "file:///C:/Users/bryce/Desktop/Projects/astro-headless-ui/");
const $$Sprite = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$Sprite;
  let { name, pack, title, class: className, x, y, ...inputProps } = Astro2.props;
  const props = normalizeProps(inputProps);
  if (pack) {
    name = `${pack}:${name}`;
  }
  const href = `#${SPRITESHEET_NAMESPACE}:${name}`;
  trackSprite(Astro2.request, name);
  return renderTemplate`${maybeRenderHead($$result)}<svg${spreadAttributes(props)}${addAttribute(className, "class")}${addAttribute(name, "astro-icon")}>
    ${title ? renderTemplate`<title>${title}</title>` : ""}
    <use${spreadAttributes({ "xlink:href": href, width: props.width, height: props.height, x, y })}></use>
</svg>`;
});

Object.assign($$Sprite, { Provider: $$SpriteProvider });

const $$Astro$8 = createAstro("C:/Users/bryce/Desktop/Projects/astro-headless-ui/src/pages/theme-toggle.astro", "", "file:///C:/Users/bryce/Desktop/Projects/astro-headless-ui/");
const $$ThemeToggle = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$ThemeToggle;
  return renderTemplate`${renderComponent($$result, "Base", $$Base, {}, { "default": () => renderTemplate`${maybeRenderHead($$result)}<h1>Theme Toggle</h1><p>Inspect the body tag and watch the 'dark' class toggle on and off when button is clicked</p><p>Theme is also persistant across pages usinf sessionStorage and detects system preference changes</p><h2>Toggle Button</h2><section>
        ${renderComponent($$result, "ThemeToggle", $$ThemeToggle$1, { "dark": true }, { "default": () => renderTemplate`Toggle Dark Theme` })}
        ${renderComponent($$result, "ThemeToggle", $$ThemeToggle$1, { "theme": "blue" }, { "default": () => renderTemplate`Toggle Blue Theme` })}
        ${renderComponent($$result, "ThemeToggle", $$ThemeToggle$1, { "theme": "green" }, { "default": () => renderTemplate`Toggle Green Theme` })}
        ${renderComponent($$result, "ThemeToggle", $$ThemeToggle$1, { "theme": "red" }, { "default": () => renderTemplate`Toggle Red Theme` })}
    </section><section class="container" style="margin:2rem 1rem;padding:5rem;">
        <h2>Scoped Themes</h2>
        ${renderComponent($$result, "ThemeToggle", $$ThemeToggle$1, { "selector": "section.container", "dark": true }, { "default": () => renderTemplate`Toggle Dark Theme` })}
        ${renderComponent($$result, "ThemeToggle", $$ThemeToggle$1, { "selector": "section.container", "theme": "blue" }, { "default": () => renderTemplate`Toggle Blue Theme` })}
        ${renderComponent($$result, "ThemeToggle", $$ThemeToggle$1, { "selector": "section.container", "theme": "green" }, { "default": () => renderTemplate`Toggle Green Theme` })}
        ${renderComponent($$result, "ThemeToggle", $$ThemeToggle$1, { "selector": "section.container", "theme": "red" }, { "default": () => renderTemplate`Toggle Red Theme` })}
    </section><h2>Icon Example</h2><section> 
        ${renderComponent($$result, "ThemeToggle", $$ThemeToggle$1, { "dark": true, "style": "padding:3rem;" }, { "default": () => renderTemplate`${renderComponent($$result, "ThemeIcon", $$ThemeIcon, { "size": "5rem" }, { "default": () => renderTemplate`${renderComponent($$result, "Icon", $$Icon, { "name": "ri:sun-foggy-line" })}${renderComponent($$result, "Icon", $$Icon, { "name": "ri:moon-cloudy-line" })}` })}` })}
    </section><h3>Variation</h3><section> 
        ${renderComponent($$result, "ThemeToggle", $$ThemeToggle$1, { "dark": true, "style": "padding:.5rem;" }, { "default": () => renderTemplate`${renderComponent($$result, "ThemeIcon", $$ThemeIcon, { "name": "no-animation", "speed": 0 }, { "default": () => renderTemplate`${renderComponent($$result, "Icon", $$Icon, { "name": "ri:sun-foggy-line" })}${renderComponent($$result, "Icon", $$Icon, { "name": "ri:moon-cloudy-line" })}` })}` })}
    </section><h3>Alt theme</h3><section> 
        ${renderComponent($$result, "ThemeToggle", $$ThemeToggle$1, { "theme": "green", "style": "background-color:#bbb;padding:2rem;border-radius:3px;border:2px solid gray;" }, { "default": () => renderTemplate`${renderComponent($$result, "ThemeIcon", $$ThemeIcon, { "theme": "body.green", "name": "green-icons", "speed": 0 }, { "default": () => renderTemplate`${renderComponent($$result, "Icon", $$Icon, { "name": "twemoji:white-circle" })}${renderComponent($$result, "Icon", $$Icon, { "name": "twemoji:green-circle" })}` })}` })}
    </section>` })}`;
});

const $$file$8 = "C:/Users/bryce/Desktop/Projects/astro-headless-ui/src/pages/theme-toggle.astro";
const $$url$8 = "/theme-toggle";

const _page3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$ThemeToggle,
  file: $$file$8,
  url: $$url$8
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$7 = createAstro("C:/Users/bryce/Desktop/Projects/astro-headless-ui/src/pages/breadcrumb.astro", "", "file:///C:/Users/bryce/Desktop/Projects/astro-headless-ui/");
const $$Breadcrumb = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$Breadcrumb;
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "class": "astro-QFLEICEJ" }, { "default": () => renderTemplate`${maybeRenderHead($$result)}<h1 class="astro-QFLEICEJ">Breadcrumb</h1><section class="astro-QFLEICEJ">
        <h3 class="astro-QFLEICEJ">Breadcrumb with no props</h3>
        <nav class="astro-QFLEICEJ">
            ${renderComponent($$result, "Breadcrumb", $$Breadcrumb$1, { "class": "astro-QFLEICEJ" })}
        </nav>
        <h3 class="astro-QFLEICEJ">url Prop Only with string url</h3>
        <nav class="astro-QFLEICEJ">
            ${renderComponent($$result, "Breadcrumb", $$Breadcrumb$1, { "url": "http://127.0.0.1:3000/posts/categories/javascript/how-to-use-javascript", "class": "astro-QFLEICEJ" })}
        </nav>
        <h3 class="astro-QFLEICEJ">Default Slot Only</h3>
        <nav class="astro-QFLEICEJ">
            ${renderComponent($$result, "Breadcrumb", $$Breadcrumb$1, { "class": "astro-QFLEICEJ" }, { "default": () => renderTemplate`${(url) => renderTemplate`<a${addAttribute(url.href, "href")} class="astro-QFLEICEJ">${url.text}</a>`}` })}
        </nav>
        <h3 class="astro-QFLEICEJ">Customized slots</h3>
        <nav class="astro-QFLEICEJ">
        ${renderComponent($$result, "Breadcrumb", $$Breadcrumb$1, { "url": "http://127.0.0.1:3000/posts/categories/javascript/how-to-use-javascript", "class": "astro-QFLEICEJ" }, { "1": () => renderTemplate`<two class="astro-QFLEICEJ">${(url) => renderTemplate`<a${addAttribute(url.href, "href")} class="astro-QFLEICEJ">#2 ${url.text}</a><span style="font-family:monospace;font-size:1rem;" class="astro-QFLEICEJ">&gt;</span>`}</two>`, "active": () => renderTemplate`<active class="astro-QFLEICEJ">${(url) => renderTemplate`<span class="astro-QFLEICEJ">${url.text}</span>`}</active>`, "default": () => renderTemplate`${(url) => renderTemplate`<a${addAttribute(url.href, "href")} class="astro-QFLEICEJ">${url.text}</a><span style="font-family:monospace;font-size:1rem;" class="astro-QFLEICEJ">&gt;</span>`}`, "javascript": () => renderTemplate`<javascript class="astro-QFLEICEJ">${(url) => renderTemplate`<a${addAttribute(url.href, "href")} class="astro-QFLEICEJ">SLUG ${url.text}</a><span style="font-family:monospace;font-size:1rem;" class="astro-QFLEICEJ">&gt;</span>`}</javascript>` })}
        </nav>
        <h3 class="astro-QFLEICEJ">Default Collapse Test</h3>
        <nav class="astro-QFLEICEJ">
            ${renderComponent($$result, "Breadcrumb", $$Breadcrumb$1, { "collapse": true, "url": "http://127.0.0.1:3000/1/2/3/4/5/6/7/8/9/10/11/12/13/14/15/16", "class": "astro-QFLEICEJ" })}
        </nav>
        <h3 class="astro-QFLEICEJ">Collapse With Customized Slots</h3>
        <nav class="astro-QFLEICEJ">
            ${renderComponent($$result, "Breadcrumb", $$Breadcrumb$1, { "collapse": true, "end": "2", "url": "http://127.0.0.1:3000/posts/categories/javascript/how-to-use-javascript", "class": "astro-QFLEICEJ" }, { "active": () => renderTemplate`<active class="astro-QFLEICEJ">${(url) => renderTemplate`<span class="astro-QFLEICEJ">${url.text}</span>`}</active>`, "default": () => renderTemplate`${(url) => renderTemplate`<a${addAttribute(url.href, "href")} class="astro-QFLEICEJ">${url.text}</a><span style="font-family:monospace;font-size:1rem;" class="astro-QFLEICEJ">&gt;</span>`}`, "disabled": () => renderTemplate`<disabled class="astro-QFLEICEJ">${() => renderTemplate`<span class="astro-QFLEICEJ">...</span><span style="font-family:monospace;font-size:1rem;" class="astro-QFLEICEJ">&gt;</span>`}</disabled>` })}
        </nav>
        <h3 class="astro-QFLEICEJ">Remove index from Default</h3>
        <nav class="astro-QFLEICEJ">
            ${renderComponent($$result, "Breadcrumb", $$Breadcrumb$1, { "collapse": true, "index": false, "end": "5", "url": "http://127.0.0.1:3000/This/is/an/example/of/a/really/long/path/to/test/collapsing", "class": "astro-QFLEICEJ" })}
        </nav>
        <h3 class="astro-QFLEICEJ">Tests</h3>
        <nav class="astro-QFLEICEJ">
            ${renderComponent($$result, "Breadcrumb", $$Breadcrumb$1, { "collapse": true, "url": "http://127.0.0.1:3000/posts/categories/javascript/tutorial", "class": "astro-QFLEICEJ" }, { "active": () => renderTemplate`<active class="astro-QFLEICEJ">${(url) => renderTemplate`<span class="astro-QFLEICEJ">${url.text}</span>`}</active>`, "default": () => renderTemplate`${(url) => renderTemplate`<a${addAttribute(url.href, "href")} class="astro-QFLEICEJ">${url.text}</a><span class="astro-QFLEICEJ">&gt;</span>`}`, "disabled": () => renderTemplate`<disabled class="astro-QFLEICEJ">${() => renderTemplate`<span class="astro-QFLEICEJ">...</span><span class="astro-QFLEICEJ">&gt;</span>`}</disabled>` })}
        </nav>
    </section>` })}`;
});

const $$file$7 = "C:/Users/bryce/Desktop/Projects/astro-headless-ui/src/pages/breadcrumb.astro";
const $$url$7 = "/breadcrumb";

const _page4 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Breadcrumb,
  file: $$file$7,
  url: $$url$7
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$6 = createAstro("C:/Users/bryce/Desktop/Projects/astro-headless-ui/src/pages/pagination/index.astro", "", "file:///C:/Users/bryce/Desktop/Projects/astro-headless-ui/");
const $$Index$2 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$Index$2;
  const posts = await fetch("https://jsonplaceholder.typicode.com/posts").then((response) => response.json());
  return renderTemplate`${renderComponent($$result, "Base", $$Base, {}, { "default": () => renderTemplate`${maybeRenderHead($$result)}<h1>Pagination</h1><h2>Default Style</h2>${renderComponent($$result, "Pagination", $$Pagination, { "index": true, "before": 1, "after": 3, "url": "/example", "total": "100", "current": "50" })}<nav style="margin:1rem 0;display:flex;gap:0.25rem;">
        ${renderComponent($$result, "Pagination", $$Pagination, { "url": "/posts", "total": "22", "current": "11" }, { "2": () => renderTemplate`<span>THis IS second</span>`, "active": () => renderTemplate`<active>${(page) => renderTemplate`<span>${page.number}</span>`}</active>`, "default": () => renderTemplate`${(page) => renderTemplate`<a${addAttribute(page.href, "href")}>${page.number}</a>`}`, "disabled": () => renderTemplate`<span>...</span>` })}
    </nav><h2>Custom Styled Example</h2><p>Current Page: 1 (index)</p>${renderComponent($$result, "Paginate", $$Paginate, { "data": posts, "size": "10", "page": Astro2.params.page }, { "default": () => renderTemplate`${(page) => renderTemplate`<nav class="example">
                ${renderComponent($$result, "Pagination", $$Pagination, { "index": true, "url": "/pagination", "middle": 1, "total": page.last, "current": page.current }, { "active": () => renderTemplate`<active>${(page2) => renderTemplate`<span>${page2.number}</span>`}</active>`, "default": () => renderTemplate`${(page2) => renderTemplate`<a${addAttribute(page2.href, "href")}>${page2.number}</a>`}`, "disabled": () => renderTemplate`<span>...</span>` })}
            </nav><section>
                ${page.data.map((post) => renderTemplate`<article>
                        <h2>${post.id} - ${post.title}</h2>
                        <p>${post.body}</p>
                    </article>`)}
            </section><nav class="example">
                ${renderComponent($$result, "Pagination", $$Pagination, { "index": true, "url": "/pagination", "total": page.last, "current": page.current }, { "active": () => renderTemplate`<active>${(page2) => renderTemplate`<span>${page2.number}</span>`}</active>`, "default": () => renderTemplate`${(page2) => renderTemplate`<a${addAttribute(page2.href, "href")}>${page2.number}</a>`}`, "disabled": () => renderTemplate`<span>...</span>` })}
            </nav>`}` })}` })}`;
});

const $$file$6 = "C:/Users/bryce/Desktop/Projects/astro-headless-ui/src/pages/pagination/index.astro";
const $$url$6 = "/pagination";

const _page5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index$2,
  file: $$file$6,
  url: $$url$6
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$5 = createAstro("C:/Users/bryce/Desktop/Projects/astro-headless-ui/src/pages/pagination/[page]/index.astro", "", "file:///C:/Users/bryce/Desktop/Projects/astro-headless-ui/");
const $$Index$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Index$1;
  const posts = await fetch("https://jsonplaceholder.typicode.com/posts").then((response) => response.json());
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "class": "astro-U4UXQ6KC" }, { "default": () => renderTemplate`${renderComponent($$result, "Paginate", $$Paginate, { "data": posts, "size": "10", "page": Astro2.params.page, "class": "astro-U4UXQ6KC" }, { "default": () => renderTemplate`${(page) => renderTemplate`${maybeRenderHead($$result)}<h1 class="astro-U4UXQ6KC">Pagination</h1><p class="astro-U4UXQ6KC">Current Page: ${page.current}</p><nav class="example astro-U4UXQ6KC">
                ${renderComponent($$result, "Pagination", $$Pagination, { "index": true, "url": "/pagination", "middle": 1, "total": page.last, "current": page.current, "class": "astro-U4UXQ6KC" }, { "default": () => renderTemplate`${(page2) => {
    if (page2.slot === "active")
      return renderTemplate`<span class="astro-U4UXQ6KC">${page2.number}</span>`;
    if (page2.slot === "disabled")
      return renderTemplate`<span class="astro-U4UXQ6KC">...</span>`;
    return renderTemplate`<a${addAttribute(page2.href, "href")} class="astro-U4UXQ6KC">${page2.number}</a>`;
  }}` })}
            </nav><section class="astro-U4UXQ6KC">
                ${page.data.map((post) => renderTemplate`<article class="astro-U4UXQ6KC">
                        <h2 class="astro-U4UXQ6KC">${post.id} - ${post.title}</h2>
                        <p class="astro-U4UXQ6KC">${post.body}</p>
                    </article>`)}
            </section><nav class="example astro-U4UXQ6KC">
                ${renderComponent($$result, "Pagination", $$Pagination, { "index": true, "url": "/pagination", "total": page.last, "current": page.current, "class": "astro-U4UXQ6KC" }, { "default": () => renderTemplate`${(page2) => {
    if (page2.slot === "active")
      return renderTemplate`<span class="astro-U4UXQ6KC">${page2.number}</span>`;
    if (page2.slot === "disabled")
      return renderTemplate`<span class="astro-U4UXQ6KC">...</span>`;
    return renderTemplate`<a${addAttribute(page2.href, "href")} class="astro-U4UXQ6KC">${page2.number}</a>`;
  }}` })}
            </nav>`}`, "error": () => renderTemplate`<section class="astro-U4UXQ6KC">
            <p class="astro-U4UXQ6KC"><strong class="astro-U4UXQ6KC">This page does not exist</strong></p>
        </section>` })}` })}`;
});

const $$file$5 = "C:/Users/bryce/Desktop/Projects/astro-headless-ui/src/pages/pagination/[page]/index.astro";
const $$url$5 = "/pagination/[page]";

const _page6 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index$1,
  file: $$file$5,
  url: $$url$5
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$4 = createAstro("C:/Users/bryce/Desktop/Projects/astro-headless-ui/src/pages/rating.astro", "", "file:///C:/Users/bryce/Desktop/Projects/astro-headless-ui/");
const $$Rating = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Rating;
  return renderTemplate`${renderComponent($$result, "Base", $$Base, {}, { "default": () => renderTemplate`${maybeRenderHead($$result)}<h1>Rating</h1><p>Display a rating/ratio, like a product rating 2/5 stars</p><p>This example uses <a href="https://docs.iconify.design">Iconify</a></p><div>
        ${renderComponent($$result, "Rating", $$Rating$1, { "total": "5", "active": "2.5" }, { "active": () => renderTemplate`${renderComponent($$result, "Icon", $$Icon, { "slot": "active", "name": "dashicons:star-filled" })}`, "disabled": () => renderTemplate`${renderComponent($$result, "Icon", $$Icon, { "slot": "disabled", "name": "dashicons:star-empty" })}`, "half": () => renderTemplate`${renderComponent($$result, "Icon", $$Icon, { "slot": "half", "name": "dashicons:star-half" })}` })}
    </div><div>
        ${renderComponent($$result, "Rating", $$Rating$1, { "total": "5", "active": "2.5" }, { "active": () => renderTemplate`${renderComponent($$result, "Icon", $$Icon, { "slot": "active", "name": "codicon:star-full" })}`, "disabled": () => renderTemplate`${renderComponent($$result, "Icon", $$Icon, { "slot": "disabled", "name": "codicon:star-empty" })}`, "half": () => renderTemplate`${renderComponent($$result, "Icon", $$Icon, { "slot": "half", "name": "codicon:star-half" })}` })}
    </div><div>
        ${renderComponent($$result, "Rating", $$Rating$1, { "total": "9", "active": "4.5" }, { "active": () => renderTemplate`${renderComponent($$result, "Icon", $$Icon, { "slot": "active", "name": "clarity:star-solid" })}`, "disabled": () => renderTemplate`${renderComponent($$result, "Icon", $$Icon, { "slot": "disabled", "name": "clarity:star-line" })}`, "half": () => renderTemplate`${renderComponent($$result, "Icon", $$Icon, { "slot": "half", "name": "clarity:half-star-solid" })}` })}
    </div><div>
        ${renderComponent($$result, "Rating", $$Rating$1, { "total": "20", "active": "10" }, { "active": () => renderTemplate`${renderComponent($$result, "Icon", $$Icon, { "slot": "active", "name": "bi:heart-fill" })}`, "disabled": () => renderTemplate`${renderComponent($$result, "Icon", $$Icon, { "slot": "disabled", "name": "bi:heart" })}`, "half": () => renderTemplate`${renderComponent($$result, "Icon", $$Icon, { "slot": "half", "name": "bi:heart-half" })}` })}
    </div>` })}`;
});

const $$file$4 = "C:/Users/bryce/Desktop/Projects/astro-headless-ui/src/pages/rating.astro";
const $$url$4 = "/rating";

const _page7 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Rating,
  file: $$file$4,
  url: $$url$4
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$3 = createAstro("C:/Users/bryce/Desktop/Projects/astro-headless-ui/src/pages/links/index.astro", "", "file:///C:/Users/bryce/Desktop/Projects/astro-headless-ui/");
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Index;
  const basicLinks = {
    active: { style: "color:red;", text: "Active!!!" },
    links: [
      {
        text: "Links (Current Page)",
        href: "/links"
      },
      {
        text: "Links 2",
        href: "/links/1"
      },
      {
        text: "Links 3",
        href: "/links/2"
      }
    ]
  };
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "class": "astro-6L66W4XP" }, { "default": () => renderTemplate`${maybeRenderHead($$result)}<h1 class="astro-6L66W4XP">Navigation / Links</h1><p class="astro-6L66W4XP">Active link is highlighted in red</p><h2 class="astro-6L66W4XP">Link tests</h2><h3 class="astro-6L66W4XP">Using Slots</h3><nav class="astro-6L66W4XP">
        ${renderComponent($$result, "Link", $$Link, { "href": "/links", "class": "astro-6L66W4XP" }, { "active": () => renderTemplate`<a href="/links" style="color:red;" class="astro-6L66W4XP">Links (Current Page)</a>`, "default": () => renderTemplate`
            Links (Current Page)
            ` })}
        ${renderComponent($$result, "Link", $$Link, { "href": "/links/1", "class": "astro-6L66W4XP" }, { "active": () => renderTemplate`<a href="/links/1" style="color:red;" class="astro-6L66W4XP">Links 2</a>`, "default": () => renderTemplate`
            Links 2
            ` })}
        ${renderComponent($$result, "Link", $$Link, { "href": "/links/2", "class": "astro-6L66W4XP" }, { "active": () => renderTemplate`<a href="/links/2" style="color:red;" class="astro-6L66W4XP">Links 3</a>`, "default": () => renderTemplate`
            Links 3
            ` })}
    </nav><h3 class="astro-6L66W4XP">Using 'active' Prop</h3><nav class="astro-6L66W4XP">
        ${renderComponent($$result, "Link", $$Link, { "href": "/links", "style": "test:property;", "active": { style: "color:red;" }, "class": "astro-6L66W4XP" }, { "default": () => renderTemplate`Links (Current Page) (mode="join")` })}
        ${renderComponent($$result, "Link", $$Link, { "href": "/links/1", "active": { style: "color:red;" }, "class": "astro-6L66W4XP" }, { "default": () => renderTemplate`Links 2 (mode="spread")` })}
        ${renderComponent($$result, "Link", $$Link, { "href": "/links/2", "active": { href: "/links/2", style: "color:red;" }, "class": "astro-6L66W4XP" }, { "default": () => renderTemplate`Links 3 (mode="replace")` })}
    </nav><h2 class="astro-6L66W4XP">Navigation test</h2><h3 class="astro-6L66W4XP">Default Render</h3><nav class="astro-6L66W4XP">
        ${renderComponent($$result, "Navigation", $$Navigation, { ...{
    active: {
      class: " active"
    },
    defaults: {
      class: "link"
    },
    links: [
      {
        text: "Home",
        href: "/"
      },
      {
        text: "Services",
        href: "/services"
      },
      {
        text: "About Us",
        href: "/about-us"
      },
      {
        text: "Links",
        href: "/links"
      }
    ]
  }, "class": "astro-6L66W4XP" })}
    </nav><h3 class="astro-6L66W4XP">Custom Render using Slots</h3><ul class="astro-6L66W4XP">
        ${renderComponent($$result, "Navigation", $$Navigation, { ...basicLinks, "class": "astro-6L66W4XP" }, { "active": () => renderTemplate`<active class="astro-6L66W4XP">
                ${({ active, ...link }) => renderTemplate`<li class="astro-6L66W4XP"><a${spreadAttributes({ ...link, ...active }, "{...link, ...active}", { "class": "astro-6L66W4XP" })}>${active.text}</a></li>`}
            </active>`, "default": () => renderTemplate`${({ active, ...link }) => renderTemplate`<li class="astro-6L66W4XP"><a${spreadAttributes(link, "link", { "class": "astro-6L66W4XP" })}>${link.text}</a></li>`}` })}
    </ul><ul class="astro-6L66W4XP">
        ${renderComponent($$result, "Navigation", $$Navigation, { ...basicLinks, "class": "astro-6L66W4XP" }, { "default": () => renderTemplate`${(link) => renderTemplate`<li class="astro-6L66W4XP">${renderComponent($$result, "Link", $$Link, { ...link, "class": "astro-6L66W4XP" })}</li>`}` })}
    </ul>` })}

`;
});

const $$file$3 = "C:/Users/bryce/Desktop/Projects/astro-headless-ui/src/pages/links/index.astro";
const $$url$3 = "/links";

const _page8 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file$3,
  url: $$url$3
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$2 = createAstro("C:/Users/bryce/Desktop/Projects/astro-headless-ui/src/pages/links/1.astro", "", "file:///C:/Users/bryce/Desktop/Projects/astro-headless-ui/");
const $$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$1;
  const basicLinks = {
    active: { style: "color:red;" },
    links: [
      {
        text: "Links",
        href: "/links"
      },
      {
        text: "Links 2 (Current Page)",
        href: "/links/1"
      },
      {
        text: "Links 3",
        href: "/links/2"
      }
    ]
  };
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "class": "astro-6DZWLS54" }, { "default": () => renderTemplate`${maybeRenderHead($$result)}<h1 class="astro-6DZWLS54">Navigation / Links</h1><p class="astro-6DZWLS54">Active link is highlighted in red</p><h2 class="astro-6DZWLS54">Link tests</h2><h3 class="astro-6DZWLS54">Using Slots</h3><nav class="astro-6DZWLS54">
        ${renderComponent($$result, "Link", $$Link, { "href": "/links", "class": "astro-6DZWLS54" }, { "active": () => renderTemplate`<a href="/links" style="color:red;" class="astro-6DZWLS54">Links</a>`, "default": () => renderTemplate`
            Links
            ` })}
        ${renderComponent($$result, "Link", $$Link, { "href": "/links/1", "class": "astro-6DZWLS54" }, { "active": () => renderTemplate`<a href="/links/1" style="color:red;" class="astro-6DZWLS54">Links 2 (Current Page)</a>`, "default": () => renderTemplate`
            Links 2 (Current Page)
            ` })}
        ${renderComponent($$result, "Link", $$Link, { "href": "/links/2", "class": "astro-6DZWLS54" }, { "active": () => renderTemplate`<a href="/links/2" style="color:red;" class="astro-6DZWLS54">Links 3</a>`, "default": () => renderTemplate`
            Links 3
            ` })}
    </nav><h3 class="astro-6DZWLS54">Using 'active' Prop</h3><nav class="astro-6DZWLS54">
        ${renderComponent($$result, "Link", $$Link, { "href": "/links", "style": "test:property;", "active": { style: "color:red;" }, "class": "astro-6DZWLS54" }, { "default": () => renderTemplate`Links (mode="join")` })}
        ${renderComponent($$result, "Link", $$Link, { "href": "/links/1", "active": { style: "color:red;" }, "class": "astro-6DZWLS54" }, { "default": () => renderTemplate`Links 2 (Current Page) (mode="spread")` })}
        ${renderComponent($$result, "Link", $$Link, { "href": "/links/2", "active": { href: "/links/2", style: "color:red;" }, "class": "astro-6DZWLS54" }, { "default": () => renderTemplate`Links 3 (mode="replace")` })}
    </nav><h2 class="astro-6DZWLS54">Navigation test</h2><h3 class="astro-6DZWLS54">Default Render</h3><nav class="astro-6DZWLS54">
        ${renderComponent($$result, "Navigation", $$Navigation, { ...basicLinks, "class": "astro-6DZWLS54" })}
    </nav><h3 class="astro-6DZWLS54">Custom Render using Slots</h3><ul class="astro-6DZWLS54">
        ${renderComponent($$result, "Navigation", $$Navigation, { ...basicLinks, "class": "astro-6DZWLS54" }, { "active": () => renderTemplate`<active class="astro-6DZWLS54">
                ${({ active, ...link }) => renderTemplate`<li class="astro-6DZWLS54"><a${spreadAttributes({ ...link, ...active }, "{...link, ...active}", { "class": "astro-6DZWLS54" })}>${link.text}</a></li>`}
            </active>`, "default": () => renderTemplate`${({ active, ...link }) => renderTemplate`<li class="astro-6DZWLS54"><a${spreadAttributes(link, "link", { "class": "astro-6DZWLS54" })}>${link.text}</a></li>`}` })}
    </ul><ul class="astro-6DZWLS54">
        ${renderComponent($$result, "Navigation", $$Navigation, { ...basicLinks, "class": "astro-6DZWLS54" }, { "default": () => renderTemplate`${(link) => renderTemplate`<li class="astro-6DZWLS54">${renderComponent($$result, "Link", $$Link, { ...link, "class": "astro-6DZWLS54" })}</li>`}` })}
    </ul>` })}

`;
});

const $$file$2 = "C:/Users/bryce/Desktop/Projects/astro-headless-ui/src/pages/links/1.astro";
const $$url$2 = "/links/1";

const _page9 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$1,
  file: $$file$2,
  url: $$url$2
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$1 = createAstro("C:/Users/bryce/Desktop/Projects/astro-headless-ui/src/pages/links/2.astro", "", "file:///C:/Users/bryce/Desktop/Projects/astro-headless-ui/");
const $$2 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$2;
  const basicLinks = {
    active: { style: "color:red;" },
    links: [
      {
        text: "Links",
        href: "/links"
      },
      {
        text: "Links 2",
        href: "/links/1"
      },
      {
        text: "Links 3 (Current Page)",
        href: "/links/2"
      }
    ]
  };
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "class": "astro-AEZWNVSA" }, { "default": () => renderTemplate`${maybeRenderHead($$result)}<h1 class="astro-AEZWNVSA">Navigation / Links</h1><p class="astro-AEZWNVSA">Active link is highlighted in red</p><h2 class="astro-AEZWNVSA">Link tests</h2><h3 class="astro-AEZWNVSA">Using Slots</h3><nav class="astro-AEZWNVSA">
        ${renderComponent($$result, "Link", $$Link, { "href": "/links", "class": "astro-AEZWNVSA" }, { "active": () => renderTemplate`<a href="/links" style="color:red;" class="astro-AEZWNVSA">Links</a>`, "default": () => renderTemplate`
            Links
            ` })}
        ${renderComponent($$result, "Link", $$Link, { "href": "/links/1", "class": "astro-AEZWNVSA" }, { "active": () => renderTemplate`<a href="/links/1" style="color:red;" class="astro-AEZWNVSA">Links 2</a>`, "default": () => renderTemplate`
            Links 2
            ` })}
        ${renderComponent($$result, "Link", $$Link, { "href": "/links/2", "class": "astro-AEZWNVSA" }, { "active": () => renderTemplate`<a href="/links/2" style="color:red;" class="astro-AEZWNVSA">Links 3 (Current Page)</a>`, "default": () => renderTemplate`
            Links 3
            ` })}
    </nav><h3 class="astro-AEZWNVSA">Using 'active' Prop</h3><nav class="astro-AEZWNVSA">
        ${renderComponent($$result, "Link", $$Link, { "href": "/links", "style": "test:property;", "active": { style: "color:red;" }, "class": "astro-AEZWNVSA" }, { "default": () => renderTemplate`Links (mode="join")` })}
        ${renderComponent($$result, "Link", $$Link, { "href": "/links/1", "active": { style: "color:red;" }, "class": "astro-AEZWNVSA" }, { "default": () => renderTemplate`Links 2 (mode="spread")` })}
        ${renderComponent($$result, "Link", $$Link, { "href": "/links/2", "active": { href: "/links/2", style: "color:red;" }, "class": "astro-AEZWNVSA" }, { "default": () => renderTemplate`Links 3 (Current Page) (mode="replace")` })}
    </nav><h2 class="astro-AEZWNVSA">Navigation test</h2><h3 class="astro-AEZWNVSA">Default Render</h3><nav class="astro-AEZWNVSA">
        ${renderComponent($$result, "Navigation", $$Navigation, { ...basicLinks, "class": "astro-AEZWNVSA" })}
    </nav><h3 class="astro-AEZWNVSA">Custom Render using Slots</h3><ul class="astro-AEZWNVSA">
        ${renderComponent($$result, "Navigation", $$Navigation, { ...basicLinks, "class": "astro-AEZWNVSA" }, { "active": () => renderTemplate`<active class="astro-AEZWNVSA">
                ${({ active, ...link }) => renderTemplate`<li class="astro-AEZWNVSA"><a${spreadAttributes({ ...link, ...active }, "{...link, ...active}", { "class": "astro-AEZWNVSA" })}>${link.text}</a></li>`}
            </active>`, "default": () => renderTemplate`${({ active, ...link }) => renderTemplate`<li class="astro-AEZWNVSA"><a${spreadAttributes(link, "link", { "class": "astro-AEZWNVSA" })}>${link.text}</a></li>`}` })}
    </ul><ul class="astro-AEZWNVSA">
        ${renderComponent($$result, "Navigation", $$Navigation, { ...basicLinks, "class": "astro-AEZWNVSA" }, { "default": () => renderTemplate`${(link) => renderTemplate`<li class="astro-AEZWNVSA">${renderComponent($$result, "Link", $$Link, { ...link, "class": "astro-AEZWNVSA" })}</li>`}` })}
    </ul>` })}

`;
});

const $$file$1 = "C:/Users/bryce/Desktop/Projects/astro-headless-ui/src/pages/links/2.astro";
const $$url$1 = "/links/2";

const _page10 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$2,
  file: $$file$1,
  url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro = createAstro("C:/Users/bryce/Desktop/Projects/astro-headless-ui/src/pages/map.astro", "", "file:///C:/Users/bryce/Desktop/Projects/astro-headless-ui/");
const $$Map = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Map;
  return renderTemplate`${renderComponent($$result, "Base", $$Base, {}, { "default": () => renderTemplate`${maybeRenderHead($$result)}<h1>Map</h1><p>Mapping component with similar syntax to solidjs 'For' Component, use slots to target different indexes for alternative render</p><ul>
        ${renderComponent($$result, "Map", $$Map$1, { ...["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"] }, { "5": () => renderTemplate`<five>${(i) => renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": () => renderTemplate`<h3>Index # 5</h3><li>Index # 5: ${i}</li>` })}`}</five>`, "default": () => renderTemplate`<h3>Default</h3>${(i) => renderTemplate`<li>${i}</li>`}`, "last": () => renderTemplate`<last>${(i) => renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": () => renderTemplate`<h3>Last</h3><li>Last Item: ${i}</li>` })}`}</last>` })}
    </ul>` })}`;
});

const $$file = "C:/Users/bryce/Desktop/Projects/astro-headless-ui/src/pages/map.astro";
const $$url = "/map";

const _page11 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Map,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const pageMap = new Map([['src/pages/index.astro', _page0],['src/pages/animated-spritesheet.astro', _page1],['src/pages/css-properties.astro', _page2],['src/pages/theme-toggle.astro', _page3],['src/pages/breadcrumb.astro', _page4],['src/pages/pagination/index.astro', _page5],['src/pages/pagination/[page]/index.astro', _page6],['src/pages/rating.astro', _page7],['src/pages/links/index.astro', _page8],['src/pages/links/1.astro', _page9],['src/pages/links/2.astro', _page10],['src/pages/map.astro', _page11],]);
const renderers = [Object.assign({"name":"astro:jsx","serverEntrypoint":"astro/jsx/server.js","jsxImportSource":"astro"}, { ssr: server_default }),];

if (typeof process !== "undefined") {
  if (process.argv.includes("--verbose")) ; else if (process.argv.includes("--silent")) ; else ;
}

const SCRIPT_EXTENSIONS = /* @__PURE__ */ new Set([".js", ".ts"]);
new RegExp(
  `\\.(${Array.from(SCRIPT_EXTENSIONS).map((s) => s.slice(1)).join("|")})($|\\?)`
);

const STYLE_EXTENSIONS = /* @__PURE__ */ new Set([
  ".css",
  ".pcss",
  ".postcss",
  ".scss",
  ".sass",
  ".styl",
  ".stylus",
  ".less"
]);
new RegExp(
  `\\.(${Array.from(STYLE_EXTENSIONS).map((s) => s.slice(1)).join("|")})($|\\?)`
);

function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return toPath;
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  return {
    ...serializedManifest,
    assets,
    routes
  };
}

const _manifest = Object.assign(deserializeManifest({"adapterName":"@astrojs/netlify/functions","routes":[{"file":"","links":["assets/animated-spritesheet.9bc28491.css"],"scripts":[],"routeData":{"route":"/","type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/animated-spritesheet.9bc28491.css","assets/animated-spritesheet.bc7ac336.css"],"scripts":[],"routeData":{"route":"/animated-spritesheet","type":"page","pattern":"^\\/animated-spritesheet\\/?$","segments":[[{"content":"animated-spritesheet","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/animated-spritesheet.astro","pathname":"/animated-spritesheet","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/animated-spritesheet.9bc28491.css","assets/css-properties.f796e889.css"],"scripts":[],"routeData":{"route":"/css-properties","type":"page","pattern":"^\\/css-properties\\/?$","segments":[[{"content":"css-properties","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/css-properties.astro","pathname":"/css-properties","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/animated-spritesheet.9bc28491.css","assets/theme-toggle.a88c3a42.css"],"scripts":[],"routeData":{"route":"/theme-toggle","type":"page","pattern":"^\\/theme-toggle\\/?$","segments":[[{"content":"theme-toggle","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/theme-toggle.astro","pathname":"/theme-toggle","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/animated-spritesheet.9bc28491.css","assets/breadcrumb.8f15db12.css"],"scripts":[],"routeData":{"route":"/breadcrumb","type":"page","pattern":"^\\/breadcrumb\\/?$","segments":[[{"content":"breadcrumb","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/breadcrumb.astro","pathname":"/breadcrumb","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/animated-spritesheet.9bc28491.css","assets/index.00728be4.css"],"scripts":[],"routeData":{"route":"/pagination","type":"page","pattern":"^\\/pagination\\/?$","segments":[[{"content":"pagination","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/pagination/index.astro","pathname":"/pagination","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/animated-spritesheet.9bc28491.css","assets/index.50166a87.css"],"scripts":[],"routeData":{"route":"/pagination/[page]","type":"page","pattern":"^\\/pagination\\/([^/]+?)\\/?$","segments":[[{"content":"pagination","dynamic":false,"spread":false}],[{"content":"page","dynamic":true,"spread":false}]],"params":["page"],"component":"src/pages/pagination/[page]/index.astro","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/animated-spritesheet.9bc28491.css","assets/rating.0cc1464f.css"],"scripts":[],"routeData":{"route":"/rating","type":"page","pattern":"^\\/rating\\/?$","segments":[[{"content":"rating","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/rating.astro","pathname":"/rating","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/animated-spritesheet.9bc28491.css","assets/index.f1ff0b93.css"],"scripts":[],"routeData":{"route":"/links","type":"page","pattern":"^\\/links\\/?$","segments":[[{"content":"links","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/links/index.astro","pathname":"/links","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/animated-spritesheet.9bc28491.css","assets/1.173e5b46.css"],"scripts":[],"routeData":{"route":"/links/1","type":"page","pattern":"^\\/links\\/1\\/?$","segments":[[{"content":"links","dynamic":false,"spread":false}],[{"content":"1","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/links/1.astro","pathname":"/links/1","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/animated-spritesheet.9bc28491.css","assets/2.471511c6.css"],"scripts":[],"routeData":{"route":"/links/2","type":"page","pattern":"^\\/links\\/2\\/?$","segments":[[{"content":"links","dynamic":false,"spread":false}],[{"content":"2","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/links/2.astro","pathname":"/links/2","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/animated-spritesheet.9bc28491.css"],"scripts":[],"routeData":{"route":"/map","type":"page","pattern":"^\\/map\\/?$","segments":[[{"content":"map","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/map.astro","pathname":"/map","_meta":{"trailingSlash":"ignore"}}}],"base":"/","markdown":{"drafts":false,"syntaxHighlight":"shiki","shikiConfig":{"langs":[],"theme":"github-dark","wrap":false},"remarkPlugins":[],"rehypePlugins":[],"remarkRehype":{},"extendDefaultPlugins":false,"isAstroFlavoredMd":false},"pageMap":null,"renderers":[],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"entry.mjs","astro:scripts/before-hydration.js":""},"assets":["/assets/1.173e5b46.css","/assets/2.471511c6.css","/assets/animated-spritesheet.9bc28491.css","/assets/animated-spritesheet.bc7ac336.css","/assets/breadcrumb.8f15db12.css","/assets/css-properties.f796e889.css","/assets/index.00728be4.css","/assets/index.f1ff0b93.css","/assets/index.50166a87.css","/assets/rating.0cc1464f.css","/assets/theme-toggle.a88c3a42.css","/boom.png","/cat.png","/coin.png","/favicon.svg","/guy.png","/monster.png","/test-grid-long.png","/test-grid-tall.png","/test-grid.png","/xmastree.png"]}), {
	pageMap: pageMap,
	renderers: renderers
});
const _args = {};

const _exports = adapter.createExports(_manifest, _args);
const handler = _exports['handler'];

const _start = 'start';
if(_start in adapter) {
	adapter[_start](_manifest, _args);
}

export { handler };
