(function ($) {
    'use strict';
    let $document     = $(document),
        $window       = $(window),
        $window_w     = $(window).width(),
        $overlay_body = $('.overlay-body'),
        $select_elem  = $('select , .categories select'),
        $body         = $('body');


    /*===============
          HEADER STICKY
     =================*/
    $.fn.unsen_sticky_header = function () {
        if ( $(window).width() > 1024 ) {
            $(this).each(function () {
                var $sticky_object   = $(this),
                    $s_object_offset = $('.header_sticky').offset(),
                    $s_object_top    = $s_object_offset.top;
                $(document).on('scroll', function (event) {
                    var sc = $(this).scrollTop();
                    if ( sc > $s_object_top ) {
                        $sticky_object.addClass('sticky-run');
                    } else {
                        $sticky_object.removeClass('sticky-run');
                        $sticky_object.find('.unsen-dropdown').removeClass('open');
                    }
                });
            });
        }
    };


    /* HOVER PRODUCT */
    $('.unsen-tabs .tab-list a').on("click", function (e) {
        e.preventDefault();
        var $this    = $(this),
            $tabID   = $($this.attr('href')),
            $tabItem = $this.closest('.tab-item');
        $tabItem.addClass('active').closest('.tab-list').find('.tab-item').not($tabItem).removeClass('active');
        $tabID.addClass('active').siblings().removeClass('active');

        return false;
    });
    $('.loadmore .button-loadmore').on("click", function (e) {
        e.preventDefault();
        $(this).closest('.unsen-product').find('.product-item.hidden').removeClass('hidden');
        $(this).addClass('hidden');
    });
    $(document).on('scroll', function () {
        if ( $(window).scrollTop() > 666 ) {
            $('.back-to-top').addClass('show');
        } else {
            $('.back-to-top').removeClass('show');
        }
    });

    $(document).on('scroll', function () {
        if ( $(window).scrollTop() > 678 ) {
            $('.footer-mobile').addClass('show');
        } else {
            $('.footer-mobile').removeClass('show');
        }
    });
    $(document).on('click', '.backtotop-action', function (e) {
        $('html, body').animate({scrollTop: 0}, 0);
        e.preventDefault();
    });

    /*=====================
    GET SCROLLBAR WIDTH
    =======================*/
    function unsen_get_scrollbar_width() {
        var $inner = $('<div style="width: 100%; height:200px;">inner</div>'),
            $outer = $('<div style="width:200px;height:150px; position: absolute; top: 0; left: 0; visibility: hidden; overflow:hidden;"></div>').append($inner),
            inner  = $inner[ 0 ],
            outer  = $outer[ 0 ];
        $body.append(outer);
        var width1 = parseFloat(inner.offsetWidth);
        $outer.css('overflow', 'scroll');
        var width2 = parseFloat(outer.clientWidth);
        $outer.remove();
        return (width1 - width2);
    }

    /*===============
        RESIZE MEGA MENU
    =================*/
    function unsen_resize_mega_menu() {
        var window_size = parseFloat($body.innerWidth());
        window_size += unsen_get_scrollbar_width();
        if ( window_size > 1025 ) {
            if ( $('.mega-menu-wapper .main-menu').length > 0 ) {
                var container = $('.mega-menu-wapper');
                if ( container.length ) {
                    var container_width  = 0;
                    container_width      = parseFloat(container.innerWidth());
                    var container_offset = 0;
                    container_offset     = container.offset();
                    setTimeout(function () {
                        $('.main-menu .menu-item-has-children').each(function (index, element) {
                            $(element).children('.mega-menu').css({'width': container_width + 'px'});
                            var sub_menu_width = parseFloat($(element).children('.mega-menu').outerWidth()),
                                item_width     = parseFloat($(element).outerWidth());
                            $(element).children('.mega-menu').css({'left': '-' + (sub_menu_width / 2 - item_width / 2) + 'px'});
                            var container_left  = container_offset.left,
                                container_right = (container_left + container_width),
                                item_left       = $(element).offset().left,
                                overflow_left   = (sub_menu_width / 2 > (item_left - container_left)),
                                overflow_right  = ((sub_menu_width / 2 + item_left) > container_right);

                            if ( overflow_left ) {
                                var left = (item_left - container_left);
                                $(element).children('.mega-menu').css({'left': -left + 'px'});
                            }
                            if ( overflow_right && !overflow_left ) {
                                var left = (item_left - container_left);
                                left     = left - (container_width - sub_menu_width);
                                $(element).children('.mega-menu').css({'left': -left + 'px'});
                            }
                        })
                    }, 100);
                }
            }
        }
    }

    /*===============
            EUQAL HEIGHT
    =================*/
    function better_equal_elems() {
        if ( $(window).width() > 0 ) {
            $('.equal-container').each(function () {
                var $this = $(this);
                if ( $this.find('.equal-elem').length ) {
                    $this.find('.equal-elem').css({
                        'height': 'auto'
                    });
                    var elem_height = 0;
                    $this.find('.equal-elem').each(function () {
                        var this_elem_h = 0;
                        this_elem_h = parseFloat($(this).height());
                        if ( elem_height < this_elem_h ) {
                            elem_height = this_elem_h;
                        }
                    });
                    $this.find('.equal-elem').height(elem_height);
                }
            });
        }
    }


    /*===============
            BANNER FIXED HEIGHT
    =================*/
    function banner_fixed_height() {
        if ( $(window).width() > 0 ) {
            $('.unsen-banner').each(function () {
                var $this = $(this),
                    $b_height = $this.find('.b_height').data('height');
                if ( $this.find('.inner').length ) {
                    $this.find('.b_height').css({
                        'height': $b_height
                    });
                }
            });
        }
    }



    /*===============
        MENU MOBILE
    ================*/
    $.fn.unsenMobileNav = function () {
        let clickToActive = function (_parent) {
            if ( _parent.hasClass("open") ) {
                _parent.removeClass("open").children(".sub-menu").slideUp(200);
            } else {
                _parent.addClass("open").children(".sub-menu").slideDown(200);
            }
        };
        $(this).on('click', '.menu-item-has-children>a', function (e) {
            e.preventDefault();
            e.stopPropagation();
            clickToActive($(this).parent());
        });
        $(this).on('click', '.menu-item-has-children .show-submenu', function (e) {
            e.preventDefault();
            e.stopPropagation();
            clickToActive($(this).parent().parent());
        });
        $(this).on('click', '.mb_nav_tabs>div', function () {
            if ( $(this).hasClass('active') ) return;
            let _this = $(this), menuID = _this.data('id');
            _this.parent().find('.active').removeClass('active');
            _this.addClass('active');
            $('.mb_nav_tab').removeClass('active');
            $(menuID).addClass('active');
        });
    }
    $('#mobile-menu').unsenMobileNav();

    $document.on('click', '.push_side', function (e) {
        var button        = $(this),
            $content_open = $(button.attr('href'));
        $body.find(".overlay-body").addClass('open');
        $body.find($content_open).addClass('content-opened open');
        $body.addClass('overlay-opened');
        return false
    });
    $document.on('click', '.close-overlay, .overlay-body,.mfp-close,.mfp-container,.close-button', function (e) {
        $body.find(".overlay-body").removeClass('open');
        $body.find(".content-opened").removeClass('open');
        $body.removeClass('overlay-opened');
    });

    // Toggle mobile menu
    $document.on('click', '.open-menu', function (e) {
        $body.find(".mobile-menu").addClass('open');
        return false;
    });
    $document.on('click', '.sidebar-button', function (e) {
        $body.find(".sidebar").addClass('open');
        return false;
    });
    $document.on('click', '.close-menu, .overlay-body', function (e) {
        $body.find(".mobile-menu").removeClass('open');
        $body.find(".sidebar").removeClass('open');
    });


    /*===============
        TAB
    =================*/
    $.fn.catTabs = function () {
        $(this).click(function (ev) {
            ev.preventDefault();
            const _this           = $(this),
                  tab             = _this.data('tab'),
                  _se             = _this.closest('.tab-section'),
                  _tabActive      = _se.find('.tab-header .active'),
                  _parent = _se.find('.tab-header .parent-active'),
                  _contentActive  = _se.find('.tabs-container .opened'),
                  _currentContent = $('#' + tab),
                  el              = _currentContent.find('.js_carousel');

            _tabActive.removeClass('active');
            _parent.removeClass('parent-active');
            _this.addClass('active');
            _this.parent().addClass('parent-active');

            _contentActive.removeClass('opened');
            _currentContent.addClass('opened');

            if ( el.length === 0 ) return;
            el.flickity('resize');
        });
    };

    /*===============
        Accordion
    =================*/
    if ( $( '.unsen-accordion' ).length ) {
        $( document ).on( 'click', '.unsen-accordion .item .head > a', function ( e ) {
            e.preventDefault();
            let _this      = $( this ),
                parent     = _this.closest( '.item' ),
                parent_top = _this.closest( '.unsen-accordion' ),
                el         = _this.closest( '.nt_section' ),
                time       = 300,
                time2      = time + 50;

            if ( el.length === 0 ) {
                el = _this.closest( '.accordion-section' )
            }
            parent.addClass( 'opened' )
            if ( parent.hasClass( 'active' ) ) {
                parent.removeClass( 'active' );
                parent.find( '.content' ).slideUp( time );
            } else {
                parent_top.find( '.item' ).removeClass( 'active' );
                parent.addClass( 'active' );
                parent_top.find( '.content' ).slideUp( 150 );
                parent.find( '.content' ).stop( true, true ).slideDown( time );
            }
        } );
    }
    /*===============
        DROPDOWN
    =================*/
    $(document).on('click', function (event) {
        var $target  = $(event.target).closest('.unsen-dropdown'),
            $current = $target.closest('.unsen-parent-toggle'),
            $parent  = $('.unsen-dropdown');

        if ( $target.length ) {
            $parent.not($target).not($current).removeClass('open');
            if ( $(event.target).is('[data-dropdown="unsen-dropdown"]') ||
                $(event.target).closest('[data-dropdown="unsen-dropdown"]').length ) {
                if ( $target.hasClass('overlay') ) {
                    if ( $target.hasClass('open') ) {
                        $('body').removeClass('active-overlay');
                    } else {
                        $('body').addClass('active-overlay');
                    }
                }
                $target.toggleClass('open');
                event.preventDefault();
            }
        } else {
            $('.unsen-dropdown').removeClass('open');
            if ( $target.hasClass('overlay') || !$target.length ) {
                $('body').removeClass('active-overlay');
            }
        }
    });
    /*===============
        PRODUCTS QUANTITY
    =================*/
    $body.on('click', 'button.plus , a.plus , button.minus , a.minus', function (e) {
        e.preventDefault();
        e.stopPropagation();
        const $inputTag = $(this).closest('.quantity').find('.qty_cart_js,.qty_pr_js');
        if ( $inputTag ) {
            let value = $inputTag.val() ? parseInt($inputTag.val(), 10) : 0,
                max   = $inputTag.data('max') || 100,
                min   = $inputTag.data('min') || 0,
                step  = $inputTag.data('step') || 1;
            if ( $(this).hasClass('plus') ) {
                value = value + step <= max ? value + step : max;
            } else {
                value = value - step >= min ? value - step : min;
            }
            $inputTag.val(value).trigger('change');
        }
    });
    /*===============
          CHOSEN SELECT
     =================*/
    if ( $select_elem.length ) {
        $select_elem.chosen();
    }
    /*===============
           PINMAP
      =================*/
    $body.on('click', '[data-opennt]', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var $this           = $(e.currentTarget),
            $data           = $this.data(),
            id              = $data.opennt,
            target          = $(e.target),
            _currentContent = $('#' + id),
            $parent         = $this.closest('.pinmap-inner');
        if ( $parent.hasClass('pin-popup') ) {
            $.magnificPopup.open({
                items: {
                    src: $('.pin-popup .' + id)[ 0 ],
                    type: "inline",
                    tLoading: '<div class="loading-spin dark"></div>'
                },
                tClose: 'Close (Esc)',
                removalDelay: 300,
                closeBtnInside: close
            });
        } else {

            $('.pin-content').removeClass('active');
            $('.pinmap-button').removeClass('currentClick');
            $('.pin-content-popup').removeClass('open');
            $this.addClass('currentClick');
            $this.parent('.pin-content').addClass('active');
            _currentContent.addClass('open');

            $(document).on('click', function (e) {
                if ( !target.closest('.unsen-pinmap .pin-content-popup').length ) {
                    $('.pin-content.active').removeClass('active');
                    $('.pinmap-button.currentClick').removeClass('currentClick');
                    $('.pin-content-popup.open').removeClass('open');
                }
            });
        }
    })
    /*Isotop*/
    $('.blog-isotope').isotope({
        // options
        itemSelector: '.blog-item',
        layoutMode: 'masonry'
    });
    /*===============
           POPUP
      =================*/
    $('.login-button').magnificPopup({
        items: {
            src: $('#login_content')[ 0 ],
            type: 'inline'
        },
        closeBtnInside: true
    });

    $('.quickview-button').magnificPopup({
        items: {
            src: $('.quick-view-content')[ 0 ],
            type: 'inline'
        },
        closeBtnInside: true,
        callbacks: {
            beforeOpen: function () {
                //this.st.mainClass = 'mfp-move-horizontal';
            },
            open: function () {
                //$carousel.flickity('destroy')
                const el = $('.quick-view-content .product-thumbnail'), option = el.attr("data-flickity") || '{}';
                el.flickity('destroy');
                el.flickity(JSON.parse(option));
            },
            close: function () {
                $('#content_quickview').empty();
            }
        },
    });

    $('.quickshop-button').magnificPopup({
        items: {
            src: $('.quick-shop-content')[ 0 ],
            type: 'inline'
        },
        closeBtnInside: true
    });
    /*Shop control*/
    $.fn.unsenShopMode = function () {
        if ( $(this).length ) {
            $body.on('click', '.product-control a:not(.active)', function (e) {
                e.preventDefault();
                let $this           = $(this),
                    column          = $this.data('col'),
                    $container      = $('.container_cat .nt_pr'),
                    $holder         = $('.container_cat .nt_products_holder'),
                    $catView_holder = $('.cat_view,.container_cat .nt_products_holder');

                if ( $(window).width() > 1024 ) {
                    $this.closest('.main-content').find('.list-product-be-change').find('.product-item').siblings().removeClass('list col-3 col-4 col-6 col-12');
                    if ( column == 1 ) {
                        $this.closest('.main-content').find('.list-product-be-change').removeClass('products-type-grid').addClass('products-type-list').find('.product-item').addClass('list col-12');
                    } else if ( column == 2 ) {
                        $this.closest('.main-content').find('.list-product-be-change').removeClass('products-type-list').addClass('products-type-grid').find('.product-item').addClass('col-6');
                    } else if ( column == 3 ) {
                        $this.closest('.main-content').find('.list-product-be-change').removeClass('products-type-list').addClass('products-type-grid').find('.product-item').addClass('col-4');
                    } else {
                        $this.closest('.main-content').find('.list-product-be-change').removeClass('products-type-list').addClass('products-type-grid').find('.product-item').addClass('col-3');
                    }
                    $this.addClass('active').siblings().removeClass('active');
                } else if ( $(window).width() > 767 ) {
                    $this.closest('.main-content').find('.list-product-be-change').find('.product-item').siblings().removeClass('list col-3 col-4 col-6 col-12');
                    if ( column == 1 ) {
                        $this.closest('.main-content').find('.list-product-be-change').removeClass('products-type-grid').addClass('products-type-list').find('.product-item').addClass('list col-12');
                    } else if ( column == 2 ) {
                        $this.closest('.main-content').find('.list-product-be-change').removeClass('products-type-list').addClass('products-type-grid').find('.product-item').addClass('col-6');
                    } else {
                        $this.closest('.main-content').find('.list-product-be-change').removeClass('products-type-list').addClass('products-type-grid').find('.product-item').addClass('col-4');
                    }
                    $this.addClass('active').siblings().removeClass('active');
                } else {
                    $this.closest('.main-content').find('.list-product-be-change').find('.product-item').siblings().removeClass('list col-3 col-4 col-6 col-12');
                    if ( column == 1 ) {
                        $this.closest('.main-content').find('.list-product-be-change').removeClass('products-type-grid').addClass('products-type-list').find('.product-item').addClass('list col-12');
                    } else {
                        $this.closest('.main-content').find('.list-product-be-change').removeClass('products-type-list').addClass('products-type-grid').find('.product-item').addClass('col-6');
                    }
                    $this.addClass('active').siblings().removeClass('active');
                }
                return false;
            });
        }
    };

    //$.fn.slider_range_price = function () {
    //    // Price filter
    //    var lowerSlider = document.querySelector('#lower');
    //    var  upperSlider = document.querySelector('#upper');
    //
    //    document.querySelector('#two').value=upperSlider.value;
    //    document.querySelector('#one').value=lowerSlider.value;
    //
    //    var  lowerVal = parseInt(lowerSlider.value);
    //    var upperVal = parseInt(upperSlider.value);
    //
    //    upperSlider.oninput = function () {
    //        lowerVal = parseInt(lowerSlider.value);
    //        upperVal = parseInt(upperSlider.value);
    //
    //        if (upperVal < lowerVal + 4) {
    //            lowerSlider.value = upperVal - 4;
    //            if (lowerVal == lowerSlider.min) {
    //                upperSlider.value = 4;
    //            }
    //        }
    //        document.querySelector('#two').value=this.value
    //    };
    //
    //    lowerSlider.oninput = function () {
    //        lowerVal = parseInt(lowerSlider.value);
    //        upperVal = parseInt(upperSlider.value);
    //        if (lowerVal > upperVal - 4) {
    //            upperSlider.value = lowerVal + 4;
    //            if (upperVal == upperSlider.max) {
    //                lowerSlider.value = parseInt(upperSlider.max) - 4;
    //            }
    //        }
    //        document.querySelector('#one').value=this.value
    //    };
    //}

    /*Single Thumbnail*/
    $.fn.unsenSingleProductThumbnail = function () {
        if ( $(this).length ) {

            let $p_btns = $('.p_group_btns')

            function initThumbnailsMarkup($galleries, $navContainer, navClass) {
                let markup  = [],
                    e_imgnv = $('.p-nav.ratio_imgtrue').length > 0;

                $galleries.find('.p-item:not(.is_varhide)').each(function () {
                    let $this  = $(this),
                        bgset  = $this.data('bgset'),
                        mdtype = $this.data('mdtype'),
                        mdid   = $this.data('mdid'),
                        ratio  = $this.data('ratio'),
                        style  = '',
                        icon   = 'hide';

                    if ( mdtype === 'video' ) {
                        icon = 'las la-play';
                    } else if ( mdtype === 'external_video' ) {
                        icon = 'lab la-youtube';
                    } else if ( mdtype === 'model' ) {
                        icon = 'las la-cube';
                    }

                    if ( e_imgnv ) {
                        style = ' style="padding-top:' + 1 / ratio * 100 + '%"';
                    }

                    markup.push('<div class="' + navClass + 'col-3 n-item" data-mdid="' + mdid + '" data-mdtype="' + mdtype + '"><span class="nt_bg_lz lazyload" data-bgset="' + bgset + '"' + style + '><img src="' + bgset + '" alt="image"></span></div>');
                });

                $navContainer.empty().append(markup.join(''));
                $navContainer.unsenRefresh_flickity();
                $navContainer.addClass('p-nav-ready');
            }

            $(this).each(function () {
                let $el                   = $(this).find('.p-nav'),
                    $mainGallery          = $(this).find('.p-thumb'),
                    navClass              = ($('.thumb_left').length > 0 || $('.thumb_right').length > 0) ? 'col-lg-12 ' : '',
                    $col_nav              = $('.col_nav'),
                    timer                 = 400,
                    includedModelOrVideos = $mainGallery.find('[data-pr-md-tp-model]').length > 0 || $mainGallery.find('[data-pr-md-tp-video]').length > 0;

                $mainGallery.each(function (index) {
                    initThumbnailsMarkup($(this), $el.length === 1 ? $el : $el.eq(index), navClass);
                });

                if ( includedModelOrVideos ) {
                    $mainGallery.on('select.flickity', function (event, index) {
                        let $selectedSlide = $mainGallery.find('.is-selected'),
                            mediaType      = $selectedSlide.data('mdtype');

                        $('.p-thumb [data-pr-md-tp-video] , .p-thumb [data-pr-md-tp-model]').trigger('mediaHidden');

                        $p_btns.removeClass('nt_hide nt_hide_2');

                        if ( ['video', 'external_video', 'model'].includes(mediaType) ) {
                            if ( mediaType === 'model' ) {
                                $p_btns.addClass('nt_hide_2');
                                $selectedSlide.find('[data-pr-md-tp-model]').trigger('mediaVisible');
                            } else {
                                $p_btns.addClass('nt_hide');
                                $selectedSlide.find('[data-pr-md-tp-video]').trigger('mediaVisible');
                            }
                        }
                    });
                }

                $col_nav.find('.btn_pnav_next, .btn_pnav_prev').off('click').on('click', function (e) {
                    console.log('thumb left click');
                    let $this            = $(this),
                        slider_height    = $el.find('.flickity-slider').height(),
                        navHeight        = $el.height(),
                        navCellHeight    = slider_height / $el.find('.n-item').length,
                        currentScrollTop = $el.scrollTop();
                    if ( ($this.hasClass('btn_pnav_prev') && currentScrollTop <= 0) || ($this.hasClass('btn_pnav_next') && currentScrollTop >= slider_height - navHeight) ) return;
                    let scrollY = ($this.hasClass('btn_pnav_next')) ? currentScrollTop + navCellHeight + 40 : currentScrollTop - navCellHeight - 40;
                    $el.stop().animate({
                        scrollTop: scrollY
                    }, timer);
                });

            });

        }
    };
    setTimeout(() => $('.unsen_product_thumnb_slide').unsenSingleProductThumbnail(), 100);
    $.fn.unsenRefresh_flickity = function () {
        $(this).flickity(JSON.parse($(this).attr("data-flickity") || $(this).attr("data-flickityjs") || '{}'));
        return $(this);
    };

    $.fn.unsenFlickityResponsive = function (bl) {
        if ( typeof ($.fn.flickity) !== 'undefined' ) {
            let $this = $(this);
            if ( bl ) {
                $this.find('.swatch__list_js.lazyloaded').each(function () {
                    $this.flickity('resize')
                });
            }
            $this.find('.swatch__list_js').on('lazyincluded', function (e) {
                $this.flickity('resize')
            });
        }
    }
    /*===============
       ADD TO CART
    =================*/

    $(window).ready(function () {
        $('.unsen-tabs .tab-list .tab-item a').catTabs();
        $('.header_sticky').unsen_sticky_header();
        unsen_resize_mega_menu();
        better_equal_elems();
        banner_fixed_height();
        if ( $.fn.scrollbar ) {
            if ( $('.main-menu .demos-menu').length ) {
                $('.main-menu .demos-menu').scrollbar();
            }
            if ( $('.scroll-content').length ) {
                $('.scroll-content').scrollbar();
            }
        }

        /*ADD TO WISHLIST*/
        $('.product-item .wishlist > a, .group-buttons > .wishlist-button').on('click', function () {
            var button        = $(this);
            var wishlist      = $('.block-wishlist');
            var wishlistTotal = wishlist.find('.count').attr('data-totalitems');
            var newCartTotal  = parseInt(wishlistTotal) + 1;
            var newCartTotal2 = parseInt(wishlistTotal) - 1;
            if ( button.hasClass('added') ) {
                button.removeClass('added');
                wishlist.find('.count').attr('data-totalitems', newCartTotal2);
            } else {
                button.addClass('added');
                wishlist.find('.count').attr('data-totalitems', newCartTotal);
            }
            wishlist.addClass('add-item');
            setTimeout(function () {
                button.removeClass('sendtowishlist');
                wishlist.removeClass('add-item');
            }, 500)
            return false;
        })
        /*ADD TO CART*/
        /*product variable*/
        $('.form-add-to-cart .add-to-cart a').on('click', function () {
            var button       = $(this);
            var cart         = $('.block-minicart');
            var cartTotal    = cart.find('.count').attr('data-totalitems');
            var newCartTotal = parseInt(cartTotal) + 1;
            button.addClass('sendtocart');
            setTimeout(function () {
                button.removeClass('sendtocart');
                cart.addClass('shake add-item').find('.count').attr('data-totalitems', newCartTotal);
                setTimeout(function () {
                    cart.removeClass('shake');
                    cart.removeClass('add-item');
                }, 500)
            }, 0)
            $('#minicart_content').find('#tab-cart .list-products').prepend(`
            <div class="product-item">
                <div class="product-inner">
                    <div class="product-thumbnail"><a href="#">
                        <img src="images/fashion/product2.jpg" alt="image"></a>
                    </div>
                    <div class="product-info">
                        <div class="remove"><a href="#"><span class="unsenicon-close"></span></a></div>
                        <h4 class="product-title"><a href="#">Band-collar Popover Tunic</a></h4>
                         <span class="price">$330.00</span>
                         <div class="variable">
                             <span class="color">Color: red</span>
                             <span class="size">Size: L</span>
                         </div>                                          
                         <a href="#" class="edit-product"><span class="unsenicon-edit"></span></a>
                         <div class="quantity">
                             <span class="label">Qty :</span>
                             <span class="quantity-control">
                                 <a href="#" class="minus">-</a>
                                 <input type="number" class="input-text qty text tc qty_cart_js" step="1" min="0" max="9999" value="1">
                                 <a href="#" class="plus">+</a>
                             </span>
                         </div>
                    </div>
                </div>
            </div>`);
            return false;
        })
        /*product simple*/
        $('.group-buttons .add-to-cart a').on('click', function () {
            var cart          = $('.block-minicart');
            var button        = $(this);
            var cartTotal     = cart.find('.count').attr('data-totalitems');
            var newCartTotal  = parseInt(cartTotal) + 1;
            var product_item  = $(this).parent().parent().parent().parent().parent();
            var product_name  = $(this).parent().parent().parent().parent().children('.product-info').children('.product-title').children('.text').text();
            var product_price = $(this).parent().parent().parent().parent().children('.product-info').children('.price').text();
            var product_thumb = $(this).parent().parent().parent().parent().children('.product-thumbnail').children('.thumb-img').children('img').attr('src');
            button.addClass('sendtocart');
            setTimeout(function () {
                button.removeClass('sendtocart');
                cart.addClass('shake add-item').find('.count').attr('data-totalitems', newCartTotal);
                setTimeout(function () {
                    cart.removeClass('shake');
                    cart.removeClass('add-item');
                }, 500)
            }, 0)
            $('#minicart_content').find('#tab-cart .list-products').prepend(`
                <div class="product-item">
                <div class="product-inner">
                    <div class="product-thumbnail"><a href="#">
                        <img src="${product_thumb}" alt="image"></a>
                    </div>
                    <div class="product-info">
                        <div class="remove"><a href="#"><span class="unsenicon-close"></span></a></div>
                        <h4 class="product-title"><a href="#">${product_name}</a></h4>
                         <span class="price">${product_price}</span>                                         
                         <a href="#" class="edit-product"><span class="unsenicon-edit"></span></a>
                         <div class="quantity">
                             <span class="label">Qty :</span>
                             <span class="quantity-control">
                                 <a href="#" class="minus">-</a>
                                 <input type="number" class="input-text qty text tc qty_cart_js" step="1" min="0" max="9999" value="1">
                                 <a href="#" class="plus">+</a>
                             </span>
                         </div>
                    </div>
                </div>
            </div>
            `);
            return false;
        })
        /*Remove product in minicart*/
        $('.minicart-inner .remove a').on('click', function () {
            var button              = $(this);
            var cart                = $('.block-minicart');
            var cartTotal           = cart.find('.count').attr('data-totalitems');
            var newCartTotal        = parseInt(cartTotal) - 1;
            var product_item        = $(this).parent().parent().parent().parent();
            var parent_product_item = $(this).parent().parent().parent().parent().parent();
            var count_item          = $("#tab-cart .list-products > .product-item:not('hide')").length;
            button.closest('.product-item').remove();
            console.log(count_item);
            cart.addClass('shake add-item').find('.count').attr('data-totalitems', newCartTotal);
            if ( count_item == 1 ) {
                $('.minicart-inner').addClass('empty');
            } else {
                $('.minicart-inner').removeClass('empty');
            }
        })
    });

    $(window).resize(function () {
        $('.unsen-tabs .tab-list .tab-item a').catTabs();
        $('.product-control').unsenShopMode();
        unsen_resize_mega_menu();

    });
    window.addEventListener("load", function load() {
        unsen_resize_mega_menu();
        better_equal_elems();
        banner_fixed_height();
        $('.product-control').unsenShopMode();
        $('.unsen-tabs .tab-list .tab-item a').catTabs();
        /**
         * remove listener, no longer needed
         * */
        window.removeEventListener("load", load, false);
        /**
         * start functions
         * */

    })
})(jQuery);