package com.tractionb2b.scrapper;
import java.util.EnumMap;
import java.util.Map;
import java.util.Scanner;
import com.google.code.linkedinapi.client.CompaniesApiClient;
import com.google.code.linkedinapi.client.LinkedInApiClient;
import com.google.code.linkedinapi.client.LinkedInApiClientFactory;
import com.google.code.linkedinapi.client.enumeration.SearchParameter;
import com.google.code.linkedinapi.client.oauth.LinkedInAccessToken;
import com.google.code.linkedinapi.client.oauth.LinkedInOAuthService;
import com.google.code.linkedinapi.client.oauth.LinkedInOAuthServiceFactory;
import com.google.code.linkedinapi.client.oauth.LinkedInRequestToken;
import com.google.code.linkedinapi.schema.Companies;
import com.google.code.linkedinapi.schema.Company;

/**
 * The LinkedIn scrapper takes keywords(company names) as input 
 * and returns company information
 */
public class LinkedinScrapper 
{
 
    private static Scanner s;
 
    public static void main(String[] args) 
    {
 
        String linkedinKey = "78tduokvmrjv76";    //add your LinkedIn key
        String linkedinSecret = "hGGQpOauNITT124I"; //add your LinkedIn Secret
         
        LinkedInOAuthService oauthService;
        LinkedInRequestToken requestToken;
           
        System.out.println("Fetching request token from LinkedIn...");  
        String authUrl = null;
        String authToken,authTokenSecret;
         
        oauthService= LinkedInOAuthServiceFactory.getInstance().createLinkedInOAuthService(linkedinKey,linkedinSecret); 
        requestToken= oauthService.getOAuthRequestToken();
        authToken= requestToken.getToken();  
        authTokenSecret = requestToken.getTokenSecret();  
        
        System.out.println("Request token " +requestToken);
        System.out.println("Auth token" +authToken);
        System.out.println("Auth token secret" +authTokenSecret);
         
        authUrl = requestToken.getAuthorizationUrl();
 
        System.out.println("Copy below link in web browser to authorize. Copy the PIN obtained\n" + authUrl);
        System.out.println("Enter the PIN code:");
         
        String pin;
         
        try
            {
         
                s = new Scanner(System.in);
                pin = s.next();  
                System.out.println("Fetching access token from LinkedIn...");
         
                LinkedInAccessToken accessToken =  oauthService.getOAuthAccessToken(requestToken, pin);
                System.out.println("Access token : " +  accessToken.getToken());
                System.out.println("Token secret : " +  accessToken.getTokenSecret());
                final LinkedInApiClientFactory factory =  LinkedInApiClientFactory.newInstance(linkedinKey,linkedinSecret);
                final LinkedInApiClient client =  factory.createLinkedInApiClient(accessToken);
        
                //posting status to profile
                //client.updateCurrentStatus("LinkedIN API is cool!");
               // client.searchCompanies(Map<SearchParameter, String> searchParameters);
             
    			Map<SearchParameter, String> searchParameters = new EnumMap<SearchParameter, String>(
    					SearchParameter.class);     
				searchParameters.put(SearchParameter.KEYWORDS, "TractionB2B");
    			 Companies companieList = client.searchCompanies(searchParameters);
    			
    			  traverseCompanies(companieList, client);
    			//  System.out.println(companieList);
            }
 
        finally
        {
            System.out.println("Updated status!");
         
        }
        
        
    }
    
	/*private static void traverseCompanies(Companies companies,
			CompaniesApiClient client, String qryStr) {
		for (Company company : companies.getCompanyList()) {

			if (company.getName().equalsIgnoreCase(qryStr)) {
				Products companyProducts = client.getCompanyProducts(
						company.getId(), EnumSet.allOf(ProductField.class));
				for (Product product : companyProducts.getProductList()) {
					printResult(product);
				}
			}
		}
	}
	*/

	private static void traverseCompanies(Companies companies,
			CompaniesApiClient client) {
		for (Company company : companies.getCompanyList()) {
			System.out.println(" Company Name : "+company.getName());
			System.out.println(" Company Id : "+company.getId());
			System.out.println(" Company Founded Year : "+company.getFoundedYear());
			System.out.println(" Company Industry : "+company.getIndustry());
			System.out.println(" Company Description : "+company.getDescription());
			/*Products companyProducts = client.getCompanyProducts(
					company.getId(), EnumSet.allOf(ProductField.class));
			for (Product product : companyProducts.getProductList()) {
				printResult(product); 
			} */
		}
	}
	
/*	private static void printResult(Product product) {
		System.out.println("================================");
		System.out.println("Name:" + product.getName());
		System.out.println("Type:" + product.getType().getName());
		System.out.println("Timestamp:" + product.getCreationTimestamp());
		System.out.println("Description:" + product.getDescription());
		System.out.println("Features:");
		for (String featureName : product.getFeatures().getFeatureList()) {
			System.out.println("      " + featureName);
		}
		System.out.println("Recommendation count:"
				+ product.getNumRecommendations());
		System.out.println("URL:" + product.getWebsiteUrl());
		System.out
				.println("Category:" + product.getProductCategory().getName());
	}
	*/
}