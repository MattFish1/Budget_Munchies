using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BudgetMunchiesAPI.Models;
using BudgetMunchiesAPI;
using System.Data;
using System.Data.Entity;
using System.Web.Caching;
using System.Web.SessionState;
using System.Web.Configuration;
using BudgetMunchiesAPI.Helpers;


namespace BudgetMunchiesAPI.Controllers
{
    
    public class UserController : Controller
    {
        //global variables
        Cache cache = new Cache();
        //SessionStateItemCollection session = new SessionStateItemCollection();
        BudgetMunchiesDBEntities db = new BudgetMunchiesDBEntities();
        
        public ActionResult Index()
        {
            //Session["loggedIn"] = false;
            return View();
        }

        //User 
        
        [HttpGet]
        public ActionResult UserSignIn()
        {
            return View();
        }

        [HttpPost]
        public ActionResult UserSignIn(string userName, string password)
        { 
            string result;
            string tokenGuid = Guid.NewGuid().ToString();
    
            BMUser user = db.BMUsers.Find(userName);
   
            if(user.Password == password && Session["user"] == null)
            {   
                //create token
                UserToken token = CreateDBObject.UserToken(tokenGuid, user);
                db.UserTokens.Add(token);
                db.SaveChanges();
                //add user and token to session
                Session["userToken"] = tokenGuid;
                Session["user"] = user.UserName;

                //create result output
                result = token.BMUser.UserName + " login Successfull. Token: " + token.Token; //Session["userToken"];
            }
            else if(Session["user"] != null)
            {
                result = "Login failed. Another user is already logged in.";
            }
            else
            {
                result = "Login failed. Invalid username or password.";
            }

            return Content(result);
            
        }

        [HttpPost]
        public ActionResult UserSignOut()
        {
            string result;
            UserToken tokenToRemove = db.UserTokens.Find(Session["userToken"]);
            db.UserTokens.Remove(tokenToRemove);
            db.SaveChanges();

            UserToken removedToken = db.UserTokens.Find(Session["userToken"]);
            Session.Clear();
           
            
            if(removedToken == null)
            {
                result = "Successfully logged out"; 
            }
            else{
                result = "Loggout failed";
            }

            return Content(result);
        }

        [HttpPost]
        public ActionResult CreateNormalAccount(string userName, string password, string firstName, string lastName, string email)
        {
            
            BMUser userToCreate = CreateDBObject.BMUser(userName, password, firstName, lastName, email);
            db.BMUsers.Add(userToCreate);
            db.SaveChanges();

            string results;

            BMUser createdUser = db.BMUsers.Find(userToCreate.UserName);
            if (createdUser == null)
            {
                results = "User creation failed.";
            }
            else
            {
                results = "User: " + createdUser.UserName + " successfully created!";
            }

            return Content(results);
        }

        //orders placed to orderin
        public ActionResult UserOrder()
        {

            return Content("");
        }

        //Developer
        public ActionResult DeveloperSignIn(string userName, string password)
        {
            string result;
            string tokenGuid = Guid.NewGuid().ToString();
            Developer dev = db.Developers.Find(userName);

            DeveloperToken token = CreateDBObject.DeveloperToken(tokenGuid, dev);
            db.DeveloperTokens.Add(token);
            db.SaveChanges();

            if (dev.password == password)
            {
                cache["userToken"] = tokenGuid;
                result = "Login Successfull";
            }
            else
            {
                result = "Login not successfull. Invalid username or password.";
            }

            return Content(result);

        }

        [HttpGet]
        public ActionResult GetDeveloper(string userName)
        {
            Developer dev = db.Developers.Find(userName);
            return Content(dev.userName);
        }

        public ActionResult CreateAccount()
        {

            return View();
        }

        

        [HttpPost]
        public ActionResult CreateDeveloperAccount(string userName, string password, string firstName, string lastName, string email)
        {
            string apiKey = Guid.NewGuid().ToString();

            string results;

            Developer developerToCreate = CreateDBObject.Developer(userName, password, firstName, lastName, apiKey, email);

            
            db.Developers.Add(developerToCreate);
            db.SaveChanges();
            
            Developer createdDeveloper = db.Developers.Find(developerToCreate.userName);
            
            if(createdDeveloper == null)
            {
                results = "Developer creation failed.";
            }
            else
            {
                results = "Developer: " + createdDeveloper.userName + " successfully created!" + "Your API Key is " + createdDeveloper.apiKey; 
               //add "Your API Key will be emailed to you." when smpt request is fixed
            }

            return Content(results);

        }

        public ActionResult Test()
        {
            Session["test"] = "test";
            UserToken testToken = CreateDBObject.UserToken("testToken", db.BMUsers.Find("matt_fish"));
            /*
            Session["user"] = "user";
            PagesEnableSessionState sessionState = new PagesEnableSessionState();
            Session.Abandon();
            System.Web.Security.FormsAuthentication.SignOut();
            return Content("Current user is: " + Session["user"] + ". Session state is " + sessionState);
            */
            return Content("Test Page");
        }

        public ActionResult Test2()
        {
            return Content("Test Session: " + Session["test"].ToString() + "Test Token: " + db.UserTokens.Find("testToken"));
        }

     
    }
}