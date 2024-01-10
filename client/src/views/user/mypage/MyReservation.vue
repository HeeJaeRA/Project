<template>
	<div style="width: 100%; margin-left: 0%">
		<br />
		<br />
		<h2 style="font-weight: bold; padding-left: 3%">결제 내역</h2>
		<br />
		<br />
		<table class="table table-hover" style="text-align: center">
			<thead>
				<tr>
					<th>예약번호</th>
					<th>카테고리</th>
					<th>가게이름</th>
					<th>장소</th>
					<th>전화번호</th>
					<th>좌석 수</th>
					<th>예약날짜</th>
					<th>예약시간</th>
					<th>예약상태</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr v-if="myReservationList.length == 0">
					<td colspan="10" style="color: gray; text-align: center">아직 결제한 내역이 없습니다.</td>
				</tr>
				<tr :key="i" v-for="(reserve, i) in myReservationList">
					<td>{{ reserve.reserve_num }}</td>
					<td>{{ reserve.category }}</td>
					<td @click="goToRestaurant(reserve.rs_code)" class="a">{{ reserve.rs_name }}</td>
					<td>{{ reserve.address }}</td>
					<td>{{ reserve.phone }}</td>
					<td>{{ reserve.head_cnt }}</td>
					<td>{{ reserve.reserve_date }}</td>
					<td>{{ reserve.reserve_time }}:00</td>
					<td>{{ reserve.payment_status }}</td>
					<td v-if="reserve.payment_status == '방문확정' && reserve.review_code != null">
						<button class="btn btn-warning rounded-pill px-3" style="width: 160px" disabled>
							리뷰작성완료
						</button>
					</td>
					<td v-if="reserve.payment_status == '방문확정' && reserve.review_code == null">
						<button
							class="btn btn-warning rounded-pill px-3"
							style="width: 160px"
							@click="goToReview(reserve.reserve_num)"
						>
							리뷰작성
						</button>
					</td>
					<td v-if="reserve.payment_status == '결제완료'">
						<button
							@click="cancelPayment(reserve.reserve_num)"
							style="width: 160px"
							class="btn btn-danger rounded-pill px-3"
						>
							취소하기
						</button>
					</td>
					<td v-if="reserve.payment_status == '결제취소'"></td>
				</tr>
			</tbody>
		</table>
		<br />
		<Pagination
			v-bind:value="`myReservation`"
			v-bind:col="`user_id`"
			v-bind:colvalue="this.user_id"
			@current="selectPage"
		/>
	</div>
</template>

<script>
import axios from 'axios';
import Pagination from './MyPagination.vue';
export default {
	components: {
		Pagination,
	},
	data() {
		return {
			myReservationList: [],
			user_id: window.localStorage.getItem('userId'),
			current: 1,
		};
	},

	created() {
		this.userReservationList();
	},

	methods: {
		async userReservationList() {
			const userId = window.localStorage.getItem('userId');
			this.myReservationList = (
				await axios.get(`/node/reservationList/${userId}/${this.current}`).catch((err) => {
					console.log(err);
				})
			).data;
			console.log('예약내역 정보 전체 =', this.myReservationList);
		},
		//결제취소하기
		cancelPayment(reservenum) {
			const userId = window.localStorage.getItem('userId');
			let data = [userId, reservenum];
			axios.post('node/cancelpayment', data).catch((err) => {
				console.log(err);
			});
			this.userReservationList();
		},
		//리뷰쓰러 가기
		goToReview(reserve_num) {
			this.$router.push({ name: 'reviewInsert', query: { reserveNum: reserve_num } });
			console.log('reserve_num=', reserve_num);
		},
		//가게정보보러가기
		goToRestaurant(code) {
			this.$router.push({ path: '/rsinfo', query: { no: code } });
		},
		//클릭시 결제내역 페이지 바꾸는 것
		selectPage(selected) {
			this.current = selected;
			console.log('this.current=', this.current);
			this.userReservationList();
		},
	},
};
</script>

<style scoped>
td {
	vertical-align: middle;
}

.a:hover {
	color: #0d6efd;
	cursor: pointer;
}
</style>
