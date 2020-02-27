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
  el: '#app',
  data: {
    today: new Date(),
    dd:null,
    mm:null,
    yyyy:null,
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
    ],
    months:['январе','феврале','марте','апреле','мае','июне','июле','августе','сентябре','октябре','декабре'],
    left:['остался','осталось','осталось'],
    days:['день','дня','дней'],
  },
  methods:{
    printLeftDays: function(){
        var nextMonth=new Date(this.yyyy, this.mm+1, 1);
        var one_day=1000*60*60*24;
        var days = Math.floor((nextMonth.getTime()-this.today.getTime())/(one_day))
        var cursor = 2
        if(days==1)
            cursor = 0
        else if(days>1&&days<10)
            cursor = 1
        return this.left[cursor]+" "+days+" "+this.days[cursor]
    },
  },
  created(){
    this.dd = this.today.getDate()
    this.mm = this.today.getMonth()
    this.yyyy = this.today.getFullYear()
  },
})