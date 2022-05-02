sendApiRequest('Encyclopedia');
async function sendApiRequest(item) {
  let APIKEY = "AIzaSyDGxIiCAzO8heKinFT8qFUNtABUaI4Q5ts";
  // let item = 'literature';
  fetch(`https://www.googleapis.com/books/v1/volumes?q=${item}&maxResults=20&filter=free-ebooks&key=${APIKEY}
    `)
    .then((results) => results.json())
    .then((data) => useApiData(data));
}
https://www.googleapis.com/books/v1/volumes?q=Encyclopedia&maxResults=20&filter=free-ebooks&key=AIzaSyDGxIiCAzO8heKinFT8qFUNtABUaI4Q5ts
  
function useApiData(data){
    let res = data.items;
    console.log(res);
    let totalItems = data.totalItems;
    for(let i=0;i<res.length;i++){
        present(res[i].volumeInfo);
    }
}

function present(data){
    
    let title = data.title;
    let desc= title;
    if(title!=null && title.length>20){
      title = data.title.slice(0,20) + " .."
    }
    let img = data.imageLinks.thumbnail;
    let url = data.previewLink;
    if(desc!=null && desc.length>50){
      desc = desc.slice(0,50) + " ...";
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


    let detailshtml = cardTemplate.querySelector(".details");
    let deschtml = detailshtml.querySelector(".desc");
    let titlehtml = deschtml.querySelector(".title-");
    titlehtml.innerHTML = title;
    let descriptionhtml = deschtml.querySelector(".description");
    descriptionhtml.innerHTML = "A free google book for "+desc;

    let extrahtml = detailshtml.querySelector(".extra");
    let extra1html = extrahtml.querySelector(".extra1");
    let pgOuterhtml = extra1html.querySelector(".pgOuter");
    let pagenohtml = pgOuterhtml.querySelector(".pageno");
    pagenohtml.innerHTML = pages;

    let reviewNohtml = extra1html.querySelector(".rewNo");
    reviewNohtml.innerHTML = 9;


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