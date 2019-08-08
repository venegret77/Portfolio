using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Portfolio.Models
{
    public class User
    {
        [Key]
        public int ID { get; set; }
        [Required]
        public string Name { get; set; } 
        public string Description { get; set; }
        public string Stack { get; set; }
        [Required]
        public string Login { get; set; }
        [Required]
        public string Password { get; set; } 
        public string Email { get; set; }
        [Required]
        public string PhotoRef { get; set; } 
    }
}
