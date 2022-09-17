function sendRequest() {
  let messageInput = document.getElementById('message-text');
  let message = messageInput.value;
  let token = Cookies.get('token');
  messageInput.value = '';
  let payload = {
    message: message,
    token: token,
  };
  socket.emit('msgToServer', payload);
}
let socket = io({ cookie: true });

socket.on('msgToClient', (res) => {
  let messages__container = document.getElementById('messages');
  if (res.msg !== '') {
    let messageForm = document.createElement('div');
    messageForm.className = 'message';
    messageForm.innerHTML = `${res.name} : ${res.msg}`;
    messages__container.appendChild(messageForm);
  }
});
