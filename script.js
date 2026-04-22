document.addEventListener("DOMContentLoaded", () => {
    
    // --- LÓGICA DE INICIO Y AUDIO ---
    const welcomeScreen = document.getElementById("welcome-screen");
    const mainContent = document.getElementById("main-content");
    const startBtn = document.getElementById("start-btn");
    const audio = document.getElementById("bg-music");
    const musicBtn = document.getElementById("music-toggle");
    const musicIcon = document.getElementById("music-icon");
    let isPlaying = false;

    // Mensaje para la máquina de escribir (Ahora incluye el poema en cursiva)
    const mensajeCompleto = "En este día tan especial, quiero recordarte lo mucho que te quiero. Eres una excelente mujer, una verdadera guerrera que me inspira porque siempre cumples todo lo que te propones. Me siento profundamente orgulloso de ti, de tus pasos y de tu fuerza. Eres una amiga importantísima en mi vida y te adoro con todo mi corazón.<br><br><em>Que la vida te sonría cada día,<br>que tus pasos te lleven donde sueñas estar,<br>hoy celebro tu luz, tu fuerza y tu alegría,<br>¡y el inmenso regalo de nuestra amistad!</em><br><br><br><br>¡Que este nuevo año te traiga toda la felicidad del mundo!";

    startBtn.addEventListener("click", () => {
        // Desvanecer pantalla de bienvenida
        welcomeScreen.style.opacity = "0";
        
        setTimeout(() => {
            welcomeScreen.style.visibility = "hidden";
            mainContent.classList.remove("hidden");
            
            // Iniciar Audio
            audio.play().then(() => {
                isPlaying = true;
                musicIcon.innerText = "⏸️";
            }).catch(e => console.log("Audio autoplay bloqueado", e));

            // Iniciar efecto de tipeo
            iniciarMaquinaDeEscribir();
        }, 1000);
    });

    // Control manual de música
    musicBtn.addEventListener("click", () => {
        if (isPlaying) {
            audio.pause();
            musicIcon.innerText = "🎵";
        } else {
            audio.play();
            musicIcon.innerText = "⏸️";
        }
        isPlaying = !isPlaying;
    });

    // --- EFECTO MÁQUINA DE ESCRIBIR ---
    const textElement = document.getElementById("typewriter-text");
    let i = 0;
    let tempHTML = "";

    function iniciarMaquinaDeEscribir() {
        textElement.innerHTML = '<span class="cursor"></span>';
        
        function escribirLetra() {
            if (i < mensajeCompleto.length) {
                // Detectar si estamos escribiendo una etiqueta HTML (<br>, <strong>, <em>)
                if (mensajeCompleto.charAt(i) === '<') {
                    let etiqueta = "";
                    while (mensajeCompleto.charAt(i) !== '>' && i < mensajeCompleto.length) {
                        etiqueta += mensajeCompleto.charAt(i);
                        i++;
                    }
                    etiqueta += '>';
                    tempHTML += etiqueta;
                    i++;
                } else {
                    tempHTML += mensajeCompleto.charAt(i);
                    i++;
                }
                
                textElement.innerHTML = tempHTML + '<span class="cursor"></span>';
                
                // Variar velocidad para que parezca más natural (entre 30 y 80ms)
                let velocidad = Math.random() * 50 + 30;
                setTimeout(escribirLetra, velocidad);
            } else {
                // Al terminar, quitamos el cursor intermitente
                textElement.innerHTML = tempHTML;
            }
        }
        escribirLetra();
    }

    // --- GALERÍA ---
    const slides = document.querySelectorAll(".slide");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(s => s.classList.remove("active"));
        if (index >= slides.length) currentSlide = 0;
        else if (index < 0) currentSlide = slides.length - 1;
        else currentSlide = index;
        slides[currentSlide].classList.add("active");
    }

    nextBtn.addEventListener("click", () => showSlide(currentSlide + 1));
    prevBtn.addEventListener("click", () => showSlide(currentSlide - 1));
    setInterval(() => showSlide(currentSlide + 1), 5000);

    // --- EFECTO INTERACTIVO AL HACER CLIC (FUEGOS ARTIFICIALES) ---
    document.addEventListener('click', (e) => {
        // No hacer chispas si hace clic en los botones de navegación o inicio
        if(e.target.closest('button')) return;

        const colors = ['#ff00de', '#ffd700', '#00e5ff', '#ffffff'];
        for (let j = 0; j < 8; j++) {
            const spark = document.createElement('div');
            spark.classList.add('click-spark');
            
            // Tamaño aleatorio
            const size = Math.random() * 8 + 4;
            spark.style.width = `${size}px`;
            spark.style.height = `${size}px`;
            
            // Color aleatorio
            spark.style.background = colors[Math.floor(Math.random() * colors.length)];
            
            // Posición inicial (donde se hizo clic)
            spark.style.left = `${e.clientX}px`;
            spark.style.top = `${e.clientY}px`;
            
            // Dirección aleatoria para la explosión
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 50 + 20;
            spark.style.setProperty('--tx', `${Math.cos(angle) * distance}px`);
            spark.style.setProperty('--ty', `${Math.sin(angle) * distance}px`);
            
            document.body.appendChild(spark);
            
            // Borrar la chispa después de la animación
            setTimeout(() => spark.remove(), 800);
        }
    });

    // --- PARTÍCULAS DE FONDO CONSTANTES ---
    const particlesContainer = document.getElementById('particles-background');
    function createParticle() {
        const p = document.createElement('div');
        p.classList.add('particle');
        const size = Math.random() * 6 + 2;
        p.style.width = p.style.height = `${size}px`;
        p.style.left = `${Math.random() * 100}vw`;
        const dur = Math.random() * 8 + 4;
        p.style.animationDuration = `${dur}s`;
        particlesContainer.appendChild(p);
        setTimeout(() => p.remove(), dur * 1000);
    }
    setInterval(createParticle, 300);
});