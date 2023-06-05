$(function() {
    let URL = 'https://deckofcardsapi.com/api/deck';
  
    // Question 1.
    $.getJSON(`${URL}/new/draw/`).then(data => {
      let { cardSuit, cardValue } = data.cards[0];
      console.log(`${cardValue.toLowerCase()} of ${cardSuit.toLowerCase()}`);
    });
  


    // Question 2.
    let firstCard = null;
    $.getJSON(`${URL}/new/draw/`)
      .then(data => {
        firstCard = data.cards[0];
        let deckId = data.deck_id;
        return $.getJSON(`${URL}/${deckId}/draw/`);
      })
      .then(data => {
        let secondCard = data.cards[0];
        [firstCard, secondCard].forEach(function(card) {
          console.log(
            `${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`
          );
        });
      });
  
    //Question 3.
    let deckId = null;
    let $btn = $('button');
    let $cardArea = $('#card-area');
  
    $.getJSON(`${URL}/new/shuffle/`).then(data => {
      deckId = data.deck_id;
      $btn.show();
    });
  
    $btn.on('click', function() {
      $.getJSON(`${URL}/${deckId}/draw/`).then(data => {
        let cardSrc = data.cards[0].image;
        let angle = Math.random() * 90 - 45;
        let randomX = Math.random() * 50 - 20;
        let randomY = Math.random() * 50 - 20;
        $cardArea.append(
          $('<img>', {
            src: cardSrc,
            css: {
              transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
            }
          })
        );
        if (data.remaining === 0) $btn.remove();
      });
    });
  });
  