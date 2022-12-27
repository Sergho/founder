import {slider_config} from './config.js';
/** Class representing a single slider */
class Slider{
    /**
     * Initialises slider
     * @param slider_dom - DOM of the root slider element
     */
    constructor(slider_dom){
        this.parse_config(this.slider_dom);
        this.slider_dom = slider_dom;
        this.slides_dom = this.slider_dom.querySelectorAll('.' + this.options.slider_class + this.options.slide_class);
        this.build_track();

        if(this.options.prev_button) this.create_prev();
        if(this.options.next_button) this.create_next();

    }

    /**
     * Creates slides wrapper to move them all together
     */
    build_track(){
        const slides_parent = this.slides_dom[0].parentNode;
        slides_parent.innerHTML = '';
        this.track = document.createElement('ul');
        this.track.classList.add(this.options.slider_class + this.options.track_class);
        slides_parent.appendChild(this.track);
        this.slides_dom.forEach((slide_dom) => {
           this.track.appendChild(slide_dom);
        });
    }

    /**
     * Gets config from the config.js and overrides user-defined options
     * @param slider_dom
     */
    parse_config(slider_dom){
        this.options = slider_config;
    }

    /**
     * Creates control node if it is necessary. It includes prev/next buttons and control points.
     */
    create_control(){
        this.control_dom = this.slider_dom.querySelector('.' + this.options.slider_class + this.options.control_class);
        if(!this.control_dom){
            this.control_dom = document.createElement('div');
            this.control_dom.classList.add(this.options.slider_class + this.options.control_class);
            this.slider_dom.appendChild(this.control_dom);
        }
    }

    /**
     * Creates 'prev' button
     */
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

    /**
     * Creates 'next' button
     */
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

    /**
     * Gets index of the slide, having 'active' class
     * @returns {number} - index
     */
    get_current_index(){
        let current_index = -1;
        this.slides_dom.forEach((slide_dom, index) => {
            if(slide_dom.classList.contains('active')){
                current_index = index;
            }
        })
        return current_index;
    }

    /**
     * Gets amount of slides
     * @returns {number} - amount
     */
    get_slides_count(){
        return this.slides_dom.length;
    }

    /**
     * Changes current slide (changes his class)
     * @param index - new current slide index
     */
    change_active(index){
        const last_current_index = this.get_current_index();
        this.slides_dom[last_current_index].classList.remove('active');
        this.slides_dom[index].classList.add('active');
    }

    /**
     * Gets the index of the slide with 'active' class
     * @returns {number} - index of active slide
     */
    get_active_index(){
        let active_index = -1;
        this.slides_dom.forEach((slide_dom, key) => {
            if(slide_dom.classList.contains('active')) active_index = key;
        })
        return active_index;
    }

    /**
     * Moves track due to transform-translate
     * @param translate - translateX value
     */
    move_track(translate){
        this.track.style.transform = 'translate(' + translate + '%, 0%)';
    }

    /**
     * Gets track's current transform-translateX value;
     * @returns {number}
     */
    get_track_translate(){
        let transform = this.track.style.transform;
        if(transform.indexOf('translate') === -1) return 0;
        let translate = transform.split("translate(")[1].split('%,')[0];
        return parseInt(translate);
    }

    /**
     * Moves slider to the next slide
     */
    next(){
        const current_translate = this.get_track_translate();
        const active_index = this.get_active_index();
        const slides_count = this.get_slides_count();
        if(active_index >= slides_count - 1) return;
        this.move_track(current_translate - 100);
        this.change_active(active_index + 1);
    }

    /**
     * Moves slider to the previous slide
     */
    prev(){
        const current_translate = this.get_track_translate();
        const active_index = this.get_active_index();
        if(active_index <= 0) return;
        this.move_track(current_translate + 100);
        this.change_active(active_index - 1);
    }

}

window.onload = function() {
    const sliders_dom = document.querySelectorAll('.founder-slider');
    sliders_dom.forEach((slider_dom) => {
        let slider = new Slider(slider_dom);
        console.log(slider);
    });
}