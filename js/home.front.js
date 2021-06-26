function loadingAnim(){
    let main = document.querySelector('.main-content');
    let loading = document.querySelector('.page-loader');

    main.style.display = "block";
    loading.style.display = "none";
}

function dropdown(){
    let content = document.querySelector('.nav-dropdown');
    let burger = document.querySelector('#burger');

    burger.style.borderRadius = '15px 15px 0px 0px';
    content.style.display = 'block'; 
}

function tempPop(){
    let temp = document.querySelector('.temp');

    temp.className += 'animate__bounce';
}
