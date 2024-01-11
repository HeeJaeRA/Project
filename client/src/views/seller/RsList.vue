<template>
	<div>
		<h1>업체 전체 목록</h1>
		<br />
		<button
			class="btn btn-secondary my-2 my-sm-0"
			style="margin-right: 5px"
			@click="$router.push({ path: '/seller/rslist' })"
		>
			전체
		</button>
		<button
			class="btn btn-secondary my-2 my-sm-0"
			style="margin-right: 5px"
			@click="$router.push({ path: '/seller/rsolist' })"
		>
			운영중
		</button>
		<button class="btn btn-secondary my-2 my-sm-0" @click="$router.push({ path: '/seller/rswlist' })">
			승인대기중
		</button>
		<br />
		<br />
		<table class="table table-hover">
			<thead>
				<tr>
					<th>카테고리</th>
					<th>이름</th>
					<th>주소</th>
					<th>전화번호</th>
					<th>대표사진</th>
					<th>사업자등록증</th>
					<th>업체상태</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="restaurant in paginatedRestaurants" :key="restaurant.rs_code">
					<td>{{ restaurant.category }}</td>
					<td @click="moveRsInfo(restaurant.rs_code)">{{ restaurant.rs_name }}</td>
					<td>{{ restaurant.address }}</td>
					<td>{{ restaurant.phone }}</td>
					<td data-bs-toggle="modal" data-bs-target="#exampleModal" @click="show_img(restaurant.rs_img)">
						{{ '상세보기' }}
					</td>
					<td
						data-bs-toggle="modal"
						data-bs-target="#exampleModal2"
						@click="show_license(restaurant.license)"
					>
						{{ '상세보기' }}
					</td>
					<td>{{ restaurant.rs_status }}</td>
				</tr>
			</tbody>
		</table>

		<button
			style="margin-top: 10px; background-color: #b0c4de; border-color: #b0c4de"
			class="btn btn-primary"
			@click="goToInsert()"
		>
			등록하기
		</button>

		<div class="pagination-container d-flex justify-content-center align-items-center mt-4">
			<button
				v-if="currentPage > 1"
				class="btn btn-primary mx-1"
				style="color: black; background-color: lightgray; border-color: lightgray"
				@click="changePage('prev')"
			>
				이전
			</button>
			<span class="mx-1">Page {{ currentPage }} / {{ totalPages }}</span>
			<button
				v-if="currentPage < totalPages"
				class="btn btn-primary mx-1"
				style="color: black; background-color: lightgray; border-color: lightgray"
				@click="changePage('next')"
			>
				다음
			</button>
		</div>

		<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="modal-dialog modal-dialog modal-dialog-centered">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalLabel">대표 사진</h5>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body">
						<img :src="`/node/public/restaurant/${rsimg}`" width="100%" />
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
					</div>
				</div>
			</div>
		</div>
		<div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="modal-dialog modal-dialog modal-dialog-centered">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalLabel">사업자 등록증 조회</h5>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body">
						<img :src="`/node/public/restaurant/${licenseimg}`" width="100%" />
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	data() {
		return {
			restaurants: [],
			logId: window.localStorage.getItem('sellerId'),
			itemsPerPage: 8,
			currentPage: 1,
			totalPages: 0,
			rsimg: false,
			licenseimg: false,
		};
	},
	mounted() {
		this.getRestaurantList();
	},
	computed: {
		paginatedRestaurants() {
			let startPage = (this.currentPage - 1) * this.itemsPerPage;
			let endPage = startPage + this.itemsPerPage;
			return this.restaurants.slice(startPage, endPage);
		},
	},
	methods: {
		async getRestaurantList() {
			try {
				let response = await axios.get(`/node/myrestaurants/${this.logId}`);
				this.restaurants = response.data;
				this.totalPages = Math.ceil(this.restaurants.length / this.itemsPerPage);
			} catch (err) {
				console.log(err);
			}
		},
		async modify(rscode) {
			this.$router.push({ path: '/seller/rsupdate', query: { no: rscode } });
		},
		closePop() {
			this.rsimg = false;
			this.licenseimg = false;
		},
		show_img(img) {
			this.rsimg = img;
			this.licenseimg = false;
		},
		show_license(img) {
			this.licenseimg = img;
			this.rsimg = false;
		},
		moveRsInfo(num) {
			this.$router.push({ path: '/seller/rsinfo', query: { no: num } });
		},
		changePage(action) {
			if (action === 'prev' && this.currentPage > 1) {
				this.currentPage--;
				// this.scrollToTop();
				this.getRestaurantList();
			} else if (action === 'next' && this.currentPage < this.totalPages) {
				this.currentPage++;
				// this.scrollToTop();
				this.getRestaurantList();
			}
		},
		scrollToTop() {
			window.scrollTo({ top: 0, behavior: 'smooth' });
		},
		goToInsert() {
			this.$router.push({ path: '/seller/rsinsert' });
		},
	},
};
</script>

<style scoped>
th,
td {
	text-align: center;
}
</style>
