const firstName = document.querySelector('#first-name');
const lastName = document.querySelector('#last-name');
const email = document.querySelector('#email');
const general = document.querySelector('#general');
const support = document.querySelector('#support');
const message = document.querySelector('#message');
const consent = document.querySelector('#consent');
const submitBtn = document.querySelector('#submit');
const queryErrorMessage = document.querySelector('#query-error-message');
const consentMrrorMessage = document.querySelector('#consent-error-message');


submitBtn.addEventListener('click', function (e) {
   e.preventDefault();

   let isValid = true;

   // Remove existing error messages
   const existingErrors = document.querySelectorAll('.error-message');
   existingErrors.forEach(error => error.remove());

   // Clear previous styles
   firstName.style.border = '';
   lastName.style.border = '';
   email.style.border = '';
   message.style.border = '';
   consent.style.border = '';

   // First Name validation
   if (firstName.value === '') {
      displayError(firstName, 'This field is required');
      isValid = false;
   }

   // Last Name validation
   if (lastName.value === '') {
      displayError(lastName, 'This field is required');
      isValid = false;
   }

   // Email validation
   if (email.value === '') {
      displayError(email, 'Please enter a valid email address');
      isValid = false;
   } else if (!email.value.includes('@')) {
      displayError(email, 'Please include "@" in the email address');
      isValid = false;
   }

   // Query Type validation
   if (!general.checked && !support.checked) {
      queryErrorMessage.innerText = 'Please select a query type';
      queryErrorMessage.classList.add('error-message');
      isValid = false;
   } else {
      queryErrorMessage.innerText = '';
      queryErrorMessage.classList.remove('error-message');
   }

   // Message validation
   if (message.value === '') {
      displayError(message, 'This field is required');
      isValid = false;
   }

   // Consent checkbox validation
   if (!consent.checked) {
      consentMrrorMessage.innerText = 'To submit this form, please consent to being contacted'
      consentMrrorMessage.classList.add('error-message')
      isValid = false;
   }

   // If valid, display success message
   if (isValid) {
      displaySuccessMessage();
   }
});

function displayError(element, message) {
   const errorMsg = document.createElement('p');
   errorMsg.innerText = message;
   errorMsg.classList.add('error-message');
   element.parentElement.appendChild(errorMsg);
   element.style.border = '2px solid red';
};

function displaySuccessMessage() {
   const successMessageContainer = document.querySelector('#success-message-container');
   const successMessage = document.createElement('div');
   successMessage.classList.add('sucess-container');
   successMessage.innerHTML = `
      <div class="sucess-content">
         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" fill="none" viewBox="0 0 20 21">
            <path fill="#fff" d="M14.28 7.72a.748.748 0 0 1 0 1.06l-5.25 5.25a.748.748 0 0 1-1.06 0l-2.25-2.25a.75.75 0 1 1 1.06-1.06l1.72 1.72 4.72-4.72a.75.75 0 0 1 1.06 0Zm5.47 2.78A9.75 9.75 0 1 1 10 .75a9.76 9.76 0 0 1 9.75 9.75Zm-1.5 0A8.25 8.25 0 1 0 10 18.75a8.26 8.26 0 0 0 8.25-8.25Z"/>
         </svg>
         <h3>Message Sent</h3>
      </div>
      <p>Thanks for completing the form. We'll be in touch soon!</p>
   `;

   successMessageContainer.appendChild(successMessage);
   successMessage.classList.add('show');

   // Clear form fields
   firstName.value = '';
   lastName.value = '';
   email.value = '';
   message.value = '';
   general.checked = false;
   support.checked = false;
   consent.checked = false;

   // Remove success message after 4 seconds
   setTimeout(() => {
      successMessageContainer.innerHTML = '';
   }, 4000);
};
