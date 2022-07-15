let _isMobileDeviceDetected = -1

// checks user agent for popular mobile device patterns
function setIsMobileDeviceDeteced() {
  const userAgent = navigator.userAgent
  _isMobileDeviceDetected =
    userAgent.indexOf('Mobile') !== -1 ||
    userAgent.indexOf('iPhone') !== -1 ||
    userAgent.indexOf('Android') !== -1 ||
    userAgent.indexOf('Windows Phone') !== -1
}

// add dropdown functionality to burger menu
function addBurgerMenuEventListeners() {
  const burgerMenuOpen = document.querySelector('#burger-menu__open')
  const burgerMenuClose = document.querySelector('#burger-menu__close')
  const wrapperLinksMobile = document.querySelector('.wrapper__links-mobile')
  burgerMenuOpen.addEventListener('click', () => {
    burgerMenuOpen.style.display = 'none'
    burgerMenuClose.style.display = 'block'
    wrapperLinksMobile.style.display = 'flex'
  })
  burgerMenuClose.addEventListener('click', () => {
    burgerMenuClose.style.display = 'none'
    burgerMenuOpen.style.display = 'block'
    wrapperLinksMobile.style.display = 'none'
  })
  // close burger, when mobile link is clicked
}

function addSmoothScrollEventlisteners() {
  // mobile links
  const burgerMenuOpen = document.querySelector('#burger-menu__open')
  const burgerMenuClose = document.querySelector('#burger-menu__close')
  const wrapperLinksMobile = document.querySelector('.wrapper__links-mobile')
  document.querySelectorAll('.link__mobile').forEach((element) =>
    element.addEventListener('click', (event) => {
      onClickSmoothScrollIntoView(event)
      burgerMenuClose.style.display = 'none'
      burgerMenuOpen.style.display = 'block'
      wrapperLinksMobile.style.display = 'none'
    })
  )
  // desktop links
  document.querySelectorAll('.link__desktop').forEach((element) =>
    element.addEventListener('click', (event) => {
      onClickSmoothScrollIntoView(event)
    })
  )
}

function onClickSmoothScrollIntoView(clickEvent) {
  // extract fragment from href
  const regex = /#.*/
  const linkHref = clickEvent.target.href
  let fragmentStartIndex = linkHref.search(regex)
  // if index found, do smooth scroll
  if (fragmentStartIndex !== -1) {
    const foundFragtment = linkHref.substring(fragmentStartIndex)
    document.querySelector(foundFragtment).scrollIntoView({
      behavior: 'smooth',
    })
    clickEvent.preventDefault()
  }
}

// add modal close button event listener
function addModalEventListeners() {
  const modalCloseButton = document.querySelector('#modal .bx.bxs-x-circle')
  const liveDemoAnchor = document.getElementById('live-demo')
  const prototypeAnchor = document.getElementById('prototype')
  modalCloseButton.addEventListener('click', () => {
    toggleModalRendering()
  })
  liveDemoAnchor.addEventListener('click', () => {
    toggleModalRendering()
  })
  prototypeAnchor.addEventListener('click', () => {
    toggleModalRendering()
  })
}

function closeModal() {
  const modal = document.getElementById('modal')
  const wrapper = document.querySelector('body .wrapper')
  modal.classList.add('--derender')
  wrapper.classList.remove('--blur')
  wrapper.classList.remove('--darken')
}

// adds animated gif funtionality to all case images
function addCaseImageEventListeners() {
  const caseImages = document.getElementsByClassName('case__main-image')
  for (const caseImage of caseImages) {
    handleOnMouseEnterOrMouseLeaveCaseImage(caseImage)
    // handleOnClickCaseImage(caseImage);
  }
}

// handles animated gif functionality of case image
function handleOnMouseEnterOrMouseLeaveCaseImage(caseImage) {
  // base path of image
  const basePath = 'src/img/work/'
  // extension of filename
  const extension = '.gif'
  // base filename of static image
  const staticImageBaseFilename = caseImage.src.split('/').pop().split('.')[0]
  // remove substring '-static' to get base filename of animated image
  const animatedImageBaseFilename = staticImageBaseFilename.substring(0, staticImageBaseFilename.length - 7)

  // if mobile device is detected, always show animated gif functionality
  if (_isMobileDeviceDetected) {
    caseImage.src = `${basePath}${animatedImageBaseFilename}${extension}`
    return
  }

  // when mouse enters case image, point source path to animated image
  caseImage.addEventListener('mouseenter', () => {
    caseImage.src = `${basePath}${animatedImageBaseFilename}${extension}`
  })
  // when mouse leaves case image, point source path back to default static image
  caseImage.addEventListener('mouseleave', () => {
    caseImage.src = `${basePath}${staticImageBaseFilename}${extension}`
  })
}

// handles rendering of case modal
function handleOnClickCaseImage(caseImage) {
  caseImage.addEventListener('click', () => {
    caseImage.scrollIntoView({
      block: 'center',
      inline: 'center',
    })
    const modal = document.getElementById('modal')
    if (modal !== null) {
      if (modal.classList.contains('--derender')) {
        switch (caseImage.id) {
          case 'peepfeed':
            setModal(
              caseImage,
              '#2B2B2F',
              '#ffffff',
              '#E87042',
              'Mobile web app',
              ['SPA', 'API & JSON Fetch', 'ES6 koncepter', 'Moduler & SoC', 'OOP'],
              'En mobilbaseret film-app, hvor man bl.a. kan følge skuespillere og instruktører og få genereret relaterede filmforslag (3. semester)',
              'src/cases/peepfeed/',
              'https://www.figma.com/file/Q7soJOBTGF9Tiasc6tDZge/peepfeed?node-id=0%3A1'
            )
            break
          case 'klosterbryggeriet':
            setModal(
              caseImage,
              '#712C1D',
              '#ffffff',
              '#C19945',
              'Oplevelsessite',
              ['SEO', 'Produktbranding', 'Ikonproduktion', 'Fotoproduktion', 'Mobile-First'],
              'Et oplevelsessite som skulle hjælpe ølproducenten Klosterbryggeriet med at øge julesalget (1. semester)',
              'src/cases/klosterbryggeriet/',
              'https://xd.adobe.com/view/aa388a89-dfc5-4244-a33e-9c76b67e15a6-ff6b/'
            )
            break
          case 'city-escape':
            setModal(
              caseImage,
              '#ffffff',
              '#000102',
              '#C99D2B',
              'Virksomhedscase',
              ['Booking system', 'Modaler', 'Videoproduktion', 'SVG infografik', 'Typewriter-effect'],
              'En virksomhedscase som skulle hjælpe Escape Game-virksomheden City Escape med konceptforklaring og hjælp til et bookingsystem (2. semester)',
              'src/cases/city-escape/',
              'https://www.figma.com/file/1ZcNkKbiZGHUJoyQ1R24Ge/city-escape?node-id=201%3A2'
            )
            break
          default:
            return
        }
        toggleModalRendering()
      }
    }
  })
}

function setModal(caseImage, backgroundColor, fontColor, callToActionColor, title, keywords, description, liveDemoURL, prototypeURL) {
  // declare dom elements
  const innerModal = document.getElementById('container__modal-inner')
  const heading = document.querySelector('#modal h3')
  const descriptionElement = document.querySelectorAll('#modal p')[0]
  const descriptionHeading = document.querySelectorAll('#modal span')[0]
  const keywordsElement = document.querySelectorAll('#modal span')[1]
  const list = document.querySelector('#modal ul')
  const listItems = document.querySelectorAll('#modal ul li')
  const liveDemoAnchor = document.getElementById('live-demo')
  const prototypeAnchor = document.getElementById('prototype')
  const closeButton = document.querySelector('#modal .bx.bxs-x-circle')
  const keywordsContainer = document.querySelector('.container__keywords')

  // set dom elements

  let caseImageWidth = caseImage.offsetWidth
  let caseImageHeight = caseImage.offsetHeight
  let modalHeight = 0.9163473818646232 * caseImageHeight
  let modalWidth = 0.8769017980636238 * caseImageWidth
  innerModal.style.height = `${modalHeight}px`
  innerModal.style.width = `${modalWidth}px`
  list.style.listStyleType = 'none'
  if (modalHeight > 600 && modalWidth > 348) {
    list.style.listStyleType = 'disc'
    keywordsContainer.style.display = 'block'
    for (let i = 0; i < keywords.length; i++) {
      listItems[i].innerText = keywords[i]
    }
    keywordsElement.innerText = 'Keywords'
    keywordsElement.style.color = fontColor
    list.style.color = fontColor
  }
  descriptionHeading.innerText = 'Beskrivelse'
  descriptionHeading.style.color = fontColor
  descriptionElement.innerText = description
  descriptionElement.style.color = fontColor
  innerModal.style.background = backgroundColor
  heading.style.borderBottom = `1px solid ${fontColor}`
  heading.style.color = callToActionColor
  heading.innerText = title
  liveDemoAnchor.href = liveDemoURL
  liveDemoAnchor.style.borderColor = callToActionColor
  liveDemoAnchor.style.background = callToActionColor
  prototypeAnchor.href = prototypeURL
  prototypeAnchor.style.borderColor = callToActionColor
  prototypeAnchor.style.color = fontColor
  closeButton.style.color = callToActionColor
}

function toggleModalRendering() {
  const wrapper = document.querySelector('body .wrapper')
  const modal = document.getElementById('modal')
  if (modal.classList.contains('--derender')) {
    wrapper.classList.add('--blur')
    wrapper.classList.add('--darken')
    modal.classList.remove('--derender')
    modal.style.display = 'flex'
  } else {
    modal.style.display = ''
    wrapper.classList.remove('--blur')
    wrapper.classList.remove('--darken')
    modal.classList.add('--derender')
  }
}

function fadeInOnScroll() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.7,
  }

  function observerCallback(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.replace('fadeOut', 'fadeIn')
      }
    })
  }

  const observer = new IntersectionObserver(observerCallback, observerOptions)

  const fadeElms = document.querySelectorAll('.fade')
  fadeElms.forEach((el) => observer.observe(el))
}

// init
;(function init() {
  setIsMobileDeviceDeteced()
  addBurgerMenuEventListeners()
  addSmoothScrollEventlisteners()
  addModalEventListeners()
  addCaseImageEventListeners()
  fadeInOnScroll()
})()
