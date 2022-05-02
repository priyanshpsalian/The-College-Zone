sendApiRequest('engineering');
async function sendApiRequest(item) {
  let APIKEY = "AIzaSyDGxIiCAzO8heKinFT8qFUNtABUaI4Q5ts";
  // let item = 'literature';
  fetch(`https://www.googleapis.com/books/v1/volumes?q=${item}&maxResults=20&filter=paid-ebooks&key=${APIKEY}
    `)
    .then((results) => results.json())
    .then((data) => useApiData(data));
}

  
function useApiData(data){
    let res = data.items;
    console.log(res);
    let totalItems = data.totalItems;
    for(let i=0;i<res.length;i++){
        present(res[i].volumeInfo,parseInt(res[i].saleInfo.listPrice.amount));
    }
}

function present(data,amount){
    
    let title = data.title;
    if(title.length>20){
      title = data.title.slice(0,20) + " .."
    }
    let img = data.imageLinks.thumbnail;
    let url = data.previewLink;
    let desc = data.description;
    if(desc!=null){
      desc = data.description.slice(0,90) + " ...";
    }
    let pages = data.pageCount;
    let stars = data.averageRating;
    let noOfRat = data.ratingsCount;
    
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
    let pgOuterhtml = extra1html.querySelector(".pgOuter");
    let pagenohtml = pgOuterhtml.querySelector(".pageno");
    pagenohtml.innerHTML = pages;

    let reviewNohtml = extra1html.querySelector(".rewNo");
    let rand_no = Math.floor((Math.random() * 15) + 1);
    reviewNohtml.innerHTML = rand_no;


    titlehtml.setAttribute("href", url);

      let card = document.importNode(cardTemplate, true);
      container.appendChild(card);
}


function searched(){
  let typed = document.getElementById("sear").value;
  console.log(typed);
  var element = document.getElementsByClassName("template1");
  console.log(element[0]);
  for(let template=0; template<element.length; template++){
    element[template].className += " " + "displayNone";
  }
  sendApiRequest(typed);
}