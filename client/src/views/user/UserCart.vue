<template>
	<div class="container">
		<div class="delBox">
			<button class="btn btn-outline-dark mt-auto">예약 전체 비우기</button>
		</div>
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
					<td><button class="btn btn-success">결제</button></td>
					<td><button class="btn btn-outline-warning">삭제</button></td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
<script>
import axios from 'axios';

export default {
	data() {
		return {
			cartList: [],
		};
	},
	created() {
		this.getCartList();
	},
	methods: {
		async getCartList() {
			this.cartList = (await axios.get('/node/cart').catch((err) => console.log(err))).data;
		},
		getDateFormat(date) {
			return this.$dateFormat(date);
		},
	},
};
</script>
<style scoped>
table * {
	text-align: center;
}
td {
	line-height: 37px;
}
.delBox {
	margin-bottom: 15px;
	text-align: right;
}
</style>
