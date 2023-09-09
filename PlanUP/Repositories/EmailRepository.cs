using System;
using System.Net.Mail;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Xml.Linq;
using Microsoft.AspNetCore.Mvc;
using SendGrid;
using SendGrid.Helpers.Mail;
using SendGrid.Helpers.Mail.Model;
using PlanUP.Repositories;


namespace PlanUP.Repositories
{
    public class EmailRepository : IEmailRepository
    {
        private static Timer timer { get; set; }
        private static DateTime targetDateTime { get; set; }

        private static string apiKey = "SG.JQ7uJovyQGCkwGVT8v7Tng.8DiStT27ofV_75grG2Bz8WGc2zi1c0Bs_Gt2IK7fWOA";

        //1. Welcome Email [Official]
        public async Task ExecuteRegisterEmail(string receiverEmail, string receiptientNames, string temporalPassword, string userID)
        {
            try
            {
                var type = "Welcome Notification";
                var client = new SendGridClient(apiKey);
                var from = new EmailAddress("noreply.digifiler@gmail.com", "DigiFiler");
                var subject = "Welcome to DigiFiler";
                var to = new EmailAddress(receiverEmail, receiptientNames);
                var plainTextContent = $"Welcome to DigiFiler {receiptientNames}!\n\nYou have been registered on the DigiFiler system. To access your profile, go to digifiler.gov.za and login with the following details:\n\nUsername: {receiverEmail}\nPassword: {temporalPassword}\n\nAfter Logging In, You can navigate to profile settings to change the password to one you prefer.\n\nWe are happy to have you in our system.";
                var htmlContent = $"<p>Welcome to DigiFiler {receiptientNames}!</p><p>You have been registered to the DigiFiler system. To access your profile, go to <a href='http://localhost:4200/'>digifiler.com</a> and login with the following details:</p><p><strong>Username:</strong> {receiverEmail}</p><p><strong>Password:</strong> {temporalPassword}</p><p>You can go to profile settings to change the password to one you prefer.</p><p>We are happy to have you in our system.</p>";
                var PlainMail = "Welcome to DigiFiler " + receiptientNames + " You have been registered on the DigiFiler system. To access your profile, go to digifiler.gov.za and login with the following details: Username: " + receiverEmail + " Password:" + temporalPassword + " After Logging In, You can navigate to profile settings to change the password to one you prefer. We are happy to have you in our system.";

                var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
                var response = await client.SendEmailAsync(msg);

                Console.WriteLine($"Email sent to {receiverEmail} successfully!");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error sending email to {receiverEmail}: {ex.Message}");
            }
        }

        //2. Forgot Password Notification [Official]
        public async Task ExecuteResetPasswordEmail(string receiverEmail, string receiptientNames, string token, string userID)
        {
            try
            {
                var type = "Forgot Password Notification";
                var client = new SendGridClient(apiKey);
                var from = new EmailAddress("noreply.digifiler@gmail.com", "DigiFiler");
                var subject = "DigiFiler Password Reset Request";
                var to = new EmailAddress(receiverEmail, receiptientNames);
                var plainTextContent = $"Someone has requested a password reset for the following account: Site Name: DigiFiler. Username: </p><p>Click the link below to reset password: </p><p><a href='http://localhost:4200/reset-password?/{token}'>digifiler.com/reset. If it was a mistake, just ignore this email and nothing will happen.";
                var htmlContent = $"<p>Someone has requested a password reset for the following account:</p><p>Site Name: DigiFiler</p><p>Username: {receiverEmail}</p><p>Click the link below to reset password: </p><p><a href='http://localhost:4200/reset-password?token={token}'>CLICK HERE TO RESET YOUR PASSWORD</a></p><p>If it was a mistake, just ignore this email and nothing will happen.</p>";
                var PlainMail = "Someone has requested a password reset for your account.";

                var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
                var response = await client.SendEmailAsync(msg);

                Console.WriteLine($"Email sent to {receiverEmail} successfully!");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error sending email to {receiverEmail}: {ex.Message}");
            }
        }
    }
}
