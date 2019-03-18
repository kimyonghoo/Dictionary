var initSlide = function(data){
    var slide = makeSlide();
    slide.find('.footer').find('button').click(function () {
        if (slide.is(':visible')) {
            hideSlide(slide);
        }
    });

    if (slide.is(':hidden')) {
        showSlide(slide, data);
    } else{
        hideSlide(slide);
        showSlide(slide, data);
    }
}

var makeSlide = function(data){
    if($('#side-slide').length === 0) {
        var html = '<div id="side-slide">'
        + '<div class="content"></div>'
        + '<div class="footer">'
        + '<button type="button">Close</button>'
        + '</div>'
        + '</div>';
        $('form').append(html);
    }
    var slide = $('#side-slide');
    return slide;
}

var showSlide = function(slide, data){
    slide.show('slide', { direction: 'right' }, 'swing', function(){
        slide.find('.content').append(setData(data));
    });
}

var hideSlide = function(slide){
    slide.hide('slide', { direction: 'right' }, 'swing', function () {
        slide.find('.data').remove();
    });
}