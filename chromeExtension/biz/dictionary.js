var loadPage = function(){
    lookUpDictionary($('#curPgmNo').val());
}

var lookUpDictionary = function(curPgmNo){
    if(curPgmNo === undefined) {
        return;
    }
    var reqParam = {
        curPgmNo: curPgmNo,
    };

    ajaxCall({
        url: "http://localhost:3030/mapping/search",
        type: 'GET',
        req: reqParam,
        callBack: getBookingNumber
    });
}

var getBookingNumber = function(elementSet){
    var formIdSet = elementSet[0];
    var reqParam = {};

    var polCd = formIdSet.POL_ID !== '' ? getFormValue(formIdSet.POL_ID) : "";
    var podCd = formIdSet.POD_ID !== '' ? getFormValue(formIdSet.POD_ID) : "";
    var porCd = formIdSet.POR_ID !== '' ? getFormValue(formIdSet.POR_ID) : "";
    var delCd = formIdSet.DEL_ID !== '' ? getFormValue(formIdSet.DEL_ID) : "";

    if(polCd !== '') reqParam.POL_CD = polCd;
    if(podCd !== '') reqParam.POD_CD = podCd;
    if(porCd !== '') reqParam.POR_CD = porCd;
    if(delCd !== '') reqParam.DEL_CD = delCd;
    
    ajaxCall({
        url: "http://localhost:3030/booking/search",
        type: 'GET',
        req: reqParam,
        callBack: initSlide
    }); 
}

var setData = function(data){
    var dataTag = '';
    if(data.length === 0) {
        dataTag+='<div class="data"><p>There is no search data</p></div>';
    } else {
        dataTag += '<div class="data">';
        data.forEach(element => {
            dataTag+='<p>' + element.BKG_NO + '</p>';
        });
        dataTag += '</div>';
    }
    return dataTag;
}

var getFormValue = function (id){
    var value = '';
    
    if($('#'+id).length > 0){
        value = $('#'+id).val();
    } else{
        value = $('iframe:visible').contents().find('input[name='+id+']').val();
    }
    return value;
}
/*
var getReqParams = function(elementSet){
    var reqParams = {};

    for(key in elementSet){
        var reqParam = elementSet[key] !== '' ? getFormValue(elementSet[key]) : "";
        if(reqParam !== '') reqParams[key] = reqParam;
    }
    return reqParams;
}*/