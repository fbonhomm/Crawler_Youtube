from bs4 import BeautifulSoup
import time

from selenium.webdriver import Firefox

i = 0;

def insert_duration(line):
	soup = BeautifulSoup(line, "html.parser")
	data = soup.get_text()
	global i
	i = i + 1
	print "Index:", i
	print "Duration:", data

def insert_title(line):
	soup = BeautifulSoup(line, "html.parser")
	print "Title:", soup.a.string

def insert_view_and_date(line):
	soup = BeautifulSoup(line, "html.parser")
	tab = ["View:", "Upload:"]
	index = 0
	for element in soup.select('li'):
		print tab[index], element.text
		index += 1
	print "\n"

def insert(line):
	if line.find("video-time") > 1: #duration
		insert_duration(line)
	elif line.find("yt-lockup-title") > 1: #title
		insert_title(line)
	elif line.find("yt-lockup-meta-info") > 1: #view et date
		insert_view_and_date(line)

url = "https://www.youtube.com/user/GamingBadFR"
url = url + "/videos"
driver = Firefox()
button = "//button[@class='yt-uix-button yt-uix-button-size-default yt-uix-button-default load-more-button yt-uix-load-more browse-items-load-more-button']"
driver.get(url)
element = driver.find_element_by_xpath(button)
element.click()
while 1:
	time.sleep(1)
	try:
		element = driver.find_element_by_xpath(button)
	except:
		break
	element.click()
page = driver.page_source
line = ''
for letter in page:
	if letter != '\n':
		line = line + letter
	else:
		insert(line)
		line = ''
