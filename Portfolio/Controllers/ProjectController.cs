using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Portfolio.Models;

namespace Portfolio.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly ProjectsContext db;

        public ProjectController(ProjectsContext context)
        {
            db = context;
        }

        [HttpGet("[action]")]
        async public Task<UserProjectsWithPhoto> GetProject(string id)
        {
            try
            {
                UserProjectsWithPhoto Result = new UserProjectsWithPhoto();
                Result.Project = await db.Projects.FirstOrDefaultAsync(p => p.ID == Convert.ToInt32(id));
                Result.ProjectPhotos = await db.ProjectPhotos.Where(ph => ph.ProjectID == Result.Project.ID).ToListAsync();
                return Result;
            }
            catch
            {
                return new UserProjectsWithPhoto();
            }
        }

        [HttpGet("[action]")]
        public bool CheckEdit(string id)
        {
            try
            {
                if (User.Identity.Name == db.Users.FirstOrDefault(u => u.ID == db.Projects.FirstOrDefault(p => p.ID == Convert.ToInt32(id)).UserID).Login)
                    return true;
                else
                    return false;
            }
            catch
            {
                return false;
            }
        }
    }
}