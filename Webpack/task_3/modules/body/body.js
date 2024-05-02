// body.js
import $ from 'jquery';
import _ from 'lodash';
import './body.css';

$(function() {
  $('body').append('<button>Click here to get started</button>');
  $('body').append('<p id="count">0 clicks</p>');
  $('button').on('click', _.debounce(function() {
    let count = parseInt($('#count').text().split(' ')[0], 10) + 1;
    $('#count').text(`${count} clicks`);
  }, 500));
});