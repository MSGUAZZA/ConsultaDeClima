<?php
if (isset($_POST['city'])) {
    $city = $_POST['city'];
    $apiKey = '267e9a1ce3a3f125433b78ce793f2eee'; // Reemplaza con tu clave de API de OpenWeatherMap

    // Usar urlencode para manejar espacios y caracteres especiales
    $city = urlencode($city);

    // Hacer la solicitud a la API de OpenWeatherMap
    $apiUrl = "http://api.openweathermap.org/data/2.5/weather?q={$city}&appid={$apiKey}";

    // Obtener la respuesta de la API
    $weatherData = file_get_contents($apiUrl);

    // Comprobar si la solicitud fue exitosa
    if ($weatherData === FALSE) {
        echo json_encode(['cod' => 404, 'message' => 'Error al obtener datos.']);
    } else {
        // Devolver los datos al frontend
        echo $weatherData;
    }
}
?>
