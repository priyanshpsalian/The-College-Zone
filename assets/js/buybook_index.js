data = [
    {
      "title": 'Microprocessors',
      "discription": 'sem 4 | Computer Enggineering | Techknowledge publication | New condition, 1 year old',
      "phone": 8655011052,
      "img": 'https://images-na.ssl-images-amazon.com/images/I/519Za9Jr-TL._SX386_BO1,204,203,200_.jpg',
      "price": '320',
      "sold_by":'Rahul sharma',
      "__v": 0
    },
    {
      "title": 'Operating System',
      "discription": 'sem 3 | Information Technology | Techknowledge publication | old syllabus 2018',
      "phone": 8655011052,
      "img": 'https://images-eu.ssl-images-amazon.com/images/I/51t7xr4wmXL._SX198_BO1,204,203,200_QL40_FMwebp_.jpg',
      "price": '120',
      "sold_by":'Kartik Undhaiwala',
      "__v": 0
    },
    {
      "title": 'DBMS',
      "discription": 'sem 4 | Extc | Techknowledge publication | New condition, slightly used, 2 years old',
      "phone": 8655011052,
      "img": 'https://images-eu.ssl-images-amazon.com/images/I/51-tuaHhqwL._SX198_BO1,204,203,200_QL40_FMwebp_.jpg',
      "price": '360',
      "sold_by":'Sunder Pichai',
      "__v": 0
    },
  ]
  

useApiData(data)
  
function useApiData(data){
    for(let i=0;i<data.length;i++){
        present(data[i],parseInt(data[i].price));
    }
}

function present(data,amount){
    
    // console.log(data,amount);
    let title = data.title;
    if(title.length>21){
      title = data.title.slice(0,21) + " ..."
    }
    let img = data.img;
    let url = 'https://wa.me/'+data.phone;
    let desc = data.discription;
    if(desc!=null){
      desc = data.discription.slice(0,110) + " ...";
    }
    let soldby = data.sold_by;
    
    let container = document.querySelector("#outerDiv");
    let template = document.querySelector("#template");

    let cardTemplate = template.content.querySelector(".template1");
    
    let thumb = cardTemplate.querySelector(".thumbnail");
    let thumbnail = thumb.querySelector(".thumbnail1");
    thumbnail.setAttribute("src",img);

    let pricehtml = thumb.querySelector(".priceouter").querySelector(".priceInner");
    pricehtml.innerHTML = amount;

    let detailshtml = cardTemplate.querySelector(".details");
    let deschtml = detailshtml.querySelector(".desc");
    let titlehtml = deschtml.querySelector(".title-");
    titlehtml.innerHTML = title;
    let descriptionhtml = deschtml.querySelector(".description");
    descriptionhtml.innerHTML = desc;

    let extrahtml = detailshtml.querySelector(".extra");
    let extra1html = extrahtml.querySelector(".extra1");
    let soldbyhtml = extra1html.querySelector(".soldby");
    soldbyhtml.innerHTML = soldby;


    titlehtml.setAttribute("href", url);

      let card = document.importNode(cardTemplate, true);
      container.appendChild(card);
}
