<template>
    <div class="container">
        <div>
            아이디
            <input type="text" id="userId" required="아이디를 입력해주세요" v-model="userInfo.userId">
            비밀번호
            <input type="password" id="userPw" required="비밀번호를 입력해주세요" v-model="userInfo.userPw">
            <button class="btn" @click="login()">로그인하기</button>
        </div>

    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            userInfo :{
                userId : '',
                userPw : ''
            }
        }
    },
    methods: {
        async login(){
            let obj ={
                param :{
                    userId : this.userInfo.userId,
                    userPw : this.userInfo.userPw
                }
            }
            let result = await axios.post("/node/login", obj).catch(err => console.log(err));
            console.log("result : ", result)
            if(result.check == "다맞음"){
                //라우터로 홈으로 보내기
            }
        }
    }
}
</script>



<style scoped>

</style>