var loadPage = function(){
    var  pgmNo= getPgmNo();
    if(pgmNo === undefined || pgmNo === '') return false;
    includeCss();
    getElementSetByPgmNo(pgmNo);
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