try{self["workbox:window:5.1.3"]&&_()}catch(c){}function v(c,e){return new Promise(function(d){var f=new MessageChannel();f.port1.onmessage=function(m){d(m.data)},c.postMessage(e,[f.port2])})}function y(c,e){for(var d=0;d<e.length;d++){var f=e[d];f.enumerable=f.enumerable||!1,f.configurable=!0,"value"in f&&(f.writable=!0),Object.defineProperty(c,f.key,f)}}try{self["workbox:core:5.1.3"]&&_()}catch(c){}var r=function(){var c=this;this.promise=new Promise(function(e,d){c.resolve=e,c.reject=d})};function s(c,e){var d=location.href;return new URL(c,d).href===new URL(e,d).href}var o=function(c,e){this.type=c,Object.assign(this,e)};function p(c,e,d){return d?e?e(c):c:(c&&c.then||(c=Promise.resolve(c)),e?c.then(e):c)}function z(){}var A=function(c){var e,d;function f(i,j){var a,b;return void 0===j&&(j={}),(a=c.call(this)||this).t={},a.i=0,a.o=new r(),a.u=new r(),a.s=new r(),a.v=0,a.h=new Set(),a.l=function(){var h=a.g,g=h.installing;a.i>0||!s(g.scriptURL,a.m)||performance.now()>a.v+6e4?(a.P=g,h.removeEventListener("updatefound",a.l)):(a.p=g,a.h.add(g),a.o.resolve(g)),++a.i,g.addEventListener("statechange",a.k)},a.k=function(h){var g=a.g,k=h.target,q=k.state,t=k===a.P,x=t?"external":"",u={sw:k,originalEvent:h};!t&&a.j&&(u.isUpdate=!0),a.dispatchEvent(new o(x+q,u)),"installed"===q?a.O=self.setTimeout(function(){"installed"===q&&g.waiting===k&&a.dispatchEvent(new o(x+"waiting",u))},200):"activating"===q&&(clearTimeout(a.O),t||a.u.resolve(k))},a.R=function(h){var g=a.p;g===navigator.serviceWorker.controller&&(a.dispatchEvent(new o("controlling",{sw:g,originalEvent:h,isUpdate:a.j})),a.s.resolve(g))},a.S=(b=function(h){var g=h.data,k=h.source;return p(a.getSW(),function(){a.h.has(k)&&a.dispatchEvent(new o("message",{data:g,sw:k,originalEvent:h}))})},function(){for(var h=[],g=0;g<arguments.length;g++)h[g]=arguments[g];try{return Promise.resolve(b.apply(this,h))}catch(k){return Promise.reject(k)}}),a.m=i,a.t=j,navigator.serviceWorker.addEventListener("message",a.S),a}d=c,(e=f).prototype=Object.create(d.prototype),e.prototype.constructor=e,e.__proto__=d;var m,n,l=f.prototype;return l.register=function(i){var j=(void 0===i?{}:i).immediate,a=void 0!==j&&j;try{var b=this;return function(h,g){var k=h();return k&&k.then?k.then(g):g(k)}(function(){if(!a&&"complete"!==document.readyState)return w(new Promise(function(h){return window.addEventListener("load",h)}))},function(){return b.j=Boolean(navigator.serviceWorker.controller),b.U=b.B(),p(b.L(),function(h){b.g=h,b.U&&(b.p=b.U,b.u.resolve(b.U),b.s.resolve(b.U),b.U.addEventListener("statechange",b.k,{once:!0}));var g=b.g.waiting;return g&&s(g.scriptURL,b.m)&&(b.p=g,Promise.resolve().then(function(){b.dispatchEvent(new o("waiting",{sw:g,wasWaitingBeforeRegister:!0}))}).then(function(){})),b.p&&(b.o.resolve(b.p),b.h.add(b.p)),b.g.addEventListener("updatefound",b.l),navigator.serviceWorker.addEventListener("controllerchange",b.R,{once:!0}),b.g})})}catch(h){return Promise.reject(h)}},l.update=function(){try{return this.g?w(this.g.update()):void 0}catch(i){return Promise.reject(i)}},l.getSW=function(){try{return void 0!==this.p?this.p:this.o.promise}catch(i){return Promise.reject(i)}},l.messageSW=function(i){try{return p(this.getSW(),function(j){return v(j,i)})}catch(j){return Promise.reject(j)}},l.B=function(){var i=navigator.serviceWorker.controller;return i&&s(i.scriptURL,this.m)?i:void 0},l.L=function(){try{var i=this;return function(j,a){try{var b=j()}catch(h){return a(h)}return b&&b.then?b.then(void 0,a):b}(function(){return p(navigator.serviceWorker.register(i.m,i.t),function(j){return i.v=performance.now(),j})},function(j){throw j})}catch(j){return Promise.reject(j)}},m=f,(n=[{key:"active",get:function(){return this.u.promise}},{key:"controlling",get:function(){return this.s.promise}}])&&y(m.prototype,n),f}(function(){function c(){this.M=new Map()}var e=c.prototype;return e.addEventListener=function(d,f){this._(d).add(f)},e.removeEventListener=function(d,f){this._(d).delete(f)},e.dispatchEvent=function(d){d.target=this;var f=this._(d.type),m=Array.isArray(f),n=0;for(f=m?f:f[Symbol.iterator]();;){var l;if(m){if(n>=f.length)break;l=f[n++]}else{if((n=f.next()).done)break;l=n.value}l(d)}},e._=function(d){return this.M.has(d)||this.M.set(d,new Set()),this.M.get(d)},c}());function w(c,e){if(!e)return c&&c.then?c.then(z):Promise.resolve()}export{A as Workbox,v as messageSW};