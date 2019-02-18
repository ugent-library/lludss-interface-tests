import './strip-scripts'

import 'cypress-common/helpers/chai'
import 'cypress-common/commands/map'
import 'cypress-common/commands/prop'
import 'cypress-common/commands/random'
import 'cypress-common/commands/param'
import 'cypress-common/commands/split'
import 'cypress-common/commands/sum'

import './commands/get-count'
import './commands/login'

chai.use(require('chai-sorted'))
