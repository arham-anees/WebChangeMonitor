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

        /// <summary>
        /// this method checks the given file against database to check if file is existing or not, if yes then check uniqueness
        /// </summary>
        /// <param name="localPath">path of file on client machine</param>
        /// <param name="hashedContent">computed hash of file content</param>
        /// <returns>true if file exists and content matches else false</returns>
        bool IsDuplicate(string localPath, string hashedContent);
    
    /// <summary>
    /// this method fetch file from database 
    /// </summary>
    /// <param name="encodedName">encoded name of file on server</param>
    /// <returns>returns file object for given encoded name</returns>
    cFile Get(string encodedName);
    }
}