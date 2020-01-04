/**
 * Ajax 封装函数
 * @param {XMLHttpRequest} xhr
 * @param {string} method
 * @param {string} url
 * @param {Object} data
 * @param {JSON} headers
 */
function ajax(xhr,url,method = "GET",data = '',headers = {}){
    return new Promise((resolve,reject) => {
        xhr.open(method, url);
        for(let p in headers){
            xhr.setRequestHeader(p,headers[p]);
        }
        xhr.onreadystatechange = function () {
            if(xhr.readyState === 4){
                if(xhr.status === 200 || xhr.status === 304){
                    resolve(xhr.response);
                }else{
                    reject("Warning!",xhr.status);
                }
            }
        }
        xhr.send(data);
    });
}