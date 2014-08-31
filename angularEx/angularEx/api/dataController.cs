using angularEx.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace angularEx.api
{
      public class DataObj 
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
        public List<TodoDatas> getAllItems()
        {
            var persons = context.TodoData;
            return persons.ToList() != null ?  persons.ToList() : null;
        }

        
        [HttpGet]
        public TodoDatas getItem([FromUri] int id)
        {
            return context.TodoData.SingleOrDefault(p=> p.Id == id);
        }

        [HttpPost]
        public bool modifyItem(DataObj dataObj)
        {
            if (dataObj == null)
                return false;

            TodoDatas person = context.TodoData.SingleOrDefault(p=> p.Id == dataObj.Id);
            person.Name = dataObj.Name;
            person.Description = dataObj.Description;
            person.Site = dataObj.Site;
            context.SaveChanges();

            return true;
        }

        [HttpPost]
        public bool saveItem(DataObj dataObj)
        {
            if (dataObj == null)
                return false;

            TodoDatas person = new TodoDatas();
            person.Name = dataObj.Name;
            person.Description = dataObj.Description;
            person.Site = dataObj.Site;
            context.TodoData.Add(person);
            context.SaveChanges();

            return true;
        }

        [HttpDelete]
        public bool deleteItem([FromUri] int id)
        {
            TodoDatas person = context.TodoData.SingleOrDefault(p => p.Id == id);
            if (person == null)
                return false;

            context.TodoData.Remove(person);
            context.SaveChanges();
            return true;
        }

    }
}