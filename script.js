//  _   _  ___  _   _    __ _ _ __ ___    __ _  __ _ _   _ 
// | | | |/ _ \| | | |  / _` | '__/ _ \  / _` |/ _` | | | |
// | |_| | (_) | |_| | | (_| | | |  __/ | (_| | (_| | |_| |
//  \__, |\___/ \__,_|  \__,_|_|  \___|  \__, |\__,_|\__, |
//  |___/                                |___/       |___/ 

document.addEventListener('DOMContentLoaded', function () {
    const navBtns = document.querySelectorAll('.nav-btn');
    const pages = document.querySelectorAll('.page');

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all nav buttons
            navBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            // Switch page
            const pageId = btn.getAttribute('data-page');
            pages.forEach(page => {
                if (page.id === pageId) {
                    page.classList.remove('active');
                    // Force reflow to restart animation
                    void page.offsetWidth;
                    page.classList.add('active');
                } else {
                    page.classList.remove('active');
                }
            });
        });
    });

    // Animate icons on hover (extra touch)
    document.querySelectorAll('.icon-btn').forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.classList.add('animated');
        });
        icon.addEventListener('mouseleave', () => {
            icon.classList.remove('animated');
        });
    });
});