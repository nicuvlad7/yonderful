using System.Collections.Generic;
using System.Threading.Tasks;
using YonderfulApi.Models;
using System.Drawing;
using YonderfulApi.Data;
using Microsoft.EntityFrameworkCore;

namespace YonderfulApi.Service 
{
  public class PictureService : IPictureService
  {
    private readonly DataContext _context;
    public PictureService(DataContext context) {
        _context = context;
    }
    public async Task<Picture> GetPicture(int pictureId)
    {
      var picture = await _context.Pictures.FindAsync(pictureId);
      return picture;
    }

    public async Task<IList<Picture>> GetPictureList()
    {
        var pictureList = await _context.Pictures.ToListAsync();
        return pictureList;
    }

    public async Task<Picture> GetPictureByNameAndFormat(string name, string fileType)
    {
      var pictureList = await GetPictureList();
      foreach(Picture picture in pictureList) {
        if(picture.Name.ToLower() == name.ToLower() && picture.FileType.ToLower() == fileType.ToLower()) {
          return picture;
        }
      }
      return null;
    }
    public async Task<Picture> PostPicture(string name, string fileType, byte[] content)
    {
        if(await PictureExists(name, fileType, content)) return null;

        var newPicture = new Picture 
        {
            Name = name,
            FileType = fileType,
            Content = content
        };

        _context.Pictures.Add(newPicture);
        await _context.SaveChangesAsync();
        return newPicture;
    }

    public async Task<bool> DeletePicture(int pictureId)
    {
      var picture = await _context.Pictures.FindAsync(pictureId);
            if(picture == null) {
                return false;
            }
            _context.Pictures.Remove(picture);
            return await _context.SaveChangesAsync() > 0;
    }

    private async Task<bool> PictureExists(string name, string fileType, byte[] content) {
        return await _context.Pictures.AnyAsync(cat => cat.Name.ToLower() == name.ToLower() && cat.FileType.ToLower() == fileType.ToLower() && cat.Content.Equals(content));
    }
  }
}