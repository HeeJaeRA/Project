<template>
  <div>
    <div class="card-body">
        <ul class="list-group">
            <li class="list-group-item" :key="idx" v-for="(answer, idx) in answerList">
                <div class="container">
                     <div class="row text-start">
                        {{ answer.qna_code }}
                    </div>
                    <div class="row text-start">
                        {{ answer.content }}
                    </div>
                    <div class="row text-start">
                        {{ answer.answer_code }}
                    </div>
                    <div class="row">
                        <div class="col-9 text-end">
                            {{ answer.writer }}
                        </div>
                        <div class="col-3 text-center">
                            {{ answer.write_date }}
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
    props : ['qnaCode'], 
    data() {
        return {
            answerList : []
        };
    },
    created() {
        this.getAnswerList();
    },
    methods : {
        async getAnswerList() {
            let result = await axios.get(`/node/answer?bno=${this.qnaCode}`)
                                    .catch(err => console.log(err));
            this.answerList = result.data;
        }
    }
}
</script>

<style>

</style>