var chai = require("chai");
var assert = chai.assert;
var equal = assert.deepEqual;
var fs = require("fs");
var fasta = require("biojs-io-fasta");
var newick = require("biojs-io-newick");

var model = require("../lib/model");
require("./mochaFix.js"); // fix for solarized dark

describe("Model", function() {
  var g;
  beforeEach(function(){
    var fastaSeq = fs.readFileSync(__dirname + "/dummy/dummy_msa.fasta", "utf8");
    var seqs = fasta.parse(fastaSeq);
    var newickRaw = fs.readFileSync( __dirname + "/dummy/dummy_newick.newick", "utf8");
    var treeData = newick.parse_newick(newickRaw);
    seqs.map(function(el){
      // parseInt ? 
      el.id = el.name.split("|")[0];
    });
    g = new model.nodes(seqs, treeData);
  });
  describe("constructing", function() {
    it("constructing", function() {    
      equal(4,g.length);
      equal("ACGACGAACT",g.at(0).attributes.seq);
    });
  });
});
