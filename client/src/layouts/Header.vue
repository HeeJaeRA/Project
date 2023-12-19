<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div>
		<nav class="navbar navbar-expand-lg bg-primary" data-bs-theme="primary">
			<div class="container-fluid">
				<a class="navbar-brand" href="restaurantList.do"><img src="../assets/images/logo.png" /></a>

				<!-- <form class="d-flex" action="searchList.do" method="POST">
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
					<button class="btn btn-light" onclick="#">로그인</button>
					<button class="btn btn-light" onclick="#">판매자 로그인</button>
				</div>
			</div>
		</nav>

		<nav class="navbar navbar-expand-lg bg-body-tertiary">
			<div class="container-fluid">
				<div class="collapse navbar-collapse" id="navbarColor04">
					<ul class="navbar-nav me-auto">
						<li class="nav-item"><a class="nav-link" href="aboutBoard.do">About</a></li>
						<li class="nav-item"><a class="nav-link" href="noticeBoard.do">Notice</a></li>
						<li class="nav-item"><a class="nav-link" href="freeBoard.do">Community</a></li>
						<li class="nav-item"><a class="nav-link" href="eventBoard.do">Event</a></li>
						<li class="nav-item">
							<a class="nav-link" href="#" target="_blank">Instagram</a>
						</li>
					</ul>

					<button class="btn btn-outline-info" onclick="location.href='myPage.do'">마이페이지</button>
				</div>
			</div>
		</nav>
	</div>
</template>
