import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkupButton(currentPage) {
    return {
      next: `
        <button class="btn--inline pagination__btn--next" data-goto="${
          currentPage + 1
        }">
          <span>Page ${currentPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
        `,
      previous: `
        <button class="btn--inline pagination__btn--prev" data-goto="${
          currentPage - 1
        }">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${currentPage - 1}</span>
        </button>
        `,
    };
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    const btn = this._generateMarkupButton(currentPage);

    // Мы на странице 1 и есть другие страницы
    if (currentPage === 1 && numPages > 1) {
      return btn.next;
    }

    // Мы на последней странице
    if (currentPage === numPages && numPages > 1) {
      return btn.previous;
    }

    // Мы на других страницах
    if (currentPage < numPages) {
      return btn.next + btn.previous;
    }

    // Мы на странице 1 и нет других страниц
    return ``;
  }
}

export default new PaginationView();
