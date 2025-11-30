/* EJERCICIO 3 — error con eval */
function ej3() {
  let n = document.getElementById("e3_input").value;
  try {
    let r = eval(n);
    document.getElementById("e3_out").textContent = r;
  } catch (e) {
    document.getElementById("e3_out").textContent = e.name + " - " + e.message;
  }
}

/* EJERCICIO 4 — SyntaxError con JSON.parse */
function ej4() {
  let t = document.getElementById("e4_input").value;
  try {
    let o = JSON.parse(t);
    document.getElementById("e4_out").textContent = JSON.stringify(o, null, 2);
  } catch (e) {
    document.getElementById("e4_out").textContent = e.name + "\n" + e.message;
  }
}

/* EJERCICIO 5 — error en console.log y uso de finally */
function ej5() {
  let m = document.getElementById("e5_input").value;
  let o = console.log;
  try {
    console.log = null;
    console.log(m);
  } catch (e) {
    document.getElementById("e5_out").textContent = "falló\n" + e.message;
  } finally {
    console.log = o;
  }
}

/* EJERCICIO 6 — validarEdad */
function ej6() {
  let v = document.getElementById("e6_input").value;
  try {
    let n = Number(v);
    if (isNaN(n) || n < 0) throw new Error("Edad inválida");
    document.getElementById("e6_out").textContent = "Edad válida: " + n;
  } catch (e) {
    document.getElementById("e6_out").textContent = e.message;
  }
}

/* EJERCICIO 7 — capturar TypeError */
function ej7() {
  try {
    let x = null;
    let r = x.nombre;
    document.getElementById("e7_out").textContent = r;
  } catch (e) {
    if (e instanceof TypeError) {
      document.getElementById("e7_out").textContent =
        "Se atrapó un TypeError: " + e.message;
    } else {
      document.getElementById("e7_out").textContent =
        "Se atrapó otro tipo de error: " + e.message;
    }
  }
}

/* EJERCICIO 8 — propagación de errores */
function nivel2() {
  try {
    throw new ReferenceError("x is not defined");
  } catch (e) {
    console.log("Nivel 2 atrapó el error: " + e.message);
    throw e;
  }
}

function nivel1() {
  try {
    nivel2();
  } catch (e) {
    console.log("Nivel 1 recibió el error: " + e.message);
    throw e;
  }
}

function ej8() {
  try {
    nivel1();
  } catch (e) {
    document.getElementById("e8_out").textContent =
      "Nivel 2 atrapó el error: x is not defined\n" +
      "Nivel 1 recibió el error: x is not defined\n" +
      "ERROR FINAL capturado en el nivel superior: " + e.message;
  }
}

/* EJERCICIO 9 — callback cargarMensaje */
function cargarMensaje(cb) {
  setTimeout(() => cb("Mensaje cargado"), 1000);
}

function ej9() {
  document.getElementById("e9_out").textContent = "cargando...";
  cargarMensaje((msg) => {
    document.getElementById("e9_out").textContent = msg;
  });
}

/* EJERCICIO 10 — callback cargarUsuario */
function cargarUsuario(cb) {
  let t = 800 + Math.random() * 700;
  setTimeout(() => cb({ id: 1, nombre: "Juancito" }), t);
}

function ej10() {
  document.getElementById("e10_out").textContent = "cargando...";
  cargarUsuario((u) => {
    document.getElementById("e10_out").textContent =
      "Usuario: " + u.nombre + " (ID: " + u.id + ")";
  });
}

/* EJERCICIO 11 — callback dividirAsync */
function dividirAsync(a, b, cb) {
  setTimeout(() => {
    if (b === 0) cb(new Error("No se puede dividir entre cero"), null);
    else cb(null, a / b);
  }, 1500);
}

function ej11() {
  let a = Number(document.getElementById("e11_a").value);
  let b = Number(document.getElementById("e11_b").value);
  document.getElementById("e11_out").textContent = "esperando...";

  dividirAsync(a, b, (err, res) => {
    if (err)
      document.getElementById("e11_out").textContent = "Error: " + err.message;
    else document.getElementById("e11_out").textContent = a + " / " + b + " = " + res;
  });
}

/* EJERCICIO 12 — callback procesarLista */
function procesarLista(arr, cb) {
  let pendientes = arr.length;

  arr.forEach((n) => {
    let t = 500 + Math.random() * 1000;

    document.getElementById("e12_out").textContent +=
      "Procesando " + n + "...\n";

    setTimeout(() => {
      document.getElementById("e12_out").textContent += "Listo " + n + "\n";
      pendientes--;
      if (pendientes === 0) cb("Proceso completado");
    }, t);
  });
}

function ej12() {
  let arr = document.getElementById("e12_input").value.split(",").map(Number);
  document.getElementById("e12_out").textContent = "";

  procesarLista(arr, (msg) => {
    document.getElementById("e12_out").textContent += msg;
  });
}

/* EJERCICIO 13 — promesa cargarMensaje */
function cargarMensajePromise() {
  return new Promise((res) => {
    setTimeout(() => res("Mensaje cargado (promesa)"), 1000);
  });
}

function ej13() {
  document.getElementById("e13_out").textContent = "esperando...";
  cargarMensajePromise().then((msg) => {
    document.getElementById("e13_out").textContent = msg;
  });
}

/* EJERCICIO 14 — promesa cargarUsuario */
function cargarUsuarioPromise() {
  return new Promise((res) => {
    let t = 800 + Math.random() * 700;
    setTimeout(() => res({ id: 2, nombre: "Pepito" }), t);
  });
}

function ej14() {
  document.getElementById("e14_out").textContent = "cargando...";
  cargarUsuarioPromise().then((u) => {
    document.getElementById("e14_out").textContent =
      "Usuario: " + u.nombre + " (ID:" + u.id + ")";
  });
}

/* EJERCICIO 15 — promesa dividir */
function dividirPromesa(a, b) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (b === 0) rej(new Error("No se puede dividir entre cero"));
      else res(a / b);
    }, 1500);
  });
}

function ej15() {
  let a = Number(document.getElementById("e15_a").value);
  let b = Number(document.getElementById("e15_b").value);
  document.getElementById("e15_out").textContent = "esperando...";

  dividirPromesa(a, b)
    .then((r) => {
      document.getElementById("e15_out").textContent = a + " / " + b + " = " + r;
    })
    .catch((e) => {
      document.getElementById("e15_out").textContent = "Error: " + e.message;
    });
}

/* EJERCICIO 16 — promesa procesarLista */
function procesarNumeroPromesa(n) {
  return new Promise((res) => {
    let t = 500 + Math.random() * 1000;

    document.getElementById("e16_out").textContent +=
      "Procesando " + n + "...\n";

    setTimeout(() => {
      document.getElementById("e16_out").textContent += "Listo " + n + "\n";
      res(n);
    }, t);
  });
}

function ej16() {
  let arr = document.getElementById("e16_input").value.split(",").map(Number);
  document.getElementById("e16_out").textContent = "";

  Promise.all(arr.map((n) => procesarNumeroPromesa(n))).then(() => {
    document.getElementById("e16_out").textContent += "Proceso completado";
  });
}

/* EJERCICIO 17 — async/await cargarMensaje */
async function ej17() {
  document.getElementById("e17_out").textContent = "esperando...";
  let r = await cargarMensajePromise();
  document.getElementById("e17_out").textContent = r;
}

/* EJERCICIO 18 — async/await cargarUsuario */
async function ej18() {
  document.getElementById("e18_out").textContent = "cargando...";
  let u = await cargarUsuarioPromise();
  document.getElementById("e18_out").textContent =
    "Usuario: " + u.nombre + " (ID:" + u.id + ")";
}

/* EJERCICIO 19 — async/await dividir */
async function ej19() {
  let a = Number(document.getElementById("e19_a").value);
  let b = Number(document.getElementById("e19_b").value);
  document.getElementById("e19_out").textContent = "esperando...";

  try {
    let r = await dividirPromesa(a, b);
    document.getElementById("e19_out").textContent = a + " / " + b + " = " + r;
  } catch (e) {
    document.getElementById("e19_out").textContent = "Error: " + e.message;
  }
}

/* EJERCICIO 20 — async/await procesarLista */
async function ej20() {
  let arr = document.getElementById("e20_input").value.split(",").map(Number);
  let out = document.getElementById("e20_out");
  out.textContent = "";

  for (let n of arr) {
    let t = 500 + Math.random() * 1000;

    out.textContent += "Procesando " + n + "...\n";

    await new Promise((res) => setTimeout(res, t));

    out.textContent += "Listo " + n + "\n";
  }

  out.textContent += "Proceso completado";
}
