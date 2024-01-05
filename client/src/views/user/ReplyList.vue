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
                            <button type="button" @click="InsertRere(idx)">답글달기</button>
                        <div v-show="reredisply" >
                            <input type="text" v-model="replyInfo.content" />
                            <button type="button" @click="saveReReply(reply.group_num)">댓글 작성</button>
                        </div>
                        </div>
                        <div class="col text-end">신고하기</div>
                        <div class="col text-end">
                            <button type="button" class="btn btn-warning" @click="replydelete(reply.reply_code)">삭제</button>
                        </div>
                    </div>
                    <div>
                        <ReReplyList v-bind:comCode="reply.commu_code" v-bind:groupNum="reply.group_num" />
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
import ReReplyList from './ReReplyList.vue';
import Swal from "sweetalert2";

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
            reredisply: false,
        }
    },
    components: {
        ReReplyList
    },
    created() {
        this.getreplyList();
    },
    methods: {
        async getreplyList() {
            let result = await axios.get(`/node/reply?comCode=${this.comCode}`)
                                    .catch(err => console.log(err));
            //console.log('replylist', result.data);
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
        async saveReReply(gNum) {
            let data = {
                param: {
                    content: this.replyInfo.content,
                    writer: this.userId,
                    commu_code: this.comCode,
                    group_num: gNum
                }
            };
            let result = await axios.post(`/node/rereplyinsert`, data)
                                    .catch((err) => console.log(err));
            console.log('saveReRe', result);
        },
        InsertRere(idx) {
            
        },
        async replydelete(replycode) {
            let result = await axios.delete(`/node/replydelete/${replycode}`)
                                    .catch((err) => console.log(err));
            console.log('replyList.vue', result.data);
            Swal.fire({
                        icon: "success",
                        title: "정상 처리",
                        text: "댓글이 삭제되었습니다.",
            });
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