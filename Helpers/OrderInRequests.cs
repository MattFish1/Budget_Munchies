using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using BudgetMunchiesAPI.Helpers;
using Newtonsoft.Json.Linq;

namespace BudgetMunchiesAPI.Helpers
{
    public class OrderInRequests
    {
        static private string testUrl = "https://r-test.ordr.in/";
        static private string url = "https://r.ordr.in/";
        static private string secretApiKey = "vPhd3KpKHAZpW_o5Icc4uyXoQBhaln9PBV0V0jhMNjU";
        static private string publicApiKey = "IfJCthNWmbwb2luVYElHQtuLkbQY9cSpV7Ijvxb4ZNU";
        //dfsaddsfsa
        //Gets a list of restruants that deliver to a specified address
        static public JArray GetRestruantDL(string delivery_time, string zipCode, string city, string streetAddress)
        {
            //dl/[datetime]/[zip]/[city]/[addr]
            //example: https://r-test.ordr.in/dl/ASAP/80226/Lakewood/7177%20W.%20Kentucky%20Dr./?_auth=1,vPhd3KpKHAZpW_o5Icc4uyXoQBhaln9PBV0V0jhMNjU
            string requestUrl = testUrl + "dl/" + delivery_time + "/" + zipCode + "/" + city + "/" + streetAddress + "/?_auth=1," + secretApiKey;
            
            //make http request
            JArray content = JArray.Parse(InternetRequest.Request(requestUrl));
            
            return content;
        }

        static public JObject RestruantDetails(string restruantID)
        {
            //dfsa
            //example: https://r-test.ordr.in/rd/5097?_auth=1,vPhd3KpKHAZpW_o5Icc4uyXoQBhaln9PBV0V0jhMNjU
            string requestUrl = testUrl + "/rd/" + restruantID + "/?_auth=1,vPhd3KpKHAZpW_o5Icc4uyXoQBhaln9PBV0V0jhMNjU";
            JObject response = JObject.Parse(InternetRequest.Request(requestUrl));

            return response;
        }

        static public string Order(
            string restruantID, string tray, string tip, string delivery_date, string delivery_time, string first_name, string last_name 
            ,string address, string city, string state, string zip, string phone, string email, string card_Name, string card_Number, string card_Cvc 
            ,string card_Expire, string card_Bill_Add, string card_Bill_City, string card_Bill_State, string card_Bill_Phone
            ) 
        {
            string requestUrl = testUrl + "/o/" + restruantID + "/?_auth=" + secretApiKey;

            return "";
        }


    }
}