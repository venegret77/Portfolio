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
    public class RegistrationController : ControllerBase
    {
        private readonly ProjectsContext db;

        public RegistrationController(ProjectsContext context)
        {
            db = context;
        }

        // GET: api/Registration/CheckLogin
        [HttpGet("[action]")]
        public bool CheckLogin(string login)
        {
            var user = db.Users.Where(u => u.Login == login).ToList();
            if (user.Count == 1)
                return true;
            else
                return false;
        }
    }
}