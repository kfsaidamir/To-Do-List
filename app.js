document.addEventListener('DOMContentLoaded', function () {
  const registrationForm = document.querySelector('.registrationForm');

  document.querySelector('.username').value = '';
  document.querySelector('.password').value = '';

  registrationForm.addEventListener('submit', function (event) {

    const username = document.querySelector('.username').value;
    const password = document.querySelector('.password').value;

    if (username && password) {
      if (localStorage.getItem('username') && localStorage.getItem('password')) {
        if (username === localStorage.getItem('username') && password === localStorage.getItem('password')) {
          showMessage('Login successful! Redirecting to index2.html.');
          window.location.href = 'index2.html';
        } else {
          showMessage('Incorrect username or password.');
        }
      } else {
        showMessage('No user found. Please register.');
      }
    } else {
      showMessage('Please fill in all fields.');
    }
  });

  function showMessage(message) {
    const messageElement = document.querySelector('.message');
    messageElement.textContent = message;
  }
});
