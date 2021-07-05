import * as PNotifyMobile from '../node_modules/@pnotify/mobile/dist/PNotifyMobile.js';
import { defaultModules } from '../node_modules/@pnotify/core/dist/PNotify.js';
import { alert } from '@pnotify/core';
import * as Confirm from "@pnotify/confirm";
import "@pnotify/confirm/dist/PNotifyConfirm.css";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import fetchCountry from './js/fetchCountries';
import country from './templation/country.hbs';
import countryCard from './templation/countryCard.hbs';


defaultModules.set(PNotifyMobile, {});

const debounce = require('lodash.debounce');

const refs = {
    render: document.querySelector('.countries__render'),
    input: document.querySelector('.countries__searcher'),
    list: document.querySelector('.countries__list'),
};

refs.input.addEventListener('input', debounce(handleInput, 500));


function updateView(information) {
    refs.render.insertAdjacentHTML('beforeend', countryCard(information));
}

function updateList(information) {
    refs.list.innerHTML = '';
    refs.list.insertAdjacentHTML('beforeend', country(information));
}

function handleInput() {
    refs.render.innerHTML = '';
    refs.list.innerHTML = '';
    fetchCountry(refs.input.value).then(renderResult).catch(error);
}

function renderResult(array) {
    if (array.length === 1) {
        updateView(array);
    } else if (array.length > 10) {
        alert({
            text: 'Пожалуйста, введите более конкретный запрос!',
            width: '300px',
            animateSpeed: 'fast',
            delay: 1000,
            modules: new Map([
                [
                    Confirm,
                    {
                        confirm: true,
                        buttons: [
                            {
                                text: "Ok",
                                primary: true,
                                click: notice => {
                                    notice.close();
                                }
                            }
                        ]
                    }
                ]
            ])
        });
        return;
    }
    else {
        updateList(array);
    }
}

function error() {
    alert('Введите название страны!');
}


