using System.Collections.Generic;
using System.Threading.Tasks;
using YonderfulApi.Models;
using System.Drawing;

namespace YonderfulApi.Service
{
    public interface IPictureService
    {
        Task<IList<Picture>> GetPictureList();
        Task<Picture> GetPicture(int pictureId);

        Task<Picture> GetPictureByNameFormatContent(string name, string fileType, byte[] content);
        Task<Picture> PostPicture(string name, string fileType, byte[] content);

        Task<bool> DeletePicture(int pictureId);
    }
}