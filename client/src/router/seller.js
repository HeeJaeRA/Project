// 판매자화면
import SellerLayout from '../views/SellerTemplate.vue';
import SellerMain from '../views/seller/SellerMain.vue';
import SellerUpload from '../views/seller/SellerUpload.vue';
import SellerList from '../views/seller/SellerList.vue';
import SellerInfo from '../views/seller/SellerInfo.vue';
import Sellerrslist from '../views/seller/RsList.vue';
import SellerrsInfo from '../views/seller/RsInfo.vue';
import SellerCal from '../views/seller/SellerCal.vue';
import Rsinsert from '../views/seller/RsInsert.vue';
import RsUpdate from '../views/seller/RsUpdate.vue';
import SellerMupload from '../views/seller/SellerMUpload.vue';
import SellerQnAList from '../views/seller/SellerQnAList.vue';
import SellerQnAInfo from '../views/seller/SellerQnAInfo.vue';

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
			path: 'upload',
			component: SellerUpload,
		},
		{
			path: 'list',
			component: SellerList,
		},
		{
			path: 'info',
			component: SellerInfo,
		},
		{
			path: 'rslist',
			component: Sellerrslist,
		},
		{
			path: 'rsinfo',
			component: SellerrsInfo,
		},
		{
			path: 'cal',
			component: SellerCal,
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
			path: 'mupload',
			component: SellerMupload,
		},
		{
			path: 'qnalist',
			component: SellerQnAList,
		},
		{
			path: 'qnainfo',
			component: SellerQnAInfo,
		},
	],
};
