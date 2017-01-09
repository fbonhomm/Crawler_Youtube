from bs4 import BeautifulSoup
import time

from selenium.webdriver import Firefox

url = "https://www.youtube.com/user/GamingBadFR"
url = url + "/videos"
driver = Firefox()
button = "//button[@class='subnav-sort-menu yt-uix-button yt-uix-button-default yt-uix-button-size-default']"
button_inside = "//span[@class=' yt-uix-button-menu-item spf-link' @class=' yt-uix-button-menu-item spf-link']"
#Date added (newest)
driver.get(url)
element = driver.find_element_by_xpath(button)
element.click()

<button class="subnav-sort-menu yt-uix-button yt-uix-button-default yt-uix-button-size-default" <span class="yt-uix-button-content">Date added (newest)</span><span class="yt-uix-button-arrow yt-sprite"></span><ul class=" yt-uix-button-menu yt-uix-button-menu-default hid"><li <span class=" yt-uix-button-menu-item spf-link" >Most popular</span></li><li <span class=" yt-uix-button-menu-item spf-link">Date added (oldest)</span></li></ul></button>
