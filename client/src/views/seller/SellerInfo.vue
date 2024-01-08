<template>
	<table>
		<tr>
			<th>번호</th>
			<td>{{ testInfo.NO }}</td>
			<th>이름</th>
			<td>{{ testInfo.i_name }}</td>
			<th>나이</th>
			<td>{{ testInfo.age }}</td>
			<th>전화번호</th>
			<td>{{ testInfo.phone }}</td>
			<th>주소</th>
			<td>{{ testInfo.address }}</td>
			<th>이미지</th>
			<td>{{ testInfo.i_img }}</td>
			<td>
				<img :src="`http://localhost:3000/public/uploads/${testInfo.i_img}`" width="200px" height="200px" />
				<button @click="downloadImage">이미지 다운로드</button>
			</td>
		</tr>
	</table>
	<br />
	<router-link to="/seller/list">목록으로</router-link>
</template>

<script>
import axios from 'axios';

export default {
	data() {
		return {
			searchNo: '',
			testInfo: {},
		};
	},
	created() {
		this.searchNo = this.$route.query.no;
		this.getTestInfo();
	},
	methods: {
		async getTestInfo() {
			let result = await axios.get(`/node/ptlist/${this.searchNo}`).catch((err) => console.log(err));
			this.testInfo = result.data;
		},
		async downloadImage() {
			let imgname = this.testInfo.i_img;
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
