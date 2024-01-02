<template>
  <div>
    <table class="table table-hover">
      <thead>
        <tr>
          <th>글번호</th>
          <td>{{ noticeInfo.notice_code }}</td>
          <th>중요도</th>
          <td>{{ noticeInfo.notice_important }}</td>
          <th>작성일시</th>
          <td colspan="3">{{ $dateFormat(noticeInfo.write_date) }}</td>
        </tr>
        <tr>
          <th>제목</th>
          <td>{{ noticeInfo.title }}</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(img, idx) in imgInfo" :key="idx">
          <td>{{ img.img_name }}</td>
          <td>
            <img
              :src="`http://localhost:3000/public/uploads/${img.img_name}`"
              width="200px"
              height="200px"
            />
            <button @click="downloadImage(img.img_name)">
              이미지 다운로드
            </button>
          </td>
        </tr>
        <tr>
          <td colspan="5">
            <pre>{{ noticeInfo.content }}</pre>
          </td>
        </tr>
      </tbody>
    </table>

    <div>
      <button type="button" @click="this.$router.go(-1)">목록으로</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      searchNo: "",
      noticeInfo: {},
      imgInfo: [],
    };
  },

  created() {
    this.searchNo = this.$route.query.No;
    this.getNoticeInfo();
    this.getimgInfo();
  },
  methods: {
    async downloadImage(img) {
      let imgname = img;
      let response = await axios.get(`/node/download/image/${imgname}`, {
        responseType: "blob", // 서버에서 바이너리 데이터(Blob)로 응답받음
      });

      let url = window.URL.createObjectURL(new Blob([response.data]));

      // a 태그를 생성하여 다운로드 링크 생성
      let link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", imgname); // 다운로드되는 파일의 이름
      document.body.appendChild(link);
      link.click();

      // 생성된 URL 및 a 태그를 해제
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    },

    //등록된 이미지 리스트 출력
    async getimgInfo() {
      let result = await axios
        .get(`/node/getNoticeImg/${this.searchNo}`)
        .catch((err) => console.log(err));
      this.imgInfo = result.data;
      console.log(this.imgInfo);
    },

    getToday() {
      return this.$dateFormat("", "yyyy-MM-dd");
    },

    //공지사항 한건조회
    async getNoticeInfo() {
      let result = await axios
        .get(`/node/adminNoticeInfo/${this.searchNo}`)
        .catch((err) => console.log(err));
      this.noticeInfo = result.data;
      console.log(result.data);
    },
  },
};
</script>
