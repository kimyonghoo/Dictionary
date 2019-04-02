var loadPage = () => {
    var  pgmNo= getPgmNo();
    if(pgmNo === undefined || pgmNo === '') return false;
    includeCss();
    initExtension(pgmNo);
}

var initExtension = async (pgmNo) => {
    var guides = await ajaxCall('http://localhost:3030/help/search', 'GET', {pgmNo:pgmNo});
    setHelpGuide(guides);
}

var setHelpGuide = (data) => {
    if(data[0].GUIDE.length === 0) return;
    $('body').append('<div class="btn-close-float"><span></span></div>');

    data[0].GUIDE.forEach(element => {
        setTooltip(element.FORM_ID, element.DESCRIPTION);
        $('.btn-close-float').click(function() {
            this.remove();
            removeTooltip(element.FORM_ID);
        });
    });

    $('.btn-close-float').click(function() {
        this.remove();
    });
}

var getPgmNo = () => {
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