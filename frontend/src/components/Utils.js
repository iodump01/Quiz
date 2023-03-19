export const timeDifference = (date) => {
  var diff = new Date().getTime() - new Date(date).getTime();

  return Math.floor(diff / 1000);
};

export const countDown = (date) => {
  // Set the date we're counting down to
  var countDownDate = new Date(date).getTime();
  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;
  if (distance > 0) {
    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    var x = days > 0 ? (days < 10 ? "0" + days : days) + ":" : "";
    x += (hours < 10 ? "0" + hours : hours) + ":";
    x += (minutes < 10 ? "0" + minutes : minutes) + ":";
    x += seconds < 10 ? "0" + seconds : seconds;
    return x;
  } else {
    return "END";
  }
};
