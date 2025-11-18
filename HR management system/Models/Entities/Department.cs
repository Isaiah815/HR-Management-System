using HR_management_system.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace HR_management_system.Modules
{
    public class Department
    {
        [Key]
        public int DepartmentId {  get; set; }
        [Required]
        [MaxLength(100)]
        public string? Name { get; set; }
        [Required]
        [MaxLength(250)]
        public string ?Description { get; set; }

        [JsonIgnore]
        public ICollection<Employee> Employees { get; set; }
        [JsonIgnore]
        public ICollection<LeaveRequest> LeaveRequests { get; set; }

    }
}
