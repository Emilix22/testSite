window.onload = function() {
    

    function setCarritoVacio () {
        cartRows.innerHTML = ''
    }
    function eliminarItemCarrito (){   
        
    }
    
    function vaciarCarrito () {
        localStorage.removeItem('carrito')
    }

    function calcularTotal (products) {
        let valores = []
        products.forEach(product => {
            valores.push(product.price * product.quantity)
        });
        return valores.reduce((acum, valor) => acum + valor)
 
    }
    
    let products = [];
    let cartRows = document.querySelector('.cartRows');
    if (localStorage.carrito) {
        let carrito = JSON.parse(localStorage.carrito);
        carrito.forEach((item, index) => {
           
            fetch('/api/product/'+item.id)
            .then((res) => res.json())
            .then((product) => {
                if(product){
                    cartRows.innerHTML += '<tr> <td>'+
                    product.name+'</td> <td>$'+product.price+'</td> <td>'+item.quantity+'</td> <td>$'+
                    parseFloat(product.price * item.quantity, 2).toFixed(2)+'</td> <td><button class="button" id="eliminar">Eliminar</button></td> </tr>';
                    
                products.push({
                    id: product.id,
                    name: product.name,
                    price: Number(product.price),
                    quantity: item.quantity
                });
                
                }else{
                    //borra un item del carrito en el licalStorage
                    carrito.splice(index, 1)
                    localStorage.setItem('carrito', JSON.stringify(carrito))

                }
                                
            })
            .then(() => {document.querySelector('.total-cart').innerText = 'Total: $ '+calcularTotal(products)+''})

        });

        
    }

    
    
    let vaciarCart = document.querySelector('#vaciarCart');

    vaciarCart.addEventListener('click', () => {
        vaciarCarrito()
        location.reload()
    })

    let comprar = document.querySelector('#comprar')
    
    comprar.addEventListener('click', (e) => {
        window.alert('comprado') 
    })

}
