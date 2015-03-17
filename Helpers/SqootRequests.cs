using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using BudgetMunchiesAPI.Helpers;
using BudgetMunchiesAPI.Models;
using Newtonsoft.Json.Linq;

namespace BudgetMunchiesAPI.Helpers
{
    public class SqootRequests
    {
        
        public static List<Coupon> Restruants(string location)
        {
            string publicKey = "pclzir";
            
            string category = "restaurants";
            string requestUrl = "http://api.sqoot.com/v2/coupons?location=" + location + "&api_key=" + publicKey + "&category_slugs=" + category;
            List<Coupon> results = new List<Coupon>();
        
            string response = InternetRequest.Request(requestUrl);
            JObject jObj = JObject.Parse(response);

            var obj = from Coupons in jObj["coupons"].Children()
                      select new
                      {
                          coupon = Coupons["coupon"]

                      };

            foreach (var item in obj)
            {
                JObject tempJObj = JObject.Parse(item.coupon.ToString().Replace("=", ":"));


                Coupon coupon = new Coupon();

                coupon.Title = tempJObj["title"].ToString();
                coupon.Description = tempJObj["description"].ToString();
                coupon.Url = tempJObj["untracked_url"].ToString();
                coupon.Expiration = tempJObj["expires_at"].ToString();

                var merchantObj = from Merchants in tempJObj["merchants"].Children()

                                  select new
                                  {
                                      merchant = Merchants["merchant"],
                                      address = Merchants["merchant"]["address"],
                                      name = Merchants["merchant"]["name"],
                                      longitude = Merchants["merchant"]["longitude"],
                                      latitude = Merchants["merchant"]["latitude"]

                                  };

                foreach (var merchant in merchantObj)
                {
                    JObject tempMerchant = JObject.Parse(merchant.merchant.ToString());
                    coupon.Address = merchant.address.ToString();
                    coupon.Merchant = merchant.name.ToString();
                    coupon.Latitude = Single.Parse(merchant.latitude.ToString());
                    coupon.Longitude = Single.Parse(merchant.longitude.ToString());
                }
                results.Add(coupon);
            }
            return results;
        }
    }
}