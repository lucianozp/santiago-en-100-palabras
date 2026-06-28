// ESPERAR A QUE LA WEB CARGUE POR COMPLETO
document.addEventListener("DOMContentLoaded", () => {
    
    // Capturar los elementos del DOM
    const tarjetas = document.querySelectorAll(".tarjeta-edicion");
    const modal = document.getElementById("modal-visor");
    const modalImg = document.getElementById("modal-imagen");
    const modalLink = document.getElementById("modal-link-pdf");
    const btnCerrar = document.querySelector(".btn-cerrar");
    
    // 🛠️ 1. NUEVO: Capturamos el párrafo de la derecha donde va a aparecer tu texto
    const modalTexto = document.getElementById("modal-texto-info");

    // Al hacer clic en cualquier portada
    tarjetas.forEach(tarjeta => {
        tarjeta.addEventListener("click", () => {
            const rutaImagen = tarjeta.querySelector("img").src;
            const rutaPDF = tarjeta.getAttribute("data-pdf");
            
            // 🛠️ 2. NUEVO: Leemos el atributo "data-info" de la tarjeta que clickeó el usuario
            const infoTexto = tarjeta.getAttribute("data-info");

            // Cargar datos dentro del visor flotante
            modalImg.src = rutaImagen;
            modalLink.href = rutaPDF;
            
            // 🛠️ 3. NUEVO: Inyectamos ese texto estadístico en la columna derecha
            // Le dejamos un mensaje de respaldo por si a alguna tarjeta se te olvida ponerle el data-info
            modalTexto.textContent = infoTexto || "Datos de esta edición en procesamiento...";

            // Mostrar el visor cambiando el display de CSS
            modal.style.display = "flex";
        });
    });

    // Cerrar el visor al hacer clic en la "X"
    btnCerrar.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Cerrar el visor también si el usuario hace clic afuera de la caja negra
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
});