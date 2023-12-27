<template>
  <div>
    <router-link to="/admin/couponList">쿠폰등록</router-link>
    <select v-model="selectgrade" @click="this.gradeList()">
      <option value="맛초보">맛초보</option>
      <option value="맛잘알">맛잘알</option>
      <option value="쩝쩝박사">쩝쩝박사</option>
    </select>
    <p>회원목록</p>
    <table ref="myDataTable" class="display">
      <thead>
        <tr>
          <th>아이디</th>
          <th>닉네임</th>
          <th>등급</th>
          <th>활동상태</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, idx) in userList" :key="idx">
          <td>{{ item.user_id }}</td>
          <td>{{ item.nickname }}</td>
          <td>{{ item.grade }}</td>
          <td>{{ item.user_status }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import "datatables.net-dt/css/jquery.dataTables.css";
import $ from "jquery";
import "datatables.net";
import axios from "axios";

export default {
  data() {
    return {
      selectgrade: "",
      userList: [],
    };
  },
  created() {
    this.getUserList();
  },

  methods: {
    async getUserList() {
      //전체회원
      let result = await axios.get(`/node/user`).catch((err) => {
        console.log(err);
      });

      this.userList = result.data;
      //console.log("axios");
    },

    async gradeList() {
      //등급별
      let result = await axios
        .get(`/node/user/${this.selectgrade}`)
        .catch((err) => {
          console.log(err);
        });
      this.userList = result.data;
    },
    initDataTable() {
      $(this.$refs.myDataTable).DataTable({});
      //console.log("init");
    },
  },
  watch: {
    userList() {
      this.$nextTick(() => {
        this.initDataTable();
      });
    },
  },
};
</script>
