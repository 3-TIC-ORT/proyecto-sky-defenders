connect2Server(3000);

const items = document.querySelectorAll(".item img");
let index = -1;

function actualizarSeleccion() {
  items.forEach((img, i) => {
    if (i === index) {
      img.classList.add("seleccionado");
    } else {
      img.classList.remove("seleccionado");
    }
  });
}
actualizarSeleccion();

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    index = (index + 1) % items.length;
    actualizarSeleccion();
  }
  if (e.key === "ArrowLeft") {
    index = (index - 1 + items.length) % items.length;
    actualizarSeleccion();
  }
  if (e.key === "Enter") {
    const a = items[index].parentElement;
    a.click();
  }
});

let señal;

subscribeRealTimeEvent("nuevaSeñal", (data) => {
    if (data) {
      const texto = data; 
    señal =
        texto.señal === "1"
        ? "1"
        : texto.señal === "7"
        ? "7"
        : texto.señal === "b1"
        ? "b1"
        : texto.señal === "b2"
        ? "b2"
        : null;
    
    console.log(señal);
    
      if (!señal) return; 
      if (señal === "1"){
        index = (index + 1) % items.length;
        actualizarSeleccion();
      }
      if (señal === "7"){
        index = (index - 1 + items.length) % items.length;
        actualizarSeleccion();
      }
      if (señal === "b1"){
        const a = items[index].parentElement;
        a.click();
      }
      if (señal === "b2"){
        window.location.href = "../html/inicio.html";
      }
    }
});
