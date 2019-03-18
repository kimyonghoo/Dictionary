var ajaxCall = function(ajaxObj){
    $.ajax({
        url: ajaxObj.url,
        type: ajaxObj.type,
        data: ajaxObj.req,
        success:function(data){
            ajaxObj.callBack(data);
        },
        error:function(jqXHR, textStatus, errorThrown){
            alert("[ERROR] \n" + textStatus + " : " + errorThrown);
        }
    }); 
}