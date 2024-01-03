<template>
    <div style="width:95%; margin-left:3%">
                <br/>
                <br/>
                <h2 style="font-weight:bold; padding-left:3%;">예약 내역</h2>
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
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return{
            userReservationHistory : [],
        }
    },

    created(){
    // this.getUserInfo();
    },

    methods : {
        // async getUserInfo(){
        //     const userId = window.localStorage.getItem('userId');
        //     console.log("현재 세션에 담긴 아이디 userId =", userId)
        //     this.userInfoList = (await axios.post('/node/getuserinfo', {userId})
        //                         .catch(err=>{console.log(err)})).data[0];
        //     console.log("받은유저 정보 전체 =",this.userInfoList);
        // }
    }
}
</script>