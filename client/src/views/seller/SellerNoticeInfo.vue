'/node/userevent'
<template>
	<div>
		<table class="table table-hover">
			<thead>
				<tr>
					<th>제목</th>
					<td>{{ noticeInfo.title }}</td>
					<th>작성자</th>
					<td>{{ noticeInfo.user_id }}</td>
				</tr>
				<tr>
					<th>작성일시</th>
					<td>{{ getDateFormat(noticeInfo.write_date) }}</td>
					<th>조회수</th>
					<td>{{ noticeInfo.view_cnt }}</td>
				</tr>
				<tr>
					<th>첨부파일 다운로드</th>
					<td colspan="2" v-for="img in imgInfo" :key="img.commu_code">
						{{ img.img_name }}<button @click="downloadImage(img.img_name)">첨부파일 다운로드</button>
					</td>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td colspan="4">
						<pre>{{ noticeInfo.content }}</pre>
					</td>
				</tr>
			</tbody>
		</table>
		<div>
			<button type="button" class="btn btn-outline-secondary" @click="BoardNoticeList()">목록으로</button>
		</div>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	data() {
		return {
			searchNo: '',
			noticeInfo: {},
			imgInfo: [],
		};
	},
	created() {
		this.searchNo = this.$route.query.noticeCode;
		this.boardNoticeInfo();
		this.getimgInfo();
	},
	methods: {
		async boardNoticeInfo() {
			let result = await axios.get(`/node/notices/${this.searchNo}`).catch((err) => console.log(err));
			this.noticeInfo = result.data;
		},
		async getimgInfo() {
			let result = await axios.get(`/node/noticeimg/${this.searchNo}`).catch((err) => console.log(err));
			this.imgInfo = result.data;
			console.log(this.imgInfo);
		},
		getDateFormat(date) {
			return this.$dateFormat(date);
		},
		async BoardNoticeList() {
			this.$router.push({ path: '/seller/noticelist' });
		},
		async downloadImage(img) {
			let imgname = img;
			let response = await axios.get(`/node/download/image/${imgname}`, {
				responseType: 'blob', // 서버에서 바이너리 데이터(Blob)로 응답받음
			});

			let url = window.URL.createObjectURL(new Blob([response.data]));

			// a 태그를 생성하여 다운로드 링크 생성
			let link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', imgname); // 다운로드되는 파일의 이름
			document.body.appendChild(link);
			link.click();

			// 생성된 URL 및 a 태그를 해제
			window.URL.revokeObjectURL(url);
			document.body.removeChild(link);
		},
	},
};
</script>

<style></style>
