using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net;
using System.IO;
using System.Text;
using System.Collections.Specialized;

namespace BudgetMunchiesAPI.Helpers
{
    public class InternetRequest
    {
        public static string Request(string url)
        {


            WebRequest request;
            
            request = WebRequest.Create(url);

            //request.Method = method;

            //If web proxy is needed
            /* 
            WebProxy myProxy = new WebProxy("myproxy", 80);
            myProxy.BypassProxyOnLocal = true;

            wrGETURL.Proxy = WebProxy.GetDefaultProxy();
            */
            Stream objStream;
            objStream = request.GetResponse().GetResponseStream();

            StreamReader objReader = new StreamReader(objStream);
            string output = objReader.ReadToEnd();
              
            return output;
        }

        public static string Post(string url, NameValueCollection content)
        {
            WebClient client = new WebClient();
            byte[] response =
                client.UploadValues(url, content);

            string result = System.Text.Encoding.UTF8.GetString(response);

            return result;
        }

        public static string PostMSDNMethod(string url)
        {
            // Create a request using a URL that can receive a post. 
            WebRequest request = WebRequest.Create(url);

            // Set the Method property of the request to POST.
            request.Method = "POST";

            // Create POST data and convert it to a byte array.
            string postData = "This is a test that posts this string to a Web server.";
            byte[] byteArray = Encoding.UTF8.GetBytes(postData);

            // Set the ContentType property of the WebRequest.
            request.ContentType = "application/x-www-form-urlencoded";

            // Set the ContentLength property of the WebRequest.
            request.ContentLength = byteArray.Length;

            // Get the request stream.
            Stream dataStream = request.GetRequestStream();

            // Write the data to the request stream.
            dataStream.Write(byteArray, 0, byteArray.Length);

            // Close the Stream object.
            dataStream.Close();

            // Get the response.
            WebResponse response = request.GetResponse();

            // Display the status.
            //Console.WriteLine(((HttpWebResponse)response).StatusDescription.ToString());
            
            // Get the stream containing content returned by the server.
            dataStream = response.GetResponseStream();

            // Open the stream using a StreamReader for easy access.
            StreamReader reader = new StreamReader(dataStream);

            // Read the content.
            string responseFromServer = reader.ReadToEnd();

            
            // Clean up the streams.
            reader.Close();
            dataStream.Close();
            response.Close();

            return responseFromServer;
        }
    }
}