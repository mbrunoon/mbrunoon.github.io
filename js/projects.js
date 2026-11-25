// Projects browser: one project open at a time.
// Desktop shows the open project's card in the right column; phones unfold it
// under its own row. Without this script every card stays visible.
(function ($) {
  "use strict";

  var $browser = $("[data-projects]");
  if (!$browser.length) return;

  var $projects = $browser.find(".proj");
  var phone = window.matchMedia("(max-width: 991.98px)");
  var navbarOffset = 80; // fixed navbar height, so the row isn't hidden under it

  $browser.addClass("is-enhanced");

  function open($proj) {
    $projects.removeClass("is-open").find(".proj-row").attr("aria-expanded", "false");
    $proj.addClass("is-open").find(".proj-row").attr("aria-expanded", "true");

    // On phones the card that was open above may collapse and pull this row
    // up out of view: bring the row back to the top of the screen.
    if (phone.matches) {
      var top = $proj.offset().top - navbarOffset;
      if (top < $(window).scrollTop()) {
        $("html, body").animate({ scrollTop: top }, 300);
      }
    }
  }

  $browser.on("click", ".proj-row", function () {
    var $proj = $(this).closest(".proj");
    if (!$proj.hasClass("is-open")) open($proj);
  });
})(jQuery);
