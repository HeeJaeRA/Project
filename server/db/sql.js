module.exports = {
  login: `SELECT * FROM login WHERE user_id ='?'`,
  eventList: `SELECT *FROM event`, //관리자- 이벤트 리스트 출력
  eventInfo: `select * from event e join coupon c on(e.coupon_code=c.coupon_code) where event_code = ?`, //이벤트단건조회
  insertEvent: `INSERT INTO event set ?`, //관리자 - 이벤트 등록
  eventUpdate: `UPDATE event SET ? WHERE event_code = ?`, //관리자 - 이벤트 수정
  eventDelete: `DELETE FROM event where event_code =?`,
  insertCoupon: `INSERT INTO coupon set?`, //관리자 - 쿠폰등록
  couponUpdate: `UPDATE coupon set ?  where coupon_code = ?`, //관리자 - 쿠폰수정
  gradeUserList: `SELECT *FROM user WHERE grade =? and user_status= '활동회원' `, //관리자 - 등급별회원리스트출력
  userList: `SELECT *FROM user`, //회원전체리스트
};
