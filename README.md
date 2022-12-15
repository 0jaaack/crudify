# Crudify란?
<br>

> 누구나 API Server를 만들어 볼 수 있는 headless CMS 서비스입니다
<br>

- 간단한 커맨드를 입력해 backend server를 만들고 구동해볼 수 있습니다.

- backend에 대해 잘 모르더라도, 대시보드를 통해 server를 손쉽게 관리할 수 있습니다.
<br>

```bash
$ npx create-crudify-app@latest my-project
```
<br>

<p align='center'>
<img src='https://user-images.githubusercontent.com/79369983/207563112-fcceb937-a418-47cf-939a-fe9b92141d05.gif' width='600' alt='create-crudify-app'>
</p>


## 💁‍♀️ 목차
- [👨‍🏫 사용 방법](#-사용-방법)
 
- [🕵️‍♂️ 주요 포인트](#%EF%B8%8F%EF%B8%8F주요-포인트)
  
  - [📌 대시보드를 통해 서버를 제어하기](#대시보드를-통해-서버를-제어하기)
  
  - [📌 서버를 설치해주기](#서버를-설치해주기)
  
  - [📌 webpack 설정 및 개선](#webpack-설정-및-개선)
  
  - [📌 코드 작성 시 고민했던 점](#코드-작성-시-고민했던-점)

- [👨‍🎨 기술 스택](#기술-스택)

- [🧘‍♂️ 회고](#%EF%B8%8F회고)

<br>


<details>
  <summary>
  
  ## 👨‍🏫 사용 방법
  
  </summary>
  
  <br>
  
1. 서버 설치가 완료되면, dashboard가 열리게 됩니다.

<p align='center'>
<img src='https://s3.us-west-2.amazonaws.com/secure.notion-static.com/3730e176-8ec3-429d-9413-f58bf16c89f9/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221215T142729Z&X-Amz-Expires=86400&X-Amz-Signature=4bcc523ac5a5f3573ae452f24db74ac7b0a2d974b61dd46e3232f527bde462b7&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject' width='600' alt='1-open-dashboard'>
</p>
<br>

2. Model menu에서 type을 생성할 수 있습니다.

<p align='center'>
<img src='https://s3.us-west-2.amazonaws.com/secure.notion-static.com/893e377b-7a89-46e0-aae0-9d5220261446/Screenshot_2022-12-14_at_14.18.23.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221215T142928Z&X-Amz-Expires=86400&X-Amz-Signature=ada70b35c5dab7897e2ae9c568ba91932c5cc077698ee3f81ca2a4c99e1af4c7&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Screenshot%25202022-12-14%2520at%252014.18.23.png%22&x-id=GetObject' width='500' alt='2-model-menu'>
<img src='https://s3.us-west-2.amazonaws.com/secure.notion-static.com/54262dd4-96a9-4ca5-9afc-b3cd7ed51593/Screenshot_2022-12-14_at_14.46.41.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221215T143031Z&X-Amz-Expires=86400&X-Amz-Signature=4247e60928bd5e52d91c0276c196b6eccade771c82374dcdc1be1d6837961134&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Screenshot%25202022-12-14%2520at%252014.46.41.png%22&x-id=GetObject' width='400' alt='2-model-menu'>
</p>
<br>

3. API menu에서 endpoint 연결을 관리할 수 있습니다.

<p align='center'>
<img src='https://s3.us-west-2.amazonaws.com/secure.notion-static.com/f84f1578-0d12-4a9d-a36a-ba14ec280e86/Screenshot_2022-12-14_at_14.22.09.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221215T143159Z&X-Amz-Expires=86400&X-Amz-Signature=d1298555409ba2c92245e12e8b01d0bcaab7c54b08a0cfa92bcf5c397ad69f2c&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Screenshot%25202022-12-14%2520at%252014.22.09.png%22&x-id=GetObject' width='600' alt='3-api-menu'>
</p>
<br>

4. 변경사항을 저장하게 되면, 서버가 재시작됩니다. 
   API 요청을 보내게되면, 터미널에 log가 남게 되어 확인해볼 수 있습니다.

<p align='center'>
<img src='https://s3.us-west-2.amazonaws.com/secure.notion-static.com/8e2caf57-bcd7-44ea-b938-1c7d70813d09/Screenshot_2022-12-14_at_14.29.55.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221215T143228Z&X-Amz-Expires=86400&X-Amz-Signature=a5fb3b44e7a4e713fc94e06a48bd0b5146127c7d2944cb8827854bccea12a248&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Screenshot%25202022-12-14%2520at%252014.29.55.png%22&x-id=GetObject' width='600' alt='4-log'>
</p>
<br>
  
</details>

## 🕵️‍♂️ 주요 포인트

### 📌 대시보드를 통해 서버를 제어하기
crudify는 두 개의 서버를 통해서 동작하게 됩니다.

API 요청을 수행하는 API 서버가 동작하게 되고, 두 번째로 대시보드를 위한 웹 서버가 동작합니다. 웹 서버에서 대시보드를 띄우고, 대시보드에서는 API 서버에 데이터를 수정하도록 요청을 보냅니다. 서버가 수정 된 후 API 서버를 다시 구동시켜, 실시간으로 서버의 수정사항을 반영할 수 있습니다.
<br>
<br>

우선 ‘어떻게 서버에서 대시보드 웹 화면을 띄워줄 수 있을 까’에 대해 고민하였습니다.

가장 처음 생각했던 방향은 하나의 서버에서 웹과 API 서버를 모두 처리하는 방식(monolith 방식)입니다. 가장 단순하게 생각할 수 있는 방향이었지만, 한 가지 문제점이 있었습니다. API 서버와 웹 서버가 연결되어 있어, 서버를 종료할 때 웹 서버도 종료된다는 점입니다. 대시보드(웹 서버)는 API 서버의 동작와는 상관없이 계속 연결이 유지되어야했습니다.

<p align='center'>
<img src='https://s3.us-west-2.amazonaws.com/secure.notion-static.com/c198e117-495d-41c9-878c-c7b6bcf3f628/Screenshot_2022-12-14_at_21.24.47.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221215T143529Z&X-Amz-Expires=86400&X-Amz-Signature=4590a3921513d7dab2c3f4956f86e5e0d9d68599ad3883a3cc6eee773e00cadf&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Screenshot%25202022-12-14%2520at%252021.24.47.png%22&x-id=GetObject' width='800' alt='server-reload-process'>
</p>
<br>

API 서버를 구동시키고, 웹 서버는 webpack의 dev-server를 이용해 동작하게 됩니다. 웹 서버에서 API 서버에 요청을 내부적으로 보내 대시보드 정보를 가져오고 수정할 수 있습니다. 별도의 cluster를 생성해 구동되도록 하였습니다. 

웹 서버에서 API 서버로 수정 요청을 보내게 되면, API 서버는 프로젝트 디렉토리의 서버 파일을 요청에 맞도록 수정합니다. 프로젝트 파일이 수정되면 main process에서 이를 감지해 API 서버를 종료 시키고, 다시 구동시키는 동작을 수행합니다. 이를 통해서 대시보드(웹 서버)가 종료되지 않고 API 서버를 다룰 수 있게 됩니다.


<p align='center'>
<img src='https://s3.us-west-2.amazonaws.com/secure.notion-static.com/68902b5e-1ab4-4904-b19c-d0f6c03dfa69/Screenshot_2022-12-14_at_21.44.25.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221215T143728Z&X-Amz-Expires=86400&X-Amz-Signature=cb4bf77d2f9718713248be295e6d797d93a5c12d64bfb076af27aa02ef85806f&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Screenshot%25202022-12-14%2520at%252021.44.25.png%22&x-id=GetObject' width='800' alt='proxy-process'>
</p>
<br>

마지막으로 웹 서버와 API 서버는 프록시를 통해 하나의 주소를 통해서 접속할 수 있게 하였습니다. `/dashboard`이외의 모든 요청은 API 서버로 프록시됩니다. `/dashboard`로 접속하면 web server가 동작해 dashboard로 접속할 수 있습니다. 이를 통해 하나의 주소로 서버를 관리하는 사용자 경험을 줄 수 있도록 하였습니다.
<br>
<br>

### 🤔 개선할 점

- 대시보드에서 API 서버의 재연결을 확인하는 프로세스
    
    현재의 API 서버가 다시 연결이 되었는 지 확인하는 프로세스는, 대시보드에서 서버로부터 응답이 올 때까지 계속 요청을 보내는 방식입니다. 의도적으로 요청이 실패하는 프로세스를 계속 만들어서 응답에 성공하면 멈추는 방식인데요. 이런 방식은 명확하게 서버가 재시작되는 시점을 전달받는 게 아니라 불안정하고, 의도치않게 서버가 꺼지기 전에 요청을 보내 버그가 발생할 수도 있다는 점에서 좋지 않다고 생각하였습니다.
    
    이를 개선하기 위해서는 primary process에서 서버를 재가동시킬 때, 대시보드에도 이 이벤트를 전달해야 하는데요. 내부의 state나 외부로 보내는 요청이 아닌, 외부에서 오는 요청을 어떻게 구현할 수 있을 지 잘 떠오르지 않아 이 부분은 진행하지 못했는데, 추후에 개선해보고 싶습니다.
    
- local 환경에서뿐만 아니라, 배포 환경에서도 잘 동작하도록 하기
    
    현재 배포 기능이 있지는 않지만 배포 기능이 적용된다면 그에 맞게 여러 로직을 개선할 수 있을 것 같습니다. 위와 같이 단순히 파일을 수정하고 새로 가동하는 로직에서, github 연동을 통한 배포일 경우 github에 push를 진행해 배포 사항을 수정하는 방식으로 만들어볼 수 있을 것 같습니다.
<br>

### 📌 서버를 설치해주기
서버는 한 줄의 명령어를 입력해 설치가 되고, 곧 바로 실행됩니다. frontend 개발자들이 자주 사용하는 `create-react-app`과 같은 npx 명령어를 이용해 설치가 진행됩니다.

어떤 패키지를 다운받는 방식에는 여러 방법이 있지만, 저는 npm을 이용한 방식과 npx를 이용한 방식에 대해 고민하였습니다. npx는 일회성으로 다운로드를 받고, 패키지가 로컬 디렉토리에 남지 않는다는 장점이 있고, 반대로 npm은 로컬 디렉토리에 남아 지속적으로 패키지를 이용할 수 있습니다. crudify의 동작 조건은

1. 서버의 기본 초기 설정 파일을 다운로드한다.
2. 서버의 설정 파일을 읽어, 서버를 실행시키고 수정한다.

이 두 가지의 동작 조건을 만족해야 하는데요. 1번 조건의 경우에는 일회성으로 실행되는 동작입니다. 한 번 설치된 이 후에는 초기 설정이 필요하지 않습니다. 2번 조건의 경우는 지속적으로 실행될 필요가 있는 동작입니다.

그래서 초기 설정 파일을 다운로드하는 패키지와, 서버를 구동시키고 수정하는 패키지를 분리하여 각각 npx, npm을 이용해 설치하게 됩니다. crudify의 프로젝트 구성은 npx를 이용한 초기 설정 파일을 설치해주는 패키지(create-crudify-app)와 npm 패키지(crudify-service)로 나뉘게 됩니다. 다만 create-crudify-app 패키지 실행 과정에서 crudify-service 패키지를 다운로드 받도록 동작해, 별도로 패키지를 다운로드 받지 않아도 됩니다.
<br>
<br>

### 🤔 개선할 점

- 패키지를 분리해서 관리하기
    
    각각의 패키지는 독립적인 하나의 기능을 맡아야 하는데, crudify-service 패키지에는 서버가 구동되는 부분과 대시보드가 동작하는 코드가 연결되어 있는 부분이 아쉽습니다. server와 관련된 부분과 대시보드와 관련된 부분을 별도의 패키지로 작성했다면 더 좋았을 것 같습니다.
<br>

### 📌 webpack 설정 및 개선
대시보드를 동작시키는 서버는 webpack의 dev-server를 사용합니다. 이를 위해서 webpack을 자체적으로 설정해주어야 했는데요. 처음에는 build 시간이 5000 ~ 6000ms로, crudify가 처음 설치되고 대시보드가 보여지기까지 6초 정도의 딜레이가 발생하는 점을 확인하였습니다. 5~6초 정도의 시간은 사용자 경험에 영향을 끼칠 정도로 긴 시간이라고 판단하여 개선 작업을 진행했습니다. 개선 후 1000ms ~ 1200ms 정도로 번들링 시간을 단축하여, 사용자가 빠르게 결과를 알 수 있습니다.

**트랜스파일링 제외 설정 개선**

보통의 프로젝트들은 webpack loader의 exclude 설정으로 node_modules를 제외하는데요. node_modules의 내부 코드들은 별도로 트랜스파일링할 필요가 없는 코드들이라, 따로 babel을 통해 트랜스파일링 하지 않는 경우가 대부분입니다. 하지만 저는 프로젝트 구조상, node_modules 디렉토리 내부에 프로젝트가 위치해있어 exclude 설정을 사용하지 않았는데요. 이에 따른 개선으로, 현재의 project를 제외한 나머지 node_modules를 제외하도록 설정하였습니다.

```
// before
exclude: /node_modules/

// after
exclude: (modulePath) => (
  /node_modules/.test(modulePath)
  && !/node_modules\/crudify-service/.test(modulePath)
)
```

**esbuild-loader 사용**

처음 webpack 설정해줄 때는 javascript와 JSX 코드를 ES6 이전의 코드로 트랜스파일링해주도록 babel-loader를 사용했었습니다. 개선 작업을 하면서 babel-loader 대신, esbuild-loader로 migration하였습니다. esbuild-loader는 Go 언어를 통해 조금 더 빠르게 트랜스파일링을 동작시켜주는 loader입니다. 덕분에 빌드 시간을 단축할 수 있게 되었습니다.
<br>
<br>

### 🤔 개선할 점

- 어떤 도구를 선택할 지 신중히 고민하기
    
    개발을 하게 되면서 어떤 라이브러리를 사용할 지, 또는 어떤 도구를 사용할 지 선택의 순간에 직면하게 되는데요. 각각의 도구를 잘 알아보고 선택해야한다는 얘기는 알고 있었지만, 막상 개발을 할 때는 사람들이 보편적으로 사용하는 대로 따르게 되었습니다. 각각의 장점과 그에 따른 트레이드 오프를 파악하고 어떤 도구를 사용할 지 선택하는 일이 어쩌면 코드를 짜는 것보다 중요할 수 있는 데, 조금 더 신중했었더라면 좋았을 것 같습니다.
<br>

### 📌 코드 작성 시 고민했던 점

**아토믹 패턴 도입**

‘컴포넌트 구조를 어떻게 설계할 것인가’라는 것은 항상 프로젝트를 진행할 때마다 느끼는 고민입니다. 처음 리액트를 할 때는 각 페이지 별로 컴포넌트들을 작성했었는데, 점점 공유되는 컴포넌트들이 많아지고 하나의 컴포넌트들을 여러 페이지에서 사용하는 경우 이를 마땅히 분류하기가 적절하지 않았습니다. 

이전 팀 프로젝트에서는 모든 컴포넌트를 components 디렉토리 내부에 넣는 방식으로 컴포넌트를 방법을 사용하였는데요. 오히려 각 컴포넌트들을 참조하기도 편리해지고 어떤 구조적인 문제에서도 자유로웠습니다. 다만 컴포넌트 명을 굉장히 구분감있게 지어야한다는 점과 분류가 되지 않은 구조에 대한 불편함도 있었습니다.

이번 프로젝트를 처음에 진행할 때는, 이전 프로젝트와 마찬가지로 모든 컴포넌트를 분류하지 않는 분류 방법을 썼습니다. 리팩토링 과정에서 아토믹 디자인 패턴을 알게되어 이를 적용해보게 되었는데요. 아토믹 디자인 패턴은 컴포넌트를 다섯 단계로 나누어, 각 단계의 컴포넌트를 조합해 상위 단계를 구성하는 것입니다. 아토믹 패턴을 완전히 다는 적용하지 못하고, atoms / items / layouts / windows로 나눠서 진행하였습니다. 아무래도 적용하는 과정에서 많은 컴포넌트의 분리가 일어나 독립적이고 재사용성이 높아지는 구조가 되었습니다.

아토믹 패턴을 적용해보면서 느낀 점은, 함수형 프로그래밍의 함수를 합성하는 과정과 비슷하다는 점이었는데요. 함수형 프로그래밍에서 가장 작은 단위의 함수를 조합해 어떤 기능을 만들고, 그 기능들을 조합해 하나의 시스템을 만드는 것과 비슷하다고 느꼈습니다. 추상화 그리고 독립적인 코드의 작성은 가장 작은 단위부터 조합해 나갈 때 효과적일 수 있다는걸 알게되었습니다.
<br>
<br>

### 🤔 개선할 점

- 디자인 패턴의 도입
    
    이번 프로젝트들을 진행하면서 틈틈히 배운 객체지향/함수형 프로그래밍의 개념들과 디자인 패턴을 이번 프로젝트에 적용해보고 싶었습니다. 리팩토링 과정에서 아토믹 패턴을 도입하긴 했지만 이외에는 별도로 디자인 패턴을 적용시키지는 못하였는데요. 나름대로 의존성이 낮고 독립적인 코드들을 작성하려고 노력하였지만, 구조적인 패턴을 적용했다면 좋지 않았을까 생각합니다.
<br>

## 👨‍🎨 기술 스택

**React**

- React를 이용하여 대시보드를 제작하였습니다.
- 서버 상태관리는 react-query를 이용하였습니다.
- css는 styled-components를 사용하였습니다.

**Webpack**

- 자체적으로 대시보드 서버를 번들링하여 웹 서버를 동작시키는데 webpack 및 webpack-dev-server를 사용하였습니다.

**Node.js**

- fs, child_process, cluster와 같은 nodeJS의 내장 모듈을 활용하였습니다.

**Express / MongoDB / Mongoose**

- Express와 MongoDB를 이용해 API 서버를 제작하였습니다.
<br>

## 🧘‍♂️ 회고

**headless CMS에 대해 전혀 모르던 내가, 솔로 프로젝트를 진행하기까지**

프로젝트 아이템을 정하던 아침까지만 해도, headless CMS라는 것을 알 지 못했습니다. 너무 재밌을 것만 같다는 생각에 알고나서 얼마 되지 않아 프로젝트 아이템으로 정하게 되었는데요. 프로젝트 초반은 관련된 서비스와 오픈 소스 코드들을 많이 뜯어보고 파악해보는 데에 집중하였습니다.

구현하려는 동작이 작성된 오픈 소스 코드들을 보는 과정은 내 프로젝트에 도움이 되지만, 반대로 방대한 코드의 양 때문에 프로젝트의 구현을 어디까지 해야할 지 갈피를 잡지 못할 수도 있게 됩니다. 다른 코드들을 많이 보면서 이해하는 과정을 많이 하게 되었지만, 그 와중에도 스스로 프로젝트의 구현에 대한 방향성을 명확히 해야한다는 걸 느끼게 되었습니다.

**Node를 조금 더 이해하게 되다**

이번 프로젝트는 Node.js에 대해 한층 더 가까워진 프로젝트입니다. Node.js를 단순히 Express로 서버를 만들 때 이 외에는 잘 써본 적이 없었는데요. 이번에는 childe process 모듈을 이용해 명령어를 입력한다던지, 파일 시스템 모듈(fs)을 이용해 사용자의 파일을 생성하고 수정해준다던지, Cluster 모듈을 이용해 두 개의 Cluster를 생성해 관리하는 등, Node.js에서 해볼 수 있는 많은 일들을 경험해본 프로젝트였습니다. Node.js에서 수행하는 많은 동작들을 라이브러리의 힘을 빌리지 않고 최대한 내장 모듈을 활용할 수 있도록 하였습니다.

그리고 npx 패키지를 제작하게 되면서 CLI(Command Line Interface)를 제공하게 되었는데요. 사용자에게 웹 페이지를 통한 화면이 아닌, 커맨드 라인을 통한 새로운 방식의 화면 전달을 하게 되어 무척 재밌었습니다. 이와 관련된 많은 라이브러리들도 알게 되어 CLI에 어떤 선택 사항을 주어지게 하거나, 로딩 스피너를 넣어 작업 중임을 알리는 등 다채로운 CLI의 세계를 탐험하게 되어 좋았습니다.

**독특한 방식의 서버**

‘사용자가 정의하는대로 가동되는 서버와 DB’를 구현하는 과정이 색다르게 느껴졌습니다. 

처음 구상할 때는 단순하지 않을까 생각했던 서버였지만, 막상 구현하려니 사용자가 정의한 데이터를 가공하고 적용하는 부분에서 까다로웠습니다. 대시보드에서 수정되는 부분은 사용자 프로젝트의 파일에 저장되고, 이 부분을 서버에 반영해 다시 시작하게 되는데요. 그냥 서버를 작성할 때는 마음 편하게 작성했던 코드도, 사용자화 되는 부분을 분리해주어야 해서 적용하기 쉽지 않았습니다. 조금 더 다양한 기능, mongoose를 이용해서 활용할 수 있는 sub document, populate와 같은 기능들을 crudify에서도 적용해보고 싶었는데, 나중에 기회가 된다면 제작해보고 싶습니다.
