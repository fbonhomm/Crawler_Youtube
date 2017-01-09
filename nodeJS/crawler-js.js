var request = require("request");
var cheerio = require('cheerio');
var jsonfile = require('jsonfile');
var tools = require('./tools.js');

var fileInfoUsers = 'url.json';

var json = jsonfile.readFileSync(fileInfoUsers);

function updateInfoUsers(obj, i, $, checksum, info) {
  obj.users[i].checksum = checksum;
  tools.addInfoVideosJson(info, obj.users[i].json);
  jsonfile.writeFileSync(fileInfoUsers, obj);
}

function checkNewVideos(info, json) {
  if (json.data[0].url === info.data[0].url)
    return (0);
  return (1);
}

function addNewVideos(info, json, name) {
  var fileNewVideos = 'newVideos.json';
  
  if (tools.createJson(fileNewVideos))
    var news = {news: {}};
  else
    var news = jsonfile.readFileSync(fileNewVideos);
    
  if (!news.news[name])
    news.news[name] = [];

  for(var i = 0; info.data[i]; i++) {
    if (json.data[0].url === info.data[i].url) {
      if (i == 0)
        return ;
      for(var j = 0; j < i; j++) {
        var obj = new Object();
        obj.title = info.data[j].title;
        obj.url = info.data[j].url;
        news.news[name].push(obj);
      }
      console.log(news);
      jsonfile.writeFileSync(fileNewVideos, news);
      return ;
    }
  }
}

function loopRequest(obj, i) {
  request(obj.users[i].url, function(err, res, html)
  {
    if (err) {
      console.log(' --- Url not valid ---');
      return ;
    }
    var $ = cheerio.load(html);
    var tab = tools.recoverToTitleVideo($);
    var checksum = tools.convertToChecksum(tab);
    
    if (obj.users[i].checksum !== checksum)
    {
      var info = tools.recoverToInfoVideos($);
      var json = jsonfile.readFileSync(obj.users[i].json);
      if (checkNewVideos(info, json))
      {
        addNewVideos(info, json, obj.users[i].name);
      }
      updateInfoUsers(obj, i, $, checksum, info);
    }
  });
}

for(var i = 0; i < json.users.length; i++) {
  loopRequest(json, i);
}