import { instance, createHeaders } from "./index";

/*
userbookcollectionInfo : {userSeq, bookSeq, userbookCollectionImage, gugun, category}
 */
function registerUserbookCollection(userbookCollectionInfo, success, error) {
  instance.post(`/book/register`, userbookCollectionInfo, { headers: createHeaders(token) }).then(success).catch(error);
}

function getListByGugun(userSeq, gugun, success, error) {
  instance.get(`/book/listbygu/${userSeq}/${gugun}`, userSeq, gugun, { headers: createHeaders(token) }).then(success).catch(error);
}

function getListByCategory(userSeq, category, success, error) {
  instance.get(`/book/listbycat/${userSeq}/${category}`, userSeq, category, { headers: createHeaders(token) }).then(success).catch(error);
}

function getBookDetail(userSeq, bookSeq, success, error) {
  instance.get(`/book/${userSeq}/${bookSeq}`, userSeq, bookSeq, { headers: createHeaders(token) }).then(success).catch(error);
}

/*
updateBookInfo : {userSeq, bookSeq, imageURL}
*/
function updateBookDetail(updateBookInfo, success, error) {
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
