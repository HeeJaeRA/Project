<template>
  <div>
    <table class="table table-hover">
        {{ qnaInfo.writer }}
            <thead>
                <tr>
                    <th>제목</th>
                    <td><input type="text" v-model="qnaInfo.title" /></td>
                </tr>
                <tr>
                    <th>작성일자</th>
                    <td><input type="text" v-model="qnaInfo.write_date" readonly /></td>
                </tr>
                <tr>
                    <th>구분</th>
                    <td><select v-model="selectedOption">
                            <option value="회원정보">회원정보</option>
                            <option value="예약및결제">예약및결제</option>
                            <option value="기타문의">기타문의</option>
                    </select></td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td colspan="6">
                        <pre><input type="text" v-model="qnaInfo.content" /></pre>
                    </td>
                </tr>
                <tr>
                    <th>파일첨부</th>
                    <td>
                        <input type="file" />
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="row">
        <button type="button" class="btn btn-xs btn-info" @click="saveInfo(searchNo)">저장</button>
        </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from "sweetalert2";

export default {
  data() {
        return {
            searchNo : '',
            qnaInfo : {
                qna_code : '',
                write_date : '',
                title : '',
                writer : '',
                content : '',
                qna_status : '답변대기',
                ans_code : '',
                qna_divison : '',
                user_divison : '일반유저'

             },
            boardQnaList : {},
            userId : window.localStorage.getItem('userId')
        };
    },
    created() {
        this.searchNo = this.$route.query.qndCode;
        //this.getBoardQnaList();
        // 등록
        this.qnaInfo.write_date = this.getToday();
        //this.comInfo.writer = this.userId;
    },
    methods: {
        async getBoardQnaList() {
            let result = await axios.get(`node/qna/${this.userId}`)
                                    .catch(err => console.log(err))
            this.boardQnaList = result.data;
        },
        getToday() {
            return this.$dateFormat('', 'yyyy-MM-dd');
        },
        async saveInfo(qnaCode) {
            let info = this.getInfo(qnaCode);
            let result = await axios(info);
            if(result.data.affectedRows > 0) {
                Swal.fire({
                    icon: "success",
                    title: "정상 처리",
                    text: "정상적으로 처리되었습니다.",
                 });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "처리 실패",
                    text: "정상적으로 처리되지 않았습니다.",
                });
            }
        },
        getInfo(qnaCode) {
            let method = '';
            let url = '';
            let data = null;

                method = 'post';
                url = `/node/qna`;
                let info = this.qnaInfo;
                this.qnaInfo.writer = this.userId;
                this.qnaInfo.qna_divison = this.selectedOption;
                console.log('this.selectedOption', this.selectedOption);
                console.log(info);
                data = {
                    param : this.qnaInfo
                };
                this.$router.push({path : `/qna`, query : {qnaCode : qnaCode}});
    
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