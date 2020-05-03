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
  if ($(document).width() < 769) {
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

window.onload = function() {
  checkCookie();
  document.getElementById('navbar_toggle').addEventListener("click", toggleNavbar);
}