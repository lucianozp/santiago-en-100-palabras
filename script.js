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

/* ==========================================================================
   Efecto Fanzine: Detonador de animación al hacer Scroll
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Creamos al vigía (Observer)
    const observadorCuentos = new IntersectionObserver((entradas, observador) => {
        entradas.forEach(entrada => {
            // Si el contenedor de los cuentos entra en la pantalla...
            if (entrada.isIntersecting) {
                
                // Buscamos todas las imágenes de los cuentos que están adentro
                const recortes = entrada.target.querySelectorAll('.recorte-cuento');
                
                // A cada una le agregamos la clase que inicia la caída CSS
                recortes.forEach(recorte => {
                    recorte.classList.add('animar-caida');
                });
                
                // Dejamos de vigilar para que la animación solo ocurra una vez (al bajar)
                observador.unobserve(entrada.target);
            }
        });
    }, { 
        // 2. Opciones del vigía
        threshold: 0.3 // Se activa cuando el 30% del recuadro gris ya es visible
    });

    // 3. Le decimos al vigía a quién tiene que mirar
    const tableroCuentos = document.querySelector('.contenedor-espacio-cuentos');
    if (tableroCuentos) {
        observadorCuentos.observe(tableroCuentos);
    }
});

/* ==========================================================================
   Lógica de la Tómbola Interactiva (Talagante)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const btnGirar = document.getElementById('btn-girar-tombola');
    const pantallaRifa = document.getElementById('pantalla-rifa');
    const pantallaCarga = document.getElementById('pantalla-carga-comunas');
    const ruletaTexto = document.getElementById('ruleta-dinamica');
    const cuentoRevelado = document.getElementById('cuento-revelado-talagante');

    // Comunas hiper-representadas para simular la trampa estadística
    const comunasElite = ['ÑUÑOA', 'LAS CONDES', 'PROVIDENCIA', 'SANTIAGO', 'VITACURA', 'LA REINA', 'LA FLORIDA', 'PUENTE ALTO', 'PROVIDENCIA', 'SANTIAGO'];

    if (btnGirar) {
        btnGirar.addEventListener('click', () => {
            // 1. Cambiamos de pantalla inicial a pantalla ruleta
            pantallaRifa.classList.add('hidden');
            pantallaCarga.classList.remove('hidden');

            // 2. Efecto Slot Machine: Cambia el texto cada 80 milisegundos
            let intervaloRuleta = setInterval(() => {
                const comunaAleatoria = comunasElite[Math.floor(Math.random() * comunasElite.length)];
                ruletaTexto.innerText = comunaAleatoria;
            }, 80);

            // 3. Freno de mano a los 1.8 segundos (Fin del sorteo)
            setTimeout(() => {
                clearInterval(intervaloRuleta);
                
                // Forzamos el desenlace estadístico real
                ruletaTexto.innerText = "TALAGANTE";
                ruletaTexto.style.color = "#E60000";

                // Pequeña pausa dramática en el nombre y revelación del papel
                setTimeout(() => {
                    pantallaCarga.classList.add('hidden');
                    cuentoRevelado.classList.remove('hidden');
                }, 600);

            }, 2500);
        });
    }
});