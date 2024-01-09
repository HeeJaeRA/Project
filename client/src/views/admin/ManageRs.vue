<template>
  <div style="margin-left: 30px; margin-right: 50px; margin-top: 30px">
    <h5 style="font-family: 나눔고딕; margin-bottom: 30px">등록업체관리</h5>
    <table ref="myDataTable" class="display">
      <thead>
        <tr>
          <th>업체코드</th>
          <th>카테고리</th>
          <th>업체명</th>
          <th>주소</th>
          <th>연락처</th>
          <th>사업자등록증</th>
          <th>셀러아이디</th>
          <th>영업상태</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, idx) in RsList" :key="idx">
          <td>{{ item.rs_code }}</td>
          <td>{{ item.category }}</td>
          <td>{{ item.rs_name }}</td>
          <td>{{ item.address }}</td>
          <td>{{ item.phone }}</td>
          <td @click="show(item.license)">{{ "상세보기" }}</td>
          <td>{{ item.seller_id }}</td>
          <td>{{ item.rs_status }}</td>
        </tr>
      </tbody>
    </table>

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
import "datatables.net-dt/css/jquery.dataTables.css";
import $ from "jquery";
import "datatables.net";
import axios from "axios";

export default {
  data() {
    return {
      content: "",
      licenseimg: false,
      RsList: [],
    };
  },
  created() {
    this.getList();
  },

  methods: {
    closePop() {
      this.licenseimg = false;
    },

    show(img) {
      this.content = img; //img= 파일이름
      this.licenseimg = !this.licenseimg; //모달창 띄우기
    },
    async getList() {
      let result = await axios.get("/node/adminRsList").catch((err) => {
        console.log(err);
      });

      this.RsList = result.data;
    },
    showAlert() {
      this.$swal("Hello Vue world!!!");
    },
    initDataTable() {
      $(this.$refs.myDataTable).DataTable({});
      console.log("init");
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
