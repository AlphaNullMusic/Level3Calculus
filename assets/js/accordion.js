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