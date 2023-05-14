let myShopping = (function () {

    cart = []
  
    function Item(name, price, count) {
      this.name = name
      this.price = price
      this.count = count
    }
  
    function saveCart() {
      sessionStorage.setItem("myShopping", JSON.stringify(cart));
    }
  
    function load() {
      cart = JSON.parse(sessionStorage.getItem("myShopping"));
    }
  
    if (sessionStorage.getItem("myShopping") != null) {
      load()
    }
  
    let fruit = {}
  
    fruit.addItem = function (name, price, count) {
      for (let item in cart) {
        if (cart[item].name === name) {
          cart[item].count++
          saveCart()
          return
        }
      }
      let item = new Item(name, price, count)
      cart.push(item)
      saveCart()
    }
  
    fruit.setCount = function (name, count) {
      for (let i in cart) {
        if (cart[i].name === name) {
          cart[i].count = count
          break;
        }
      }
    }
  
    fruit.removeItem = function (name) {
      for (let item in cart) {
        if (cart[item].name === name) {
          cart[item].count--
          if (cart[item].count === 0) {
            cart.splice(item, 1)
          }
          break
        }
      }
      saveCart()
    }
  
    fruit.removeFruit = function (name) {
      for (let item in cart) {
        if (cart[item].name === name) {
          cart.splice(item, 1)
          break
        }
      }
      saveCart()
    }
  
    fruit.clear = function () {
      cart = []
      saveCart()
    }
  
    fruit.totalCount = function () {
      let totalCount = 0
      for (let item in cart) {
        totalCount += cart[item].count;
      }
      return totalCount
    }
  
    fruit.cartsPrices = function () {
      let cartsPrices = 0
      for (let item in cart) {
        cartsPrices += cart[item].price * cart[item].count;
      }
      return Number(cartsPrices.toFixed(2))
    }
  
    fruit.cartList = function () {
      let cartCopy = []
      for (i in cart) {
        item = cart[i]
        itemCopy = {}
        for (a in item) {
          itemCopy[a] = item[a]
        }
        itemCopy.total = Number(item.price * item.count).toFixed(2);
        cartCopy.push(itemCopy)
      }
      return cartCopy
    }
    return fruit
  })()
  
  
  $('.add-to-cart').click(function (event) {
    event.preventDefault()
    let name = this.getAttribute("data-name")
    let price = Number(this.getAttribute("data-price"))
    myShopping.addItem(name, price, 1)
    displayCart()
  })
  
  $('.clear-cart').click(function () {
    myShopping.clear()
    displayCart()
  })
  
  function displayCart() {
    let cartArray = myShopping.cartList();
    let output = "";
    for (let i in cartArray) {
      output += "<tr>"
        + "<td>" + cartArray[i].name + "</td>"
        + "<td>(" + cartArray[i].price + ")</td>"
        + "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name=" + cartArray[i].name + ">-</button>"
        + "<input type='number' class='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>"
        + "<button class='plus-item btn btn-primary input-group-addon' data-name=" + cartArray[i].name + ">+</button></div></td>"
        + "<td><button class='delete-item btn btn-danger' data-name=" + cartArray[i].name + ">X</button></td>"
        + " = "
        + "<td>" + cartArray[i].total + "</td>"
        + "</tr>"
    }
    $('.show-cart').html(output)
    $('.total-cart').html(myShopping.cartsPrices())
    $('.total-count').html(myShopping.totalCount())
  }
  
  $('.show-cart').on("click", ".delete-item", function (event) {
    let name = this.getAttribute("data-name")
    myShopping.removeFruit(name)
    displayCart()
  })
  
  $('.show-cart').on("click", ".minus-iztem", function (event) {
    let name = this.getAttribute("data-name")
    myShopping.removeItem(name)
    displayCart()
  })
  
  $('.show-cart').on("click", ".plus-item", function (event) {
    let name = this.getAttribute("data-name")
    myShopping.addItem(name)
    displayCart()
  })
  
  $('.show-cart').on("change", ".item-count", function (event) {
    let name = this.getAttribute("data-name")
    let count = this.getAttribute("val")
    myShopping.setCount(name, count)
    displayCart()
  })
  displayCart()
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  