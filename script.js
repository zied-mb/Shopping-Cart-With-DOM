// Select the container where product cards will be appended // اختار الكونتينر اللي بش يتحطو فيه كروت البرودويات
const productList = document.getElementById("product-list");


// Select the element to display the total price // اختار العنصر اللي بش يوري السوم الكلي
const totalPriceElement = document.getElementById("total-price");


// Array of products with their details: name, price, and image source // أراي متاع البرودويات بتفاصيلهم: الاسم، السوم، ومصدر الصورة
let products = [
    { name: "Baskets", price: 100, imageSrc: "/assets/baskets.png" },
    { name: "Socks", price: 50, imageSrc: "/assets/socks.png" },
    { name: "Bag", price: 150, imageSrc: "/assets/bag.png" },
];


// Function to initialize and display all products on the page // باش تهيّئ وتعرض جميع البرودويات على الصفحة
function initializeProducts() {


    // Loop through the products array to create and display product cards // التنقل عبر مجموعة المنتجات لإنشاء بطاقات المنتجات وعرضها
    for (let i = 0; i < products.length; i++) {
        const productCard = document.createElement("div");              // Create a card container for each product // إنشاء كونتينر متاع كارت لكل برودوي
        productCard.className = "card";                                // Assign a "card" class for styling // تعيين فئة "بطاقة" للتصميم
        productCard.style.width = "18rem";                            // Set a fixed width for the card // حدّد عرض ثابت للكارت
        productCard.setAttribute("data-price", products[i].price);   // Store the product's price as a custom attribute // تخزين سعر المنتج كسمة مخصصة

        
        // Add product details inside the card
        productCard.innerHTML = `
            <img src="${products[i].imageSrc}" class="card-img-top" alt="${products[i].name}">     <!-- Product image // صورة البرودوي -->
            <div class="cardbody">
                <h5 class="card-title">${products[i].name}</h5>                                    <!-- Product name // اسم البرودوي -->
                <p class="card-text">This is a ${products[i].name.toLowerCase()}</p>               <!-- Description // وصف -->
                <h4 class="unit-price">${products[i].price} $</h4>                                 <!-- Product price // سعر البرودوي -->
                <div> <!-- Quantity control -->
                    <i class="fas fa-plus-circle increment"></i>                                   <!-- Increment button // زر الزيادة -->
                    <span class="quantity">1</span>                                                <!-- Initial quantity // الكمية الأولية -->
                    <i class="fas fa-minus-circle decrement"></i>                                  <!-- Decrement button // زر التخفيض -->
                </div>


                <div>                                                                             
                    <i class="fas fa-trash-alt"></i>                                               <!-- Remove product // إزالة البرودوي -->
                    <i class="fas fa-heart"></i>                                                   <!-- Favorite product // البرودوي المفضل -->
                </div>
            </div>
        `;

        productList.appendChild(productCard); // Append the card to the product list // ضيف الكارت لقائمة البرودويات
    }

    calculateTotalPrice();   // Calculate and display the total price initially // قوم بحساب وعرض السوم الكلي من الأول
    myEvents();             // Attach event listeners to the dynamically created elements // ربط الأحداث على العناصر اللي تخلقت تلقائيًا
}

// Function to attach event listeners for increment, decrement, and remove actions // وظيفة لربط حدث للعمليات متاع الزيادة، النقصان، والحذف
function myEvents() {
    const productCards = document.querySelectorAll(".card"); // Select all product cards // اختار جميع كروت البرودويات

    productCards.forEach((card) => {
        const quantitySpan = card.querySelector(".quantity");      // Quantity display element // عنصر عرض الكمية
        const incrementBtn = card.querySelector(".increment");    // Increment button // زر الزيادة
        const decrementBtn = card.querySelector(".decrement");   // Decrement button // زر التخفيض 
        const trashIcon = card.querySelector(".fa-trash-alt");  // Trash icon for removing the card // أيقونة سلة المهملات لحذف الكارت
        const heartIcon = card.querySelector(".fa-heart");     // Heart icon for favoriting the product // أيقونة قلب لتفضيل المنتج

        // Add an event listener for incrementing quantity // أضف حدث لزيادة الكمية
        incrementBtn.addEventListener("click", function () {
            quantitySpan.textContent = Number(quantitySpan.textContent) + 1;  // Increase quantity // زيادة الكمية
            calculateTotalPrice();                                           // Recalculate the total price // إعادة حساب السوم الكلي
        });

        // Add an event listener for decrementing quantity // أضف حدث لتخفيض الكمية
        decrementBtn.addEventListener("click", function () {
            if (Number(quantitySpan.textContent) > 1) {                            // Prevent decrementing below 1 // منع التخفيض تحت الواحد
                quantitySpan.textContent = Number(quantitySpan.textContent) - 1;  // Decrease quantity // تنقيص الكمية
                calculateTotalPrice();                                           // Recalculate the total price // إعادة حساب السوم الكلي
            }
        });

        // Add an event listener for removing the product card // أضف حدث لحذف كارت البرودوي
        trashIcon.addEventListener("click", function () {
            card.remove();                                      // Remove the card from the DOM // DOMحذف الكارت من الـ 
            calculateTotalPrice();                             // Recalculate the total price // إعادة حساب السوم الكلي
        });

        // Add an event listener for toggling favorite status // أضف حدث لتغيير حالة التفضيل
        heartIcon.addEventListener("click", function () {
            heartIcon.classList.toggle("active"); // Add or remove the "active" class // أضف أو احذف
        });
    });
}

// Function to calculate and update the total price // وظيفة لحساب وتحديث السوم الكلي
function calculateTotalPrice() {
    const productCards = document.querySelectorAll(".card");   // Select all current product cards // اختار جميع كروت البرودويات الحالية
    let total = 0;                                            // Initialize total price // تهيئة السوم الكلي

    productCards.forEach((card) => {
        const quantity = Number(card.querySelector(".quantity").textContent);      // Get the quantity of the product // جيب الكمية متاع البرودوي
        const price = Number(card.getAttribute("data-price"));                    // Get the price from the custom attribute // المخصص attributeجيب السوم من الـ
        total += quantity * price;                                               // Add the product's total to the overall total // زيد السوم متاع البرودوي للسوم الكلي
    });

    // Update the total price display element with the calculated value // عرض السوم الكلي بالقيمة المحسوبة
    totalPriceElement.textContent = `Total Price: ${total} $`;
}

// Wait for the DOM content to load before initializing products // DOMقبل ما تبدأ تهيئة البرودويات إستنى حتى يتحمّل محتوى الـ
document.addEventListener("DOMContentLoaded", initializeProducts);
