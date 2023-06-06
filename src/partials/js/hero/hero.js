import Swiper from 'swiper/swiper-bundle';
import 'swiper/swiper-bundle.css';

import { renderSlide, renderSwiper } from '../hero/heroUi';
import { renderTrailer } from './trailer-modal';
import { getTrending, getMovie } from '../api';

const heroRefs = {
  hero: document.querySelector('.hero'),
  backDropRef: document.querySelector('.hero-trailer-backdrop'),
  trailerRef: document.querySelector('.trailer-container'),
  trailerBtn: document.querySelector('.modal-trailer-btn'),
};

let swiper = null;

heroHandler();

async function heroHandler() {
  try {
    const movieArr = await getTopMoviesArr(5);

    if (movieArr.length === 0) console.log('sorry nothing found');

    renderSwiper();

    await movieArr.map(
      ({ backdrop_path, title, overview, vote_average, id, name }) => {
        renderSlide(backdrop_path, title, overview, vote_average, id, name);
      }
    );

    swiperInit();
  } catch (error) {
    console.log(error.message);
  }
}

async function getTopMoviesArr(numberOfMovies) {
  try {
    const data = await getTrending();
    return data.results.slice(0, numberOfMovies);
  } catch (error) {
    console.log(error.message);
  }
}

function swiperInit() {
  swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    loop: true,
    speed: 2000,
    parallax: true,
    spaceBetween: 0,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
}

heroRefs.hero.addEventListener('click', onWatchTrailer);

async function getTrailerByFilmId(id) {
  try {
    const movieData = await getMovie(id);
    const trailerKey = movieData.results[0].key;
    renderTrailer(trailerKey);
  } catch (err) {
    heroRefs.hero.insertAdjacentHTML(
      'beforeEnd',
      `
    <div style="position: absolute" class="player"><iframe width="150" height="75" src='http://www.youtube.com/embed/zwBpUdZ0lrQ' frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
      `
    );
    console.log(err.message);
  }
}

function onWatchTrailer(e) {
  if (e.target.classList.contains('hero-btn-trailer')) {
    const dataId = e.target.dataset.id;
    getTrailerByFilmId(dataId);
    swiper.autoplay.stop();
  }
}

export { heroRefs };
export { swiper };
