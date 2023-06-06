$(function() {
    let URL = 'https://deckofcardsapi.com/api/deck';
  
    // Question 1.
    async function single(){ 
        let data = await $.getJSON(`${URL}/new/draw/`).then(data => {
      let { cardSuit, cardValue } = data.cards[0];
      console.log(`${cardValue.toLowerCase()} of ${cardSuit.toLowerCase()}`);
    })};
  


    // Question 2.
    async function nextCard(){
    let firstCard = await $.getJSON(`${URL}/new/draw/`);
      
    let deckId = firstCard.deck_id;
    
    let secondCard = await $.getJSON(`${URL}/${deckId}/draw/`)
    [firstCard, secondCard].forEach(c =>{
      let { cardSuit, cardValue } = c.cards[0];      
      console.log(`${cardValue.value.toLowerCase()} of ${cardSuit.suit.toLowerCase()}`)
    }); 
    }
  
    //Question 3.
    async function create(){
    let $btn = $('button');
    let $cardArea = $('#card-area');
  
    let deckInfo = await $.getJSON(`${URL}/new/shuffle/`); 
    
    $btn.show().on('click', async function() {
      let cardInfo = await $.getJSON(`${URL}/${deckInfo.deck_id}/draw/`)
        let cardSrc = cardInfo.cards[0].image;
        let angle = Math.random() * 80 - 45;
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
    }
    create();
  });
  