// 유저화면
import UserLayout from '../views/UserTemplate.vue';
import UserMain from '../views/user/UserMain.vue';
import TestLogin from '../views/user/TestLogin.vue';
import BoardNoticeList from '../views/user/BoardNoticeList.vue';  /*공지사항 전체조회*/
import BoardNoticeInfo from '../views/user/BoardNoticeInfo.vue';  /*공지사항 상세조회*/
import BoardEventList from '../views/user/BoardEventList.vue';  /*이벤트 전체조회*/
import BoardComList from '../views/user/BoardComList.vue';  /*커뮤니티 전체조회*/
import BoardReviewList from '../views/user/BoardReviewList.vue';  /*리뷰 전체조회*/

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
			name: 'userInfo',
			component: BoardNoticeInfo
		},
		{
			path: 'event',
			name: 'userEvent',
			component: BoardEventList
		},
		{
			path: 'community',
			name: 'userCommunity',
			component: BoardComList
		},
		{
			path: 'review',
			name: 'userreview',
			component: BoardReviewList
		}
	],
	
};
