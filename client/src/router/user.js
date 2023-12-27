// 유저화면
import UserLayout from '../views/UserTemplate.vue';
import UserMain from '../views/user/UserMain.vue';
import TestLogin from '../views/user/TestLogin.vue';
import BoardNoticeList from '../views/user/BoardNoticeList.vue';  /*공지사항 전체조회*/
import BoardNoticeInfo from '../views/user/BoardNoticeInfo.vue';  /*공지사항 상세조회*/
import BoardEventList from '../views/user/BoardEventList.vue';  /*이벤트 전체조회*/
import BoardEventInfo from '../views/user/BoardEventInfo.vue';  /*이벤트 상세조회*/
import BoardComList from '../views/user/BoardComList.vue';  /*커뮤니티 전체조회*/
import BoardComInfo from '../views/user/BoardComInfo.vue';  /*커뮤니티 상세조회*/
import BoardComForm from '../views/user/BoardComForm.vue';  /*커뮤니티 폼*/
import BoardReviewList from '../views/user/BoardReviewList.vue';  /*리뷰 전체조회*/
import BoardQnaList from '../views/user/BoardQnaList.vue'; /*뿜 전체조회*/
import BoardQnaInfo from '../views/user/BoardQnaInfo.vue'; /*뿜 상세조회*/
import QnaAnswerInfo from '../views/user/QnaAnswerInfo.vue'; /*뿜 답글*/

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
			component: TestLogin,
		},
		{
			path: 'notice',
			name: 'userNotice',
			component: BoardNoticeList
		},
		{
			path: 'noticeinfo',
			name: 'userNoticeInfo',
			component: BoardNoticeInfo
		},
		{
			path: 'event',
			name: 'userEvent',
			component: BoardEventList
		},
		{
			path: 'eventinfo',
			name: 'userEventInfo',
			component: BoardEventInfo
		},
		{
			path: 'community',
			name: 'userCommunity',
			component: BoardComList
		},
		{
			path: 'communityinfo',
			name: 'userCommunityInfo',
			component: BoardComInfo
		},
		{
			path: 'communityform',
			name: 'userCommunityForm',
			component: BoardComForm
		},
		{
			path: 'review',
			name: 'userReview',
			component: BoardReviewList
		},
		{
			path: 'qna',
			name: 'userqna',
			component: BoardQnaList
		},
		{
			path: 'qnainfo',
			name: 'userQnaInfo',
			component: BoardQnaInfo
		},
		{
			path: 'answer',
			name: 'userAnswerInfo',
			component: QnaAnswerInfo
		}
	],
	
};
