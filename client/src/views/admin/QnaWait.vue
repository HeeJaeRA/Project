<template>
  <div>
    <p>{{ division }}답변대기목록</p>
    <button
      @click="
        $router.push({
          name: 'allQnaList',
          params: { division: division },
        })
      "
    >
      전체목록
    </button>
    <button
      @click="
        $router.push({
          path: '/admin/adminQnaWait',
          query: { division: division },
        })
      "
    >
      답변대기
    </button>
    <button
      @click="
        $router.push({
          path: '/admin/adminQnaDone',
          query: { division: division },
        })
      "
    >
      답변완료
    </button>
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
      division: "",
      category: "",
      qnaList: [],
    };
  },
  created() {
    this.division = this.$route.query.division;
    console.log(this.division);
    this.getQnaList();
  },

  methods: {
    //미답변 카테고리별 리스트
    async getCategory() {
      //  console.log(e);
      let result = await axios
        .get(
          `/node/adminSellerWaitCategory?division=${this.division}&category=${this.category}`
        )
        .catch((err) => {
          console.log(err);
        });

      this.qnaList = result.data;
    },
    //미답변 전체리스트
    async getQnaList() {
      let result = await axios
        .get(`/node/adminSellerNqna/${this.division}`)
        .catch((err) => {
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
