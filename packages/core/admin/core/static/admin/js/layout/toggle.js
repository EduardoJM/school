document.addEventListener('DOMContentLoaded', function(){
    const triggers = Array.from(document.querySelectorAll('[data-role="toggle"]'));
    Array.prototype.forEach.call(triggers, function(item) {
        item.addEventListener('click', function(e) {
            if (e.target.closest('.no-trigger')) {
                return;
            }
            e.preventDefault();
            const selector = this.getAttribute('data-toggle-target');
            let group = this.getAttribute('data-toggle-group');
            if (!group) {
                group = 'default';
            }
            const collapsers = Array.from(document.querySelectorAll('[data-role="toggle"][data-toggle-group="' + group + '"]'));
            const toggler = document.getElementById(selector);
            if (!toggler.classList.contains('visible')) {
                Array.prototype.forEach.call(collapsers, function(col) {
                    col.classList.remove('active');
                    const blockSelector = col.getAttribute('data-toggle-target');
                    document.getElementById(blockSelector).classList.remove('visible');
                });
                toggler.classList.add('visible');
                this.classList.add('active');
            } else {
                toggler.classList.remove('visible');
                this.classList.remove('active');
            }
            return false;
        });
    });
});
