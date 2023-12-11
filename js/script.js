// search for brand
function searchForBrand() {
    const searchTextField = document.getElementById("searchTextField");
    const resultsMsgLabel = document.getElementById("resultsMsgLabel");
    const listView = document.getElementById("listView");

    const brandName = searchTextField.value.trim();

    if (brandName) {
        const apiUrl = `https://makeup-api.herokuapp.com/api/v1/products.json?brand=${encodeURIComponent(brandName)}`;

        // Show loading logo while fetching data
        resultsMsgLabel.innerHTML = '<img src="images/loading.gif" alt="Loading" class="loading-logo"> Loading...';

        // Make an actual API call using Fetch
        fetch(apiUrl)
            .then(response => response.json())
            .then(productList => {
                // Update UI with search results
                listView.innerHTML = "";
                productList.forEach(product => {
                    const listItem = document.createElement("li");
                    listItem.className = "list-item";
                    const productImage = document.createElement("img");
                    productImage.src = product.image_link || "images/default_poster.jpg";
                    productImage.alt = product.name;
                    productImage.className = "product-image";
                    const productNameSpan = document.createElement("span");
                    productNameSpan.innerText = product.name;
                    listItem.appendChild(productImage);
                    listItem.appendChild(productNameSpan);
                    listView.appendChild(listItem);
                });

                resultsMsgLabel.innerText = `Total Products: ${productList.length}`;
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                resultsMsgLabel.innerText = "Error fetching data. Please try again.";
            });
    } else {
        // Show error message if no brand name entered
        resultsMsgLabel.innerText = "Please enter a valid brand name.";
    }
}
//function to open documentation link
function openAPIDocumentation() {
    window.open("https://makeup-api.herokuapp.com/", "_blank");
}

//student info
function addStudentInfo() {
    const studentInfo = document.getElementById("studentInfo");
    studentInfo.innerText = "Student ID: 200544014\nName: Aryan";
}

document.addEventListener("DOMContentLoaded", function () {
    addStudentInfo();
});
//info page redirect
function redirectToInfoPage(event) {
    const selectedProduct = event.target.closest(".list-item");
    if (selectedProduct) {
        // Redirect to info page with the selected product name
        const productName = selectedProduct.querySelector("span").innerText;
        window.location.href = `info.html?product=${encodeURIComponent(productName)}`;
    }
}
//getting product details
function getProductDetails() {
    const selectedProduct = document.querySelector(".list-item:hover");

    if (selectedProduct) {
        const productName = selectedProduct.innerText;

        // Replace this with the actual API endpoint for fetching product details
        const productDetailsApiUrl = `https://makeup-api.herokuapp.com/api/v1/products.json?product_name=${encodeURIComponent(productName)}`;

        // Make an actual API call using Fetch
        fetch(productDetailsApiUrl)
            .then(response => response.json())
            .then(productDetails => {
                // Update UI with product details
                const posterImageView = document.getElementById("posterImageView");
                const msgLabel = document.getElementById("msgLabel");

                if (productDetails.length > 0) {
                    const firstProduct = productDetails[0];

                    posterImageView.src = firstProduct.image_link || "images/default_poster.jpg";
                    msgLabel.innerText = `Product details:\nName: ${firstProduct.name}\nBrand: ${firstProduct.brand}\nPrice: ${firstProduct.price}\nDescription: ${firstProduct.description}`;
                } else {
                    msgLabel.innerText = "Product details not available.";
                }
            })
            .catch(error => {
                console.error("Error fetching product details:", error);
                msgLabel.innerText = "Error fetching product details. Please try again.";
            });
    }
}
