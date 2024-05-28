//My name is Susan(Zhou Jingyuan).
// Function to set the user information in local storage
function setUsername() {
  const firstnameInput = document.getElementById('firstnameInput').value.trim();
  const lastnameInput = document.getElementById('lastnameInput').value.trim();
  const usernameInput = document.getElementById('usernameInput').value.trim();
  const emailInput = document.getElementById('emailInput').value.trim();
  const passwordInput = document.getElementById('passwordInput').value.trim();
  const confirmpasswordInput = document.getElementById('confirmpasswordInput').value.trim();
  if (passwordInput !== confirmpasswordInput) {
      alert('Password and Confirm Password do not match.');
      return; // Stop further execution of the function
  }
  if (usernameInput !== '') {
      localStorage.setItem('firstname', firstnameInput);
      localStorage.setItem('lastname', lastnameInput);
      localStorage.setItem('username', usernameInput);
      localStorage.setItem('email', emailInput);
      localStorage.setItem('password', passwordInput);
      alert(`User "${usernameInput}" has been stored locally.`);
      location.assign("Sign in.html");
  } else {
      alert('Please enter a valid username.');
  }
}

// Function to retrieve and verify the user information from local storage
function getUsername() {
  const username = localStorage.getItem('username');
  const password = localStorage.getItem('password');
  if (username && password) {
      var usernameInput = document.getElementById('usernameInput').value.trim();
      var passwordInput = document.getElementById('passwordInput').value.trim();

      if(usernameInput == username && passwordInput == password ){
          location.assign("Training.html");
      }
      else{
          alert('Incorrect username and password');
      }
  } else {
      alert('User information not found.');
  }
}

// Function to clear user information from local storage
function clearLocalStorage() {
  localStorage.clear();
  alert('User information has been cleared from local storage.');
}

//Function to Enquiry form
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("submitBtn").addEventListener("click", function(event) {
      event.preventDefault(); // Blocking default form submission behaviour
  
      // Getting form data
      var name = document.getElementById("name").value;
      var grade = document.getElementById("grade").value;
      var classValue = document.getElementById("class").value;
      var email = document.getElementById("email").value;
      var phone = document.getElementById("phone").value;
      var enquiry = document.getElementById("enquiry").value;
  
      // Form Validation
      var isValid = true;
  
      // Check if name is empty
      if (name.trim() === "") {
        document.getElementById("nameError").textContent = "Name cannot be empty";
        isValid = false;
      } else {
        document.getElementById("nameError").textContent = "";
      }
  
      // Check if the student's grade is empty
      if (grade.trim() === "") {
        document.getElementById("gradeError").textContent = "Grade cannot be empty";
        isValid = false;
      } else {
        document.getElementById("gradeError").textContent = "";
      }
  
      // Check if the student class is empty
      if (classValue.trim() === "") {
        document.getElementById("classError").textContent = "Class cannot be empty";
        isValid = false;
      } else {
        document.getElementById("classError").textContent = "";
      }
  
      // Check that the mailbox is formatted correctly
      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        document.getElementById("emailError").textContent = "Invalid email format";
        isValid = false;
      } else {
        document.getElementById("emailError").textContent = "";
      }
  
      // Check that the phone number is formatted correctly
      var phonePattern = /^\d{11}$/;
      if (!phonePattern.test(phone)) {
        document.getElementById("phoneError").textContent = "Invalid phone number format (11 digits)";
        isValid = false;
      } else {
        document.getElementById("phoneError").textContent = "";
      }
  
      // Check if student counselling is empty
      if (enquiry.trim() === "") {
        document.getElementById("enquiryError").textContent = "Enquiry cannot be empty";
        isValid = false;
      } else {
        document.getElementById("enquiryError").textContent = "";
      }
  
      // If all fields pass validation, submit the form
      if (isValid) {
        // Further form submission logic can be added here
        console.log("Name: " + name);
        console.log("Grade: " + grade);
        console.log("Class: " + classValue);
        console.log("Email: " + email);
        console.log("Phone: " + phone);
        console.log("Enquiry: " + enquiry);
  
        // Empty form
        document.getElementById("name").value = "";
        document.getElementById("grade").value = "";
        document.getElementById("class").value = "";
        document.getElementById("email").value = "";
        document.getElementById("phone").value = "";
        document.getElementById("enquiry").value = "";
  
        alert("Form submitted!");
      }
    });
  
    // Add event listener for reset button
    document.getElementById("resetBtn").addEventListener("click", function(event) {
      event.preventDefault(); // Blocking the default behaviour of buttons
      // Clearing form fields and error messages
      document.getElementById("name").value = "";
      document.getElementById("grade").value = "";
      document.getElementById("class").value = "";
      document.getElementById("email").value = "";
      document.getElementById("phone").value = "";
      document.getElementById("enquiry").value = "";
  
      document.getElementById("nameError").textContent = "";
      document.getElementById("gradeError").textContent = "";
      document.getElementById("classError").textContent = "";
      document.getElementById("emailError").textContent = "";
      document.getElementById("phoneError").textContent = "";
      document.getElementById("enquiryError").textContent = "";
    });
  });

  //Function to shopping cart
document.addEventListener('DOMContentLoaded', function () {
  // Selecting necessary elements and setting up event listeners
  // Adding items to the cart, updating total price, and handling checkout and clearing the cart
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  const cartList = document.querySelector('.cart');
  const checkoutButton = document.querySelector('.checkout');
  const clearCartButton = document.querySelector('.clearcart');
  const totalPriceElement = document.createElement('p');
  totalPriceElement.id = "totalPrice";
  totalPriceElement.textContent = 'Total: $0';
  cartList.parentNode.insertBefore(totalPriceElement, cartList);

  addToCartButtons.forEach(function (button) {
      button.addEventListener('click', function () {
          const productId = this.parentElement.dataset.id;
          const productName = this.parentElement.querySelector('h3').textContent;
          const productPrice = parseInt(this.parentElement.querySelector('p').textContent.replace('Prices: $', ''));
          const productQuantity = parseInt(this.parentElement.querySelector('input').value);

          if (productQuantity > 0) {
              const cartItem = document.createElement('li');
              const itemTotalPrice = productPrice * productQuantity;
              cartItem.textContent = `${productName} - ${productPrice} x ${productQuantity} =${itemTotalPrice}`;
              cartItem.dataset.id = productId;

              const removeFromCartButton = document.createElement('button');
              removeFromCartButton.textContent = 'Remove';
              removeFromCartButton.addEventListener('click', function () {
                  cartList.removeChild(cartItem);
                  updateTotalPrice();
                  // Clear the input field of the removed product
                  const inputField = button.parentElement.querySelector('input');
                  inputField.value = '';
              });

              cartItem.appendChild(removeFromCartButton);
              cartList.appendChild(cartItem);
              updateTotalPrice();
          }
      });
  });

  checkoutButton.addEventListener('click', function () {
      const totalPriceElement = document.getElementById("totalPrice");
      if(totalPriceElement.textContent != "Total: $0"){
          const inputElements = document.querySelectorAll('input');
          inputElements.forEach(function (input) {
              input.value = '';
          });
          alert('Checkout Successfully!');
          cartList.innerHTML = '';
          updateTotalPrice();
      }
      else{
          alert('Checkout was unsuccessful, please add to cart and checkout again.');
      }
  });
  clearCartButton.addEventListener('click', function () {
      cartList.innerHTML = ''; // Empty Shopping Cart List
      const inputElements = document.querySelectorAll('input');
      inputElements.forEach(function (input) {
          input.value = '';
      });
      updateTotalPrice(); // Update total price
  });

  function updateTotalPrice() {
      let totalPrice = 0;
      const cartItems = cartList.querySelectorAll('li');
      cartItems.forEach(function (item) {
          const price = parseInt(item.textContent.split(' - ')[1].split(' x ')[0]);
          const quantity = parseInt(item.textContent.split(' - ')[1].split(' x ')[1]);
          totalPrice += price * quantity;
      });
      totalPriceElement.textContent = 'Total:' + " " + '$' + totalPrice;
  }
});
    
// Create a "close" button and append it to each list item
var myNodelist = document.querySelectorAll(".todo-list li");
for (var i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);

  // Toggle "checked" class when clicking on the list item or its text node
  myNodelist[i].addEventListener('click', function(ev) {
    if (ev.target === this || ev.target.nodeName === 'LI') {
      this.classList.toggle('checked');
    }
  });
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
for (var i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  };
}

// Create a new list item when clicking on the "Add" button
function newElement() {
  var li = document.createElement("li");
  li.classList.add("todo-list");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  // Toggle "checked" class when clicking on the new list item or its text node
  li.addEventListener('click', function(ev) {
    if (ev.target === this || ev.target.nodeName === 'LI') {
      this.classList.toggle('checked');
    }
  });

  for (var i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    };
  }
}

//Function to calculator
let table = document.querySelector("#mytable"); 
let resultCell = table.rows[0].cells[0]; // Get the first cell of the table  
  
function addNumChar(element) {  
    resultCell.innerText += element.innerText;  
}   
let isOperatorPresent = false;  
function addOperationChar(element) {  
    let lastChar = resultCell.innerText.slice(-1); 
    let newChar = element.innerText;  
   
    if (isOperatorPresent && "+-*/".includes(lastChar) && newChar !== ".") {    
        resultCell.innerText = resultCell.innerText.slice(0, -1) + newChar;  
    } else if (lastChar === "%" && newChar === ".") {  
    } else if ("+-*/".includes(lastChar) && newChar !== ".") {    
    } else if (lastChar === "." && newChar === ".") {  
    } else {  
        resultCell.innerText += newChar;  
   
        if ("+-*/%".includes(newChar) && newChar !== "%") {  
            isOperatorPresent = true;  
        } else {  
            isOperatorPresent = false;
        }  
    }  
}
  
function clearAll() {  
    resultCell.innerText = "";  
}  
 
function backSpace() {  
    if (resultCell.innerText.length > 0) {  
        resultCell.innerText = resultCell.innerText.slice(0, -1); 
    }  
}   
  
function pluMinChange() {  
  let num = Number(resultCell.innerText);  
  if (!isNaN(num)) {  
      let lastChar = resultCell.innerText.slice(-1); 
      if (num > 0 && !"+-*/".includes(lastChar)) {  
          resultCell.innerText = "-" + resultCell.innerText;  
      } else if (num < 0 && !"+-*/".includes(lastChar)) {  
          resultCell.innerText = resultCell.innerText.slice(1);  
      } else {  
          resultCell.innerText += "-";    
      }  
  }  
}

function solveOut() {  
  try {  
      let expression = resultCell.innerText;  
      if (expression.includes('%')) {  
          expression = expression.replace(/(\d+)%/g, (match, number) => (Number(number) / 100).toString());  
      }  

      let result = eval(expression); 
      if (!isNaN(result)) {  
          resultCell.innerText = result;  
      } else {  
          resultCell.innerText = "error";  
      }  
  } catch (e) {  
      resultCell.innerText = "error"; 
  }  
}
