namespace HR_management_system.Models.DTOs
{
    public class AttendanceDTO
    {
        public int AttendanceId { get; set; }
        public int EmployeeId { get; set; }
        public string? Status { get; set; }
        public DateTime? CheckInTime { get; set; }
        public DateTime? CheckOutTime { get; set; } 
        public string? Remarks { get; set; }
        public DateTime Date { get; set; } = DateTime.Today;


    }
}
