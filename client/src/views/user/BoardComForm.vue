<template>
    <div>
        <table>
            <thead>
                <tr>
                    <th>글번호</th>
                    <td><input type="text" v-model="comInfo.commu_code" readonly /></td>
                    <th>작성일자</th>
                    <td><input type="text" v-model="comInfo.write_date" readonly /></td>
                </tr>
                <tr>
                    <th>제목</th>
                    <td><input type="text" v-model="comInfo.title" /></td>
                    <th>작성자</th>
                    <td><input type="text" v-model="comInfo.user_id" readonly /></td>
                    <th>조회수</th>
                    <td><input type="text" v-model="comInfo.view_cnt" readonly /></td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>내용
                        <pre><input type="text" v-model="comInfo.content" /></pre>
                    </td>
                </tr>
            </tbody>
        </table>
         <div class="row">
        <button type="button" class="btn btn-xs btn-info" @click="isUpdated? boardComUpdate() : boardComInsert()">저장</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
             isUpdate : false,
             searchNo : '',
             comInfo : {
                commu_code : '',
                write_date : '',
                title : '',
                user_id : '',
                view_cnt : 0,
                content : ''
             },
             boardComList : []
        };
    },
    created() {
        this.searchNo = this.$route.query.comCode;
        if(this.searchNo > 0) {
            // 수정
            this.getBoardComInfo();
            this.isUpdated = true;
        } else {
            // 등록
            //this.boardComInfo.write_date = this.getToday();
        }
    },
    methods: {
        async getBoardComInfo() {
            let result = await axios.get(`/node/community/${this.searchNo}`)
                                    .catch(err => console.log(err));
            this.boardComInfo = result.data;
            this.boardComInfo.write_date = this.$dateFormat(this.boardComInfo.write_date);
        },
        gertToday() {
            return this.$dateFormat('');
        },
        async boardComInsert() {
            let obj = {
                param : {
                    title : this.boardComInfo.title,
                    content : this.boardComInfo.content
                }
            }
            let result = await axios.post(`/node/commumity`, obj)
                                    .catch(err => console.log(err));
            if(result.data.insertId > 0) {
                alert('등록되었습니다.');
                this.boardComInfo.commu_code = result.data.insertId;
            }
        },
        async boardComUpdate() {
            let obj = {
                param : {
                    title : this.boardComInfo.title,
                    content : this.boardComInfo.content
                }
            }
            let result = await axios.put(`/node/community/${this.comInfo.commu_code}`, obj)
                                    .catch(err => console.log(err));
            if(result.data.changedRows > 0){
                alert('수정되었습니다.');
            }
        }
    }
}
</script>

<style>

</style>