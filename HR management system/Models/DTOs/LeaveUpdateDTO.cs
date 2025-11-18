namespace HR_management_system.Models.DTOs
{
    public class LeaveUpdateDTO
    {
        public int EmployeeId { get; set; }
        public int DepartmentId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Reason { get; set; }
        public LeaveStatus Status { get; set; }
    }
}
