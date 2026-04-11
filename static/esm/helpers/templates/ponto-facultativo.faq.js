const modalNames = "facultativoHolidayModal";

export default `<!-- Modal -->
<div class="modal fade" id="${modalNames}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="${modalNames}Label" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-lg-down">
    <div class="modal-content">
      <div class="modal-header border-0 shadow">
        <h1 class="modal-title fs-5" id="${modalNames}Label">
          <div class="d-flex gap-2">
            <span><i class="bi bi-info-circle-fill text-warning"></i></span>
            <span>Ponto Facultativo</span>
          </div>
        </h1>
        
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      
      <div class="modal-body shadow-sm">
        <p>Ponto facultativo é um dia útil em que o empregador (público ou privado) decide se haverá expediente, não sendo feriado oficial. A dispensa é opcional, sem obrigatoriedade de folga ou pagamento em dobro, diferentemente dos feriados. É comum para emendas de feriados e datas comemorativas, sendo amplamente adotado no serviço público.</p>

        <h5>Principais Regras e Diferenças:</h5>

        <p>
          Setor Público: Geralmente há suspensão do expediente, exceto para serviços essenciais (saúde, segurança), conforme decreto do governo ou prefeitura.
          <br>
          Setor Privado: A empresa decide se funciona normalmente, libera os funcionários ou negocia a compensação de horas, sem pagamento extra.
        </p>

        <h5>Feriado x Ponto Facultativo:</h5>

        <p>
          O feriado é lei (descanso obrigatório), enquanto o ponto facultativo é uma decisão administrativa.
          <br>
          Exemplos: Carnaval, Quarta-feira de Cinzas, Corpus Christi (em muitos locais) e vésperas de feriados.
          <br><br>
          <em>Na dúvida, a recomendação é verificar o calendário municipal ou estadual e a política interna da empresa.</em>
        </p>
      </div>
      
      <div class="modal-footer">
        <button type="button" class="btn btn-warning" data-bs-dismiss="modal">OK</button>
      </div>
    </div>
  </div>
</div>
<!-- /Modal -->`;