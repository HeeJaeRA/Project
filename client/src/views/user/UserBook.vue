<template>
  <div class="container">
    <div>
      <h2>날짜 선택하기</h2>
      <div class="box">
        <section>
          <p>date (Date Object)</p>
          <date-picker v-model="value1" value-type="date"></date-picker>
          <p>
            <code>v-model = {{ value1 }}</code>
          </p>
        </section>
      </div>
    </div>
    <div>
      <h2>시간 선택하기</h2>
      <div>
        <date-picker
          v-model="value"
          :minute-step="30"
          :hour-options="hours"
          format="HH:mm"
          value-type="format"
          type="time"
          placeholder="HH:mm"
        ></date-picker>
      </div>
    </div>
    <div>
      <h2>인원 선택하기</h2>
      <p>인원은 최대 8명까지 예약 가능합니다.</p>
      <button>1명</button>
      <button>2명</button>
      <button>3명</button>
      <button>4명</button>
      <button>5명</button>
      <button>6명</button>
      <button>7명</button>
      <button>8명</button>
    </div>
    <div>
      <h2>예약 시 확인하기(주의사항)</h2>
      <p>*주의사항... 당일 취소시 수수료 환불 불가...</p>
    </div>
    <div>
      <h2>결제금액 : 원</h2>
    </div>
    <div>
      <button>즉시결제</button>
      <button>예약하기</button>
    </div>
  </div>
</template>

<script>
import DatePicker from "vue3-datepicker";

export default {
  components: {
    DatePicker,
  },
  name: "ValueType",
  data() {
    return {
      value1: "",
    };
  },
};

// import DateTime from "vuejs-datetimepicker";

// export default {
//   components: {
//     DateTime,
//   },
//   name: "ControlOpen",
//   data() {
//     return {
//       value: "",
//       hours: Array.from({ length: 10 }).map((_, i) => i + 8),
//     };
//   },
// };
</script>

<style scoped></style>
