module.exports = {
	//유저로그인
	login: `SELECT * FROM user WHERE user_id = ?`,
	//아이디 찾기
	findinfo: `SELECT user_id, user_pw, user_name FROM user WHERE phone = ?`,
	//비밀번호 변경
	changepw: `UPDATE user set user_pw = ? WHERE phone = ?`,
	//회원가입
	nicknamecheck: `SELECT * FROM user WHERE nickname = ?`,
	join: `insert into user set ?`,

	rsInsert: `insert into restaurant set ?`,
	rsUpdate: `update restaurant set ? where rs_code = ?`,
	comImgInsert: `insert into img set commu_code = ?, img_name = ?`,
	sellqnalist: `select * from qna where user_divison = '판매자' and writer = ?`,
	rsStatusUpdate: `update restaurant set rs_status = '영업중지' where rs_code = ?`,
	rsTimeInsert: `insert into restaurant_time set rs_code = ?, time = ?`,
	rsTimeDelete: `delete from restaurant_time where rs_code = ?`,

	/* ----------------- 예약 ----------------- */
	getRestaurant: `SELECT * FROM restaurant WHERE rs_code = ?`, //일단 test
	// getSeat: `SELECT seat_cnt FROM restaurant WHERE rs_code = ?`,
	// getHoliday: `SELECT holiday FROM restaurant WHERE rs_code = ?`,
	// getdeposit: `SELECT deposit FROM restaurant_time WHERE rs_code = ?`,
	getTime: `SELECT time FROM restaurant_time WHERE rs_code = ?`,
	goCart: `INSERT INTO reservation SET ?`,

	/* ----------------- 대시보드 ----------------- */
	getDash: `SELECT * FROM reserve_info WHERE rs_code = ? AND reserve_time = ? AND reserve_day = ? AND reserve_month = ? AND reserve_year = ?`,
	inDash: `INSERT INTO reserve_info SET ?`,
	upDash: `UPDATE reserve_info SET seat_cnt = seat_cnt + ? WHERE rs_code = ? AND reserve_time = ? AND reserve_day = ? AND reserve_month = ? AND reserve_year = ?`,
	getSeat: `SELECT seat_cnt FROM reserve_info WHERE rs_code = ? AND reserve_time = ? AND reserve_day = ? AND reserve_month = ? AND reserve_year = ?`,
	getResSeat: `SELECT seat_cnt FROM restaurant WHERE rs_code = ?`,

	/* ----------------- 장바구니(예약내역) ----------------- */
	cartMyCnt: `SELECT count(user_id) AS cnt FROM reservation WHERE user_id = ? AND payment_status = '결제대기'`,
	cartList: `SELECT resta.rs_code, re.reserve_num, resta.rs_name, re.reserve_year, re.reserve_month, re.reserve_day, re.reserve_time, re.head_cnt, re.amount, re.booking_date, re.payment_status FROM reservation re JOIN restaurant resta ON (re.rs_code = resta.rs_code) WHERE user_id = ? AND re.payment_status = '결제대기'`,
	cartAllDel: `UPDATE reservation SET payment_status = '예약취소' WHERE user_id = ?`,
	cartEachDel: `UPDATE reservation SET payment_status = '예약취소' WHERE reserve_num = ?`,

	/* ----------------- 결제 ----------------- */
	payUser: `SELECT user_name, phone FROM user WHERE user_id = ?`,
	resInfo: `SELECT resta.rs_code, re.reserve_num, resta.rs_name, re.reserve_year, re.reserve_month, re.reserve_day, re.reserve_time, re.head_cnt, re.amount FROM reservation re JOIN restaurant resta ON (re.rs_code = resta.rs_code) WHERE re.reserve_num = ?`,
	coupList: `SELECT uc.coupon_code, c.coupon_name, c.discount_rate FROM user_coupon uc JOIN coupon c ON(uc.coupon_code = c.coupon_code) WHERE uc.user_id = ? AND uc.coupon_status = '사용가능'`,
	orderPayment: `INSERT INTO payment SET ?`,
	coupUpdate: `UPDATE user_coupon SET coupon_status = '사용완료' WHERE coupon_code = ? AND user_id = ?`,
	cartEachDone: `UPDATE reservation SET payment_status = '결제완료' WHERE reserve_num = ?`,

	/*이미지*/
	comImgInsert: `insert into img set commu_code = ?, img_name = ?`,
	qnaImgInsert: `INSERT INTO img SET qna_code = ?, img_name = ?`,
	qnaImg: `SELECT img_name FROM img WHERE qna_code = ?`,
	commuImg: `SELECT * FROM img WHERE commu_code = ?`,
	noticeImg: `SELECT * FROM img WHERE notice_code = ?`,

	/* ----------------- 게시판 ----------------- */
	//판매자로그인
	sellerlogin: `SELECT * FROM seller WHERE seller_id = ?`,
	//판매자 아이디 찾기
	sellerfindinfo: `SELECT seller_id, seller_pw, seller_name FROM seller WHERE phone = ?`,
	//판매자 비밀번호 변경
	sellerchangepw: `UPDATE seller set seller_pw = ? WHERE phone = ?`,
	//판매자 회원가입
	sellerjoin: `insert into seller set ?`,

	//마이페이지 유저정보 불러오기
	getuserinfo: `select * from user where user_id = ?`,
	//마이페이지 사용가능 쿠폰정보 불러오기
	validusercouponlist: `SELECT uc.user_id, c.coupon_code, c.coupon_name,c.discount_rate, c.end_date, uc.coupon_status FROM coupon c RIGHT JOIN user_coupon uc ON c.coupon_code = uc.coupon_code WHERE uc.user_id = ? AND uc.coupon_status ='사용가능'`,

	//마이페이지 사용불가 쿠폰정보 불러오기
	invalidusercouponlist: `SELECT uc.user_id, uc.coupon_code, c.coupon_name, c.discount_rate, c.end_date, uc.coupon_status, p.payment_code FROM coupon c RIGHT JOIN user_coupon uc ON c.coupon_code = uc.coupon_code left JOIN payment p ON uc.coupon_code = p.coupon_code WHERE uc.user_id =? AND uc.coupon_status !='사용가능'`,
	/*게시판 - 공지사항*/
	noticelist: `SELECT notice_code, title, user_id, write_date, view_cnt, notice_important FROM notice WHERE user_division = '일반유저' ORDER BY notice_important, write_date`,
	noticeinfo: `SELECT notice_code, title, user_id, write_date, view_cnt, content FROM notice WHERE notice_code = ?`,

	// 조회수
	viewcnt: `UPDATE notice SET view_cnt=view_cnt+1 WHERE notice_code = ?`,
	/*게시판 - 이벤트*/
	eventlist: `SELECT event_code, banner_img, title, eventstart_date, eventend_date FROM event ORDER BY eventend_date desc`,
	eventinfo: `SELECT event_code, main_img, title, writer, write_date, content, eventstart_date, eventend_date, coupon_code FROM event WHERE event_code = ?`,
	eventcurrentlist: `SELECT event_code, banner_img, title, eventstart_date, eventend_date FROM event WHERE eventend_date >= CURDATE()`,
	eventendlist: `SELECT event_code, banner_img, title, eventstart_date, eventend_date FROM event WHERE eventend_date < CURDATE()`,
	eventinsertcoupon: `INSERT IGNORE INTO user_coupon SET ?`,
	/*게시판 - QnA*/
	qnalist: `SELECT qna_code, title, write_date, qna_status, qna_divison, ans_code 
                FROM qna WHERE user_divison = '일반유저' AND writer = ? ORDER BY write_date DESC`,
	qnainfo: `SELECT qna_code, title, write_date, content, qna_status, qna_divison, ans_code FROM qna WHERE writer =? AND qna_code = ?`,
	answerinfo: `SELECT b.qna_code, b.title, b.write_date, b.content, a.qna_status, a.qna_divison, b.ans_code FROM qna a JOIN qna b ON a.qna_code = b.ans_code WHERE b.ans_code = ?`,
	qnainsert: `INSERT INTO qna SET ?`,
	qnaupdate: `UPDATE qna SET ? WHERE writer = ? AND qna_code = ? AND qna_status = '답변대기'`,
	qnadelete: `DELETE FROM qna WHERE qna_code = ?`,

	/*게시판 - 커뮤니티*/
	comlist: `SELECT commu_code, title, user_id, write_date, view_cnt, 
				(select count(*) from reply where community.commu_code = reply.commu_code) AS rcount FROM community`,
	comlistp: `SELECT commu_code, title, user_id, write_date, view_cnt, (select count(*) from reply where community.commu_code = reply.commu_code) AS rcount FROM community ORDER BY write_date DESC LIMIT 10 OFFSET ?`,
	cominfo: `SELECT commu_code, title, content, user_id, write_date, view_cnt FROM community WHERE commu_code = ?`,
	cominsert: `INSERT INTO community SET ?`,
	comupdate: `UPDATE community SET ? WHERE commu_code = ?`,
	comdelete: `DELETE FROM community WHERE commu_code = ?`,
	comviewcnt: `UPDATE community SET view_cnt=view_cnt+1 WHERE commu_code = ?`,
	/*게시판 - 리뷰 */
	reviewlist: `SELECT review_code, title, write_date, like_cnt FROM review`,
	/*댓글*/
	relpylist: `WITH RECURSIVE rereply AS ( SELECT reply_code, content, writer, write_date, commu_code, class, order_num, group_num, report_status, remove_status, 0 AS depth FROM reply  WHERE class = 0 GROUP BY group_num UNION ALL SELECT r.reply_code, r.content, r.writer, r.write_date, r.commu_code, r.class, r.order_num, r.group_num, r.report_status, r.remove_status, rh.depth + 1 AS depth FROM reply r JOIN rereply rh ON r.class = rh.reply_code WHERE r.commu_code = 1) SELECT reply_code, content, writer, write_date, commu_code, class, order_num, group_num, report_status, remove_status, depth FROM rereply WHERE commu_code = ? ORDER BY group_num, depth, order_num`,

	/*검색*/
	searchnotice: `SELECT * FROM notice  WHERE user_division = '일반유저' AND ?? LIKE concat(concat('%',?),'%');`,
	searchcommu: `SELECT * FROM community WHERE ?? LIKE concat(concat('%',?),'%');`,

	/*페이지 */
	page: `select count(*) as cnt from ??`,

	// 판매자
	ptinsert: `insert into imgtest set ?`,
	ptlist: `select * from imgtest`,
	ptinfo: `select * from imgtest where NO = ?`,
	rsalllist: `select * from restaurant`,
	rsmylist: `select * from restaurant where seller_id = ? and rs_status = '영업승인'`,
	rslist: `select * from restaurant order by rand() limit 4`,
	rsinfo: `select * from restaurant where rs_code = ?`,
	rslike: `update restaurant set like_cnt = like_cnt + 1 where rs_code = ?`,
	rsbookmark: `insert IGNORE into bookmark (user_id, rs_code) values (?, ?)`,
	rsaddlist: `select * from restaurant where gu_gun = ?`,
	rscatelist: `select * from restaurant where category = ?`,
	// rsallplist: `SELECT * FROM restaurant LIMIT = ?, OFFSET = ?`,

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
	adminAnswerinfo: `SELECT b.qna_code, b.title, b.write_date, b.content, a.qna_status, a.qna_divison, b.ans_code ,b.cnt FROM qna a JOIN qna b ON a.qna_code = b.ans_code WHERE b.ans_code = ?`,
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
