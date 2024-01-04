<template>
     <div style="width:23%; height:450px; float:left; background-color:#e4e5e6; border-radius: 10%;
                             margin-left:3%; text-align:center;">
                    <div style="height:50%;">
                        <!--사진 있으면 넣고 아니면 기본사진-->
                        <img :src="`http://localhost:3000/public/uploads/${userInfoList.profile}`"
                         v-if="this.userInfoList.profile != null && this.userInfoList.profile != ''" 
                         style="width:200px; height:200px; margin-top:10%; border-radius: 50%;"/>
                        <!-- 기본사진 -->
                        <img v-else style="width:200px; height:200px; margin-top:10%; border-radius: 50%;" src="../../../assets/images/userImage.jpg"/>
                    </div>
                    <div>
                        <br/>
                        <h3>[ {{userInfoList.nickname}} ]</h3>
                        <p style="font-weight:bold; margin-top:10px;">{{userInfoList.grade}} {{userInfoList.user_name}}님</p>
                        <a style="font-size: 17px; text-decoration-line: none; color:black;">팔로워 명 </a>/
                        <a style="font-size: 17px; text-decoration-line: none; color:black;"> 팔로잉 명</a>
                        <br/>
                        <br/>
                        <button class="btn btn-secondary rounded-pill px-3" style="margin-right:15px;" @click="$router.push('/join')">회원수정</button>
                        <button class="btn btn-dark rounded-pill px-3" >회원삭제</button>
                    </div>
                </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return{
            userInfoList :[],
        }
    },

    created(){
    this.getUserInfo();
    },

    methods : {
        async getUserInfo(){
            const userId = window.localStorage.getItem('userId');
            console.log("현재 세션에 담긴 아이디 userId =", userId)
            this.userInfoList = (await axios.post('/node/getuserinfo', {userId})
                                .catch(err=>{console.log(err)})).data[0];
            console.log("받은유저 정보 전체 =",this.userInfoList);
        }
    }
}



</script>