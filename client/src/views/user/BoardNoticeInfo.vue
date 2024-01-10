<template>
  <div class="container">
    <br />
    <h4>NOTICE</h4>
    <br />
    <br />
    <table class="table table" id="table1">
      <tbody>
        <tr>
          <th>제목</th>
          <td>{{ noticeInfo.title }}</td>
          <th>작성자</th>
          <td>{{ noticeInfo.user_id }}</td>
        </tr>
        <tr>
          <th>작성일자</th>
          <td>{{ getDateFormat(noticeInfo.write_date) }}</td>
          <th>조회수</th>
          <td>{{ noticeInfo.view_cnt }}</td>
        </tr>
      </tbody>
    </table>
    <table class="table table-hover">
      <tbody>
        <tr v-if="imgInfo[0] != null">
          <th>첨부파일 다운로드</th>
          <td class="col2" v-for="img in imgInfo" :key="img.commu_code">
            <pre class="row" @click="downloadImage(img.img_name)">{{
              img.img_name
            }}</pre>
          </td>
        </tr>
        <tr>
          <td colspan="4" id="content">
            {{ noticeInfo.content }}
          </td>
        </tr>
      </tbody>
    </table>
    <div id="button">
      <button
        type="button"
        class="btn btn-outline-secondary"
        @click="BoardNoticeList()"
      >
        목록으로
      </button>
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
    this.searchNo = this.$route.query.noticeCode;
    this.boardNoticeInfo();
    this.getimgInfo();
  },
  methods: {
    async boardNoticeInfo() {
      let result = await axios
        .get(`/node/notices/${this.searchNo}`)
        .catch((err) => console.log(err));
      this.noticeInfo = result.data;
    },
    async getimgInfo() {
      let result = await axios
        .get(`/node/noticeimg/${this.searchNo}`)
        .catch((err) => console.log(err));
      this.imgInfo = result.data;
      console.log(this.imgInfo);
    },
    getDateFormat(date) {
      return this.$dateFormat(date);
    },
    async BoardNoticeList() {
      this.$router.push({ path: "/notice" });
    },
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
  },
};
</script>

<style scoped>
.container {
  margin-top: 120px;
}
#table1 {
  margin-bottom: 0px;
}
th {
  width: 180.83px;
}
#content {
  height: 200px;
}
#button {
  text-align: center;
  margin-bottom: 20px;
}
#imgdown {
  height: 20px;
  width: 100px;
}
pre {
  margin: 5px 0;
  width: 250px;
}
.row {
  padding: 0;
  width: 350px;
}
</style>
