const book = () => {
  let book = document.querySelector('#book');
  let button = document.querySelector('#scroll-down');
  let autobiography = document.querySelector('#autobiography-ben-franklin');
  let paragraphs = autobiography.getElementsByTagName('p');

  let position = book.offsetHeight;
  let previousPosition = book.scrollTop;
  let state = {
    paragraphs: [],
    checkpoint: 0,
  };


  window.onload = () => {
    for (let i = 0; i < paragraphs.length; i++) {
      paragraphs[i].setAttribute('id', i);
    }
    if (sessionStorage.getItem("state")) {
      console.log("Previous session loaded");
      state = JSON.parse(sessionStorage.getItem("state"));
      document.getElementById(state.checkpoint).scrollIntoView();
    }
    else {
      for (let i = 0; i < paragraphs.length; i++) {
        state.paragraphs.push({id: i, read: false});
        book.scrollTo(0, 0);
      }
    }
  };


  const checkScrollDown = (previousPosition) => {
    return previousPosition < book.scrollTop;
  }

  book.addEventListener("scroll", () => {
    for (item of state.paragraphs) {
      if (checkScrollDown(previousPosition)) {
        let rect = document.getElementById(item.id).getBoundingClientRect();
        if(item.read === false && rect.bottom <= 0) {
          state.checkpoint++;
          item.read = true;
          console.log(state.checkpoint);
          sessionStorage.setItem("state", JSON.stringify(state));
        }
      }
    }
    previousPosition = book.scrollTop;
  });

  button.addEventListener('click', () => {
    book.scrollBy({
      top: book.offsetHeight, 
      left: 0,
      behavior: "smooth"});
    position += book.offsetHeight;
    console.log(book.scrollTop)
  });
}

book();
