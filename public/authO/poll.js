const socket = io();

const pollId = window.location.pathname.split("/")[2]

$.get(`/api/poll/${pollId}`, function(data) {
  const { question, response_1, response_2, response_3 } = data

  if(!question) {
    $('.poll').prepend(`
                      <h2>Error Retrieving Poll</h2>
                      `)
  } else {
    $('.question').text(question);
    $('.choice1').val(response_1);
    $('.choice2').val(response_2);
    $('.choice3').val(response_3);
  }
});

socket.on('usersConnected', (count) => {
  $('.connection-count').text(`Voters: ${count}`);
});

socket.on('voteCast', (vote) => {
  $('.your-vote').text(`Your vote: ${Object.values(vote)[0]}`)
});

socket.on('userList', (users) => {
    users.forEach((user) => {
      $('.user-list').html(`
                            <div class="user">
                              <img class="user-avatar" src=${user.picture}/>
                              <p class="user-name">${user.name}</p>
                              <p class="user-vote">Vote: </p>
                            </div>
                            `)
      })
    });


$(document).ready(function() {
  const buttons = document.querySelectorAll('#choices');

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function() {
      socket.send('voteCast', this.value);
    });
  }

})
