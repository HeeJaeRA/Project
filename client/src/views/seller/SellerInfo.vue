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
	},
};
</script>
