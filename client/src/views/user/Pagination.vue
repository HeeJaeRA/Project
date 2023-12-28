<!-- npm install vuejs-paginate -->
<template>
  <div>
    <!-- Your data rendering logic here -->
    <div v-for="item in paginatedData" :key="item.id">{{ item.name }}</div>

    <!-- Pagination component -->
    <paginate
      :page-count="pageCount"
      :click-handler="handlePageClick"
      :prev-text="'Previous'"
      :next-text="'Next'"
      :container-class="'pagination'"
      :page-class="'page-item'"
      :prev-class="'page-item prev'"
      :next-class="'page-item next'"
      :page-link-class="'page-link'"
      :prev-link-class="'page-link'"
      :next-link-class="'page-link'"
    ></paginate>
  </div>
</template>

<script>
import Paginate from 'vuejs-paginate';

export default {
  components: {
    Paginate,
  },
  data() {
    return {
      // Your data and pagination logic here
      data: [], // Your fetched data
      currentPage: 1,
      pageSize: 10, // Number of items per page
    };
  },
  computed: {
    paginatedData() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.data.slice(startIndex, endIndex);
    },
    pageCount() {
      return Math.ceil(this.data.length / this.pageSize);
    },
  },
  methods: {
    handlePageClick(pageNum) {
      this.currentPage = pageNum;
    },
  },
};
</script>