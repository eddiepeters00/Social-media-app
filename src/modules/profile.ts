const sideNav = document.getElementById('side-nav') as HTMLDivElement;
const openBtn = document.getElementById('open-btn') as HTMLSpanElement;
const closeBtn = document.getElementById('close-btn') as HTMLElement;


openBtn.addEventListener('click', () => {
        sideNav.style.width = "60%";
    });

closeBtn.addEventListener('click', () => {
    sideNav.style.width = "0";
});
