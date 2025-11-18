using HR_management_system.Models;
using HR_management_system.Models.DTOs;
using HR_management_system.Models.Mappers;
using HR_management_system.Modules;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HR_management_system.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeaveRequestController : ControllerBase
    {
        private readonly APIDBContext _context;
        public LeaveRequestController(APIDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAllRequests()
        {
            var requests = _context.LeaveRequests.
                Include(lr => lr.Employee)
                .Include(lr => lr.Department)


                .ToList();
            var dtoList = requests.Select(LeaveRequestMapper.ToDTO).ToList();
            return Ok(dtoList);
        }

        [HttpGet("{id:int}")]
        public IActionResult GetRequestById(int id)
        {
            var request = _context.LeaveRequests
                .Include(lr => lr.Employee)
                .Include(lr => lr.Department)
                .FirstOrDefault(lr => lr.LeaveRequestId == id);
            if (request == null)
            {
                return NotFound();
            }
            var dto = LeaveRequestMapper.ToDTO(request);
            return Ok(dto);
        }
        [HttpPost]
        public IActionResult CreateRequest(LeaveRequestCreate requestDTO)
        {
            var leaveRequest = new LeaveRequest
            {
                EmployeeId = requestDTO.EmployeeId,
                DepartmentId = requestDTO.DepartmentId,
                StartDate = requestDTO.StartDate,
                EndDate = requestDTO.EndDate,
                Reason = requestDTO.Reason,
                Status = requestDTO.Status
            };
            _context.LeaveRequests.Add(leaveRequest);
            _context.SaveChanges();
            return Ok(leaveRequest);
        }
        [HttpPut("{id:int}")]
        public IActionResult UpdateRequests(int id,LeaveUpdateDTO leaveUpdate) {
            var requests = _context.LeaveRequests.Find(id); 

            if (requests == null) {
                return NotFound(); 
            }
            requests.EmployeeId = leaveUpdate.EmployeeId;
            requests.DepartmentId = leaveUpdate.DepartmentId;
            requests.StartDate = leaveUpdate.StartDate;
            requests.EndDate = leaveUpdate.EndDate;
            requests.Reason = leaveUpdate.Reason;
            requests.Status = leaveUpdate.Status;
            _context.SaveChanges();
            return Ok(requests);
        
        }
        [HttpDelete("{id:int}")]
        public IActionResult DeleteRequest(int id)
        {
            var request = _context.LeaveRequests.Find(id);
            _context.LeaveRequests.Remove(request);
            _context.SaveChanges();
            return Ok(request);

        }
    }
}
