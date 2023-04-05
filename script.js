const projectName = 'random-quote-machine';
let currentQuote = '',
  currentAuthor = '';

function getQuote() {
  return $.ajax({
    headers: {
      Accept: 'application/json'
    },
    url: 'https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?',
    dataType: 'jsonp'
  });
}

function getRandomQuote() {
  getQuote().done(function (response) {
    currentQuote = response.quoteText;
    currentAuthor = response.quoteAuthor;
    $('.quote-text').animate({ opacity: 0 }, 500, function () {
      $(this).animate({ opacity: 1 }, 500);
      $('#text').text(currentQuote);
    });
    $('.quote-author').animate({ opacity: 0 }, 500, function () {
      $(this).animate({ opacity: 1 }, 500);
      $('#author').html(currentAuthor);
    });
  });
}

function getNewColor() {
  var color = Math.floor(Math.random() * 16777215).toString(16);
  return '#' + ('000000' + color).slice(-6);
}
function getTumblrUrl() {
  var tumblrBaseUrl = 'https://www.tumblr.com/widgets/share/tool?';
  var tumblrParams = {
    posttype: 'quote',
    tags: 'quotes,randomquotemachine',
    caption: currentAuthor,
    content: currentQuote
  };
  var tumblrUrl = tumblrBaseUrl + $.param(tumblrParams);
  return tumblrUrl;
}

$(document).ready(function () {
  getRandomQuote();

  $('#new-quote').on('click', function () {
    getRandomQuote();
    var newColor = getNewColor();
    $('html body').animate(
      {
        backgroundColor: newColor,
        color: newColor
      },
      1000
    );
    $('.button').animate(
      {
        backgroundColor: newColor
      },
      1000
    );
  });

  $('#tweet-quote').on('click', function () {
    window.open(
      'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
        encodeURIComponent('"' + currentQuote + '" ' + currentAuthor),
      '_blank'
    );
  });
  $('#tumblr-quote').on('click', function () {
    window.open(getTumblrUrl(), '_blank');
  });
});
