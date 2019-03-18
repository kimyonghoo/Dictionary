var initSlide = function(data){
    var slide = makeSlide();
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
    slide.find('.footer').find('button').click(function () {
        chrome.runtime.sendMessage({
            "available" : false,
            "newIconPath" : "common/image/change.png",
        });
        hideSlide(slide);
    });

    return slide;
}

var showSlide = function(slide, data){
    chrome.runtime.sendMessage({
        "available" : false,
        "newIconPath" : "common/image/change.png",
    });
    slide.show('slide', { direction: 'right' }, 250, function(){
        slide.find('.content').append(setData(data));
        chrome.runtime.sendMessage({
            "available" : true,
            "newIconPath" : "common/image/book.png",
        });
    });
}

var hideSlide = function(slide){
    slide.hide('slide', { direction: 'right'}, 250, function () {
        slide.find('.data').remove();
        chrome.runtime.sendMessage({
            "available" : true,
            "newIconPath" : "common/image/book.png",
        });
    });
}