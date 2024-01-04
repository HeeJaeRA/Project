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

            <!-- 나의리뷰 -->

            <!-- Qna & coummunity & 신고내역 -->
            <MyBoard />
        </div>

    </div>



    
</template>

<script>
import Myprofile from './MyProfile.vue';
import MyCoupon from './MyCoupon.vue';
import MyReservation from './MyReservation.vue';
import MyBoard from './MyBoard.vue';
export default {
    components :{
        Myprofile,
        MyCoupon,
        MyReservation,
        MyBoard
    },
}

</script>