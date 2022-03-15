using System.Collections.Generic;
using System.Threading.Tasks;
using YonderfulApi.Models;
using System.Drawing;

namespace YonderfulApi.Service
{
    public interface ICategoryService
    {
        Task<IList<Category>> GetCategoryList();
        Task<Category> GetCategory(int categoryId);
        Task<Category> PostCategory(string title, Image icon, Image defaultBackground);
    }
}