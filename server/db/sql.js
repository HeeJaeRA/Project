module.exports = {
	//유저로그인
	login: `SELECT * FROM user WHERE user_id = ?`,
	//아이디 찾기
	findinfo: `SELECT user_id, user_pw, user_name FROM user WHERE phone = ? AND user_status != '탈퇴회원'`,
	//비밀번호 변경
	changepw: `UPDATE user set user_pw = ? WHERE phone = ? AND user_status != '탈퇴회원'`,
	//회원가입(닉네임체크)
	nicknamecheck: `SELECT * FROM user WHERE nickname = ?`,
	userjoin: `insert into user set ?`,
	//회원정보수정
	updateinfo: `update user set ? WHERE user_id= ?`,
	//회원정보삭제
	userdelete: `update user set user_status = '탈퇴회원', phone=null  WHERE user_id= ? AND user_pw = ?`,
	/*댓글*/
	relpylist: `SELECT reply_code, content, writer, write_date, commu_code, class, order_num, group_num, report_status, remove_status
 				FROM reply WHERE commu_code = ? AND class = 0 ORDER BY group_num, commu_code, order_num`,
	rerelpylist: `SELECT reply_code, content, writer, write_date, commu_code, class, order_num, group_num, report_status, remove_status
 			FROM reply WHERE commu_code = ? AND class = 1 AND group_num = ? ORDER BY group_num, commu_code, order_num`,

	replyinsert: `INSERT INTO reply SET content = ?, writer = ?, write_date = curdate(), commu_code = ?, class = 0, order_num = 0, group_num = 0, report_status = '정상댓글', remove_status = 'N'`,
	rereplyinsert1: `UPDATE reply SET order_num = order_num + 1 WHERE group_num = ? AND order_num > 0`,
	rereplyinsert2: `INSERT INTO reply SET content = ?, writer = ?, write_date = curdate(), commu_code = ?, class = 1, order_num = 1, group_num = ?, report_status = '정상댓글', remove_status = 'N'`,
	replydelete: `UPDATE reply SET remove_status = 'Y' WHERE reply_code = ?`,
	replyreport: `UPDATE reply SET  report_status = '신고댓글' WHERE reply_code = ?`,
	replyinfo: `SELECT * FROM reply WHERE reply_code = ?`,
	replyupdate: `UPDATE reply SET content = ? WHERE reply_code = ?`,
	replyinsertgroup: `UPDATE reply SET group_num = ? WHERE reply_code = ?`,

	// 판매자
	rsalllist: `select * from restaurant`,
	rsalllistp: `select * from restaurant limit 8 offset ?`,
	rslist: `select * from restaurant order by rand() limit 4`,
	rsmylist: `select * from restaurant where seller_id = ?`,
	rsmylistW: `select * from restaurant where seller_id = ? and (rs_status = '승인대기' or rs_status = '반려')`,
	rsmylistO: `select * from restaurant where seller_id = ? and (rs_status = '영업승인' or rs_status = '영업중지')`,
	rsinfo: `select * from restaurant where rs_code = ?`,
	rslike: `update restaurant set like_cnt = like_cnt + 1 where rs_code = ?`,
	rsbookmark: `insert IGNORE into bookmark (user_id, rs_code) values (?, ?)`,
	selnoticelist: `SELECT * FROM notice where user_division = '판매자'`,
	rsInsert: `insert into restaurant set ?`,
	rsUpdate: `update restaurant set ? where rs_code = ?`,
	comImgInsert: `insert into img set commu_code = ?, img_name = ?`,
	sellqnalist: `select * from qna where user_divison = '판매자' and writer = ?`,
	rsStatus: 'select rs_status from restaurant where rs_code = ?',
	rsStatusUpdateA: `update restaurant set rs_status = '영업중지' where rs_code = ?`,
	rsStatusUpdateD: `update restaurant set rs_status = '영업승인' where rs_code = ?`,
	rsTimeInsert: `insert into restaurant_time set rs_code = ?, time = ?`,
	rsTimeDelete: `delete from restaurant_time where rs_code = ?`,
	rsaddlist: `select * from restaurant where gu_gun = ? limit 8 offset ?`,
	rscatelist: `select * from restaurant where category = ? limit 8 offset ?`,
	sellermyreserv: `select p.payment_code, rv.reserve_num, rs.rs_name, reserve_name, reserve_phone, visit_name, visit_phone, rv.reserve_year, rv.reserve_month, rv.reserve_day, rv.reserve_time, rv.head_cnt, p.money, rv.payment_status from payment p left join restaurant rs on p.rs_code = rs.rs_code left join reservation rv on p.reserve_num = rv.reserve_num where p.reserve_num = any(select reserve_num from reservation where rs_code = any(select rs_code from restaurant where seller_id = ?)) and rv.payment_status = '결제완료'`,
	sellermyreservall: `select p.payment_code, rv.reserve_num, rs.rs_name, reserve_name, reserve_phone, visit_name, visit_phone, rv.reserve_year, rv.reserve_month, rv.reserve_day, rv.reserve_time, rv.head_cnt, p.money, rv.payment_status from payment p left join restaurant rs on p.rs_code = rs.rs_code left join reservation rv on p.reserve_num = rv.reserve_num where p.reserve_num = any(select reserve_num from reservation where rs_code = any(select rs_code from restaurant where seller_id = ?))`,
	rstag: `select * from restaurant where tag LIKE concat(concat('%',?),'%') limit 8 offset ?`,
	rvCheck: `update reservation set payment_status = '방문확정' where reserve_num = ?`,
	visitCheck: `update user set reserve_cnt = reserve_cnt + 1 where user_id = (select user_id from reservation where reserve_num = ?)`,
	// rvGrade1: `update user set grade = '맛잘알' where user_id = (select user_id from reservation where reserve_num = ?) and reserve_cnt = 5`,
	// rvGrade2: `update user set grade = '쩝쩝박사' where user_id = (select user_id from reservation where reserve_num = ?) and reserve_cnt = 10`,
	rsreviewlike: 'update review set like_cnt = like_cnt + 1 where review_code = ?',

	rsInsert: `insert into restaurant set ?`,
	rsUpdate: `update restaurant set ? where rs_code = ?`,
	comImgInsert: `insert into img set commu_code = ?, img_name = ?`,
	sellqnalist: `select * from qna where user_divison = '판매자' and writer = ?`,
	rsStatusUpdate: `update restaurant set rs_status = '영업중지' where rs_code = ?`,
	rsTimeInsert: `insert into restaurant_time set rs_code = ?, time = ?`,
	rsTimeDelete: `delete from restaurant_time where rs_code = ?`,

	rssearch: `SELECT * FROM restaurant WHERE rs_name LIKE concat(concat('%',?),'%')`,

	/* ----------------- 예약 ----------------- */
	getRestaurant: `SELECT * FROM restaurant WHERE rs_code = ?`, //일단 test
	// getSeat: `SELECT seat_cnt FROM restaurant WHERE rs_code = ?`,
	// getHoliday: `SELECT holiday FROM restaurant WHERE rs_code = ?`,
	// getdeposit: `SELECT deposit FROM restaurant_time WHERE rs_code = ?`,
	getTime: `SELECT time FROM restaurant_time WHERE rs_code = ?`,
	goCart: `INSERT INTO reservation SET ?`,

	/* ----------------- 대시보드 ----------------- */
	getDash: `SELECT num FROM reserve_info WHERE rs_code = ? AND reserve_time = ? AND reserve_day = ? AND reserve_month = ? AND reserve_year = ?`,
	inDash: `INSERT INTO reserve_info SET ?`,
	upDash: `UPDATE reserve_info SET seat_cnt = seat_cnt + ? WHERE num = ?`,
	getSeat: `SELECT seat_cnt FROM reserve_info WHERE rs_code = ? AND reserve_time = ? AND reserve_day = ? AND reserve_month = ? AND reserve_year = ?`,
	delDash: `UPDATE reserve_info SET seat_cnt = seat_cnt - ? WHERE rs_code = ? AND reserve_time = ? AND reserve_day = ? AND reserve_month = ? AND reserve_year = ?`,
	getMyCartList: `SELECT * FROM reservation WHERE user_id = ? AND payment_status = '결제대기'`,

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

	/* ----------------- 결제 ----------------- */
	payUser: `SELECT user_name, phone FROM user WHERE user_id = ?`,
	resInfo: `SELECT resta.rs_code, re.reserve_num, resta.rs_name, re.reserve_year, re.reserve_month, re.reserve_day, re.reserve_time, re.head_cnt, re.amount FROM reservation re JOIN restaurant resta ON (re.rs_code = resta.rs_code) WHERE re.reserve_num = ?`,
	coupList: `SELECT uc.coupon_code, c.coupon_name, c.discount_rate FROM user_coupon uc JOIN coupon c ON(uc.coupon_code = c.coupon_code) WHERE uc.user_id = ? AND uc.coupon_status = '사용가능'`,
	orderPayment: `INSERT INTO payment SET ?`,
	coupUpdate: `UPDATE user_coupon SET coupon_status = '사용완료' WHERE coupon_code = ? AND user_id = ?`,
	cartEachDone: `UPDATE reservation SET payment_status = '결제완료' WHERE reserve_num = ?`,

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

	//마이페이지 자동 등급 업그레이드
	upgrade: `UPDATE user
				SET grade = CASE
					WHEN (select * from (select count(payment_status) OK from reservation where payment_status = '방문확정' and user_id= ? )A) >= 10
					THEN '쩝쩝박사'
					WHEN ((select * from (select count(payment_status) OK from reservation where payment_status = '방문확정' and user_id= ? )B) >= 5)
					THEN '맛잘알'
					ELSE '맛초보' END
					WHERE user_id= ? `,

	//마이페이지 사용가능 쿠폰정보 불러오기
	validusercouponlist: `select * from vaild_coupon where user_id=? ORDER BY end_date LIMIT 5 OFFSET ?`,

	/* validusercouponlist의 VIEW
	CREATE VIEW vaild_coupon AS (SELECT uc.user_id, 
							c.coupon_code, 
							c.coupon_name,
							c.discount_rate, 
							c.end_date, 
							uc.coupon_status 
							FROM coupon c RIGHT JOIN user_coupon uc ON c.coupon_code = uc.coupon_code 
							WHERE uc.coupon_status ='사용가능');*/

	//마이페이지 사용불가 쿠폰정보 불러오기
	invalidusercouponlist: `select * from invaild_coupon where user_id= ? ORDER BY end_date DESC LIMIT 5 OFFSET ?`,

	/* invalidusercouponlist의 VIEW
	CREATE VIEW invaild_coupon AS (SELECT uc.user_id, 
				uc.coupon_code, 
				c.coupon_name, 
				c.discount_rate, 
				c.end_date, 
				uc.coupon_status, 
				p.payment_code 
				FROM coupon c RIGHT JOIN user_coupon uc ON c.coupon_code = uc.coupon_code 
				left JOIN payment p ON uc.coupon_code = p.coupon_code 
				WHERE uc.coupon_status !='사용가능');*/

	//마이페이지 예약내역 리스트 불러오기
	myReservationList: `select * from myReservation where user_id= ? ORDER BY rs_code LIMIT 5 OFFSET ?`,

	/* myReservationList의 VIEW
			CREATE VIEW myReservation AS (SELECT 
				t.category,
				t.rs_name,
				SUBSTR(t.address,7) address,
				t.phone, 
				r.head_cnt, 
				concat(r.reserve_year,'-', r.reserve_month,'-', r.reserve_day) reserve_date, 
				r.reserve_time, 
				r.payment_status, 
				r.reserve_num, 
				rc.review_code,
				t.rs_code,
				r.user_id
			FROM restaurant t JOIN reservation r ON t.rs_code = r.rs_code 
			LEFT JOIN review rc ON rc.reserve_num = r.reserve_num 
			where r.payment_status IN ('결제취소', '결제완료', '방문확정') 
			ORDER BY reserve_num DESC);
	*/

	//마이페이지 QNA 리스트 불러오기
	myQnaList: `select * from qna WHERE writer= ? ORDER BY write_date DESC LIMIT 5 OFFSET ?`,

	//마이페이지 COMMUNITY 리스트 불러오기
	communityList: `select * from communityList where user_id= ? ORDER BY write_date DESC LIMIT 5 OFFSET ?`,

	/* communityList의 VIEW
	CREATE VIEW communityList AS (select commu_code, title, SUBSTR(content,1,8)AS 'content', write_date, view_cnt, user_id FROM community);
	*/

	//마이페이지 결제취소(reservation테이블은 업데이트, payment테이블은 삭제)
	updatecancle: `update reservation set payment_status = '결제취소' where user_id = ? AND reserve_num= ?`,
	selectcancle: `select payment_code from payment where reserve_num= ?`,
	deletecancle: `delete from payment 
							where payment_code= 
							(select payment_code from 
								(select payment_code from payment where reserve_num= ? )
							save)`,

	//마이페이지 나의 리뷰 불러오기
	myReviewList: `select r.*,
					i.img_name,
					t.rs_name,
					t.rs_desc
					from review r left join img i 
					on r.review_code = i.review_code 
					left join restaurant t 
					on r.rs_code = t.rs_code 
					where r.writer = ?
					group by r.review_code`,

	//마이페이지 나의 찜목록 불러오기
	myBookmark: `select r.* , b.user_id
				from restaurant r join bookmark b
				on r.rs_code = b.rs_code
				where b.user_id = ?`,

	/* ----------------- 게시판 ----------------- */
	//판매자로그인
	sellerlogin: `SELECT * FROM seller WHERE seller_id = ?`,
	//판매자 아이디 찾기
	sellerfindinfo: `SELECT seller_id, seller_pw, seller_name FROM seller WHERE phone = ?`,
	//판매자 비밀번호 변경
	sellerchangepw: `UPDATE seller set seller_pw = ? WHERE phone = ?`,
	//판매자 회원가입
	sellerjoin: `insert into seller set ?`,

	/* ------------------------------- 일반회원 게시판 ------------------------------- */
	/*게시판 - 공지사항 찐*/
	noticelist: `SELECT notice_code, title, user_id, write_date, view_cnt, notice_important FROM notice WHERE user_division = '일반유저' ORDER BY notice_important, write_date`,
	noticelistp: `SELECT notice_code, title, user_id, write_date, view_cnt, notice_important FROM notice WHERE user_division = '일반유저' ORDER BY notice_important, write_date LIMIT 10 OFFSET ?`,
	noticeinfo: `SELECT notice_code, title, user_id, write_date, view_cnt, content FROM notice WHERE notice_code = ?`,
	viewcnt: `UPDATE notice SET view_cnt=view_cnt+1 WHERE notice_code = ?`, // 조회수

	/*게시판 - 이벤트 */
	eventlist: `SELECT event_code, banner_img, title, eventstart_date, eventend_date FROM event ORDER BY eventstart_date desc`,
	eventlistp: `SELECT event_code, banner_img, title, eventstart_date, eventend_date FROM event ORDER BY eventstart_date desc LIMIT 10 OFFSET ?`,
	eventinfo: `SELECT event_code, main_img, title, writer, write_date, content, eventstart_date, eventend_date, coupon_code FROM event WHERE event_code = ?`,
	eventcurrentlist: `SELECT event_code, banner_img, title, eventstart_date, eventend_date FROM event WHERE eventend_date >= CURDATE()`,
	eventcurrentlistp: `SELECT event_code, banner_img, title, eventstart_date, eventend_date FROM event WHERE eventend_date >= CURDATE() order by eventstart_date desc LIMIT 5 OFFSET ?`,
	eventendlist: `SELECT event_code, banner_img, title, eventstart_date, eventend_date FROM event WHERE eventend_date < CURDATE()`,
	eventendlistp: `SELECT event_code, banner_img, title, eventstart_date, eventend_date FROM event WHERE eventend_date < CURDATE() LIMIT 5 OFFSET ?`,
	eventinsertcoupon: `INSERT IGNORE INTO user_coupon SET ?`,

	/*게시판 - QnA 이게 진짜임*/
	qnalist: `SELECT qna_code, title, write_date, qna_status, qna_divison, ans_code FROM qna WHERE user_divison = '일반유저' AND writer = ? ORDER BY write_date DESC`,
	qnalistp: `SELECT qna_code, title, write_date, qna_status, qna_divison, ans_code FROM qna WHERE user_divison = '일반유저' AND writer = ? ORDER BY qna_code DESC, write_date DESC LIMIT 10 OFFSET ?`,
	qnainfo: `SELECT qna_code, title, write_date, content, qna_status, qna_divison, ans_code FROM qna WHERE writer =? AND qna_code = ?`,
	answerinfo: `SELECT b.qna_code, b.title, b.write_date, b.content, a.qna_status, a.qna_divison, b.ans_code, b.cnt FROM qna a JOIN qna b ON a.qna_code = b.ans_code WHERE b.ans_code = ?`,
	qnainsert: `INSERT INTO qna SET ?`,
	qnaupdate: `UPDATE qna SET ? WHERE writer = ? AND qna_code = ? AND qna_status = '답변대기'`,
	qnadelete: `DELETE FROM qna WHERE qna_code = ?`,
	qnaimgdelete: `DELETE FROM img WHERE qna_code = ?`,

	/*게시판 - 커뮤니티 이게 진짜*/
	comlist: `SELECT commu_code, title, user_id, write_date, view_cnt, (select count(*) from reply where community.commu_code = reply.commu_code) AS rcount FROM community`,
	comlistp: `SELECT commu_code, title, user_id, write_date, view_cnt, (select count(*) from reply where community.commu_code = reply.commu_code) AS rcount FROM community ORDER BY commu_code DESC, write_date DESC LIMIT 10 OFFSET ?`,
	cominfo: `SELECT commu_code, title, content, user_id, write_date, view_cnt FROM community WHERE commu_code = ?`,
	cominsert: `INSERT INTO community SET ?`,
	comupdate: `UPDATE community SET ? WHERE commu_code = ?`,
	comdelete: `DELETE FROM community WHERE commu_code = ?`,
	comviewcnt: `UPDATE community SET view_cnt=view_cnt+1 WHERE commu_code = ?`,
	comreplydelete: `DELETE FROM reply WHERE commu_code = ?`,
	commuRecnt: `SELECT count(*) as cnt FROM reply WHERE commu_code = ?`,
	commuImgcnt: `SELECT count(*) as cnt FROM img WHERE commu_code = ?`,
	comimgdelete: `DELETE FROM img WHERE commu_code= ? `,

	/*게시판 - REVIEW 이게찐 */
	reviewlist: `SELECT r.review_code, r.title, r.write_date, r.writer, r.star_taste, r.star_price, r.star_service, r.like_cnt, x.rs_name 
    FROM review r JOIN restaurant x ON r.rs_code = x.rs_code ORDER BY r.write_date LIMIT 10 OFFSET ?`,
	reviewinfo: `SELECT r.review_code, r.title, r.write_date, r.content, r.writer, r.star_taste, r.star_price, r.star_service, r.like_cnt, r.rs_code, y.reserve_num, concat(y.reserve_year, '-', y.reserve_month, '-', y.reserve_day) AS "yday", x.rs_name
    FROM review r 
    JOIN reservation y ON r.reserve_num = y.reserve_num
    JOIN restaurant x ON r.rs_code = x.rs_code
    WHERE r.review_code = ?`,
	// reviewlist: `SELECT review_code, title, write_date, like_cnt FROM review`,
	reviewgetRcode: 'select rs_code from reservation where reserve_num = ?',
	reviewInsert: `insert into review set ?`,
	reviewPhotoInsert: `insert into img set review_code = ?, img_name = ? `,
	rsreviewlist: 'select * from review where rs_code = ?',
	reviewstarupdate: `update restaurant set star_taste = (select truncate(avg(star_taste), 0) as star_taste from review where rs_code = ?), star_price = (select truncate(avg(star_price), 0) as star_price from review where rs_code = ?), star_service = (select truncate(avg(star_service), 0) as star_service from review where rs_code = ?) where rs_code = (select rs_code from review where review_code = ?)`,
	boardreviewlist: 'select * from review',

	/*게시판 - 이미지 찐*/
	comImgInsert: `insert into img set commu_code = ?, img_name = ?`,
	qnaImgInsert: `INSERT INTO img SET qna_code = ?, img_name = ?`,
	qnaImg: `SELECT img_name FROM img WHERE qna_code = ?`,
	commuImg: `SELECT * FROM img WHERE commu_code = ?`,
	qnaImgcnt: `select count(qna_code)as cnt from img where qna_code=?`,
	noticeImg: `SELECT * FROM img WHERE notice_code = ?`,
	reviewImg: `SELECT * FROM img WHERE review_code = ?`,

	/*이미지 보류*/
	// comImgInsert: `insert into img set commu_code = ?, img_name = ?`,
	// qnaImgInsert: `INSERT INTO img SET qna_code = ?, img_name = ?`,
	// qnaImg: `SELECT img_name FROM img WHERE qna_code = ?`,
	// commuImg: `SELECT * FROM img WHERE commu_code = ?`,
	// noticeImg: `SELECT * FROM img WHERE notice_code = ?`,
	// reviewImg: `SELECT * FROM img WHERE review_code = ?`,
	// comImgInsert: `insert into img set commu_code = ?, img_name = ?`,
	// qnaImgInsert: `INSERT INTO img SET qna_code = ?, img_name = ?`,
	// qnaImg: `SELECT img_name FROM img WHERE qna_code = ?`,
	// qnaImgcnt: `select count(qna_code)as cnt from img where qna_code=?`,
	// commuImg: `SELECT * FROM img WHERE commu_code = ?`,
	// noticeImg: `SELECT * FROM img WHERE notice_code = ?`,

	// /*게시판 이미지*/
	// comImgInsert: `insert into img set commu_code = ?, img_name = ?`,
	// qnaImgInsert: `INSERT INTO img SET qna_code = ?, img_name = ?`,
	// qnaImg: `SELECT img_name FROM img WHERE qna_code = ?`,
	// qnaImgcnt: `select count(qna_code)as cnt from img where qna_code=?`,
	// commuImg: `SELECT * FROM img WHERE commu_code = ?`,
	// noticeImg: `SELECT * FROM img WHERE notice_code = ?`,

	/*게시판 - 댓글 찐*/
	relpylist: `SELECT reply_code, content, writer, write_date, commu_code, class, order_num, group_num, report_status, remove_status
    FROM reply WHERE commu_code = ? AND class = 0 ORDER BY group_num, commu_code, order_num`,
	rerelpylist: `SELECT reply_code, content, writer, write_date, commu_code, class, order_num, group_num, report_status, remove_status
  FROM reply WHERE commu_code = ? AND class = 1 AND group_num = ? ORDER BY group_num, commu_code, order_num`,
	replyinsert: `INSERT INTO reply SET content = ?, writer = ?, write_date = curdate(), commu_code = ?, class = 0, order_num = 0, group_num = 0, report_status = '정상댓글', remove_status = 'N'`,
	rereplyinsert1: `UPDATE reply SET order_num = order_num + 1 WHERE group_num = ? AND order_num > 0`,
	rereplyinsert2: `INSERT INTO reply SET content = ?, writer = ?, write_date = curdate(), commu_code = ?, class = 1, order_num = 1, group_num = ?, report_status = '정상댓글', remove_status = 'N'`,
	replydelete: `UPDATE reply SET remove_status = 'Y' WHERE reply_code = ?`,
	replyreport: `UPDATE reply SET  report_status = '신고댓글' WHERE reply_code = ?`,
	replyinfo: `SELECT * FROM reply WHERE reply_code = ?`,
	replyupdate: `UPDATE reply SET content = ? WHERE reply_code = ?`,
	replyinsertgroup: `UPDATE reply SET group_num = ? WHERE reply_code = ?`,

	/*검색 찐*/
	searchnotice: `SELECT * FROM notice  WHERE user_division = '일반유저' AND ?? LIKE concat(concat('%',?),'%')`,
	searchcommu: `SELECT * FROM community WHERE ?? LIKE concat(concat('%',?),'%')`,
	searchreview: `SELECT r.review_code, r.title, r.write_date, r.writer, r.star_taste, r.star_price, r.star_service, r.like_cnt, x.rs_name 
    FROM review r JOIN restaurant x ON r.rs_code = x.rs_code WHERE ?? LIKE concat(concat('%',?),'%')`,

	/*페이지 찐*/
	page: `select count(*) as cnt from ??`,
	pagewhere: `select count(*) as cnt from ?? WHERE ?? = ?`,
	pageeventing: `select count(*) as cnt from event WHERE eventend_date >= CURDATE()`,
	pageeventend: `select count(*) as cnt from event WHERE eventend_date < CURDATE()`,

	/*게시판 이미지*/
	comImgInsert: `insert into img set commu_code = ?, img_name = ?`,
	qnaImgInsert: `INSERT INTO img SET qna_code = ?, img_name = ?`,
	qnaImg: `SELECT img_name FROM img WHERE qna_code = ?`,
	qnaImgcnt: `select count(qna_code)as cnt from img where qna_code=?`,
	commuImg: `SELECT * FROM img WHERE commu_code = ?`,
	noticeImg: `SELECT * FROM img WHERE notice_code = ?`,

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
	couponCheck: `select count(*) as c from user_coupon where coupon_code = ?`,
	//일반회원
	gradeUserList: `SELECT *FROM user WHERE grade =? and user_status= '활동회원' `, //관리자 - 등급별회원리스트출력
	adminuserList: `SELECT *FROM user where user_status='활동회원'`, //활동회원전체리스트
	allUserList: `select *from user where user_status='활동회원' or user_status='탈퇴회원' or user_status='정지회원' `, //전체 일반회원리스트
	adminGetUserInfo: `select *from user where user_id=?`, //회원한건조회
	adminGetpenalty: `select penalty from user where user_id=?`, //회원패널티조회

	//업체
	adminConfirmSeller: `select *from restaurant where rs_status ='승인대기'`, //승인대기목록업체
	adminApprove: `update restaurant set rs_status =? where rs_code=?;`, //영업승인/반려하기
	adminRsList: `select *from restaurant where rs_status ='영업승인' or rs_status='영업중지'`, //영업승인 + 영업중지 리스트

	//qna
	//qna 이미지 가져오기
	getQnaImg: `select *from img where qna_code=?`,
	adminQnaInfo: `select *from qna where qna_code=?`, //한건조회
	adminSellerQna: `select *from qna where user_divison = ? and ans_code=0`, //전체목록
	adminSellerQnaCategory: `select *from qna where ans_code=0 and user_divison = ? and qna_divison = ?`, //전체목록-카테고리
	adminSellerNqna: `select *from qna where qna_status='답변대기' and user_divison=? and ans_code=0`, // 답변대기
	adminSellerWaitCategory: `select *from qna where ans_code=0 and user_divison = ?and qna_status ='답변대기' and qna_divison = ?`, //답변대기-카테고리
	adminSellerQnaDone: `select *from qna where qna_status='답변완료' and user_divison=? and ans_code=0`, //답변완료
	adminSellerQnaDoneCategory: `select *from qna where qna_status='답변완료' and user_divison=? and ans_code=0 and qna_divison = ?`, //답변완료 -카테고리
	//메인 5개 답변대기
	adminMainQna: `select *from qna where qna_status='답변대기' and user_divison=? and ans_code=0  order by write_date desc limit 5`,

	//관리자 답변
	adminQnaInsert: `insert into qna set ?`,
	//답변달면 해당 번호 상태 답변완료처리
	adminQnaUpdate: `update qna set qna_status='답변완료' where qna_code =?`,
	//관리자 답변 수정 .
	adminUpdateReply: `update qna set ? where qna_code=?`,
	//답변한건조회
	adminAnswerinfo: `SELECT b.qna_code, b.title, b.write_date, b.content, a.qna_status, a.qna_divison, b.ans_code ,b.cnt FROM qna a JOIN qna b ON a.qna_code = b.ans_code WHERE b.ans_code = ?`,
	//관리자 답변삭제
	adminReplyDelete: `delete from qna where qna_code=?`,
	//답변삭제하면 해당 질문글 답변대기로 업데이트
	adminQnaWaitUpdate: `update qna set qna_status='답변대기' where qna_code =?`,

	//판매자관리
	adminSellerList: `select *from seller`, //판매자리스트
	adminSellerInfo: `select s.seller_id, r.*from seller s left join restaurant r on (s.seller_id = r.seller_id) where s.seller_id =? and rs_status ='영업승인' or  rs_status ='영업중지'`,
	//공지사항 리스트
	adminNoticeList: `select *from notice where user_division = ?`,
	//공지사항 단건조회
	adminNoticeInfo: `select *from notice where notice_code =?`,
	//공지사항 등록
	adminInsertNotice: `insert into notice set ?`,
	//img테이블에서 첨부파일 여부 확인
	adminConfirmImg: `select count(notice_code)as cnt from img where notice_code=?`,
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
	//인기많은 카테고리 차트
	adminCategoryChart: `select r.category , COUNT(category) as cnt from restaurant r join payment p on r.rs_code = p.rs_code group by category`,
	//결제
	adminPaymentChart: `select r.rs_name, COUNT(rs_name) as cnt from restaurant r join payment p on r.rs_code = p.rs_code group by r.rs_code order by cnt desc limit 10`,
	//찜
	adminBookmarkChart: `select r.rs_name, COUNT(r.rs_code) as cnt from restaurant r join bookmark b on r.rs_code = b.rs_code group by r.rs_code order by cnt desc limit 10`,
	//리뷰
	adminReviewChart: `select rs_name ,truncate((star_taste+star_price+star_service)/3,1) as avg from restaurant order by avg desc limit 10`,

	//리뷰 리스트
	adminReviewList: `select *from review`,
	//리뷰한건조회
	adminReviewInfo: `select *from review where review_code=?`,
	//리뷰 이미지 가져오기
	adminGetReviewImg: `select *from img where review_code=?`,

	//생일쿠폰 스케쥴러 발급
	adminBdayCoupon: `SELECT coupon_code FROM coupon WHERE coupon_name LIKE '%생일%' AND month(start_date) = ?`,

	//기간만료 ..처리....

	adminEndCoupon: `update user_coupon set coupon_status = '기간만료' where coupon_code =any(select coupon_code from coupon where end_date < current_date())`,
	//관리자---------------------------------------------------------------------------------------
};

// join : `insert into user(birthday, gender, grade, join_date, nickname, penalty, phone, profile, reserve_cnt, sns_status, user_id, user_name, user_pw, user_status, banned_cnt) values
// ('2023-12-01', 'F', '맛잘알', current_date(),'가가', 0, '010-3333-3333','',0,'사이트계정','user3','김가가','3333','활동회원', 0); `
