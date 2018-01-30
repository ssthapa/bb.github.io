class Carousel {
  constructor(element) {
    this.element = element;

    this.init();
  }

  init() {
    this.carouselContent = this.element.querySelector('.carousel-content');
    this.items = this.carouselContent.querySelectorAll('.carousel-item');

    this.element.querySelector('.carousel-nav-left').addEventListener('click', (e) => {
      this.prevSlide();
    }, false);
    this.element.querySelector('.carousel-nav-right').addEventListener('click', (e) => {
      this.nextSlide();
    }, false);

    this.setOrder();
  }

  setOrder(direction){
    // initialize direction to change order
    if (direction === 'previous') {
      direction = 1;
    } else if (direction === 'next') {
      direction = -1;
    }

    let nbItems = this.items.length;
    if (nbItems) {
      this.items.forEach((item, index) => {
        let newValue;
        if (item.style.order) {
          newValue = (parseInt(item.style.order, 10) + direction) % nbItems;
        } else {
          newValue = ((index + 2) % nbItems);
        }
        if (!newValue || newValue !== 2) {
          item.style['z-index'] = '0';
          item.classList.remove('is-active');
        } else {
          item.style['z-index'] = '1';
          item.classList.add('is-active');
        }
        item.style.order = newValue ? newValue : nbItems;
      });
    }
  }

  prevSlide(evt) {
    // add reverse
    this.carouselContent.classList.add('carousel-reverse');
    // Disable transition to instant change order
    this.carouselContent.classList.toggle('carousel-animate');
    // Change order of element
    // Current order 2 visible become order 1
    this.setOrder('previous');

    // Enable transition to animate order 1 to order 2
    setTimeout(() => {
      this.carouselContent.classList.toggle('carousel-animate');
    }, 50);
  }

  nextSlide(evt) {
    // remove reverse
    this.carouselContent.classList.remove('carousel-reverse');

    // Disable transition to instant change order
    this.carouselContent.classList.toggle('carousel-animate');
    // Change order of element
    // Current order 2 visible become order 3
    this.setOrder('next');
    // Enable transition to animate order 3 to order 2
    setTimeout(() => {
      this.carouselContent.classList.toggle('carousel-animate');
    }, 50);
  };
}

window.onload = function() {
  let carousels = document.querySelectorAll('.carousel, .hero-carousel');
  if (carousels) {
    carousels.forEach(element => {
      new Carousel(element);
    })
  }
};

document.addEventListener('DOMContentLoaded', function () {

  // Get all "navbar-burger" elements
  var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {

    // Add a click event on each of them
    $navbarBurgers.forEach(function ($el) {
      $el.addEventListener('click', function () {

        // Get the target from the "data-target" attribute
        var target = $el.dataset.target;
        var $target = document.getElementById(target);

        // Toggle the class on both the "navbar-burger" and the "navbar-menu"
        $el.classList.toggle('is-active');
        $target.classList.toggle('is-active');

      });
    });
  }

});
