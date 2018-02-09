# DigtialPartners-Scrapper

This project includes
- Java implementation of the AlchemyAPI SDK
- Google Search Results Scrapper
- Linkedin Scrapper
- Web crawlers - To extract company and product urls from given url


## Prerequisites for using AlchemyAPI
Please see the [Introduction](https://github.com/Watson-Explorer/wex-wdc-integration-samples) for an overview of the integration architecture, and the tools and libraries that need to be installed to create Java-based applications in Bluemix.

- An [IBM Bluemix](https://ace.ng.bluemix.net/) account
- An API key from the [AlchemyAPI website](https://www.alchemyapi.com/api/register.html)

## Dependencies

- Java 1.8
- Maven 3.3.9
- Jsoup 1.10.1


## For Web Scrapper

- cd Web-Scrapper

- Download GeckDriver for Firefox and assign to path variable in .bash_profile

        export PATH=$PATH:/Users/sidharthchugh/Downloads

- Brew Install Tor

- Brew Install privoxy

        cp /usr/local/etc/privoxy/config /usr/local/opt/privoxy/sbin/

            actionsfile match-all.action
            actionsfile default.action
            actionsfile user.action
            filterfile default.filter
            filterfile user.filter
            logfile logfile
            listen-address  127.0.0.1:8118
            toggle  1
            enable-remote-toggle  0
            enable-remote-http-toggle  0
            enable-edit-actions 0
            enforce-blocks 0
            buffer-limit 4096
            enable-proxy-authentication-forwarding 0
            forward-socks5   /               127.0.0.1:9050 .
            forward-socks4a  /               127.0.0.1:9050 .
            forward         192.168.*.*/     .
            forward            10.*.*.*/     .
            forward           127.*.*.*/     .
            forward           localhost/     .
            forwarded-connect-retries  0
            accept-intercepted-requests 0
            allow-cgi-request-crunching 0
            split-large-forms 0
            keep-alive-timeout 5
            tolerate-pipelining 1
            socket-timeout 300

        cp /usr/local/opt/privoxy/sbin/config $HOME
        open /usr/local/opt/tor/bin/tor
        
- brew services start tor

- brew services start privoxy

- netstat -an | grep 8118

- scrapy crawl hannovermesse

- Packages Install

        BeautifulSoup
        Image
        Selenium
        Scrapy
        time