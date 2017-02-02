const socket = io();
const pollId = window.location.pathname.split("/")[2]

let list = _.uniqBy(JSON.parse(localStorage.getItem('userList')), 'user_id')
console.log(list)
let individualUser = _.uniqBy(JSON.parse(localStorage.getItem('userList')), 'user_id')

$.get(`/api/poll/${pollId}`, function(data) {
  data.forEach((poll) => {
    const { id, question, response_1, response_2, response_3 } = poll

    if(id === pollId) {
      $('.question').text(question);
      $('.choice1').val(response_1);
      $('.choice2').val(response_2);
      $('.choice3').val(response_3);
    }
  });
});

socket.on('voteCast', (vote) => {
  let userVote = individualUser[0].user_id
  $('.your-vote').text(`Your vote: ${vote[userVote]}`)
  $('.vote-list').empty()
  for(var key in vote) {
    let voteId = Object.keys(vote)[0]
    let user = _.filter(list, ['user_id', voteId])
    if(vote.hasOwnProperty(key)) {
      $('.vote-list').append(`<p>${user[0].name}: ${vote[userVote]}</p>`)
    }
  }
});

socket.on('usersConnected', (count) => {
  $('.connection-count').text(`Voters: ${count}`);
});

socket.on('individualUser', (user) =>
{
  JSON.stringify(user)
  localStorage.setItem('individualUser', user)
});

socket.on('userList', (users) => {
    let userList = JSON.stringify(users)
    localStorage.setItem('userList', userList)
 });


$(document).ready(function() {
  const buttons = document.querySelectorAll('#choices');

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function() {
      socket.send('voteCast', this.value);
    });
  }
});
