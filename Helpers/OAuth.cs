using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using OAuth;
  
namespace BudgetMunchiesAPI.Helpers
{
    public class OAuth
    {
        OAuthRequest client = new OAuthRequest
        {
            Method = "GET",
            Type = OAuthRequestType.RequestToken,
            SignatureMethod = OAuthSignatureMethod.HmacSha1,
            ConsumerKey = "CONSUMER_KEY",
            ConsumerSecret = "CONSUMER_SECRET",
            RequestUrl = "http://twitter.com/oauth/request_token",
            Version = "1.0a",
            Realm = "twitter.com"
        };
    }
}