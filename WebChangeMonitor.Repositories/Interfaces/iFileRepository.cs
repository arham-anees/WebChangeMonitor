using System.Collections.Generic;
using WebChangeMonitor.Domain;

namespace WebChangeMonitor.Repositories {
    public interface iFileRepository:iRepository<cFile> {
        
        /// <summary>
        /// this method checks the uniqueness of given file name on server repository of files to avoid conflict and loss of data
        /// </summary>
        /// <param name="serverPath">new generated file path</param>
        /// <returns>returns true if file path exists and false if not</returns>
        bool IsNameExists(string encodedName);
    }
}