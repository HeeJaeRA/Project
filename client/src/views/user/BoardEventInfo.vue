<template>
  <div>
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>글번호</th>
                    <td>{{ eventInfo.event_code }}</td>
                    <th>작성일자</th>
                    <td>{{ eventInfo.write_date }}</td>
                </tr>
                <tr>
                    <th>제목</th>
                    <td>{{ eventInfo.title }}</td>
                    <th>작성자</th>
                    <td>{{ eventInfo.writer }}</td>
                    <th>이벤트 시작일</th>
                    <td>{{ eventInfo.eventstart_date }}</td>
                    <th>이벤트 종료일</th>
                    <td>{{ eventInfo.eventend_date }}</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{ eventInfo.content }}</td>
                    <td>내용</td>
                    <td>내용</td>
                </tr>
                <tr>
                    <button type="button" @click="InsertCoupon()">쿠폰발급</button>
                </tr>
            </tbody>
        </table>
        <div>
            <button type="button" @click="BoardEventList()">목록으로</button>
        </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from "sweetalert2";

export default {
    data() {
        return {
            searchNo: '',
            eventInfo: {},
            couponInfo: {
                user_id: "",
                coupon_code: "",
                coupon_status: "사용가능",
                using_date: null
            },
            userId : window.localStorage.getItem('userId')
        };
    },
    created() {
        this.searchNo = this.$route.query.eventCode;
        this.boardEventInfo();
    },
    methods: {
        async boardEventInfo() {
           let result = await axios.get(`/node/userevent/${this.searchNo}`)
                                   .catch(err => console.log(err));
           this.eventInfo = result.data;           
        },
        getDateFormat(date) {
            return this.$dateFormat(date);
        },
        async BoardEventList() {
            this.$router.push({path : '/userevent'});
        },
        async InsertCoupon() {
            let info = this.getInfo();
            let result = await axios(info);
            console.log(result.status);
            if(result.data.affectedRows > 0) {
                Swal.fire({
                    icon: "success",
                    title: "정상 처리",
                    text: "정상적으로 처리되었습니다.",
                 });
            } else if(result.request.status == 500) {
                Swal.fire({
                    icon: "error",
                    title: "처리 실패",
                    text: "이미 발급받은 쿠폰입니다.",
                });
            }
            else {
                Swal.fire({
                    icon: "error",
                    title: "처리 실패",
                    text: "정상적으로 처리되지 않았습니다.",
                });
            }
        },
        getInfo() {
            let method = '';
            let url = '';
            let data = null;

            method = 'post';
            url = `node/userevent`;
            let info = this.couponInfo;
            this.couponInfo.user_id = this.userId;
            this.couponInfo.coupon_code = this.eventInfo.coupon_code;
            console.log(info);
            data = { param : this.couponInfo};
            this.$router.push({path : `/userevent`});
            
            return {
                method,
                data,
                url
            }
        }
    }
}
</script>

<style>

</style>