import { heroRefs } from './hero';

function renderTrailer(movieKey) {
  heroRefs.hero.insertAdjacentHTML(
    'beforeEnd',
    `
  <div style="position: absolute; top: 10%; left: 10%; z-index: 999" class="player"><button id="closeTrailerBtn">Close</button><iframe width="720" height="360" src='https://www.youtube.com/embed/${movieKey}
  'frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
`
  );
  document.querySelector('#closeTrailerBtn').addEventListener('click', () => {
    heroRefs.hero.innerHTML = '';
  });
}

function renderSlide(backdrop_path, title, overview, vote_average, id) {
  document.querySelector('.swiper-wrapper').insertAdjacentHTML(
    'beforeEnd',
    `<div
    style="background-image: url('https://image.tmdb.org/t/p/original${backdrop_path}');
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat"
    class="swiper-slide">

    <div class="hero-title-wrap">
      <h1 class="hero-title" data-swiper-parallax="-300">${title}</h1>
    </div>
    <div class="hero-star-raiting" data-swiper-parallax="-350">
      <span ><div class="Stars" style="--rating: ${
        vote_average / 2
      }; " aria-label="Rating of this product is 2.3 out of 5."></span>
    </div>
    <div class="hero-description-wrap">
      <p class="hero-description" data-swiper-parallax="-400">${overview}</p>

    </div>
    <button type="button" class="hero-btn hero-btn-trailer" id="hero-btn-trailer" data-id="${id}" data-swiper-parallax="-450">
      Watch trailer
    </button>
    <button type="button" class="hero-btn hero-btn-more" id="hero-btn-more" data-swiper-parallax="-450">
      More details
    </button>
    </div>`
  );
}

function renderSwiper() {
  const markup = `<div style="width: 1080px; height: 600px" class="swiper">
  <div class="swiper-wrapper">

  </div>

  <div style="color: orange" class="swiper-button-prev"></div>
  <div style="color: orange" class="swiper-button-next"></div>`;

  heroRefs.hero.innerHTML = markup;
}

export { renderTrailer, renderSlide, renderSwiper };
