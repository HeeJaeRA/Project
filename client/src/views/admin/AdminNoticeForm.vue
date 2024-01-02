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
      <button @click="noticeInsert()">등록</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
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
    this.noticeInfo.user_division = this.$route.query.division;
  },

  methods: {
    handleFileChange(event) {
      this.images = Array.from(event.target.files); //파일이름
    },

    //이미지+ 공지사항글
    async noticeInsert() {
      let formData = new FormData();

      this.images.forEach((file) => {
        formData.append(`files`, file); //이미지이름 담기
      });

      try {
        let data = this.noticeInfo;
        console.log(data); //공지사항글등록
        let result = await axios.post("/node/adminInsertNotice", data);
        console.log(result);
        if (result.data.affectedRows > 0) {
          Swal.fire({
            icon: "success",
            title: "공자사항 등록이 완료되었습니다.",
          });
          this.$router.push({
            name: "noticeList",
            params: { division: this.$route.query.division },
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "공지사항 등록에 실패하였습니다.",
          });
        } //해당 공지사항 번호 가져오기
        this.bno = result.data.insertId;
        formData.append("bno", this.bno);
      } catch (error) {
        console.error(error);
      } finally {
        //img테이블에 (공지사항 번호,img formdata(여러건) )
        let response = await axios.post("/node/noticePhotos", formData);
        // let uploadedImages = response.data.filenames;
        // console.log(uploadedImages);
        // this.images = uploadedImages;
      }
    },

    getToday() {
      return this.$dateFormat("", "yyyy-MM-dd");
    },
  }, //메서드
};
</script>
