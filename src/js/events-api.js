const API_KEY = 'GcvUr561HaBI30kU58PhKSa9RWqvwjKx';
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/';
const breakPoint = 'events';

/**
 * Возвращает Promise с объектом страницы с карточками событий , согласно фильтру
 *  по ключевым словам, коду страны ISO alpha-2 и номеру страницы.
 * с ресурса "ticketmaster.com".
 *
 * @param {string} country Код страны.
 * @param {string} keyword Ключевое слово или часть для фильтрации по названию.
 * @param {string} page Номер страницы для вывода.
 * @return {object} Promise объект для отрисовки страницы
 */
function getEventsByOptions(country = false, keyword = false, page) {
  keyword = keyword ? `&keyword=${keyword}` : '';
  page = page ? `&page=${page}` : '';
  country = country ? `&countryCode=${country}` : '';
  const url =
    `${BASE_URL}${breakPoint}?apikey=${API_KEY}&locale=*${gedStrDateNow()}&sort=date,asc&size=24` +
    keyword +
    country +
    page;
  return fetchJSON(url).then(res => getPage(res));
}

/**
 * Возвращает Promise с объектом события по id
 *
 * @param {string} id Код события.
 * @return {object} Promise объект для отрисовки параметров события.
 */
function getEventById(id) {
  if (!id) return;
  const url = `${BASE_URL}${breakPoint}?apikey=${API_KEY}&id=${id}&locale=*`;
  return fetchJSON(url).then(res => {
    const obj = res?._embedded?.events[0];
    return {
      info: obj?.info,
      date: obj?.dates?.start?.localDate,
      time: obj?.dates?.start?.localTime,
      timezone: obj?.dates?.timezone,
      where: obj?._embedded?.venues[0]?.name,
      who: obj?.name,
      idAttraction: obj?._embedded?.attractions?.map(item => item?.id).join(','),
      attractions: obj?._embedded?.attractions,
      priceRanges: obj?.priceRanges,
      images: obj?.images,
      modalImg: obj?.images.find(obj => obj.width === 1136 && obj.height === 639)?.url,
      products: obj?.products,
      ticketLimit: obj?.ticketLimit,
    };
  });
}

/**
 * Возвращает Promise с объектом события по id attraction
 *
 * @param {string} id Код attraction.
 * @param {string} page Номер страницы для вывода.
 * @return {object} Promise объект для отрисовки параметров события.
 */
function getEventsByAttractions(id, page = false) {
  if (!id) return;
  page = page ? `&page=${page}` : '';
  const url = `${BASE_URL}${breakPoint}?apikey=${API_KEY}&locale=*${gedStrDateNow()}&sort=date,asc&attractionId=${id}${page}`;
  return fetchJSON(url).then(res => getPage(res));
}

function fetchJSON(url) {
  return fetch(url).then(res => res.json());
}

function getPage(obj) {
  //  console.log(obj);
  if (!obj?._embedded) throw 'Nothing found for this search';
  if (obj.page.totalPages === 0) {
    throw 'Nothing found for this search';
  }
  const arrCards = obj?._embedded?.events?.map(item => {
    return {
      id: item?.id,
      name: item?.name,
      date: item?.dates?.start?.localDate,
      // promoter: item?.promoter?.name,
      venues: item?._embedded?.venues[0]?.name,
      cardImg: item?.images.find(obj => obj.width === 640 && obj.height === 360)?.url,
    };
  });
  return {
    number: obj?.page?.number,
    size: obj?.page?.size,
    totalElements: obj?.page?.totalElements,
    totalPages: obj?.page?.totalPages,
    cards: arrCards,
  };
}

function gedStrDateNow() {
  const dateNow = new Date();
  const year = dateNow.getFullYear();
  const m = dateNow.getMonth() + 1;
  const d = dateNow.getDate();
  const month = m < 10 ? `0${m}` : m;
  const day = d < 10 ? `0${d}` : d;
  return `&startDateTime=${year}-${month}-${day}T23:59:00Z`;
}

export { getEventsByOptions, getEventById, getEventsByAttractions };
