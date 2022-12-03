const TEXT = {
  HOME_TEXT: {
    TITLE: {
      SUCCESS: "Hello Crudify World!",
      FAIL: "Server Not Connected!"
    },
    DESCRIPTION: {
      SUCCESS: [
        "서버와의 연결에 성공하였습니다.",
        "이제 새로운 컬렉션을 만들고, Endpoint를 연결해볼 수 있어요!"
      ],
      FAIL: [
        "서버와의 연결에 실패하였습니다."
      ]
    }
  },
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
