package com.tractionb2b.scrapper;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * program to extract company urls from given rich company source url Ex
 * http://www.emo-berlin.de/en/about-us/partners/ .
 */
public class CompanyUrlExtractor {
	public static void main(String[] args) {
		String url = "http://www.emo-berlin.de/en/about-us/partners/";
		String pattern = "<a.+href=\"(.+?)\".+class=\"external-link-new-window\".+</a>";

		// Parse HTML into a String buffer and filter by passed pattern
		String htmlString = parseHtml(url, pattern);
		System.out.println(htmlString);
	}

	private static String parseHtml(String urlArg, String targetPattern) {
		StringBuilder html = new StringBuilder();
		URL url = null;
		try {
			url = new URL(urlArg);
		} catch (Exception e) {
			System.err.print(e);
		}
		try (BufferedReader reader = new BufferedReader(new InputStreamReader(url.openStream(), "UTF-8"))) {
			for (String line; (line = reader.readLine()) != null;) {
				// aggregate the plain text HTML containing the target substring
				if (containsPattern(line, targetPattern)) {
					line = trimToMatch(line, targetPattern);
					// System.out.print("\n\n" + line + "\n\n");
					html.append(line + "\n");
				}
			}

		} catch (Exception e) {
			System.err.print(e);
		}
		return html.toString();
	}

	private static boolean containsPattern(String line, String pattern) {
		Pattern p = Pattern.compile(pattern);
		Matcher m = p.matcher(line);
		return m.find();
	}

	private static String trimToMatch(String line, String pattern) {
		Pattern p = Pattern.compile(pattern);
		Matcher m = p.matcher(line);
		if (m.find()) {
			return m.group(1);
		} else {
			return "";
		}
	}

}

// Extract URLs (didn't actually need the library for now,
// but let's leave this here in case we want it later
/*
 * LinkExtractor linkExtractor = LinkExtractor.builder()
 * .linkTypes(EnumSet.of(LinkType.URL)) .build(); Iterable<LinkSpan> links =
 * linkExtractor.extractLinks(htmlString);
 * System.out.print("\n***** EXTRACTED LINKS *****\n\n"); for (LinkSpan link :
 * links) { link.getType(); link.getBeginIndex(); link.getEndIndex(); String
 * result = htmlString.substring(link.getBeginIndex(), link.getEndIndex());
 * System.out.println(result); }
 */
