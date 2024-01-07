<template>
  <div>
    <table class="table table-hover">
      <thead>
        <tr>
          <th>제목</th>
          <td><input type="text" v-model="comInfo.title" /></td>
          <th>작성일자</th>
          <td><input type="text" v-model="comInfo.write_date" readonly /></td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colspan="6">
            <pre><input type="text" v-model="comInfo.content" /></pre>
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
    <div class="row">
      <button
        type="button"
        class="btn btn-xs btn-info"
        @click="saveInfo(searchNo)"
      >
        저장
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
      comInfo: {
        commu_code: "",
        write_date: "",
        title: "",
        user_id: "",
        view_cnt: 0,
        content: "",
      },
      isUpdated: false,
      boardComList: {},
      userId: window.localStorage.getItem("userId"),
      images: [],
      bno: "",
    };
  },
  created() {
    this.searchNo = this.$route.query.comCode;
    //this.getBoardComList();
    if (this.searchNo > 0) {
      // 수정
      this.getBoardComInfo();
      this.isUpdated = true;
    } else {
      // 등록
      this.comInfo.write_date = this.getToday();
      this.comInfo.user_id = this.userId;
    }
  },
  methods: {
    async getBoardComInfo() {
      let result = await axios
        .get(`/node/community/${this.searchNo}`)
        .catch((err) => console.log(err));
      this.comInfo = result.data;
      this.comInfo.write_date = this.$dateFormat(this.comInfo.write_date);
      this.comInfo.user_id = this.userId;
    },
/*     async getBoardComList() {
      let result = await axios
        .get(`node/community`)
        .catch((err) => console.log(err));
      this.boardComList = result.data;
    }, */
    getToday() {
      return this.$dateFormat("", "yyyy-MM-dd");
    },
    async saveInfo() {
      let formData = new FormData();
      let result = null;
      this.images.forEach((file) => formData.append("files", file));

      const comInfo = JSON.stringify(this.comInfo);
      console.log("comInfo", comInfo);
      formData.append(`comInfo`, comInfo);

      if (this.comInfo.commu_code > 0) {
        result = await axios.put(
          `/node/communityupdate/${this.searchNo}`,
          formData
        );
        console.log('update', this.searchNo);
        console.log('update', result);
      } else {
        result = await axios.post("/node/comPhotos", formData);
        console.log('insert', result);
      }

      if (result.data.affectedRows > 0) {
        Swal.fire({
          icon: "success",
          title: "정상 처리",
          text: "정상적으로 처리되었습니다.",
        });
        this.$router.push({ path: "/community" });

      } else {
        Swal.fire({
          icon: "error",
          title: "처리 실패",
          text: "정상적으로 처리되지 않았습니다.",
        });
      }

      this.$router.push({ path: "/community" });
    },
    /* getInfo(comCode) {
      let method = "";
      let url = ""
      let data = null;

      if (comCode > 0) {
        method = "put";
        url = `/node/community/${comCode}`;
        data = {
          param: {
            title: this.comInfo.title,
            user_id: this.comInfo.user_id,
            content: this.comInfo.content,
          },
        };
        this.$router.push({ path: "/community" });
      } else {
        method = "post";
        url = `/node/community`;
        let info = this.comInfo;
        console.log(info);
        // info.from_date = this.comInfo.write_date;
        data = {
          param: this.comInfo,
        };
        this.$router.push({ path: "/community" });
      }
      return {
        method,
        data,
        url,
      };
    }, */
    handleFileChange(event) {
      this.images = Array.from(event.target.files);
      console.log(this.images);
    },
  },
};
</script>
