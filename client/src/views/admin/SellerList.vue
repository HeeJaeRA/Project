<template>
  <div style="margin-left: 30px; margin-right: 50px; margin-top: 30px">
    <h5 style="font-family: 나눔고딕; margin-bottom: 30px">판매자회원 관리</h5>
    <table ref="myDataTable" class="display">
      <thead>
        <tr>
          <th>판매자아이디</th>
          <th>이름</th>
          <th>번호</th>
          <th>생년월일</th>
          <th>유저구분</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, idx) in SellerList"
          :key="idx"
          @click="getboard(item.seller_id)"
        >
          <td>{{ item.seller_id }}</td>
          <td>{{ item.seller_name }}</td>
          <td>{{ item.phone }}</td>
          <td>{{ $dateFormat(item.birthday, "yyyy-MM-dd") }}</td>
          <td>{{ item.user_division }}</td>
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
      SellerList: [],
    };
  },
  created() {
    this.getList();
  },

  methods: {
    async getList() {
      let result = await axios.get("/node/adminSeller").catch((err) => {
        console.log(err);
      });
      //console.log(result.data);
      this.SellerList = result.data;
    },
    showAlert() {
      this.$swal("Hello Vue world!!!");
    },
    initDataTable() {
      $(this.$refs.myDataTable).DataTable({});
    },
    getboard(id) {
      this.$router.push({ path: "/admin/sellerShop", query: { Id: id } });
      console.log(id);
    },
  },
  watch: {
    //변화가 생기면 그 이후에 init해라
    SellerList() {
      this.$nextTick(() => {
        this.initDataTable();
      });
    },
  },
};
</script>
