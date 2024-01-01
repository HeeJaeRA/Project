<template>
  <div>
    <p>판매자qna전체목록</p>
    <button @click="$router.push('/admin/allQnaSeller')">전체목록</button>
    <button @click="$router.push('/admin/adminQnaWait')">답변대기</button>
    <button @click="$router.push('/admin/adminQnaDone')">답변완료</button>
    <br />

    <select v-model="category" @change="getCategory()">
      <option value="" selected disabled hidden>카테고리</option>
      <option value="회원정보">회원정보</option>
      <option value="업체문의">업체문의</option>
      <option value="예약및결제">예약및결제</option>
      <option value="기타문의">기타문의</option>
    </select>

    <table ref="myDataTable" class="display">
      <thead>
        <tr>
          <th>글번호</th>
          <th>제목</th>
          <th>작성일자</th>
          <th>작성자</th>
          <th>문의유형</th>
          <th>답변상태</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, idx) in qnaList"
          :key="idx"
          @click="getboard(item.qna_code)"
        >
          <td>{{ idx + 1 }}</td>
          <td>{{ item.title }}</td>
          <td>{{ $dateFormat(item.write_date, "yyyy-MM-dd") }}</td>
          <td>{{ item.writer }}</td>
          <td>{{ item.qna_divison }}</td>
          <td>{{ item.qna_status }}</td>
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
      category: "",
      qnaList: [],
    };
  },
  created() {
    this.getQnaList();
  },

  methods: {
    //답변완+답변대기 카테고리별
    async getCategory() {
      //  console.log(e);
      let result = await axios
        .get(`/node/adminSellerQnaCategory/${this.category}`)
        .catch((err) => {
          console.log(err);
        });

      this.qnaList = result.data;
    },
    //답변완+답변대기 전체
    async getQnaList() {
      let result = await axios.get("/node/adminSellerQna").catch((err) => {
        console.log(err);
      });

      this.qnaList = result.data;
    },
    showAlert() {
      this.$swal("Hello Vue world!!!");
    },
    initDataTable() {
      $(this.$refs.myDataTable).DataTable({});
    },

    getboard(no) {
      this.$router.push({
        path: "/admin/adminQnaInfo",
        query: { qnaCode: no },
      });
    },
  },
  watch: {
    qnaList() {
      this.$nextTick(() => {
        this.initDataTable();
      });
    },
  },
};
</script>
