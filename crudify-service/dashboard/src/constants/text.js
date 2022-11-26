const TEXT = {
  ENDPOINT_DESCRIPTION: {
    create: [
      "새로운 데이터를 생성할 수 있는 엔드포인트입니다.",
      "body에 해당 데이터의 내용을 보내줄 수 있습니다.",
    ],
    findOne: [
      "서버에 특정한 데이터를 요청하는 엔드포인트입니다.",
      "params에 데이터의 id값을 넣어 특정 데이터를 가져올 수 있습니다."
    ],
    find: [
      "전체 데이터를 요청하는 엔드포인트입니다.",
      "query에 값을 넣어 데이터를 필터링 할 수 있도록 노력 중입니다.",
    ],
    update: [
      "데이터를 update할 수 있는 엔드포인트입니다.",
      "params에 데이터의 id 값을 넣어, update하길 원하는 데이터를 지정해줄 수 있습니다.",
      "request시, body에 update하는 내용을 넣으면 됩니다."
    ],
    delete: [
      "데이터 베이스에서 해당 데이터를 삭제할 수 있는 엔드포인트입니다.",
      "params에 데이터의 id값을 넣어 데이터를 삭제할 수 있습니다.",
    ]
  },
};

export default TEXT;


// GET method는 resource로 부터 데이터를 요청하며, 어떤 side effect도 발생시켜서는 안 된다.
// 예: /companies/3/employees 는 company 3에 속하는 모든 employees를 리턴한다.

// POST method는 database에 resource를 생성하도록 서버에 요청하며, 대부분 web form 형식으로 제출된다.
// 예: /companies/3/employees 는 company 3에 새로운 employee를 생성한다.
// POST는 멱등성을 갖지 않으며 여러번의 request는 각각 다른 영향을 미친다.

// PUT method는 resource를 업데이트 하거나, 만약 존재하지 않는 경우 생성하도록 서버에 요청한다.
// 예: /companies/3/employees/john 는 company 3에 속하는 employees collection에 john이라는 resource를 업데이트하거나 생성하도록 서버에 요청한다.
// PUT은 멱등성을 가지며, 여러 번의 request는 같은 영향을 미친다.

// DELETE method는 resources 혹은 그것의 인스턴스를 database에서 삭제하도록 요청한다.
// 예: /companies/3/employees/john/ 는 company 3에 속하는 employees collection에서 john이라는 resource를 삭제하도록 서버에 요청한다.


