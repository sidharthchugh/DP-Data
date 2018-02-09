package com.tractionb2b.scrapper;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import com.ibm.watson.developer_cloud.alchemy.v1.AlchemyLanguage;
import com.ibm.watson.developer_cloud.alchemy.v1.model.Concepts;
import com.ibm.watson.developer_cloud.alchemy.v1.model.DocumentSentiment;
import com.ibm.watson.developer_cloud.alchemy.v1.model.DocumentText;
import com.ibm.watson.developer_cloud.alchemy.v1.model.DocumentTitle;
import com.ibm.watson.developer_cloud.alchemy.v1.model.Entities;
import com.ibm.watson.developer_cloud.alchemy.v1.model.Keywords;
import com.ibm.watson.developer_cloud.alchemy.v1.model.LanguageSelection;
import com.ibm.watson.developer_cloud.alchemy.v1.model.SAORelations;
import com.ibm.watson.developer_cloud.alchemy.v1.model.Taxonomies;
import com.ibm.watson.developer_cloud.service.exception.BadRequestException;

/**
 * IBM Watson's AlchemyLanguageAPI offers sophisticated natural language
 * processing techniques to analyze the content and add high-level semantic
 * information to documents crawled with Watson Explorer
 * 
 * AlchemyLanguageAPI class takes company url or text as input, 
 * does NLP analysis and returns the result as JSON object
 */
public class AlchemyLanguageAPI {

	public static void main(String[] args) throws Throwable {
		AlchemyLanguage service = new AlchemyLanguage();
		service.setLanguage(LanguageSelection.ENGLISH);
		// service.setLanguage(LanguageSelection.GERMAN);
		//add your Alchemy API key
		service.setApiKey("a730c75afc02b2309d53a35a52cfd9ecdc6f8d67");

		BufferedReader br = null;

		try {

			String sCurrentLine;

			br = new BufferedReader(new FileReader("resources/companyurls.txt"));

			while ((sCurrentLine = br.readLine()) != null) {

				try {
					Map<String, Object> params = new HashMap<String, Object>();
					// params.put(AlchemyLanguage.TEXT, "IBM Watson won the
					// Jeopardy television show hosted by Alex Trebek");
					params.put(AlchemyLanguage.URL, sCurrentLine);
					params.put("language", "english");
					// params.put("language", "german");

					// get sentiment
					DocumentSentiment sentiment = service.getSentiment(params).execute();
					System.out.println("Sentiment: " + sentiment);

					// get entities
					Entities entities = service.getEntities(params).execute();
					System.out.println("Entities: " + entities);

					// get concepts
					Concepts concepts = service.getConcepts(params).execute();
					System.out.println("Concepts: " + concepts);

					/*
					 * Get only DBpedia concepts from the result JSONObject
					 * output = new JSONObject(concepts); List<String> list =
					 * new ArrayList<String>(); JSONArray array =
					 * output.getJSONArray("concepts");
					 * 
					 * for (int i = 0; i < array.length(); i++) {
					 * list.add(array.getJSONObject(i).getString("dbpedia")); }
					 * 
					 * for (String element : list) { System.out.println(element
					 * + "," + sCurrentLine); }
					 * 
					 * list.forEach(System.out::println);
					 */

					/*
					 * Convert JSON object to CSV and write the result to the
					 * file String en = concepts.toString(); JSONObject output =
					 * new JSONObject(en); JSONArray docs =
					 * output.getJSONArray("concepts"); String csv =
					 * CDL.toString(docs); System.out.println(csv);
					 * 
					 * FileWriter writer = new
					 * FileWriter("resources/outputcompanies.txt", true);
					 * writer.append('\n'); writer.write(csv.); writer.flush();
					 * writer.close();
					 * 
					 */

					// get keywords
					Keywords keywords = service.getKeywords(params).execute();
					System.out.println("Keywords: " + keywords);

					// get taxonomy
					Taxonomies taxonomy = service.getTaxonomy(params).execute();
					System.out.println("Taxonomy: " + taxonomy);

					// get typed relations
					SAORelations relations = service.getRelations(params).execute();
					System.out.println("Relations: " + relations);

					// get title
					DocumentTitle title = service.getTitle(params).execute();
					System.out.println("Title: " + title);

					// get text
					DocumentText text = service.getText(params).execute();
					System.out.println("Text: " + text);

				} catch (BadRequestException e) {
					System.out.println("URL not found - " + sCurrentLine);
				}
			}

		} catch (Exception e) {
			throw e;
		}

		finally {
			try {
				if (br != null)
					br.close();
			} catch (IOException ex) {

			}
		}

	}
}
