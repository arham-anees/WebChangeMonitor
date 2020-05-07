using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace WebChangeMonitor.API.Models {
    public class ChangeFilesActionModel {
        [JsonProperty("LocalName")]
        public string LocalName { get; set; }
        [JsonProperty("LocalPath")]
        public string LocalPath { get; set; }
        [JsonProperty("HashedContent")]
        public string HashedContent { get; set; }
    }
}
