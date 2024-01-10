<template>
	<div>
		<h1>공지사항 조회</h1>
		<br />
		<table class="table table-hover">
			<thead>
				<tr>
					<th>작성일자</th>
					<td>{{ $dateFormat(noticeInfo.write_date) }}</td>
				</tr>
				<tr>
					<th>제목</th>
					<td colspan="3">{{ noticeInfo.title }}</td>
				</tr>
			</thead>

			<tbody>
				<tr style="height: 250px">
					<td colspan="5">
						<pre>{{ noticeInfo.content }}</pre>
					</td>
				</tr>
			</tbody>
		</table>

		<table>
			<tr v-for="(img, idx) in imgInfo" :key="idx">
				<td style="width: 30%; border: none">{{ img.img_name }}</td>
				<td colspan="2" style="border: none">
					<button
						style="border-color: white; border-radius: 20px; background-color: #ccc; border-color: #ccc"
						class="btn btn-secondary"
						@click="downloadImage(img.img_name)"
					>
						첨부파일 다운로드
					</button>
				</td>
			</tr>
		</table>

		<div style="margin-top: 10px">
			<button class="btn btn-secondary" style="margin-top: 10px" type="button" @click="this.$router.go(-1)">
				목록으로
			</button>
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

		this.getNoticeInfo();
		this.getimgInfo(); //이미지 가져오기
	},
	methods: {
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

		//등록된 이미지 리스트 출력
		async getimgInfo() {
			let result = await axios.get(`/node/getNoticeImg/${this.searchNo}`).catch((err) => console.log(err));
			this.imgInfo = result.data;
			console.log(this.imgInfo);
		},

		getToday() {
			return this.$dateFormat('', 'yyyy-MM-dd');
		},

		//공지사항 한건조회
		async getNoticeInfo() {
			let result = await axios.get(`/node/adminNoticeInfo/${this.searchNo}`).catch((err) => console.log(err));
			this.noticeInfo = result.data;
			console.log(result.data);
		},
	},
};
</script>
<style scoped>
.container {
	margin-left: 30px;
	margin-right: 50px;
	margin-top: 30px;
}

.form-container {
	margin-top: 30px;
}

.table {
	width: 100%;
	border-collapse: collapse;
}

th,
td {
	padding: 10px;
	border: 1px solid #ddd;
	text-align: left;
}

th {
	background-color: #f2f2f2;
}

select {
	/* width: 200%; */
	padding: 10px;
	font-family: inherit;
	border: 1px solid #ddd;
	border-radius: 4px;
	box-sizing: border-box;
}

input[type='text'],
textarea,
input[type='file'] {
	text-align: cen;
	width: 100%;
	padding: 10px;
	margin-top: 5px;
	margin-bottom: 10px;
	box-sizing: border-box;
	border: 1px solid #ddd;
	border-radius: 4px;
}
</style>
