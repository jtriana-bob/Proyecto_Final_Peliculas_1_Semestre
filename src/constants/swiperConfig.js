import { Pagination, Autoplay, EffectCoverflow, Navigation } from "swiper/modules";

export const swiperConfig = {
    modules: [Pagination, Autoplay, EffectCoverflow, Navigation],
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    centeredSlidesBounds: true,
    slidesPerView: 3,
    loop: true,
    loopAdditionalSlides: 3,
    coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 140,
        modifier: 1.8,
        slideShadows: false,
    },
    pagination: { clickable: true },
    autoplay: { delay: 3500, disableOnInteraction: false },
    navigation: {
        nextEl: ".swiper-next",
        prevEl: ".swiper-prev",
    },
    breakpoints: {
        0: { slidesPerView: 1.3 },
        640: { slidesPerView: 2.2 },
        1024: { slidesPerView: 3 },
        1280: { slidesPerView: 4 },
    },
};
