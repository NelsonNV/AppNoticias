<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Content-type:application/json;charset=utf-8');


$url = "https://www.xataka.com/categoria/ordenadores";

$conte = file_get_contents($url);

function fntDato($dato,$inicio,$final){
    $articulo = substr($dato, strpos($dato, $inicio));

    $po_final = strpos($articulo, $final);

    $articulo = substr($articulo,0 ,$po_final);
    return $articulo;
}

function fntURL($dato)
{
    $articulo =  fntDato($dato,'https','"');
    return $articulo;
}

function fntImg($dato)
{
    $imagen =  fntDato($dato,'<picture>','</picture>');
    
    return fntURL($imagen);
}


function fntTitulo($artic){

    $articulo = fntDato($artic,'<h2>','</h2>');
    $info = fntURL($articulo);
    $titulo = str_replace('https://www.xataka.com/','',$info);
    $titulo = str_replace('componentes/','',$titulo);
    $titulo = str_replace('ordenadores/','',$titulo);
    $titulo = str_replace('-',' ',$titulo);
    return $titulo;
}

while(strpos($conte, "<article")){
    $articulo = substr($conte, strpos($conte, '<article'));

    $po_final = strpos($articulo, '</article>');

    $articulo = substr($articulo,0 ,$po_final);

    $conte = substr($conte,strpos($conte, '<article')+1);

    $noticias['noticias'][] = array(
        'titulo' => fntTitulo($articulo),
        'imagen' =>  fntImg($articulo),
        'url' => fntURL($articulo),
    );
}
if($_SERVER['REQUEST_METHOD'] == "GET"){
    echo json_encode($noticias, http_response_code(200) );
}else{
    $json = array(
       'status' => 403,
       'Error' => 'error depeticion'
       );
   echo json_encode($json, http_response_code($json["status"]));
}

?>