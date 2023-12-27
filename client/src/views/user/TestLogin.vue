<template>
    <div class="container">
        <div>
            아이디
            <input type="text" id="userId" required="아이디를 입력해주세요" v-model="userInfo.userId">
            비밀번호
            <input type="password" id="userPw" required="비밀번호를 입력해주세요" v-model="userInfo.userPw">
            <button class="btn" @click="login()">로그인하기</button>
            <button class="btn" @click="login()">회원가입</button>
        </div>

    </div>
</template>

<script>
/*1. npm install --save sweetalert2 설치
  2. import Swal from "sweetalert2 시킴
  3. 사용하면 됨*/
import axios from 'axios';
import Swal from "sweetalert2"
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
            console.log("result : ", result.data);

             //로그인 상태별 alert창
            if(result.data.check == "아이디틀림"){
                Swal.fire({
                icon: "warning",
                title: "로그인 실패.",
                text: "존재하지 않는 아이디입니다.",
            });
            }else if(result.data.check == "비번틀림"){
                Swal.fire({
                icon: "warning",
                title: "로그인 실패.",
                text: "존재하지 않는 비밀번호입니다.",
            });
            }else if(result.data.check == "다맞음"){
                await Swal.fire({
                icon: "success",
                title: "로그인 성공.",
                text: "즐거운 이용되시기 바랍니다.",
                
            })
            
            //세션추가
            window.localStorage.removeItem('userId');
			window.localStorage.setItem('userId', result.data.id); //키 값 : userId, 데이터 : user1
			const userId = window.localStorage.getItem('userId');
			console.log("userId = ",userId);

            await this.$router.push('/home');
            this.$router.go(0);
            }
            
            
            
        },
        
       
    }
}
</script>



<style scoped>

</style>