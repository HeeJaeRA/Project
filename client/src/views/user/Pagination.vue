<!-- npm install vuejs-paginate -->
<template>
  <div>
    <!-- Pagination component -->
    <paginate
      :page-count="pageCount"
      :click-handler="handlePageClick"
      :prev-text="'Prev'"
      :next-text="'Next'"
      :container-class="'pagination'"
      :page-class="'page-item'"
    ></paginate>

    <!-- Show current page -->
    <p>Current Page: {{ currentPage }}</p>
  </div>
</template>

<script>
import Paginate from 'Vuejs-paginate';

export default {
  components: {
    Paginate
  },
  data() {
    return {
      currentPage: 1, // 현재 페이지
      itemsPerPage: 10, // 한 페이지당 페이지 수
      totalItems: 0 // 전체 개수
    };
  },
  computed: {
    pageCount() {
      return Math.ceil(this.totalItems / this.itemsPerPage);
    }
  },
  mounted() {
    this.fetchTotalItems();
  },
  methods: {
    handlePageClick(pageNum) {
      this.currentPage = pageNum;
    },
    fetchTotalItems() {
    axios.get(`/node/page/${?}`) // 테이블명 쿼리 값으로 받아오는 코드 짜기
    }
  }
};
</script>