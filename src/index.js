import './main.scss';

const initialCards = [
    {
        name: 'Бублики',
        link: 'https://images.unsplash.com/photo-1636178942520-3d3da95e3922?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=465&q=80',
        description: 'Очень вкусные, выского качества тесто',
        price: '50 руб.'
    },
    {
        name: 'Пиво',
        link: 'https://images.unsplash.com/photo-1636217707701-3b269167785e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80',
        description: 'Всегда холодное, не вызывает похмелья',
        price: '50 руб.'
    },
    {
        name: 'Чай',
        link: 'https://images.unsplash.com/photo-1635915575783-2cc97830a1a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1915&q=80',
        description: 'Чай, индийский чай, грузинский чай.',
        price: '50 руб.'
    },
    {
        name: 'Вода',
        link: 'https://images.unsplash.com/photo-1635980608878-64bb315f68b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=382&q=80',
        description: 'Полезная,',
        price: '50 руб.'
    },
    {
        name: 'Мороженое',
        link: 'https://images.unsplash.com/photo-1635749712095-45327be32d38?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80',
        description: 'раз раз раз раз раз раз раз раз раз раз раз раз раз раз раз раз раз раз раз раз раз раз раз раз раз раз раз раз раз раз раз раз',
        price: '50 руб.'
    },
    {
        name: 'Яблочный сок',
        link: 'https://images.unsplash.com/photo-1622237809626-f59a58170a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80',
        description: 'Свежий сок из настоящих яблок',
        price: '50 руб.'
    }
];

const cardsTemplate = document.querySelector('.template-cards');
const cardsContainer = document.querySelector('.cards');
const navForm = document.querySelector('.nav__form');
const navCardNameInput = navForm.querySelector('input[name="name"]');
const navCardDescriptionInput = navForm.querySelector('textarea[name="description"]');
const navCardUrlInput = navForm.querySelector('input[name="url"]');
const navCardPriceInput = navForm.querySelector('input[name="price"]');
const inputArr = navForm.querySelectorAll('input');

const renderElement = () => {
    const listItems = initialCards.map(generateCard);
    cardsContainer.append(...listItems);
}
renderElement();

function generateCard(item) {
    const newItem = cardsTemplate.content.cloneNode(true);
    const cardName = newItem.querySelector('.card__title');
    const cardImage = newItem.querySelector('.card__image');
    const cardDescription = newItem.querySelector('.card__description');
    const cardPrice = newItem.querySelector('.card__price');
    cardName.textContent = item.name;
    cardImage.src = item.link;
    cardDescription.textContent = item.description;
    cardPrice.textContent = item.price;
    return newItem;
}

const addNewCard = (evt) => {
    evt.preventDefault();
    const inputName = navCardNameInput.value;
    const inputImage = navCardUrlInput.value;
    const inputDescription = navCardDescriptionInput.value;
    const inputPrice = `${navCardPriceInput.value} руб.`;
    const newItem = generateCard({
        name: inputName, link: inputImage,
        description: inputDescription, price: inputPrice
    });
    cardsContainer.prepend(newItem);
    navForm.reset();
}


navForm.addEventListener('submit', addNewCard);


const showError = (form, formElement, errorMessage) => {
    const errorElement = form.querySelector(`.${formElement.id}-error`);
    formElement.classList.add('form__input_type_error');
    errorElement.classList.add('form__input-error_active');
    errorElement.textContent = errorMessage;
}
const hideError = (form, formElement) => {
    const errorElement = form.querySelector(`.${formElement.id}-error`);
    formElement.classList.remove('form__input_type_error');
    errorElement.classList.remove('form__input-error_active');
    errorElement.textContent = '';
}

const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showError(formElement, inputElement, inputElement.validationMessage)
    } else {
        hideError(formElement, inputElement)
    }
}

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid
    })
    }
    
    const toggleButtonState = (inputList, buttonElement) => {
        if (hasInvalidInput(inputList)) {
            buttonElement.classList.add('nav__button_inactive')
        } else {
            buttonElement.classList.remove('nav__button_inactive');
        }
    }
    

const setEventListeners = (formElement) => {
 const inputList = Array.from(formElement.querySelectorAll('input'));
 const navButton = formElement.querySelector('.nav__button');
 toggleButtonState(inputList, navButton);
 inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, navButton);
    })
 })
}

const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.nav__form'));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        })
        setEventListeners(formElement);
    })
}
enableValidation()