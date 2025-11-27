
function ej3() {
  let n = document.getElementById("e3_input").value;
  try {
    let r = eval(n);
    document.getElementById("e3_out").textContent = r;
  } catch (e) {
    document.getElementById("e3_out").textContent = e.name + " - " + e.message;
  }
}

function ej4() {
  let t = document.getElementById("e4_input").value;
  try {
    let o = JSON.parse(t);
    document.getElementById("e4_out").textContent = JSON.stringify(o, null, 2);
  } catch (e) {
    document.getElementById("e4_out").textContent = e.name + "\n" + e.message;
  }
}

function ej5() {
  let m = document.getElementById("e5_input").value;
  let o = console.log;
  try {
    console.log = null;
    console.log(m);
  } catch (e) {
    document.getElementById("e5_out").textContent = "falló\n" + e.message;
  } 
}

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

function ej7() {
  try {
    let x = null;
    let r = x.nombre;
    document.getElementById("e7_out").textContent = r;
  } catch (e) {
    if (e instanceof TypeError) {
      document.getElementById("e7_out").textContent = "Se atrapó un TypeError: " + e.message;
    } else {
      document.getElementById("e7_out").textContent = "Se atrapó otro tipo de error: " + e.message;
    }
  }
}