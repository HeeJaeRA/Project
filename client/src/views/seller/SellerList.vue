<template>
	<div>
		<table>
			<tr>
				<th>No</th>
				<th>이름</th>
				<th>나이</th>
				<th>전화번호</th>
				<th>주소</th>
				<th>이미지이름</th>
			</tr>
			<tr :key="idx" v-for="(img, idx) in testList" @click="moveBoardInfo(img.NO)">
				<td>{{ img.NO }}</td>
				<td>{{ img.i_name }}</td>
				<td>{{ img.age }}</td>
				<td>{{ img.phone }}</td>
				<td>{{ img.address }}</td>
				<td>{{ img.i_img }}</td>
			</tr>
		</table>
		<router-link to="/seller/upload">사진등록</router-link>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	data() {
		return {
			testList: [],
		};
	},
	created() {
		this.getTestList();
	},
	methods: {
		async getTestList() {
			let result = await axios.get('/node/ptlist').catch((err) => {
				console.log(err);
			});
			let list = result.data;
			this.testList = list;
		},
		moveBoardInfo(num) {
			this.$router.push({ path: '/seller/info', query: { no: num } });
		},
	},
};
</script>
