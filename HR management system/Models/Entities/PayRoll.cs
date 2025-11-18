using HR_management_system.Modules;
using System.ComponentModel.DataAnnotations;

namespace HR_management_system.Models.Entities
{
    public class PayRoll
    {
        public int PayRollId { get; set; }
        public int EmployeeId { get; set; }

        [Range(0,double.MaxValue,ErrorMessage ="Basic Salary should not be negative value")]
        public decimal BasicSalary { get; set; }

        [Range(0,double.MaxValue,ErrorMessage ="Allowance should not be negative value")]
        public decimal Allowances { get; set; }
        [Range(0, double.MaxValue, ErrorMessage = "Deductions should not be negative value")]


        public decimal Deductions { get; set; }
        [Range(0, double.MaxValue, ErrorMessage = "Net salary should not be negative value")]

        public decimal NetSalary { get; set; }
        public DateTime PayDate { get; set; }
        public Employee ?Employee { get; set; }
    }
}
