(function ($) {
  'use strict';

  /* ---------- IE 11 class start ---------- */
  function isIE() {
    let ua = window.navigator.userAgent; //Check the userAgent property of the window.navigator object
    let msie = ua.indexOf('MSIE '); // IE 10 or older
    let trident = ua.indexOf('Trident/'); //IE 11
    return (msie > 0 || trident > 0);
  }

  function addIEClass() {
    if (isIE()) {
      $('body').addClass('ie');
    }
  }
  /* ---------- IE 11 class ends ---------- */

  /* ---------- code reusage function starts ---------- */
  var callFlag = 0;

  function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /*loop through a collection of all HTML elements:*/
    z = document.getElementsByClassName("include");
    for (i = 0; i < z.length; i++) {
      elmnt = z[i];
      /*search for elements with a certain atrribute:*/
      file = elmnt.getAttribute("w3-include-html");
      if (file) {
        /*make an HTTP request using the attribute value as the file name:*/
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
          if (this.readyState == 4) {
            if (this.status == 200) {
              elmnt.innerHTML = this.responseText;
              elmnt.classList.remove('include');
              if (callFlag == 0) {
                addCurrentClassToMenu();
                removeHomeLink();
                callFlag += 1;
              }
              if (callFlag > z.length) {
                setTimeout(function(){
                  $('body').removeClass('loading');
                  $('.page').animate({
                    'opacity': '1'
                  }, 1000);
                }, 1000);
              }
            }
            if (this.status == 404) {
              elmnt.innerHTML = "Page not found.";
            }
            /*remove the attribute, and call this function once more:*/
            elmnt.removeAttribute("w3-include-html");
            includeHTML();
          }
        }
        xhttp.open("GET", file, true);
        xhttp.send();
        /*exit the function:*/
        return;
      }
    }
  };
  /* ---------- code reusage function ends ---------- */

  /* ---------- adding current class in menu starts ---------- */
  function addCurrentClassToMenu() {
    var url = window.location.pathname,
      urlRegExp = new RegExp(url.replace(/\/$/, '') + "$");
    if (urlRegExp == '/$/') {
      return;
    }
    $('.menu a').each(function () {
      if (urlRegExp.test(this.href.replace(/\/$/, ''))) {
        $(this).parent().addClass('menu__item--current');
      }
    });
  }
  /* ---------- adding current class in menu ends ---------- */

  /* ---------- remove home link starts ---------- */
  function removeHomeLink() {
    if ($('body').hasClass('homepage')) {
      $('.logo__title span').unwrap();
    }
  }
  /* ---------- remove home link ends ---------- */

  /* ---------- ready starts ---------- */
  $(document).ready(function (e) {

    /* ---------- include partials starts ---------- */
    includeHTML();
    /* ---------- include partials ends ---------- */

    /* ---------- Back to top starts --------- */
    if ($(window).width() >= 768) {
      $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
          $('.backtotop').fadeIn();
        } else {
          $('.backtotop').fadeOut();
        }
      });
      $(document).on('click', '.backtotop', function (e) {
        $("html, body").animate({
          scrollTop: 0
        }, 600);
        return false;
      });
    }
    /* ---------- Back to top ends --------- */
  });
  /* ---------- ready starts ---------- */

  /* ---------- load starts ---------- */
  $(window).on('load', function (e) {});
  /* ---------- load ends ---------- */

})(jQuery);

/* ---------- Video starts ---------- */
document.addEventListener("DOMContentLoaded", function(event) {
var x = document.getElementById('myVideo');
document.getElementById('playBtn').addEventListener('click', playVideo);
function playVideo() {
  x.play();
}
});
/* ---------- Video ends ---------- */
