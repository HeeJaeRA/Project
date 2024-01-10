<template>
    <div style="width:95%; margin-left:3%">
                <br/>
                <br/><br/>
                <h3 style="font-weight:bold; padding-left:3%;">
                    <a id="a" class="QNA" style="color:#0d6efd" @click="userQnaList()"> QNA </a>|
                    <a id="a" class="COMMUNITY" @click="userCommunityList()"> COMMUNITY </a>
                </h3>
                <br/>
                <br/>
                <table class="table table-hover" style=" text-align:center;">
                    <!-- QNA, COMMUNITY -->
                    <thead>
                        <tr>
                            <th>게시글번호</th>
                            <th v-if="this.board =='qna'">문의종류</th>
                            <th>제목</th>
                            <th v-if="this.board =='community'">내용</th>
                            <th>작성일자</th>
                            <th v-if="this.board =='qna'">답변상태</th> <!-- QNA -->
                            <th v-if="this.board =='community'"> 조회수</th> <!-- COMMUNITY -->
                        </tr>
                    </thead>
                        <!-- QNA -->
                    <tbody v-if="this.board =='qna'">
                        <tr v-if="myQnaList.length == 0">
                                <td colspan="10" style="color:gray; text-align:center;">아직 작성한 문의가 없습니다.</td>
                        </tr>
                        <tr @click="goToQna(qna.qna_code)" class="a" :key="i" v-for="(qna, i) in myQnaList" >
                            <td>{{i + 1}}</td>
                            <td>{{qna.qna_divison}}</td>
                            <td>{{qna.title}}</td>
                            <td>{{getDataFormat(qna.write_date)}}</td>
                            <td>{{qna.qna_status}}</td>
                        </tr>
                    </tbody>

                        <!-- COMMUNITY -->
                    <tbody v-if="this.board =='community'">
                        <tr v-if="myCommunityList.length == 0">
                                <td colspan="10" style="color:gray; text-align:center;">아직 작성한 글이 없습니다.</td>
                        </tr>
                        <tr @click="goToCommu(com.commu_code)" class="a" :key="i" v-for="(com, i) in myCommunityList" >
                            <td>{{com.commu_code}}</td>
                            <td>{{com.title}}</td>
                            <td>{{com.content}}</td>
                            <td>{{getDataFormat(com.write_date)}}</td>
                            <td>{{com.view_cnt}}</td>
                        </tr>
                    </tbody>       
                </table>
                 
                <div v-if="this.board =='qna'" style="text-align:right; margin-right:30px">                
                    <button class="btn btn-warning rounded-pill px-3" style="width:160px;" @click="goToQnaFrom()">
                                        작성하기
                    </button>
                    <br/>
                    <Pagination v-if="this.board =='qna'" v-bind:value="`qna`" v-bind:col="`writer`" v-bind:colvalue="this.user_id" @current="selectPage1"/>
                </div>    
                 <Pagination v-if="this.board =='community'" v-bind:value="`community`" v-bind:col="`writer`" v-bind:colvalue="this.user_id" @current="selectPage2"/>
            </div>
</template>
<script>
import axios from 'axios';
import Pagination from './MyPagination.vue'; 
export default {
    components: {
        Pagination,
    },
    data() {
        return{
            myQnaList :[],
            myCommunityList :[],
            board : 'qna', //qna or community
            user_id: window.localStorage.getItem('userId'),
            current : 1,
        }
    },

    created(){
    this.userQnaList();
    },

    methods : {
        async userQnaList(){
            this.board = 'qna';
            const userId = window.localStorage.getItem('userId');
            this.myQnaList = (await axios.get(`/node/qnaList/${userId}/${this.current}`)
                                .catch(err=>{console.log(err)})).data;
            console.log("받은QNALIST 정보 전체 =",this.myQnaList);
            document.querySelector(".QNA").style.color ="#0d6efd";
            document.querySelector(".COMMUNITY").style.color ="black"
        },

        async userCommunityList(){
            this.board = 'community';
            const userId = window.localStorage.getItem('userId');
            this.myCommunityList = (await axios.get(`/node/communityList/${userId}/${this.current}`)
                                .catch(err=>{console.log(err)})).data;
            console.log("받은MyCommunityList 정보 전체 =",this.myCommunityList);
            document.querySelector(".QNA").style.color ="black"
            document.querySelector(".COMMUNITY").style.color ="#0d6efd"
        },
        //나의 qna글 보러가기
        goToQna(qnacode){
            this.$router.push({ path : '/qnainfo', query: { qnaCode: qnacode } });
        },
        //나의 community글 보러가기
        goToCommu(comcode){
            this.$router.push({ path : '/communityinfo', query: { comCode: comcode } });
        },
        //QNA 작성하러 가기
        goToQnaFrom(){
            this.$router.push({ path: "/qnaform" });
        },
        getDataFormat(date){
            return this.$dateFormat(date);
        },
        //클릭시 사용가능 쿠폰 페이지 바꾸는 것
        selectPage1(selected) {
         this.current = selected;
         console.log("this.current=", this.current);
         this.userQnaList(); 
        },
        //클릭시 사용불가 쿠폰 페이지 바꾸는 것
        selectPage2(selected) {
         this.current = selected;
         console.log("this.current=", this.current);
         this.userCommunityList(); 
        },

    }
}
</script>

<style scoped>
    #a:hover{
        color:#0d6efd;
        cursor:pointer;
    }
    .a:hover{
        background-color:#d2e0f5;
        cursor:pointer;
    }
</style>