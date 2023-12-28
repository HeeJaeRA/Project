<template>
  <!--등급에 맞는 회원만 출력-->
  <div>
    <router-link to="/admin/couponList">쿠폰등록</router-link>
    <br />
    <button @click="fullList()">전체회원</button>
    <button @click="grade1()">맛초보</button>
    <button @click="grade2()">맛잘알</button>
    <button @click="grade3()">쩝쩝박사</button>

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
  <button @click="updateInfo(eventInfo.event_code)">쿠폰발급</button>
</template>

<script>
import "datatables.net-dt/css/jquery.dataTables.css";
import $ from "jquery";
import "datatables.net";
import axios from "axios";

export default {
  data() {
    return {
      grade: "맛잘알",
      userList: [],
    };
  },
  created() {
    //잘알
    this.getUserList();
  },

  methods: {
    fullList() {
      this.$router.push("/admin/couponUser").catch(() => {});
    },
    grade1() {
      this.$router.push("/admin/grade1").catch(() => {});
    },
    grade2() {
      this.$router.push("/admin/grade2").catch(() => {});
    },
    grade3() {
      this.$router.push("/admin/grade3").catch(() => {});
    },

    async getUserList() {
      //맛초보..
      let result = await axios.get(`/node/user/${this.grade}`).catch((err) => {
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
