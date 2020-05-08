function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie() {
  // Get page name
  var fileName = location.href.replace(/.*\/\/.*?\//g, "");
  if (fileName == "") {
    fileName = "index.html";
  }

  // Get cookie if set
  var current_page = getCookie("current_page");

  // Change button text if cookie set
  if (fileName == "index.html" && current_page != "") {
    $('a#get-started').text("KEEP LEARNING");
    $('a#get-started').attr('href', current_page);
  }

  // Set cookie if on a topic page
  if (fileName != "index.html" &&
      fileName != "topics.html" &&
      fileName != "more-info.html") {
    setCookie("current_page", "/" + fileName, 365);
  }
}

function toggleNavbar() {
  if ($(document).width() < 768) {
    var links = $('#link-container');

    if (links.attr('data-toggled') && links.attr('data-toggled') == 'true') { 
      links.addClass('hidden');
      links.attr('data-toggled', 'false')
    } else {
      links.removeClass('hidden');
      links.attr('data-toggled', 'true');
    }
  }
}

function initAccordion() {
  var accordion = $("#accordion");
  var i;

  for (i = 0; i < accordion.children('h3').length; i++) {
    accordion.children('h3')[i].addEventListener("click", function() {
      $(this).siblings('h3').removeClass('active').next().removeAttr('style');
      this.classList.toggle("active");

      var content = this.nextElementSibling;
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  }
}

// Centers text vertically on the homepage
function centerText(element) {
  if ($('.icon-grid').outerHeight() > 50) {
    // Icon grid has loaded properly
    if ($(document).width() >= 768) {
      // Device is medium or up
      $(element).css({
        'position' : 'absolute',
        'top' : '50%',
        // Sets margin top to negative half of wrapper height, minus half of icons width, plus half of header and breadcrumbs width
        'margin-top' : function() {return -$(this).outerHeight()/2 - $('.icon-grid').outerHeight()/2 + $('.header').outerHeight()/2 + $('.breadcrumbs').outerHeight()/2 },
        'width' : '100%'
      });
      $('.icon-grid').css({'position' : 'absolute'});
    } else {
      // Device is small, reset positions
      $(element).css({
        'position' : 'static',
        'left' : '0',
        'top' : '0',
        'margin-left': '0',
        'margin-top' : '0'
      });
    }

    // Check device height to avoid overflow (use cases: landscape phone, ultra-widescreen)
    var height = $('.header').outerHeight() + $('.breadcrumbs').outerHeight() + $(element).outerHeight() + $('.icon-grid').outerHeight();
    if ($(document).height() < height) {
      $(element).css({
        'position' : 'static',
        'left' : '0',
        'top' : '0',
        'margin-left': '0',
        'margin-top' : '0'
      });
      $('.icon-grid').css({'position' : 'static'});
    }
  } else {
    // Icons haven't loaded, try again in 300ms
    setTimeout(function() {centerText(element);}, 300);
  }
}

window.onload = function() {
  checkCookie();
  document.getElementById('navbar_toggle').addEventListener("click", toggleNavbar);
}