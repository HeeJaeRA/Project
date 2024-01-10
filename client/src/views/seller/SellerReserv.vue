<template>
	<div>
		<h1>전체 예약 현황</h1>
		<br />
		<button
			class="btn btn-secondary my-2 my-sm-0"
			style="margin-right: 5px"
			@click="$router.push({ path: '/seller/rvlist' })"
		>
			예약현황
		</button>
		<button
			class="btn btn-secondary my-2 my-sm-0"
			style="margin-right: 5px"
			@click="$router.push({ path: '/seller/rvalllist' })"
		>
			완료현황
		</button>
		<br />
		<br />
		<table class="table table-hover">
			<thead>
				<tr>
					<th>결제번호</th>
					<th>업체이름</th>
					<th>방문날짜</th>
					<th>방문시간</th>
					<th>좌석수</th>
					<th>총금액</th>
					<th>방문자 이름</th>
					<th>방문자 전화번호</th>
					<th>예약자 이름</th>
					<th>예약자 전화번호</th>
					<th>예약상태</th>
					<th>예약취소</th>
					<th>방문확정</th>
				</tr>
			</thead>
			<tbody>
				<tr :key="i" v-for="(reservation, i) in paginatedRestaurants">
					<!-- <td><input type="checkbox"></td> -->
					<td v-show="false">{{ reservation.rs_code }}</td>
					<td>{{ reservation.payment_code }}</td>
					<td>{{ reservation.rs_name }}</td>
					<td>
						{{
							`${reservation.reserve_year}년 ${reservation.reserve_month}월 ${reservation.reserve_day}일`
						}}
					</td>
					<td>{{ reservation.reserve_time + ': 00' }}</td>
					<td>{{ reservation.head_cnt }}</td>
					<td>{{ reservation.money }}</td>
					<td>{{ reservation.visit_name }}</td>
					<td>{{ reservation.visit_phone }}</td>
					<td>{{ reservation.reserve_name }}</td>
					<td>{{ reservation.reserve_phone }}</td>
					<td>{{ reservation.payment_status }}</td>
					<td>
						<button class="btn btn-outline-warning" @click="delCart(reservation.reserve_num)">취소</button>
					</td>
					<td>
						<button class="btn btn-outline-success" @click="checkVisit(reservation.reserve_num)">
							방문확정
						</button>
					</td>
				</tr>
			</tbody>
		</table>
		<div class="pagination-container d-flex justify-content-center align-items-center mt-4">
			<button v-if="currentPage > 1" class="btn btn-primary mx-1" @click="changePage('prev')">이전</button>
			<span class="mx-1">Page {{ currentPage }} / {{ totalPages }}</span>
			<button v-if="currentPage < totalPages" class="btn btn-primary mx-1" @click="changePage('next')">
				다음
			</button>
		</div>
	</div>
</template>
<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
	data() {
		return {
			cartList: [],
			userId: window.localStorage.getItem('sellerId'),
			itemsPerPage: 10,
			currentPage: 1,
			totalPages: 0,
		};
	},
	created() {
		this.getCartList();
	},
	computed: {
		paginatedRestaurants() {
			let startPage = (this.currentPage - 1) * this.itemsPerPage;
			let endPage = startPage + this.itemsPerPage;
			return this.cartList.slice(startPage, endPage);
		},
	},
	methods: {
		async getCartList() {
			this.cartList = (await axios.get(`/node/myrsreserv/${this.userId}`).catch((err) => console.log(err))).data;
			this.totalPages = Math.ceil(this.cartList.length / this.itemsPerPage);
		},
		getDateFormat(date) {
			return this.$dateFormat(date);
		},
		async goToEachPay(resNo) {
			this.$router.push({ path: '/pay', query: { resNo: resNo } });
		},
		changePage(action) {
			if (action === 'prev' && this.currentPage > 1) {
				this.currentPage--;
				this.scrollToTop();
				this.getCartList();
			} else if (action === 'next' && this.currentPage < this.totalPages) {
				this.currentPage++;
				this.scrollToTop();
				this.getCartList();
			}
		},
		async delCart(num) {
			let result = await axios.put(`/node/cart/${num}`).catch((err) => console.log(err));

			if (result.data.affectedRows > 0) {
				Swal.fire({
					icon: 'success',
					title: '취소되었습니다.',
				});
				this.getCartList();
			} else {
				Swal.fire({
					icon: 'warning',
					title: '취소에 실패하였습니다.',
				});
				this.getCartList();
			}
		},
		async checkVisit(num) {
			let result = await axios.put(`/node/checkCart/${num}`);
			if (result.data.affectedRows > 0) {
				Swal.fire({
					icon: 'success',
					title: '방문 확정 처리되었습니다.',
				});
				this.getCartList();
			} else {
				Swal.fire({
					icon: 'warning',
					title: '처리에 실패하였습니다.',
				});
				this.getCartList();
			}
		},

		scrollToTop() {
			window.scrollTo({ top: 0, behavior: 'smooth' });
		},
	},
};
</script>

<style scoped>
.pagination-container {
	margin-top: 20px;
}

.pagination-container button {
	font-size: 14px;
	padding: 8px 12px;
}
</style>
