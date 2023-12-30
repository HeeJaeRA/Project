<template>
  <div>
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>글번호</th>
                    <td>{{ noticeInfo.notice_code }}</td>
                    <th>작성일시</th>
                    <td colspan="3">{{ getDateFormat(noticeInfo.write_date) }}</td>
                </tr>
                <tr>
                    <th>제목</th>
                    <td>{{ noticeInfo.title }}</td>
                    <th>작성자</th>
                    <td>{{ noticeInfo.write }}</td>
                    <th>조회수</th>
                    <td>{{ noticeInfo.view_cnt }}</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td colspan="6">
                        <pre>{{ noticeInfo.content }}</pre>
                    </td>
                </tr>
            </tbody>
        </table>
        <div>
            <button type="button" class="btn btn-outline-secondary" @click="BoardNoticeList()">목록으로</button>
        </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            searchNo: '',
            noticeInfo: {}
        };
    },
    created() {
        this.searchNo = this.$route.query.noticeCode;
        this.boardNoticeInfo();
    },
    methods: {
        async boardNoticeInfo() {
           let result = await axios.get(`/node/notices/${this.searchNo}`)
                                   .catch(err => console.log(err));
           this.noticeInfo = result.data;           
        },
        getDateFormat(date) {
            return this.$dateFormat(date);
        },
        async BoardNoticeList() {
            this.$router.push({path : '/notice'});
        },
    }
}
</script>

<style>

</style>