function toggleText() {
  let btn = document.querySelector('.toggle-text-button'),
    text = document.querySelector('#text');
  
  btn.addEventListener('click', () => {
    text.hasAttribute('hidden') ? text.removeAttribute('hidden') : text.setAttribute('hidden', true);
  })
}