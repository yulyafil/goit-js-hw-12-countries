import './css/common.css';
import API from './js/fetchCountries';
import countryCardTpl from './templates/country-card.hbs';
import countryNameTpl from './templates/country-name.hbs';

import { info } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";

let searchQuery = '';
const debounce = require('lodash.debounce');

const refs = {
    cardContainer: document.querySelector('.js-card-country'),
    searchInput: document.querySelector('.input-control')
}
refs.searchInput.addEventListener('input',
    debounce(onSearch, 500));

function onSearch(e) {
    e.preventDefault();
    searchQuery = e.target.value;
    
    API.fetchCountries(searchQuery)
        .then(renderCountryCardItem)
        .catch(error => console.log(error));
    }

function renderCountryCardItem(country) {
   
    if (country.length === 1) {
        renderCountryCard(countryCardTpl, country);
        
    }
    else if (country.length > 1 && country.length < 10) {
        renderCountryName(countryNameTpl, country );
    }
    else if (country.length > 10) {
        alertMessage();
    }   
}
function renderCountryName(tpl, country) {
    const markupName = countryNameTpl(country);
    refs.cardContainer.innerHTML = markupName;
    
}
function renderCountryCard(tpl, country) {
    const markup = countryCardTpl(country[0]);
    refs.cardContainer.innerHTML = markup;
    
}

function alertMessage() {
    info({
        text: 'Too many matches founs. Please enter a more specific query!',  
        delay: 2000,
    })
    
}