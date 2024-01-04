<template>
    <div>
        <ul class="list-group">
            {{ replyList }}
            <li class="list-group-item" :key="idx" v-for="(reply, idx) in replyList">
                <div class="container" v-if="reply.remove_status == 'N'">
                    <div class="row">
                        <div class="col text-end">
                            {{ reply.writer }}
                        </div>
                        <div class="col-2 text-center">
                            {{ getDateFormat(reply.write_date) }}
                        </div>
                        <div class="row text-start">
                            {{ reply.content }}
                        </div>
                        <div v-if="reply.class == 0" class="col-10 text-end">
                            <button type="button" @click="toggleInsertRere()">답글달기</button>
                        <div class="insertrere" :class="{ 'visible': reply.showRereInsert }">
                            <input type="text" v-model="replyInfo.content" />
                            <button type="button" @click="saveReply()">댓글 작성</button>
                        </div>
                        </div>
                        <div class="col text-end">신고하기</div>
                        <div><button type="button" class="btn btn-warning" @click="replydelete()">삭제</button></div>
                    </div>
                </div>
                <div v-else>
                    <div class="row">
                        <div class="row text-start">
                            삭제된 댓글입니다.
                        </div>
                    </div>
                </div>
            </li>
        </ul>
        <div>
            <input type="text" v-model="replyInfo.content"/>
            <button type="button" @click="saveReply()">댓글 작성</button>
         </div>
    </div> 
</template>

<script>
import axios from 'axios'; 

export default {
    props: ['comCode'],
    data() {
        return {
            replyList: [],
            replyInfo: {
                reply_code: '',
                content: '',
                writer: '',
                commu_code: ''
            },
            userId : window.localStorage.getItem('userId'),
        }
    },
    created() {
        this.getreplyList();
    },
    methods: {
        async getreplyList() {
            let result = await axios.get(`/node/reply?comCode=${this.comCode}`)
                                    .catch(err => console.log(err));;
            console.log('replylist', result.data);
            this.replyList = result.data;
        },
        getDateFormat(date) {
            return this.$dateFormat(date);
        },
        async saveReply() {
            let data = {
                param : {
                    content : this.replyInfo.content,
                    writer : this.userId,
                    commu_code : this.comCode
                }
            };
            let result = await axios.post("/node/replyinsert" , data)
                                    .catch((err) => console.log(err));
            console.log('savereply', result);
            this.getreplyList();
        },
        toggleInsertRere() {
        const replyToToggle = this.replyList.find(reply => reply.group_code === groupCode);
            if (replyToToggle) {
                replyToToggle.showRereInsert = !replyToToggle.showRereInsert;
            }
        },
        async replydelete() {
            let result = await axios.delete(`/node/replydelete/${this.replyList[0].reply_code}`)
                                    .catch( err=> console.log(err));
            console.log('replyList.vue', result.data);
            this.getreplyList();
        },
    },
}
</script>

<style>
.visible {
  display: none;
}
</style>