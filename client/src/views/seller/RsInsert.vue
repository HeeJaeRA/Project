<template>
	<div>
		<label for="registrationNumber">사업자 등록번호</label>
		<input type="text" v-model="registrationNumber" placeholder="- 제외하고 입력하세요" maxlength="10" required />
		<button @click="checkBusinessRegistration">사업자 등록번호 확인</button>

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
		<input type="text" v-model="restaurantInfo.address" required />

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

		<label for="restaurantDeposit">식당 예약금</label>
		<input type="number" v-model="restaurantInfo.deposit" min="3000" max="10000" step="1000" required />

		<label for="restaurantHoliday">휴무일</label>
		<div class="holidayForm">
			<label>
				<input type="checkbox" v-model="restaurantInfo.holiday" value="0" />
				일
			</label>
			<label>
				<input type="checkbox" v-model="restaurantInfo.holiday" value="1" />
				월
			</label>
			<label>
				<input type="checkbox" v-model="restaurantInfo.holiday" value="2" />
				화
			</label>
			<label>
				<input type="checkbox" v-model="restaurantInfo.holiday" value="3" />
				수
			</label>
			<label>
				<input type="checkbox" v-model="restaurantInfo.holiday" value="4" />
				목
			</label>
			<label>
				<input type="checkbox" v-model="restaurantInfo.holiday" value="5" />
				금
			</label>
			<label>
				<input type="checkbox" v-model="restaurantInfo.holiday" value="6" />
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
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
	data() {
		return {
			registrationNumber: '',
			restaurantInfo: {
				category: '',
				rs_name: '',
				address: '',
				gu_gun: '',
				rs_desc: '',
				phone: '',
				img: null,
				tag: '',
				deposit: 5000,
				holiday: [],
				seat_cnt: '',
			},
		};
	},
	methods: {
		async checkBusinessRegistration() {
			try {
				const response = await axios.post(
					'https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=xzADYrvAUisAVDob8yaz4gaeTvaJVrxJG5M93Ihkj5IDQgqmpN%2FejAdm26cz1BsmATLApRLmj7HWYVfgqvwnKw%3D%3D',
					{
						b_no: [this.registrationNumber],
					}
				);
				// console.log(response.data);
				console.log(response.data.data[0]);
				if (response.data.data[0].b_stt_cd == '01') {
					Swal.fire({
						title: '계속사업자',
						icon: 'success',
					});
				} else if (response.data.data[0].b_stt_cd == '02') {
					Swal.fire({
						title: '휴업중인 사업자 번호입니다',
						icon: 'warning',
					});
				} else if (response.data.data[0].b_stt_cd == '03') {
					Swal.fire({
						title: '폐업한 사업자 번호입니다',
						icon: 'error',
					});
				} else {
					Swal.fire({
						title: '등록되지 않은 사업자 번호입니다',
						icon: 'error',
					});
				}
			} catch (err) {
				console.log(err);
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
	transform: scale(0.8); /* Adjust the scale factor as needed */
}

.holidayForm label {
	display: inline-block;
	margin-right: 10px;
}
</style>
