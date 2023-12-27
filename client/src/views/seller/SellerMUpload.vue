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
		<input type="file" ref="fileInput" @change="handleFileChange" multiple />
	</div>
	<button @click="uploadFiles">Upload Files</button>

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
			images: [],
		};
	},
	methods: {
		handleFileChange(event) {
			this.images = Array.from(event.target.files);
		},
		async uploadFiles() {
			const formData = new FormData();

			this.images.forEach((file, index) => {
				formData.append(`file_${index}`, file);
			});

			try {
				let response = await axios.post('/node/photo', formData);
				let uploadedImages = response.data.filenames;
				console.log(uploadedImages);

				this.images = uploadedImages;
			} catch (error) {
				console.error(error);
			} finally {
				let data = {
					param: {
						i_name: this.name,
						age: this.age,
						phone: this.phone,
						address: this.address,
						i_img: this.images,
					},
				};
				let result = await axios.post('/node/ptupload', data);
				console.log(result);
			}
		},
	},
};
</script>
