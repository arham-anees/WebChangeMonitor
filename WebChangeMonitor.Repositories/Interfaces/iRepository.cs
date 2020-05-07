using System.Collections.Generic;

namespace WebChangeMonitor.Repositories {
    public interface iRepository<T> where T : class {
        IEnumerable<T> GetAll();
        T Get(int id);

        T Set(T entity);

        IEnumerable<T> Set(IEnumerable<T> entities);

        T Update(T entity);
        
        IEnumerable<T> Update(IEnumerable<T> entities);

    }
}