<template>
  <div style="margin-left: 30px; margin-right: 50px; margin-top: 30px">
    <h5 style="font-family: 나눔고딕; margin-bottom: 30px">
      {{ noticeInfo.user_division }} 공지사항 조회
    </h5>
    <table class="table table-hover">
      <thead>
        <tr>
          <th>중요도</th>
          <td>{{ noticeInfo.notice_important }}</td>
          <th>작성일시</th>
          <td>{{ $dateFormat(noticeInfo.write_date) }}</td>
        </tr>
        <tr>
          <th>제목</th>
          <td colspan="3">{{ noticeInfo.title }}</td>
        </tr>
      </thead>

      <tbody>
        <tr style="height: 250px">
          <td colspan="5">
            <pre>{{ noticeInfo.content }}</pre>
          </td>
        </tr>
      </tbody>
    </table>

    <table>
      <tr v-for="(img, idx) in imgInfo" :key="idx">
        <td style="width: 30%">{{ img.img_name }}</td>
        <td colspan="3">
          <button
            style="
              background-color: #b0c4de;
              border-color: white;
              border-radius: 20px;
            "
            class="btn btn-secondary"
            @click="downloadImage(img.img_name)"
          >
            첨부파일 다운로드
          </button>
        </td>
      </tr>
    </table>

    <div style="margin-top: 10px">
      <button
        class="btn btn-primary"
        style="margin-right: 5px"
        @click="updateInfo(noticeInfo.notice_code)"
      >
        수정
      </button>
      <button
        class="btn btn-warning text-white"
        style=" 20px; margin-right: 5px"
        @click="confirmdelete()"
      >
        삭제
      </button>
      <button
        class="btn btn-secondary"
        type="button"
        @click="this.$router.go(-1)"
      >
        목록으로
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

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
    this.getimgInfo(); //이미지 가져오기
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

    updateInfo(no) {
      this.$router.push({
        path: "/admin/adminNoticeModify",
        query: { No: no, division: this.noticeInfo.user_division },
      });
    },

    //공지사항 삭제
    confirmdelete() {
      Swal.fire({
        title: "정말로 삭제하시겠습니까?",
        text: "삭제한 공지사항은 다시 복구가 불가합니다.",
        icon: "warning",

        showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
        confirmButtonColor: "#3085d6", // confrim 버튼 색깔 지정
        cancelButtonColor: "#d33", // cancel 버튼 색깔 지정
        confirmButtonText: "승인", // confirm 버튼 텍스트 지정
        cancelButtonText: "취소", // cancel 버튼 텍스트 지정
      }).then((result) => {
        // 만약 Promise리턴을 받으면,
        if (result.isConfirmed) {
          // 만약 모달창에서 confirm 버튼을 눌렀다면
          this.deleteInfo();
        }
      });
    },

    async deleteInfo() {
      let result = await axios
        .delete(`/node/adminNoticeDelete/${this.searchNo}`)
        .catch((err) => console.log(err));
      console.log(result.data);
      let count = result.data.affectedRows;
      if (count == 0) {
        Swal.fire({
          title: "공지사항이 삭제되지 않았습니다.",
          icon: "error",
        });
      } else {
        Swal.fire({
          title: "공지사항이 삭제되었습니다.",
          icon: "success",
        });
        this.$router.push({
          name: "noticeList",
          params: { division: this.noticeInfo.user_division },
        });
      }
    },
  },
};
</script>
<style scoped>
.container {
  margin-left: 30px;
  margin-right: 50px;
  margin-top: 30px;
}

.form-container {
  margin-top: 30px;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

select {
  /* width: 200%; */
  padding: 10px;
  font-family: inherit;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

input[type="text"],
textarea,
input[type="file"] {
  text-align: cen;
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 10px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>
