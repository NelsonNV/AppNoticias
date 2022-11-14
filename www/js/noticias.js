
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

function fnPrintDivColum(noticia){
    /*Funcion que imprime en lista*/ 
    document.getElementById('articulo').innerHTML = noticia;
}

function fnColumnas() {
    let noticias = dicNoticia
    let columna = ''

    const stylebutton = 'button is-large icon';
    for (let articulo = 0; articulo < noticias.noticias.length; articulo++) {
        const item = noticias.noticias[articulo];
        columna += `
            <div class="column is-3-desktop is-full-mobile Anime">

                <div class="card">
                <div class="card-content">
                <p class="title">
                    ${item.titulo}
                </p>
                </div>
                <footer class="card-footer">
                <p class="card-footer-item">
                    <span>
                    View on <a href="${item.url}">Twitter</a>
                    </span>
                </p>
                <p class="card-footer-item">
                    <span>
                    Share on <a href="#">Facebook</a>
                    </span>
                </p>
                </footer>
            </div>
            
            </div>
            ` 
    }
    fnPrintDivColum(columna)
}

$(document).ready(function () {
    fnGetNoticias()
    setTimeout(function(){
       fnColumnas()
    }, 5000);
});

