const modalNames = "comemorativaHolidayModal";

export default `<!-- Modal -->
<div class="modal fade" id="${modalNames}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="${modalNames}Label" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-lg-down">
    <div class="modal-content">
      <div class="modal-header border-0 shadow">
        <h1 class="modal-title fs-5" id="${modalNames}Label">
          <div class="d-flex gap-2">
            <span><i class="bi bi-info-circle-fill text-success"></i></span>
            <span>Datas Comemorativas</span>
          </div>
        </h1>
        
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      
      <div class="modal-body shadow-sm">
        <p>Datas comemorativas são dias específicos no calendário dedicados a celebrar acontecimentos históricos, conceitos, figuras ilustres, tradições religiosas ou causas sociais. Elas promovem a reflexão, preservam a cultura, reforçam a identidade nacional e, frequentemente, impactam a economia e o planejamento escolar ou de trabalho.</p>

        <h5>Características Principais:</h5>

        <p>
          Finalidade: Podem servir para celebrar (Natal), refletir (Dia da Consciência Negra) ou conscientizar sobre temas (Dia Mundial do Meio Ambiente).
          <br>
          Origem: Estabelecidas por governos, pela ONU, conselhos profissionais ou pelo senso popular.
          <br>
          Abrangência: Variam entre feriados nacionais (7 de setembro), datas internacionais (Dia da Mulher) ou comemorações temáticas/curiosas (Dia do Circo).
        </p>

        <h5>Exemplos no Brasil:</h5>

        <p>
          Históricas/Cívicas: Proclamação da República (15/11), Independência do Brasil (07/09).
          <br>
          Sociais/Conscientização: Dia da Consciência Negra (20/11), Dia das Mães (2º domingo de maio).
          <br>
          Religiosas/Tradições: Natal (25/12), Páscoa, Carnaval.
          <br><br>
          Essas datas são cruciais para a gestão de pessoas nas empresas e no calendário escolar, organizando o ano letivo e impactando o comércio.
        </p>
      </div>
      
      <div class="modal-footer">
        <button type="button" class="btn btn-success" data-bs-dismiss="modal">OK</button>
      </div>
    </div>
  </div>
</div>
<!-- /Modal -->`;