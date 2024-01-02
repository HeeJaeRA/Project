<template>
	<table class="table table-hover">
		<thead>
			<tr>
				<th>제목</th>
				<td><input type="text" v-model="comInfo.title" /></td>
				<th>작성자</th>
				<td><input type="text" v-model="comInfo.user_id" readonly /></td>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>
					<textarea v-model="comInfo.content"></textarea>
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
	<button @click="saveQna">등록하기</button>

	<div>
		<router-link to="/seller/list">목록으로</router-link>
	</div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
	data() {
		return {
			images: [],
			comInfo: {
				title: '',
				user_id: 'user1',
				view_cnt: 0,
				content: '',
			},
			bno: '',
		};
	},
	methods: {
		handleFileChange(event) {
			this.images = Array.from(event.target.files);
		},
		async saveQna() {
			let formData = new FormData();

			this.images.forEach((file) => {
				formData.append(`files`, file);
			});

			try {
				let data = this.comInfo;
				console.log(data);
				let result = await axios.post('/node/community', data);
				console.log(result);
				if (result.data.affectedRows > 0) {
					Swal.fire({
						icon: 'success',
						title: '정상 처리',
						text: '정상적으로 처리되었습니다.',
					});
					this.$router.push({ path: 'home' });
				} else {
					Swal.fire({
						icon: 'error',
						title: '처리 실패',
						text: '정상적으로 처리되지 않았습니다.',
					});
				}
				this.bno = result.data.insertId;
				formData.append('bno', this.bno);
			} catch (error) {
				console.error(error);
			} finally {
				let response = await axios.post('/node/comPhotos', formData);
				let uploadedImages = response.data.filenames;
				console.log(uploadedImages);

				this.images = uploadedImages;
			}
		},
	},
};
</script>
