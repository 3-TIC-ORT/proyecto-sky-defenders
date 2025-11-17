connect2Server(3000);

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
        : null;
  
    console.log(señal);
  
      if (!señal) return;
    }
  });
  