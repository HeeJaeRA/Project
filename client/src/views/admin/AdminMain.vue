<template>
  <div>
    <div
      style="
        margin-bottom: 60px;
        margin-top: 60x;
        margin: 10px;
        border: 1px solid #ccc;
        padding: 40px;
        padding-bottom: 100px;
        border-radius: 20px;
      "
    >
      <h5 style="font-family: 나눔고딕; margin-bottom: 30px">승인대기업체</h5>
      <table ref="myDataTable" class="display">
        <thead>
          <tr>
            <th>아이디</th>
            <th>업체코드</th>
            <th>업체이름</th>
            <th>사업자등록증</th>
            <th>승인</th>
            <th>반려</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in sellList" :key="index">
            <td>{{ item.seller_id }}</td>
            <td>{{ item.rs_code }}</td>
            <td>{{ item.rs_name }}</td>
            <td
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              @click="show(item.license)"
            >
              {{ "상세보기" }}
            </td>
            <td>
              <button
                class="btn btn-primary"
                style="
                  margin-right: 30px;
                  background-color: #b0c4de;
                  border-color: #b0c4de;
                  color: white;
                  border-radius: 20px;
                "
                @click="approve(item.rs_code, '승인')"
              >
                승인처리
              </button>
            </td>
            <td>
              <button
                class="btn btn-warning text-white"
                style="
                  margin-right: 30px;
                  background-color: #ccc;
                  border-color: white;
                  color: white;
                  border-radius: 20px;
                "
                @click="approve(item.rs_code, '반려')"
              >
                반려처리
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      class="col-xl-6"
      style="
        width: 48%;
        float: left;
        padding-left: 30px;
        border: 1px solid #ccc;
        border-radius: 20px;
        padding: 30px;
        margin: 10px;
      "
    >
      <h5 style="font-family: 나눔고딕; margin-bottom: 30px">
        미답변 qna (판매자)
      </h5>
      <table class="table table-hover">
        <thead>
          <tr>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일자</th>
            <th>문의유형</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in sellerQna"
            :key="index"
            @click="getboard(item.qna_code)"
          >
            <td>{{ item.title }}</td>
            <td>{{ item.writer }}</td>
            <td>{{ $dateFormat(item.write_date, "yyyy-MM-dd") }}</td>
            <td>{{ item.qna_divison }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      class="col-xl-6"
      style="
        width: 49%;
        float: right;
        padding-right: 30px;
        padding: 30px;
        border: 1px solid #ccc;
        border-radius: 20px;
        margin: 10px;
      "
    >
      <h5 style="font-family: 나눔고딕; margin-bottom: 30px">
        미답변 qna (일반회원)
      </h5>
      <table class="table table-hover">
        <thead>
          <tr>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일자</th>
            <th>문의유형</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in userQna"
            :key="index"
            @click="getboard(item.qna_code)"
          >
            <td>{{ item.title }}</td>
            <td>{{ item.writer }}</td>
            <td>{{ $dateFormat(item.write_date, "yyyy-MM-dd") }}</td>
            <td>{{ item.qna_divison }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!--모달-->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              사업자 등록증 조회
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <img
              :src="`/node/public/restaurant/${this.content}`"
              width="200px"
              height="200px"
            />
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
    <!--모달 -->
  </div>
</template>

<script>
import axios from "axios";
import "datatables.net-dt/css/jquery.dataTables.css";
import $ from "jquery";
import "datatables.net";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      content: "",
      status: "",
      sellList: [],
      userQna: [],
      sellerQna: [],
    };
  },

  created() {
    this.getSellerList();
    this.getsellerQna();
    this.getuserQna();
  },
  methods: {
    // async banned() {
    //   //이용정지 스케쥴러..하다만거임
    //   let result = await axios.get(`/node/adminGetpenalty/user20`);
    //   console.log(result.data[0].penalty);
    //   let penalty = result.data[0].penalty;
    //   if (penalty > 4) {
    //   }
    // },

    show(img) {
      this.content = img; //img= 파일이름
    },
    getboard(no) {
      this.$router.push({
        path: "/admin/adminQnaInfo",
        query: { qnaCode: no },
      });
    },
    async approve(rscode, e) {
      //console.log(e.target.value);
      if (e == "승인") {
        this.status = "영업승인";
      } else {
        this.status = "반려";
      }
      let result = await axios.put(
        `/node/adminApprove?status=${this.status}&rscode=${rscode}`
      );

      console.log(result);
      if (result.data.affectedRows > 0) {
        Swal.fire({
          title: e + "처리가 완료되었습니다.",
          icon: "success",
        });
        this.$router.go(0);
      } else {
        Swal.fire({
          title: e + "처리가 실패되었습니다.",
          icon: "error",
        });
      }
    },
    async getSellerList() {
      let result = await axios.get(`/node/adminConfirm`).catch((err) => {
        console.log(err);
      });
      this.sellList = result.data;
    },

    async getsellerQna() {
      let result = await axios.get(`/node/adminMainQna/판매자`).catch((err) => {
        console.log(err);
      });
      this.sellerQna = result.data;
    },

    async getuserQna() {
      let result = await axios
        .get(`/node/adminMainQna/일반유저`)
        .catch((err) => {
          console.log(err);
        });
      this.userQna = result.data;
    },

    showAlert() {
      this.$swal("Hello Vue world!!!");
    },
    initDataTable() {
      $(this.$refs.myDataTable).DataTable({});
    },
    // initDataTable2() {
    //   $(this.$refs.myDataTable2).DataTable({});
    // },
    // initDataTable3() {
    //   $(this.$refs.myDataTable3).DataTable({});
    // },
  },
  watch: {
    sellList() {
      this.$nextTick(() => {
        this.initDataTable();
      });
    },
    // userQna() {
    //   this.$nextTick(() => {
    //     this.initDataTable2();
    //     this.initDataTable3();
    //   });
    // },
  },
};
</script>

<style>
body {
  margin: 0;
}
div {
  box-sizing: border-box;
}
.black-bg {
  width: 500px;
  height: 500px;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  padding: 20px;
  left: 60%;
  top: 50%;
  transform: translate(-60%, -50%);
}
</style>
