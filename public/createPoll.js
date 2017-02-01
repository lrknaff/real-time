$('.submit-poll-button').on('click', function() {

  const question = $('.question').val();
  const response1 = $('.response-1').val();
  const response2 = $('.response-2').val();
  const response3 = $('.response-3').val();

  $.ajax({
    url: '/api/poll',
    type: 'post',
    data: {
      question: question,
      response1: response1,
      response2: response2,
      response3: response3
    }
  });
});
