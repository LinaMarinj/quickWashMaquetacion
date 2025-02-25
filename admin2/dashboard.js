let balance = 0;
let arregloMovimientosGrafica = [0];
let arregloFechasMovimientosGrafica = [""];
let nuevoServicio;
let serviciosTotales = []; // Inicializamos el array de servicios
let indexServicios = 0; // contador
let nuevoRecompensa;
let recompensasTotales = []; // Inicializamos el array de recompensas
let objetoUsuario = {};
let indexRecompensas = 0; // contador

//este es el bloque de la estadistica
const options = {
  chart: {
    height: "100%",
    maxHeight: "215px",
    maxWidth: "100%",
    type: "area",
    fontFamily: "Inter, sans-serif",
    dropShadow: {
      enabled: false,
    },
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    enabled: true,
    x: {
      show: false,
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      opacityFrom: 0.55,
      opacityTo: 0,
      shade: "#7125cbbd",
      gradientToColors: ["#7125cbbd"],
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    width: 6,
  },
  grid: {
    show: false,
    strokeDashArray: 4,
    padding: {
      left: 2,
      right: 2,
      top: 0,
    },
  },
  series: [
    {
      name: "Movimientos",
      data: arregloMovimientosGrafica,
      color: "#7125cbbd",
    },
  ],
  xaxis: {
    categories: arregloFechasMovimientosGrafica,
    labels: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: false,
  },
};

let chart;

if (
  document.getElementById("area-chart") &&
  typeof ApexCharts !== "undefined"
) {
  chart = new ApexCharts(document.getElementById("area-chart"), options);
  chart.render();
}
//final de la estadistica

function actualizarMensajeTabla(tbody) {
  // Si el tbody no tiene filas (tr), agrega el mensaje vacío
  if (tbody.children.length === 0) {
    const trConMensajeVacio = document.createElement("tr");
    trConMensajeVacio.classList.add("mensaje-vacio");

    trConMensajeVacio.innerHTML = `
            <td colspan="4" class="text-center text-gray-500 py-[100px]">
                No hay registros disponibles
            </td>
        `;
    tbody.appendChild(trConMensajeVacio);
  } else if (tbody.querySelector("tr.mensaje-vacio")) {
    tbody.innerHTML = "";
  }
}

actualizarMensajeTabla(document.querySelector("#tablaServicios tbody"));
actualizarMensajeTabla(document.querySelector("#tablaRecompensas tbody"));

function htmlModalServicio() {
  return `
        <form action="">
            <label for="montoServicio">Monto Servicio:</label>
            <input class="swal2-input" type="number" id="montoServicio" name="montoServicio" placeholder="$100.000" />
            <label for="fechaServicio">Fecha Servicio:</label>
            <input class="swal2-input" type="date" id="fechaServicio" name="fechaServicio" />
            <label for="frecuencia">Frecuencia:</label>
            <select class="swal2-input" name="frecuencia" id="frecuencia" style="margin-bottom: 25px !important; border: 1px solid hsl(0, 0%, 85%); border-radius: .1875em;">
                <option value="" disabled selected>Selecciona una frecuencia</option>
                <option value="Diaria">Diaria</option>
                <option value="Semanal">Semanal</option>
                <option value="Mensual">Mensual</option>
                <option value="Anual">Anual</option>
                <option value="Otro...">Otro...</option>
            </select>
            <label for="categoria">Categoría:</label>
            <select class="swal2-input" name="categoria" id="categoria" style="margin-bottom: 25px !important;border: 1px solid hsl(0, 0%, 85%); border-radius: .1875em;">
                <option value="" disabled selected>Selecciona una categoría</option>
                <option value="Salario">Salario</option>
                <option value="Ahorros">Ahorros</option>
                <option value="Inversiones">Inversiones</option>
                <option value="Subsidio">Subsidio</option>
                <option value="Otro...">Otro...</option>
            </select>
        </form>
    `;
}

function validarFormularioServicio() {
  // Obtenemos los valores de los campos del formulario
  const montoServicio = document.getElementById("montoServicio").value;
  const fechaServicio = document.getElementById("fechaServicio").value;
  const frecuencia = document.getElementById("frecuencia").value;
  const categoria = document.getElementById("categoria").value;

  // Verifica que los valores no estén vacíos
  if (!montoServicio || !fechaServicio || !frecuencia || !categoria) {
    // Muestra un mensaje de error si hay campos vacíos y no guarda el servicio
    Swal.showValidationMessage("Por favor completa todos los campos");
    return false;
  }

  // Retorna un objeto con los valores del formulario si todo está correcto
  return {
    montoServicio,
    fechaServicio,
    frecuencia,
    categoria,
  };
}

function guardarServicio(result) {
  // Obtenemos los valores del formulario
  const montoServicio = result.value.montoServicio;
  const fechaServicio = result.value.fechaServicio;
  const frecuencia = result.value.frecuencia;
  const categoria = result.value.categoria;

  // Incrementar contador de servicios
  indexServicios++;

  // Crear objeto de servicio
  const objetoServicio = {
    idServicio: indexServicios,
    montoServicio,
    fechaServicio,
    frecuencia,
    categoria,
  };

  // Guardar el objeto en el arreglo simulando una base de datos
  serviciosTotales.push(objetoServicio);

  actualizarMensajeTabla(document.querySelector("#tablaServicios tbody"));

  const tbody = document.querySelector("#tablaServicios tbody");

  // Crear una nueva fila
  const newRow = document.createElement("tr");

  // Agregar celdas a la fila
  newRow.innerHTML = `
        <td class="px-6 py-4 whitespace-nowrap">${indexServicios}</td>
        <td class="px-6 py-4 whitespace-nowrap">${montoServicio}</td>
        <td class="px-6 py-4 whitespace-nowrap">${fechaServicio}</td>
        <td class="px-6 py-4 whitespace-nowrap">${frecuencia}</td>
        <td class="px-6 py-4 whitespace-nowrap">${categoria}</td>
    `;

  // Agregar la fila al tbody
  tbody.appendChild(newRow);

  // Mostrar mensaje de éxito
  Swal.fire({ title: "Servicio Registrado", icon: "success" });

  balance += parseInt(montoServicio);
  const formatoDePesoColombiano = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(balance);

  arregloMovimientosGrafica.push(balance);
  console.log(fechaServicio);
  arregloFechasMovimientosGrafica.push(fechaServicio);
  document.querySelector("#saldo").innerHTML = formatoDePesoColombiano;
  document.getElementById("area-chart").innerHTML = "";
  chart.render();
}

function abrirModalServicio() {
  return Swal.fire({
    title: "Nuevo Servicio",
    html: htmlModalServicio(),
    focusConfirm: false,
    confirmButtonText: "Registrar Servicio",
    preConfirm: validarFormularioServicio,
  }).then((result) => {
    if (result.isConfirmed) {
      guardarServicio(result);
    }
  });
}

document.querySelector("#btnNuevoServicio").addEventListener("click", () => {
  abrirModalServicio();
});

function htmlModalRecompensa() {
  return `
        <form action="">
            <label for="montoRecompensa">Monto Recompensa:</label>
            <input class="swal2-input" type="number" id="montoRecompensa" name="montoRecompensa" placeholder="$500.000" />
            <label for="fechaRecompensa">Fecha Recompensa:</label>
            <input class="swal2-input" type="date" id="fechaRecompensa" name="fechaRecompensa" />
            <label for="categoria">Categoría:</label>
            <select class="swal2-input" name="categoria" id="categoria" style="margin-bottom: 25px !important;border: 1px solid hsl(0, 0%, 85%); border-radius: .1875em;">
                <option value="" disabled selected>Selecciona una categoría</option>
                <option value="Arriendo">Arriendo</option>
                <option value="Alimentacion">Alimentación</option>
                <option value="Transporte">Transporte</option>
                <option value="Educación>Educación</option>
                 <option value="Entretenimiento">Entretenimiento</option>
                <option value="Gymnasio">Gimnasio</option>
                <option value="Otro...">Otro...</option>
            </select>
        </form>
    `;
}

function validarFormularioRecompensa() {
  const montoRecompensa = document.getElementById("montoRecompensa").value;
  const fechaRecompensa = document.getElementById("fechaRecompensa").value;
  const categoria = document.getElementById("categoria").value;

  if (!montoRecompensa || !fechaRecompensa || !categoria) {
    Swal.showValidationMessage("Por favor completa todos los campos");
    return false;
  }

  return {
    montoRecompensa,
    fechaRecompensa,
    categoria,
  };
}

function guardarRecompensa(result) {
  const montoRecompensa = result.value.montoRecompensa;
  const fechaRecompensa = result.value.fechaRecompensa;
  const categoria = result.value.categoria;

  // Incrementar contador de recompensas
  indexRecompensas++;

  // Crear objeto de recompensa
  const objetoRecompensa = {
    idRecompensa: indexRecompensas,
    montoRecompensa,
    fechaRecompensa,
    categoria,
  };

  // Guardar el objeto en el arreglo simulando una base de datos
  recompensasTotales.push(objetoRecompensa);

  actualizarMensajeTabla(document.querySelector("#tablaRecompensas tbody"));

  const tbody = document.querySelector("#tablaRecompensas tbody");

  // Crear una nueva fila
  const newRow = document.createElement("tr");

  // Agregar celdas a la fila
  newRow.innerHTML = `
<td class="px-6 py-4 whitespace-nowrap">${indexRecompensas}</td>
<td class="flex items-center">
<div class="px-6 py-4 whitespace-nowrap">${montoRecompensa}</div>
</td>
<td class="px-6 py-4 whitespace-nowrap">${fechaRecompensa}</td>
<td class="px-6 py-4 whitespace-nowrap">${categoria}</td>
`;

  // Agregar la fila al tbody
  tbody.appendChild(newRow);

  Swal.fire({
    title: "Recompensa Registrado",
    icon: "success",
  });

  balance -= parseInt(montoRecompensa);
  const formatoDePesoColombiano = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(balance);

  arregloMovimientosGrafica.push(balance);
  arregloFechasMovimientosGrafica.push(fechaRecompensa);
  document.querySelector("#saldo").innerHTML = formatoDePesoColombiano;
  document.getElementById("area-chart").innerHTML = "";
  chart.render();
}

document.querySelector("#btnNuevoRecompensa").addEventListener("click", () => {
  Swal.fire({
    title: "Nuevo Recompensa",
    html: htmlModalRecompensa(),
    focusConfirm: false,
    confirmButtonText: "Registrar Recompensa",
    preConfirm: validarFormularioRecompensa,
  }).then((result) => {
    // Despues
    if (result.isConfirmed) {
      guardarRecompensa(result);
    }
  });
});

// Se crea ventana emergente
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

// evento de clic al botón de reporte
document.getElementById("btnGenerarReporte").addEventListener("click", () => {
  // Mostrar el Toast
  Toast.fire({
    icon: "success",
    title: "Preparando Reporte",
  });

  // abrir el Swal de "Balance Mensual"
  setTimeout(() => {
    let totalRecompensas = 0;
    let totalServicios = 0;
    recompensasTotales.forEach(
      (recompensa) => (totalRecompensas += parseFloat(recompensa.montoRecompensa))
    );
    serviciosTotales.forEach(
      (servicio) => (totalServicios += parseFloat(servicio.montoServicio))
    );

    Swal.fire({
      title: "Balance Mensual",
      html:
        '<div id="modalContent">' +
        "<p>Tus servicios mensuales son: </p>" +
        totalServicios +
        "<p>Tus recompensas mensuales son: </p>" +
        totalRecompensas +
        "<p>Tu balance mensual es: </p>" +
        balance +
        "<p>¡Tus finanzas están muy bien! ¡FELICIDADES!</p>" +
        "</div>" +
        '<button id="btnDescargarPDF" class="swal2-confirm swal2-styled">Descargar PDF</button>' + // Botón para descargar PDF
        '<button id="btnAtras" class="swal2-cancel swal2-styled" style="margin-left: 10px;">Atrás</button>',
      showConfirmButton: false, // Deshabilitar el botón de confirmación
      didOpen: () => {
        // Agregar el evento de clic para descargar el PDF
        document
          .getElementById("btnDescargarPDF")
          .addEventListener("click", () => {
            // Seleccionar el contenido que se convertirá en PDF
            const modalContent = document.getElementById("modalContent");

            const opt = {
              margin: 1, // márgenes en pulgadas
              filename: "Balance_Mensual.pdf",
              image: { type: "jpeg", quality: 0.98 },
              html2canvas: { scale: 2 }, // aumenta la calidad de la imagen
              jsPDF: { unit: "in", format: "letter", orientation: "portrait" }, // tamaño y formato de la página
              pagebreak: { mode: ["avoid-all"] }, // evitar cortes entre elementos
            };

            modalContent.style.textAlign = "center";

            // Usar html2pdf para generar el PDF
            html2pdf().from(modalContent).set(opt).save("Balance_Mensual.pdf");
          });

        // Agregar el evento de clic para el botón "Atrás" que cerrará el modal
        document.getElementById("btnAtras").addEventListener("click", () => {
          Swal.close(); // Cerrar la alerta de SweetAlert2
        });
      },
    });
  }, 3000); // Mismo tiempo que el timer del Toast
});



