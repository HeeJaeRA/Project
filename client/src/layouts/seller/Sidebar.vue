<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div id="layoutSidenav">
		<div id="layoutSidenav_nav">
			<nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
				<div class="sb-sidenav-menu">
					<div class="nav">
						<div class="sb-sidenav-menu-heading">Core</div>
						<router-link to="/seller/home">
							<a class="nav-link" href="#">
								<div class="sb-nav-link-icon">
									<i class="fas fa-tachometer-alt"></i>
								</div>
								Dashboard
							</a>
						</router-link>
						<div class="sb-sidenav-menu-heading">Interface</div>
						<a
							class="nav-link collapsed"
							href="#"
							data-bs-toggle="collapse"
							data-bs-target="#collapseLayouts"
							aria-expanded="false"
							aria-controls="collapseLayouts"
						>
							<div class="sb-nav-link-icon"><i class="fas fa-columns"></i></div>
							Restaurant
							<div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
						</a>
						<div
							class="collapse"
							id="collapseLayouts"
							aria-labelledby="headingOne"
							data-bs-parent="#sidenavAccordion"
						>
							<nav class="sb-sidenav-menu-nested nav">
								<router-link class="nav-link" to="/seller/rslist">업체관리</router-link>
								<router-link class="nav-link" to="/seller/rvlist">예약내역</router-link>
							</nav>
						</div>
						<a
							class="nav-link collapsed"
							href="#"
							data-bs-toggle="collapse"
							data-bs-target="#collapseLayouts"
							aria-expanded="false"
							aria-controls="collapseLayouts"
						>
							<div class="sb-nav-link-icon"><i class="fas fa-columns"></i></div>
							Board
							<div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
						</a>
						<div
							class="collapse"
							id="collapseLayouts"
							aria-labelledby="headingOne"
							data-bs-parent="#sidenavAccordion"
						>
							<nav class="sb-sidenav-menu-nested nav">
								<router-link class="nav-link" to="/seller/noticelist">Notice</router-link>
								<router-link class="nav-link" to="/seller/qnalist">QnA</router-link>
							</nav>
						</div>
					</div>
				</div>
			</nav>
		</div>
		<div id="layoutSidenav_content">
			<main>
				<router-view />
			</main>
		</div>
	</div>
</template>
<style scoped>
a {
	text-decoration-line: none;
}
main {
	padding: 30px;
}
</style>
