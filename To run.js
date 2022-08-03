let run = () => {
  const varnames = []
  const varvalues = []
  let torun = ""
  const e = document.getElementsByTagName('ssml');
  var codea = e[0].innerHTML
  codea = codea.replace(/\\n/g, ";");
  const codeb = codea.split(";")
  for (var i = 0; i < codeb.length; i++) {
    const codec = codeb[i].split(" ");
    if(codec[0] == 'text'){
      let content
      let color
      for (var ii = 0; ii < codec.length; ii++) {
        const info = codec[ii].split('=');
        if (info[0]=='content'){
          content = info[1].replace(/\|/g, " ");
        }
        if (info[0]=='color'){
          color = info[1];
        }
        if (info[0]=='type'){
          if(info[1]=='b'){
            torun += "<p class='p' style='color: "+color+"'><b>"+content+"</b></p>"
          }
          else if(info[1]=='i'){
            torun += "<p class='p' style='color: "+color+"'><i>"+content+"</i></p>"
          }
          else{
            torun += "<p class='p' style='color: "+color+"'>"+content+"</i></p>"
          }
        }
      }
    }
    if(codec[0] == 'new-line'){
      torun += "<br>"
    }
    if(codec[0] == 'var'){
      var varnew = true;
      var saveii
      for (var ii = 0; ii < varnames.length; ii++) {
        if (varnames[ii] == codec[1]){
          varnew=false;
          saveii = ii
        }

      }
      if(varnew && codec[2] == "=") {
        varvalues[saveii] = codec[3]
      }
      if(varnew == false && codec[2] == "+=") {
        for (var i = 0; i < varnames.length; i++) {
          if(varnames[i] == codec[1]){
            varvalues[saveii] += codec[3]
          }
        }
      }
      if(varnew == false && codec[2] == "-=") {
        for (var i = 0; i < varnames.length; i++) {
          if(varnames[i] == codec[1]){
            varvalues[saveii] -= codec[3]
          }
        }
}
        if(varnew == false && codec[2] == "*=") {
          for (var i = 0; i < varnames.length; i++) {
            if(varnames[i] == codec[1]){
              varvalues[saveii] *= codec[3]
            }
          }
        }
        if(varnew == false && codec[2] == "/=") {
          for (var i = 0; i < varnames.length; i++) {
            if(varnames[i] == codec[1]){
              varvalues[saveii] /= codec[3]
            }
          }
        }

    }
  }
  document.getElementById('code_out').innerHTML = torun;
}
setInterval(function(){
  run()
},1)
