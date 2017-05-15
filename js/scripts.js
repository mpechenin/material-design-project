var openDialog = document.querySelectorAll('.mdl-menu__item');
var dialogs = document.querySelectorAll('dialog');
var collectJobDialog = document.getElementById('js-collect-job-dialog');
var rightMenu = document.querySelector('.mdl-js-ripple-effect');
var leftMenu = document.getElementById('left-nav');
var materialLayout = document.querySelector('.mdl-js-layout');
var form = document.getElementById('collect-job-form');
var keyCodes = {
    esc: 27
};
var datePicker;

function openJobDialog() {
    if (!collectJobDialog.open) {
        collectJobDialog.showModal();
    }
}

function handleDialogs() {
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
            openJobDialog();
        });
    });
}

function handleKeyDown() {
    document.addEventListener('keydown', function(e) {
        if (e.keyCode === keyCodes.esc) {
            rightMenu.MaterialMenu.hide();
            if (materialLayout.MaterialLayout.drawer_.classList.contains('is-visible')) {
                materialLayout.MaterialLayout.toggleDrawer();
            }
        }
    });
}

function getLeftMenuContainer(item, hasDivider) {
    var container = document.createElement('a');
    container.classList.add('mdl-navigation__link');
    container.setAttribute('href', item.link);
    if (hasDivider) {
        container.classList.add('mdl-menu__item--full-bleed-divider');
    }
    return container;
}

function getLeftMenuIcon(item) {
    var icon = document.createElement('i');
    icon.classList.add('material-icons');
    icon.innerText = item.icon.replace(/ /g, '_');
    return icon;
}

function getLeftMenuElement(item, hasDivider) {
    var container = getLeftMenuContainer(item, hasDivider);
    var icon = getLeftMenuIcon(item);
    container.appendChild(icon);
    container.appendChild(document.createTextNode(item.text));
    return container;
}

function requestMenus() {
    JSONP('http://738d915a.ngrok.io/nav', function(data) {
        for (var i in data) {
            for (var j = 0, len = data[i].length; j < len; j++) {
                leftMenu.appendChild(getLeftMenuElement(data[i][j], j === len - 1));
            }
        }
    });
}

function handleDatePicker() {
    var datePickerInput = document.getElementById('datepicker-input');
    datePicker = new MaterialDatetimePicker()
        .on('submit', function(val) {
            openJobDialog();
            datePickerInput.value = val.format("DD/MM/YYYY");
        })
        .on('close', openJobDialog)
    datePickerInput.addEventListener('focus', function() {
        collectJobDialog.close();
        datePicker.open();
    });
}

function handleFormSubmit() {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        var data = {};
        for(var i = 0 ; i < form.elements.length ; i++){
            var item = form.elements.item(i);
            if (item.name) {
                data[item.name] = item.value;
            }
        }
        JSONP('http://738d915a.ngrok.io/schedule', data, function(response) {
            // do something with response;
            collectJobDialog.close();
        });
    });
}

handleDialogs();
handleKeyDown();
requestMenus();
handleDatePicker();
handleFormSubmit();