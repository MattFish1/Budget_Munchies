using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json.Linq;
using BudgetMunchiesAPI.Helpers;

namespace BudgetMunchiesAPI.Controllers
{
    public class OrderInApiController : ApiController
    {
        [HttpPost]
        public JArray GetRestruantList(string deliveryTime, string zipCode, string city, string streetAddress)
        {

            JArray response = OrderInRequests.GetRestruantDL(deliveryTime, zipCode, city, streetAddress);
            
            return response;
        }
        [HttpGet]
        public JArray GetMenu(string rid)
        {
            JObject details = OrderInRequests.RestruantDetails(rid);

            var tempMenus = details["menu"];

            JArray menus = JArray.FromObject(tempMenus);

            return menus;
        }
    }
}
