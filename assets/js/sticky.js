(function ($) {
    'use strict';

    window.addEventListener("load", function load() {
        /**
         * remove listener, no longer needed
         * */
        window.removeEventListener("load", load, false);
        /**
         *
         * <div class="wrapper-main-content" style="position: relative;">
         *     <div class="wrap-sticky-content">
         *         <div class="sticky-content" data-top="10" data-bottom="10" data-screen="1199">
         *     </div>
         *     <div class="normal-content">
         * </div>
         *
         * @use: $('.sticky-content').unsen_sticky_sidebar();
         * */
        $.fn.unsen_sticky_sidebar = function () {
            var $this = $(this);
            if ( $this.closest('.wrapper-main-content').length ) {
                if ( $this.closest('.sticky-content-wrap').length === 0 ) {
                    $this.wrap('<div class="sticky-content-wrap"></div>');
                }
                $this.on('unsen_sticky_sidebar', function () {
                    $this.each(function () {
                        var $wrap_content    = $(this).closest('.wrapper-main-content'),
                            $wrap_sticky     = $(this).closest('.sticky-content-wrap'),
                            $sidebar_content = $(this);

                        var $StickyScrollTop    = 0,
                            $StickyScrollBottom = 0,
                            $StickyScrollScreen = 767,
                            $lastScrollTop      = 0;


                        if ( $sidebar_content.data('top') !== undefined && $sidebar_content.data('top') !== '' ) {
                            $StickyScrollTop += $sidebar_content.data('top');
                        }
                        if ( $('.scroll-percent').length ) {
                            $StickyScrollTop += $('.scroll-percent').outerHeight();
                        }
                        if ( $('.header-sticky').length ) {
                            $StickyScrollTop += $('.header-sticky').outerHeight();
                        }
                        if ( $sidebar_content.data('bottom') !== undefined && $sidebar_content.data('bottom') !== '' ) {
                            $StickyScrollBottom = $sidebar_content.data('bottom');
                        }
                        if ( $sidebar_content.data('screen') !== undefined && $sidebar_content.data('screen') !== '' ) {
                            $StickyScrollScreen = $sidebar_content.data('screen');
                        }
                        if ( $('body').hasClass('admin-bar') ) {
                            $StickyScrollTop += $('#wpadminbar').outerHeight();
                        }
                        $wrap_sticky.css({
                            'min-height': '1px',
                            'display': 'inline',
                        });
                        $wrap_content.css({
                            'position': 'relative',
                        });
                        $(window).on('scroll unsen_load_more_post', function () {
                            if ( $(window).innerWidth() > $StickyScrollScreen ) {
                                /* SIDEBAR */
                                var _scroll_window       = $(window).scrollTop(),
                                    _height_window       = $(window).height(),
                                    _offset_sidebar      = $sidebar_content.offset(),
                                    _offset_content      = $wrap_content.offset(),
                                    _full_height_content = $wrap_content.height() + _offset_content.top,
                                    _full_height_sidebar = $sidebar_content.outerHeight() + _scroll_window + $StickyScrollTop + $StickyScrollBottom;

                                /* SCROLL DOWN */
                                if ( _scroll_window > $lastScrollTop ) {
                                    if ( _full_height_sidebar >= _full_height_content ) {
                                        $sidebar_content.addClass('block-sticky').css({
                                            top: 'auto',
                                            bottom: $StickyScrollBottom,
                                            position: 'absolute',
                                            width: '',
                                        });
                                    } else if ( _offset_sidebar.top - $StickyScrollTop < _scroll_window ) {
                                        $sidebar_content.addClass('sticky').css({
                                            top: $StickyScrollTop,
                                            position: 'fixed',
                                            bottom: 'auto',
                                            width: $sidebar_content.outerWidth(),
                                        });
                                    }
                                } else {
                                    /* SCROLL UP */
                                    if ( _offset_sidebar.top >= _scroll_window ) {
                                        if ( _offset_content.top - $StickyScrollTop > _scroll_window ) {
                                            $sidebar_content.removeClass('sticky').css({
                                                top: 'auto',
                                                bottom: 'auto',
                                                position: 'inherit',
                                                width: '',
                                            });
                                        } else if ( _offset_sidebar.top - $StickyScrollTop > _scroll_window ) {
                                            $sidebar_content.removeClass('block-sticky').css({
                                                top: $StickyScrollTop,
                                                position: 'fixed',
                                                bottom: 'auto',
                                                width: $sidebar_content.outerWidth(),
                                            });
                                        }
                                    }
                                }
                                $lastScrollTop = _scroll_window;
                            }
                        });
                    });
                }).trigger('unsen_sticky_sidebar');
                $(window).on('resize', function () {
                    if ( $(window).width() > 767 ) {
                        var $wrap_content = $this.closest('.wrapper-main-content'),
                            $wrap_static  = $wrap_content.find('.sticky-static-content');

                        if ( $wrap_static.length ) {
                            var $content_width = $wrap_content.outerWidth(true),
                                $static_width  = $wrap_static.outerWidth(true);

                            $this.css({
                                width: ($content_width - $static_width),
                            });
                        }
                    }
                });
            }
        };

        if ( $('.sticky-content').length ) {
            $('.sticky-content').unsen_sticky_sidebar();
        }
    }, false);

})(window.jQuery);