var selector = ".results dl a",
    nodes = Array.prototype.slice.call(document.querySelectorAll(selector), 0),
    services = {
        torrage: function (h) {
            return 'http://torrage.com/torrent/' + h.toUpperCase() + '.torrent';
        },
        torcache: function (h) {
            return 'http://torcache.net/torrent/' + h.toUpperCase() + '.torrent';
        },
        magnet: function (h) {
            return 'magnet:?xt=urn:btih:' + h;
        }
    },
    active = ['torrage', 'magnet', 'torcache'];

nodes.forEach(function (node) {
    var hash = node.getAttribute('href').replace('/', '');
    var container = document.createElement("span");

    active.forEach(function (name) {
        var service = services[name];
        if (service) {
            var dash = document.createTextNode(" - ");
            container.appendChild(dash);

            var a = document.createElement('a');
            a.href = service(hash);
            a.innerHTML = name[0].toUpperCase() + name[1] + name[2];
            container.appendChild(a);
        }
    });

    node.parentNode.appendChild(container);
});
