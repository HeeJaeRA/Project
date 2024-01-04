<template>
  <div>
    <button @click="banned">예약취소</button>
    <div style="margin-bottom: 100px">
      <p>승인대기업체목록</p>
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
            <td @click="show(item.license)">{{ "사업자등록증" }}</td>
            <td>
              <button @click="approve(item.rs_code, '승인')">승인</button>
            </td>
            <td>
              <button @click="approve(item.rs_code, '반려')">반려</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div style="width: 47%; float: left">
      <p>미답변 qna (판매자)</p>
      <table ref="myDataTable2" class="display">
        <thead>
          <tr>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일자</th>
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
          </tr>
        </tbody>
      </table>
    </div>

    <div style="width: 47%; float: right">
      <p>미답변 qna (일반회원)</p>
      <table ref="myDataTable3" class="display">
        <thead>
          <tr>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일자</th>
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
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="licenseimg" class="black-bg">
      <div @click.stop="">
        <img
          :src="`http://192.168.0.47:3000/public/restaurant/${this.content}`"
          width="200px"
          height="200px"
        />
        <button @click="closePop()">닫기</button>
      </div>
    </div>
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
      licenseimg: false,
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
    async banned() {
      //이용정지 스케쥴러..하다만거임
      let result = await axios.get(`/node/adminGetpenalty/user20`);
      console.log(result.data[0].penalty);
      let penalty = result.data[0].penalty;
      if (penalty > 4) {
      }
    },
    closePop() {
      this.licenseimg = false;
    },
    show(img) {
      this.content = img; //img= 파일이름
      this.licenseimg = !this.licenseimg; //모달창 띄우기
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
      if (result.status == 200) {
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
      let result = await axios
        .get(`/node/adminSellerNqna/판매자`)
        .catch((err) => {
          console.log(err);
        });
      this.sellerQna = result.data;
    },

    async getuserQna() {
      let result = await axios
        .get(`/node/adminSellerNqna/일반유저`)
        .catch((err) => {
          console.log(err);
        });
      this.userQna = result.data;

      console.log(this.tcnt);
    },

    showAlert() {
      this.$swal("Hello Vue world!!!");
    },
    initDataTable() {
      $(this.$refs.myDataTable).DataTable({});
    },
    initDataTable2() {
      $(this.$refs.myDataTable2).DataTable({});
    },
    initDataTable3() {
      $(this.$refs.myDataTable3).DataTable({});
    },
  },
  watch: {
    sellList() {
      this.$nextTick(() => {
        this.initDataTable();
      });
    },
    userQna() {
      this.$nextTick(() => {
        this.initDataTable2();
        this.initDataTable3();
      });
    },
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
