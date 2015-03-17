using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using BudgetMunchiesAPI.Models;

namespace BudgetMunchiesAPI.Models
{
    public class TokenValidation
    {
        

        public static bool ValidateUserToken(string token, string userName)
        {
            BudgetMunchiesDBEntities db = new BudgetMunchiesDBEntities();
            BMUser user = db.BMUsers.Find(userName);
            UserToken tokenToValidate = user.UserTokens.Where(x => x.Token == token).First();

            TimeSpan TokenLifeTime = DateTime.Now - tokenToValidate.DateCreated;
            TimeSpan TokenExpiration = new TimeSpan(0, 45, 0);

            if (tokenToValidate != null && TokenLifeTime < TokenExpiration)
            {
                return true;
            }
            else
                return false;
        }
    }
}