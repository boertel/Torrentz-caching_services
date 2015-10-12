var selector = ".results dl a",
    slice = function (nodes) { return Array.prototype.slice.call(nodes, 0); },
    torrents = slice(document.querySelectorAll(selector)),
    dds = slice(document.querySelectorAll(".results dd")),
    services = {
        zoink: function (h) {
            return 'http://zoink.it/torrent/' + h.toUpperCase() + '.torrent';
        },
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
    active = ['torrage', 'magnet', 'zoink', 'torcache'];



var internals = {};

internals.css = function () {
    var marginLeft = 400;
    var sheet = window.document.styleSheets[0];
    sheet.addRule("div.results", "margin-bottom: 60px");
    sheet.addRule("div.results>dl>dt", "width: auto");
    sheet.addRule("div.results>dl>dt", "margin-left: " + marginLeft + "px");
    sheet.addRule("div.results>dl>dt", "overflow-x: visible");
    sheet.addRule("div.results>dl>dd", "float: left");
    sheet.addRule("div.results>dl>dd", "width: " + marginLeft + "px");
    sheet.addRule("div.results>dl>dd>span.t", "width: 50px");
    sheet.addRule("div.results>dl>dd>span.t", "color: #75808A");
};

internals.sum = function (nodes) {
    nodes.forEach(function (node) {
        var peers = slice(node.querySelectorAll("span.u, span.d")).map(function (d) {
            return parseInt(d.innerHTML.replace(",", ""), 10);
        });
        var sum = peers.reduce(function (prev, current) {
            return prev + current;
        });

        var span = document.createElement("span");
        span.className = "t";
        span.innerHTML = sum;
        node.appendChild(span);
    });
};


internals.links = function (nodes) {
    nodes.forEach(function (node) {
        var hash = node.getAttribute('href').replace('/', '');
        var container = document.createElement("span");

        active.forEach(function (name) {
            var service = services[name];
            if (service) {
                var a = document.createElement('a');
                a.href = service(hash);
                a.innerHTML = name[0].toUpperCase() + name[1] + name[2];
                container.appendChild(a);

                var dash = document.createTextNode(" - ");
                container.appendChild(dash);
            }
        });

        node.parentNode.insertBefore(container, node.parentNode.firstChild);
    });
};

internals.hide = function () {
    var divs = slice(document.querySelectorAll(".SimpleAcceptableTextAds, .top, .note, .relatedq, .recent, .footer"));
    divs.forEach(function (div) {
        div.parentNode.removeChild(div);
    });

    var h2 = document.querySelector(".results h2");
    h2.style.visibility = "hidden";
};

internals.removePopup = function () {
    var today = new Date(),
        tomorrow = new Date();
    tomorrow.setDate(today.getDate()+7);
    value = '1|' + tomorrow.toGMTString();
    document.cookie = 'wgm=' + encodeURIComponent(value);
    _wm.format.popunder.isTriggered = true;
};

internals.hide();
internals.css();
internals.links(torrents);
internals.sum(dds);
internals.removePopup();
