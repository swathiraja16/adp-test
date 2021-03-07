var start = false
var data;

$(document).ready(function () {
  console.log('js file')

  $('#startTask').click(function () {
    handleData()
    startTask();
  })

  $('#endTask').click(function () {
    endTask();
  })
})

function startTask() {
  data = setInterval(handleData, 2000)
}

function endTask() {
  clearInterval(data)
}

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