<template>
  <div class="container">
    <div style="margin-left: 30px; margin-right: 50px; margin-top: 30px">
      <table class="table">
        <h5 style="margin: auto; margin-bottom: 30px; width: 150%">
          회원 상세 조회
        </h5>
        <tr>
          <th>아이디</th>
          <td class="text-center">{{ UserInfo.user_id }}</td>
        </tr>
        <tr>
          <th>이름</th>
          <td class="text-center">{{ UserInfo.user_name }}</td>
        </tr>
        <tr>
          <th>닉네임</th>
          <td class="text-center">{{ UserInfo.nickname }}</td>
        </tr>
        <tr>
          <th>등급</th>
          <td class="text-center">{{ UserInfo.grade }}</td>
        </tr>
        <tr>
          <th>전화번호</th>
          <td class="text-center">{{ UserInfo.phone }}</td>
        </tr>
        <tr>
          <th>프로필사진</th>
          <img
            style="display: block; margin: 0 auto"
            :src="`/node/public/userimg/${UserInfo.profile}`"
            width="30%"
          />
        </tr>
        <tr>
          <th>성별</th>
          <td class="text-center">{{ UserInfo.gender }}</td>
        </tr>
        <tr>
          <th>생년월일</th>
          <td>{{ $dateFormat(UserInfo.birthday, "yyyy-MM-dd") }}</td>
        </tr>
        <tr>
          <th>가입일자</th>
          <td>{{ $dateFormat(UserInfo.join_date, "yyyy-MM-dd") }}</td>
        </tr>
        <tr>
          <th>회원상태</th>
          <td class="text-center">{{ UserInfo.user_status }}</td>
        </tr>
        <tr>
          <th>예약횟수</th>
          <td class="text-center">{{ UserInfo.reserve_cnt }}</td>
        </tr>
      </table>
      <button
        class="btn btn-secondary"
        style="margin-left: 50%"
        type="button"
        @click="this.$router.go(-1)"
      >
        목록으로
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      searchNo: "",
      UserInfo: {},
    };
  },

  created() {
    this.searchNo = this.$route.query.No;
    console.log(this.searchNo);
    this.getUserInfo();
  },

  methods: {
    async getUserInfo() {
      let result = await axios
        .get(`/node/adminGetUserInfo/${this.searchNo}`)
        .catch((err) => console.log(err));
      console.log(result);
      this.UserInfo = result.data;
    },
  },
}; //export
</script>
<style scoped>
td {
  text-align: center;
}

<style scoped > .container {
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
