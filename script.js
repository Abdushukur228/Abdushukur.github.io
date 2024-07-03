document.addEventListener('DOMContentLoaded', function() {
    const productsMenu = document.getElementById('productsMenu');
    const addProductMenu = document.getElementById('addProductMenu');
    const productsPage = document.getElementById('productsPage');
    const addProductPage = document.getElementById('addProductPage');
    const passwordPrompt = document.getElementById('passwordPrompt');
    const deletePasswordPrompt = document.getElementById('deletePasswordPrompt');
    const productList = document.getElementById('productList');
    const productForm = document.getElementById('productForm');
    const submitProduct = document.getElementById('submitProduct');
    const submitPassword = document.getElementById('submitPassword');
    const submitDeletePassword = document.getElementById('submitDeletePassword');
    const passwordInput = document.getElementById('passwordInput');
    const deletePasswordInput = document.getElementById('deletePasswordInput');

    const correctPassword = "ShernurAka";
    let productToDelete = null;

    productsMenu.addEventListener('click', function() {
        showPage('productsPage');
    });

    addProductMenu.addEventListener('click', function() {
        showPage('passwordPrompt');
    });

    submitPassword.addEventListener('click', function() {
        if (passwordInput.value === correctPassword) {
            showPage('addProductPage');
        } else {
            alert('Noto\'g\'ri parol');
        }
    });

    submitDeletePassword.addEventListener('click', function() {
        if (deletePasswordInput.value === correctPassword) {
            deleteProduct();
        } else {
            alert('Noto\'g\'ri parol');
        }
    });

    submitProduct.addEventListener('click', function() {
        addProduct();
    });

    function showPage(pageId) {
        productsPage.style.display = 'none';
        addProductPage.style.display = 'none';
        passwordPrompt.style.display = 'none';
        deletePasswordPrompt.style.display = 'none';

        document.getElementById(pageId).style.display = 'block';
        if (pageId === 'productsPage') {
            loadProducts();
        }
    }

    function addProduct() {
        const productImage = document.getElementById('productImage').files[0];
        const productName = document.getElementById('productName').value;
        const productRegion = document.getElementById('productRegion').value;
        const phoneNumber = document.getElementById('phoneNumber').value;
        const productPrice = document.getElementById('productPrice').value;

        if (productImage && productName && productRegion && phoneNumber && productPrice) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const products = JSON.parse(localStorage.getItem('products')) || [];
                products.push({
                    image: e.target.result,
                    name: productName,
                    region: productRegion,
                    phone: phoneNumber,
                    price: productPrice
                });
                localStorage.setItem('products', JSON.stringify(products));
                alert('Mahsulot qo\'shildi!');
                productForm.reset();
                showPage('productsPage');
            };
            reader.readAsDataURL(productImage);
        } else {
            alert('Barcha maydonlarni to\'ldiring!');
        }
    }

    function loadProducts() {
        productList.innerHTML = '';
        const products = JSON.parse(localStorage.getItem('products')) || [];
        products.forEach((product, index) => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p>Viloyat: ${product.region}</p>
                <p>Telefon: ${product.phone}</p>
                <p>Narxi: ${product.price}</p>
                <button class="delete-button" data-index="${index}">O'chirish</button>
            `;
            productList.appendChild(productDiv);
        });

        document.querySelectorAll('.delete-button').forEach(button => {
            button.addEventListener('click', function() {
                productToDelete = this.getAttribute('data-index');
                showPage('deletePasswordPrompt');
            });
        });
    }

    function deleteProduct() {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        products.splice(productToDelete, 1);
        localStorage.setItem('products', JSON.stringify(products));
        alert('Mahsulot o\'chirildi!');
        productToDelete = null;
        showPage('productsPage');
    }

    showPage('productsPage');
});
