"use strict";

function titleClickHandler(event) {
  console.log("klikniete", event);
  const activeLinks = document.querySelectorAll(".titles a.active");
  for (let activeLink of activeLinks) {
    /* remove class 'active' from all article links  */
    activeLink.classList.remove("active");
  }
  /* remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll(".posts article.active");
  event.preventDefault(); //->no change url
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove("active");
  }
  /* add class 'active' to the clicked link */
  this.classList.add("active");

  /* get 'href' attribute from the clicked link */
  let atributSelectior = this.getAttribute("href");
  //console.log(atributSelectior, "->href");
  /* find the correct article using the selector (value of 'href' attribute) */
  let targetArticle = document.querySelector(atributSelectior);
  //console.log(targetArticle);
  /* add class 'active' to the correct article */
  targetArticle.classList.add("active");
}

function generateTitleLinks() {
  /* remove contents of titleList */
  const removeLinks = document.querySelectorAll(".titles li");
  for (let removeLink of removeLinks) {
    removeLink.remove();
  }
  /* for each article */
  let article;
  const articles = document.querySelectorAll(".post");
  for (article of articles) {
    /* get the article id */
    const articleId = article.getAttribute("id");
    //console.log(articleId);
    /* find the title element */
    const articleTitle = article.querySelector(".post-title").innerHTML;
    //console.log(articleTitle);
    /* create HTML of the link */
    const linkHTML =
      '<li><a href="#' +
      articleId +
      '"><span>' +
      articleTitle +
      "</span></a></li>";
    //  console.log(linkHTML);
    /* insert link into titleList */
    const insertCode = document.querySelector(".list");
    insertCode.insertAdjacentHTML("beforeend", linkHTML);
  }
}

generateTitleLinks();
const links = document.querySelectorAll(".titles a");
///console.log(links);
for (let link of links) {
  link.addEventListener("click", titleClickHandler);
}
const optArticleSelector = ".post",
  optTitleSelector = ".post-title",
  optTitleListSelector = ".titles",
  optArticleTagsSelector = ".post-tags .list";

/////////////////////
function generateTags() {
  /* find all articles */
  const articles = document.querySelectorAll(".post");
  //console.log(articles);
  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper */
    const wrapperTags = article.querySelector(optArticleTagsSelector);

    /* make html variable with empty string */
    let tagHTML = "";
    /* get tags from data-tags attribute */
    const atrticleTag = article.getAttribute("data-tags");
    //console.log(atrticleTag);
    /* split tags into array */
    const atrticleTagArray = atrticleTag.split(" ");
    // console.log(atrticleTagArray);
    /* START LOOP: for each tag */
    for (let tag of atrticleTagArray) {
      tagHTML = '<li><a href="#tag-' + tag + '">' + tag + "</a></li>";
      wrapperTags.insertAdjacentHTML("beforeend", tagHTML);
    }
  }

  /* START LOOP: for each tag */
  /* generate HTML of the link */
  /* add generated code to html variable */
  /* END LOOP: for each tag */
  /* insert HTML of all the links into the tags wrapper */
  /* END LOOP: for every article: */
}

generateTags();
