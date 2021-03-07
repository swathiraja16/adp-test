const axios = require("axios");

const submitTask = async (taskPayload) => {
  const getTaskUrl = "https://interview.adpeai.com/api/v1/submit-task";

  const rawTaskSubmitResponse = await axios.post(getTaskUrl, taskPayload);
  const taskSubmitResponse = rawTaskSubmitResponse.data;
  return taskSubmitResponse;
};

module.exports.submitTask = submitTask;
