const multer = require("multer"); //멀터가져오기
const path = require("path"); //path가져오기

const express = require("express");
const app = express(); //express 가져오기
//npm install multer 설치

const storage = multer.diskStorage({
  //디스크 저장소에 대한 객체를 생성  //파일이 저장될 위치 , 파일 명에 대한 것을 정의
  destination: function (req, file, cb) {
    cb(null, "uploads/"); //express server내에  uploads폴더가 있어야함 //cd콜백함수를 통해 전송된 파일 저장 디렉터리설정
  },
  filename: function (req, file, cb) {
    //사용자가 입력한 파일이름은 중복 가능성이 있기 때문에 유니크한 값을 주기 위해
    cb(null, new Date().valueOf() + path.basename(file.originalname)); //file.originalname (사용자가 업로드한 파일의 이름)
  },
});

const upload = multer({ storage: storage }); //multer인스턴스
//limit 제한걸어서 사용자가 업로드하는 데이터의 형태와 크기를 제한
//const upload = multer({ dest: 'uploads/', limits: { fileSize: 5 * 1024 * 1024 } });

app.post("/profile", upload.single("avatar"), (req, res) => {
  //단일 처리    //avatar 어떤 이름으로 받을지 정해줘야함
  console.log(req.file); //단건
  console.log("뭐냐고이게..");
  console.log(req.body); //미들웨어가 중간에서 돌면서  file/ body 로 나뉘게됨
});

app.post("/photos", upload.array("photos", 12), (req, res) => {
  //'photos',12 이름과 최대 갯수를 제한      <input type="file" name="photos" multiple> name이 key값 ??
  for (let file of req.files) {
    //여러건 s
    console.log(file);
  }
});

app.listen(5000, () => {
  console.log("서버실행!!!!!!~");
});
