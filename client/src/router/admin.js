// 관리자화면
import AdminLayout from "../views/AdminTemplate.vue";
import AdminMain from "../views/admin/AdminMain.vue"; //관리자메인
import AdminChart from "../views/admin/AdminChart.vue"; //관리자차트
import ShopList from "../views/admin/ShopList.vue"; // 등록업체리스트
import SellerList from "../views/admin/SellerList.vue"; //판매자회원리스트
import NoticeList from "../views/admin/NoticeList.vue"; //공지사항리스트
import QnaList from "../views/admin/QnaList.vue"; //qna리스트
import UserList from "../views/admin/UserList.vue"; //일반회원리스트
import EventList from "../views/admin/EventList.vue"; //이벤트리스트
import EventInfo from "../views/admin/EventInfo.vue"; //이벤트단건조회
import EventForm from "../views/admin/EventForm.vue"; //이벤트 등록
import EventModify from "../views/admin/EventModify.vue"; //이벤트수정
import CouponUser from "../views/admin/CouponUser.vue"; //쿠폰일괄발급
import CouponList from "../views/admin/CouponList.vue"; //쿠폰리스트
import CouponForm from "../views/admin/CouponForm.vue"; //쿠폰등록폼
import ReportList from "../views/admin/ReportList.vue"; //신고내역리스트

export default {
  path: "/admin",
  name: "admin",
  component: AdminLayout,
  children: [
    {
      path: "home",
      name: "adminHome",
      component: AdminMain, //관리자메인페이지
    },

    {
      path: "chart",
      name: "adminchart",
      component: AdminChart, //차트
    },

    {
      path: "shopList",
      name: "shopList",
      component: ShopList, //업체리스트
    },

    {
      path: "sellerList",
      name: "sellerList",
      component: SellerList, //판매자회원리스트
    },
    {
      path: "noticeList",
      name: "noticeList",
      component: NoticeList, //공지사항리스트
    },
    {
      path: "qnaList",
      name: "qnaList",
      component: QnaList, //qna리스트
    },

    {
      path: "userList",
      name: "userList",
      component: UserList, //일반회원리스트
    },
    {
      path: "eventList",
      name: "eventList",
      component: EventList, //이벤트리스트
    },

    {
      path: "eventInfo",
      name: "eventInfo",
      component: EventInfo, //이벤트단건조회
    },
    {
      path: "eventForm",
      name: "eventForm",
      component: EventForm, //이벤트등록
    },
    {
      path: "eventModify",
      name: "eventModify",
      component: EventModify, //이벤트수정
    },

    {
      path: "couponUser",
      name: "couponUser",
      component: CouponUser, //쿠폰일괄발급
    },

    {
      path: "couponList",
      name: "couponList",
      component: CouponList, //쿠폰리스트
    },

    {
      path: "couponForm",
      name: "couponForm",
      component: CouponForm, //쿠폰폼
    },

    {
      path: "reportList",
      name: "reportList",
      component: ReportList, //신고내역리스트
    },
  ],
};
