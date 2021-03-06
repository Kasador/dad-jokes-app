$(document).ready(function(){
// splash screen load in!!!
setTimeout( () => {
    $('.splash-screen').fadeIn(1000);
}, 200);
setTimeout( () => {
    $('.splash-screen').fadeOut('slow');
}, 4000);
setTimeout( () => {
    $('.main-content').fadeIn('slow');
}, 4600);
//=========================== F U N C T I O N S ====================================//
// function to get random card
    function generateCard() {
        let cards = $('.card');
        let cardsLen = cards.length;

        let indexNum = Math.floor(Math.random() * cardsLen);
        let getCard = cards[indexNum];
        let idNum = (indexNum + 1);

        getCard.id = idNum;
        return getCard;
    }
    // remove last card function
    function removeLastCard() {
        // get current card
        let currentCard = $(".card:visible");
        return currentCard;
    }
    // save data
    function saveData(data) {
        localStorage.setItem(data, unsave);
    }
    // save card title
    function saveTitle(data) {
        let savedTitle = getCurrentTitle();
        localStorage.setItem(data, savedTitle);
    }
    // save card text
    function saveText(data) {
        let savedText = getCurrentText();
        localStorage.setItem(data, savedText);
    }
    // ??? Amazing how much one can improve in 6 months. 
    // I'm leaving this here for an example. this is not DRY...
    // delete card title
    function deleteTitle(data) {
        localStorage.removeItem(data);
    }
    // delete card text
    function deleteText(data) {
        localStorage.removeItem(data);
    }
    // delete data
    function deleteData(data) {
        localStorage.removeItem(data);
    }
    function getCurrentTitle() {
        let savedTitle = $(".card:visible").find('.card-title').text();
        return savedTitle;
    }
    function getCurrentText() {
        let savedText = $(".card:visible").find('.card-text').text();
        return savedText;
    }
//=========================== end of F U N C T I O N S ====================================//

    // display first card
    let firstLoaded = true;
    // display first card only on load
    do {
        generateCard().style.display = 'block';
        firstLoaded = false;
    }
    while (firstLoaded == true);

    // variables for save button
    let save = 'Save <i class="fa fa-star" aria-hidden="true"></i>';
    let unsave = 'Unsave <i class="fa fa-trash" aria-hidden="true"></i>';
    let cardId = $(".card:visible").attr("id");

    // get another random card on random btn click
    $('.ranBtn').on('click', function() {
        // remove last card and get new
        removeLastCard().hide();
        generateCard().style.display = 'block';

        // get id of current card
        let saveId = $(".card:visible").attr("id");

        // if saved change save btn
        if (localStorage.getItem('button ' + saveId) === null) {
            $('.saveBtn').html(save);
        } else if (localStorage.getItem('button ' + saveId) !== null) {
            $('.saveBtn').html(localStorage.getItem('button ' + saveId));
        }
    });
    // change save btn text to unsave on click, (toggle)
    $('.saveBtn').on('click', function() {
        // get current card plus id
        let getCurrentCard = $(".card:visible");
        let saveId = getCurrentCard.attr("id");

        // save card and put into localStorage (toggle)
        if ($('.saveBtn').html() == save) {
            // save card
            console.log('Card ' + saveId + ' has been saved!');
            saveData('button ' + saveId);

            // id the card to get card info
            getCurrentCard.addClass(saveId);
            if (getCurrentCard.hasClass(saveId)) {
                saveTitle('title ' + saveId);
                saveText('text ' + saveId);
            }
        } else if (localStorage.getItem('button ' + saveId) !== null) {
            // delete card
            console.log('Card ' + saveId + ' has been unsaved!');
            deleteData('button ' + saveId);
            getCurrentCard.removeClass(saveId);

            // remove the id of card to delete card info
            if (!getCurrentCard.hasClass(saveId)) {
                deleteTitle('title ' + saveId);
                deleteText('text ' + saveId);
            }
        }
        // change save btn to unsave if item is saved
        if (localStorage.getItem('button ' + saveId) === null) {
            $('.saveBtn').html(save);
        } else {
            $('.saveBtn').html(unsave);
        }
    });
    // on load change save btn to unsave if item in localStorage
    if (localStorage.getItem('button ' + cardId) === null) {
        $('.saveBtn').html(save);
    } else {
        $('.saveBtn').html(localStorage.getItem('button ' + cardId));
    }
    // toggle pages on button clicks of menu
    let favoritesPage = $('.favorites-page'),
        settingsPage = $('.settings-page');

    // favorites page
    $('.favorites').on('click', function(){
        favoritesPage.animate({width:'toggle'},350);

        if (settingsPage.css('display') == 'block') {
            settingsPage.animate({width:'toggle'},350);
        }
    });
    // settings page
    $('.settings').on('click', function(){
        settingsPage.animate({width:'toggle'},350);

        if (favoritesPage.css('display') == 'block') {
            favoritesPage.animate({width:'toggle'},350);
        }
    });
    // home page
    $('.home').on('click', function(){
        if (favoritesPage.css('display') == 'block') {
            favoritesPage.animate({width:'toggle'},350);
        } else if (settingsPage.css('display') == 'block') {
            settingsPage.animate({width:'toggle'},350);
        }
    });
    // ------------------ FAVORITES PAGE -------------
    // check and setInterval
    setInterval( () => {
        // loop through all cards and append if saved
        for (let i=1; i < $('.card').length + 1; i++) {
            // variables for localStorage items
            let title = localStorage.getItem('title ' + i),
                text = localStorage.getItem('text ' + i),
                btn = localStorage.getItem('button ' + i),
                checkCard = $('.card-append'+i);
            // check if there is data in localStorage, if so, append
            if (title !== null && text !== null && btn !== null) {
                // check if already appended, so if, don't append again
                checkCard.css('display', 'block');
                if (checkCard.length == 0) {
                    // append cards
                    $('.append-cards').append(
                        '<div class="card-body border card-append'+i+'" id="'+i+'"><h5 class="card-title title-append'+i+'"></h5><p class="card-text text-append'+i+'"></p><a href="#" class="btn btn-primary btn-append'+i+'"></a></div>'
                    );
                    $('.title-append' + i).append(title);
                    $('.text-append' + i).append(text);
                    $('.btn-append' + i).append(btn);
                }
            } else if (title == null && text == null && btn == null) {
                // check if there ISN'T data in localStorage, if so, delete
                // check if already appended, so if, don't append again
                if (checkCard.length > 0) {
                    // delete cards
                    checkCard.css('display', 'none');
                }
            }
        }
    }, 0);
    // delete card in favorites on button click
    $('.append-cards').on('click', 'a', function (){
        let cardId = this.parentNode.id;
        console.log(cardId);
        deleteData("button " + cardId);
        deleteText("text " + cardId);
        deleteTitle("title " + cardId);

        // change unsave back to save on main 
        if ($('.card').hasClass(cardId)) {
            $('.saveBtn').html(save);
        } else {
            $('.saveBtn').html(unsave);
        }
    });
    // --------------- SETTINGS PAGE -------------
    $('.clear').on('click', () => {
        if (confirm('Delete all saved jokes?')) {
            // clear localStorage
            localStorage.clear();
            location.reload();
        } else {
            // Do nothing!
        }
    });
});
