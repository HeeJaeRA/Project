<template>
  <div>
        <table class="table table-hover">
            <thead>
                <tr>
                    <!-- <th>글번호</th>
                    <td>{{ qnaInfo.qna_code }}</td> -->
                    <th>작성일시</th>
                    <td colspan="3">{{ getDateFormat(qnaInfo.write_date) }}</td>
                </tr>
                <tr>
                    <th>제목</th>
                    <td>{{ qnaInfo.title }}</td>
                    <th>답변상태</th>
                    <td>{{ qnaInfo.qna_status }}</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td colspan="5">
                        <pre>{{ qnaInfo.content }}</pre>
                    </td>
                </tr>
            </tbody>
        </table>
        <div>
            <QnaAnswerInfo v-bind:qnaCode="this.searchNo" />
        </div>
        <div>
            <button type="button" @click="BoardQnaList()">목록으로</button>
        </div>
  </div>
</template>

<script>
import axios from 'axios';
import QnaAnswerInfo from '../user/QnaAnswerInfo.vue';

export default {
    data() {
        return {
            searchNo: '',
            userId : window.localStorage.getItem('userId'),
            qnaInfo: {}
        };
    },
     components : {
        QnaAnswerInfo
    },
    created() {
        this.searchNo = this.$route.query.qnaCode;
        this.boardQnaInfo();
    },
    methods: {
        async boardQnaInfo() {
           let result = await axios.get(`/node/qna/${this.userId}/${this.searchNo}`)
                       .catch(err => console.log(err));
            console.log(result)
            this.qnaInfo = result.data;           
        },
        getDateFormat(date) {
            return this.$dateFormat(date);
        },
        async BoardQnaList() {
            this.$router.push({path : '/qna'});
        }
    }
}
</script>

<style>

</style>