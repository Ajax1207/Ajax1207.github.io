var product =[{
    id: 1,
    img:'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name:'Nike shoe',
    price:7000,
    description: 'Nike Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi impedit similique eius nam vitae veniam.',
    type:'shoe'
}, {
    id: 2,
    img:'https://images.unsplash.com/photo-1511746315387-c4a76990fdce?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name:'Adidas shirt',
    price: 1500,
    description:'Adidas Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi impedit similique eius nam vitae veniam.',
    type:'shirt'
}, {
    id: 3,
    img:'https://images.unsplash.com/photo-1544441892-794166f1e3be?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name:'Adidas shoe',
    price: 4700,
    description:'Adidas Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi impedit similique eius nam vitae veniam.',
    type:'shoe'
},{
    id: 4,
    img:'https://images.unsplash.com/photo-1520256862855-398228c41684?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name:'Adidas shoe',
    price: 4700,
    description:'Adidas Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi impedit similique eius nam vitae veniam.',
    type:'shoe'
},{
    id: 5,
    img:'https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name:'Adidas shoe',
    price: 4700,
    description:'Adidas Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi impedit similique eius nam vitae veniam.',
    type:'shoe'
},{
    id: 6,
    img:'https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name:'Adidas shoe',
    price: 4700,
    description:'Adidas Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi impedit similique eius nam vitae veniam.',
    type:'shoe'
}];
// [{},{},{}] // lengt = 3
$(document).ready(() => {
    var html = ''; 
    for (let i = 0; i < product.length; ++i) {
        html += `<div onclick="openProductDetail(${i})" class="product-items ${product[i].type} ">
                        <img class="product-img" src="${product[i].img} " alt="">
                        <p style="font-size: 1.2vw;"> ${product[i].name} </p>
                        <p style="font-size: 1vw;"> ${numberWithCommas(product[i].price)} THB</p>
                    </div>`;
    }
    $("#productlist").html(html);
});
    
function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}

function searchsomething(elem) {
    var value = $('#' + elem.id).val();
    console.log(value);

    var html = ''; 
    for (let i = 0; i < product.length; ++i) {
        if (product[i].name.includes(value)) {
            html += `<div onclick="openProductDetail(${i})" class="product-items ${product[i].type} ">
                        <img class="product-img" src="${product[i].img} " alt="">
                        <p style="font-size: 1.2vw;"> ${product[i].name} </p>
                        <p style="font-size: 1vw;"> ${numberWithCommas(product[i].price)} THB</p>
                    </div>`;
        }
    }

    if (html == '') {
        $("#productlist").html(`<p>ไม่พบสินค้า</p>`);
    } else {
        $("#productlist").html(html);
    }
}

function searchproduct(param) {
    console.log(param);
    $(".product-items").css('display', 'none');
    if (param == 'all') {
        $(".product-items").css('display', 'block');
    } else {
        $("." + param).css('display', 'block');
    }
}

var productindex = 0;
function openProductDetail(index) {
    productindex = index;
    console.log(productindex);
    $("#modalDesc").css('display', 'flex');
    $("#mdd-img").attr('src', product[productindex].img);
    $("#mdd-name").text(product[productindex].name);
    $("#mdd-price").text(numberWithCommas(product[productindex].price) + ' THB');
    $("#mdd-desc").text(product[productindex].description);
}

function closeModal() {
    $(".modal").css('display', 'none');
}

var cart = [];
function addtocart() {
    var pass = true; 

    for (let i = 0; i < cart.length; i++) {
        if (productindex == cart[i].index) {
            console.log('foun same product')
            cart[i].count++;
            pass = false;
        }
    }


    if (pass) {
        var obj = {
            index: productindex,
            id: product[productindex].id,
            name: product[productindex].name,
            price: product[productindex].price,
            img: product[productindex].img,
            count: 1
        };
        // console.log(obj)
        cart.push(obj);
    }
    console.log(cart);

    swal.fire({
        icon: 'success',
        title: 'Add ' + product[productindex].name + ' to cart !'
    })
    $("#cartcount").css('display','flex').text(cart.length)
}

function openCart() {
    $('#modalCart').css('display','flex')
    rendercart();
}

function rendercart () {
    if(cart.length > 0) {
       var html = '';
       for (let i = 0; i < cart.length; i++) {
            html += `<div class="cartlist-items">
                                <div class="cartlist-left">
                                    <img src="${cart[i].img} " alt="">
                                    <div class="cartlist-detil">
                                        <p style="font-size: 1.2vw;">${cart[i].name} </p>
                                        <p style="font-size: 1.2vw;">${ numberWithCommas(cart[i].price * cart[i].count ) } TBH</p>
                                    </div>
                                </div>
                                <div class="cartlist-right">
                                    <p onclick="deinitems('-', ${i})" class="btnc">-</p>
                                    <p id="countitems${i}" style="margin: 0 20px;">${cart[i].count} </p>
                                    <p onclick="deinitems('+', ${i})" class="btnc">+</p>
                                </div>
                            </div>`;
       }
       $("#mycart").html(html)
    }
    else {
        $("#mycart").html(`<p>Not found product list</p>`)
    }
}

function deinitems(action, index) {
    if(action == '-') {
        if(cart[index].count > 0) {
            cart[index].count--;
            $("#countitems"+index).text(cart[index].count)

            if(cart[index].count <= 0) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Are you sure to delete?',
                    showConfirmButton: true,  
                    showCancelButton: true,   
                    confirmButtonText: 'Delete', 
                    cancelButtonText:'Cancel'
                }).then((res) => {
                    if(res.isConfirmed) {
                        cart.splice(index, 1)
                        console.log(cart)
                        rendercart();
                        $("#cartcount").css('display', 'flex').text(cart.length)
            
                        if(cart.length <= 0) {
                            $("#cartcount").css('display', 'none')
                        }
                    }
                    else{
                        cart[index].count++;
                        $("#countitems"+index).text(cart[index].count)
                    }
                })  
            }
            
        }
    }
    else if(action =='+') {
        cart[index].count++;
        $("#countitems"+index).text(cart[index].count)
    }
}