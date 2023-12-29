<template>
  <!-- <button @click="showAlert">alert</button>
		<button @click="$router.push('/admin/test')">test</button>
		<router-link to="/admin/table">테이블</router-link>
		<router-link to="/admin/chart">차트</router-link> -->
  <div>
    <div style="margin-bottom: 100px">
      <p>승인업체목록</p>
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
            <td>{{ item.rs_img }}</td>
            <td>
              <button @click="approve(item.rs_code)">승인</button>
            </td>
            <td>
              <button>반려</button>
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
          <tr v-for="(item, index) in sellerQna" :key="index">
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
          <tr v-for="(item, index) in userQna" :key="index">
            <td>{{ item.title }}</td>
            <td>{{ item.writer }}</td>
            <td>{{ $dateFormat(item.write_date, "yyyy-MM-dd") }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import "datatables.net-dt/css/jquery.dataTables.css";
import $ from "jquery";
import "datatables.net";

export default {
  data() {
    return {
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
    async approve(rscode) {
      let result = await axios.put(`/node/adminApprove/${rscode}`);
      if (result.status == 200) {
        alert("승인완료");
      } else {
        alert("승인처리가 완료되지 않았습니다 .");
      }
    },
    async getSellerList() {
      let result = await axios.get(`/node/adminConfirm`).catch((err) => {
        console.log(err);
      });
      this.sellList = result.data;
    },

    async getsellerQna() {
      let result = await axios.get(`/node/adminSellerNqna`).catch((err) => {
        console.log(err);
      });
      this.sellerQna = result.data;
    },

    async getuserQna() {
      let result = await axios.get(`/node/adminUserNqna`).catch((err) => {
        console.log(err);
      });
      this.userQna = result.data;
    },

    showAlert() {
      this.$swal("Hello Vue world!!!");
    },
    initDataTable() {
      $(this.$refs.myDataTable).DataTable({});
      $(this.$refs.myDataTable2).DataTable({});
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
        this.initDataTable();
      });
    },
    sellerQna() {
      this.$nextTick(() => {
        this.initDataTable();
      });
    },
  },
};
</script>
