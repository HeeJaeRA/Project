<template>
  <div style="width: 95%; margin-left: 3%">
    <br />
    <br />
    <br />
    <h2 style="font-weight: bold; padding-left: 3%">내가 찜한 맛집</h2>
    <br />

    <div
      class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center"
    >
      <div
        v-for="restaurant in paginatedRestaurants"
        :key="restaurant.rs_code"
        class="col mb-5"
      >
        <div class="card h-100">
          <div
            class="badge bg-danger text-white position-absolute"
            style="top: 0.5rem; right: 0.5rem"
          >
            <div class="bi-star-fill"></div>
          </div>
          <!-- <img class="card-img-top" :src="restaurant.image" /> -->
          <img
            class="card-img-top"
            width="250px"
            height="250px"
            :src="`http://localhost:3000/public/restaurant/${restaurant.rs_img}`"
          />
          <div class="card-body p-3">
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

    <div
      style="
        width: 100%;
        height: 50px;
        vertical-align: middle;
        margin-bottom: 20px;
        text-align: center;
      "
    >
      <button
        class="btn btn-outline-primary rounded-circle p-3 lh-1"
        style="width: 50px; height: 50px; margin-right: 10px"
        @click="changePage('prev')"
      >
        ◁
      </button>
      <span class="mx-1">Page {{ currentPage }} | {{ totalPages }}</span>
      <button
        class="btn btn-outline-primary rounded-circle p-3 lh-1"
        style="width: 50px; height: 50px; margin-left: 10px"
        @click="changePage('next')"
      >
        ▷
      </button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      restaurants: [],
      itemsPerPage: 4,
      currentPage: 1,
      totalPages: 0,
    };
  },
  computed: {
    paginatedRestaurants() {
      let startPage = (this.currentPage - 1) * this.itemsPerPage;
      let endPage = startPage + this.itemsPerPage;
      return this.restaurants.slice(startPage, endPage);
    },
  },

  mounted() {
    this.getRestaurantList();
  },

  methods: {
    async getRestaurantList() {
      try {
        const userId = window.localStorage.getItem("userId");
        let response = await axios
          .post("/node/bookmark", { userId })
          .catch((err) => {
            console.log(err);
          });
        this.restaurants = response.data;
        this.totalPages = Math.ceil(
          this.restaurants.length / this.itemsPerPage
        );
      } catch (err) {
        console.log(err);
      } finally {
        this.loading = false;
      }
    },
    moveRsInfo(num) {
      this.$router.push({ path: "/rsinfo", query: { no: num } });
    },
    changePage(action) {
      if (action === "prev" && this.currentPage > 1) {
        this.currentPage--;
        this.getRestaurantList();
      } else if (action === "next" && this.currentPage < this.totalPages) {
        this.currentPage++;
        this.getRestaurantList();
      }
    },
  },
};
</script>
