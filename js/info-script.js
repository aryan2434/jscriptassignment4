window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const productName = urlParams.get("product");
    const productImage = document.getElementById("productImage");
    console.log(productName);
    const productDetailsElement = document.getElementById("productDetails");

    if (productName) {
        const productDetailsApiUrl = `http://makeup-api.herokuapp.com/api/v1/products.json?product_name=${encodeURIComponent(productName)}`;

        // Display loading indicator while fetching data
        productDetailsElement.innerText = "Loading...";

        fetch(productDetailsApiUrl)
            .then(response => response.json())
            .then(productDetails => {
                if (productDetails.length > 0) {
                    const firstProduct = productDetails[0];

                    // Display product details
                    productImage.src = productImage || "images/default_poster.jpg";
                    productDetailsElement.innerHTML = `
                        <strong>Name:</strong> ${productName}<br>
                        <strong>Price:</strong> ${firstProduct.price}<br>
                        <strong>Description:</strong> ${firstProduct.description || "Not available"}<br>
                    `;
                } else {
                    // Handle the case when no product details are found
                    productDetailsElement.innerText = "Product details not available.";
                }
            })
            .catch(error => {
                console.error("Error fetching product details:", error);
                // Display an error message
                productDetailsElement.innerText = "Error fetching product details. Please try again.";
            });
    } else {
        // Handle the case when no product name is provided
        productDetailsElement.innerText = "Product name not specified.";
    }
};
function openAPIDocumentation() {
    window.open("https://makeup-api.herokuapp.com/", "_blank");
}

function goBackToSearchPage() {
    window.location.href = "index.html";
}
