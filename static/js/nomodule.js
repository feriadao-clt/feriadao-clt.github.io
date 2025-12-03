(function(w) {
  $(w).on("load", function(evt) {
    $(document.body).html(
      '<div class="position-fixed top-0 start-0 w-100 h-100" data-bs-theme="dark">' +
      '<div class="position-absolute top-50 start-0 w-100 translate-middle-y px-3">' +
      '<div class="row justify-content-center">' +
      '<div class="col-sm-6">' +
      '<h3><span class="text-danger me-2"><i class="bi bi-exclamation-circle-fill"></i></span>Atualizar Navegador</h3>' +
      '<p>Para acessar este site é necessário atualizar seu Navegador!</p>' +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>"
    );
    
    $("#loader").fadeOut();
  });
})(this);