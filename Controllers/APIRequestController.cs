using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BudgetMunchiesAPI.Models;
using BudgetMunchiesAPI.Helpers;
using Newtonsoft.Json.Linq;

namespace BudgetMunchiesAPI.Controllers
{
    public class APIRequestController : ApiController
    {
        [HttpGet]
        public JArray Coupons(string location)
        {
            List<Coupon> coupons;
            coupons = SqootRequests.Restruants(location);
            JArray results = JArray.FromObject(coupons);

            return results;

        }
    }
}
