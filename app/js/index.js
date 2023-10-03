$(function () {
	// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
	let vh = window.innerHeight * 0.01;
	// Then we set the value in the --vh custom property to the root of the document
	document.documentElement.style.setProperty('--vh', `${vh}px`);
	// We listen to the resize event
	window.addEventListener('resize', () => {
		// We execute the same script as before
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
	});

	
	var closeCatalogMenuOnLeaveTimeout=false;
	$('.js-desktop-catalog-opener, .js-catalog-menu-wrap').on('mouseenter', function () {
		if(closeCatalogMenuOnLeaveTimeout!==false){
			clearTimeout(closeCatalogMenuOnLeaveTimeout);
		}
		$('.js-catalog-menu-wrap').addClass('catalog-menu-wrap--opened');
	});

	$('.js-desktop-catalog-opener, .js-catalog-menu-wrap').on('mouseleave', function () {
		
		if(!window.matchMedia('(max-width: 991.5px)').matches){
			closeCatalogMenuOnLeaveTimeout=setTimeout(function(){
				$('.js-catalog-menu-wrap').removeClass('catalog-menu-wrap--opened');
				closeCatalogMenuOnLeaveTimeout=false;
			},300);
		}
	});

	$('.js-catalog-menu__item-l1-sub-opener').on('click', function(e){
		e.stopPropagation();	
		$(this).siblings('.catalog-menu__item-l1-subs').stop(true).slideToggle(300);
		$(this).closest('.catalog-menu__item-l1').toggleClass('catalog-menu__item-l1--sub-opened');
	});

	$('.catalog-menu__item-l1--has-sub').on('click', function(){
		if(window.matchMedia('(max-width: 991.5px)').matches){
		$(this).find('.js-catalog-menu__item-l1-sub-opener').trigger('click');	
		}	
	});
	$('.catalog-menu__item-l1-link').on('click', function(e){
		e.stopPropagation();	
	});




	$('.js-mob-menu-catalog-btn__link').on('click', function(e){
		e.stopPropagation();
	});

	$('.js-mob-menu-catalog-btn').on('click', function(e){
		//$('.header__content-wrapper .menu-toggle').trigger('click');
		$('.js-catalog-menu-wrap').addClass('catalog-menu-wrap--opened');
		document.querySelector('body').classList.remove('hidden');
		document.querySelector('body').classList.add('hidden-body-mob');
		$('.header__content-wrapper .menu-toggle').removeClass('menu-toggle--opened');
		document.querySelector('.header__mobile-menu').classList.remove('header__mobile-menu--opened');
		document.querySelector('.header').classList.remove('header--bg_blur');
	});

	

	$('.js-close-catalog-mob ').on('click', function(e){
		//$('.header__content-wrapper .menu-toggle').trigger('click');
		$('.js-catalog-menu-wrap').removeClass('catalog-menu-wrap--opened');
		//document.querySelector('body').classList.remove('hidden');
		
		document.querySelector('body').classList.remove('hidden-body-mob');
	});

	
	
});





window.addEventListener('DOMContentLoaded', () => {
	// Mobile menu btn toggle
	const btnMenu = document.querySelector('.menu-toggle');
	btnMenu.addEventListener('click', (e) => {
		let target = e.target.closest('.menu-toggle');
		if (!target) return;
		if (!btnMenu.contains(target)) return;
		toggleMenu(target);
	});

	function toggleMenu(btn) {
		btn.classList.toggle('menu-toggle--opened');
		document.querySelector('body').classList.toggle('hidden');
		document.querySelector('.header__mobile-menu').classList.toggle('header__mobile-menu--opened');
		document.querySelector('.header').classList.toggle('header--bg_blur');
	}

	// mask input phone
	function maskPhone(selector, masked = "+7 (___) ___-__-__") {
		const elems = document.querySelectorAll(selector);

		function mask(event) {
			const keyCode = event.keyCode;
			const template = masked,
				def = template.replace(/\D/g, ""),
				val = this.value.replace(/\D/g, "");
			let i = 0,
				newValue = template.replace(/[_\d]/g, function (a) {
					return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
				});
			i = newValue.indexOf("_");
			if (i != -1) {
				newValue = newValue.slice(0, i);
			}
			let reg = template
				.substr(0, this.value.length)
				.replace(/_+/g, function (a) {
					return "\\d{1," + a.length + "}";
				})
				.replace(/[+()]/g, "\\$&");
			reg = new RegExp("^" + reg + "$");
			if (!reg.test(this.value) || this.value.length < 5 || (keyCode > 47 && keyCode < 58)) {
				this.value = newValue;
			}
			if (event.type == "blur" && this.value.length < 5) {
				this.value = "";
			}
		}

		for (const elem of elems) {
			elem.addEventListener("input", mask);
			elem.addEventListener("focus", mask);
			elem.addEventListener("blur", mask);
		}
	}
	maskPhone('input[type="tel"]');

	// Sliders






	if (document.querySelector('.js-main-partners-slider')) {
		let partnersSlider = new Swiper('.js-main-partners-slider', {
			autoHeight: true,
			slidesPerView: 6,
			spaceBetween: 30,
			loop: true,
			navigation: {
				nextEl: '.main-partners .swiper-next',
				prevEl: '.main-partners .swiper-prev',
			},
			breakpoints: {
				0: {
					slidesPerView: 2.4,
					spaceBetween: 15,
					centeredSlides: true
				},
				578: {
					slidesPerView: 3
				},
				992: {
					slidesPerView: 5
				},
				1200: {
					slidesPerView: 6,
					spaceBetween: 30,
					centeredSlides: false
				}
			}
		});
	}

	function initPartnersSlider() {
		let partnersSlider = new Swiper('.js-mobile-partners-slider', {
			autoHeight: true,
			slidesPerView: 2,
			spaceBetween: 10,
			loop: true,
			navigation: {
				nextEl: '.main-partners .swiper-next',
				prevEl: '.main-partners .swiper-prev',
			},
			breakpoints: {
				0: {
					slidesPerView: 1.2,
				},
				480: {
					slidesPerView: 2.4
				},
			}
		});
	}

	if (document.querySelector('.js-mobile-partners-slider')) {
		initPartnersSlider();
	}

	if (document.querySelector('.js-mobile-partners-slider')) {
		window.addEventListener('resize', resizePartners);
		const slider = document.querySelector('.partners-slider-mobile');
		function resizePartners() {
			if (window.innerWidth > 578) {
				if (slider) {
					slider.remove();
				}
			} else {
				if (!document.querySelector('.partners-slider-mobile')) {
					document.querySelector('.company-section').append(slider);
					initPartnersSlider();
				}
			}
		}
		resizePartners();
	}

	if (document.querySelector('.partners')) {
		window.addEventListener('resize', resizePartnersGrid);
		const partners = document.querySelector('.partners');
		function resizePartnersGrid() {
			if (window.innerWidth < 578) {
				if (partners) {
					partners.remove();
				}
			} else {
				if (!document.querySelector('.partners')) {
					document.querySelector('.company-section__content').append(partners);
				}
			}
		}
		resizePartnersGrid();
	}

	function initPortSlider() {
		let portSlider = new Swiper('.js-portfolio-slider', {
			autoHeight: true,
			slidesPerView: 2,
			spaceBetween: 10,
			loop: false,
			navigation: {
				nextEl: '.swiper-next',
				prevEl: '.swiper-prev',
			},
			breakpoints: {
				0: {
					slidesPerView: 1.2,
				},
				480: {
					slidesPerView: 2.4
				},
			}
		});
	}

	if (document.querySelector('.js-portfolio-slider')) {
		initPortSlider();
	}

	if (document.querySelector('.js-portfolio-slider')) {
		window.addEventListener('resize', resizePortfolio);
		const slider = document.querySelector('.portfolio-slider-mobile');
		function resizePortfolio() {
			if (window.innerWidth > 578) {
				if (slider) {
					slider.remove();
				}
			} else {
				if (!document.querySelector('.js-portfolio-slider')) {
					document.querySelector('.company-section').append(slider);
					initPortSlider();
				}
			}
		}
		resizePortfolio();
	}

	if (document.querySelector('.portfolio-gallery')) {
		window.addEventListener('resize', resizeGallery);
		const grid = document.querySelector('.portfolio-detail__gallery');
		function resizeGallery() {
			if (window.innerWidth < 578) {
				if (grid) {
					grid.remove();
				}
			} else {
				if (!document.querySelector('.portfolio-gallery')) {
					document.querySelector('.portfolio-detail').append(grid);
				}
			}
		}
		resizeGallery();
	}

	if (document.querySelector('.js-partner-slider')) {
		let partnerLength = document.querySelectorAll('.js-partner-slider .swiper-slide').length;
		let partnerSlider = new Swiper('.js-partner-slider', {
			autoHeight: true,
			slidesPerView: 1,
			spaceBetween: 0,
			loop: true,
			navigation: {
				nextEl: '.swiper-next',
				prevEl: '.swiper-prev',
			},
			on: {
				init: function (e) {
					if (partnerLength <= 9) {
						partnerLength = `0${partnerLength}`;
					}
					document.querySelector('.counter-partner__total').innerHTML = partnerLength;
				},
				slideChange: function (e) {
					let number = e.realIndex + 1;
					if ((e.realIndex + 1) <= 9) {
						number = `0${e.realIndex + 1}`;
					}
					document.querySelector('.counter-partner__cur').innerHTML = number;
				}
			}
		});
	}


	if (document.querySelector('.js-catalog-partners-slider')) {
		let partnersSlider = new Swiper('.js-catalog-partners-slider', {
			autoHeight: true,
			slidesPerView: 4,
			spaceBetween: 30,
			loop: true,
			navigation: {
				nextEl: '.main-partners .swiper-next',
				prevEl: '.main-partners .swiper-prev',
			},
			breakpoints: {
				0: {
					slidesPerView: 2.4,
					spaceBetween: 15,
					centeredSlides: true
				},
				578: {
					slidesPerView: 3,
					spaceBetween: 15,
				},
				992: {
					slidesPerView: 4,
					centeredSlides: false
				},
				1200: {
					slidesPerView: 4,
					spaceBetween: 30,
					centeredSlides: false
				}
			}
		});
	}

	if (document.querySelector('.portfolio-slider')) {
		let portfolioSlider = new Swiper('.portfolio-slider', {
			slidesPerView: 2,
			spaceBetween: 30,
			loop: true,
			navigation: {
				nextEl: '.main-portfolio .swiper-next',
				prevEl: '.main-portfolio .swiper-prev',
			},
			breakpoints: {
				320: {
					slidesPerView: 1,
					spaceBetween: 15
				},
				578: {
					slidesPerView: 1,
					spaceBetween: 15
				},
				768: {
					slidesPerView: 1,
					spaceBetween: 15
				},
				992: {
					slidesPerView: 2,
					spaceBetween: 30
				}
			}
		});
	}

	if (document.querySelector('.news-slider')) {
		let newsSlider = new Swiper('.news-slider', {
			slidesPerView: 3,
			spaceBetween: 30,
			loop: true,
			navigation: {
				nextEl: '.main-news .swiper-next',
				prevEl: '.main-news .swiper-prev',
			},
			breakpoints: {
				320: {
					slidesPerView: 1.5,
					spaceBetween: 15
				},
				578: {
					slidesPerView: 2,
					spaceBetween: 15
				},
				768: {
					slidesPerView: 2,
					spaceBetween: 15
				},
				992: {
					slidesPerView: 3,
					spaceBetween: 30
				}
			}
		});
	}

	if (document.querySelector('.detail-slider')) {
		let detailThumb = new Swiper('.detail-thumb-slider', {
			spaceBetween: 15,
			slidesPerView: 4,
			freeMode: true,
			watchSlidesProgress: true,
		});
		let detailSlider = new Swiper('.detail-slider', {
			spaceBetween: 15,
			navigation: {
				nextEl: ".catalog-detail__slider .swiper-next",
				prevEl: ".catalog-detail__slider .swiper-prev",
			},
			thumbs: {
				swiper: detailThumb,
			},
			on: {
				slideChange: function (e) {
					document.querySelector('.swiper-counter__cur').innerHTML = e.realIndex + 1;
				}
			},
		});
	}

	const bpProducts = {
		0: {
			slidesPerView: 1.3,
			spaceBetween: 15
		},
		360: {
			slidesPerView: 1.5,
			spaceBetween: 15
		},
		578: {
			slidesPerView: 2,
			spaceBetween: 15
		},
		768: {
			slidesPerView: 3,
			spaceBetween: 15
		},
		992: {
			slidesPerView: 3,
			spaceBetween: 30
		},
		1200: {
			slidesPerView: 4
		}
	}

	if (document.querySelector('.product-news-slider')) {
		let productNews = new Swiper('.product-news-slider', {
			autoHeight: true,
			slidesPerView: 4,
			spaceBetween: 30,
			loop: true,
			navigation: {
				nextEl: '.product-slider-section .swiper-next',
				prevEl: '.product-slider-section .swiper-prev',
			},
			breakpoints: bpProducts
		});
	}

	if (document.querySelector('.product-similar-slider')) {
		let productSimilar = new Swiper('.product-similar-slider', {
			autoHeight: true,
			slidesPerView: 4,
			spaceBetween: 30,
			loop: true,
			navigation: {
				nextEl: '.similar .swiper-next',
				prevEl: '.similar .swiper-prev',
			},
			breakpoints: bpProducts
		});
	}

	if (document.querySelector('.product-viewed-slider')) {
		let productViewed = new Swiper('.product-viewed-slider', {
			autoHeight: true,
			slidesPerView: 4,
			spaceBetween: 30,
			loop: true,
			navigation: {
				nextEl: '.viewed .swiper-next',
				prevEl: '.viewed .swiper-prev',
			},
			breakpoints: bpProducts
		});
	}

	// Select sort
	const sortNode = document.querySelectorAll('.catalog-sort a');
	const sortOptions = [];
	sortNode.forEach(option => {
		let ar = [];
		ar.push(option.getAttribute('href'));
		ar.push(option.innerHTML);
		sortOptions.push(ar);
	});
	let activeSortOption = document.querySelector('.catalog-sort .active a');
	let targetSortValue = '';
	if (activeSortOption) {
		targetSortValue = activeSortOption.getAttribute('href');
	}

	if (sortOptions.length) {
		ItcCustomSelect.create('.catalog-sort__list', {
			name: '',
			targetValue: targetSortValue,
			options: sortOptions,
			onSelected(select, option) {
				window.location.href = select.value;
			},
		});
	}

	// Select city
	const cityNode = document.querySelectorAll('.jobs-city a');
	const cityOptions = [];
	cityNode.forEach(option => {
		let ar = [];
		ar.push(option.getAttribute('href'));
		ar.push(option.innerHTML);
		cityOptions.push(ar);
	});
	let activeCityOption = document.querySelector('.jobs-city .active a');
	let targetCityValue = '';
	if (activeCityOption) {
		targetCityValue = activeCityOption.getAttribute('href');
	}

	if (cityOptions.length) {
		ItcCustomSelect.create('.jobs-city__list', {
			name: '',
			targetValue: targetCityValue,
			options: cityOptions,
			onSelected(select, option) {
				window.location.href = select.value;
			},
		});
	}

	// Filter start
	const filterBox = document.querySelectorAll('.smartfilter__box');
	filterBox.forEach(box => {
		box.querySelector('.smartfilter__head').addEventListener('click', (e) => {
			e.target.closest('.smartfilter__box').classList.toggle('smartfilter__box--closed');
		});
	});
	// Events for checkbox
	const filterCheckbox = document.querySelectorAll('.js-smartfilter__checkbox');
	filterCheckbox.forEach(item => {
		item.addEventListener('click', (e) => {
			let target = e.target.closest('.smartfilter__item');
			let input = target.querySelector('input[type="checkbox"]');
			if (input) {
				if (!target.classList.contains('smartfilter__item--active')) {
					input.checked = true;
				} else {
					input.checked = false;
				}
				target.classList.toggle('smartfilter__item--active');
			}
		});
	});
	// Events for radio buttons
	const filterRadio = document.querySelectorAll('.js-smartfilter__radio');
	filterRadio.forEach(item => {
		item.addEventListener('click', (e) => {
			let target = e.target.closest('.smartfilter__item');
			let input = target.querySelector('input[type="radio"]');
			if (input) {
				input.checked = true;
				target.closest('.smartfilter__body').querySelectorAll('.smartfilter__item').forEach(i => {
					i.classList.remove('smartfilter__item--active');
				});
				target.classList.add('smartfilter__item--active');
			}
		});
	});

	// Range slider
	if (document.querySelector('.range-slider')) {
		const rangeInput = document.querySelectorAll(".range-input input"),
			priceInput = document.querySelectorAll(".price-input input"),
			range = document.querySelector(".slider .progress");
		let priceGap = 10;
		document.querySelector('.minmax .min').innerHTML = rangeInput[0].min;
		document.querySelector('.minmax .max').innerHTML = rangeInput[0].max;
		priceInput.forEach(input => {
			input.addEventListener("input", e => {
				let minPrice = parseInt(priceInput[0].value),
					maxPrice = parseInt(priceInput[1].value);

				if ((maxPrice - minPrice >= priceGap) && maxPrice <= rangeInput[1].max) {
					if (e.target.className === "input-min") {
						rangeInput[0].value = minPrice;
						range.style.left = ((minPrice / rangeInput[0].max) * 100) + "%";
					} else {
						rangeInput[1].value = maxPrice;
						range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
					}
				}
			});
		});
		rangeInput.forEach(input => {
			input.addEventListener("input", e => {
				let minVal = parseInt(rangeInput[0].value),
					maxVal = parseInt(rangeInput[1].value);
				if ((maxVal - minVal) < priceGap) {
					if (e.target.className === "range-min") {
						rangeInput[0].value = maxVal - priceGap
					} else {
						rangeInput[1].value = minVal + priceGap;
					}
				} else {
					priceInput[0].value = minVal;
					priceInput[1].value = maxVal;
					range.style.left = ((minVal / rangeInput[0].max) * 100) + "%";
					range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
				}
			});
		});
	}

	// Mobile filter
	const openMobFilter = document.querySelector('.btn-mobile-filter');
	const closeMobFilter = document.querySelector('.smartfilter-mobile__cancel');
	const sidebar = document.querySelector('.catalog-section__sidebar');
	if (openMobFilter) {
		openMobFilter.addEventListener('click', (e) => {
			sidebar.classList.add('catalog-section__sidebar--opened');
			document.querySelector('body').classList.add('hidden');
		});
		closeMobFilter.addEventListener('click', (e) => {
			sidebar.classList.remove('catalog-section__sidebar--opened');
			document.querySelector('body').classList.remove('hidden');
		});
	}
	// Filter end

	// Categories
	const categoryBox = document.querySelectorAll('.categories__box');
	categoryBox.forEach(box => {
		box.querySelector('.categories__head-arrow').addEventListener('click', (e) => {
			e.target.closest('.categories__box').classList.toggle('categories__box--opened');
		});
	});

	// Slide info toggle
	const slideInfoItems = document.querySelectorAll('.slide-info__head');
	slideInfoItems.forEach(item => {
		item.addEventListener('click', (e) => {
			let container = e.target.closest('.slide-info__item');
			let body = container.querySelector('.slide-info__body');
			if (container.classList.contains('opened')) {
				container.classList.remove('opened');
				body.style.maxHeight = 0;
			} else {
				container.classList.add('opened');
				body.style.maxHeight = body.scrollHeight + 'px';
			}
		});
	});

	// Multi info
	const infoTabs = document.querySelectorAll('.multi-info__tabs-tab');
	infoTabs.forEach(tab => {
		tab.addEventListener('click', (e) => {
			let target = e.target.closest('.multi-info__tabs-tab');
			let dataTab = target.dataset.tab;
			let parent = target.closest('.multi-info');
			let tabActive = parent.querySelector('.multi-info__tabs-tab--active');
			let contentActive = parent.querySelector('.multi-info__item--opened');
			if (tabActive && contentActive) {
				tabActive.classList.remove('multi-info__tabs-tab--active');
				contentActive.classList.remove('multi-info__item--opened');
			}
			target.classList.add('multi-info__tabs-tab--active');
			parent.querySelector(`.multi-info__item-${dataTab}`).classList.add('multi-info__item--opened');
		});
	});
	const infoMobileTabs = document.querySelectorAll('.multi-info__mobile-tab');
	infoMobileTabs.forEach(tab => {
		tab.addEventListener('click', (e) => {
			let parent = e.target.closest('.multi-info__item');
			e.target.classList.toggle('multi-info__mobile-tab--active');
			parent.querySelector('.multi-info__content').classList.toggle('multi-info__content--opened');
		});
	});

	// Toggle btns when scrolling to footer
	const btns = document.querySelector('.catalog-detail__btns-fixed');
	const footer = document.querySelector('.footer');
	// Define a function to check if the footer is visible
	function isFooterVisible() {
		// Get the height of the footer
		const footerHeight = footer.offsetHeight;
		// Get the distance between the bottom of the viewport and the top of the footer
		const distanceToFooter = document.body.offsetHeight - (window.pageYOffset + window.innerHeight);
		// If the distance to the footer is less than or equal to the height of the footer, it's visible
		return distanceToFooter <= footerHeight;
	}
	// Define a function to toggle the visibility of the block
	function toggleBlockVisibility() {
		// If the footer is visible, hide the block; otherwise, show it
		btns.style.display = isFooterVisible() ? 'none' : 'block';
	}
	// Add an event listener to check the visibility of the footer whenever the window is scrolled
	if (btns) {
		window.addEventListener('scroll', toggleBlockVisibility);
	}

	// Basket
	const basketItems = document.querySelectorAll('.cart__table-item');
	basketItems.forEach(item => {
		let minus = item.querySelector('.js-counter-minus');
		minus.addEventListener('click', (e) => {
			let numberEl = item.querySelector('.js-counter-number');
			let number = parseInt(numberEl.innerHTML);
			if (number > 1) {
				numberEl.innerHTML = number - 1;
			}
		});
		let plus = item.querySelector('.js-counter-plus');
		plus.addEventListener('click', (e) => {
			let numberEl = item.querySelector('.js-counter-number');
			let number = parseInt(numberEl.innerHTML);
			numberEl.innerHTML = number + 1;
		});
	});

	// Person type select
	const personTypeSelectArr = document.querySelectorAll('.person-type__select');
	if (personTypeSelectArr) {
		personTypeSelectArr.forEach(select => {
			new ItcCustomSelect(select);
			select.addEventListener('itc.select.change', (e) => {
				let btn = e.target.querySelector('.itc-select__toggle');
				e.target.closest('.person-type').querySelector('.person-type-field').value = btn.value;
			});
		});
	}

	// City select
	const citySelect = document.querySelector('.city__select');
	if (citySelect) {
		new ItcCustomSelect(citySelect);
		citySelect.addEventListener('itc.select.change', (e) => {
			let btn = e.target.querySelector('.itc-select__toggle');
			e.target.closest('.city').querySelector('.city-field').value = btn.value;
		});
	}

	// Custom checkbox
	const checkboxFields = document.querySelectorAll('.checkbox-field');
	if (checkboxFields) {
		checkboxFields.forEach(checkbox => {
			let box = checkbox.querySelector('.checkbox-field__box');
			let label = checkbox.querySelector('.checkbox-field__label');
			box.addEventListener('click', toggleCheckbox);
			label.addEventListener('click', toggleCheckbox);
		});
		function toggleCheckbox(e) {
			let target = e.target.closest('.checkbox-field');
			target.querySelector('.checkbox-field__box').classList.toggle('checkbox-field__box--active');
			let checkbox = target.querySelector('.checkbox-field__input');
			checkbox.checked = (checkbox.checked) ? false : true;
		}
	}

	// Photoswipe Lightbox
	const portfolioGallery = new PhotoSwipeLightbox({
		gallery: '.portfolio-gallery',
		children: 'a',
		pswpModule: PhotoSwipe
	});
	portfolioGallery.init();

	const zoom = new PhotoSwipeLightbox({
		gallery: '.js-zoom',
		children: 'a',
		pswpModule: PhotoSwipe
	});
	zoom.init();
});


$(function () {

	if (document.querySelector('.js-new-hero-slider')) {
		$('.js-new-hero-slider')
		$('.js-new-hero-slider').each(function () {
			var nhslider = $(this);

			function refereshDigits(sliderThis) {
				nhslider.find('.js-current-slide-number').html((sliderThis.realIndex + 1).toLocaleString('en-US', {
					minimumIntegerDigits: 2,
					useGrouping: false
				}));
				var slides_count = nhslider.find(".swiper-slide:not(.swiper-slide-duplicate)").length;

				nhslider.find('.js-slides-count').html(slides_count.toLocaleString('en-US', {
					minimumIntegerDigits: 2,
					useGrouping: false
				}));
			}

			let partnersSlider = new Swiper($(this)[0], {
				autoHeight: true,
				slidesPerView: 1,
				spaceBetween: 10,
				loop: true,
				navigation: {
					nextEl: nhslider.find('.swiper-button-next')[0],
					prevEl: nhslider.find('.swiper-button-prev')[0],
				},
				speed: 500,
				autoplay: {
					delay: 3000,
				},
				pagination: {
					el: nhslider.find('.swiper-pagination')[0],
				},
				on: {
					slideChange: function () {
						refereshDigits(this);
					},
					afterInit: function () {
						refereshDigits(this);
					},


				}
			});



		});

	}





});



window.addEventListener('DOMContentLoaded', () => {
	let parentItems = document.querySelectorAll('.header__menu-list-item.parent');

	parentItems.forEach(function (item) {
		item.addEventListener('mouseenter', function () {
			let dropdown = this.querySelector('.header__menu-dropdown');
			dropdown.style.display = 'block';
		});

		item.addEventListener('mouseleave', function () {
			let dropdown = this.querySelector('.header__menu-dropdown');
			dropdown.style.display = 'none';
		});
	});

	let mobileParents = document.querySelectorAll('.mobile-parent');
	mobileParents.forEach(function (item) {
		item.addEventListener('click', function () {
			this.classList.toggle('opened');
		});
	});
}
);