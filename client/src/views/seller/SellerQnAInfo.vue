<template>
	<div>
		{{ 'ah: ' + answerList }}
		<table class="table table-hover">
			<thead>
				<tr>
					<th>글번호</th>
					<td>{{ qnaInfo.qna_code }}</td>
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
			<tbody>
				<tr>
					<td colspan="5">
						<pre>{{ qnaInfo.content }}</pre>
					</td>
				</tr>
			</tbody>
		</table>
		<div v-if="qnaInfo.qna_status == '답변완료'">
			<ul class="list-group">
				<li class="list-group-item">
					<div class="container">
						<div class="row text-start">
							{{ answerList.title }}
							{{ answerList.writer }}
							{{ getDateFormat(answerList.write_date) }}
						</div>
						<div class="row text-start">
							{{ answerList.content }}
						</div>
					</div>
				</li>
			</ul>
		</div>

		<div>
			<button type="button" @click="this.$router.go(-1)">목록으로</button>
		</div>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	data() {
		return {
			reply: false,
			searchNo: '',
			qnaInfo: {},
			answerList: [],
		};
	},
	created() {
		this.searchNo = this.$route.query.no;
		this.boardQnaInfo();
		this.getAnswerList();
	},
	methods: {
		getToday() {
			return this.$dateFormat('', 'yyyy-MM-dd');
		},
		async boardQnaInfo() {
			let result = await axios.get(`/node/qna/${this.searchNo}`).catch((err) => console.log(err));
			this.qnaInfo = result.data;
		},
		getDateFormat(date) {
			return this.$dateFormat(date);
		},
		async getAnswerList() {
			let result = await axios.get(`/node/answer?bno=${this.searchNo}`).catch((err) => console.log(err));
			console.log(result);
			this.answerList = result.data;
		},
	},
};
</script>

<style></style>
