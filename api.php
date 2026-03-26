<?php
header('Content-Type: application/json');

$arquivo = __DIR__ . '/questoes.csv';

$linhas = array_map('str_getcsv', file($arquivo));
$cabecalho = array_shift($linhas);

$dados = [];

foreach ($linhas as $linha) {
    if (count($linha) == count($cabecalho)) {
        $dados[] = array_combine($cabecalho, $linha);
    }
}

echo json_encode($dados, JSON_UNESCAPED_UNICODE);
?>