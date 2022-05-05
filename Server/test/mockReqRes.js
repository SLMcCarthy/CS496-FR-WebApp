let res = {_send:'',_status:0, _redirect:''};
res.send = function(json){
    this._send = json;
}
res.status = function(number){
    this._status = number;
}
res.redirect = function(url){
    this._redirect = url;
}
res.end = function(){}

res.clear = function(){
    res = {_send:'',_status:0, _redirect:''};
}

let req = {params:{},body:{},session:{user:null}};


exports.response = res;
exports.request = req;