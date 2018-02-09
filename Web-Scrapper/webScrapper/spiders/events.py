import scrapy
import time

class StartupNight(scrapy.Spider):
    name = "startup_night"
    start_urls = ['https://www.startupnight.net/startups#our_startups']

    BASE_URL = 'https://www.startupnight.net'

    def parse(self, response):
        links = response.css('.work-ext-link ::attr(href)').extract()
        for link in links:
            absolute_url = self.BASE_URL + link
            yield scrapy.Request(absolute_url, callback=self.parse_attr)

    def parse_attr(self, response):
        COMPANY_NAME = '//*[@id="block-rhythm-sub-content"]/div/article/h1/span/text()'
        COMPANY_SLOGAN = '//*[@id="block-rhythm-sub-content"]/div/article/div[2]/p/text()[1]'
        COMPANY_WEBSITE='//*[@id="block-rhythm-sub-content"]/div/article/div[4]/div[2]/div/a/@href'
        COMPANY_DESCRIPTION = '//*[@id="block-rhythm-sub-content"]/div/article/div[3]/p/text()'
        COMPANY_DESCRIPTION2 = '//*[@id="block-rhythm-sub-content"]/div/article/div[3]/p[2]/text()'
        FACEBOOK_LINK = '//*[@id="block-rhythm-sub-content"]/div/article/div[5]/div[2]/div[1]/a/@href'
        TWITTER_LINK = '//*[@id="block-rhythm-sub-content"]/div/article/div[5]/div[2]/div[2]/a/@href'
        INDUSTRY = '//*[@id="block-rhythm-sub-content"]/div/article/div[1]/h4'

        yield {
            'passiveProfileSource': 'StartupNight',
            'profileCreatedBy':'WebScrapper',
            'organizationType':'Startup',
            'createdAt_Date': time.strftime("%d %B %Y"),
            'createdAt': int(time.time()),
            'companyName': response.xpath(COMPANY_NAME).extract_first() if response.xpath(COMPANY_NAME).extract_first() is not None else '',
            'companySlogan' : response.xpath(COMPANY_SLOGAN).extract_first() if response.xpath(COMPANY_SLOGAN).extract_first() is not None else '',
            'companyDescription' :response.xpath(COMPANY_DESCRIPTION).extract() if response.xpath(COMPANY_DESCRIPTION).extract() is not None else response.xpath(COMPANY_DESCRIPTION2).extract(),
            'companyWebsite': response.xpath(COMPANY_WEBSITE).extract_first() if response.xpath(COMPANY_WEBSITE).extract_first() is not None else '',
            'facebook': response.xpath(FACEBOOK_LINK).extract_first() if response.xpath(FACEBOOK_LINK).extract_first() is not None else '',
            'twitter': response.xpath(TWITTER_LINK).extract_first() if response.xpath(TWITTER_LINK).extract_first() is not None else '',
            'industry':response.xpath(INDUSTRY).extract()[0].split('<a href', 1)[0].replace('<h4>', '') if response.xpath(INDUSTRY).extract()[0].split('<a href', 1)[0].replace('<h4>', '') is not None else ''
        }