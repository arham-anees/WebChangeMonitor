using System;
using WebChangeMonitor.Repositories;
using WebChangeMonitor.Repositories.Interfaces;

namespace WebChangeMonitor.UnitOfWork {
	public interface iUnitOfWork : IDisposable {
		void Dispose();

		void Complete();
		iFileRepository FileRepository { get; }
		iVersionRepository VersionRepository { get; }
		iFileStatusRepository FileStatusRepository { get; }
		iVersionFileRepository VersionFileRepository { get; }
	}
}