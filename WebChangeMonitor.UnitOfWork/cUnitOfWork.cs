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
		private iFileStatusRepository _FileStatusRepository;
		private iVersionFileRepository _VersionFileRepository;

		#endregion

		#region METHODS

		public cUnitOfWork(
			AppDbContext context,
			iFileRepository fileRepository,
			iVersionRepository versionRepository,
			iFileStatusRepository fileStatusRepository,
			iVersionFileRepository versionFileRepository
			) {
			_Context = context;
			_FileRepository = fileRepository;
			_VersionRepository = versionRepository;
			_FileStatusRepository = fileStatusRepository;
			_VersionFileRepository = versionFileRepository;
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
		public iFileStatusRepository FileStatusRepository => _FileStatusRepository;
		public iVersionFileRepository VersionFileRepository => _VersionFileRepository;

		#endregion	}
	}
}
