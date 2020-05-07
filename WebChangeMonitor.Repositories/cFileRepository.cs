using System;
using System.Collections.Generic;
using System.Text;
using WebChangeMonitor.Data;
using WebChangeMonitor.Domain;

namespace WebChangeMonitor.Repositories {
    public class cFileRepository :cRepository<cFile>,iFileRepository {
        public cFileRepository(AppDbContext context) : base(context) {

        }

    }
}
