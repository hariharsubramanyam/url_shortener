$(document).on("click", "#createButton", function() {
  // On create button click, POST to /links to make shortening and then redirect to URL.
  $.post("/links", {
    "short": $("#short").val(), 
    "url": $("#url").val()
  }, function(data) {
    window.location = data.url;
  });
});