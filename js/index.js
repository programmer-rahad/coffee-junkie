! function () {
    // selector function
    const $ = (selector, areAll) => areAll ? document.querySelectorAll(selector) : document.querySelector(selector);
    // variables
    const btn = $('.video-switch');
    const video = $('#welcome-section video');
    const navigationMenu = $('.navigation-menu');
    const navigationBtn = $('.navigation-button');
    const drinkForm = $('#drink-section .drink-form');
    const DrinkInputFirstname = $('.drink-form #first-name');
    const DrinkInputLastname = $('.drink-form #last-name');
    const DrinkInputEmail = $('.drink-form #drink-email');
    const drinkPeople = $('.drink-people');
    const drinkPeopleWrap = $('.drink-people-wrap');
    const workItems = $('.work-container .work-item', true);
    const workModal = $('.work-modal');
    const workModalImage = $('.work-modal .image');
    const workModalCloseBtn = $('.work-modal .image span');


    // customer constructor
    function Customer({ fName, lName, email }) {
        this.firstname = fName;
        this.lastname = lName;
        this.email = email;
    }

    // UI constructor function
    function UI() {}


    // people title show / hide
    UI.prototype.peopleTitleShowHide = function () {
        if (drinkPeople.innerHTML === '') {
            drinkPeopleWrap.style.display = 'none';
        } else {
            drinkPeopleWrap.style.display = 'block';
        }
    }

    // play / pause the video
    UI.prototype.videoControls = function () {
        if (btn.classList.contains('off')) {
            btn.classList.remove('off');
            video.play();
        } else {
            btn.classList.add('off');
            video.pause();
        }
    }

    // show / hide navigation menu
    UI.prototype.showHideNav = function () {
        navigationMenu.classList.toggle('show-nav');
    }

    // check for empty values
    UI.prototype.checkEmpty = function ({
        fName,
        lName,
        email
    }) {
        let result;
        if (fName === '' || lName === '' || email === '') {
            result = false;
        } else {
            result = true;
        }
        return result;
    }

    // show feedback
    UI.prototype.showFeedback = function (text, type) {
        const feedback = document.createElement('h4');
        feedback.className = `feedback-result ${type}`;
        feedback.innerHTML = text;
        drinkForm.insertBefore(feedback, $('.drink-form .input-first-name'));
        setTimeout(function () {
            feedback.remove();
        }, 2500);

    }

    // add customer
    UI.prototype.addCustomer = function (customer) {
        console.log(customer);
        const images = [0, 1, 2, 3, 4];
        const random = Math.floor(Math.random() * images.length);
        const div = document.createElement('div');
        div.classList.add('person');
        div.innerHTML = `
        <div class="drink-person">
            <img src="images/person/person-${images[random]}.jpeg" alt="person">
            <h4>${customer.firstname}</h4>
            <h4>${customer.lastname}</h4> 
        </div>
    `;
        drinkPeople.append(div);

    }

    // show modal
    UI.prototype.showModal = function () {
        workItems.forEach(function (work) {
            if (work.lastElementChild.nodeName === 'A') {
                work.lastElementChild.addEventListener('click', function () {
                    event.preventDefault();
                    workModal.classList.add('show');
                    workModalImage.style.backgroundImage = 'url(' + this.previousElementSibling.src + ')';
                    console.log(this.previousElementSibling.src);
                });
            }
        });
    }

    // close work modal
    UI.prototype.closeModal = function () {
        workModal.classList.remove('show');
    }

    // event listeners
    eventListners();
    function eventListners() {
        const ui = new UI(); 

        btn.addEventListener('click', function () {
            ui.videoControls();
        });
        navigationBtn.addEventListener('click', function () {
            ui.showHideNav();
        });
        drinkForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const valueObj = {
                fName: DrinkInputFirstname.value.trim(),
                lName: DrinkInputLastname.value.trim(),
                email: DrinkInputEmail.value.trim()
            }
            const checkVal = ui.checkEmpty(valueObj);
            if (checkVal) {
                let customer = new Customer(valueObj);
                ui.addCustomer(customer);
                DrinkInputFirstname.value = '';
                DrinkInputLastname.value = '';
                DrinkInputEmail.value = '';
                ui.peopleTitleShowHide();
                ui.showFeedback('custumer added to the list', 'success');
            } else {
                ui.showFeedback('some form values empty', '');
            }
        });

        workModalCloseBtn.addEventListener('click', function () {
            ui.closeModal();
        });
        document.addEventListener('DOMContentLoaded',function() {
            const ui = new UI();
            ui.peopleTitleShowHide();
            ui.showModal();
        });

    }

}();