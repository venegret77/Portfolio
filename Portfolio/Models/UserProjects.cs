using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Portfolio.Models
{
    public class UserProjects
    {
        [Key]
        public int IdProject { get; set; }
        [Required]
        public int IdUser { get; set; }
    }
}
