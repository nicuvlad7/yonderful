using System.Collections.Generic;
using System.Threading.Tasks;
using YonderfulApi.Models;
using System.Drawing;
using YonderfulApi.Data;
using Microsoft.EntityFrameworkCore;
using System;

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

    public int CreatePictureFromFileString(string fileString) {
        var newPicture = new Picture 
        {
            Name = fileString.Split('/')[^1],
            FileType = fileString.Split('.')[^1],
            Content = System.IO.File.ReadAllBytes(fileString)
        };
        var existingPicture = GetPictureByNameFormatContent(newPicture);
        if(existingPicture == null) {
            return PostPicture(newPicture).Id;
        }
        return existingPicture.Id;
    }

    public async Task<string> GetPictureContent(string pictureIdStr) {
        var iconPicture = await GetPicture(Int32.Parse(pictureIdStr));
        return System.Text.Encoding.Default.GetString(iconPicture.Content);
    }


  }
}