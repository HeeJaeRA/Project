<template>
  <div>
        <table>
            <thead>
                <tr>
                    <th>글번호</th>
                    <td>{{ qnaInfo.qna_code }}</td>
                    <th>작성일시</th>
                    <td>{{ getDateFormat(qnaInfo.write_date) }}</td>
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
                    <td>
                        <pre>{{ qnaInfo.content }}</pre>
                    </td>
                </tr>
            </tbody>
        </table>
        <div>
            <button type="button" @click="BoardNoticeList()">목록으로</button>
        </div>
    <div class="row">
        <!-- 답변완료 -->
        <QnaAnswerInfo v-if="qnaInfo.ans_code > 0" v-bind:bno="qnaInfo.ans_code" />
        <!-- 답변대기 -->
        <div v-else class="card text-center">
            답변대기
        </div>
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
           let result = await axios.get(`/node/qna/${this.searchNo}`)
                       .catch(err => console.log(err));
           this.qnaInfo = result.data;           
        },
        getDateFormat(date) {
            return this.$dateFormat(date);
        },
        async BoardNoticeList() {
            this.$router.push({path : '/qna'});
        }
    }
}
</script>

<style>

</style>