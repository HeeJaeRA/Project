<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div id="layoutSidenav">
    <div id="layoutSidenav_nav">
      <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
        <div class="sb-sidenav-menu">
          <div class="nav">
            <div class="sb-sidenav-menu-heading">Core</div>
            <router-link to="/admin/home">
              <a class="nav-link" href="#">
                <div class="sb-nav-link-icon">
                  <i class="fas fa-tachometer-alt"></i>
                </div>
                Dashboard
              </a>
            </router-link>
            <div class="sb-sidenav-menu-heading">Interface</div>
            <!-- <a
              class="nav-link collapsed"
              href="#"
              data-bs-toggle="collapse"
              data-bs-target="#collapseLayouts"
              aria-expanded="false"
              aria-controls="collapseLayouts"
            >
              <div class="sb-nav-link-icon"><i class="fas fa-columns"></i></div>
              Layouts
              <div class="sb-sidenav-collapse-arrow">
                <i class="fas fa-angle-down"></i>
              </div>
            </a> -->
            <!-- <div
              class="collapse"
              id="collapseLayouts"
              aria-labelledby="headingOne"
              data-bs-parent="#sidenavAccordion"
            >
              <nav class="sb-sidenav-menu-nested nav">
                <a class="nav-link" href="#">Static Navigation</a>
                <a class="nav-link" href="#">Light Sidenav</a>
              </nav>
            </div> -->
            <a
              class="nav-link collapsed"
              href="#"
              data-bs-toggle="collapse"
              data-bs-target="#collapsePages"
              aria-expanded="false"
              aria-controls="collapsePages"
            >
              <div class="sb-nav-link-icon">
                <i class="fas fa-book-open"></i>
              </div>
              Management
              <div class="sb-sidenav-collapse-arrow">
                <i class="fas fa-angle-down"></i>
              </div>
            </a>
            <div
              class="collapse"
              id="collapsePages"
              aria-labelledby="headingTwo"
              data-bs-parent="#sidenavAccordion"
            >
              <nav
                class="sb-sidenav-menu-nested nav accordion"
                id="sidenavAccordionPages"
              >
                <a
                  class="nav-link collapsed"
                  href="#"
                  data-bs-toggle="collapse"
                  data-bs-target="#pagesCollapseAuth"
                  aria-expanded="false"
                  aria-controls="pagesCollapseAuth"
                >
                  Seller
                  <div class="sb-sidenav-collapse-arrow">
                    <i class="fas fa-angle-down"></i>
                  </div>
                </a>
                <div
                  class="collapse"
                  id="pagesCollapseAuth"
                  aria-labelledby="headingOne"
                  data-bs-parent="#sidenavAccordionPages"
                >
                  <nav class="sb-sidenav-menu-nested nav">
                    <router-link class="nav-link" to="/admin/manageRs">
                      등록업체관리
                    </router-link>
                    <router-link class="nav-link" to="/admin/sellerList">
                      판매자회원관리
                    </router-link>
                    <router-link
                      class="nav-link"
                      :to="{
                        name: 'noticeList',
                        params: { division: '판매자' },
                      }"
                    >
                      공지사항
                    </router-link>
                    <router-link
                      class="nav-link"
                      :to="{
                        name: 'allQnaList',
                        params: { division: '판매자' },
                      }"
                    >
                      QnA
                    </router-link>
                  </nav>
                </div>
                <a
                  class="nav-link collapsed"
                  href="#"
                  data-bs-toggle="collapse"
                  data-bs-target="#pagesCollapseError"
                  aria-expanded="false"
                  aria-controls="pagesCollapseError"
                >
                  User
                  <div class="sb-sidenav-collapse-arrow">
                    <i class="fas fa-angle-down"></i>
                  </div>
                </a>
                <div
                  class="collapse"
                  id="pagesCollapseError"
                  aria-labelledby="headingOne"
                  data-bs-parent="#sidenavAccordionPages"
                >
                  <nav class="sb-sidenav-menu-nested nav">
                    <router-link class="nav-link" to="/admin/allUserList">
                      일반회원관리
                    </router-link>
                    <router-link class="nav-link" to="/admin/eventList">
                      이벤트관리
                    </router-link>
                    <router-link class="nav-link" to="/admin/couponUser">
                      쿠폰관리
                    </router-link>
                    <router-link
                      class="nav-link"
                      :to="{
                        name: 'noticeList',
                        params: { division: '일반유저' },
                      }"
                    >
                      공지사항
                    </router-link>
                    <router-link
                      class="nav-link"
                      :to="{
                        name: 'allQnaList',
                        params: { division: '일반유저' },
                      }"
                    >
                      QnA
                    </router-link>
                  </nav>
                </div>
              </nav>
            </div>
            <div class="sb-sidenav-menu-heading">Addons</div>
            <router-link to="/admin/chart">
              <a class="nav-link" href="#">
                <div class="sb-nav-link-icon">
                  <i class="fas fa-chart-area"></i>
                </div>
                Charts
              </a>
            </router-link>
            <!-- <router-link to="/admin/table">
              <a class="nav-link" href="#">
                <div class="sb-nav-link-icon"><i class="fas fa-table"></i></div>
                Tables
              </a>
            </router-link> -->
          </div>
        </div>
        <!-- <div class="sb-sidenav-footer">
					<div class="small">Logged in as:</div>
					관리자
				</div> -->
      </nav>
    </div>
    <div id="layoutSidenav_content">
      <main>
        <router-view :key="$route.fullPath" />
      </main>
    </div>
  </div>
</template>
<style scoped>
a {
  text-decoration-line: none;
}
</style>
