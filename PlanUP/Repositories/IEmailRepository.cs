namespace PlanUP.Repositories
{
    public interface IEmailRepository
    {
        Task ExecuteRegisterEmail(string receiverEmail, string receiptientNames, string temporalPassword, string userID);
        Task ExecuteResetPasswordEmail(string receiverEmail, string receiptientNames, string token, string userID);
    }
}
