module.exports = function check(str, bracketsConfig) {
  let cfg = new BracketsConfig(bracketsConfig);
  let stack = [];
  let i;
  for (i = 0; i < str.length; i++) {
    var char = str[i];
    
    var stackIsEmpty = stack.length == 0;
    if (stackIsEmpty) {
      if (cfg.isOpenning(char)) {
        stack.push(char);
        continue
      } else {
        return false;
      }
    }

    var last = stack[stack.length - 1];

    if (cfg.isOpenning(last) && cfg.isOpenning(char) && !cfg.isClosing(char)) { // both are opening - doesn't metter if they match
      stack.push(char);
    } else if (cfg.isOpenning(last) && cfg.isClosing(char) && cfg.match(last, char)) {
      stack.pop();
    } else {
      return false;
    }

  }

  return stack.length == 0;
}

class BracketsConfig {


  constructor(bracketsConfig) {
    this.open = [];
    this.close = [];
    this.bracketsConfig = bracketsConfig;
    for (let i = 0; i < this.bracketsConfig.length; i++) {
      this.open.push(this.bracketsConfig[i][0]);
      this.close.push(this.bracketsConfig[i][1]);
    }
  }

  isOpenning(char) {
    return this.open.indexOf(char) > -1;
  }

  isClosing(char) {
    return this.close.indexOf(char) > -1
  }

  match(opening, closing) {    
    for (let i = 0; i < this.bracketsConfig.length; i++) {
      if (this.bracketsConfig[i][0] == opening && this.bracketsConfig[i][1] == closing){
        return true;
      }
    }

    return false;
  }
}


//var result = module.exports('||',[['|', '|']]);
//console.log(result);
