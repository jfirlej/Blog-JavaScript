'use strict';
const optArticleSelector = '.post',
  optArticleTagsSelector = '.post-tags .list',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-';

function titleClickHandler(event) {
  console.log('klikniete', event);
  const activeLinks = document.querySelectorAll('.titles a.active');
  for (let activeLink of activeLinks) {
    /* remove class 'active' from all article links  */
    activeLink.classList.remove('active');
  }
  /* remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');
  event.preventDefault(); //->no change url
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }
  /* add class 'active' to the clicked link */
  this.classList.add('active');

  /* get 'href' attribute from the clicked link */
  let atributSelectior = this.getAttribute('href');
  //console.log(atributSelectior, "->href");
  /* find the correct article using the selector (value of 'href' attribute) */
  let targetArticle = document.querySelector(atributSelectior);
  //console.log(targetArticle);
  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');
}

function generateTitleLinks(customSelector = '') {
  /* remove contents of titleList */
  const removeLinks = document.querySelectorAll('.titles li');
  for (let removeLink of removeLinks) {
    removeLink.remove();
  }
  /* for each article */
  let article;
  const articles = document.querySelectorAll(
    optArticleSelector + customSelector
  );
  console.log(articles, 'articles');
  for (article of articles) {
    /* get the article id */
    const articleId = article.getAttribute('id');
    //console.log(articleId);
    /* find the title element */
    const articleTitle = article.querySelector('.post-title').innerHTML;
    //console.log(articleTitle);
    /* create HTML of the link */
    const linkHTML =
      '<li><a href="#' +
      articleId +
      '"><span>' +
      articleTitle +
      '</span></a></li>';
    //  console.log(linkHTML);
    /* insert link into titleList */
    const insertCode = document.querySelector('.list');
    insertCode.insertAdjacentHTML('beforeend', linkHTML);
  }
}

generateTitleLinks();
const links = document.querySelectorAll('.titles a');
///console.log(links);
for (let link of links) {
  link.addEventListener('click', titleClickHandler);
}

function calculateTagsParams(tags) {
  const parms = {
    max: 0,
    min: 999999
  };
  for (let tag in tags) {
    if (tags[tag] > parms.max) {
      parms.max = tags[tag];
    } else
    if (tags[tag] < parms.max) {
      parms.min = tags[tag];
    }

    console.log(tag + 'is used' + tags[tag] + 'times');
  }
  return parms;
}

function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
  return optCloudClassPrefix + classNumber;
}

function calculateAuthorClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const authorNumber = Math.floor(percentage * (optCloudAuthorCount - 1) + 1);
  return optCloudAuthorPrefix + authorNumber;
}
/////////////////////
function generateTags() {
  /* find all articles */
  const articles = document.querySelectorAll('.post');
  let allTags = {};
  //console.log(articles);
  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper */
    const wrapperTags = article.querySelector(optArticleTagsSelector);
    /* make html variable with empty string */
    let tagHTML = "";
    /* get tags from data-tags attribute */
    const atrticleTag = article.getAttribute('data-tags');
    //console.log(atrticleTag);
    /* split tags into array */
    const atrticleTagArray = atrticleTag.split(" ");
    // console.log(atrticleTagArray);
    /* START LOOP: for each tag */
    for (let tag of atrticleTagArray) {
      tagHTML = '<li><a href="#tag-' + tag + '">' + tag + '-' + '</a></li>';
      wrapperTags.insertAdjacentHTML('beforeend', tagHTML);

      /* [NEW] check if this link is NOT already in allTags */
      if (!allTags.hasOwnProperty(tag)) {
        /* [NEW] add generated code to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    }
    console.log(allTags, 'alltagss');
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector('.tags');

    /*[new] create variable for all links html code */
    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams);
    let allTagsHTML = '';
    for (let tag in allTags) {
      allTagsHTML += ' <li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '"href="#tag-' + tag + '">' +
        tag + ' (' + allTags[tag] + ') ' + '</a></li>';
    }

    tagList.innerHTML = allTagsHTML;
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
  const readHref = clickedElement.getAttribute('href');
  console.log(readHref);
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = readHref.replace('#tag-', '');
  console.log(tag, 'taggg');
  /* find all tag links with "href" attribute equal to the "href" constant */
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log(activeTags, '===');
  /* START LOOP: for each active tag link */
  for (let activeTag of activeTags) {
    /* remove class active */
    activeTag.classList.remove('active');
  }
  ////do wyjasnienia
  /* END LOOP: for each active tag link */
  /* add class active */
  this.classList.add('active');
  const targetTags = document.querySelector(readHref);
  console.log(targetTags);
  /* START LOOP: for each found tag link */
  /* END LOOP: for each found tag link */
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  /* find all links to tags */
  const links = document.querySelectorAll('.list-horizontal a');
  /* START LOOP: for each link */
  for (let link of links) {
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
    //console.log(link);
  }
  /* END LOOP: for each link */
}

addClickListenersToTags();

function generateAuthors() {
  //find all aricle
  const aricles = document.querySelectorAll('.post');
  for (let article of aricles) {
    const wrapperAuthor = article.querySelector('.post-author');
    const articleAuthor = article.getAttribute('data-author');

    const authorHTML =
      '<a  href="#' + articleAuthor + '">' + articleAuthor + '</a>';
    wrapperAuthor.innerHTML = authorHTML;
    ///wrapperAuthor.insertAdjacentHTML("beforeend", authorHTML);
  }
}
generateAuthors();

function authorClickHandler(event) {
  event.preventDefault();
  const readHref = this.getAttribute('href');
  const tag = readHref.replace('#', '');
  console.log(readHref);

  /* find all tag links with "href" attribute equal to the "href" constant */
  const activeAuthors = document.querySelectorAll('a.active[href^="#by "]');

  console.log(activeAuthors, '22222');
  for (let activeAuthor of activeAuthors) {
    activeAuthor.classList.remove('active');
  }
  this.classList.add('active');
  //const targetAuthors = document.querySelector(readHref);
  //console.log(targetAuthors, "target authors");
  generateTitleLinks('[data-author="' + tag + '"]');
}

function addClickListenersToAuthor() {
  /* find all links to tags */
  const links = document.querySelectorAll('.post-author a');
  /* START LOOP: for each link */
  for (let link of links) {
    /* add authorClickHandler as event listener for that link */
    link.addEventListener('click', authorClickHandler);
    //console.log(link);
  }
}
addClickListenersToAuthor();