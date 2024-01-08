<template>
  <div style="margin-left: 30px; margin-right: 50px; margin-top: 30px">
    <h5 style="font-family: 나눔고딕; margin-bottom: 30px">
      {{ division }} 답변대기 목록
    </h5>
    <button
      class="btn btn-secondary"
      style="margin-right: 5px"
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
      class="btn btn-secondary"
      style="margin-right: 5px"
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
      class="btn btn-secondary"
      style="margin-right: 5px"
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
      <option value="all">전체</option>
      <option value="회원정보">회원정보</option>
      <option value="업체문의">업체문의</option>
      <option value="예약및결제">예약및결제</option>
      <option value="기타문의">기타문의</option>
    </select>

    <table v-if="isCreated" ref="myDataTable" class="display">
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
      isCreated: true,
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

      if (this.category == "all") {
        this.getQnaList();
      } else {
        let result = await axios
          .get(
            `/node/adminSellerWaitCategory?division=${this.division}&category=${this.category}`
          )
          .catch((err) => {
            console.log(err);
          });

        this.qnaList = result.data;
      }
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
      this.isCreated = true;
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
      $(this.$refs.myDataTable).siblings("div").remove();
      this.isCreated = false;
    },
    isCreated() {
      this.$nextTick(() => {
        this.initDataTable();
      });
    },
  },
};
</script>
<style scoped>
select {
  margin-top: 10px;
  margin-bottom: 10px;
  width: 200px;
  padding: 0.5em 0.5em;
  font-family: inherit;
  background: url(https://farm1.staticflickr.com/379/19928272501_4ef877c265_t.jpg)
    no-repeat 95% 50%;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: 1px solid #999;
  border-radius: 0px;
}
select::-ms-expand {
  /* for IE 11 */
  display: none;
}

select:hover {
  border-color: #888;
}

select:focus {
  border-color: #aaa;

  color: #222;
  outline: none;
}

select:disabled {
  opacity: 0.5;
}
</style>
