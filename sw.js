/* Dmei-Kiss service worker. Bump CACHE on every deploy so phones pick up the new build. */
var CACHE = "dmeikiss-v17";
var SHELL = ["./","./index.html","./manifest.webmanifest","./icon-192.png","./icon-512.png","./icon-180.png","./icon-32.png"];

self.addEventListener("install", function(e){
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(SHELL).catch(function(){});}));
});

self.addEventListener("activate", function(e){
  e.waitUntil(caches.keys().then(function(keys){
    return Promise.all(keys.map(function(k){ if(k!==CACHE) return caches.delete(k); }));
  }).then(function(){ return self.clients.claim(); }));
});

self.addEventListener("fetch", function(e){
  var url = new URL(e.request.url);
  if(e.request.method !== "GET") return;
  /* never cache Firestore or Google APIs, they handle their own offline */
  if(url.hostname.indexOf("googleapis.com")>-1 || url.hostname.indexOf("firebaseio.com")>-1
     || url.hostname.indexOf("gstatic.com")>-1 && url.pathname.indexOf("/firebasejs/")>-1) return;

  if(e.request.mode === "navigate"){
    e.respondWith(fetch(e.request).then(function(r){
      var copy = r.clone(); caches.open(CACHE).then(function(c){c.put("./index.html", copy);}); return r;
    }).catch(function(){ return caches.match("./index.html"); }));
    return;
  }
  e.respondWith(caches.match(e.request).then(function(hit){
    return hit || fetch(e.request).then(function(r){
      if(r && r.status===200 && r.type==="basic"){
        var copy=r.clone(); caches.open(CACHE).then(function(c){c.put(e.request, copy);});
      }
      return r;
    }).catch(function(){ return hit; });
  }));
});
