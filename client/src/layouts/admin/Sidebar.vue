<!-- eslint-disable vue/multi-word-component-names -->

<template>
	<div id="layoutSidenav_nav">
		<nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
			<div class="sb-sidenav-menu">
				<div class="nav">
					<div class="sb-sidenav-menu-heading">view</div>
					<a class="nav-link" href="#">
						<div class="sb-nav-link-icon">
							<i class="fas fa-tachometer-alt"></i>
						</div>
						Dashboard
					</a>

					<div class="sb-sidenav-menu-heading">menu</div>

					<a class="nav-link" href="#">
						<div class="sb-nav-link-icon">
							<i class="fas fa-table"></i>
						</div>
						Restaurant
					</a>
					<a class="nav-link" href="#">
						<div class="sb-nav-link-icon">
							<i class="fas fa-table"></i>
						</div>
						Member
					</a>

					<div
						class="collapse"
						id="collapseLayouts"
						aria-labelledby="headingOne"
						data-bs-parent="#sidenavAccordion"
					>
						<nav class="sb-sidenav-menu-nested nav">
							<a class="nav-link" href="#">Coupon Get Member</a>
							<a class="nav-link" href="#">Give Coupon</a>
						</nav>
					</div>
					<a class="nav-link" href="#">
						<div class="sb-nav-link-icon">
							<i class="fas fa-table"></i>
						</div>
						Board
					</a>
				</div>
			</div>
		</nav>
	</div>
</template>
