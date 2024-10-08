$(document).ready(function () {
    // Manejar la solicitud de clima
    $('#weatherForm').on('submit', function (e) {
        e.preventDefault();
        let city = $('#city').val();
        
        // Depuración: mostrar la ciudad en la consola
        console.log('Consultando clima para la ciudad:', city);

        if (city) {
            $.ajax({
                url: 'get_weather.php',
                method: 'POST',
                data: { city: city },
                success: function (response) {
                    // Depuración: mostrar la respuesta en la consola
                    console.log('Respuesta de la API:', response);

                    let data = JSON.parse(response);
                    if (data.cod === 200) {
                        $('#weatherResult').html(`
                            <h3>Clima en ${data.name}, ${data.sys.country}</h3>
                            <p>Temperatura: ${(data.main.temp - 273.15).toFixed(1)}°C</p>
                            <p>Condiciones: ${data.weather[0].description}</p>
                            <p>Humedad: ${data.main.humidity}%</p>
                            <p>Viento: ${data.wind.speed} m/s</p>
                        `);
                    } else {
                        $('#weatherResult').html(`<p class="text-danger">Ciudad no encontrada.</p>`);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    // Manejo de errores
                    console.error('Error en la solicitud AJAX:', textStatus, errorThrown);
                    $('#weatherResult').html(`<p class="text-danger">Error al consultar el clima. Inténtalo nuevamente.</p>`);
                }
            });
        }
    });
});
