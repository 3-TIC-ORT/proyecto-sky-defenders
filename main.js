window.onload = function () { /**Esto hace que se ejecute la función una vez que termina de cargar la página**/
    const params = new URLSearchParams(window.location.search); /**new se usa para crear nuevos objetos basados en una plantilla o prototipo**//**URLSearchParams(window.location.search) se utiliza para analizar la cadena de consulta de la URL actual (la parte que sigue al signo de interrogación '?') y crear un objeto que facilita la manipulación de los parámetros de consulta**/
    const pais = params.get("pais"); /**params.get se utiliza para obtener el valor de un parámetro específico de la cadena de consulta de una URL utilizando la clase URLSearchParams**/
    const tipo = params.get("tipo");

    const imagen = document.getElementById("imagen");

    imagen.src = "aviónde" + pais + tipo + ".gif";
    imagen.alt = "Imagen del avión de " + pais + " y del tipo " + tipo;
}