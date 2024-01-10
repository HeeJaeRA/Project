<template>
	<div>
		<div style="margin-left: 30px; margin-right: 50px; margin-top: 30px">
			<h5 style="font-family: 나눔고딕; margin-bottom: 30px">판매자 QnA 조회</h5>
			<table class="table table-hover">
				<thead>
					<tr>
						<th>작성일자</th>
						<td colspan="3">{{ getDateFormat(qnaInfo.write_date) }}</td>
					</tr>
					<tr>
						<th>제목</th>
						<td>{{ qnaInfo.title }}</td>
						<th>답변상태</th>
						<td>{{ qnaInfo.qna_status }}</td>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td colspan="5">
							<pre>{{ qnaInfo.content }}</pre>
						</td>
					</tr>
					<tr v-for="img in imgInfo" :key="img.qna_code">
						<td colspan="2">
							<pre>{{ img.img_name }}</pre>
						</td>
						<td colspan="2">
							<img :src="`/node/public/uploads/${img.img_name}`" width="200px" height="200px" />
						</td>
					</tr>
				</tbody>
			</table>
			<div>
				<QnaAnswerInfo v-bind:qnaCode="this.searchNo" />
			</div>
			<div v-if="this.qnaInfo.qna_status == '답변완료'">
				<button type="button" class="btn btn-outline-secondary" @click="BoardQnaList()">목록으로</button>
			</div>
			<div v-else>
				<button type="button" class="btn btn-outline-primary" @click="BoardQnaForm(qnaInfo.qna_code)">
					수정
				</button>
				<button type="button" class="btn btn-warning" @click="BoardQnaDelete()">삭제</button>
				<button type="button" class="btn btn-outline-secondary" @click="BoardQnaList()">목록으로</button>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import QnaAnswerInfo from '../user/QnaAnswerInfo.vue';

export default {
	data() {
		return {
			searchNo: '',
			userId: window.localStorage.getItem('sellerId'),
			qnaInfo: {},
			imgInfo: [],
		};
	},
	components: {
		QnaAnswerInfo,
	},
	created() {
		this.searchNo = this.$route.query.qnaCode;
		this.boardQnaInfo();
		this.getimgInfo();
	},
	methods: {
		async boardQnaInfo() {
			let result = await axios.get(`/node/qna/${this.userId}/${this.searchNo}`).catch((err) => console.log(err));
			console.log(result);
			this.qnaInfo = result.data;
		},
		async getimgInfo() {
			let result = await axios.get(`/node/qnaimg/${this.searchNo}`).catch((err) => console.log(err));
			this.imgInfo = result.data;
			console.log('image', result.data);
			console.log(1, result);
			console.log(2, this.imgInfo);
		},
		getDateFormat(date) {
			return this.$dateFormat(date);
		},
		async BoardQnaList() {
			this.$router.push({ path: '/seller/qnalist' });
		},
		async BoardQnaForm(qndCode) {
			this.$router.push({ path: '/qnaform', query: { qndCode: qndCode } });
		},
		async BoardQnaDelete() {
			let result = await axios.delete(`/node/qna/${this.searchNo}`).catch((err) => console.log(err));
			this.qnaInfo = result.data;
			Swal.fire({
				icon: 'success',
				title: 'QnA 문의',
				text: '삭제되었습니다.',
			});
			this.$router.push({ path: `/seller/qnalist` });
		},
	},
};
</script>

<style></style>
