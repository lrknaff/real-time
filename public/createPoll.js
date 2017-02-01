$('.submit-poll-button').on('click', function() {

  const question = $('.question').val();
  const response1 = $('.response-1').val();
  const response2 = $('.response-2').val();
  const response3 = $('.response-3').val();
  const id = Date.now();

  console.log(id)

  $.ajax({
    url: `/api/poll/${id}`,
    type: 'post',
    data: {
      id: id,
      question: question,
      response1: response1,
      response2: response2,
      response3: response3
    },
    success: hidePoll
  });
});

hidePoll = (id) => {
  $('.poll-form').hide();
  postLink(id);
};

postLink = (poll) => {
  console.log(poll.id)
  $('body').append(`
                    <p>Link to api:
                      <a href ="/api/poll/${poll.id}">${window.location.hostname}/api/poll/${poll.id}</a>
                    </p>
                    <p>Link to quiz:
                      <a href ="/login/${poll.id}">${window.location.hostname}/login/${poll.id}</a>
                    </p>
                  `)
};
