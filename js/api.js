function simulateGetRequest() {
  const resultDiv = document.getElementById("api-result");
  resultDiv.innerHTML = "Sending GET request to /api/products...";

  setTimeout(() => {
    resultDiv.innerHTML = `
                    <strong>Response:</strong> (Status: 200 OK)
                    <pre>[
  {
    "id": 1,
    "name": "Laptop",
    "price": 999.99,
    "category": "Electronics"
  },
  {
    "id": 2,
    "name": "Desk Chair",
    "price": 149.99,
    "category": "Furniture"
  }
]</pre>
                `;
  }, 1500);
}

function simulatePostRequest() {
  const resultDiv = document.getElementById("api-result");
  resultDiv.innerHTML =
    "Sending POST request to /api/products with product data...";

  setTimeout(() => {
    resultDiv.innerHTML = `
                    <strong>Response:</strong> (Status: 201 Created)
                    <pre>{
  "id": 3,
  "name": "Wireless Keyboard",
  "price": 79.99,
  "category": "Electronics",
  "message": "Product created successfully"
}</pre>
                `;
  }, 1500);
}
