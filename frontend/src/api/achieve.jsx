import { instance, createHeaders } from "./index";

/*
  response.data: {statusCode, message, achieveList:{List<UserAchievement>}}
 */
function getAchieveList(userSeq, token, success, error) {
  instance.get(`/achieve/${userSeq}`, userSeq, { headers: createHeaders(token)} ).then(success).catch(error);
}

/*
  response.data: {statusCode, message, achievement: {UserAchievement}}
 */
  function getAchigetAchieve(userSeq, achieveSeq, token, success, error) {
    instance.get(`/achieve/${userSeq}/${achieveSeq}`, userSeq, achieveSeq, { headers: createHeaders(token)} ).then(success).catch(error);
  }
/*
  achieveInfo: {userSeq, achieveName}
  response.data: {statusCode, message}
 */
function updateAchieve(achieveInfo, token, success, error) {
  instance.post(`/achieve/update`, achieveInfo, { headers: createHeaders(token)} ).then(success).catch(error);
}



export {
  getAchieveList,
  getAchigetAchieve,
  updateAchieve
};
