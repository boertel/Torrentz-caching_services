$(".results dl a").each(function() {
    var hash = $(this).attr('href')
    var url_zoink = 'http://zoink.it/torrent'+hash+'.torrent';
    var url_torrage = 'http://torrage.com/torrent'+hash.toUpperCase()+'.torrent';
    var url_torcache = 'http://torcache.com/torrent'+hash.toUpperCase()+'.torrent';
    var magnet = 'magnet:?xt=urn:btih:'+hash.substr(1,hash.length);

    var insert = '<span> - </span><a href="' + url_zoink + '">Zoink.it</a> - <a href="' + url_torrage + '">Torrage</a>';
    $(insert).insertAfter(this); 
});
