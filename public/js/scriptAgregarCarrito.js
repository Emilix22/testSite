//función para incrementar el numero en el logo carrito
function productosEnElCarrito () {
    
    if(localStorage.carrito) {
        let productos = JSON.parse(localStorage.carrito)
        let cantidades = []

        productos.forEach((prod) => {
           cantidades.push(prod.quantity)
        })

        let numeroParaCarrito = cantidades.reduce(function (acum, num){return acum + num})
        return numeroParaCarrito;

    }else {
        return 0
    }  
}
//función para las notificaciones
function alerta (type, text) {
    let divAlerta = document.querySelector('#alerta')
    let element = '<div class="aviso '+ type +'">'+ text +'</div>'
    divAlerta.innerHTML = element
    setTimeout(() => {
        document.querySelector('.aviso').classList.remove(type)
    }, 1500);
}

window.onload = function () {
    
    let botonesAgregarCarrito = document.querySelectorAll('.agregarAlCarrito');
    let cartNumber = document.querySelector('.cart-number')
    let cartIcon = document.querySelector('.fa-cart-shopping')

    cartNumber.innerText = productosEnElCarrito();
    //hago forEach de los botones y a cada uno le agrego el evento click
    botonesAgregarCarrito.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            //console.log(e.target.dataset.id)
            if(localStorage.carrito) {
                let carrito = JSON.parse(localStorage.carrito)
                //console.log(carrito)
                let index = carrito.findIndex((prod) => prod.id == e.target.dataset.id)

                if(index != -1){
                   carrito[index].quantity++
                }else{   
                   carrito.push({id: e.target.dataset.id, quantity: 1})
                }

                localStorage.setItem('carrito', JSON.stringify(carrito))

            }else{
                localStorage.setItem('carrito', JSON.stringify([{id: e.target.dataset.id, quantity: 1}]))
            }            
            cartNumber.innerText = productosEnElCarrito();
            cartIcon.style.animation = 'late .5s infinite alternate linear'
            alerta('aviso-success', 'Se guardó un producto en el carrito');
            
            
        })
    })
}