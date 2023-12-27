<template>
	<div>
		<label>이름<input type="text" v-model="name" /></label>
		<p>{{ name }}</p>
	</div>
	<div>
		<label>나이<input type="number" v-model="age" /></label>
		<p>{{ age }}</p>
	</div>
	<div>
		<label>전화번호<input type="text" v-model="phone" /></label>
		<p>{{ phone }}</p>
	</div>
	<div>
		<label>주소<input type="text" v-model="address" /></label>
		<p>{{ address }}</p>
	</div>
	<div>
		<input type="file" ref="fileInput" @change="handleFileChange" />
	</div>
	<button @click="uploadFile">Upload File</button>

	<div>
		<router-link to="/seller/list">목록으로</router-link>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	data() {
		return {
			name: '',
			age: '',
			phone: '',
			address: '',
			img: '',
			selectedFile: null,
		};
	},
	methods: {
		handleFileChange(event) {
			this.selectedFile = event.target.files[0];
		},
		async uploadFile() {
			const formData = new FormData();
			formData.append('file', this.selectedFile);

			try {
				const response = await axios.post('/node/photos', formData);
				this.img = response.data.filename;
				console.log(response.data.filename);
			} catch (error) {
				console.error(error);
			} finally {
				let data = {
					param: {
						i_name: this.name,
						age: this.age,
						phone: this.phone,
						address: this.address,
						i_img: this.img,
					},
				};
				let result = await axios.post('/node/ptupload', data);
				console.log(result);
			}
		},
	},
};
</script>
