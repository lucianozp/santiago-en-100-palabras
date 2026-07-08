document.addEventListener("DOMContentLoaded", () => {
    const tarjetas = document.querySelectorAll(".tarjeta-edicion");
    const modal = document.getElementById("modal-visor");
    const modalImg = document.getElementById("modal-imagen");
    const modalLink = document.getElementById("modal-link-pdf");
    const btnCerrar = document.querySelector(".btn-cerrar");
    const modalTexto = document.getElementById("modal-texto-info");

    tarjetas.forEach(tarjeta => {
        tarjeta.addEventListener("click", () => {
            const rutaImagen = tarjeta.querySelector("img").src;
            const rutaPDF = tarjeta.getAttribute("data-pdf");
            const infoTexto = tarjeta.getAttribute("data-info");

            modalImg.src = rutaImagen;
            modalLink.href = rutaPDF;
            modalTexto.textContent = infoTexto || "Datos de esta edición en procesamiento...";
            modal.style.display = "flex";
        });
    });

    btnCerrar.addEventListener("click", () => {
        modal.style.display = "none";
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const observadorCuentos = new IntersectionObserver((entradas, observador) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                const recortes = entrada.target.querySelectorAll('.recorte-cuento');
                recortes.forEach(recorte => {
                    recorte.classList.add('animar-caida');
                });
                observador.unobserve(entrada.target);
            }
        });
    }, { 
        threshold: 0.3 
    });

    const tableroCuentos = document.querySelector('.contenedor-espacio-cuentos');
    if (tableroCuentos) {
        observadorCuentos.observe(tableroCuentos);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const btnGirar = document.getElementById('btn-girar-tombola');
    const pantallaRifa = document.getElementById('pantalla-rifa');
    const pantallaCarga = document.getElementById('pantalla-carga-comunas');
    const ruletaTexto = document.getElementById('ruleta-dinamica');
    const cuentoRevelado = document.getElementById('cuento-revelado-talagante');

    const comunasElite = ['ÑUÑOA', 'LAS CONDES', 'PROVIDENCIA', 'SANTIAGO', 'VITACURA', 'LA REINA', 'LA FLORIDA', 'PUENTE ALTO', 'PROVIDENCIA', 'SANTIAGO'];

    if (btnGirar) {
        btnGirar.addEventListener('click', () => {
            pantallaRifa.classList.add('hidden');
            pantallaCarga.classList.remove('hidden');

            let intervaloRuleta = setInterval(() => {
                const comunaAleatoria = comunasElite[Math.floor(Math.random() * comunasElite.length)];
                ruletaTexto.innerText = comunaAleatoria;
            }, 80);

            setTimeout(() => {
                clearInterval(intervaloRuleta);
                
                ruletaTexto.innerText = "TALAGANTE";
                ruletaTexto.style.color = "#E60000";

                setTimeout(() => {
                    pantallaCarga.classList.add('hidden');
                    cuentoRevelado.classList.remove('hidden');
                }, 600);

            }, 2500);
        });
    }
});