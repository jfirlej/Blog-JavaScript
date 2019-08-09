"use strict";
const optArticleSelector = ".post",
  optTitleSelector = ".post-title",
  optTitleListSelector = ".titles",
  optArticleTagsSelector = ".post-tags .list";

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

function generateTitleLinks(customSelector = "") {
  /* remove contents of titleList */
  const removeLinks = document.querySelectorAll(".titles li");
  for (let removeLink of removeLinks) {
    removeLink.remove();
  }
  /* for each article */
  let article;
  const articles = document.querySelectorAll(
    optArticleSelector + customSelector
  );
  console.log(articles, "articles");
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
      tagHTML = '<li><a href="#tag-' + tag + '">' + tag + "-" + "</a></li>";
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
function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const readHref = clickedElement.getAttribute("href");
  console.log(readHref);
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = readHref.replace("#tag-", "");
  console.log(tag);
  /* find all tag links with "href" attribute equal to the "href" constant */
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log(activeTags, "===");
  /* START LOOP: for each active tag link */
  for (let activeTag of activeTags) {
    /* remove class active */
    activeTag.classList.remove("active");
  }
  ////do wyjasnienia
  /* END LOOP: for each active tag link */
  /* add class active */
  this.classList.add("active");

  const targetTags = document.querySelector(readHref);
  console.log(targetTags);
  /* START LOOP: for each found tag link */

  /* END LOOP: for each found tag link */
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  /* find all links to tags */
  const links = document.querySelectorAll(".list-horizontal a");
  /* START LOOP: for each link */
  for (let link of links) {
    /* add tagClickHandler as event listener for that link */
    link.addEventListener("click", tagClickHandler);
    //console.log(link);
  }

  /* END LOOP: for each link */
}

addClickListenersToTags();
