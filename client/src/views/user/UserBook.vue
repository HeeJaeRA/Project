<template>
	<div class="container">
		<p>{{ userId }}</p>
		<p>{{ restList }}</p>
		<p>{{ '휴무일 출력 ==> ' + restList.holiday }}</p>

		<h4>날짜별로 클릭할 수 있는 달력 페이지</h4>
		<vue-datepicker
			v-model="selectedDate"
			inline
			auto-apply
			:min-date="getMin()"
			:max-date="getMax()"
			:enable-time-picker="false"
			:disabled-week-days="getHoli(restList.holiday)"
			disable-year-select
			@input="onDateSelected"
		></vue-datepicker>

		<div v-if="selectedDate">
			<p>선택한 날짜: {{ formatSelectedDate(selectedDate) }}</p>
			<!-- <p>선택한 년도: {{ splitDate(selectedDate) }}</p> -->
			<p>선택한 년도: {{ year }}</p>
			<p>선택한 월: {{ mon }}</p>
			<p>선택한 일: {{ day }}</p>
		</div>

		<div class="time">
			<h4>시간을 선택해 주세요</h4>
			<!-- <div class="time_pic">
        <button :key="i" v-for="(timeList, i) in timeList">{{ timeList.time + ": 00" }}</button>
        <p>{{ selectTime }}</p>
      </div> -->

			<div class="time_pic2" v-for="(time, i) in timeList" :key="i">
				<label :for="sel" class="time_sel">
					<input type="radio" v-model="selectTime" :value="time" :id="sel" />
					<span>{{ time.time + ' : 00' }}</span>
				</label>
			</div>
			<br />
			<p>시간값 : {{ selectTime.time }}</p>
			<p>시간값 : {{ setTimeSelect }}</p>
		</div>

		<div class="seat">
			<h4>인원 수를 선택해주세요</h4>
			<p>* 최대 인원 수는 8명입니다</p>
			<div class="cnt_list">
				<label class="cnt">
					<input type="radio" v-model="selectSeat" value="1" />
					<span>1명</span>
				</label>
				<label class="cnt">
					<input type="radio" v-model="selectSeat" value="2" />
					<span>2명</span>
				</label>
				<label class="cnt">
					<input type="radio" v-model="selectSeat" value="3" />
					<span>3명</span>
				</label>
				<label class="cnt">
					<input type="radio" v-model="selectSeat" value="4" />
					<span>4명</span>
				</label>
				<label class="cnt">
					<input type="radio" v-model="selectSeat" value="5" />
					<span>5명</span>
				</label>
				<label class="cnt">
					<input type="radio" v-model="selectSeat" value="6" />
					<span>6명</span>
				</label>
				<label class="cnt">
					<input type="radio" v-model="selectSeat" value="7" />
					<span>7명</span>
				</label>
				<label class="cnt">
					<input type="radio" v-model="selectSeat" value="8" />
					<span>8명</span>
				</label>
			</div>
			<p>{{ selectSeat }}</p>
		</div>

		<div class="warning">
			<h4>예약 시 주의사항</h4>
			<p>예약 시 꼭 확인해주세요!</p>
		</div>
		<div class="price">
			<h4>총 결제 금액</h4>
			<!-- <p>{{ "좌석수" + RestList.seat_cnt }}</p> -->
			<h5>총 결제 금액은 {{ getTotal(totalPrice) }}원 입니다.</h5>
		</div>

		<div class="payHow">
			<button class="btn btn-primary" @click="goPay">결제하기</button>
			<button class="btn btn-warning" @click="goCart">장바구니</button>
		</div>
	</div>
</template>

<script>
import VueDatepicker from '@vuepic/vue-datepicker';
import axios from 'axios';

export default {
	components: {
		VueDatepicker,
	},
	data() {
		return {
			userId: window.localStorage.getItem('userId'),
			selectedDate: null,
			year: null,
			mon: null,
			day: null,
			thatHoli: [],
			timeList: [],
			selectTime: '',
			selectSeat: 0,
			totalPrice: 0,
			restList: {
				rs_code: 0,
				seat_cnt: 0,
				holiday: '',
				deposit: 0,
			},
			rno: 111454,
		};
	},
	created() {
		this.getRestList();
		this.getTimeList();
	},
	computed: {
		setTimeSelect() {
			return this.selectTime.time + ':00';
		},
	},
	methods: {
		async getRestList() {
			this.restList = (await axios.get(`/node/book/${this.rno}`).catch((err) => console.log(err))).data;
		},
		async getTimeList() {
			this.timeList = (await axios.get(`/node/book/getTime/${this.rno}`).catch((err) => console.log(err))).data;
		},
		onDateSelected(selectedDate) {
			console.log('Selected Date:', selectedDate);
		},
		formatSelectedDate(date) {
			this.splitDate(date);
			return date ? date.toISOString().split('T')[0] : '';
		},
		splitDate(date) {
			let day = date ? date.toISOString().split('T')[0] : '';
			let realYear = day.split('-')[0];
			let realMon = day.split('-')[1];
			let realDay = day.split('-')[2];

			return (this.year = realYear), (this.mon = realMon), (this.day = realDay);
		},
		getMin() {
			let now = new Date(); // 현재 날짜 및 시간
			let tomorrow = new Date(now.setDate(now.getDate() + 1)); // 내일
			return tomorrow;
		},
		getMax() {
			let now = new Date(); // 현재 날짜 및 시간
			let oneMonthLater = new Date(now.setMonth(now.getMonth() + 2)); // 두달 후
			return oneMonthLater;
		},
		getTotal(data) {
			//   console.log(this.RestList.seat_cnt);
			//   console.log(this.selectSeat);
			data = this.restList.deposit * this.selectSeat;
			console.log(data);
			return (this.totalPrice = data);
		},
		getHoli(holi) {
			let holiholi = holi.split('');
			console.log(holiholi);
			return (this.thatHoli = holiholi);
		},
		async goCart() {
			await axios
				.post('/node/book/goCart', {
					param: {
						reserve_year: this.year,
						reserve_month: this.mon,
						reserve_day: this.day,
						reserve_time: this.setTimeSelect,
						head_cnt: this.selectSeat,
						user_id: this.userId,
						amount: this.totalPrice,
						rs_code: this.rno,
					},
				})
				.catch((err) => console.log(err));
			this.$swal
				.fire({
					title: '예약완료!',
					text: '장바구니로 이동하시겠습니까?',
					icon: 'success',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Yes',
				})
				.then((result) => {
					if (result.isConfirmed) {
						this.$router.push({ path: '/cart' });
					}
				});
			// this.$swal.fire({
			//   icon: "success",
			//   title: "장바구니에 담겼습니다.",
			// });
		},
		async goPay() {
			// this.$swal
			//   .fire({
			//     title: "즉시결제",
			//     text: "결제 하시겠습니까?",
			//     icon: "info",
			//     showCancelButton: true,
			//     confirmButtonColor: "#3085d6",
			//     cancelButtonColor: "#d33",
			//     confirmButtonText: "Yes",
			//   })
			//   .then((result) => {
			//     if (result.isConfirmed) {
			//       this.$router.push({ path: "/cart" });
			//     }
			//   });
			let result = await axios
				.post('/node/book/goCart', {
					param: {
						reserve_year: this.year,
						reserve_month: this.mon,
						reserve_day: this.day,
						reserve_time: this.setTimeSelect,
						head_cnt: this.selectSeat,
						user_id: this.userId,
						amount: this.totalPrice,
						rs_code: this.rno,
					},
				})
				.catch((err) => console.log(err));
			console.log(result.data.insertId);
			this.$router.push({
				path: '/pay',
				query: { resNo: result.data.insertId },
			});
		},
	},
};
</script>
<style scoped>
p {
	color: red;
}
input[type='radio'] {
	display: none;
}
.time_pic2 {
	display: inline-block;
}
.time_pic2 > .time_sel input[type='radio'] + span {
	display: inline-block;
	padding: 10px 15px;
	margin: 5px;
	border: 1px solid #808080;
	border-radius: 5px;
	background-color: #f0f0f0;
	color: gray;
	text-align: center;
	cursor: pointer;
}
.time_pic2 > .time_sel input[type='radio']:checked + span {
	display: inline-block;
	padding: 10px 15px;
	margin: 5px;
	border-radius: 5px;
	border: 1px solid #06703d;
	background-color: #00d06c;
	color: white;
	text-align: center;
	cursor: pointer;
}
.cnt_list > .cnt input[type='radio'] + span {
	display: inline-block;
	padding: 10px 15px;
	margin: 5px;
	border: 1px solid #808080;
	border-radius: 5px;
	background-color: #f0f0f0;
	color: gray;
	text-align: center;
	cursor: pointer;
}
.cnt_list > .cnt input[type='radio']:checked + span {
	display: inline-block;
	padding: 10px 15px;
	margin: 5px;
	border-radius: 5px;
	border: 1px solid #a84c00;
	background-color: #d05e00;
	color: white;
	text-align: center;
	cursor: pointer;
}
.payHow {
	display: flex;
	justify-content: center;
}
</style>
