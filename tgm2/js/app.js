jQuery.noConflict();
jQuery(document).foundation();
jQuery(document).ready(function(jQuery){
    "use strict";
    //login register click
    jQuery(".loginReg").on("click", function(e){
        e.preventDefault();
        jQuery(this).next().slideToggle();
        jQuery(this).toggleClass("active");
    });

    jQuery('.register-form form').bind('forminvalid.zf.abide', function() {
        $(this).find('[data-abide-error]').html('<p><i class="fa fa-exclamation-triangle"></i> There are some errors in your form.</p>');
    });

    //search bar
    jQuery(".search").on("click", function(){
        if(jQuery(this).children().hasClass("fa-search")){
            jQuery(this).children().removeClass("fa-search");
            jQuery(this).children().addClass("fa-times");
        }else{
            jQuery(this).children().removeClass("fa-times");
            jQuery(this).children().addClass("fa-search");
        }
        jQuery(this).toggleClass("search-active");
        jQuery("#search-bar").slideToggle().find('[name=q]').focus();

    });
    jQuery(".top-button").on("click", ".dropdown", function(){
        var dropdown_menu = jQuery(this).find(".dropdown-menu");
        if(dropdown_menu.length) {
            dropdown_menu.toggle();
        }

    });

    //back to top
    var backtotop = '#back-to-top';
    if (jQuery(backtotop).length) {
        var scrollTrigger = 100, // px
            backToTop = function () {
                var scrollTop = jQuery(window).scrollTop();
                if (scrollTop > scrollTrigger) {
                    jQuery(backtotop).addClass('show');
                } else {
                    jQuery(backtotop).removeClass('show');
                }
            };
        backToTop();
        jQuery(window).on('scroll', function () {
            backToTop();
        });
        jQuery('#back-to-top').on('click', function (e) {
            e.preventDefault();
            jQuery('html,body').animate({
                scrollTop: 0
            }, 700);
        });
    }

    //show more and less
    jQuery('.showmore_one').showMore({
        speedDown: 300,
        speedUp: 300,
        height: '165px',
        showText: 'Show more',
        hideText: 'Show less'
    });

    jQuery(".reply").each(function(){
        if(jQuery(this).parent().next().length > 0){
            jQuery(this).html('Hide replies <i class="fa fa-angle-up"></i>');
        }
    });
    //comments reply hide show
    jQuery(".reply").on('click', function(){
       if(jQuery(this).parent().next().length > 0){
           jQuery(this).parent().nextAll().slideToggle();
           //jQuery(this).html(jQuery(this).text() === 'Hide replies' ? 'Show replies' : 'Hide replies');
           if(jQuery(this).hasClass('hide-reply')){
               jQuery(this).removeClass('hide-reply');
               jQuery(this).html('show replies <i class="fa fa-angle-down"></i>');
           }else {
               jQuery(this).addClass('hide-reply');
               jQuery(this).html('Hide replies <i class="fa fa-angle-up"></i>');
           }
       }
    });


    //vertical thumb slider
    var thumb = jQuery('.thumb-slider .thumbs').find('.ver-thumbnail');
    jQuery(thumb).on('click', function(){
        var id = jQuery(this).attr('id');
        //alert(id);
        jQuery('.image').eq(0).show();
        jQuery('.image').hide();
        jQuery('.'+id).fadeIn();
    });
    var $par = jQuery('.thumb-slider .thumbs .thumbnails').scrollTop(0);
    jQuery('.thumb-slider .thumbs a').click(function( e ) {
        e.preventDefault();                      // Prevent defautl Anchors behavior
        var n = jQuery(this).hasClass("down") ? "+=200" : "-=200"; // Direction
        $par.animate({scrollTop: n});
    });

    //tab panel
    jQuery('[data-tab]').on('click', function (e) {
        jQuery(this).addClass('active').siblings('[data-tab]').removeClass('active');
        jQuery(this).siblings('[data-content=' + jQuery(this).data('tab') + ']').addClass('active').siblings('[data-content]').removeClass('active');
        e.preventDefault();
    });

    $(window).resize(function() {
        $('.reveal.fill-height:visible').each(function(i, item) {
            var modal_height = $(item).height();
            var height = modal_height;
            if ($(item).find(' > .actions').length > 0) {
                height -= $(item).find(' > .actions').outerHeight();
            }
            $(item).find(' > .content').height(height - $(item).find(' > h1.title').outerHeight() - 20);
        });
    }).trigger('resize');

    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
        $('.post-thumb').hover(function() {
            var videoEl, videoUrl, videoPoster;
            if (videoUrl = $(this).data('video')) {
                videoPoster = $(this).data('poster');
                videoEl = $('<video />').css({'height': '100%', 'width':'100%'}).attr('poster', videoPoster).attr('src', videoUrl);
                $(this).find('.hover-posts').html('').append(videoEl);
		videoEl[0].play();
            }
        }, function() {
            if ($(this).data('video')) {
                $(this).find('.hover-posts').html('');
            }
        });
    }
    

});