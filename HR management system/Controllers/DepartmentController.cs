using HR_management_system.Models;
using HR_management_system.Models.DTOs;
using HR_management_system.Modules;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HR_management_system.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private readonly APIDBContext _context;
        public DepartmentController(APIDBContext context) {
        _context = context;
        }
        [HttpGet]
        public IActionResult GetDepartments() { 
        var departments = _context.Departments.ToList();
            return Ok(departments);
           }

        [HttpGet]
        [Route("{id:int}")]
        public IActionResult GetDepartmentById(int id)
        {
            var department = _context.Departments.Find(id);
            if (department == null) { 
            return NotFound();
            }
            return Ok(department);
        }
        [HttpPost]
        public IActionResult PostDepartments(DepartmentDTO departmentDTO) {
            var departments = new Department
            {
                Name = departmentDTO.Name,
                Description = departmentDTO.Description,

            };
            _context.Departments.Add(departments);
            _context.SaveChanges();
            return Ok(departments);
            }

        [HttpPut("{id:int}")]
    
        public IActionResult UpdateDepartment(int id, UpdatedeptDTO departmentDTO)
        {
            var department = _context.Departments.Find(id);

            if (department == null)
            {
                return NotFound();
            }
            department.Name = departmentDTO.Name;
            department.Description = departmentDTO.Description;
            _context.SaveChanges();

            return Ok(department);

        }

        [HttpDelete("{id:int}")]
        public IActionResult deleteDepartment( int id)
        {
            var department = _context.Departments.Find(id);
            if(department == null) { return NotFound(); }

            _context.Departments.Remove(department);
            _context.SaveChanges();
            return Ok(department);

        }
    }
}
