exports.data = function () {
  var date = new Date();
  var options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  return date.toLocaleDateString("de-DE", options);
};
