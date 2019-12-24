/*Main animate*/

document.addEventListener('DOMContentLoaded', function () {
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;

    let shdw_blck = document.getElementById('RDCLR_black');
    let shdw_obvdk = document.getElementById('HOME_obvodka');

    let left = 0;
    let top = 0;

    let nLeft = 0;
    let nTop = 0;

    function animate() {
        left += (nLeft - left)/20;
        top += (nTop - top)/20;

        shdw_blck.style.transform = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
        shdw_obvdk.style.transform = 'translate3d(' + left + 'px, ' + top + 'px, 0)';

        requestAnimationFrame(animate);
    }
    animate();

    document.addEventListener('mousemove', function (event) {
        nLeft = ((event.clientX - windowWidth / 2)*0.04);
        nTop = ((event.clientY - windowHeight / 2)*0.05);
    });

});





/*Slider*/

document.addEventListener('DOMContentLoaded', function () {
    const sliders = document.querySelectorAll('.slider');

    for (let i = 0; i < sliders.length; i++) {
        createSlider(sliders[i]);
    }
});

function createSlider(slider) {
    const slides = slider.querySelectorAll('.slide');

    if (slides.length < 2) return;

    const wrapper = slider.querySelector('.slider-wrapper');
    const prevButton = slider.querySelector('.prev-button');
    const nextButton = slider.querySelector('.next-button');

    if (!prevButton && !nextButton) return;

    let width = 0;

    function resize() {
        width = slider.scrollWidth;
    }
    resize();
    document.addEventListener('resize', resize);

    let activeSlide = 0;

    slides[activeSlide].classList.add('active');

    if (prevButton) prevButton.addEventListener('click', function () {

        activeSlide--;

        if (activeSlide < 0) activeSlide = slides.length - 1;

        wrapper.style.transform = `translate3d(-${width * activeSlide}px, 0, 0)`;
    });

    if (nextButton) nextButton.addEventListener('click', function () {

        activeSlide++;

        if (activeSlide > slides.length - 1) activeSlide = 0;

        wrapper.style.transform = `translate3d(-${width * activeSlide}px, 0, 0)`;
    })
}




/*Header*/


/* document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('header');

    if (!header) return;

    let hidden = false;

    function handleScroll() {
        const scrolled = window.scrollY;

        if (scrolled > 50) {
            if (!hidden) {

                header.classList.add('hidden');
                hidden = true;

            } else {
                if (hidden) {
                    header.classList.remove('hidden');
                    hidden = false;
                }
            }
        }

        handleScroll();

        window.addEventListener('scroll', handleScroll);
    })
*/


/*Form*/

document.addEventListener('DOMContentLoaded', function () {
    const forms = document.querySelectorAll('form');
    const messageField = document.querySelector('.message-text');

    const overlay = document.querySelector('.overlay');

    if (!messageField || !overlay) return;

    overlay.addEventListener('click', function () {
        document.documentElement.classList.remove('popupActive');
    });

    Array.from(forms).forEach(form => createForm(form, messageField));
});

function createForm(form, mess) {
    const action = form.action;
    const elements = form.elements;

    if (!action || !elements.length) return;

    function validate() {
        let result = true;

        for (let i = 0; elements.length > i; i++) {
            let el = elements[i];

            if (!el.dataset['required']) continue;

            if (el.type === 'email' || el.type === 'tel' || el.tagName.toLocaleLowerCase() === 'textarea') {
                if (!el.value) {
                    el.classList.add('error');
                    el.addEventListener('input', () => {
                        el.classList.remove('error')
                    });
                    result = false;
                }
            }

            if (el.type ==='checkbox') {
                if (!el.checked) {
                    el.classList.add('error');
                    el.addEventListener('change', () => {
                        el.classList.remove('error')
                    });
                    result = false;
                }
            }

            if (el.tagName.toLocaleLowerCase() === 'select'){
                if (el.selectedIndex === 0) {
                    el.classList.add('error');
                    el.addEventListener('change', () => {
                        el.classList.remove('error')
                    });
                    result = false;
                }
            }
        }

        return result;
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        if (!validate()) return;

        document.documentElement.classList.add('popupActive');
        mess.innerHTML = '<p class="pozdr">Поздравляем!</p> Вы записались на RDCLR.HOME';
    })
}