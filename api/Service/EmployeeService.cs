using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using YonderfulApi.Data;
using YonderfulApi.Models;

namespace YonderfulApi.Service
{
    public class EmployeeService : IEmployeeService
    {
        private readonly DataContext _context;
        public EmployeeService(DataContext context)
        {
            _context = context;
        }

        public async Task<Employee> GetEmployee(int employeeId)
        {
            var employee = await _context.Employees.FindAsync(employeeId);
            return employee;
        }

        public async Task<IList<Employee>> GetEmployeeList()
        {
            var employeeList = await _context.Employees.ToListAsync();
            return employeeList;
        }

        public async Task<Employee> PostEmployee(string firstName, string lastName)
        {
            if (await EmployeeExists(firstName, lastName)) return null;

            var newEmployee = new Employee
            {
                FirstName = firstName,
                LastName = lastName
            };

            _context.Employees.Add(newEmployee);
            await _context.SaveChangesAsync();
            return newEmployee;
        }

        public async Task<bool> DeleteEmployee(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null) return false;

            _context.Employees.Remove(employee);
            return await _context.SaveChangesAsync() > 0;
        }

        private async Task<bool> EmployeeExists(string firstName, string lastName)
        {
            return await _context.Employees.AnyAsync(emp => emp.FirstName.ToLower() == firstName.ToLower() &&
                                                            emp.LastName.ToLower() == lastName.ToLower());
        }
    }
}