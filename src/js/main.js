'use strict';

var buttonMenuOpen = document.querySelector('.main-header__button');
var nav = document.querySelector('.main-header__nav');

buttonMenuOpen.addEventListener('click', function() {
  if (nav.classList.contains('main-header__nav--close')) {
    nav.classList.remove('main-header__nav--close');
    nav.classList.add('main-header__nav--open');
    buttonMenuOpen.classList.remove('main-header__button--open');
    buttonMenuOpen.classList.add('main-header__button--close');
    }
    else {
      nav.classList.add('main-header__nav--close');
      nav.classList.remove('main-header__nav--open');
      buttonMenuOpen.classList.remove('main-header__button--close');
      buttonMenuOpen.classList.add('main-header__button--open');
    }
});
