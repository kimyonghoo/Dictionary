var loadPage = function(){
    var  pgmNo= getPgmNo();
    if(pgmNo === undefined || pgmNo === '') return false;
    includeCss();
    getElementSetByPgmNo(pgmNo);

    var data1 = `Process
    1.  Select Booking Master Creation Screen.
    2.  Enter Route details and Receive and Delivery terms
    3.  Enter Shipper, Rate source and Commodity detals
    4.  Enter Container Type/Size and volumn details
    5.  Enter estimated Cargo weight details and specify any Special Cargo/Requirements
    6.  Input Sailing details and inquire on Empty Container Pick Up
    7.  Manage Contact details, inquire Svc Mode and input Customer References
    8.  Inquire/add/adjust Customer/Vendor/Internal Remarks
    9.  Save the Booking to assign Booking and B/L number
    10. Check Booking status
    11. Other button explanation`;

    var data2 = `Special Cargo: Tick if applicable. Also break-down
    Container Q'ty per cargo type in the "Rate Q'ty Detail"`;

    $('#tabTabDIV_tab1_0')
        .attr('data-tooltip', data1)
        .mouseover(showTooltip)
        .mouseout(hideTooltip);
    $('iframe:visible').contents().find('#btn_t1Awkward')
        .attr('data-tooltip', data2)
        .mouseover(showTooltip)
        .mouseout(hideTooltip);
}

var getElementSetByPgmNo = function(curPgmNo){
    var reqParam = {
        curPgmNo: curPgmNo,
    };

    ajaxCall({
        url: 'http://localhost:3030/mapping/search',
        type: 'GET',
        req: reqParam,
        callBack: lookUpData
    });
}

var lookUpData = function(data){
    var formIdSet = data[0].FORM_ID;
    var dictionaryType = data[0].DICTIONARY_TYPE;
    var reqParam = {};

    switch (dictionaryType) {
        case "BKG":
            var fCustCntCd = getElementValue(formIdSet.F_CUST_CNT_CD);
            var fCustSeq = getElementValue(formIdSet.F_CUST_SEQ);
            var cCustCntCd = getElementValue(formIdSet.C_CUST_CNT_CD);
            var cCustSeq = getElementValue(formIdSet.C_CUST_SEQ);

            reqParam.CNEE_CD = cCustCntCd.concat(cCustSeq);
            reqParam.FWDR_CD = fCustCntCd.concat(fCustSeq);
            reqParam.POR_CD = getElementValue(formIdSet.BKG_POR_CD);
            reqParam.DEL_CD = getElementValue(formIdSet.BKG_DEL_CD);
            reqParam.TAA_RFA_FLAG = getElementValue(formIdSet.TAA_RFA_FLG);
            reqParam.RFA_NO = getElementValue(formIdSet.RFA_NO);

            ajaxCall({
                url: 'http://localhost:3030/booking/search',
                type: 'GET',
                req: reqParam,
                dicType: dictionaryType,
                callBack: initSlide
            }); 
            break;
        case "INV":
            var vvd = getElementValue(formIdSet.VVD);
            reqParam.VVD = vvd;
            
            ajaxCall({
                url: 'http://localhost:3030/invoice/search',
                type: 'GET',
                req: reqParam,
                dicType: dictionaryType,
                callBack: initSlide
            }); 
            break;
        default:
            alert('Please define dictionary type');
            break;
    }
}

var setData = function(data, dictionaryType){
    var dataTag = '';
    
    if(data.length === 0) {
        dataTag+='<div class="data"><p>There is no search data</p></div>';
    } else {
        dataTag += '<div class="data">';
        switch (dictionaryType) {
            case 'BKG':
                data.forEach(element => {
                    dataTag+='<p>' + element.BL_REMARKS + '</p>';
                });
                break;
            case 'INV':
                data.forEach(element => {
                    dataTag+='<p>' + element.INV_NO + '</p>';
                });
                break;
            default:
                break;
        }
        dataTag += '</div>';
    }
    return dataTag;
}

var getPgmNo = function(){
    switch ($('#curPgmNo').val()) {
        case 'ESM_BKG_0079':
            pgmNo = $('iframe:visible').contents().find('input[name=ui_id]').val();
            break;
        default:
            pgmNo = $('#curPgmNo').val();
            break;
    }
    return pgmNo;
}

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