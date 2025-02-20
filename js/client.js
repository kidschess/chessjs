const COLOR_WAIT = "#42c2f4";
const COLOR_OK = "#1f7f39";
const COLOR_ERROR = "#c43131";
const setMessage = function (message) {
  consola.innerHTML = message;
};
var active = false;
const startListener = function () {
  if (active) return;
  active = true;
  wsConn = new WebSocket("ws://" + window.location.hostname + ":20001/");

  wsConn.onopen = function () {
    setMessage("Active", COLOR_OK);
  };
  wsConn.onclose = function (e) {
    setMessage("Disconn. " + JSON.stringify(e), COLOR_ERROR);
    active = false;
  };
  wsConn.onerror = function (e, code) {
    setMessage("ERROR " + code + e, COLOR_ERROR);
  };
  wsConn.onmessage = function (message) {
    try {
      var datos = JSON.parse(message.data);
      setMessage(datos.msj);
      if (datos.cursor) {
        var texto = "";
        for (var i = 0; i < datos.cursor.y; i++) texto += "<br/>";
        for (var i = 0; i < datos.cursor.x; i++) texto += "&nbsp;";
        texto += "<span>_</span>";
        cursor.innerHTML = texto;
      }
    } catch (e) {
      setMessage("MSG ERROR", COLOR_ERROR);
    }
  };
};
cursor.alt = false;
setInterval(function () {
  if (cursor.alt) {
    cursor.className = "";
  } else {
    cursor.className = "alt";
  }
  cursor.alt = !cursor.alt;
}, 50);

const rotarContenedor = function () {
  contenedor.style.width = window.innerHeight + "px";
  contenedor.style.height = window.innerWidth + "px";
  contenedor.style.top = "-" + window.innerWidth + "px";
  contenedor.className = "rotado";
  startListener();
};
//contenedor.addEventListener("click", rotarContenedor);
setTimeout(rotarContenedor, 500);
