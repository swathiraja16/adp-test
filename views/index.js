var data;

$(document).ready(function () {
  //onclick event for startTask button
  $('#startTask').click(function () {
    handleData()
    startTask();
  })

  //onclick event for endTask button
  $('#endTask').click(function () {
    endTask();
  })
})

//calls handleData function after every 2seconds to get data and display it on web page
function startTask() {
  data = setInterval(handleData, 2000)
}


//clears interval that was set to getdata
function endTask() {
  clearInterval(data)
}

//function that makes ajax call with GET method to get JSON data, display it on front-end, call submitTask() to post results back to server
function handleData() {
  $.ajax({
    type: 'GET',
    contentType: 'application/json',
    url: '/get-task',
    success: function (content, status) {
      var result = 0, id = ''
      id = content.id
      $('#operation').text(content.operation)
      $('#left').text(content.left)
      $('#right').text(content.right)

      switch (content.operation.toUpperCase()) {
        case 'ADDITION':
          result = content.left + content.right
          break;
        case 'SUBTRACTION':
          result = content.left - content.right
          break;
        case 'MULTIPLICATION':
          result = content.left * content.right
          break;
        case 'DIVISION':
          result = content.left / content.right
          break;
        case 'REMAINDER':
          result = content.left % content.right
          break;
        default:
          result = 0
          break;
      }
      $('#result').text(result)
      submitTask(id, result)
    },
    error: function (res, status) {
      $('#message').text(res)
      endTask();
    }
  })
}


//function that makes ajax call to post results back to ADP endpoint and displays appropriate message sent back from api
function submitTask(id, result){
  let req = {
    id: id,
    result: result
  }

  req = JSON.stringify(req)
  $.ajax({
    type: 'POST',
    contentType: 'application/json',
    Accept: 'application/json',
    url: '/submit-task',
    data: req,
    success: function (content, status) {
      $('#message').text(content)
    },
    error: function (res, status) {
      $('#message').text(res)
      endTask();
    }
  })
}