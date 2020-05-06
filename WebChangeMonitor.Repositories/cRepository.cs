using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WebChangeMonitor.Data;

namespace WebChangeMonitor.Repositories {
    public abstract class cRepository<T> where T:class {

        protected AppDbContext _Context;
        protected cRepository(AppDbContext context) {
            _Context = context;
        }

        public IQueryable<T> GetAll() {
            return null;
        }

        public T Get(int id) {
            return null;
        }

        
    }
}
