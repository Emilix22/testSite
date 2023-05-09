const API = 'https://rickandmortyapi.com/api';


const controller = {

    personajes: (req, res) => {
        //return console.log(req.query)
        fetch(API+'/character/?page='+req.query.page)

            .then(response => response.json())

                .then(personajes => {
                    //return console.log(personajes.results)   
                    res.render('./rickYmorthy/personajes', {personajes: personajes});
                })
                    .catch(error => res.send(error))
    }
}    
            

module.exports = controller;