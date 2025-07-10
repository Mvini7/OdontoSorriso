// ===== VARIÁVEIS GLOBAIS =====
const navMenu = document.getElementById("nav-menu")
const navToggle = document.getElementById("nav-toggle")
const navClose = document.getElementById("nav-close")
const navLinks = document.querySelectorAll(".nav__link")

// ===== MENU MOBILE =====
// Mostrar menu
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu")
  })
}

// Esconder menu
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu")
  })
}

// Fechar menu ao clicar em um link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("show-menu")
  })
})

// ===== HEADER SCROLL =====
function scrollHeader() {
  const header = document.getElementById("header")
  // Quando o scroll for maior que 50 viewport height, adiciona classe
  if (this.scrollY >= 50) {
    header.classList.add("scroll-header")
  } else {
    header.classList.remove("scroll-header")
  }
}
window.addEventListener("scroll", scrollHeader)

// ===== ROLAGEM SUAVE =====
// Já implementada via CSS scroll-behavior: smooth, mas vamos adicionar fallback para navegadores antigos
function smoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]')

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const headerHeight = document.querySelector(".header").offsetHeight
        const targetPosition = targetSection.offsetTop - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })
}
smoothScroll()

// ===== CARROSSEL DE DEPOIMENTOS =====
class TestimonialCarousel {
  constructor() {
    this.currentSlide = 0
    this.slides = document.querySelectorAll(".testimonial__card")
    this.dots = document.querySelectorAll(".testimonial__dot")
    this.prevBtn = document.querySelector(".testimonial__prev")
    this.nextBtn = document.querySelector(".testimonial__next")

    this.init()
  }

  init() {
    // Event listeners para botões
    if (this.prevBtn) {
      this.prevBtn.addEventListener("click", () => this.prevSlide())
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener("click", () => this.nextSlide())
    }

    // Event listeners para dots
    this.dots.forEach((dot, index) => {
      dot.addEventListener("click", () => this.goToSlide(index))
    })

    // Auto-play (opcional)
    this.startAutoPlay()
  }

  showSlide(index) {
    // Esconder todos os slides
    this.slides.forEach((slide) => {
      slide.classList.remove("active")
    })

    // Remover active de todos os dots
    this.dots.forEach((dot) => {
      dot.classList.remove("active")
    })

    // Mostrar slide atual
    if (this.slides[index]) {
      this.slides[index].classList.add("active")
    }

    // Ativar dot atual
    if (this.dots[index]) {
      this.dots[index].classList.add("active")
    }

    this.currentSlide = index
  }

  nextSlide() {
    const nextIndex = (this.currentSlide + 1) % this.slides.length
    this.showSlide(nextIndex)
  }

  prevSlide() {
    const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length
    this.showSlide(prevIndex)
  }

  goToSlide(index) {
    this.showSlide(index)
  }

  startAutoPlay() {
    setInterval(() => {
      this.nextSlide()
    }, 5000) // Muda a cada 5 segundos
  }
}

// Inicializar carrossel quando a página carregar
document.addEventListener("DOMContentLoaded", () => {
  new TestimonialCarousel()
})

// ===== VALIDAÇÃO DO FORMULÁRIO =====
class FormValidator {
  constructor() {
    this.form = document.getElementById("contact-form")
    this.init()
  }

  init() {
    if (this.form) {
      this.form.addEventListener("submit", (e) => this.handleSubmit(e))

      // Validação em tempo real
      const inputs = this.form.querySelectorAll(".form__input")
      inputs.forEach((input) => {
        input.addEventListener("blur", () => this.validateField(input))
        input.addEventListener("input", () => this.clearError(input))
      })
    }
  }

  handleSubmit(e) {
    e.preventDefault()

    const isValid = this.validateForm()

    if (isValid) {
      this.submitForm()
    }
  }

  validateForm() {
    const name = document.getElementById("name")
    const email = document.getElementById("email")
    const phone = document.getElementById("phone")
    const service = document.getElementById("service")

    let isValid = true

    // Validar nome
    if (!this.validateName(name.value)) {
      this.showError("name", "Por favor, insira seu nome completo")
      isValid = false
    }

    // Validar email
    if (!this.validateEmail(email.value)) {
      this.showError("email", "Por favor, insira um e-mail válido")
      isValid = false
    }

    // Validar telefone
    if (!this.validatePhone(phone.value)) {
      this.showError("phone", "Por favor, insira um telefone válido")
      isValid = false
    }

    // Validar serviço
    if (!service.value) {
      this.showError("service", "Por favor, selecione o motivo da consulta")
      isValid = false
    }

    return isValid
  }

  validateField(input) {
    const fieldName = input.name
    const value = input.value

    switch (fieldName) {
      case "name":
        if (!this.validateName(value)) {
          this.showError("name", "Por favor, insira seu nome completo")
        }
        break
      case "email":
        if (!this.validateEmail(value)) {
          this.showError("email", "Por favor, insira um e-mail válido")
        }
        break
      case "phone":
        if (!this.validatePhone(value)) {
          this.showError("phone", "Por favor, insira um telefone válido")
        }
        break
      case "service":
        if (!value) {
          this.showError("service", "Por favor, selecione o motivo da consulta")
        }
        break
    }
  }

  validateName(name) {
    return name.trim().length >= 2 && name.trim().includes(" ")
  }

  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  validatePhone(phone) {
    const phoneRegex = /^[$$$$\s\-+\d]{10,}$/
    return phoneRegex.test(phone.replace(/\s/g, ""))
  }

  showError(fieldName, message) {
    const input = document.getElementById(fieldName)
    const errorElement = document.getElementById(`${fieldName}-error`)

    if (input && errorElement) {
      input.classList.add("error")
      errorElement.textContent = message
    }
  }

  clearError(input) {
    const fieldName = input.name
    const errorElement = document.getElementById(`${fieldName}-error`)

    input.classList.remove("error")
    if (errorElement) {
      errorElement.textContent = ""
    }
  }

  submitForm() {
    // Aqui você pode implementar o envio real do formulário
    // Por exemplo, enviar para um servidor ou integrar com um serviço

    const formData = new FormData(this.form)
    const data = Object.fromEntries(formData)

    // Simular envio
    this.showSuccessMessage()

    // Limpar formulário
    this.form.reset()

    // Em um caso real, você enviaria os dados para seu backend:
    // fetch('/api/contact', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(data)
    // });

    console.log("Dados do formulário:", data)
  }

  showSuccessMessage() {
    // Criar elemento de sucesso
    const successDiv = document.createElement("div")
    successDiv.className = "form__success"
    successDiv.innerHTML = `
            <div style="
                background-color: #d4edda;
                color: #155724;
                padding: 1rem;
                border-radius: var(--border-radius);
                margin-bottom: 1rem;
                text-align: center;
            ">
                <i class="fas fa-check-circle"></i>
                Mensagem enviada com sucesso! Entraremos em contato em breve.
            </div>
        `

    // Inserir antes do formulário
    this.form.parentNode.insertBefore(successDiv, this.form)

    // Remover após 5 segundos
    setTimeout(() => {
      successDiv.remove()
    }, 10000)
  }
}

// Inicializar validador do formulário
document.addEventListener("DOMContentLoaded", () => {
  new FormValidator()
})

// ===== ANIMAÇÕES DE SCROLL =====
function animateOnScroll() {
  const elements = document.querySelectorAll(".service__card, .testimonial__card, .gallery__item")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    },
  )

  elements.forEach((element) => {
    observer.observe(element)
  })
}

// Inicializar animações se o usuário não preferir movimento reduzido
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.addEventListener("DOMContentLoaded", animateOnScroll)
}

// ===== MÁSCARA PARA TELEFONE =====
function phoneMask() {
  const phoneInput = document.getElementById("phone")

  if (phoneInput) {
    phoneInput.addEventListener("input", (e) => {
      let value = e.target.value.replace(/\D/g, "")

      if (value.length <= 11) {
        if (value.length <= 10) {
          value = value.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3")
        } else {
          value = value.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
        }
      }

      e.target.value = value
    })
  }
}

// Inicializar máscara do telefone
document.addEventListener("DOMContentLoaded", phoneMask)

// ===== PERFORMANCE E LAZY LOADING =====
function lazyLoadImages() {
  const images = document.querySelectorAll("img[data-src]")

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.classList.remove("lazy")
        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))
}

// ===== INICIALIZAÇÃO GERAL =====
document.addEventListener("DOMContentLoaded", () => {
  console.log("🦷 OdontoSorriso - Landing Page carregada com sucesso!")

  // Inicializar todas as funcionalidades
  lazyLoadImages()

  // Adicionar classe para animações CSS
  document.body.classList.add("loaded")
})

// ===== TRATAMENTO DE ERROS =====
window.addEventListener("error", (e) => {
  console.error("Erro na aplicação:", e.error)
})

// ===== ANALYTICS (OPCIONAL) =====
function trackEvent(eventName, eventData = {}) {
  // Aqui você pode integrar com Google Analytics, Facebook Pixel, etc.
  console.log(`Evento: ${eventName}`, eventData)

  // Exemplo para Google Analytics 4:
  // gtag('event', eventName, eventData);
}

// Rastrear cliques nos botões do WhatsApp
document.addEventListener("click", (e) => {
  if (e.target.closest('a[href*="wa.me"]')) {
    trackEvent("whatsapp_click", {
      button_location: e.target.closest("section")?.className || "unknown",
    })
  }
})
