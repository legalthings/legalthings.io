var userLang;
var vatCountries = [];
var wavesWallet = null;
var ltoRates = {};
var bonusRate = 0;
var paymentOptions = [
  {value: "creditcard", text: "Credit Card"},
  {value: "ideal", text: "iDeal"}
];

var saleDate;
var today;

var currentCollapsedFaq = '';

$(window).load(function () {
  /* only if you want use mcustom scrollbar */
  // $(".sf-step").mCustomScrollbar({
  //   theme: "dark-3",
  //   scrollButtons: {
  //     enable: true
  //   }
  // });
});

function collapseBounty(id) {
	if (currentCollapsedFaq === id) {
		return;
	}
	currentCollapsedFaq = id;
	var collapseBlock = '#' + id + '-section';

	$('.bounty-content').removeClass('visible');

	setTimeout(function () {
		$(collapseBlock).addClass('visible');
	}, 500);

	$('.bounty-category').removeClass('active');
	$('#' + id).addClass('active');
}

function collapseFaq(id) {
  if (currentCollapsedFaq === id) {
    return;
  }
  currentCollapsedFaq = id;
  var collapseBlock = '#' + id + '-section';

  $('.faq-content').removeClass('visible');

  setTimeout(function () {
    $(collapseBlock).addClass('visible');
  }, 500);

  $('.faq-category').removeClass('active');
  $('#' + id).addClass('active');
}

$(document).ready(function () {
  today = new Date();
  var isShowingMore = false;

  redirectUserToLocalSite();
  // getSaleDate();
  bountyWizard();

  var files = [
//    { url: 'http://www.4-traders.com/BLOCKCHAIN-GROUP-CO-LTD-6165838/news/Blockchain-LegalThings-to-digitise-law-on-Blockchain-25681815/', img: '4-traders.png' },
//    { url: 'https://advocatenblad.nl/2017/10/19/legalthings-one-smart-contracts/', img: 'advocatenblad.png' },
	{ url: 'https://fd.nl/morgen/1171136/legaltech-minder-maatpak-meer-confectie', img: 'fd.png' },
    { url: 'https://www.businessinsider.com/legalflings-blockchain-based-app-for-sexual-consent-2018-1?international=true&r=US&IR=T', img: 'business_insider.png' },
    { url: 'https://www.usatoday.com/story/tech/columnist/2018/02/20/sexual-consent-apps-set-rules-intimacy-come-their-own-risks/328635002/', img: 'usa_today.png'},
//    { url: 'https://www.blockchainadvisormag.com/2017/12/16/ethereum-competitor-legalthings-to-digitise-law-on-blockchain-for-the-dutch-district-attorneys-office/', img: 'blockchainadvisor.png'},
//    { url: 'https://nypost.com/2018/01/11/contracts-for-consensual-one-night-stands-theres-an-app-for-that/', img: 'new_york_post.png'},
//    { url: 'https://btcmanager.com/dutch-ministry-justice-commissions-digitizes-law-blockchain/', img: 'btc-manager.png' },
//    { url: 'https://fortune.com/2018/01/16/consent-app-me-too/', img: 'fortune.png' },
//    { url: 'https://headlines.yahoo.co.jp/hl?a=20180121-00010001-binsider-sci', img: 'yahoo_japan.png'},
//    { url: 'https://www.emerce.nl/wire/legalthings-lanceert-succesvolle-token-sale-nederland-nederlandse-ethereumconcurrent-digitaliseert-wet-regelgeving-via-blockchain', img: 'emerce.png'},
//    { url: 'https://www.independent.co.uk/life-style/consent-app-sexual-contracts-legalthings-phone-std-free-guarantee-a8154591.html', img: 'independent.png' },
//    { url: 'https://g1.globo.com/pop-arte/noticia/depois-de-metoo-aplicativo-permite-dar-consentimento-legal-a-sexo.ghtml', img: 'globo.png'},
//    { url: 'http://www.elektroniknet.de/markt-technik/kommunikation/legalthings-digitalisiert-hollaendisches-gesetzgebung-148902.html', img: 'markt-technik.png'},
    { url: 'https://metro.co.uk/2018/01/10/app-creates-legally-binding-contracts-one-night-stands-prove-sex-consensual-7220206/', img: 'metro.png'},
//    { url: 'https://www.nrc.nl/nieuws/2018/02/20/seks-eerst-even-je-handtekening-a1592916', img: 'nrc.png'},
//    { url: 'https://thenextweb.com/apps/2018/01/11/seeking-consent-before-sex-theres-a-blockchain-based-app-for-that', img: 'the_next_web.png'},
	{ url: 'https://www.tahawultech.com/cnme/news/legalthings-digitise-law-blockchain/', img: 'tahawul-tech.png'},
//    { url: 'https://nos.nl/op3/artikel/2211488-nos-op-3-tech-podcast-appcontract-voor-je-seks-hebt.html', img: 'nos.png'},
//    { url: 'https://www.complex.com/life/2018/01/legalfling-app-consensual-sex', img: 'complex.png'},
	{ url: 'https://www.jinse.com/blockchain/116008.html', img: 'jinse.png' },
//    { url: 'https://www.vogue.nl/cultuur/nieuws/artikel/voor-seks-eerst-een-contract-tekenen-deze-nederlandse-app-maakt-het-mogelijk', img: 'vogue.png' },
    { url: 'https://www.artificiallawyer.com/2018/01/10/legal-fling-blockchain-contracts-for-legally-binding-consensual-encounters/', img: 'artificial_lawyer.png' },
    { url: 'http://link.law.com/public/11641586', img: 'law.png' }
  ];

  $('#media-logos').append('<div class="media-slider">');

  for (var i = 0; i < files.length; i++) {
    if (i % 5 === 0) {
      $('#media-logos .media-slider').append('<br/>');
    }

    $('#media-logos .media-slider').append('<a href="' + files[i].url + '" target="_blank"><img style="margin: 16px;max-width: 100px;filter: grayscale(100%)" src="img/media/' + files[i].img + '"></a>');
  }

  var files = [
    { url: 'https://merin.nl/en/', img: 'merin_logo_black.png' },
    { url: 'https://www.dekra.com/en-us/home/', img: 'dekra_logo_2.png' },
    { url: 'https://www.cloud9music.nl/', img: 'cloud9_logo_2.png' },
    { url: 'https://www.ilent.nl/', img: 'government_of_the_netherlands_2.jpg' },
    { url: 'https://www.stenarealty.com', img: 'stena.png' },
    { url: 'https://www.taxtimbre.com', img: 'taxtimbre.png' },
    { url: 'https://www.cemex.com', img: 'cemex.png' },
    { url: 'https://www.generali.com', img: 'generali.png' },
    { url: 'https://www.ovam.be', img: 'ovam.jpg' },
    { url: 'https://www.avr.nl', img: 'avr.jpg' },
    { url: 'https://www.indaver.be/', img: 'indaver.jpg' },
    { url: 'https://www.ah.nl/over-ah', img: 'ah.png' },
    { url: 'https://cms.law', img: 'cms.png' },
    { url: 'https://www.m7re.eu', img: 'mseven.jpg' },
    /*{ url: 'https://houseafrica.io', img: 'houseafrica.jpg' },*/
    /*{ url: 'https://www2.deloitte.com/', img: 'deloitte.png' },*/

  ];

  $('#customer-logos').append('<div class="media-slider">');

  for (var i = 0; i < files.length; i++) {
    if (i % 5 === 0) {
      $('#customer-logos .media-slider').append('<br/>');
    }

    $('#customer-logos .media-slider').append('<a href="' + files[i].url + '" target="_blank"><img style="margin: 14px;max-width: 50px;filter: grayscale(100%)" src="img/customers/' + files[i].img + '"></a>');
  }

	collapseFaq('about-lto');
  collapseBounty('automated-bounties');

	$('.bounty-category').click(function (e) {
		var id = e.target.id;
		collapseBounty(id);
	});

  $('.faq-category').click(function (e) {
    var id = e.target.id;
    collapseFaq(id);
  });

  if ($(".quote").length > 0) {
    quotesAnimation();
  }

  $('#wallet').on('change', function (newValue) {
    validateWavesAddress(newValue.target.value);
  });

  $("#lto-amount").on("keypress blur", function (event) {
    $(this).val($(this).val().replace(/[^0-9\.]/g, ''));
    if ((event.which != 8 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
      event.preventDefault();
    }
  });

  $('#lto-amount').on('input', function (newValue) {
    calculateRate();
  });

  $('#price-currency').on('change', function (newValue) {
    calculateRate();
  });

  $('#toc-agreement').on('click', function (event) {
    if (event.target.checked) {
      $('#pay').removeAttr('disabled');
    } else {
      $('#pay').attr('disabled', 'disabled');
    }
  });

  $('#billing-company').on('change', function (newValue) {
    if (newValue.target.value.length && newValue.target.value.length > 0) {
      changeBillingAddress(true);
    } else {
      changeBillingAddress(false);
    }
  });

  $('#billing-country').on('change', function (newValue) {
    if (newValue.target.value) {
      changeVAT(newValue.target.value, true);
    } else {
      changeVAT(newValue.target.value, false);
    }
  });


  $('#show-more').click(function () {
    if (!isShowingMore) {
      isShowingMore = true;
      $('.show-more').slideDown(500);
      $('#show-more').text('Less team members');
    }
    else {
      isShowingMore = false;
      $('.show-more').slideUp(500);
      $('#show-more').text('More team members');
    }
  });

  // $(window).resize(function () {
  //   windowWidth = $(window).width();
  //   if (windowWidth > 480) {
  //     elemOffset = $(".usecases__wizard").offset().top;
  //   }
  //   else if (windowWidth <= 480) {
  //     elemOffset = $(".usecases__elements").offset().top - 30;
  //   }
  // })

  // $(window, document).click(function () {
  //   if (windowWidth > 480) {
  //     setTimeout(function () {
  //       elemOffset = $(".usecases__wizard").offset().top;
  //     }, 600)
  //   }
  //   else if (windowWidth <= 480) {
  //     setTimeout(function () {
  //       elemOffset = $(".usecases__elements").offset().top - 30;
  //     }, 600)
  //   }
  // })

  // saleStartsWizard();
	// eventForMobileTooltip();

	// usecaseWizard();
  // saleStartsProgressBar();
  // populateExploreBlock();
	salesAccordion();
  manipulatingHeader();
  // loadTokens();
  // wizardInit();
  closePopup();
  scrollToBlock();
  bindingWizardsTabs();
  // initSubscribeMailChimp();
  timelineInit();
  initWalletChoice();
  createWavesWallet();
  handlePayment();
  heroNavHandle();

  //for animation fix after scrolling
  $(window).on("mousewheel", function () {
    $('html,body').stop();
  });
  // bottomCountdownInit(); //TODO: On it if we want bottom countdown work
});
var windowWidth = $(window).width();
//
// if (windowWidth > 480) {
//   elemOffset = $(".usecases__wizard").offset().top;
// }
// else if (windowWidth <= 480) {
//   elemOffset = $(".usecases__elements").offset().top - 30;
// }

function salesAccordion() {
	$(".wizard-descriptions__description").on("click", function (e) {
		e.preventDefault();
		$(this).toggleClass('active');
		$(this).find('.sale-wizard__step').toggleClass("active")
		$(this).find(".wizard-descriptions__content").toggleClass("visible")
	})
}


//function dedicated for bounty program section

function bountyWizard() {
  var activeBlockHeight = $(".bounty-elements__element.active").height();
  var parentBlock = $(".bounty-elements");
  parentBlock.height(activeBlockHeight)
  $(window).resize(function () {
    activeBlockHeight = $(".bounty-elements__element.active").height();
    parentBlock.height(activeBlockHeight)
  })
  $('.bounty-wizard__step').on('click', function (e) {
    e.preventDefault();
    var id = $(this).attr('data-bounty-id');
    var element = $('div[id="' + id + '"]');

    $(".bounty-wizard__step").removeClass("active");
    $(".bounty-elements__element").removeClass("active");

    $(this).addClass("active");
    element.addClass("active");

    var activeBlockHeight = $(".bounty-elements__element.active").height();
    parentBlock.height(activeBlockHeight)

  })

}

//for interaction with progress bar in Sale starts


// Tracking
$(window).resize(function () {
  var CONST_INIT_HEIGHT = $(".wizard-descriptions__description.active").height();
  var windowWidthForUsecase = $(window).width();
});

// for wizard in usecases block
function usecaseWizard() {

  var headerHeight = $("#header").height();
  var height = $(".usecases__element.active").height();
  $(".usecases__elements").css("height", height);

  $(window).resize(function () {
    height = $(".usecases__element.active").height();
    $(".usecases__elements").css("height", height);
  });

  $(".usecases__wizard-step").on("click", function (e) {
    e.preventDefault();

    var id = $(this).attr("data-usecase-step");
    var element = $('div[id="' + id + '"]');

    $(".usecases__wizard-step").removeClass("active");
    $(".usecases__element").removeClass("active");
    $(".usecases__navigation-pointer").removeClass("usecases__navigation-1 usecases__navigation-2 usecases__navigation-3");

    var that = $(this);
    that.addClass("active");

    if (id === "usecase-step-1") {
      $(".usecases__navigation-pointer").addClass("usecases__navigation-1")
    }
    else if (id === "usecase-step-2") {
      $(".usecases__navigation-pointer").addClass("usecases__navigation-2")
    }
    else if (id === "usecase-step-3") {
      $(".usecases__navigation-pointer").addClass("usecases__navigation-3")
    }
    element.addClass("active js-clicked-height");

    height = $(".usecases__element.active").height();
    $(".usecases__elements").height(height);
    $('html, body').animate({
      scrollTop: elemOffset - headerHeight
    }, 1000);
  })
}

// for manual wizard closing
function closeSaleStartsWizardManually() {
  $(".js-wizard-descriptions-close").on("click", function (e) {
    e.preventDefault();

    $(this).addClass("js-was-clicked");
    $(".sale-wizard__step").removeClass("active");
    $(".wizard-descriptions__description").removeClass("active");

    var headerHeight = $("#header").height() + 15;
    var saleWizardOffset = $(".sale-starts__wizard").offset().top;
    if (windowWidth <= 1024) {
      $('html, body').animate({
        scrollTop: saleWizardOffset - headerHeight
      }, 1000);
    }

    // elemOffset -= $(".wizard-descriptions").height();
    $(".sale-wizard__step").removeClass("js-clicked-height");
    $(".wizard-descriptions").css("height", 0);
    $(".sale-wizard__brief").removeClass("hidden");
    $(".sale-progress__bar-element").removeClass("active");

    var steps = $(".sale-wizard__step");
    var INC = 0;
    for (var i = 1; i < steps.length + 1; i++) {
      var name = "sale-wizard-" + i + "";
      var elem = $(".sale-wizard__step[data-wizard-id=" + name + "]");
      elem.css("top", "" + INC + "%");
      INC = INC + 25
    }
  })
}

function saleStartsWizardPosition() {
  var steps = $(".sale-wizard__step");
  var INC = 0;
  for (var i = 1; i < steps.length + 1; i++) {
    var name = "sale-wizard-" + i + "";
    var elem = $(".sale-wizard__step[data-wizard-id=" + name + "]");
    elem.css("top", "" + INC + "%");
    INC = INC + 25
  }
  steps.on('click', function () {
    var that = $(this);
      if (!(that.hasClass('active'))) {
        $(".sale-wizard__brief").addClass("hidden");
        steps.removeClass("floated-top floated-bottom");
        $(this).css("top", 0);
        $(this).addClass("floated-top").prevAll().addClass("floated-top");
        $(this).nextAll().addClass("floated-bottom");
        var height = $(this).height();
        var TOP_INC = 0;
        var BOT_INC = 0;
        var topSteps = $(".sale-wizard__step.floated-top");
        var bottomSteps = $(".sale-wizard__step.floated-bottom");
	      // setTimeout(function() {
	        for (var i = 1; i < topSteps.length + 1; i++) {
		        var name = "sale-wizard-" + i + "";
		        var elem = $(".sale-wizard__step[data-wizard-id=" + name + "]");
		        elem.css("top", "" + TOP_INC + "px");
		        TOP_INC = TOP_INC + height + 40;
	        }
	        for (var t = topSteps.length + bottomSteps.length; t > topSteps.length; t--) {
		        var targ = "sale-wizard-" + t + "";
		        var targElem = $(".sale-wizard__step[data-wizard-id=" + targ + "]");
		        targElem.css('top', 'calc(100% - ' + BOT_INC + 'px');
		        BOT_INC = BOT_INC + height + 40;
	        }
        // }, 500)
      }
  })
}

function saleStartsProgressBar(id) {
	$(".sale-progress__bar-element").removeClass("current-progress");
	var element = $('.sale-progress-' + id + '');
	element.addClass("active current-progress");
	element.nextAll().removeClass("active");
	element.prevAll().addClass("active")
}


// for wizard in sale starts block
function saleStartsWizard() {
  closeSaleStartsWizardManually();


  saleStartsWizardPosition();
	if ($(".wizard-descriptions").length) {
		var blockOffset = $(".wizard-descriptions").offset().top;
	}

	windowWidth = $(window).width()

  $(window).resize(function () {
    windowWidth = $(window).width()
  })
  var initHeightForActive = $(".wizard-descriptions__description.active").height() + 64;
  $(".wizard-descriptions").height(initHeightForActive);

  $(window).resize(function () {
    initPaddingBottom = $(".wizard-descriptions__description.active").height();
    $(".wizard-descriptions").height(initPaddingBottom);
    blockOffset = $(".sale-starts__wizard").offset().top;
  });

  if ($('.sale-wizard__step').hasClass("active")) {
      $(".sale-wizard__brief").addClass("hidden");
  }

  $('.sale-wizard__step').on('click', function (e) {

    var closeButton = $(".js-wizard-descriptions-close");

    var id = $(this).attr('data-wizard-id');

	  var element = Number(id.slice(-1));
    // saleStartsProgressBar(element)

    var element = $('div[id="' + id + '"]');

    $(".sale-wizard__step").removeClass("active");
    $(".wizard-descriptions__description").removeClass("active");

    $(this).addClass("active");
    element.addClass("active");

    setTimeout(function () {
      var heightForPadd = $(".wizard-descriptions__description.active").height() + 64;
      $(".wizard-descriptions").height(heightForPadd)
    }, 100)

    var headerHeight = $("#header").height() + 15;
    var CONST_FOR_WIZARD_OFFSET = $(".sale-starts__wizard ").height() + 55;
    if (windowWidth < 768) {
      $('html, body').animate({
        scrollTop: blockOffset - headerHeight
      }, 1000);
    }
  })
	setTimeout(function () {
		$(".sale-starts__wizard").addClass("visible");
	}, 400)
}

// for bottom countdown
function bottomCountdownInit() {
  $('#bottom_countdown').countdown('2018/04/05').on('update.countdown', function (event) {
    var $this = $(this).html(event.strftime(''
        + '<span>%-w</span>week%!w '
        + '<span>%-d</span>day%!d '
        + '<span>%H</span>hours '
        + '<span>%M</span>min '
        + '<span>%S</span>sec'));
  });
}

function redirectUserToLocalSite() {
  userLang = navigator.language || navigator.userLanguage;
  var wasRedirected = localStorage.getItem('wasRedirectedToLocale');

  var currentUrl = window.location.pathname.split('/');
  var currentPage = currentUrl[currentUrl.length - 1];

  if (currentPage === '' && userLang.indexOf('pt') > -1 && !wasRedirected) {
    localStorage.setItem("wasRedirectedToLocale", true);
    window.location.href = 'br';
  }
}

function changeBillingAddress(required) {
  if (required) {
    $('#billing-address').attr('required', 'required');
    $('#billing-postcode').attr('required', 'required');
    $('#billing-city').attr('required', 'required');
    $('#billing-country').attr('required', 'required');

    $('.address-required-labels').css('display', 'inline-block');
  } else {
    $('#billing-address').removeAttr('required');
    $('#billing-postcode').removeAttr('required');
    $('#billing-city').removeAttr('required');
    $('#billing-country').removeAttr('required');

    $('.address-required-labels').css('display', 'none');
  }
}

function changeVAT(selectedCountry, required) {
  if (vatCountries.indexOf(selectedCountry) > -1) {
    $('#billing-vat-container').css('display', 'block');
  } else {
    $('#billing-vat-container').css('display', 'none');
  }
}


//init for pie chart

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// init add open wallet choice
function initWalletChoice() {
  $("#create-wallet").show();
  $("#enter-wallet").hide();
  $('#generated-address').hide();
  $('#generate-address').show();

  if (wavesWallet) {
    $('#generated-address').show();
    $('#generate-address').hide();
  }

  $("#wallet-choice").change(function () {
    var value = $(this).val();
    if (value === 'yes') {
      showEnterWallet();
    } else {
      showCreateWallet();
    }
  });
}

function showCreateWallet() {

  $("#create-wallet").show();
  $("#enter-wallet").hide();

  if (wavesWallet) {
    $('#generated-address').show();
    $('#generate-address').hide();
  } else {
    $('#generated-address').hide();
    $('#generate-address').show();
  }
}

function showEnterWallet() {
  $("#create-wallet").hide();
  $("#enter-wallet").show();
}

function createWavesWallet() {
  $('#create-waves-wallet').click(function () {
    $.ajax({
      url: waves_server + "/api/wallet",
      success: function (result) {
        wavesWallet = result.address;
        $('#wallet').val(result.address);
        $('#seed').html(result.seed);
        $('#wallet-address').html(result.address);
        $('#download-seed').attr('href', 'data:application/octet-stream;charset=utf-8;base64,' + result.base64).attr("download", "waves-wallet.txt");
        ;
        showCreateWallet();
      }
    });
  });
}

function getVATCountries() {
  if (vatCountries && vatCountries.length > 0) {
    return;
  }

  $.ajax({
    url: waves_server + "/api/countries",
    success: function (result) {
      vatCountries = result;
    }
  });
}

function getSaleDate() {
  $.ajax({
    url: waves_server + "/api/sale",
    success: function (result) {
      saleDate = {
        startDate: new Date(result['start_date']),
        endDate: new Date(result['end_date'])
      };

      $('.count-down').attr('data-end-date', saleDate.endDate);
      initTimer(saleDate.endDate);

      if (today.getTime() > saleDate.startDate.getTime() &&
          today.getTime() < saleDate.endDate.getTime()) {
        enableBuyButton();
      } else {
        enableSubscribeButton();
      }
    },
    error: function () {
      enableSubscribeButton();
    }
  });
}

function enableSubscribeButton() {
  const btnText = userLang.indexOf('pt') > -1 ? 'Se inscrever' : 'Subscribe now';
  $('.lc-primary-action').text(btnText).addClass('js-open-wishlistPopup');

  $('.js-open-wishlistPopup').on('click', function (e) {
    e.preventDefault();
    $('html').addClass('lock');
    $('.popup.js-wishlist-popup').removeClass('popup-hide');
    $('.popup__close').on('click', function (e) {
      e.preventDefault();
      $('html').removeClass('lock');
      $('.popup.js-wishlist-popup').addClass('popup-hide')
    })
  });
}

function enableBuyButton() {
  const btnText = userLang.indexOf('pt') > -1 ? 'Compre tokens LTO' : 'Buy LTO Tokens';
  $('.lc-primary-action').text(btnText).addClass('js-open-wizard');
  $('.count-down-wrap').removeClass('hidden');

  $(".js-open-wizard").on('click', function (e) {
    e.preventDefault();
    $('html').addClass('lock')
    $('.popup-container').removeClass('popup-hide')
    $('.popup-backdrop').removeClass('popup-hide')
    $('.popup').removeClass('popup-hide')
  });
}

function getRates() {
  $('#rates-message').text('Please wait while we fetch the current rates...');
  $('#rates-message').addClass('visible');

  $.ajax({
    url: waves_server + "/api/rates",
    success: function (result) {
      ltoRates = result;

      $.each(ltoRates, function (i, item) {
        $('#price-currency').append($('<option>', {
          value: item.currency,
          text: item.currency
        }));
      });

      $('#rates-message').removeClass('visible');
      $('#rates-message').css('display', 'none');
      $('#price').val('0');
      calculateRate();
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      $('#rates-message').text('An error has occurred while trying to fetch the current rates. Please try again later.');
    }
  });
}

function calculateRate() {
  if (!ltoRates.length) {
    return;
  }

  var selectedCurrency = $('#price-currency').val();
  var ltoAmount = $('#lto-amount').val();

  if (ltoAmount === '') {
    return;
  }

  var currentCurrency = ltoRates.find(r => r.currency === selectedCurrency
)
  ;
  var bonusTokens = Math.ceil(parseFloat(ltoAmount * bonusRate));
  var totalLtos = parseInt(ltoAmount) + parseInt(bonusTokens);

  if (currentCurrency) {
    var decimals = currentCurrency.currency === 'USD' || currentCurrency.currency === 'EUR' || currentCurrency.currency === 'BRL' ? 2 : 6;
    var total = parseFloat(parseInt(ltoAmount) * parseFloat(currentCurrency.rate)).toFixed(decimals);
    $('#price').val(total);
    $('#amount-bonus').html(bonusTokens);
    $('#amount-total').html(totalLtos);
  }

  $('#amount-users').text(Math.floor(ltoAmount / 500));
  $('#amount-contracts').text(Math.floor(ltoAmount / 1000) * 5);
  $('#amount-interactions').text(Math.floor(ltoAmount / 1000) * 250);
  $('#amount-packages').text(Math.min(Math.floor(ltoAmount / 10000), 4));
  $('#amount-nodes').text(ltoAmount > 100000 ? 1 : 0);
}


function handlePayment() {
  $('#pay').click(function () {
    $('#pay').attr('disabled', 'disabled');
    var user = collectUserInfo();
    var organization = convertUserToOrg(user);
    var ref = getParameterByName('ref');
    var amount = $('#lto-amount').val();
    var wallet = $('#wallet').val();
    var currency = $('#price-currency').val();
    var provider = getPaymentProvider($('#payment-choice').val(), currency);
    var price = $('#price').val();

    if (currency == 'BRL') {
      provider = 'creditcard';
    }

    var data = {};
    data.user = user;
    data.organization = organization;
    data.ref = ref;
    data.return_url = 'https://livecontracts.io/thankyou.html';
    data.notify_url = waves_server + '/api/payment/notify';
    data.quantity = parseInt(amount);
    data.wallet = wallet.trim();
    data.currency = currency;
    data.provider = provider;

    var validWallet = checkWalletAddress(wallet, function (err, validWallet) {
      if (!validWallet) {
        $('#error-payment').html('Invalid waves wallet address entered please correct it in previous step');
        $('#error-payment').show();
        return;
      }

      $('#error-payment').hide();


      if (provider === 'creditcard') {
        stripeCheckout(data, price);
      } else if (provider == 'ideal') {
        if (data.currency == "USD" || data.currency == "BRL") {
          data.currency = "EUR";
        }
        startPayment(data);
      } else {
        startPayment(data);
      }
    });
  })
}

function startPayment(data) {
  $('#progress-bar').addClass('visible');

  $.ajax({
    url: waves_server + "/api/payment/start",
    type: "POST",
    data: JSON.stringify(data),
    contentType: "application/json",
    dataType: "json",
    success: function (result) {
      $('#pay').removeAttr('disabled');
      $('#progress-bar').removeClass('visible');

      if (!result.transaction.id) {
        $('#error-payment').html('Failed to complete transaction, please contact us on one of our social channels.');
        $('#error-payment').show();
      }

      if (result.transaction.external_payment_url) {
        window.location.href = result.transaction.external_payment_url;
      } else {
        window.location.href = data.return_url;
      }
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      $('#progress-bar').removeClass('visible');
      $('#error-payment').html('Failed to complete transaction, please contact us on one of our social channels.');
      $('#error-payment').show();
    }
  });
}

function getPaymentProvider(provider, currency) {
  const prov = provider.toLowerCase().trim();
  const cur = currency.toLowerCase().trim();

  if (['usd', 'eur'].indexOf(cur) === -1) {
    return 'crypto';
  }

  return prov;
}

function collectUserInfo() {
  var user = {};
  user.first_name = $('#billing-firstname').val();
  user.last_name = $('#billing-lastname').val();
  user.email = $('#billing-email').val();
  user.company = $('#billing-company').val();
  user.address = $('#billing-address').val();
  user.postcode = $('#billing-postcode').val();
  user.city = $('#billing-city').val();
  user.country = $('#billing-country').val();
  user.vat_number = $('#billing-vat').val();

  return user;
}

function convertUserToOrg(user) {

  var address = {};
  address.street = user.address;
  address.postcode = user.postcode;
  address.city = user.city;
  address.country = user.country;

  var organization = {};
  organization.id = user.email;
  organization.name = user.company == "" ? user.first_name + " " + user.last_name : user.company;
  organization.email = user.email;
  organization.address = address;
  organization.vat_number = user.vat_number;

  return organization;
}

function loadCheckoutInformation() {
  var user = collectUserInfo();

  if (user.company == "") {
    $('#checkout-company').hide();
  } else {
    $('#checkout-company').show();
    $('#checkout-company').html(user.company);
  }

  $('#checkout-name').html(user.first_name + " " + user.last_name);
  $('#checkout-email').html(user.email);
  $('#checkout-address').html(user.address);
  $('#checkout-city').html(user.postcode + ", " + user.city);
  $('#checkout-country').html(user.country);
  $('#checkout-wallet').html($('#wallet').val());

  var tokens = $('#lto-amount').val();
  var bonusTokens = $('#amount-bonus').text();
  var totalTokens = $('#amount-total').text();
  var price = $('#price').val();
  var currency = $('#price-currency').val();

  $('#checkout-tokens').html("<strong>" + tokens + "</strong>");
  $('#checkout-bonus').html("<strong>" + bonusTokens + "</strong>");
  $('#checkout-total-tokens').html("<strong>" + totalTokens + "</strong>");
  $('#checkout-total-price').html("<strong>" + price + " " + currency + "</strong>");

  if (currency === "EUR" || currency === "USD") {
    $('#payment-choice').show();
  } else {
    $('#payment-choice').hide();
  }
}

//function for animating quotes on scroll
//function for animating quotes on scroll
function quotesAnimation() {

  var quote = document.getElementsByClassName('quote');
  quote[0].classList.add('quoteActive');

  for (let i = 0; i < quote.length; i++) {
    window.addEventListener('scroll', function () {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      var parent = $('.top-quotes-block');
      var main = parent.offset().top - (parent.height());

      if (scrollTop <= main) {
        quote[i].classList.remove('quoteActive');
        quote[0].classList.add('quoteActive');
      } else if (scrollTop <= (main + 200)) {
        quote[i].classList.remove('quoteActive');
        quote[1].classList.add('quoteActive');
      } else if (scrollTop <= (main + 400)) {
        quote[i].classList.remove('quoteActive');
        quote[2].classList.add('quoteActive');
      }
    })
  }

}


// animation for quotes

$.fn.extend({
  animateCss: function (animationName, callback) {
    var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    this.addClass('animated ' + animationName).one(animationEnd, function () {
      $(this).removeClass('animated ' + animationName);
      if (callback) {
        callback();
      }
    });
    return this;
  }
});

//function for timeline init and animation

function timelineInit() {
  (function ($) {
    $.fn.timeline = function () {
      var selectors = {
        id: $(this),
        item: $(this).find(".timeline-item"),
        activeClass: "timeline-item--active",
        img: ".timeline__img"
      };
      selectors.item.eq(0).addClass(selectors.activeClass);
      $("#timeline-background").css(
          "background-image",
          "url(" +
          selectors.item
              .first()
              .find(selectors.img)
              .attr("src") +
          ")"
      );

      // var path = selectors.item.first().find(selectors.img).attr("src");
      // $("#timeline-background").attr("src", path);

      // $("#timeline-background").attr(
      //   "src",
      //   "/" +
      //   selectors.item
      //   .first()
      //   .find(selectors.img)
      //   .attr("src"); +
      //   ""
      //   );
      var itemLength = selectors.item.length;
      $(window).scroll(function () {
        var max, min;
        var pos = $(this).scrollTop() + 150;
        selectors.item.each(function (i) {
          min = $(this).offset().top;
          max = $(this).height() + $(this).offset().top;
          var that = $(this);
          if (i == itemLength - 2 && pos > min + $(this).height() / 6) {
            selectors.item.removeClass(selectors.activeClass);
            $("#timeline-background").css(
                "background-image",
                "url(" +
                selectors.item
                    .last()
                    .find(selectors.img)
                    .attr("src") +
                ")"
            );
            // var path = selectors.item.first().find(selectors.img).attr("src");
            // $("#timeline-background").attr("src", path);
            selectors.item.last().addClass(selectors.activeClass);
          } else if (pos <= max && pos >= min) {
            $("#timeline-background").css(
                "background-image",
                "url(" +
                $(this)
                    .find(selectors.img)
                    .attr("src") +
                ")"
            );
            // var path = $(this).find(selectors.img).attr("src");
            // $("#timeline-background").attr("src", path);
            selectors.item.removeClass(selectors.activeClass);
            $(this).addClass(selectors.activeClass);
          }
        });
      });
    };
  })(jQuery);

  $("#timeline-1").timeline();

}


//function for showing tooltips on timeline on mobile

function eventForMobileTooltip() {
  if (window.innerHeight > window.innerWidth) {
    $('.timeline .event').on('click', function () {
      $(this).find('.hover-block').toggleClass('open')
    })
  }
}

//function for same tabs in Wizard on 4 and 5 steps

function bindingWizardsTabs() {

  var bitcoinTab = $('.bitcoin-tab')
  var bitcoinContent = $('.bitcoin-content')

  var ethererumTab = $('.ethererum-tab')
  var ethererumContent = $('.ethererum-content')

  $('.tab-nav li').on('click', function () {
    if ($(this).hasClass('bitcoin-tab')) {
      bitcoinTab.addClass('active')
      bitcoinContent.addClass('active')

      ethererumTab.removeClass('active')
      ethererumContent.removeClass('active')
    }
    if ($(this).hasClass('ethererum-tab')) {
      bitcoinTab.removeClass('active')
      bitcoinContent.removeClass('active')

      ethererumTab.addClass('active')
      ethererumContent.addClass('active')
    }
  })

}

// Global variables leave here, pls

var sfw;
var next_loading = false;
var waves_server = 'https://waves.legalthings.io';

//function for smooth scroll to block

function scrollToBlock() {
  $('.js-scrollToBlock').on('click', function (e) {
    e.preventDefault();
    var blockOffset = $($(this).attr('href')).offset().top;

    $('html, body').animate({
      scrollTop: blockOffset - 96
    }, 2000);
  })

}

//Function that populate blocks in "Explore".

function populateExploreBlock() {
  var explore = [
    {
      "link": "documents/contract-as-automaton.pdf",
      "img": "img/explore/contract-as-automaton.png",
      "title": "Live Contracts — What’s all the fuss about?",
      "intro": "We show that the fundamental legal structure of a well-written financial contract follows a " +
      "statetransition logic that can be formalized mathematically as a finite-state machine (also known as a " +
      "finitestate automaton)."
    },
    {
      "link": "https://medium.com/@rick_42072/live-contracts-whats-all-the-fuss-about-62b167d9a4d4",
      "img": "img/three_common.jpg",
      "title": "Live Contracts — What’s all the fuss about?",
      "intro": "Picture this. A contract or law visualized in such a way that it is understandable for humans and " +
      "computers. Not only the rules that you are agreeing upon in the contract, but also the consequences behind " +
      "those rules. With our solution Live Contracts, we enable equality of rights for all parties involved."
    },
    {
      "link": "documents/livecontracts-at-codex.pdf",
      "img": "img/explore/livecontracts-at-codex.png",
      "title": "Introducing Live Contracts @ Stanford CodeX",
      "intro": "A Live Contract is an agreement that is formalized as a Finite State Machine. LegalThings One runs" +
      " Live Contracts and stores information in a provable, immutable way on a public decentralized storage."
    }
  ];

  $('.populate-block .loading .fa').addClass('spinning')
  var block = $('#blog-grid');
  var count = explore.length;


  $.each(explore, function (key, value) {
    block.append([
      '<div class="isotope-item blog-item" style="position: absolute; left: 0px; top: 0px;">',
      '<div class="blog-media">',
      '<a href="' + value.link + '" target="_blank" class="text-light blog-image">',
      '<img src=' + value.img + ' alt="SEO IMG NAME">' + '<div class="overlay-caption hidden-on-start">',
      '<h6 class="caption-sub portfolio-category subtitle-2"></h6>',
      '<h4 class="caption-name portfolio-name uppercase"></h4>',
      '</a>',
      '</div>',
      '<div class="blog-desc align-center">',
      '<div class="blog-headline">',
      '<h5 class="post-name"><a href="' + value.link + '" target="_blank"><strong>' + value.title + '</strong></a></h5>',
      '</div>',
      '<p>' + value.intro + '</p>',
      '</div>',
      '</div>'
    ].join(''));
    if (key + 1 === count) {
      setTimeout(function () {
        $('.populate-block .loading').addClass('close');
        block.css('opacity', "1");
      }, 3000)
    }
  })
}

//Show/hide header

function manipulatingHeader() {

  var header = $('.hero-nav:not(.hero-nav--mobile)');
  var scrollFromTop = $(document).scrollTop();
  var topBlockHeight = $('#hero').height();
  var new_offset = 1;

  $(".hero-nav__menu-list--home").on("click" , function(e) {
    e.preventDefault();
    window.scrollTo(0, 0)
  })

  if (scrollFromTop > new_offset) {
    header.addClass('custom-visible');
    $(".sticky-bottom").addClass('visible');
  } else {
    header.removeClass('custom-visible');
    $(".sticky-bottom").removeClass('visible');
  }

  $(window).resize(function () {
    topBlockHeight = $('#hero').height();
  });

  $(window).scroll(function () {
    scrollFromTop = $(document).scrollTop();

    if (scrollFromTop > new_offset) {
      header.addClass('custom-visible');
      $(".sticky-bottom").addClass('visible');
    } else {
      header.removeClass('custom-visible');
      $(".sticky-bottom").removeClass('visible');
    }
  })


  function footer()
    {
        clearTimeout($.data(this, 'scrollTimer'));
        $.data(this, 'scrollTimer', setTimeout(function() {
            if ($('.sticky-bottom').is(':hover')) {
            footer();
        }
            else
            {
              $(".sticky-bottom").fadeOut("slow");
            }
    }, 3000));
    footer();
  }
}





//legacy header, commented on 13 June
// function manipulatingHeader() {
//
//   var header = $('#header');
//   var topBlockHeight = $('#hero').height();
//   var new_offset = 100;
//
//   $(window).resize(function () {
//     topBlockHeight = $('#hero').height();
//   });
//   $(window).scroll(function () {
//     var scrollFromTop = $(document).scrollTop();
//
//     if (scrollFromTop > new_offset) {
//       header.addClass('custom-visible');
//       $(".sticky-bottom").addClass('visible');
//     } else {
//       header.removeClass('custom-visible');
//       $(".sticky-bottom").removeClass('visible');
//     }
//   })
// }

/***
 * Function for handling menu activity in hero section
 */

function heroNavHandle() {
  let windowWidth = $(window).width();
  $(window).resize(function () {
    windowWidth = $(window).width();
  });
  if (windowWidth >= 1200) {
    $(".hero-nav__bars").removeClass("active");
		$(".hero-nav.hero-nav--mobile").removeClass("active");
  }
	$(".hero-nav__bars").on("click", function () {
		$(".hero-nav__bars").toggleClass("active");
		$(".hero-nav.hero-nav--mobile").toggleClass("active");
		$("#page-content").toggleClass("moved-by-hero")
	})
}


//loading data about tokens status
// function loadTokens() {
// 	var currentTokens = $('#current-tokens-sold');
// 	var allTokens = $('#all-tokens');
// 	$.ajax({
// 		url: waves_server + "/api/balance",
// 		success: function (result) {
// 			var totalTokens = 100000000;
// 			var presaleLimit = 10000000;
// 			var tokensLeft = result.balance / 100000000;

// 			// var total =
// 			var sold = total - (result.balance / 100000000);
// 			var cap = 10000000;

// 			$('.progress-active').attr('data-perc', (sold / cap) * 100);

// 			currentTokens.html(sold.formatMoney(0, '.', ','));
// 			allTokens.html(cap.formatMoney(0, '.', ','));
// 		}
// 	})
// }


//loading data about tokens status
function loadTokens() {
  var currentTokens = $('.current-tokens-sold');
  var allTokens = $('.progress-end');

  $.ajax({
    url: waves_server + "/api/balance",
    success: function (result) {
      // fetch bonus from backend
      // if (result.phases && result.phases.bonus) {
      //   bonusRate = result.phases.bonus;
      // } else {
      //   $('.bonus-tokens-msg').css('display', 'none');
      // }

      var cap = 10000000;
      var presaleLimit = parseFloat(result.phases.presale.limit / 1000000000, 10);
      var presaleAvailable = parseFloat(result.balance / 100000000, 10);
      var sold = presaleLimit - presaleAvailable;

      $('.progress-active').attr('data-perc', (sold / presaleLimit) * 100);

      currentTokens.html(sold.formatMoney(0, '.', ','));
      allTokens.html(cap.formatMoney(0, '.', ','));
    }
  })
}


//loading data about tokens status
function validateWavesAddress(address) {
  $('#wallet').parsley().removeError('required');

  if (!address || !address.length) {
    return;
  }

  checkWalletAddress((address), function (err, valid) {
    if (!valid) {
      $('#wallet').parsley().addError('required', {message: 'Invalid Waves wallet address', updateClass: true});
    } else {
      $('#wallet').parsley().removeError('required');
    }
  });
}

function checkWalletAddress(address, callback) {
  $.ajax({
    url: waves_server + `/api/wallet/${address}/validate`,
    success: function (result) {
      callback(null, result.valid)
    },
    error: function (req, status, err) {
      callback(err);
    }
  })
}

function disableNextToDownloadSeed() {
  if (!$('.next-btn').hasClass('disabled')) $('.next-btn').addClass('disabled');

  if (!$('.sf-controls span').length) {
    $('.sf-controls').append('<span class="parsley-required span-seed-msg">Please download your seed to continue</span>');
  }

  $('#download-seed').click(function () {
    $('.next-btn').removeClass('disabled');
    $('.sf-controls').find('span').remove();
  });
}


//init of wizard steps
function wizardInit() {
  sfw = $("#wizard").stepFormWizard({
    markPrevSteps: true,
    onPrev: function () {
      if ($("#pay").hasClass('visible')) {
        $("#pay").removeClass('visible');
      }
    },
    onNext: function (i) {
      loadCheckoutInformation();
      return $("#wizard").parsley().validate('block' + i);
    },
    onFinish: function () {
      return $("#wizard").parsley().validate();
    },
    onSlideChanged: function (to, data) {
      $('.next-btn').removeClass('disabled');

      if ($('.sf-controls').find('span').length) $('.sf-controls').find('span').remove();

      // if we transition to token selection step, fetch the rates and start calculation
      if (to === 1) {
        var myOpts = document.getElementById('price-currency').options;

        if (!myOpts.length) {
          getRates();
        }
      }

      if (to === 2) {
        if ($('#wallet-choice').val() !== 'yes') disableNextToDownloadSeed();

        $('#wallet-choice').on('change', function (event) {
          if (event.target.value !== 'yes') {
            disableNextToDownloadSeed();
          } else {
            $('.next-btn').removeClass('disabled');
            $('.sf-controls').find('span').remove();
          }
        });
      }

      if (to === 3) {
        var currency = $('#price-currency').val();
        $('#payment-choice').empty();

        $.each(paymentOptions, function (i, item) {
          $('#payment-choice').append($('<option>', {
            value: item.value,
            text: item.text
          }));
        });

        $("#pay").appendTo(".sf-controls").addClass('visible');

        // if (currency === "USD") $("#payment-unavailable").css('display', 'block');
        // else $("#payment-unavailable").css('display', 'none');
      }
    }
  });

  getVATCountries();

  $('#error-payment').hide();

  $("#faucet-retrieve-btn").on('click', function (e) {
    e.preventDefault();
    var $recipient = $('#faucet-recipient');
    var address = $recipient.val();

    if (!address) {
      return;
    }

    $.ajax({
      type: "POST",
      url: waves_server + "/api/faucet",
      data: JSON.stringify({recipient: address}),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (result) {
        if (!result || !result.id) {
          // something went wrong
          $('#faucet-failed').show();
          $('#faucet-success').hide();
          return;
        }

        $('#faucet-failed').hide();
        $('#faucet-success').show();
        $('#faucet-success-link').attr('href', 'https://wavesexplorer.com/tx/' + result.id);
        $('#faucet-container').hide();
      },
      error: function () {
        $('#faucet-failed').show();
        $('#faucet-success').hide();
      }
    })
  })
}


//function for close popup
function closePopup() {
  $('.popup__close, .sf-btn-finish').on('click', function (e) {
    e.preventDefault();
    $('html').removeClass('lock');
    $('.popup-container').addClass('popup-hide')
    $('.popup-backdrop').addClass('popup-hide')
    $('.popup').addClass('popup-hide')
  })
}

Number.prototype.formatMoney = function (c, d, t) {
  var n = this,
      c = isNaN(c = Math.abs(c))
          ? 2
          : c,
      d = d == undefined
          ? "."
          : d,
      t = t == undefined
          ? ","
          : t,
      s = n < 0
          ? "-"
          : "",
      i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
      j = (j = i.length) > 3
          ? j % 3
          : 0;
  return s + (
      j
          ? i.substr(0, j) + t
          : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (
      c
          ? d + Math.abs(n - i).toFixed(c).slice(2)
          : "");
};

function initSubscribeMailChimp() {
  var $form = null;

  $('.newsletter-form').submit(function (e) {
    e.preventDefault();
    $form = $(this);
  });

  $('.newsletter-form').ajaxChimp({
    callback: function (resp) {
      var $error = $form.find('.newsletter-error');
      var $success = $form.find('.newsletter-success');

      $error.hide();
      $success.hide();

      if (resp.result === 'error') {
        $error.show().html(resp.msg);
        $success.hide();
      } else {
        $error.hide();
        $success.show();
      }
    },
    url: 'https://legalthings.us17.list-manage.com/subscribe/post?u=1508bdb96b4379a9aeb07c6e8&amp;id=6d17a10ae2'
  });
}

function stripeCheckout(data, price) {
  if (!price || price <= 0 || isNaN(price)) {
    return;
  }

  var handler = StripeCheckout.configure({
    name: 'LTO Pre-sale',
    key: 'pk_live_8R8FrtJRBHzJ6Fqet7pK4Fa1',
    image: 'https://s3-eu-west-1.amazonaws.com/livecontracts/img/logo/icon-purple.png',
    description: 'Purchase LTO tokens',
    zipCode: false,
    bitcoin: false,
    allowRememberMe: false,
    amount: price * 100, // in cents
    email: data.user.email,
    currency: data.currency || 'USD'
  });

  handler.open({
    token: function (token) {
      data.user.creditcard = {token: token.id};
      startPayment(data);
    }
  });
}

function initTimer(endDate) {
  var time = $('.count-down');

  if (!time || !time.length) {
    return;
  }

  time.countdown(endDate, function(event) {
    $(this).html(event.strftime('<h4>%D</h4> days <h4>%H</h4> hours <h4>%M</h4> minutes <h4>%S</h4> seconds'));
  });
}

if ($('#checkout-presale').length) {
  document.getElementById('checkout-presale').addEventListener('click', function (e) {
    // Open Checkout with further options:
    handler.open({
      name: 'LTO Pre-sale',
      description: 'Purchase LTO tokens',
      zipCode: false,
      currency: 'usd',

      // this needs to be set dynamically: https://stripe.com/docs/recipes/variable-amount-checkout
      // based on <num_tokens> * $0.25
      amount: 2000,
      bitcoin: false,
      allowRememberMe: false
    });
    e.preventDefault();
  });
}


// Close Checkout on page navigation:
window.addEventListener('popstate', function () {
  handler.close();
});