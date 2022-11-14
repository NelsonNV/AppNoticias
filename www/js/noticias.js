
var dicNoticia
function fnGetNoticias(){
    const url = "https://www.navarrolabs.cl/noticias/index.php"
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', url,true);
    xhttp.send();
    xhttp.onreadystatechange = function(){ 
        if (this.readyState == 4 && this.status == 200){
            console.log(JSON.parse( this.responseText));
           dicNoticia = JSON.parse( this.responseText)
        }
    }
}
