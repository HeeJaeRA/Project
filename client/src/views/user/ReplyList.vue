<template>
    <div>
        <ul class="list-group">
            <li class="list-group-item" :key="idx" v-for="(reply, idx) in replyList">
                <div class="container">
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
                            답글달기
                        </div>
                        <div class="col text-end">신고하기</div>
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
                                    .catch(err => console.log(err));
            console.log(1, result);
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
        }
    }
}
</script>

<style>

</style>