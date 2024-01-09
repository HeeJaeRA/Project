<template>
  <div>
    <Banner ref="bannerComponent" />
    <!-- <button @click="goAdmin()">관리자</button>
    <br />
    <router-link to="/admin/home" @click="logout()">로그아웃</router-link>
    <router-link to="/seller/rslist">판매자</router-link>
    <hr /> -->
    <router-link to="/book">예약</router-link>
    <!-- <hr />
    <router-link to="/reviewInsert">리뷰</router-link> -->

    <!-- 태그태그 섹션 영역 -->
    <section id="tagtag">
      <div class="container px-4 px-lg-5 mt-5">
        <div class="row justify-content-center">
          <div class="col-sm-10 col-md-8 col-lg-4 m-l-r-auto">
            <div class="firstImg">
              <a href="#" class="imgHover">
                <!-- <a href="#" class="tagClick">{{ categories[0].name }}</a> -->
                <img
                  src="../../assets/images/고기.jpg"
                  alt="IMG-BENNER"
                  width="370px"
                  height="478px"
                />
                <div class="tagBox">
                  <a href="#" class="tagClick">Beef</a>
                </div>
              </a>
            </div>
            <div class="secondImg">
              <a href="#" class="imgHover">
                <img
                  src="../../assets/images/주류.jpg"
                  alt="IMG-BENNER"
                  width="370px"
                  height="339px"
                />
                <div class="tagBox2">
                  <a href="#" class="tagClick2">Beer</a>
                </div>
              </a>
            </div>
          </div>
          <div class="col-sm-10 col-md-8 col-lg-4 m-l-r-auto">
            <div class="secondImg">
              <a href="#" class="imgHover">
                <img
                  src="../../assets/images/한식.jpg"
                  alt="IMG-BENNER"
                  width="370px"
                  height="339px"
                />
                <div class="tagBox3">
                  <a href="#" class="tagClick3">Meal</a>
                </div>
              </a>
            </div>
            <div class="firstImg">
              <a href="#" class="imgHover">
                <img
                  src="../../assets/images/회.jpg"
                  alt="IMG-BENNER"
                  width="370px"
                  height="478px"
                />
                <div class="tagBox4">
                  <a href="#" class="tagClick4">Sea Food</a>
                </div>
              </a>
            </div>
          </div>
          <div class="col-sm-10 col-md-8 col-lg-4 m-l-r-auto">
            <div class="firstImg">
              <a href="#" class="imgHover">
                <img
                  src="../../assets/images/디저트.jpg"
                  alt="IMG-BENNER"
                  width="370px"
                  height="478px"
                />
                <div class="tagBox5">
                  <a href="#" class="tagClick5">Dessert</a>
                </div>
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
    <!-- 태그태그 섹션 영역 끝 -->

    <section class="py-5">
      <!-- 태그태그 라우터 해놓은거 참고 -->
      <!-- <div class="container px-4 px-lg-5 mt-5">
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
      </div> -->
      <div v-if="loading" class="text-center">
        <div
          class="spinner-border"
          style="width: 3rem; height: 3rem"
          role="status"
        >
          <span class="sr-only">Loading...</span>
        </div>
      </div>
      <div id="recom" v-else class="container px-4 px-lg-5 mt-5">
        <h2>FEATURED PRODUCTS</h2>
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
                    class="btn btn-dark mt-auto"
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
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
};
</script>
<style scoped>
@font-face {
  font-family: "GmarketSansMedium";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff")
    format("woff");
  font-weight: 700;
  font-style: normal;
}
@font-face {
  font-family: "NEXON Lv1 Gothic OTF";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/NEXON Lv1 Gothic OTF.woff")
    format("woff");
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: "JalnanGothic";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_231029@1.1/JalnanGothic.woff")
    format("woff");
  font-weight: normal;
  font-style: normal;
}
a {
  text-decoration: none;
  color: #000;
}
#recom {
  text-align: center;
  font-family: "NEXON Lv1 Gothic OTF";
}
#recom > h2 {
  margin: 80px 0;
  font-family: "JalnanGothic";
}
.tagBox {
  position: absolute;
  top: 47%;
  left: 26%;
}
.tagClick {
  display: inline-block;
  background-color: #fff;
  color: #383838;
  width: 200px;
  height: 50px;
  text-align: center;
  font-size: 32px;
  font-family: "NEXON Lv1 Gothic OTF";
  line-height: 50px;
}
.tagBox2 {
  position: absolute;
  top: 88%;
  left: 26%;
}
.tagClick2 {
  display: inline-block;
  background-color: #fff;
  color: #383838;
  width: 200px;
  height: 50px;
  text-align: center;
  font-size: 32px;
  font-family: "NEXON Lv1 Gothic OTF";
  line-height: 50px;
}
.tagBox3 {
  position: absolute;
  top: 32%;
  left: 27%;
}
.tagClick3 {
  display: inline-block;
  background-color: #fff;
  color: #383838;
  width: 200px;
  height: 50px;
  text-align: center;
  font-size: 32px;
  font-family: "NEXON Lv1 Gothic OTF";
  line-height: 50px;
}
.tagBox4 {
  position: absolute;
  top: 88%;
  left: 27%;
}
.tagClick4 {
  display: inline-block;
  background-color: #fff;
  color: #383838;
  width: 200px;
  height: 50px;
  text-align: center;
  font-size: 32px;
  font-family: "NEXON Lv1 Gothic OTF";
  line-height: 50px;
}
.tagBox5 {
  position: absolute;
  top: 47%;
  left: 27%;
}
.tagClick5 {
  display: inline-block;
  background-color: #fff;
  color: #383838;
  width: 200px;
  height: 50px;
  text-align: center;
  font-size: 32px;
  font-family: "NEXON Lv1 Gothic OTF";
  line-height: 50px;
}
.tagClick:hover,
.tagClick2:hover,
.tagClick3:hover,
.tagClick4:hover,
.tagClick5:hover {
  background-color: #000;
  color: white;
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
.signUp:hover {
  border-radius: 35px;
  background-color: #6a6a6a;
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
.imgHover {
  position: relative;
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
