window.onload = function () {

    let next = document.querySelector('.next');
    let prev = document.querySelector('.prev');
    let queryString = window.location.search
    let param = new URLSearchParams(queryString)
    let page = 0

    next.addEventListener('click', () => {
  
       if(queryString && param.get('page') > 0) {
        page = Number(param.get('page')) + 1;
        
       }else{
        page = Number(param.get('page')) + 2;
       }
       window.location.href = 'http://localhost:3000/rickApi/personajes?page='+ page
    })

    prev.addEventListener('click', () => {
  
        if(queryString && param.get('page') > 1) {

         page = Number(param.get('page')) - 1;

         
        }else{

            page = Number(param.get('page'))
        }
        
        window.location.href = 'http://localhost:3000/rickApi/personajes?page='+ page
     })

}