/*-----------------------------------------------------------------------------------

    Template Name: Websole


    Note: This is Custom Js file
  
-----------------------------------------------------------------------------------*/

$(document).ready(function () {
  var new_scroll_position = 0;
  var last_scroll_position;
  var header = document.getElementById("stickyHeader");
  window.addEventListener("scroll", function (e) {
    last_scroll_position = window.scrollY;
    if (
      new_scroll_position < last_scroll_position &&
      last_scroll_position > 100
    ) {
      header.classList.remove("slideDown");
      header.classList.add("slideUp");
    } else if (last_scroll_position < 100) {
      header.classList.remove("slideDown");
    } else if (new_scroll_position > last_scroll_position) {
      header.classList.remove("slideUp");
      header.classList.add("slideDown");
    }

    new_scroll_position = last_scroll_position;
  });
});
/*************  accordion-item ****************/

$(".accordion-item .heading").on("click", function (e) {
  e.preventDefault();

  if ($(this).closest(".accordion-item").hasClass("active")) {
    $(".accordion-item").removeClass("active");
  } else {
    $(".accordion-item").removeClass("active");

    $(this).closest(".accordion-item").addClass("active");
  }
  var $content = $(this).next();
  $content.slideToggle(100);
  $(".accordion-item .content").not($content).slideUp("fast");
});

function inVisible(element) {
  var WindowTop = $(window).scrollTop();
  var WindowBottom = WindowTop + $(window).height();
  var ElementTop = element.offset().top;
  var ElementBottom = ElementTop + element.height();
  if (ElementBottom <= WindowBottom && ElementTop >= WindowTop)
    animate(element);
}

function animate(element) {
  if (!element.hasClass("ms-animated")) {
    var maxval = element.data("max");
    var html = element.html();
    element.addClass("ms-animated");
    $({
      countNum: element.html(),
    }).animate(
      {
        countNum: maxval,
      },
      {
        duration: 5000,
        easing: "linear",
        step: function () {
          element.html(Math.floor(this.countNum) + html);
        },
        complete: function () {
          element.html(this.countNum + html);
        },
      }
    );
  }
}

$(function () {
  $(window).scroll(function () {
    $("h2[data-max]").each(function () {
      inVisible($(this));
    });
  });
});

/* 6. loaded */
$(window).on("load", function () {
  $("body").addClass("page-loaded");
});

/* heading hover  */

// (function ($) {
//   function title_animation() {
//     var tg_var = jQuery(".sec-title-animation");
//     if (!tg_var.length) {
//       return;
//     }
//     const quotes = document.querySelectorAll(
//       ".sec-title-animation .title-animation"
//     );

//     quotes.forEach((quote) => {
//       //Reset if needed
//       if (quote.animation) {
//         quote.animation.progress(1).kill();
//         quote.split.revert();
//       }

//       var getclass = quote.closest(".sec-title-animation").className;
//       var animation = getclass.split("animation-");
//       if (animation[1] == "style4") return;

//       quote.split = new SplitText(quote, {
//         type: "lines,words,chars",
//         linesClass: "split-line",
//       });
//       gsap.set(quote, {
//         perspective: 400,
//       });

//       if (animation[1] == "style2") {
//         gsap.set(quote.split.chars, {
//           opacity: 0,
//           x: "50",
//         });
//       }
//       quote.animation = gsap.to(quote.split.chars, {
//         scrollTrigger: {
//           trigger: quote,
//           start: "top 90%",
//         },
//         x: "0",
//         y: "0",
//         rotateX: "0",
//         opacity: 1,
//         duration: 1,
//         ease: Back.easeOut,
//         stagger: 0.02,
//       });
//     });
//   }
//   ScrollTrigger.addEventListener("refresh", title_animation);

//   $(window).on("load", function () {
//     title_animation();
//   });
// })(window.jQuery);

function titleAnimation() {
  const sections = document.querySelectorAll(".sec-title-animation");
  if (!sections.length) return;

  const quotes = document.querySelectorAll(
    ".sec-title-animation .title-animation"
  );

  console.log("quotes", quotes);

  quotes.forEach((quote) => {
    // Reset if needed
    if (quote.animation) {
      quote.animation.progress(1).kill();
      if (quote.split) quote.split.revert();
    }

    const parentClass = quote.closest(".sec-title-animation").className;
    const animationType = parentClass.split("animation-")[1];

    if (animationType === "style4") return;

    quote.split = new SplitText(quote, {
      type: "lines,words,chars",
      linesClass: "split-line",
    });

    gsap.set(quote, { perspective: 400 });

    if (animationType === "style2") {
      gsap.set(quote.split.chars, {
        opacity: 0,
        x: "50",
      });
    }

    quote.animation = gsap.to(quote.split.chars, {
      scrollTrigger: {
        trigger: quote,
        start: "top 90%",
      },
      x: "0",
      y: "0",
      rotateX: "0",
      opacity: 1,
      duration: 1,
      ease: "back.out(1.7)", // Replacing Back.easeOut with modern GSAP ease
      stagger: 0.02,
    });
  });
}

// Re-initialize on ScrollTrigger refresh
ScrollTrigger.addEventListener("refresh", titleAnimation);

// Trigger on page load (equivalent to jQuery window onload)
window.addEventListener("load", titleAnimation);

function scrollTopPercentage() {
  const scrollPercentage = () => {
    const scrollTopPos = document.documentElement.scrollTop;
    const calcHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrollValue = Math.round((scrollTopPos / calcHeight) * 100);
    const scrollElementWrap = $("#scroll-percentage");

    scrollElementWrap.css(
      "background",
      `conic-gradient( #fff ${scrollValue}%, #000 ${scrollValue}%)`
    );

    // ScrollProgress
    if (scrollTopPos > 100) {
      scrollElementWrap.addClass("active");
    } else {
      scrollElementWrap.removeClass("active");
    }

    if (scrollValue < 99) {
      $("#scroll-percentage-value").text(`${scrollValue}%`);
    } else {
      $("#scroll-percentage-value").html(
        '<i class="fa-solid fa-arrow-up-long"></i>'
      );
    }
  };
  window.onscroll = scrollPercentage;
  window.onload = scrollPercentage;
  // Back to Top
  function scrollToTop() {
    document.documentElement.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  $("#scroll-percentage").on("click", scrollToTop);
}
scrollTopPercentage();

document.querySelectorAll(".open-event-modal").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    const modalId = this.getAttribute("data-target");
    const modalEl = document.getElementById(modalId);
    if (modalEl) {
      modalEl.style.display = "block";
      document.body.classList.add("no-scroll"); // Optional: prevent scroll
    }
  });
});

// Close modal (any modal with .custom-modal and .btn-close or #cta-modal-btn)
document
  .querySelectorAll(".custom-modal .btn-close, .cta-modal-btn")
  .forEach((btn) => {
    btn.addEventListener("click", function () {
      const modal = this.closest(".custom-modal");
      if (modal) {
        modal.style.display = "none";
        document.body.classList.remove("no-scroll");
      }
    });
  });

// Optional: Close on outside click
window.addEventListener("click", function (e) {
  document.querySelectorAll(".custom-modal").forEach((modal) => {
    if (e.target === modal) {
      modal.style.display = "none";
      document.body.classList.remove("no-scroll");
    }
  });
});
