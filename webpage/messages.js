function refresh() {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', "message.html", true)

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            document.getElementById("messages").innerHTML = xhr.responseText // contient le résultat de la page
        }
        if (autoscroll) {
            element_b = document.getElementById("messages"); // Ne Fonctionne Pas
            element_b.scrollTop = element_b.scrollHeight;
        }
    }

    xhr.send(null);

    setTimeout('refresh()', 10000);
    var autoscroll = true;
    document.getElementById("messages").scroll(onscroll);

    function onscroll(event) {

        if (event.target.scrollHeight - event.target.scrollTop === event.target.clientHeight) {
            autoscroll = true;
        } else {
            autoscroll = false;
        }
    }
    return;
}
refresh();