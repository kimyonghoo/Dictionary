var ajaxCall = (url, type, req) => {
    return $.ajax({
        url: url,
        type: type,
        data: req,
        error:function(jqXHR, textStatus, errorThrown){
            alert("[ERROR] \n" + textStatus + " : " + errorThrown);
        }
    }); 
}

var includeCss = () => {
    var head = document.getElementsByTagName('head')[0];
    var style = document.createElement('link');
    style.href = 'http://localhost:3030/static/css/common.css';
    style.type = 'text/css';
    style.rel = 'stylesheet';
    head.append(style);
}