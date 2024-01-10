// 판매자화면
import SellerLayout from '../views/SellerTemplate.vue';
import SellerMain from '../views/seller/SellerMain.vue';
import Sellerrslist from '../views/seller/RsList.vue';
import SellerrsOlist from '../views/seller/RsOpenList.vue';
import SellerrsWlist from '../views/seller/RsWaitList.vue';
import SellerrsInfo from '../views/seller/RsInfo.vue';
import Rsinsert from '../views/seller/RsInsert.vue';
import RsUpdate from '../views/seller/RsUpdate.vue';
import SellerQnAList from '../views/seller/SellerQnAList.vue';
import SellerQnAForm from '../views/seller/SellerQnAInsert.vue';
import SellerQnAInfo from '../views/seller/SellerQnAInfo.vue';
import SellerNoticeList from '../views/seller/SellerNoticeList.vue';
import SellerNoticeInfo from '../views/seller/SellerNoticeInfo.vue';
import SellerReserv from '../views/seller/SellerReserv.vue';
import SellerAllReserv from '../views/seller/SellerAllReserv.vue';

export default {
	path: '/seller',
	name: 'seller',
	component: SellerLayout,
	children: [
		{
			path: 'home',
			component: SellerMain,
		},
		{
			path: 'rslist',
			component: Sellerrslist,
		},
		{
			path: 'rsolist',
			component: SellerrsOlist,
		},
		{
			path: 'rswlist',
			component: SellerrsWlist,
		},
		{
			path: 'rsinfo',
			component: SellerrsInfo,
		},
		{
			path: 'rsinsert',
			component: Rsinsert,
		},
		{
			path: 'rsupdate',
			component: RsUpdate,
		},
		{
			path: 'qnalist',
			component: SellerQnAList,
		},
		{
			path: 'qnainfo',
			component: SellerQnAInfo,
		},
		{
			path: 'qnainsert',
			component: SellerQnAForm,
		},
		{
			path: 'noticelist',
			component: SellerNoticeList,
		},
		{
			path: 'noticeinfo',
			component: SellerNoticeInfo,
		},
		{
			path: 'rvlist',
			component: SellerReserv,
		},
		{
			path: 'rvalllist',
			component: SellerAllReserv,
		},
	],
};
