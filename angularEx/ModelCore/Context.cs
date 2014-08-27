using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelCore
{
    public class Context : DbContext
    {
        public Context()
            : base("AngularDB")
        {

        }
    } 
    
}
