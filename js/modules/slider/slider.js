import {slider_config} from './config.js';
class Slider{
    constructor(slider_dom){
        this.slider_dom = slider_dom;
        this.slides_dom = this.slider_dom.querySelectorAll('.' + slider_config.slider_class + slider_config.slide_class);
        this.copy_slides();
        this.create_prev();
        this.create_next();
    }
    copy_slides(){
        this.slides = [];
        this.slides_dom.forEach((slide_dom) => {
           this.slides.push(slide_dom.innerHTML);
        });
    }
    create_control(){
        this.control_dom = this.slider_dom.querySelector('.' + slider_config.slider_class + slider_config.control_class);
        if(!this.control_dom){
            this.control_dom = document.createElement('div');
            this.control_dom.classList.add(slider_config.slider_class + slider_config.control_class);
            this.slider_dom.appendChild(this.control_dom);
        }
    }
    create_prev(){
        this.create_control();
        const prev_dom = document.createElement('button');
        prev_dom.classList.add(slider_config.slider_class + slider_config.prev_class);
        prev_dom.innerHTML = 'prev';
        this.control_dom.appendChild(prev_dom);
        prev_dom.addEventListener('click', () => {
            this.prev();
        });
    }
    create_next(){
        this.create_control();
        const next_dom = document.createElement('button');
        next_dom.classList.add(slider_config.slider_class + slider_config.prev_class);
        next_dom.innerHTML = 'next';
        this.control_dom.appendChild(next_dom);
        next_dom.addEventListener('click', () => {
           this.next();
        });
    }
    get_current_index(){
        let current_index = -1;
        this.slides_dom.forEach((slide_dom, index) => {
            if(slide_dom.classList.contains('active')){
                current_index = index;
            }
        })
        return current_index;
    }
    get_slides_count(){
        return this.slides_dom.length;
    }
    apply_translate(value){
        this.slides_dom.forEach((slide) => {
            slide.style.transform = 'translate(' + value + '%, 0%)';
        })
    }
    change_current(new_current_index){
        const last_current_index = this.get_current_index();
        this.slides_dom[last_current_index].classList.remove('active');
        this.slides_dom[new_current_index].classList.add('active');
    }
    next(){
        const current_index = this.get_current_index();
        const slides_count = this.get_slides_count();
        if(current_index >= slides_count - 1) return;
        if(current_index == -1) return;
        const translate_value = -(current_index + 1) * 100;
        this.apply_translate(translate_value);
        this.change_current(current_index + 1);
    }
    prev(){
        const current_index = this.get_current_index();
        const slides_count = this.get_slides_count();
        if(current_index <= 0) return;
        const translate_value = -(current_index - 1) * 100;
        this.apply_translate(translate_value);
        this.change_current(current_index - 1);
    }

}

window.onload = function() {
    const sliders_dom = document.querySelectorAll('.founder-slider');
    sliders_dom.forEach((slider_dom) => {
        let slider = new Slider(slider_dom);
    });
}