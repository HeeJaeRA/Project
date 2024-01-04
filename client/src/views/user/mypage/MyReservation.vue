<template>
    <div style="width:95%; margin-left:3%">
                <br/>
                <br/>
                <h2 style="font-weight:bold; padding-left:3%;">결제 내역</h2>
                <br/>
                <br/>
                <table class="table table-hover" style=" text-align:center;">
                        <thead>
                            <tr>
                                <th>예약번호</th>
                                <th>카테고리</th>
                                <th>가게이름</th>
                                <th>장소</th>
                                <th>전화번호</th>
                                <th>좌석 수</th>
                                <th>예약날짜</th>
                                <th>예약시간</th>
                                <th>예약상태</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr @click="" :key="i" v-for="(reserve, i) in myReservationList">
                                <td>{{reserve.reserve_num}}</td>
                                <td>{{reserve.category}}</td>
                                <td>{{reserve.rs_name}}</td>
                                <td>{{reserve.address}}</td>
                                <td>{{reserve.phone}}</td>
                                <td>{{reserve.head_cnt}}</td>
                                <td>{{reserve.reserve_date}}</td>
                                <td>{{reserve.reserve_time}}</td>
                                <td>{{reserve.payment_status}}</td>
                                <td v-if="reserve.payment_status == '방문확정' && reserve.review_code != null">
                                    <button class="btn btn-warning rounded-pill px-3" disabled>
                                        리뷰작성완료
                                    </button>
                                </td>
                                <td v-if="reserve.payment_status == '방문확정' && reserve.review_code == null">
                                    <button class="btn btn-warning rounded-pill px-3">
                                        리뷰작성
                                    </button>
                                </td>
                                <td v-if="reserve.payment_status == '결제완료'">
                                    <button @click="cancelPayment(reserve.reserve_num)" class="btn btn-danger rounded-pill px-3">
                                        취소하기
                                    </button>
                                </td>
                                <td v-else>
                                    
                                </td>
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
            myReservationList : [],
        }
    },

    created(){
    this.userReservationList();
    },

    methods : {
        async userReservationList(){
            const userId = window.localStorage.getItem('userId');
            this.myReservationList = (await axios.post('/node/reservationList', {userId})
                                .catch(err=>{console.log(err)})).data;
            console.log("예약내역 정보 전체 =",this.myReservationList);
        },

        cancelPayment(reservenum){
            const userId = window.localStorage.getItem('userId');
            let data = [userId ,reservenum]
            let result = axios.post('node/cancelpayment', data )
                                .catch(err=>{console.log(err)});
            this.userReservationList();
        }
    }
}
</script>

<style scoped>
td{
    vertical-align: middle;
}
</style>