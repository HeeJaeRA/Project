<template>
	<h3>업체 등록</h3>
	<div>
		<label>사업자 등록번호</label>
		<input type="text" v-model="registrationNumber" placeholder="- 제외하고 입력하세요" maxlength="10" required />
		<button @click="checkBusinessRegistration">사업자 등록번호 확인</button>

		<label>카테고리</label>
		<select v-model="restaurantInfo.category" required>
			<option value="" selected>-- 선택하세요 --</option>
			<option value="한식">한식</option>
			<option value="중식">중식</option>
			<option value="일식">일식</option>
			<option value="양식">양식</option>
			<option value="포차">포차</option>
			<option value="디저트">디저트</option>
		</select>

		<label>식당 상호명</label>
		<input type="text" v-model="restaurantInfo.rs_name" required />

		<label>식당 주소</label>
		<div>
			<input type="text" v-model="postcode" placeholder="우편번호" readonly />
			<input type="button" @click="openPostcodeSearch" value="우편번호 찾기" /><br />
			<input type="text" v-model="restaurantInfo.address" placeholder="도로명주소" readonly />
			<input type="text" v-model="detailAddress" placeholder="상세주소" />
		</div>

		<label>전화번호</label>
		<input
			type="tel"
			v-model="restaurantInfo.phone"
			placeholder="- 포함해서 입력하세요"
			maxlength="13"
			oninput="javascript: this.value = this.value.replace(/[^0-9-]/, '')"
			required
		/>

		<label>식당 설명</label>
		<textarea v-model="restaurantInfo.rs_desc" required></textarea>

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

		<label>식당 태그</label>
		<input
			id="tagInput"
			type="text"
			v-model="restaurantInfo.tag"
			required
			ref="tagInput"
			v-tagify="{ whitelist: [] }"
		/>

		<label>식당 대표 사진</label>
		<input type="file" @change="handleFileChange1" />

		<label>사업자등록증</label>
		<input type="file" @change="handleFileChange2" />

		<label>식당 예약금</label>
		<input type="number" v-model="restaurantInfo.deposit" min="3000" max="10000" step="1000" required />

		<label>휴무일</label>
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

		<label>좌석수</label>
		<select v-model="restaurantInfo.seat_cnt" required>
			<option value="" selected>-- 선택하세요 --</option>
			<option v-for="i in 10" :key="i" :value="i">{{ i }}</option>
		</select>
	</div>
	<button class="btn btn-primary w-100 py-2" @click="RsInsert()" type="button">등록하기</button>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import Tagify from '@yaireo/tagify';
import '@yaireo/tagify/dist/tagify.css';

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
				license: null,
				tag: [],
				deposit: 5000,
				holiday: [],
				seat_cnt: '',
				seller_id: window.localStorage.getItem('sellerId'),
				open_time: 0,
				close_time: 0,
			},
			selectedFile: '',
			postcode: '',
			detailAddress: '',
			selectedHours: [],
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
	mounted() {
		const input = this.$refs.tagInput;

		this.tagifyInstance = new Tagify(input, {
			whitelist: [],
			originalInputValueFormat: (tagsArr) => tagsArr.map((tag) => tag.value).join(', '),
		});

		if (this.restaurantInfo.tag.length > 0) {
			this.tagifyInstance.addTags(this.restaurantInfo.tag);
		}

		this.tagifyInstance.on('add', (e) => {
			this.restaurantInfo.tag = this.tagifyInstance.value.map((tag) => tag.value);
		});

		this.tagifyInstance.on('remove', (e) => {
			this.restaurantInfo.tag = this.tagifyInstance.value.map((tag) => tag.value);
		});
	},
	computed: {
		selectHours() {
			if (this.restaurantInfo.open_time && this.restaurantInfo.close_time) {
				let startHour = parseInt(this.restaurantInfo.open_time);
				let endHour = parseInt(this.restaurantInfo.close_time);
				// _는 현재 요소 값, index는 현재 요소 인덱스번호 -> startHour, index
				if (startHour <= endHour) {
					return Array.from({ length: endHour - startHour + 1 }, (_, index) => {
						let hour = startHour + index;
						return hour.toString().padStart(2, '0');
					});
				} else {
					let beforeMidnight = Array.from({ length: 24 - startHour }, (_, index) => {
						let hour = startHour + index;
						return hour.toString().padStart(2, '0');
					});
					let afterMidnight = Array.from({ length: endHour + 1 }, (_, index) => {
						let hour = index;
						return hour.toString().padStart(2, '0');
					});
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
		handleFileChange1(event) {
			this.restaurantInfo.img = event.target.files[0];
		},
		handleFileChange2(event) {
			this.restaurantInfo.license = event.target.files[0];
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
			const formData = new FormData();
			if (this.restaurantInfo.img) {
				formData.append(`files`, this.restaurantInfo.img);
			}

			if (this.restaurantInfo.license) {
				formData.append(`files`, this.restaurantInfo.license);
			}

			let obj1 = {
				category: this.restaurantInfo.category,
				rs_name: this.restaurantInfo.rs_name,
				address: this.restaurantInfo.address,
				gu_gun: this.restaurantInfo.gu_gun,
				rs_desc: this.restaurantInfo.rs_desc,
				phone: this.restaurantInfo.phone,
				rs_img: this.restaurantInfo.img,
				license: this.restaurantInfo.license,
				tag: this.restaurantInfo.tag.map((tag) => `#${tag}`).join(' '),
				deposit: this.restaurantInfo.deposit,
				holiday: this.restaurantInfo.holiday.join(''),
				seat_cnt: this.restaurantInfo.seat_cnt,
				seller_id: this.restaurantInfo.seller_id,
				open_time: this.restaurantInfo.open_time,
				close_time: this.restaurantInfo.close_time,
			};
			let obj2 = {
				time: this.selectedHours,
			};
			const rsobj = JSON.stringify(obj1);
			const timeobj = JSON.stringify(obj2);
			formData.append(`rsobj`, rsobj);
			formData.append(`timeobj`, timeobj);

			for (let key of formData.keys()) {
				console.log(key, ':', formData.get(key));
			}

			try {
				let result = await axios.post('/node/rsphotos', formData);
				console.log(result);
				if (result.status === 200 && result.data.success) {
					Swal.fire({
						title: '등록 성공',
						icon: 'success',
						confirmButtonText: 'OK',
					});
					this.$router.push({ path: '/seller/rslist' });
				}
			} catch (error) {
				console.error(error);
				Swal.fire({
					title: '등록 실패',
					icon: 'error',
					confirmButtonText: 'OK',
				});
			}
		},
	},
};
</script>

<style scoped>
.registration-form {
	max-width: 400px; /* Adjusted maximum width */
	margin: 0 auto;
	padding: 20px;
	background-color: #f8f9fa;
	border: 1px solid #ced4da;
	border-radius: 8px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h3 {
	font-size: 1.5em;
	color: #007bff;
}

label {
	margin-top: 10px;
	font-weight: bold;
}

input,
textarea,
select {
	width: 100%;
	padding: 10px; /* Adjusted padding for inputs */
	margin-bottom: 10px;
	border: 1px solid #ced4da;
	border-radius: 4px;
	box-sizing: border-box;
}

button {
	background-color: #007bff;
	color: #fff;
	padding: 10px; /* Adjusted padding for the button */
	border: none;
	border-radius: 4px;
	cursor: pointer;
}

button:hover {
	background-color: #0056b3;
}

.file-input {
	margin-bottom: 10px;
}

.checkbox-group {
	margin-bottom: 10px;
}

.checkbox-group label {
	display: block;
	margin-right: 10px;
}

.hours-checkbox {
	display: flex;
	align-items: center;
	margin-bottom: 8px;
}

.hours-checkbox input {
	margin-right: 6px;
	transform: scale(1.2);
}

textarea {
	resize: vertical;
}

@media (max-width: 768px) {
	input,
	textarea,
	select {
		width: 100%;
	}
}
</style>
