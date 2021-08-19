class Carousel {
    constructor(containerID = '#carousel', slide = '.slide', interval = 1500) {
        this.container = document.querySelector(containerID);
        this.slides = this.container.querySelectorAll(slide);
        this.interval = interval;
    }

    _initProps() {
        this.slidesCount = this.slides.length;
        this.LEFT_ARROW = 'ArrowLeft';
        this.RIGHT_ARROW = 'ArrowRight';
        this.SPACE = ' ';
        this.currentSlide = 0;
        this.isPlaing = true;
        this.timerId;
    }

    _initControls() {
        const controls = document.createElement('div');
        const pause = `<span id="pause-btn" class="control control-pause">PAUSE</span>`;
        const prev = `<span id="prev-btn" class="control control-prev">PREV</span>`;
        const next = `<span id="next-btn" class="control control-next">NEXT</span>`;

        controls.setAttribute('class', 'controls');
        controls.innerHTML = pause + prev + next;

        this.container.appendChild(controls);

        this.pauseBtn = this.container.querySelector('#pause-btn');
        this.prevBtn = this.container.querySelector('#prev-btn');
        this.nextBtn = this.container.querySelector('#next-btn');
    }

    _initIndicators() {
        const indicators = document.createElement('ol');
        indicators.setAttribute('class', 'indicators');
        for (let i = 0, n = this.slidesCount; i < n; i++) {
            const indicator = document.createElement('li');

            indicator.setAttribute('class', 'indicator');
            indicator.dataset.slideTo = `${i}`;
            i === 0 && indicator.classList.add('active')
            indicators.appendChild(indicator);
        }

        this.container.appendChild(indicators);

        this.indContainer = this.container.querySelector('.indicators');
        this.indItem = this.container.querySelectorAll('.indicator');
    }
    _initListener() {
        this.pauseBtn.addEventListener('click', this.pausePlay.bind(this));
        this.prevBtn.addEventListener('click', this.prev.bind(this));
        this.nextBtn.addEventListener('click', this.next.bind(this));
        this.indContainer.addEventListener('click', this.indicate.bind(this));
        document.addEventListener('kFeydown', this.pressKey.bind(this));
    }


    gotoSlide(n) {
        this.slides[this.currentSlide].classList.toggle('active');
        this.indItem[this.currentSlide].classList.toggle('active');
        this.currentSlide = (n + this.slidesCount) % this.slidesCount;
        this.slides[this.currentSlide].classList.toggle('active');
        this.indItem[this.currentSlide].classList.toggle('active');
    }

    nextSlide() {
        this.gotoSlide(this.currentSlide + 1)
    }

    prevSlide() {
        this.gotoSlide(this.currentSlide - 1);
    }

    pausePlay() {
        this.isPlaing ? this.pause() : this.play();
    }

    prev() {
        this.pause();
        this.prevSlide();
    }

    next() {
        this.pause();
        this.nextSlide()

    }

    pause() {
        if (this.isPlaing) {
            clearInterval(this.timerId);
            this.isPlaing = !this.isPlaing;
            this.pauseBtn.innerHTML = 'PLAY';
        }
    }

    play() {
        this.timerId = setInterval(() => this.nextSlide(), this.interval);
        this.isPlaing = !this.isPlaing;
        this.pauseBtn.innerHTML = 'PAUSE';
    }
    indicate(e) {
        let target = e.target;
        const index = target.dataset.slideTo;


        if (target && target.classList.contains('indicator')) {
            this.gotoSlide(+target.dataset.slideTo);
            this.pause();
        }

    }

    pressKey(e) {
        if (e.key === this.LEFT_ARROW) this.prev();
        if (e.key === this.RIGHT_ARROW) this.next();
        if (e.key === this.SPACE) this.pausePlay();
    }

    init() {
        this._initProps();
        this._initControls();
        this._initIndicators();
        this._initListener();
        this.timerId = setInterval(() => this.nextSlide(), this.interval);
    }
}


// function Carousel(containerID = '#carousel', slide = '.slide', interval = 1500) {
//     this.container = document.querySelector(containerID);
//     this.slides = this.container.querySelectorAll(slide);

//     this.interval = interval;
//     this.slidesCount = this.slides.length;
// }

// Carousel.prototype = {

//     _initProps() {
//         this.LEFT_ARROW = 'ArrowLeft';
//         this.RIGHT_ARROW = 'ArrowRight';
//         this.SPACE = ' ';
//         this.currentSlide = 0;
//         this.isPlaing = true;
//         this.timerId;
//     },


//     gotoSlide(n) {
//         this.slides[this.currentSlide].classList.toggle('active');
//         this.indItem[this.currentSlide].classList.toggle('active');
//         this.currentSlide = (n + this.slidesCount) % this.slidesCount;
//         this.slides[this.currentSlide].classList.toggle('active');
//         this.indItem[this.currentSlide].classList.toggle('active');
//     },

//     _initControls() {
//         const controls = document.createElement('div');
//         const pause = `<span id="pause-btn" class="control control-pause">PAUSE</span>`;
//         const prev = `<span id="prev-btn" class="control control-prev">PREV</span>`;
//         const next = `<span id="next-btn" class="control control-next">NEXT</span>`;

//         controls.setAttribute('class', 'controls');
//         controls.innerHTML = pause + prev + next;

//         this.container.appendChild(controls);

//         this.pauseBtn = this.container.querySelector('#pause-btn');
//         this.prevBtn = this.container.querySelector('#prev-btn');
//         this.nextBtn = this.container.querySelector('#next-btn');
//     },

//     _initIndicators() {
//         const indicators = document.createElement('ol');
//         indicators.setAttribute('class', 'indicators');
//         for (let i = 0, n = this.slidesCount; i < n; i++) {
//             const indicator = document.createElement('li');

//             indicator.setAttribute('class', 'indicator');
//             indicator.dataset.slideTo = `${i}`;
//             i === 0 && indicator.classList.add('active')
//             indicators.appendChild(indicator);
//         }

//         this.container.appendChild(indicators);

//         this.indContainer = this.container.querySelector('.indicators');
//         this.indItem = this.container.querySelectorAll('.indicator');
//     },

//     _initListener() {
//         this.pauseBtn.addEventListener('click', this.pausePlay.bind(this));
//         this.prevBtn.addEventListener('click', this.prev.bind(this));
//         this.nextBtn.addEventListener('click', this.next.bind(this));
//         this.indContainer.addEventListener('click', this.indicate.bind(this));
//         document.addEventListener('keydown', this.pressKey.bind(this));

//     },

//     nextSlide() {
//         this.gotoSlide(this.currentSlide + 1)
//     },

//     prevSlide() {
//         this.gotoSlide(this.currentSlide - 1);
//     },

//     pausePlay() {
//         this.isPlaing ? this.pause() : this.play();
//     },

//     prev() {
//         this.pause();
//         this.prevSlide();
//     },

//     next() {
//         this.pause();
//         this.nextSlide()

//     },

//     pause() {
//         if (this.isPlaing) {
//             clearInterval(this.timerId);
//             this.isPlaing = !this.isPlaing;
//             this.pauseBtn.innerHTML = 'PLAY';
//         }
//     },

//     play() {
//         this.timerId = setInterval(() => this.nextSlide(), this.interval);
//         this.isPlaing = !this.isPlaing;
//         this.pauseBtn.innerHTML = 'PAUSE';
//     },
//     indicate(e) {
//         let target = e.target;
//         const index = target.dataset.slideTo;


//         if (target && target.classList.contains('indicator')) {
//             this.gotoSlide(+target.dataset.slideTo);
//             this.pause();
//         }

//     },

//     pressKey(e) {
//         if (e.key === this.LEFT_ARROW) this.prev();
//         if (e.key === this.RIGHT_ARROW) this.next();
//         if (e.key === this.SPACE) this.pausePlay();
//     },

//     init() {
//         this._initIndicators();
//         this._initControls();
//         this._initProps();
//         this._initListener();
//         this.timerId = setInterval(() => this.nextSlide(), this.interval);
//     }
// };

// function SwipeCarousel() {
//     Carousel.apply(this, arguments);
// };

// SwipeCarousel.prototype = Object.create(Carousel.prototype);
// SwipeCarousel.prototype.constructor = SwipeCarousel;

// SwipeCarousel.prototype._swipeStart = function (e) {
//     this.swipeStartX = e.changedTouches[0].pageX;
// };

// SwipeCarousel.prototype._swipeEnd = function (e) {
//     this.swipeEndX = e.changedTouches[0].pageX;


//     if (this.swipeStartX - this.swipeEndX > 100) this.prev();
//     if (this.swipeStartX - this.swipeEndX < -100) this.next();
// };

// SwipeCarousel.prototype._initListener = function () {
//     Carousel.prototype._initListener.apply(this);
//     this.container.addEventListener('touchstart', this._swipeStart.bind(this));
//     this.container.addEventListener('touchend', this._swipeEnd.bind(this));
// };
