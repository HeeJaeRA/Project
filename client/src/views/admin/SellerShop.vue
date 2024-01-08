<template>
  <div style="margin-left: 30px; margin-right: 50px; margin-top: 30px">
    <h5 style="font-family: 나눔고딕; margin-bottom: 30px">
      {{ this.searchId }}가 운영중인 업체정보
    </h5>
    <table ref="myDataTable" class="display">
      <thead>
        <tr>
          <th>업체코드</th>
          <th>카테고리</th>
          <th>업체명</th>
          <th>주소</th>
          <th>연락처</th>
          <th>사업자등록증</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, idx) in RsList" :key="idx">
          <td>{{ item.rs_code }}</td>
          <td>{{ item.category }}</td>
          <td>{{ item.rs_name }}</td>
          <td>{{ item.address }}</td>
          <td>{{ item.phone }}</td>
          <td>{{ item.rs_img }}</td>
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
      searchId: "",
      RsList: [],
    };
  },
  created() {
    this.searchId = this.$route.query.Id;
    this.getList();
  },

  methods: {
    async getList() {
      let result = await axios
        .get(`/node/adminSellerInfo/${this.searchId}`)
        .catch((err) => {
          console.log(err);
        });

      this.RsList = result.data;
    },
    showAlert() {
      this.$swal("Hello Vue world!!!");
    },
    initDataTable() {
      $(this.$refs.myDataTable).DataTable({});
    },
  },
  watch: {
    //변화가 생기면 그 이후에 init해라
    RsList() {
      this.$nextTick(() => {
        this.initDataTable();
      });
    },
  },
};
</script>
