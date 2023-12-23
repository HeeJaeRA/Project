<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div>
		<nav class="navbar navbar-expand-lg" style="background-color: orange">
			<div class="container-fluid">
				<a class="navbar-brand" href="#"><img src="../../assets/images/logo.png" /></a>

				<!-- <form class="d-flex" action="#" method="POST">
					<input
						style="width: 800px"
						class="form-control me-sm-2"
						type="search"
						placeholder="Search"
						name="word"
					/>
					<button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
				</form> -->

				<div>
					<!-- <button class="btn">
						<i class="far fa-user fa-2x"></i>
					</button> -->
					<button class="btn" onclick="#">로그인</button>
					<button class="btn" onclick="#">판매자 로그인</button>
				</div>
			</div>
		</nav>

		<nav class="navbar navbar-expand-lg">
			<div class="container-fluid">
				<div class="collapse navbar-collapse" id="navbarColor04">
					<ul class="navbar-nav me-auto">
						<li class="nav-item"><a class="nav-link" href="#">About</a></li>
						<li class="nav-item dropdown">
							<a
								class="nav-link dropdown-toggle"
								id="navbarDropdown"
								href="#"
								role="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
								>Board</a
							>
							<ul class="dropdown-menu" aria-labelledby="navbarDropdown">
								<li><a class="dropdown-item" href="#!">Notice</a></li>
								<li><hr class="dropdown-divider" /></li>
								<li><a class="dropdown-item" href="#!">Community</a></li>
								<li><a class="dropdown-item" href="#!">Event</a></li>
							</ul>
						</li>
						<li class="nav-item dropdown">
							<a
								class="nav-link dropdown-toggle"
								id="navbarDropdown"
								href="#"
								role="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
								>Shop</a
							>
							<ul class="dropdown-menu" aria-labelledby="navbarDropdown">
								<li><a class="dropdown-item" href="#!">All Products</a></li>
								<li><hr class="dropdown-divider" /></li>
								<li>
									<a class="dropdown-item" href="#!">지역별</a>
								</li>
								<li><a class="dropdown-item" href="#!">종류별</a></li>
							</ul>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="#" target="_blank">Instagram</a>
						</li>
					</ul>

					<button class="btn">
						<i class="bi-cart-fill me-1"></i>
						Cart
						<span class="badge bg-dark text-white ms-1 rounded-pill">0</span>
					</button>

					<button class="btn btn-outline-info" onclick="location.href='#'">마이페이지</button>
				</div>
			</div>
		</nav>
	</div>
</template>
