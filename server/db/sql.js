module.exports = {
  login: `SELECT * FROM login WHERE user_id ='?'`,
  eventList: `SELECT *FROM event`, //관리자- 이벤트 리스트 출력
  eventInfo: `SELECT *FROM event WHERE event_code =?`, //관리자 - 이벤트 단건조회
  insertEvent: `INSERT INTO event set ?`, //관리자 - 이벤트 등록
};
