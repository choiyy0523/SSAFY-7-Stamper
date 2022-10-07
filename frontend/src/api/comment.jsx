import { instance, createHeaders } from "./index";

/*
  commentInfo: {userSeq, bookSeq, commentContent}
  response.data: {statusCode, message}
 */
function registerComment(commentInfo, token, success, error) {
  instance.post(`/comment/register`, commentInfo, { headers: createHeaders(token)} ).then(success).catch(error);
}

/*
  response.data: {statusCode, message, list: {Comment}}
 */
function getCommentList(bookSeq, token, success, error) {
  instance.get(`/comment/${bookSeq}`, bookSeq, { headers: createHeaders(token)} ).then(success).catch(error);
}

/*
  commentInfo: {userSeq, commentSeq, commentContent}
  response.data: {statusCode, message}
 */
function updateComment(commentInfo, token, success, error) {
  instance.patch(`/comment/update`, commentInfo, { headers: createHeaders(token)} ).then(success).catch(error);
}


/*
  response.data: {statusCode, message}
 */
function deleteComment(commentSeq, token, success, error) {
  instance.delete(`/comment/delete/${commentSeq}`, commentSeq, { headers: createHeaders(token)} ).then(success).catch(error);
}

export {
  registerComment,
  getCommentList,
  updateComment,
  deleteComment,
};
