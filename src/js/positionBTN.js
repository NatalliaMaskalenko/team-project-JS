import refs from './refs';
import renderingCardSet from './renderingСardSet';

refs.geoBTN.addEventListener('click', getGeoPosition);

function getGeoPosition() {
  let ip = ''; // Current IP
  let XMLHttp = new XMLHttpRequest();

  XMLHttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let json = JSON.parse(this.responseText);
      // Country code output, field "country_code"
        console.log(json);
      renderingCardSet(json.country_code, '');
    }
  };
  XMLHttp.open('GET', 'http://ipwhois.app/json/' + ip, true);
  XMLHttp.send();
}
