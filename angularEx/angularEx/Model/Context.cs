using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace angularEx.Model
{
    public class Context : DbContext
    {
        public DbSet<ExampleDatas> TodoData { get; set; }

        public Context()
            : base("AngularDB") 
        {

        }
    }
}