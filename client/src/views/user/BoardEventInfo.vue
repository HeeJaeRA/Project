<template>
  <div>
        <table>
            <thead>
                <tr>
                    <th>글번호</th>
                    <td></td>
                    <th>작성일자</th>
                    <td></td>
                </tr>
                <tr>
                    <th>제목</th>
                    <td></td>
                    <th>작성자</th>
                    <td></td>
                    <th>이벤트 시작일</th>
                    <td></td>
                    <th>이벤트 종료일</th>
                    <td></td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>내용</td>
                    <td>내용</td>
                    <td>내용</td>
                </tr>
            </tbody>
        </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            searchNo: '',
            eventInfo: {}
        };
    },
    created() {
        this.searchNo = this.$route.query.eventCode;
        this.boardEventInfo();
    },
    methods: {
        async boardEventInfo() {
           let result = await axios.get(`/node/event/${this.searchNo}`)
                                   .catch(err => console.log(err));
           this.eventInfo = result.data;           
        },
        getDateFormat(date) {
            return this.$dateFormat(date);
        }
    }
}
</script>

<style>

</style>