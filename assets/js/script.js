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
  var navbarToggler = document.getElementById('navbar_toggle');
  navbarToggler.addEventListener("click", toggleNavbar);
}