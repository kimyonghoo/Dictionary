var loadPage = () => {
    var pgmNo = getPgmNo();
    if(pgmNo === undefined || pgmNo === '') return false;
    includeCss();
    initExtension(pgmNo);
}

var initExtension = async (pgmNo) => {
    var mappingResult = await ajaxCall('http://localhost:3030/mapping/search', 'GET', {pgmNo: pgmNo});
    var dsopResult = await lookUpData(mappingResult);
    initSlide(dsopResult, mappingResult[0].DICTIONARY_TYPE);
}

var lookUpData = (data) => {
    var formIdSet = data[0].FORM_ID;
    var dictionaryType = data[0].DICTIONARY_TYPE;
    var reqParam = {};
    var url = '';

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
            
            url = 'http://localhost:3030/booking/search';
            break;
        case "INV":
            var vvd = getElementValue(formIdSet.VVD);
            reqParam.VVD = vvd;

            url = 'http://localhost:3030/invoice/search';
            break;
        default:
            alert('Please define dictionary type');
            return;
            break;
    }

    return ajaxCall(url, 'GET', reqParam);
}

var setData = (data, dictionaryType) => {
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