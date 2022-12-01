// Copyright 2022 Tom Nguyen

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

//     http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const fs = require('fs');
const aqlFunctions = require('./data/aql-functions.json').functions;
const aqlTmLanguage = require('./syntaxes/aql.tmLanguage.json');

const aqlFunctionsNames = aqlFunctions.map((functionObject) => functionObject.name);
const aqlFunctionsRegex = aqlFunctionsNames.join('|');
const nextAqlTmLanguage = {
  ...aqlTmLanguage,
  repository: {
    ...aqlTmLanguage.repository,
    function: {
      ...aqlTmLanguage.repository.function,
      patterns: [
        {
          match: `(?i)\\b(${aqlFunctionsRegex})\\b`,
          name: "support.function.aql"
        }
      ]
    }
  }
};

fs.writeFileSync('./data/aql-functions.names', aqlFunctionsNames.join(', '), 'utf8');
fs.writeFileSync('./data/aql-functions.regex', aqlFunctionsRegex, 'utf8');
fs.writeFileSync('./syntaxes/aql.tmLanguage.json', JSON.stringify(nextAqlTmLanguage, null, 2), 'utf8');
