using System.Collections.Generic;
using System.Threading.Tasks;
using YonderfulApi.Models;

namespace YonderfulApi.Service
{
    public interface IEmployeeService
    {
        Task<IList<Employee>> GetEmployeeList();
        Task<Employee> GetEmployee(int employeeId);
        Task<Employee> PostEmployee(string firstName, string lastName);
        Task<bool> DeleteEmployee(int id);
    }
}