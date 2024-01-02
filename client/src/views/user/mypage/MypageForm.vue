<template>
    <div>
        <div class="container">
            <br/><br/>
            <h1 style="font-weight:bold; text-align:center; color:LightSlateGray; font-family:serif;"> My Page </h1>
            <hr>
            <div style=" box-sizing:border-box; height:500px; margin-top:5%">
                <!-- 프로필 -->
                {{this.userInfoList.profile}}
                <div style="width:25%; height:450px; float:left; background-color:#e4e5e6; border-radius: 10%;
                            margin-right:10%; text-align:center;">
                    <div style="height:50%;">
                        <!--사진 있으면 넣고 아니면 기본사진-->
                        <img v-if="this.this.userInfoList.profile != null" style="width:200px; height:200px; margin-top:10%; border-radius: 50%;" src="../../../../../server/img/uploads"{{this.userInfoList.profile}}/>
                        <img v-else style="width:200px; height:200px; margin-top:10%; border-radius: 50%;" src="../../../assets/images/userImage.jpg"/>
                    </div>
                    <div>
                        <br/>
                        <h3>[ {{this.userInfoList.nickname}} ]</h3>
                        <p style="font-weight:bold; margin-top:10px;">{{this.userInfoList.grade}} {{this.userInfoList.user_name}}님</p>
                        <a style="font-size: 17px; text-decoration-line: none; color:black;">팔로워 명 </a>/
                        <a style="font-size: 17px; text-decoration-line: none; color:black;"> 팔로잉 명</a>
                        <br/>
                        <br/>
                        <button class="btn btn-secondary rounded-pill px-3" style="margin-right:15px;">회원수정</button>
                        <button class="btn btn-dark rounded-pill px-3" >회원삭제</button>
                    </div>
                </div>

                <!-- 나의쿠폰 -->
                <div style="width:65%; height:450px; float:right; justify-content: flex-end; text-align:center;">
                    <h2 style="margin-top:5%; font-weight:bold">나의 쿠폰</h2>
                    <br/>
                    <br/>
                    <button class="btn btn-primary" style="margin-right:15px;">사용가능쿠폰</button>
                    <button class="btn btn-outline-secondary" >사용완료쿠폰</button>
                    <br/>
                    <br/>
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>쿠폰코드</th>
                                <th>할인율</th>
                                <th>사용기한</th>
                                <th>쿠폰상태</th>
                                <th>사용내역(결제번호)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr :key="i" v-for="(coupon, i) in mycouponList" >
                                <td>{{}}</td>
                                <td>{{}}</td>
                                <td>{{}}</td>
                                <td>{{}}</td>
                                <td>{{}}</td>
                                <td @click="">{{}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                
            </div>

            <!-- 결제내역 -->
            <div style="width:100%; float:left;">
                <h2 style="font-weight:bold; padding-left:5%;">결제 내역</h2>
                <br/>
                <br/>
                <table class="table table-hover" style=" text-align:center;">
                        <thead>
                            <tr>
                                <th>카테고리</th>
                                <th>가게이름</th>
                                <th>장소</th>
                                <th>전화번호</th>
                                <th>좌석 수</th>
                                <th>예약날짜</th>
                                <th>예약상태</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr :key="i" v-for="(coupon, i) in mycouponList" >
                                <td>{{}}</td>
                                <td>{{}}</td>
                                <td>{{}}</td>
                                <td>{{}}</td>
                                <td>{{}}</td>
                                <td>{{}}</td>
                                <td>{{}}</td>
                                <td @click="">{{}}</td>
                            </tr>
                        </tbody>
                </table>
            </div>
        </div>
    </div>



    
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return{
            userInfoList :[],
            userCouponList :[],
            userPaymentHistory : [],
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