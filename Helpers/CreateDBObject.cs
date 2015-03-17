using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


namespace BudgetMunchiesAPI.Helpers
{
    public class CreateDBObject
    {
        public static BMUser BMUser(string userName, string password, string firstName, string lastName, string email)
        {
            BMUser userToCreate = new BMUser();
            userToCreate.UserName = userName;
            userToCreate.Password = password;
            userToCreate.FirstName = firstName;
            userToCreate.LastName = lastName;
            userToCreate.Email = email;

            return userToCreate;
        }

        public static UserToken UserToken(string token, BMUser user)
        {
            UserToken tokenToCreate = new UserToken();
            tokenToCreate.Token = token;
            tokenToCreate.DateCreated = DateTime.Now;
            tokenToCreate.BMUser = user;

            return tokenToCreate;
        }

        public static Developer Developer(string UserName, string Password, string FirstName, string LastName, string ApiKey, string Email)
        {
            Developer devToCreate = new Developer();
            devToCreate.userName = UserName;
            devToCreate.password = Password;
            devToCreate.firstName = FirstName;
            devToCreate.lastName = LastName;
            devToCreate.apiKey = ApiKey;
            devToCreate.email = Email;

            return devToCreate;
        }

        public static DeveloperToken DeveloperToken(string token, Developer dev)
        {
            DeveloperToken tokenToCreate = new DeveloperToken();
            tokenToCreate.Token = token;
            tokenToCreate.DateCreated = DateTime.Now;
            tokenToCreate.Developer = dev;

            return tokenToCreate;
        }
    }
}