using System;
using WebChangeMonitor.Repositories;

namespace WebChangeMonitor.UnitOfWork {
    public interface iUnitOfWork : IDisposable{
        void Dispose();

        void Complete();
        iFileRepository FileRepository { get; }
    }
}