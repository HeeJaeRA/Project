// 판매자화면
import SellerLayout from '../views/SellerTemplate.vue';
import SellerMain from '../views/seller/SellerMain.vue';

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
	],
};
