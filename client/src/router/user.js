import UserLayout from '../views/UserTemplate.vue';
import UserMain from '../views/user/UserMain.vue';
import BoardNoticeList from '../views/user/BoardNoticeList.vue'; /*공지사항 전체조회*/
import BoardNoticeInfo from '../views/user/BoardNoticeInfo.vue'; /*공지사항 상세조회*/
import BoardEventList from '../views/user/BoardEventList.vue'; /*이벤트 전체조회*/
import BoardEventInfo from '../views/user/BoardEventInfo.vue'; /*이벤트 상세조회*/
import BoardEventListIng from '../views/user/BoardEventListIng.vue'; /*이벤트 진행중*/
import BoardEventListEnd from '../views/user/BoardEventListEnd.vue'; /*이벤트 종료*/
import BoardComList from '../views/user/BoardComList.vue'; /*커뮤니티 전체조회*/
import BoardComInfo from '../views/user/BoardComInfo.vue'; /*커뮤니티 상세조회*/
import BoardComForm from '../views/user/BoardComForm.vue'; /*커뮤니티 폼*/
import BoardReviewList from '../views/user/BoardReviewList.vue'; /*리뷰 전체조회*/
import BoardQnaList from '../views/user/BoardQnaList.vue'; /*뿜 전체조회*/
import BoardQnaInfo from '../views/user/BoardQnaInfo.vue'; /*뿜 상세조회*/
import BoardQnaForm from '../views/user/BoardQnaForm.vue'; /*뿜 등록*/
import QnaAnswerInfo from '../views/user/QnaAnswerInfo.vue'; /*뿜 답글*/
import UserLogin from '../views/user/UserLogin.vue';
import UserJoin from '../views/user/UserJoin.vue';
import SellerLogin from '../views/seller/SellerLogin.vue'; //판매자 로그인 및 회원가입은 유저의 헤더푸터를 사용하기때문에 여기있음
import SellerJoin from '../views/seller/SellerJoin.vue';
import MypageForm from '../views/user/mypage/MypageForm.vue';
import rsInfo from '../views/user/restaurantInfo.vue';
import Pagination from '../views/user/Pagination.vue';
import ReplyList from '../views/user/ReplyList.vue'; /*댓글 리스트*/
import UserBook from '../views/user/UserBook.vue';
import UserCart from '../views/user/UserCart.vue';
import UserPay from '../views/user/UserPay.vue';
import UserCal from '../views/user/UserCal.vue';
import rsAllList from '../views/user/RSAllList.vue';
import rsAddr from '../views/user/RSAddr.vue';
import rsCate from '../views/user/RSCate.vue';

export default {
	path: '/',
	name: 'user',
	component: UserLayout,
	children: [
		{
			path: 'home',
			name: 'userHome',
			component: UserMain,
		},
		{
			path: 'login',
			name: 'userLogin',
			component: UserLogin,
		},
		{
			path: 'sellerlogin',
			name: 'sellerLogin',
			component: SellerLogin,
		},
		{
			path: 'sellerjoin',
			name: 'sellerJoin',
			component: SellerJoin,
		},
		{
			path: 'join',
			name: 'userJoin',
			component: UserJoin,
		},
		{
			path: 'mypage',
			name: 'myPage',
			component: MypageForm,
		},
		{
			path: 'book',
			name: 'userBook',
			component: UserBook,
		},
		{
			path: 'cart',
			name: 'userCart',
			component: UserCart,
		},
		{
			path: 'pay',
			name: 'userPay',
			component: UserPay,
		},
		{
			path: 'cal',
			name: 'usercal',
			component: UserCal,
		},
		{
			path: 'rsinfo',
			name: 'rsInfo',
			component: rsInfo,
		},
		{
			path: 'rsall',
			name: 'rsall',
			component: rsAllList,
		},
		{
			path: 'rsadd',
			name: 'rsadd',
			component: rsAddr,
		},
		{
			path: 'rscate',
			name: 'rscate',
			component: rsCate,
		},
		{
			path: 'notice',
			name: 'userNotice',
			component: BoardNoticeList,
		},
		{
			path: 'noticeinfo',
			name: 'userNoticeInfo',
			component: BoardNoticeInfo,
		},
		{
			path: 'userevent',
			name: 'userEvent',
			component: BoardEventList,
		},
		{
			path: 'usereventinfo',
			name: 'userEventInfo',
			component: BoardEventInfo,
		},
		{
			path: 'eventing',
			name: 'eventIng',
			component: BoardEventListIng,
		},
		{
			path: 'eventend',
			name: 'eventEnd',
			component: BoardEventListEnd,
		},
		{
			path: 'community',
			name: 'userCommunity',
			component: BoardComList,
		},
		{
			path: 'communityinfo',
			name: 'userCommunityInfo',
			component: BoardComInfo,
		},
		{
			path: 'communityform',
			name: 'userCommunityForm',
			component: BoardComForm,
		},
		{
			path: 'review',
			name: 'userReview',
			component: BoardReviewList,
		},
		{
			path: 'qna',
			name: 'userQna',
			component: BoardQnaList,
		},
		{
			path: 'qnainfo',
			name: 'userQnaInfo',
			component: BoardQnaInfo,
		},
		{
			path: 'qnaform',
			name: 'userQnaForm',
			component: BoardQnaForm,
		},
		{
			path: 'answer',
			name: 'userAnswerInfo',
			component: QnaAnswerInfo,
		},
		{
			path: 'pagination',
			name: 'pagination',
			component: Pagination,
		},
		{
			path: 'reply',
			name: 'reply',
			component: ReplyList,
		},
	],
};
