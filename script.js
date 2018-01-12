// open intro
$(function openIntro() {
    $('#intro').slideDown('slow');
    $('#introoverlay').slideDown("slow");
});

//close intro
$('body').on('click', function closeIntro() {
    $('#intro').slideUp('slow');
    $('#introoverlay').slideUp('slower');
});

//flashing text
$('#intro').ready(function() {
    setInterval(function() {
        $('.flash').toggleClass('active');
    }, 500);
});

// function that holds everything
(function() {

    var currPlayer = 'red';
    $('#turn').html(currPlayer + "'s turn");

    $('.column').on('click', function(e) {
        var slot = $(e.currentTarget).find('.slot');

        //slots update with colors

        for (var i = 5; i >= 0; i--) {
            if (!slot.eq(i).hasClass('red') && !slot.eq(i).hasClass('black')) {
                slot.eq(i).addClass('.circleanim');
                slot.eq(i).addClass(currPlayer);
                $('#turn').html(currPlayer + "'s turn");
                break;
            }
        }

        // check vertical victory
        var counter = 0;
        var row = i;
        for (i = 0; i < slot.length; i++) {
            if (slot[i].classList.contains(currPlayer)) {
                counter++;

                if (counter == 4) {

                    console.log("vertical");
                    $('#wins').fadeIn('fast');
                    $('#wins').html(currPlayer + ' wins!');
                    $('#playAgain').fadeIn('fast');
                    $('#playAgain').html("click to restart game");
                    $('#introoverlay').show("fast");
                    event.stopPropagation();
                    $('body').on('click', function() {
                        console.log("restart");
                        for (var i = 0; i < slot.length; i++) {
                            location.reload();
                        }
                    });
                }
            } else {
                counter = 0;
            }
        }


        // check horizontal victory

        var horizCounter = 0;
        var horizSlots = $('.row' + row);

        for (i = 0; i < horizSlots.length; i++) {
            if (horizSlots[i].classList.contains(currPlayer)) {
                horizCounter++;

                if (horizCounter == 4) {
                    console.log("horizontal");
                    $('#wins').fadeIn('fast');
                    $('#wins').html(currPlayer + ' wins!');
                    $('#playAgain').fadeIn('fast');
                    $('#playAgain').html("click to play again");
                    $('#introoverlay').show("fast");
                    event.stopPropagation();
                    $('body').on('click', function() {
                        console.log("restart");
                        for (var i = 0; i < slot.length; i++) {
                            location.reload();
                        }
                    });
                }
            } else {
                horizCounter = 0;
            }
        }

        // check diag victory

        var columns = $('.column');
        var slots, check;
        for (i = columns.length - 1; i >= 0; i--) { //loop through columns (backwards, but similar logic would work going forwards too)
            slots = columns.eq(i).find('.slot');
            for (var j = 0; j < slots.length; j++) { //loop through slots in column
                //console.log(slots.eq(0))
                check = [
                    slots.eq(j),
                    columns.eq(i - 1).find('.slot').eq(j - 1),
                    columns.eq(i - 2).find('.slot').eq(j - 2),
                    columns.eq(i - 3).find('.slot').eq(j - 3)
                ];
            }
            var diagTotal = 0;
            //console.log(check[0])
            for (var k = 0; k < check.length; k++) {

                if (check[k].hasClass(currPlayer)) {
                    diagTotal++;

                    if (diagTotal == 4) {
                        console.log("vertical win");
                        $('#wins').fadeIn('fast');
                        $('#wins').html(currPlayer + ' wins!');
                        $('#playAgain').fadeIn('fast');
                        $('#playAgain').html("click to restart game");
                        $('#introoverlay').show("fast");
                        event.stopPropagation();
                        $('body').on('click', function() {
                            console.log("restart");
                            for (var i = 0; i < slot.length; i++) {
                                location.reload();
                            }
                        });

                    } else if (!check[k].hasClass(currPlayer)) {

                        diagTotal = 0;
                    }
                }

            }

            //check for winner just like for columns and rows
            for ( j = 0; j < slots.length; j++) {
                // if no winner, get the four going down and to left
                check = [
                    slots.eq(j),
                    columns.eq(i - 1).find('.slot').eq(j + 1),
                    columns.eq(i - 2).find('.slot').eq(j + 2),
                    columns.eq(i - 3).find('.slot').eq(j + 3)
                ];
                diagTotal = 0;
                //check for winner just like for columns and rows
                for (k = 0; k < check.length; k++) {


                    if (check[k].hasClass(currPlayer)) {
                        diagTotal++;

                        if (diagTotal == 4) {
                            console.log("Diagonal");
                            $("#wins").html("<h1>thisappears<hi>").css({});
                        } else if (!check[k].hasClass(currPlayer)) {

                            diagTotal = 0;
                        }

                    }
                }
            }
        }
        //end diag victory


        //switch players
        if (currPlayer == 'red') {
            currPlayer = 'black';
        } else {
            currPlayer = 'red';
        }
        $('#turn').html(currPlayer + "'s turn");

        // restart game button
        $('.restart').on('click', function restart() {
            console.log("restart");
            for (var i = 0; i < slot.length; i++) {
                slot.eq(i).removeClass('black');
                slot.eq(i).removeClass('red');
                currPlayer = 'red';
                $('#turn').html(currPlayer + "'s turn");
                if (currPlayer == 'red') {
                    currPlayer = 'black';
                }
            }
        });
    });
})();
