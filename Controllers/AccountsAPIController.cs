using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json.Linq;
using System.Data;
using System.Data.Entity;

namespace BudgetMunchiesAPI.Controllers
{
    public class AccountsAPIController : ApiController
    {
        BudgetMunchiesDBEntities db = new BudgetMunchiesDBEntities();

        [HttpGet]
        public string SearchForUser(string userName)
        {
            
            BMUser search = db.BMUsers.Find(userName); 

            string result;

            if(search != null)
            {
                result = "User " + search.UserName + " found.";
            }
            else{
                result = "Requested user not found.";
            }

            return result;
        }
    }
}
