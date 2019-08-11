using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Portfolio.Models;

namespace Portfolio.Controllers
{
    /// <summary>
    /// Основной контроллер
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class MainController : ControllerBase
    {
        private readonly ProjectsContext db; //контекст
        /// <summary>
        /// Конструктор
        /// </summary>
        /// <param name="context">Контекст данных</param>
        public MainController(ProjectsContext context) => db = context;
        /// <summary>
        /// Запрос на получение данных о проектах
        /// </summary>
        /// <returns>Возвращает все проекты</returns>
        [HttpGet("[action]")]
        async public Task<IEnumerable<ProjectWithYears>> GetProjects(string uid)
        {
            try
            {
                List<ProjectWithYears> projects = new List<ProjectWithYears>();
                List<UserProjectsWithPhoto> Result = new List<UserProjectsWithPhoto>();
                var _Projects = await db.Projects.Where(p => p.UserID == Convert.ToInt32(uid)).ToListAsync();
                foreach (var p in _Projects)
                {
                    if (projects.Exists(_p => _p.year == p.DateEnd.Year))
                    {
                        projects.First(pr => pr.year == p.DateEnd.Year).UserProjectsWithPhotos.Add(new UserProjectsWithPhoto
                        {
                            Project = p,
                            ProjectPhotos = await db.ProjectPhotos.Where(ph => ph.ProjectID == p.ID).ToListAsync()
                        });
                    }
                    else
                    {
                        projects.Add(new ProjectWithYears
                        {
                            year = p.DateEnd.Year,
                            UserProjectsWithPhotos = new List<UserProjectsWithPhoto>() { new UserProjectsWithPhoto
                            {
                                Project = p,
                                ProjectPhotos = await db.ProjectPhotos.Where(ph => ph.ProjectID == p.ID).ToListAsync()
                            }
                            }
                        });
                    }
                    /*
                    Result.Add(new UserProjectsWithPhoto
                    {
                        Project = p,
                        ProjectPhotos = await db.ProjectPhotos.Where(ph => ph.ProjectID == p.ID).ToListAsync()
                    });*/
                }
                return projects;
            }
            catch
            {
                return new List<ProjectWithYears>();
            }
        }
        /*
        [HttpGet("[action]")]
        async public Task<IEnumerable<UserProjectsWithPhoto>> GetProjects(string uid)
        {
            try
            {
                List<ProjectWithYears> projects = new List<ProjectWithYears>();
                List<UserProjectsWithPhoto> Result = new List<UserProjectsWithPhoto>();
                var _Projects = await db.Projects.Where(p => p.UserID == Convert.ToInt32(uid)).ToListAsync();
                foreach (var p in _Projects)
                {
                    if (projects.Exists(_p => _p.year == p.DateEnd.Year))
                    {
                        projects.First(pr => pr.year == p.DateEnd.Year).UserProjectsWithPhotos.Add(new UserProjectsWithPhoto
                        {
                            Project = p,
                            ProjectPhotos = await db.ProjectPhotos.Where(ph => ph.ProjectID == p.ID).ToListAsync()
                        });
                    }
                    else
                    {
                        projects.Add(new ProjectWithYears
                        {
                            year = p.DateEnd.Year,
                            UserProjectsWithPhotos = new List<UserProjectsWithPhoto>() { new UserProjectsWithPhoto
                            {
                                Project = p,
                                ProjectPhotos = await db.ProjectPhotos.Where(ph => ph.ProjectID == p.ID).ToListAsync()
                            }
                            }
                        });
                    }
                    
                    Result.Add(new UserProjectsWithPhoto
                    {
                        Project = p,
                        ProjectPhotos = await db.ProjectPhotos.Where(ph => ph.ProjectID == p.ID).ToListAsync()
                    });
                }
                return Result;
            }
            catch
            {
                return new List<UserProjectsWithPhoto>();
            }
        }*/
        [HttpGet("[action]")]
        async public Task<IEnumerable<UserProjectsWithPhoto>> GetMyProjects()
        {
            try
            {
                var user = await db.Users.FirstOrDefaultAsync(u => u.Login == User.Identity.Name);
                List<UserProjectsWithPhoto> Result = new List<UserProjectsWithPhoto>();
                var _Projects = await db.Projects.Where(p => p.UserID == user.ID).ToListAsync();
                foreach (var p in _Projects)
                {
                    Result.Add(new UserProjectsWithPhoto
                    {
                        Project = p,
                        ProjectPhotos = await db.ProjectPhotos.Where(ph => ph.ProjectID == p.ID).ToListAsync()
                    });
                }
                return Result;
            }
            catch
            {
                return new List<UserProjectsWithPhoto>();
            }
        }
        [HttpGet("[action]")]
        async public Task<User> GetMyUser()
        {
            if (User.Identity.Name != null)
                return await db.Users.FirstOrDefaultAsync(u => u.Login == User.Identity.Name);
            return new User();
        }
        [HttpGet("[action]")]
        async public Task<User> GetUser(string uid)
        {
            try
            {
                return await db.Users.FirstOrDefaultAsync(u => u.ID == Convert.ToInt32(uid));
            }
            catch
            {
                return new Models.User();
            }
        }
        [HttpGet("[action]")]
        async public Task<IEnumerable<UserProjects>> GetUsersProjects()
        {
            List<UserProjects> UsersProjects = new List<UserProjects>();
            foreach (var u in db.Users)
            {
                UsersProjects.Add(new UserProjects
                {
                    User = u,
                    ProjectsCount = await db.Projects.CountAsync(p => p.UserID == u.ID)
                });
            }
            return UsersProjects;
        }
    }
}