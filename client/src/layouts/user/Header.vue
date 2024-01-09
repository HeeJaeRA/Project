<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div id="nav_fix">
    <nav class="navbar navbar-expand-lg" id="nav_bg">
      <div class="container-fluid">
        <a class="navbar-brand" @click="$router.push('/home')"
          ><img src="../../assets/images/logo.png" width="124px" height="45px"
        /></a>

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
                    <li>
                      <a class="dropdown-item"
                        ><router-link to="/notice">Notice</router-link></a
                      >
                    </li>
                    <li><hr class="dropdown-divider" /></li>
                    <li>
                      <a class="dropdown-item"
                        ><router-link to="/community">Community</router-link></a
                      >
                    </li>
                    <li>
                      <a class="dropdown-item"
                        ><router-link to="/userevent">Event</router-link></a
                      >
                    </li>
                    <li>
                      <a class="dropdown-item"
                        ><router-link to="/review">Review</router-link></a
                      >
                    </li>
                    <li>
                      <a class="dropdown-item"
                        ><router-link to="/qna">Qna</router-link></a
                      >
                    </li>
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
                    <li>
                      <a class="dropdown-item" @click="moveToAll">전체보기</a>
                    </li>
                    <li><hr class="dropdown-divider" /></li>
                    <li>
                      <a class="nav-link" @click="Addrmodal" href="#">지역별</a>
                    </li>
                    <li>
                      <a class="nav-link" @click="Catemodal" href="#">종류별</a>
                    </li>
                  </ul>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#" target="_blank">Instagram</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div>
          <!-- <button class="btn">
						<i class="far fa-user fa-2x"></i>
					</button> -->
          <div>
            <div v-if="session != null">
              <router-link to="/cart"
                ><button class="btn">
                  <img src="../../assets/images/cart.png" alt="장바구니" />
                </button>
              </router-link>

              <button class="btn" @click="$router.push('/mypage')">
                <img src="../../assets/images/mypage.png" alt="마이페이지" />
              </button>

              <button class="log" @click="logout()">logout</button>
            </div>
            <div class="login" v-else>
              <button class="logi" @click="$router.push('/login')">User</button>
              <button class="logi" @click="$router.push('/sellerlogin')">
                Seller
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
  <div class="modal-wrap" v-show="modalCheckA" @click="Addrmodal">
    <div class="modal-container" @click.stop="">
      <button
        type="button"
        class="btn btn-info"
        v-for="(location, index) in locations"
        :key="index"
        @click="moveToAdd(index)"
      >
        {{ location.name }}
      </button>
    </div>
  </div>

  <div class="modal-wrap" v-show="modalCheckC" @click="Catemodal">
    <div class="modal-container" @click.stop="">
      <button
        type="button"
        class="btn btn-success"
        v-for="(category, index) in categories"
        :key="index"
        @click="moveToCate(index)"
      >
        {{ category.name }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modalCheckA: false,
      modalCheckC: false,
      session: localStorage.getItem("userId"),
      locations: [
        { name: "중구" },
        { name: "북구" },
        { name: "서구" },
        { name: "동구" },
        { name: "수성구" },
        { name: "달서구" },
        { name: "달성군" },
        { name: "군위군" },
      ],
      categories: [
        { name: "한식" },
        { name: "중식" },
        { name: "일식" },
        { name: "양식" },
        { name: "포차" },
        { name: "디저트" },
      ],
    };
  },
  methods: {
    Addrmodal() {
      this.modalCheckA = !this.modalCheckA;
    },
    Catemodal() {
      this.modalCheckC = !this.modalCheckC;
    },
    logout() {
      localStorage.clear();
      this.$router.go(0);
    },
    moveToAll() {
      this.$router.push("/rsall").catch(() => {});
    },
    moveToAdd(index) {
      let selectedAdd = this.locations[index];
      console.log("구:", selectedAdd.name);
      this.$router.push({
        path: "/rsadd",
        query: { gu_gun: selectedAdd.name },
      });
      this.Addrmodal();
    },
    moveToCate(index) {
      let selectedCate = this.categories[index];
      console.log("종류:", selectedCate.name);
      this.$router.push({
        path: "/rscate",
        query: { category: selectedCate.name },
      });
      this.Catemodal();
    },
  },
};
</script>

<style scoped>
#nav_fix {
  position: fixed;
  top: 0;
  /* width: 100% */
  left: 0;
  right: 0;
  z-index: 999;
}
.logi {
  color: #808080;
  border: none;
  padding-left: 15;
  box-sizing: border-box;
  background: none;
}
.logi:hover {
  border-bottom: 1px solid #808080;
  padding-left: 15;
  box-sizing: border-box;
}
.login > button {
  margin-left: 5px;
}
.log {
  color: #808080;
  border: none;
  background: none;
}
.log > button {
  background-color: none;
}
.log:hover {
  color: #555555;
}
#nav_bg {
  box-shadow: 0 0 4px #616161;
  background-color: #ffffff;
}
.modal-wrap {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1000;
}
/* modal or popup */
.modal-container {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 550px;
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
}
</style>
