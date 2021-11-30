import countries from '../statics/countries.json';
import refs from './refs';
import renderingCardSet from './renderingСardSet';

export default () => {
  const k = localStorage.getItem('keyword');
  const c = localStorage.getItem('country');
  const p = localStorage.getItem('page');

  const keyword = k ? k : '';
  const country = c ? c : '';
  const page = p ? p : '';

  const arrCodeCountry = Object.keys(countries);
  const arrOptionEl = arrCodeCountry.map(CodeCountry => {
    const countryEl = document.createElement('option');
    if (CodeCountry === country) {
      countryEl.selected = true;
    }
    countryEl.value = CodeCountry;
    countryEl.textContent = countries[CodeCountry];
    return countryEl;
  });

  refs.countryInput.append(...arrOptionEl);

  refs.keywordInput.value = keyword;
  renderingCardSet(country, keyword, page);
};
