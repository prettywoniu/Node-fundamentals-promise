let baseURL = "https://deckofcardsapi.com/api/deck"

// 1.
axios
  .get(`${baseURL}/new/shuffle/?deck_count=1`)
  .then(deck => {
    let deck_id = deck.data.deck_id
    console.log(deck_id)
    return axios.get(`${baseURL}/${deck_id}/draw/?count=1`)
  })
  .then(deck => {
    console.log(deck.data.cards[0].value + ' ' + deck.data.cards[0].suit)
  })
  .catch(err => {
    console.log(err)
  })

// 2.
let dek_id = null
axios
  .get(`${baseURL}/new/shuffle/?deck_count=1`)
  .then(deck => {
    dek_id = deck.data.deck_id
    return axios.get(`${baseURL}/${dek_id}/draw/?count=1`)
  })
  .then(c1 => {
    console.log(c1.data.cards[0].value + ' ' + c1.data.cards[0].suit)
    return axios.get(`${baseURL}/${dek_id}/draw/?count=1`)
  })
  .then(c2 => {
    console.log(c2.data.cards[0].value + ' ' + c2.data.cards[0].suit)
  })
  .catch(err => {
    console.log(err)
  })

// 3.
let deck_id = null
let $btn = $('button');
let $cardArea = $('#card-area');

axios.get(`${baseURL}/new/shuffle/`).then(res => {
    console.log(res)
    deck_id = res.data.deck_id
    $btn.show();
})

$btn.on('click', function() {
    axios
      .get(`${baseURL}/${deck_id}/draw/?count=1`)
      .then(res => {
        let cardSrc = res.data.cards[0].image;
        let angle = Math.random() * 90 - 45;
        let randomX = Math.random() * 40 - 20;
        let randomY = Math.random() * 40 - 20;
        $cardArea.append(
            $('<img>', {
                src: cardSrc,
                css: {
                    transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
                }
            })
        );
        if (res.data.remaining === 0) $btn.remove();
      })
})