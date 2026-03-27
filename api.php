<?php
// Substitua pelo seu link de publicação CSV da planilha
$url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vT6ikevxtjf1Z1F9TemfrPXt5kTdDLW-FBNnXJ9Hbbsnh1VKpizM3nfNna92tm3xysDi-n7bQ-ZyA3N/pub?gid=0&single=true&output=csv";

$dados = [];

if (($handle = fopen($url, "r")) !== FALSE) {
    fgetcsv($handle, 1000, ","); // Pula o cabeçalho

    while (($row = fgetcsv($handle, 1000, ",")) !== FALSE) {
        $dados[] = [
            "id"          => $row[0] ?? '',
            "bloque"      => $row[1] ?? '',
            "asunto"      => $row[2] ?? '',
            "pregunta"    => $row[3] ?? '',
            "a"           => $row[4] ?? '',
            "b"           => $row[5] ?? '',
            "c"           => $row[6] ?? '',
            "respuesta"   => $row[7] ?? '',
            "explicacion" => $row[8] ?? '',
            "dificultad"  => $row[9] ?? '',
            "ano"         => $row[10] ?? ''
        ];
    }
    fclose($handle);
}

header('Content-Type: application/json; charset=utf-8');
echo json_encode($dados);