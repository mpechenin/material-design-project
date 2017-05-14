var openDialog = document.querySelectorAll('.mdl-menu__item');
var dialogs = document.querySelectorAll('dialog');
var collectJobDialog = document.getElementById('js-collect-job-dialog');
var rightMenu = document.querySelector('.mdl-js-ripple-effect');
var materialLayout = document.querySelector('.mdl-js-layout');
var keyCodes = {
    esc: 27
};

dialogs.forEach(function(dialog) {
    dialogPolyfill.registerDialog(dialog);
    dialog.addEventListener('click', function clickOnDialogBackdrop(event) {
        var rect = dialog.getBoundingClientRect();
        var isInDialog=(rect.top <= event.clientY && event.clientY <= rect.top + rect.height
        && rect.left <= event.clientX && event.clientX <= rect.left + rect.width);
        if (!isInDialog) {
            dialog.close();
        }
    });
});

openDialog.forEach(function(button) {
    button.addEventListener('click', function() {
        collectJobDialog.showModal();
    });
});

document.addEventListener('keydown', function(e) {
    if (e.keyCode === keyCodes.esc) {
        rightMenu.MaterialMenu.hide();
        if (materialLayout.MaterialLayout.drawer_.classList.contains('is-visible')) {
            materialLayout.MaterialLayout.toggleDrawer();
        }
    }
});