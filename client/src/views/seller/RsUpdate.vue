<template>
	{{ restaurantInfo }}
	<h3>업체 수정</h3>
	<div>
		<label for="restaurantCategory">카테고리</label>
		<select v-model="restaurantInfo.category" required>
			<option value="" selected>-- 선택하세요 --</option>
			<option value="한식">한식</option>
			<option value="중식">중식</option>
			<option value="일식">일식</option>
			<option value="양식">양식</option>
			<option value="포차">포차</option>
			<option value="디저트">디저트</option>
		</select>

		<label for="restaurantName">식당 상호명</label>
		<input type="text" v-model="restaurantInfo.rs_name" required />

		<label for="restaurantAddress">식당 주소</label>
		<div>
			<input type="text" v-model="postcode" placeholder="우편번호" readonly />
			<input type="button" @click="openPostcodeSearch" value="우편번호 찾기" /><br />
			<input type="text" v-model="restaurantInfo.address" placeholder="도로명주소" readonly />
			<input type="text" v-model="detailAddress" placeholder="상세주소" />
		</div>

		<label for="restaurantPhone">전화번호</label>
		<input
			type="tel"
			v-model="restaurantInfo.phone"
			placeholder="- 포함해서 입력하세요"
			oninput="javascript: this.value = this.value.replace(/[^0-9-]/, '')"
			required
		/>

		<label for="restaurantDescription">식당 설명</label>
		<textarea v-model="restaurantInfo.rs_desc" required></textarea>

		<label for="restaurantTags">식당 태그</label>
		<input type="text" v-model="restaurantInfo.tag" required />

		<label for="restaurantTags">식당 대표 사진</label>
		<input type="file" ref="fileInput" @change="handleFileChange" />
		<button style="display: inline" @click="uploadFile()" type="button">업로드하기</button>

		<label for="restaurantDeposit">식당 예약금</label>
		<input type="number" v-model="restaurantInfo.deposit" min="3000" max="10000" step="1000" required />

		<label for="restaurantHoliday">휴무일</label>
		<div class="holidayForm">
			<label>
				<input type="checkbox" v-model="this.holiday" value="0" />
				일
			</label>
			<label>
				<input type="checkbox" v-model="this.holiday" value="1" />
				월
			</label>
			<label>
				<input type="checkbox" v-model="this.holiday" value="2" />
				화
			</label>
			<label>
				<input type="checkbox" v-model="this.holiday" value="3" />
				수
			</label>
			<label>
				<input type="checkbox" v-model="this.holiday" value="4" />
				목
			</label>
			<label>
				<input type="checkbox" v-model="this.holiday" value="5" />
				금
			</label>
			<label>
				<input type="checkbox" v-model="this.holiday" value="6" />
				토
			</label>
		</div>

		<label for="restaurantSeat_cnt">좌석수</label>
		<select v-model="restaurantInfo.seat_cnt" required>
			<option value="" selected>-- 선택하세요 --</option>
			<option v-for="i in 10" :key="i" :value="i">{{ i }}</option>
		</select>
	</div>

	{{ restaurantInfo }}

	<button class="btn btn-primary w-100 py-2" @click="RsUpdate()" type="button">수정하기</button>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
	data() {
		return {
			rsNum: '',
			restaurantInfo: {
				category: '',
				rs_name: '',
				address: '',
				gu_gun: '',
				rs_desc: '',
				phone: '',
				img: null,
				tag: '',
				holiday: [],
				deposit: 0,
				seat_cnt: '',
			},
			holiday: [],
			selectedFile: '',
			postcode: '',
			detailAddress: '',
		};
	},
	created() {
		this.rsNum = this.$route.query.no;
		this.getRestaurantInfo();
	},
	methods: {
		async getRestaurantInfo() {
			try {
				let response = await axios.get(`/node/restaurants/${this.rsNum}`);
				this.restaurantInfo = response.data;
			} catch (error) {
				console.error(error);
			}
		},
		handleFileChange(event) {
			this.selectedFile = event.target.files[0];
		},
		async uploadFile() {
			if (this.selectedFile != null) {
				const formData = new FormData();
				formData.append('file', this.selectedFile);
				try {
					const response = await axios.post('/node/rsphoto', formData);
					this.restaurantInfo.img = response.data.filename;
					Swal.fire({
						title: '등록완료',
						icon: 'success',
					});
				} catch (error) {
					console.error(error);
				}
			}
		},
		openPostcodeSearch() {
			new daum.Postcode({
				oncomplete: (data) => {
					this.postcode = data.zonecode;
					this.restaurantInfo.address = data.address;
					this.detailAddress = data.buildingName;
				},
			}).open();
		},

		async RsUpdate() {
			let obj = {
				param: {
					category: this.restaurantInfo.category,
					rs_name: this.restaurantInfo.rs_name,
					address: this.restaurantInfo.address,
					gu_gun: this.restaurantInfo.gu_gun,
					rs_desc: this.restaurantInfo.rs_desc,
					phone: this.restaurantInfo.phone,
					holiday: this.holiday.join(''),
					rs_img: this.restaurantInfo.img,
					tag: this.restaurantInfo.tag,
					deposit: this.restaurantInfo.deposit,
					seat_cnt: this.restaurantInfo.seat_cnt,
				},
			};
			let result = await axios.put(`/node/rs/${this.rsNum}`, obj).catch((err) => console.log(err));
			if (result.data.affectedRows > 0) {
				Swal.fire({
					icon: 'success',
					title: '수정 성공',
				});
			} else {
				Swal.fire({
					icon: 'warning',
					title: '수정 실패',
				});
			}
		},
	},
};
</script>

<style scoped>
label {
	display: block;
	margin-bottom: 5px;
}
input,
textarea {
	width: 50%;
	margin-bottom: 10px;
}
input[type='checkbox'] {
	transform: scale(0.8);
}

.holidayForm label {
	display: inline-block;
	margin-right: 10px;
}
</style>
