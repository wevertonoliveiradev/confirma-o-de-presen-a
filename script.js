document.getElementById("confirmation-form").addEventListener("submit", async function (event) {
    event.preventDefault(); // Evita o envio padrão do formulário

    const submitBtn = document.getElementById("submit-btn");
    const loading = document.getElementById("loading");

    // Esconde o botão de enviar e mostra o carregamento
    submitBtn.style.display = "none";
    loading.style.display = "block";

    const nameFields = Array.from(document.querySelectorAll("input[name='name']")); // Captura todos os campos de nome
    const confirmation = document.getElementById("confirmation").value;

    if (nameFields.length > 0 && confirmation) {
        const orderedNames = nameFields.map(input => input.value.trim()).filter(name => name);

        try {
            for (const name of orderedNames) {
                // Envia os dados usando 'no-cors'
                fetch("https://script.google.com/macros/s/AKfycbwWCzudob_lrCJGi0srC4KjwlRt2AmlTDh29z7bwF12lhiWxLBQNxMAr9w9LsTqOaQLtA/exec", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ name, confirmation }),
                    mode: "no-cors", // Modo para evitar erros de CORS
                });
            }

            // Mensagem de sucesso
            document.getElementById("response-message").textContent = "Obrigado! Suas respostas foram registradas.";
            document.getElementById("response-message").style.color = "black";
            document.getElementById("response-message").style.fontSize = "1.5rem";
            document.getElementById("response-message").style.fontWeight = "bold";

            // Limpa os campos do formulário
            nameFields.forEach((field, index) => {
                if (index === 0) field.value = "";
                else field.parentElement.remove();
            });

            document.getElementById("confirmation").value = "";
        } catch (error) {
            console.error("Erro:", error);
        }
    } else {
        document.getElementById("response-message").textContent = "Por favor, preencha todos os campos.";
    }

    // Mostra o botão de enviar novamente e esconde o carregamento
    submitBtn.style.display = "block";
    loading.style.display = "none";
});

// Função para adicionar um campo de nome
document.getElementById("name-fields").addEventListener("click", function (e) {
    if (e.target.classList.contains("add-name")) {
        const nameFields = document.getElementById("name-fields");
        const newNameField = document.createElement("div");
        newNameField.classList.add("name-field");

        newNameField.innerHTML = `
            <label for="name">Nome:</label>
            <input type="text" name="name" required>
            <button type="button" class="remove-name">-</button>
        `;

        nameFields.appendChild(newNameField);

        const removeButton = newNameField.querySelector(".remove-name");
        removeButton.addEventListener("click", function () {
            nameFields.removeChild(newNameField);
        });
    }
});



// Trocar a foto quando a tela for menor

// Seleciona a imagem
const photo = document.querySelector(".birthdayPhoto .photo");

// Função para verificar o tamanho da tela e trocar a imagem
function updatePhoto() {
    if (window.innerWidth <= 768) { // Tamanho típico para celulares
        photo.src = "img/img7.jpg"; // Substitua pelo caminho da imagem para celular
    } else {
        photo.src = "img/img4.jpg"; // Imagem para PC
    }
}

// Adiciona o evento de resize para verificar o tamanho da tela
window.addEventListener("resize", updatePhoto);

// Verifica o tamanho da tela ao carregar a página
updatePhoto();
