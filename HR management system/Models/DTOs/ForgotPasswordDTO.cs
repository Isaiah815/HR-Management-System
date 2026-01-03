namespace HR_management_system.Models.DTOs
{
    public class ForgotPasswordDTO
    {
        public string? Username { get; set; }
    }

    public class ResetPasswordDTO
    {
        public string? Token { get; set; }
        public string? NewPassword { get; set; }
        public string? ConfirmPassword { get; set; }

    }
}

