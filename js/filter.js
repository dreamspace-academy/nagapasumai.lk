let filter_btns = document.querySelectorAll('.dropdown-item');
let projects = document.querySelectorAll('.filter-item');

filter_btns.forEach((filter_btn) => {
    filter_btn.addEventListener('click', () => {
        filter_btns.forEach((filter_btn) => {
            filter_btn.classList.remove('active');
        });
        filter_btn.classList.add('active');
        let selected = filter_btn.getAttribute('data-project');
        projects.forEach((project, index) => {
            let project_length = projects.length;
            if (
                project.getAttribute('data-project') === selected ||
                selected === 'all'
            ) {
                if (project.style.transition) {
                    project.style.transition = '';
                } else {
                    project.style.transition = `width 0.5s ease ${index / project_length + 0.6
                        }s,height 0.5s ease ${index / project_length + 0.6}s`;
                }
                project.classList.add('visible');
                project.classList.remove('invisible');
            } else {
                project.style.transition = `width 0.5s ease ${index / project_length + 0.6
                    }s,height 0.5s ease ${index / project_length + 0.6}s`;
                project.classList.remove('visible');
                project.classList.add('invisible');
            }
        });
    });
});