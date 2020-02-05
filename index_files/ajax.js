/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function loadResult(url, cbFunc) {
    let xhttp;

    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            cbFunc(this);
        }
    };

    xhttp.open("GET", url, true);
    xhttp.send();
}

// Item Session value setter
const changeSessionValue = (elementName) => {
    const curElement = document.getElementById(elementName);
    sessionStorage.setItem(elementName, curElement.value);
};

// Item listener
const listenItem = (elementIDForListen) => {
    const cur = document.getElementById(elementIDForListen);
    cur.addEventListener("change",
            function () {
                changeSessionValue(elementIDForListen);
            }, {passive: true});
};

const listen = (elementIds = []) => {
    return elementIds.map((el) => listenItem(el));
}



const putValueFromSession = (fieldId) => {
    if (sessionStorage.getItem(fieldId)) {
        document.getElementById(fieldId).value = sessionStorage.getItem(fieldId);
        document.getElementById(fieldId).onchange();
    } else {
        return;
    }
};

// Answer callback

function getPrice(companyType, serviceType, toSelector = 'result') {
    const currentLanguage = (sessionStorage.getItem('lang')) ? sessionStorage.getItem('lang') : 'rus';
    return loadResult('req/ajax_price/getPrice.php?ct=' + companyType + '&st=' + serviceType + '&lang=' + currentLanguage, (xhttp) => {
        document.getElementById(toSelector).innerHTML = xhttp.responseText;
    });
}

function getServicesSelector(companyType, toSelector = 'st') {
    const currentLanguage = (sessionStorage.getItem('lang')) ? sessionStorage.getItem('lang') : 'rus';
    return loadResult('req/ajax_price/getServices.php?ct=' + companyType + '&lang=' + currentLanguage, (xhttp) => {
        document.getElementById(toSelector).innerHTML = xhttp.responseText;
        putValueFromSession('st');
    });
}

function getPriceIfCompany(companyType) {
    getServicesSelector(companyType);
    const serviceValue = $('#st').val();
   return getPrice(companyType, serviceValue);
};

function getPriceIfService(serviceType) {
    const companyValue = $('#ct').val();
   return getPrice(companyValue, serviceType);
};

$(document).ready(function(){
  putValueFromSession('ct');

  const serviceValue = $('#st').val();
  const companyValue = $('#ct').val();
  getPrice(companyValue, serviceValue);
  listen(['ct', 'st']);
})
