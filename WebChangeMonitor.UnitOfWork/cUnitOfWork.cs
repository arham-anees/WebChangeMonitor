using System;
using System.Collections.Generic;
using System.Text;
using WebChangeMonitor.Data;
using WebChangeMonitor.Repositories;
using WebChangeMonitor.Repositories.Interfaces;

namespace WebChangeMonitor.UnitOfWork {

	public class cUnitOfWork : iUnitOfWork {
		#region FIELDS

		private AppDbContext _Context;
		private iFileRepository _FileRepository;
		private iVersionRepository _VersionRepository;
		#endregion
		#region METHODS

		public cUnitOfWork(
			AppDbContext context,
			iFileRepository fileRepository,
			iVersionRepository versionRepository
			) {
			_Context = context;
			_FileRepository = fileRepository;
			_VersionRepository = versionRepository;
		}

		public void Dispose() {
			_Context?.Dispose();
		}

		public void Complete() {
			_Context.SaveChanges();
		}
		#endregion
		#region PROPERTIES

		public iFileRepository FileRepository => _FileRepository;
		public iVersionRepository VersionRepository => _VersionRepository;

		#endregion	}
	}
}
