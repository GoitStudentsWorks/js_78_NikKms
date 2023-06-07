import { refs } from '../refs';
import { saveLocal } from './catalogUtils';

export default class Pagination {
  constructor(totalPages, page, getMovies) {
    this.totalPages = totalPages;
    this.currentPage = page;
    this.getMovies = getMovies;
    this.arrPaginationItems = [];
  }

  createButton = () => {
    if (this.totalPages <= 1) {
      this.reset();
      return;
    }

    this.arrPaginationItems = [];

    this.addFirstPages(this.arrPaginationItems);
    if (this.totalPages > 6) {
      this.addEllipsisIfNeeded(this.arrPaginationItems);
      this.addMiddlePages(this.arrPaginationItems);
      this.addEllipsisIfNeeded(this.arrPaginationItems, true);
      this.addLastPage(this.arrPaginationItems);
    }

    const markup = this.createPagination(this.arrPaginationItems.join(''));
    this.render(markup);
    saveLocal('currentPage', this.currentPage);
    this.getMovies(this.currentPage);
  };

  addFirstPages = arr => {
    for (let page = 1; page <= Math.min(3, this.totalPages); page++) {
      const activeEl = this.currentPage === page ? 'btn-active' : '';
      const btn = this.createPaginationItem(page, activeEl);
      arr.push(btn);
    }
  };

  addMiddlePages = arr => {
    const startPage = Math.max(4, this.currentPage - 2);
    const endPage = Math.min(this.currentPage + 1, this.totalPages - 1);
    for (let page = startPage; page <= endPage; page++) {
      const activeEl = this.currentPage === page ? 'btn-active' : '';
      const btn = this.createPaginationItem(page, activeEl);
      arr.push(btn);
    }
  };

  addEllipsisIfNeeded = (arr, atEnd = false) => {
    if (
      (atEnd && this.currentPage < this.totalPages - 2) ||
      (!atEnd && this.currentPage > 3)
    ) {
      arr.push('<li class="pagination-item">...</li>');
    }
  };

  addLastPage = arr => {
    const lastPage = this.totalPages;
    const activeEl = this.currentPage === lastPage ? 'btn-active' : '';
    const btn = this.createPaginationItem(lastPage, activeEl);
    arr.push(btn);
  };

  createPaginationItem = (page, activeClass) => {
    return `<li class='pagination-item ${activeClass}'>
              <a href='#' data-page='${page}' class='pagination-btn'>${page}</a>
            </li>`;
  };

  createPagination = paginationItems => {
    const paginationContainer = `
      <div class='pagination ${
        this.totalPages <= 1 ? 'pagination-hidden' : ''
      }'>
        <div class="pagination-arrows ${
          this.totalPages <= 1 ? 'pagination-arrows-hidden' : ''
        }">
          <button type="button" class='pagination-arrow pagination-arrows-prev'>prev</button>
          <button type="button" class='pagination-arrow pagination-arrows-next'>next</button>
        </div>
        <ul class='pagination-list'>${paginationItems}</ul>
      </div>`;
    return paginationContainer;
  };

  render = pagination => {
    this.reset();
    refs.catalogFilms.insertAdjacentHTML('afterend', pagination);
    const el = document.querySelector('.pagination');
    const paginationContainer = document.querySelector('.pagination');

    el.addEventListener('click', this.handlerBtn);
    paginationContainer.addEventListener('click', this.arrowHandler);

    const prevButton = document.querySelector(
      '.pagination-arrow.pagination-arrows-prev'
    );
    if (this.currentPage === 1) {
      prevButton.style.display = 'none';
    } else {
      prevButton.style.display = 'block';
    }

    const nextButton = document.querySelector(
      '.pagination-arrow.pagination-arrows-next'
    );
    if (this.currentPage === this.totalPages) {
      nextButton.style.display = 'none';
    } else {
      nextButton.style.display = 'block';
    }
  };

  arrowHandler = e => {
    const targetEl = e.target;

    if (targetEl.classList.contains('pagination-arrows-prev')) {
      this.prev();
    }
    if (targetEl.classList.contains('pagination-arrows-next')) {
      this.next();
    }
  };

  reset = () => {
    const el = document.querySelector('.pagination');
    if (el) el.remove();
  };

  prev = () => {
    if (this.currentPage === 1) return;
    this.currentPage -= 1;
    this.createButton();

    const prevButton = document.querySelector(
      '.pagination-arrow.pagination-arrows-prev'
    );
    if (this.currentPage === 1) {
      prevButton.style.display = 'none';
    } else {
      prevButton.style.display = 'block';
    }
  };

  next = () => {
    if (this.currentPage === this.totalPages) return;
    this.currentPage += 1;
    this.createButton();

    const nextButton = document.querySelector(
      '.pagination-arrow.pagination-arrows-next'
    );
    if (this.currentPage === this.totalPages) {
      nextButton.style.display = 'none';
    } else {
      nextButton.style.display = 'block';
    }
  };

  handlerBtn = e => {
    e.preventDefault();
    const page = parseInt(e.target.dataset.page);
    if (!isNaN(page)) {
      this.currentPage = page;
      this.createButton();
    }
  };
}
