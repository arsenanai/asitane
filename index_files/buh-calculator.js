
// Define questions for buh calc

const quiz = {

    q1: {
            headline: 'Расчёт стоимости',
            description: 'Укажите систему налогообложения Вашего предприятия:',
            icon: 'req/buh_calculator/img/icon-1.svg',
            img: 'req/buh_calculator/img/img-1.jpg',
            result: null,
            adds: 0,
            answers: {
                         'ТОО (СНР)': 0,
                         'ИП (СНР)': 0,
                         'ИП (ОУР)': 0,
                         'ТОО (ОУР)': 0,
                     }
        },

    q2: {
            headline: 'Вид деятельности',
            description: 'Укажите вид деятельности Вашего предприятия:',
            icon: 'req/buh_calculator/img/icon-2.svg',
            img: 'req/buh_calculator/img/img-2.jpg',
            result: null,
            adds: 0,
            answers: {
                         'Услуги': {
                            'ТОО (СНР)': calcPrices[0],
                            'ИП (СНР)': calcPrices[1],
                            'ИП (ОУР)': calcPrices[2],
                            'ТОО (ОУР)': calcPrices[3],
                        },
                         'Торговля': {
                            'ТОО (СНР)': calcPrices[4],
                            'ИП (СНР)': calcPrices[5],
                            'ИП (ОУР)': calcPrices[6],
                            'ТОО (ОУР)': calcPrices[7],
                        },
                         'Питание': {
                            'ТОО (СНР)': calcPrices[8],
                            'ИП (СНР)': calcPrices[9],
                            'ИП (ОУР)': calcPrices[10],
                            'ТОО (ОУР)': calcPrices[11],
                        },
                         'Производство': {
                            'ТОО (СНР)': calcPrices[8],
                            'ИП (СНР)': calcPrices[9],
                            'ИП (ОУР)': calcPrices[10],
                            'ТОО (ОУР)': calcPrices[11],
                        },
                         'Строительство': {
                            'ТОО (СНР)': calcPrices[8],
                            'ИП (СНР)': calcPrices[9],
                            'ИП (ОУР)': calcPrices[10],
                            'ТОО (ОУР)': calcPrices[11],
                        },
                     }
        },

    q3: {
            headline: 'Количество сотрудников',
            description: 'Укажите количество сотрудников Вашего предприятия:',
            icon: 'req/buh_calculator/img/icon-3.svg',
            img: 'req/buh_calculator/img/img-3.jpg',
            result: null,
            adds: 0,
            answers: {
                         '< 10 чел.': 5000,
                         'от 10 чел.': 50000,
                         'от 50 чел.': 250000,
                         'от 100 чел.': 500000,
                         'от 300 чел.': 1000000,
                     }
        }
};

// Put sample text to calc-results
const buildCalcResult = () => buildNode('div', {class: 'inner'}, '', [
    buildNode('h2', {}, 'Результаты:', []),
    buildNode('p', {}, 'Для приблизительного расчёта стоимости оказания услуг нам необходимы некоторые основные данные о вашей компании: ответьте на три вопроса, пожалуйста...', [])
]);

// Get number of questions:
function getNumberOfQuestions(obj) {
    return Object.keys(obj).lengthl
}

// Is last element in quiz
function isLast(obj, el) {
    return Object.keys(obj).pop() === el;
}

// Is first element in quiz
function isFirst(obj, el) {
    return Object.keys(obj)[0] === el;
}

// gets current question's position
function getQuestionNum(obj, el) {
    return  Object.keys(obj).findIndex(element => element === el) + 1;
}

// Returns chain of questions needed to be cleared
function doWithTheseQuestions(current, obj = quiz) {
    const currentIndex = getQuestionNum(obj, current);
    const objKeys = Object.keys(obj);
    return objKeys.reverse().slice(objKeys.length + 1 - currentIndex);
}

// Returns chain interval of questions needed to be cleared
function getRangeForProcess(current, destination, obj = quiz) {
    const currentIndex = getQuestionNum(obj, current);
    const destinationIndex = getQuestionNum(obj, destination);
    const objKeys = Object.keys(obj);
    return objKeys.splice(destinationIndex - 1, currentIndex - destinationIndex + 1);
}

// create navigation block
function makeNavigation(test = quiz, options = {type: 'num'}) {
    return buildNode('div', {id: 'quiz-nav'}, '', 
        Object.keys(test).map(question => {
            const curQuesIndex = getQuestionNum(quiz, options.current);
            const questIndex = getQuestionNum(quiz, question);

            let classString = 'badge badge-pill future';
            if (questIndex === curQuesIndex) {
                classString = 'badge badge-pill current';
            } if (questIndex < curQuesIndex)  {
                classString = 'badge badge-pill past';
            }
            return buildNode('a', {
                class: classString,
                style: 'margin-left:5px;',
                onclick: `goPrevious('${options.current}','${question}')` },
            test[question].headline, []);
        })
    );
}

// Create 2 lines for answer in result box
function makeResultRow(questionNum, test = quiz) {
    const propsBlock =  buildNode('div', {id: `props-${questionNum}`, class: 'properties' , style: 'opacity: 0'}, '', [
        buildNode('dl', {class: 'propline'}, '', [
            buildNode('dt', {}, test[questionNum].headline, []),
            buildNode('dd', {}, test[questionNum].result, []),
        ]),
        buildNode('dl', {class: 'propline'}, '', [
            buildNode('dt', {}, 'Дополнительно:', []),
            buildNode('dd', {}, `+ ${test[questionNum].adds} &#8376;`, []),
        ]),
    ]);

    return propsBlock.toString();
}

// Creates receipt (final result)
function makeReceipt(final = quiz) {
    const totalPrice = Object.keys(final)
    .reduce((total, current) => {
        total += quiz[current].adds;
        return total;
    }, 0);
    const formatedPrice = totalPrice.toLocaleString('ru-RU');

    const receipt = [];
        receipt.push(buildNode('div', {id: 'img', class: 'col-lg-2 col-md-2 d-none d-lg-block', style:`background: url('req/buh_calculator/img/receipt.jpg'); background-size: cover;`}, '',[]));
        receipt.push(buildNode('div', {id: 'icon', class: 'col-lg-2 col-md-4 d-none d-md-flex'}, '',[buildNode('img', {src: 'req/buh_calculator/img/receipt.svg'}, '', []),]));
        receipt.push(buildNode('div', {id: 'receipt-body', class: 'col-lg-8 col-md-8 col-sm-12 col-xs-12'}, totalPrice, [
            buildNode('div', {class: 'row'}, '', [
                buildNode('div', {class: 'col-12'}, '', [
                    buildNode('h2', {class: 'heading'}, 'Результаты расчёта:', []),
                ]),
            ]),
            buildNode('div', {class: 'row'}, '', [
                buildNode('div', {class: 'col-7'}, '', [
                    buildNode('p', {class: 'final-description text-dark'}, 'Cтоимость бухгалтерского обслуживания Вашего предприятия.', []),
                ]),
                buildNode('div', {class: 'col-5', id: 'receipt-price'}, '', [
                    buildNode('div', {class: 'price-value'}, `от ${formatedPrice} &#8376;`, []),
                ]),
            ]),
            buildNode('div', {class: 'row'}, '', [
                buildNode('div', {class: 'col-lg-7 col-md-7 col-sm-12'}, '', [
                    buildNode('button', {class: 'btn btn-warning btn-lg btn-order col-12', 'data-target':'#myModal', 'data-toggle':'modal'}, `Заказать обслуживание`, []),
                ]),
                buildNode('div', {class: 'col-5 text-center',}, '', [
                    buildNode('div', {class: 'btn btn-outline-dark btn-lg price-period col-12 d-none d-sm-block', onclick:'toStart();'}, 'В начало' , []),
                ]),
            ]),
        ]));

    return receipt.map(el => el.toString());
}

// Puts answer into quiz object
function setAnswer(answerObj, test = quiz) {
  const [num, variant] = answerObj.value.split(',');
  test[num].result = variant;
  test[num].adds = (typeof test[num].answers[variant] !== 'object') ? test[num].answers[variant] : test[num].answers[variant][test.q1.result];
  $(`#${num}`).slideUp('slow');

  if (isFirst(test, num)) {
    $("#calc-results .inner").html('');
  }

  $("#calc-results .inner").append(makeResultRow(num));

  $(`#props-${num}`).animate({
      opacity: 1,
    }, 1000);
    if (isLast(test, num)) {
        $("#receipt").html(makeReceipt());
    }

}

// Clear answer
function unsetAnswer(question, test = quiz) {
    test[question].adds = 0;
    test[question].answer = null;
    return;
}

// Slide Down question
function getQuestionBack(question) {
    $(`#${question}`).slideDown('slow');
    return;
}

//Clear Legend
function clearLegendLine(question) {
    $(`#props-${question}`).remove();
    
    const prevIndex = question.split('')[1];
    const prevName = `q${prevIndex}`;

    if (isFirst(quiz, prevName)) { 
        $("#calc-results").html(buildCalcResult().toString());
    }
    return;
}

// Creates slides for quiz
const makeQuiz = questions => {
    const blocks =  Object.keys(questions).map(question => {
      return buildNode('div', {id: question, class: 'row'}, '', [
        buildNode('div', {id: 'img', class: 'col-lg-2 col-md-2 d-none d-lg-block', style:`background: url('${quiz[question].img}'); background-size: cover;`}, '',[]),
        buildNode('div', {id: 'icon', class: 'col-lg-2 col-md-4 d-none d-md-flex'}, '',[
          buildNode('img', {src: quiz[question].icon}, '', []),
        ]),
        buildNode('div', {id: `question-${question}`, class: 'col-lg-8 col-md-8 col-sm-12 col-xs-12'}, '', [
            buildNode('h2',{class: 'display-4 quest-headline'}, quiz[question].headline, []),
            makeNavigation(quiz, {type: 'num', current: question}),
            buildNode('p',{}, quiz[question].description, []),
            buildNode('div', {id: 'module'}, '',
                Object.keys(quiz[question].answers)
                .map(answer =>
                    buildNode('button', {class: 'btn btn-outline-dark', value: `${question},${answer}`, onclick: 'setAnswer(this)'}, `<b>${answer}</b>`, []))
            )
        ]),
      ]);
    });


    const receipt = buildNode('div', {id: 'receipt', class: 'row receipt'}, '', []);
    blocks.push(receipt);

    return blocks.map(block => block.toString());
};



// Forwards to previous
function goPrevious(currentQustion, destinationQuestion) {
    
    if (isLast(quiz, destinationQuestion) || currentQustion === destinationQuestion) {
        return;
    }
    
    const chain = getRangeForProcess(currentQustion, destinationQuestion);
    chain.reverse().map(
        (chainElement) => {
             unsetAnswer(chainElement);
             getQuestionBack(chainElement);
             clearLegendLine(chainElement);
        }
    );
}


// Forwards to begining of calculator / startup point
function toStart(test = quiz) {
    // Clear calc-result
    $("#calc-results").empty();

    // Put sample text to calc-results
    const calcResult = buildNode('div', {class: 'inner'}, '', [
        buildNode('h2', {}, 'Результаты:', []),
        buildNode('p', {}, 'Для приблизительного расчёта стоимости оказания услуг нам необходимы некоторые основные данные о вашей компании: ответьте на три вопроса, пожалуйста...', [])
    ]);

    $("#calc-results").html(buildCalcResult().toString());
    $("#viewport").html(makeQuiz(test));
    // makeQuiz(test);
}
