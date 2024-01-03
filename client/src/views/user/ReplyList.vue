<template>
    <div>
        <ul class="list-group">
            <li class="list-group-item" :key="idx" v-for="(reply, idx) in commentList">
                <div class="container">
                    <div class="row">
                        <div class="col-9 text-end">
                            {{ reply.writer }}
                        </div>
                        <div class="col-3 text-center">
                            {{ reply.write_date }}
                        </div>
                        <div class="row text-start">
                            {{ reply.content }}
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
  
</template>

<script>
import axios from 'axios'; 

export default {
    props: ['commuCode'],
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
            let result = await axios.get(`/node/reply?commuCode=${this.commuCode}`)
                                    .catch(err => console.log(err));
            this.replyList = result.data;
        }
    }
}
</script>

<style>

</style>