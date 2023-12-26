<template>
	<!-- Product section-->
	<section class="py-5">
		<div class="container px-4 px-lg-5 my-5">
			<div class="row gx-4 gx-lg-5 align-items-center">
				<div class="col-md-6">
					<img class="card-img-top" src="resources/images/rsimg/${vo.image1 }" alt="..." />
					<input type="button" id="imgMain" class="btn btn-light" value="대표사진" />
					<input type="button" id="imgCard1" class="btn btn-light" value="사진1" />
					<input type="button" id="imgCard2" class="btn btn-light" value="사진2" />
				</div>
				<div class="col-md-6">
					<span class="text-muted"> 군 / 구 </span>
					<h1 class="display-5 fw-bolder">가게 이름</h1>
					<div class="fs-5 mb-5">
						<p class="lead">설명</p>
						<span class="text-muted">좋아요 0 명</span>
						<a class="btn btn-success mt-auto" onclick="like()">좋아요</a>
					</div>
					<div id="map" style="width: 100%; height: 350px"></div>
				</div>
				<div style="width: 100%; height: 100px; text-align: center">
					<a class="btn btn-danger mt-auto" href="reservationForm.do?rcode=${vo.rsCode }">예약하기</a>
					&emsp;
					<a class="btn btn-warning mt-auto" id="bookmark" onclick="mark(); this.onclick=null;">찜하기</a>
				</div>
			</div>
		</div>

		<div class="container px-4 px-lg-5 mt-5">
			<h2 class="fw-bolder mb-4">가게 이름 과(와) 비슷한 맛집</h2>
			<input type="button" value="종류별" id="categoryBtn" class="btn btn-light" />
			<input type="button" value="지역별" id="addressBtn" class="btn btn-light" />
		</div>

		<div class="container px-4 px-lg-5 mt-5" id="allDiv" style="display: block">
			<div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
				<div class="col mb-5">
					<div class="card h-100">
						<div class="badge bg-danger text-white position-absolute" style="top: 0.5rem; right: 0.5rem">
							hot
						</div>
						<img class="card-img-top" src="resources/images/rsimg/${vo.image1 }" alt="..." />
						<div class="card-body p-4">
							<div class="text-center">
								<span class="text-muted"> 군 / 구 </span>
								<h5 class="fw-bolder">가게 이름</h5>
								<div class="d-flex justify-content-center small text-warning mb-2">
									<div class="bi-star-fill"></div>
								</div>
								<span class="text-muted">좋아요 0 명</span>
							</div>
						</div>
						<div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
							<div class="text-center">
								<a class="btn btn-outline-dark mt-auto" href="#">상세보기</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	methods: {
		like() {
			alert('좋아여');
		},
	},
};
</script>
