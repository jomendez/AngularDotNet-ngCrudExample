using angularEx.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace angularEx.api
{
      public class DataTodoData 
      {
         public int Id { get; set; }
         public string Description  { get; set; } 
         public string Name { get; set; }
         public string Site { get; set; } 
       }
      public class Data
      {
          public int id { get; set; }
      }


    public class dataController : ApiController
    {
        private Context context = new Context();

        [HttpGet]
        public List<TodoDatas> getAllTodoItems()
        {
            var persons = context.TodoData;
            return persons.ToList() != null ?  persons.ToList() : null;
        }

        
        [HttpPost]
        public TodoDatas getTodoItem(Data data)
        {
            return context.TodoData.SingleOrDefault(p=> p.Id == data.id);
        }

        [HttpPost]
        public bool modifyOrsaveTodoItem(DataTodoData dataTodoData)
        {
            if (dataTodoData == null)
                return false;
            if (dataTodoData.Id == 0)
            {
                saveTodoItem(dataTodoData);
                return true;
            }

            TodoDatas person = context.TodoData.SingleOrDefault(p=> p.Id == dataTodoData.Id);
            person.Name = dataTodoData.Name;
            person.Description = dataTodoData.Description;
            person.Site = dataTodoData.Site;
            context.SaveChanges();

            return true;
        }

        [HttpGet]
        public bool saveTodoItem(DataTodoData dataTodoData)
        {
            if (dataTodoData == null)
                return false;

            TodoDatas person = new TodoDatas();
            person.Name = dataTodoData.Name;
            person.Description = dataTodoData.Description;
            person.Site = dataTodoData.Site;
            context.TodoData.Add(person);
            context.SaveChanges();

            return true;
        }

        [HttpPost]
        public bool deleteTodoItem(Data data)
        {
            TodoDatas person = context.TodoData.SingleOrDefault(p => p.Id == data.id);
            if (person == null)
                return false;

            context.TodoData.Remove(person);
            context.SaveChanges();
            return true;
        }

    }
}