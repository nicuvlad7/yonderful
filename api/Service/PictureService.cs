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

    public async Task<Picture> GetPictureByNameFormatContent(Picture picture)
    {
      var pictureList = await GetPictureList();
      foreach(Picture pictureInList in pictureList) {
        if(picture.Name.ToLower() == pictureInList.Name.ToLower() && picture.FileType.ToLower() == pictureInList.FileType.ToLower() && picture.Content.Equals(pictureInList.Content)) {
          return pictureInList;
        }
      }
      return null;
    }
    public async Task<Picture> PostPicture(Picture newPicture)
    {
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
  }
}