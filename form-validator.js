const titleInput = document.querySelector("#title");
const firstNameInput = document.querySelector("#first-name");
const lastNameInput = document.querySelector("#last-name");
const emailInput = document.querySelector("#email");
const dobInput = document.querySelector("#dob");
const phoneInput = document.querySelector("#phone");
const submitBtn = document.querySelector('input[type="submit"]');

const formValidity = {
  firstName: false,
  lastName: false,
  email: false,
  phone: false,
};

const validateName = (field, name) => {
  formValidity[field] = /^[A-Za-z-]{2,}$/.test(name);
};

const validateEmail = (email) => {
  formValidity.email =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i.test(
      email
    );
};

const validatePhone = (phone) => {
  formValidity.phone = /^\+?[0-9\s-()]{7,}$/.test(phone);
};

const allValid = () => {
  return Object.values(formValidity).every((isValid) => isValid);
};

const buttonToggler = () => {
  submitBtn.disabled = !allValid();
};

firstNameInput.addEventListener("change", (e) => {
  validateName("firstName", e.target.value);
  tipMessageHandler("firstName", e.target, "Invalid name");
  buttonToggler();
});
lastNameInput.addEventListener("change", (e) => {
  validateName("lastName", e.target.value);
  tipMessageHandler("lastName", e.target, "Invalid name");
  buttonToggler();
});
emailInput.addEventListener("change", (e) => {
  validateEmail(e.target.value);
  tipMessageHandler("email", e.target, "Invalid Email");
  buttonToggler();
});
phoneInput.addEventListener("change", (e) => {
  validatePhone(e.target.value);
  tipMessageHandler("phone", e.target, "Invalid Phone Number");
  buttonToggler();
});

const createTipMessage = (message) => {
  const element = document.createElement("p");
  const text = document.createTextNode(message);
  element.appendChild(text);
  element.classList.add("error");
  return element;
};

const tipMessageHandler = (field, htmlTarget, message) => {
  const exitingTip = htmlTarget.parentNode.querySelector(".error");
  if (exitingTip) {
    exitingTip.remove();
  }
  if (!formValidity[field]) {
    const tip = createTipMessage(message);
    htmlTarget.parentNode.appendChild(tip);
  }
};
