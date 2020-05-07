using System.Linq;


using WebChangeMonitor.Data;
using WebChangeMonitor.Domain;

namespace WebChangeMonitor.Repositories {
    public class cFileRepository : cRepository<cFile>, iFileRepository {
        public cFileRepository(AppDbContext context) : base(context) {

        }

        public bool IsNameExists(string encodedName) {
            return _Context.Files.Any(x => x.EncodedName== encodedName);
        }
    }
}
