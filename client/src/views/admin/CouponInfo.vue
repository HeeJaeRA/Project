<template>
  <div class="container" style="margin: 0 auto">
    <div style="margin-left: 30px; margin-right: 50px; margin-top: 30px">
      <table class="table">
        <h5 style="margin: auto; margin-bottom: 30px">쿠폰 정보</h5>
        <tr>
          <th>쿠폰명</th>
          <td class="text-center">
            {{ couponInfo.coupon_name }}
          </td>
        </tr>

        <tr>
          <th>할인율</th>
          <td class="text-center">
            {{ couponInfo.discount_rate }}
          </td>
        </tr>

        <tr>
          <th>쿠폰시작일</th>
          <td class="text-center">
            {{ $dateFormat(couponInfo.start_date, "yyyy-MM-dd") }}
          </td>
        </tr>

        <tr>
          <th>쿠폰종료일</th>
          <td class="text-center">
            {{ $dateFormat(couponInfo.end_date, "yyyy-MM-dd") }}
          </td>
        </tr>

        <tr>
          <th>발급여부</th>
          <td class="text-center">
            {{ this.couponCheck }}
          </td>
        </tr>
      </table>

      <div style="text-align: center">
        <button
          class="btn btn-primary"
          style="margin-right: 5px"
          @click="updateInfo(couponInfo.coupon_code)"
        >
          수정
        </button>
        <button
          class="btn btn-warning text-white"
          style=" 20px; margin-right: 5px"
          v-if="this.couponCheck == '미발급'"
          @click="confirmdelete()"
        >
          삭제
        </button>
        <button
          class="btn btn-secondary"
          type="button"
          @click="this.$router.go(-1)"
        >
          목록으로
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      searchNo: "",
      couponInfo: {},
      couponCheck: "",
    };
  },

  created() {
    this.searchNo = this.$route.query.No;
    this.getCouponInfo();
    this.Check();
  },

  methods: {
    async Check() {
      let result = await axios
        .get(`/node/couponCheck/${this.searchNo}`)
        .catch((err) => console.log(err));
      //console.log(result.data.cnt);
      if (result.data.cnt > 0) {
        this.couponCheck = "발급완료";
      } else {
        this.couponCheck = "미발급";
      }
    },

    async getCouponInfo() {
      let result = await axios
        .get(`/node/admincoupon/${this.searchNo}`)
        .catch((err) => console.log(err));
      // console.log(result);
      this.couponInfo = result.data;
    },

    updateInfo(no) {
      this.$router.push({ path: "/admin/couponModify", query: { No: no } });
    },

    confirmdelete() {
      Swal.fire({
        title: "정말로 삭제하시겠습니까?",
        text: "삭제한 쿠폰은 다시 복구가 불가합니다.",
        icon: "warning",

        showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
        confirmButtonColor: "#3085d6", // confrim 버튼 색깔 지정
        cancelButtonColor: "#d33", // cancel 버튼 색깔 지정
        confirmButtonText: "승인", // confirm 버튼 텍스트 지정
        cancelButtonText: "취소", // cancel 버튼 텍스트 지정
      }).then((result) => {
        // 만약 Promise리턴을 받으면,
        if (result.isConfirmed) {
          // 만약 모달창에서 confirm 버튼을 눌렀다면
          this.deleteInfo();
        }
      });
    },

    async deleteInfo() {
      let result = await axios
        .delete(`/node/admincoupon/${this.searchNo}`)
        .catch((err) => console.log(err));
      console.log(result.data);
      let count = result.data.affectedRows;
      if (count == 0) {
        Swal.fire({
          title: "쿠폰이 삭제되지 않았습니다.",
          icon: "error",
        });
      } else {
        Swal.fire({
          title: "쿠폰이 삭제되었습니다.",
          icon: "success",
        });
        this.$router.push({ name: "couponList" });
      }
    },
  }, //메소드
}; //export
</script>
<style scoped>
.container {
  margin-left: 30px;
  margin-right: 50px;
  margin-top: 30px;
}

.form-container {
  margin-top: 30px;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}

th {
  width: 20%;
  background-color: #f2f2f2;
}

select {
  width: 100%;
  padding: 10px;
  font-family: inherit;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

input[type="number"],
input[type="date"] {
  width: 30%;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 4px;
  text-align: center;
}

input[type="text"],
textarea,
input[type="file"] {
  text-align: center;
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 10px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.textarea {
  resize: none;
}
</style>
