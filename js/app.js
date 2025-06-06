const TARIFAS = {
  car: 5000,
  bus: 10000,
  truck: 15000
};

let conteo = {
  car: 0,
  bus: 0,
  truck: 0,
  total: 0
};

let temporizador = null;

const btnIniciar = document.getElementById('BotonIniciar');
const btnCerrar = document.getElementById('BotonCerrar');
const autoField = document.getElementById('autocount');
const busField = document.getElementById('buscount');
const camionField = document.getElementById('camioncount');
const totalField = document.getElementById('total');
const vehiculos = document.querySelectorAll('.vehiculo img');

desactivarVehiculos();
btnCerrar.disabled = true;

function actualizarVista() {
  autoField.value = conteo.car;
  busField.value = conteo.bus;
  camionField.value = conteo.truck;
  totalField.value = `$${conteo.total.toLocaleString()}`;
}

function activarVehiculos() {
  vehiculos.forEach(img => {
    img.dataset.activo = 'true';
    img.style.opacity = '1';
  });
}

function desactivarVehiculos() {
  vehiculos.forEach(img => {
    img.dataset.activo = 'false';
    img.style.opacity = '0.5';
  });
}

function cerrarAutomaticamente() {
  desactivarVehiculos();
  btnIniciar.disabled = false;
  btnCerrar.disabled = true;
  alert("⏰ Tiempo finalizado. El peaje ha sido cerrado automáticamente.");
}

btnIniciar.addEventListener('click', () => {
  conteo = { car: 0, bus: 0, truck: 0, total: 0 };
  actualizarVista();
  activarVehiculos();
  btnIniciar.disabled = true;
  btnCerrar.disabled = false;

  if (temporizador) clearTimeout(temporizador);
  temporizador = setTimeout(cerrarAutomaticamente, 60000);
});

btnCerrar.addEventListener('click', () => {
  desactivarVehiculos();
  btnIniciar.disabled = false;
  btnCerrar.disabled = true;

  if (temporizador) {
    clearTimeout(temporizador);
    temporizador = null;
  }
});

vehiculos.forEach(img => {
  img.addEventListener('click', () => {
    if (img.dataset.activo !== 'true') return;
    const tipo = img.alt.toLowerCase();
    if (TARIFAS[tipo] !== undefined) {
      conteo[tipo]++;
      conteo.total += TARIFAS[tipo];
      actualizarVista();
    }
  });
});