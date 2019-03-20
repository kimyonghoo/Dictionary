var loadPage = function(){
    var  pgmNo= getPgmNo();
    if(pgmNo === undefined || pgmNo === '') return false;
    
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
            var polCd = formIdSet.POL_ID !== '' ? getElementValue(formIdSet.POL_ID) : '';
            var podCd = formIdSet.POD_ID !== '' ? getElementValue(formIdSet.POD_ID) : '';
            var porCd = formIdSet.POR_ID !== '' ? getElementValue(formIdSet.POR_ID) : '';
            var delCd = formIdSet.DEL_ID !== '' ? getElementValue(formIdSet.DEL_ID) : '';
        
            if(polCd !== '') reqParam.POL_CD = polCd;
            if(podCd !== '') reqParam.POD_CD = podCd;
            if(porCd !== '') reqParam.POR_CD = porCd;
            if(delCd !== '') reqParam.DEL_CD = delCd;
            
            ajaxCall({
                url: 'http://localhost:3030/booking/search',
                type: 'GET',
                req: reqParam,
                dicType: dictionaryType,
                callBack: initSlide
            }); 
            break;
        case "INV":
            var vvd = formIdSet.VVD !== '' ? getElementValue(formIdSet.VVD) : '';
            if(vvd !== '') reqParam.VVD = vvd;
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
                    dataTag+='<p>' + element.BKG_NO + '</p>';
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