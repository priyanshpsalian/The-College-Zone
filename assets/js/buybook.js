data = [
  {
    "title": 'Microprocessors',
    "discription": 'sem 4 | Techknowledge publication | New condition, 1 year old',
    "phone": 33333333,
    "img": 'https://images-na.ssl-images-amazon.com/images/I/519Za9Jr-TL._SX386_BO1,204,203,200_.jpg',
    "price": '320',
    "sold_by": 'Rahul sharma',
    "__v": 0
  },
  {
    "title": 'Operating System',
    "discription": 'sem 4 | Techknowledge publication | old syllabus 2018',
    "phone": 33333333,
    "img": 'https://images-eu.ssl-images-amazon.com/images/I/51t7xr4wmXL._SX198_BO1,204,203,200_QL40_FMwebp_.jpg',
    "price": '120',
    "sold_by": 'Rahul sharma',
    "__v": 0
  },
  {
    "title": 'DBMS',
    "discription": 'sem 4 | Techknowledge publication | New condition, 1 year old',
    "phone": 22,
    "img": 'https://images-eu.ssl-images-amazon.com/images/I/51-tuaHhqwL._SX198_BO1,204,203,200_QL40_FMwebp_.jpg',
    "price": '360',
    "sold_by": 'Rahul sharma',
    "__v": 0
  },
  {
    "title": 'Analysis Of Algorithms',
    "discription": 'sem 4 | Techknowledge publication | New condition, 1 year old',
    "phone": 4444444,
    "img": 'https://images-na.ssl-images-amazon.com/images/I/51ieGdaTcZL._SX386_BO1,204,203,200_.jpg',
    "price": '120',
    "sold_by": 'Rahul sharma',
    "__v": 0
  },
  {
    "title": 'sdas',
    "discription": 'sdfsdf',
    "phone": 7045397413,
    "img": 'placeholder.jpg',
    "price": '120',
    "sold_by": 'Rahul sharma',
    "__v": 0
  },
  {
    "title": 'safs',
    "discription": 'sdfs',
    "phone": 7045397413,
    "img": 'sdf',
    "price": '120',
    "sold_by": 'Rahul sharma',
    "__v": 0
  }
]



// console.log(da);
// useApiData(da)
function aa() {
  fetch("/see_books_data")
    .then((response) => response.json())
    .then((da) => useApiData(da));
}
aa();
function useApiData(data) {
  for (let i = 0; i < data.length; i++) {
    present(data[i], parseInt(data[i].price));
  }
}
const URL = "https://charitybase.uk/api/graphql"
const HEADERS = {
  Authorization: "Apikey 503e32f3-6a5b-4183-a7e0-ad5c5bfa725f",
  "Content-Type": "application/json",
}
const COUNT_QUERY = `
  {
    CHC {
      getCharities(
        filters: {  finances: { latestIncome: { gte: 100000 } } }
      ) {
        list(limit: 10) {
          id
          names {
            value
          }
          activities
          website
        }
      }
    }
  }
`

function countCharities() {
  return fetch(URL, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({ query: COUNT_QUERY }),
  })
    .then((res) => res.json())
    .catch((err) => {
      console.error("FETCH ERROR (probably your network)")
      throw err
    })
    .then(({ data, errors }) => {
      if (errors) {
        console.error("QUERY ERRORS")
        throw errors
      }
      console.log(data)
      return data.CHC.getCharities.count
    })
}
countCharities()

function present(data, amount) {

  // console.log(data,amount);
  let title = data.title;
  if (title.length > 21) {
    title = data.title.slice(0, 21) + " ..."
  }

  let img = data.img.data;
  let imgtype = data.img.contentType;
  let url = 'https://wa.me/' + data.phone;
  let desc = data.discription;
  if (desc != null) {
    desc = data.discription.slice(0, 70) + " ...";
  }
  let soldby = data.sold_by;

  let container = document.querySelector("#outerDiv");
  let template = document.querySelector("#template");

  let cardTemplate = template.content.querySelector(".template1");

  let thumb = cardTemplate.querySelector(".thumbnail");
  let thumbnail = thumb.querySelector(".thumbnail1");

  //"data:"+imgtype+";base64,"+img.toString('base64');
  function arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    // return window.btoa(binary);
    return btoa(binary);
  };
  console.log(arrayBufferToBase64(img.data));
  var base64Flag = 'data:image/jpeg;base64,';
  var us2 = base64Flag + arrayBufferToBase64(img.data);
  // let img64 = "data:"+imgtype+";base64,"+img.toString('base64');

  thumbnail.setAttribute("src", us2);

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
