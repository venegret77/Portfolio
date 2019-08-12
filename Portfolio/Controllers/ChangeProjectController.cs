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
    public class ChangeProjectController : ControllerBase
    {
        private readonly ProjectsContext db;

        public ChangeProjectController(ProjectsContext context)
        {
            db = context;
        }

        [HttpPost]
        public async Task<IActionResult> ChangeProject([FromForm] ProjectModel model)
        {
            try
            {
                var project = await db.Projects.FirstAsync(p => p.ID == Convert.ToInt32(model.id));
                if (model.Header != null)
                    project.Header = model.Header;
                if (model.Stack != null)
                    project.Stack = model.Stack;
                if (model.DateStart != null)
                    project.DateStart = model.DateStart;
                if (model.DateEnd != null)
                    project.DateEnd = model.DateEnd;
                if (model.Body != null)
                    project.Body = model.Body;
                var ph = await db.ProjectPhotos.Where(p => p.ProjectID == 0).ToListAsync();
                foreach (var _ph in ph)
                {
                    _ph.ProjectID = Convert.ToInt32(model.id);
                }
                await db.SaveChangesAsync();
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}