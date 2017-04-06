(function($) { 
"use strict"; 
/*-----------------------------------------------------------------------------------*/
/*	OWL CAROUSEL
/*-----------------------------------------------------------------------------------*/
$('.carousel-boxed').owlCarousel({
    loop: false,
    margin: 30,
    nav: true,
    navText: ['', ''],
    dots: false,
    responsive: {
        0: {
            items: 1
        },
        768: {
            items: 2

        },
        992: {
            items: 3
        }
    }
});
$('.carousel-boxed2').owlCarousel({
    loop: false,
    margin: 15,
    nav: true,
    navContainer: '.nav-outside',
    navClass: ['btn btn-square nav-outside-prev', 'btn btn-square nav-outside-next'],
    navText: ['<i class="icon-left-open-big"></i>', '<i class="icon-right-open-big"></i>'],
    dots: false,
    responsive: {
        0: {
            items: 1
        },
        768: {
            items: 2

        },
        1024: {
            items: 3
        }
    }
});
$('.carousel-boxed3').owlCarousel({
    loop: false,
    margin: 30,
    nav: true,
    navText: ['', ''],
    dots: false,
    responsive: {
        0: {
            items: 1
        },
        768: {
            items: 2

        },
        992: {
            items: 4
        }
    }
});
$('.clients').owlCarousel({
    autoplay: true,
    autoplayTimeout: 3000,
    loop: true,
    margin: 50,
    nav: false,
    dots: false,
    responsive: {
        0: {
            items: 3
        },
        768: {
            items: 5
        },
        1200: {
            items: 6
        }
    }
});
$('.testimonials3').owlCarousel({
    autoplay: true,
    autoplayTimeout: 5000,
    loop: true,
    margin: 0,
    nav: false,
    dots: false,
    items: 1
});
$('.basic-slider').owlCarousel({
    items: 1,
    nav: true,
    navText: ['', ''],
    dots: true,
    loop: true,
    margin: 0
});
$('.basic-carousel').owlCarousel({
    items: 3,
    nav: true,
    navText: ['', ''],
    dots: false,
    loop: false,
    margin: 0,
    autoWidth: false,
    responsive: {
        0: {
            items: 1
        },
        768: {
            items: 2
        },
        1441: {
            items: 3
        }
    }
});
$('.blog-carousel').owlCarousel({
    items: 5,
    nav: true,
    navText: ['', ''],
    dots: false,
    loop: false,
    margin: 0,
    autoWidth: false,
    responsive: {
        0: {
            items: 1
        },
        550: {
            items: 2
        },
        1026: {
            items: 3
        },
        1681: {
            items: 4
        },
        1921: {
            items: 5
        }
    }
});
})(jQuery); 
/*-----------------------------------------------------------------------------------*/
/*	LOADING
/*-----------------------------------------------------------------------------------*/
$(window).load(function() {
        $(".carousel-wrapper:not(.wow)").css("visibility", "visible");
        $(".circle-progress-wrapper strong").css("visibility", "visible");
        $(".basic-carousel").css("visibility", "visible");
        
        $('#status').fadeOut();
        $('#preloader').delay(350).fadeOut('slow');
        $('body').delay(350).css({
            'overflow': 'visible'
        }); 
        /*-----------------------------------------------------------------------------------*/
		/*	CIRCLE PROGRESS
		/*-----------------------------------------------------------------------------------*/
			var circle1 = new ProgressBar.Circle('.circle.first', {
		        color: '#f5ae56',
		        trailColor: 'rgba(255,255,255,0.1)',
			    strokeWidth: 2,
			    trailWidth: 2,
			    duration: 4500,
			    easing: 'easeInOut',
			    text: {
			        value: '0.4'
			    },
		    step: function(state, bar) {
		        bar.setText((bar.value() * 100).toFixed(0));
		    }
		    });
		
		    circle1.animate(0.4);
			
			var circle2 = new ProgressBar.Circle('.circle.second', {
		        color: '#53cfc2',
		        trailColor: 'rgba(255,255,255,0.1)',
			    strokeWidth: 2,
			    trailWidth: 2,
			    duration: 4500,
			    easing: 'easeInOut',
			    text: {
			        value: '0.8'
			    },
		    step: function(state, bar) {
		        bar.setText((bar.value() * 100).toFixed(0));
		    }
		    });
		
		    circle2.animate(0.8);
		    
		    var circle3 = new ProgressBar.Circle('.circle.third', {
		        color: '#ef6578',
		        trailColor: 'rgba(255,255,255,0.1)',
			    strokeWidth: 2,
			    trailWidth: 2,
			    duration: 4500,
			    easing: 'easeInOut',
			    text: {
			        value: '0.34'
			    },
		    step: function(state, bar) {
		        bar.setText((bar.value() * 100).toFixed(0));
		    }
		    });
		
		    circle3.animate(0.34);
		    
		    var circle4 = new ProgressBar.Circle('.circle.fourth', {
		        color: '#67b7d4',
		        trailColor: 'rgba(255,255,255,0.1)',
			    strokeWidth: 2,
			    trailWidth: 2,
			    duration: 4500,
			    easing: 'easeInOut',
			    text: {
			        value: '0.45'
			    },
		    step: function(state, bar) {
		        bar.setText((bar.value() * 100).toFixed(0));
		    }
		    });
		
		    circle4.animate(0.45);
});
$(document).ready(function() {
	/*-----------------------------------------------------------------------------------*/
    /*	COUNTDOWN
	/*-----------------------------------------------------------------------------------*/
    $(".countdown").TimeCircles({
	            fg_width: 0.015,
	            bg_width: 1,
	            circle_bg_color: "rgba(255,255,255,0.1)",
	            time: {
			        Days: { color: "#f5ae56" },
			        Hours: { color: "#53cfc2" },
			        Minutes: { color: "#ef6578" },
			        Seconds: { color: "#67b7d4" }
    			}
	});	
	$(window).resize(function(){
		$('.countdown').TimeCircles().rebuild();
	});
	
	/*-----------------------------------------------------------------------------------*/
	/* WIDTH CLASS
	/*-----------------------------------------------------------------------------------*/
	assign_bootstrap_mode();
	    $(window).resize(function() {
	        assign_bootstrap_mode();
	});
	function assign_bootstrap_mode() {
        width = $(window).width();
        var mode = '';
        if (width < 768) {
            mode = "mode-xs";
        } else if (width < 992) {
            mode = "mode-sm";
        } else if (width < 1200) {
            mode = "mode-md";
        } else if (width > 1200) {
            mode = "mode-lg";
        }
		$("body").removeClass("mode-xs").removeClass("mode-sm").removeClass("mode-md").removeClass("mode-lg").addClass(mode);
	}
    /*-----------------------------------------------------------------------------------*/
    /*	REVOLUTION
	/*-----------------------------------------------------------------------------------*/
    $('.tp-fullscreen').revolution({
        delay: 9000,
        startwidth: 1170,
        startheight: 750,
        hideThumbs: 200,
        hideArrowsOnMobile: "off",
        fullWidth: "on",
        fullScreen: "on",
        soloArrowLeftHOffset: 0,
        soloArrowRightHOffset: 0,
        fullScreenOffsetContainer: ".mode-xs .navbar"
    });
    $('.tp-fullwidth').revolution({
        delay: 9000,
        startwidth: 1170,
        startheight: 650,
        hideThumbs: 200,
        hideArrowsOnMobile: "off",
        fullWidth: "on",
        fullScreen: "off",
        soloArrowLeftHOffset: 0,
        soloArrowRightHOffset: 0
    });
    $('.tp-banner').revolution({
        delay: 9000,
        startwidth: 1170,
        startheight: 550,
        hideThumbs: 200,
        hideArrowsOnMobile: "off",
        fullWidth: "off",
        fullScreen: "off",
        soloArrowLeftHOffset: 0,
        soloArrowRightHOffset: 0
    });
    /*-----------------------------------------------------------------------------------*/
    /*	MODAL
	/*-----------------------------------------------------------------------------------*/
    $("#contact-info-button").animatedModal({
        modalTarget: 'contact-info',
        animatedIn: 'lightSpeedIn',
        animatedOut: 'bounceOutDown',
        animationDuration: '0.6s',
        color: 'rgba(252, 252, 252, 0.97)'
    });
    /*-----------------------------------------------------------------------------------*/
    /*	STICKY HEADER
	/*-----------------------------------------------------------------------------------*/
    var menu = $('.navbar'),
        pos = menu.offset();
    $(window).scroll(function() {
        if ($(this).scrollTop() > pos.top + menu.height() && menu.hasClass('default') && $(this).scrollTop() > 300) {
            menu.fadeOut('fast', function() {
                $(this).removeClass('default').addClass('fixed').fadeIn('fast');
            });
        } else if ($(this).scrollTop() <= pos.top + 300 && menu.hasClass('fixed')) {
            menu.fadeOut(0, function() {
                $(this).removeClass('fixed').addClass('default').fadeIn(0);
            });
        }
    });
    /*-----------------------------------------------------------------------------------*/
    /*	MENU
	/*-----------------------------------------------------------------------------------*/
    $('.js-activated').dropdownHover({
        instantlyCloseOthers: false,
        delay: 0
    }).dropdown();
    $('.dropdown-menu a, .social .dropdown-menu, .social .dropdown-menu input').click(function(e) {
        e.stopPropagation();
    });
    $('.btn.responsive-menu').on('click', function() {
        $(this).toggleClass('opn');
    });
    $('.navbar .nav li a').on('click', function() {
        $('.navbar .navbar-collapse.in').collapse('hide');
        $('.btn.responsive-menu').removeClass('opn');
    });
    /*-----------------------------------------------------------------------------------*/
    /*	VIDEO
	/*-----------------------------------------------------------------------------------*/
    $('.player').fitVids();
    /*-----------------------------------------------------------------------------------*/
    /*	IMAGE ICON HOVER
	/*-----------------------------------------------------------------------------------*/
    $('.icon-overlay a').prepend('<span class="icn-more"></span>');
    /*-----------------------------------------------------------------------------------*/
    /*	FANCYBOX
	/*-----------------------------------------------------------------------------------*/
    $(".fancybox-media").fancybox({
        arrows: true,
        padding: 0,
        closeBtn: true,
        openEffect: 'fade',
        closeEffect: 'fade',
        prevEffect: 'fade',
        nextEffect: 'fade',
        helpers: {
            media: {},
            overlay: {
                locked: false
            },
            buttons: false,
            thumbs: false,
            /*thumbs: {
                width: 50,
                height: 50
            },*/
            title: {
                type: 'inside'
            }
        },
        beforeLoad: function() {
            var el, id = $(this.element).data('title-id');
            if (id) {
                el = $('#' + id);
                if (el.length) {
                    this.title = el.html();
                }
            }
        }
    });
    /*-----------------------------------------------------------------------------------*/
    /*	TABS
	/*-----------------------------------------------------------------------------------*/
    $('.tabs.tabs-top').easytabs({
        animationSpeed: 300,
        updateHash: false
    });
    $('.tabs.tabs-bottom').easytabs({
        animationSpeed: 300,
        updateHash: false,
        cycle: 5000
    });
    /*-----------------------------------------------------------------------------------*/
    /*	TOGGLE
	/*-----------------------------------------------------------------------------------*/
    $('.panel-group').find('.panel-default:has(".in")').addClass('panel-active');

    $('.panel-group').on('shown.bs.collapse', function(e) {
        $(e.target).closest('.panel-default').addClass(' panel-active');
    }).on('hidden.bs.collapse', function(e) {
        $(e.target).closest('.panel-default').removeClass(' panel-active');
    });
    /*-----------------------------------------------------------------------------------*/
    /*	PARALLAX MOBILE
	/*-----------------------------------------------------------------------------------*/
    if (navigator.userAgent.match(/Android/i) ||
        navigator.userAgent.match(/webOS/i) ||
        navigator.userAgent.match(/iPhone/i) ||
        navigator.userAgent.match(/iPad/i) ||
        navigator.userAgent.match(/iPod/i) ||
        navigator.userAgent.match(/BlackBerry/i)) {
        $('.parallax').addClass('mobile');
    }
    /*-----------------------------------------------------------------------------------*/
    /*	DATA REL
	/*-----------------------------------------------------------------------------------*/
    $('a[data-rel]').each(function() {
        $(this).attr('rel', $(this).data('rel'));
    });
    /*-----------------------------------------------------------------------------------*/
    /*	RETINA
	/*-----------------------------------------------------------------------------------*/
    $('.retina').retinise();
    /*-----------------------------------------------------------------------------------*/
    /*	COMMENT FORM PLACEHOLDERS
	/*-----------------------------------------------------------------------------------*/
    $('.comment-form input[title], .comment-form textarea').each(function() {
        if ($(this).val() === '') {
            $(this).val($(this).attr('title'));
        }

        $(this).focus(function() {
            if ($(this).val() == $(this).attr('title')) {
                $(this).val('').addClass('focused');
            }
        });
        $(this).blur(function() {
            if ($(this).val() === '') {
                $(this).val($(this).attr('title')).removeClass('focused');
            }
        });
    });
    /*-----------------------------------------------------------------------------------*/
    /*	LOCALSCROLL
	/*-----------------------------------------------------------------------------------*/
    $('.navbar, .scroll').localScroll({
        hash: true
    });
    /*-----------------------------------------------------------------------------------*/
	/*	FLICKR
	/*-----------------------------------------------------------------------------------*/
    $('.flickr-feed').dcFlickr({
        limit: 15,
        q: {
            id: '51789731@N07',
            lang: 'en-us',
            format: 'json',
            jsoncallback: '?'
        },
        onLoad: function() {
            $('.owl-flickr').owlCarousel({
                loop: false,
                margin: 10,
                nav: true,
                navText: ['', ''],
                dots: false,
                items: 7,
                responsive: {
                    0: {
                        items: 3
                    },
                    700: {
                        items: 5
                    },
                    1000: {
                        items: 7
                    }
                }
            })
        }
    });
	/*-----------------------------------------------------------------------------------*/
	/*	DRIBBBLE
	/*-----------------------------------------------------------------------------------*/
    // NOTE: Don't use this token, replace it with your own client access token.
    $.jribbble.setToken('109e2a3f94b101835d570ac92e91f69953dc3f1c1d0169faf71079d7ace0633e');

    $.jribbble.users('elemis').shots({
        per_page: 15
    }).then(function(shots) {
        var html = [];

        shots.forEach(function(shot) {
            html.push('<div class="item"><figure>');
            html.push('<img src="' + shot.images.normal + '" ');
            html.push('alt="' + shot.title + '"><a href="' + shot.html_url + '" class="link-out" target="_blank"><i class="icon-link"></i></a></figure></div>');
        });

        $('.shots.thumbs').html(html.join(''));
        $('.owl-dribbble').owlCarousel({
            loop: false,
            margin: 10,
            nav: true,
            navText: ['', ''],
            dots: false,
            items: 4,
            responsive: {
                0: {
                    items: 1
                },
                700: {
                    items: 3
                },
                1000: {
                    items: 4
                }
            }
        })
    });
    /*-----------------------------------------------------------------------------------*/
    /*	TOOLTIP
	/*-----------------------------------------------------------------------------------*/
    if ($("[rel=tooltip]").length) {
        $("[rel=tooltip]").tooltip();
    }
    /*-----------------------------------------------------------------------------------*/
    /*	PRETTIFY
	/*-----------------------------------------------------------------------------------*/
    window.prettyPrint && prettyPrint()
});

$(function() {
    /*-----------------------------------------------------------------------------------*/
    /*	ISOTOPE POPULAR POSTS GRID
	/*-----------------------------------------------------------------------------------*/
    var $gridviewimg = $('.grid-view-img .isotope');
    $gridviewimg.isotope({
        itemSelector: '.post-grid',
        transitionDuration: '0.6s',
        masonry: {
            columnWidth: $gridviewimg.width() / 12
        },
        layoutMode: 'masonry'
    });
    $(window).resize(function() {
        $gridviewimg.isotope({
            masonry: {
                columnWidth: $gridviewimg.width() / 12
            }
        });
    });
    $gridviewimg.imagesLoaded(function() {
        $gridviewimg.isotope('layout');
    });
    /*-----------------------------------------------------------------------------------*/
    /*	ISOTOPE PORTFOLIO GRID
	/*-----------------------------------------------------------------------------------*/
    var $portfoliogrid = $('.portfolio-grid .isotope');
    $portfoliogrid.isotope({
        itemSelector: '.item',
        transitionDuration: '0.7s',
        masonry: {
            columnWidth: $portfoliogrid.width() / 12
        },
        layoutMode: 'masonry'
    });
    $(window).resize(function() {
        $portfoliogrid.isotope({
            masonry: {
                columnWidth: $portfoliogrid.width() / 12
            }
        });
    });
    $('.portfolio-grid .isotope-filter').on('click', '.button', function() {
        var filterValue = $(this).attr('data-filter');
        $portfoliogrid.isotope({
            filter: filterValue
        });
    });
    $('.portfolio-grid .button-group').each(function(i, buttonGroup) {
        var $buttonGroup = $(buttonGroup);
        $buttonGroup.on('click', '.button', function() {
            $buttonGroup.find('.is-checked').removeClass('is-checked');
            $(this).addClass('is-checked');
        });
    });
    $portfoliogrid.imagesLoaded(function() {
        $portfoliogrid.isotope('layout');
    });
    jQuery('.btn-load-more').click(function() {
        var url = $(this).attr('href'),
            $this = $(this);

        $this.text('Loading...').addClass('btn-disabled');
        jQuery.get(url, function(data) {
            var $data = jQuery(data).find('.portfolio-grid .isotope .item');
            imagesLoaded($data, function() {
                jQuery('.portfolio-grid .isotope').append($data).isotope('appended', $data);

                $this.remove();
                setTimeout(function() {
                    jQuery('.portfolio-grid .isotope').isotope('layout');
                }, 600);
            });
        });
        return false;
    });
    /*-----------------------------------------------------------------------------------*/
    /*	ISOTOPE LIST VIEW BLOG
	/*-----------------------------------------------------------------------------------*/
    var $listview = $('.list-view .isotope');
    $listview.isotope({
        itemSelector: '.post',
        transitionDuration: '0.6s',
        masonry: {
            columnWidth: '.col-md-6'
        },
        layoutMode: 'masonry'
    });
    $(window).resize(function() {
        $listview.isotope({
            masonry: {
                columnWidth: '.col-md-6'
            }
        });
    });
    $listview.imagesLoaded(function() {
        $listview.isotope('layout');
    });
    /*-----------------------------------------------------------------------------------*/
    /*	ISOTOPE GRID VIEW COL3
	/*-----------------------------------------------------------------------------------*/
    var $gridviewcol3 = $('.grid-view.col3 .isotope');
    $gridviewcol3.isotope({
        itemSelector: '.grid-view-post',
        transitionDuration: '0.6s',
        masonry: {
            columnWidth: '.col-sm-6.col-md-4'
        },
        layoutMode: 'masonry'
    });
    $(window).resize(function() {
        $gridviewcol3.isotope({
            masonry: {
                columnWidth: '.col-sm-6.col-md-4'
            }
        });
    });
    $gridviewcol3.imagesLoaded(function() {
        $gridviewcol3.isotope('layout');
    });
    /*-----------------------------------------------------------------------------------*/
    /*	ISOTOPE GRID VIEW COL2
	/*-----------------------------------------------------------------------------------*/
    var $gridviewcol2 = $('.grid-view.col2 .isotope');
    $gridviewcol2.isotope({
        itemSelector: '.grid-view-post',
        transitionDuration: '0.6s',
        masonry: {
            columnWidth: '.col-md-6.col-sm-12'
        },
        layoutMode: 'masonry'
    });
    $(window).resize(function() {
        $gridviewcol2.isotope({
            masonry: {
                columnWidth: '.col-md-6.col-sm-12'
            }
        });
    });
    $gridviewcol2.imagesLoaded(function() {
        $gridviewcol2.isotope('layout');
    });    
    /*-----------------------------------------------------------------------------------*/
	/*	SCROLL NAVIGATION HIGHLIGHT
	/*-----------------------------------------------------------------------------------*/
    headerWrapper = parseInt($('.navbar').height(), 10);

    var header_height = $('.navbar').height();
    var shrinked_header_height = 68;

    $('.onepage section').css('padding-top', shrinked_header_height + 'px');
    $('.onepage section').css('margin-top', -(shrinked_header_height) + 'px');
    $('.onepage section:first-of-type').css('padding-top', header_height + 'px');
    $('.onepage section:first-of-type').css('margin-top', -(header_height) + 'px');

    offsetTolerance = -(header_height);
    //Detecting user's scroll
    $(window).scroll(function() {
        //Check scroll position
        scrollPosition = parseInt($(this).scrollTop(), 10);
        //Move trough each menu and check its position with scroll position then add current class
        $('.onepage .navbar ul a').each(function() {
            thisHref = $(this).attr('href');
            thisTruePosition = parseInt($(thisHref).offset().top, 10);
            thisPosition = thisTruePosition - headerWrapper - offsetTolerance;
            if (scrollPosition >= thisPosition) {
                $('.current').removeClass('current');
                $('.navbar ul a[href=' + thisHref + ']').parent('li').addClass('current');
            }
        });
        //If we're at the bottom of the page, move pointer to the last section
        bottomPage = parseInt($(document).height(), 10) - parseInt($(window).height(), 10);
        if (scrollPosition == bottomPage || scrollPosition >= bottomPage) {
            $('.current').removeClass('current');
            $('.onepage .navbar ul a:last').parent('li').addClass('current');
        }
    });
});
/*-----------------------------------------------------------------------------------*/
/*	INSTAGRAM
/*-----------------------------------------------------------------------------------*/
var instagramFeed = new Instafeed({
    get: 'user',
    userId: 1215763826,
    accessToken: '1215763826.f1627ea.dad6ca96bd7642519b573d52c3ef467f',
    resolution: 'low_resolution',
    template: '<div class="item"><figure><img src="{{image}}" /><a href="{{link}}" class="link-out" target="_blank"><i class="icon-link"></i></a></figure></div>',
    after: function() {
        $('#instafeed').owlCarousel({
            loop: false,
            margin: 10,
            nav: true,
            navText: ['', ''],
            dots: false,
            responsive: {
                0: {
                    items: 2
                },
                768: {
                    items: 4
                },
                1000: {
                    items: 5
                }
            }
        })
    }
});
$('#instafeed').each(function() {
    instagramFeed.run();
});
/*-----------------------------------------------------------------------------------*/
/*	FORM
/*-----------------------------------------------------------------------------------*/
document.addEventListener("DOMContentLoaded", function() {
    var myForm;
    myForm = new VanillaForm(document.querySelector("form.vanilla"));
    var myForm2;
    myForm2 = new VanillaForm(document.querySelector("form.vanilla-modal"));
});
/*-----------------------------------------------------------------------------------*/
/*	WOW ANIMATION
/*-----------------------------------------------------------------------------------*/
new WOW().init();