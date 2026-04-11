const modalNames = "dialogAuthorModal"

export default `<!-- Modal -->
<div class="modal fade" id="${modalNames}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="${modalNames}Label" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-lg-down">
    <div class="modal-content">
      <div class="modal-header border-0 shadow">
        <h1 class="modal-title fs-5" id="${modalNames}Label">
          <div class="d-flex gap-2">
            <span><i class="bi bi-info-circle-fill"></i></span>
            <span>ABOUT</span>
          </div>
        </h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      
      <div class="modal-body shadow-sm mh-100 overflow-y-scroll">
        <div class="d-table w-100 h-100 py-3" style="min-height: 100%;">
          <div class="d-table-cell align-middle">
            <div class="text-center">
              <div class="mb-3">
                <img src="/static/svg/puzzle.svg" alt="Puzzle icon">
              </div>
              
              <h3 class="fw-bold">Delvani Software</h3>
              
              <p>(c) ${moment().year()} Delvani, All rights reserved.</p>
              <p class="small m-0">
                <a class="text-decoration-none" href="//maps.google.com/?cid=6541733770786175250">
                  <span><i class="bi bi-geo-alt-fill text-danger"></i></span>
                  <span class="mx-1"></span>
                  <span>ITAREMA, CE - BR</span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-light" data-bs-dismiss="modal">OK</button>
      </div>
    </div>
  </div>
</div>
<!-- /Modal -->`;