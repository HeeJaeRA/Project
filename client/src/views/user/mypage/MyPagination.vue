<!-- pagination where 조건 -->
<template>
	<div style="text-align:center; margin: 0 auto;" >
		<!-- Pagination component -->
		<paginate 
			:page-count="pageCount"
			:click-handler="handlePageClick"
			:prev-text="'Prev'"
			:next-text="'Next'"
			:v-model="list"
		></paginate>

		<!-- Show current page -->
		<!-- <p>Current Page: {{ currentPage }}</p>
        <p>Total Page: {{ totalItems }}</p> -->
	</div>
</template>
<script>
import axios from 'axios';
import Paginate from 'vuejs-paginate-next';

export default {
    props: ['value', 'col', 'colvalue'],

    data() {
        return {
            currentPage: 1, // 현재 페이지
            itemsPerPage: 5, // 한 페이지당 페이지 수
            totalItems: 0 // 전체 개수
        }
    },
     components: {
        Paginate
    },
    computed: {
        pageCount() {
        return Math.ceil(this.totalItems / this.itemsPerPage);
        }
    },
    watch : {
        currentPage(){
        this.$emit('current', this.currentPage);
        }
    },
    mounted() {
        this.fetchTotalItems();
    },
    methods: {
        handlePageClick: function (pageNum) {
            this.currentPage = pageNum;
        },
        fetchTotalItems() {
            //value 값에 테이블명 넣기.
            axios.get(`/node/pagenationwhere/${this.value}?col=${this.col}&colvalue=${this.colvalue}`)
            .then(appData => {
            console.log('wherepage', appData.data.test)
            this.totalItems = appData.data.test
            console.log('여기:', this.totalItems);
            })
            .catch(err=>console.log(err));
        }
    }
    
}
</script>
<style scoped>
.pagination {
   justify-content: center;
}
</style>