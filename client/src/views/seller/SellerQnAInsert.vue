<template>
	<div>
		<table class="table table-hover">
			<thead>
				<tr>
					<th>제목</th>
					<td><input type="text" v-model="qnaInfo.title" /></td>
				</tr>
				<tr>
					<th>작성일자</th>
					<td><input type="text" v-model="qnaInfo.write_date" readonly /></td>
				</tr>
				<tr>
					<th>구분</th>
					<td>
						<select v-model="qnaInfo.qna_divison">
							<option value="회원정보">회원정보</option>
							<option value="예약및결제">예약및결제</option>
							<option value="기타문의">기타문의</option>
						</select>
					</td>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td colspan="6">
						<pre><input type="text" v-model="qnaInfo.content" /></pre>
					</td>
				</tr>
				<tr>
					<th>파일첨부</th>
					<td>
						<input type="file" ref="fileInput" @change="handleFileChange" multiple />
					</td>
				</tr>
			</tbody>
		</table>
		<div class="row">
			<button type="button" class="btn btn-xs btn-info" @click="saveInfo(searchNo)">저장</button>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
	data() {
		return {
			searchNo: '',
			qnaInfo: {
				qna_code: '',
				write_date: '',
				title: '',
				writer: '',
				content: '',
				qna_status: '답변대기',
				ans_code: 0,
				qna_divison: '',
				user_divison: '판매자',
			},
			isUpdated: false,
			boardQnaList: {},
			selectedOption: '',
			userId: window.localStorage.getItem('sellerId'),
			images: [],
			bno: '',
		};
	},
	created() {
		this.searchNo = this.$route.query.qndCode;
		//this.getBoardQnaList();
		if (this.searchNo > 0) {
			// 수정
			this.getBoardQnaInfo();
			this.isUpdated = true;
		} else {
			this.qnaInfo.write_date = this.getToday();
			this.qnaInfo.writer = this.userId;
		}
	},
	methods: {
		async getBoardQnaInfo() {
			let result = await axios.get(`/node/qna/${this.userId}/${this.searchNo}`).catch((err) => console.log(err));
			console.log('form.vue', result);
			this.qnaInfo = result.data;
			this.qnaInfo.write_date = this.$dateFormat(this.qnaInfo.write_date);
			this.selectedOption = result.data.qna_divison;
			this.qnaInfo.writer = this.userId;
			console.log('getQnaInfo', this.qnaInfo);
		},
		getToday() {
			return this.$dateFormat('', 'yyyy-MM-dd');
		},
		async saveInfo() {
			let formData = new FormData();
			let result = null;
			this.images.forEach((file) => formData.append('files', file));

			const qnaInfo = JSON.stringify(this.qnaInfo);
			console.log('qna', qnaInfo);
			formData.append(`qnaInfo`, qnaInfo);

			if (this.qnaInfo.qna_code > 0) {
				result = await axios.put(`/node/qnaupdate/${this.userId}/${this.searchNo}`, formData);
			} else {
				result = await axios.post('/node/qnaPhotos', formData);
			}
			console.log('boardqna result', result);
			if (result.data.affectedRows > 0) {
				Swal.fire({
					icon: 'success',
					title: '정상 처리',
					text: '정상적으로 처리되었습니다.',
				});
				this.$router.push({ path: '/seller/qnalist' });
			} else {
				Swal.fire({
					icon: 'error',
					title: '처리 실패',
					text: '정상적으로 처리되지 않았습니다.',
				});
			}
			this.$router.push({ path: '/seller/qnalist' });
		},
		handleFileChange(event) {
			this.images = Array.from(event.target.files);
			console.log(this.images);
		},
	},
};
</script>

<style></style>
