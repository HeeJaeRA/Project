<template>
	<div>
		<h1>전체 예약 현황</h1>
		<table class="table table-hover">
			<thead>
				<tr>
					<th>예약번호</th>
					<th>업체이름</th>
					<th>방문날짜</th>
					<th>방문시간</th>
					<th>좌석수</th>
					<th>총금액</th>
					<th>예약일자</th>
					<th>예약상태</th>
					<th>결제</th>
					<th>삭제</th>
				</tr>
			</thead>
			<tbody>
				<tr :key="i" v-for="(reservation, i) in cartList">
					<!-- <td><input type="checkbox"></td> -->
					<td v-show="false">{{ reservation.rs_code }}</td>
					<td>{{ reservation.reserve_num }}</td>
					<td>{{ reservation.rs_name }}</td>
					<td>
						{{
							`${reservation.reserve_year}년 ${reservation.reserve_month}월 ${reservation.reserve_day}일`
						}}
					</td>
					<td>{{ reservation.reserve_time }}</td>
					<td>{{ reservation.head_cnt }}</td>
					<td>{{ reservation.amount }}</td>
					<td>{{ getDateFormat(reservation.booking_date) }}</td>
					<td>{{ reservation.payment_status }}</td>
					<td>
						<button class="btn btn-outline-warning" @click="delCartEach(reservation)">삭제</button>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
	data() {
		return {
			cartList: [],
			selectList: [],
			userId: window.localStorage.getItem('userId'),
		};
	},
	created() {
		this.getCartList();
	},
	methods: {
		async getCartList() {
			this.cartList = (await axios.get(`/node/cart/${this.userId}`).catch((err) => console.log(err))).data;
		},
		getDateFormat(date) {
			return this.$dateFormat(date);
		},
		async goToEachPay(resNo) {
			this.$router.push({ path: '/pay', query: { resNo: resNo } });
		},
	},
};
</script>
