// 판매자화면
import SellerLayout from '../views/SellerTemplate.vue';
import SellerMain from '../views/seller/SellerMain.vue';
import SellerUpload from '../views/seller/SellerUpload.vue';
import SellerList from '../views/seller/SellerList.vue';
import SellerInfo from '../views/seller/SellerInfo.vue';

export default {
	path: '/seller',
	name: 'seller',
	component: SellerLayout,
	children: [
		{
			path: 'home',
			name: 'sellerHome',
			component: SellerMain,
		},
		{
			path: 'upload',
			name: 'sellerUpload',
			component: SellerUpload,
		},
		{
			path: 'list',
			name: 'sellerList',
			component: SellerList,
		},
		{
			path: 'info',
			name: 'sellerInfo',
			component: SellerInfo,
		},
	],
};
