namespace HR_management_system.Models.DTOs
{
    public class EmplDTO
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }

        public string Email { get; set; }
        public string JobTitle { get; set; }
        public int DepartmentId { get; set; }
    }
}
