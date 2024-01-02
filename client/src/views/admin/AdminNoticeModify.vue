<template>
  <div class="container">
    <div class="row">
      <table class="table">
        <select v-model="noticeInfo.notice_important">
          <option value="" selected disabled>공지사항 중요도</option>
          <option value="상">상</option>
          <option value="하">하</option>
        </select>

        <tr>
          <th>제목</th>
          <td class="text-center">
            <input type="text" v-model="noticeInfo.title" />
          </td>
        </tr>

        <tr>
          <th>내용</th>
          <td class="text-center">
            <textarea v-model="noticeInfo.content" />
          </td>
        </tr>

        <tr>
          <th>파일첨부</th>
          <td>
            <input
              type="file"
              ref="fileInput"
              @change="handleFileChange"
              multiple
            />
          </td>
        </tr>
      </table>
    </div>

    <div class="row">
      <button @click="noticeUpdate()">수정하기</button>
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
      images: [],
      bno: "",
      noticeInfo: {
        notice_important: "",
        write_date: this.getToday(),
        user_division: "",
        title: "",
        content: "",
        user_id: "관리자",
        view_cnt: 0,
      },
    };
  },

  created() {
    this.searchNo = this.$route.query.No;
    this.getNoticeInfo();
  },

  methods: {
    handleFileChange(event) {
      this.images = Array.from(event.target.files); // images [] 배열에.. 뭘?
      console.log(this.images);
    },

    //이미지+ 공지사항글
    async noticeUpdate() {
      let formData = new FormData();

      this.images.forEach((file) => {
        formData.append(`files`, file); //{name: 'KakaoTalk_20231227_221320353.png', lastModified: 1703929803102, l
        // console.log("AAAAAAA", file);
      });

      try {
        let data = this.noticeInfo;
        console.log(data);
        let result = await axios.put(
          `/node/adminNoticeUpdate/${this.searchNo}`,
          data
        );
        console.log(result);
        if (result.data.changedRows > 0) {
          Swal.fire({
            icon: "success",
            title: "공자사항 수정이 완료되었습니다.",
          });
          this.$router.push({
            name: "noticeList",
            params: { division: this.$route.query.division },
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "공지사항 수정에 실패하였습니다.",
          });
        } //해당 공지사항 번호 가져오기
        //this.bno = result.data.insertId;
        formData.append("bno", this.searchNo);
        console.log("sssssssssssssss" + this.searchNo);
      } catch (error) {
        console.error(error);
      } finally {
        //img테이블에 (공지사항 번호,img formdata(여러건) )
        let response = await axios.post("/node/noticePhotos", formData);
        console.log("폼데이터" + formData);
        // let uploadedImages = response.data.filenames;
        // console.log(uploadedImages);
        // this.images = uploadedImages;
      }
    },

    //글 한건 조회
    async getNoticeInfo() {
      let result = await axios
        .get(`/node/adminNoticeInfo/${this.searchNo}`)
        .catch((err) => console.log(err));
      this.noticeInfo = result.data;
      console.log(result.data);
    },

    getToday() {
      return this.$dateFormat("", "yyyy-MM-dd");
    },
  }, //메서드
};
</script>
