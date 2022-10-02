import { instance, createHeaders } from "./index";

/*
  userbookcollectionInfo : {userSeq, bookSeq, userbookCollectionImage, gugun, category}
  response.data: {statusCode, message} 
 */
function registerUserbookCollection(userbookCollectionInfo, success, error) {
  instance.post(`/book/register`, userbookCollectionInfo, { headers: createHeaders(token) }).then(success).catch(error);
}

/*
  response.data: {statusCode, message, collectedBookList: {userbookCollection}, totalBookList: {Book}}
 */
function getListByGugun(userSeq, gugun, success, error) {
  instance.get(`/book/listbygu/${userSeq}/${gugun}`, userSeq, gugun, { headers: createHeaders(token) }).then(success).catch(error);
}

/*
  response.data: {statusCode, message, collectedBookList: {userbookCollection}, totalBookList: {Book}}
*/
function getListByCategory(userSeq, category, success, error) {
  instance.get(`/book/listbycat/${userSeq}/${category}`, userSeq, category, { headers: createHeaders(token) }).then(success).catch(error);
}

/*
  이미 수집한 랜드마크인 경우
    response.data: {statusCode: 200, message: "랜드마크 조회 성공", {UserbookCollection}}
  수집 X
    response.data: {statusCode: 409, message: "수집하지 못한 랜드마크", {Book}}
*/
function getBookDetail(userSeq, bookSeq, success, error) {
  instance.get(`/book/${userSeq}/${bookSeq}`, userSeq, bookSeq).then(success).catch(error);
}



/*
  updateBookInfo : {userSeq, bookSeq, imageURL}
  response.data: {statusCode, message, {UserbookCollection}}
*/
function updateBookDetail(updateBookInfo,success, error) {
  instance.patch(`/book/update`, updateBookInfo, { headers: createHeaders(token) }).then(success).catch(error);
}

function getAllBookDetail(userSeq, success, error) {
  instance.get(`/book/${userSeq}`, userSeq, { headers: createHeaders(token) }).then(success).catch(error);
}

export {
  registerUserbookCollection,
  getListByGugun,
  getListByCategory,
  getBookDetail,
  updateBookDetail,
  getAllBookDetail
};
