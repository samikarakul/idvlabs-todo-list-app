using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TodoApi.Models;

namespace TodoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController: ControllerBase
    {
        TodoContext _context;
        public LoginController(TodoContext context)
        {
           this._context = context;
        }

        [HttpPost("")]
        public ActionResult<Response> LogUserIn(User _user)
        {
            _user.Username = _user.Username.Trim().Replace(" ", "");
            _user.Password = _user.Password.Trim().Replace(" ", "");
            
            User user = _context.Users.Where(u => u.Username == _user.Username && u.Password == _user.Password).FirstOrDefault();
            Response response = new Response();
            if(user != null){
                response.Error = false;
                response.Success = true;
                response.ErrorMessage = null;
                response.ResponseValue = user.UserId.ToString();
            }
            else{
                response.Error = true;
                response.Success = false;
                response.ErrorMessage = "Username or Password is wrong";
                response.ResponseValue = null;
            }
            // if empty returns no content 204
            return response;
        }
    }
}
