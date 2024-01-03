<template>
	<h3>업체 등록</h3>
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
			maxlength="13"
			oninput="javascript: this.value = this.value.replace(/[^0-9-]/, '')"
			required
		/>

		<label for="restaurantDescription">식당 설명</label>
		<textarea v-model="restaurantInfo.rs_desc" required></textarea>

		<label for="restaurantTags">식당 태그</label>
		<input type="text" v-model="restaurantInfo.tag" required />

		<label>
			오픈시간
			<select v-model="restaurantInfo.open_time" required>
				<!-- padStart: 시작 부분에 지정된 길이만큼의 길이에 맞추기 위해 다른 문자로 채워넣는 함수 -->
				<option v-for="i in 24" :key="i" :value="i - 1">{{ (i - 1).toString().padStart(2, '0') }}시</option>
			</select>
			~ 마감시간
			<select v-model="restaurantInfo.close_time" required>
				<option v-for="i in 24" :key="i" :value="i - 1">{{ (i - 1).toString().padStart(2, '0') }}시</option>
			</select>
		</label>

		<div>
			<div v-if="restaurantInfo.open_time && restaurantInfo.close_time">
				영업시간
				<div v-for="hour in selectHours" :key="hour" class="hoursCheckbox">
					<label>{{ hour.toString().padStart(2, '0') }} : 00</label>
					<input type="checkbox" v-model="selectedHours" :value="hour" />
				</div>
			</div>
		</div>

		<label for="restaurantTags">식당 대표 사진</label>
		<input type="file" @change="handleFileChange" />
		<!-- <button style="display: inline" @click="uploadFile()" type="button">업로드하기</button> -->

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
	{{ selectedHours }}

	<button class="btn btn-primary w-100 py-2" @click="RsInsert()" type="button">등록하기</button>
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
				seller_id: 'teeessstt',
				open_time: 0,
				close_time: 0,
			},
			selectedFile: '',
			postcode: '',
			detailAddress: '',
		};
	},
	watch: {
		'restaurantInfo.address': function (newAddress) {
			let address = newAddress.split(' ');
			if (address.length >= 2) {
				this.restaurantInfo.gu_gun = address[1];
			} else {
				this.restaurantInfo.gu_gun = '';
			}
		},
		selectHours: {
			// handler: watch 옵션 내에서 해당 속성의 값이 변경될 때 호출되는 콜백 함수
			handler(checkboxs) {
				this.selectedHours = [...checkboxs];
			},
		},
	},
	computed: {
		selectHours() {
			if (this.restaurantInfo.open_time && this.restaurantInfo.close_time) {
				let startHour = parseInt(this.restaurantInfo.open_time);
				let endHour = parseInt(this.restaurantInfo.close_time);
				// _는 현재 요소 값, index는 현재 요소 인덱스번호 -> startHour, index
				if (startHour <= endHour) {
					return Array.from({ length: endHour - startHour + 1 }, (_, index) => startHour + index);
				} else {
					let beforeMidnight = Array.from({ length: 24 - startHour }, (_, index) => startHour + index);
					let afterMidnight = Array.from({ length: endHour + 1 }, (_, index) => index);
					return beforeMidnight.concat(afterMidnight);
				}
			}
			return [];
		},
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

		async RsInsert() {
			let obj = {
				param: {
					category: this.restaurantInfo.category,
					rs_name: this.restaurantInfo.rs_name,
					address: this.restaurantInfo.address,
					gu_gun: this.restaurantInfo.gu_gun,
					rs_desc: this.restaurantInfo.rs_desc,
					phone: this.restaurantInfo.phone,
					rs_img: this.restaurantInfo.img,
					tag: this.restaurantInfo.tag,
					deposit: this.restaurantInfo.deposit,
					holiday: this.restaurantInfo.holiday.join(''),
					seat_cnt: this.restaurantInfo.seat_cnt,
					seller_id: this.restaurantInfo.seller_id,
				},
			};
			let result = await axios.post('/node/rs', obj).catch((err) => console.log(err));
			if (result.data.affectedRows > 0) {
				Swal.fire({
					icon: 'success',
					title: '등록 성공',
				});
			} else {
				Swal.fire({
					icon: 'warning',
					title: '등록 실패',
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
.hoursCheckbox {
	display: flex;
	align-items: center;
	margin-bottom: 8px;
}

.hoursCheckbox input {
	margin-right: 6px;
	transform: scale(1.2); /* Adjust the scale for checkbox size */
}
</style>
