using HR_management_system.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace HR_management_system.Modules
{
    public class Employee
    {
        [Key]
        public int Id {  get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }

        public string Email {  get; set; }
        public string ? JobTitle { get; set; }
        public int DepartmentId {  get; set; }

        [ForeignKey("DepartmentId")]

        public Department Department { get; set; }
        public ICollection<LeaveRequest> LeaveRequests { get; set; }


    }
}
