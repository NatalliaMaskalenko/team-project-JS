import Pagination from 'tui-pagination';
import renderingCardSet from './renderingСardSet';
import refs from './refs';

// переменки и опции------------------------------------------------->
const options = {
  itemsPerPage: 1,
  visiblePages: 5,
  page: 1,
  centerAlign: true,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: `<a href="" class="tui-page-btn events-page">{{page}}</a>`,
    currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="" class="tui-page-btn tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="" class="tui-page-btn tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
};

// Коллбеки для добавления или снятия видимости пагинации----------------------------------->
export function showPagination() {
  return refs.paginationContainer.classList.remove('is-hidden');
}

export function hidePagination() {
  return refs.paginationContainer.classList.add('is-hidden');
}

// Создал новый экземпляр с опциями и контейнером для кнопок---------------------->
export const pagination = new Pagination(refs.paginationContainer, options);

// Функция - коллбек для метода экземпляра - pagination.on()? которая рендерит карточки согласно номеру страницы и предварительному запросу в инпутах---------------------------------------------------------
export function onPaginationBarPush(eventData) {
  renderingCardSet(refs.countryInput.value, refs.keywordInput.value, eventData.page);
  onSrollPage();
}

function onSrollPage() {
  refs.cardSetContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
}