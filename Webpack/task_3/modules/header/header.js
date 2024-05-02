// header.js
import $ from 'jquery';
import './header.css';

$(function() {
  $('body').prepend('<h1>Holberton Dashboard</h1>');
  console.log('Init header');
});
