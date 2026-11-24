/* 교통 길잡이 지도 — 서비스 워커
   · 페이지(index.html 등): 네트워크 우선 → 새 버전을 올리면 바로 반영, 오프라인이면 저장본 사용
   · 지도 라이브러리·글꼴(CDN): 저장본 우선 → 빠르게 열림
   · 검색·경로·화장실 데이터 API와 지도 타일: 저장하지 않음 (항상 최신) */
const VERSION = "jsv-v1";
const SHELL = ["./", "./index.html", "./config.js", "./manifest.webmanifest",
  "./apple-touch-icon.png", "./icons/icon-192.png", "./icons/icon-512.png"];
const CDN_HOSTS = ["cdn.jsdelivr.net", "unpkg.com"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // 같은 사이트 파일: 네트워크 우선
  if (url.origin === self.location.origin) {
    e.respondWith(
      fetch(req)
        .then((res) => {
          if (res.ok) { const copy = res.clone(); caches.open(VERSION).then((c) => c.put(req, copy)); }
          return res;
        })
        .catch(() => caches.match(req).then((r) => r || caches.match("./index.html")))
    );
    return;
  }

  // 지도 라이브러리·글꼴: 저장본 우선
  if (CDN_HOSTS.includes(url.hostname)) {
    e.respondWith(
      caches.match(req).then((hit) => hit || fetch(req).then((res) => {
        if (res.ok || res.type === "opaque") { const copy = res.clone(); caches.open(VERSION).then((c) => c.put(req, copy)); }
        return res;
      }))
    );
  }
  // 그 밖(지도 타일, 검색·경로 API 등)은 브라우저 기본 동작
});
