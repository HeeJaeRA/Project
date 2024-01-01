// 관리자화면
import AdminLayout from "../views/AdminTemplate.vue";
import AdminMain from "../views/admin/AdminMain.vue"; //관리자메인
import AdminChart from "../views/admin/AdminChart.vue"; //관리자차트
import EventList from "../views/admin/EventList.vue"; //이벤트리스트
import EventInfo from "../views/admin/EventInfo.vue"; //이벤트단건조회
import EventForm from "../views/admin/EventForm.vue"; //이벤트 등록
import EventModify from "../views/admin/EventModify.vue"; //이벤트수정
import CouponUser from "../views/admin/CouponUser.vue"; //쿠폰 - 활동회원전체
import AllUserList from "../views/admin/AllUserList.vue";
import CouponList from "../views/admin/CouponList.vue"; //쿠폰리스트
import CouponInfo from "../views/admin/CouponInfo.vue"; //쿠폰 한건조회
import CouponModify from "../views/admin/CouponModify.vue"; //쿠폰
import Grade1 from "../views/admin/Grade1.vue"; //등급1
import Grade2 from "../views/admin/Grade2.vue"; //등급2
import Grade3 from "../views/admin/Grade3.vue"; //등급3
import CouponForm from "../views/admin/CouponForm.vue"; //쿠폰등록폼
import ManageRs from "../views/admin/ManageRs.vue"; //승인된 업체리스트
import SellerList from "../views/admin/SellerList.vue"; //판매자회원리스트
import SellerShop from "../views/admin/SellerShop.vue"; //판매자가 소유한 업체리스트
import NoticeSeller from "../views/admin/NoticeSeller.vue"; //판매자공지사항
import NoticeUser from "../views/admin/NoticeUser.vue"; //일반유저공지사항
import AllQnaUser from "../views/admin/AllQnaUser.vue"; //일반회원qna
import AllQnaSeller from "../views/admin/AllQnaSeller.vue"; //판매자 qna
import AdminQnaInfo from "../views/admin/AdminQnaInfo.vue"; //qna한건조회
import AdminAnswerInfo from "../views/admin/AdminAnswerInfo.vue"; //qna 답글조회
import AdminQnaWait from "../views/admin/QnaWait.vue"; // 판매자 미답변리스트
import AdminQnaDone from "../views/admin/QnaDone.vue"; // 판매자 답변완료리스트

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
      component: CouponUser, //쿠폰-활동회원전체
    },
    {
      path: "allUserList",
      name: "allUserList",
      component: AllUserList, //전체회원조회
    },

    {
      path: "couponList",
      name: "couponList",
      component: CouponList, //쿠폰리스트
    },

    {
      path: "couponInfo",
      name: "couponInfo",
      component: CouponInfo, //쿠폰단건조회
    },

    {
      path: "couponModify",
      name: "couponModify",
      component: CouponModify, //쿠폰수정
    },

    {
      path: "grade1",
      name: "grade1",
      component: Grade1, //grade1
    },
    {
      path: "grade2",
      name: "grade2",
      component: Grade2, //grade2
    },
    {
      path: "grade3",
      name: "grade3",
      component: Grade3, //grade3
    },

    {
      path: "couponForm",
      name: "couponForm",
      component: CouponForm, //쿠폰폼
    },
    {
      path: "manageRs",
      name: "manageRs",
      component: ManageRs, //영업승인된 업체리스트
    },
    {
      path: "sellerList",
      name: "sellerList",
      component: SellerList, //판매자회원리스트
    },
    {
      path: "sellerShop",
      name: "sellerShop",
      component: SellerShop, //판매자등록업체
    },
    {
      path: "noticeSeller",
      name: "noticeSeller",
      component: NoticeSeller, //판매자공지사항
    },
    {
      path: "noticeUser",
      name: "noticeUser",
      component: NoticeUser, //일반유저공지사항
    },
    {
      path: "allQnaSeller",
      name: "allQnaSeller",
      component: AllQnaSeller, //판매자qnalist
    },
    {
      path: "allQnaUser",
      name: "allQnaUser",
      component: AllQnaUser, //일반유저qnalist
    },
    {
      path: "adminQnaInfo",
      name: "adminQnaInfo",
      component: AdminQnaInfo, //qna한건조회
    },
    {
      path: "adminAnswerInfo",
      name: "adminAnswerInfo",
      component: AdminAnswerInfo, //qna답글조회
    },
    {
      path: "adminQnaWait",
      name: "adminQnaWait",
      component: AdminQnaWait, //답변대기 qna
    },
    {
      path: "adminQnaDone",
      name: "adminQnaDone",
      component: AdminQnaDone, //답변완료 qna
    },
  ],
};
