<template>
  <div class="container">
    <div style="margin-left: 30px; margin-right: 50px; margin-top: 30px">
      <table class="table">
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
            :src="`http://localhost:3000/public/uploads/${UserInfo.profile}`"
            width="200px"
            height="200px"
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
</style>
