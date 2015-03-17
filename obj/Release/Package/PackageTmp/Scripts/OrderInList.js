var restruantList;
var menu;
//note on cart array id is the key, quantity is cart[key][0], the name of item is cart[key][1] and the price is cart[key][2]
var cart = new Array();
//an array of menu items with item id as a key
var menuItems = new Array();
var total = 0.00;
var totalDiv = document.createElement('div');
totalDiv.id = 'totalDiv';

//removes a selected item from the cart
function RemoveListener() {
    //removes item from cart
    $('.remove').on('click', function () {
        alert(cart[$(this).val().toString()]);
        //remove item from dom
        $("#" + $(this).val().toString()).remove();
        //remove item from cart array
        //delete cart[$(this).val().toString().toString()];
      
        //alert(cart[$(this).val().toString()]);
        //update total
        total = total - cart[$(this).val().toString()].price;
        totalDiv.removeChild(totalDiv.childNodes[1]);
        var updatedTotalPriceElement = document.createElement('p');
        var updatedTotalPrice = document.createTextNode(total.toFixed(2));
        updatedTotalPriceElement.appendChild(updatedTotalPrice);
        document.getElementById('totalDiv').appendChild(updatedTotalPriceElement);

        $(this).remove();
    });
}

function RenderCart()
{
    $("#checkout").on('click', function () {
     
        $('#menuCategories').hide();
        $('#displayCategory').hide();
        $('#checkout').hide();
        $('#cart').show();
        $('#order').show();
   
        for (key in cart) {

            var itemElement = document.createElement('p');
            var itemText = document.createTextNode(cart[key].name);
            itemElement.appendChild(itemText);
            itemElement.id = key.toString();
            document.getElementById('cart').appendChild(itemElement);
            total += parseFloat(cart[key].price) * cart[key].amount;

            var removeElement = document.createElement('p');
            var removeText = document.createTextNode('Remove Item')
            removeElement.appendChild(removeText);
            removeElement.value = key;
            removeElement.className = "remove";
            document.getElementById('cart').appendChild(removeElement);
           
            document.getElementById('cart').appendChild(document.createElement('br'));
            
        }

        //append total div to cart div
        document.getElementById('cart').appendChild(totalDiv);

        //append "Total" to total div
        var totalTitle = document.createElement('h3');
        var totalTitleText = document.createTextNode("Total");
        totalTitle.appendChild(totalTitleText);
        document.getElementById('totalDiv').appendChild(totalTitle);

        //append total price of order to total div
        var totalPriceElement = document.createElement('p');
        var totalPrice = document.createTextNode(total.toString());
        totalPriceElement.appendChild(totalPrice);
        document.getElementById('totalDiv').appendChild(totalPriceElement);

        RemoveListener();
    });
}

function AddToCartListener()
{
    $('.addToCart').on('click', function () {
        $(this).hide();
        //alert($(this).val().toString() + menuItems[$(this).val().toString()].name + menuItems[$(this).val().toString()].price);
        cart["Item" + $(this).val().toString()] = { amount: 1, name: menuItems["Item" + $(this).val().toString()].name, price: menuItems["Item" + $(this).val().toString()].price };
        
    });
}

function CreateBackListener() {
    $('.backButton').on('click', function () {
        var displayCategory = document.getElementById("displayCategory");
        //alert(displayCategory.childElementCount().toString());
        while (displayCategory.hasChildNodes()) {
            displayCategory.removeChild(displayCategory.childNodes[0]);
        }
        
        $('#displayCategory').hide();
        $('#menuCategories').show();
        
        
    });
}

function CreateCategoryListener() {
    $(".category").on('click', function () {
        var index = $(this).val();
        var items = menu[index].children;
        $('#menuCategories').hide();
        $('#displayCategory').show();
        //create category listing
        var header = document.createElement("h3");
        var headerText = document.createTextNode(menu[index].name);
        header.appendChild(headerText);
        document.getElementById('displayCategory').appendChild(header);

       

 
        //Create items w/ loop
        for(i in items)
        {
            
                var itemTitle = document.createElement("h4");
                var itemTitleText = document.createTextNode(items[i].name);
                itemTitle.appendChild(itemTitleText);
                document.getElementById('displayCategory').appendChild(itemTitle);
                //create discription of item
                var description = document.createElement('p');
                var descriptionText = document.createTextNode("Description: " + items[i].descrip);
                description.appendChild(descriptionText);
                document.getElementById('displayCategory').appendChild(description);
                //create price of item
                var price = document.createElement('p');
                var priceText = document.createTextNode("Price: " + items[i].price);
                price.appendChild(priceText);
                document.getElementById('displayCategory').appendChild(price);
                
                //create add to cart button
                var addToCart = document.createElement('p');
                addToCart.className = "addToCart";
                var addText = document.createTextNode("Add To Cart")
                addToCart.appendChild(addText);
                addToCart.id = items[i].id;
                addToCart.value = items[i].id;
                document.getElementById('displayCategory').appendChild(addToCart);

                //add break
                /*
                document.getElementById("restruantList").appendChild(lineBreak);
                document.getElementById("restruantList").appendChild(lineBreak);*/

        }

        var backButton = document.createElement("h3");
        var backText = document.createTextNode("Back to Menu");
        backButton.appendChild(backText);
        backButton.className = "backButton";
        document.getElementById('displayCategory').appendChild(backButton);
        CreateBackListener();
        AddToCartListener();
        RenderCart();
    });
}

function CreateMenuListener() {
    $(".menu").on('click', function (e) {
        //get restruant id from element value
        //how to get value in javascript
        var rid = e.target.value.toString();

        $('#restruantList').hide();
        
        //create restruant detials request url, note: rid means resturant id
        var requestUrl = "https://r-test.ordr.in/rd/" + rid + "/?_auth=1,vPhd3KpKHAZpW_o5Icc4uyXoQBhaln9PBV0V0jhMNjU";
        var localRequest = "http://localhost:50948/api/orderinapi/getmenu/rd/?rid=" + rid;
        //make ajax request to OrderIn api to get menu info
        $.ajax({
            url: localRequest,
            type: "GET",
            success: function (data) {
                menu = data;
                //Create Menu Categories
                for (i in menu) {
                    var category = document.createElement("h3");
                    var categoryText = document.createTextNode(menu[i].name);
                    category.appendChild(categoryText);
                    category.value = i;
                    category.className = "category";
                    document.getElementById("menuCategories").appendChild(category);
                    //create menu items array
                    var menuCategory = menu[i].children;

                    for (x in menuCategory)
                    {
                    
                        //add item, with item id as key, and item name and item price as values, to menuItems array  
                        menuItems["Item" + menuCategory[x].id.toString()] = { name: menuCategory[x].name, price: menuCategory[x].price };
                        
                    }
                }
                CreateCategoryListener();
                $('#checkout').show();
            }
        });

    });
}

function buildRestruantList(json)
{
    restruantList = JSON.parse(json);
    
    //Create a listing for every restruant in restruant list with a loop
    for (i in restruantList) {
    
        //Add Tittle to document
        var titleElement = document.createElement("h3");
        var titleText = document.createTextNode(restruantList[i].na);
        titleElement.appendChild(titleText);
        document.getElementById("restruantList").appendChild(titleElement);

        //Add Cuisine to document
        var cuisine = document.createElement("p");
        var cuisineText = document.createTextNode("Cuisine: " + restruantList[i].cu);
        cuisine.appendChild(cuisineText);
        document.getElementById("restruantList").appendChild(cuisine);

        //Add Delivery Time to document
        var deliveryTime = document.createElement("p");
        var deliveryTimeText = document.createTextNode("Delivery Time: " + restruantList[i].services.deliver.time.toString());
        deliveryTime.appendChild(deliveryTimeText);
        document.getElementById("restruantList").appendChild(deliveryTime);

        //Add Address to document
        var address = document.createElement("p");
        var addressText = document.createTextNode("Address: " + restruantList[i].addr);
        address.appendChild(addressText);
        document.getElementById("restruantList").appendChild(address);

        //Add menu to document
        var menu = document.createElement("p");
        var menuText = document.createTextNode("Menu");
        menu.appendChild(menuText);
        menu.className = "menu";
        menu.id = i;
        menu.value = restruantList[i].id;
        //menu.addEventListener('click', CreateMenu(e), false);
        document.getElementById("restruantList").appendChild(menu);
        
        /*
        document.getElementById("restruantList").appendChild(document.createElement('br'));
        document.getElementById("restruantList").appendChild(document.createElement('br'));
        */
        
    }
    CreateMenuListener();
    /*
    "<p>" + restruantList[i].na + "</p>" + "<p>Cuisine: " + restruantList[i].cu + "</p>" + "<p>Delivery Time: "
            + restruantList[i].services.deliver.time + "</p>" + "<p>Address: " + restruantList[i].addr + "</p>"
            + "<a href='@Url.Action('Menu', 'Home')'>Menu</a>"
            */
}


$(function () {

    $('#orderInForm').on('submit', function (e) {
        e.preventDefault();
        $('#orderInForm').hide();
        $('#map-canvas').show();

        var delivery_time = $("#delivery_time").val();
        var zipCode = $('#zipCode').val();
        var city = $('#city').val();
        var streetAddress = $('#streetAddress').val();

        //not working
        //var requestUrl = orderInRequestDL(delivery_time, zipCode, city, streetAddress)

        $.ajax({
            url: this.action,
            type: this.method,
            data: $(this).serialize(),
            success: function (data) {           
                buildRestruantList(data);

            }
        });
    });
});