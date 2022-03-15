using System.Collections.Generic;
using System.Threading.Tasks;
using YonderfulApi.Models;

namespace YonderfulApi.Service
{
    public interface ICategoryService
    {
        Task<IList<Category>> GetCategoryList();
        Task<Category> GetCategory(int categoryId);
        Task<Category> PostCategory(string title, int iconId, int defaultBackgroundId);

        Task<bool> DeleteCategory(int categoryId);
    }
}