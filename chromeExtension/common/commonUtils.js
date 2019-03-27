var ajaxCall = function(ajaxObj){
    $.ajax({
        url: ajaxObj.url,
        type: ajaxObj.type,
        data: ajaxObj.req,
        success:function(data){
            ajaxObj.callBack(data, ajaxObj.dicType);
        },
        error:function(jqXHR, textStatus, errorThrown){
            alert("[ERROR] \n" + textStatus + " : " + errorThrown);
        }
    }); 
}

var getElementValue = function(id){
    var targetObj = null;
    if($('.opus_design_tab').length > 0){
        targetObj = $('iframe:visible').contents().find('#'+id + ',[name='+id+']');
    } else {
        targetObj = $('#'+id + ',[name='+id+']');
    }
    switch (targetObj[0].type) {
        case 'text':
            val = targetObj[0].value;
            break;
        case 'radio':
            val = targetObj.filter(':checked')[0].value;
            break;
        default:
            break;
    }
    return val;
}

var includeCss = function(){
    var head = document.getElementsByTagName('head')[0];
    var style = document.createElement('link');
    style.href = 'http://localhost:3030/static/css/common.css';
    style.type = 'text/css';
    style.rel = 'stylesheet';
    head.append(style);
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