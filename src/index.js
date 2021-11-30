import './sass/main.scss';
import './js/first_load_page-animation';
import loader from './js/loader';
import './js/scroll';
import './js/timer/takeTimeAndInstallationTimer';
import './js/positionBTN';
import refs from './js/refs';

const goTopBtn = document.querySelector('.back_to_top');

// ----------------------------------Loader--------------------------------------------------------->
document.addEventListener('DOMContentLoaded', loader);
// ----------------------------------Pagination----------------------------------------------------->
import { pagination, onPaginationBarPush, showPagination } from './js/pagination.js';
pagination.on('afterMove', onPaginationBarPush);
// showPagination();
// -----------------------------------logo---------------------------------------------------------->
refs.logo.addEventListener('click', onLogoClick);
function onLogoClick() {
  localStorage.removeItem('keyword');
  localStorage.removeItem('country');
  localStorage.removeItem('page');
}

// import { getEventsByOptions, getEventsByAttractions } from './js/events-api';
// import { getEventById } from './js/events-api';

// getEventsByOptions('US', '', 3).then(res => console.log({ res }));
// getEventById('G5v0Zpsu1edX1').then(res => console.log(res));
// getEventsByAttractions('K8vZ9171oZf,K8vZ9171o57', '1').then(res => console.log(res));
