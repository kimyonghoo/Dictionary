var initSlide = (data, dictionaryType) => {
    var slide = makeSlide();
    if (slide.is(':hidden')) {
        showSlide(slide, data, dictionaryType);
    } else{
        hideSlide(slide);
        showSlide(slide, data, dictionaryType);
    }
}

var makeSlide = (data) => {
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
    slide.find('.footer').find('button').click(() => {
        chrome.runtime.sendMessage({
            "available" : false,
            "newIconPath" : "common/image/book_disable.png",
        });
        hideSlide(slide);
    });

    return slide;
}

var showSlide = (slide, data, dictionaryType) => {
    chrome.runtime.sendMessage({
        "available" : false,
        "newIconPath" : "common/image/book_disable.png",
    });
    slide.show('slide', { direction: 'right' }, 220, () => {
        slide.find('.content').append(setData(data, dictionaryType));
        chrome.runtime.sendMessage({
            "available" : true,
            "newIconPath" : "common/image/book.png",
        });
    });
}

var hideSlide = (slide) => {
    slide.hide('slide', { direction: 'right'}, 220, function () {
        slide.prop("style", "display: none;").find('.data').remove();
        chrome.runtime.sendMessage({
            "available" : true,
            "newIconPath" : "common/image/book.png",
        });
    });
}