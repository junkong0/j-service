# 교통 길잡이 지도 (J service)

일본 지역별 교통·터치 결제·화장실 정보를 보여 주는 모바일용 지도 웹앱입니다.
GitHub Pages로 올리면 휴대폰 브라우저에서 바로 열 수 있고, 홈 화면에 앱처럼 추가할 수도 있어요.

## 파일 구성

| 파일 | 역할 |
|---|---|
| `index.html` | 앱 본체 (그림·글꼴 포함) |
| `config.js` | 설정 — 경로 서버 주소 (GitHub Pages에서는 비워 둠) |
| `manifest.webmanifest` | 홈 화면 추가용 앱 정보 |
| `sw.js` | 오프라인 보기·빠른 로딩용 서비스 워커 |
| `apple-touch-icon.png`, `icons/` | 아이폰·안드로이드 홈 화면 아이콘 |
| `.nojekyll` | GitHub Pages가 파일을 그대로 올리도록 하는 빈 파일 |

## GitHub Pages에 올리는 방법

1. GitHub에서 **New repository** → 이름 입력(예: `jservice-map`) → **Public** → Create.
2. **Add file → Upload files**에서 이 폴더 안의 파일을 **모두** 끌어다 놓고 Commit.
   - `icons` 폴더도 폴더째 끌어다 놓으세요.
   - `.nojekyll`은 숨김 파일이라 안 보일 수 있어요. 빠져도 동작에는 문제없어요.
3. 저장소 **Settings → Pages** → Source: **Deploy from a branch**, Branch: **main** / **(root)** → Save.
4. 1~2분 뒤 `https://<내 아이디>.github.io/jservice-map/` 주소로 접속하면 됩니다.

## 휴대폰 홈 화면에 추가

- **아이폰(Safari)**: 공유 버튼 → **홈 화면에 추가**
- **안드로이드(Chrome)**: 메뉴(⋮) → **앱 설치** 또는 **홈 화면에 추가**

## 수정한 뒤 반영이 안 될 때

`index.html`을 고쳐 올렸는데 휴대폰에 예전 화면이 보이면 페이지를 한 번 새로고침하세요.
그래도 안 되면 `sw.js` 맨 위의 `VERSION` 값을 `jsv-v2`처럼 바꿔서 같이 올리면 저장본이 새로 갱신됩니다.

## 참고

- '내 위치' 기능은 HTTPS에서만 동작합니다. GitHub Pages는 기본이 HTTPS라 그대로 쓰면 됩니다.
- 지도·검색·경로는 OpenFreeMap, OpenStreetMap(Nominatim·Overpass), OSRM 공개 서버를 사용합니다.
- GitHub 웹 업로드는 파일당 25MB까지 가능하며, `index.html`(약 6MB)은 문제없이 올라갑니다.
