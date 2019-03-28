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

var includeCss = function(){
    var head = document.getElementsByTagName('head')[0];
    var style = document.createElement('link');
    style.href = 'http://localhost:3030/static/css/common.css';
    style.type = 'text/css';
    style.rel = 'stylesheet';
    head.append(style);
}