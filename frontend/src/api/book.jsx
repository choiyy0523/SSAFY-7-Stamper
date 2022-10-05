import { instance, createHeaders } from "./index";

/*
  userbookcollectionInfo : {userSeq, bookSeq, userbookCollectionImage, gugun, category}
  response.data: {statusCode, message} 
 */
function registerUserbookCollection(userbookCollectionInfo, token, success, error) {
  instance.post(`/book/register`, userbookCollectionInfo, { headers: createHeaders(token) }).then(success).catch(error);
}

/*
  response.data: {statusCode, message, collectedBookList: {List<userbookCollection>}, totalBookList: {List<Book>}}
 */
function getListByGugun(userSeq, gugun, token, success, error) {
  instance.get(`/book/listbygu/${userSeq}/${gugun}`, userSeq, gugun, { headers: createHeaders(token) }).then(success).catch(error);
}

/*
  response.data: {statusCode, message, collectedBookList: {List<userbookCollection>}, totalBookList: {List<Book>}}
*/
function getListByCategory(userSeq, category, token, success, error) {
  instance.get(`/book/listbycat/${userSeq}/${category}`, userSeq, category, { headers: createHeaders(token) }).then(success).catch(error);
}

/*
  response.data: {statusCode, message, {userBook}, {book}}
*/
function getBookDetail(userSeq, bookSeq, success, error) {
  instance.get(`/book/${userSeq}/${bookSeq}`, userSeq, bookSeq).then(success).catch(error)};

// function getBookDetail(userSeq, bookSeq, token, success, error) {
//   instance.get(`/book/${userSeq}/${bookSeq}`, userSeq, bookSeq, { headers: createHeaders(token) }).then(success).catch(error);


/*
  updateBookInfo : {userSeq, bookSeq, imageURL}
  response.data: {statusCode, message, {userBook}, {book: null}}
*/
function updateBookDetail(updateBookInfo, token, success, error) {
  instance.patch(`/book/update`, updateBookInfo, { headers: createHeaders(token) }).then(success).catch(error);
}

/*
  response.data: {statusCode, message, GC:{List<GugunClass>}}
*/
function getCountOfGugun(userSeq, token, success, error) {
  //instance.patch(`/book/countofgu/${userSeq}`, userSeq, { headers: createHeaders(token) }).then(success).catch(error);
  instance.get(`/book/countofgu/${userSeq}`, userSeq, { headers: createHeaders(token) }).then(success).catch(error);
}

/*
  response.data: {statusCode, message, CC:{List<CatClass>}}
*/
function getCountOfCategory(userSeq, token, success, error) {
  instance.get(`/book/countofcat/${userSeq}`, userSeq, { headers: createHeaders(token) }).then(success).catch(error);
}
/*
  response.data: {statusCode, message, collectedBookList: {List<userbookCollection>}, totalBookList: {List<Book>}}
*/
function getAllBookDetail(userSeq, token, success, error) {
  instance.get(`/book/${userSeq}`, userSeq, { headers: createHeaders(token) }).then(success).catch(error);
}

export {
  registerUserbookCollection,
  getListByGugun,
  getListByCategory,
  getBookDetail,
  updateBookDetail,
  getCountOfGugun,
  getCountOfCategory,
  getAllBookDetail
};
