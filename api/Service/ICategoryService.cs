using System.Collections.Generic;
using System.Threading.Tasks;
using YonderfulApi.Models;
using System.IO; 

namespace YonderfulApi.Service
{
    public interface ICategoryService
    {
        Task<IList<Category>> GetCategoryList();
        Task<Category> GetCategory(int categoryId);
        Task<Category> PostCategory(string title, MemoryStream icon, MemoryStream defaultBackground);
    }
}