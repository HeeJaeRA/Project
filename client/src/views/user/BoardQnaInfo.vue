<template>
	<div class="container">
		<br />
		<h4 style="font-family: JalnanGothic; margin-bottom: 40px">QnA</h4>
		<br />
		<br />
		<table class="table table-hover">
			<thead>
				<tr>
					<!-- <th>글번호</th>
                    <td>{{ qnaInfo.qna_code }}</td> -->
					<th>작성일시</th>
					<td colspan="3">{{ getDateFormat(qnaInfo.write_date) }}</td>
				</tr>
				<tr>
					<th>제목</th>
					<td>{{ qnaInfo.title }}</td>
					<th>답변상태</th>
					<td>{{ qnaInfo.qna_status }}</td>
				</tr>
			</thead>
		</table>
		<table class="table table-hover">
			<tbody>
				<tr>
					<td colspan="5">
						<pre>{{ qnaInfo.content }}</pre>
					</td>
				</tr>
				<!--         {{
          imgInfo
        }} -->
				<tr v-for="img in imgInfo" :key="img.qna_code">
					<!-- <td colspan="2">
            <pre>{{ img.img_name }}</pre>
          </td> -->
					<td colspan="2" id="img">
						<img :src="`/node/public/uploads/${img.img_name}`" width="600px" height="500px" />
					</td>
				</tr>
			</tbody>
		</table>
		<div>
			<QnaAnswerInfo v-bind:qnaCode="this.searchNo" />
		</div>
		<div v-if="this.qnaInfo.qna_status == '답변완료'" id="btn1">
			<button type="button" class="btn btn-outline-secondary" @click="BoardQnaList()">목록으로</button>
		</div>
		<div v-else id="btn2">
			<button type="button" class="btn btn-outline-primary" @click="BoardQnaForm(qnaInfo.qna_code)">수정</button>
			<button type="button" class="btn btn-warning" @click="confirmdelete()">삭제</button>
			<button type="button" class="btn btn-outline-secondary" @click="BoardQnaList()">목록으로</button>
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
import axios from 'axios';
import Swal from 'sweetalert2';
import QnaAnswerInfo from '../user/QnaAnswerInfo.vue';

export default {
	data() {
		return {
			searchNo: '',
			userId: window.localStorage.getItem('userId'),
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
			console.log('info.vue', result);
			this.qnaInfo = result.data;
		},
		async getimgInfo() {
			let result = await axios.get(`/node/qnaimg/${this.searchNo}`).catch((err) => console.log(err));
			this.imgInfo = result.data;
			console.log('image', result.data);
			console.log('img1', result);
			console.log('img2', this.imgInfo);
		},
		getDateFormat(date) {
			return this.$dateFormat(date);
		},
		async BoardQnaList() {
			this.$router.push({ path: `/qna` });
		},
		async BoardQnaForm(qndCode) {
			this.$router.push({ path: '/qnaform', query: { qndCode: qndCode } });
		},
		confirmdelete() {
			Swal.fire({
				title: '정말로 삭제하시겠습니까?',
				text: '삭제한 게시글은 다시 복구가 불가합니다.',
				icon: 'warning',
				showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
				confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
				cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
				confirmButtonText: '승인', // confirm 버튼 텍스트 지정
				cancelButtonText: '취소', // cancel 버튼 텍스트 지정
			}).then((result) => {
				// 만약 Promise리턴을 받으면,
				if (result.isConfirmed) {
					// 만약 모달창에서 confirm 버튼을 눌렀다면
					this.BoardQnaDelete();
				}
			});
		},
		async BoardQnaDelete() {
			let result = await axios.delete(`/node/qnadelete/${this.searchNo}`).catch((err) => console.log(err));
			console.log('result', result);
			let count = result.data.affectedRows;
			if (count == 1) {
				//this.qnaInfo = result.data;
				Swal.fire({
					icon: 'success',
					title: 'QnA 문의',
					text: '삭제되었습니다.',
				});
				this.$router.push({ path: `/qna` });
			}
		},
		scrollToTop() {
			window.scrollTo({ top: 0, behavior: 'smooth' });
		},
	},
};
</script>

<style scoped>
div {
	font-family: 'NEXON Lv1 Gothic OTF';
}
.container {
	margin-top: 120px;
}
#img {
	text-align: center;
}
#btn1,
#btn2 {
	text-align: center;
}
button {
	margin: 15px 5px 15px;
	text-align: center;
}
</style>
