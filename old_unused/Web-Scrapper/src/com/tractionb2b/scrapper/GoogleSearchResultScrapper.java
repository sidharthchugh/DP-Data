package com.tractionb2b.scrapper;
import java.io.BufferedReader;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

/**
 * The GoogleSearchResultScrapper takes keywords(company names) from 
 * company names file as input and scraps company and company contact information
 * from google search result and writes to a file 
 * comments.
 */
public class GoogleSearchResultScrapper {

	public static void main(String args[]) {

		BufferedReader br = null;
		Document doc;
		
		// To avoid blocking by google search engine, different user agents are created and are taken randomly
		//while hitting google 
		List<String> list = new ArrayList<String>();
		list.add("Mozilla/5.0 (Macintosh; Intel Mac OS X 10.7.5) AppleWebKit/537.12.28 (KHTML, like Gecko) Chrome/55.0.2748.86 Safari/537.12.28");
		list.add("Mozilla/5.0 (Windows NT 8.0; Win64; x64) AppleWebKit/536.26 (KHTML, like Gecko) Chrome/55.0.2748.43 Safari/536.26");
		list.add("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_8) AppleWebKit/535.37 (KHTML, like Gecko) Chrome/52.0.2710.61 Safari/535.37");
		list.add("Mozilla/5.0 (Windows NT 6.0; WOW64) AppleWebKit/536.27.32 (KHTML, like Gecko) Chrome/55.0.2733.45 Safari/536.27.32");
		list.add("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_19_6) AppleWebKit/537.16 (KHTML, like Gecko) Chrome/54.0.2742.49 Safari/537.16");
		list.add("Mozilla/5.0 (Windows NT 7.0; WOW64) AppleWebKit/536.25 (KHTML, like Gecko) Chrome/55.0.2727.31 Safari/536.25");
		list.add("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/536.37 (KHTML, like Gecko) Chrome/56.0.2733.95 Safari/536.37");
		list.add("Mozilla/5.0 (Windows NT 7.1) AppleWebKit/535.14.19 (KHTML, like Gecko) Chrome/57.0.2744.54 Safari/535.14.19");
		list.add("Mozilla/5.0 (Windows NT 6.0; Win64; x64) AppleWebKit/535.13 (KHTML, like Gecko) Chrome/54.0.2706.70 Safari/535.13");
		list.add("Mozilla/5.0 (Windows NT 8.0; Win64; x64) AppleWebKit/536.22 (KHTML, like Gecko) Chrome/56.0.2725.48 Safari/536.22");
		Random randomizer = new Random();
		String random = list.get(randomizer.nextInt(list.size()));
		
		try {

			String sCurrentLine;
			br = new BufferedReader(new FileReader("resources/companynames.txt"));

			// take the keyword from the file and get google search result
			while (true && (sCurrentLine = br.readLine()) != null) {
				doc = Jsoup.connect("https://www.google.com/search?q=" + sCurrentLine).userAgent(random)
						.ignoreHttpErrors(true).timeout(5000).get();
				
				Elements links = doc.getAllElements();

			//	Element titles = links.select("h3[class=r]").first();
			//	String title = titles.text();

			//	Elements bodies = links.select("span[class=st]");
			//	String body = bodies.text();
				
				Elements companyNames = links.select("div[class=kno-ecr-pt kno-fb-ctx _hdf]");
				String companyName = companyNames.text();
				
				Elements urls = doc.select("div._ldf > a[href]");
				String url = urls.attr("href");
				
				Elements addresses = links.select("span[class=_Xbe]");
				String address = addresses.text();
				
				Elements phoneNumbers = links.select("span[data-dtype=d3ph]");
				String phoneNumber = phoneNumbers.text();

				//System.out.println("Title: " + title);
				//System.out.println("Body: " + body);
				//System.out.println("CompanyName: "+ companyName);
				//System.out.println("CompanyWebsite: "+ url);
				//System.out.println("Address: "+ address);
				//System.out.println("PhoneNumber: "+ phoneNumber);
				
				System.out.println(sCurrentLine+"," +companyName +"," +url +"," + address +"," + phoneNumber );
				
				// To avoid blocking by google search engine, created a time gap between each hit to search engine
				Thread.sleep(1 * 40 * 1000);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
