async function loadMerch() {
    let response = await fetch("merch.json")
    let content = await response.text()
    content = JSON.parse(content)

    let node_for_insert = document.getElementById("merch_container")
    node_for_insert.innerHTML = '' // Очищаем контейнер

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
            </div>
        </div>`
    })
}
loadMerch()
