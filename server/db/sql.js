module.exports = {
  login: `SELECT * FROM login WHERE user_id = ?`,
  join: `insert into user set ?`,

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

  //관리자------------------------------------------------------------------
  //이벤트
  eventList: `SELECT *FROM event`, //관리자- 이벤트 리스트 출력
  eventInfo: `select * from event e join coupon c on(e.coupon_code=c.coupon_code) where event_code = ?`, //이벤트단건조회
  insertEvent: `INSERT INTO event set ?`, //관리자 - 이벤트 등록
  eventUpdate: `UPDATE event SET ? WHERE event_code = ?`, //관리자 - 이벤트 수정
  eventDelete: `DELETE FROM event where event_code =?`, //이벤트삭제
  // 쿠폰
  couponList: `select *from coupon`, //쿠폰 전체목록
  couponInfo: `select *from coupon where coupon_code=?`, //쿠폰 단건조회
  insertCoupon: `INSERT INTO coupon set?`, //관리자 - 쿠폰등록
  couponDelete: `delete from coupon where coupon_code=?`, //쿠폰삭제
  insertUserCoupon: `insert ignore into  user_coupon set?`, //쿠폰 일괄발급
  couponUpdate: `UPDATE coupon set ?  where coupon_code = ?`, //관리자 - 쿠폰수정
  //일반회원
  gradeUserList: `SELECT *FROM user WHERE grade =? and user_status= '활동회원' `, //관리자 - 등급별회원리스트출력
  adminuserList: `SELECT *FROM user where user_status='활동회원'`, //활동회원전체리스트
  allUserList: `select *from user`, //전체 일반회원리스트
  adminGetUserInfo: `select *from user where user_id=?`, //회원한건조회
  adminGetpenalty: `select penalty from user where user_id=?`, //회원패널티조회

  //업체
  adminConfirmSeller: `select *from restaurant where rs_status ='승인대기'`, //승인대기목록업체
  adminApprove: `update restaurant set rs_status =? where rs_code=?;`, //영업승인/반려하기
  adminRsList: `select *from restaurant where rs_status ='영업승인'`, //영업승인된 업체리스트

  //qna
  adminSellerQna: `select *from qna where user_divison = ? and ans_code=0`, //전체목록
  adminSellerQnaCategory: `select *from qna where ans_code=0 and user_divison = ? and qna_divison = ?`, //전체목록-카테고리
  adminSellerNqna: `select *from qna where qna_status='답변대기' and user_divison=? and ans_code=0`, // 답변대기
  adminSellerWaitCategory: `select *from qna where ans_code=0 and user_divison = ?and qna_status ='답변대기' and qna_divison = ?`, //답변대기-카테고리
  adminSellerQnaDone: `select *from qna where qna_status='답변완료' and user_divison=? and ans_code=0`, //답변완료
  adminSellerQnaDoneCategory: `select *from qna where qna_status='답변완료' and user_divison=? and ans_code=0 and qna_divison = ?`, //답변완료 -카테고리

  //관리자 답변
  adminQnaInsert: `insert into qna set ?`,
  //답변달면 해당 번호 상태 답변완료처리
  adminQnaUpdate: `update qna set qna_status='답변완료' where qna_code =?`,
  //관리자 답변 수정 .
  adminUpdateReply: `update qna set ? where qna_code=?`,
  adminAnswerinfo: `SELECT b.qna_code, b.title, b.write_date, b.content, a.qna_status, a.qna_divison, b.ans_code ,b.cnt
  FROM qna a JOIN qna b
  ON a.qna_code = b.ans_code
  WHERE b.ans_code = ?`,
  //관리자 답변삭제
  adminReplyDelete: `delete from qna where qna_code=?`,
  //답변삭제하면 해당 질문글 답변대기로 업데이트
  adminQnaWaitUpdate: `update qna set qna_status='답변대기' where qna_code =?`,

  //판매자관리
  adminSellerList: `select *from seller`, //판매자리스트
  adminSellerInfo: `select s.seller_id, r.*from seller s left join restaurant r on (s.seller_id = r.seller_id) where s.seller_id = ?`, //판매자가 운영중인 업체정보
  //공지사항 리스트
  adminNoticeList: `select *from notice where user_division = ?`,
  //공지사항 단건조회
  adminNoticeInfo: `select *from notice where notice_code =?`,
  //공지사항 등록
  adminInsertNotice: `insert into notice set ?`,
  //공지사항 등록 이미지 img 테이블에 인서트
  noticeImgInsert: `insert into img set notice_code = ?, img_name = ?`,
  //공지사항 이미지 가져오기
  getNoticeImg: `select *from img where notice_code=?`,
  //공지사항 수정
  adminNoticeUpdate: `UPDATE notice SET ? WHERE notice_code = ?`,
  //공지사항 삭제
  adminNoticeDelete: `delete from notice where notice_code=?`,
  //img 테이블 삭제
  adminImgDelete: `delete from img where notice_code=?`,

  //관리자---------------------------------------------------------------------------------------
};

// join : `insert into user(birthday, gender, grade, join_date, nickname, penalty, phone, profile, reserve_cnt, sns_status, user_id, user_name, user_pw, user_status, banned_cnt) values
// ('2023-12-01', 'F', '맛잘알', current_date(),'가가', 0, '010-3333-3333','',0,'사이트계정','user3','김가가','3333','활동회원', 0); `
