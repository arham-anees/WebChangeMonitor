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
		
		#endregion
		
		#region METHODS

		public cUnitOfWork(
			AppDbContext context,
			iFileRepository fileRepository,
			iVersionRepository versionRepository,
			iFileStatusRepository fileStatusRepository
			) {
			_Context = context;
			_FileRepository = fileRepository;
			_VersionRepository = versionRepository;
			_FileStatusRepository = fileStatusRepository;
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

		public iFileStatusRepository FileStatusRepository {
			get { return _FileStatusRepository; }
		}


		#endregion	}
	}
}
