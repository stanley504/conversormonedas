<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET');
header('Access-Control-Allow-Headers: Content-Type');

require 'Binance.php'; // Asegúrate de incluir tu clase Binance

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    $asset = $data['asset'] ?? null;
    $fiat = $data['fiat'] ?? null;
    $tradeType = $data['tradeType'] ?? null;

    if (!$asset || !$fiat || !$tradeType) {
        echo json_encode(['status' => 'error', 'message' => 'Parámetros inválidos']);
        exit;
    }

    try {
        $binance = new API\BinanceApi\Binance();
        $result = $binance->exchange($asset, $fiat, $tradeType);
        echo json_encode($result);
    } catch (Exception $e) {
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Método no permitido']);
}
?>
