<template>
  <!--회원전체 출력-->
  <div>
    <p>회원목록</p>
    <table ref="myDataTable" class="display">
      <thead>
        <tr>
          <th>아이디</th>
          <th>닉네임</th>
          <th>이름</th>
          <th>등급</th>
          <th>활동상태</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, idx) in userList"
          :key="idx"
          @click="getUserInfo(item.user_id)"
        >
          <td>{{ item.user_id }}</td>
          <td>{{ item.nickname }}</td>
          <td>{{ item.user_name }}</td>
          <td>{{ item.grade }}</td>
          <td>{{ item.user_status }}</td>
          <td>{{ dateFormat(item.penalty_enddate) }}</td>
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
      userList: [],
    };
  },
  created() {
    this.getUserList();
  },

  methods: {
    dateFormat(val) {
      if (val != null) {
        let date = new Date(val);
        let year = date.getFullYear();
        let month = ("0" + (date.getMonth() + 1)).slice(-2);
        let day = ("0" + date.getDate()).slice(-2);

        return `${year}-${month}-${day}`;
      } else {
        return;
      }
    },
    getUserInfo(id) {
      this.$router.push({ path: "/admin/adminUserInfo", query: { No: id } });
    },
    async getUserList() {
      let result = await axios.get(`/node/allUserList`).catch((err) => {
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
