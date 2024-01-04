<template>
    <div style="width:95%; margin-left:3%">
                <br/>
                <br/><br/>
                <h3 style="font-weight:bold; padding-left:3%;">
                    <a id="a" class="QNA" style="color:#0d6efd" @click="userQna()"> QNA </a>|
                    <a id="a" class="COMMUNITY" @click="userCommunity()"> COMMUNITY </a>|
                    <a id="a" class="WARNING" @click="userWarning()"> 신고 </a>
                </h3>
                <br/>
                <br/>
                <table class="table table-hover" style=" text-align:center;">
                        <thead>
                            <tr>
                                <th>카테고리</th>
                                <th>가게이름</th>
                                <th>장소</th>
                                <th>전화번호</th>
                                <th>좌석 수</th>
                                <th>예약날짜</th>
                                <th>예약상태</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr :key="i" v-for="(coupon, i) in mycouponList" >
                                <td>{{}}</td>
                                <td>{{}}</td>
                                <td>{{}}</td>
                                <td>{{}}</td>
                                <td>{{}}</td>
                                <td>{{}}</td>
                                <td>{{}}</td>
                                <td @click="">{{}}</td>
                            </tr>
                        </tbody>
                </table>
            </div>
</template>
<script>
export default {
    data() {
        return{

        }
    },
    methods :{
        userQna(){
            document.querySelector(".QNA").style.color ="#0d6efd"
            document.querySelector(".COMMUNITY").style.color ="black"
            document.querySelector(".WARNING").style.color ="black"
        },

        userCommunity(){
            document.querySelector(".QNA").style.color ="black"
            document.querySelector(".COMMUNITY").style.color ="#0d6efd"
            document.querySelector(".WARNING").style.color ="black"
        },

        userWarning(){
            document.querySelector(".QNA").style.color ="black"
            document.querySelector(".COMMUNITY").style.color ="black"
            document.querySelector(".WARNING").style.color ="#0d6efd"
        }
    }
}
</script>

<style scoped>
    #a:hover{
        color:#0d6efd;
    }
</style>