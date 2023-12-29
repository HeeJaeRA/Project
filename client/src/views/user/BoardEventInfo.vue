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
            </tbody>
        </table>
        <div>
            <button type="button" @click="BoardEventList()">목록으로</button>
        </div>
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
           let result = await axios.get(`/node/userevent/${this.searchNo}`)
                                   .catch(err => console.log(err));
           this.eventInfo = result.data;           
        },
        getDateFormat(date) {
            return this.$dateFormat(date);
        },
        async BoardEventList() {
            this.$router.push({path : '/userevent'});
        }
    }
}
</script>

<style>

</style>