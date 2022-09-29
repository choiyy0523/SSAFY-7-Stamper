import { instance, createHeaders } from "./index";

/*
  response.data: {statusCode, message, achieveList:{List<UserAchievement>}}
 */
function getAchieveList(userSeq, success, error) {
  instance.post(`/achieve/${userSeq}`, userSeq, { headers: createHeaders(token)} ).then(success).catch(error);
}

/*
  response.data: {statusCode, message, achievement: {UserAchievement}}
 */
  function getAchigetAchieve(userSeq, achieveSeq, success, error) {
    instance.get(`/achieve/${userSeq}/${achieveSeq}`, userSeq, achieveSeq, { headers: createHeaders(token)} ).then(success).catch(error);
  }
// /*
//   achieveInfo: {userSeq, achieveSeq}
//   response.data: {statusCode, message, achievement: {UserAchievement}}
//  */
//   function updateAchieve(achieveInfo, success, error) {
//     instance.update(`/achieve/update`, achieveInfo, { headers: createHeaders(token)} ).then(success).catch(error);
//   }



export {
  getAchieveList,
  getAchigetAchieve,
};
