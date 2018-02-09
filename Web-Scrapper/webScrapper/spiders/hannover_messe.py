import scrapy
import time
from selenium import webdriver
from selenium.common.exceptions import WebDriverException
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from scrapy.http import TextResponse

class Hannovermesse(scrapy.Spider):
    name = "hannovermesse"
    allowed_domains = ["hannovermesse.de"]
    start_urls = ['http://www.hannovermesse.de/en/exhibition/exhibitors-products/advanced-search/']

    def __init__(self):
        self.profile = webdriver.FirefoxProfile()
        self.profile.set_preference('network.proxy.type', 1)
        self.profile.set_preference('network.proxy.socks', '127.0.0.1')
        self.profile.set_preference('network.proxy.socks_port', 9050)
        self.driver = webdriver.Firefox(self.profile)
        self.counter = 1

    # now we need to use Selenium to activate a javescript button to search on basis of sector all the page
    def parse(self,response):
        self.driver.get('http://www.hannovermesse.de/en/exhibition/exhibitors-products/advanced-search/')

        wait = WebDriverWait(self.driver, 5)

        wait.until(EC.element_to_be_clickable((By.XPATH, '//*[@id="searchAP:search"]/section/div[6]/div/div/div[2]/div[2]')))
        showallbutton = WebDriverWait(self.driver, 10).until(EC.element_to_be_clickable((By.XPATH, '//*[@id="searchAP:search"]/section/div[6]/div/div/div[2]/div[2]/a')))
        showallbutton.click();
        self.driver.execute_script("document.getElementById('searchAP:zb:442:r').click()")
        self.driver.find_element_by_xpath('//*[@id="searchAP:searchButton2"]').click();


        #searchAP:zb:1:r Agriculture, forestry and fishing
        #searchAP:zb:18:r Mining and extracting rocks and earth
        #searchAP:zb:35:r Manufacturing industry
        #searchAP:zb:220:r Energy supply
        #searchAP:zb:229:r  Water supply, sewage and refuse disposal, sanitation and similar activities
        #searchAP:zb:239:r  Construction/construction industry
        #searchAP:zb:251:r  Sale, maintenance and repair of motor vehicles
        #searchAP:zb:291:r  Transportation and storage
        #searchAP:zb:312:r  Hotels and restaurants/lodging and catering 
        #searchAP:zb:320:r Information and communication
        #searchAP:zb:351:r  Provision of financial and insurance services
        #searchAP:zb:357:r  Real estate activities
        #searchAP:zb:361:r Provision of freelanced, scientific and technical services
        #searchAP:zb:379:r Provision of other business activities
        #searchAP:zb:394:r Public adminstration, defence and social security
        #searchAP:zb:404:r  Education
        #searchAP:zb:412:r Human health and social work activities
        #searchAP:zb:425:r Arts, entertainment and recreation
        #searchAP:zb:430:r Recreational, cultural and sporting activities; other
        #searchAP:zb:439:r Households
        #searchAP:zb:440:r  Extra-territorial organisations and bodies
        #searchAP:zb:441:r All sectors, sector independent
        #searchAP:zb:442:r pupils, students



        # Now that the webpage is all revealed Scrapy can bring down all the Company URLs
        # I.e. we need to follow the link for every companys to get onto its page to get our data
        response1 = TextResponse(url=response.url, body=self.driver.page_source, encoding='utf-8')
        for href in response1.css('.search-link ::attr(href)'):
            url = response1.urljoin(href.extract())
            yield scrapy.Request(url, callback=self.parse_dir_contents)

     
    def RepresentsInt(self, s):
        try: 
            int(s)
            return True
        except ValueError:
            return False

    # and now Scrapy can take the contents of  all the companies from their URL page
    def parse_dir_contents(self, response):
        COMPANY_NAME = '//*[@id="exhibitorDetail:exhibitor"]/div[2]/div/section/div/div[1]/div/div/div[1]/h3/text()'
        COMPANY_SLOGAN = '//*[@id="exhibitorDetail:exhibitor"]/section[1]/div/div[2]/header/h2/text()'
        CONTACT_NAME = '//*[@id="exhibitorDetail:exhibitor"]/div[2]/div/section/div/div[1]/div/div/div[1]/h3/text()'
        BUSINESS_TYPE = '//*[@id="exhibitorDetail:exhibitor"]/div[2]/div/section/div/div[3]/div/p[1]/text()'
        CONTACT_NAME= '//*[@id="exhibitorDetail:exhibitor"]/div[2]/div/section/div/div[2]/div/div/div/div[1]/span[2]/text()'
        YEAR_FOUNDED='//*[@id="exhibitorDetail:exhibitor"]/div[2]/div/section/div/div[3]/div/p[2]/text()'
        NO_OF_EMPLOYEES='//*[@id="exhibitorDetail:exhibitor"]/div[2]/div/section/div/div[3]/div/p[3]/text()'
        COMPANY_DESCRIPTION='//*[@id="exhibitorDetail:exhibitor"]/div[3]/div/div/article/div/p/text()'
        STREET_ADDRESS='//*[@id="exhibitorDetail:exhibitor"]/div[2]/div/section/div/div[1]/div/div/address/div[1]/text()'
        CONTACT_POSITION='//*[@id="exhibitorDetail:exhibitor"]/div[2]/div/section/div/div[2]/div/div/div/div[1]/div/span/text()'
        COMPANY_WEBSITE='.icon-external-link ::attr(href)'
        ZIP_CODE='//*[@id="exhibitorDetail:exhibitor"]/div[2]/div/section/div/div[1]/div/div/address/div[2]/text()'
        COUNTRY='//*[@id="exhibitorDetail:exhibitor"]/div[2]/div/section/div/div[1]/div/div/address/div[3]/text()'
        COMPANY_PHONE='//*[@id="exhibitorDetail:exhibitor"]/div[2]/div/section/div/div[1]/div/div/div[2]/div[1]/text()'
        PRODUCT_DESCRIPTION='.productlist-item p ::text'
        PRODUCT_NAME='.productlist-item a ::text'
        PRODUCT_DESCRIPTION='.productlist-item P ::text'
        PRODUCT_CATEGORIES= '[id^="exhibitorDetail:exhibitor:j_idt409"] ::text'

        PRODUCT_NAMES = response.css(PRODUCT_NAME).extract() if response.css(PRODUCT_NAME).extract() is not None else ''
        PRODUCT_DESCRIPTIONS = response.css(PRODUCT_DESCRIPTION).extract() if response.css(PRODUCT_DESCRIPTION).extract() is not None else ''
        PRODUCT_CATEGORIES = response.css(PRODUCT_CATEGORIES).extract() if response.css(PRODUCT_CATEGORIES).extract() is not None else ''

        productName_list = [product_name.replace('read more', '').replace('\n', '').replace('\t', '').replace('...', '') for product_name in PRODUCT_NAMES]
        productDescription_list = [product_name.replace('read more', '').replace('\n', '').replace('\t', '').replace('...', '') for product_name in PRODUCT_DESCRIPTIONS]
        productCategories_list = [product_name.replace('read more', '').replace('\n', '').replace('\t', '').replace('...', '') for product_name in PRODUCT_CATEGORIES]
    
        yield {
            'passiveProfileSource': 'HannoverMesse',
            'profileCreatedBy':'WebScrapper',
            'createdAt_Date': time.strftime("%d %B %Y"),
            'createdAt': int(time.time()),
            'companyName': response.xpath(COMPANY_NAME).extract_first().replace('\"', '').replace('\r', '').split('\n', 1)[0] if response.xpath(COMPANY_NAME).extract_first() is not None else '',
            'businessType': response.xpath(BUSINESS_TYPE).extract()[1].replace('\n', '').replace('\t', '') if response.xpath(BUSINESS_TYPE).extract() and response.xpath(BUSINESS_TYPE).extract()[1] is not None and self.RepresentsInt(response.xpath(BUSINESS_TYPE).extract()[1].replace('\n', '').replace('\t', '')) is not True and "Status" not in response.xpath(BUSINESS_TYPE).extract()[1] else '',
            'contactName': response.xpath(CONTACT_NAME).extract_first().replace('\"', '').replace('\r', '').split('\n', 1)[0] if response.xpath(CONTACT_NAME).extract_first() is not None and len(response.xpath(CONTACT_NAME).extract_first().replace('\"', '').replace('\r', '').split('\n', 1)[0]) > 4 and response.xpath(CONTACT_NAME).extract_first().replace('\"', '').replace('\r', '').split('\n', 1)[0] != 'Dipl.-Ing.' else '',
            'companySlogan' : response.xpath(COMPANY_SLOGAN).extract_first().replace('\"', '').replace('\r', '').split('\n', 1)[0] if response.xpath(COMPANY_SLOGAN).extract_first() is not None else '',
            'yearFounded' : response.xpath(YEAR_FOUNDED).extract()[1].replace('\n', '').replace('\t', '') if response.xpath(YEAR_FOUNDED).extract() and response.xpath(YEAR_FOUNDED).extract()[1] is not None and "Status" not in response.xpath(YEAR_FOUNDED).extract()[1] else '',
            'ftes' : response.xpath(NO_OF_EMPLOYEES).extract()[1].replace('\n', '').replace('\t', '').split('(Status', 1)[0] if response.xpath(NO_OF_EMPLOYEES).extract() and response.xpath(NO_OF_EMPLOYEES).extract()[1] is not None and ("between" in response.xpath(NO_OF_EMPLOYEES).extract()[1].replace('\n', '').replace('\t', '').split('(Status', 1)[0] or "over" in response.xpath(NO_OF_EMPLOYEES).extract()[1]) is not True else '',
            'revenue' : response.xpath(NO_OF_EMPLOYEES).extract()[1].replace('\n', '').replace('\t', '').split('(Status', 1)[0] if response.xpath(NO_OF_EMPLOYEES).extract() and response.xpath(NO_OF_EMPLOYEES).extract()[1] is not None and ("between" in response.xpath(NO_OF_EMPLOYEES).extract()[1].replace('\n', '').replace('\t', '').split('(Status', 1)[0] or "over" in response.xpath(NO_OF_EMPLOYEES).extract()[1]) else '',
            'companyDescription' :response.xpath(COMPANY_DESCRIPTION).extract_first().replace('\"', '').replace('\r', '').split('\n', 1)[0] if response.xpath(COMPANY_DESCRIPTION).extract_first() is not None else '',
            'companyWebsite': response.css(COMPANY_WEBSITE).extract_first().replace('\"', '').replace('\r', '').split('\n', 1)[0] if response.css(COMPANY_WEBSITE).extract_first() is not None else '',
            'companyPhone': response.xpath(COMPANY_PHONE).extract_first().replace('\"', '').replace('Phone: ', '').replace('\r', '').split('\n', 1)[0] if response.xpath(COMPANY_PHONE).extract_first() is not None else '',
            'streetAddress': response.xpath(STREET_ADDRESS).extract_first().replace('\"', '').replace('\r', '').split('\n', 1)[0] if response.xpath(STREET_ADDRESS).extract_first() is not None and len(response.xpath(STREET_ADDRESS).extract_first().replace('\"', '').replace('\r', '').split('\n', 1)[0]) > 4 else '',
            'zipCode': response.xpath(ZIP_CODE).extract_first().replace('\"', '').replace('\r', '').split(' ', 1)[0].split('\n', 1)[0] if response.xpath(ZIP_CODE).extract_first() is not None else '',
            'city': response.xpath(ZIP_CODE).extract_first().replace('\"', '').replace('\r', '').split(' ', 2)[1].split('\n', 1)[0] if response.xpath(ZIP_CODE).extract_first() is not None and self.RepresentsInt(response.xpath(ZIP_CODE).extract_first().replace('\"', '').replace('\r', '').split(' ', 2)[1].split('\n', 1)[0]) is not True and len(response.xpath(ZIP_CODE).extract_first().replace('\"', '').replace('\r', '').split(' ', 2)[1].split('\n', 1)[0]) > 4 else '',
            'country': response.xpath(COUNTRY).extract_first().replace('\"', '').replace('\r', '').split('\n', 1)[0] if response.xpath(COUNTRY).extract_first() is not None else '',
            'sector':'pupils, students',
            'productName' : '; '.join(list(filter(None, productName_list))),
            'productDescription' : '; '.join(list(filter(None, productDescription_list))),
            'productCategories' : '; '.join(list(filter(None, productCategories_list)))
        }
        
        if(self.counter is not 4 and self.counter is not 5):
           self.counter += 1
        index = str(self.counter)
        try:
            pagination =self.driver.find_element_by_xpath('//*[@id="searchResult:search"]/section[2]/div/div/div[2]/section[23]/div/div/div/ul/li[' + index + ']/a')
            #time.sleep(3) # sleep for 3 seconds
            pagination.click()
        except WebDriverException:
            self.driver.quit()
            #self.driver.get('http://www.hannovermesse.de/en/exhibition/exhibitors-products/advanced-search/') 
            # checkboxArray = ['searchAP:zb:18:r', 'searchAP:zb:35:r', 'searchAP:zb:220:r', 'searchAP:zb:239:r', 'searchAP:zb:251:r', 'searchAP:zb:291:r', 'searchAP:zb:312:r']
            # self.driver.get('http://www.hannovermesse.de/en/exhibition/exhibitors-products/advanced-search/')
            # WebDriverWait(self.driver, 5).until(EC.element_to_be_clickable((By.XPATH, '//*[@id="searchAP:search"]/section/div[6]/div/div/div[2]/div[2]')))
            # self.driver.execute_script("document.getElementById('${checkboxArray[1]}').click()")
            # self.driver.find_element_by_xpath('//*[@id="searchAP:searchButton2"]').click();
            # self.counter = 1;
            # self.parse_dir_contents(self, response)
        response2 = TextResponse(url=response.url, body=self.driver.page_source, encoding='utf-8')
        for href in response2.css('.search-link ::attr(href)'):
            url = response2.urljoin(href.extract())
            yield scrapy.Request(url, callback=self.parse_dir_contents)