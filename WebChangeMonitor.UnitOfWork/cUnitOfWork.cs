using System;
using System.Collections.Generic;
using System.Text;
using WebChangeMonitor.Data;
using WebChangeMonitor.Repositories;

namespace WebChangeMonitor.UnitOfWork {

    public class cUnitOfWork : iUnitOfWork {
        private AppDbContext _Context;
        private iFileRepository _FileRepository;

        public cUnitOfWork(AppDbContext context, iFileRepository fileRepository) {
            _Context = context;
            _FileRepository = fileRepository;
        }

        public void Dispose() {
            _Context?.Dispose();
        }

        public void Complete() {
            _Context.SaveChanges();
        }

        public iFileRepository FileRepository => _FileRepository;
    }
}
