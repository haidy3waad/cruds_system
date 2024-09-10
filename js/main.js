var prodNameInput = document.getElementById('prodName')
var prodCategoryInput = document.getElementById('prodCat')
var prodPriceInput = document.getElementById('prodPrice')
var prodDescInput = document.getElementById('prodDesc')

var productList = []

if (localStorage.getItem('products') != null) {
    productList = JSON.parse(localStorage.getItem('products'))

    displayProducts()
}



function addprod() {
    var product = {
        name: prodNameInput.value,
        category: prodCategoryInput.value,
        price: prodPriceInput.value,
        description: prodDescInput.value
    }

    if (check(prodNameInput.value && prodCategoryInput.value && prodDescInput.value)) {
        document.getElementById('alert').style.display = "none"
        productList.push(product)
        localStorage.setItem('products', JSON.stringify(productList))
    } else {
        document.getElementById('alert').style.display = "block"
    }


    displayProducts()

}

function displayProducts() {
    var cartona = ``

    for (var i = 0; i < productList.length; i++) {
        cartona += `
        
          <tr>
                <td>${i}</td>
                <td>${productList[i].name}</td>
                <td>${productList[i].category}</td>
                <td>${productList[i].price}</td>
                <td>${productList[i].description}</td>
                <td><button id="btndelete" onclick="deleteprod(${i})" class="btn">Delete</button></td>
                <td><button id="btnup" onclick="updateprod(${i})" class="btn">Update</button></td>
                </tr>
        
    
        `

        document.getElementById('tbodyID').innerHTML = cartona
    }
}

function deleteprod(index) {
    productList.splice(index, 1)

    localStorage.setItem('products', JSON.stringify(productList))

    displayProducts()


}

function search(value) {

    var cartona2 = ``

    for (var i = 0; i < productList.length; i++) {
        if (productList[i].name.toLowerCase().includes(value.toLowerCase())) {
            cartona2 += `
        
        <tr>
              <td>${i}</td>
              <td>${productList[i].name.replaceAll(value, `<span>${value}</span>`)}</td>
              <td>${productList[i].category}</td>
              <td>${productList[i].price}</td>
              <td>${productList[i].description}</td>
              <td><button onclick="deleteprod(${i})" class="btn" id="btndelete">Delete</button></td>
              <td><button onclick="updateprod(${i})"class="btn" id="btnup">Update</button></td>
              </tr>
  
      `
        }

    }
    document.getElementById('tbodyID').innerHTML = cartona2

}


var productIndex = 0
function updateprod(index) {
    productIndex = index
    prodNameInput.value = productList[index].name
    prodCategoryInput.value = productList[index].category
    prodPriceInput.value = productList[index].price
    prodDescInput.value = productList[index].description
    window.scrollTo(0, 0)
    document.getElementById('updatebtn').style.display = "block"
    document.getElementById('btnadd').style.display = "none"

}

function updateproduct() {
    document.getElementById('updatebtn').style.display = "none"
    document.getElementById('btnadd').style.display = "block"
    productList[productIndex].name = prodNameInput.value
    productList[productIndex].category = prodCategoryInput.value
    productList[productIndex].price = prodPriceInput.value
    productList[productIndex].description = prodDescInput.value
    localStorage.setItem('products', JSON.stringify(productList))
    displayProducts()
}



function check(word) {
    var regex = /^[A-Z][a-z]{2,8}$/
    return regex.test(word)
}