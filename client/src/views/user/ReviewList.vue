<template>
	<div style="margin-bottom: 100px">
		<p v-if="reviewList.length == 0">작성된 리뷰가 없습니다.</p>
		<p v-else>리뷰 리스트</p>

		<table v-if="reviewList.length > 0">
			<thead>
				<tr>
					<th>작성자</th>
					<th>제목</th>
					<th>작성일자</th>
					<th>맛</th>
					<th>가격</th>
					<th>서비스</th>
					<th>좋아요</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(item, idx) in reviewList" :key="idx" @click="openModal(item)">
					<td>{{ item.writer }}</td>
					<td>{{ item.title }}</td>
					<td>{{ $dateFormat(item.write_date, 'yyyy-MM-dd') }}</td>
					<td>{{ item.star_taste }}</td>
					<td>{{ item.star_price }}</td>
					<td>{{ item.star_service }}</td>
					<td>{{ item.like_cnt }}</td>
				</tr>
			</tbody>
		</table>

		<div v-if="selectedReview" class="modal fade" tabindex="-1" role="dialog" ref="reviewModal">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title">Review Details</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeModal">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<p>작성자: {{ selectedReview.writer }}</p>
						<p>제목: {{ selectedReview.title }}</p>
						<p>작성일자: {{ $dateFormat(selectedReview.write_date, 'yyyy-MM-dd') }}</p>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	props: {
		rs_code: String,
	},
	data() {
		return {
			reviewList: [],
			selectedReview: null,
		};
	},

	created() {
		this.getList();
	},

	methods: {
		async getList() {
			try {
				let result = await axios.get(`/node/rsreviewlist/${this.rs_code}`);
				this.reviewList = result.data;
			} catch (err) {
				console.log(err);
			}
		},

		openModal(review) {
			this.selectedReview = review;
		},

		closeModal() {
			this.selectedReview = null;
		},
	},
};
</script>
