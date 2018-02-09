import scrapy
import time
from selenium import webdriver
from selenium.common.exceptions import WebDriverException
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from scrapy.http import TextResponse

class BundSpider(scrapy.Spider):
    name = "bund_de"
    start_urls = ['http://www.service.bund.de/Content/DE/Ausschreibungen/Suche/Formular.html?nn=4641482&cl2Categories_AllocationType=sonstige&type=0&cl2Categories_LeistungenErzeugnisse=leistung-forschungundentwicklung']

    def __init__(self):
        self.profile = webdriver.FirefoxProfile()
        self.profile.set_preference('network.proxy.type', 1)
        self.profile.set_preference('network.proxy.socks', '127.0.0.1')
        self.profile.set_preference('network.proxy.socks_port', 9050)
        self.driver = webdriver.Firefox(self.profile)

    # now we need to use Selenium to activate a javescript button to search on basis of sector all the page
    def parse(self,response):
        self.driver.get('http://www.service.bund.de/Content/DE/Ausschreibungen/Suche/Formular.html?nn=4641482&cl2Categories_AllocationType=sonstige&type=0&cl2Categories_LeistungenErzeugnisse=leistung-forschungundentwicklung')

        PROJECT_POSTED_DATE = '.result-list div[aria-labelledby="date"] p'
        PROJECT_APP_DEADLINE = '.result-list div[aria-labelledby="location"] p'
        COMPANY_NAME = '.result-list div[aria-labelledby="title"] p'
        PROJECT_NAME = '.result-list a ::attr(title)'
        PROJECT_NAMES = response.css(PROJECT_NAME).extract();

        PROJECTS_POSTED_DATE = response.css(PROJECT_POSTED_DATE).extract();

        PROJECTS_APP_DEADLINE = response.css(PROJECT_APP_DEADLINE).extract();

        COMPANY_NAMES = response.css(COMPANY_NAME).extract();

        i = 0
        while i < len(PROJECT_NAMES):
            yield {
                'passiveProfileSource': 'Bund.de',
                'profileCreatedBy':'WebScrapper',
                'createdAt_Date': time.strftime("%d %B %Y"),
                'createdAt': int(time.time()),
                'projectName': PROJECT_NAMES[i].replace('Zur Ausschreibung', '').replace('\'', ''),
                'projectType' : 'Other',
                'projectPostedDate': PROJECTS_POSTED_DATE[i].split('</em> ', 1)[1].replace('</p>', ''),
                'projectAppDeadline': PROJECTS_APP_DEADLINE[i].split('</em> ', 1)[1].replace('</p>', ''),
                'companyName': COMPANY_NAMES[i].split('</em> ', 1)[1].replace('</p>', ''),
                'projectClass':'Research and Development'
            }
            i +=1
