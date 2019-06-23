function ajax(TYPE, URL, async){
    var xmlhttp = new XMLHttpRequest();
    // var url = URL;
    // var type = TYPE;
    xmlhttp.open(TYPE, URL, async);
    xmlhttp.send();

    xmlhttp.onreadystatechange=function(){
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
            return xmlhttp.response;
        }
    }
}