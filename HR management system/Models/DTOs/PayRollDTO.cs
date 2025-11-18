namespace HR_management_system.Models.DTOs
{
    public class PayRollDTO
    {
        public int EmployeeId { get; set; }
        public decimal BasicSalary { get; set; }
        public decimal Allowances { get; set; }
        public decimal Deductions { get; set; }
        public DateTime PayDate { get; set; }
    }
}
