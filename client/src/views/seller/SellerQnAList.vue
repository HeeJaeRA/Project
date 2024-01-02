<template>
	<div>
		<h3>판매자 QnA</h3>
		<table class="table table-hover">
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
				<tr v-for="(item, idx) in paginatedQnaList" :key="idx" @click="getboard(item.qna_code)">
					<td>{{ idx + 1 }}</td>
					<td>{{ item.title }}</td>
					<td>{{ $dateFormat(item.write_date, 'yyyy-MM-dd') }}</td>
					<td>{{ item.writer }}</td>
					<td>{{ item.qna_divison }}</td>
					<td>{{ item.qna_status }}</td>
				</tr>
			</tbody>
		</table>

		<div class="pagination-container d-flex justify-content-center align-items-center mt-4">
			<button v-if="currentPage > 1" class="btn btn-primary mx-1" @click="changePage('prev')">이전</button>
			<span class="mx-1">Page {{ currentPage }} / {{ totalPages }}</span>
			<button v-if="currentPage < totalPages" class="btn btn-primary mx-1" @click="changePage('next')">
				다음
			</button>
		</div>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	data() {
		return {
			qnaList: [],
			logId: 'teeessstt',
			itemsPerPage: 10,
			currentPage: 1,
			totalPages: 0,
		};
	},
	mounted() {
		this.getQnaList();
	},
	computed: {
		paginatedQnaList() {
			let startPage = (this.currentPage - 1) * this.itemsPerPage;
			let endPage = startPage + this.itemsPerPage;
			return this.qnaList.slice(startPage, endPage);
		},
	},
	methods: {
		async getQnaList() {
			let result = await axios.get(`/node/sellerqna/${this.logId}`).catch((err) => {
				console.log(err);
			});

			this.qnaList = result.data;
		},
		getboard(num) {
			this.$router.push({ path: '/seller/qnainfo', query: { no: num } });
		},
		changePage(action) {
			if (action === 'prev' && this.currentPage > 1) {
				this.currentPage--;
				this.scrollToTop();
				this.getQnaList();
			} else if (action === 'next' && this.currentPage < this.totalPages) {
				this.currentPage++;
				this.scrollToTop();
				this.getQnaList();
			}
		},
		scrollToTop() {
			window.scrollTo({ top: 0, behavior: 'smooth' });
		},
	},
};
</script>
