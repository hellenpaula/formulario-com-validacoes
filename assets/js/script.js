// funcionalidades aplicadas:
// 1. verificação em tempo real: em vez de esperar o 'blur' ou 'submit', usar o evento 'input'. Assim que a pessoa colocar algo no input ele já chama a função e verifica se está correto.
// 2. regex no email: verificar se o email está de acordo com o padrão esperado, usando expressões regulares.
// 3. mostrar/esconder senha: adicionar icone de olho para mostrar ou esconder senha.


// variáveis
const form = document.querySelector(".form");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const passwordConfirm = document.querySelector("#passwordConfirm");
let eye1 = document.querySelector("#eye1");
let eye2 = document.querySelector("#eye2");
const msgLogin = document.querySelector("#msgLogin");

// eventos
form.addEventListener("submit", ( (event)  => {
    event.preventDefault();

    checkForm();
}));

username.addEventListener("input", checkInputUsername);

email.addEventListener("input", checkInputEmail);

password.addEventListener("input", checkInputPassword);

passwordConfirm.addEventListener("input", checkInputPasswordConfirm);

eye1.addEventListener("click", () => checkEyePassword(password, eye1));
eye2.addEventListener("click", () => checkEyePassword(passwordConfirm, eye2));

// funções
function checkEyePassword(input, icon) {
    const type = input.type === "password" ? "text": "password";

    input.type = type;

    icon.classList.toggle("fa-eye");
    icon.classList.toggle("fa-eye-slash");
};

function checkInputUsername() {
    const usernameValue = username.value;

    if (usernameValue === "") {
        errorInput(username, "Enter the username correctly.");
    } else {
        const formItem = username.parentElement;
        formItem.className = "form-content";
    }
};

function checkInputEmail() {
    const emailValue = email.value;
    // email: texto@texto.texto
    const regex = /^[^\s]+@[^\s]+\.[^\s]+$/;
    if (emailValue === "") {
        errorInput(email, "Enter the email correctly.");
    } else if (!regex.test(emailValue)) {
        errorInput(email, "Enter a valid email.");

    } else {
        const formItem = email.parentElement;
        formItem.className = "form-content";
    }
};

function checkInputPassword() {
    const passwordValue = password.value;
    
    if (passwordValue === "") {
        errorInput(password, "Enter the password correctly.");

    } else if(passwordValue.length < 8) {
        errorInput(password, "The password must be at least 8 characters long.")
    } else {
        const formItem = password.parentElement;
        formItem.className = "form-content";
    }
};

function checkInputPasswordConfirm() {
    const passwordValue = password.value;
    const passwordConfirmValue = passwordConfirm.value;

    if (passwordConfirmValue === "") {
        errorInput(passwordConfirm, "Enter the password correctly to continue.");
    } else if (passwordConfirmValue != passwordValue) {
        errorInput(passwordConfirm, "Passwords are not the same.")
    } else {
        const formItem = passwordConfirm.parentElement;
        formItem.className = "form-content";
    }
};

function checkForm() {
    checkInputUsername();
    checkInputEmail();
    checkInputPassword();
    checkInputPasswordConfirm();

    const formItem = form.querySelectorAll(".form-content");
    const isValid = [...formItem].every( (item) => {
        return item.className === "form-content";
    });

    if (isValid) {
        msgLogin.innerHTML = "Access permitted.";
        msgLogin.classList.add("visible");
        
        
        
    } else {
        msgLogin.innerHTML = "Access not permitted.";
        msgLogin.classList.add("visible");
    }
};

function errorInput(input, message) {
    const formItem = input.parentElement;
    formItem.className = "form-content error"
    const textMessage = formItem.querySelector("a");
    textMessage.innerText = message;
};

