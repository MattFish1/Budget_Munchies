using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BudgetMunchiesAPI.Helpers;
using BudgetMunchiesAPI.Models;
using Newtonsoft.Json.Linq;
using Spire.Pdf;


namespace BudgetMunchiesAPI.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Mail()
        {
            SMPTMessenger.CreateTestMessage();

            return Content("");
        }

        public ActionResult OrderIn()
        {
            return View();
        }

        public ActionResult OrderInMap()
        {
            return View();
        }

        public ActionResult Menu()
        {
            //create a unique GUID document filename and put it into storage path
            string docId = Guid.NewGuid().ToString();
            string outFile = AppDomain.CurrentDomain.BaseDirectory.ToString() + "Content/pdf/" + docId + ".pdf";
            //create a new pdfdocument and a PDF model
            PdfDocument doc = new PdfDocument();

            //pass document through PDF Model generate method
            doc = MenuHelper.CreateMenu(doc);
            //save the file and redirect to generated PDF
            doc.SaveToFile(outFile, FileFormat.PDF);
            Response.Redirect("/Content/pdf/" + docId + ".pdf");

            return Content("");
        }

        [HttpPost]
        public JArray GetRestruantDL(string delivery_time, string zipCode, string city, string streetAddress)
        {
            
            JArray response = OrderInRequests.GetRestruantDL(delivery_time, zipCode, city, streetAddress);
            
            return response;
        }

       [HttpPost]
        public JArray AppStart(string location) 
        {
           
            List<Coupon> content;
            content = SqootRequests.Restruants(location); 
            ViewBag.coupons = content;
            
            JArray result = JArray.FromObject(content);
            return result;
             
        }
    }
}
