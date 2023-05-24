# Crudify란?
<br />

> 누구나 API 서버를 만들어 볼 수 있는 headless CMS 서비스입니다
<br />

간단한 커맨드를 입력해 DB와 연결된 서버를 만들고 구동해볼 수 있습니다.

Backend에 대해 잘 모르더라도, 대시보드를 통해 서버를 손쉽게 관리할 수 있습니다.
<br />
<br />

```bash
$ npx create-crudify-app@latest my-project
```
<br />

<p align='center'>
  <img src='https://user-images.githubusercontent.com/79369983/207563112-fcceb937-a418-47cf-939a-fe9b92141d05.gif' width='800' alt='create-crudify-app'>
</p>

## 💁‍♀️ 목차

- [👨‍🏫 사용 방법](#-사용-방법)
- [🕵️‍♂️ 주요 포인트](#%EF%B8%8F%EF%B8%8F주요-포인트)
    - [📌 대시보드를 통해 서버를 제어하기](#대시보드를-통해-서버를-제어하기)
    - [📌 사용자가 설계한 대로 서버를 구현하기](#-사용자가-설계한-대로-서버를-구현하기)
    - [📌 서버를 설치해주기](#서버를-설치해주기)
    - [📌 Webpack 설정 및 개선](#webpack-설정-및-개선)
- [👨‍🎨 기술 스택](#기술-스택)
- [🧘‍♂️ 회고](#%EF%B8%8F회고)

<details>
<summary>

## 👨‍🏫 사용 방법

</summary>

<h4 align="center">서버 설치가 완료되면, 대시보드가 열리게 됩니다.</h4> 

<p align="center">
  <img src="https://github.com/ponjaehyeok/crudify/assets/79369983/f939bf81-ab07-4cd0-a630-6a51c1dfd1ef" width="600" />
</p>

<h4 align="center">Model Menu에서 Type을 생성할 수 있습니다.</h4>

<p align="center">
  <img src="https://github.com/ponjaehyeok/crudify/assets/79369983/607aeff4-8e99-4b08-bda2-cd27384431de" width="600" />
</p>

<h4 align="center">API menu에서 endpoint 연결을 관리할 수 있습니다.</h4>
 
<p align="center">
  <img src="https://github.com/ponjaehyeok/crudify/assets/79369983/fc9e926b-73c5-48f3-8653-7148b7cef5b8" width="600" />
</p>

<h4 align="center">변경사항을 저장하게 되면, 서버가 재시작됩니다.</h4>

<p align="center">
  <img src="https://github.com/ponjaehyeok/crudify/assets/79369983/0f3d0111-743d-42ee-8ce3-f4b25f26f38c" width="600" />
</p>

<h4 align="center">API 요청을 보내게되면, 터미널에 Log가 남게 되어 확인해볼 수 있습니다.</h4>

<p align="center">
  <img src="https://github.com/ponjaehyeok/crudify/assets/79369983/a18270ba-9b48-429c-9cec-eb70e40318c2" width="600" />
</p>

</details>

## 🕵️‍♂️ 주요 포인트

### 📌 대시보드를 통해 서버를 제어하기

Crudify는 API 서버와 대시보드가 함께 동작하는 구조입니다. 그리고 대시보드에서 서버를 수정해 다시 서버를 가동시키게 할 수 있습니다.

이를 위해 가장 단순하게 생각할 수 있는 방식은, 하나의 서버에서 웹과 API 서버를 모두 처리하는 방식(monolith 방식)입니다. 다만 한 가지 문제점이 있었습니다. API 서버를 종료할 때 웹 사이트의 연결도 종료된다는 점입니다. 대시보드(웹 사이트)는 API 서버의 동작와는 상관없이 계속 연결이 유지되어야했습니다. 사용자가 서버를 재가동시킬 때, 웹 사이트의 연결도 끊기게 되면 불편함을 느낄 것입니다. 그래서 Web 서버와 API 서버를 별개로 구동시키게 되었습니다.

API 서버를 구동시킬 때 유의했던 점은 재가동 로직입니다. 손쉽게 재가동을 하려면 서버와 통신하는 과정이 필요한데요. 그러한 이유로 별도의 Thread가 아닌 별도의 Process로 동작시켰습니다. Node.js의 Cluster 모듈을 활용하였고 IPC를 통해 소통할 수 있게 되었습니다.

![001](https://github.com/ponjaehyeok/crudify/assets/79369983/35b9fac8-7184-4525-b57d-3fbed921f669)

그렇다면 어떻게 Web에서 서버를 재가동시키게 될 수 있을까요? 저는 ‘파일 변경과 감지’에서 그 해답을 찾게 되었습니다. Web Server는 HTTP 연결로 API Server와 연결할 수 있습니다. API Server는 File System에 접근할 수 있기 때문에, 사용자의 서버 파일을 변경시키게 됩니다. 변경된 파일은 메인 프로세스(Primary Process)에서 구독한 파일 감지(`fs.watchFile`을 이용한 라이브러리 사용) 이벤트 핸들러에 의해 실행됩니다. 이렇게 대시보드(웹 서버)가 종료되지 않고 API 서버를 다룰 수 있게 됩니다.
<br />
<br />

```jsx
proxy: {
  context: "!/dashboard/**", // /dashboard 이외의 경로는
  target: "http://localhost:8080" // api 서버로 프록시됩니다.
}
```

웹 서버와 API 서버는 하나의 주소로 접속할 수 있게 하였습니다. `/dashboard` 이외의 모든 요청은 API 서버로 프록시됩니다. `/dashboard`로 접속하면 web server가 동작해 dashboard로 접속할 수 있습니다. 이를 통해 사용자가 하나의 주소로 두 개의 서버에 접속할 수 있도록 하였습니다.

### 🤔 개선할 점 - 대시보드에서 API 서버의 재연결을 확인하는 프로세스

현재의 API 서버가 다시 연결이 되었는 지 확인하는 프로세스는, 대시보드에서 서버로부터 응답이 올 때까지 계속 HTTP 요청을 보내는 방식입니다. 

의도적으로 요청이 실패하는 프로세스를 계속 만들어서 응답에 성공하면 멈추는 방식인데요. 이런 방식은 명확하게 서버가 재시작되는 시점을 전달받는 게 아니라 불안정하고, 의도치않게 서버가 꺼지기 전에 요청을 보내 버그가 발생할 수도 있다는 점에서 좋지 않다고 생각하였습니다.

이를 개선하기 위해서는 Primary Process에서 서버를 재가동시킬 때, 대시보드에도 이 이벤트를 전달해야 하는데요. 외부 Process에서 웹 서버로 보내는 요청을 어떻게 구현할 수 있을 지 잘 떠오르지 않아 이 부분은 진행하지 못했는데, 추후에 개선해보고 싶습니다.
<br />
<br />

### 📌 사용자가 설계한 대로 서버를 구현하기

Crudify의 서버는 사용자가 커스터마이징한 서버를 구동시켜주어야 합니다.

보통의 서버는 구현하려는 대상이 정해져있고, 이를 코드로 작성해 서버를 동작시키게 됩니다. 하지만 저는 동적으로 서버를 구현해주어야 했습니다. 

```jsx
// config/crudify.json
{
  "collections": [
    "pizzas"
  ],
}

// models/pizzas.json
[
  {
    type: "id",
    name: "pizzasId",
    options: ["unique"]
  },
  {
    type: "text",
    name: "pizzaName",
    options: []
  },
]

// apis/pizzas.json
[
  {
    url: "/api/pizzas",
    type: "create",
    method: "POST",
    permission: "allowed"
  },
  {
    url: "/api/pizzas/:contentId",
    type: "findOne",
    method: "GET",
    permission: "notAllowed"
  },
]
```
<br />

우선 사용자의 서버를 정의하는 추상화된 데이터를 정의합니다. 서버를 정의하는 스키마 정보와 Route 정보, 설정 등을 사용자의 디렉토리에 생성해줍니다. 서버가 구동될 때는 이 데이터를 기반으로 Mongoose의 Model을 생성해주고, Route를 등록해주는 작업을 해줍니다.

```jsx
// collection마다 모든 api 데이터에 대한 Route를 생성해줍니다.
apiCollections.forEach((collection) => {
  collection.data.forEach((api) => {
    if (api.permission === "notAllowed") {
      return;
    }

    const model = crudify.models[collection.name];

    generateHttpMethod(
      api.method,
      api.url,
      generateRoute(api.type, model)
    );
  });
});

// Method에 따라 app에 다른 메소드가 등록됩니다.
const generateHttpMethod = (method, ...args) => {
  switch(method) {
    case "GET":
      return crudify.app.get(...args);
    case "POST":
      return crudify.app.post(...args);
    case "PUT":
      return crudify.app.put(...args);
    case "DELETE":
      return crudify.app.delete(...args);
    default:
      return;
  }
};
```
<br />

일반 웹 어플리케이션 서버의 경우 서버를 실행해주는 로직만 있으면 되지만, Crudify의 API 서버는 실행과 중지, 재가동을 해주는 등의 서버 생애주기를 갖고 있습니다.

그래서 단순 서버 실행 로직이 아닌 인스턴스의 메소드로 나타내고 관리할 수 있게 됩니다.

하나의 개체를 용이하게 관리해주기 위해, 서버를 Class로 정의해주었습니다. 서버를 실행할 때는 인스턴스를 생성해 실행하고, 관리할 수 있습니다.

```jsx
class Server {
  constructor(project) {
    // ...
  }

  // 서버 실행
  async start() {
    // ...
    this.app.set("port", this.port);
    this.app.listen(this.port);
  }

  // 서버 중지
  stop() {
    process.exit(1);
  }

  // 서버 재실행
  reload() {
    process.send("reload");
  }
}
```
<br />

### 📌 서버를 설치해주기

 `create-crudify-app`이라는 한 줄의 npx 명령어를 이용해 서버를 설치할 수 있고, 설치 후 곧바로 실행됩니다.

패키지를 다운받는 방식에는 여러 방법이 있지만, 저는 npm을 이용한 방식과 npx를 이용한 방식에 대해 고민하였습니다. npx는 일회성으로 다운로드를 받고, 패키지가 로컬 디렉토리에 남지 않는다는 장점이 있고, 반대로 npm은 로컬 디렉토리에 남아 지속적으로 패키지를 이용할 수 있습니다. 

Crudify의 동작 조건은

1. 서버의 기본 초기 설정 파일을 다운로드한다.
2. 서버의 설정 파일을 읽어, 서버를 실행시키고 수정한다.

이 두 가지의 동작 조건을 만족해야 하는데요. 1번 조건의 경우에는 일회성으로 실행되는 동작입니다. 한 번 설치된 이 후에는 초기 설정이 필요하지 않습니다. 2번 조건의 경우는 지속적으로 실행될 필요가 있는 동작입니다.

저는 npm과 npx를 모두 활용하여 패키지를 만들어주었습니다. crudify의 프로젝트 구성은 npx를 이용한 일회성 초기 설정 파일을 설치해주는 패키지(create-crudify-app)와 지속적으로 실행되는 npm 패키지(crudify-service)로 나뉘게 됩니다. create-crudify-app 패키지 실행 과정에서 crudify-service 패키지를 다운로드 받도록 동작해, 별도로 패키지를 다운로드 받지 않아도 되도록 하였습니다.

### 🤔 개선할 점 - 패키지를 분리해서 관리하기

crudify-service 패키지에는 API 서버와 대시보드, 그리고 이들의 실행을 제어해주는 CLI까지 총 세 가지로 구분할 수 있습니다. Backend와 Frontend, 그리고 CLI는 별개의 기능이지만 더 패키지를 나누지 못해서 아쉬웠습니다. 

하지만 패키지를 별개의 레포지토리로 나눠서 관리한다면 좋을까?라고 생각했을 때, 그렇지는 않았는데요. 왜냐하면 패키지의 의존성 관리를 해주기가 쉽지 않기 때문입니다. 서버를 구동해주는 CLI에서 변경사항이 생기면 대시보드나 서버 패키지를 수정해야할 수도 있는데, 각각의 레포지토리라면 한 번에 관리해주기가 번거롭기 때문입니다.

찾아보니 제가 하려던 ‘패키지를 분리하면서도, 의존성 관리를 용이하게’ 하는 방법으로 모노레포가 있음을 알게 되었습니다. 각각의 패키지를 모듈화 해 독자적인 관리와 배포가 용이한 방식입니다. 사실 그렇게 많은 패키지는 아니라 모노레포 도구까지 쓸 필요는 없어보이긴 하지만, 모노레포 방식으로 프로젝트를 조금 더 개선할 수 있을 것 같습니다.
<br />
<br />

### 📌 Webpack 설정 및 개선

대시보드를 동작시키는 서버는 Webpack의 dev-server를 사용합니다. 이를 위해서 Webpack을 자체적으로 설정해주어야 했는데요. 처음에는 build 시간이 5000 ~ 6000ms로, Crudify가 처음 설치되고 대시보드가 보여지기까지 6초 정도의 딜레이가 발생하는 점을 확인하였습니다. 5 ~ 6초 정도의 시간은 사용자 경험에 영향을 끼칠 정도로 긴 시간이라고 판단하여 개선 작업을 진행했습니다. 개선 후 1000ms ~ 1200ms 정도로 번들링 시간을 단축하여, 사용자가 빠르게 결과를 알 수 있습니다.
<br />
<br />

**번들링 제외 설정 개선**

![002](https://github.com/ponjaehyeok/crudify/assets/79369983/63f3d6ca-501f-4f71-8ccb-31b87394690b)
<p align="left"><sub>Build 시간 측정 시, 5s 이상이 소요되었습니다.</sub></p>
<br />

build 시간이 오래 걸리는 이유를 분석하기 위해서 webpack build 시간 분석 플러그인으로 측정하였습니다(cache는 false로 설정하였습니다). build 측정 시 처음 눈에 띄었던 것은 babel-loader에서 걸린 시간인데요.  babel에서의 시간이 build 시간의 대부분을 차지하고 있었습니다.

그 중에서도 module count가 123인데 너무 많은 것은 아닐까? 라는 생각을 하게 되었습니다. 보통의 프로젝트들은 Webpack loader의 `exclude` 설정으로 node_modules를 제외하는데요. node_modules의 내부 코드들은 별도로 트랜스파일링할 필요가 없는 코드들이라, 따로 babel을 통해 트랜스파일링 하지 않는 경우가 대부분입니다. 

하지만 저는 프로젝트 구조상, node_modules 디렉토리 내부에 프로젝트가 위치해있어 exclude 설정을 사용하지 않았는데요. 이에 따른 개선으로, 현재의 프로젝트를 제외한 나머지 node_modules를 제외하도록 설정하였습니다.

```jsx
// before
exclude: /node_modules/

// after
exclude: (modulePath) => (
  /node_modules/.test(modulePath)
  && !/node_modules\\/crudify-service/.test(modulePath)
)
```

![003](https://github.com/ponjaehyeok/crudify/assets/79369983/7de7432b-13a7-4e54-a71f-717f4fa1a21a)
<p align="left"><sub>babel-loader의 속도 단축으로 전체 build 시간 단축</sub></p>
<br />

개선 후 babel-loader의 module count가 감소하게 되었습니다. 동시에 전체 build 시간도 2초대로 절반이상 감소하였습니다.
<br />
<br />

**esbuild-loader 사용**

처음 Webpack 설정해줄 때는 javascript와 JSX 코드를 ES6 이전의 코드로 트랜스파일링 해주도록 babel-loader를 사용했었습니다. 개선 작업을 하면서 babel-loader 대신, esbuild-loader로 Migration하였습니다. esbuild-loader는 Go 언어를 통해 조금 더 빠르게 트랜스파일링을 동작시켜주는 loader입니다. 덕분에 빌드 시간을 단축할 수 있게 되었습니다.

사실 바벨과 같은 트랜스파일링 도구는 빌드 시간도 중요하지만, 빌드 결과물이 가장 중요합니다. 트랜스파일링이 정상적으로 지원되지 않는다면 브라우저에서 제대로 사용할 수 없게 됩니다. esbuild-loader는 ES6(ES2015)까지 트랜스파일링이 지원됩니다. 일부 브라우저의 경우(Internet Explorer 11 등) ES5를 지원하기도 합니다. 다만 현재를 기준으로 지원이 종료된 브라우저를 특별히 고려해야할 상황은 아니었기에 esbuild-loader를 사용하게 되었습니다.

![004](https://github.com/ponjaehyeok/crudify/assets/79369983/d9d46814-20c3-4071-a81e-720bce7cd408)
<p align="left"><sub>es-build loader로 변경 후 빌드 시간 1초로 단축</sub></p>

### 🤔 개선할 점 - 처음부터 빌드 된 대시보드 파일을 제공하기

대시보드가 사용자에게 제공되기 위해 매 번 빌드되는 과정 자체가 불필요할 수도 있을 것 같습니다. 만약 대시보드가 미리 빌드되어있고, 서버에서는 빌드 된 html을 보여준다면 이 과정 자체를 생략할 수도 있을 것 같습니다. 처음 도전해보는 종류의 프로젝트이다보니, 진행할 때는 이런 부분을 미처 생각하지 못했던 것 같습니다. 

Nginx와 같은 웹 서버를 통해 정적인 페이지를 제공한다면 더 좋을 듯 합니다. 대시보드를 구동하는 서버는 Webpack dev-server와 그 내부 기능에 의존하는 경우가 많아, 프로젝트 진행 중에는 개선이 어려웠겠지만 추후 개선의 여지가 있을 것 같습니다.
<br />
<br />

## 👨‍🎨 기술 스택

**React**

- React를 이용하여 대시보드를 제작하였습니다.
- 서버 상태관리는 React-Query를 이용하였습니다. Crudify의 대시보드는 주로 서버와의 HTTP 통신으로 상호작용하는 경우가 많습니다. 서버 상태를 캐싱하고 효과적으로 관리해주기 위해서 React-Query를 사용하게 되었습니다.
- css는 styled-components를 사용하였습니다. 기존에 자주 사용하던 CSS Tool이기도 하고, 컴포넌트 스타일링에 편안함을 느껴 사용하게 되었습니다.

**Webpack**

- 자체적으로 대시보드 서버를 번들링하여 웹 서버를 동작시키는데 webpack 및 webpack-dev-server를 사용하였습니다.

**Node.js**

- File System(fs), Child Process, Cluster와 같은 nodeJS의 내장 모듈을 활용하였습니다. Child Process와 Cluster 모듈은 자식 프로세스를 생성한다는 점에서 비슷한 역할을 합니다. Child Process는 주로 명령어의 실행을 위해 사용되었고, Cluster는 대시보드와 API 서버를 구동시킬 때 사용하였습니다. Cluster는 프로세스 간 포트가 공유되기 때문입니다.

**Express / MongoDB / Mongoose**

- Express와 MongoDB, Mongoose를 이용해 API 서버를 제작하였습니다.
<br>

## 🧘‍♂️ 회고

**headless CMS에 대해 전혀 모르던 내가, 솔로 프로젝트를 진행하기까지**

프로젝트 아이템을 정하던 아침까지만 해도, headless CMS라는 것을 알 지 못했습니다. 너무 재밌을 것만 같다는 생각에 알고나서 얼마 되지 않아 프로젝트 아이템으로 정하게 되었는데요. 프로젝트 초반은 관련된 서비스와 오픈 소스 코드들을 많이 뜯어보고 파악해보는 데에 집중하였습니다.

구현하려는 동작이 작성된 오픈 소스 코드들을 보는 과정은 내 프로젝트에 도움이 되지만, 반대로 방대한 코드의 양 때문에 프로젝트의 구현을 어디까지 해야할 지 갈피를 잡지 못할 수도 있게 됩니다. 다른 코드들을 많이 보면서 이해하는 과정을 많이 하게 되었지만, 그 와중에도 스스로 프로젝트의 구현에 대한 방향성을 명확히 해야한다는 걸 느끼게 되었습니다.
<br />
<br />

**Node를 조금 더 이해하게 되다**

이번 프로젝트는 Node.js에 대해 한층 더 가까워진 프로젝트입니다. Node.js를 단순히 Express로 서버를 만들 때 이 외에는 잘 써본 적이 없었는데요. 이번에는 childe process 모듈을 이용해 명령어를 입력한다던지, 파일 시스템 모듈(fs)을 이용해 사용자의 파일을 생성하고 수정해준다던지, Cluster 모듈을 이용해 두 개의 Cluster를 생성해 관리하는 등, Node.js에서 해볼 수 있는 많은 일들을 경험해 본 프로젝트였습니다. Node.js에서 수행하는 많은 동작들을 라이브러리의 힘을 빌리지 않고 최대한 내장 모듈을 활용할 수 있도록 하였습니다.

그리고 npx 패키지를 제작하게 되면서 CLI(Command Line Interface)를 제공하게 되었는데요. 사용자에게 웹 페이지를 통한 화면이 아닌, 커맨드 라인을 통한 새로운 방식의 화면 전달을 하게 되어 무척 재밌었습니다. 이와 관련된 많은 라이브러리들도 알게 되어 CLI에 어떤 선택 사항을 주어지게 하거나, 로딩 스피너를 넣어 작업 중임을 알리는 등 다채로운 CLI의 세계를 탐험하게 되어 좋았습니다.
