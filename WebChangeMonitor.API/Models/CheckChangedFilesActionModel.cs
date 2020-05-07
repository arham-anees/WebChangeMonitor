using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebChangeMonitor.API.Models {
    public class CheckChangedFilesActionModel 
    {
        /// <summary>
        /// this is temporary id to uniquely identify files on client side, after duplicate are removed by server 
        /// </summary>
        public int Number { get; set; }
        public string LocalPath { get; set; }
        public string HashedContent { get; set; }
    }
}
