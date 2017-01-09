var request = require("request");
var readline = require('readline');
var cheerio = require('cheerio');
var tools = require('./tools.js');

var fileInfoUsers = 'url.json';

var read = readline.createInterface ({
    input: process.stdin,
    output: process.stdout
});

read.question(">> URL: ", function(answer) {
    var url = answer;
    // var url = "https://www.youtube.com/user/GamingBadFR/videos";
    read.close();
    
    var tab = url.split('/');
    
    if (!tools.validUrl(url, tab))
      return ;

    url = 'https://www.youtube.com/' + tab[3] + '/' + tab[4] + '/videos?flow=grid&view=0&sort=dd';
    
    request(url, function(err, res, html)
    {
      if (err) {
        console.log(' --- Url not valid ---');
        return ;
      }
      var $ = cheerio.load(html);
      
      tab = tools.recoverToTitleVideo($);
      var checksum = tools.convertToChecksum(tab);
      var title = tools.recoverToTitle($);
      var info = tools.recoverToInfoVideos($);
      
      var obj = new Object();
      obj.name = title;
      obj.url = url;
      obj.json = title.replace(/\s/g, '_') + '.json';
      obj.checksum = checksum;
      
      if (!tools.addInfoUsersJson(obj))
        return ;
      tools.addInfoVideosJson(info, obj.json);
    });
});
// https://www.youtube.com/watch?v=Vq0e1eb7xtk
// https://www.youtube.com/channel/UCCMxHHciWRBBouzk-PGzmtQ/videos