using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BudgetMunchiesAPI.Models
{
    public class Coupon
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Merchant { get; set; }
        public string Address { get; set; }
        public string Url { get; set; }
        public string ImageUrl { get; set; }
        public string Expiration { get; set; }
        public float Latitude { get; set; }
        public float Longitude { get; set; }

       
    }
}