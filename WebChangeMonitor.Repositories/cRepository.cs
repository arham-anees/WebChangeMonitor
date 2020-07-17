using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WebChangeMonitor.Data;

namespace WebChangeMonitor.Repositories {

    public abstract class cRepository<T> : iRepository<T> where T:class {

        protected AppDbContext _Context;
        protected cRepository(AppDbContext context) {
            _Context = context;
        }

        public virtual IEnumerable<T> GetAll() {
            return _Context.Query<T>();
        }

        public virtual T Get(int id) {
            return _Context.Find<T>(id);
        }

        public virtual T Set(T entity) {
            _Context.Add(entity);
            return entity;
        }

        public virtual IEnumerable<T> Set(IEnumerable<T> entities) {

            _Context.AddRange(entities);
            return entities;
        }

        public virtual T Update(T entity) {

            _Context.Update(entity);
            return entity;
        }

        public virtual IEnumerable<T> Update(IEnumerable<T> entities) {

            _Context.UpdateRange(entities);
            return entities;
        }
    }
}
