<template>
  <div>
    <div>댓글목록</div>
    <div>
        <ul class="list-group">
            <li class="list-group-item" :key="idx" v-for="(reply, idx) in replyList">
                <div class="container">
                    <div class="row text-start">
                        {{ reply.content }}
                    </div>
                    <div class="row">
                        <div class="col-9 text-end">
                            {{ reply.writer }}
                        </div>
                        <div class="col-3 text-center">
                            {{ reply.created_date }}
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'; 

export default {
    props: ['comCode'],
    data() {
        return {
            replyList: []
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
    }
}
</script>

<style>

</style>