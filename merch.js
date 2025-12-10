let content = [];
let cart = {};


async function loadMerch() {
    let response = await fetch("merch.json")
    content = await response.text()
    content = JSON.parse(content)

    let node_for_insert = document.getElementById("merch_container")
    node_for_insert.innerHTML = ''

     content.forEach((item, key) => {
        node_for_insert.innerHTML += `
       <div class="col-12 col-sm-6 col-lg-4 col-xl-3 mb-4">
       <div class="card h-100 d-flex flex-column">
       <img class="card-img-top mt-4" 
                     src="${item.img}" 
                     alt="${item.title}"
                     style="height: 200px; object-fit: contain;"></img>
        
        <div class="card-body d-flex flex-column">
        <h5 class="card-title text-center mb-3">${item.title}</h5>
        <p class="card-text flex-grow-1">${item.description}</p>
        <p class="card-text"><strong>Цена: ${item.cost} ₽</strong></p>
        <div class="mt-auto">
                    </div>
        </div>
        <div class="d-flex align-items-center justify-content-center mt-3">
    <button type="button" class="btn btn-outline-secondary btn-sm minus-btn" data-id="${key}">−</button>
    <span class="mx-3 quantity" id="q-${key}">0</span>
    <button type="button" class="btn btn-outline-secondary btn-sm plus-btn" data-id="${key}">+</button>
</div>
            </div>
        </div>`
    })
}

 // добавляем, убираем товары
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("plus-btn")) {
        let id = event.target.dataset.id
        cart[id] = (cart[id] || 0) + 1
        document.getElementById(`q-${id}`).textContent = cart[id]
    }

    if (event.target.classList.contains("minus-btn")) {
        let id = event.target.dataset.id
        if (cart[id] > 0) {
            cart[id] -= 1
            document.getElementById(`q-${id}`).textContent = cart[id]
        }
    }
})


loadMerch()

document.getElementById("UserEnter").addEventListener("submit", (event) => {
    // удаляем старые скрытые поля
    const totalItems = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
    const oldInputs = document.querySelectorAll("#UserEnter input[name^='item_']");
    oldInputs.forEach(input => input.remove());

// если польз. ничего не добавил
    if (totalItems === 0) {
        event.preventDefault(); // отменяем отправку формы
        alert("Выберите товары перед отправкой заказа!");
        return;
    }

    // создаем новые скрытые поля для каждого товара в cart
    Object.keys(cart).forEach(id => {
        if (cart[id] > 0) {
            const input = document.createElement("input");
            input.type = "hidden";
            const productName = content[id].title; // получаем название товара
            input.name = productName;              // используем как имя поля

            input.value = cart[id];
            document.getElementById("UserEnter").appendChild(input);
        }
    });
});



