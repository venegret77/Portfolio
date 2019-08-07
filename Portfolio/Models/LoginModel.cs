using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Portfolio.Models
{
    public class LoginModel
    {
        public string Login { get; set; }
        public string Password { get; set; }
    }
}
