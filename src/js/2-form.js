const form = document.querySelector('.feedback-form');
const emailInput = form.elements.email;
const messageTextarea = form.elements.message; //

let formData = {
  email: '',
  message: '',
};

const STORAGE_KEY = 'feedback-form-state';

const saveToLocalStorage = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
};

const populateFormFromStorage = () => {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (!savedData) return;
  try {
    formData = JSON.parse(savedData);

    if (formData.email) emailInput.value = formData.email;
    if (formData.message) messageTextarea.value = formData.message;
  } catch (error) {
    console.error('Error parsing localStorage data:', error);
  }
};

const handleInput = event => {
  const { name, value } = event.target;
  formData[name] = value.trim();
  saveToLocalStorage();
};

const handleSubmit = event => {
  event.preventDefault();

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  console.log('Submitted data:', formData);

  formData = { email: '', message: '' };
  localStorage.removeItem(STORAGE_KEY);
  form.reset();
};

populateFormFromStorage();

form.addEventListener('input', handleInput); // Слухаємо подію input
form.addEventListener('submit', handleSubmit); // Слухаємо подію submit
