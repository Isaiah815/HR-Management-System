using HR_management_system.Models;
using HR_management_system.Models.DTOs;
using HR_management_system.Models.Entities;
using Microsoft.AspNetCore.Mvc;

namespace HR_management_system.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PayRollController : ControllerBase
    {
        private readonly APIDBContext _context;

        public PayRollController(APIDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetPayRolls()
        {
            var payRolls = _context.PayRolls.ToList();
            return Ok(payRolls);
        }

        [HttpGet("{id:int}")]
        public IActionResult GetPayRollById(int id)
        {
            var payRoll = _context.PayRolls.Find(id);
            if (payRoll == null)
                return NotFound();

            return Ok(payRoll);
        }

        [HttpPost]
        public IActionResult PostPayRoll(PayRollDTO dto)
        {
            if (dto.BasicSalary < 0 || dto.Allowances < 0)
                return BadRequest("Salary and allowances cannot be negative.");

            // ✅ Automatically calculate deductions as 20% of (Basic + Allowances)
            var deductions = 0.2m * (dto.BasicSalary + dto.Allowances);

            var netSalary = dto.BasicSalary + dto.Allowances - deductions;
            if (netSalary < 0)
                return BadRequest("Invalid salary calculation.");

            var payRoll = new PayRoll
            {
                EmployeeId = dto.EmployeeId,
                BasicSalary = dto.BasicSalary,
                Allowances = dto.Allowances,
                Deductions = deductions,
                NetSalary = netSalary,
                PayDate = dto.PayDate
            };

            _context.PayRolls.Add(payRoll);
            _context.SaveChanges();

            return Ok(payRoll);
        }

        [HttpPut("{id:int}")]
        public IActionResult UpdatePayRoll(int id, PayRollDTO dto)
        {
            if (dto.BasicSalary < 0 || dto.Allowances < 0)
                return BadRequest("Salary and allowances cannot be negative.");

            var payRoll = _context.PayRolls.Find(id);
            if (payRoll == null)
                return NotFound();

            // ✅ Automatically recalculate deductions (20%)
            var deductions = 0.2m * (dto.BasicSalary + dto.Allowances);
            var netSalary = dto.BasicSalary + dto.Allowances - deductions;

            if (netSalary < 0)
                return BadRequest("Invalid salary calculation.");

            payRoll.EmployeeId = dto.EmployeeId;
            payRoll.BasicSalary = dto.BasicSalary;
            payRoll.Allowances = dto.Allowances;
            payRoll.Deductions = deductions;
            payRoll.NetSalary = netSalary;
            payRoll.PayDate = dto.PayDate;

            _context.PayRolls.Update(payRoll);
            _context.SaveChanges();

            return Ok(payRoll);
        }

        [HttpDelete("{id:int}")]
        public IActionResult DeletePayRoll(int id)
        {
            var payRoll = _context.PayRolls.Find(id);
            if (payRoll == null)
                return NotFound();

            _context.PayRolls.Remove(payRoll);
            _context.SaveChanges();

            return Ok(new { message = "Deleted successfully" });
        }
    }
}
