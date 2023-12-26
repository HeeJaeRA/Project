<template>
  <!-- <button @click="showAlert">alert</button>
		<button @click="$router.push('/admin/test')">test</button>
		<router-link to="/admin/table">테이블</router-link>
		<router-link to="/admin/chart">차트</router-link> -->

  <div style="margin-bottom: 100px">
    <p>판매자회원관리</p>
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
        <tr v-for="(item, index) in data" :key="index">
          <td>{{ item.name }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.email }}</td>
          <td>
            <button>승인</button>
          </td>
          <td>
            <button>반려</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import "datatables.net-dt/css/jquery.dataTables.css";
import $ from "jquery";
import "datatables.net";

export default {
  data() {
    return {
      data: [
        { name: "John Doe", email: "john@example.com" },
        { name: "Jane Doe", email: "jane@example.com" },
      ],
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initDataTable();
    });
  },
  methods: {
    showAlert() {
      this.$swal("Hello Vue world!!!");
    },
    initDataTable() {
      $(this.$refs.myDataTable).DataTable({});
    },
  },
};
</script>
