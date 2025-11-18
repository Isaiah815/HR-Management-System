using HR_management_system.Modules;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HR_management_system.Models.Entities
{
    public class Attendance
    {
        [Key]
        public int AttendanceId { get; set; }

        [Required]
        [ForeignKey("EmployeeId")]
        public int EmployeeId {  get; set; }
        [Required]
        public string? Status {  get; set; }
        public DateTime? CheckInTime { get; set; } 
        public DateTime? CheckOutTime { get; set; } 

        public string? Remarks {  get; set; } 

        public Employee? Employee { get; set; }

        public DateTime Date { get; set; } = DateTime.Today;

    }
}
