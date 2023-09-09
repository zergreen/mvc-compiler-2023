function compile(inputCode, model) {
    const tokens = [];
    const lines = inputCode.split('\n');
  
    for (let line of lines) {
      line = line.trim();
  
      if (model === 'Model1') {
        if (line.startsWith('declare')) {
          const [keyword, identifier] = line.split(' ');
          tokens.push({ type: 'Keyword', value: keyword });
          tokens.push({ type: 'Identifier', value: identifier });
        } else {
          const parts = line.split(' ');
          for (const part of parts) {
            if (part.match(/^\d+$/)) {
              tokens.push({ type: 'Literal', value: part });
            } else if (part.match(/^[+=]$/)) {
              tokens.push({ type: 'Symbol', value: part });
            } else if (part.match(/^[a-zA-Z_]\w*$/)) {
              tokens.push({ type: 'Identifier', value: part });
            }
          }
        }
      } else if (model === 'Model2') {
        if (line.startsWith('declare')) {
          const [keyword, variable] = line.split(' ');
          tokens.push({ type: 'Keyword and Sign', value: keyword });
          tokens.push({ type: 'Variable', value: variable });
        } else {
          const parts = line.split(' ');
          for (const part of parts) {
            if (part.match(/^\d+$/)) {
              tokens.push({ type: 'Integer', value: part });
            } else if (part === '=') {
              tokens.push({ type: 'Assignment', value: part });
            } else if (part === '+') {
              tokens.push({ type: 'Keyword and Sign', value: part });
            } else if (part.match(/^[a-zA-Z_]\w*$/)) {
              tokens.push({ type: 'Variable', value: part });
            }
          }
        }
      }
    }
  
    return tokens;
  }
  
  const inputCode = `
  declare abc
  declare def
  abc = 1
  def = abc + abc
  `;
  
  const model1Tokens = compile(inputCode, 'Model1');
  model1Tokens.forEach(token => {
    console.log(`${token.value} is ${token.type}`);
  });

  console.log('444444');
  
  const model2Tokens = compile(inputCode, 'Model2');
  model2Tokens.forEach(token => {
    console.log(`${token.value} is ${token.type}`);
  });
  