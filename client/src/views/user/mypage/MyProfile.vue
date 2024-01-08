<template>
     <div style="width:23%; height:450px; float:left; background-color:#e4e5e6; border-radius: 10%;
                             margin-left:3%; text-align:center;">
                    <div style="height:50%;">
                        <!--사진 있으면 넣고 아니면 기본사진-->
                        <img :src="`http://localhost:3000/public/userimg/${userInfoList.profile}`"
                         v-if="this.userInfoList.profile != null && this.userInfoList.profile != ''" 
                         style="width:200px; height:200px; margin-top:10%; border-radius: 50%;"/>
                        <!-- 기본사진 -->
                        <img v-else style="width:200px; height:200px; margin-top:10%; border-radius: 50%;" src="../../../assets/images/userImage.jpg"/>
                    </div>
                    <div>
                        <br/>
                        <h3>[ {{userInfoList.nickname}} ]</h3>
                        <p style="font-weight:bold; margin-top:10px;">{{userInfoList.grade}} {{userInfoList.user_name}}님</p>
                        <a style="font-size: 17px; text-decoration-line: none; color:black;">팔로워 명 </a>/
                        <a style="font-size: 17px; text-decoration-line: none; color:black;"> 팔로잉 명</a>
                        <br/>
                        <br/>
                        <button class="btn btn-secondary rounded-pill px-3" style="margin-right:15px;" @click="$router.push('/join')">회원수정</button>
                        <button class="btn btn-dark rounded-pill px-3" @click="userdelete()" >회원탈퇴</button>
                    </div>
                </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
export default {
    data() {
        return{
            userInfoList :[],
        }
    },

    created(){
    this.getUserInfo();
    },

    methods : {
        async getUserInfo(){
            const userId = window.localStorage.getItem('userId');
            console.log("현재 세션에 담긴 아이디 userId =", userId)
            this.userInfoList = (await axios.post('/node/getuserinfo', {userId})
                                .catch(err=>{console.log(err)})).data[0];
            console.log("받은유저 정보 전체 =",this.userInfoList);
        },
        async userdelete(){
            const userId = window.localStorage.getItem('userId');
            const { value: pw } = await Swal.fire({
				title: '회원탈퇴를 위해 <br/> 비밀번호를 입력해주세요.',
                width: 600,
                padding: "3em",
                color: "#F75D59",
                backdrop: `rgba(247,93,89,0.4)`,
				input: 'password',
                html : '탈퇴 시 작성한 게시글을 제외하고 <br/> 프로필 정보, 쿠폰, 결제내역 등 <br/> 사용자가 설정한 모든 정보가 삭제됩니다.',
				inputPlaceholder: '정말 탈퇴하시겠습니까?..',
				confirmButtonText: 'submit', 
				showCancelButton: true,
			});
            let userPw = pw;
            let obj = {userId, userPw };
            let deleteresult = await axios.post('node/userdelete',obj )
                                            .catch((err) => console.log(err));
            console.log("회원탈퇴결과= ", deleteresult );

            if ( deleteresult != undefined && deleteresult.data.changedRows > 0 ) {
				Swal.fire({
					icon: 'success',
					title: '탈퇴처리가 완료되었습니다.',
                    html:'그동안 대다내를 이용해주셔서 감사합니다.',
                });
				localStorage.clear();//세션삭제
                this.$router.push('/login');//로그인 화면으로 이동
                
                return;
			} else {
				Swal.fire({
					icon: 'info',
					title: '비밀번호가 다릅니다. ',
				});
                return;
			}
        }
    }
}



</script>