using HR_management_system.Models;
using HR_management_system.Models.DTOs;
using HR_management_system.Models.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HR_management_system.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AttendanceController : ControllerBase
    {
        private readonly APIDBContext _context;
        public AttendanceController(APIDBContext context)
        {
            _context = context;
        }
        [HttpGet]
        public IActionResult GetAttendances()
        {
            var attendances = _context.Attendances.ToList();
            return Ok(attendances);
        }
        [HttpGet]
        [Route("{id:int}")]
        public IActionResult GetAttendanceById(int id)
        {
            var attendance = _context.Attendances.Find(id);
            if (attendance == null)
            {
                return NotFound();
            }
            return Ok(attendance);
    }
        [HttpPost]
        public async Task<IActionResult> CreateAttendance([FromBody] Attendance attendance)
        {
            if (attendance == null)
                return BadRequest();

            // ✅ If frontend didn't send a date, use today's
            if (attendance.Date == default)
                attendance.Date = DateTime.Today;

            // ✅ Prevent duplicate attendance for same employee and date
            bool exists = await _context.Attendances
                .AnyAsync(a => a.EmployeeId == attendance.EmployeeId && a.Date.Date == attendance.Date.Date);

            if (exists)
                return Conflict(new { message = "Attendance for this employee already exists for the selected date." });

            _context.Attendances.Add(attendance);
            await _context.SaveChangesAsync();
            return Ok(attendance);
        }

        [HttpPut]
        [Route("{id:int}")]
        public IActionResult UpdateAttendance(int id, AttendanceDTO dto)
        {
            var attendance = _context.Attendances.Find(id);
            if (attendance == null)
            {
                return NotFound();
            }
            attendance.EmployeeId = dto.EmployeeId;
            attendance.Status = dto.Status;
            attendance.CheckInTime = dto.CheckInTime;
            attendance.CheckOutTime = dto.CheckOutTime;
            attendance.Remarks = dto.Remarks;
            _context.SaveChanges();
            return Ok(new {message = "Updated succssfully"});
        }

        [HttpDelete]
        [Route("{id:int}")]
        public IActionResult DeleteAttendance(int id)
        {
            var attendance = _context.Attendances.Find(id);
            if (attendance == null)
            {
                return NotFound();
            }
            _context.Attendances.Remove(attendance);
            _context.SaveChanges();
            return Ok(new { message = "Deleted successfully" });
        }


    }
}
