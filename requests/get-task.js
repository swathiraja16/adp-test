const axios = require("axios");

const getTask = async () => {
  const getTaskUrl = "https://interview.adpeai.com/api/v1/get-task";

  const taskInfo = await axios.get(getTaskUrl);
  const taskData = taskInfo.data;
  return taskData;
};

module.exports.getTask = getTask;
