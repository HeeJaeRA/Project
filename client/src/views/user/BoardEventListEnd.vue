<template>
  <div class="container">
    <br />
    <h4 style="font-family: JalnanGothic; margin-bottom: 40px">
      종료된 이벤트
    </h4>
    <br />
    <div>
      <p>
        <button @click="getBoardEventList()" class="btn btn-primary" id="all">
          전체
        </button>
        <button
          @click="goCurrentEventList()"
          class="btn btn-primary"
          id="current"
        >
          진행중
        </button>
        <button @click="goEndEventList()" class="btn btn-primary" id="endbtn">
          종료
        </button>
      </p>
    </div>
    <table class="table table-hover" v-if="this.endEventList[0] != null">
      <!-- <thead>
                <tr>
                    <th>제목</th>
                    <th>이벤트시작날짜</th>
                    <th>이벤트종료날짜</th>
                </tr>
            </thead> -->
      <tbody>
        <tr
          :key="i"
          v-for="(event, i) in endEventList"
          @click="goToDetail(event.event_code)"
        >
          <div>
            <tr id="img">
              <td colspan="3">
                <img
                  :src="`/node/public/uploads/${event.banner_img}`"
                  width="1100px"
                  height="450px"
                />
              </td>
            </tr>
            <tr>
              <td>{{ event.title }}</td>
              <td>{{ getDateFormat(event.eventstart_date) }}</td>
              <td>{{ getDateFormat(event.eventend_date) }}</td>
            </tr>
          </div>
        </tr>
      </tbody>
    </table>
    <div v-else>
      <p id="endmessage">종료된 이벤트가 없습니다.</p>
    </div>
    <div
      class="d-flex justify-content-center mt-3"
      v-if="this.endEventList[0] != null"
    >
      <paginate
        :page-count="pageCount"
        :click-handler="handlePageClick"
        :prev-text="'Prev'"
        :next-text="'Next'"
        :v-model="list"
      ></paginate>
      <!-- <p>Current Page: {{ currentPage }}</p>
            <p>totalItems: {{ totalItems }}</p> -->
    </div>
    <button
      class="btn btn-dark rounded-pill px-3"
      style="
        border-radius: 30%;
        text-align: center;
        vertical-align: top;
        width: 100px;
        height: 50px;
        position: fixed;
        bottom: 80px;
        right: 80px;
        font-size: 20px;
      "
      @click="scrollToTop()"
    >
      Top
    </button>
  </div>
</template>

<script>
import axios from "axios";
import Paginate from "vuejs-paginate-next";

export default {
  data() {
    return {
      endEventList: [],
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: 0,
    };
  },
  components: {
    Paginate,
  },
  computed: {
    pageCount() {
      return Math.ceil(this.totalItems / this.itemsPerPage);
    },
  },
  watch: {
    currentPage() {
      this.currentPage;
    },
  },
  created() {
    this.getEndEventList();
  },
  mounted() {
    this.fetchTotalItems();
  },
  methods: {
    async getBoardEventList() {
      this.$router.push({ path: "/userevent" });
    },
    async goToDetail(eventCode) {
      this.$router.push({
        path: "/usereventinfo",
        query: { eventCode: eventCode },
      });
    },
    getDateFormat(date) {
      return this.$dateFormat(date);
    },
    getToday() {
      return this.$dateFormat("", "yyyy-MM-dd");
    },
    async goCurrentEventList() {
      this.$router.push({ path: "/eventing" });
    },

    async getEndEventList() {
      this.endEventList = (
        await axios
          .get(`/node/usereventpageend/${this.currentPage}`)
          .catch((err) => console.log(err))
      ).data;
    },
    handlePageClick: async function (pageNum) {
      this.currentPage = pageNum;
      await this.getEndEventList();
    },
    fetchTotalItems() {
      //value 값에 테이블명 넣기.
      axios
        .get(`/node/pagenationend`)
        .then((appData) => {
          this.totalItems = appData.data.test;
        })
        .catch((err) => console.log(err));
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
};
</script>

<style scoped>
div {
  font-family: "NEXON Lv1 Gothic OTF";
}
.container {
  margin-top: 120px;
}
table {
  margin-left: 100px;
}
#endbtn {
  background-color: lightblue;
  border-color: lightblue;
  margin-right: 3px;
  color: black;
}
#current,
#all {
  background-color: lightblue;
  border-color: lightblue;
  opacity: 0.5;
  color: black;
  margin-right: 3px;
}
h4 {
  margin-left: 10px;
  margin-top: 10px;
}
#endmessage {
  text-align: center;
}
.pagination-container {
  margin-top: 20px;
}

.pagination-container button {
  font-size: 14px;
  padding: 8px 12px;
}
</style>
