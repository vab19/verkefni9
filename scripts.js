
var abc = document.getElementsByClassName("domains");
abc[0].id = "r1";
var src = document.getElementById("r1");
var div = document.createElement("div");
div.className = "loading";
src.appendChild(div);
var img = document.createElement("img");
img.src = "loading.gif";
div.appendChild(img);
div.appendChild(document.createTextNode("Leita að léni..."));  
const API_URL = 'https://apis.is/isnic?domain=';



document.addEventListener('DOMContentLoaded', function () {
  const domains = document.querySelector('.domains');
  program.init(domains);
  div.style.visibility = 'hidden';
 
});


/**
 * Bílaleit. Sækir gögn með Ajax á apis.is.
 */
const program = (() => {
  let domains;
 
  function displayDomain(domainsList) {
    div.style.visibility = 'hidden';
    
    if (domainsList.length === 0) {
      displayError('Lén er ekki skráð');
      div.style.visibility = 'hidden';
      return;
    }
    const [{domain, registered, lastChange, expires, registrantname, email, address, country}] = domainsList;
    
    var lastChange2 = new Date(lastChange).toISOString()
    lastChange2 = lastChange2.substring(0,10);
    var registered2 = new Date(registered).toISOString()
    registered2 = registered2.substring(0,10);
    var expires2 = new Date(expires).toISOString()
    expires2 = expires2.substring(0,10);
    
    
  
    var texti = ['Lén', 'Skráð', 'Seinast breytt', 'Rennur út', 'Skráningaraðili', 'Netfang', 'Heimilisfang', 'Land'];
    var gildi = [domain, registered2, lastChange2, expires2, registrantname, email, address, country];
    
    var container1 = domains.querySelector('.results');
    while (container1.firstChild) {
      container1.removeChild(container1.firstChild);
    }
    
    
    for(let i = 0; i < 8; i++){
    const dl = document.createElement('dl');

    const factoryElement = document.createElement('dt');
    factoryElement.appendChild(document.createTextNode(texti[i]));
    dl.appendChild(factoryElement);

    const factoryValueElement = document.createElement('dd');
    factoryValueElement.appendChild(document.createTextNode(gildi[i]));
    dl.appendChild(factoryValueElement);

    const container = domains.querySelector('.results');
    
    container.appendChild(dl);
    }
 
 
  }

  function displayError(error) {
    const container = domains.querySelector('.results');

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    container.appendChild(document.createTextNode(error));
  }

  function fetchData(number) {
   
    div.style.visibility = 'visible';
    fetch(`${API_URL}${number}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Villa við að sækja gögn');
      })
      .then((data) => {
        displayDomain(data.results);
      })
      .catch((error) => {
        displayError('Lén þarf að vera strengur');
        div.style.visibility = 'hidden';
        console.error(error);
      })
  }

  function onSubmit(e) {
    const container = domains.querySelector('.results');

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    div.style.visibility = 'visible';
    e.preventDefault();
    const input = e.target.querySelector('input');
    fetchData(input.value);
   
  }
  
  function init(_domains) {
    domains = _domains;
    const form = domains.querySelector('form');
    form.addEventListener('submit', onSubmit);
  }

  return {
    init,
  }
})();