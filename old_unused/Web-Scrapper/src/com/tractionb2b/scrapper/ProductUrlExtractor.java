package com.tractionb2b.scrapper;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

/**
 * program to list all inlinks and filter all product/solution links from a
 * given company url .
 */
public class ProductUrlExtractor {
	private static BufferedReader br;

	public static void main(String[] args) throws IOException {

		String url;
		br = new BufferedReader(new FileReader("resources/companyurls.txt"));
		while ((url = br.readLine()) != null) {

			// System.out.println("Fetching %s..."+ url);

			Document doc = Jsoup.connect(url).timeout(10 * 1000).get();
			Elements links = doc.select("a[href]");

			// String filter = links.toString();
			String filter = links.toString().replaceAll("<a href=\"", "").replaceAll("\".*", "");

			String patternString = "(.*products.*|.*product.*|.*solutions*.|"
					+ ".*solution*.|.*products-technology*.|.*software-solutions*.)";

			Pattern pattern = Pattern.compile(patternString);
			Matcher matcher = pattern.matcher(filter);

			while (matcher.find()) {
				String group = matcher.group();
				System.out.println(group);
				FileWriter writer = new FileWriter("resources/producturls.txt", true);
				writer.append('\n');
				writer.write(group);
				writer.flush();
				writer.close();

			}

		}
	}

}
