
    const container = document.getElementById('container')

    const url = "https://mock-data-api.firebaseio.com/webb21/products.json"


    let products = []

    function createFilter(){
        const input = document.getElementById('value')
        const raiting = parseFloat(input.value)

        container.innerHTML = ''
      
       //document.getElementById('varukorg').innerHTML='<p>Hej</p>'

       const new_array = products.filter( bilder => { 
        return bilder.rating >= raiting

       })    

     renderImage(new_array)

}

    function fetch_data() {
        fetch(url)
            .then(res => res.json())
            .then (data => 
                
                     {products = data
                    renderImage(data)}
                    
                    )
                
    }

    function renderImage(data) {
        data.forEach(index => renderItem(index))
    }

    function renderItem(index) {
        const wrapper = document.createElement('div')

        wrapper.appendChild(createName(index))
        wrapper.appendChild(createImage(index))
        wrapper.appendChild(createDescription(index))
        wrapper.appendChild(createPrice(index))
        wrapper.appendChild(createRating(index))
        wrapper.appendChild(createStock(index))
        wrapper.appendChild(createButton(index))
 
        container.appendChild(wrapper)

    }


    function createName(index) {
        const name = document.createElement('h1')
        name.innerText = index.name

        return name
    }
    let total = 0;

    function createButton(index){
        const button = document.createElement('button')
        button.innerHTML = 'köp'
        button.classList.add('köp') //css
        button.addEventListener('click', ()  => {
            getTotal(index)
        })
        return button
    }

    function createImage(index) {

        //container.appendChild(button)

        const img = document.createElement('img')
        img.src = index.images[0].src.small
        img.alt = index.alt

        img.addEventListener('click', () => {
            getTotal(index);
        })
        return img

    }

    function getTotal (index) {
            total += index.price;

            const node = document.createElement('p');
            const text = document.createTextNode(`${index.name} - ${index.price}`);
            node.appendChild(text);

            document.getElementById('varukorg').appendChild(node)

            document.getElementById('total').innerHTML = `Total : ${total} `
        }

    function createDescription(index) {
        const description = document.createElement('p')
        description.innerText = `Description : ${index.description}`
        return description
    }

    function createPrice(index) {
        const price = document.createElement('p')
        price.innerHTML = `Price : ${index.price}`
        return price
    }

    function createRating(index) {
        const rating = document.createElement('p')
        rating.innerHTML = `Rating : ${index.rating}`
        return rating
    }

    function createStock(index) {
        const stock = document.createElement('p')
        stock.innerText = `Stock :${index.stock}`
        return stock
    }
     
   
   

    fetch_data()
