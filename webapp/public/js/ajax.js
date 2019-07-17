function ajax(type, url, async){//方法，接口，是否异步
    var result;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open(type, url, async);
    xmlhttp.send();
    if(async == true){//异步操作，不需要等待
        xmlhttp.onreadystatechange=function(){
            if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
                result = JSON.parse(xmlhttp.response)
                return result;
            }
        }
    }else{//同步操作，需要等待
        result = JSON.parse(xmlhttp.response);
        return result;
    }
}