var showTooltip = function () {
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

var hideTooltip = function () {
    $('.tooltip').remove();
}

var setHighlight = function (id, color){
    var targetObj = $('#'+id + ',[name='+id+']');
    if(targetObj.length ===0) targetObj = $('iframe:visible').contents().find('#'+id + ',[name='+id+']');
    targetObj.css('background-color', color);
}

var setTooltip = function(id, desc){
    var targetObj = $('#'+id + ',[name='+id+']');
    if(targetObj.length ===0) targetObj = $('iframe:visible').contents().find('#'+id + ',[name='+id+']');
    targetObj
        .attr('data-tooltip', desc)
        .mouseover(showTooltip)
        .mouseout(hideTooltip);
}