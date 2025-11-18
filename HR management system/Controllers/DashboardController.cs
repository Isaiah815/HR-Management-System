using HR_management_system.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HR_management_system.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly APIDBContext _context;
        public DashboardController(APIDBContext context)
        {
            _context = context;
        }

        [HttpGet("summary")]
        public async Task<IActionResult> GetSummary()
        {
            var totalEmployees = await _context.Employees.CountAsync();
            var totalDepartments = await _context.Departments.CountAsync();
            var pendingLeaveRequests = await _context.LeaveRequests
                .CountAsync(l => l.Status.ToString() == "Pending");
            var approvedLeaveRequests = await _context.LeaveRequests
               .CountAsync(l => l.Status.ToString() == "Approved");
            var rejectedLeaveRequests = await _context.LeaveRequests
               .CountAsync(l => l.Status.ToString() == "Rejected");
            var payrollProcessed = await _context.PayRolls.CountAsync();

            var attendanceRecords = await _context.Attendances.CountAsync();

            return Ok(new
            {
                totalEmployees,
                totalDepartments,
                pendingLeaveRequests,
                approvedLeaveRequests,
                rejectedLeaveRequests,
                payrollProcessed,
                attendanceRecords
            });
        }
    }
}
