const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle");
navClose = document.getElementById("nav-close");
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*======================= ACCORD SKILLS ======================*/

const skillsContent = document.getElementsByClassName("skills__content"),
  skillsHeader = document.querySelectorAll(".skills__header");

function toggleSkills() {
  let itemClass = this.parentNode.className;

  for (i = 0; i < skillsContent.length; i++) {
    skillsContent[i].className = "skills__content skills__close";
  }
  if (itemClass === "skills__content skills__close") {
    this.parentNode.className = "skills__content skills__open";
  }
}

skillsHeader.forEach((el) => {
  el.addEventListener("click", toggleSkills);
});

/*============== Qualification Tabs ===============*/

const tabs = document.querySelectorAll('[data-target]'),
  tabContents = document.querySelectorAll('[data-content]')

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = document.querySelector(tab.dataset.target)
    tabContents.forEach(tabContent => {
      tabContent.classList.remove('qualification__active')
    })
    target.classList.add('qualification__active')
    tabs.forEach(tab => {
      tab.classList.remove('qualification__active')
    })
    tab.classList.add('qualification__active')
  })
})

/*======================= Services Modal ===================*/
const modalViews = document.querySelectorAll(".services__modal"),
  modalBtns = document.querySelectorAll(".services__button"),
  modalCloses = document.querySelectorAll(".services__modal-close");

let modal = function (modalClick) {
  modalViews[modalClick].classList.add("active-modal");
};

modalBtns.forEach((modalBtn, i) => {
  modalBtn.addEventListener("click", () => {
    modal(i);
  });
});

modalCloses.forEach((modalClose) => {
  modalClose.addEventListener("click", () => {
    modalViews.forEach((modalView) => {
      modalView.classList.remove("active-modal");
    });
  });
});

/*======================= Portfolio Swiper ===================*/
var swiper = new Swiper(".portfolio__container", {
  cssMode: true,
  loop: true,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute("id");

    // Special handling for qualification section
    if (sectionId === 'qualification') {
      const isVisible = scrollY > sectionTop && scrollY <= sectionTop + sectionHeight;

      // Qualification tabs mapping
      const qualLinks = ['#education', '#work', '#trainings'];

      if (isVisible) {
        // Find active tab ID
        const activeTab = document.querySelector('.qualification__content.qualification__active');
        const activeTabId = activeTab ? activeTab.getAttribute('id') : 'education';

        qualLinks.forEach(href => {
          const link = document.querySelector(`.nav__menu a[href="${href}"]`);
          if (link) {
            // Normalize href vs id comparison
            if (href === `#${activeTabId}`) {
              link.classList.add('active-link');
            } else {
              link.classList.remove('active-link');
            }
          }
        });
      } else {
        // Remove active-link when section is not visible
        qualLinks.forEach(href => {
          const link = document.querySelector(`.nav__menu a[href="${href}"]`);
          if (link) link.classList.remove('active-link');
        });
      }
    } else {
      // Standard behavior
      const navLink = document.querySelector(".nav__menu a[href*=" + sectionId + "]");
      if (navLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLink.classList.add("active-link");
        } else {
          navLink.classList.remove("active-link");
        }
      }
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
  const nav = document.getElementById("header");
  // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
  if (this.scrollY >= 80) nav.classList.add("scroll-header");
  else nav.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/*==================== SHOW SCROLL up ====================*/
function scrollUp() {
  const scrollUp = document.getElementById("scroll-up");
  // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
  if (this.scrollY >= 560) scrollUp.classList.add("show-scroll");
  else scrollUp.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollUp);

/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "uil-sun";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "uil-moon" : "uil-sun";

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme,
  );
  themeButton.classList[selectedIcon === "uil-moon" ? "add" : "remove"](
    iconTheme,
  );
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

/*==================== SMOOTH SCROLL & CLEAN URL FOR ALL NAV LINKS ====================*/
const allNavLinks = document.querySelectorAll('.nav__link');

allNavLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent hash from being added to URL

    const href = link.getAttribute('href');

    // Determine the target section
    let targetId = href;
    let shouldClickTab = false;

    // Special handling for Qualification tabs
    if (href === '#trainings' || href === '#work' || href === '#education') {
      targetId = '#qualification';
      shouldClickTab = true;
    }

    // Handle empty or top links
    if (targetId === '#') targetId = '#home';

    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      // Calculate header height to offset scroll
      const header = document.getElementById('header');
      const headerOffset = header ? header.offsetHeight : 0;
      const elementPosition = targetSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });

      // If it served as a tab switch, click the tab button
      if (shouldClickTab) {
        const tabButton = document.querySelector(`[data-target="${href}"]`);
        if (tabButton) {
          tabButton.click();
        }
      }
    }

    // Close mobile menu
    const navMenu = document.getElementById('nav-menu');
    if (navMenu) {
      navMenu.classList.remove('show-menu');
    }

    // Manually update active link
    document.querySelectorAll('.nav__link').forEach(l => l.classList.remove('active-link'));
    link.classList.add('active-link');
  });
});
