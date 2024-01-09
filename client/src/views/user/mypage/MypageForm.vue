<template>
    <div>
        
        <div class="container">
            <br/><br/>
            <h1 style="font-weight:bold; text-align:center; color:LightSlateGray; font-family:serif;"> My Page </h1>
            <hr>

            <div style=" box-sizing:border-box; height:500px; margin-top:5%">
                <!-- 프로필 -->
                <Myprofile />


                <!-- 나의쿠폰 -->
                <MyCoupon />
            </div>

            <!-- 결제내역 -->
            <MyReservation />
            <br/>
            <hr>

            <!-- 나의리뷰 -->
            <MyReview />
            <br/><br/>
            <hr>

            <!-- Qna & coummunity & 신고내역 -->
            <MyBoard />
            <br/><br/>
            <hr>

            <!-- 찜목록 -->
            <MyBookmark/>
            <button class="btn btn-success rounded-pill px-3" style="border-radius:30%; text-align:center; vertical-align:top; width:100px; height:50px; position:fixed; bottom:80px; right:80px; font-size:20px;" @click="scrollToTop()"> Top </button>
        </div>

    </div>



    
</template>

<script>
import Myprofile from './MyProfile.vue';
import MyCoupon from './MyCoupon.vue';
import MyReservation from './MyReservation.vue';
import MyBoard from './MyBoard.vue';
import MyBookmark from './MyBookmark.vue';
import MyReview from './MyReview.vue';
export default {
    components :{
        Myprofile,
        MyCoupon,
        MyReservation,
        MyBoard,
        MyBookmark,
        MyReview
    },
    methods: {
        scrollToTop() {
			window.scrollTo({ top: 0, behavior: 'smooth' });
		},
    }
}

</script>