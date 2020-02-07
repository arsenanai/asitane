$(function () {
    'use strict';
    //scrollTop 
    var scrollButton = $(".scroll-top");
    $(window).scroll(function () {
        if ($(this).scrollTop() >= 500) {
            scrollButton.show();
        } else {
            scrollButton.hide();
        }
    });
});
/*
ip
5000
17500
26000

too
7500
22500
30000
*/
var app = new Vue({
  el: '#pricecalc',
  data: {
    tip: 1,
    service: 0,
    tips:[
        'ИП',
        'ТОО',
    ],
    services:[
        'Нулевая отчетность',
        'Подготовка отчетности',
        'Бухгалтерское сопровождение',
    ],
    prices:[
        [5000,17500,26000],
        [7500,22500,30000],
    ]
  }
})