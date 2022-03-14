using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using YonderfulApi.DTOs;
using YonderfulApi.Service;

namespace YonderfulApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;
        private readonly IMapper _mapper;

        public EmployeeController(IEmployeeService employeeService, IMapper mapper)
        {
            _employeeService = employeeService;
            _mapper = mapper;
        }

        [HttpGet("{employeeId}")]
        public async Task<IActionResult> GetEmployee(int employeeId)
        {
            var employee = await _employeeService.GetEmployee(employeeId);
            if (employee == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<EmployeeDto>(employee));
        }

        [HttpGet]
        public async Task<IActionResult> GetEmployeeList()
        {
            var employeeList = await _employeeService.GetEmployeeList();
            if (employeeList == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<IList<EmployeeDto>>(employeeList));
        }

        [HttpPost]
        public async Task<IActionResult> PostEmployee(EmployeeDto employee)
        {
            var newEmployee = await _employeeService.PostEmployee(employee.FirstName, employee.LastName);
            if (newEmployee == null)
            {
                return BadRequest();
            }
            return Created(nameof(GetEmployee), _mapper.Map<EmployeeDto>(newEmployee));
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteEmployee(int employeeId)
        {
            var removedEmployee = await _employeeService.DeleteEmployee(employeeId);
            return removedEmployee ? Ok() : BadRequest();
        }
    }
}