<template>
  <div class="container">
    <div class="date">
      <h2>날짜 선택하기</h2>
      <input type="date" v-model="valueDate" required :min="minStartDate" />
      <p>날짜 선택 출력 : {{ valueDate }}</p>
    </div>

    <div class="time">
      <h2>시간 선택하기</h2>
      <input type="time" v-model="valueTime" />
      <p>시간 선택 출력 : {{ valueTime }}</p>
    </div>

    <div class="seat">
      <h2>인원 선택하기</h2>
      <div class="count_list">
        <label class="count_seat">
          <input type="radio" name="count_item" value="2" />
          <span>2명</span>
        </label>
        <label class="count_seat">
          <input type="radio" name="count_item" value="3" />
          <span>3명</span>
        </label>
        <label class="count_seat">
          <input type="radio" name="count_item" value="4" />
          <span>4명</span>
        </label>
        <label class="count_seat">
          <input type="radio" name="count_item" value="5" />
          <span>5명</span>
        </label>
        <label class="count_seat">
          <input type="radio" name="count_item" value="6" />
          <span>6명</span>
        </label>
        <label class="count_seat">
          <input type="radio" name="count_item" value="7" />
          <span>7명</span>
        </label>
        <label class="count_seat">
          <input type="radio" name="count_item" value="8" />
          <span>8명</span>
        </label>
      </div>
      <p>인원 선택 출력 : {{ value }}</p>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  data() {
    return {
      valueDate: "",
      valueTime: "",
      value: "",
    };
  },
  computed: {
    minStartDate() {
      return dayjs(this.recruit_endperiod).add(1, "day").format("YYYY-MM-DD");
    },
  },
};
</script>
<style scoped>
p {
  color: #b82b5a;
}
.count_seat input[type="radio"] {
  display: none;
}

.count_seat input[type="radio"] + span {
  display: inline-block;
  padding: 10px 15px;
  margin: 5px;
  border: 1px solid #dfdfdf;
  background-color: #ffffff;
  text-align: center;
  cursor: pointer;
}

.count_seat input[type="radio"]:checked + span {
  background-color: #113a6b;
  color: #ffffff;
}
</style>
