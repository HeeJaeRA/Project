<template>
  <div class="container">
    <h3>QnA</h3>
    <br />
    <br />
    <table class="table table-hover">
      <tbody>
        <tr>
          <th>제목</th>
          <td><input type="text" v-model="qnaInfo.title" /></td>
        </tr>
        <tr>
          <th>구분</th>
          <td>
            <select v-model="qnaInfo.qna_divison">
              <option value="" selected disabled>카테고리</option>
              <option value="회원정보">회원정보</option>
              <option value="예약및결제">예약및결제</option>
              <option value="기타문의">기타문의</option>
            </select>
          </td>
        </tr>
        <tr>
          <th>내용</th>
          <td colspan="6">
            <textarea type="text" v-model="qnaInfo.content" />
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
      </tbody>
    </table>
    <div id="btn">
      <button
        type="button"
        class="btn btn-xs btn-info"
        @click="saveInfo(searchNo)"
      >
        저장
      </button>
      <button type="button" class="btn btn-xs btn-light" @click="cancel()">
        취소
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
      qnaInfo: {
        qna_code: "",
        write_date: "",
        title: "",
        writer: "",
        content: "",
        qna_status: "답변대기",
        ans_code: 0,
        qna_divison: "",
        user_divison: "일반유저",
      },
      isUpdated: false,
      boardQnaList: {},
      selectedOption: "",
      userId: window.localStorage.getItem("userId"),
      images: [],
      bno: "",
    };
  },
  created() {
    this.searchNo = this.$route.query.qndCode;
    //this.getBoardQnaList();
    if (this.searchNo > 0) {
      // 수정
      this.getBoardQnaInfo();
      this.isUpdated = true;
    } else {
      this.qnaInfo.write_date = this.getToday();
      this.qnaInfo.writer = this.userId;
    }
  },
  methods: {
    async getBoardQnaInfo() {
      let result = await axios
        .get(`/node/qna/${this.userId}/${this.searchNo}`)
        .catch((err) => console.log(err));
      console.log("form.vue", result);
      this.qnaInfo = result.data;
      this.qnaInfo.write_date = this.$dateFormat(this.qnaInfo.write_date);
      this.selectedOption = result.data.qna_divison;
      this.qnaInfo.writer = this.userId;
      console.log("getQnaInfo", this.qnaInfo);
    },
    /*
        async getBoardQnaList() {
            let result = await axios.get(`node/qna/${this.userId}`)
                                    .catch(err => console.log(err))
            this.boardQnaList = result.data;
        },*/
    getToday() {
      return this.$dateFormat("", "yyyy-MM-dd");
    },
    async saveInfo() {
      if (!this.qnaInfo.title.trim()) {
        Swal.fire({
          title: "제목이 입력되지 않았습니다.",
          icon: "warning",
        });
        return;
      }
      if (!this.qnaInfo.content.trim()) {
        Swal.fire({
          title: "내용이 입력되지 않았습니다.",
          icon: "warning",
        });
        return;
      }
      if (!this.qnaInfo.qna_divison.trim()) {
        Swal.fire({
          title: "카테고리가 선택되지 않았습니다.",
          icon: "warning",
        });
        return;
      }
      let formData = new FormData();
      let result = null;
      this.images.forEach((file) => formData.append("files", file));

      const qnaInfo = JSON.stringify(this.qnaInfo);
      console.log("qna", qnaInfo);
      formData.append(`qnaInfo`, qnaInfo);

      if (this.qnaInfo.qna_code > 0) {
        result = await axios.put(
          `/node/qnaupdate/${this.userId}/${this.searchNo}`,
          formData
        );
      } else {
        result = await axios.post("/node/qnaPhotos", formData);
      }
      console.log("boardqna result", result);
      if (result.data.affectedRows > 0) {
        Swal.fire({
          icon: "success",
          title: "정상 처리",
          text: "정상적으로 처리되었습니다.",
        });
        this.$router.push({ name: "userQna" });
      } else {
        Swal.fire({
          icon: "error",
          title: "처리 실패",
          text: "정상적으로 처리되지 않았습니다.",
        });
      }
      //this.$router.push({path : `/qna`, query : {qnaCode : qnaCode} });
      this.$router.push({ name: "userQna" });
    },
    // getInfo(qnaCode) {
    //     let method = '';
    //     let url = '';
    //     let data = null;

    //     if(qnaCode > 0){

    //         method = 'put';
    //         url = `/node/qna/${this.userId}/${qnaCode}`;
    //         data = {
    //             param : {
    //                 title : this.qnaInfo.title,
    //                 writer : this.qnaInfo.writer,
    //                 content : this.qnaInfo.content
    //             }
    //         }

    //     } else {
    //         method = 'post';
    //         url = `/node/qna`;
    //         let info = this.qnaInfo;
    //         this.qnaInfo.writer = this.userId;
    //         this.qnaInfo.qna_divison = this.selectedOption;
    //         console.log('this.selectedOption', this.selectedOption);
    //         console.log(info);
    //         data = {
    //             param : this.qnaInfo
    //         };
    //     }
    //     return {
    //         method,
    //         data,
    //         url
    //     }
    // },
    handleFileChange(event) {
      this.images = Array.from(event.target.files);
      console.log(this.images);
    },
    cancel() {
      this.$router.push({ path: "/community" });
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
  width: 100%;
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
#btn {
  text-align: center;
  margin-bottom: 20px;
}
button {
  margin-right: 5px;
}
</style>
