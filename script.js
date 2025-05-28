// Mobile Navigation Toggle
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger")
  const navMenu = document.querySelector(".nav-menu")

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active")
      navMenu.classList.toggle("active")
    })

    // Close menu when clicking on a link
    document.querySelectorAll(".nav-menu a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active")
        navMenu.classList.remove("active")
      })
    })
  }

  // Contact Form Handling
  const contactForm = document.getElementById("contactForm")
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form data
      const formData = new FormData(contactForm)
      const data = Object.fromEntries(formData)

      // Basic validation
      if (!data.name || !data.email || !data.message || !data.consent) {
        alert("Please fill in all required fields and accept the consent checkbox.")
        return
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(data.email)) {
        alert("Please enter a valid email address.")
        return
      }

      // Simulate form submission
      const submitButton = contactForm.querySelector('button[type="submit"]')
      const originalText = submitButton.textContent
      submitButton.textContent = "Sending..."
      submitButton.disabled = true

      // Simulate API call
      setTimeout(() => {
        alert("Thank you for your message! We will contact you within 24 hours.")
        contactForm.reset()
        submitButton.textContent = originalText
        submitButton.disabled = false
      }, 2000)
    })
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Add scroll effect to navbar
  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar")
    if (window.scrollY > 100) {
      navbar.style.background = "rgba(255, 255, 255, 0.95)"
      navbar.style.backdropFilter = "blur(10px)"
    } else {
      navbar.style.background = "#fff"
      navbar.style.backdropFilter = "none"
    }
  })

  // Animate elements on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe elements for animation
  document
    .querySelectorAll(".feature-card, .attorney-card, .service-card, .associate-card, .country-card")
    .forEach((el) => {
      el.style.opacity = "0"
      el.style.transform = "translateY(20px)"
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
      observer.observe(el)
    })

  // Phone number formatting
  const phoneInputs = document.querySelectorAll('input[type="tel"]')
  phoneInputs.forEach((input) => {
    input.addEventListener("input", (e) => {
      let value = e.target.value.replace(/\D/g, "")
      if (value.length >= 6) {
        value = value.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")
      } else if (value.length >= 3) {
        value = value.replace(/(\d{3})(\d{0,3})/, "($1) $2")
      }
      e.target.value = value
    })
  })

  // Add loading states to buttons
  document.querySelectorAll(".btn").forEach((button) => {
    if (button.getAttribute("href") && button.getAttribute("href").startsWith("tel:")) {
      button.addEventListener("click", () => {
        // Track phone calls (you can integrate with analytics here)
        console.log("Phone call initiated:", button.getAttribute("href"))
      })
    }
  })

  // Form field focus effects
  document.querySelectorAll("input, textarea, select").forEach((field) => {
    field.addEventListener("focus", function () {
      this.parentElement.classList.add("focused")
    })

    field.addEventListener("blur", function () {
      this.parentElement.classList.remove("focused")
    })
  })

  // Auto-resize textarea
  document.querySelectorAll("textarea").forEach((textarea) => {
    textarea.addEventListener("input", function () {
      this.style.height = "auto"
      this.style.height = this.scrollHeight + "px"
    })
  })

  // Add urgency indicator to contact form
  const urgencySelect = document.getElementById("urgency")
  if (urgencySelect) {
    urgencySelect.addEventListener("change", function () {
      const messageField = document.getElementById("message")
      if (this.value === "emergency") {
        messageField.placeholder =
          "EMERGENCY: Please describe your urgent legal matter. We will contact you immediately."
        messageField.style.borderColor = "#e53e3e"
      } else if (this.value === "urgent") {
        messageField.placeholder = "URGENT: Please describe your legal matter. We will prioritize your request."
        messageField.style.borderColor = "#dd6b20"
      } else {
        messageField.placeholder = "Please describe your legal matter..."
        messageField.style.borderColor = "#e2e8f0"
      }
    })
  }

  // International Presence Animations
  initializeInternationalPresence()

  // Stats Counter Animation
  initializeStatsCounter()

  // Office Tabs Functionality
  initializeOfficeTabs()

  // Country card hover effects
  initializeCountryCardEffects()

  // Add staggered animation to country cards
  const countryCards = document.querySelectorAll(".country-card")
  countryCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`
  })
})

// International Presence Interactive Map
function initializeInternationalPresence() {
  const countryMarkers = document.querySelectorAll(".country-marker")
  const countryCards = document.querySelectorAll(".country-card")

  if (countryMarkers.length === 0) return

  // Auto-cycle through countries
  let currentCountryIndex = 0
  const countries = ["uk", "us", "canada", "india", "australia"]

  function showCountry(countryCode) {
    // Remove active class from all markers and cards
    countryMarkers.forEach((marker) => marker.classList.remove("active"))
    countryCards.forEach((card) => card.classList.remove("active"))

    // Add active class to current country
    const activeMarker = document.querySelector(`.country-marker[data-country="${countryCode}"]`)
    const activeCard = document.querySelector(`.country-card[data-country="${countryCode}"]`)

    if (activeMarker) activeMarker.classList.add("active")
    if (activeCard) activeCard.classList.add("active")
  }

  function cycleCountries() {
    showCountry(countries[currentCountryIndex])
    currentCountryIndex = (currentCountryIndex + 1) % countries.length
  }

  // Start with UK (head office)
  showCountry("uk")

  // Auto-cycle every 3 seconds
  const cycleInterval = setInterval(cycleCountries, 3000)

  // Add click handlers for manual interaction
  countryMarkers.forEach((marker) => {
    marker.addEventListener("click", () => {
      clearInterval(cycleInterval)
      const countryCode = marker.getAttribute("data-country")
      showCountry(countryCode)

      // Restart auto-cycle after 10 seconds of inactivity
      setTimeout(() => {
        setInterval(cycleCountries, 3000)
      }, 10000)
    })
  })

  // Add hover effects
  countryMarkers.forEach((marker) => {
    marker.addEventListener("mouseenter", () => {
      marker.style.transform = "scale(1.2)"
    })

    marker.addEventListener("mouseleave", () => {
      marker.style.transform = "scale(1)"
    })
  })
}

// Animated Stats Counter
function initializeStatsCounter() {
  const statItems = document.querySelectorAll(".stat-item")

  if (statItems.length === 0) return

  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const statItem = entry.target
          const target = Number.parseInt(statItem.getAttribute("data-target"))
          const numberElement = statItem.querySelector(".stat-number")

          animateNumber(numberElement, target)
          statsObserver.unobserve(statItem)
        }
      })
    },
    { threshold: 0.5 },
  )

  statItems.forEach((item) => {
    statsObserver.observe(item)
  })
}

function animateNumber(element, target) {
  let current = 0
  const increment = target / 50 // Adjust speed here
  const suffix = element.textContent.includes("+") ? "+" : ""

  const timer = setInterval(() => {
    current += increment
    if (current >= target) {
      current = target
      clearInterval(timer)
    }
    element.textContent = Math.floor(current) + suffix
  }, 30)
}

// Office Tabs Functionality
function initializeOfficeTabs() {
  const officeTabs = document.querySelectorAll(".office-tab")
  const officeDetails = document.querySelectorAll(".office-details")

  if (officeTabs.length === 0) return

  officeTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetOffice = tab.getAttribute("data-office")

      // Remove active class from all tabs and details
      officeTabs.forEach((t) => t.classList.remove("active"))
      officeDetails.forEach((d) => d.classList.remove("active"))

      // Add active class to clicked tab and corresponding details
      tab.classList.add("active")
      const targetDetails = document.querySelector(`.office-details[data-office="${targetOffice}"]`)
      if (targetDetails) {
        targetDetails.classList.add("active")
      }
    })
  })
}

// Parallax effect for hero sections
function initializeParallax() {
  const parallaxElements = document.querySelectorAll(".hero, .page-header")

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    parallaxElements.forEach((element) => {
      const rate = scrolled * -0.5
      element.style.transform = `translateY(${rate}px)`
    })
  })
}

// Initialize parallax on load
window.addEventListener("load", initializeParallax)

// Typing animation for hero text
function initializeTypingAnimation() {
  const heroTitle = document.querySelector(".hero h1")
  if (!heroTitle) return

  const text = heroTitle.textContent
  heroTitle.textContent = ""
  heroTitle.style.borderRight = "2px solid #c53030"

  let i = 0
  const typeWriter = () => {
    if (i < text.length) {
      heroTitle.textContent += text.charAt(i)
      i++
      setTimeout(typeWriter, 100)
    } else {
      setTimeout(() => {
        heroTitle.style.borderRight = "none"
      }, 1000)
    }
  }

  // Start typing animation after a short delay
  setTimeout(typeWriter, 500)
}

// Country card hover effects
function initializeCountryCardEffects() {
  const countryCards = document.querySelectorAll(".country-card")

  countryCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px) scale(1.02)"
      card.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.2)"
    })

    card.addEventListener("mouseleave", () => {
      if (!card.classList.contains("active")) {
        card.style.transform = "translateY(20px)"
        card.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.1)"
      }
    })
  })
}

// Utility functions
function formatPhoneNumber(phoneNumber) {
  const cleaned = phoneNumber.replace(/\D/g, "")
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    return "(" + match[1] + ") " + match[2] + "-" + match[3]
  }
  return phoneNumber
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

// Add print styles functionality
function printPage() {
  window.print()
}

// Add to favorites functionality
function addToFavorites() {
  if (window.sidebar && window.sidebar.addPanel) {
    window.sidebar.addPanel(document.title, window.location.href, "")
  } else if (window.external && "AddFavorite" in window.external) {
    window.external.AddFavorite(window.location.href, document.title)
  } else if (window.opera && window.print) {
    const elem = document.createElement("a")
    elem.setAttribute("href", window.location.href)
    elem.setAttribute("title", document.title)
    elem.setAttribute("rel", "sidebar")
    elem.click()
  } else {
    alert("Please use Ctrl+D to bookmark this page.")
  }
}
