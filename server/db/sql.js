module.exports = {
  // 로그인, 회원가입
  login: `SELECT * FROM login WHERE user_id = ?`,
  join: `insert into user set ?`,

  // 장바구니
  cartMyCnt: `SELECT count(user_id) AS cnt FROM reservation WHERE user_id = ? AND payment_status = '결제대기'`,
  cartList: `SELECT resta.rs_code, re.reserve_num, resta.rs_name, re.reserve_year, re.reserve_month, re.reserve_day, re.reserve_time, re.head_cnt, re.amount, re.booking_date, re.payment_status FROM reservation re JOIN restaurant resta ON (re.rs_code = resta.rs_code) WHERE user_id = ? AND re.payment_status = '결제대기'`,
  cartAllDel: `UPDATE reservation SET payment_status = '예약취소' WHERE user_id = ?`,
  cartEachDel: `UPDATE reservation SET payment_status = '예약취소' WHERE reserve_num = ?`,

  // 결제
  payUser: `SELECT user_name, phone FROM user WHERE user_id = ?`,
  resInfo: `SELECT resta.rs_code, re.reserve_num, resta.rs_name, re.reserve_year, re.reserve_month, re.reserve_day, re.reserve_time, re.head_cnt, re.amount FROM reservation re JOIN restaurant resta ON (re.rs_code = resta.rs_code) WHERE re.reserve_num = ?`,
  coupList: `SELECT uc.coupon_code, c.coupon_name, c.discount_rate FROM user_coupon uc JOIN coupon c ON(uc.coupon_code = c.coupon_code) WHERE uc.user_id = ? AND uc.coupon_status = '사용가능'`,
  orderPayment: `INSERT INTO payment SET ?`,
  coupUpdate: `UPDATE user_coupon SET coupon_status = '사용완료' WHERE coupon_code = ? AND user_id = ?`,
  cartEachDone: `UPDATE reservation SET payment_status = '결제완료' WHERE reserve_num = ?`,

  /*게시판 - 공지사항*/
  noticelist: `SELECT notice_code, title, user_id, write_date, view_cnt FROM notice`,
  noticeinfo: `SELECT notice_code, title, user_id, write_date, view_cnt, content FROM notice WHERE notice_code = ?`,

  // 조회수
  viewcnt: `UPDATE notice SET view_cnt=view_cnt+1 WHERE notice_code = ?`,

  /*게시판 - 이벤트*/
  eventlist: `SELECT event_code, banner_img, title, eventstart_date, eventend_date FROM event`,
  eventinfo: `SELECT event_code, main_img, title, writer, write_date, content, eventstart_date, eventend_date, coupon_code FROM event`,

  /*게시판 - QnA*/
  qnalist: `SELECT qna_code, title, write_date, qna_status, qna_divison, ans_code 
                FROM qna WHERE user_divison = '일반' AND writer = 'user1'`,
  qnainfo: `SELECT qna_code, title, write_date, content, qna_status, qna_divison, ans_code FROM qna WHERE qna_code = ?`,
  answerinfo: `SELECT a.qna_code, b.title, b.write_date, b.content, a.qna_status, a.qna_divison, b.ans_code 
                    FROM qna a JOIN qna b
                    ON a.qna_code = b.ans_code
                    WHERE b.ans_code = ?`,

  /*게시판 - 커뮤니티*/
  comlist: `SELECT commu_code, title, user_id, write_date, view_cnt FROM community`,
  cominfo: `SELECT commu_code, title, content, user_id, write_date, view_cnt FROM community WHERE commu_code = ?`,
  cominsert: `INSERT INTO community SET ?`,
  comupdate: `UPDATE community SET ? WHERE commu_code = ?`,
  comdelete: `DELETE FROM community WHERE commu_code = ?`,
  comviewcnt: `UPDATE community SET view_cnt=view_cnt+1 WHERE commu_code = ?`,

  /*게시판 - 리뷰 */
  reviewlist: `SELECT review_code, title, write_date, like_cnt FROM review`,

  /*댓글*/
  relpylist: ``,

  // 판매자
  ptinsert: `insert into imgtest set ?`,
  ptlist: `select * from imgtest`,
  ptinfo: `select * from imgtest where NO = ?`,
  rsalllist: `select * from restaurant`,
  rslist: `select * from restaurant order by rand() limit 4`,
  rsinfo: `select * from restaurant where rs_code = ?`,
  rslike: `update restaurant set like_cnt = like_cnt + 1 where rs_code = ?`,

  //관리자
  eventList: `SELECT *FROM event`, //관리자- 이벤트 리스트 출력
  eventInfo: `select * from event e join coupon c on(e.coupon_code=c.coupon_code) where event_code = ?`, //이벤트단건조회
  insertEvent: `INSERT INTO event set ?`, //관리자 - 이벤트 등록
  eventUpdate: `UPDATE event SET ? WHERE event_code = ?`, //관리자 - 이벤트 수정
  eventDelete: `DELETE FROM event where event_code =?`,
  couponList: `select *from coupon`, //쿠폰 전체목록
  insertCoupon: `INSERT INTO coupon set?`, //관리자 - 쿠폰등록
  insertUserCoupon: `insert into user_coupon set?`, //쿠폰 일괄발급
  couponUpdate: `UPDATE coupon set ?  where coupon_code = ?`, //관리자 - 쿠폰수정
  gradeUserList: `SELECT *FROM user WHERE grade =? and user_status= '활동회원' `, //관리자 - 등급별회원리스트출력
  userList: `SELECT *FROM user where user_status='활동회원'`, //활동회원전체리스트
};

// join : `insert into user(birthday, gender, grade, join_date, nickname, penalty, phone, profile, reserve_cnt, sns_status, user_id, user_name, user_pw, user_status, banned_cnt) values
// ('2023-12-01', 'F', '맛잘알', current_date(),'가가', 0, '010-3333-3333','',0,'사이트계정','user3','김가가','3333','활동회원', 0); `
