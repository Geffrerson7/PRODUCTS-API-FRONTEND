function validate(params) {
    let c = 0;
    params.forEach((value) => {
      if (value === "") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "¡Lo ingresado es inválido!",
        });
        c++;
      }
    });
    return c===0;
  }

  export default validate;