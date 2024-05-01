const counters = document.querySelectorAll('.counterContainer span');
const container = document.querySelector('.counterContainer');

let activated = false;
let counting = false;
let totalSteps = 300; // Número total de pasos para contar

function updateAllCounters() {
    counters.forEach(counter => {
        counter.innerText = 0;
    });

    let stepSize = [];
    let targetCounts = Array.from(counters, counter => parseInt(counter.dataset.count));
    let maxTargetCount = Math.max(...targetCounts);

    for (let i = 0; i < counters.length; i++) {
        stepSize[i] = targetCounts[i] / totalSteps;
    }

    function updateCount(currentStep) {
        let allCountsReached = true;

        for (let i = 0; i < counters.length; i++) {
            const target = targetCounts[i];
            let currentCount = stepSize[i] * currentStep;

            if (currentCount < target) {
                counters[i].innerText = Math.ceil(currentCount);
                allCountsReached = false;
            } else {
                counters[i].innerText = target;
            }
        }

        if (currentStep < totalSteps && !allCountsReached) {
            requestAnimationFrame(() => updateCount(currentStep + 1));
        } else {
            counting = false;
        }
    }

    counting = true;
    updateCount(1);
}

window.addEventListener("scroll", () => {
    if (window.pageYOffset > container.offsetTop - container.offsetHeight - 200 && activated === false) {
        if (!counting) {
            updateAllCounters();
            activated = true;
        }
    } else if (window.pageYOffset < container.offsetTop - container.offsetHeight - 500 || window.pageYOffset === 0 && activated === true) {
        counters.forEach(counter => {
            counter.innerText = 0;
        });
        activated = false;
    }
});


document.querySelectorAll('.grid img').forEach(img => {
    img.addEventListener('click', () => {
        var id = img.getAttribute('id'); 
        openLightbox(img.src, id); 
    });
});

function openLightbox(src, id) {
    var lightbox = document.getElementById('lightbox');
    var lightboxImage = document.getElementById('lightbox-image');
    var img = document.getElementById(id); 
    lightboxImage.src = src;
    lightbox.style.display = 'block';
    img.style.display = 'block'; // Mostrar la imagen clickeada
}

// Función para cerrar la ventana emergente
function closeLightbox() {
    var lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
    document.querySelectorAll('.grid img').forEach(img => {
        img.style.display = 'block'; // Mostrar todas las imágenes de la galería nuevamente
    });
}

document.getElementById('lightbox').addEventListener('click', function(event) {
    if (event.target === this) { 
        closeLightbox(); // Cierra la ventana emergente solo si se hace clic en el fondo oscuro
    }
});
function copyNumber(phoneNumber) {
    var tempInput = document.createElement("input");
    tempInput.value = phoneNumber;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    Toastify({
        text: "Numero copiado!",
        className: "info",
        position: "center",
        gravity: "bottom",
        style: {
          background: "#0B60B0",
        }
      }).showToast();
}

emailjs.init({
    publicKey: '_GIA0Y0vajh0-jMp3',
    // Do not allow headless browsers
    blockHeadless: true,
    blockList: {
      // Block the suspended emails
      list: ['foo@emailjs.com', 'bar@emailjs.com'],
      // The variable contains the email address
      watchVariable: 'userEmail',
    },
    limitRate: {
      // Set the limit rate for the application
      id: 'app',
      // Allow 1 request per 10s
      throttle: 10000,
    },
  });
  function SendEmail() {
    var fullName = document.getElementById('fullName').value;
    var email = document.getElementById('email_id').value;
    var message = document.getElementById('message').value;

    // Verificar si los campos están vacíos
    if (!fullName || !email || !message) {
        Toastify({
            text: "Favor complete todos los campos",
            className: "error",
            position: "center",
            gravity: "bottom",
            style: {
                background: "#810808",
            }
        }).showToast();        
        return; // Detener la función si algún campo está vacío
    }

    var params = {
        from_name: fullName,
        email_id: email,
        message: message
    }

    emailjs.send("service_tovbp64", "template_t1urr68", params)
    .then(function(res) {
        Toastify({
            text: "Correo Enviado",
            className: "success",
            position: "center",
            gravity: "bottom",
            style: {
                background: "#0B060B0",
            }
        }).showToast();
        document.getElementById('fullName').value = '';
        document.getElementById('email_id').value = '';
        document.getElementById('message').value = '';
    })
    .catch(function(error) {
        console.error('Error al enviar el correo:', error);
        Toastify({
            text: "Error al enviar el correo",
            className: "error",
            position: "center",
            gravity: "bottom",
            style: {
                background: "#FF0000",
            }
        }).showToast();
    });
}

