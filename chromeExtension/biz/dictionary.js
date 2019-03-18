var loadPage = function(){
    lookUpDictionary($('#curPgmNo').val());
}

var lookUpDictionary = function(curPgmNo){
    if(curPgmNo === undefined) return;
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

var getBookingNumber = function(data){
    var formIdSet = data[0];
    var reqParam = {};

    var polCd = formIdSet.POL_ID !== '' ? $('#'+formIdSet.POL_ID).val() : "";
    var podCd = formIdSet.POD_ID !== '' ? $('#'+formIdSet.POD_ID).val() : "";
    var porCd = formIdSet.POR_ID !== '' ? $('#'+formIdSet.POR_ID).val() : "";
    var delCd = formIdSet.DEL_ID !== '' ? $('#'+formIdSet.DEL_ID).val() : "";

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