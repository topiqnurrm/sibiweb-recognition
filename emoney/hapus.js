let currentSlide = 1;

function changeSlide(n) {
  showSlide(currentSlide += n);
}

function showSlide(n) {
  const slides = document.getElementsByClassName("slide");

  if (n > slides.length) {
    currentSlide = 1;
  } else if (n < 1) {
    currentSlide = slides.length;
  }

  const transformValue = -33.2 * (currentSlide - 1) + "%";
  document.querySelector(".slider").style.transform = "translateX(" + transformValue + ")";

  updatePageIndicator();
}

function updatePageIndicator() {
  // Optional: Update page indicator based on currentSlide
  // You can add your own logic here, such as updating a page number display.
}

// Auto slide change (optional)
// setInterval(function() {
//   changeSlide(1);
// }, 3000); // Change slide every 3 seconds
