<template>
    <div class="container">
        <div class="person_res">
            <div class="pay_person">
                <!-- <p>{{ userId }}</p> -->
                <h4>예약자 정보</h4>
                <table class="table table-hover">
                    <tr>
                        <th>이름</th>
                        <td><input type="text" v-model="userInfo.user_name" disabled/></td>
                    </tr>
                    <tr>
                        <th>휴대폰 번호</th>
                        <td><input type="text" v-model="userInfo.phone" disabled/></td>
                    </tr>
                </table>
            </div>
            <div class="in_person">
                <div class="check_info">
                    <h4>방문자 정보</h4>
                    <label class="chek_same"><input type="checkbox" v-model="checked" true-value="yes" false-value="no" @change="checkSame()">예약자와 동일합니다</label>
                </div>
                <table class="table table-hover">
                    <tr>
                        <th>이름</th>
                        <td><input type="text" v-model="u_name"></td>
                    </tr>
                    <tr>
                        <th>휴대폰 번호</th>
                        <td><input type="text" v-model="u_ph"></td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="res_info">
            <h4>예약 상품</h4>
            <table class="table table-hover" id="total_tb">
                <thead>
                    <tr>
                    <th>예약번호</th>
                    <th>업체이름</th>
                    <th>방문날짜</th>
                    <th>방문시간</th>
                    <th>좌석수</th>
                    <th>결제금액</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>{{ resInfo.reserve_num }}</td>
                    <td>{{ resInfo.rs_name }}</td>
                    <td>
                        {{
                        `${resInfo.reserve_year}년 ${resInfo.reserve_month}월 ${resInfo.reserve_day}일`
                        }}
                    </td>
                    <td>{{ resInfo.reserve_time }}</td>
                    <td>{{ resInfo.head_cnt }}</td>
                    <td>{{ resInfo.amount }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="coup_sel">
            <h4>쿠폰선택</h4>
            <table class="table table-hover" id="coup_tb">
                <thead>
                    <tr>
                        <th>쿠폰선택</th>
                        <th>쿠폰코드</th>
                        <th>쿠폰이름</th>
                        <th>할인율</th>
                    </tr>
                </thead>
                <tbody>
                    <tr :key="i" v-for="(coupon, i) in coupList">
                        <td><input type="checkbox"></td>
                        <td>{{ coupon.coupon_code }}</td>
                        <td>{{ coupon.coupon_name }}</td>
                        <td>{{ coupon.discount_rate }} %</td>
                    </tr>
                </tbody>
            </table>
            <button class="btn btn-info" @click="useCoupon()">
                적용하기
            </button>
        </div>
        <div class="amount_info">
            <h6>주문 금액 : {{ resInfo.amount }} 원</h6>
            <h6>할인 금액 : {{ discountAmount }} 원</h6>
            <h4>총 결제 금액 : {{ paymentAmount }} 원</h4>
        </div>
        <div class="pay_what">
            <div class="pay_list">
                <label class="pay">
                    <input type="radio" v-model="selectPay" name="payMethod" value="credit" @change="payMethod" />
                    <span>카드결제</span>
                </label>
                <label class="pay">
                    <input type="radio" v-model="selectPay" name="payMethod" value="kakao" @change="payMethod"/>
                    <span>카카오페이</span>
                </label>
                <label class="pay">
                    <input type="radio" v-model="selectPay" name="payMethod" value="toss" @change="payMethod"/>
                    <span>토스</span>
                </label>
                <p>{{ selectPay }}</p>
                <!-- <label class="pay">
                    <input type="radio" v-model="selectPay" name="payMethod" value="naver" @change="payMethod"/>
                    <span>네이버페이</span>
                </label> -->
            </div>
        </div>
        <div class="payEnd">
            <h6>주문 내용을 확인하였으며, 정보 제공 등에 동의합니다.</h6>
            <button class="payEndBtn" @click="orderPayment()">결제하기</button>
        </div>
        
    </div>

</template>
<script>
import axios from "axios";


var IMP = window.IMP;
IMP.init('imp87557231');

export default {
    data() {
        return {
            userId: window.localStorage.getItem("userId"),
            userInfo: {
                user_name: "",
                phone: ""
            },
            resCode: "",
            resInfo: {},
            coupList: [],
            checked: "no",
            u_name: "",
            u_ph: "",
            couponAmount: 0,
            totalAmount: 0,
            discountAmount: 0,
            paymentAmount: 0,
            selectPay: "",
        }
    },
    created() {
        this.resNo = this.$route.query.resNo;
        this.getUserInfo();
        this.getResInfo();
        this.getCoupList();
    },
    watch: {

    },
    methods: {
        async getUserInfo() {
            let result = await axios
                .get(`/node/pay/userInfo/${this.userId}`)
                .catch((err) => console.log(err));
                this.userInfo = result.data;
        },
        async checkSame() {
            if(this.checked == "yes") {
                this.u_name = this.userInfo.user_name;
                this.u_ph = this.userInfo.phone;
            }else {
                this.u_name = null;
                this.u_ph = null;
            }
        },
        async getResInfo() {
            let result = await axios
            .get(`/node/pay/resInfo/${this.resNo}`)
            .catch((err) => console.log(err));
            this.resInfo = result.data;
        },
        async getCoupList() {
            this.coupList = (
                await axios
                .get(`/node/pay/coupList/${this.userId}`)
                .catch((err) => console.log(err))
            ).data;
        },
        async useCoupon() {

        },
        payMethod: function() {
            if(this.selectPay == 'credit') {
                this.selectPay = 'html5_inicis.INIpayTest';
            }else if(this.selectPay == 'kakao') {
                this.selectPay = 'kakaopay.TC0ONETIME';
            }else {
                this.selectPay = 'tosspay';
            }
            // }else {
            //     this.selectPay = 'naver';
            // }
            console.log('function', this.selectPay);
        },
        async orderPayment() {

            // IMP.request_pay(param, callback) 결제창 호출
            IMP.request_pay({ // param
                pg: this.selectPay,
                pay_method: "card",
                merchant_uid: 'merchant_' + new Date().getTime(),
                name: `${this.resInfo.rs_name} 예약`,
                amount: this.resInfo.amount,
                buyer_email: "",
                buyer_name: this.userInfo.user_name,
                buyer_tel: this.userInfo.phone,
            }, rsp => { // callback
                if (rsp.success) {
                    console.log(rsp.success)
                    console.log(rsp)
                        this.$swal.fire({
                            icon: "success",
                            title: "결제에 성공하였습니다.",
                        });
                    //데이터 insert....
                    //장바구니 update....
                    //쿠폰 update....
                    
                    this.$router.push({ path : '/home' }); 
                } else {
                    console.log("실패");
                    console.log(rsp);
                    this.$swal.fire({
                            icon: "warning",
                            title: "결제에 실패하였습니다.",
                    });
                }
            });

        // this.$swal
        //     .fire({
        //     title: "결제를 하시겠습니까?",
        //     showCancelButton: true,
        //     confirmButtonText: "PAYMENT",
        //     cancelButtonText: "CANCEL",
        //     })
        //     .then(async (result) => {
        //     if (result.isConfirmed) {
        //         await axios.post("/node/pay/orderPayment", {
        //         param: [
        //             this.userId,
        //             this.resCode,
        //             this.coupList.coupon_code,
        //             this.u_name,
        //             this.u_ph,
        //             this.userInfo.user_name,
        //             this.totalAmount,
        //             this.couponAmount,
        //             this.paymentAmount,
        //             this.resCode,
        //         ],
        //         }); // 해당 data들을 파라미터로 보내고, sql orderPayment를 통해 data Insert
        //         this.axios.put("/node/pay/coupUpdate/:ccd", {
        //         param: [this.coupList.coupon_code],
        //         }); // coupon_code를 파라미터로 보내고, sql coupUpdate 통해 data 업데이트
        //         this.$swal.fire("Complete.", "", "success");
        //         this.$router.push({ path: "/" }); // 메인페이지로 라우팅
        //     }
        //     });
        },
    }
}
</script>
<style scoped>
.container {
    margin-bottom: 100px;
}
th, td {
  line-height: 37px;
}
input {
    height: 35px;
}
.pay_person {
    margin-bottom: 40px;
}
.person_res, .res_info, .coup_sel {
    margin-bottom: 80px;
}
.chek_same {
    color: purple;
}
.chek_same > input {
    height: 14px;
}
#total_tb, #coup_tb * {
  text-align: center;
}
.check_info {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.coup_sel > button {
    float: right;
}
.amount_info {
    text-align: center;
    margin-bottom: 50px;
}
.pay_what {
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
}
.pay_list input[type="radio"] {
  display: none;
}
.pay_list > .pay input[type="radio"]:checked + span {
    display: inline-block;
    padding: 10px 15px;
    margin: 5px;
    border: 1px solid #808080;
    border-radius: 5px;
    background-color: #f0f0f0;
    color: gray;
    text-align: center;
    cursor: pointer;
}
.pay_list > .pay:nth-child(1) input[type="radio"]+ span {
    display: inline-block;
    padding: 10px 15px;
    margin: 5px;
    border-radius: 5px;
    border: 1px solid #a84c00;
    background-color: #d05e00;
    color: white;
    text-align: center;
    cursor: pointer;
}
.pay_list > .pay:nth-child(2) input[type="radio"] + span {
    display: inline-block;
    padding: 10px 15px;
    margin: 5px;
    border-radius: 5px;
    border: 1px solid #d3b000;
    background-color: #f0c800;
    color: black;
    text-align: center;
    cursor: pointer;
}
.pay_list > .pay:nth-child(3) input[type="radio"] + span {
    display: inline-block;
    padding: 10px 15px;
    margin: 5px;
    border: 1px solid #0046a9;   
    border-radius: 5px;
    background-color: #006aff;
    color: white;
    text-align: center;
    cursor: pointer;
}
/*
.pay_list > .pay:nth-child(4) input[type="radio"]:checked + span {
    display: inline-block;
    padding: 10px 15px;
    margin: 5px;
    border-radius: 5px;
    border: 1px solid #006407;  
    background-color: #00990a;
    color: white;
    text-align: center;
    cursor: pointer;
}
*/
.pay_list > .pay > input[type="radio"]:hover + span {
  background-color: #252729;
  border: 1px solid #252729;
  color: #ffffff;
}
.payEnd {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.payEnd > .payEndBtn {
    width: 40%;
    height: 50px;
    background-color: #ffa500;
    border: none;
    border-radius: 10px;
}
</style>
