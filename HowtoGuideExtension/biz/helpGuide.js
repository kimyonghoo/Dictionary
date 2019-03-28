var loadPage = function(){
    var  pgmNo= getPgmNo();
    if(pgmNo === undefined || pgmNo === '') return false;
    includeCss();
    getHelpGuide(pgmNo);
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

var getHelpGuide = function(curPgmNo){
    ajaxCall({
        url: 'http://localhost:3030/help/search',
        type: 'GET',
        req: {curPgmNo:curPgmNo},
        callBack: setHelpGuide
    });
}

var setHelpGuide = function(data){
    if(data[0].GUIDE.length === 0) return;
    data[0].GUIDE.forEach(element => {
        debugger;
        setTooltip(element.FORM_ID, element.DESCRIPTION);
        setHighlight(element.FORM_ID, 'yellow');
    });
}