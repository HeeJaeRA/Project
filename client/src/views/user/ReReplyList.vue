<template>
    <div>
        <ul class="list-group">
            {{ replyList }}
            <li class="list-group-item" :key="idx" v-for="(rereply, idx) in rereplyList">
                <div class="container" v-if="rereply.remove_status == 'N'">
                    <p  class="badge bg-light text-black position-absolute">re</p>
                    <div class="row">
                        <div class="col text-end">
                            {{ rereply.writer }}
                        </div>
                        <div class="col-2 text-center">
                            {{ getDateFormat(rereply.write_date) }}
                        </div>
                        <div class="row text-start">
                            {{ rereply.content }}
                        </div>
                        <!-- <div class="col text-end">신고하기</div> -->
                        <div class="col text-end">
                            <button type="button" class="btn btn-warning" @click="replydelete(rereply.reply_code)">삭제</button>
                        </div>
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
    </div> 
</template>
<script>
import axios from 'axios';
import Swal from "sweetalert2";

export default {
    props: ['comCode', 'groupNum'],
    data() {
        return {
            rereplyList: [],
            userId : window.localStorage.getItem('userId'),
        }
    },
    created() {
        this.getrereplyList();
    },
    methods: {
        async getrereplyList() {
            let result = await axios.get(`/node/rereply?comCode=${this.comCode}&groupNum=${this.groupNum}`)
                                    .catch((err) => console.log(err));
            this.rereplyList = result.data;
        },
        getDateFormat(date) {
            return this.$dateFormat(date);
        },
        async replydelete(rereCode) {
            let result = await axios.delete(`/node/replydelete/${rereCode}`)
                                    .catch((err) => console.log(err));
            console.log('replyList.vue', result.data);
            Swal.fire({
                        icon: "success",
                        title: "정상 처리",
                        text: "댓글이 삭제되었습니다.",
            });
            this.getrereplyList();
        },
    }
}
</script>