using System.Collections;
using System.Collections.Generic;
using System.Linq;


using WebChangeMonitor.Data;
using WebChangeMonitor.Domain;

namespace WebChangeMonitor.Repositories {
	public class cFileRepository : cRepository<cFile>, iFileRepository {
		public cFileRepository(AppDbContext context) : base(context) {
		}

		public bool IsNameExists(string encodedName) {
			return _Context.Files.Any(x => x.EncodedName == encodedName);
		}

		public bool IsDuplicate(string localPath, string hashedContent) {
			return _Context.Files.Any(x => x.LocalRelativePath == localPath /*&& x.HashedContent == hashedContent*/);
		}

		public cFile Get(string encodedName) {
			return _Context.Files.FirstOrDefault(x => x.EncodedName == encodedName);
		}

		public IEnumerable<cFile> GetCompare(string encodedName) {
			var file = Get(encodedName);
			if (_Context.VersionFiles.First(x => x.FileId == file.Id).FileStatusId == 2)
				return _Context.Files.Where(x => x.LocalRelativePath == _Context.Files.First(f => f.EncodedName == encodedName).LocalRelativePath).OrderByDescending(f => f.Id).Take(2);
			return null;
		}
	}
}
