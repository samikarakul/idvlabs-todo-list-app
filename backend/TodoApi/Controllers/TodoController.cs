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
    public class TodoController : ControllerBase
    {
        TodoContext _context;
        public TodoController(TodoContext context)
        {
           this._context = context;
        }

        [HttpGet("")]
        public ActionResult<List<Todo>> GetAllUncompletedTodos()
        {
            return _context.Todos.Where(t => !t.IsCompleted).ToList();
        }


        [HttpGet("{id}")]
        public ActionResult<Todo> GetTodoById(int id)
        {
            return _context.Todos.Find(id);
        }


        [HttpPost]
        public ActionResult<Response> CreateTodo(Todo _todo)
        {
            Response response = new Response();
            if(_todo != null && _todo.Title != null && _todo.TodoContent != null && _todo.UserId != null)
            {
                if(_context.Users.Any(u => u.UserId == _todo.UserId))
                {
                    _context.Todos.Add(_todo);
                    _context.SaveChanges();
                    response.Error = false;
                    response.Success = true;
                    response.ErrorMessage = null;
                    response.ResponseValue = _todo.TodoId.ToString();
                    Console.WriteLine(_todo.TodoId.ToString());
                }
                else{
                    response.Error = true;
                    response.Success = false;
                    response.ErrorMessage = "user is not valid!";
                    response.ResponseValue = null;
                }
            }
            else{
                response.Error = true;
                response.Success = false;
                response.ErrorMessage = "Plese don't send empty values!";
                response.ResponseValue = null;
            }
            return response;
        }

        [HttpPatch("{id}")]
        public ActionResult<Response> UpdateTodo(int id, Todo _todo)
        {
            Response response = new Response();
            if(_todo != null && _todo.Title != null && _todo.TodoContent != null && _todo.UserId != null)
            {
                if(_context.Users.Any(u => u.UserId == _todo.UserId))
                {
                    Todo todo = _context.Todos.Find(id);
                    if(todo != null)
                    {
                        todo.Title = _todo.Title;
                        todo.TodoContent = _todo.TodoContent;
                        todo.IsCompleted = _todo.IsCompleted;
                        _context.Todos.Update(todo);
                        _context.SaveChanges();
                        response.Error = false;
                        response.Success = true;
                        response.ErrorMessage = null;
                        response.ResponseValue = _todo.Title;
                    }
                    else{
                        response.Error = true;
                        response.Success = false;
                        response.ErrorMessage = "This todo is not valid!";
                        response.ResponseValue = null;
                    }
                }
                else{
                    response.Error = true;
                    response.Success = false;
                    response.ErrorMessage = "user is not valid!";
                    response.ResponseValue = null;
                }
            }
            else{
                response.Error = true;
                response.Success = false;
                response.ErrorMessage = "Plese don't send empty values!";
                response.ResponseValue = null;
            }

            return response;
        }


        [HttpDelete("{id}")]
        public ActionResult<Response> DeleteTodo(int id)
        {
            Console.WriteLine("geldi");
            Response response = new Response();

            try{
                Todo todo = _context.Todos.Find(id);
                if(todo != null)
                {
                    _context.Todos.Remove(todo);
                    _context.SaveChanges();

                    response.Error = false;
                    response.Success = true;
                    response.ErrorMessage = null;
                    response.ResponseValue = todo.Title;
                }
                else{
                    response.Error = true;
                    response.Success = false;
                    response.ErrorMessage = "This todo is not valid...";
                    response.ResponseValue = null;
                }
            }catch(Exception ex){
                response.Error = true;
                response.Success = false;
                response.ErrorMessage = "Something went wrong.. Please try again later...";
                response.ResponseValue = ex.ToString();
            }


            return response;
        }
    }
}