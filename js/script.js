'use strict';

function titleClickHandler(event){

  console.log('klikniete',event);
  const activeLinks=document.querySelectorAll('.titles a.active');
  for(let activeLink of activeLinks)
  {
      
  /* remove class 'active' from all article links  */
    activeLink.classList.remove('active');

  }


 
  /* remove class 'active' from all articles */
  const activeArticles=document.querySelectorAll('.posts article.active');
  
  for(let activeArticle of activeArticles)
  {
      activeArticle.classList.remove('active');
  }
  /* add class 'active' to the clicked link */
  this.classList.add('active');

  /* get 'href' attribute from the clicked link */

  /* find the correct article using the selector (value of 'href' attribute) */

  /* add class 'active' to the correct article */
}

const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}