<template>
  <div>
    <Banner ref="bannerComponent" />
    <button @click="goAdmin()">관리자</button>
    <br />
    <router-link to="/admin/home" @click="logout()">로그아웃</router-link>
    <router-link to="/seller/rslist">판매자</router-link>
    <hr />
    <router-link to="/book">예약</router-link>
    <hr />
    <router-link to="/reviewInsert">리뷰</router-link>
    <section id="tagtag" class="py-5">
      <div class="container px-4 px-lg-5 mt-5">
        <div class="row justify-content-center">
          <div class="col-sm-10 col-md-8 col-lg-4 m-l-r-auto">
            <div class="firstImg">
              <a href="#" class="imgHover">
                <!-- <a href="#" class="tagClick">{{ categories[0].name }}</a> -->
                <img
                  src="https://picsum.photos/370/478/?image=341"
                  alt="IMG-BENNER"
                />
              </a>
            </div>
            <div class="secondImg">
              <a href="#" class="imgHover">
                <img
                  src="https://picsum.photos/370/339/?image=271"
                  alt="IMG-BENNER"
                />
              </a>
            </div>
          </div>
          <div class="col-sm-10 col-md-8 col-lg-4 m-l-r-auto">
            <div class="secondImg">
              <a href="#" class="imgHover">
                <img
                  src="https://picsum.photos/370/339/?image=695"
                  alt="IMG-BENNER"
                />
              </a>
            </div>
            <div class="firstImg">
              <a href="#" class="imgHover">
                <img
                  src="https://picsum.photos/370/478/?image=803"
                  alt="IMG-BENNER"
                />
              </a>
            </div>
          </div>
          <div class="col-sm-10 col-md-8 col-lg-4 m-l-r-auto">
            <div class="firstImg">
              <a href="#" class="imgHover">
                <img
                  src="https://picsum.photos/370/478/?image=966"
                  alt="IMG-BENNER"
                />
              </a>
            </div>
            <div class="welcome">
              <div class="welcome_info">
                <h2>
                  Sign up <br />
                  get 10% off
                </h2>
                <p>
                  지금 바로 '대다내' 회원이 되어보세요!<br />
                  웰컴 쿠폰과 다양한 혜택이 있습니다
                </p>
                <button class="signUp">SIGN UP</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="py-5">
      <div class="container px-4 px-lg-5 mt-5">
        <div class="row justify-content-center">
          <div
            v-for="category in categories"
            :key="category.name"
            class="col mb-5"
          >
            <div class="btn btn-outline-primary" @click="selectTag(category)">
              {{ category.name }}
            </div>
          </div>
        </div>
      </div>
      <div v-if="loading" class="text-center">
        <div
          class="spinner-border"
          style="width: 3rem; height: 3rem"
          role="status"
        >
          <span class="sr-only">Loading...</span>
        </div>
      </div>
      <div v-else class="container px-4 px-lg-5 mt-5">
        <h3>FEATURED PRODUCTS</h3>
        <div
          class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center"
        >
          <div
            v-for="restaurant in restaurants"
            :key="restaurant.rs_code"
            class="col mb-5"
          >
            <div class="card h-100">
              <div
                class="badge bg-danger text-white position-absolute"
                style="top: 0.5rem; right: 0.5rem"
              >
                hot
              </div>
              <!-- <img class="card-img-top" :src="restaurant.image" /> -->
              <img
                class="card-img-top"
                width="250px"
                height="250px"
                :src="`http://localhost:3000/public/restaurant/${restaurant.rs_img}`"
              />
              <div class="card-body p-4">
                <div class="text-center">
                  <h5 class="fw-bolder">{{ restaurant.rs_name }}</h5>
                  <p>{{ restaurant.category }}</p>
                  <div
                    class="d-flex justify-content-center small text-warning mb-2"
                  >
                    <div class="bi-star-fill"></div>
                    <div class="bi-star-fill"></div>
                    <div class="bi-star-fill"></div>
                    <div class="bi-star-fill"></div>
                    <div class="bi-star-fill"></div>
                  </div>
                  {{ restaurant.rs_desc }}
                </div>
              </div>
              <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                <div class="text-center">
                  <button
                    class="btn btn-warning mt-auto"
                    @click="moveRsInfo(restaurant.rs_code)"
                  >
                    상세보기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";

import Banner from "../../layouts/user/Banner.vue";
export default {
  components: {
    Banner,
  },
  data() {
    return {
      restaurants: [],
      loading: true,
      selectedTag: null,
      categories: [
        { name: "고기" },
        { name: "맥주" },
        { name: "회" },
        { name: "간식" },
        { name: "식사" },
      ],
    };
  },
  mounted() {
    this.getRestaurantList();
    this.startBannerSlider();
  },
  methods: {
    goAdmin() {
      this.$router.push("/admin/home").catch(() => {});
    },
    async getRestaurantList() {
      try {
        let response = await axios.get("/node/rs");
        this.restaurants = response.data;
      } catch (err) {
        console.log(err);
      } finally {
        this.loading = false;
      }
    },
    moveRsInfo(num) {
      this.$router.push({ path: "/rsinfo", query: { no: num } });
    },
    selectTag(category) {
      this.selectedTag = category;
      console.log(this.selectedTag.name);
    },
    startBannerSlider() {
      const bannerComponent = this.$refs.bannerComponent;

      if (bannerComponent) {
        bannerComponent.startSlider();
      }
    },
  },
};
</script>
<style scoped>
a {
  text-decoration: none;
}
.tagClick {
  background-color: #000;
  color: #fff;
  width: 150px;
  height: 50px;
  position: relative;
}
.welcome_info {
  margin-top: 40px;
}
.welcome_info > h2 {
  font-size: 38px;
  margin-bottom: 15px;
}
.welcome_info > p {
  color: #808080;
  margin-bottom: 25px;
}
.signUp {
  border-radius: 35px;
  background-color: #000;
  color: white;
  padding: 10px;
  width: 200px;
  border: none;
}
.firstImg {
  width: 370px;
  height: 478px;
  margin: 30px auto;
  overflow: hidden;
}
.secondImg,
.welcome {
  width: 370px;
  height: 339px;
  margin: 30px auto;
  overflow: hidden;
  text-align: center;
}

.imgHover > img {
  transition: all 0.2s linear;
}
.imgHover:hover > img {
  transform: scale(1.4);
}

/* .firstImg {
	width: 370px;
	height: 478px;
}*/
</style>
