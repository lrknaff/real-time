
$.get('/api/poll', function(data) {
  const { question, response_1, response_2, response_3 } = data

  if(!question) {
    console.log('no data')
    $('.poll').append(`
                      <h2>Error Retrieving Poll</h2>
                      `)
  } else {
    $('.poll').append(`
                      <h2>${question}</h2>
                      <input type="submit" value=${response_1} />
                      <input type="submit" value=${response_2} />
                      <input type="submit" value=${response_3} />
                      `)
   }
});

const socket = io();
