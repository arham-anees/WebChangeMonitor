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
		private readonly iUserRepository _UserRepository;
		private readonly iRoleRepository _RoleRepository;
		private readonly iUserRoleRepository _UserRoleRepository;
		private readonly iAcceptanceStatusRepository _AcceptanceStatusRepository;
		private readonly iVersionStatusRepository _VersionStatusRepository;
		private readonly iDomainRepository _DomainRepository;

		#endregion

		#region METHODS

		public cUnitOfWork(
			AppDbContext context,
			iFileRepository fileRepository,
			iVersionRepository versionRepository,
			iFileStatusRepository fileStatusRepository,
			iVersionFileRepository versionFileRepository,
			iUserRepository userRepository,
			iRoleRepository roleRepository,
			iUserRoleRepository userRoleRepository,
			iAcceptanceStatusRepository acceptanceStatusRepository,
			iVersionStatusRepository versionStatusRepository,
			iDomainRepository domainRepository
			) {
			_Context = context;
			_FileRepository = fileRepository;
			_VersionRepository = versionRepository;
			_FileStatusRepository = fileStatusRepository;
			_VersionFileRepository = versionFileRepository;
			_UserRepository = userRepository;
			_RoleRepository = roleRepository;
			_UserRoleRepository = userRoleRepository;
			_AcceptanceStatusRepository = acceptanceStatusRepository;
			_VersionStatusRepository = versionStatusRepository;
			_DomainRepository = domainRepository;
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

		public iUserRepository UserRepository => _UserRepository;

		public iRoleRepository RoleRepository => _RoleRepository;

		public iUserRoleRepository UserRoleRepository => _UserRoleRepository;

		public iAcceptanceStatusRepository AcceptanceStatusRepository => _AcceptanceStatusRepository;

		public iVersionStatusRepository VersionStatusRepository => _VersionStatusRepository;
		public iDomainRepository DomainRepository => _DomainRepository;

		#endregion	}
	}
}
