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
                </tr>
                <tr>
                    <th>이벤트 시작일</th>
                    <td>{{ getDateFormat(eventInfo.eventstart_date) }}</td>
                    <th>이벤트 종료일</th>
                    <td>{{ getDateFormat(eventInfo.eventend_date) }}</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{ eventInfo.content }}</td>
                    <td>내용</td>
                    <td>내용</td>
                </tr>
                <tr>
                    <td v-if="eventInfo.eventend_date >= this.getToday()">
                        <button type="button" @click="InsertCoupon()">쿠폰발급</button>
                    </td>
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
                userId: window.localStorage.getItem('userId')
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
                this.eventInfo.eventend_date = this.$dateFormat(this.eventInfo.eventend_date);
                this.eventInfo.start_date = this.$dateFormat(this.eventInfo.eventstart_date);
                console.log(this.eventInfo.eventend_date);
            },
            getDateFormat(date) {
                return this.$dateFormat(date);
            },
            getToday() {
                return this.$dateFormat('', 'yyyy-MM-dd');
            },
            async BoardEventList() {
                this.$router.push({
                    path: '/userevent'
                });
            },
            async InsertCoupon() {
                let info = this.getInfo();
                let result = await axios(info).catch((err => console.log(err)));
                console.log('result', result);
                console.log(this.couponInfo.user_id);
                console.log(this.userId);
                console.log('re', result);
                if(this.userId == null) {
                    Swal.fire({
                        icon: "warning",
                        title: "회원만 발급 가능합니다."
                    }); 
                } else if (result.data.affectedRows > 0) {
                    Swal.fire({
                        icon: "success",
                        title: "쿠폰 정상 발급",
                        text: "정상적으로 처리되었습니다.",
                    });
                } else if (result.data.warningCount > 0) {
                    Swal.fire({
                        icon: "warning",
                        title: "이미 발급받은 쿠폰입니다."
                    });
                } else {
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
                    data = {
                        param: this.couponInfo
                    };
                    this.$router.push({
                        path: `/userevent`
                    });

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