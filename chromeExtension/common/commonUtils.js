var ajaxCall = function(ajaxObj){
    $.ajax({
        url: ajaxObj.url,
        type: ajaxObj.type,
        data: ajaxObj.req,
        success:function(data){
            ajaxObj.callBack(data, ajaxObj.bizCode);
        },
        error:function(jqXHR, textStatus, errorThrown){
            alert("[ERROR] \n" + textStatus + " : " + errorThrown);
        }
    }); 
}

var getElementValue = function(id){
    var value = '';

    if($('#'+id).length > 0){
        value = $('#'+id).val();
    } else if($('form').contents().find('input[name='+ id +']').length > 0){
        value = $('form').contents().find('input[name=vvd]').val();
    } else {
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