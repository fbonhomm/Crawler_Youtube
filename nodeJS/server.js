var webdriver = require('selenium-webdriver');
var sleep = require('sleep');
var xpath = require('xpath');

var By = webdriver.By;
var until = webdriver.until;

var driver = new webdriver.Builder()
    .forBrowser('phantomjs')
    .build();

// driver.get('http://www.google.com');
driver.get('https://www.youtube.com/user/GamingBadFR/videos');

// var button = "//button[@class='yt-uix-button yt-uix-button-size-default yt-uix-button-default load-more-button yt-uix-load-more browse-items-load-more-button']";
// var element = driver.find_element_by_xpath(button);
// var element = driver.findElement(webdriver.By.xpath(button));
// element.click();

// while (1) {
//   sleep.sleep(1)
//   try {
//     element = driver.find_element_by_xpath(button);
//   }
//   catch(err) {
//     break;
//   }
//   element.click();
// }
sleep.sleep(1);
var title = driver.getTitle();
var page = driver.page_source;
console.log(page);
console.log(title);

console.log("\n -------------------------------------- ");
driver.quit();