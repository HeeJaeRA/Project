<template>
	<div>
		<form class="d-flex" action="#" method="POST">
			<input style="width: 800px" class="form-control me-sm-2" type="search" placeholder="Search" name="word" />
			<button class="btn btn-secondary my-2 my-sm-0">Search</button>
		</form>
		<table class="table table-hover">
			<thead>
				<tr>
					<th>제목</th>
					<th>가게 이름</th>
					<th>작성자</th>
					<th>작성일자</th>
					<th>좋아요</th>
				</tr>
			</thead>
			<tbody>
				<tr :key="i" v-for="(board, i) in boardReviewList" @click="goToDetail(board.no)">
					<td>{{ board.title }}</td>
					<td>{{ board.rs_name }}</td>
					<td>{{ board.writer }}</td>
					<td>{{ getDateFormat(board.write_date) }}</td>
					<td>{{ board.like_cnt }}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	data() {
		return {
			boardReviewList: [],
			userId: window.localStorage.getItem('userId'),
			itemsPerPage: 5,
			currentPage: 1,
			totalPages: 0,
		};
	},
	computed: {
		paginatedReviews() {
			let startPage = (this.currentPage - 1) * this.itemsPerPage;
			let endPage = startPage + this.itemsPerPage;
			return this.boardReviewList.slice(startPage, endPage);
		},
	},
	created() {
		this.getBoardReviewist();
	},
	methods: {
		async getBoardReviewist() {
			let response = await axios.get(`/node/boardreviewlist`);
			this.boardReviewList = response.data;
			this.totalPages = Math.ceil(this.boardReviewList.length / this.itemsPerPage);
		},
		async goToDetail(reviewCode) {
			// this.$router.push({ path: '/boardreviewinfo', query: { reviewCode: reviewCode } });
		},
		getDateFormat(date) {
			return this.$dateFormat(date);
		},
		changePage(action) {
			if (action === 'prev' && this.currentPage > 1) {
				this.currentPage--;
				this.scrollToTop();
				this.getBoardReviewist();
			} else if (action === 'next' && this.currentPage < this.totalPages) {
				this.currentPage++;
				this.scrollToTop();
				this.getBoardReviewist();
			}
		},
		scrollToTop() {
			window.scrollTo({ top: 0, behavior: 'smooth' });
		},
	},
};
</script>

<style></style>
