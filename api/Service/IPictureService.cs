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

        Task<Picture> GetPictureByNameFormatContent(Picture picture);
        Task<Picture> PostPicture(Picture newPicture);

        Task<bool> DeletePicture(int pictureId);

        int CreatePictureFromFileString(string fileString);

        Task<string> GetPictureContent(string pictureIdStr);
    }
}