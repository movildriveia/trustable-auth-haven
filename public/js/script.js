
// Main script file for NexusFinLabs website

// AOS initialization (Animate on Scroll)
$(document).ready(function() {
  
  // Initialize AOS
  AOS.init({
    duration: 1200
  });
  
  // Initialize Venobox for popups
  $('.venobox').venobox();
  
  // Initialize slick sliders if they exist
  if($('.team-slider').length){
    $('.team-slider').slick({
      dots: false,
      infinite: false,
      speed: 300,
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: true,
      responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });
  }
  
  // Smooth scroll for links with .page-scroll class
  $('.page-scroll').on('click', function(event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){
        window.location.hash = hash;
      });
    }
  });
  
});
