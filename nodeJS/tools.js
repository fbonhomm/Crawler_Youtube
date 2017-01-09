//
// function for crawler
//

var fs = require('fs');
var jsonfile = require('jsonfile');

var fileInfoUsers = 'url.json';

function recoverToTitleVideo($) {
    var balise = $('.yt-lockup-title a');
    var tab = [];
    
    $(balise).each(function(i, link) {   
        var tmp = $(this).attr('title');
        tab[i] = tmp;
    });
    return (tab);
}

function recoverToInfoVideos($) {
    var balise = $('.yt-lockup-title a');
    var json = {data: []};
    
    $(balise).each(function(i, link) {   
        var title = $(this).attr('title');
        var url = $(this).attr('href');
        var obj = new Object();
        obj.title = title;
        obj.url = url;
        json.data.push(obj);
    });
    return (json);
}

function convertToChecksum(tab) {
    var md5 = require('md5');
    var checksum = "";
  
    for(var i = 0; i < 10; i++)
        checksum = checksum + tab[i];
    checksum = md5(checksum);
    return (checksum);
}

function recoverToTitle($) {
  var title = $('title').text();
      
  title = title.replace(/\n/g, '').split('-');
  title = title[0].trim();
  return (title);
}

function validUrl(url, tab) {
  var s1 = "https://www.youtube.com/user/";
  var s2 = "https://www.youtube.com/channel/";
  
  if ((strncmp(url, s1, s1.length) !== 0) || (!tab[4])) {
    if ((strncmp(url, s2, s2.length) !== 0) || (!tab[4])) {
      console.log(' --- Url not valid ---');
      return (0);
    }
  }
  return (1);
}

function existUser(json, line) {
    for (var i = 0; json.users[i]; i++) {
      if (json.users[i].url === line.url)
        return (0);
      if (json.users[i].name === line.name) {
        json.users[i].url = line.url;
        line = '';
        return (1);
      }
    }
    return (1);
}

function strncmp(s1, s2, n) {
  s1 = s1.substring(0, n);
  s2 = s2.substring(0, n);
  return ((s1 == s2) ? 0 : ((s1 > s2) ? 1 : -1));
}

function createJson(file) {
  try {
    fs.accessSync(file, fs.F_OK);
  }
  catch(e) {
    var fd = fs.openSync(file, 'w+');
    fs.closeSync(fd);
    return (1);
  }
  return (0);
}

function  addInfoUsersJson(line) {
    if (createJson(fileInfoUsers))
      var json = {users: []};
    else
      var json = jsonfile.readFileSync(fileInfoUsers);
    if (!existUser(json, line)) {
      console.log(' --- Url already saving ---');
      return (0);
    }
    if (line)
      json.users.push(line);
    jsonfile.writeFileSync(fileInfoUsers, json);
    return (1);
}

function  addInfoVideosJson(obj, fileInfoVideos)
{
  createJson(fileInfoVideos);
  jsonfile.writeFileSync(fileInfoVideos, obj);
}

exports.convertToChecksum = convertToChecksum;
exports.recoverToTitle = recoverToTitle;
exports.recoverToTitleVideo = recoverToTitleVideo;
exports.recoverToInfoVideos = recoverToInfoVideos;
exports.validUrl = validUrl;
exports.existUser = existUser;
exports.strncmp = strncmp;
exports.addInfoUsersJson = addInfoUsersJson;
exports.addInfoVideosJson = addInfoVideosJson;
exports.createJson = createJson;