
// Animate flex blocks
const animateBlocks = (...blocks) => {
    blocks.map((element) => {
        const headers = $('#' + element + ' div h4');
        const paragraphs = headers.siblings();

        let counter = 0;
        while (paragraphs.eq(counter).html() !== undefined) {

            let currentPar = paragraphs.eq(counter);

            currentPar.on("mouseenter", function (event) {
                currentPar.animate({opacity: 1}, 200)
            });

            currentPar.on("mouseleave", function (event) {
                currentPar.animate({opacity: .85}, 1000)
            });

            counter += 1;
        }
    });
}

//animateBlocks('stages', 'features', 'services', 'decision');


// Animate form fields
// $("input[name^='email']").animate({fontSize:'1.6em'}, 1000)

const animateInputLabels = (...fields) => {

    fields.map((field) => {
        const currenFieldName = `#${field}`;
        const currenFieldLabel = `#${field}Label`;

        $(currenFieldName).on("focus", function () {
            const value = $(currenFieldName).val();
            if (value == '') {
                $(currenFieldLabel).animate({'font-size': '1em', 'margin': '-20px 0 20px 0'}, 300);
            }
            //$("#result").html(value);
        });

        $(currenFieldName).on("blur", function () {
            const value = $(currenFieldName).val();
            if (value == '') {
                $(currenFieldLabel).animate({'font-size': '2em', 'margin': '-5px 0 0px 0'}, 300);
            }
            //$("#result").html(value);
        });

    });
}

//animateInputLabels('name', 'name_modal','email', 'email_modal', 'tel', 'tel_modal');



const hoverMenu = (className, blockClass) => {

        const blockitems = $("." + blockClass).children();


        let counter = 0;
        while (blockitems.eq(counter).html() !== undefined) {

            let currentPar = blockitems.eq(counter);
            //currentPar.attr('style', 'color:#000');

            currentPar.on("mouseenter", function (event) {
                currentPar.addClass(className);
            });

            currentPar.on("mouseleave", function (event) {
                currentPar.removeClass(className);
            });

            counter += 1;
        }

}

//hoverMenu('btn btn-outline-light text-dark','nav-item');

// Masking Phone
$(function(){
    $("#tel").mask("+7 (999) 999-99-99");
});
$(function(){
    $("#tel-modal").mask("+7 (999) 999-99-99");
});
$(function(){
    $("#tel-bottom").mask("+7 (999) 999-99-99");
});
 