<template>
	<div class="container">
		<br />
		<h4 style="font-family: JalnanGothic; margin-bottom: 40px">REVIEW</h4>
		<br />
		<br />
		<table class="table table-hover" style="margin-bottom: 0px">
			<tbody>
				<tr>
					<th>제목</th>
					<td>{{ reviewInfo.title }}</td>
					<th>작성자</th>
					<td>{{ reviewInfo.writer }}</td>
					<th>작성일자</th>
					<td>{{ getDateFormat(reviewInfo.write_date) }}</td>
				</tr>
				<tr>
					<th>맛</th>
					<td>
						<div class="rate">
							<span
								:style="{
									width: taste + '%',
								}"
							></span>
						</div>
					</td>
					<th>가격</th>
					<td>
						<div class="rate">
							<span
								:style="{
									width: price + '%',
								}"
							></span>
						</div>
					</td>
					<th>서비스</th>
					<td>
						<div class="rate">
							<span
								:style="{
									width: service + '%',
								}"
							></span>
						</div>
					</td>
				</tr>
				<tr>
					<th>방문일자</th>
					<td colspan="2">{{ reviewInfo.yday }}</td>
					<th>업체명</th>
					<td colspan="2">{{ reviewInfo.rs_name }}</td>
				</tr>
			</tbody>
		</table>
		<table class="table table-hover">
			<div>
				<td id="content">{{ reviewInfo.content }}</td>
			</div>
			<tr v-for="img in imgInfo" :key="img.commu_code">
				<!-- <td colspan="2">
            <pre>{{ img.img_name }}</pre>
          </td> -->
				<td colspan="6" id="img">
					<img :src="`/node/public/uploads/${img.img_name}`" width="600px" height="500px" />
				</td>
			</tr>
		</table>
		<div id="btn">
			<button type="button" class="btn btn-outline-secondary" @click="BoardReviewList()">목록으로</button>
		</div>
		<button
			class="btn btn-dark rounded-pill px-3"
			style="
				border-radius: 30%;
				text-align: center;
				vertical-align: top;
				width: 100px;
				height: 50px;
				position: fixed;
				bottom: 80px;
				right: 80px;
				font-size: 20px;
			"
			@click="scrollToTop()"
		>
			Top
		</button>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	data() {
		return {
			searchNo: '',
			userId: window.localStorage.getItem('userId'),
			reviewInfo: {},
			imgInfo: [],
		};
	},
	computed: {
		taste() {
			const score = +this.reviewInfo.star_taste * 20;
			return score;
		},
		price() {
			const score1 = +this.reviewInfo.star_price * 20;
			return score1;
		},
		service() {
			const score2 = +this.reviewInfo.star_service * 20;
			return score2;
		},
	},
	created() {
		this.searchNo = this.$route.query.reCode;
		this.boardReviewInfo();
		this.getimgInfo();
	},
	methods: {
		async boardReviewInfo() {
			console.log('seachNo', this.searchNo);
			let result = await axios.get(`/node/reviewinfo/${this.searchNo}`).catch((err) => console.log(err));
			console.log(result);

			this.reviewInfo = result.data;
		},
		async getimgInfo() {
			let result = await axios.get(`/node/reviewimg/${this.searchNo}`).catch((err) => console.log(err));
			this.imgInfo = result.data;
			console.log(this.imgInfo);
		},
		getDateFormat(date) {
			return this.$dateFormat(date);
		},
		async BoardReviewList() {
			this.$router.push({ path: '/review' });
		},
		/*     getStarClasses(rating) {
      const fullStars = Math.floor(rating);
      const starClasses = Array(fullStars).fill("bi-star-fill");
      const remainingStars = 5 - starClasses.length;
      starClasses.push(...Array(remainingStars).fill("bi-star"));
      return starClasses;
    }, */
		scrollToTop() {
			window.scrollTo({ top: 0, behavior: 'smooth' });
		},
	},
};
</script>

<style scoped>
div {
	font-family: 'NEXON Lv1 Gothic OTF';
}
.container {
	margin-top: 120px;
}
#btn {
	text-align: center;
	margin-bottom: 20px;
}
#content {
	height: 200px;
}
button {
	margin-right: 5px;
	text-align: center;
}
#img {
	text-align: center;
}
.star-rating {
	display: flex;
	justify-content: center;
	align-items: center;
}
.bi-star-fill,
.bi-star-half,
.bi-star {
	font-size: 1.2em;
	color: gold;
}
.rate {
	background: url(https://aldo814.github.io/jobcloud/html/images/user/star_bg02.png) no-repeat;
	width: 121px;
	height: 20px;
	position: relative;
}
.rate span {
	position: absolute;
	background: url(https://aldo814.github.io/jobcloud/html/images/user/star02.png);
	width: auto;
	height: 20px;
}
</style>
