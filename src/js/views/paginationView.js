import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }
  /**
   *
   * @returns an HTML code is added to the html file so that in accordance to the current page either an arrow for the next or the previous is generated in the menu
   */
  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    if (curPage === 1 && numPages > 1) {
      return `${this._nextPageButton(curPage)}${this._pagesIndication(
        curPage,
        numPages
      )}`;
    }

    if (curPage === numPages && numPages > 1) {
      return `${this._pagesIndication(
        curPage,
        numPages
      )}${this._previousPageButton(curPage)}`;
    }

    if (curPage < numPages) {
      return this._previousAndNextPageButton(curPage, numPages);
    }

    return '';
  }

  _nextPageButton = function (curPage) {
    return `
        <button data-goto="${
          curPage + 1
        }" class="btn--inline pagination__btn--next">
          <span>Page ${curPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
  };
  _previousPageButton = function (curPage) {
    return `
    <button data-goto="${
      curPage - 1
    }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${curPage - 1}</span>
    </button>
  `;
  };

  _previousAndNextPageButton = function (curPage, numPages) {
    return `${this._previousPageButton(curPage)}${this._pagesIndication(
      curPage,
      numPages
    )}${this._nextPageButton(curPage)}`;
  };

  _pagesIndication = function (curPage, numPages) {
    return `<small class="page--outof--page">${curPage}/${numPages}</small>`;
  };
}

export default new PaginationView();
