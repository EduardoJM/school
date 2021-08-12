document.addEventListener('DOMContentLoaded', function(){
    function openedDocumentClick(e) {
        if (!e.target.closest("#sidebar")) {
            document.getElementById('sidebar').classList.remove('visible');
            document.removeEventListener('click', openedDocumentClick);
        }
    }

    const triggers = Array.from(document.querySelectorAll('.sidebar-toggle'));
    Array.prototype.forEach.call(triggers, function(item) {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const sidebar = document.getElementById('sidebar');
            if (sidebar.classList.contains('visible')) {
                sidebar.classList.remove('visible');
                document.removeEventListener('click', openedDocumentClick);
            } else {
                sidebar.classList.add('visible');
                setTimeout(function() {
                    document.addEventListener('click', openedDocumentClick);
                }, 100);
            }
            return false;
        });
    });
});