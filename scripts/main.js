$(document).ready(function(){
    // function to get random card
        function generateCard(card) {
        // get cards and the count
            let cards = $('.card');
            let cardsLen = cards.length;

        // generate random number based on amount of cards
            let indexNum = Math.floor(Math.random() * cardsLen);

        // get the card that matches array value of random num
            let getCard = cards[indexNum];

        // set id to the card number
            let idNum = (indexNum + 1);
            getCard.id = idNum;

        // return card info
            return getCard;
        }

    // remove last card function
        function removeLastCard(current) {
            // get current card
            let currentCard = $(".card:visible");
            return currentCard;
        }

    // display first card
    let firstLoaded = true;

    // display first card only on load
        do {
            generateCard().style.display = 'block';
            firstLoaded = false;
        }
        while (firstLoaded == true);

        // variables for save info









// ------------------TESTING -------------------//



        // $('.ranBtn').on('click', function() {
        //     getCurrentTitle();
        //     getCurrentText();
        // });

        function getCurrentTitle() {
            let savedTitle = $(".card:visible").find('.card-title').text();
            return savedTitle;
        }

        function getCurrentText() {
            let savedText = $(".card:visible").find('.card-text').text();
            return savedText;
        }




// ---------------END OF TESTING --------------------//





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
            } else {
                $('.saveBtn').html(localStorage.getItem('button ' + saveId));
            }
        });

        // save data
        function saveData(data) {
            localStorage.setItem(data, unsave);
        }

        // delete data
        function deleteData(data) {
            localStorage.removeItem(data);
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

        // delete card title
        function deleteTitle(data) {
            localStorage.removeItem(data);
        }

        // delete card text
        function deleteText(data) {
            localStorage.removeItem(data);
        }

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
                
                $('.saveBtn').html(localStorage.getItem('button ' + saveId));
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
                $('.saveBtn').html(localStorage.getItem('button ' + cardId));
            }
        });

        // on load change save btn to unsave if item in localStorage
        if (localStorage.getItem('button ' + cardId) === null) {
            $('.saveBtn').html(save);
        } else {
            $('.saveBtn').html(localStorage.getItem('button ' + cardId));
        }
});
