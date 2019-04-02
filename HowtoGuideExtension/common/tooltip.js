var showTooltip = () => {
    $('body').append('<span class="tooltip"></span>');
    var el = $(this),
        tooltip = $('.tooltip');
    
    tooltip
        .html(el.attr('data-tooltip').replace(/[\n\r]/g, '<br/>'));

    var iframeOffsetTop = this.ownerDocument !== document ? 96 : 0, // check if element is inside iframe
        pos = el.offset(),
        w = el.outerWidth(),
        newtop = pos.top + el.outerHeight() + iframeOffsetTop,
        newleft = pos.left + (w/2) - (tooltip.outerWidth()/2);

    tooltip
        .css({
            'left': newleft < 0 ? 0 : newleft,
            'top':  newtop
        })
        .show();
}

var hideTooltip = () => {
    $('.tooltip').remove();
}

var setTooltip = (id, desc) => {
    var targetObj = $('#'+id + ',[name='+id+']');
    if(targetObj.length ===0) targetObj = $('iframe:visible').contents().find('#'+id + ',[name='+id+']');
    //targetObj.addClass('help-guide');
    targetObj
        .attr('data-tooltip', desc)
        .mouseover(showTooltip)
        .mouseout(hideTooltip);

    //FRAME 에 있는 요소에 색을 주기위해 임시로 강제적용
    targetObj.css('background-color', 'yellow');
}

var removeTooltip = (id) => {
    var targetObj = $('#'+id + ',[name='+id+']');
    if(targetObj.length ===0) targetObj = $('iframe:visible').contents().find('#'+id + ',[name='+id+']');
    //targetObj.removeClass('help-guide');
    targetObj
        .removeAttr('data-tooltip')
        .unbind('mouseover')
        .unbind('mouseout');

    //FRAME 에 있는 요소에 색을 주기위해 임시로 강제적용
    targetObj.css('background-color', '');
}