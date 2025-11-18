using HR_management_system.Modules;
using System.Text.Json.Serialization;

namespace HR_management_system.Models.DTOs
{
    public class EmployeeDTO
    {
        public int Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string Email { get; set; }
        public string? JobTitle { get; set; }
        public int DepartmentId { get; set; }

        public DepartmentDTO Department { get; set; } = new DepartmentDTO();

       

    }
}
