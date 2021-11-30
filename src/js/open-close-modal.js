import refs from './refs';
import { getEventById } from './events-api';
import modalContentTemplateHBS from '../templates/modalContent.hbs';
import { onTimer } from './timer/takeTimeAndInstallationTimer';

// ------------Функц. клик на li, получаем id в консоль----------------------------
refs.cardSetContainer.addEventListener('click', onModalOpen);
function onModalOpen(evt) {
  // console.log('click');
  if (evt.target.nodeName !== 'LI') return;
  evt.preventDefault();
  refs.backdropRef.classList.add('open');
  refs.backdropRef.scrollTop = 0; //always open modal in top position
  getEventById(evt.target.dataset.id).then(res => renderingModal(res));
  window.addEventListener('keydown', onModalclose);
  refs.backdropRef.addEventListener('click', onModalclose);
}
// --------------------------------------------------------------------------------

// function onModalOpen(evt) {
//   evt.preventDefault();
//   refs.backdropRef.classList.add('open');
//   refs.backdropRef.scrollTop = 0; //always open modal in top position
//   getEventById(eventID).then(res => renderingModal(res));

//   window.addEventListener('keydown', onModalclose);
//   refs.backdropRef.addEventListener('click', onModalclose);
// }

function onModalclose(evt) {
  if (
    evt.target.classList.contains('backdrop') ||
    evt.target.classList.contains('modal__btn-close') ||
    evt.code === 'Escape'
  ) {
    console.log(evt.target.classList.contains('modal__btn-close'));
    window.removeEventListener('keydown', onModalclose);
    refs.backdropRef.classList.remove('open');
    localStorage.removeItem('author');
  }
}

// function getEventID() {
//   const getAllIvents = document.querySelectorAll('.set-of-cards__item');
//   getAllIvents.forEach(el => el.addEventListener('click', start));
//   function start(e) {
//     eventID = e.currentTarget.getAttribute('data-id');
//   }
// }

function renderingModal(arr) {
  const modalContentTemplateAction = modalContentTemplateHBS(arr);

  // // -----------------Высота модалки при ее загрузке------------------------------->
  // const windowHeight = window.innerHeight; // Получаем высоту вьюпорта
  // refs.modalWindow.style.height = `${windowHeight - 40}px`; //Задаем высоту модалки
  // // ------------------------------------------------------------------------------

  refs.modalWindow.innerHTML = modalContentTemplateAction;
  // console.log(arr.who);
  localStorage.setItem('author', arr.who);
  // localStorage.setItem('author', arr.who.match(/^\w+\b\s\w+\b/));
  onTimer(arr);
}
