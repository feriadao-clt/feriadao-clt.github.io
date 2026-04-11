const modalNames = "estadualHolidayModal";

export default `<!-- Modal -->
<div class="modal fade" id="${modalNames}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="${modalNames}Label" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-lg-down">
    <div class="modal-content">
      <div class="modal-header border-0 shadow">
        <h1 class="modal-title fs-5" id="${modalNames}Label">
          <div class="d-flex gap-2">
            <span><i class="bi bi-info-circle-fill text-danger"></i></span>
            <span>Feriado Estadual</span>
          </div>
        </h1>
        
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      
      <div class="modal-body shadow-sm">
        <p>Feriado estadual é um dia de descanso oficial, definido por lei estadual, válido apenas dentro dos limites territoriais de um estado específico. Diferente dos nacionais, ele comemora datas históricas ou culturais locais, impactando o funcionamento de órgãos públicos e empresas privadas em toda a unidade federativa.</p>

        <h5>O que é feriado estadual (Detalhes):</h5>

        <p>Definição Legal: Estabelecido pela constituição ou leis de cada estado, com autonomia para escolha das datas.</p>

        <h5>Exemplos no Brasil:</h5>

        <p>
          Ceará: Data Magna (25 de março - abolição da escravidão).
          <br>
          São Paulo: Revolução Constitucionalista (9 de julho).
          <br>
          Rio de Janeiro: Dia de São Jorge (23 de abril).
          <br>
          Funcionamento: Serviços essenciais geralmente funcionam em regime de plantão, enquanto comércio e serviços não essenciais podem ter horários especiais ou fechar.
        </p>

        <h5>Sinônimos de feriado estadual:</h5>

        <p>
          Feriado regional
          <br>
          Feriado estadual civil ou religioso
        </p>

        <h5>Uso e Impacto:</h5>

        <p>
          Garante ao trabalhador descanso remunerado.
          <br>
          Se o trabalho for exigido, o funcionário tem direito a folga compensatória ou pagamento em dobro.
          <br>
          Pode ser confundido com ponto facultativo, mas o feriado é uma obrigatoriedade legal de folga.
        </p>
      </div>
      
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">OK</button>
      </div>
    </div>
  </div>
</div>
<!-- /Modal -->`;