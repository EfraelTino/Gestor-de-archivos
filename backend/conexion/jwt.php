<?php
// Generar un token JWT
function generateToken($user_id) {
    // Clave secreta para firmar los tokens (¡cambia esto en producción!)
    $secret_key = "clave_secreta";

    // Codificar el header y payload del token
    $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
    //$payload = json_encode(['user_id' => $user_id, 'exp' => time() + (60 * 60)]); // Expira después de 1 hora
    
    $payload = json_encode(['user_id' => $user_id, 'exp' => time() + 60]); // Expira después de 1 minuto

    // Codificar el header y payload en base64
    $base64UrlHeader = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));
    $base64UrlPayload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($payload));

    // Crear la firma del token
    $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, $secret_key, true);
    $base64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));

    // Concatenar el header, payload y firma para formar el token JWT
    $jwt = $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;

    return $jwt;
}

// Verificar un token JWT
function verifyToken($token) {
    // Clave secreta para firmar los tokens (¡cambia esto en producción!)
    $secret_key = "clave_secreta";

    // Dividir el token en sus componentes
    list($headerEncoded, $payloadEncoded, $signatureEncoded) = explode('.', $token);

    // Decodificar el header y payload
    $header = json_decode(base64_decode(str_replace(['-', '_'], ['+', '/'], $headerEncoded)), true);
    $payload = json_decode(base64_decode(str_replace(['-', '_'], ['+', '/'], $payloadEncoded)), true);

    // Verificar la firma del token
    $signature = base64_decode(str_replace(['-', '_'], ['+', '/'], $signatureEncoded));
    $expectedSignature = hash_hmac('sha256', $headerEncoded . "." . $payloadEncoded, $secret_key, true);

    // Comparar la firma esperada con la firma del token
    if (hash_equals($expectedSignature, $signature)) {
        // Verificar la expiración del token
        if ($payload['exp'] >= time()) {
            return $payload;
        }
    }

    return null;
}

// Ejemplo de uso
// $user_id = 123;
// $token = generateToken($user_id);
// echo "Token generado: $token\n";

// $decodedPayload = verifyToken($token);
// if ($decodedPayload) {
//     echo "Token verificado. Datos decodificados: " . json_encode($decodedPayload) . "\n";
// } else {
//     echo "Token inválido o expirado.\n";
// }
