const btn = document.getElementById("button");

async function getUrl() {
    let response = await fetch(
        "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json"
    );
    let data = await response.json();
    return data;
}

function showProducts(categoryName) {
    getUrl().then((res) => {
        const selectedCategory = res.categories.find(category => category.category_name === categoryName);

        if (selectedCategory) {
            console.log(selectedCategory)
            // Remove "active" class from all buttons
            const allButtons = document.querySelectorAll('.cart_btn button');
            allButtons.forEach(button => {
              button.classList.remove('active');
            });

           
            // Add "active" class to the clicked button
            const clickedButton = document.querySelector(`.cart_btn button[data-category="${categoryName}"]`);
            if (clickedButton) {
              clickedButton.classList.add('active');
            }
      
            // ... rest of your code
          } else {
            console.log(`No products found for category: ${categoryName}`);
          }


        if (selectedCategory) {
            const productContainer = document.getElementById("cart");
            productContainer.innerHTML = '';

            selectedCategory.category_products.forEach(product => {
                const productCard = document.createElement("div");
                productCard.classList.add("product_name");
                productCard.innerHTML = `
                    <div class="imges">
                        <img src="${product.second_image}" alt="" />
                        <h1 class="badge_text">${product.badge_text} </h1>
                    </div>
                    <div class="product_title">
                    <h1>${product.title}</h1>
                    <h1>${product.vendor}</h1>
                    </div>
                    <div class="price_data">
                        <h1 class="price">Rs ${product.price}</h1>
                        <h1 class="price_compare">${product.compare_at_price}</h1>
                        <h1 class="per_compare">${Number(
                            Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)
                        )} %</h1>

                    </div>
                    <div>
                        <button>
                        Add To Cart
                        </button>
                        </div>
                `;

                productContainer.appendChild(productCard);
            });
        } else {
            console.log(`No products found for category: ${categoryName}`);
        }
    });
}

getUrl().then((res) => {
    console.log(res.categories);

    document.getElementById("main_btn").innerHTML = res.categories
        .map(
            (item) => `
                <div class="cart_btn">
                    <button data-category="${item.category_name}" onclick="showProducts('${item.category_name}')">${item.category_name}</button>
                </div>
            `
        )
        .join("");
});

