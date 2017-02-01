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

postLink = (id) => {
  $('body').append(`
                    <div>nice!
                    </div>
                  `)
};
