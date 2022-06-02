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
    public class UserController : ControllerBase
    {
        TodoContext _context;
        public UserController(TodoContext context)
        {
           this._context = context;
        }

        [HttpGet("todo/{id}")]
        public List<Todo> GetUncompletedTodosByUserId(int id)
        {
            return _context.Todos.Where(t => t.UserId == id && !t.IsCompleted).ToList();
        }
        [HttpPost("")]
        public ActionResult<Response> CreateUser(User user)
        {
            user.Username = user.Username.Trim().Replace(" ", "");
            user.Password = user.Password.Trim().Replace(" ", "");
            Response response = new Response();
            try
            {
                if(user != null && user.Username != null && user.Password != null)
                {
                    if(!_context.Users.Any(u => u.Username == user.Username))
                    {
                        _context.Users.Add(user);
                        _context.SaveChanges();

                        response.Error = false;
                        response.Success = true;
                        response.ErrorMessage = null;
                        response.ResponseValue = user.Username;
                    }
                    else {
                        response.Error = true;
                        response.Success = false;
                        response.ErrorMessage = "This username is taken... Please try different username!";
                        response.ResponseValue = null;
                    }
                }
                else {
                    response.Error = true;
                    response.Success = false;
                    response.ErrorMessage = "Please don't send empty values!!";
                    response.ResponseValue = null;
                }
            }
            catch (Exception ex)
            {
                response.Error = true;
                response.Success = false;
                response.ErrorMessage = "Something went wrong... Please try again!";
                response.ResponseValue = null;
            }
            
            return response;
        }

    }
}